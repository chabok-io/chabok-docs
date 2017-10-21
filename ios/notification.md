---
id: notification
title: راه‌اندازی اعلان‌ها
layout: ios
permalink: ios/notification.html
prev: publishingMessages.html
next: events.html
---

### راه‌اندازی اعلان‌ها

تمامی `متدها` و `delegateهایی` که در این بخش توضیح داده می شود، باید در کلاس `AppDelegate` قرار بگیرند تا کتابخانه چابک بتواند بدرستی نسبت به هر رویداد رفتار درستی نشان دهد.

```objc
//Objective-C:

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

```

```swift
//Swift:

func application(_ application: UIApplication, didFailToRegisterForRemoteNotificationsWithError error: Error) {
self.manager.application(application,didFailToRegisterForRemoteNotificationsWithError: error)
}

func application(_ application: UIApplication, didRegisterForRemoteNotificationsWithDeviceToken deviceToken: Data) {
self.manager.application(application,didRegisterForRemoteNotificationsWithDeviceToken: deviceToken)
}

func application(_ application: UIApplication, didRegister notificationSettings: UIUserNotificationSettings) {
self.manager.application(application, didRegister: notificationSettings)
}
```

#### رویداد کلیک بر روی اعلان
سرویس چابک دارای `Messageing` و `Push Notification`  می باشد،‌ به همین جهت برای فهمیدن رویداد کلیک بر روی اعلان باید، نوع پیام دریافتی را تشخیص دهید. اپل برای فهمیدن دریافت پیام از طریق سرویس `APNs`، delegate متد `didReceiveRemoteNotification` را فراخوانی می کند و همچنین برای فهمیدن رویداد کلیک بر روی یک Notification باید از delegate متد `didReceiveLocalNotification` استفاده کنید، همانطور که از نام متد فوق پیداست، برای `LocalNotification` کاربرد دارد.

##### ۱. LocalNotification

> `نکته` : در iOS های ۱۰ به پایین امکان نمایش LocalNotification در حالت
> Foreground وجود ندارد، اگر شما یک LocalNotification در حالت `Foreground`
> در یکی از این نسخه های iOS استفاده کنید، به این معنی است که بر روی آن
> کلیک شده و delegate متد `didReceiveLocalNotification` فراخوانی خواهد شد.

> `نکته` : اگر از LocalNotification در حالت `Background` استفاده شود، زمانی
> متد `didReceiveLocalNotification` فرخوانی خواهد شد که بر روی
> Notification عمل کلیک صورت گرفته باشد.

```objc
//Objective-C:

- (void)application:(UIApplication *)application didReceiveLocalNotification:(UILocalNotification *)notification{

// Manager Hook and handle receive iOS (4.0 and later) local notification
[self.manager application:application didReceiveLocalNotification:notification];
}
```

```swift
//Swift:

func application(_ application: UIApplication, didReceive notification: UILocalNotification) {
self.manager.application(application, didReceive: notification)
}
```

همچنین  delegate متد `didReceiveLocalNotification` به شما کمک می کند که، بعد از کلیک بر روی Notification به چه صفحه ای هدایت شود.

##### ۲. ‌APNs Notification

delegate متد `didReceiveRemoteNotification` توسط سیستم عامل به هنگام کلیک بر روی Notification فرخوانی می شود. 

> `نکته` : اگر برنامه شما `Terminate` بوده باشد، با کلیک بر روی
> Notification برنامه شما با کلید
> `UIApplicationLaunchOptionsRemoteNotificationKey` در delegate متد
> `didFinishLaunchingWithOptions` اجرا خواهد شد و پس از آن متد
> `didReceiveRemoteNotification` فرخوانی خواهد شد. پس پیشنهاد می کنیم،
> کد مربوط به `Navigate` به یک صفحه خاص را در متد
> `didReceiveRemoteNotification` استفاده کنید.

