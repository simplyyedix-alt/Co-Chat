package com.cochat.app;

import android.Manifest;
import android.os.Build;
import android.os.Bundle;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
    private static final int COCHAT_PERMISSIONS = 7001;

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
            requestPermissions(new String[] {
                Manifest.permission.RECORD_AUDIO,
                Manifest.permission.POST_NOTIFICATIONS
            }, COCHAT_PERMISSIONS);
        } else {
            requestPermissions(new String[] { Manifest.permission.RECORD_AUDIO }, COCHAT_PERMISSIONS);
        }
    }
}
