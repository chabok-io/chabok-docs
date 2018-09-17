---
id: ios-push-notification
title: تنظیم پوش‌نوتیفیکیشن IOS
layout: react-native
permalink: react-native/ios-push-notification.html
prev: android-push-notification.html
next: setup.html
---

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
