---
id: push-notification
title: پوش‌نوتیفیکیشن 
layout: react-native-bridge
permalink: react-native-bridge/push-notification.html
prev: chabok-messaging.html
next: deeplink.html
---

چابک علاوه بر پیام چابک، **پوش‌نوتیفیکیشن** هم ارسال می‌کند. برای بکارگیری آن لطفا تنظیمات زیر برای [اندروید](/react-native-bridge/push-notification.html#اندروید) و [آی‌اواس](/react-native-bridge/push-notification.html#آی‌او‌اس) انجام دهید.

<Br>

### تنظیم پوش‌نوتیفیکیشن
---

#### اندروید


>`نکته:` تنظیم پوش نوتیفیکیشن در اندروید به صورت اتوماتیک انجام می‌شود و نیاز به تنظیم خاصی ندارد.


#### آی‌اوس

ابتدا مطمئن شوید که `MobileCoreServices.framework` ،`SystemConfiguration.framework` و `CoreData` را از **Linked Frameworks and Libraries** وارد کرده‌اید.

گزینه `Push Notifications` را در `Setting > Capabilities` فعال کنید،

و علامت `Remote Notifications`ها را در `Setting > Capabilities > Background Modes` بررسی کنید.


<br>

### پوش‌نوتیفیکیشن چندرسانه‌ای (Rich Push Notifcation)
---

برای تنظیم پوش‌نوتیفیکیشن چند رسانه‌ای به صفحات پوش [اندروید](/android/push-notification.html#تنظیم-پوشنوتیفیکیشن-چندرسانهای-rich-push-notification) و [آی‌اواس](/ios/push-notification.html#تنظیم-نوتیفیکیشن-چندرسانهای-rich-push-notification) مراجعه نمایید.

<br>


### دریافت اکشن‌های نوتیفیکیشن
---

برای دریافت اکشن‌های کلیک روی نوتیفیکیشن باید ابتدا در **اندروید** و **آی‌اواس** کدهای زیر را قرار دهید. این کدها، اکشن‌ها را تا لود شدن لایه ریکت نینیو نگه می‌دارند:


#### اندروید

کد زیر را در کلاس `MainApplication` متد `onCreate` قرار دهید:

```java
//Java
@Override
public void onCreate() {
	super.onCreate();
	SoLoader.init(this, /* native exopackage */ false);
	
	AdpPushClient.configureEnvironment(Environment.SANDBOX);
	
	chabok.addNotificationHandler(new NotificationHandler(){
		@Override
		public boolean notificationOpened(ChabokNotification message, ChabokNotificationAction notificationAction) {
			ChabokReactPackage.notificationOpened(message, notificationAction);
		return super.notificationOpened(message, notificationAction);
	 }
	});
}
```

>‍‍`نکته:` دقت داشته باشید که در صورت تغییر محیط چابک (سندباکس و عملیاتی)، حتما مقدار ‍‍`setDevelopment` و کلیدهای مربوط به همان محیط را قرار دهید.

> `نکته`: متد بالا برای محیط سندباکس است. در صورتی که حساب عملیاتی دارید کافیست فقط `Sandbox` را با ‍‍`Production` عوض کنید.



#### آی‌اواس

متد `registerToUNUserNotificationCenter` را مانند زیر قرار دهید:

```objectivec
//Objective-C
@interface AppDelegate ()<PushClientManagerDelegate>

@end

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
	
	[PushClientManager.defaultManager configureEnvironment:Sandbox];
	[PushClientManager.defaultManager addDelegate:self];

    return true;
}

-(void) userNotificationCenter:(UNUserNotificationCenter *)center didReceiveNotificationResponse:(UNNotificationResponse *)response withCompletionHandler:(void (^)(void))completionHandler{
	[AdpPushClient notificationOpened:response.notification.request.content.userInfo actionId:response.actionIdentifier];
}

-(void) application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)userInfo fetchCompletionHandler:(void (^)(UIBackgroundFetchResult))completionHandler{
	[AdpPushClient notificationOpened:userInfo];
}

-(void) application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)userInfo{
	[AdpPushClient notificationOpened:userInfo];
}

-(void)application:(UIApplication *)application handleActionWithIdentifier:(NSString *)identifier forRemoteNotification:(NSDictionary *)userInfo completionHandler:(void (^)())completionHandler{
	[AdpPushClient notificationOpened:userInfo actionId:identifier];
}
```

<br>

#### دریافت رویداد

سپس برای دریافت اکشن‌ها یک `listener` به رویداد ‍‍`notificationOpened` مانند زیر اضافه کنید:

```javascript
chabokEmitter.addListener(
            'notificationOpened',
            (msg) => {
                console.log(msg);

                if (msg.actionType === 'opened'){
                    console.log("Notification opened by user");
                } else if (msg.actionType === 'dismissed'){
                    console.log("Notification dismissed by user");
                } else if (msg.actionType === 'action_taken'){
                    console.log("User tapped on notification " , msg.actionId , " action");
                }

                if (msg.actionUrl) {
                    console.log("Got deep link (", msg.actionUrl, ")");
                }
            }
        );
        // when app is closed, keeps notification actions until react native loads
        this.chabok.notificationOpenedHandler();
    }
```

در آخر متد `notificationOpenedHandler`را قرار دهید. این متد زمانی که اپلیکیشن بسته است، اکشن‌های نوتیفیکیشن را نگه می‌دارد و به محض لود شدن لایه‌ی ریکت نیتیو، `notificationOpened` را صدا می‌زند.
