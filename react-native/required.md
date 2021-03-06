---
id: required
title: پیش‌نیازها
layout: react-native
permalink: react-native/required.html
prev: introducing.html
next: sdk-setup.html
---

در ابتدا اطمینان یابید که صفحه [معرفی](/react-native/introducing.html) را برای آشنایی کامل با امکانات چابک با دقت مطالعه کرده باشید. برای بکارگیری چابک، شما نیاز به [ایجاد حساب کاربری](/react-native/required.html#ایجاد-حساب-چابک)، [دریافت کلیدهای گوگل](/react-native/required.html#دریافت-کلیدهای-گوگل) برای اندروید و [ایجاد گواهی اپل](/react-native/required.html#ایجاد-گواهی-اپل) برای آی‌اواس دارید.

<Br>

> `نکته `: دقت داشته باشید که در ریکت، چابک به طور پیش‌فرض **توکن پوش** نمی‌گیرد، بنابراین برای استفاده از **پوش‌نوتیفیکیشن** باید تنظیمات آن را در صفحه پوش‌نوتیفیکیشن برای [اندروید](/react-native/push-notification.html#تنظیم-پوشنوتیفیکیشن-اندروید) و [آی‌اواس](/react-native/push-notification.html#تنظیم-پوشنوتیفیکیشن-آیاواس) مطالعه نمایید و روی پروژه خود پیاده‌سازی کنید.


### ایجاد حساب چابک

به طور کلی چابک دارای دو نوع حساب **آزمایشی (Sandbox)** و **عملیاتی (Production)** است. حساب‌ آزمایشی روی محیط سندباکس قرار گرفته است و دارای محدودیت [سقف کاربر](https://chabok.io/pricing.html) می‌باشد. بنابراین برای اپلیکیشن‌های تجاری و اپ‌استور توصیه می‌کنیم از حساب عملیاتی که این سقف را ندارد، استفاده کنید.

برای ایجاد حساب کاربری کافیست در وبسایت چابک وارد صفحه [شروع کنید](https://chabok.io/register.html) شوید و حساب شخصی خود را بسازید. پس از ایجاد حساب، با مراجعه به [بخش تنظیمات پنل](https://doc.chabok.io/panel/settings.html#%D8%AF%D8%B3%D8%AA%D8%B1%D8%B3%DB%8C%D9%87%D8%A7-%D9%88-%D8%AA%D9%88%DA%A9%D9%86%D9%87%D8%A7) پارامترهای اتصال به چابک که در بخش **راه‌اندازی** چابک مورد نیاز است، در دسترس خواهد بود. 

> `نکته:` در صورتی که تمایل دارید حساب خود را از **آزمایشی** به **عملیاتی** ارتقا دهید، باید با توجه به جدا بودن داده‌های هر حساب، از اپ خود با **تنظیمات جدید** چابک بیلد بگیرید و نسخه جدید منتشر کنید. برای درخواست حساب عملیاتی به پنل بخش [تنظیمات](https://sandbox.push.adpdigital.com/front/setting/accountRequest) مراجعه نمایید.


### دریافت ‌کلیدهای گوگل

چابک به طور پیش‌فرض وقتی که برنامه بسته باشد، با استفاده از سرویس GCM/FCM پوش‌نوتیفیکیشن را به برنامه شما ارسال می‌کند. برای این منظور شما نیاز به **Sender ID** و **Legacy server key** به عنوان پارامترهای اتصال به چابک دارید که باید از طریق سایت [فایربیس](https://console.firebase.google.com) نسبت به ایجاد آن اقدام نمایید. مراحل ایجاد حساب و دریافت اطلاعات در این [صفحه](/android/required.html#دریافت-کلیدهای-گوگل) توضیح داده شده است.

برای گوشی‌هایی که به سرویس گوگل پلی مجهز نمی‌باشند امکان استفاده از سرویس GCM/FCM وجود ندارد و در این حالت چابک به صورت مستقل حتی در حالتی که برنامه بسته باشد، پوش را دریافت می‌نماید.

<Br>

### ایجاد گواهی اپل

برای ارسال پوش‌نوتیفیکیشن به اپلیکیشن‌های iOS شما نیاز به **ایجاد گواهی (certificate)** در APNs دارید. برای ایجاد آن می‌توانید به [این صفحه](/ios/required.html#ایجاد-گواهی-اپل) مراجعه نمایید.
