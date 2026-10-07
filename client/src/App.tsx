import { FormEvent, useCallback, useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signInWithCredential,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  sendEmailVerification,
  signOut,
  updateProfile,
  type User,
} from "firebase/auth";
import { auth, firebaseReady, googleProvider } from "./firebase";
import { supabaseReady, verifyFirebaseIdentity } from "./supabase";
import {
  addGroupMembers,
  blockUser,
  cancelFriendRequest,
  createCall,
  createConversation,
  isSupabaseChatEnabled,
  createGroup,
  createStory,
  declineCall,
  deleteConversation,
  ensureUserProfile,
  findUsers,
  getFriendship,
  getStudyLeaderboard,
  getUserProfile,
  listBlockedUsers,
  listFriends,
  leaveGroup,
  markConversationRead,
  removeFriend,
  removeGroupMember,
  respondToFriendRequest,
  saveProfile,
  saveStudySession,
  saveTheme,
  sendFriendRequest,
  sendMessage,
  deleteMessageForMe,
  unblockUser,
  unsendMessage,
  updateGroup,
  touchPresence,
  updateStudyPresence,
  watchCalls,
  watchConversations,
  watchFriendRequests,
  watchMessages,
  watchStories,
  type CallRecord,
  type ChatAttachment,
  type ChatMessage,
  type Conversation,
  type Story,
  type StudyLeaderboardEntry,
  type UserProfile,
} from "./services/chat";
import { attachTwittCommentMedia, attachTwittMedia, createTwitt as createRemoteTwitt, createTwittComment, deleteTwitt, deleteTwittComment, hideTwitt, loadTwittComments, loadTwittPage, recordTwittView, toggleTwittCommentLike, toggleTwittLike, type TwittAttachment, type TwittComment } from "./services/twitts";
import { StorageManager } from "./services/storageManager";
import { notifyIncomingMessage, registerFcmNotifications } from "./services/notifications";
import "./index.css";
import "./group-friend.css";
import "./community-feed.css";
import "./discovery-media.css";
import VoiceCall from "./components/VoiceCall";
import GroupVoiceCall from "./components/GroupVoiceCall";
import Avatar from "./components/Avatar";
import { Capacitor } from "@capacitor/core";
import { FirebaseAuthentication } from "@capacitor-firebase/authentication";

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
  const timestamp = lastSeen?.toMillis?.() || 0;
  if (active && timestamp > 0 && Date.now() - timestamp < 90000) return "Active now";
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
  const [notice, setNotice] = useState("");
  const [busy, setBusy] = useState(false);
  const friendlyAuthError = (value: unknown, fallback: string) => {
    const code = typeof value === "object" && value !== null && "code" in value ? String((value as { code?: string }).code) : "";
    const messages: Record<string, string> = {
      "auth/invalid-credential": "That email or password is incorrect.",
      "auth/email-already-in-use": "An account already exists with this email.",
      "auth/weak-password": "Choose a password with at least 6 characters.",
      "auth/invalid-email": "Enter a valid email address.",
      "auth/popup-closed-by-user": "The Google sign-in window was closed.",
      "auth/network-request-failed": "Check your internet connection and try again.",
    };
    return messages[code] || (value instanceof Error ? value.message.replace("Firebase: ", "").replace(/ \(auth\/[\w-]+\)\.?$/, "") : fallback);
  };
  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!auth || busy) return;
    setError("");
    setNotice("");
    setBusy(true);
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
        await sendEmailVerification(result.user);
      } else
        await signInWithEmailAndPassword(
          auth,
          String(data.get("email")),
          String(data.get("password")),
        );
    } catch (e) {
      setError(friendlyAuthError(e, "Unable to sign in."));
    } finally {
      setBusy(false);
    }
  };
  const google = async () => {
    if (!auth || busy) return;
    setError("");
    setNotice("");
    setBusy(true);
    try {
      const isAndroid = Capacitor.isNativePlatform() && Capacitor.getPlatform() === "android";
      if (isAndroid) {
        const result = await FirebaseAuthentication.signInWithGoogle();
        const credential = result.credential;
        if (!credential?.idToken) throw new Error("Google sign-in did not return an ID token.");
        await signInWithCredential(auth, GoogleAuthProvider.credential(credential.idToken, credential.accessToken));
      } else {
        await signInWithPopup(auth, googleProvider);
      }
    } catch (e) {
      setError(friendlyAuthError(e, "Google sign-in failed."));
    } finally {
      setBusy(false);
    }
  };
  const resetPassword = async () => {
    if (!auth || busy) return;
    const email = window.prompt("Enter the email for your Co-Chat account:")?.trim();
    if (!email) return;
    setError("");
    setNotice("");
    setBusy(true);
    try {
      await sendPasswordResetEmail(auth, email);
      setNotice("Password reset instructions sent. Check your email.");
    } catch (e) {
      setError(friendlyAuthError(e, "Could not send password reset instructions."));
    } finally {
      setBusy(false);
    }
  };
  return (
    <main className="auth auth-shell">
      <section className="auth-showcase" aria-label="Co-Chat introduction">
        <div className="auth-brand"><span className="brand-mark">C</span><span>Co-Chat</span></div>
        <div className="auth-showcase-copy">
          <span className="auth-kicker">A calmer place to connect</span>
          <h1>Make space for the conversations that matter.</h1>
          <p>Study together, share the small wins, and stay close to the people who keep you moving.</p>
        </div>
        <div className="auth-feature-grid">
          <span><b>01</b><strong>Focus together</strong><small>Turn study time into momentum.</small></span>
          <span><b>02</b><strong>Find your circle</strong><small>Meet people learning beside you.</small></span>
          <span><b>03</b><strong>Keep it personal</strong><small>Your space, your pace, your people.</small></span>
        </div>
        <div className="auth-orb auth-orb-one" /><div className="auth-orb auth-orb-two" />
      </section>
      <section className="auth-card auth-panel">
        <div className="auth-panel-heading">
          <span className="auth-panel-eyebrow">Welcome back</span>
          <h2>{mode === "signin" ? "Sign in to Co-Chat" : "Create your Co-Chat account"}</h2>
          <p>{mode === "signin" ? "Pick up exactly where you left off." : "It only takes a minute to get started."}</p>
        </div>
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
                type="button"
                className={mode === "signin" ? "active" : ""}
                onClick={() => setMode("signin")}
                disabled={busy}
              >
                Sign in
              </button>
              <button
                type="button"
                className={mode === "signup" ? "active" : ""}
                onClick={() => setMode("signup")}
                disabled={busy}
              >
                Create account
              </button>
            </div>
            <form className="auth-form" onSubmit={submit} aria-busy={busy}>
              {mode === "signup" && (
                <label className="auth-field">
                  <span>Display name</span>
                  <input name="name" autoComplete="name" required placeholder="Your name" disabled={busy} />
                </label>
              )}
              <label className="auth-field">
                <span>Email address</span>
                <input
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="you@example.com"
                  disabled={busy}
                />
              </label>
              <label className="auth-field">
                <span>Password</span>
                <input
                  name="password"
                  type="password"
                  autoComplete={mode === "signin" ? "current-password" : "new-password"}
                  minLength={6}
                  required
                  placeholder="At least 6 characters"
                  disabled={busy}
                />
              </label>
              {error && <p className="error-text">{error}</p>}
              {notice && <p className="notice">{notice}</p>}
              <button className="primary" disabled={busy}>
                {busy ? "Connecting…" : mode === "signin" ? "Sign in" : "Create account"}
              </button>
            </form>
            <button className="google-button" onClick={google} disabled={busy}>
              {busy ? "Connecting…" : "Continue with Google"}
            </button>
            {mode === "signin" && (
              <button className="secondary compact" type="button" onClick={() => void resetPassword()} disabled={busy}>
                Forgot password?
              </button>
            )}
            <div className="auth-helper"><span>⌁</span>Your account syncs securely across devices.</div>
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
        ["study", "◷", "Study"],
        ["communities", "👥", "Communities"],
        ["search", "⌕", "People"],
        ["discover", "✦", "Discover"],
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

type StudyTask = { id: string; title: string; kind: "daily" | "personal"; action: "timer" | "discover"; startedAt?: number; completedAt?: number };
const studyRecommendations = ["Solve five focused problems", "Revise one difficult chapter", "Study for 60 minutes", "Answer one student’s doubt", "Make short revision notes", "Complete a timed practice set"];
const currentStudyWeekKey = () => { const date = new Date(); date.setHours(0, 0, 0, 0); date.setDate(date.getDate() - ((date.getDay() + 6) % 7)); return date.toISOString().slice(0, 10); };
const studyTaskAction = (title: string): StudyTask["action"] => /answer.*doubt|help.*student/i.test(title) ? "discover" : "timer";
const dailyStudyTasks = (dayNumber: number): StudyTask[] => {
  let seed = Math.abs(dayNumber * 9301 + 49297) % 233280;
  const choices = studyRecommendations.map((title, index) => ({ title, index }));
  for (let index = choices.length - 1; index > 0; index -= 1) {
    seed = (seed * 9301 + 49297) % 233280;
    const swap = Math.floor((seed / 233280) * (index + 1));
    [choices[index], choices[swap]] = [choices[swap], choices[index]];
  }
  return choices.slice(0, 2).map(({ title }, offset) => ({ id: `daily-${dayNumber}-${offset}`, title, kind: "daily" as const, action: studyTaskAction(title) }));
};

function StudyTaskSheet({ tasks, onClose, onStart, onComplete, onAdd, onRemove }: { tasks: StudyTask[]; onClose: () => void; onStart: (task: StudyTask) => void; onComplete: (id: string) => void; onAdd: (title: string) => void; onRemove: (id: string) => void }) {
  const [draft, setDraft] = useState("");
  const active = tasks.filter((task) => task.startedAt && !task.completedAt);
  const recommended = tasks.filter((task) => task.kind === "daily");
  const personal = tasks.filter((task) => task.kind === "personal");
  const submit = (event: FormEvent) => { event.preventDefault(); const title = draft.trim(); if (!title) return; onAdd(title); setDraft(""); };
  const taskRow = (task: StudyTask) => <article className={`task-row ${task.completedAt ? "completed" : task.startedAt ? "active" : ""}`} key={task.id}><span className="task-status">{task.completedAt ? "✓" : task.startedAt ? "◷" : "○"}</span><div><strong>{task.title}</strong><small>{task.completedAt ? "Completed today" : task.startedAt ? "In progress" : task.action === "discover" ? "Opens Discover to help someone" : task.kind === "daily" ? "Picked for you today" : "Your personal task"}</small></div>{task.completedAt ? <span className="task-finished">Done</span> : task.startedAt ? <button className="secondary compact" type="button" onClick={() => onComplete(task.id)}>Complete</button> : <button className="primary compact" type="button" onClick={() => onStart(task)}>{task.action === "discover" ? "Open" : "Start"}</button>}{task.kind === "personal" && !task.startedAt && !task.completedAt && <button className="task-remove" type="button" aria-label={`Remove ${task.title}`} onClick={() => onRemove(task.id)}>×</button>}</article>;
  return <div className="task-sheet-backdrop" role="presentation" onMouseDown={onClose}><section className="task-sheet" role="dialog" aria-modal="true" aria-label="Study tasks" onMouseDown={(event) => event.stopPropagation()}><div className="sheet-handle"/><header className="task-sheet-header"><button className="icon" type="button" aria-label="Close tasks" onClick={onClose}>×</button><div><strong>Today’s tasks</strong><small>{active.length} in progress · {tasks.filter((task) => task.completedAt).length} complete</small></div><span>✦</span></header><div className="task-sheet-scroll"><section><p className="sheet-label">RECOMMENDED FOR YOU</p>{recommended.map(taskRow)}</section><section><div className="task-section-heading"><p className="sheet-label">MY TASKS</p><small>{personal.length}/5</small></div>{personal.map(taskRow)}{!personal.length && <p className="task-empty">Create optional tasks for anything you want to finish today.</p>}<form className="task-create" onSubmit={submit}><input value={draft} onChange={(event) => setDraft(event.target.value.slice(0, 80))} placeholder={personal.length >= 5 ? "Maximum 5 personal tasks" : "Create a personal task"} disabled={personal.length >= 5}/><button className="secondary compact" type="submit" disabled={!draft.trim() || personal.length >= 5}>Add</button></form></section></div></section></div>;
}

function TimerSetupSheet({ initialSeconds, onClose, onApply }: { initialSeconds: number; onClose: () => void; onApply: (seconds: number) => void }) {
  const [hours, setHours] = useState(Math.floor(initialSeconds / 3600));
  const [minutes, setMinutes] = useState(Math.floor((initialSeconds % 3600) / 60) || (initialSeconds ? 0 : 25));
  const seconds = hours * 3600 + minutes * 60;
  return <div className="task-sheet-backdrop" role="presentation" onMouseDown={onClose}><section className="timer-setup-sheet" role="dialog" aria-modal="true" aria-label="Set focus timer" onMouseDown={(event) => event.stopPropagation()}><div className="sheet-handle"/><header className="timer-setup-header"><button className="icon" type="button" aria-label="Close timer setup" onClick={onClose}>×</button><div><strong>Set focus timer</strong><small>Choose how long you want to study</small></div><span>◷</span></header><div className="timer-picker"><label><span>Hours</span><select value={hours} onChange={(event) => setHours(Number(event.target.value))}>{Array.from({ length: 9 }, (_, value) => <option value={value} key={value}>{value}</option>)}</select></label><b>:</b><label><span>Minutes</span><select value={minutes} onChange={(event) => setMinutes(Number(event.target.value))}>{[0, 5, 10, 15, 20, 25, 30, 45, 50, 55].map((value) => <option value={value} key={value}>{String(value).padStart(2, "0")}</option>)}</select></label></div><div className="timer-presets">{[[25, "25 min"], [50, "50 min"], [60, "1 hour"], [90, "1h 30m"]].map(([value, label]) => <button type="button" key={value} onClick={() => { setHours(Math.floor(Number(value) / 60)); setMinutes(Number(value) % 60); }}>{label}</button>)}</div><button className="primary timer-apply" type="button" disabled={!seconds} onClick={() => onApply(seconds)}>Use {hours ? `${hours}h ` : ""}{minutes ? `${minutes}m` : ""} timer</button></section></div>;
}

function studyMinutes(seconds: number) {
  return `${Math.floor(seconds / 60)} min`;
}

function LeaderboardPodiumCard({ entry, rank, currentUid, mode }: { entry?: StudyLeaderboardEntry; rank: 1 | 2 | 3; currentUid: string; mode: "friends" | "public" }) {
  const medal = rank === 1 ? "🏆" : rank === 2 ? "🥈" : "🥉";
  return <article className={`leaderboard-podium-card rank-${rank}`}>
    <span className="leaderboard-medal" aria-label={`Rank ${rank}`}>{medal}</span>
    {entry ? <>
      <Avatar name={entry.displayName} photoURL={entry.photoURL} className="leaderboard-avatar" />
      <strong>{entry.uid === currentUid ? "You" : entry.displayName}</strong>
      <small>{entry.username ? `@${entry.username}` : mode === "friends" ? "Friend" : "Student"}</small>
      <b>{studyMinutes(entry.weeklySeconds)}</b>
    </> : <>
      <span className="leaderboard-avatar leaderboard-avatar-empty">—</span>
      <strong>Open rank</strong>
      <small>Waiting</small>
    </>}
  </article>;
}

function LeaderboardSheet({ mode, entries, currentUid, loading, onModeChange, onClose }: { mode: "friends" | "public"; entries: StudyLeaderboardEntry[]; currentUid: string; loading: boolean; onModeChange: (mode: "friends" | "public") => void; onClose: () => void }) {
  const ranked = entries.slice(0, 10);
  const podium = [ranked[1], ranked[0], ranked[2]] as const;
  const lowerRanks = Array.from({ length: 7 }, (_, index) => ranked[index + 3]);
  return <div className="task-sheet-backdrop" role="presentation" onMouseDown={onClose}><section className="leaderboard-sheet" role="dialog" aria-modal="true" aria-label="Study leaderboard" onMouseDown={(event) => event.stopPropagation()}><div className="sheet-handle"/><header className="sheet-page-header"><button className="icon" type="button" aria-label="Close leaderboard" onClick={onClose}>×</button><div><strong>{mode === "friends" ? "Friends leaderboard" : "Public leaderboard"}</strong><small>Top 10 · weekly totals reset every Monday</small></div><span>🏆</span></header><div className="leaderboard-sheet-body"><div className="leaderboard-mode-tabs"><button className={mode === "friends" ? "active" : ""} type="button" onClick={() => onModeChange("friends")}>Friends</button><button className={mode === "public" ? "active" : ""} type="button" onClick={() => onModeChange("public")}>Public</button></div>{loading ? <p className="leaderboard-disclaimer">Loading study totals…</p> : !ranked.length ? <p className="leaderboard-disclaimer">No saved study sessions yet.</p> : <><div className="leaderboard-podium">{podium.map((entry, index) => <LeaderboardPodiumCard key={entry?.uid || `empty-${index}`} entry={entry} rank={index === 0 ? 2 : index === 1 ? 1 : 3} currentUid={currentUid} mode={mode} />)}</div><p className="leaderboard-disclaimer">Finished study sessions saved to your account.</p><p className="leaderboard-section-label">Ranks 4–10</p><div className="leaderboard-ranks">{lowerRanks.map((entry, index) => <article className={entry ? "" : "rank-waiting"} key={entry?.uid || `waiting-${index + 4}`}><b>{index + 4}</b><div><strong>{entry ? (entry.uid === currentUid ? "You" : entry.displayName) : "Open rank"}</strong><small>{entry ? (entry.username ? `@${entry.username}` : mode === "friends" ? "Friend" : "Student") : "Waiting"}</small></div><span>{entry ? studyMinutes(entry.weeklySeconds) : "—"}</span></article>)}</div></>}</div></section></div>;
}

function JourneySheet({ streak, league, weeklySeconds, totalSeconds, nextStreakMilestone, nextLeaguePromotion, onClose }: { streak: number; league: string; weeklySeconds: number; totalSeconds: number; nextStreakMilestone: number; nextLeaguePromotion: number; onClose: () => void }) {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const monthlySeconds = weeklySeconds;
  const milestones = [7, 30, 100, 365];
  const [showLeagueInfo, setShowLeagueInfo] = useState(false);
  const divisions = [["Bronze I", 0], ["Bronze II", 10], ["Bronze III", 20], ["Silver I", 35], ["Silver II", 50], ["Silver III", 70], ["Gold I", 90], ["Gold II", 120], ["Gold III", 160], ["Platinum I", 220], ["Platinum II", 300], ["Platinum III", 400], ["Legendary", 550]] as const;
  return <div className="task-sheet-backdrop" role="presentation" onMouseDown={onClose}><section className="journey-sheet" role="dialog" aria-modal="true" aria-label="Your study journey" onMouseDown={(event) => event.stopPropagation()}><div className="sheet-handle"/><header className="sheet-page-header"><button className="icon" type="button" aria-label="Close journey" onClick={onClose}>×</button><div><strong>Your journey</strong><small>Weekly league · daily streak</small></div><span>✦</span></header><div className="journey-sheet-body"><section className="journey-highlight"><span>🔥</span><div><small>ACTIVE STREAK</small><strong>{streak} day{streak === 1 ? "" : "s"}</strong><p>Next streak milestone: {nextStreakMilestone} active days</p></div></section><section className="journey-league"><div className="league-heading"><span className="sheet-label">WEEKLY LEAGUE</span><button type="button" className="league-info-button" aria-expanded={showLeagueInfo} aria-label="How league divisions work" onClick={() => setShowLeagueInfo((value) => !value)}>i</button></div><div className="league-current"><i className={`league-crest ${league.split(" ")[0].toLowerCase()}`}>{league === "Legendary" ? "★" : league.split(" ")[1]}</i><div><strong>{league}</strong><p>{Math.floor(monthlySeconds / 3600)}h {Math.floor((monthlySeconds % 3600) / 60)}m this week · {Math.max(0, nextLeaguePromotion - Math.floor(monthlySeconds / 3600))}h to promote</p></div></div><div className="league-zones"><span className="promotion"><b>Promote</b><small>Top 20%</small></span><span className="safe"><b>Stay</b><small>Middle 60%</small></span><span className="demotion"><b>Demote</b><small>Bottom 20%</small></span></div>{showLeagueInfo && <aside className="league-guide"><strong>How weekly promotion works</strong><p>Finished study hours decide rank. Top 20% promote, middle 60% stay, bottom 20% demote. Resets every Monday.</p><div>{divisions.map(([division, hoursRequired]) => { const tier = division.split(" ")[0].toLowerCase(); const roman = division.split(" ")[1] || "★"; const currentHours = Math.floor(monthlySeconds / 3600); return <span className={league === division ? "current" : currentHours >= hoursRequired ? "unlocked" : ""} key={division}><i className={`league-crest ${tier}`}>{roman}</i><b>{division}</b><small>{hoursRequired === 0 ? "Starting rank" : `${hoursRequired}h / week`}</small></span>; })}</div></aside>}</section><section><p className="sheet-label">STREAK MILESTONES</p><div className="journey-milestones">{milestones.map((milestone) => <article className={streak >= milestone ? "reached" : ""} key={milestone}><span>{streak >= milestone ? "✓" : milestone}</span><div><strong>{milestone} days</strong><small>Keep your daily study streak alive</small></div></article>)}</div></section><section className="journey-stats"><article><small>STUDIED TOTAL</small><strong>{hours}h {minutes}m</strong></article><article><small>THIS WEEK</small><strong>{Math.floor(monthlySeconds / 3600)}h {Math.floor((monthlySeconds % 3600) / 60)}m</strong></article></section></div></section></div>;
}

function StudyHome({ uid, onOpenDiscover }: { uid: string; onOpenDiscover: () => void }) {
  const studyKey = `cochat-study-${auth?.currentUser?.uid || "preview"}`;
  const dayNumber = Math.floor(Date.now() / 86_400_000);
  const weekKey = currentStudyWeekKey();
  const [seconds, setSeconds] = useState(() => { try { return Number(JSON.parse(localStorage.getItem(studyKey) || "{}").elapsedSeconds || 0); } catch { return 0; } });
  const [totalSeconds, setTotalSeconds] = useState(() => { try { return Number(JSON.parse(localStorage.getItem(studyKey) || "{}").totalSeconds || 0); } catch { return 0; } });
  const [weeklySeconds, setWeeklySeconds] = useState(() => { try { const saved = JSON.parse(localStorage.getItem(studyKey) || "{}"); return saved.weekKey === weekKey ? Number(saved.weeklySeconds || 0) : 0; } catch { return 0; } });

  const [studyDays, setStudyDays] = useState<string[]>(() => { try { const value = JSON.parse(localStorage.getItem(studyKey) || "{}").studyDays; return Array.isArray(value) ? value.filter((day): day is string => typeof day === "string") : []; } catch { return []; } });
  const [completedTasks, setCompletedTasks] = useState(() => { try { return Number(JSON.parse(localStorage.getItem(studyKey) || "{}").completedTasks || 0); } catch { return 0; } });
  const [tasks, setTasks] = useState<StudyTask[]>(() => { try { const saved = JSON.parse(localStorage.getItem(studyKey) || "{}"); if (saved.dailyDay === dayNumber && Array.isArray(saved.tasks)) return saved.tasks.map((task: Partial<StudyTask>) => ({ ...task, action: task.action || studyTaskAction(task.title || "") })) as StudyTask[]; } catch { /* local data is optional */ } return dailyStudyTasks(dayNumber); });
  const [taskSheetOpen, setTaskSheetOpen] = useState(false);
  const [timerSetupOpen, setTimerSetupOpen] = useState(false);
  const [timerTaskId, setTimerTaskId] = useState<string | null>(null);
  const [targetSeconds, setTargetSeconds] = useState(() => { try { return Number(JSON.parse(localStorage.getItem(studyKey) || "{}").targetSeconds || 0); } catch { return 0; } });
  const [leaderboardMode, setLeaderboardMode] = useState<"friends" | "public">("friends");
  const [leaderboardOpen, setLeaderboardOpen] = useState(false);
  const [leaderboardEntries, setLeaderboardEntries] = useState<StudyLeaderboardEntry[]>([]);
  const [studyZoneEntries, setStudyZoneEntries] = useState<StudyLeaderboardEntry[]>([]);
  const [studyFriendIds, setStudyFriendIds] = useState<string[]>([]);
  const [leaderboardLoading, setLeaderboardLoading] = useState(false);
  const [leaderboardRefreshKey, setLeaderboardRefreshKey] = useState(0);
  const [journeyOpen, setJourneyOpen] = useState(false);
  const [timerStartedAt, setTimerStartedAt] = useState<number | null>(() => { try { return Number(JSON.parse(localStorage.getItem(studyKey) || "{}").timerStartedAt) || null; } catch { return null; } });
  const [running, setRunning] = useState(() => { try { const saved = JSON.parse(localStorage.getItem(studyKey) || "{}"); return Boolean(saved.timerRunning && saved.timerStartedAt && saved.targetSeconds); } catch { return false; } });
  const timerRef = useRef<HTMLElement | null>(null);
  useEffect(() => {
    const refreshDailyTasks = () => {
      const currentDay = Math.floor(Date.now() / 86_400_000);
      if (currentDay === dayNumber) return;
      setTasks((current) => [...current.filter((task) => task.kind === "personal"), ...dailyStudyTasks(currentDay)]);
      setCompletedTasks(0);
    };
    const interval = window.setInterval(refreshDailyTasks, 60_000);
    return () => window.clearInterval(interval);
  }, [dayNumber]);
  useEffect(() => {
    listFriends(uid).then((friends) => setStudyFriendIds(friends.map((friend) => friend.uid))).catch(() => setStudyFriendIds([]));
  }, [uid]);
  useEffect(() => {
    let cancelled = false;
    const refresh = async () => {
      if (leaderboardOpen) setLeaderboardLoading(true);
      try {
        if (leaderboardMode === "public" && leaderboardOpen) {
          const entries = await getStudyLeaderboard("public", [], weekKey);
          if (!cancelled) setLeaderboardEntries(entries.filter((entry) => entry.weeklySeconds > 0));
          return;
        }
        const entries = await getStudyLeaderboard("friends", [uid, ...studyFriendIds], weekKey);
        if (!cancelled) {
          setStudyZoneEntries(entries);
          if (leaderboardMode === "friends") setLeaderboardEntries(entries.filter((entry) => entry.weeklySeconds > 0));
        }
      } catch {
        if (!cancelled) {
          setStudyZoneEntries([]);
          if (leaderboardOpen) setLeaderboardEntries([]);
        }
      } finally {
        if (!cancelled) setLeaderboardLoading(false);
      }
    };
    void refresh();
    return () => { cancelled = true; };
  }, [uid, weekKey, studyFriendIds, leaderboardMode, leaderboardOpen, leaderboardRefreshKey]);
  useEffect(() => {
    void updateStudyPresence(running, timerTaskId ? "Working on an active task" : "In a focus session").catch(() => undefined);
    const timer = window.setInterval(() => void updateStudyPresence(running, timerTaskId ? "Working on an active task" : "In a focus session").catch(() => undefined), 30000);
    return () => window.clearInterval(timer);
  }, [uid, running, timerTaskId]);
  useEffect(() => () => { void updateStudyPresence(false).catch(() => undefined); }, [uid]);
  useEffect(() => {
    if (!weeklySeconds) return;
    const syncKey = `${studyKey}-remote-${weekKey}`;
    try { if (localStorage.getItem(syncKey)) return; } catch { return; }
    void saveStudySession(weeklySeconds, weekKey).then(() => { try { localStorage.setItem(syncKey, "1"); } catch { /* storage is optional */ } }).catch(() => undefined);
  }, [studyKey, weeklySeconds, weekKey]);
  useEffect(() => {
    if (!running) return;
    const updateElapsed = () => {
      if (!timerStartedAt) return;
      const elapsed = Math.min(targetSeconds || Number.MAX_SAFE_INTEGER, Math.max(0, Math.floor((Date.now() - timerStartedAt) / 1000)));
      setSeconds(elapsed);
      if (targetSeconds && elapsed >= targetSeconds) setRunning(false);
    };
    updateElapsed();
    const timer = window.setInterval(updateElapsed, 1000);
    return () => window.clearInterval(timer);
  }, [running, targetSeconds, timerStartedAt]);
  const shownSeconds = targetSeconds ? Math.max(0, targetSeconds - seconds) : seconds;
  const minutes = Math.floor(shownSeconds / 60);
  const display = `${String(Math.floor(minutes / 60)).padStart(2, "0")}:${String(minutes % 60).padStart(2, "0")}:${String(shownSeconds % 60).padStart(2, "0")}`;
  const progress = targetSeconds ? Math.min(100, Math.round((seconds / targetSeconds) * 100)) : Math.min(100, Math.round((seconds / 3600) * 100));
  const saveSession = () => {
    if (seconds <= 0) return;
    void saveStudySession(seconds, weekKey).then(() => setLeaderboardRefreshKey((value) => value + 1)).catch(() => undefined);
    const nextTotal = totalSeconds + seconds;
    const nextWeekly = weeklySeconds + seconds;
    const today = new Date().toISOString().slice(0, 10);
    const nextDays = studyDays.includes(today) ? studyDays : [...studyDays, today].slice(-365);
    setTotalSeconds(nextTotal);
    setWeeklySeconds(nextWeekly);
    setStudyDays(nextDays);
    setSeconds(0);
    setTargetSeconds(0);
    setRunning(false); setTimerStartedAt(null); setTimerTaskId(null);
    try { localStorage.setItem(studyKey, JSON.stringify({ totalSeconds: nextTotal, weeklySeconds: nextWeekly, weekKey, studyDays: nextDays, completedTasks, tasks, dailyDay: dayNumber, targetSeconds: 0, elapsedSeconds: 0, timerStartedAt: null, timerRunning: false })); } catch { /* storage is optional */ }
  };
  useEffect(() => { try { const saved = JSON.parse(localStorage.getItem(studyKey) || "{}"); if (saved.weekKey !== weekKey) setWeeklySeconds(0); } catch { /* local data is optional */ } }, [studyKey, weekKey]);
  // The timestamp carries a running timer across reloads; avoid writing local state every second.
  useEffect(() => { try { localStorage.setItem(studyKey, JSON.stringify({ totalSeconds, weeklySeconds, weekKey, studyDays, completedTasks, tasks, dailyDay: dayNumber, targetSeconds, elapsedSeconds: seconds, timerStartedAt, timerRunning: running })); } catch { /* local data is optional */ } }, [studyKey, totalSeconds, weeklySeconds, weekKey, studyDays, completedTasks, tasks, dayNumber, targetSeconds, timerStartedAt, running]);
  const studiedHours = Math.floor(totalSeconds / 3600);
  const studiedMinutes = Math.floor((totalSeconds % 3600) / 60);
  const studiedLabel = `${studiedHours}h ${studiedMinutes}m`;
  const today = new Date();
  const activeStreak = (() => { let streak = 0; for (let index = 0; index < 365; index += 1) { const date = new Date(today); date.setDate(today.getDate() - index); if (!studyDays.includes(date.toISOString().slice(0, 10))) break; streak += 1; } return streak; })();
  const weeklyHours = Math.floor(weeklySeconds / 3600);
  const league = weeklyHours >= 40 ? "Legendary" : weeklyHours >= 30 ? "Platinum III" : weeklyHours >= 24 ? "Platinum II" : weeklyHours >= 18 ? "Platinum I" : weeklyHours >= 14 ? "Gold III" : weeklyHours >= 11 ? "Gold II" : weeklyHours >= 8 ? "Gold I" : weeklyHours >= 6 ? "Silver III" : weeklyHours >= 4 ? "Silver II" : weeklyHours >= 2 ? "Silver I" : weeklyHours >= 1 ? "Bronze III" : "Bronze I";
  const nextStreakMilestone = [7, 30, 100, 365].find((milestone) => milestone > activeStreak) || 365;
  const nextLeaguePromotion = [1, 2, 4, 6, 8, 11, 14, 18, 24, 30, 40].find((threshold) => threshold > weeklyHours) || 40;
  const activeTasks = tasks.filter((task) => task.startedAt && !task.completedAt);
  const startTask = (task: StudyTask) => {
    setTasks((current) => current.map((item) => item.id === task.id ? { ...item, startedAt: item.startedAt || Date.now() } : item));
    if (task.action === "discover") { setTaskSheetOpen(false); onOpenDiscover(); return; }
    setTimerTaskId((current) => current || task.id);
    setTaskSheetOpen(false);
    setTimerSetupOpen(true);
  };
  const completeTask = (id: string) => {
    const task = tasks.find((item) => item.id === id);
    if (task && !task.completedAt) setCompletedTasks((value) => value + 1);
    setTasks((current) => current.map((item) => item.id === id ? { ...item, completedAt: Date.now() } : item));
    setTimerTaskId((current) => current === id ? null : current);
  };
  const addTask = (title: string) => setTasks((current) => current.filter((task) => task.kind !== "personal").length >= 5 ? current : [...current, { id: `personal-${Date.now()}`, title, kind: "personal", action: "timer" }]);
  const focusTask = (task: StudyTask) => {
    if (task.action === "discover") { onOpenDiscover(); return; }
    setTimerTaskId(task.id);
    setTimerSetupOpen(true);
  };
  const applyTimer = (duration: number) => { setRunning(false); setTimerStartedAt(null); setSeconds(0); setTargetSeconds(duration); setTimerSetupOpen(false); window.setTimeout(() => timerRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }), 0); };
  const toggleTimer = () => {
    if (!targetSeconds) { setTimerSetupOpen(true); return; }
    if (running) { setRunning(false); setTimerStartedAt(null); return; }
    if (seconds >= targetSeconds) { setSeconds(0); setTimerStartedAt(Date.now()); } else setTimerStartedAt(Date.now() - seconds * 1000);
    setRunning(true);
  };
  return (
    <div className="study-home">
      <section className="study-hero"><div><span className="kicker">YOUR STUDY SPACE</span><h2>Lock in, one session at a time.</h2><p>Small wins stack into a study rhythm that actually lasts.</p></div><div className="quest-badge">✦</div></section>
      <section className="study-shortcuts"><button type="button" onClick={() => setTaskSheetOpen(true)}><span>✓</span><div><strong>Tasks</strong><small>{tasks.filter((task) => task.completedAt).length}/{tasks.length} complete</small></div></button><button type="button" onClick={() => setLeaderboardOpen(true)}><span>🏆</span><div><strong>Leaderboard</strong><small>Friends & public</small></div></button><button type="button" onClick={() => setJourneyOpen(true)}><span>✦</span><div><strong>Journey</strong><small>{league}</small></div></button></section>
      {activeTasks.length > 0 && <section className="active-tasks"><div className="active-tasks-heading"><div><span className="kicker">IN PROGRESS</span><strong>{activeTasks.length} active task{activeTasks.length === 1 ? "" : "s"}</strong></div><button className="secondary compact" type="button" onClick={() => setTaskSheetOpen(true)}>View tasks</button></div>{activeTasks.map((task) => <article key={task.id}><span>◷</span><div><strong>{task.title}</strong><small>{task.action === "discover" ? "Ready to help in Discover" : `Started ${Math.max(1, Math.floor((Date.now() - (task.startedAt || Date.now())) / 60000))} min ago`}</small></div><button className="icon" type="button" aria-label={`Continue ${task.title}`} onClick={() => focusTask(task)}>→</button></article>)}</section>}
      <section className="timer-card" ref={timerRef}><div className="timer-ring" style={{ "--progress": `${progress}%` } as CSSProperties}><strong>{display}</strong><span>{running ? (timerTaskId ? "task timer running" : "focus session running") : targetSeconds ? "timer ready" : "choose a duration"}</span></div>{targetSeconds > 0 && <button className="timer-change" type="button" onClick={() => setTimerSetupOpen(true)}>Change · {Math.floor(targetSeconds / 3600) ? `${Math.floor(targetSeconds / 3600)}h ` : ""}{Math.floor((targetSeconds % 3600) / 60)}m</button>}<div className="timer-actions"><button className="primary" type="button" onClick={toggleTimer}>{running ? "Pause timer" : targetSeconds ? "Start timer" : "Set timer"}</button><button className="secondary" type="button" onClick={saveSession} disabled={!seconds}>Finish & save</button><button className="secondary" type="button" onClick={() => { setRunning(false); setTimerStartedAt(null); setTimerTaskId(null); setSeconds(0); setTargetSeconds(0); }}>Reset</button></div><small className="timer-note">Your countdown keeps its place if you close or background the app. It saves only when you finish.</small></section>
      <div className="study-grid"><article><span className="metric-icon">🔥</span><strong>{activeStreak} days</strong><small>active journey</small></article><article><span className="metric-icon">✦</span><strong>{league}</strong><small>current league</small></article><article><span className="metric-icon">⌁</span><strong>{studiedLabel}</strong><small>studied total</small></article></div>
      <section className="study-zone"><header><div><span className="kicker">STUDY ZONE</span><h3>Focus together</h3></div><span className="study-zone-count">{studyZoneEntries.filter((entry) => entry.active).length + (running && !studyZoneEntries.some((entry) => entry.uid === uid) ? 1 : 0)} studying</span></header>{studyZoneEntries.some((entry) => entry.active) || running ? <>{running && <article className="study-zone-person"><Avatar name={auth?.currentUser?.displayName || "You"} photoURL={auth?.currentUser?.photoURL || undefined}/><div><strong>{auth?.currentUser?.displayName || "You"}</strong><small>{timerTaskId ? "Working on an active task" : "In a focus session"}</small></div><span className="presence-dot"/></article>}{studyZoneEntries.filter((entry) => entry.active && entry.uid !== uid).map((entry) => <article className="study-zone-person" key={entry.uid}><Avatar name={entry.displayName} photoURL={entry.photoURL || undefined}/><div><strong>{entry.displayName}</strong><small>{entry.label || "In a focus session"}</small></div><span className="presence-dot"/></article>)}</> : <div className="study-zone-empty"><strong>Start a session to enter the zone</strong><span>Friends who are studying or doing tasks will appear here with their profile photos.</span></div>}</section>
      {taskSheetOpen && <StudyTaskSheet tasks={tasks} onClose={() => setTaskSheetOpen(false)} onStart={startTask} onComplete={completeTask} onAdd={addTask} onRemove={(id) => setTasks((current) => current.filter((task) => task.id !== id))}/>}
      {timerSetupOpen && <TimerSetupSheet initialSeconds={targetSeconds} onClose={() => setTimerSetupOpen(false)} onApply={applyTimer}/>}
      {leaderboardOpen && <LeaderboardSheet mode={leaderboardMode} entries={leaderboardEntries} currentUid={uid} loading={leaderboardLoading} onModeChange={setLeaderboardMode} onClose={() => setLeaderboardOpen(false)}/>}
      {journeyOpen && <JourneySheet streak={activeStreak} league={league} weeklySeconds={weeklySeconds} totalSeconds={totalSeconds} nextStreakMilestone={nextStreakMilestone} nextLeaguePromotion={nextLeaguePromotion} onClose={() => setJourneyOpen(false)}/>}
    </div>
  );
}

