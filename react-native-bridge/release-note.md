---
id: release-note
title: لیست تغییرات کتابخانه
layout: react-native-bridge
permalink: react-native-bridge/release-note.html
next: introducing.html
---

شما در این صفحه می‌توانید از تغییرات هر نسخه کتابخانه چابک مطلع شوید. چابک برای نسخه‌گذاری از مدل **Semantic Versioning** استفاده می‌کند. برای آشنایی با این مدل [این قسمت](/react-native-bridge/sdk-setup.html#مدل-نسخهگذاری-در-چابک-semantic-versioning) را مطالعه نمایید.

<Br>

## [نسخه ۱.۳.۰ - ۱۳۹۸/۰۲/۲۱](https://github.com/chabokpush/chabok-client-rn/releases/tag/v1.3.0)

### تغییرات

- به روز رسانی کتابخانه اندروید به [نسخه ۲.۱۶.۰](https://github.com/chabokpush/chabok-client-android/releases/tag/v2.16.0)
- به روز رسانی کتابخانه آی‌او‌اس به [نسخه ۱.۱۹.۰](https://github.com/chabokpush/chabok-client-ios/releases/tag/v1.19.0)
- افزودن متد `setUserInfo` برای ارسال اطلاعات کاربر
- افزودن متد `setDefaultTracker` برای ترک کمپین‌های نصب
- افزودن متد `appWillOpenUrl` برای **ارسال اطلاعات اتریبیوشن دیپ لینک**
- افزودن رویداد `notificationOpened` برای دریافت اطلاعات کلیک روی نوتیفیکیشن (اکشن‌ها و رد کردن (dismiss))
- افزودن متد ‍‍‍‍‍`registerAsGuest` برای اپلیکیشن‌هایی که کاربر مهمان دارند یا می‌خواهند نصب با اولین بازدید شمرده شود (مانند سرویس ادجاست)

### ارتقا

**اندروید**:

- پشتیبانی از `INSTALL_REFERRER` برای گوگل پلی استور

کد زیر را به gradle اضافه کنید:

```groovy
    implementation 'com.android.installreferrer:installreferrer:1.0'
```
- برای دریافت اکشن نوتیفیکیشن، کد زیر را در کلاس `MainApplication` متد `onCreate` قرار دهید:

```diff
//Java

    @Override
    public void onCreate() {
        super.onCreate();
        SoLoader.init(this, /* native exopackage */ false);
        
        if (chabok == null) {
            chabok = AdpPushClient.init(
                    getApplicationContext(),
                    MainActivity.class,
                    "APP_ID/SENDER_ID",
                    "API_KEY",
                    "USERNAME",
                    "PASSWORD"
            );

+               //true connects to Sandbox environment  
+               //false connects to Production environment  
+             AdpPushClient.get().setDevelopment(DEV_MODE);

+            chabok.addNotificationHandler(new NotificationHandler(){
+                @Override
+                public boolean notificationOpened(ChabokNotification message, ChabokNotificationAction notificationAction) {
+                    ChabokReactPackage.notificationOpened(message, notificationAction);
+                   return super.notificationOpened(message, notificationAction);
+                }
+            });
        }
    }
```

**آی‌اواس**:

- برای دریافت **advertisingId** باید **AdSupport.framework** را به `Linked Frameworks and Libraries` آن پروژه اضافه کنید
- افزودن متد ‍‍‍‍‍`:notificationOpened` برای ارسال رویداد اکشن نوتیفیکیشن
- افزودن متد `registerToUNUserNotificationCenter` برای دریافت اکشن نوتیفیکیشن با پیاده‌سازی کد زیر (برای نمایش نوتیفیکیشن چند رسانه‌ای (Rich Notification) [این بخش](https://doc.chabokpush.com/ios/push-notification.html) از مستندات را مطالعه کنید):

```diff
//Objective-C

+ @interface AppDelegate ()<PushClientManagerDelegate>

+ @end

@implementation AppDelegate

 - (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
  {
    
+    [PushClientManager.defaultManager addDelegate:self];
+    [AdpPushClient registerToUNUserNotificationCenter];
  
    ...
    
    return true;
  }

+ -(void) userNotificationCenter:(UNUserNotificationCenter *)center didReceiveNotificationResponse:(UNNotificationResponse *)response withCompletionHandler:(void (^)(void))completionHandler{
+     [AdpPushClient notificationOpened:response.notification.request.content.userInfo actionId:response.actionIdentifier];
+ }
  
+ -(void) application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)userInfo fetchCompletionHandler:(void (^)(UIBackgroundFetchResult))completionHandler{
+     [AdpPushClient notificationOpened:userInfo];
+ }
  
+ -(void) application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)userInfo{
+    [AdpPushClient notificationOpened:userInfo];
+ }
  
+ -(void)application:(UIApplication *)application handleActionWithIdentifier:(NSString *)identifier forRemoteNotification:(NSDictionary *)userInfo completionHandler:(void (^)())completionHandler{
+     [AdpPushClient notificationOpened:userInfo actionId:identifier];
+ }
```

## [نسخه ۱.۲.۰ - ۱۳۹۷/۰۹/۱۳](https://github.com/chabokpush/chabok-client-rn/releases/tag/v1.2.0)

### تغییرات

- حل مشکل اتصال به محیط عملیاتی  

### ارتقا
- متد `setDevelopment` از دسترس خارج شده است و برای تغییر محیط عملیاتی، پارامتر `devMode` به متد `init` اضافه شده است.
```javascript
init(
	APP_ID/SENDER_ID,
	API_KEY,
	SDK_USERNAME,
	SDK_PASSWORD,
	DEV_MODE
)
```
- افزودن پارامتر `devMode` به متد `init` جهت تغییر محیط آزمایشی یا عملیاتی چابک
- حذف پارامتر `appName` از متد `initializeApp`
```javascript
initializeApp(options)
```

## [نسخه ۱.۱.۱ - ۱۳۹۷/۰۸/۲۳](https://github.com/chabokpush/chabok-client-rn/releases/tag/v1.1.1)

### تغییرات
- افزودن رویداد `onSubscribe` و `onUnsubscribe` برای دریافت وضعیت **عضویت**  و **لغو عضویت** روی کانال یا رویداد
- افرودن رویداد `onRegister` به منظور دریافت وضعیت ثبت‌کاربر

## [نسخه ۱.۱.۰ - ۱۳۹۷/۰۸/۲۱](https://github.com/chabokpush/chabok-client-rn/releases/tag/v1.1.0)

### تغییرات
- به روز رسانی کتابخانه اندروید به نسخه [۲.۱۴.۰](https://github.com/chabokpush/chabok-client-android/releases/tag/v2.14.0)
- به روز رسانی کتابخانه آی‌او‌اس به نسخه [۱.۱۸.۰](https://github.com/chabokpush/chabok-client-ios/releases/tag/v1.18.0)
- حل مشکل رد کردن پرامیس در فراخوانی متدهای `getUserId` و `getInstallationId`


## [نسخه ۱.۰.۳ - ۱۳۹۷/۰۸/۱۹](https://github.com/chabokpush/chabok-client-rn/releases/tag/v1.0.3)

### تغییرات
- به روز رسانی کتابخانه اندروید به نسخه [۲.۱۳.۳](https://doc.chabokpush.com/android/release-note.html#%D9%86%D8%B3%D8%AE%D9%87-%DB%B2%DB%B1%DB%B3%DB%B3---%DB%B1%DB%B3%DB%B9%DB%B7%DB%B0%DB%B8%DB%B1%DB%B9)


## [نسخه ۱.۰.۲ - ۱۳۹۷/۰۸/۱۵](https://github.com/chabokpush/chabok-client-rn/releases/tag/v1.0.2)

### تغییرات
- به روز رسانی `compileSdkVersion` بریج اندروید به نسخه ۲۶

## [نسخه ۱.۰.۱ - ۱۳۹۷/۰۸/۱۲](https://github.com/chabokpush/chabok-client-rn/releases/tag/v1.0.1)

### تغییرات
- افزودن متد `publishEvent`
- افزودن شنونده `onEvent` برای دریافت `eventMessage`
- افزودن متدهای `subscribeEvent` و `unSubscribeEvent`
- افزودن کلید `channel` به شئ پیام (message object)

## [نسخه ۱.۰.۰ - ۱۳۹۷/۰۶/۲۶](https://github.com/chabokpush/chabok-client-rn/releases/tag/v1.0.0)

### تغییرات
- افزودن متد `unregister`
- افزودن متد `resetBadge`
- افزودن متدهای `addTags` و `removeTags`
- افزودن متد جدید `init` برای مقداردهی اولیه
- افزودن متدهای `getUserId` و `getInstallationId`  
- افزودن متد `track` برای رصد تعامل کاربر
- افزودن متد `setDevelopment` برای تغییر محیط چابک (آزمایشی و عملیاتی)
- حل مشکل عدم وجود data
- حل مشکل کرش کردن ریلد فایل js در بریج آی‌او‌اس

### ارتقا
- تغییر امضای `unsubscribe` به `unSubscribe`
- تغییر امضای متد `publish` به گرفتن object با {'content','userId','channel','data'}.
