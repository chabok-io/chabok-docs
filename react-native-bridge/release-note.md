---
id: release-note
title: لیست تغییرات کتابخانه
layout: react-native-bridge
permalink: react-native-bridge/release-note.html
next: introducing.html
---

شما در این صفحه می‌توانید از تغییرات هر نسخه کتابخانه چابک مطلع شوید. چابک برای نسخه‌گذاری از مدل **Semantic Versioning** استفاده می‌کند. برای آشنایی با این مدل [این قسمت](/react-native-bridge/sdk-setup.html#مدل-نسخهگذاری-در-چابک-semantic-versioning) را مطالعه نمایید.

<Br>

## [نسخه ۱.۱.۱ - ۱۳۹۷/۰۸/۲۳](https://github.com/chabokpush/chabok-client-rn/releases/tag/v1.1.1)

### تغییرات
- افزودن شنونده `onSubscribe` و `onUnsubscribe` برای دریافت وضعیت عضویت 

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