type TwittPreview = { id: string; authorUid: string; author: string; handle: string; avatar: string; body: string; likes: number; comments: number; views: string; age: string; createdAt: number; community: string; liked?: boolean; attachment?: TwittAttachment | null };

function CommentSheet({ post, comments, loading, hasMore, names, currentUid, onClose, onLoadMore, onSubmit, onLike, onDelete }: {
  post: TwittPreview; comments: TwittComment[]; loading: boolean; hasMore: boolean; names: Record<string, string>; currentUid?: string;
  onClose: () => void; onLoadMore: () => void; onSubmit: (body: string, file?: File | null) => void; onLike: (comment: TwittComment) => void; onDelete: (comment: TwittComment) => void;
}) {
  const [draft, setDraft] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const submit = (event: FormEvent) => { event.preventDefault(); const body = draft.trim(); if (!body && !file) return; onSubmit(body, file); setDraft(""); setFile(null); };
  return <div className="comment-sheet-backdrop" role="presentation" onMouseDown={onClose}>
    <section className="comment-sheet" role="dialog" aria-modal="true" aria-label="Comments" onMouseDown={(event) => event.stopPropagation()}>
      <div className="sheet-handle" />
      <header className="comment-sheet-header"><button className="icon" type="button" aria-label="Close comments" onClick={onClose}>×</button><strong>Comments</strong><span>{post.comments}</span></header>
      <div className="comment-sheet-post"><strong>{post.author}</strong><small>@{post.handle}</small><p>{post.body}</p></div>
      <div className="comment-sheet-list">
        {loading && !comments.length && <p className="comment-loading">Loading comments…</p>}
        {!loading && !comments.length && <div className="comment-empty"><strong>Start the conversation</strong><span>Be the first to leave a helpful comment.</span></div>}
        {comments.map((comment) => <article className="sheet-comment" key={comment.id}><div className="comment-avatar">{(names[comment.uid] || comment.uid).slice(0, 2).toUpperCase()}</div><div className="sheet-comment-body"><div><strong>@{names[comment.uid] || comment.uid.slice(0, 10)}</strong>{comment.uid === currentUid && <button className="comment-delete" type="button" onClick={() => onDelete(comment)}>Delete</button>}</div><p>{comment.body}</p>{comment.attachment && (comment.attachment.type.startsWith("image/") ? <a className="twitt-media-preview" href={comment.attachment.url} target="_blank" rel="noreferrer" download={comment.attachment.name}><img src={comment.attachment.url} alt={comment.attachment.name} /><span>Open / save image</span></a> : <a className="twitt-attachment" href={comment.attachment.url} target="_blank" rel="noreferrer" download={comment.attachment.name}>📄 {comment.attachment.name} · Open / save</a>)}<button className={comment.liked ? "comment-like liked" : "comment-like"} type="button" onClick={() => onLike(comment)}>♡ {comment.likes || 0}</button></div></article>)}
        {hasMore && <button className="load-comments" type="button" disabled={loading} onClick={onLoadMore}>{loading ? "Loading…" : "Load more comments"}</button>}
      </div>
      <form className="comment-sheet-compose" onSubmit={submit}><input value={draft} onChange={(event) => setDraft(event.target.value.slice(0, 240))} placeholder="Add a thoughtful comment" autoFocus /><label className="comment-media-picker" title="Photo or PDF, max 5 MB">📎<input type="file" accept="image/jpeg,image/png,image/webp,image/gif,application/pdf" onChange={(event) => setFile(event.target.files?.[0] || null)} /></label><button className="primary compact" type="submit" disabled={!draft.trim() && !file}>Send</button></form>
    </section>
  </div>;
}
function TwittFeed({ initialCommunity = "all" }: { initialCommunity?: string }) {
  const [tab, setTab] = useState<"recent" | "trending">("recent");
  const [posts, setPosts] = useState<TwittPreview[]>([]);
  const [authorNames, setAuthorNames] = useState<Record<string, string>>({});
  const [authorProfiles, setAuthorProfiles] = useState<Record<string, UserProfile>>({});
  const [visible, setVisible] = useState(20);
  const [community, setCommunity] = useState<string>(initialCommunity);
  const followKey = `cochat-following-${auth?.currentUser?.uid || "preview"}`;
  const [following, setFollowing] = useState<string[]>(() => { try { const value = JSON.parse(localStorage.getItem(followKey) || "null"); return Array.isArray(value) ? value.filter((id): id is string => typeof id === "string") : []; } catch { return []; } });
  const [composerOpen, setComposerOpen] = useState(false);
  const [draft, setDraft] = useState("");
  const [publishError, setPublishError] = useState("");
  const [draftCommunity, setDraftCommunity] = useState("jee");
  const [draftFile, setDraftFile] = useState<File | null>(null);
  const [commenting, setCommenting] = useState<string | null>(null);
  const [postMenu, setPostMenu] = useState<string | null>(null);
  const [remoteCursor, setRemoteCursor] = useState<Awaited<ReturnType<typeof loadTwittPage>>["cursor"]>(null);
  const [remoteHasMore, setRemoteHasMore] = useState(false);
  const [remoteLoading, setRemoteLoading] = useState(false);
  const [remoteError, setRemoteError] = useState("");
  const viewedPosts = useRef(new Set<string>());
  const reactionKey = `cochat-discovery-reactions-${auth?.currentUser?.uid || "preview"}`;
  const [likedPostIds, setLikedPostIds] = useState<string[]>(() => { try { const value = JSON.parse(localStorage.getItem(reactionKey) || "{}"); return Array.isArray(value.posts) ? value.posts.filter((id: unknown): id is string => typeof id === "string") : []; } catch { return []; } });
  const [likedCommentIds, setLikedCommentIds] = useState<string[]>(() => { try { const value = JSON.parse(localStorage.getItem(reactionKey) || "{}"); return Array.isArray(value.comments) ? value.comments.filter((id: unknown): id is string => typeof id === "string") : []; } catch { return []; } });
  const [commentsByPost, setCommentsByPost] = useState<Record<string, Awaited<ReturnType<typeof loadTwittComments>>["items"]>>({});
  const [commentCursors, setCommentCursors] = useState<Record<string, Awaited<ReturnType<typeof loadTwittComments>>["cursor"]>>({});
  const [commentMore, setCommentMore] = useState<Record<string, boolean>>({});
  const [commentLoading, setCommentLoading] = useState<string | null>(null);
  const [commentNames, setCommentNames] = useState<Record<string, string>>({});
  const [publishing, setPublishing] = useState(false);
  const [busyDeletes, setBusyDeletes] = useState<string[]>([]);
  const hiddenKey = `cochat-hidden-twitts-${auth?.currentUser?.uid || "preview"}`;
  const [hiddenPosts, setHiddenPosts] = useState<string[]>(() => { try { const saved = JSON.parse(localStorage.getItem(hiddenKey) || "[]"); return Array.isArray(saved) ? saved : []; } catch { return []; } });
  useEffect(() => { try { localStorage.setItem(reactionKey, JSON.stringify({ posts: likedPostIds, comments: likedCommentIds })); } catch { /* reaction cache is optional */ } }, [reactionKey, likedPostIds, likedCommentIds]);
  useEffect(() => { setCommunity(initialCommunity); setVisible(3); }, [initialCommunity]);
  useEffect(() => { try { localStorage.setItem(followKey, JSON.stringify(following)); } catch { /* preferences are optional */ } }, [followKey, following]);
  useEffect(() => { try { localStorage.setItem(hiddenKey, JSON.stringify(hiddenPosts)); } catch { /* preferences are optional */ } }, [hiddenKey, hiddenPosts]);
  useEffect(() => {
    const viewerUid = auth?.currentUser?.uid;
    if (!viewerUid || !firebaseReady) return undefined;
    let active = true;
    setRemoteLoading(true);
    setRemoteError("");
    loadTwittPage("all").then((page) => {
      if (!active) return;
      {
        const now = Date.now();
        setPosts(page.items.map((item) => ({ id: item.id, authorUid: item.uid, author: item.uid === viewerUid ? "You" : "Co-Chat member", handle: item.uid, avatar: item.uid === viewerUid ? "YO" : "CM", body: item.body, likes: item.likes, liked: likedPostIds.includes(item.id) || item.liked, comments: item.comments, views: String(item.views), attachment: item.attachment, age: `${Math.max(1, Math.round((now - (item.createdAt?.toMillis?.() || now)) / 3_600_000))} hr`, createdAt: item.createdAt?.toMillis?.() || now, community: item.community })));
        setVisible(20);
      }
      setRemoteCursor(page.cursor);
      setRemoteHasMore(page.hasMore);
    }).catch((error) => { if (active) setRemoteError(error instanceof Error ? error.message : "Could not load real Twitts."); }).finally(() => { if (active) setRemoteLoading(false); });
    return () => { active = false; };
  }, []);
  const list = useMemo(() => {
    const now = Date.now();
    const eligible = posts.filter((post) => now - post.createdAt <= (tab === "recent" ? 24 : 24 * 7) * 3_600_000);
    return (tab === "recent" ? eligible.sort((a, b) => b.createdAt - a.createdAt) : eligible.sort((a, b) => b.likes - a.likes || b.comments - a.comments || b.createdAt - a.createdAt).slice(0, 10));
  }, [posts, tab]);
  const loadMore = async () => {
    if (remoteCursor && remoteHasMore && !remoteLoading) {
      setRemoteLoading(true);
      try {
        const page = await loadTwittPage("all", remoteCursor);
        const now = Date.now();
        setPosts((current) => [...current, ...page.items.map((item) => ({ id: item.id, authorUid: item.uid, author: item.uid === auth?.currentUser?.uid ? "You" : "Co-Chat member", handle: item.uid, avatar: item.uid === auth?.currentUser?.uid ? "YO" : "CM", body: item.body, likes: item.likes, liked: item.liked, comments: item.comments, views: String(item.views), attachment: item.attachment, age: `${Math.max(1, Math.round((now - (item.createdAt?.toMillis?.() || now)) / 3_600_000))} hr`, createdAt: item.createdAt?.toMillis?.() || now, community: item.community }))]);
        setRemoteCursor(page.cursor);
        setRemoteHasMore(page.hasMore);
        setVisible((current) => current + page.items.length);
      } finally { setRemoteLoading(false); }
      return;
    }
    setRemoteError("There are no more real Twitts to load.");
  };
  const filtered = list.filter((post) => !hiddenPosts.includes(post.id) && (community === "all" || (community === "following" ? following.includes(post.community) : post.community === community)));
  useEffect(() => {
    const ids = [...new Set(posts.map((post) => post.handle).filter((uid) => uid && !authorNames[uid]))];
    if (!ids.length) return;
    Promise.all(ids.map(async (uid) => [uid, await getUserProfile(uid)] as const)).then((items) => {
      setAuthorNames((current) => {
        const next = { ...current };
        items.forEach(([uid, profile]) => { if (profile?.username) { next[uid] = profile.username; next[profile.username] = profile.username; } });
        return next;
      });
      setAuthorProfiles((current) => {
        const next = { ...current };
        items.forEach(([uid, profile]) => { if (profile) { next[uid] = profile; if (profile.username) next[profile.username] = profile; } });
        return next;
      });
      setPosts((current) => current.map((post) => {
        const profile = items.find(([uid]) => uid === post.handle)?.[1];
        return profile?.username ? { ...post, handle: profile.username, author: post.author === "You" ? "You" : (profile.displayName || post.author) } : post;
      }));
    });
  }, [posts, authorNames]);
  useEffect(() => {
    const uid = auth?.currentUser?.uid;
    if (!uid || !firebaseReady) return;
    filtered.slice(0, visible).forEach((post) => {
      if (post.id.startsWith("local-") || viewedPosts.current.has(post.id)) return;
      viewedPosts.current.add(post.id);
      void recordTwittView(post.id, uid).then((counted) => {
        if (counted) setPosts((current) => current.map((item) => item.id === post.id ? { ...item, views: String(Number(item.views || 0) + 1) } : item));
      }).catch(() => viewedPosts.current.delete(post.id));
    });
  }, [filtered, visible]);
  const handleLike = (post: TwittPreview) => {
    const nextLiked = !post.liked;
    setPosts((current) => current.map((item) => item.id === post.id ? { ...item, likes: Math.max(0, item.likes + (nextLiked ? 1 : -1)), liked: nextLiked } : item));
    setLikedPostIds((current) => nextLiked ? [...new Set([...current, post.id])] : current.filter((id) => id !== post.id));
    const uid = auth?.currentUser?.uid;
    if (uid && firebaseReady && !post.id.startsWith("local-")) void toggleTwittLike(post.id, uid, nextLiked).catch(() => undefined);
  };
  const openComments = async (postId: string) => {
    setCommenting(postId);
    if (postId.startsWith("local-") || commentsByPost[postId]) return;
    setCommentLoading(postId);
    try {
      const page = await loadTwittComments(postId);
      const items = page.items;
      const profiles = await Promise.all(items.map(async (comment) => [comment.uid, await getUserProfile(comment.uid)] as const));
      setCommentNames((current) => ({ ...current, ...Object.fromEntries(profiles.map(([uid, profile]) => [uid, profile?.username || uid.slice(0, 10)])) }));
      setCommentsByPost((current) => ({ ...current, [postId]: items }));
      setCommentCursors((current) => ({ ...current, [postId]: page.cursor }));
      setCommentMore((current) => ({ ...current, [postId]: page.hasMore }));
    } finally { setCommentLoading(null); }
  };
  const loadMoreComments = async (postId: string) => {
    const cursor = commentCursors[postId];
    if (!cursor || commentLoading) return;
    setCommentLoading(postId);
    try {
      const page = await loadTwittComments(postId, cursor);
      const items = page.items;
      const profiles = await Promise.all(items.map(async (comment) => [comment.uid, await getUserProfile(comment.uid)] as const));
      setCommentNames((current) => ({ ...current, ...Object.fromEntries(profiles.map(([uid, profile]) => [uid, profile?.username || uid.slice(0, 10)])) }));
      setCommentsByPost((current) => ({ ...current, [postId]: [...(current[postId] || []), ...items] }));
      setCommentCursors((current) => ({ ...current, [postId]: page.cursor }));
      setCommentMore((current) => ({ ...current, [postId]: page.hasMore }));
    } finally { setCommentLoading(null); }
  };
  const submitComment = async (post: TwittPreview, body: string, file?: File | null) => {
    const uid = auth?.currentUser?.uid || 'you';
    const localId = `local-comment-${Date.now()}`;
    const optimisticComment = { id: localId, uid, body, createdAt: { toMillis: () => Date.now() } };
    setCommentsByPost((current) => ({ ...current, [post.id]: [...(current[post.id] || []), optimisticComment] }));
    setPosts((current) => current.map((item) => item.id === post.id ? { ...item, comments: item.comments + 1 } : item));
    try {
      if (uid !== 'you' && firebaseReady && !post.id.startsWith('local-')) {
        let attachment: TwittAttachment | null = null;
        if (file) {
          const uploaded = await StorageManager.upload(file, { ownerId: uid, originalName: file.name, mimeType: file.type, sizeBytes: file.size, twittId: post.id, scope: 'twitt' });
          attachment = { name: uploaded.originalName, url: uploaded.url, storageKey: uploaded.storageKey, type: uploaded.mimeType, size: uploaded.sizeBytes };
        }
        await createTwittComment(post.id, uid, body || '📎 Attachment', attachment);
        setCommentsByPost((current) => ({ ...current, [post.id]: (current[post.id] || []).filter((comment) => comment.id !== localId) }));
      }
      const profile = uid !== 'you' ? await getUserProfile(uid) : null;
      setCommentNames((current) => ({ ...current, [uid]: profile?.username || current[uid] || uid.slice(0, 10) }));
    } catch {
      setCommentsByPost((current) => ({ ...current, [post.id]: (current[post.id] || []).filter((comment) => comment.id !== localId) }));
      setPosts((current) => current.map((item) => item.id === post.id ? { ...item, comments: Math.max(0, item.comments - 1) } : item));
    }
  };
  useEffect(() => {
    const onCommentCreated = (event: Event) => {
      const detail = (event as CustomEvent<{ twittId?: string; id?: string; uid?: string; body?: string }>).detail;
      if (!detail?.twittId || !detail.id || !detail.uid || !detail.body) return;
      void getUserProfile(detail.uid).then((profile) => {
        setCommentNames((names) => ({ ...names, [detail.uid!]: profile?.username || detail.uid!.slice(0, 10) }));
        setCommentsByPost((current) => {
          const comments = current[detail.twittId!] || [];
          if (comments.some((comment) => comment.id === detail.id)) return current;
          return { ...current, [detail.twittId!]: [...comments, { id: detail.id!, uid: detail.uid!, body: detail.body!, likes: 0, createdAt: { toMillis: () => Date.now() } }] };
        });
      });
    };
    window.addEventListener('cochat-comment-created', onCommentCreated);
    return () => window.removeEventListener('cochat-comment-created', onCommentCreated);
  }, []);
  useEffect(() => {
    const cards = Array.from(document.querySelectorAll<HTMLElement>('.twitt-card'));
    cards.forEach((card, index) => {
      const post = filtered[index];
      const photoURL = post ? authorProfiles[post.handle]?.photoURL : '';
      const avatar = card.querySelector<HTMLElement>('.twitt-head > .avatar');
      if (!avatar || !photoURL) return;
      avatar.textContent = '';
      const image = document.createElement('img');
      image.src = photoURL;
      image.alt = '';
      avatar.appendChild(image);
    });
  }, [filtered, authorProfiles]);
  const dismissPost = async (post: TwittPreview) => {
    setPostMenu(null);
    setHiddenPosts((current) => current.includes(post.id) ? current : [...current, post.id]);
    try {
      const uid = auth?.currentUser?.uid;
      if (uid && firebaseReady && !post.id.startsWith('local-')) await hideTwitt(post.id, uid);
    } catch (error) {
      setHiddenPosts((current) => current.filter((id) => id !== post.id));
      setRemoteError(error instanceof Error ? error.message : 'Could not hide this Twitt.');
    }
  };
  const removePost = async (post: TwittPreview) => {
    if (!window.confirm('Delete this Twitt permanently? Its comments and reactions will also be removed.')) return;
    if (busyDeletes.includes(post.id)) return;
    const before = posts;
    setBusyDeletes((current) => [...current, post.id]);
    setPostMenu(null);
    setPosts((current) => current.filter((item) => item.id !== post.id));
    try {
      const uid = auth?.currentUser?.uid;
      if (!uid || !firebaseReady || post.id.startsWith('local-')) throw new Error('Sign in again to delete this Twitt.');
      await deleteTwitt(post.id, uid);
    } catch (error) {
      setPosts(before);
      setRemoteError(error instanceof Error ? error.message : 'Could not delete this Twitt.');
    } finally {
      setBusyDeletes((current) => current.filter((id) => id !== post.id));
    }
  };
  const likeComment = async (postId: string, comment: TwittComment) => {
    const nextLiked = !comment.liked;
    setLikedCommentIds((current) => nextLiked ? [...new Set([...current, comment.id])] : current.filter((id) => id !== comment.id));
    setCommentsByPost((current) => ({ ...current, [postId]: (current[postId] || []).map((item) => item.id === comment.id ? { ...item, liked: nextLiked, likes: Math.max(0, (item.likes || 0) + (nextLiked ? 1 : -1)) } : item) }));
    try {
      const uid = auth?.currentUser?.uid;
      if (!uid || !firebaseReady || comment.id.startsWith('local-comment-')) throw new Error('Sign in again to like a comment.');
      await toggleTwittCommentLike(postId, comment.id, uid, nextLiked);
    } catch (error) {
      setCommentsByPost((current) => ({ ...current, [postId]: (current[postId] || []).map((item) => item.id === comment.id ? { ...item, liked: comment.liked, likes: comment.likes || 0 } : item) }));
      setRemoteError(error instanceof Error ? error.message : 'Could not update the comment like.');
    }
  };
  const removeComment = async (post: TwittPreview, comment: TwittComment) => {
    if (!window.confirm('Delete this comment?')) return;
    const previous = commentsByPost[post.id] || [];
    setCommentsByPost((current) => ({ ...current, [post.id]: previous.filter((item) => item.id !== comment.id) }));
    setPosts((current) => current.map((item) => item.id === post.id ? { ...item, comments: Math.max(0, item.comments - 1) } : item));
    try {
      const uid = auth?.currentUser?.uid;
      if (!uid || !firebaseReady || comment.id.startsWith('local-comment-')) throw new Error('Sign in again to delete this comment.');
      await deleteTwittComment(post.id, comment.id, uid);
    } catch (error) {
      setCommentsByPost((current) => ({ ...current, [post.id]: previous }));
      setPosts((current) => current.map((item) => item.id === post.id ? { ...item, comments: item.comments + 1 } : item));
      setRemoteError(error instanceof Error ? error.message : 'Could not delete this comment.');
    }
  };
  const tagSuggestions = [...new Set(["jee", "neet", "upsc", "ssc", "gate", "cat", "study", "boards", ...posts.map((post) => post.community)])].slice(0, 12);
  const popularTags = Object.entries(posts.reduce<Record<string, number>>((counts, post) => ({ ...counts, [post.community]: (counts[post.community] || 0) + 1 }), {})).sort(([, a], [, b]) => b - a).slice(0, 6).map(([tag]) => tag);
  const communityLabel = community === "all" ? "All tags" : community === "following" ? "Following" : `#${community}`;
  const createTwitt = async () => {
    if (!draft.trim() || publishing) return;
    setPublishing(true);
    const body = draft.trim();
    setPublishError("");
    const uid = auth?.currentUser?.uid;
    let id = `local-${Date.now()}`;
    let attachment: TwittAttachment | null = null;
    if (uid && firebaseReady) {
      try {
        id = await createRemoteTwitt(uid, body, draftCommunity);
        if (draftFile) {
          const uploaded = await StorageManager.upload(draftFile, { ownerId: uid, originalName: draftFile.name, mimeType: draftFile.type, sizeBytes: draftFile.size, twittId: id, scope: 'twitt' });
          attachment = { name: uploaded.originalName, url: uploaded.url, storageKey: uploaded.storageKey, type: uploaded.mimeType, size: uploaded.sizeBytes };
          await attachTwittMedia(id, uid, attachment);
        }
      } catch (error) {
        if (!id.startsWith('local-')) await deleteTwitt(id, uid).catch(() => undefined);
        setPublishError(error instanceof Error ? error.message : "Could not publish this Twitt. Please try again.");
        setPublishing(false);
        return;
      }
    }
    const profile = uid ? await getUserProfile(uid).catch(() => null) : null;
    const post: TwittPreview = { id, authorUid: uid || "your_profile", author: "You", handle: profile?.username || uid || "your_profile", avatar: "YO", body, likes: 0, comments: 0, views: "0", age: "now", createdAt: Date.now(), community: draftCommunity, attachment };
    setPosts((current) => [post, ...current]);
    setDraft(""); setDraftFile(null);
    setComposerOpen(false);
    setCommunity(draftCommunity);
    setTab("recent");
    setVisible(20);
    setPublishing(false);
  };
  return <div className="twitt-feed">
    <section className="discover-intro"><div><span className="kicker">CO-CHAT DISCOVER</span><h2>Drop something useful.</h2><p>Study wins, real questions, and people learning alongside you.</p></div><button className="primary compact" type="button" onClick={() => setComposerOpen(true)}>＋ Write a Twitt</button></section>
    {composerOpen && <section className="twitt-composer"><div className="composer-heading"><strong>Write to your community</strong><button className="icon" type="button" disabled={publishing} onClick={() => setComposerOpen(false)}>×</button></div><textarea disabled={publishing} value={draft} onChange={(event) => setDraft(event.target.value.slice(0, 280))} placeholder="Share a useful thought, question, or study win…" autoFocus /><label className="twitt-media-picker">📎 Add photo/PDF (max 5 MB)<input disabled={publishing} type="file" accept="image/jpeg,image/png,image/webp,image/gif,application/pdf" onChange={(event) => setDraftFile(event.target.files?.[0] || null)} /></label>{draftFile && <small className="twitt-file-name">{draftFile.name}</small>}{publishError && <p className="twitt-sync-error">{publishError}</p>}<div className="composer-footer"><div className="tag-input"><span>#</span><input disabled={publishing} list="twitt-tag-suggestions" value={draftCommunity} onChange={(event) => setDraftCommunity(event.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ""))} placeholder="Add a tag (required)" /><datalist id="twitt-tag-suggestions">{tagSuggestions.map((tag) => <option value={tag} key={tag} />)}</datalist></div><span>{draft.length}/280</span><button className="primary compact" type="button" disabled={!draft.trim() || !draftCommunity || publishing} onClick={() => void createTwitt()}>{publishing ? "◌ Uploading…" : "Post Twitt"}</button></div></section>}
    <div className="community-filter" aria-label="Twitt tag filter">{[["all", "All"], ["following", "Following"], ...popularTags.map((tag) => [tag, `#${tag}`] as const)].map(([id, label]) => <button key={id} className={community === id ? "active" : ""} onClick={() => { setCommunity(id); setVisible(3); }}>{label}</button>)}</div>
    <div className="feed-tabs"><button className={tab === "recent" ? "active" : ""} onClick={() => setTab("recent")}>Recent <small>{communityLabel} · 24h</small></button><button className={tab === "trending" ? "active" : ""} onClick={() => setTab("trending")}>Trending <small>{communityLabel} · daily</small></button></div>
    <div className="follow-strip"><span>Following: {following.length ? following.map((id) => id.toUpperCase()).join(" · ") : "none"}</span><button onClick={() => setCommunity("following")}>View following</button></div>
    {remoteError && <div className="notice twitt-sync-error">{remoteError}<button className="secondary compact" type="button" onClick={() => window.location.reload()}>Retry</button></div>}
    {remoteLoading && !posts.length && <div className="empty-state">Loading real Twitts…</div>}
    <div className="twitt-list">{filtered.slice(0, visible).map((post) => <article className="twitt-card" key={post.id}><div className="twitt-head"><span className="avatar">{authorProfiles[post.handle]?.photoURL ? <img src={authorProfiles[post.handle].photoURL} alt="" /> : post.avatar}</span><div><strong>{post.author}</strong><small>@{post.handle} · {post.age} · {post.community.toUpperCase()}</small></div><div className="twitt-actions"><button className="icon" aria-label="Twitt options" aria-expanded={postMenu === post.id} onClick={() => setPostMenu(postMenu === post.id ? null : post.id)}>•••</button>{postMenu === post.id && <div className="twitt-menu">{post.authorUid === auth?.currentUser?.uid ? <button type="button" className="danger" onClick={() => void removePost(post)}>Delete Twitt</button> : <button type="button" onClick={() => void dismissPost(post)}>Not interested</button>}<button type="button" onClick={() => setPostMenu(null)}>Cancel</button></div>}</div></div><p>{post.body}</p>{post.attachment && (post.attachment.type.startsWith("image/") ? <a className="twitt-media-preview" href={post.attachment.url} target="_blank" rel="noreferrer" download={post.attachment.name}><img src={post.attachment.url} alt={post.attachment.name} /><span>Open / save image</span></a> : <a className="twitt-attachment" href={post.attachment.url} target="_blank" rel="noreferrer" download={post.attachment.name}>📄 {post.attachment.name} · Open / save</a>)}<div className="twitt-meta"><button className={post.liked ? "liked" : ""} onClick={() => handleLike(post)}>♡ {post.likes}</button><button onClick={() => void openComments(post.id)}>◌ {post.comments}</button><span>◉ {post.views}</span><button className={following.includes(post.community) ? "followed" : ""} onClick={() => setFollowing((current) => current.includes(post.community) ? current.filter((id) => id !== post.community) : [...current, post.community])}>{following.includes(post.community) ? "Following" : `Follow ${post.community.toUpperCase()}`}</button></div></article>)}</div>
    {commenting && posts.find((post) => post.id === commenting) && <CommentSheet post={posts.find((post) => post.id === commenting)!} comments={commentsByPost[commenting] || []} loading={commentLoading === commenting} hasMore={Boolean(commentMore[commenting])} names={commentNames} currentUid={auth?.currentUser?.uid} onClose={() => setCommenting(null)} onLoadMore={() => void loadMoreComments(commenting)} onSubmit={(body, file) => void submitComment(posts.find((post) => post.id === commenting)!, body, file)} onLike={(comment) => void likeComment(commenting, comment)} onDelete={(comment) => void removeComment(posts.find((post) => post.id === commenting)!, comment)} />}
    {!remoteLoading && !remoteError && !filtered.length && <div className="empty-state">No Twitts in {communityLabel} yet. Be the first to share something useful.</div>}
    {(visible < filtered.length || remoteHasMore) && <button className="load-more" type="button" onClick={() => void loadMore()} disabled={remoteLoading}>{remoteLoading ? "Loading Twitts…" : "Load 20 more Twitts"}</button>}
    <p className="feed-note">Recent shows the newest posts in this community. Trending is refreshed periodically from eligible posts.</p>
  </div>;
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
          <button type="submit" className="primary" disabled={saving}>
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
  const [voiceTarget, setVoiceTarget] = useState<{ id: string; name: string; photoURL?: string; memberIds: string[] } | null>(null);
  const [page, setPage] = useState("chats");
  const [discoverCommunity, setDiscoverCommunity] = useState<"all" | "jee" | "neet" | "study" | "public" | "following">("all");
  const [conversations, setConversations] =
    useState<Conversation[]>(starterChats);
  const notificationConversationSeen = useRef<Record<string, number>>({});
  const [selected, setSelected] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [text, setText] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<ChatAttachment | null>(null);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const [showNew, setShowNew] = useState(false);
  const [verificationSent, setVerificationSent] = useState(false);
  const [showGroup, setShowGroup] = useState(false);
  const [needsUsername, setNeedsUsername] = useState(false);
  const [senderNames, setSenderNames] = useState<Record<string, string>>({});
  const [replyTarget, setReplyTarget] = useState<ChatMessage | null>(null);
  const [stories, setStories] = useState<Story[]>([]);
  const [incomingCall, setIncomingCall] = useState<CallRecord | null>(null);
  const [groupCall, setGroupCall] = useState<{ id: string; name: string; memberIds: string[]; callerId: string; host: boolean } | null>(null);
  const [dismissedGroupCallIds, setDismissedGroupCallIds] = useState<string[]>([]);
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
  const [emojiOpen, setEmojiOpen] = useState(false);
  const [forwardingMessage, setForwardingMessage] =
    useState<ChatMessage | null>(null);
  // Dark is the default, and the account preference is restored across web
  // refreshes and Android sessions when the user is signed in.
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem("cochat-theme") !== "light");
  const [themeLoaded, setThemeLoaded] = useState(false);
  const [themeLoadedUid, setThemeLoadedUid] = useState<string | null>(null);
  const [conversationMenu, setConversationMenu] = useState<Conversation | null>(
    null,
  );
  const [deleteTarget, setDeleteTarget] = useState<Conversation | null>(null);
  const holdTimers = useRef<Record<string, number>>({});
  const suppressConversationClick = useRef(false);
  const [incomingCallerName, setIncomingCallerName] =
    useState("Incoming caller");
  const [incomingCallerPhoto, setIncomingCallerPhoto] = useState<string | undefined>();
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
  const resendVerification = async () => {
    if (!user) return;
    try {
      await sendEmailVerification(user);
      setVerificationSent(true);
    } catch (e) {
      setError(e instanceof Error ? e.message.replace("Firebase: ", "") : "Could not resend the verification email.");
    }
  };
  useEffect(() => {
    if (!auth) {
      setLoading(false);
      return;
    }
    let settled = false;
    const finishLoading = () => {
      if (settled) return;
      settled = true;
      setLoading(false);
    };
    const unsubscribe = onAuthStateChanged(
      auth,
      (next) => {
        setUser(next);
        finishLoading();
      },
      () => {
        setError("Could not connect to authentication. Please try again.");
        finishLoading();
      },
    );
    const timeout = window.setTimeout(finishLoading, 10000);
    return () => {
      window.clearTimeout(timeout);
      unsubscribe();
    };
  }, []);
  useEffect(() => {
    if (!user || !supabaseReady) return;
    let cancelled = false;
    void user
      .getIdToken()
      .then((idToken) => verifyFirebaseIdentity(idToken))
      .catch(() => {
        if (!cancelled) setError("Signed in, but secure social services are unavailable right now.");
      });
    return () => {
      cancelled = true;
    };
  }, [user]);
  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("cochat-theme", darkMode ? "dark" : "light");
    if (themeLoaded && themeLoadedUid === liveUser?.uid && liveUser && liveUser.uid !== "preview") {
      saveTheme(liveUser.uid, darkMode ? "dark" : "light").catch(() => undefined);
    }
  }, [darkMode, themeLoaded, themeLoadedUid, liveUser?.uid]);
  useEffect(() => {
    if (!liveUser || liveUser.uid === "preview") return;
    const uid = liveUser.uid;
    setThemeLoaded(false);
    setThemeLoadedUid(null);
    const isNativeAndroid = Capacitor.isNativePlatform() && Capacitor.getPlatform() === "android";
    ensureUserProfile(uid, {
      displayName: liveUser.displayName || "",
      email: liveUser.email || "",
      photoURL: liveUser.photoURL || "",
    })
      .then((profileCreatedOrNeedsSetup) => getUserProfile(uid).then((profile) => ({ profile, profileCreatedOrNeedsSetup })))
      .then(({ profile, profileCreatedOrNeedsSetup }) => {
        setProfileName(profile?.displayName || liveUser.displayName || "");
        setProfileUsername(profile?.username || "");
        setProfileBio(profile?.bio || "");
        if (profile?.theme) setDarkMode(profile.theme === "dark");
        setThemeLoaded(true);
        setThemeLoadedUid(uid);
        // Keep the established web flow unchanged. Android cannot rely on a
        // fresh WebView's localStorage, so it uses the profile service result:
        // newly created profiles (or profiles missing a username) see setup;
        // existing complete profiles go directly to the app.
        setNeedsUsername(isNativeAndroid ? profileCreatedOrNeedsSetup : !localStorage.getItem(`cochat-username-${uid}`));
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
    void registerFcmNotifications(notificationsEnabled).catch(() => undefined);
  }, [liveUser?.uid, notificationsEnabled]);
  useEffect(() => {
    if (!liveUser || liveUser.uid === "preview") return;
    const uid = liveUser.uid;
    return watchConversations(uid, (items) => {
      setConversations(items);
      if (!notificationsEnabled) return;
      const seen = notificationConversationSeen.current;
      for (const item of items) {
        const messageAt = item.lastMessageAt?.toMillis() || 0;
        const previous = seen[item.id];
        seen[item.id] = messageAt;
        if (!previous || messageAt <= previous || item.lastSenderId === uid || !item.lastMessage) continue;
        notifyIncomingMessage(item.name || "New Co-Chat message", item.lastMessage);
      }
    });
  }, [liveUser?.uid, notificationsEnabled]);
  useEffect(() => {
    if (!liveUser || liveUser.uid === "preview") return;
    return watchFriendRequests(liveUser.uid, (items) => {
      // The bell represents pending incoming requests.  Keep it in sync with
      // the live Firestore snapshot so a request is shown immediately, even
      // after a reload or when an older localStorage value is stale.
      const incoming = items
        .filter((item) => item.toUid === liveUser.uid && item.status === "pending")
        .map((item) => item.id);
      setUnseenFriendRequestIds(incoming);
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
    const ids: string[] = [
      ...new Set<string>(
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
    ).then((items) => setSenderNames((old) => {
      const next = { ...old };
      items.forEach(([id, name]) => { next[id] = name; });
      return next;
    }));
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
      (item) => item.status === "ringing" && item.memberIds.includes(liveUser?.uid || "") && item.callerId !== liveUser?.uid &&
        (!item.groupId ? item.calleeId === liveUser?.uid : !item.leftIds?.includes(liveUser?.uid || "") && !dismissedGroupCallIds.includes(item.id) && !(groupCall?.id === item.id) && (!item.createdAt || Date.now() - item.createdAt.toMillis() < 60 * 60 * 1000)),
    );
    setIncomingCall(call || null);
  }, [calls, liveUser?.uid, dismissedGroupCallIds, groupCall?.id]);
  useEffect(() => {
    if (!incomingCall?.callerId) return;
    if (incomingCall.groupId) return;
    getUserProfile(incomingCall.callerId)
      .then((profile) => { setIncomingCallerName(profile?.displayName || "Incoming caller"); setIncomingCallerPhoto(profile?.photoURL || undefined); })
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
    }, 30000);
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
        photoURL: profile.photoURL || '',
        lastMessage: "",
        type: "direct" as const,
        active: true,
        lastSeen: profile.lastSeen,
      }))
      .slice(0, 8);
  }, [conversations, friendProfiles, liveUser?.uid, presenceNow]);
  const closeGroupCall = useCallback(() => setGroupCall(null), []);
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
      // The native Google provider keeps its own session on Android. Clear it
      // as well as the Firebase web session so the next Google sign-in shows
      // the account chooser instead of silently reusing the last account.
      if (!preview && Capacitor.isNativePlatform() && Capacitor.getPlatform() === "android") {
        await FirebaseAuthentication.signOut().catch(() => undefined);
      }
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
      localStorage.setItem(`cochat-username-${liveUser.uid}`, profileUsername.trim().toLowerCase());
      setProfileName(profileName.trim());
      setProfileUsername(profileUsername.trim().toLowerCase());
      setProfileSaved(true);
      setError("");
      setTimeout(() => setProfileSaved(false), 2000);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Profile could not be saved.");
    }
  };
  const shareProfile = async (displayName: string, username: string) => {
    const handle = username.trim() ? `@${username.trim()}` : displayName.trim();
    const message = `${displayName.trim() || "A Co-Chat member"} is on Co-Chat — ${handle}`;
    try {
      if (navigator.share) await navigator.share({ title: "Co-Chat profile", text: message, url: window.location.href });
      else {
        await navigator.clipboard.writeText(message);
        setError("Profile details copied to your clipboard.");
      }
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") return;
      setError("Could not share this profile.");
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
  const declineIncomingCall = async () => {
    if (!incomingCall) return;
    if (incomingCall.groupId) {
      setDismissedGroupCallIds(old => old.includes(incomingCall.id) ? old : [...old, incomingCall.id]);
      setIncomingCall(null);
    } else {
      await declineCall(incomingCall.id).catch(() => undefined);
      setIncomingCall(null);
    }
  };
  const acceptIncomingCall = async () => {
    if (!incomingCall || !liveUser) return;
    if (incomingCall.groupId) {
      setGroupCall({ id: incomingCall.id, name: incomingCall.groupName || "Group voice call", memberIds: incomingCall.memberIds, callerId: incomingCall.callerId || "", host: false });
      setIncomingCall(null);
      return;
    }
    const caller = incomingCall.callerId ? await getUserProfile(incomingCall.callerId) : null;
    setVoiceTarget({ id: incomingCall.id, name: caller?.displayName || "Incoming caller", photoURL: caller?.photoURL || undefined, memberIds: incomingCall.memberIds });
    setIncomingCall(null);
    setVoiceRole("callee");
    setShowVoiceCall(true);
  };
  const activeGroupCount = selected?.type === "group"
    ? Math.min(selected.memberIds.length, groupMembers.filter((member) => member.activeStatus !== false && Boolean(member.lastSeen) && presenceNow - (member.lastSeen?.toMillis() || 0) < 90000).length)
    : 0;
  if (groupCall)
    return <main className="app"><GroupVoiceCall uid={liveUser.uid} callId={groupCall.id} groupName={groupCall.name} memberIds={groupCall.memberIds} callerId={groupCall.callerId} host={groupCall.host} onClose={closeGroupCall} /></main>;
  if (selected)
    return (
      <main className="app chat-screen">
        <header className="chat-header">
          <button className="icon" onClick={() => setSelected(null)}>
            ←
          </button>
          <button
            className={`avatar profile-avatar ${selected.type === "group" && activeGroupCount > 0 ? "group-avatar-active" : ""}`}
            type="button"
            title={selected.type === "group" ? "Open group settings" : undefined}
            onClick={selected.type === "group" ? () => setShowChatProfile(true) : undefined}
          >
            <Avatar name={selected.name} photoURL={selected.photoURL} />
          </button>
          <div>
            <strong>{selected.name}</strong>
            <small>
              {selected.type === "group"
                ? (activeGroupCount > 0 && <span className="group-active-summary"><span className="presence-dot" />{activeGroupCount} Active now</span>)
                : selected.id.startsWith("preview-") ? "Preview conversation" : (
                <span className={selected.active ? "active-presence" : ""}>
                  {presenceLabel(selected.active, selected.lastSeen)}
                </span>
              )}
            </small>
          </div>
          <button
            className="icon"
            title="Start audio call"
            onClick={async () => {
              if (selected.type === "group") {
                try {
                  const id = await createCall(selected.memberIds, "audio", liveUser.uid, { id: selected.id, name: selected.name });
                  if (id) setGroupCall({ id, name: selected.name, memberIds: selected.memberIds, callerId: liveUser.uid, host: true });
                } catch (error) { setError(error instanceof Error ? error.message : "Could not start the group call."); }
              } else {
                setVoiceRole("caller");
                setVoiceTarget({ id: selected.id, name: selected.name, photoURL: selected.photoURL || undefined, memberIds: selected.memberIds });
                setShowVoiceCall(true);
              }
            }}
          >
            <svg className="call-icon" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M6.6 3.8 9.2 3c.7-.2 1.4.2 1.7.8l1.2 2.8c.2.5.1 1.1-.3 1.5L10.3 9.6a13.7 13.7 0 0 0 4.1 4.1l1.5-1.5c.4-.4 1-.5 1.5-.3l2.8 1.2c.6.3 1 1 .8 1.7l-.8 2.6c-.2.7-.9 1.1-1.6 1.1C11.1 18.5 5.5 12.9 5.5 5.4c0-.7.4-1.4 1.1-1.6Z" />
              <path d="M14.7 4.1a6.2 6.2 0 0 1 5.2 5.2M14.7 1.2a9.1 9.1 0 0 1 8.1 8.1" />
            </svg>
          </button>
        </header>
        {showChatProfile && selected.type === "group" && (
          <div className="person-profile chat-profile-menu">
            <button
              className="icon close-profile"
              type="button"
              onClick={() => setShowChatProfile(false)}
            >
              ×
            </button>
            <Avatar name={selected.name} photoURL={selected.photoURL} className="avatar large" />
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
                      <Avatar profile={member} />
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
                          <Avatar profile={friend} />
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
              ) : null}
            </div>
          </div>
        )}
        {showVoiceCall && voiceTarget && (
          <VoiceCall
            uid={liveUser.uid}
            otherUid={voiceTarget.memberIds.find((id) => id !== liveUser.uid) || ""}
            otherName={voiceTarget.name}
            otherPhotoURL={voiceTarget.photoURL}
            role={voiceRole}
            onClose={() => { setShowVoiceCall(false); setVoiceTarget(null); }}
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
                      onClick={() => item.attachment && setImagePreview(item.attachment)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(event) => { if ((event.key === "Enter" || event.key === " ") && item.attachment) setImagePreview(item.attachment); }}
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
                  <button
                      className="reply-button"
                      type="button"
                      title="Message options"
                      onClick={(event) => {
                        event.stopPropagation();
                        setMessageMenu(item);
                      }}
                    >
                      ⋯
                    </button>
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
            {messageMenu.senderId === liveUser.uid || messageMenu.senderId === "me" ? (
              <button type="button" onClick={() => {
                void unsendMessage(selected.id, messageMenu.id).catch(() => setError("Could not unsend this message."));
                setMessageMenu(null);
              }}>Unsend</button>
            ) : (
              <button type="button" onClick={() => {
                void deleteMessageForMe(selected.id, messageMenu.id, liveUser.uid).catch(() => setError("Could not delete this message."));
                setMessageMenu(null);
              }}>Delete for me</button>
            )}
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
                  <Avatar name={item.name} photoURL={item.photoURL} />
                  <span className="chat-copy">
                    <strong>{item.name}</strong>
                    <span>Send message</span>
                  </span>
                </button>
              ))}
          </div>
        )}
        {imagePreview && (
          <div className="media-preview-backdrop" role="dialog" aria-modal="true" aria-label="Image preview" onClick={() => setImagePreview(null)}>
            <div className="media-preview-panel" onClick={(event) => event.stopPropagation()}>
              <button className="icon media-preview-close" type="button" onClick={() => setImagePreview(null)} aria-label="Close image preview">×</button>
              <img src={imagePreview.url} alt={imagePreview.name} />
              <div className="media-preview-actions">
                <a className="primary" href={imagePreview.url} download={imagePreview.name} target="_blank" rel="noreferrer">Save image</a>
                <button className="secondary" type="button" onClick={() => setImagePreview(null)}>Close</button>
              </div>
            </div>
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
          {emojiOpen && <div className="emoji-picker" role="listbox">
            {['😀','😂','😍','😊','👍','❤️','🎉','🔥','🙏','😎','👏','✨'].map(emoji => (
              <button key={emoji} type="button" onClick={() => setText(current => current + emoji)}>{emoji}</button>
            ))}
          </div>}
          <button className="emoji-button" type="button" title="Add emoji" onClick={() => setEmojiOpen(open => !open)}>☺</button>
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
        {incomingCall && (
          <IncomingCall
            name={incomingCall.groupId ? (incomingCall.groupName || "Group voice call") : incomingCallerName}
            photoURL={incomingCall.groupId ? undefined : incomingCallerPhoto}
            group={Boolean(incomingCall.groupId)}
            onDecline={declineIncomingCall}
            onAccept={acceptIncomingCall}
          />
        )}
      </main>
    );
  return (
    <main className="app">
      <header className="topbar">
        {page === "settings" ? (
          <div className="settings-topbar-title">
            <button className="icon" type="button" title="Back" onClick={() => setPage("chats")}>←</button>
            <strong>Settings and Profile</strong>
          </div>
        ) : (
          <div>
            <div className="brand-line">
              <span className="mini-mark">C</span>
              <strong>Co‑Chat</strong>
            </div>
            <div className="eyebrow">WELCOME BACK</div>
          </div>
        )}
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
            <Avatar name={liveUser.displayName || liveUser.email || "U"} photoURL={liveUser.photoURL || undefined} />
          </button>
        </div>
      </header>
      {user && !user.emailVerified && (
        <div className="notice" role="status">
          Verify your email to keep your account secure. {verificationSent ? "Check your inbox." : <button type="button" className="secondary compact" onClick={() => void resendVerification()}>Resend email</button>}
        </div>
      )}
      {(page === "chats" || page === "communities") && showFriendRequests && (
        <div className="notification-panel">
          <FriendZone uid={liveUser.uid} onMessage={startConversation} />
        </div>
      )}
      {incomingCall && (
        <IncomingCall
          name={incomingCall.groupId ? (incomingCall.groupName || "Group voice call") : incomingCallerName}
          photoURL={incomingCall.groupId ? undefined : incomingCallerPhoto}
          group={Boolean(incomingCall.groupId)}
          onDecline={declineIncomingCall}
          onAccept={acceptIncomingCall}
        />
      )}
      {showVoiceCall && voiceTarget && (
        <VoiceCall
          uid={liveUser.uid}
          otherUid={voiceTarget.memberIds.find((id) => id !== liveUser.uid) || ""}
          otherName={voiceTarget.name}
          otherPhotoURL={voiceTarget.photoURL}
          role={voiceRole}
          onClose={() => { setShowVoiceCall(false); setVoiceTarget(null); }}
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
                      <Avatar name={name} profile={profile} active />
                      <span>{name.split(" ")[0]}</span>
                    </button>
                    );
                  })}
                  {!onlineUsers.length && <small>No friends are online right now.</small>}
                </div>
              </section>
            )}
            {page === "communities" && (
              <>
              <section className="community-hero"><div><span className="kicker">YOUR COMMUNITIES</span><h2>Find your people.</h2><p>Find your lane, swap ideas, and stay accountable together.</p></div><span className="community-symbol">♧</span></section>
              <div className="community-rail"><button type="button" onClick={() => { setDiscoverCommunity("jee"); setPage("discover"); }}><span>JEE</span><strong>JEE Prep</strong><small>Public · 2.4k · View Twitts</small></button><button type="button" onClick={() => { setDiscoverCommunity("study"); setPage("discover"); }}><span>⌂</span><strong>Study circles</strong><small>Private · 8 members · View Twitts</small></button><button type="button" onClick={() => setShowGroup(true)}><span>+</span><strong>Create one</strong><small>Your space · New group</small></button></div>
              <div className="chat-tools">
                <button
                  className="secondary compact"
                  type="button"
                  onClick={() => setShowGroup(true)}
                >
                  ＋ New group
                </button>
              </div>
              </>
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
                  <Avatar name={item.name} photoURL={item.photoURL} active={Boolean(item.active)} />
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
                <div className="empty-state"><strong>No chats yet.</strong><span>Find someone from People and start the conversation.</span></div>
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
        {page === "study" && <StudyHome uid={liveUser.uid} onOpenDiscover={() => { setDiscoverCommunity("all"); setPage("discover"); }} />}
        {page === "discover" && <TwittFeed initialCommunity={discoverCommunity} />}
        {page === "search" && <SearchPanel uid={liveUser.uid} onSelect={startConversation} />}
        {page === "status" && (
          <div className="hero-card coming-soon">
            <span>◉</span>
            <h2>Stories are on the way</h2>
            <p>
              We’re keeping Co‑Chat focused on fast, reliable conversations first.
              Stories will land when they’re ready.
            </p>
          </div>
        )}
        {(page === "profile" || page === "settings") && (
          <div className="settings-page">
            <div className="settings-hero">
              <div><span className="settings-eyebrow">ACCOUNT CENTER</span><h1>{page === "settings" ? "Settings & profile" : "Your profile"}</h1><p>Make Co‑Chat feel like your space.</p></div>
              <div className="settings-hero-mark">✦</div>
            </div>
            <form className="profile-card settings-profile-card" onSubmit={save}>
              <div className="settings-profile-heading"><div className="settings-avatar-wrap"><Avatar name={profileName || liveUser.email || "U"} photoURL={liveUser.photoURL || undefined} className="avatar large" /><span className={`settings-presence ${activeStatus ? "online" : ""}`} /></div><div><span className="settings-eyebrow">PROFILE</span><h2>{profileName || "Co Chat member"}</h2><p>{liveUser.email}</p></div></div>
              <div className="profile-details" aria-label="Profile details">
                <span><b>@</b>{profileUsername || "choose a username"}</span>
                <span><b>✦</b>{liveUser.emailVerified ? "Verified account" : "Email verification pending"}</span>
                <span><b>◌</b>{activeStatus ? "Available to friends" : "Activity hidden"}</span>
              </div>
              <div className="settings-form-grid">
                <label className="field-label">Display name<input value={profileName} onChange={(e) => setProfileName(e.target.value)} required /></label>
                <label className="field-label">Username<input value={profileUsername} onChange={(e) => setProfileUsername(e.target.value.replace(/[^a-zA-Z0-9_]/g, "").toLowerCase())} minLength={3} maxLength={24} pattern="[a-z0-9_]+" required /><small>3–24 characters: letters, numbers, and underscores.</small></label>
              </div>
              <label className="field-label settings-bio-field">About you<textarea value={profileBio} onChange={(e) => setProfileBio(e.target.value)} maxLength={160} placeholder="A short line about what you are learning…" /><small>Shown when someone opens your profile from People or your friend list.</small></label>
              <div className="settings-save-row"><span>{profileSaved ? "Profile saved successfully" : "Changes sync across your devices"}</span><button type="submit" className="primary" disabled={preview}>{profileSaved ? "Saved ✓" : "Save profile"}</button></div>
            </form>
            <div className="settings settings-list">
              <div className="settings-section-label">PREFERENCES</div>
              <button type="button" onClick={() => void shareProfile(profileName, profileUsername)}>
                <span className="settings-row-icon">↗</span><span className="settings-option-copy"><b>Share your profile</b><small>Send your name and handle to a friend</small></span><span>›</span>
              </button>
              <button
                type="button"
                onClick={() => setDarkMode((value) => !value)}
              >
                <span className="settings-row-icon">◐</span><span className="settings-option-copy"><b>Appearance</b><small>Choose the {darkMode ? "dark" : "light"} Co‑Chat theme</small></span><span className="settings-value">{darkMode ? "Dark" : "Light"} <span className="chevron">›</span></span>
              </button>
              <button type="button" onClick={() => setNotificationsEnabled((value) => !value)}>
                <span className="settings-row-icon">⌁</span><span className="settings-option-copy"><b>Notifications</b><small>Get updates about messages and study activity</small></span><span className={`settings-toggle ${notificationsEnabled ? "on" : ""}`} aria-label={notificationsEnabled ? "Notifications on" : "Notifications off"}><span /></span>
              </button>
              <button type="button" onClick={() => setDiscoverable((value) => !value)}>
                <span className="settings-row-icon">◎</span><span className="settings-option-copy"><b>Discoverability</b><small>Let friends find you in People and Discover</small></span><span className={`settings-toggle ${discoverable ? "on" : ""}`} aria-label={discoverable ? "Discoverability on" : "Discoverability off"}><span /></span>
              </button>
              <button
                type="button"
                onClick={() => setActiveStatus((value) => !value)}
              >
                <span className={`settings-row-icon ${activeStatus ? "online" : ""}`}>●</span><span className="settings-option-copy"><b>Active status</b><small>Let friends see when you are available</small></span><span className={`settings-toggle ${activeStatus ? "on" : ""}`} aria-label={activeStatus ? "Active status on" : "Active status off"}><span /></span>
              </button>
              <button type="button" className="settings-danger" onClick={logout}>
                <span className="settings-row-icon">↪</span><span className="settings-option-copy"><b>Log out</b><small>Sign out of this device</small></span><span>›</span>
              </button>
            </div>
          </div>
        )}
      </section>
      <Nav page={page} setPage={setPage} />
    </main>
  );
}

