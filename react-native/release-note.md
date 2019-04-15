---
id: release-note
title: لیست تغییرات 
layout: react-native
permalink: react-native/release-note.html
prev: troubleshoot.html
---

شما در این صفحه می‌توانید از تغییرات هر نسخه کتابخانه چابک مطلع شوید. چابک برای نسخه‌گذاری از مدل **Semantic Versioning** استفاده می‌کند. برای آشنایی با این مدل [این قسمت](/react-native/sdk-setup.html#مدل-نسخهگذاری-در-چابک-semantic-versioning) را مطالعه نمایید.

<Br>

## [نسخه ۱.۴.۰ - ۱۳۹۸/۰۱/۲۶](https://github.com/chabokpush/chabok-client-rn-js/releases/tag/1.4.0)

### تغییرات

- بهبود تایید نصب
- افزودن متد `registerAsGuest` برای اپلیکیشن‌هایی که کاربر مهمان دارند یا می‌خواهند نصب با اولین بازدید شمرده شود (مانند سرویس ادجاست)
- افزودن کلید `uniqueId` برای تشخیص تمام دستگاه‌ها
- حالا چابک `appBundleId`, `sdkType`, `installDate`, `newIns` و `locale` هر کاربر را برای آنالیتیکس جمع‌آوری می‌کنند
- تشخیص `newInstall` و `launch`
- حل مشکل متد `getUserId` در بازدید اول
- حالا چابک **نسخه 0.44.0 ریکت نیتیو** را پشتیبانی می‌کند

## [نسخه ۱.۳.۰ - ۱۳۹۷/۰۶/۱۷](https://github.com/chabokpush/chabok-client-rn-js/releases/tag/1.3.0)

### تغییرات
- به روز رسانی به نسخه ۱.۰.۱ SDK جاوا‌ اسکریپت چابک
- افزودن متدهای `setUserInfo` و `getUserInfo` 
- افزودن متدهای `addTag` و `addTags`
- افزودن متدهای `removeTag` و `removeTags`
- تغییر اکثر متدها به شکل **promise** 
- بهبود متد `setPushNotificationToken` در دستگاه‌های آی‌او‌اس 
- حل مشکل متد `isRegistered` در دادن پاسخ درست
- به روز رسانی اطلاعات نصب کاربر روی متدهای `subscribe` و `unSubscribe`
- افزودن `clientVersion` به اطلاعات هر کاربر
- افزودن `appBundleId` به اطلاعات هر کاربر

### ارتقا

- تغییر مقدار پیش‌فرض `live` برای متد `publishEvent` به `true`.

> `نکته: ` اگر در نسخه‌های پایین‌تر از پیش‌فرض `default` متد `publishEvent` استفاده می‌کردید برای حفظ تنظیمات قبلی‌، بهتر است اکنون از پیش‌فرض با مقدار `false` برای `live` استفاده کنید.

- غیرفعال سازی `register` خودکار توسط چابک در هنگام بارگذاری صفحه.

> `نکته: ` فرایند **register** مجدد کاربر در هنگام بارگذاری صفحه باید توسط شما و با به کارگیری از متد `isRegistered` انجام شود.

نمونه:

```javascript
if (chabok.isRegistered()) {
    chabok.register(chabok.getUserId())
} else {
    chabok.register('<userId>')
}
```

## نسخه ۱.۲.۰
### ارتقا
* در صورت استفاده از متد `enableEventDelivery`  آن را با متد `subscribeEvent` جایگزین نمایید.

### تغییرات
* رفع مشکل عضویت بر روی کانال‌های عمومی توسط متد `subscribe`
* بهبود عملکرد ارسال پیام به وسیله متد `publish`
* حذف متد `enableEventDelivery`



## نسخه ۱.۱.۲
### ارتقا
* افزودن امکان عضویت بر روی یک رویداد با استفاده از متد `subscribeEvent`
* افزودن امکان لغو عضویت از روی یک رویداد با استفاده از متد `unSubscribeEvent`



## نسخه ۱.۱.۱
### تغییرات
* بهبود عملکرد داخلی متد `subscribe`


## نسخه ۱.۱.۰
### ارتقا
*  افزودن متد جدید برای عضویت روی یک کانال  (`subscribe`)
* افزودن متد جدید برای لغو عضویت از یک کانال (`unSubscribe`)


## نسخه ۱.۰.۰

* حل مشکل نوع اتصال بر روی پلتفرم **اندروید** و **ios**
