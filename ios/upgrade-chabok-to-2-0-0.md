---
id: upgrade-chabok-to-2-0-0
title: راهنمای ارتقا به نسخه ۲ چابک
layout: ios
permalink: ios/upgrade-chabok-to-2-0-0.html
---


با مطالعه راهنمای زیر می‌توانید نسخه کتابخانه آی‌اواس خود را به **نسخه‌های ۲.۰.۰ به بعد ارتقا دهید**. برای این کار فقط کافیست نسخه جدید را دریافت کنید، و تعدادی کد را حذف و اضافه کنید.

مراحل ارتقا را باید به ترتیب زیر انجام دهید:

- [۱- دریافت نسخه ۲.۰.۰ و به روز رسانی کتابخانه](#%DB%B1--%D8%AF%D8%B1%DB%8C%D8%A7%D9%81%D8%AA-%D9%86%D8%B3%D8%AE%D9%87-%DB%B2%DB%B0%DB%B0-%DA%A9%D8%AA%D8%A7%D8%A8%D8%AE%D8%A7%D9%86%D9%87)

- [۲- حذف متدهای`didFinishLaunchWithOptions` و اضافه متد `configureEnvironment`](#۲--حذف-متدهایdidfinishlaunchwithoptions-و-اضافه-متد-configureenvironment)

- [۳- حذف متدهای دریافت توکن](#۳--حذف-متدهای-دریافت-توکن)

-  [۴- تغییرات ثبت و ورود کاربر (Login)](#۴--تغییرات-ثبت-و-ورود-کاربر-login)

- [۵- تغییرات حذف و خروج کاربر (Logout)](#۵--تغییرات-حذف-و-خروج-کاربر-logout)
 
- [۶- حذف متدهای ارسال اطلاعات دیپ لینک](#%DB%B6--%D8%AD%D8%B0%D9%81-%D9%85%D8%AA%D8%AF%D9%87%D8%A7%DB%8C-%D8%A7%D8%B1%D8%B3%D8%A7%D9%84-%D8%A7%D8%B7%D9%84%D8%A7%D8%B9%D8%A7%D8%AA-%D8%AF%DB%8C%D9%BE-%D9%84%DB%8C%D9%86%DA%A9)

<br><br>

### ۱- دریافت نسخه ۲.۰.۰ کتابخانه

کتابخانه چابک از طریق **CocoaPods** در دسترس است، برای به روز رسانی در خط زیر نسخه `ChabokPush` را به ۲.۰.۰ **تغییر دهید**:


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

### ۲- حذف متدهای`didFinishLaunchWithOptions` و اضافه متد `configureEnvironment`

کد زیر را از  `didFinishLaunchWithOptions` در کلاس `AppDelegate` **حذف کنید**:

{% tabs %}
{% tab OBJECTIVE-C %}
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
-        [_manager registerAsGuest];
-    }

     return YES
}
```
{% endtab %}
{% tab SWIFT %}

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
-		_manager?.registerAsGuest()
-	}

    return true
}

```
{% endtab %}
{% endtabs %}

سپس کد زیر را به  `didFinishLaunchWithOptions` در کلاس `AppDelegate` **اضافه کنید**: 

{% tabs %}
{% tab OBJECTIVE-C %}
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
{% endtab %}
{% tab SWIFT %}
```diff
//Swift:

func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplicationLaunchOptionsKey: Any]?) -> Bool {

        PushClientManager.resetBadge()
        PushClientManager.default()?.addDelegate(self)
	
+       PushClientManager.default()?.configureEnvironment(.Sandbox)
	
	return true
}

```
{% endtab %}
{% endtabs %}

<br>

### ۳- حذف متدهای دریافت توکن 

کدهای زیر را در کلاس `AppDelegate` زیر **حذف کنید**:

{% tabs %}
{% tab OBJECTIVE-C %}
```diff
//Objective-C
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
{% endtab %}
{% tab SWIFT %}
```diff
//Swift:
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
{% endtab %}
{% endtabs %}

<br>

### ۴- تغییرات ثبت و ورود کاربر (Login)
در صورتی که در اپلیکیشن‌تان، پس از احراز هویت، کاربر را با یک نام کاربری (User ID) در چابک ثبت می‌کنید، تغییرات زیر را در کدتان اعمال کنید:

{% tabs %}
{% tab OBJECTIVE-C %}
```diff
//Objective-C
- [PushClientManager.defaultManager registerUser:@"USER_ID"];

+ [PushClientManager.defaultManager login:@"USER_ID"];
```
{% endtab %}
{% tab SWIFT %}
```diff
//Swift:
- PushClientManager.default()?.registerUser("USER_ID")

+ PushClientManager.default()?.login("USER_ID")
```
{% endtab %}
{% endtabs %}

<br>

### ۵- تغییرات حذف و خروج کاربر (Logout)
 
 چنانچه به هنگام خروج کاربر از حساب کاربری  از متد `unregisterUser` استفاده می‌کنید، تغییرات زیر را در کد خود اعمال کنید:

{% tabs %}
{% tab OBJECTIVE-C %}
```diff
//Objective-C
- [PushClientManager.defaultManager unregisterUser];

+ [PushClientManager.defaultManager logout];
```
{% endtab %}
{% tab SWIFT %}
```diff
//Swift:
- PushClientManager.default()?.unregisterUser()

+ PushClientManager.default()?.logout()
```
{% endtab %}
{% endtabs %}

<br>

### ۶- حذف متدهای ارسال اطلاعات دیپ لینک

**حذف** متد `appWillOpenUrl` را مانند زیر انجام دهید:

{% tabs %}
{% tab OBJECTIVE-C %}
```diff
//Objective-C
-	[PushClientManager.defaultManager appWillOpenUrl:]; 
```
{% endtab %}
{% tab SWIFT %}
```diff
//Swift:
-	PushClientManager.default()?.appWillOpen(url)
```
{% endtab %}
{% endtabs %}

<br><br>

<p style="text-align: center;"><img src="http://uupload.ir/files/l3ij_done.jpg" style="height:50px;" />پس از اعمال تغییرات گفته شده در بالا، <b>ارتقای شما با موفقیت انجام خواهد شد.</b>
</p>
