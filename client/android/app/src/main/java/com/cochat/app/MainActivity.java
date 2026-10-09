package com.cochat.app;

import android.os.Bundle;
import android.os.Build;
import android.os.Handler;
import android.os.Looper;
import android.Manifest;
import android.content.pm.PackageManager;
import com.getcapacitor.BridgeActivity;
import java.util.ArrayList;
import java.util.List;

public class MainActivity extends BridgeActivity {
    private static final int COCHAT_PERMISSION_REQUEST = 1001;
    private boolean permissionFlowStarted;
    private boolean notificationPromptFinished;
    private boolean mediaPromptFinished;

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        // Wait until the first frame is visible. Android will then show each
        // permission sheet above Co-Chat instead of behind the launch screen.
        new Handler(Looper.getMainLooper()).postDelayed(this::requestCoChatPermissions, 1400);
    }

    private void requestCoChatPermissions() {
        if (permissionFlowStarted) return;
        permissionFlowStarted = true;
        requestNextPermissionGroup();
    }

    private void requestNextPermissionGroup() {
        if (mediaPromptFinished) return;
        List<String> missing = new ArrayList<>();
        if (!notificationPromptFinished && Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
            addIfMissing(missing, Manifest.permission.POST_NOTIFICATIONS);
        }
        if (!missing.isEmpty()) {
            notificationPromptFinished = true;
            requestPermissions(missing.toArray(new String[0]), COCHAT_PERMISSION_REQUEST);
            return;
        }
        missing.clear();
        addIfMissing(missing, Manifest.permission.RECORD_AUDIO);
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
            addIfMissing(missing, Manifest.permission.READ_MEDIA_IMAGES);
            addIfMissing(missing, Manifest.permission.READ_MEDIA_VIDEO);
        } else {
            addIfMissing(missing, Manifest.permission.READ_EXTERNAL_STORAGE);
        }
        mediaPromptFinished = true;
        if (!missing.isEmpty()) requestPermissions(missing.toArray(new String[0]), COCHAT_PERMISSION_REQUEST);
    }

    @Override
    public void onRequestPermissionsResult(int requestCode, String[] permissions, int[] grantResults) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);
        if (requestCode == COCHAT_PERMISSION_REQUEST) {
            // Continue to the microphone/media prompt after the notification
            // dialog is dismissed, including when the user chooses Deny.
            requestNextPermissionGroup();
        }
    }

    private void addIfMissing(List<String> missing, String permission) {
        if (checkSelfPermission(permission) != PackageManager.PERMISSION_GRANTED) {
            missing.add(permission);
        }
    }
}
