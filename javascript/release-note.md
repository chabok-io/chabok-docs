---
id: release-note
title: لیست تغییرات کتابخانه
layout: javascript
permalink: javascript/release-note.html
prev: troubleshoot.html
---

شما در این صفحه می‌توانید از تغییرات هر نسخه کتابخانه چابک مطلع شوید. چابک برای نسخه‌گذاری از مدل **Semantic Versioning** استفاده می‌کند. برای آشنایی با این مدل [این قسمت](/javascript/sdk-setup.html#مدل-نسخهگذاری-در-چابک-semantic-versioning) را مطالعه نمایید.

<Br>

## [نسخه ۱.۲.۰ - ۱۳۹۷/۱۱/۱۵](https://github.com/chabokpush/chabok-client-js/releases/tag/v1.2.0)

### تغییرات

* تغییر پیش‌فرض کلیک روی نوتیفیکیشن به روت سایت (`/`)

* بهبود مدیریت ثبت توکن

* افزودن کلید `tokenStatus`

* حل مشکل متدهای `subscribe` ،`unsubscribe` و `publish` زمانی که کاربر ثبت نشده بود. 


## [نسخه ۱.۱.۰ - ۱۳۹۷/۱۰/۰۵](https://github.com/chabokpush/chabok-client-js/releases/tag/v1.1.0)

### ارتقا 

* استفاده از شناسه `webKey` به جای  شناسه‌های `apiKey`, `username`, `password` در **احراز هویت** (authentication)

روش **قدیم** احراز هویت: 

```javascript
const auth = {
  appId: 'APP_ID',
  apiKey: 'API_KEY',
  username: 'USERNAME',
  password: 'PASSWORD',
  devMode: true
}
```

روش **جدید** احراز هویت:

```javascript
const auth = {
  appId: 'APP_ID',
  webKey: 'WEB_KEY',
  devMode: true
}
```


> ‍‍‍‍‍`نکته:` برای استفاده از شناسه `webKey` باید در تنظیمات پنل > [بخش دسترسی‌ها و توکن‌ها](https://sandbox.push.adpdigital.com/front/setting/access)، **دامنه** وبسایت خود را ثبت کنید و سپس در همان صفحه شناسه `webKey` را کپی کنید.

## [نسخه ۱.۰.۳ - ۱۳۹۷/۰۷/۲۸](https://github.com/chabokpush/chabok-client-js/releases/tag/v1.0.3)

### تغییرات 

* ثبت **service worker** چابک فقط در روت پروژه به جای ثبت به صورت نسبی

## [نسخه ۱.۰.۲ - ۱۳۹۷/۰۷/۲۳](https://github.com/chabokpush/chabok-client-js/releases/tag/v1.0.2)

### تغییرات 

* افزودن متد‌ `getTags` 
* افزودن قابلیت گروه‌بندی نوتیفیکشن‌ها با استفاده از کلید `groupId`

## نسخه [۱.۰.۱ - ۱۳۹۷/۰۶/۱۳](https://github.com/chabokpush/chabok-client-js/releases/tag/v1.0.1)

### تغییرات 

* افزودن متد‌های `setUserInfo` و `getUserInfo`  
* افزودن متدهای `addTag` و `addTags`
* افزودن متدهای `removeTag` و `removeTags`
* حل مشکل حذف کاربر با متد `unregister`

### ارتقا

* قابلیت **register مجدد کاربر** با متد `register` 

## [نسخه ۱.۰.۰ - ۱۳۹۷/۰۶/۰۳](https://github.com/chabokpush/chabok-client-js/releases/tag/v1.0.0)

### تغییرات 

* افزودن متد `track` برای رصد تعامل کاربر.
* حل مشکل مقدار بازگشتی در متد `isRegistered`.
* حل مشکل عدم **resolve** شدن پرامیس در متد `register`.
* عدم نمایش پیام‌های **silent** درون برنامه‌ای چابک.

### ارتقا

* تغییر مقدار پیش‌فرض `live` برای متد `publishEvent` به `true`.
 > نکته : اگر در نسخه‌های پایین‌تر از پیش‌فرض `default` متد `publishEvent` استفاده می‌کردید برای حفظ تنظیمات قبلی‌، بهتر است اکنون از پیش‌فرض با مقدار `false` برای `live` استفاده کنید.
* غیرفعال سازی `register` خودکار توسط چابک در هنگام بارگذاری صفحه.
 > نکته: فرایند **register** مجدد کاربر در هنگام بارگذاری صفحه باید توسط شما و با به کارگیری از متد `isRegistered` انجام شود.

 نمونه:
```javascript
if (chabok.isRegistered()) {
    chabok.register(chabok.getUserId())
} else {
    chabok.register('<userId>')
}
```

## [نسخه ۰.۴.۵](https://github.com/chabokpush/chabok-client-js/releases/tag/v0.4.5)

* بهبود عملکرد تنظیم آیکون **Notification**

## [نسخه ۰.۴.۴](https://github.com/chabokpush/chabok-client-js/releases/tag/v0.4.4)

* افزودن قابلیت تنظیم title و آیکون **Notification**

## [نسخه ۰.۴.۳](https://github.com/chabokpush/chabok-client-js/releases/tag/v0.4.3)

* رفع مشکل ارسال پیام توسط متد `publishEvent`

## [نسخه ۰.۴.۲](https://github.com/chabokpush/chabok-client-js/releases/tag/v0.4.2)

* رفع مشکل عضویت بر روی کانال‌های عمومی توسط متد `subscribe`
* بهبود عملکرد ارسال پیام به وسیله متد `publish`

## [نسخه ۰.۴.۱](https://github.com/chabokpush/chabok-client-js/releases/tag/v0.4.1)

* حذف متد `enableEventDelivery`
> در صورت استفاده از متد `enableEventDelivery` باید آن را با متد `subscribeEvent` جایگزین نمایید.

## نسخه ۰.۴.۰

* افزودن قابلیت عضویت و لغو عضویت از یک **کانال** با استفاده از متد‌های `subscribe` و `unSubscribe`

* افزودن قابلیت عضویت و لغو عصویت از یک **رویداد** با استفاده از متدهای `subscribeEvent` و `unSubscribeEvent`

## نسخه ۰.۳.۴

* بهبود پایداری اتصال با چابک

* افزودن تنظیمات جهت غیرفعال سازی اتصال بلادرنگ چابک

## نسخه ۰.۳.۳

* حل مشکل اتصال به چابک در مرورگرهایی که **Service worker** را پشتیبانی نمی‌کنند.

## نسخه ۰.۳.۲

* افزودن قابلیت عدم نمایش **Notification**

## نسخه ۰.۳.۱

* ساختار جدید برای ایجاد و استفاده از چابک

## نسخه ۰.۳.۰

* حل مشکل اتصال به چابک در زمان باز بودن چندین صفحه

## نسخه ۰.۲.۰

* افزودن **Service Worker** چابک برای دریافت پیام‌ها در پس‌زمینه

* نمایش **Push Notification** در مرورگر

## نسخه ۰.۱.۶

* افزودن قابلیت ارسال و دریافت پیام‌های چابک
