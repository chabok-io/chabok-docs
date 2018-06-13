---
id: rich_notification
title: نوتیفیکیشن چندرسانه‌ای
layout: ios
permalink: ios/rich_notification.html
prev: setup.html
next: publishingMessages.html
---
### مراحل راه‌اندازی نوتیفیکیشن چندرسانه‌ای

 1) ابتدا از منو محیط **Xcode** بر روی گزینه `File` در بخش `New` بروی `Target...`
   کلیک کنید.
   
 2) در صفحه باز شده `Notification Service Extension` را انتخاب کنید
    و بر روی دکمه `Next` کلیک کنید.
    
 ![انتخاب تارگت سرویس نوتیفیکیشن](http://uupload.ir/files/dvcx_choose_target.png)
 
 3) سپس همانند تصویر زیر اطلاعات مورد نیاز را پر کرده و بر روی دکمه `Finish` کلیک کنید.
 
 ![پر کردن اطلاعات مورد نیاز برای تارگت سرویس نوتیفیکیشن](http://uupload.ir/files/xni_target_options.png
 )
 
 4) همانند تصویر زیر وارد صفحه تنظیمات Target خواهید شد.
 
 > `نکته :` در بخش `Deployment Info` گزینه `Deployment Target` را `iOS 10` قرار دهید.
 ![تنظیمات تارگ](http://uupload.ir/files/51rz_project_settings.png)
 
 5) فایل `Info.plist` تارگت ساخته شده را به صورت `Source Code` باز کرده و کلید زیر را در آن قرار دهید :

```markup
<key>NSAppTransportSecurity</key>
<dict>
    <key>NSAllowsArbitraryLoads</key>
    <true/>
</dict>
```

 6) فایل `NotificationService.m` یا `NotificationService.swift` را
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

### مدیریت رویداد کلیک بر روی هر اکشن
با قرار دادن متد `userNotificationCenter:didReceiveNotificationResponse:withCompletionHandler` در فایل `AppDelegate` همانند کد زیر می‌توانید عملیات متناسب بر روی هر دکمه را پیاده‌سازی کنید :

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

![نمونه نوتیفیکیشن چندرسانه‌ای](http://uupload.ir/files/ph2d_rich_notification_screenshot-small.png)