```objc
//Objective-C:

- (void)application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)userInfo fetchCompletionHandler:(void (^)(UIBackgroundFetchResult))completionHandler{

// Hook and Handle New Remote Notification, must be use for remote payloads
[self.manager application:application didReceiveRemoteNotification:userInfo fetchCompletionHandler:completionHandler];

}
```
```swift
//Swift:

func application(_ application: UIApplication, didReceiveRemoteNotification userInfo: [AnyHashable : Any], fetchCompletionHandler completionHandler: @escaping (UIBackgroundFetchResult) -> Void) {

// Hook and Handle New Remote Notification, must be use for remote payloads
manager.application(application, didReceiveRemoteNotification: userInfo, fetchCompletionHandler: completionHandler)

}
```

#### تنظیمات سفارشی اعلان

 کلاینت چابک به طور پیش‌فرض برای پیام‌های دریافتی اعلان نمایش می‌دهد.
> `نکته` : درصورت تمایل به شخصی‌سازی نوتیفیکیشن‌ها، از `delegate` متد
> `pushClientManagerUILocalNotificationDidReceivedMessage:` استفاده کنید، به قطعه کد زیر دقت فرمایید. در صورت استفاده از `delegate` متد `pushClientManagerUILocalNotificationDidReceivedMessage:` کتابخانه چابک دیگر اقدام به نمایش `LocalNotification` نمی کند.

``` objc
//Objective-C:

-(void)pushClientManagerUILocalNotificationDidReceivedMessage:(PushClientMessage *)message
{
    UILocalNotification *localNotification = [[UILocalNotification alloc] init];
    
    localNotification.timeZone = [NSTimeZone localTimeZone];
    localNotification.soundName = UILocalNotificationDefaultSoundName;
    localNotification.applicationIconBadgeNumber = 0;
    localNotification.alertBody = message.messageBody;
    localNotification.alertAction = @"OK";
    localNotification.userInfo = @{@"data":message.toDict};
    
    [[UIApplication sharedApplication] scheduleLocalNotification:localNotification];
}
```
```swift
//Swift:

func pushClientManagerUILocalNotificationDidReceivedMessage(_ message: PushClientMessage) {
    let localNotification = UILocalNotification()
        
    localNotification.timeZone = NSTimeZone.local
    localNotification.soundName = UILocalNotificationDefaultSoundName
    localNotification.applicationIconBadgeNumber = 0
    localNotification.alertBody = message.messageBody
    localNotification.alertAction = "OK"
    localNotification.userInfo = ["data": message.toDict]
        
    UIApplication.shared.scheduleLocalNotification(localNotification)
}
```

### NSNotificationCenter

به عنوان یک جایگزین، می توانید از روش مشاهدات `NSNotificationCenter` برای دریافت رویدادها استفاده کنید. برای دریافت رویدادها به این روش، می توانید هر کدام از این ها را اضافه کنید:

```objc
//Objective-C:

[[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(pushClientFailureHandler:) name:kPushClientDidFailRegisterUserNotification object:nil];

[[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(pushClientNewMessageHandler:) name:kPushClientDidReceivedMessageNotification object:nil];

[[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(pushClientRegistrationHandler:) name:kPushClientDidRegisterUserNotification object:nil];

[[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(pushClientServerConnectionStateHandler:) name:kPushClientDidChangeServerConnectionStateNotification object:nil];

[[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(pushClientServerReachabilityHandler:) name:kPushClientDidChangeServerReachabilityNotification object:nil];
```
```swift
//Swift:

NotificationCenter.default.addObserver(self, selector: #selector(self.pushClientFailureHandler), name: kPushClientDidFailRegisterUserNotification, object: nil)

NotificationCenter.default.addObserver(self, selector: #selector(self.pushClientNewMessageHandler), name: kPushClientDidReceivedMessageNotification, object: nil)

NotificationCenter.default.addObserver(self, selector: #selector(self.pushClientRegistrationHandler), name: kPushClientDidRegisterUserNotification, object: nil)

NotificationCenter.default.addObserver(self, selector: #selector(self.pushClientServerConnectionStateHandler), name: kPushClientDidChangeServerConnectionStateNotification, object: nil)

NotificationCenter.default.addObserver(self, selector: #selector(self.pushClientServerReachabilityHandler), name: kPushClientDidChangeServerReachabilityNotification, object: nil)
```
