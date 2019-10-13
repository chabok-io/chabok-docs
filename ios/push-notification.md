---
id: push-notification
title: پوش‌نوتیفیکیشن
layout: ios
permalink: ios/push-notification.html
prev: chabok-messaging.html
next: deeplink.html
---

> `نکته:` مستندات زیر براساس **نسخه‌های ۲ به بالا** کتابخانه چابک نوشته شده است. در صورتی که از نسخه‌ پایین‌تری استفاده می‌کنید به [ این صفحه](/ios/push-notification-old-version.html) مراجعه کنید.

چابک علاوه بر پیام چابک، **پوش‌نوتیفیکیشن** هم ارسال می‌کند. شما می‌توانید نمایش این پوش‌نوتیفیکیشن‌ها را [شخصی‌سازی کنید.](/ios/push-notification.html#شخصیسازی-نمایش-نوتیفیکیشن) برای نوتیفیکیشن کلیک [تعیین کنید و دیتای آن را دریافت کنید ](/ios/push-notification.html#کلیک-و-دریافت-دیتای-نوتیفیکیشن-آیاواس-۱۰-به-بالا). همینطور با [تنظیم پوش‌نوتیفیشکیشن چند رسانه‌ای](/ios/push-notification.html#تنظیم-نوتیفیکیشن-چندرسانهای-rich-push-notification) می‌توانید برای هرکدام اکشن تعیین نمایید. 

<Br>

### شخصی‌سازی نمایش نوتیفیکیشن

کلاینت چابک به طور پیش‌فرض برای پیام‌های دریافتی (پیام چابک و پوش‌نوتیفیکیشن)، اعلان (**نوتیفیکیشن**) نمایش می‌دهد. درصورت تمایل به شخصی‌سازی نوتیفیکیشن‌ها، از `delegate` متد `pushClientManagerUILocalNotificationDidReceivedMessage` استفاده کنید. به قطعه کد زیر دقت فرمایید: (در صورت استفاده از `delegate` متد `pushClientManagerUILocalNotificationDidReceivedMessage` کتابخانه چابک دیگر اقدام به نمایش `LocalNotification` نمی‌کند.)

```objectivec
//Objective-C:

-(void)pushClientManagerUILocalNotificationDidReceivedMessage:(PushClientMessage *)message {
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

#### حذف نوتیفیکیشن

برای حذف یا پاک کردن یک نوتیفیکیشن خاص در `Notification Center` می‌توانید از متد زیر استفاده کنید:

```objectivec
//Objective-C:

[[UIApplication sharedApplication] cancelLocalNotification:(nonnull UILocalNotification *)];
```
```swift
//Swift:

UIApplication.shared.cancelLocalNotification(UILocalNotification)
```
همچنین برای حذف یا پاک کردن تمام نوتیفیکیشن‌ها می‌توانید از متد زیر استفاده کنید:

```objectivec
//Objective-C:

[[UIApplication sharedApplication] cancelAllLocalNotifications];
```
```swift
//Swift:

UIApplication.shared.cancelAllLocalNotifications()
```

<Br>

### کلیک و دریافت دیتای نوتیفیکیشن (آی‌اواس ۱۰ به بالا)

برای مدیریت کلیک بر روی نوتیفیکیشن پیام‌های چابک متد `:userNotificationCenter:didReceiveNotificationResponse:withCompletionHandler` را فراخوانی نمایید. به نمونه زیر دقت کنید:

```objectivec
//Objective-C

-(void) userNotificationCenter:(UNUserNotificationCenter *)center didReceiveNotificationResponse:(UNNotificationResponse *)response withCompletionHandler:(void (^)(void))completionHandler{
    //Get actionIdentifier.
    NSString *actionId = response.actionIdentifier;
    //Get notification payload.
    NSDictionary *payload = response.notification.request.content.userInfo;
    
    //Get message data
    NSDictionary *messageData;
    if ([payload valueForKey:@"message"]) {
        messageData = [[payload valueForKey:@"message"] valueForKey:@"data"];
    } else {
        messageData = [payload valueForKey:@"data"];
    }
    
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

### کلیک و دریافت دیتای نوتیفیکیشن (آی‌اواس ۹ به پایین)

پلتفرم چابک دارای پوش‌نوتیفیکیشن و پیام چابک می‌باشد،‌ به همین جهت برای فهمیدن رویداد کلیک بر روی نوتیفیکیشن، باید نوع پیام دریافتی را تشخیص دهید. اگر پیام دریافتی از سرویس APNs اپل (پوش‌نوتیفیکیشن) باشد با کلیک بر روی نوتیفیکیشن، `delegate` متد `didReceiveRemoteNotification` فراخوانی خواهد شد و اگر Local Notification‌ (پیام چابک) باشد، از `delegate` متد `didReceiveLocalNotification` استفاده کنید.

#### ۱. LocalNotification

> `نکته` : در iOS های ۱۰ به پایین امکان نمایش LocalNotification در حالت Foreground وجود ندارد، اگر شما یک LocalNotification در حالت Foreground در یکی از این نسخه های iOS استفاده کنید، به این معنی است که بر روی آن کلیک شده و ‍‍‍‍‍`delegate` متد `didReceiveLocalNotification` فراخوانی خواهد شد.

> `نکته` : اگر از LocalNotification در حالت `Background` استفاده شود، زمانی
> متد `didReceiveLocalNotification` فرخوانی خواهد شد که بر روی
> Notification کلیک شده باشد.

```objectivec
//Objective-C:

- (void)application:(UIApplication *)application didReceiveLocalNotification:(UILocalNotification *)notification{
	// Handle receive iOS (4.0 and later) local notification
	
	//Do something (for example: Open MessageViewController)
}
```

```swift
//Swift:

func application(_ application: UIApplication, didReceive notification: UILocalNotification) {
	// Handle receive iOS (4.0 and later) local notification
	
	//Do something (for example: Open MessageViewController)
}
```

همچنین  `delegate` متد `didReceiveLocalNotification` به شما کمک می‌کند که بعد از کلیک، کاربر بر روی نوتیفیکیشن به چه صفحه‌ای هدایت شود.

#### ۲. ‌APNs Notification

`delegate` متد `didReceiveRemoteNotification` توسط سیستم عامل به هنگام کلیک بر روی نوتیفیکیشن فرخوانی می‌شود. 

> `نکته` : اگر برنامه شما `Terminate` شده باشد، با کلیک بر روی Notification برنامه شما با کلید `UIApplicationLaunchOptionsRemoteNotificationKey` در `delegate` متد `didFinishLaunchingWithOptions` اجرا خواهد شد و پس از آن متد `didReceiveRemoteNotification` فرخوانی خواهد شد. پس پیشنهاد می‌کنیم، کد مربوط به `Navigate` به یک صفحه خاص را در متد `didReceiveRemoteNotification` استفاده کنید.

```objectivec
//Objective-C:

- (void)application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)userInfo fetchCompletionHandler:(void (^)(UIBackgroundFetchResult))completionHandler{
	// Handle New Remote Notification, must be use for remote payloads
}
```
```swift
//Swift:

func application(_ application: UIApplication, didReceiveRemoteNotification userInfo: [AnyHashable : Any], fetchCompletionHandler completionHandler: @escaping (UIBackgroundFetchResult) -> Void) {
	// Handle New Remote Notification, must be use for remote payloads
}
```

### مدیریت کلیک بر روی هر اکشن

با قرار دادن متد `userNotificationCenter:didReceiveNotificationResponse:withCompletionHandler` در فایل `AppDelegate` همانند کد زیر می‌توانید عملیات متناسب بر روی هر دکمه را پیاده‌سازی کنید:

``` objectivec
//Objective-C
-(void) userNotificationCenter:(UNUserNotificationCenter *)center
					didReceiveNotificationResponse:(UNNotificationResponse *)response
						withCompletionHandler:(void (^)(void))completionHandler{
						
	//actionIdentifier is your key when you define in Chabokpush payload for each action
	if ([response.actionIdentifier isEqualToString:@"closeAction"]) {
		NSLog(@"Close action was clicked by user ........");
	} else if ([response.actionIdentifier isEqualToString:@"demoAction"]) {
		NSLog(@"Demo action was clicked by user .......");
	}
	
	completionHandler();
}
```
```swift
//Swift
func userNotificationCenter(_ center: UNUserNotificationCenter, 
				didReceive response: UNNotificationResponse,
				withCompletionHandler completionHandler: @escaping () -> Void) {
    //actionIdentifier is your key when you define in Chabokpush payload for each action
    if (response.actionIdentifier == "closeAction") {
        print("Close action was clicked by user ........")
    } else if (response.actionIdentifier == "demoAction") {
        print("Demo action was clicked by user .......")
    }
    completionHandler()
}
```

<Br>

### تنظیم نوتیفیکیشن چندرسانه‌ای (Rich Push Notification)

برای راه‌اندازی نوتیفیکیشن چندرسانه‌ای مراحل زیر طی نمایید:

 1) ابتدا از منو محیط **Xcode** بر روی گزینه `File` در بخش `New` بروی `Target...`
   کلیک کنید.
   
 2) در صفحه باز شده `Notification Service Extension` را انتخاب کنید
    و بر روی دکمه `Next` کلیک کنید.
    
 ![انتخاب تارگت سرویس نوتیفیکیشن](http://uupload.ir/files/dvcx_choose_target.png)
 
 3) سپس همانند تصویر زیر اطلاعات مورد نیاز را پر کرده و بر روی دکمه `Finish` کلیک کنید.
 
 ![پر کردن اطلاعات مورد نیاز برای تارگت سرویس نوتیفیکیشن](http://uupload.ir/files/xni_target_options.png
 )
 
 4) همانند تصویر زیر وارد صفحه تنظیمات `Target` خواهید شد.
 
 > `نکته :` در بخش `Deployment Info` گزینه `Deployment Target` را `iOS 10` قرار دهید.

 ![تنظیمات تارگ](http://uupload.ir/files/51rz_project_settings.png)

 5) خط زیر را به `podfile‍` خود اضافه کنید:

 ```bash
platform :ios, '9.0'

use_frameworks!

target 'PROJECT_TARGET' do
    pod 'ChabokPush', '~> 2.0.0'
end

target 'YOUR_NOTIFICATION_EXTENSION_SERVICE_TARGET' do
    pod 'ChabokPush', '~> 2.0.0'
end
```

