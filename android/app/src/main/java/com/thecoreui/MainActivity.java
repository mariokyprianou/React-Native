package com.thecoreui;

import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import com.facebook.react.ReactActivity;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.thecoreui.R;
import android.R.layout;
import android.view.WindowManager;

import org.devio.rn.splashscreen.SplashScreen;

public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "TheCoreUI";
  }

  @Override
  protected void onCreate(Bundle savedInstanceState) {
      SplashScreen.show(this, com.thecoreui.R.style.SplashTheme);
      super.onCreate(savedInstanceState);
      getWindow().setFlags(WindowManager.LayoutParams.FLAG_SECURE, WindowManager.LayoutParams.FLAG_SECURE);

  }

    @Override
    public void onNewIntent(Intent intent) {
        if (intent.getData() != null) {
            Uri deepLinkURL = intent.getData();
            ReactContext reactContext = getReactNativeHost().getReactInstanceManager().getCurrentReactContext();
            sendEvent(reactContext, "url", deepLinkURL.toString());
        }
    }

    private void sendEvent(ReactContext reactContext, String eventName, String str) {
        reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class).emit(eventName, str);
    }
}
