package com.kiosonapp;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.github.kevinejohn.keyevent.KeyEventPackage;
import com.rhaker.reactnativeselectcontacts.ReactNativeSelectContacts;
import com.mg.app.PickerPackage;
import com.horcrux.svg.SvgPackage;
import fr.bamlab.rnimageresizer.ImageResizerPackage;
import com.showlocationservicesdialogbox.LocationServicesDialogBoxPackage;
import com.rusel.RCTBluetoothSerial.RCTBluetoothSerialPackage;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import com.ocetnik.timer.BackgroundTimerPackage;
import com.avishayil.rnrestart.ReactNativeRestartPackage;
import com.evollu.react.fcm.FIRMessagingPackage;
import com.smixx.fabric.FabricPackage;
import com.wheelpicker.WheelPickerPackage;
import com.lwansbrough.RCTCamera.RCTCameraPackage;
import com.devfd.RNGeocoder.RNGeocoderPackage;
import com.airbnb.android.react.maps.MapsPackage;
import org.devio.rn.splashscreen.SplashScreenReactPackage;
import com.lugg.ReactNativeConfig.ReactNativeConfigPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.crashlytics.android.Crashlytics;
import io.fabric.sdk.android.Fabric;
import com.i18n.reactnativei18n.ReactNativeI18n;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
          new PickerPackage(),
          new SvgPackage(),
          new ReactNativeSelectContacts(),
          new ImageResizerPackage(),
          new LocationServicesDialogBoxPackage(),
          new RCTBluetoothSerialPackage(),
          new RNDeviceInfo(),
          new BackgroundTimerPackage(),
          new ReactNativeRestartPackage(),
          new FIRMessagingPackage(),
          new FabricPackage(),
          new WheelPickerPackage(),
          new RCTCameraPackage(),
          new RNGeocoderPackage(),
          new MapsPackage(),
          new SplashScreenReactPackage(),
          new ReactNativeConfigPackage(),
          new ReactNativeI18n(),
          new KeyEventPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    Fabric.with(this, new Crashlytics());
    SoLoader.init(this, /* native exopackage */ false);
  }
}