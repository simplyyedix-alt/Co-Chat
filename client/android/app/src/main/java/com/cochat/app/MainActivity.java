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

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        // Delay until the first frame is visible so Android can display the
        // permission sheet above the Co-Chat screen instead of behind the
        // WebView/BlueStacks launch animation.
        new Handler(Looper.getMainLooper()).postDelayed(this::requestCoChatPermissions, 900);
    }

    private void requestCoChatPermissions() {
        List<String> missing = new ArrayList<>();
        addIfMissing(missing, Manifest.permission.RECORD_AUDIO);
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
            addIfMissing(missing, Manifest.permission.POST_NOTIFICATIONS);
            addIfMissing(missing, Manifest.permission.READ_MEDIA_IMAGES);
            addIfMissing(missing, Manifest.permission.READ_MEDIA_VIDEO);
        } else {
            addIfMissing(missing, Manifest.permission.READ_EXTERNAL_STORAGE);
        }
        if (!missing.isEmpty()) {
            requestPermissions(missing.toArray(new String[0]), COCHAT_PERMISSION_REQUEST);
        }
    }

    private void addIfMissing(List<String> missing, String permission) {
        if (checkSelfPermission(permission) != PackageManager.PERMISSION_GRANTED) {
            missing.add(permission);
        }
    }
}
