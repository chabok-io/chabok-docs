---
id: push-notification
title: تنظیم پوش‌نوتیفیکیشن 
layout: react-native
permalink: react-native/push-notification.html
prev: chabok-messaging.html
next: user-management.html
---

چابک علاوه بر پیام چابک، **پوش‌نوتیفیکیشن** هم ارسال می‌کند. برای بکارگیری آن لطفا تنظیمات [اندروید]() و [آی‌اواس]() آن را انجام دهید. همچنین می‌توانید از نمایش اعلان به صورت local [استفاده کنید]().

<Br>

### اندروید

برای استفاده از سرویس پوش‌نوتیفیکیشن در اندروید (GCM یا Firebase) مراحل زیر را باید طی کنید:

در کلاس `android/build.gradle` کد زیر اضافه کنید:

```java
ext {
    googlePlayServicesVersion = "<Your play services version>" // default: "+"
    firebaseVersion = "<Your Firebase version>" // default: "+"

    // Other settings
    compileSdkVersion = <Your compile SDK version> // default: 23
    buildToolsVersion = "<Your build tools version>" // default: "23.0.1"
    targetSdkVersion = <Your target SDK version> // default: 23
    supportLibVersion = "<Your support lib version>" // default: 23.1.1
}
```

> `نکته:` `localNotification()` بدون انجام تغییرات در اپلیکیشن کار می‌کند اما برای کار کردن `localNotificationSchedule()` نیاز به تغییرات زیر دارید.


در فایل `AndroidManifest.xml` کد زیر اضافه کنید:


```java
.....
    <!-- < Only if you're using GCM or localNotificationSchedule() > -->
    <uses-permission android:name="android.permission.WAKE_LOCK" />
    <permission
        android:name="${applicationId}.permission.C2D_MESSAGE"
        android:protectionLevel="signature" />
    <uses-permission android:name="${applicationId}.permission.C2D_MESSAGE" />
    <!-- < Only if you're using GCM or localNotificationSchedule() > -->

    <uses-permission android:name="android.permission.VIBRATE" />
    <uses-permission android:name="android.permission.RECEIVE_BOOT_COMPLETED"/>

    <application ....>
        <meta-data  android:name="com.dieam.reactnativepushnotification.notification_channel_name"
                android:value="YOUR NOTIFICATION CHANNEL NAME"/>
        <meta-data  android:name="com.dieam.reactnativepushnotification.notification_channel_description"
                    android:value="YOUR NOTIFICATION CHANNEL DESCRIPTION"/>
        <!-- Change the resource name to your App's accent color - or any other color you want -->
        <meta-data  android:name="com.dieam.reactnativepushnotification.notification_color"
                    android:resource="@android:color/white"/>

        <!-- < Only if you're using GCM or localNotificationSchedule() > -->
        <receiver
            android:name="com.google.android.gms.gcm.GcmReceiver"
            android:exported="true"
            android:permission="com.google.android.c2dm.permission.SEND" >
            <intent-filter>
                <action android:name="com.google.android.c2dm.intent.RECEIVE" />
                <category android:name="${applicationId}" />
            </intent-filter>
        </receiver>
        <!-- < Only if you're using GCM or localNotificationSchedule() > -->

        <receiver android:name="com.dieam.reactnativepushnotification.modules.RNPushNotificationPublisher" />
        <receiver android:name="com.dieam.reactnativepushnotification.modules.RNPushNotificationBootEventReceiver">
            <intent-filter>
                <action android:name="android.intent.action.BOOT_COMPLETED" />
            </intent-filter>
        </receiver>
        <service android:name="com.dieam.reactnativepushnotification.modules.RNPushNotificationRegistrationService"/>

        <!-- < Only if you're using GCM or localNotificationSchedule() > -->
        <service
            android:name="com.dieam.reactnativepushnotification.modules.RNPushNotificationListenerServiceGcm"
            android:exported="false" >
            <intent-filter>
                <action android:name="com.google.android.c2dm.intent.RECEIVE" />
            </intent-filter>
        </service>
        <!-- </ Only if you're using GCM or localNotificationSchedule() > -->

        <!-- < Else > -->
        <service
            android:name="com.dieam.reactnativepushnotification.modules.RNPushNotificationListenerService"
            android:exported="false" >
            <intent-filter>
                <action android:name="com.google.firebase.MESSAGING_EVENT" />
            </intent-filter>
        </service>
        <!-- </Else> -->
     .....
```

اگر از `react-native link` استفاده نکردید، پکیج را دستی در `MainApplication.java` ثبت کنید:

```java
import com.dieam.reactnativepushnotification.ReactNativePushNotificationPackage;  // <--- Import Package

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
      @Override
      protected boolean getUseDeveloperSupport() {
        return BuildConfig.DEBUG;
      }

      @Override
      protected List<ReactPackage> getPackages() {

      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
          new ReactNativePushNotificationPackage() // <---- Add the Package
      );
    }
  };

  ....
}

```