function IncomingCall({
  name,
  photoURL,
  group,
  onAccept,
  onDecline,
}: {
  name: string;
  photoURL?: string;
  group?: boolean;
  onAccept: () => void;
  onDecline: () => void;
}) {
  return (
    <div className="call-backdrop">
      <section className="call-card">
        <Avatar name={name} photoURL={photoURL} className="avatar large" />
        <p className="eyebrow">{group ? "INCOMING GROUP VOICE CALL" : "INCOMING VOICE CALL"}</p>
        <h2>{name}</h2>
        <p>{group ? "Join the conference call" : "Wants to talk with you"}</p>
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
    const ids: string[] = [
      ...new Set<string>(
        requests
          .flatMap((item) => [item.fromUid, item.toUid])
          .filter((id) => id !== uid),
      ),
    ];
    Promise.all(
      ids.map(async (id) => [id, await getUserProfile(id)] as const),
    ).then((items) => setProfiles((old) => {
      const next = { ...old };
      items.forEach(([id, profile]) => { if (profile) next[id] = profile; });
      return next;
    }));
  }, [requests, uid]);
  const incoming = requests.filter(
    (item) => item.toUid === uid && !blocked.includes(item.fromUid),
  );
  const friends = requests.filter(
    (item) =>
      item.status === "accepted" &&
      !blocked.includes(item.fromUid === uid ? item.toUid : item.fromUid),
  );
  const shareProfile = async (profile: UserProfile) => {
    const message = `${profile.displayName} is on Co-Chat — @${profile.username}`;
    try {
      if (navigator.share) await navigator.share({ title: "Co-Chat profile", text: message, url: window.location.href });
      else await navigator.clipboard.writeText(message);
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") return;
    }
  };
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
                  <Avatar profile={profile} />
                </button>
                <span className="chat-copy">
                  <strong>{profile?.displayName || "Someone"}</strong>
                  <span>@{profile?.username || "user"}</span>
                </span>
                <button
                  className="secondary compact"
                  type="button"
                  onClick={() => void (async () => {
                    await respondToFriendRequest(item.fromUid, uid, true)
                    // The friend request store is shared with Firebase, while
                    // Supabase chat keeps conversations in its own database.
                    // Create the direct chat immediately after acceptance so
                    // both users see it in their conversation list.
                    if (profile && isSupabaseChatEnabled()) await createConversation(uid, profile)
                  })().catch(() => undefined)}
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
                  <Avatar profile={other} />
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
          <Avatar profile={focused} className="avatar large" />
          <h3>{focused.displayName}</h3>
          <p>@{focused.username}</p>
          {profileExpanded && (
            <div className="public-profile-details">
              <span>{focused.bio?.trim() || "This person has not added a bio yet."}</span>
              <small>Friend on Co-Chat · Public profile</small>
              {focused.activeStatus === false && <small>Active status hidden</small>}
            </div>
          )}
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
            <button className="secondary" type="button" onClick={() => void shareProfile(focused)}>
              Share
            </button>
            <button
              className="secondary"
              type="button"
              onClick={() => setProfileExpanded(true)}
            >
              View profile
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
  const shareProfile = async (profile: UserProfile) => {
    const message = `${profile.displayName} is on Co-Chat — @${profile.username}`;
    try {
      if (navigator.share) await navigator.share({ title: "Co-Chat profile", text: message, url: window.location.href });
      else {
        await navigator.clipboard.writeText(message);
        setActionError("Profile details copied to your clipboard.");
      }
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") return;
      setActionError("Could not share this profile.");
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
              <Avatar profile={item as UserProfile} />
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
                <Avatar profile={profile} />
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
          <Avatar profile={focused} className="avatar large" />
          <h3>{focused.displayName}</h3>
          <p>@{focused.username}</p>
          <small>
            {relationships[focused.uid] === "friends"
              ? "Friend on Co-Chat"
              : "Co-Chat profile"}
          </small>
          <div className="public-profile-details">
            <span>{focused.bio?.trim() || "This person has not added a bio yet."}</span>
            <small>Username: @{focused.username}</small>
            {focused.activeStatus === false && <small>Active status hidden</small>}
          </div>
          <div className="profile-actions">
            {relationships[focused.uid] === "friends" ? (
              <button className="primary" type="button" onClick={() => { setFocused(null); onSelect(focused); }}>Message</button>
            ) : relationships[focused.uid] === "none" ? (
              <button className="primary" type="button" onClick={() => void action(focused)}>Add friend</button>
            ) : (
              <button className="secondary" type="button" disabled>{relationships[focused.uid] === "incoming" ? "Request received" : "Request sent"}</button>
            )}
            <button className="secondary" type="button" onClick={() => void shareProfile(focused)}>Share</button>
          </div>
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
        <div className="group-stepper" aria-label={`Step ${step} of 2`}><span className={step >= 1 ? "active" : ""}>1</span><i className={step === 2 ? "active" : ""}/><span className={step === 2 ? "active" : ""}>2</span></div>
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
                  <Avatar profile={profile} />
                  <span className="chat-copy">
                    <strong>{profile.displayName}</strong>
                    <span>@{profile.username}</span>
                  </span>
                  <span>＋</span>
                </button>
              ))}
              {!results.length && <div className="group-picker-empty"><strong>{term ? "No friend found" : "Your available friends will appear here"}</strong><span>{term ? "Try a different name or username." : "Accept a friend request first, then add them to a group."}</span></div>}
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
              <Avatar profile={profile} />
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
            <Avatar profile={focused} className="avatar large" />
            <h3>{focused.displayName}</h3>
            <p>@{focused.username}</p>
            <button className="primary" onClick={() => onSelect(focused)}>
              Message {focused.displayName.split(" ")[0]}
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
