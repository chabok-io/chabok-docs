---
id: release-note
title: لیست تغییرات کتابخانه
layout: android
permalink: android/release-note.html
prev: troubleshoot.html
---

شما در این صفحه می‌توانید از تغییرات هر نسخه کتابخانه چابک مطلع شوید. چابک برای نسخه‌گذاری از مدل **Semantic Versioning** استفاده می‌کند. برای آشنایی با این مدل [این قسمت](/android/sdk-setup.html#مدل-نسخهگذاری-در-چابک-semantic-versioning) را مطالعه نمایید.

<Br>

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
* عدم اتصال مجدد سرویس چابک با روشن شدن صفحه گوشی.
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