> `نکته:` برای اطلاعات بیشتر می‌توانید [لینک مرجع](https://github.com/zo0r/react-native-push-notification#android-manual-installation) را مطالعه نمایید.


### آی‌او‌اس

این قسمت مخصوص پروژه‌هایی است که با `react-native init` یا **Create React Native App** ساخته شده‌اند. 
برای شروع ابتدا گواهی‌ها و دسترسی‌های اپل را همانطور که در [صفحه پیش‌نیاز](https://doc.chabokpush.com/react-native/required.html#%D8%AA%D9%86%D8%B8%DB%8C%D9%85-%D9%BE%D9%88%D8%B4%D9%86%D9%88%D8%AA%DB%8C%D9%81%DB%8C%DA%A9%DB%8C%D8%B4%D9%86-%D8%A2%DB%8C%D8%A7%D9%88%D8%A7%D8%B3) توضیح دادیم، تنظیم نمایید.


سپس دستورهای زیر را برای افزودن کتابخانه به پروژه خود اضافه کنید: ([برای افزودن دستی کتابخانه کلیک کنید](https://facebook.github.io/react-native/docs/linking-libraries-ios#manual-linking))

```bash
node_modules/react-native/Libraries/PushNotificationIOS/RCTPushNotification.xcodeproj
```
```bash
Link Binary With Libraries: libRCTPushNotification.a
```
در آخر هم  برای پشتیبانی از نوتیفیکیشن و ثبت رویدادها باید به  کلاس **AppDelegate** خود دو قطعه کد زیر را اضافه کنید:
- در بالای `AppDelegate.m` :

```objectivec
#import <React/RCTPushNotificationManager.h>
```

- در پیاده‌سازی کلاس **AppDelegate**:

```objectivec
// Required to register for notifications
 - (void)application:(UIApplication *)application didRegisterUserNotificationSettings:(UIUserNotificationSettings *)notificationSettings
 {
  [RCTPushNotificationManager didRegisterUserNotificationSettings:notificationSettings];
 }
 // Required for the register event.
 - (void)application:(UIApplication *)application didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken
 {
  [RCTPushNotificationManager didRegisterForRemoteNotificationsWithDeviceToken:deviceToken];
 }
 // Required for the notification event. You must call the completion handler after handling the remote notification.
 - (void)application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)userInfo
                                                        fetchCompletionHandler:(void (^)(UIBackgroundFetchResult))completionHandler
 {
   [RCTPushNotificationManager didReceiveRemoteNotification:userInfo fetchCompletionHandler:completionHandler];
 }
 // Required for the registrationError event.
 - (void)application:(UIApplication *)application didFailToRegisterForRemoteNotificationsWithError:(NSError *)error
 {
  [RCTPushNotificationManager didFailToRegisterForRemoteNotificationsWithError:error];
 }
 // Required for the localNotification event.
 - (void)application:(UIApplication *)application didReceiveLocalNotification:(UILocalNotification *)notification
 {
  [RCTPushNotificationManager didReceiveLocalNotification:notification];
 }
```
> `نکته:` برای اطلاعات بیشتر می‌توانید [لینک مرجع](https://facebook.github.io/react-native/docs/pushnotificationios.html#content) را مطالعه نمایید.

### نمایش Local Notifications
برای نمایش اعلان (notification) به صورت Local روی پیام‌های بالا ([دقت داشته باشید که dependency آن را اعمال کرده‌باشید](https://doc.chabokpush.com/react-native/setup.html#%D9%85%D8%AA%D8%AF-%D8%A7%D9%81%D8%B2%D9%88%D8%AF%D9%86-%D8%AA%D9%88%DA%A9%D9%86-%D8%A8%D8%B1%D8%A7%DB%8C-%D8%A7%D8%B1%D8%B3%D8%A7%D9%84-%D9%BE%D9%88%D8%B4)) باید دستور زیر را اجرا کنید.


```bash
PushNotification.localNotification(details: Object)
```

مثال:

```javascript
PushNotification.localNotification({
    /* Android Only Properties */
    id: '0', // (optional) Valid unique 32 bit integer specified as string. default: Autogenerated Unique ID
    ticker: "My Notification Ticker", // (optional)
    autoCancel: true, // (optional) default: true
    largeIcon: "ic_launcher", // (optional) default: "ic_launcher"
    smallIcon: "ic_notification", // (optional) default: "ic_notification" with fallback for "ic_launcher"
    bigText: "My big text that will be shown when notification is expanded", // (optional) default: "message" prop
    subText: "This is a subText", // (optional) default: none
    color: "red", // (optional) default: system default
    vibrate: true, // (optional) default: true
    vibration: 300, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
    tag: 'some_tag', // (optional) add tag to message
    group: "group", // (optional) add group to message
    ongoing: false, // (optional) set whether this is an "ongoing" notification
    priority: "high", // (optional) set notification priority, default: high
    visibility: "private", // (optional) set notification visibility, default: private
    importance: "high", // (optional) set notification importance, default: high

    /* iOS only properties */
    alertAction: // (optional) default: view
    category: // (optional) default: null
    userInfo: // (optional) default: null (object containing additional notification data)

    /* iOS and Android properties */
    title: "My Notification Title", // (optional)
    message: "My Notification Message", // (required)
    playSound: false, // (optional) default: true
    soundName: 'default', // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
    number: '10', // (optional) Valid 32 bit integer specified as string. default: none (Cannot be zero)
    repeatType: 'day', // (optional) Repeating interval. Check 'Repeating Notifications' section for more info.
    actions: '["Yes", "No"]',  // (Android only) See the doc for notification actions to know more
});
```

