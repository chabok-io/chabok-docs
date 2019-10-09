---
id: upgrade-chabok-to-2-0-0
title: راهنمای ارتقا به نسخه ۲ چابک
layout: ios
permalink: ios/upgrade-chabok-to-2-0-0.html
---


از راهنمای زیر می‌توانید نسخه کتابخانه آی‌اواس خود را به **نسخه ۲.۰.۰ به بعد ارتقا دهید**. برای این کار فقط کافیست پس از دریافت نسخه جدید، چند قطعه کد را از پروژه خود **بردارید**.

مراحل ارتقا را به ترتیب زیر انجام دهید:

- [۱- دریافت نسخه جدید و به روز رسانی کتابخانه](/ios/upgrade-chabok-to-2-0-0.html#۱--دریافت-نسخه-۲۰-کتابخانه)

- [۲- حذف متدهای `didFinishLaunchWithOptions`](#۲--حذف-متدهای-didfinishlaunchwithoptions)

- [۳- حذف متدهای دریافت توکن](#۳--حذف-متدهای-دریافت-توکن)
 
- [۴- حذف متدهای ارسال اطلاعات دیپ لینک](#۴--حذف-متدهای-ارسال-اطلاعات-دیپ-لینک)

<br><br>

### ۱- دریافت نسخه ۲.۰.۰ کتابخانه

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

### ۲- حذف متدهای`didFinishLaunchWithOptions`

کد زیر را از  `didFinishLaunchWithOptions` در کلاس `AppDelegate` حذف کنید:

```diff
//Objective-C

‌-(BOOL)application:(UIApplication  *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {     

-    [PushClientManager setDevelopment:YES];

    [PushClientManager  resetBadge];
    
    _manager = PushClientManager.defaultManager;
    [_manager addDelegate:self];
    
    //Initialize with credential keys
-    BOOL state = [_manager
-		                 registerApplication:@"APP_ID" //based on your environment
-                         apiKey:@"API_KEY"             //based on your environment
-                         userName:@"SDK_USERNAME"      //based on your environment
-                         password:@"SDK_PASSWORD"];    //based on your environment
  

-    if  ([_manager  application:application  didFinishLaunchingWithOptions:launchOptions])  {
-    	NSLog(@"Launched  by  tapping  on  notification");
-    }

-    if (_manager.userId) {
-        [_manager registerUser:_manager.userId];
-    } else {
-        [_manager registerUser:@"USER_ID"];
-    }

     return YES
}
```

```diff
//Swift:

func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplicationLaunchOptionsKey: Any]?) -> Bool {

-	PushClientManager.setDevelopment(true)

        PushClientManager.resetBadge()
        
        _manager?.addDelegate(self)
        
        //Initialize with credential keys
-        let state = _manager?.registerApplication("APP_ID",					//based on your environment
-                                                 apiKey: "API_KEY",     	//based on your environment
-                                                 userName: "SDK_USERNAME",  //based on your environment
-                                                 password: "SDK_PASSWORD")  //based on your environment
        
 
-	if _manager?.application(application, didFinishLaunchingWithOptions: launchOptions) == true {
-		print("Launched by tapping on notification")
-	}

	
-	if let userId = _manager?.userId {
-		_manager?.registerUser(userId)
-	} else {
-		_manager?.registerUser("USER_ID")
-	}

    return true
}

```

کد زیر را به  `didFinishLaunchWithOptions` در کلاس `AppDelegate` اضافه کنید:

```diff
//Objective-C

‌-(BOOL)application:(UIApplication  *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {     

    [PushClientManager  resetBadge];
    
    _manager = PushClientManager.defaultManager;
    [_manager addDelegate:self];
    
+    [PushClientManager.defaultManager configureEnvironment:Sandbox];
    
    return YES;
}
```

```diff
//Swift:

func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplicationLaunchOptionsKey: Any]?) -> Bool {

        PushClientManager.resetBadge()
        PushClientManager.default()?.addDelegate(self)
	
	PushClientManager.default()?.configureEnvironment(.Sandbox)
	
	return true
}

```

<br>

### ۳- حذف متدهای دریافت توکن 

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

<br>

### ۴- حذف متدهای ارسال اطلاعات دیپ لینک

حذف متد `appWillOpenUrl` را مانند زیر انجام دهید.

```diff
//Objective-C:

-	[PushClientManager.defaultManager appWillOpenUrl:]; 
```

```diff
//Swift :

-	PushClientManager.default()?.appWillOpen(url)
```


پس حذف این کد، **ارتقای شما با موفقیت انجام خواهد شد.**
