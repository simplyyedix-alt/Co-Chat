import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  type User,
} from "firebase/auth";
import { auth, firebaseReady, googleProvider } from "./firebase";
import {
  addGroupMembers,
  blockUser,
  cancelFriendRequest,
  createCall,
  createConversation,
  createGroup,
  createStory,
  declineCall,
  deleteConversation,
  ensureUserProfile,
  findUsers,
  getFriendship,
  getUserProfile,
  listBlockedUsers,
  listFriends,
  leaveGroup,
  markConversationRead,
  removeFriend,
  removeGroupMember,
  respondToFriendRequest,
  saveProfile,
  sendFriendRequest,
  sendMessage,
  unblockUser,
  unsendMessage,
  updateGroup,
  touchPresence,
  watchCalls,
  watchConversations,
  watchFriendRequests,
  watchMessages,
  watchStories,
  type CallRecord,
  type ChatMessage,
  type Conversation,
  type Story,
  type UserProfile,
} from "./services/chat";
import "./index.css";
import "./group-friend.css";
import VoiceCall from "./components/VoiceCall";

const starterChats: Conversation[] = [
  {
    id: "preview-maya",
    name: "Maya Patel",
    avatar: "MP",
    memberIds: [],
    lastMessage: "That sounds perfect — see you there!",
  },
  {
    id: "preview-design",
    name: "Design Crew",
    avatar: "DC",
    memberIds: [],
    lastMessage: "Leo: I added the final screens.",
  },
  {
    id: "preview-jordan",
    name: "Jordan Kim",
    avatar: "JK",
    memberIds: [],
    lastMessage: "Thanks for sharing that!",
  },
];
const starterMessages: Record<string, ChatMessage[]> = {
  "preview-maya": [
    {
      id: "1",
      senderId: "them",
      text: "Are we still on for coffee this afternoon?",
    },
    { id: "2", senderId: "me", text: "Absolutely! I’ll be there at 4." },
    { id: "3", senderId: "them", text: "That sounds perfect — see you there!" },
  ],
  "preview-design": [
    {
      id: "4",
      senderId: "them",
      text: "I added the final screens. What do you think?",
    },
  ],
  "preview-jordan": [
    { id: "5", senderId: "them", text: "Thanks for sharing that!" },
  ],
};
const initials = (name: string) =>
  name
    .split(/\s+/)
    .map((x) => x[0])
    .join("")
    .slice(0, 2)
    .toUpperCase() || "U";
const formatTime = (value?: { toDate?: () => Date } | null) =>
  value?.toDate
    ? value
        .toDate()
        .toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    : "";
