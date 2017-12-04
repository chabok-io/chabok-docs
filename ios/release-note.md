---
id: release-note
title: لیست تغییرات کتابخانه
layout: ios
permalink: ios/release-note.html
prev: features.html
---

### نسخه ۱.۱۴.۰ 

#### ارتقا به نسخه جدید

* تغییر در قرارداد جهت عضویت بر روی یک کانال
  * عضویت در کانال عمومی به دو روش،‌ `public/CHANNEL_NAME` و یا `CHANNEL_NAME` .امکان پذیر است
  * عضویت در کانال خصوصی به صورت `private/CHANNEL_NAME` امکان پذیر است.
* تغییر signature متد `enableEventDelivery` به `subscribeEvent` (عضویت بر روی رویداد **عمومی**)
* تغییر signature متد `enableEventDelivery:forPublic:` به `subscribeEvent:installationId:` (عضویت بر روی رویداد **خصوصی**)
* تغییر signature متد `getRegistrationId` به `getInstallationId`

#### تغییرات

- افزودن متد جدید برای عضویت روی یک رویداد (`unsubscribeEvent:` و `unsubscribeEvent:installationId:`)
- افزودن متد جدید برای ارسال پیام به صورت خصوصی (`publish:toChannel:withText`)
 - افزودن delegate method جدید برای مدیریت خطاها در متدهای **subscribe**، **unsubscribe** و **publish** (`pushClientManagerDidSubscribed:` و `pushClientManagerDidSubscribed:` و `pushClientManagerDidFailInSubscribe:` و `pushClientManagerDidFailInUnsubscribe:` و `pushClientManagerDidFailInPublish:`)
 - اجباری کردن property `messageBody` در کلاس `PushClientMessage`
 - بهبود در دریافت موقعیت مکانی دقیق
 - شخصی سازی داده ارسال موقعیت مکانی با استفاده از closure `customizeGeoData`