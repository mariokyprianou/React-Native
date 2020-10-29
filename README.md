# The Core UI Vanilla v4.1

#### Development platform

| OS      |  Support   |
| ------- | :--------: |
| Mac     |   `YES`    |
| Windows |   `YES`    |
| Linux   | `untested` |

#### Requirements

-   [Node](https://nodejs.org) `10.x` or newer
-   [NPM](https://npmjs.com/) `6.2.0` or newer
-   [React Native](http://facebook.github.io/react-native/docs/getting-started.html) for development

#### Stack / Libraries

-   [React](https://facebook.github.io/react/) `16.11.0` react library
-   [React Native](https://facebook.github.io/react-native/) `0.62.2` for building native apps using react
-   [Babel](http://babeljs.io/) `7.x.x` for ES6+ support

---

## Get Started

#### 1. Prerequisites

Minimum / Tested

| Node Version | NPM Version |
| :----------: | :---------: |
|   `8.11.4`   |   `5.6.0`   |

---

#### 2. Installation

- Clone repo the-core-v4.1-ui-vanilla.
- Create a new repo in BitBucket under the new Project.
- Name the repo as: project-name-react-native.
- Clone the empty repo.
- Copy all files (except .GIT file) from the-core-v4.1-ui-vanilla to the newly created empty repo.
- In package.json - update the name of the app to match the given project name.
- Commit with Jira ticket number:

```
"chore(jira_ticket_number): Initial Commit."
```

- Push to BitBucket.
- Checkout Develop branch.
- Add Dependencies:

```
yarn
```

- Install native iOS pod dependencies located in `./ios`:

```
pod install
```

- Create a `local.properties` file for Android. Located in `./android`. In the file add the following:

```
sdk.dir=/Users/your-directory/Library/Android/sdk
```

this needs to locate where your Android sdk is found.

- Start your required platform:

```
yarn ios/android
```

## iOS

- Objective-C based Xcode project
- CocoaPods Workspace ready
- Swift 4.2 Support

#### Requirements

- [CocoaPods](https://cocoapods.org) `1.8.0` or newer
- [Xcode](https://developer.apple.com/xcode/) for iOS development

#### Project Configuration

| Feature           | Version |
| ----------------- | :-----: |
| Swift             |  `4.2`  |
| Deployment Target | `12.0`  |

---

## Android

- Latest Android project
- Kotlin Support
- Support for Gradle 4.9
- Support for Android JSC (improved support for JavascriptCore like ES6 syntax)

#### Requirements

- [Android Studio](https://developer.android.com/studio/index.html) for Android development
- [Android SDK](https://developer.android.com/sdk/) `23.0.1` or newer for Android development

#### Project Configuration

| Feature        |             Version              |
| -------------- | :------------------------------: |
| Gradle         |            `4.9-RC1`             |
| Android Gradle |          `3.3.0-ALPHA3`          |
| Kotlin         |             `1.2.50`             |
| Target SDK     |               `27`               |
| JSC            | `org.webkit:android-jsc:r224109` |

---

## Project Setup

- To complete project setup please follow the [Project Setup](./README_PROJECT_SETUP.md) guide.

---

## Project Secrets

Project secrets should be held within the native iOS and Android app binaries so they don't appear in the JS Bundle.

Project secrets should not be checked into git. (Ensure the `env-vars.sh` and `Secrets.generated.swift` files are not added to git.)

The project contains `../../environment/Secrets.js` which is a wrapper to fetch all secrets in the native projects.

To call the function, simply do:

```
const secrets = Secrets();
console.log(secrets.graphQLUrl);
```

To add secrets to a the project, create an `env-vars.sh` file and add it to the Root directory of the React Native project. Ensure it is added to the `.gitignore`.

For example:

```
export AWS_GRAPHQL_URL_STAGING="1"
export AWS_USER_POOL_ID_STAGING="2"
export AWS_USER_POOL_CLIENT_ID_STAGING="3"
export AWS_REGION_STAGING="4"
export AWS_GRAPHQL_URL_PRODUCTION="5"
export AWS_USER_POOL_ID_PRODUCTION="6"
export AWS_USER_POOL_CLIENT_ID_PRODUCTION="7"
export AWS_REGION_PRODUCTION="8"
export AWS_GRAPHQL_URL_DEVELOPMENT="9"
export AWS_USER_POOL_ID_DEVELOPMENT="10"
export AWS_USER_POOL_CLIENT_ID_DEVELOPMENT="11"
export AWS_REGION_DEVELOPMENT="12"
```

The native iOS and Android projects are configured to handle the 12 secrets in the above example. If more secrets need to be added, use the following steps:

#### iOS

- Add the new variable into the `env-vars.sh`.
- Open Xcode, select your project Target, select Build Phases, open the 'Generate Secrets' build script and add in a new reference to the new variable.
- Open `Secrets.stencil` and add in the new variable to the `Struct`, and a new class function to return the variable.
- Build the project and the `Secrets.generated.swift` file will now contain the newly added variable.
- Open the `SecretsManager.h` file and edit the `fetch` function to return the new variable in `Secrets.generated.swift`.
- The newly added variable will now be available in JavaScript.

#### Android

- Add the new variable into the `env-vars.sh`.

The `/android/app/build.gradle` contains the following code to parse the `env-vars.sh` file and add each variable into the Android `BuildConfig`.

```
rootProject.file("../env-vars.sh").readLines().each() {
  def (key, value) = it.tokenize('=')
  def parsedKey = key.substring(7, key.length())
  def parsedValue = value
  buildConfigField("String", parsedKey, parsedValue)
}
```

- Open the `SecretsManager.java` file and edit the `fetch` function to return the new variable in the Android `BuildConfig`.
- The newly added variable will now be available in JavaScript.

---

## UI Theming

The project contains a single theme file `AppTheme.js`.

This file inherits default material design styles from `BaseTheme.js` in the `the-core-ui-base-theme` dependency.

All components and modules used within The Core 4.1 also inherit styles from `the-core-ui-base-theme`.

The `AppTheme.js` contains styles specific to this project. This file inherits `BaseTheme.js` and hence can override base styles.

For example:

`import Theme from "../../styles/AppTheme";`

Directly use the Theme to access the properties in the file to style your components.

```
import React from 'react';
import { Text } from 'react-native';
import { Button } from 'react-native-elements';

import Theme from "../../styles/theme";

function MyComponent(props) {
  <Button
    buttonStyle={{
      backgroundColor: Theme.colors.primary
    }}
  />
}

export default MyComponent;
```

---

## Localisation and Dictionary

The dictionary is located at `./src/localisation/Strings.js`.

The dictionary has a locale variable. This is hard-coded in the boilerplate but can be changed to a dynamic variable. The dictionary exports the correct version based on this locale variable. This boilerplate includes and English (en-GB) locale and French (fr-FR) locale. The dictionary stores the different locales in an object which can be accessed across the application.

Dictionary example:

```
const translateDictionary = {
  "en-GB": {
    Cognito: {
      SignIn: {
        UserError: "Please enter a username",
        PasswordError: "Please enter a valid password"
      }
    }
  },
  "fr-FR": {
    Cognito: {
      SignIn: {
        UserError: "Merci d'entrer un nom d'utilisateur",
        PasswordError: "Entrer un mot de passe valide s'il vous plait"
      }
    }
  }
}
```

We can then access this dictionary by first importing the dictionary in the file we need to use it in.

```
import Strings from "src/localisation/Strings";
```

##### Note that the path should match the relative path from the file

Once imported we can then use the dictionary in our app.

```
<Text> Strings.Cognito.SignIn.PasswordError </Text>
```

---

## Adding Screens

Create screens in the screens directory `./src/screens`. Name the screen file with

```
<name>Screen.js
```

Import/add ALL common/shared APP screens to both NATIVE & WEB platforms in `./src/Screens.js`. The Cognito module has a similar setup if additional login/logout screens were needed in `./src/cognito/Screens.js`.

---

## Adding Fonts

To add different fonts, please read the following [blog post](https://medium.com/react-native-training/react-native-custom-fonts-ccc9aacf9e5e).

Instead of doing the `react-native-link` step, do it manually by:

- Going in to `Xcode`
- In `Project Navigator` -> `Build Phases` -> Under `Copy Bundle Resources` add the new font.ttf file in here.

---

## Changelog and Standard Version

This project is using [Standard Version](https://github.com/conventional-changelog/standard-version) to improve the changelogs. Please check out
[Commit Message Convention](https://github.com/conventional-changelog/standard-version#commit-message-convention-at-a-glance) to see how to write commit messages in Standard Version.

---

## Unlocking Encrypted Files (git-crypt)

Please see the following [document](https://docs.google.com/document/d/1XVZYHLLu_B1d-hrO_k9OMRARQjbiVLuRs8MKMKKSLQ4/edit) on unlocking encrypted files e.g. `.env`.

---

## Dark Mode fix for iOS 13 for projects on RN <0.62

If Dark Mode is turned on in the phone, then this will mess around with the dropdowns (calendar pickers, status bar etc.) so you can disable it in the `info.plist` file with the following values:

```
<key>UIStatusBarStyle</key>
<string>UIStatusBarStyleDefault</string>
<key>UIUserInterfaceStyle</key>
<string>Light</string>
<key>UIViewControllerBasedStatusBarAppearance</key>
<false/>
```

But if no alternative dark mode theme is provided, then the status bar will render as `light` so you will need to apply the following [commit](https://github.com/facebook/react-native/commit/796b3a1f8823c87c9a066ea9c51244710dc0b9b5) to fix the status bar or copy and paste the below [in](node_modules/react-native/React/Modules/RCTStatusBarManager.m).

```
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

#import "RCTStatusBarManager.h"

#import "RCTEventDispatcher.h"
#import "RCTLog.h"
#import "RCTUtils.h"

#if !TARGET_OS_TV
@implementation RCTConvert (UIStatusBar)

+ (UIStatusBarStyle)UIStatusBarStyle:(id)json RCT_DYNAMIC
{
  static NSDictionary *mapping;
  static dispatch_once_t onceToken;
  dispatch_once(&onceToken, ^{
    if (@available(iOS 13.0, *)) {
      mapping = @{
        @"default" : @(UIStatusBarStyleDefault),
        @"light-content" : @(UIStatusBarStyleLightContent),
#if defined(__IPHONE_OS_VERSION_MAX_ALLOWED) && defined(__IPHONE_13_0) && \
    __IPHONE_OS_VERSION_MAX_ALLOWED >= __IPHONE_13_0
        @"dark-content" : @(UIStatusBarStyleDarkContent)
#else
          @"dark-content": @(UIStatusBarStyleDefault)
#endif
      };

    } else {
      mapping = @{
        @"default" : @(UIStatusBarStyleDefault),
        @"light-content" : @(UIStatusBarStyleLightContent),
        @"dark-content" : @(UIStatusBarStyleDefault)
      };
    }
  });
  return _RCT_CAST(
      type, [RCTConvertEnumValue("UIStatusBarStyle", mapping, @(UIStatusBarStyleDefault), json) integerValue]);
}

RCT_ENUM_CONVERTER(
    UIStatusBarAnimation,
    (@{
      @"none" : @(UIStatusBarAnimationNone),
      @"fade" : @(UIStatusBarAnimationFade),
      @"slide" : @(UIStatusBarAnimationSlide),
    }),
    UIStatusBarAnimationNone,
    integerValue);

@end
#endif

@implementation RCTStatusBarManager

static BOOL RCTViewControllerBasedStatusBarAppearance()
{
  static BOOL value;
  static dispatch_once_t onceToken;
  dispatch_once(&onceToken, ^{
    value =
        [[[NSBundle mainBundle] objectForInfoDictionaryKey:@"UIViewControllerBasedStatusBarAppearance"]
                ?: @YES boolValue];
  });

  return value;
}

RCT_EXPORT_MODULE()

- (NSArray<NSString *> *)supportedEvents
{
  return @[ @"statusBarFrameDidChange", @"statusBarFrameWillChange" ];
}

#if !TARGET_OS_TV

- (void)startObserving
{
  NSNotificationCenter *nc = [NSNotificationCenter defaultCenter];
  [nc addObserver:self
         selector:@selector(applicationDidChangeStatusBarFrame:)
             name:UIApplicationDidChangeStatusBarFrameNotification
           object:nil];
  [nc addObserver:self
         selector:@selector(applicationWillChangeStatusBarFrame:)
             name:UIApplicationWillChangeStatusBarFrameNotification
           object:nil];
}

- (void)stopObserving
{
  [[NSNotificationCenter defaultCenter] removeObserver:self];
}

- (dispatch_queue_t)methodQueue
{
  return dispatch_get_main_queue();
}

- (void)emitEvent:(NSString *)eventName forNotification:(NSNotification *)notification
{
  CGRect frame = [notification.userInfo[UIApplicationStatusBarFrameUserInfoKey] CGRectValue];
  NSDictionary *event = @{
    @"frame" : @{
      @"x" : @(frame.origin.x),
      @"y" : @(frame.origin.y),
      @"width" : @(frame.size.width),
      @"height" : @(frame.size.height),
    },
  };
  [self sendEventWithName:eventName body:event];
}

- (void)applicationDidChangeStatusBarFrame:(NSNotification *)notification
{
  [self emitEvent:@"statusBarFrameDidChange" forNotification:notification];
}

- (void)applicationWillChangeStatusBarFrame:(NSNotification *)notification
{
  [self emitEvent:@"statusBarFrameWillChange" forNotification:notification];
}

RCT_EXPORT_METHOD(getHeight : (RCTResponseSenderBlock)callback)
{
  callback(@[ @{
    @"height" : @(RCTSharedApplication().statusBarFrame.size.height),
  } ]);
}

RCT_EXPORT_METHOD(setStyle : (UIStatusBarStyle)statusBarStyle animated : (BOOL)animated)
{
  if (RCTViewControllerBasedStatusBarAppearance()) {
    RCTLogError(@"RCTStatusBarManager module requires that the \
                UIViewControllerBasedStatusBarAppearance key in the Info.plist is set to NO");
  } else {
#pragma clang diagnostic push
#pragma clang diagnostic ignored "-Wdeprecated-declarations"
    [RCTSharedApplication() setStatusBarStyle:statusBarStyle animated:animated];
  }
#pragma clang diagnostic pop
}

RCT_EXPORT_METHOD(setHidden : (BOOL)hidden withAnimation : (UIStatusBarAnimation)animation)
{
  if (RCTViewControllerBasedStatusBarAppearance()) {
    RCTLogError(@"RCTStatusBarManager module requires that the \
                UIViewControllerBasedStatusBarAppearance key in the Info.plist is set to NO");
  } else {
#pragma clang diagnostic push
#pragma clang diagnostic ignored "-Wdeprecated-declarations"
    [RCTSharedApplication() setStatusBarHidden:hidden withAnimation:animation];
#pragma clang diagnostic pop
  }
}

RCT_EXPORT_METHOD(setNetworkActivityIndicatorVisible : (BOOL)visible)
{
  RCTSharedApplication().networkActivityIndicatorVisible = visible;
}

#endif // TARGET_OS_TV

@end

```
