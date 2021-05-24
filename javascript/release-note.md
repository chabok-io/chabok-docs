---
id: release-note
title: لیست تغییرات کتابخانه
layout: javascript
permalink: javascript/release-note.html
prev: troubleshoot.html
---

شما در این صفحه می‌توانید از تغییرات هر نسخه کتابخانه چابک مطلع شوید. چابک برای نسخه‌گذاری از مدل **Semantic Versioning** استفاده می‌کند. برای آشنایی با این مدل [این قسمت](/javascript/sdk-setup.html#مدل-نسخهگذاری-در-چابک-semantic-versioning) را مطالعه نمایید.

<Br>

## [نسخه ۲.۰.۱ - ۱۴۰۰/۰۳/۰۳](https://github.com/chabok-io/chabok-client-js/releases/tag/v2.1.0)

### تغییرات

- بهبود علمکرد تشخیص اتریبیوشن در پلتفرم وب و TWA
      
## [نسخه ۲.۰.۱ - ۱۳۹۸/۱۱/۲۰](https://github.com/chabok-io/chabok-client-js/releases/tag/v2.0.1)

### تغییرات

- بهبود ثبت ورود کاربر


## [نسخه ۲.۰.۰ - ۱۳۹۸/۱۱/۰۷](https://github.com/chabok-io/chabok-client-js/releases/tag/v2.0.0)

### تغییرات

- افزودن متد `trackRevenue`
- افزودن متد `login` برای ثبت کاربر
- افزودن متد `logout` برای تبدیل کاربر به مهمان
- افزودن متد `login(userId, userHash)` به منظور احراز هویت سرور به سرور
- پشتیبانی از افزودن به مقادیر آرایه‌ای که برای داده‌های سفارشی کاربر استفاده کرده‌اید با فراخوانی متد `addToUserAttributeArray(attributeKey, attributeValue)`.
- پشتیبانی از حذف مقادیر آرایه‌ای که برای داده‌های سفارشی کاربر استفاده کرده‌اید با فراخوانی متد `removeFromUserAttributeArray(attributeKey, attributeValue)`.
- پشتیبانی از حذف داده‌های سفارشی کاربر با فراخوانی متد `unsetUserAttribute(attributeKey)`.
- پشتیبانی از تاریخ و ساعت برای مقادیری که در رویدادها و داده‌های سفارشی کاربر ارسال می‌کنید با استفاده از کلاس `Date` که در کتابخانه جاوااسکریپت موجود هست.

### ارتقا 

- حذف متدهای `registerAsGuest`، `register` و `unregister`، به جای این دو از متدهای `login` و `logout` استفاده کنید.
- حذف متدهای `setUserInfo` و `getUserInfo`
- تغییر مقدار پیش‌فرض **realtime** به `false` 

> در صورتی که می‌خواهید نسخه خود را ارتقا دهید، حتما [مستندات مهاجرت](/javascript/upgrade-chabok-to-2-0-0.html) به نسخه ۲ چابک را مطالعه کنید. 

<Br>

## [نسخه ۱.۶.۰ - ۱۳۹۸/۰۹/۱۸](https://github.com/chabok-io/chabok-client-js/releases/tag/v1.6.0)

### تغییرات

- رفع خطای مربوط به فراخوانی متد `getUniqueId`

- پشتیبانی از راه‌اندازی آسنکرون کتابخانه

-  پشتیبانی از Server Side Rendering

## [نسخه ۱.۵.۰ - ۱۳۹۸/۰۶/۰۹](https://github.com/chabok-io/chabok-client-js/releases/tag/v1.5.0)

### تغییرات

- بهبود تایید نصب

- بهبود دریافت توکن پوش‌نوتیفیکیشن

-  حالا حداقل طول  `userId`  **یک**  کاراکتر است.

-   بهبود رفتار متد  `track` و `trackPurchase`  (زمانی که پارامتر  **realtime**  در تنظیمات  **false**  است.)

## [نسخه ۱.۴.۰ - ۱۳۹۸/۰۴/۱۸](https://github.com/chabok-io/chabok-client-js/releases/tag/v1.4.0)

### تغییرات

- پشتیبانی از مقدار [درآمد](/javascript/behavior-tracking.html#رصد-درآمد-tracking-revenue) با استفاده از متد `trackPurchase`

- [افزودن متدهای `getUserAttributes` و `setUserAttributes`](/javascript/custom-data.html#مدیریت-اطلاعات-کاربر-user-attributes)

- افزودن متد `incrementUserAttribute` برای [افزایش مقدار داده‌های کمیتی کاربر](/javascript/custom-data.html#افزایش-دادههای-کمیتی-کاربر)

- پشتیبانی از نوتیفیکیشن‌های چند رسانه‌ای یا Rich (دکمه، تصویر، جهت چینش محتوا و ویبره دستگاه‌های اندرویدی)

- افزودن آمار و آنالیتیکس برای کلیک روی نوتیفیکیشن (اکشن‌ها و رد کردن (dismiss))

- افزودن رویداد `notificationOpened` برای دریافت اطلاعات کلیک روی نوتیفیکیشن (اکشن‌ها و رد کردن (dismiss))
- پشتیبانی از **بازخورد نوتیفیکیشن (influence)** به صورت مستقیم یا غیر مستقیم

- معرفی `notifDelivery` برای اطلاع از مشاهده شدن نوتیفیکیشن (impression)

- افزودن آمار تاریخ نصب و add to home screen (برای PWA)

- امکان [تعیین شناسه کاربر مهمان (guestUserId)](/javascript/sdk-setup.html#کاربر-مهمان) به متد `registerAsGuest`

- بهبود نمایش نوتیفیکیشن در برخی از دستگاه‌های اندروید

- بهبود مدیریت اتصال

- بهبود بروزرسانی توکن پوش نوتیفیکیشن

- بهبود رفتار متدهای `subscribe`

- بروزرسانی فایل `ChabokSDKWorker.js`

### ارتقا 

- جایگزین شدن متدهای `getUserInfo` و `setUserinfo` با متدهای `getUserAttributes` و `setUserAttributes`


- انتقال داده‌های سفارشی به data key در متدهای `publishEvent` و `track`


## [نسخه ۱.۳.۰ - ۱۳۹۸/۰۳/۱۳](https://github.com/chabok-io/chabok-client-js/releases/tag/v1.3.0)

### تغییرات

* جلوگیری از `subscribe` مجدد در صورت عضو بودن کاربر روی کانال

* بهبود رفتار متدهای `subscribe` و `unsubscribe`

* تشخیص افزودن وبسایت به home screen توسط کاربر

* افزودن تنظیمات `serviceWorker` برای [استفاده از چند `serviceWorker`‌ به صورت همزمان](/javascript/sdk-setup.html#استفاده-همزمان-از-چند-service-worker):

```javascript
const options = {
      webpush: {
        enabled: true,
        publicKey: 'xxxxxxxxx'
      },
      silent: false,
      serviceWorker : {
        path : '/MY_SERVICE_WORKER.js',
        scope: '/'
      }
    };
```

## [نسخه ۱.۲.۳ - ۱۳۹۸/۰۱/۲۱](https://github.com/chabok-io/chabok-client-js/releases/tag/v1.2.3)

### تغییرات

* بهبود مدیریت توکن

* بهبود مدیریت خطاها

## [نسخه ۱.۲.۲ - ۱۳۹۷/۱۲/۱۵](https://github.com/chabok-io/chabok-client-js/releases/tag/v1.2.2)

### تغییرات

* از این پس `userId` می‌تواند **۳ کاراکتر یا بیشتر** باشد

## [نسخه ۱.۲.۱ - ۱۳۹۷/۱۱/۲۳](https://github.com/chabok-io/chabok-client-js/releases/tag/v1.2.1)

### تغییرات

* افزودن متد `registerAsGuest` برای ثبت کاربر مهمان


## [نسخه ۱.۲.۰ - ۱۳۹۷/۱۱/۱۵](https://github.com/chabok-io/chabok-client-js/releases/tag/v1.2.0)

### تغییرات

* تغییر پیش‌فرض کلیک روی نوتیفیکیشن به روت سایت (`/`)

* بهبود مدیریت ثبت توکن

* افزودن کلید `tokenStatus`

* حل مشکل متدهای `subscribe` ،`unsubscribe` و `publish` زمانی که کاربر ثبت نشده بود. 


## [نسخه ۱.۱.۰ - ۱۳۹۷/۱۰/۰۵](https://github.com/chabok-io/chabok-client-js/releases/tag/v1.1.0)

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

> `نکته ` : برای استفاده از شناسه `webKey` حتما باید **دامنه** وبسایت خود را در پنل بخش تنظیمات قسمت **دسترسی‌ و توکن‌ها** ثبت کرده‌ باشید. در صورتی هم که می‌خواهید روی سیستم محلی تست کنید کافیست فقط `localhost` (بدون پورت) را در بخش دامنه قرار دهید. 

## [نسخه ۱.۰.۳ - ۱۳۹۷/۰۷/۲۸](https://github.com/chabok-io/chabok-client-js/releases/tag/v1.0.3)

### تغییرات 

* ثبت **service worker** چابک فقط در روت پروژه به جای ثبت به صورت نسبی

## [نسخه ۱.۰.۲ - ۱۳۹۷/۰۷/۲۳](https://github.com/chabok-io/chabok-client-js/releases/tag/v1.0.2)

### تغییرات 

* افزودن متد‌ `getTags` 
* افزودن قابلیت گروه‌بندی نوتیفیکشن‌ها با استفاده از کلید `groupId`

## نسخه [۱.۰.۱ - ۱۳۹۷/۰۶/۱۳](https://github.com/chabok-io/chabok-client-js/releases/tag/v1.0.1)

### تغییرات 

* افزودن متد‌های `setUserInfo` و `getUserInfo`  
* افزودن متدهای `addTag` و `addTags`
* افزودن متدهای `removeTag` و `removeTags`
* حل مشکل حذف کاربر با متد `unregister`

### ارتقا

* قابلیت **register مجدد کاربر** با متد `register` 

## [نسخه ۱.۰.۰ - ۱۳۹۷/۰۶/۰۳](https://github.com/chabok-io/chabok-client-js/releases/tag/v1.0.0)

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

## [نسخه ۰.۴.۵](https://github.com/chabok-io/chabok-client-js/releases/tag/v0.4.5)

* بهبود عملکرد تنظیم آیکون **Notification**

## [نسخه ۰.۴.۴](https://github.com/chabok-io/chabok-client-js/releases/tag/v0.4.4)

* افزودن قابلیت تنظیم title و آیکون **Notification**

## [نسخه ۰.۴.۳](https://github.com/chabok-io/chabok-client-js/releases/tag/v0.4.3)

* رفع مشکل ارسال پیام توسط متد `publishEvent`

## [نسخه ۰.۴.۲](https://github.com/chabok-io/chabok-client-js/releases/tag/v0.4.2)

* رفع مشکل عضویت بر روی کانال‌های عمومی توسط متد `subscribe`
* بهبود عملکرد ارسال پیام به وسیله متد `publish`

## [نسخه ۰.۴.۱](https://github.com/chabok-io/chabok-client-js/releases/tag/v0.4.1)

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
