package com.kiosonapp;

import android.os.Bundle;
import android.view.KeyEvent;
import android.widget.Toast;

import org.devio.rn.splashscreen.SplashScreen;
import com.facebook.react.ReactActivity;
import com.github.kevinejohn.keyevent.KeyEventModule;

public class MainActivity extends ReactActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
    }

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */

    @Override
    protected String getMainComponentName() {
        return "KiosonAPP";
    }

    @Override
    public boolean onKeyDown(int keyCode, KeyEvent event) {
//        if(keyCode == KeyEvent.KEYCODE_CAMERA)
//            Toast.makeText(this, "on Key Press", Toast.LENGTH_SHORT).show();
        KeyEventModule.getInstance().onKeyDownEvent(keyCode, event);

        super.onKeyDown(keyCode, event);
        return true;
    }
}
