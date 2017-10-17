---
id: notification
title: راه‌اندازی اعلان‌ها
layout: ios
permalink: ios/notification.html
prev: publishingMessages.html
next: events.html
---

 ###  راه‌اندازی اعلان‌ها


کد زیر را درون `AppDelegate` خود وارد کنید. این به مشتری چابک کمک می کند تا `remote` و `local notification`  را مدیریت کند:
```objc
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
```
```swift

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

### NSNotificationCenter

به عنوان یک جایگزین، می توانید از روش مشاهدات `NSNotificationCenter` برای دریافت رویدادها استفاده کنید. برای دریافت رویدادها به این روش، می توانید هر کدام از این ها را اضافه کنید:

```objc
Objc:

[[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(pushClientFailureHandler:) name:kPushClientDidFailRegisterUserNotification object:nil];

[[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(pushClientNewMessageHandler:) name:kPushClientDidReceivedMessageNotification object:nil];

[[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(pushClientRegistrationHandler:) name:kPushClientDidRegisterUserNotification object:nil];

[[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(pushClientServerConnectionStateHandler:) name:kPushClientDidChangeServerConnectionStateNotification object:nil];

[[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(pushClientServerReachabilityHandler:) name:kPushClientDidChangeServerReachabilityNotification object:nil];
```
```swift

Swift:

NotificationCenter.default.addObserver(self, selector: #selector(self.pushClientFailureHandler), name: kPushClientDidFailRegisterUserNotification, object: nil)

NotificationCenter.default.addObserver(self, selector: #selector(self.pushClientNewMessageHandler), name: kPushClientDidReceivedMessageNotification, object: nil)

NotificationCenter.default.addObserver(self, selector: #selector(self.pushClientRegistrationHandler), name: kPushClientDidRegisterUserNotification, object: nil)

NotificationCenter.default.addObserver(self, selector: #selector(self.pushClientServerConnectionStateHandler), name: kPushClientDidChangeServerConnectionStateNotification, object: nil)

NotificationCenter.default.addObserver(self, selector: #selector(self.pushClientServerReachabilityHandler), name: kPushClientDidChangeServerReachabilityNotification, object: nil)
```
