---
id: upgrade-chabok-to-2-0-0
title: راهنمای ارتقا به نسخه ۲ چابک
layout: ios
permalink: ios/upgrade-chabok-to-2-0-0.html
---

این صفحه ارتقای کتابخانه‌های چابک به نسخه ۲.۰.۰ به بعد را آموزش خواهد داد.


برای این کار فقط کافی است کدهای نمایش داده شده را از فایل‌های مربوط حذف کنید.

### حذف در `didFinishLaunchWithOptions`

کد زیر را در  `didFinishLaunchWithOptions` در کلاس `AppDelegate` حذف کنید:

```diff

//Objective-C

​

‌-  (BOOL)application:(UIApplication  *)application

            didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {     

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

-	  if  _manager?.application(application,  didFinishLaunchingWithOptions:  launchOptions)  ==  true  {

-		print("Launched  by  tapping  on  notification")

-	}

	...

}

```

​### حذف در `AppDelegate`


کدهای زیر را در کلاس `AppDelegate` زیر حذف کنید:

```diff

//Objective-C:

​

#pragma  mark  -  Notification  AppDelegation

​

‌-(void)application:(UIApplication  *)application  didFailToRegisterForRemoteNotificationsWithError:(NSError  *)error{

    // Handle failure of get Device token from Apple APNS Server

-  [_manager  application:application  didFailToRegisterForRemoteNotificationsWithError:error];

}

​

‌-(void)application:(UIApplication  *)application  didRegisterForRemoteNotificationsWithDeviceToken:(NSData  *)deviceToken{

    // Handle receive Device Token From APNS Server

-  [_manager  application:application  didRegisterForRemoteNotificationsWithDeviceToken:deviceToken];

}

​

‌-(void)application:(UIApplication  *)application  didRegisterUserNotificationSettings:(UIUserNotificationSettings  *)notificationSettings{

    // Handle iOS 8 remote Notificaiton Settings

-  [_manager  application:application  didRegisterUserNotificationSettings:notificationSettings];

}

```

```diff

//Swift  :

​

//MARK  :  Notification  AppDelegation

​

func  application(_  application:  UIApplication,  didFailToRegisterForRemoteNotificationsWithError  error:  Error)  {

	// Handle failure of get Device token from Apple APNS Server

- _manager?.application(application,  didFailToRegisterForRemoteNotificationsWithError:  error)

}

func  application(_  application:  UIApplication,  didRegisterForRemoteNotificationsWithDeviceToken  deviceToken:  Data)  {

	// Handle receive Device Token From APNS Server

- _manager?.application(application,  didRegisterForRemoteNotificationsWithDeviceToken:  deviceToken)  

}

@available(iOS  8.0,  *)

func  application(_  application:  UIApplication,  didRegister  notificationSettings:  UIUserNotificationSettings)  {

	// Handle iOS 8 remote Notificaiton Settings

- _manager?.application(application,  didRegister:  notificationSettings)

}

```
