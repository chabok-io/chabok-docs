---
id: release-note
title: لیست تغییرات کتابخانه
layout: ios
permalink: ios/release-note.html
prev: troubleshoot.html
---

شما در این صفحه می‌توانید از تغییرات هر نسخه کتابخانه چابک مطلع شوید. چابک برای نسخه‌گذاری از مدل **Semantic Versioning** استفاده می‌کند. برای آشنایی با این مدل [این قسمت](/ios/sdk-setup.html#مدل-نسخهگذاری-در-چابک-semantic-versioning) را مطالعه نمایید.

<Br>

##  [نسخه ۲.۱.۰ - ۱۳۹۸/۰۷/۱۷](https://github.com/chabok-io/chabok-client-ios/releases/tag/v2.1.0)

### تغییرات

- دریافت پارامتر `label` با استفاده از فراخوانی متد `chabokReferralResponse:(NSString *)referralId` و پیاده‌سازی متد `PushClientManagerDelegate`، که این پارامتر در لینک ترکر قرار می‌گیرد و جهت پیاده‌سازی فرایند دعوت از دوستان در اپلیکیشن‌تان کاربرد دارد.

- پشتیبانی از افزودن به مقادیر آرایه‌ای که برای داده‌های سفارشی کاربر استفاده کرده‌اید با فراخوانی متد `addToUserAttributeArray:(NSString *)attributeKey attributeValue:(NSString *)attributeValue`.
 
- پشتیبانی از حذف مقادیر آرایه‌ای برای داده‌های سفارشی کاربر با فراخوانی متد `removeFromUserAttributeArray:(NSString *)attributeKey attributeValue:(NSString *)attributeValue`.

- پشتیبانی از حذف داده‌های سفارشی کاربر با فراخوانی متد `unsetUserAttribute:(NSString *) attributeKey`.

- پشتیبانی از تاریخ و ساعت برای مقادیری که در رویدادها و داده‌های سفارشی کاربر ارسال می‌کنید با استفاده از **کلاس Datetime** که در کتابخانه چابک موجود هست.


##  [نسخه ۲.۰.۱ - ۱۳۹۸/۰۷/۳۰](https://github.com/chabok-io/chabok-client-ios/releases/tag/2.0.1)

### تغییرات

- به کمک متد `disableSdk` می‌توانید کتابخانه چابک را غیرفعال کنید.

- بهبود تعیین وضعیت اتصال برای ریکت‌نیتو

- افزودن متد `login:hash` به منظور احراز هویت سرور به سرور. 


##  [نسخه ۲.۰.۰ - ۱۳۹۸/۰۷/۱۷](https://github.com/chabok-io/chabok-client-ios/releases/tag/v2.0.0)

> `نکته:`  در صورتی که می‌خواهید نسخه خود را ارتقا دهید، حتما [مستندات مهاجرت](/ios/upgrade-chabok-to-2-0-0.html) به نسخه ۲ چابک را مطالعه کنید.

### تغییرات

- افزودن متد ``configureEnvironment`` برای [خودکارسازی مقداردهی](/ios/sdk-setup.html#%DB%B2--%D9%85%D9%82%D8%AF%D8%A7%D8%B1%D8%AF%D9%87%DB%8C-%D8%A7%D9%88%D9%84%DB%8C%D9%87-initialize) اولیه توسط فایل **Chabok.sandbox.plist**  یا  **Chabok.production.plist**

- افزودن متدهای ‍‍`login` برای ثبت کاربر
 
- افزودن متد `logout` برای تبدیل کاربر به مهمان

- افزودن پراپرتی `logLevel` برای لاگ گرفتن در سطوح مختلف (مانند  ... ,debug, warning, info)

- برداشته شدن **هشدارها**

- از این پس قابلیت‌های آنی (realtime) و پوش‌نوتیفیکیشن به صورت پیش‌فرض در فایل **Chabok.sandbox.plist**  یا  **Chabok.production.plist** قابل تنظیم است.

- افزودن مدل‌های جدید آیفون (**iPhone 11, iPhone 11 Max, iPhone 11 Pro Max**) به SDK

- خودکارسازی دریافت دیتای نوتیفیکیشن از طریق swizzle کردن متدهای `UNUserNotificationCenterDelegate`

- خودکارسازی دریافت توکن پوش‌نوتیفیکیشن و تشخیص بازدید اپلیکیشن از طریق swizzle کردن متدهای `UIApplicationDelegate`

### ارتقا

- حذف متدهای `register`  و  `unregister`. به جای این دو، از متدهای `login` و `logout` استفاده کنید.

- حذف متد `registerApplication` (مقداردهی به صورت خودکار انجام می‌شود)

- منسوخ شدن متد `setDevelopment`. به جای آن از متد `configureEnvironment` استفاده کنید.

- تغییر کلاس `DeliveryMessage` به `PushClientDeliveryMessage`

- تغییر مقدار پیش‌فرض پارامتر **realtime** به `NO`

- افزودن پارامتر `logLevel` به جای `enableLog`

- برداشته شدن متدهای زیر با swizzle کردن متدهای `UIApplicationDelegate`:

```diff
//Objective-C

- [PushClientManager.defaultManager application:didFailToRegisterForRemoteNotificationsWithError:];

- [PushClientManager.defaultManager application:didRegisterForRemoteNotificationsWithDeviceToken:];

- [PushClientManager.defaultManager application:didRegisterUserNotificationSettings:];

- [PushClientManager.defaultManager application:didReceiveRemoteNotification:];

- [PushClientManager.defaultManager application:didReceiveRemoteNotification:fetchCompletionHandler:];

- [PushClientManager.defaultManager application:didFinishLaunchingWithOptions:];

- [PushClientManager.defaultManager application:didReceiveLocalNotification:];

- [PushClientManager.defaultManager applicationDidBecomeActive:];

- [PushClientManager.defaultManager applicationDidEnterBackground:];

- [PushClientManager.defaultManager applicationWillEnterForeground:];

- [PushClientManager.defaultManager applicationWillResignActive:];

- [PushClientManager.defaultManager applicationWillTerminate:];

- [PushClientManager.defaultManager appWillOpenUrl:];
```

##  [نسخه ۱.۲۰.۲ - ۱۳۹۸/۰۵/۲۶](https://github.com/chabok-io/chabok-client-ios/releases/tag/v1.20.2)

### تغییرات

- از این پس متد `registerWithGuestId` [شناسه مهمان (`guestId`) می‌گیرد.](/ios/sdk-setup.html#کاربر-مهمان-با-شناسه-سفارشی)

- حالا حداقل طول  `userId`  **یک**  کاراکتر است.

- حل مشکل برداشته شدن تگ مهمان پس از ثبت نام کاربر

- از این پس `trackName` در متد `trackPurchase` و `track` از white space پشتیبانی می‌کند.

##  [نسخه ۱.۲۰.۱ - ۱۳۹۸/۰۴/۱۷](https://github.com/chabok-io/chabok-client-ios/releases/tag/v1.20.1)

### تغییرات

- پشتیبانی متد `incrementUserAttribute` از [آرایه‌‌ای از اطلاعات (attribute) کاربر](/ios/custom-data.html#افزودن-به-چند-attribute)

- افزودن متد `incrementUserAttributeValue:value` برای [افزایش هر کدام از اطلاعات کاربر (attribute) به مقدار دلخواه](/ios/custom-data.html#افزودن-مقدار-دلخواه-به-یک-attribute)

- افزودن متد `incrementUserAttributeValues:value` برای [افزایش بیش‌ از یکی از اطلاعات کاربر (attribute) به مقدار دلخواه](/ios/custom-data.html#افزودن-مقدار-دلخواه-به-چند-attribute) (این متد از dictionary از اطلاعات کاربر پشتیبانی می‌کند)

##  [نسخه ۱.۲۰.۰ - ۱۳۹۸/۰۴/۰۴](https://github.com/chabok-io/chabok-client-ios/releases/tag/v1.20.0)

### تغییرات

- پشتیبانی از مقدار [**درآمد**](/ios/behavior-tracking.html#رصد-درآمد-tracking-revenue) با استفاده از متد `trackPurchase`

- پشتیبانی از **بازخورد نوتیفیکیشن (influence)** به صورت مستقیم یا غیر مستقیم

- پشتیبانی از [**دیپ لینک در صورت نداشتن اپلیکیشن**](/ios/deeplink.html#دیپ-لینک-قبل-از-نصب-اپلیکیشن-deferred-deep-linking) با delegate کالبک `:chabokDeeplinkResponse`

- افزودن متد `incrementUserAttribute` برای [افزایش مقدار داده‌های کمیتی کاربر](/ios/custom-data.html#افزایش-دادههای-کمیتی-کاربر)

- افزایش تعداد کاراکترهای قابل قبول در `userId` به ۶۴ کاراکتر

- [افزودن پراپرتی `userAttributes`](/ios/custom-data.html#مدیریت-اطلاعات-کاربر-user-attributes)

- حل مشکل افزودن تگ `CHABOK_GUEST` با متد `registerAsGuest`

### ارتقا

- جایگزین شدن `userinfo` با `userAttributes`

 
##  [نسخه ۱.۱۹.۰ - ۱۳۹۸/۰۲/۱۸](https://github.com/chabok-io/chabok-client-ios/releases/tag/v1.19.0)

### تغییرات

- پشتیبانی از **advertisingId**

- بهبود **رصد رویداد** برای پشتیبانی از کاربرانی که از **vpn** استفاده می‌کنند

- حل مشکل ارسال اطلاعات کاربر در متد `setUserInfo`

- افزودن آمار و آنالیتیکس برای کلیک روی نوتیفیکیشن (اکشن‌ها و رد کردن (dismiss))

- افزودن متد `setDefaultTracker` برای ترک کمپین‌های نصب (Pre-Install Campaigns)

- حالا چابک ‍‍`osBuild` و ‍‍`locale` کاربر را برای آنالیتیکس جمع‌آوری می‌کند

- پشتیبانی از [**دیپ لینک**](/ios/deeplink.html) (deep link) و **ری‌دایرکت** (redirect) برای کلیک روی نوتیفیکیشن

- افزودن متد `appWillOpenUrl` برای **ارسال اطلاعات اتریبیوشن دیپ لینک و لینک همگانی (universal link)**

- تغییر رفتار در متد `registerAsGuest` (دیگر با هر بار فراخوانی کاربر جدید ایجاد نمی‌کند.)

- افزودن رویداد ‍‍`userNotificationCenter:willPresentNotification:withCompletionHandler:` برای مدیریت نمایش نوتیفیکیشن در فورگراند

### ارتقا

- برای دریافت **advertisingId** باید `AdSupport.framework` را به **Linked Frameworks and Libraries** آن پروژه اضافه کنید


## [نسخه ۱.۱۸.۱ - ۱۳۹۷/۱۲/۱۳](https://github.com/chabok-io/chabok-client-ios/releases/tag/v1.18.1) 

### تغییرات

- حل مشکل لاگ‌های غیر ضروری

- بهبود تایید نصب

- افزودن قابلیت تشخیص **Build** اپلیکیشن (`Debug` یا `Release`) و انقضای آن

- افزودن متد `registerAsGuest` برای اپلیکیشن‌هایی که کاربر مهمان دارند یا می‌خواهند نصب با اولین بازدید شمرده شود (مانند سرویس ادجاست)

- حل مشکل اجرا روی simulator با معماری x86

## [نسخه ۱.۱۸.۰ - ۱۳۹۷/۰۸/۲۱](https://github.com/chabok-io/chabok-client-ios/releases/tag/v1.18.0) 

### تغییرات

- تعریف دستگاه‌های جدید اپل در چابک

### ارتقا

- انتقال داده‌های کاستوم به کلید `data` در متدهای `publishEvent` و `track`

## [نسخه ۱.۱۷.۱ - ۱۳۹۷/۰۶/۱۸](https://github.com/chabok-io/chabok-client-ios/releases/tag/v1.17.1) 

### تغییرات

- افزودن متدهای `addTags` و `removeTags` برای پشتیبانی از آرایه‌ای از تگ‌ها
- بهبود Register مجدد کاربر با قابلیت تغییر `userId` از متد `register`
- حل مشکل `LaunchCount` و `LaunchTime` برای زمانی که اپ از طریق ‌Location  در Background باز می‌شود
 
## [نسخه ۱.۱۷.۰ - ۱۳۹۷/۰۵/۱۷](https://github.com/chabok-io/chabok-client-ios/releases/tag/v1.17.0)  

### تغییرات

- افزودن متد `track:data`  برای رصد  تعامل کاربر
- افزودن متد `screenView` برای ذخیره رفتار کاربر در هر صفحه با مدت هر `session`
- افزودن قابلیت `automaticallyTrackScreens` برای رصد **خودکار** صفحه 
- افزودن قابلیت `sessionTimeout` برای تعیین زمان پایان هر `session` در **background**
- حل مشکل چک کردن **NULL** در **payload** `RichNotification`

### ارتقا

- تفییر پیش‌فرض `live` برای متد `publishEvent` به `YES`

>`نکته :` کسانی که در نسخه‌های پایین‌تر از پیش‌فرض **default** متد `publishEvent` استفاده می‌کردند برای حفظ تنظیمات قبلی‌شان بهتر است اکنون از پیش‌فرض `publishEvent:data:live`  با  مقدار `NO` برای `live` استفاده کنند.

## [نسخه ۱.۱۶.۲ - ۱۳۹۷/۰۴/۲۶](https://github.com/chabok-io/chabok-client-ios/releases/tag/v1.16.2)  

### تغییرات

- افزودن قابلیت یکتا سازی دستگاه
- افزودن قابلیت تشخیص **وضوح تصویر** و **نوع مجوز دسترسی به موقعیت مکانی**
- حل مشکل قطع شدن اتصال در حالت باز شدن اپلیکیشن توسط موقعیت مکانی
- حل مشکل تشخیص باز شدن برنامه به هنگام باز شدن اپلیکیشن توسط موقعیت مکانی

## [نسخه ۱.۱۶.۱ - ۱۳۹۷/۰۳/۲۹](https://github.com/chabok-io/chabok-client-ios/releases/tag/v1.16.1) 


### تغییرات

- حل مشکل عدم ارسال پوش نوتیفیکیشن برای کاربرانی که دسترسی `DENIED` داده‌اند.

## [نسخه ۱.۱۶.۰ - ۱۳۹۷/۰۳/۲۱](https://github.com/chabok-io/chabok-client-ios/releases/tag/v1.16.0) 

### تغییرات

- پشتیبانی از قابلیت **Rich Notification** برای **iOS 10** به بالا
- قابلیت تشخیص غیرفعال کردن پوش نوتیفیکیشن توسط کاربر `DENIED`
- افزودن property `enableLog` جهت فعال/غیرفعال سازی گزارش‌های چابک
- تشخیص زمان نصب اپلیکیشن
- تشخیص شناسه اپلیکیشن `bundleIdentifier` 

## [نسخه ۱.۱۵.۱ - ۱۳۹۶/۱۱/۰۳](https://github.com/chabok-io/chabok-client-ios/releases/tag/v1.15.1) 

### تغییرات

 - استفاده از کلیدهای *title* و *body* به منظور نمایش عنوان و متن در `Notification`
 - تشخیص نصب جدید و باز شدن برنامه (دسترسی به این رویدادها به کمک کلیدهای `kPushClientDetectAppNewInstall` و `kPushClientDetectAppWasLaunched`)
 - حل مشکل متد `deviceSubscriptions` به هنگام فراخوانی قبل از متد `registerUser:` 
 - اعلان خطا به هنگام فراخوانی متد `updateNotificationSettings:sound:alert:` قبل از رجیستر شدن کاربر

## [نسخه ۱.۱۵.۰ - ۱۳۹۶/۱۰/۱۸](https://github.com/chabok-io/chabok-client-ios/releases/tag/v1.15.0) 

### ارتقا

* از متد `registerUser:` بجای متد `registerAgainWithUserId:`، جهت تغییر `userId` استفاده کنید. برای تغییر نام کاربری، چابک به صورت خودکار `userId` قدیمی را به صورت کامل پاک کرده و `userId` جدید را در سرور ثبت می‌کند.
* تغییر پیش فرض متد `SetDevelopment` به مقدار `YES`،‌ به این معنی که محیط کلاینت چابک بصورت پیش‌فرض حالت تست (sandbox) می‌باشد.

### تغییرات

* تغییر پیش فرض متد `SetDevelopment` به مقدار `YES`.
* حل مشکل نمایش هشدار background
* حذف متد `registerAgainWithUserId:`.

## نسخه ۱.۱۴.۱ - ۱۳۹۶/۱۰/۰۳

### تغییرات

* `publish` موقعیت مکانی به صورت `live`

## نسخه ۱.۱۴.۰ - ۱۳۹۶/۰۹/۲۰

### ارتقا

*  عضویت در کانال عمومی به صورت `CHANNEL_NAME` و در کانال خصوصی به صورت `private/CHANNEL_NAME` امکان پذیر است.
*  تغییر نام متد `enableEventDelivery:forPublic:` به `subscribeEvent:` 
*  تغییر نام متد `enableEventDelivery:` به `subscribeEvent:installationId:` 
*  تغییر نام متد `getRegistrationId` به `getInstallationId`
*  اجباری کردن property `messageBody` در کلاس `PushClientMessage`

### تغییرات

- افزودن متد جدید برای عضویت روی یک رویداد (`unsubscribeEvent:` و `unsubscribeEvent:installationId:`)
- افزودن متد جدید برای ارسال پیام به صورت خصوصی (`publish:toChannel:withText:`)
- افزودن delegate method جدید برای مدیریت خطاها در متدهای **subscribe**، **unsubscribe** و **publish** (`pushClientManagerDidSubscribed:` و `pushClientManagerDidSubscribed:` و `pushClientManagerDidFailInSubscribe:` و `pushClientManagerDidFailInUnsubscribe:` و `pushClientManagerDidFailInPublish:`)
- شخصی سازی داده ارسال موقعیت مکانی با استفاده از closure `customizeGeoData`