سپس با روش زیر آن را نصب کنید:

```bash
$ pod install
```
 
 6) فایل `Info.plist` تارگت ساخته شده را به صورت `Source Code` باز کرده و کلید زیر را در آن قرار دهید:

```markup
<key>NSAppTransportSecurity</key>
<dict>
    <key>NSAllowsArbitraryLoads</key>
    <true/>
</dict>
```

 7) فایل `NotificationService.m` یا `NotificationService.swift` را
    باز کرده و کد زیر را در آن قرار دهید.

```objectivec
//Objective-C
#import "NotificationService.h"
#import <AdpPushClient/AdpPushClient.h>

@interface  NotificationService ()

@property (nonatomic, strong) UNMutableNotificationContent *bestAttemptContent;
@property (nonatomic, strong) void (^contentHandler)(UNNotificationContent *contentToDeliver);

@end

@implementation NotificationService
- (void)didReceiveNotificationRequest:(UNNotificationRequest *)request
				withContentHandler:(void (^)(UNNotificationContent *_Nonnull))contentHandler {
				
self.contentHandler = contentHandler;
self.bestAttemptContent = [request.content mutableCopy];

//ChabokPush download media
[PushClientManager.defaultManager didReceiveNotificationRequest:request
				withContentHandler:contentHandler];
}
- (void)serviceExtensionTimeWillExpire {
	self.contentHandler(self.bestAttemptContent);
}

@end
```
```swift
//Swift
import AdpPushClient
import UserNotifications

class NotificationService: UNNotificationServiceExtension {

	var contentHandler: ((UNNotificationContent) -> Void)?
	var bestAttemptContent: UNMutableNotificationContent?
	
	override func didReceive(_ request: UNNotificationRequest,
					withContentHandler contentHandler: @escaping (UNNotificationContent) -> Void) {

		self.contentHandler = contentHandler
		self.bestAttemptContent = (request.content.mutableCopy() as? UNMutableNotificationContent)

		//ChabokPush download media
		PushClientManager.default().didReceive(request,
							withContentHandler: contentHandler)
	}

	override func serviceExtensionTimeWillExpire() {
		if let contentHandler = contentHandler, let bestAttemptContent =  bestAttemptContent {
			contentHandler(bestAttemptContent)
		}
	}
}
```
برای دریافت رویداد کلیک روی هر اکشن، لطفا بخش [مدیریت کلیک بر روی هر اکشن](https://dev.doc.chabokpush.com/ios/push-notification.html#%D9%85%D8%AF%DB%8C%D8%B1%DB%8C%D8%AA-%DA%A9%D9%84%DB%8C%DA%A9-%D8%A8%D8%B1-%D8%B1%D9%88%DB%8C-%D9%87%D8%B1-%D8%A7%DA%A9%D8%B4%D9%86) را مطالعه کنید.

#### نمونه کد پوش‌نوتیفیکیشن چندرسانه‌ای

بخش [تنظیم نوتیفیکیشن چندرسانه‌ای (Rich Push Notification)](https://dev.doc.chabokpush.com/ios/push-notification.html#%D8%AA%D9%86%D8%B8%DB%8C%D9%85-%D9%86%D9%88%D8%AA%DB%8C%D9%81%DB%8C%DA%A9%DB%8C%D8%B4%D9%86-%DA%86%D9%86%D8%AF%D8%B1%D8%B3%D8%A7%D9%86%D9%87%D8%A7%DB%8C-rich-push-notification) را با دقت مطالعه کرده و سپس قطعه کد زیر را در کلاس `AppDelegate`  پیاده‌سازی کنید تا رویداد کلیک روی هر اکشن را دریافت کنید.
```objectivec
//Objective-C

-(void) userNotificationCenter:(UNUserNotificationCenter *)center
                didReceiveNotificationResponse:(UNNotificationResponse *)response
                withCompletionHandler:(void (^)(void))completionHandler{
    
    //actionIdentifier is your key when you define in Chabokpush payload for each action
    NSString *actionId = response.actionIdentifier;
    
    if ([actionId isEqualToString:@"special_offers_action"]) {
        NSLog(@"Special offers action clicked by user ...");
    } else if ([actionId isEqualToString:@"favorite_product_action"]) {
        NSLog(@"Favorite product action clicked by user ...");
    }
    
    completionHandler();
}
```
```swift
//Swift

func userNotificationCenter(_ center: UNUserNotificationCenter,
                didReceive response: UNNotificationResponse,
                withCompletionHandler completionHandler: @escaping () -> Void) {

    //actionIdentifier is your key when you define in Chabokpush payload for each action
    let actionId = response.actionIdentifier

    if (actionId == "special_offers_action") {
        print("Special offers action clicked by user ...")
    } else if (actionId == "favorite_product_action") {
        print("Favorite product action clicked by user ...")
    }

    completionHandler()
}
```
##### نمونه Curl

با اجرای دستور زیر در **Terminal** می‌توانید یک نوتیفیکیشن چندرسانه‌ای ارسال کنید. دقت کنید که در دستور زیر مقدار `<ACCESS_TOKEN>` حساب کاربری خود و مقدار `USER_ID` را شناسه‌ کاربری که می‌خواهید پیام به او تحویل داده شود، وارد نمایید. (این دستور برای ارسال به **یک کاربر به خصوص** است. برای ارسال به **گروهی از کاربران** به [این صفحه](https://doc.chabokpush.com/rest-api/send-chabok-message.html#ارسال-به-گروهی-از-کاربران-byquery) مراجعه کنید.)

```bash
curl -X POST \
"https://sandbox.push.adpdigital.com/api/push/toUsers?access_token=<ACCESS_TOKEN>" \
-H "accept: application/json" \
-H "Content-Type: application/json" \
-d "{ \"user\": \"USER_ID\", \"content\": \"😍💯 جمعه سیاه 😍💯\", \"notification\": { \"title\": \"😍💯 جمعه سیاه 😍💯\", \"body\": \"در جمعه سیاه می‌توانید با خرید از فروشگاه‌چابک، همزمان با تمام دنیا در این کمپین بزرگ شرکت کنید و با تخفیف های باور نکردنی همراه باشید.\", \"actions\": [ { \"id\": \"special_offers_action\", \"title\": \"پیشنهادهای ویژه\", \"options\": 5 }, { \"id\": \"favorite_product_action\", \"title\": \"کالاهای مورد علاقه من\", \"options\": 5 } ], \"mediaType\": \"png\", \"mediaUrl\": \"https://raw.githubusercontent.com/chabokpush/chabok-assets/master/samples/notification/blackfriday.png\", \"mutableContent\": true, \"category\": \"__BLACK_FRIDAY__\" }}"
```

<img src="https://raw.githubusercontent.com/chabokpush/chabok-assets/master/chabok-docs/ios/rich-notification.png" alt="Its You" height="583px" width="289.5px">
