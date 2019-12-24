---
id: notification
title: مدیریت اعلان‌ها
layout: ios
permalink: ios/notification.html
prev: validation.html
next: events.html
---

### رویداد کلیک بر روی اعلان (آی‌اواس ۱۰ به بالا)
برای مدیریت کلیک بر روی اعلان پیام‌های چابک متد `:userNotificationCenter:didReceiveNotificationResponse:withCompletionHandler` را فراخوانی نمایید. به نمونه زیر دقت کنید:

{% tabs %}
{% tab OBJECTIVE-C %}
```objectivec
-(void) userNotificationCenter:(UNUserNotificationCenter *)center didReceiveNotificationResponse:(UNNotificationResponse *)response withCompletionHandler:(void (^)(void))completionHandler{
    //Get actionIdentifier.
    NSString *actionId = response.actionIdentifier;
    //Get notification payload.
    NSDictionary *payload = response.notification.request.content.userInfo;
    
    //Get message data
    NSDictionary *messageData;
    if ([payload valueForKey:@"message"]) {
    	//In chabok message user tapped on notification
        messageData = [[payload valueForKey:@"message"] valueForKey:@"data"];
    } else {
    	//In APNS user tapped on notification
        messageData = [payload valueForKey:@"data"];
    }
    
    completionHandler();
}
```
{% endtab %}
{% tab SWIFT %}
```swift
func userNotificationCenter(_ center: UNUserNotificationCenter,
                                didReceive response: UNNotificationResponse,
                                withCompletionHandler completionHandler: @escaping () -> Void) {
	//Get actionIdentifier.
	let actionId = response.actionIdentifier
	//Get notification payload.
	let payload = response.notification.request.content.userInfo
	
	//Get message data
	var messageData:NSDictionary
	if payload["message"] is NSDictionary {
		//In chabok message user tapped on notification
		messageData = (payload["message"] as! NSDictionary).value(forKey: "data") as! NSDictionary
	} else {
		//In APNS user tapped on notification
		messageData = payload["data"] as! NSDictionary
	}
        
	completionHandler()
}
```
{% endtab %}
{% endtabs %}

### رویداد کلیک بر روی اعلان (آی‌اواس ۹ به پایین)
پلتفرم چابک دارای `Messageing` و `Push Notification`  می‌باشد،‌ به همین جهت برای فهمیدن رویداد کلیک بر روی اعلان، باید نوع پیام دریافتی را تشخیص دهید. اگر پیام دریافتی از سرویس APNs اپل باشد با کلیک بر روی اعلان، delegate متد `didReceiveRemoteNotification` فراخوانی خواهد شد و اگر Local Notification‌ باشد، از delegate متد `didReceiveLocalNotification` استفاده کنید.

#### ۱. LocalNotification

> `نکته` : در iOS های ۱۰ به پایین امکان نمایش LocalNotification در حالت
> Foreground وجود ندارد، اگر شما یک LocalNotification در حالت `Foreground`
> در یکی از این نسخه های iOS استفاده کنید، به این معنی است که بر روی آن
> کلیک شده و delegate متد `didReceiveLocalNotification` فراخوانی خواهد شد.

> `نکته` : اگر از LocalNotification در حالت `Background` استفاده شود، زمانی
> متد `didReceiveLocalNotification` فرخوانی خواهد شد که بر روی
> Notification کلیک شده باشد.

{% tabs %}
{% tab OBJECTIVE-C %}
```objectivec
- (void)application:(UIApplication *)application didReceiveLocalNotification:(UILocalNotification *)notification{

// Manager Hook and handle receive iOS (4.0 and later) local notification
[self.manager application:application didReceiveLocalNotification:notification];
}
```
{% endtab %}
{% tab SWIFT %}
```swift
//Swift:

func application(_ application: UIApplication, didReceive notification: UILocalNotification) {
self.manager.application(application, didReceive: notification)
}
```
{% endtab %}
{% endtabs %}
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

