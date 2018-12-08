---
id: push-notification
title: پوش‌نوتیفیکیشن
layout: javascript
permalink: javascript/push-notification.html
prev: chabok-messaging.html
next: user-management.html
---

<a href="/javascript/introducing.html#پلنهای-قیمت-گذاری-چابک"> <span style="background-color: #E0FFFF; height: 30px; color: #000000; display: inline-block; padding: 0px 10px 0px 10px; font-weight: bold; font-size:12px; border-radius: 5px;">پلن استارتاپی</span>
<a href="/javascript/introducing.html#پلنهای-قیمت-گذاری-چابک"> <span style="background-color: #E5F0FF; height: 30px; color: #000000; display: inline-block; padding: 0px 10px 0px 10px; font-weight: bold; font-size:12px; border-radius: 5px;">پلن شرکتی</span>
<a href="/javascript/introducing.html#پلنهای-قیمت-گذاری-چابک"> <span style="background-color: #D6E8FF; height: 30px; color: #000000; display: inline-block; padding: 0px 10px 0px 10px; font-weight: bold; font-size:12px; border-radius: 5px;">پلن سازمانی</span>
<a>

چابک علاوه بر پیام چابک، **پوش‌نوتیفیکیشن** هم ارسال می‌کند. توجه داشته باشید که از این پس منظور از واژه **اعلان** همان **نوتیفیکیشن** (Notification) است.

<Br>
 
ارسال پوش‌نوتیفیکیشن به دو صورت انجام می‌شود:


#### ۱- Local Notification

اگر مقدار ‍`silent` را در تنظیمات اولیه `false‍` قرار دهید، در صورتی که اتصال کاربر با چابک **برقرار باشد** پیام‌های چابک در قالب **Local Notification** به کاربر نمایش داده می‌شود.

<Br>

> ‍‍‍‍‍‍‍‍`نکته:`  برای دریافت پوش‌نوتیفیکیشن در پس‌زمینه (Background) می‌بایست بخش [راه‌اندازی](/javascript/sdk-setup.html#افزودن-service-worker) را مطالعه نمایید.

#### ۲- Background Notification

برای ارسال پوش‌نوتیفیکیشن در شرایطی که ارتباط کاربر با چابک **برقرار نشده باشد**، می‌بایست در تنظیمات اولیه در بخش ‍`webpush` مقدار `enabled` را `true` قرار دهید و `publicKey` را از بخش تنظیمات ارسال پوش‌نوتیفیکیشن وب در قسمت تنظیمات پنل چابک مقدار‌دهی کنید.
از این پس بعد از اولین اتصال به چابک، به صورت پیش‌فرض اجازه دسترسی دریافت پوش‌نوتیفیکیشن را از کاربر درخواست می‌کند. بعد از تایید، شما می‌توانید به راحتی به کاربر پوش‌نوتیفیکیشن ارسال کنید.

> `نکته` : اگر مرورگر شما بسته شده باشد، دریافت پوش‌نوتیفیکیشن امکان‌پذیر نیست.

> `نکته` : اگر مرورگر شما از **Service Worker** پشتیبانی نکند، دریافت پوش‌نوتیفیکیشن در حالت Background امکان‌پذیر نیست.
