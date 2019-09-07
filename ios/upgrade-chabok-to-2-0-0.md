---
id: upgrade-chabok-to-2-0-0
title: راهنمای ارتقا به نسخه ۲ چابک
layout: ios
permalink: ios/upgrade-chabok-to-2-0-0.html
---

با استفاده از راهنمای زیر می‌توانید نسخه کتابخانه آی‌اواس خود را به **نسخه ۲.۰.۰ به بعد ارتقا دهید**. برای این کار فقط کافیستبا استفاده از راهنمای زیر می‌توانید نسخه کتابخانه آی‌اواس خود را به **نسخه ۲.۰.۰ به بعد ارتقا دهید**. برای این کار فقط کافیست پس از دریافت نسخه جدید، چند قطعه کد را از پروژه خود **بردارید**.

کدهایی که باید حذف کنید عبارتند از:

- [۱- دریافت نسخه جدید و به روز رسانی کتابخانه]()

- [۲- حذف تنظیمات `didFinishLaunchWithOptions`](/ios/upgrade-chabok-to-2-0-0.html#حذف-در-didfinishlaunchwithoptions)

- [۳- حذف تنظیمات دریافت توکن](/ios/upgrade-chabok-to-2-0-0.html#حذف-در-appdelegate)
 
<br><br>

### ۱- دریافت نسخه کتابخانه ۲.۰ آی‌اواس

کتابخانه چابک از طریق CocoaPods در دسترس است، برای به روز رسانی در خط زیر نسخه `ChabokPush` را به ۲.۰.۰ تغییر دهید:


```bash
target 'YourProject' do
  use_frameworks!

  pod 'ChabokPush', '~> 2.0.0'
  
end
```

سپس دستور زیر را اجرا کنید:

```bash
$ pod update
```
<br>

### ۲- حذف در `didFinishLaunchWithOptions`

کد زیر را از  `didFinishLaunchWithOptions` در کلاس `AppDelegate` حذف کنید:

```diff
//Objective-C
‌-(BOOL)application:(UIApplication  *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {     
	...  
-	  if  ([_manager  application:application  didFinishLaunchingWithOptions:launchOptions])  {
-		NSLog(@"Launched  by  tapping  on  notification");
-	  }
	...
}
```

```diff
//Swift:

func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplicationLaunchOptionsKey: Any]?) -> Bool {
	...  
-	if _manager?.application(application, didFinishLaunchingWithOptions: launchOptions) == true {
-		print("Launched by tapping on notification")
-	}
	...
}

```

<br>

### ۳- حذف در `AppDelegate`

کدهای زیر را در کلاس `AppDelegate` زیر حذف کنید:

```diff
//Objective-C:
‌-(void)application:(UIApplication *)application didFailToRegisterForRemoteNotificationsWithError:(NSError *)error{
    // Handle failure of get Device token from Apple APNS Server
-  [_manager application:application didFailToRegisterForRemoteNotificationsWithError:error];
}

‌-(void)application:(UIApplication *)application didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken{
    // Handle receive Device Token From APNS Server
-  [_manager  application:application didRegisterForRemoteNotificationsWithDeviceToken:deviceToken];
}

‌-(void)application:(UIApplication *)application didRegisterUserNotificationSettings:(UIUserNotificationSettings *)notificationSettings{
    // Handle iOS 8 remote Notificaiton Settings
-  [_manager application:application didRegisterUserNotificationSettings:notificationSettings];
}
```

```diff
//Swift :
func application(_ application: UIApplication, didFailToRegisterForRemoteNotificationsWithError error: Error) {
	// Handle failure of get Device token from Apple APNS Server
- 	_manager?.application(application, didFailToRegisterForRemoteNotificationsWithError: error)
}

func application(_ application: UIApplication, didRegisterForRemoteNotificationsWithDeviceToken deviceToken: Data) {
	// Handle receive Device Token From APNS Server
- 	_manager?.application(application, didRegisterForRemoteNotificationsWithDeviceToken: deviceToken)  
}

@available(iOS 8.0, *)
func application(_ application: UIApplication, didRegister notificationSettings: UIUserNotificationSettings) {
	// Handle iOS 8 remote Notificaiton Settings
- 	_manager?.application(application, didRegister: notificationSettings)
}
```

پس حذف این کد، **ارتقای شما با موفقیت انجام خواهد شد.**
