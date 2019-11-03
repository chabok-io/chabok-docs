---
id: release-note
title: لیست تغییرات کتابخانه
layout: android
permalink: android/release-note.html
prev: troubleshoot.html
---

شما در این صفحه می‌توانید از تغییرات هر نسخه کتابخانه چابک مطلع شوید. چابک برای نسخه‌گذاری از مدل **Semantic Versioning** استفاده می‌کند. برای آشنایی با این مدل [این قسمت](/android/sdk-setup.html#مدل-نسخهگذاری-در-چابک-semantic-versioning) را مطالعه نمایید.

<Br>
 ##[نسخه ۳.۰.۰ - ۱۳۹۸/۰۶/۲۶](https://github.com/chabok-io/chabok-client-android/releases/tag/v3.0.0)


### تغییرات
- افزودن متد `configureEnvironment` برای [خودکارسازی مقداردهی](sdk-setup.html#%DB%B2--%D9%85%D9%82%D8%AF%D8%A7%D8%B1%D8%AF%D9%87%DB%8C-%D8%A7%D9%88%D9%84%DB%8C%D9%87-initialize) SDK به کمک فایل **Chabok.sandbox.json** یا **Chabok.production.json** 
- از این به بعد قابلیت‌های آنی (real time) و پوش نوتیفیکیشن (pushNotification) به صورت پیش‌فرض در فایل قابل تنظیم **Chabok.sandbox.json** یا **Chabok.production.json** است.
- افزودن متدهای `login` برای ثبت کاربر
- افزودن متد `logout` برای تبدیل کاربر به مهمان
- افزودن متد `login(userId, userHash)` به منظور احراز هویت سرور به سرور

- تغییر از **GCM** به **FCM**

-افزودن `disableSdk` برای غیرفعال کردن **SDK چابک**

-افزودن متد `trackRevenue`

-افزودن `logLevel` پراپرتی برای لاگ  گرفتن در سطوح مختلف مانند (debug, warning, info, ...).

### ارتقا
-حذف متد `init`، به جای آن از متد `configureEnvironment` استفاده کنید.

-منسوخ شدن متد `setDevelopment`، به جای آن از متد `configureEnvironment`استفاده کنید.

-حذف متد `setEnableRealtime`و مقدار قابلیت آنی (realtime) در فایل **Chabok.production.json** یا **Chabok.sandbox.json** قابل تنظیم است.

-برای پیاده‌سازی باید متدهای `ChabokFirebaseMessaging.refreshToken(token)` و `ChabokFirebaseMessaging.onMessageReceived(remoteMessage, context)`را فراخوانی کنید.

-`FirebaseMessagingService` و اگر می‌خواهید چابک هندل کند PushNotification.

-حذف متدهای `register` و `unregister`، به جای این دو از متدهای `login` و `logout ` استفاده کنید.

-حذف `GCMReceiver` از `AndroidManifest.xml`.

-حذف متدهای `setUserInfo`و `getUserInfo`

-تغییر مقدار پیش‌فرض realtime به `false`

-تغییر کلاس  `isChabokPushNotification` به `ChabokFirebaseMessaging`


## [نسخه ۲.۱۸.۱ - ۱۳۹۸/۰۶/۲۶](https://github.com/chabok-io/chabok-client-android/releases/tag/v2.18.1)

### تغییرات

- بهبود تبدیل کاربر دائم (دارای حساب کاربری) به کاربر مهمان پس از خروج از حساب
- حل مشکل وضعیت صفحه نمایش ریکت نیتیو

## [نسخه ۲.۱۸.۰ - ۱۳۹۸/۰۶/۱۲](https://github.com/chabok-io/chabok-client-android/releases/tag/v2.18.0)

### تغییرات

- از این پس در نوتیفیکیشن‌های ساده (بدون تصویر) از متن بلند پشتیبانی می‌شود.
- از متد `isChabokPushNotification` می‌توانید برای تشخیص نوتیفیکیشن چابک استفاده کنید.
- با استفاده از کد زیر می‌توانید سرویس آنی (real-time) چابک را غیر فعال کنید:

``` xml
<application ... >
    <meta-data android:name="com.adpdigital.push.client.DISABLE_REALTIME" android:value="TRUE" />
<application />
```

### ارتقا
- از این پس چابک فقط وظیفه نمایش نوتیفیکیشن خود را دارد و نوتیفیکیشن‌های کتابخانه‌های دیگر را نمایش نمی‌دهد.

## [نسخه ۲.۱۷.۳ - ۱۳۹۸/۰۶/۰۹](https://github.com/chabok-io/chabok-client-android/releases/tag/v2.17.3)

### تغییرات

- بهبود Proguard rules در استفاده از reflection
- حل مشکل تغییر شبکه ریکت نیتیو (پیام خطا: `BroadcastReceiver components are not allowed to register to receive intents`)

## [نسخه ۲.۱۷.۲ - ۱۳۹۸/۰۵/۱۴](https://github.com/chabokpush/chabok-client-android/releases/tag/v2.17.2)

### تغییرات

- بهبود ثبت کاربر برای دستگاه‌هایی که از play services پشتیبانی نمی‌کنند. (پس از نمایش هشدار)
- افزودن متد `setEnableAlertForNotSupportingGcm` برای مدیریت نمایش هشدار مربوط به عدم پشتیبانی از play services
- بهبود دریافت آمار کلیک روی نوتیفیکیشن (اکشن‌ها و رد کردن) 
- بهبود نمایش پوش خودکار مکانی (Geo-fence)
- از این پس متد `registerAsGuest` [شناسه مهمان (`guestId`) می‌گیرد.](/android/sdk-setup.html#کاربر-مهمان-با-شناسه-سفارشی)
- از این پس **push service** چابک، از اجازه اجرا در `Background` **اندروید O** پیروی می کند.
- حالا حداقل طول `userId` **یک** کاراکتر است.
- افزودن متد `(init(context, mainActivityClass, APP_ID, API_KEY, USERNAME, PASSWORD, SENDER_ID` جدید با قابلیت اختیاری بودن `SENDER_ID`
- حل مشکل دریافت `advertisingId ` از دستگاه‌هایی که OEM buildهای مختلفی دارند
- حل مشکل کرش کردن دستگاه‌هایی که `androidId` ندارند

##  [نسخه ۲.۱۷.۱ - ۱۳۹۸/۰۴/۱۰](https://github.com/chabokpush/chabok-client-android/releases/tag/v2.17.1)

### تغییرات

- پشتیبانی متد `incrementUserAttribute` از آرایه‌‌ای از اطلاعات کاربر

- حل مشکل proguard در صورت `true` دادن `minifyEnabled`

##  [نسخه ۲.۱۷.۰ - ۱۳۹۸/۰۴/۰۲](https://github.com/chabokpush/chabok-client-android/releases/tag/v2.17.0)

### تغییرات

- پشتیبانی از مقدار [**درآمد**](/android/behavior-tracking.html#رصد-درآمد-tracking-revenue) با استفاده از متد `trackPurchase`

- پشتیبانی از **بازخورد نوتیفیکیشن (influence)** به صورت مستقیم یا غیر مستقیم

- پشتیبانی از [**دیپ لینک در صورت نداشتن اپلیکیشن** (deferred deep linking)](/android/deeplink.html#دیپ-لینک-قبل-از-نصب-اپلیکیشن-deferred-deep-linking) با متد `setOnDeeplinkResponseListener`

- افزودن متد `incrementUserAttribute` برای [افزایش مقدار داده‌های کمیتی کاربر](/android/custom-data.html#افزایش-دادههای-کمیتی-کاربر)

- افزودن متد `setDefaultNotificationChannel` برای **تغییر نام پیش‌فرض کانال نوتیفیکیشن** (برای اندروید ۸ به بالا)

- حل مشکل **نمایش Summary نوتیفیکیشن** در نوتیفیکیشن چند رسانه‌ای

- حل مشکل **بسته نشدن نوتیفیکیشن** پس از کلیک کاربر روی دکمه یک ری‌دایرکت

- معرفی `notifDelivery` برای اطلاع از **مشاهده شدن نوتیفیکیشن (impression)**

- افزایش تعداد کاراکترهای قابل قبول در `userId` به ۶۴ کاراکتر

- افزودن متد `publishBackground` برای انتشار رویداد در بک‌گراند 

- حل مشکل proguard در تداخل با کتابخانه‌های دیگر

- [افزودن متدهای `getUserAttributes` و `setUserAttributes`](/android/custom-data.html#مدیریت-اطلاعات-کاربر-user-attributes)

- با قرار دادن کد زیر در فایل `AndroidManifest.xml` فقط نوتیفیکیشن‌های چابک را نمایش دهید

```xml
<meta-data android:name="com.adpdigital.push.client.SHOW_ONLY_CHABOK_NOTIFICATIONS" android:value="ENABLE" />
```

### ارتقا

- جایگزین شدن متدهای `getUserInfo` و `setUserinfo` با متدهای `getUserAttributes` و `setUserAttributes`

- تغییر رفتار در متد `notificationOpened` در [دریافت دیتای نوتیفیکیشن](/android/push-notification.html#شخصیسازی-نمایش-و-کلیک-روی-اعلان) و باز کردن اپلیکیشن


##  [نسخه ۲.۱۶.۰ - ۱۳۹۸/۰۲/۱۸](https://github.com/chabokpush/chabok-client-android/releases/tag/v2.16.0)

### تغییرات

- پشتیبانی از **R8** (کوتاه کننده کد گوگل)

- پشتیبانی از [**دیپ لینک**](/android/deeplink.html) (deep link) و **ری‌دایرکت** (redirect) برای کلیک روی نوتیفیکیشن

- افزودن متد `appWillOpenUrl` برای **ارسال اطلاعات اتریبیوشن دیپ لینک**

- بهبود **رصد رویداد** برای پشتیبانی از کاربرانی که از **vpn** استفاده می‌کنند

- افزودن آمار و آنالیتیکس برای کلیک روی نوتیفیکیشن (اکشن‌ها و رد کردن (dismiss))

- افزودن رویداد `notificationOpened` برای دریافت اطلاعات کلیک روی نوتیفیکیشن (اکشن‌ها و رد کردن (dismiss))

- حل مشکل متد `registerAsGuest` 

- حل مشکل crash کردن `INSTALL_REFERRER` برای دستگاهایی که Google Play Services ندارند


##  [نسخه ۲.۱۵.۰ - ۱۳۹۸/۰۱/۲۱](https://github.com/chabokpush/chabok-client-android/releases/tag/v2.15.0)

### تغییرات

- تغییر رفتار در متد `registerAsGuest` (دیگر با هر بار فراخوانی کاربر جدید ایجاد نمی‌کند.)

- حالا چابک ‍‍`osBuild` و ‍‍`locale` کاربر را برای آنالیتیکس جمع‌آوری می‌کند

- افزودن متد `setDefaultTracker` برای [ترک کمپین‌های نصب (Pre-Install Campaigns)](/android/tracker.html#روش-آیدی-ترکر-pre-install-campaigns)

- حل مشکل ارسال اطلاعات کاربر در متد `setUserInfo`

- پشتیبانی از **advertisingId** گوگل

- پشتیبانی از `INSTALL_REFERRER` intent برای [ترک استورهای غیر از گوگلی پلی](/android/tracker.html#استورهای-غیر-از-گوگل-پلی-third-party-app-stores):

```java
<receiver
    android:name="com.adpdigital.push.ChabokReferrerReceiver"
    android:permission="android.permission.INSTALL_PACKAGES"
    android:exported="true">
       <intent-filter>
            <action android:name="com.android.vending.INSTALL_REFERRER" />
        </intent-filter>
</receiver>
```
<br>
### ارتقا

- پشتیبانی از `INSTALL_REFERRER` برای [گوگل پلی استور](/android/tracker.html#گوگل-پلی-استور):

```java
implementation 'com.android.installreferrer:installreferrer:1.0'
```

##  [نسخه ۲.۱۴.۲ - ۱۳۹۷/۱۲/۱۳](https://github.com/chabokpush/chabok-client-android/releases/tag/v2.14.2)

### تغییرات

- افزودن متد ‍‍‍‍‍`registerAsGuest` برای اپلیکیشن‌هایی که کاربر مهمان دارند یا می‌خواهند نصب با اولین بازدید شمرده شود (مانند سرویس ادجاست)


##  [نسخه ۲.۱۴.۱ - ۱۳۹۷/۱۰/۱۷](https://github.com/chabokpush/chabok-client-android/releases/tag/v2.14.1)

### تغییرات

- بهبود تایید نصب
- حل مشکل `Apache HTTP legacy` برای **API level 28** (**اندروید ۹**)
- افزودن قابلیت تشخیص **Build** اپلیکیشن (`Debug` یا `Release`)

##  [نسخه ۲.۱۴.۰ - ۱۳۹۷/۰۸/۲۱](https://github.com/chabokpush/chabok-client-android/releases/tag/v2.14.0)

### ارتقا

- انتقال داده‌های کاستوم به کلید `data` در متدهای `publishEvent` و `track`

##  [نسخه ۲.۱۳.۴ - ۱۳۹۷/۰۸/۲۰](https://github.com/chabokpush/chabok-client-android/releases/tag/v2.13.4)

### تغییرات

- حل مشکل پارس کردن `id` در متد `EventMessage`
- برگرداندن پورت محیط آزمایشی (Sandbox) به نسخه قدیمی آن

##  [نسخه ۲.۱۳.۳ - ۱۳۹۷/۰۸/۱۹](https://github.com/chabokpush/chabok-client-android/releases/tag/v2.13.3)

### تغییرات

- پشتیبانی از غیرفعالسازی نمایش **badge** برای اعلان ([مشاهده نحوه استفاده](/android/features.html#غیرفعالسازی-نمایش-نشان-badge-روی-آیکون) )
- تغییر رفتار در اعمال **badge** روی آیکون لانچر
- حل مشکل جابه‌جایی مقدار `id` با `id` چابک در دیتای متد `publishEvent`

##  [نسخه ۲.۱۳.۲ - ۱۳۹۷/۰۷/۰۸](https://github.com/chabokpush/chabok-client-android/releases/tag/v2.13.2)

### تغییرات

- افزودن متدهای `gpsVersionFound` و `gpsVersionRequired` برای دریافت **نسخه Play Services** کاربر
- حل مشکل نمایش خطای ‍‍‍‍`play services not found`
- حذف به کار بردن **bindService**

##  [نسخه ۲.۱۳.۱ - ۱۳۹۷/۰۶/۱۴](https://github.com/chabokpush/chabok-client-android/releases/tag/v2.13.1)

### تغییرات

- افزودن متد `setAutoResetBadge` برای پاک کردن خودکار **Badge** و نوتیفیکیشن‌ها

> ` نکته:` مقدار پیش‌فرض این متد `true` است، بنابراین اگر مقدار `false` را قرار دهید برای پاک کردن دستی **Badge** و نوتیفیکیشن [باید متد `resetBadge` را فراخوانی کنید.](https://doc.chabokpush.com/android/features.html#%D9%85%D8%AF%DB%8C%D8%B1%DB%8C%D8%AA-%D9%86%D8%B4%D8%A7%D9%86%D9%87%D8%A7)

##  [نسخه ۲.۱۳.۰ - ۱۳۹۷/۰۶/۱۳](https://github.com/chabokpush/chabok-client-android/releases/tag/v2.13.0)

### تغییرات

- افزودن متد `track` برای رصد تعامل کاربر
- پشتیبانی از **ledColor** و **smallIcon** در نوتیفیکیشن
- پشتیبانی پارامتر **sound**  در `payload` نوتیفیکیشن از پسوند فایل (نام فایل **sound** را می‌توانید در هر دو حالت با پسوند و بدون پسوند وارد کنید)
- پشتیبانی آرایه‌ای از تگ‌ها برای متد‌های `addTag` و `removeTag‍` در overload جدید
- بهبود **register مجدد کاربر** با تغییر `userId`  از متد `register`

### ارتقا
- تغییر پیش‌فرض متد `publishEvent` به `live`


##  [نسخه ۲.۱۲.۱ - ۱۳۹۷/۰۵/۳۰](https://github.com/chabokpush/chabok-client-android/releases/tag/v2.12.1)

### تغییرات

- حل مشکل نمایش نوتیفیکیشن در اندروید 8.1 برای `buildToolsVersion>=26`

##  [نسخه ۲.۱۲.۰ - ۱۳۹۷/۰۵/۲۹](https://github.com/chabokpush/chabok-client-android/releases/tag/v2.12.0)

### تغییرات

- از این پس `push service` چابک، از اجازه اجرا در `Background` **اندروید O** پیروی می کند.
- حل مشکل نمایش پوش نوتیفیکیشن در `targetSdkVersion >= 26`

### ارتقا
- چابک پوش‌نوتفیکیشن دریافتی از **FCM/GCM** را در حالت `foreground` نمایش می‌دهد.


##  [نسخه ۲.۱۱.۳ - ۱۳۹۷/۰۵/۱۶](https://github.com/chabokpush/chabok-client-android/releases/tag/v2.11.3)

### تغییرات

- حل مشکل پخش **صدای** نوتیفیکیشن. (فایل صدای نوتیفیکیشن باید حتما در مقصد `\raw\{FILENAME}.mp3` قرار بگیرد. دقت کنید که در `payload` نوتیفیکیشن از پسوند استفاده نکنید.)

## نسخه ۲.۱۱.۲ - ۱۳۹۷/۰۴/۳۰

### ارتقا

- افزودن قابلیت تشخیص وضوح تصویر
- قابلیت تشخیص غیرفعال کردن پوش نوتیفیکیشن توسط کاربر `DENIED`
- افزودن روش جدید برای قابلیت یکتا سازی دستگاه با کلید `uniqueId`

## نسخه ۲.۱۱.۱ - ۱۳۹۷/۰۳/۲۸

### تغییرات

- افزودن قابلیت تغییر رنگ دکمه‌های نوتیفیکیشن چندرسانه‌ای
- نمایش `body` در نوتیفیکیشن
- تشخیص زمان نصب اپلیکیشن
- تشخیص شناسه اپلیکیشن `bundleIdentifier` 
- تشخیص منبع نصب اپلیکیشن `installerSource`
- حل مشکل متد `unRegister` جهت پاک کردن کانال‌های کاربر حذف شده

## نسخه ۲.۱۱.۰ - ۱۳۹۷/۰۳/۲۲

### تغییرات

- پشتیبانی از نمایش تصویر در پوش نوتیفیکیشن
- امکان اضافه کردن `action` به پوش نوتیفیکیشن

## نسخه ۲.۱۰.۳ - ۱۳۹۷/۰۲/۰۵

### تغییرات

- حل مشکل متد `unRegister` با **USER_ID**، `NULL`

## نسخه ۲.۱۰.۲ - ۱۳۹۶/۱۱/۰۲

### تغییرات

- رفع مشکل ارسال نسخه چابک
- پشتیبانی از رویداد‌های نصب جدید و باز شدن برنامه
- پشتیبانی از عنوان و متن اعلان با استفاده از کلید نوتیفیکیشن (درون برنامه‌ای و GCM)

## نسخه ۲.۱۰.۱ - ۱۳۹۶/۱۰/۳۰

### تغییرات

- رفع مشکل سازگاری با اندروید استودیو نسخه ۳ به پایین

## نسخه ۲.۱۰.۰ - ۱۳۹۶/۱۰/۱۸

### تغییرات

* حذف متد `reRegister`.
* عدم اتصال مجدد پلتفرم چابک با روشن شدن صفحه گوشی.
* بهبود مدیریت اتصال
* افزودن متد `hasProtectedAppSupport`. با استفاده از این متد می‌توان بررسی نمود آیا گوشی استفاده شده برنامه را در لیست  protectedApp قرار می‌دهد یا خیر.
* افزودن متد `showProtectedAppSettings` برای نمایش پیغام مربوط به برنامه‌های محافظت شده

### ارتقا

* مقدار پیش‌فرض برای حالت `devMode` وجود نداشت که برابر `true` در نظر گرفته شد.
* به جای متد `reRegister` از متد `register` استفاده شود.


## نسخه ۲.۹.۱ - ۱۳۹۶/۰۹/۲۸


### تغییرات

* افزودن متد `addCallbackIntent` برای دسترسی به موقعیت مکانی در حالت `kill` و `background`

## نسخه ۲.۹.۰ - ۱۳۹۶/۰۹/۲۲

### تغییرات


* در پیام چابک مقدار پیش‌فرض برای نام کانال برابر default و مقدار پیش‌فرض برای user مقدار * می‌باشد.
* افرودن یک امضای جدید برای متد publish به صورت زیر:

```java
public void publish(final String user, final String channel, final String text, final com.adpdigital.push.Callback clbk)
```

* افزودن متد `unsubscribeEvent`

### ارتقا

* عضویت در کانال عمومی به صورت `CHANNEL_NAME` و در کانال خصوصی به صورت `private/CHANNEL_NAME` امکان پذیر است.
* متد `getSubscriptions` لیست کانال‌ها را بر اساس الگوی جدبد برمی‌گرداند.
* `حذف` امضای  زیر از متد publish، بنابراین اگر بخواهید پیام چابک دارای مقدار دیتا باشد باید دیتای خود را به شکل json برای آن ست کنید و از امضایی که پیام چابک می‌گیرد استفاده نمایید.

```java
public void publish(String channel, String text, JSONObject data, Callback clbk)
```

* تفییر نام متدهای `set/getTopicName` به `set/getChannel`
* تغییر نام متد `enableEventDelivery` به `subscribeEvent`
* پارامتر سوم در متد `publishEvent` از  `stateful` به `live` تغییر نمود


```java
public void publishEvent(final String event, final JSONObject data, final boolean live)
```
