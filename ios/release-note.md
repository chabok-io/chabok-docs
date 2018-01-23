
---
id: release-note
title: لیست تغییرات کتابخانه
layout: ios
permalink: ios/release-note.html
prev: features.html
---

## نسخه ۱.۱۵.۱ 

### تغییرات

 - استفاده از کلیدهای *title* و *body* به منظور نمایش عنوان و متن در `Notification`
 - تشخیص نصب جدید و باز شدن برنامه (دسترسی به این رویدادها به کمک کلیدهای `kPushClientDetectAppNewInstall` و `kPushClientDetectAppWasLaunched`)
 - حل مشکل متد `deviceSubscriptions` به هنگام فراخوانی قبل از متد `registerUser:` 
 - اعلان خطا به هنگام فراخوانی متد `updateNotificationSettings:sound:alert:` قبل از رجیستر شدن کاربر

## نسخه ۱.۱۵.۰
### ارتقا

* از متد `registerUser:` بجای متد `registerAgainWithUserId:`، جهت تغییر `userId` استفاده کنید. برای تغییر نام کاربری، چابک به صورت خودکار `userId` قدیمی را به صورت کامل پاک کرده و `userId` جدید را در سرور ثبت می‌کند.
* تغییر پیش فرض متد `SetDevelopment` به مقدار `YES`،‌ به این معنی که محیط کلاینت چابک بصورت پیش‌فرض حالت تست (sandbox) می‌باشد.

### تغییرات

* تغییر پیش فرض متد `SetDevelopment` به مقدار `YES`.
* حل مشکل نمایش هشدار background
* حذف متد `registerAgainWithUserId:`.

## نسخه ۱.۱۴.۱
### تغییرات

* `publish` موقعیت مکانی به صورت `live`

## نسخه ۱.۱۴.۰
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
