import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.pps.relevamiento',
  appName: 'Relevamiento Visual',
  webDir: 'www',
  bundledWebRuntime: false,
  plugins:{
    SplashScreen: {
      launchShowDuration: 5000,
      launchAutoHide: true,
      /*launchFadeOutDuration: 10000,*/
      backgroundColor: "#CB9173",
      androidSplashResourceName: "splash",
      androidScaleType: "CENTER_CROP",
      showSpinner: false,
      /*androidSpinnerStyle: "large",
      iosSpinnerStyle: "small",
      spinnerColor: "#999999",*/
      splashFullScreen: true,
      splashImmersive: true,
      layoutName: "launch_screen",
      useDialog: true,
    },
  }
};

export default config;
