# React Native Project Setup

## Requirements before starting

1. Followed the [README](./README.md).
2. Have the necessary platform-specific app bundle identifiers.
3. Design Team have provided the iOS App Icons (20pt, 29pt, 40pt, 60pt & 1024pt).
4. App designs are available on Zeplin - (Styles & Fonts).
5. GraphQL schema has been created.
6. Platform specific:

- iOS - Following feature documents, update the General tab with the required Device (iPhone / iPad) and the Device Orientation (default to Portrait).

---

### App Identifier

Update the App Identifiers throughout the app.

#### iOS

1. Open project in Xcode.
2. In the General view, update the `Bundle Identifier` with the correct value.

#### Android

1. In Visual Code Studio, update the `applicationId` in [android/app/build.gradle](./android/app/build.gradle), the `package` in [android/app/src/main/AndroidManifest.xml](./android/app/src/main/AndroidManifest.xml) and the folder structure in `./android/app/src/main/java` so a new directory is made for each part of the identifier (currently it is: com/thecoreui).

---

### App Icons

#### iOS

1. Open project in Xcode.
2. Navigate to the `Images.xcassets` folder within the main project folder (TheCoreUI).
3. Click on AppIcon, drag & drop the correct icon to match the required size.

#### Android

1. Open project in Android Studio.
2. Follow the steps in the [link](https://developer.android.com/studio/write/image-asset-studio#access) to add the icons.

---

### Splash Screen

#### iOS

1. Open project in Xcode.
2. Navigate to `LaunchScreen.xib` in the main project folder (TheCoreUI).
3. Update the screen with the new splash screen.

#### Android

1. Follow the steps in the [link](https://github.com/crazycodeboy/react-native-splash-screen#getting-started) to add the SplashScreen.

---

### App Center

1. Login in to [AppCenter](https://appcenter.ms/orgs/The-Distance/applications).
2. Click on `Add new app`.
3. Complete the App Name, OS (Android / iOS) and the Platform (React Native).
4. Click on `Build` and connect the repo through `BitBucket`. If it doesn't show, then the repo needs it's permissions amending to show on BitBucket.
5. A list of available committed branches will show. Click on the `spanner` on the right-hand side.
6. Configure the settings.
7. Complete setup by clicking 'Save and Build'.
8. Repeat the above steps (2-7) but for the other Platform.

---

### Crashlytics and Analytics

Check the Feature Documents to see if Crashlytics and Analytics are required.

<p>
1. To add [AppCenter](https://docs.microsoft.com/en-us/appcenter) and AppCenter crashes, please follow the guide [here](https://docs.microsoft.com/en-us/appcenter/sdk/getting-started/react-native).
2. To add [Firebase](https://github.com/invertase/react-native-firebase) (Crashlytics and Analytics), please follow the guide [here](https://invertase.io/oss/react-native-firebase/quick-start/existing-project).

---

### Import Zeplin Styles and Fonts

1. Open Zeplin and navigate through to `Styleguide`.
2. Locate [AppTheme](./src/styles/AppTheme.js) in the styles folder.
3. Create files for Colors, FontFamilies, FontSizes, FontWeights and TextStyles within this folder and update using styles from Zeplin.
4. When adding colors, where possible, please use the rgba() color option as this makes it easier to update the alpha on it.
5. Use these to create the App-specific styles so they override the BaseTheme styles by adding them underneath the `...BaseTheme`.

---

### Setup GraphQL Schema and Apollo

1. Update the [TypeDefs](./src/apollo/) file.
2. Using the examples in the [README_APOLLO](./README_APOLLO.md). Update all the queries, mutations and implementations to follow the project schema.

---

### Setup Navigation Hierarchy

**WORK IN PROGRESS**

---

### Configure Environments

1. Update the Environment variables in the [env-vars.sh](./env-vars.sh) file created in Project setup.

---

### Distribute to AppCenter

1. Push the code to AppCenter to make sure it builds on both platforms and that they both open/work as expected i.e. show the Hooray image.
