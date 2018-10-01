---
id: notification
title: مدیریت اعلان‌ها
layout: ios
permalink: ios/notification.html
prev: validation.html
next: events.html
---

### رویداد کلیک بر روی اعلان (آی‌اواس ۱۰ به بالا)
برای مدیریت کلیک بر روی اعلان پیام‌های چابک متد `userNotificationCenter:didReceiveNotificationResponse:withCompletionHandler:` را فراخوانی نمایید. به نمونه زیر دقت کنید:

```objective-c
//Objective-C

-(void) userNotificationCenter:(UNUserNotificationCenter *)center didReceiveNotificationResponse:(UNNotificationResponse *)response withCompletionHandler:(void (^)(void))completionHandler{
    //Get actionIdentifier.
    NSString *actionId = response.actionIdentifier;
    //Get notification payload.
    NSDictionary *payload = response.notification.request.content.userInfo;
    
    completionHandler();
}
```

```swift
//Swift

func userNotificationCenter(_ center: UNUserNotificationCenter,
                                didReceive response: UNNotificationResponse,
                                withCompletionHandler completionHandler: @escaping () -> Void) {
	//Get actionIdentifier.
	let actionId = response.actionIdentifier
	//Get notification payload.
	let payload = response.notification.request.content.userInfo
        
	completionHandler()
}
```

### رویداد کلیک بر روی اعلان (آی‌اواس ۹ به پایین)
سرویس چابک دارای `Messageing` و `Push Notification`  می‌باشد،‌ به همین جهت برای فهمیدن رویداد کلیک بر روی اعلان، باید نوع پیام دریافتی را تشخیص دهید. اگر پیام دریافتی از سرویس APNs اپل باشد با کلیک بر روی اعلان، delegate متد `didReceiveRemoteNotification` فراخوانی خواهد شد و اگر Local Notification‌ باشد، از delegate متد `didReceiveLocalNotification` استفاده کنید.

#### ۱. LocalNotification

> `نکته` : در iOS های ۱۰ به پایین امکان نمایش LocalNotification در حالت
> Foreground وجود ندارد، اگر شما یک LocalNotification در حالت `Foreground`
> در یکی از این نسخه های iOS استفاده کنید، به این معنی است که بر روی آن
> کلیک شده و delegate متد `didReceiveLocalNotification` فراخوانی خواهد شد.

> `نکته` : اگر از LocalNotification در حالت `Background` استفاده شود، زمانی
> متد `didReceiveLocalNotification` فرخوانی خواهد شد که بر روی
> Notification کلیک شده باشد.

```objectivec
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

همچنین  delegate متد `didReceiveLocalNotification` به شما کمک می کند که، بعد از کلیک بر روی Notification به چه صفحه‌ای هدایت شود.

#### ۲. ‌APNs Notification

delegate متد `didReceiveRemoteNotification` توسط سیستم عامل به هنگام کلیک بر روی Notification فرخوانی می شود. 

> `نکته` : اگر برنامه شما `Terminate` شده باشد، با کلیک بر روی
> Notification برنامه شما با کلید
> `UIApplicationLaunchOptionsRemoteNotificationKey` در delegate متد
> `didFinishLaunchingWithOptions` اجرا خواهد شد و پس از آن متد
> `didReceiveRemoteNotification` فرخوانی خواهد شد. پس پیشنهاد می کنیم،
> کد مربوط به `Navigate` به یک صفحه خاص را در متد
> `didReceiveRemoteNotification` استفاده کنید.

```objectivec
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

### تنظیمات نمایش اعلان

 کلاینت چابک به طور پیش‌فرض برای پیام‌های دریافتی اعلان نمایش می‌دهد. درصورت تمایل به تنظیم نمایش اعلان‌ها، کد مورد نظر خود را می‌توانید به کلاینت اضافه کنید.

> `نکته` : درصورت تمایل به شخصی‌سازی نوتیفیکیشن‌ها، از `delegate` متد
> `pushClientManagerUILocalNotificationDidReceivedMessage` استفاده کنید، به قطعه کد زیر دقت فرمایید. در صورت استفاده از `delegate` متد `pushClientManagerUILocalNotificationDidReceivedMessage` کتابخانه چابک دیگر اقدام به نمایش `LocalNotification` نمی کند.

```objectivec
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

### حذف اعلان

برای حذف یا پاک کردن یک اعلان خاص در `Notification Center` می‌توانید از متد زیر استفاده کنید:

```objectivec
//Objective-C:

[[UIApplication sharedApplication] cancelLocalNotification:(nonnull UILocalNotification *)];
```
```swift
//Swift:

UIApplication.shared.cancelLocalNotification(UILocalNotification)
```
همچنین برای حذف یا پاک کردن تمام اعلان ها می‌توانید از متد زیر استفاده کنید:

```objectivec
//Objective-C:

[[UIApplication sharedApplication] cancelAllLocalNotifications];
```
```swift
//Swift:

UIApplication.shared.cancelAllLocalNotifications()
```

### NSNotificationCenter

به عنوان یک جایگزین، می توانید از روش مشاهدات `NSNotificationCenter` برای دریافت رویدادها استفاده کنید. برای دریافت رویدادها به این روش، می توانید هر کدام از این ها را اضافه کنید:

```objectivec
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
