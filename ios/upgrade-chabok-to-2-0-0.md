---
id: upgrade-chabok-to-2-0-0
title: راهنمای ارتقا به نسخه ۲ چابک
layout: ios
permalink: ios/upgrade-chabok-to-2-0-0.html
---

با استفاده از راهنمای زیر می‌توانید نسخه کتابخانه آی‌اواس خود را به **نسخه ۲.۰.۰ به بعد ارتقا دهید**. برای این کار فقط کافیست چند قطعه کد را از پروژه خود **بردارید**.

کدهایی که باید حذف کنید عبارتند از:

- [۱- حذف در `didFinishLaunchWithOptions`](/ios/upgrade-chabok-to-2-0-0.html#حذف-در-didfinishlaunchwithoptions)
- [۲- حذف در `AppDelegate`](/ios/upgrade-chabok-to-2-0-0.html#حذف-در-appdelegate)


<br>

### حذف در `didFinishLaunchWithOptions`

کد زیر را از  `didFinishLaunchWithOptions` در کلاس `AppDelegate` حذف کنید:

```diff
//Objective-C
-(BOOL)application:(UIApplication  *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {     
	...  
-	  if  ([_manager  application:application  didFinishLaunchingWithOptions:launchOptions])  {
-		NSLog(@"Launched  by  tapping  on  notification");
-	  }
	...
}
```

```diff
//Swift:

func  application(_  application:  UIApplication,  didFinishLaunchingWithOptions  launchOptions:  [UIApplicationLaunchOptionsKey:  Any]?)  ->  Bool  {
	...  

-	if  _manager?.application(application,  didFinishLaunchingWithOptions:  launchOptions)  ==  true  {
-		print("Launched  by  tapping  on  notification")
-	}
	...
}

```

<br>

### حذف در `AppDelegate`


کدهای زیر را در کلاس `AppDelegate` زیر حذف کنید:

```diff
//Objective-C:
#pragma  mark  -  Notification  AppDelegation
-(void)application:(UIApplication  *)application  didFailToRegisterForRemoteNotificationsWithError:(NSError  *)error{
    // Handle failure of get Device token from Apple APNS Server
-  [_manager  application:application  didFailToRegisterForRemoteNotificationsWithError:error];
}

-(void)application:(UIApplication  *)application  didRegisterForRemoteNotificationsWithDeviceToken:(NSData  *)deviceToken{
    // Handle receive Device Token From APNS Server
-  [_manager  application:application  didRegisterForRemoteNotificationsWithDeviceToken:deviceToken];
}

-(void)application:(UIApplication  *)application  didRegisterUserNotificationSettings:(UIUserNotificationSettings  *)notificationSettings{
    // Handle iOS 8 remote Notificaiton Settings
-  [_manager  application:application  didRegisterUserNotificationSettings:notificationSettings];
}
```

```diff
//Swift  :
//MARK  :  Notification  AppDelegation
func  application(_  application:  UIApplication,  didFailToRegisterForRemoteNotificationsWithError  error:  Error)  {
	// Handle failure of get Device token from Apple APNS Server
- 	_manager?.application(application,  didFailToRegisterForRemoteNotificationsWithError:  error)
}

func  application(_  application:  UIApplication,  didRegisterForRemoteNotificationsWithDeviceToken  deviceToken:  Data)  {
	// Handle receive Device Token From APNS Server
- 	_manager?.application(application,  didRegisterForRemoteNotificationsWithDeviceToken:  deviceToken)  
}

@available(iOS  8.0,  *)
func  application(_  application:  UIApplication,  didRegister  notificationSettings:  UIUserNotificationSettings)  {
	// Handle iOS 8 remote Notificaiton Settings
- 	_manager?.application(application,  didRegister:  notificationSettings)
}
```
