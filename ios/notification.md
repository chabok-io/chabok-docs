---
id: notification
title:راه اندازی اعلان ها
layout: ios
permalink: ios/notification.html
prev: installation.html
next: introducing.html
---


Notification فعال کردن
-------------

کد زیر را درون AppDelegate خود وارد کنید. این به مشتری چابک کمک می کند تا remote و local notification  را مدیریت کند:
```
Objc:
- (void)application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)userInfo
fetchCompletionHandler:(void (^)(UIBackgroundFetchResult))completionHandler{

// Hook and Handle New Remote Notification, must be use for remote payloads
[self.manager application:application didReceiveRemoteNotification:userInfo fetchCompletionHandler:completionHandler];

}


- (void)application:(UIApplication *)application didFailToRegisterForRemoteNotificationsWithError:(NSError *)error{

// Hook and handle failure of get Device token from Apple APNS Server
[self.manager application:application didFailToRegisterForRemoteNotificationsWithError:error];

}

- (void)application:(UIApplication *)application didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken{

// Manager hook and handle receive Device Token From APNS Server
[self.manager application:application didRegisterForRemoteNotificationsWithDeviceToken:deviceToken];

}

- (void)application:(UIApplication *)application didRegisterUserNotificationSettings:(UIUserNotificationSettings *)notificationSettings{

// Manager hook and Handle iOS 8 remote Notificaiton Settings
[self.manager application:application didRegisterUserNotificationSettings:notificationSettings];

}

- (void)application:(UIApplication *)application didReceiveLocalNotification:(UILocalNotification *)notification{

// Manager Hook and handle receive iOS (4.0 and later) local notification
[self.manager application:application didReceiveLocalNotification:notification];

}

Swift:

func application(_ application: UIApplication, didReceiveRemoteNotification userInfo: [AnyHashable : Any], fetchCompletionHandler completionHandler: @escaping (UIBackgroundFetchResult) -> Void) {

// Hook and Handle New Remote Notification, must be use for remote payloads
manager.application(application, didReceiveRemoteNotification: userInfo, fetchCompletionHandler: completionHandler)

}

func application(_ application: UIApplication, didFailToRegisterForRemoteNotificationsWithError error: Error) {
self.manager.application(application,didFailToRegisterForRemoteNotificationsWithError: error)
}

func application(_ application: UIApplication, didRegisterForRemoteNotificationsWithDeviceToken deviceToken: Data) {
self.manager.application(application,didRegisterForRemoteNotificationsWithDeviceToken: deviceToken)

}

func application(_ application: UIApplication, didRegister notificationSettings: UIUserNotificationSettings) {
self.manager.application(application, didRegister: notificationSettings)
}

func application(_ application: UIApplication, didReceive notification: UILocalNotification) {
self.manager.application(application, didReceive: notification)
}

```
