---
id: release-note
title: لیست تغییرات کتابخانه
layout: android
permalink: android/release-note.html
next: introducing.html
---

## نسخه ۲.۱۱.۱

### تغییرات

- افزودن قابلیت تغییر رنگ دکمه‌های نوتیفیکیشن چندرسانه‌ای
- نمایش `body` در نوتیفیکیشن
- تشخیص زمان نصب اپلیکیشن
- تشخیص شناسه اپلیکیشن `bundleIdentifier` 
- تشخیص منبع نصب اپلیکیشن `installerSource`
- حل مشکل متد `unRegister` جهت پاک کردن کانال‌های کاربر حذف شده

## نسخه ۲.۱۱.۰

### تغییرات

- پشتیبانی از نمایش تصویر در پوش نوتیفیکیشن
- امکان اضافه کردن `action` به پوش نوتیفیکیشن

## نسخه ۲.۱۰.۳

### تغییرات

- حل مشکل متد `unRegister` با **USER_ID**، `NULL`

## نسخه ۲.۱۰.۲

### تغییرات

- رفع مشکل ارسال نسخه چابک
- پشتیبانی از رویداد‌های نصب جدید و باز شدن برنامه
- پشتیبانی از عنوان و متن اعلان با استفاده از کلید نوتیفیکیشن (درون برنامه‌ای و GCM)

## نسخه ۲.۱۰.۱

### تغییرات

- رفع مشکل سازگاری با اندروید استودیو نسخه ۳ به پایین

## نسخه ۲.۱۰.۰

### ارتقا

* مقدار پیش‌فرض برای حالت `devMode` وجود نداشت که برابر `true` در نظر گرفته شد.
* به جای متد `reRegister` از متد `register` استفاده شود.

### تغییرات

* حذف متد `reRegister`.
* عدم اتصال مجدد سرویس چابک با روشن شدن صفحه گوشی.
* بهبود مدیریت اتصال
* افزودن متد `hasProtectedAppSupport`. با استفاده از این متد می‌توان بررسی نمود آیا گوشی استفاده شده برنامه را در لیست  protectedApp قرار می‌دهد یا خیر.
* افزودن متد `showProtectedAppSettings` برای نمایش پیغام مربوط به برنامه‌های محافظت شده


## نسخه ۲.۹.۱

### تغییرات

* افزودن متد `addCallbackIntent` برای دسترسی به موقعیت مکانی در حالت `kill` و `background`

## نسخه ۲.۹.۰

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

### تغییرات


* در پیام چابک مقدار پیش‌فرض برای نام کانال برابر default و مقدار پیش‌فرض برای user مقدار * می‌باشد.
* افرودن یک امضای جدید برای متد publish به صورت زیر:

```java
public void publish(final String user, final String channel, final String text, final com.adpdigital.push.Callback clbk)
```

* افزودن متد `unsubscribeEvent`

