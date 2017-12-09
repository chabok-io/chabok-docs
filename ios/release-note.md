---
id: release-note
title: لیست تغییرات کتابخانه
layout: ios
permalink: ios/release-note.html
prev: features.html
---

### ارتقا به نسخه ۱.۱۴.۰ 

* * عضویت در کانال عمومی به صورت `CHANNEL_NAME` و در کانال خصوصی به صورت `private/CHANNEL_NAME` امکان پذیر است.
* 
* تغییر نام متد `enableEventDelivery:forPublic:` به `subscribeEvent:` 
* تغییر نام متد `enableEventDelivery:` به `subscribeEvent:installationId:` 
* تغییر نام متد `getRegistrationId` به `getInstallationId`
* اجباری کردن property `messageBody` در کلاس `PushClientMessage`
 
### تغییرات

- افزودن متد جدید برای عضویت روی یک رویداد (`unsubscribeEvent:` و `unsubscribeEvent:installationId:`)
- افزودن متد جدید برای ارسال پیام به صورت خصوصی (`publish:toChannel:withText:`)
- افزودن delegate method جدید برای مدیریت خطاها در متدهای **subscribe**، **unsubscribe** و **publish** (`pushClientManagerDidSubscribed:` و `pushClientManagerDidSubscribed:` و `pushClientManagerDidFailInSubscribe:` و `pushClientManagerDidFailInUnsubscribe:` و `pushClientManagerDidFailInPublish:`)
- شخصی سازی داده ارسال موقعیت مکانی با استفاده از closure `customizeGeoData`