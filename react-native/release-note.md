---
id: release-note
title: لیست تغییرات کتابخانه
layout: react-native
permalink: react-native/release-note.html
next: introducing.html
---

## نسخه ۱.۲.۰
### تغییرات
* رفع مشکل عضویت بر روی کانال‌های عمومی توسط متد `subscribe`
* بهبود عملکرد ارسال پیام به وسیله متد `publish`
* حذف متد `enableEventDelivery`

> در صورت استفاده از متد `enableEventDelivery` باید آن را با متد `subscribeEvent` جایگزین نمایید.



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