const presenceLabel = (
  active?: boolean,
  lastSeen?: { toMillis?: () => number } | null,
) => {
  if (active) return "Active now";
  const timestamp = lastSeen?.toMillis?.() || 0;
  if (!timestamp) return "Offline";
  const minutes = Math.max(1, Math.floor((Date.now() - timestamp) / 60000));
  if (minutes < 60) return `${minutes} minute${minutes === 1 ? "" : "s"} ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hour${hours === 1 ? "" : "s"} ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days} day${days === 1 ? "" : "s"} ago`;
  const weeks = Math.floor(days / 7);
  return `${weeks} week${weeks === 1 ? "" : "s"} ago`;
};
const relativeMessageTime = (value?: { toMillis?: () => number } | null) => {
  const timestamp = value?.toMillis?.() || 0;
  if (!timestamp) return "just now";
  const minutes = Math.floor((Date.now() - timestamp) / 60000);
  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes} minute${minutes === 1 ? "" : "s"} ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hour${hours === 1 ? "" : "s"} ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days} day${days === 1 ? "" : "s"} ago`;
  const weeks = Math.floor(days / 7);
  return `${weeks} week${weeks === 1 ? "" : "s"} ago`;
};

function AuthScreen({ onPreview }: { onPreview: () => void }) {
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!auth) return;
    setError("");
    const data = new FormData(event.currentTarget);
    try {
      if (mode === "signup") {
        const result = await createUserWithEmailAndPassword(
          auth,
          String(data.get("email")),
          String(data.get("password")),
        );
        await updateProfile(result.user, {
          displayName: String(data.get("name")),
        });
      } else
        await signInWithEmailAndPassword(
          auth,
          String(data.get("email")),
          String(data.get("password")),
        );
    } catch (e) {
      setError(
        e instanceof Error
          ? e.message
              .replace("Firebase: ", "")
              .replace(/ \(auth\/[^)]+\)\.?$/, "")
          : "Unable to sign in.",
      );
    }
  };
  const google = async () => {
    if (!auth) return;
    setError("");
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (e) {
      setError(
        e instanceof Error
          ? e.message.replace("Firebase: ", "")
          : "Google sign-in failed.",
      );
    }
  };
  return (
    <main className="auth">
      <section className="auth-card">
        <div className="brand-mark">C</div>
        <h1>Co Chat</h1>
        <p>Chat bright. Feel right.</p>
        {!firebaseReady ? (
          <>
            <div className="hero-card">
              <h2>Preview mode</h2>
              <p>
                Firebase is not configured in this build. Explore the full
                interface locally, then add your project keys to enable
                accounts.
              </p>
              <button className="secondary" onClick={onPreview}>
                Continue preview
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="auth-tabs">
              <button
                className={mode === "signin" ? "active" : ""}
                onClick={() => setMode("signin")}
              >
                Sign in
              </button>
              <button
                className={mode === "signup" ? "active" : ""}
                onClick={() => setMode("signup")}
              >
                Create account
              </button>
            </div>
            <form onSubmit={submit}>
              {mode === "signup" && (
                <label>
                  Display name
                  <input name="name" required placeholder="Your name" />
                </label>
              )}
              <label>
                Email
                <input
                  name="email"
                  type="email"
                  required
                  placeholder="you@example.com"
                />
              </label>
              <label>
                Password
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  minLength={6}
                  required
                  placeholder="At least 6 characters"
                />
                <button
                  className="password-toggle"
                  type="button"
                  onClick={() => setShowPassword((visible) => !visible)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </label>
              {error && <p className="error-text">{error}</p>}
              <button className="primary">
                {mode === "signin" ? "Sign in" : "Create account"}
              </button>
            </form>
            <button className="google-button" onClick={google}>
              Continue with Google
            </button>
            <small>Your account syncs securely across devices.</small>
          </>
        )}
      </section>
    </main>
  );
}
function Nav({
  page,
  setPage,
}: {
  page: string;
  setPage: (value: string) => void;
}) {
  return (
    <nav className="bottom-nav">
      {[
        ["chats", "💬", "Chats"],
        ["communities", "👥", "Communities"],
        ["discover", "⌕", "Discover"],
        ["settings", "⚙", "Settings"],
      ].map(([id, icon, label]) => (
        <button
          type="button"
          key={id}
          className={page === id ? "active" : ""}
          onClick={() => setPage(id)}
        >
          <span>{icon}</span>
          {label}
        </button>
      ))}
    </nav>
  );
}

function UsernameSetup({
  user,
  onComplete,
}: {
  user: User;
  onComplete: (username: string, displayName: string) => void;
}) {
  const [username, setUsername] = useState("");
  const [displayName, setDisplayName] = useState(user.displayName || "");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setSaving(true);
    setError("");
    try {
      await saveProfile(user.uid, {
        displayName,
        username,
        bio: "",
        notificationsEnabled: true,
        discoverable: true,
      });
      onComplete(username.trim().toLowerCase(), displayName.trim());
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not save your profile.");
    } finally {
      setSaving(false);
    }
  };
  return (
    <main className="auth">
      <section className="auth-card">
        <div className="brand-mark">C</div>
        <h1>Set up your profile</h1>
        <p>Choose a unique username so people can find you on Co-Chat.</p>
        <form onSubmit={submit}>
          <label>
            Display name
            <input
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="Your name"
              required
            />
          </label>
          <label>
            Username
            <input
              value={username}
              onChange={(e) =>
                setUsername(
                  e.target.value.replace(/[^a-zA-Z0-9_]/g, "").toLowerCase(),
                )
              }
              placeholder="your_username"
              minLength={3}
              maxLength={24}
              pattern="[a-z0-9_]+"
              required
            />
          </label>
          {error && <p className="error-text">{error}</p>}
          <button className="primary" disabled={saving}>
            {saving ? "Saving…" : "Continue"}
          </button>
        </form>
      </section>
    </main>
  );
}

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [preview, setPreview] = useState(false);
  const [loading, setLoading] = useState(firebaseReady);
  const [showVoiceCall, setShowVoiceCall] = useState(false);
  const [voiceRole, setVoiceRole] = useState<"caller" | "callee">("caller");
  const [page, setPage] = useState("chats");
  const [conversations, setConversations] =
    useState<Conversation[]>(starterChats);
  const [selected, setSelected] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [text, setText] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const [showNew, setShowNew] = useState(false);
  const [showGroup, setShowGroup] = useState(false);
  const [needsUsername, setNeedsUsername] = useState(false);
  const [senderNames, setSenderNames] = useState<Record<string, string>>({});
  const [replyTarget, setReplyTarget] = useState<ChatMessage | null>(null);
  const [stories, setStories] = useState<Story[]>([]);
  const [incomingCall, setIncomingCall] = useState<CallRecord | null>(null);
  const [activeStory, setActiveStory] = useState<Story | null>(null);
  const [calls, setCalls] = useState<CallRecord[]>([]);
  const [storyText, setStoryText] = useState("");
  const [profileName, setProfileName] = useState("");
  const [profileUsername, setProfileUsername] = useState("");
  const [profileBio, setProfileBio] = useState("");
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [discoverable, setDiscoverable] = useState(true);
  const [profileSaved, setProfileSaved] = useState(false);
  const [showFriendRequests, setShowFriendRequests] = useState(false);
  const [unseenFriendRequestIds, setUnseenFriendRequestIds] = useState<string[]>([]);
  const [showChatProfile, setShowChatProfile] = useState(false);
  const [groupMembers, setGroupMembers] = useState<UserProfile[]>([]);
  const [groupFriends, setGroupFriends] = useState<UserProfile[]>([]);
  const [friendProfiles, setFriendProfiles] = useState<UserProfile[]>([]);
  const [groupFriendSearch, setGroupFriendSearch] = useState("");
  const [showAddMembers, setShowAddMembers] = useState(false);
  const [groupEditName, setGroupEditName] = useState("");
  const [messageMenu, setMessageMenu] = useState<ChatMessage | null>(null);
  const [forwardingMessage, setForwardingMessage] =
    useState<ChatMessage | null>(null);
  // The reference design uses the light lavender theme as the default.
  // Users can still switch to dark mode from Settings.
  const [darkMode, setDarkMode] = useState(false);
  const [conversationMenu, setConversationMenu] = useState<Conversation | null>(
    null,
  );
  const [deleteTarget, setDeleteTarget] = useState<Conversation | null>(null);
  const holdTimers = useRef<Record<string, number>>({});
  const suppressConversationClick = useRef(false);
  const [incomingCallerName, setIncomingCallerName] =
    useState("Incoming caller");
  const [activeStatus, setActiveStatus] = useState(true);
  const [blockedUsers, setBlockedUsers] = useState<string[]>([]);
  const [presenceNow, setPresenceNow] = useState(() => Date.now());
  const liveUser = preview
    ? ({
        uid: "preview",
        displayName: "Preview user",
        email: "preview@cochat.local",
      } as User)
    : user;
  useEffect(() => {
    if (!auth) {
      setLoading(false);
      return;
    }
    return onAuthStateChanged(auth, (next) => {
      setUser(next);
      setLoading(false);
    });
  }, []);
  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("cochat-theme", darkMode ? "dark" : "light");
  }, [darkMode]);
  useEffect(() => {
    if (!liveUser || liveUser.uid === "preview") return;
    const uid = liveUser.uid;
    ensureUserProfile(uid, {
      displayName: liveUser.displayName || "",
      email: liveUser.email || "",
      photoURL: liveUser.photoURL || "",
    })
      .then(() => getUserProfile(uid))
      .then((profile) => {
        setProfileName(profile?.displayName || liveUser.displayName || "");
        setProfileUsername(profile?.username || "");
        setProfileBio(profile?.bio || "");
        setNeedsUsername(!localStorage.getItem(`cochat-username-${uid}`));
        setNotificationsEnabled(profile?.notificationsEnabled !== false);
        setDiscoverable(profile?.discoverable !== false);
        setActiveStatus(profile?.activeStatus !== false);
        listBlockedUsers(uid)
          .then((items) => setBlockedUsers(items.map((item) => item.blockedId)))
          .catch(() => undefined);
      })
      .catch(() => setError("Could not load your profile."));
  }, [liveUser?.uid]);
  useEffect(() => {
    if (!liveUser || liveUser.uid === "preview") return;
    const uid = liveUser.uid;
    return watchConversations(uid, (items) => setConversations(items));
  }, [liveUser?.uid]);
  useEffect(() => {
    if (!liveUser || liveUser.uid === "preview") return;
    const key = `cochat-seen-friend-requests-${liveUser.uid}`;
    let seen: string[] = [];
    try { seen = JSON.parse(localStorage.getItem(key) || "[]"); } catch { seen = []; }
    return watchFriendRequests(liveUser.uid, (items) => {
      const incoming = items.filter((item) => item.toUid === liveUser.uid).map((item) => item.id);
      setUnseenFriendRequestIds(incoming.filter((id) => !seen.includes(id)));
    });
  }, [liveUser?.uid]);
  useEffect(() => {
    const timer = window.setInterval(() => setPresenceNow(Date.now()), 30000);
    return () => window.clearInterval(timer);
  }, []);
  useEffect(() => {
    if (
      !selected ||
      selected.id.startsWith("preview-") ||
      !liveUser ||
      liveUser.uid === "preview"
    ) {
      setMessages(
        selected
          ? JSON.parse(
              localStorage.getItem(`cochat-preview-${selected.id}`) || "null",
            ) ||
              starterMessages[selected.id] ||
              []
          : [],
      );
      return;
    }
    return watchMessages(selected.id, liveUser.uid, setMessages);
  }, [selected?.id, liveUser?.uid]);
  useEffect(() => {
    if (!liveUser || !messages.length) return;
    const ids = [
      ...new Set(
        messages
          .map((item) => item.senderId)
          .filter((id) => id !== "me" && id !== "them" && id !== liveUser.uid),
      ),
    ];
    Promise.all(
      ids.map(async (id) => {
        const profile = await getUserProfile(id);
        return [id, profile?.displayName || profile?.username || id] as const;
      }),
    ).then((items) =>
      setSenderNames((old) =>
        Object.fromEntries([...Object.entries(old), ...items]),
      ),
    );
  }, [messages, liveUser?.uid]);
  useEffect(() => {
    if (!liveUser || liveUser.uid === "preview")
      return watchStories(setStories);
  }, [liveUser?.uid]);
  useEffect(() => {
    if (!liveUser || liveUser.uid === "preview") return;
    const uid = liveUser.uid;
    return watchCalls(uid, setCalls);
  }, [liveUser?.uid]);
  useEffect(() => {
    const call = calls.find(
      (item) => item.status === "ringing" && item.calleeId === liveUser?.uid,
    );
    setIncomingCall(call || null);
  }, [calls, liveUser?.uid]);
  useEffect(() => {
    if (!incomingCall?.callerId) return;
    getUserProfile(incomingCall.callerId)
      .then((profile) =>
        setIncomingCallerName(profile?.displayName || "Incoming caller"),
      )
      .catch(() => setIncomingCallerName("Incoming caller"));
  }, [incomingCall?.callerId]);
  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const container = document.querySelector(".messages");
      if (!container) return;
      container.scrollTop = container.scrollHeight;
      window.setTimeout(() => {
        container.scrollTop = container.scrollHeight;
      }, 50);
    });
    return () => window.cancelAnimationFrame(frame);
  }, [messages, selected?.id]);
  useEffect(() => {
    if (!liveUser || liveUser.uid === "preview") return;
    touchPresence(liveUser.uid, activeStatus).catch(() => undefined);
    const timer = window.setInterval(
      () => touchPresence(liveUser.uid, activeStatus).catch(() => undefined),
      30000,
    );
    return () => window.clearInterval(timer);
  }, [liveUser?.uid, activeStatus]);
  useEffect(() => {
    if (!messageMenu && !forwardingMessage) return;
    const closeMenus = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest(".message-menu,.forward-panel")) {
        setMessageMenu(null);
        setForwardingMessage(null);
      }
    };
    document.addEventListener("click", closeMenus);
    return () => document.removeEventListener("click", closeMenus);
  }, [messageMenu, forwardingMessage]);
  useEffect(() => {
    if (!liveUser || !selected || selected.type !== "group") return;
    setGroupEditName(selected.name);
    Promise.all(selected.memberIds.map((id) => getUserProfile(id))).then(
      (items) =>
        setGroupMembers(
          items.filter((item): item is UserProfile => Boolean(item)),
        ),
    );
  }, [showChatProfile, selected?.id, selected?.type]);
  useEffect(() => {
    if (!liveUser || !showChatProfile || !selected || selected.type !== "group") return;
    listFriends(liveUser.uid).then(setGroupFriends).catch(() => setGroupFriends([]));
  }, [showChatProfile, selected?.id, selected?.type, liveUser?.uid]);
  useEffect(() => {
    if (!liveUser || liveUser.uid === "preview") return;
    listFriends(liveUser.uid)
      .then(setFriendProfiles)
      .catch(() => setFriendProfiles([]));
    const timer = window.setInterval(() => {
      setPresenceNow(Date.now());
      listFriends(liveUser.uid)
        .then(setFriendProfiles)
        .catch(() => undefined);
    }, 5000);
    return () => window.clearInterval(timer);
  }, [liveUser?.uid]);
  useEffect(() => {
    setShowChatProfile(false);
    setShowAddMembers(false);
    setGroupFriendSearch("");
  }, [selected?.id]);
  useEffect(() => {
    if (!conversationMenu) return;
    const closeMenu = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest(".conversation-menu,.chat-row"))
        setConversationMenu(null);
    };
    document.addEventListener("click", closeMenu);
    return () => document.removeEventListener("click", closeMenu);
  }, [conversationMenu]);
  useEffect(() => {
    const handleBlock = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (
        !target.closest(".chat-profile-menu .danger-text") ||
        !selected ||
        !liveUser ||
        liveUser.uid === "preview" ||
        selected.memberIds.length !== 2
      )
        return;
      const otherUid = selected.memberIds.find((id) => id !== liveUser.uid);
      if (!otherUid) return;
      event.preventDefault();
      void blockUser(liveUser.uid, otherUid)
        .then(() => {
          setBlockedUsers((old) =>
            old.includes(otherUid) ? old : [...old, otherUid],
          );
          setShowChatProfile(false);
          setSelected(null);
          setError("User blocked. You can unblock them from Profile settings.");
        })
        .catch(() => setError("Could not block this user."));
    };
    document.addEventListener("click", handleBlock, true);
    return () => document.removeEventListener("click", handleBlock, true);
  }, [selected, liveUser?.uid]);
  useEffect(() => {
    const handleViewProfile = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (
        target.textContent?.trim() !== "View profile" ||
        !target.closest(".chat-profile-menu") ||
        !selected ||
        !liveUser ||
        selected.memberIds.length !== 2
      )
        return;
      const otherUid = selected.memberIds.find((id) => id !== liveUser.uid);
      if (!otherUid) return;
      event.preventDefault();
      void getUserProfile(otherUid)
        .then((profile) =>
          setError(
            profile
              ? `${profile.displayName} · @${profile.username || "user"}${profile.bio ? ` — ${profile.bio}` : ""}`
              : "Profile unavailable.",
          ),
        )
        .catch(() => setError("Profile unavailable."));
    };
    document.addEventListener("click", handleViewProfile, true);
    return () => document.removeEventListener("click", handleViewProfile, true);
  }, [selected, liveUser?.uid]);
  useEffect(() => {
    if (
      !selected ||
      !liveUser ||
      liveUser.uid === "preview" ||
      selected.id.startsWith("preview-")
    )
      return;
    markConversationRead(selected.id, liveUser.uid).catch(() => undefined);
  }, [selected?.id, liveUser?.uid, messages.length]);
  const visible = useMemo(
    () =>
      conversations.filter((item) =>
        `${item.name} ${item.lastMessage || ""}`
          .toLowerCase()
          .includes(search.toLowerCase()),
      ),
    [conversations, search],
  );
  const onlineUsers = useMemo(() => {
    if (liveUser?.uid === "preview")
      return conversations.filter((item) => item.type !== "group" && item.active).slice(0, 8);
    return friendProfiles
      .filter((profile) => profile.activeStatus !== false && presenceNow - (profile.lastSeen?.toMillis() || 0) < 90000)
      .map((profile) => ({
        id: profile.uid,
        name: profile.displayName,
        memberIds: [liveUser?.uid || "", profile.uid],
        avatar: initials(profile.displayName),
        lastMessage: "",
        type: "direct" as const,
        active: true,
        lastSeen: profile.lastSeen,
      }))
      .slice(0, 8);
  }, [conversations, friendProfiles, liveUser?.uid, presenceNow]);
  if (loading)
    return (
      <main className="auth">
        <section className="auth-card">
          <div className="brand-mark">C</div>
          <h1>Co Chat</h1>
          <p>Connecting your account…</p>
        </section>
      </main>
    );
  if (!liveUser) return <AuthScreen onPreview={() => setPreview(true)} />;
  if (needsUsername && !preview)
    return (
      <UsernameSetup
        user={liveUser}
        onComplete={(username, displayName) => {
          localStorage.setItem(`cochat-username-${liveUser.uid}`, username);
          setProfileUsername(username);
          setProfileName(displayName);
          setNeedsUsername(false);
        }}
      />
    );
  const send = async (event: FormEvent) => {
    event.preventDefault();
    if ((!text.trim() && !selectedFile) || !selected) return;
    const value = text.trim();
    const file = selectedFile;
    if (value.length > 2000) {
      setError("Messages must be 2,000 characters or fewer.");
      return;
    }
    setText("");
    setSelectedFile(null);
    const target = replyTarget;
    setReplyTarget(null);
    if (selected.id.startsWith("preview-")) {
      setMessages((old) => {
        const next = [
          ...old,
          {
            id: String(Date.now()),
            senderId: "me",
            text: value || file?.name || "",
            replyTo: target
              ? { id: target.id, text: target.text, senderId: target.senderId }
              : null,
            attachment: file
              ? {
                  name: file.name,
                  url: URL.createObjectURL(file),
                  type: file.type,
                  size: file.size,
                }
              : null,
          },
        ];
        localStorage.setItem(
          `cochat-preview-${selected.id}`,
          JSON.stringify(next),
        );
        return next;
      });
      return;
    }
    try {
      await sendMessage(
        selected.id,
        liveUser.uid,
        value,
        file || undefined,
        target,
      );
    } catch (e) {
      setError(
        e instanceof Error
          ? e.message
          : "Message could not be sent. Check your connection.",
      );
    }
  };
  const startConversation = async (profile: UserProfile) => {
    try {
      const id = await createConversation(liveUser.uid, profile);
      if (!id) throw new Error("Firebase is not configured.");
      setShowNew(false);
      setSearch("");
      setPage("chats");
      setSelected({
        id,
        name: profile.displayName,
        avatar: initials(profile.displayName),
        memberIds: [liveUser.uid, profile.uid],
        lastMessage: "",
      });
    } catch (e) {
      setError(
        e instanceof Error
          ? e.message.replace("Firebase: ", "")
          : "Could not create that conversation.",
      );
    }
  };
  const logout = async () => {
    try {
      if (auth && !preview) await signOut(auth);
      setPreview(false);
      setUser(null);
      setSelected(null);
      setPage("chats");
    } catch {
      setError("Could not sign out. Please try again.");
    }
  };
  const save = async (event: FormEvent) => {
    event.preventDefault();
    if (preview) return;
    try {
      await saveProfile(liveUser.uid, {
        displayName: profileName,
        username: profileUsername,
        bio: profileBio,
        notificationsEnabled,
        discoverable,
        activeStatus,
      });
      await updateProfile(liveUser, { displayName: profileName });
      setProfileSaved(true);
      setError("");
      setTimeout(() => setProfileSaved(false), 2000);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Profile could not be saved.");
    }
  };
  const call = async (type: "audio" | "video") => {
    if (!selected || preview || selected.memberIds.length < 2) {
      setError("Sign in and start a conversation with another person to call.");
      return;
    }
    try {
      await createCall(selected.memberIds, type, liveUser.uid);
      setError(
        type === "audio"
          ? "Voice call request sent."
          : "Video call request sent.",
      );
    } catch {
      setError("Could not create the call request.");
    }
  };
  const activeGroupCount = selected?.type === "group"
    ? groupMembers.filter((member) => member.activeStatus !== false && Boolean(member.lastSeen) && presenceNow - (member.lastSeen?.toMillis() || 0) < 90000).length
    : 0;
  if (selected)
    return (
      <main className="app chat-screen">
        <header className="chat-header">
          <button className="icon" onClick={() => setSelected(null)}>
            ←
          </button>
          <button
            className="avatar profile-avatar"
            type="button"
            title="Open profile actions"
            onClick={() => setShowChatProfile(true)}
          >
            {selected.avatar}
          </button>
          <div>
            <strong>{selected.name}</strong>
            <small>
              {selected.type === "group" ? (
                <span className="group-active-summary"><span className="presence-dot" />{activeGroupCount} member{activeGroupCount === 1 ? " is" : "s are"} active now</span>
              ) : selected.id.startsWith("preview-") ? "Preview conversation" : (
                <span className={selected.active ? "active-presence" : ""}>
                  {presenceLabel(selected.active, selected.lastSeen)}
                </span>
              )}
            </small>
          </div>
          <button
            className="icon"
            title="Start audio call"
            onClick={() => {
              setVoiceRole("caller");
              setShowVoiceCall(true);
            }}
          >
            <svg className="call-icon" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M6.6 3.8 9.2 3c.7-.2 1.4.2 1.7.8l1.2 2.8c.2.5.1 1.1-.3 1.5L10.3 9.6a13.7 13.7 0 0 0 4.1 4.1l1.5-1.5c.4-.4 1-.5 1.5-.3l2.8 1.2c.6.3 1 1 .8 1.7l-.8 2.6c-.2.7-.9 1.1-1.6 1.1C11.1 18.5 5.5 12.9 5.5 5.4c0-.7.4-1.4 1.1-1.6Z" />
              <path d="M14.7 4.1a6.2 6.2 0 0 1 5.2 5.2M14.7 1.2a9.1 9.1 0 0 1 8.1 8.1" />
            </svg>
          </button>
        </header>
        {showChatProfile && (
          <div className="person-profile chat-profile-menu">
            <button
              className="icon close-profile"
              type="button"
              onClick={() => setShowChatProfile(false)}
            >
              ×
            </button>
            <div className="avatar large">{selected.avatar}</div>
            <h3>{selected.name}</h3>
            <small>
              {selected.type === "group"
                ? `${selected.memberIds.length} members · Admin: ${groupMembers.find((member) => member.uid === selected.adminId)?.displayName || "Group creator"}`
                : "Conversation profile"}
            </small>
            {selected.type === "group" && (
              <>
                <div className="group-member-list">
                  {groupMembers.map((member) => (
                    <div className="person-result" key={member.uid}>
                      <span className="avatar">
                        {initials(member.displayName)}
                      </span>
                      <span className="chat-copy">
                        <strong>
                          {member.displayName}
                          {member.uid === selected.adminId ? " · Admin" : ""}
                        </strong>
                        <span>@{member.username}</span>
                      </span>
                      {selected.adminId === liveUser.uid &&
                        member.uid !== liveUser.uid && (
                          <button
                            className="secondary compact"
                            type="button"
                            onClick={async () => {
                              await removeGroupMember(
                                selected.id,
                                liveUser.uid,
                                member.uid,
                              ).catch(() => undefined);
                              setGroupMembers((old) =>
                                old.filter((item) => item.uid !== member.uid),
                              );
                            }}
                          >
                            Remove
                          </button>
                        )}
                    </div>
                  ))}
                </div>
                <div className="profile-actions group-add-members">
                  <button className="secondary" type="button" onClick={() => setShowAddMembers(value => !value)}>
                    {showAddMembers ? "Close friend list" : "Add friends"}
                  </button>
                  {showAddMembers && (
                    <div className="group-friend-picker">
                      <small>Select accepted friends to add</small>
                      <input className="search" value={groupFriendSearch} onChange={event => setGroupFriendSearch(event.target.value)} placeholder="Search your friends" />
                      <div className="group-friend-results">
                      {groupFriends.filter(friend => !selected.memberIds.includes(friend.uid) && (!groupFriendSearch.trim() || `${friend.displayName} ${friend.username}`.toLowerCase().includes(groupFriendSearch.trim().toLowerCase()))).map(friend => (
                        <button className="person-result" type="button" key={friend.uid} onClick={async () => {
                          try {
                            await addGroupMembers(selected.id, liveUser.uid, [friend]);
                            setGroupMembers(old => [...old, friend]);
                            setSelected(old => old ? { ...old, memberIds: [...old.memberIds, friend.uid] } : old);
                            setGroupFriends(old => old.filter(item => item.uid !== friend.uid));
                          } catch (error) { setError(error instanceof Error ? error.message : "Could not add this friend."); }
                        }}>
                          <span className="avatar">{initials(friend.displayName)}</span>
                          <span className="chat-copy"><strong>{friend.displayName}</strong><span>@{friend.username}</span></span>
                          <span>＋</span>
                        </button>
                      ))}
                      {!groupFriends.some(friend => !selected.memberIds.includes(friend.uid) && (!groupFriendSearch.trim() || `${friend.displayName} ${friend.username}`.toLowerCase().includes(groupFriendSearch.trim().toLowerCase()))) && <small>No matching accepted friends.</small>}
                      </div>
                    </div>
                  )}
                </div>
                {selected.adminId === liveUser.uid && (
                  <div className="profile-actions">
                    <input
                      value={groupEditName}
                      onChange={(event) => setGroupEditName(event.target.value)}
                      maxLength={80}
                      placeholder="Group name"
                    />
                    <button
                      className="secondary"
                      type="button"
                      onClick={async () => {
                        await updateGroup(
                          selected.id,
                          liveUser.uid,
                          groupEditName,
                        ).catch(() => undefined);
                        setSelected((old) =>
                          old
                            ? { ...old, name: groupEditName.trim() || old.name }
                            : old,
                        );
                        setShowChatProfile(false);
                      }}
                    >
                      Save group name
                    </button>
                  </div>
                )}
              </>
            )}
            <div className="profile-actions">
              {selected.type !== "group" && (
                <button
                  className="secondary"
                  type="button"
                  onClick={() => setShowChatProfile(false)}
                >
                  View profile
                </button>
              )}
              {selected.type === "group" ? (
                <button className="secondary" type="button" onClick={async () => {
                  try { await leaveGroup(selected.id, liveUser.uid); setShowChatProfile(false); setSelected(null); setError("You left the group."); }
                  catch (error) { setError(error instanceof Error ? error.message : "Could not leave the group."); }
                }}>Leave group</button>
              ) : (
                <button className="secondary danger-text" type="button" onClick={() => setShowChatProfile(false)}>Block</button>
              )}
            </div>
          </div>
        )}
        {showVoiceCall && (
          <VoiceCall
            uid={liveUser.uid}
            otherUid={
              selected.memberIds.find((id) => id !== liveUser.uid) || ""
            }
            otherName={selected.name}
            role={voiceRole}
            onClose={() => setShowVoiceCall(false)}
          />
        )}
        <section className="messages">
          {messages.map((item) => {
            const mine =
              item.senderId === liveUser.uid || item.senderId === "me";
            const sender = mine
              ? profileName || "You"
              : senderNames[item.senderId] || "Loading…";
            return (
              <div className={`bubble ${mine ? "me" : ""}`} key={item.id}>
                {item.replyTo && (
                  <div className="reply-quote">
                    ↪ {item.replyTo.text || "Attachment"}
                  </div>
                )}
                {item.attachment &&
                  (item.attachment.type.startsWith("image/") ? (
                    <img
                      className="message-image"
                      src={item.attachment.url}
                      alt={item.attachment.name}
                    />
                  ) : (
                    <a
                      className="attachment"
                      href={item.attachment.url}
                      target="_blank"
                      rel="noreferrer"
                    >
                      📎 {item.attachment.name}
                    </a>
                  ))}
                    {selected.memberIds.length > 2 && (
                  <strong className="message-sender">{sender}</strong>
                )}
                {item.text && <span>{item.text}</span>}
                <small>
                  {formatTime(item.createdAt) || "now"}
                  {mine && (
                    <span
                      className={`read-receipt ${item.seenBy?.some((id) => selected.memberIds.includes(id) && id !== liveUser.uid) ? "seen" : ""}`}
                      title={item.seenBy?.some((id) => selected.memberIds.includes(id) && id !== liveUser.uid) ? "Seen" : "Delivered"}
                    >
                      {item.createdAt ? " · ✓✓" : " · ✓"}
                    </span>
                  )}
                  <button
                    className="reply-button"
                    type="button"
                    onClick={() => setReplyTarget(item)}
                  >
                    Reply
                  </button>
                  {mine && (
                    <button
                      className="reply-button"
                      type="button"
                      title="Unsend"
                      onClick={(event) => {
                        event.stopPropagation();
                        setMessageMenu(item);
                      }}
                    >
                      ⋯
                    </button>
                  )}
                </small>
              </div>
            );
          })}
        </section>
        {messageMenu && (
          <div className="message-menu">
            <button
              type="button"
              onClick={() => {
                void unsendMessage(selected.id, messageMenu.id).catch(() =>
                  setError("Could not unsend this message."),
                );
                setMessageMenu(null);
              }}
            >
              Unsend
            </button>
            <button
              type="button"
              onClick={() => {
                void navigator.clipboard?.writeText(messageMenu.text || "");
                setMessageMenu(null);
              }}
            >
              Copy text
            </button>
            <button
              type="button"
              onClick={() => {
                setForwardingMessage(messageMenu);
                setMessageMenu(null);
              }}
            >
              Forward
            </button>
          </div>
        )}
        {forwardingMessage && (
          <div className="forward-panel">
            <div className="section-title">
              FORWARD TO A FRIEND{" "}
              <button
                className="icon"
                type="button"
                onClick={() => setForwardingMessage(null)}
              >
                ×
              </button>
            </div>
            {conversations
              .filter(
                (item) => item.id !== selected.id && item.memberIds.length > 1,
              )
              .map((item) => (
                <button
                  className="person-result"
                  type="button"
                  key={item.id}
                  onClick={() => {
                    void sendMessage(
                      item.id,
                      liveUser.uid,
                      forwardingMessage.text,
                    )
                      .then(() => setForwardingMessage(null))
                      .catch(() => setError("Could not forward this message."));
                  }}
                >
                  <span className="avatar">{item.avatar}</span>
                  <span className="chat-copy">
                    <strong>{item.name}</strong>
                    <span>Send message</span>
                  </span>
                </button>
              ))}
          </div>
        )}
        {replyTarget && (
          <div className="reply-compose">
            Replying to: “{replyTarget.text || "attachment"}”
            <button
              type="button"
              className="icon"
              onClick={() => setReplyTarget(null)}
            >
              ×
            </button>
          </div>
        )}
        <form className="composer" onSubmit={send}>
          <label className="attach-button" title="Attach a file">
            📎
            <input
              type="file"
              onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
            />
          </label>
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={selectedFile ? selectedFile.name : "Write a message"}
          />
          <button className="primary">Send</button>
        </form>
      </main>
    );
  return (
    <main className="app">
      <header className="topbar">
        <div>
          <div className="brand-line">
            <span className="mini-mark">C</span>
            <strong>Co‑Chat</strong>
          </div>
          <div className="eyebrow">WELCOME BACK</div>
        </div>
        <div className="topbar-actions">
          {(page === "chats" || page === "communities") && (
            <button
              className="icon"
              type="button"
              title="Friend requests"
              onClick={() => {
                const next = !showFriendRequests;
                if (next && liveUser.uid !== "preview" && unseenFriendRequestIds.length) {
                  const key = `cochat-seen-friend-requests-${liveUser.uid}`;
                  let seen: string[] = [];
                  try { seen = JSON.parse(localStorage.getItem(key) || "[]"); } catch { seen = []; }
                  const merged = [...new Set([...seen, ...unseenFriendRequestIds])];
                  localStorage.setItem(key, JSON.stringify(merged));
                  setUnseenFriendRequestIds([]);
                }
                setShowFriendRequests(next);
              }}
            >
              <span className="bell-wrap">🔔{unseenFriendRequestIds.length > 0 && <span className="notification-dot" />}</span>
            </button>
          )}
          <button
            className="avatar profile-button"
            onClick={() => setPage("settings")}
          >
            {initials(liveUser.displayName || liveUser.email || "U")}
          </button>
        </div>
      </header>
      {(page === "chats" || page === "communities") && showFriendRequests && (
        <div className="notification-panel">
          <FriendZone uid={liveUser.uid} onMessage={startConversation} />
        </div>
      )}
      {incomingCall && (
        <IncomingCall
          name={incomingCallerName}
          onDecline={async () => {
            await declineCall(incomingCall.id).catch(() => undefined);
            setIncomingCall(null);
          }}
          onAccept={async () => {
            const caller = incomingCall.callerId
              ? await getUserProfile(incomingCall.callerId)
              : null;
            setSelected({
              id: incomingCall.id,
              name: caller?.displayName || "Incoming caller",
              avatar: initials(caller?.displayName || "IC"),
              memberIds: incomingCall.memberIds,
              lastMessage: "",
            });
            setIncomingCall(null);
            setVoiceRole("callee");
            setShowVoiceCall(true);
          }}
        />
      )}
      <section className="content">
        {error && (
          <div className="notice">
            {error}
            <button className="icon" onClick={() => setError("")}>
              ×
            </button>
          </div>
        )}
            {(page === "chats" || page === "communities") && (
          <>
            <input
              className="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search people and messages"
            />
            {page === "chats" && (
              <section className="online-section" aria-label="Users online">
                <div className="section-title">USERS ONLINE</div>
                <div className="online-tray">
                  {onlineUsers.map((item) => {
                    const profile = liveUser?.uid === "preview"
                      ? null
                      : friendProfiles.find((friend) => item.memberIds.includes(friend.uid) || friend.uid === item.id);
                    const name = profile?.displayName || item.name;
                    return (
                    <button
                      type="button"
                      className="online-person"
                      key={item.id}
                      onClick={() => profile ? void startConversation(profile) : setSelected(item)}
                    >
                      <span className="avatar is-active">
                        {profile ? initials(profile.displayName) : item.avatar}
                        <i className="active-dot" aria-label="Online" />
                      </span>
                      <span>{name.split(" ")[0]}</span>
                    </button>
                    );
                  })}
                  {!onlineUsers.length && <small>No friends are online right now.</small>}
                </div>
              </section>
            )}
            {page === "communities" && (
              <div className="chat-tools">
                <button
                  className="secondary compact"
                  type="button"
                  onClick={() => setShowGroup(true)}
                >
                  ＋ New group
                </button>
              </div>
            )}
            <div className="section-title">
              {page === "communities" ? "COMMUNITY CHATS" : "RECENT CONVERSATIONS"}
            </div>
            <div className="list">
              {visible
                .filter((item) =>
                  page === "communities" ? item.type === "group" : item.type !== "group",
                )
                .map((item) => (
                <button
                  className="chat-row"
                  key={item.id}
                  onClick={() => {
                    if (suppressConversationClick.current) {
                      suppressConversationClick.current = false;
                      return;
                    }
                    setSelected(item);
                  }}
                  onContextMenu={(event) => {
                    event.preventDefault();
                    setConversationMenu(item);
                  }}
                  onPointerDown={() => {
                    holdTimers.current[item.id] = window.setTimeout(() => {
                      suppressConversationClick.current = true;
                      setConversationMenu(item);
                    }, 550);
                  }}
                  onPointerUp={() =>
                    window.clearTimeout(holdTimers.current[item.id])
                  }
                  onPointerLeave={() =>
                    window.clearTimeout(holdTimers.current[item.id])
                  }
                >
                  <span className={`avatar ${item.active ? "is-active" : ""}`}>
                    {item.avatar}
                    {item.active && (
                      <i className="active-dot" aria-label="Online" />
                    )}
                  </span>
                  <span className="chat-copy">
                    <strong>{item.name}</strong>
                    <span className={item.unreadCount ? "unread-preview" : ""}>
                      {item.lastSenderId === liveUser.uid
                        ? item.lastMessageSeen
                          ? `Seen ${relativeMessageTime(item.lastMessageAt)}`
                          : `Sent ${relativeMessageTime(item.lastMessageAt)}`
                        : item.unreadCount
                          ? `${item.unreadCount > 4 ? "4+" : item.unreadCount} new message${item.unreadCount === 1 ? "" : "s"}`
                          : item.lastMessage
                            ? `Received ${relativeMessageTime(item.lastMessageAt)}`
                            : "Start a conversation"}
                    </span>
                  </span>
                </button>
              ))}
              {!visible.filter((item) =>
                page === "communities" ? item.type === "group" : item.type !== "group",
              ).length && (
                <div className="empty-state">No conversations found.</div>
              )}
            </div>
            {conversationMenu && (
              <div
                className="conversation-menu"
                role="dialog"
                aria-label="Conversation actions"
              >
                <button
                  className="icon close-profile"
                  type="button"
                  onClick={() => setConversationMenu(null)}
                >
                  ×
                </button>
                <strong>{conversationMenu.name}</strong>
                <button
                  className="secondary"
                  type="button"
                  onClick={() => {
                    setSelected(conversationMenu);
                    setConversationMenu(null);
                  }}
                >
                  Open chat
                </button>
                <button
                  className="danger"
                  type="button"
                  onClick={async () => {
                    setDeleteTarget(conversationMenu);
                    setConversationMenu(null);
                  }}
                >
                  Delete conversation
                </button>
              </div>
            )}
            {deleteTarget && (
              <div className="modal-backdrop">
                <section className="modal" role="dialog" aria-modal="true">
                  <h2>Delete conversation?</h2>
                  <p>This removes the conversation and its messages for everyone.</p>
                  <div className="group-step-actions">
                    <button className="secondary" type="button" onClick={() => setDeleteTarget(null)}>Cancel</button>
                    <button className="danger" type="button" onClick={async () => {
                      try {
                      await deleteConversation(
                        deleteTarget.id,
                        liveUser.uid,
                      );
                      setSelected((current) =>
                        current?.id === deleteTarget.id ? null : current,
                      );
                      setDeleteTarget(null);
                    } catch (e) {
                      setError(
                        e instanceof Error
                          ? e.message
                          : "Could not delete conversation.",
                      );
                    }
                    }}>Delete</button>
                  </div>
                </section>
              </div>
            )}
            {showNew && (
              <NewConversation
                uid={liveUser.uid}
                onSelect={startConversation}
                onClose={() => setShowNew(false)}
              />
            )}
            {showGroup && (
              <GroupCreator
                uid={liveUser.uid}
                onCreated={(conversation) => {
                  setShowGroup(false);
                  setSelected(conversation);
                }}
                onClose={() => setShowGroup(false)}
              />
            )}
          </>
        )}
        {(page === "search" || page === "discover") && (
          <SearchPanel uid={liveUser.uid} onSelect={startConversation} />
        )}
        {page === "status" && (
          <div className="hero-card coming-soon">
            <span>◉</span>
            <h2>Stories are coming soon</h2>
            <p>
              We’re focusing today’s release on fast, reliable conversations.
              Stories will follow in a future release.
            </p>
          </div>
        )}
        {(page === "profile" || page === "settings") && (
          <>
            <form className="profile-card" onSubmit={save}>
              <div className="avatar large">
                {initials(profileName || liveUser.email || "U")}
              </div>
              <h2>{profileName || "Co Chat member"}</h2>
              <p>{liveUser.email}</p>
              <label className="field-label">
                Bio
                <textarea
                  value={profileBio}
                  onChange={(e) => setProfileBio(e.target.value)}
                  maxLength={280}
                  placeholder="Tell your friends a little about you"
                />
              </label>
              <label className="field-label">
                Display name
                <input
                  value={profileName}
                  onChange={(e) => setProfileName(e.target.value)}
                  required
                />
              </label>
              <label className="field-label">
                Username
                <input
                  value={profileUsername}
                  onChange={(e) =>
                    setProfileUsername(
                      e.target.value
                        .replace(/[^a-zA-Z0-9_]/g, "")
                        .toLowerCase(),
                    )
                  }
                  minLength={3}
                  maxLength={24}
                  pattern="[a-z0-9_]+"
                  required
                />
                <small>
                  Unique, 3–24 characters: letters, numbers, and underscores.
                </small>
              </label>
              <button className="primary" disabled={preview}>
                {profileSaved ? "Saved ✓" : "Save profile"}
              </button>
            </form>
            <div className="settings">
              <button
                type="button"
                onClick={() => setDarkMode((value) => !value)}
              >
                ◐ Appearance <span>{darkMode ? "Dark" : "Light"}</span>
              </button>
              <button
                type="button"
                onClick={() => setDiscoverable((value) => !value)}
              >
                🔒 Discoverable in search{" "}
                <span>{discoverable ? "On" : "Off"}</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveStatus((value) => !value)}
              >
                🟢 Active status <span>{activeStatus ? "On" : "Off"}</span>
              </button>
              <button type="button" onClick={logout}>
                ↪ Log out <span>›</span>
              </button>
            </div>
            <div className="settings blocked-settings">
              <div className="section-title">BLOCKED USERS</div>
              {blockedUsers.length ? (
                blockedUsers.map((blockedId) => (
                  <div className="person-result" key={blockedId}>
                    <span className="chat-copy">
                      <strong>Co-Chat user</strong>
                      <span>Details hidden</span>
                    </span>
                    <button
                      className="secondary compact"
                      type="button"
                      onClick={async () => {
                        await unblockUser(liveUser.uid, blockedId).catch(
                          () => undefined,
                        );
                        setBlockedUsers((old) =>
                          old.filter((id) => id !== blockedId),
                        );
                      }}
                    >
                      Unblock
                    </button>
                  </div>
                ))
              ) : (
                <p className="empty-state">No blocked users.</p>
              )}
            </div>
          </>
        )}
      </section>
      <Nav page={page} setPage={setPage} />
    </main>
  );
}

function IncomingCall({
  name,
  onAccept,
  onDecline,
}: {
  name: string;
  onAccept: () => void;
  onDecline: () => void;
}) {
  return (
    <div className="call-backdrop">
      <section className="call-card">
        <div className="avatar large">{initials(name)}</div>
        <p className="eyebrow">INCOMING VOICE CALL</p>
        <h2>{name}</h2>
        <p>Wants to talk with you</p>
        <div className="call-actions">
          <button className="secondary" onClick={onDecline}>
            Decline
          </button>
          <button className="primary" onClick={onAccept}>
            Accept
          </button>
        </div>
      </section>
    </div>
  );
}

function FriendZone({
  uid,
  onMessage,
}: {
  uid: string;
  onMessage: (profile: UserProfile) => void;
}) {
  const [requests, setRequests] = useState<
    import("./services/chat").FriendRequest[]
  >([]);
  const [profiles, setProfiles] = useState<Record<string, UserProfile>>({});
  const [focused, setFocused] = useState<UserProfile | null>(null);
  const [blocked, setBlocked] = useState<string[]>([]);
  const [profileExpanded, setProfileExpanded] = useState(false);
  useEffect(() => watchFriendRequests(uid, setRequests), [uid]);
  useEffect(() => {
    listBlockedUsers(uid)
      .then((items) => setBlocked(items.map((item) => item.blockedId)))
      .catch(() => undefined);
  }, [uid]);
  useEffect(() => {
    const ids = [
      ...new Set(
        requests
          .flatMap((item) => [item.fromUid, item.toUid])
          .filter((id) => id !== uid),
      ),
    ];
    Promise.all(
      ids.map(async (id) => [id, await getUserProfile(id)] as const),
    ).then((items) =>
      setProfiles((old) => ({
        ...old,
        ...Object.fromEntries(
          items.filter((item): item is [string, UserProfile] =>
            Boolean(item[1]),
          ),
        ),
      })),
    );
  }, [requests, uid]);
  const incoming = requests.filter(
    (item) => item.toUid === uid && !blocked.includes(item.fromUid),
  );
  const friends = requests.filter(
    (item) =>
      item.status === "accepted" &&
      !blocked.includes(item.fromUid === uid ? item.toUid : item.fromUid),
  );
  return (
    <div className="friend-zone">
      <div className="section-title">FRIEND ZONE</div>
      {incoming.length > 0 && (
        <div className="friend-section">
          <strong>Friend requests</strong>
          {incoming.map((item) => {
            const profile = profiles[item.fromUid];
            return (
              <div className="person-result" key={item.id}>
                <button
                  className="avatar profile-avatar"
                  type="button"
                  onClick={() =>
                    profile && (setFocused(profile), setProfileExpanded(false))
                  }
                >
                  {initials(profile?.displayName || "U")}
                </button>
                <span className="chat-copy">
                  <strong>{profile?.displayName || "Someone"}</strong>
                  <span>@{profile?.username || "user"}</span>
                </span>
                <button
                  className="secondary compact"
                  type="button"
                  onClick={() =>
                    respondToFriendRequest(item.fromUid, uid, true)
                  }
                >
                  Accept
                </button>
                <button
                  className="icon"
                  type="button"
                  onClick={() =>
                    respondToFriendRequest(item.fromUid, uid, false)
                  }
                >
                  ×
                </button>
              </div>
            );
          })}
        </div>
      )}
      {friends.length > 0 && (
        <div className="friend-section">
          <strong>Your friends</strong>
          {friends.map((item) => {
            const other =
              profiles[item.fromUid === uid ? item.toUid : item.fromUid];
            return (
              <div className="person-result" key={item.id}>
                <button
                  className="avatar profile-avatar"
                  type="button"
                  onClick={() => {
                    if (other) {
                      setFocused(other);
                      setProfileExpanded(false);
                    }
                  }}
                >
                  {initials(other?.displayName || "U")}
                </button>
                <span className="chat-copy">
                  <strong>{other?.displayName || "Friend"}</strong>
                  <span>@{other?.username || "user"}</span>
                </span>
                {other && (
                  <button
                    className="secondary compact"
                    type="button"
                    onClick={() => onMessage(other)}
                  >
                    Message
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}
      {!incoming.length && !friends.length && (
        <div className="empty-state">
          Your friend zone is empty. Search for someone to connect.
        </div>
      )}
      {focused && (
        <div className="person-profile">
          <button
            className="icon close-profile"
            type="button"
            onClick={() => setFocused(null)}
          >
            ×
          </button>
          <div className="avatar large">{initials(focused.displayName)}</div>
          <h3>{focused.displayName}</h3>
          <p>@{focused.username}</p>
          {profileExpanded && <small>Friend on Co-Chat · Public profile</small>}
          <div className="profile-actions">
            <button
              className="primary"
              type="button"
              onClick={() => {
                setFocused(null);
                onMessage(focused);
              }}
            >
              Message
            </button>
            <button
              className="secondary"
              type="button"
              onClick={() => setProfileExpanded(true)}
            >
              View profile
            </button>
            <button
              className="secondary danger-text"
              type="button"
              onClick={async () => {
              try {
                  await blockUser(uid, focused.uid);
                  setBlocked((old) => [...old, focused.uid]);
                  setFocused(null);
                } catch {
                  setFocused(null);
                }
              }}
            >
              Block
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function SearchPanel({
  uid,
  onSelect,
}: {
  uid: string;
  onSelect: (profile: UserProfile) => void;
}) {
  const [term, setTerm] = useState("");
  const [history, setHistory] = useState<
    Array<{ uid: string; displayName: string; username: string }>
  >(() => {
    try {
      const stored = JSON.parse(
        localStorage.getItem(`cochat-search-history-${uid}`) || "[]",
      );
      return Array.isArray(stored)
        ? stored.filter((item) => item && typeof item === "object" && item.uid)
        : [];
    } catch {
      return [];
    }
  });
  const [results, setResults] = useState<UserProfile[]>([]);
  const [relationships, setRelationships] = useState<Record<string, string>>(
    {},
  );
  const [actionError, setActionError] = useState("");
  const [focused, setFocused] = useState<UserProfile | null>(null);
  const [profileExpanded, setProfileExpanded] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      if (term.trim())
        findUsers(term, uid)
          .then(setResults)
          .catch(() => setResults([]));
      else setResults([]);
    }, 250);
    return () => clearTimeout(timer);
  }, [term, uid]);
  useEffect(() => {
    Promise.all(
      results.map(
        async (profile) =>
          [profile.uid, await getFriendship(uid, profile.uid)] as const,
      ),
    ).then((items) => setRelationships(Object.fromEntries(items)));
  }, [results, uid]);
  const remember = (profile: UserProfile) => {
    const next = [
      {
        uid: profile.uid,
        displayName: profile.displayName,
        username: profile.username,
      },
      ...history.filter((item) => item.uid !== profile.uid),
    ].slice(0, 8);
    setHistory(next);
    localStorage.setItem(`cochat-search-history-${uid}`, JSON.stringify(next));
    setProfileExpanded(false);
  };
  const action = async (profile: UserProfile) => {
    setActionError("");
    const relationship = relationships[profile.uid] || "none";
    try {
      if (relationship === "friends") {
        remember(profile);
        onSelect(profile);
      } else if (relationship === "incoming") {
        throw new Error(
          "This person has already sent you a request. Open the bell in Chats to review it.",
        );
      } else if (relationship === "none") {
        await sendFriendRequest(uid, profile.uid);
        setRelationships((old) => ({ ...old, [profile.uid]: "requested" }));
      }
    } catch (error) {
      setActionError(
        error instanceof Error
          ? error.message
          : "Could not update this connection.",
      );
    }
  };
  return (
    <section className="search-panel">
      <p className="eyebrow">FIND PEOPLE</p>
      <h2>Search Co‑Chat</h2>
      <input
        autoFocus
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        placeholder="Search by username"
      />
      {actionError && (
        <div className="notice">
          {actionError}
          <button
            className="icon"
            type="button"
            onClick={() => setActionError("")}
          >
            ×
          </button>
        </div>
      )}
      {history.length > 0 && (
        <div className="search-history">
          <div className="section-title">
            RECENT PROFILES{" "}
            <button
              className="icon"
              type="button"
              onClick={() => {
                setHistory([]);
                localStorage.removeItem(`cochat-search-history-${uid}`);
              }}
            >
              Clear
            </button>
          </div>
          {history.map((item) => (
            <button
              className="person-result history-profile"
              type="button"
              key={item.uid}
              onClick={() => {
                setTerm(item.username);
                remember(item as UserProfile);
              }}
            >
              <span className="avatar">{initials(item.displayName)}</span>
              <span className="chat-copy">
                <strong>{item.displayName}</strong>
                <span>@{item.username}</span>
              </span>
            </button>
          ))}
        </div>
      )}
      <div className="list">
        {results.map((profile) => {
          const relationship = relationships[profile.uid] || "loading";
          return (
            <div
              className="person-result"
              key={profile.uid}
              onClick={() => remember(profile)}
            >
              <button
                className="avatar profile-avatar"
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  setFocused(profile);
                }}
              >
                {initials(profile.displayName)}
              </button>
              <span className="chat-copy">
                <strong>{profile.displayName}</strong>
                <span>@{profile.username}</span>
              </span>
              <button
                className="secondary compact"
                type="button"
                  disabled={
                  relationship === "loading"
                }
                onClick={(event) => {
                  event.stopPropagation();
                  if (relationship === "requested")
                    void cancelFriendRequest(uid, profile.uid)
                      .then(() =>
                        setRelationships((old) => ({ ...old, [profile.uid]: "none" })),
                      )
                      .catch(() => setActionError("Could not cancel this request."));
                  else if (relationship === "friends" || relationship === "none")
                    void action(profile);
                  else setFocused(profile);
                }}
              >
                {relationship === "friends"
                  ? "Message"
                  : relationship === "requested"
                    ? "Requested"
                    : relationship === "incoming"
                      ? "Pending request"
                      : "Add friend"}
              </button>
            </div>
          );
        })}
        {term && !results.length && (
          <div className="empty-state">No matching people yet.</div>
        )}
      </div>
      {focused && (
        <div className="person-profile">
          <button
            className="icon close-profile"
            type="button"
            onClick={() => setFocused(null)}
          >
            ×
          </button>
          <div className="avatar large">{initials(focused.displayName)}</div>
          <h3>{focused.displayName}</h3>
          <p>@{focused.username}</p>
          <small>
            {relationships[focused.uid] === "friends"
              ? "Friend on Co-Chat"
              : "Co-Chat profile"}
          </small>
          {relationships[focused.uid] === "friends" && (
            <button
              className="primary"
              type="button"
              onClick={() => {
                setFocused(null);
                onSelect(focused);
              }}
            >
              Message
            </button>
          )}
          {profileExpanded && (
            <div className="public-profile-details">
              <p>{focused.bio || "No bio added yet."}</p>
              <small>Username: @{focused.username}</small>
              <small>
                {focused.activeStatus === false
                  ? "Active status hidden"
                  : "Discoverable on Co-Chat"}
              </small>
            </div>
          )}
        </div>
      )}
    </section>
  );
}

function GroupCreator({
  uid,
  onCreated,
  onClose,
}: {
  uid: string;
  onCreated: (conversation: Conversation) => void;
  onClose: () => void;
}) {
  const [name, setName] = useState("");
  const [term, setTerm] = useState("");
  const [results, setResults] = useState<UserProfile[]>([]);
  const [friendPool, setFriendPool] = useState<UserProfile[]>([]);
  const [members, setMembers] = useState<UserProfile[]>([]);
  const [step, setStep] = useState<1 | 2>(1);
  const [error, setError] = useState("");
  useEffect(() => {
    listFriends(uid)
      .then(setFriendPool)
      .catch(() => setFriendPool([]));
  }, [uid]);
  useEffect(() => {
    const normalized = term.trim().toLowerCase();
    setResults(
      friendPool.filter(
        (item) =>
          !members.some((member) => member.uid === item.uid) &&
          (!normalized ||
            item.username.toLowerCase().includes(normalized) ||
            item.displayName.toLowerCase().includes(normalized)),
      ),
    );
  }, [term, friendPool, members]);
  const create = async () => {
    if (members.length < 2) {
      setError("Choose at least two friends first.");
      return;
    }
    try {
      const id = await createGroup(uid, name, members);
      onCreated({
        id,
        name: name.trim() || "New group",
        avatar: initials(name || "Group"),
        memberIds: [uid, ...members.map((member) => member.uid)],
        type: "group",
        adminId: uid,
        lastMessage: "",
      });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not create group.");
    }
  };
  return (
    <div className="modal-backdrop">
      <section className="modal group-creator">
        <header>
          <div>
            <p className="eyebrow">STEP {step} OF 2</p>
            <h2>{step === 1 ? "Choose friends" : "Name your group"}</h2>
          </div>
          <button className="icon" type="button" onClick={onClose}>
            ×
          </button>
        </header>
        {step === 1 ? (
          <>
            <p className="modal-hint">
              Add at least two accepted friends. You’ll be the group admin.
            </p>
            <input
              autoFocus
              value={term}
              onChange={(e) => setTerm(e.target.value)}
              placeholder="Search accepted friends by username"
            />
            {members.length > 0 && (
              <div className="selected-members">
                {members.map((member) => (
                  <button
                    className="secondary compact"
                    type="button"
                    key={member.uid}
                    onClick={() =>
                      setMembers((old) =>
                        old.filter((item) => item.uid !== member.uid),
                      )
                    }
                  >
                    {member.displayName} ×
                  </button>
                ))}
              </div>
            )}
            <div className="list">
              {results.map((profile) => (
                <button
                  className="person-result"
                  type="button"
                  key={profile.uid}
                  onClick={() => {
                    setMembers((old) => [...old, profile]);
                    setTerm("");
                  }}
                >
                  <span className="avatar">
                    {initials(profile.displayName)}
                  </span>
                  <span className="chat-copy">
                    <strong>{profile.displayName}</strong>
                    <span>@{profile.username}</span>
                  </span>
                  <span>＋</span>
                </button>
              ))}
            </div>
            <button
              className="primary"
              type="button"
              disabled={members.length < 2}
              onClick={() => {
                setError("");
                setStep(2);
              }}
            >
              Continue with {members.length} friend
              {members.length === 1 ? "" : "s"}
            </button>
          </>
        ) : (
          <>
            <div className="group-preview">
              <div className="avatar large">{initials(name || "Group")}</div>
              <strong>{members.length + 1} members</strong>
              <small>
                {members.map((member) => member.displayName).join(", ")}
              </small>
            </div>
            <label className="field-label">
              Group name
              <input
                autoFocus
                value={name}
                onChange={(e) => setName(e.target.value)}
                maxLength={80}
                placeholder="e.g. Weekend crew"
              />
            </label>
            {error && <p className="error-text">{error}</p>}
            <div className="group-step-actions">
              <button
                className="secondary"
                type="button"
                onClick={() => setStep(1)}
              >
                Back
              </button>
              <button
                className="primary"
                type="button"
                onClick={() => void create()}
              >
                Create group
              </button>
            </div>
          </>
        )}
      </section>
    </div>
  );
}

function NewConversation({
  uid,
  onSelect,
  onClose,
}: {
  uid: string;
  onSelect: (profile: UserProfile) => void;
  onClose: () => void;
}) {
  const [term, setTerm] = useState("");
  const [results, setResults] = useState<UserProfile[]>([]);
  const [focused, setFocused] = useState<UserProfile | null>(null);
  useEffect(() => {
    const timer = setTimeout(() => {
      if (term.trim())
        findUsers(term, uid)
          .then(setResults)
          .catch(() => setResults([]));
      else setResults([]);
    }, 250);
    return () => clearTimeout(timer);
  }, [term, uid]);
  return (
    <div className="modal-backdrop">
      <section className="modal">
        <header>
          <div>
            <p className="eyebrow">FIND PEOPLE</p>
            <h2>New conversation</h2>
          </div>
          <button className="icon" onClick={onClose}>
            ×
          </button>
        </header>
        <input
          autoFocus
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          placeholder="Search by username"
        />
        <div className="list">
          {results.map((profile) => (
            <div className="person-result" key={profile.uid}>
              <span className="avatar">{initials(profile.displayName)}</span>
              <span className="chat-copy">
                <strong>{profile.displayName}</strong>
                <span>@{profile.username}</span>
              </span>
              <button
                className="secondary compact"
                onClick={() => onSelect(profile)}
              >
                Message
              </button>
              <button
                className="icon"
                title="View profile"
                onClick={() => setFocused(profile)}
              >
                ⋯
              </button>
            </div>
          ))}
          {term && !results.length && (
            <div className="empty-state">No matching people yet.</div>
          )}
        </div>
        {focused && (
          <div className="person-profile">
            <button
              className="icon close-profile"
              onClick={() => setFocused(null)}
            >
              ×
            </button>
            <div className="avatar large">{initials(focused.displayName)}</div>
            <h3>{focused.displayName}</h3>
            <p>@{focused.username}</p>
            <small>Discoverable on Co-Chat</small>
            <button className="primary" onClick={() => onSelect(focused)}>
              Message {focused.displayName.split(" ")[0]}
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
