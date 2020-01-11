---
id: release-note
title: لیست تغییرات کتابخانه
layout: react-native-bridge
permalink: react-native-bridge/release-note.html
next: introducing.html
---

شما در این صفحه می‌توانید از تغییرات هر نسخه کتابخانه چابک مطلع شوید. چابک برای نسخه‌گذاری از مدل **Semantic Versioning** استفاده می‌کند. برای آشنایی با این مدل [این قسمت](/react-native-bridge/sdk-setup.html#مدل-نسخهگذاری-در-چابک-semantic-versioning) را مطالعه نمایید.

<Br>

## [نسخه ۲.۰.۰ - ۱۳۹۸/۱۰/۱۸](https://github.com/chabok-io/chabok-client-rn/releases/tag/v2.0.0)

### تغییرات

- به روز رسانی کتابخانه اندروید به [نسخه ۳.۱.۲](/android/release-note.html#نسخه-۳۱۲---۱۳۹۸۱۰۱۸)
- به روز رسانی کتابخانه آی‌او‌اس به [نسخه ۲.۱.۰](/ios/release-note.html#نسخه-۲۱۰---۱۳۹۸۰۷۱۷)
- پشتیبانی از دریافت **Referral** با استفاده از فراخوانی متد `setReferralCallbackListener`.
- پشتیبانی از افزودن به مقادیر آرایه‌ای که برای داده‌های سفارشی کاربر استفاده کرده‌اید با فراخوانی متد `addToUserAttributeArray(attributeKey, attributeValue)`.
- پشتیبانی از حذف مقادیر آرایه‌ای که برای داده‌های سفارشی کاربر استفاده کرده‌اید با فراخوانی متد `removeFromUserAttributeArray(attributeKey, attributeValue)`.
- پشتیبانی از حذف داده‌های سفارشی کاربر با فراخوانی متد `unsetUserAttribute(attributeKey)`.
- پشتیبانی از تاریخ و ساعت برای مقادیری که در رویدادها و داده‌های سفارشی کاربر ارسال می‌کنید با استفاده از شی `Date` که در جاوااسکریپت موجود هست.

### ارتقا

**اندروید**:

- استفاده از سرویس FCM به جای GCM

```diff
// app-level build.gradle
- implementation 'com.google.android.gms:play-services-gcm:10.2.6'
+ implementation 'com.google.firebase:firebase-messaging:17.1.0'
```

- نیازی به فراخوانی متدهای زیر در کلاس `MainApplication` نیست:

```diff
public class MainApplication extends Application implements ReactApplication {
    @Override
    public void onCreate() {
        super.onCreate();

-       AdpPushClient.init(getApplicationContext(),
-                          MainActivity.class,
-                          "APP_ID/SENDER_ID",
-                          "API_KEY",
-                          "USERNAME",
-                          "PASSWORD");
-       AdpPushClient.get().addNotificationHandler(new NotificationHandler() {
-           @Override
-           public boolean notificationOpened(ChabokNotification message, ChabokNotificationAction notificationAction) {
-               ChabokReactPackage.notificationOpened(message, notificationAction);
-               return super.notificationOpened(message, notificationAction);
-           }
-       });
-   }

    @Override
    public void onTerminate() {
-       AdpPushClient.get().dismiss();

        super.onTerminate();
    }
}
```

**آی‌اواس**:

- نیازی به فراخوانی متدهای زیر در کلاس `AppDelegate` نیست:

```diff
- [PushClientManager.defaultManager application:application didFailToRegisterForRemoteNotificationsWithError:error];

- [PushClientManager.defaultManager application:application didRegisterForRemoteNotificationsWithDeviceToken:deviceToken];

- [PushClientManager.defaultManager application:application didRegisterUserNotificationSettings:notificationSettings];
```

**جاوااسکریپت**:

- نیازی به فراخوانی متدهای زیر در `componentDidMount` نیست:

```diff
componentDidMount() {
-   const options = {
-       appId: "APP_ID/SENDER_ID",
-       apiKey: "API_KEY",
-       username: "SDK_USERNAME",
-       password: "SDK_PASSWORD",
-       devMode: true
-   };

    this.chabok = new chabok.AdpPushClient();

-   this.chabok.init(options.appId,
-                    options.apiKey,
-                    options.username,
-                    options.password,
-                    options.devMode);
}
```

## [نسخه ۱.۴.۰ - ۱۳۹۸/۰۴/۰۵](https://github.com/chabok-io/chabok-client-rn/releases/tag/v1.4.0)

### تغییرات

- به روز رسانی کتابخانه اندروید به [نسخه ۲.۱۷.۰](/android/release-note.html#نسخه-۲۱۷۰---۱۳۹۸۰۴۰۲)
- به روز رسانی کتابخانه آی‌او‌اس به [نسخه ۱.۲۰.۰](/ios/release-note.html#نسخه-۱۲۰۰---۱۳۹۸۰۴۰۴)
- پشتیبانی از مقدار [**درآمد**](/react-native-bridge/behavior-tracking.html#رصد-درآمد-tracking-revenue) با استفاده از متد `trackPurchase`
- پشتیبانی از **بازخورد  نوتیفیکیشن (influence)** به صورت مستقیم یا غیر مستقیم
- پشتیبانی از [**دیپ لینک در صورت نداشتن اپلیکیشن** (deferred deep linking)](/react-native-bridge/deeplink.html#دیپ-لینک-قبل-از-نصب-اپلیکیشن-deferred-deep-linking) با متد `setDeeplinkCallbackListener`
- افزودن متد `incrementUserAttribute` برای [افزایش مقدار داده‌های کمیتی کاربر](/react-native-bridge/custom-data.html#افزایش-دادههای-کمیتی-کاربر)
- [افزودن متدهای `getUserAttributes` و `setUserAttributes`](/react-native-bridge/custom-data.html#مدیریت-اطلاعات-کاربر-user-attributes)
- افزودن متد `setDefaultNotificationChannel` برای **تغییر نام پیش‌فرض کانال نوتیفیکیشن** (برای اندروید ۸ به بالا)

### ارتقا

- جایگزین شدن متدهای `getUserInfo` و `setUserinfo` با متدهای `getUserAttributes` و `setUserAttributes`

>‍‍‍‍`نکته:` دقت داشته باشید که برای iOS دستور زیر را انجام دهید:

```bash
cd ios
pod update
```

## [نسخه ۱.۳.۰ - ۱۳۹۸/۰۲/۲۱](https://github.com/chabok-io/chabok-client-rn/releases/tag/v1.3.0)

### تغییرات

- به روز رسانی کتابخانه اندروید به [نسخه ۲.۱۶.۰](https://doc.chabok.io/android/release-note.html#%D9%86%D8%B3%D8%AE%D9%87-%DB%B2%DB%B1%DB%B6%DB%B0---%DB%B1%DB%B3%DB%B9%DB%B8%DB%B0%DB%B2%DB%B1%DB%B8)
- به روز رسانی کتابخانه آی‌او‌اس به [نسخه ۱.۱۹.۰](https://doc.chabok.io/ios/release-note.html#%D9%86%D8%B3%D8%AE%D9%87-%DB%B1%DB%B1%DB%B9%DB%B0---%DB%B1%DB%B3%DB%B9%DB%B8%DB%B0%DB%B2%DB%B1%DB%B8)
- افزودن متد `setUserInfo` برای ارسال اطلاعات کاربر
- افزودن متد `setDefaultTracker` برای [ترک کمپین‌های نصب](/react-native-bridge/tracker.html#روش-آیدی-ترکر-pre-install-campaigns)
- افزودن متد `appWillOpenUrl` برای [ارسال اطلاعات اتریبیوشن دیپ لینک](/react-native-bridge/deeplink.html#دریافت-دیپ-لینک)
- افزودن رویداد `notificationOpened` برای [دریافت اطلاعات کلیک روی نوتیفیکیشن](/react-native-bridge/push-notification.html#دریافت-اکشنهای-نوتیفیکیشن) (اکشن‌ها و رد کردن (dismiss))
- افزودن متد ‍‍‍‍‍`registerAsGuest` برای اپلیکیشن‌هایی که [کاربر مهمان](/react-native-bridge/sdk-setup.html#کاربر-مهمان) دارند یا می‌خواهند نصب با اولین بازدید شمرده شود (مانند سرویس ادجاست)

### ارتقا

**اندروید**:

- پشتیبانی از `INSTALL_REFERRER` برای [گوگل پلی استور](/react-native-bridge/tracker.html#گوگل-پلی-استور)

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

+       //true connects to Sandbox environment  
+       //false connects to Production environment  
+       AdpPushClient.get().setDevelopment(DEV_MODE);

+       chabok.addNotificationHandler(new NotificationHandler() {
+           @Override
+           public boolean notificationOpened(ChabokNotification message, ChabokNotificationAction notificationAction) {
+               ChabokReactPackage.notificationOpened(message, notificationAction);
+               return super.notificationOpened(message, notificationAction);
+           }
+       });
    }
}
```

**آی‌اواس**:

- برای دریافت **advertisingId** باید **AdSupport.framework** را به `Linked Frameworks and Libraries` آن پروژه اضافه کنید
- افزودن متد ‍‍‍‍‍`:notificationOpened` برای ارسال رویداد اکشن نوتیفیکیشن
- افزودن متد `registerToUNUserNotificationCenter` برای دریافت اکشن نوتیفیکیشن با پیاده‌سازی کد زیر (برای نمایش نوتیفیکیشن چند رسانه‌‌ای) [این بخش](https://doc.chabok.io/ios/push-notification.html) از مستندات را مطالعه کنید):

```diff
//Objective-C

+ @interface AppDelegate ()<PushClientManagerDelegate>

+ @end

@implementation AppDelegate

 - (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {

+    [PushClientManager.defaultManager addDelegate:self];
+    [AdpPushClient registerToUNUserNotificationCenter];
  
    ...
    
    return true;
  }

+ -(void) userNotificationCenter:(UNUserNotificationCenter *)center didReceiveNotificationResponse:(UNNotificationResponse *)response withCompletionHandler:(void (^)(void))completionHandler {
+     [AdpPushClient notificationOpened:response.notification.request.content.userInfo actionId:response.actionIdentifier];
+ }

+ -(void) application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)userInfo fetchCompletionHandler:(void (^)(UIBackgroundFetchResult))completionHandler {
+     [AdpPushClient notificationOpened:userInfo];
+ }

+ -(void) application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)userInfo{
+    [AdpPushClient notificationOpened:userInfo];
+ }

+ -(void)application:(UIApplication *)application handleActionWithIdentifier:(NSString *)identifier forRemoteNotification:(NSDictionary *)userInfo completionHandler:(void (^)())completionHandler {
+     [AdpPushClient notificationOpened:userInfo actionId:identifier];
+ }
```

## [نسخه ۱.۲.۰ - ۱۳۹۷/۰۹/۱۳](https://github.com/chabok-io/chabok-client-rn/releases/tag/v1.2.0)

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

## [نسخه ۱.۱.۱ - ۱۳۹۷/۰۸/۲۳](https://github.com/chabok-io/chabok-client-rn/releases/tag/v1.1.1)

### تغییرات
- افزودن رویداد `onSubscribe` و `onUnsubscribe` برای دریافت وضعیت **عضویت**  و **لغو عضویت** روی کانال یا رویداد
- افرودن رویداد `onRegister` به منظور دریافت وضعیت ثبت‌کاربر

## [نسخه ۱.۱.۰ - ۱۳۹۷/۰۸/۲۱](https://github.com/chabok-io/chabok-client-rn/releases/tag/v1.1.0)

### تغییرات
- به روز رسانی کتابخانه اندروید به نسخه [۲.۱۴.۰](https://doc.chabok.io/android/release-note.html#%D9%86%D8%B3%D8%AE%D9%87-%DB%B2%DB%B1%DB%B4%DB%B0---%DB%B1%DB%B3%DB%B9%DB%B7%DB%B0%DB%B8%DB%B2%DB%B1)
- به روز رسانی کتابخانه آی‌او‌اس به نسخه [۱.۱۸.۰](https://doc.chabok.io/ios/release-note.html#%D9%86%D8%B3%D8%AE%D9%87-%DB%B1%DB%B1%DB%B8%DB%B0---%DB%B1%DB%B3%DB%B9%DB%B7%DB%B0%DB%B8%DB%B2%DB%B1)
- حل مشکل رد کردن پرامیس در فراخوانی متدهای `getUserId` و `getInstallationId`


## [نسخه ۱.۰.۳ - ۱۳۹۷/۰۸/۱۹](https://github.com/chabok-io/chabok-client-rn/releases/tag/v1.0.3)

### تغییرات
- به روز رسانی کتابخانه اندروید به نسخه [۲.۱۳.۳](https://doc.chabok.io/android/release-note.html#%D9%86%D8%B3%D8%AE%D9%87-%DB%B2%DB%B1%DB%B3%DB%B3---%DB%B1%DB%B3%DB%B9%DB%B7%DB%B0%DB%B8%DB%B1%DB%B9)


## [نسخه ۱.۰.۲ - ۱۳۹۷/۰۸/۱۵](https://github.com/chabok-io/chabok-client-rn/releases/tag/v1.0.2)

### تغییرات
- به روز رسانی `compileSdkVersion` بریج اندروید به نسخه ۲۶

## [نسخه ۱.۰.۱ - ۱۳۹۷/۰۸/۱۲](https://github.com/chabok-io/chabok-client-rn/releases/tag/v1.0.1)

### تغییرات
- افزودن متد `publishEvent`
- افزودن شنونده `onEvent` برای دریافت `eventMessage`
- افزودن متدهای `subscribeEvent` و `unSubscribeEvent`
- افزودن کلید `channel` به شئ پیام (message object)

## [نسخه ۱.۰.۰ - ۱۳۹۷/۰۶/۲۶](https://github.com/chabok-io/chabok-client-rn/releases/tag/v1.0.0)

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