{% tabs %}
{% tab OBJECTIVE-C %}
```objectivec
- (void)application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)userInfo fetchCompletionHandler:(void (^)(UIBackgroundFetchResult))completionHandler{

// Hook and Handle New Remote Notification, must be use for remote payloads
[self.manager application:application didReceiveRemoteNotification:userInfo fetchCompletionHandler:completionHandler];

}
```
{% endtab %}
{% tab SWIFT %}
```swift
func application(_ application: UIApplication, didReceiveRemoteNotification userInfo: [AnyHashable : Any], fetchCompletionHandler completionHandler: @escaping (UIBackgroundFetchResult) -> Void) {

// Hook and Handle New Remote Notification, must be use for remote payloads
manager.application(application, didReceiveRemoteNotification: userInfo, fetchCompletionHandler: completionHandler)

}
```
{% endtab %}
{% endtabs %}

### تنظیمات نمایش اعلان

 کلاینت چابک به طور پیش‌فرض برای پیام‌های دریافتی اعلان نمایش می‌دهد. درصورت تمایل به تنظیم نمایش اعلان‌ها، کد مورد نظر خود را می‌توانید به کلاینت اضافه کنید.

> `نکته` : درصورت تمایل به شخصی‌سازی نوتیفیکیشن‌ها، از `delegate` متد
> `pushClientManagerUILocalNotificationDidReceivedMessage` استفاده کنید، به قطعه کد زیر دقت فرمایید. در صورت استفاده از `delegate` متد `pushClientManagerUILocalNotificationDidReceivedMessage` کتابخانه چابک دیگر اقدام به نمایش `LocalNotification` نمی کند.

{% tabs %}
{% tab OBJECTIVE-C %}
```objectivec
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
{% endtab %}
{% tab SWIFT %}
```swift
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
{% endtab %}
{% endtabs %}

### حذف اعلان

برای حذف یا پاک کردن یک اعلان خاص در `Notification Center` می‌توانید از متد زیر استفاده کنید:

{% tabs %}
{% tab OBJECTIVE-C %}
```objectivec
[[UIApplication sharedApplication] cancelLocalNotification:(nonnull UILocalNotification *)];
```
{% endtab %}
{% tab SWIFT %}
```swift
UIApplication.shared.cancelLocalNotification(UILocalNotification)
```
{% endtab %}
{% endtabs %}

همچنین برای حذف یا پاک کردن تمام اعلان ها می‌توانید از متد زیر استفاده کنید:

{% tabs %}
{% tab OBJECTIVE-C %}
```objectivec
[[UIApplication sharedApplication] cancelAllLocalNotifications];
```
{% endtab %}
{% tab SWIFT %}
```swift
UIApplication.shared.cancelAllLocalNotifications()
```
{% endtab %}
{% endtabs %}

### NSNotificationCenter

به عنوان یک جایگزین، می توانید از روش مشاهدات `NSNotificationCenter` برای دریافت رویدادها استفاده کنید. برای دریافت رویدادها به این روش، می توانید هر کدام از این ها را اضافه کنید:

{% tabs %}
{% tab OBJECTIVE-C %}
```objectivec
[[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(pushClientFailureHandler:) name:kPushClientDidFailRegisterUserNotification object:nil];

[[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(pushClientNewMessageHandler:) name:kPushClientDidReceivedMessageNotification object:nil];

[[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(pushClientRegistrationHandler:) name:kPushClientDidRegisterUserNotification object:nil];

[[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(pushClientServerConnectionStateHandler:) name:kPushClientDidChangeServerConnectionStateNotification object:nil];

[[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(pushClientServerReachabilityHandler:) name:kPushClientDidChangeServerReachabilityNotification object:nil];
```
{% endtab %}
{% tab SWIFT %}
```swift
NotificationCenter.default.addObserver(self, selector: #selector(self.pushClientFailureHandler), name: kPushClientDidFailRegisterUserNotification, object: nil)

NotificationCenter.default.addObserver(self, selector: #selector(self.pushClientNewMessageHandler), name: kPushClientDidReceivedMessageNotification, object: nil)

NotificationCenter.default.addObserver(self, selector: #selector(self.pushClientRegistrationHandler), name: kPushClientDidRegisterUserNotification, object: nil)

NotificationCenter.default.addObserver(self, selector: #selector(self.pushClientServerConnectionStateHandler), name: kPushClientDidChangeServerConnectionStateNotification, object: nil)

NotificationCenter.default.addObserver(self, selector: #selector(self.pushClientServerReachabilityHandler), name: kPushClientDidChangeServerReachabilityNotification, object: nil)
```
{% endtab %}
{% endtabs %}