---
id: required
title: پیش‌نیازها
layout: cordova
permalink: cordova/required.html
next: sdk-setup.html
---

در ابتدا اطمینان یابید که صفحه [معرفی](/cordova/introducing.html) را برای آشنایی کامل با امکانات چابک با دقت مطالعه کرده باشید. برای بکارگیری چابک، شما نیاز به [دریافت کلیدهای گوگل](/cordova/required.html#دریافت-کلیدهای-گوگل-برای-پوشنوتیفیکیشن-اندروید) برای **اندروید** و [ایجاد گواهی اپل](/cordova/required.html#ایجاد-گواهی-اپل-برای-پوشنوتیفیکیشن-آی‌اواس) برای **آی‌اواس** دارید.

<Br>

### تفاوت حساب‌های آزمایشی و عملیاتی (سندباکس و پروداکشن)

چابک برای هر مشتری **دو نوع حساب جداگانه** ایجاد می‌کند. اولی، حساب سندباکس نام دارد که در واقع یک محیط **آزمایشی** و کاملا جداگانه‌ای است تا شما بتوانید روی آن **تست‌ها و پیاده‌سازی‌های** خود را بدون نگرانی انجام دهید. این حساب همیشه با پیشوند sandbox در لینکش  شروع می‌شود.

دومی، حساب پروداکشن نام دارد که در واقع محیط عملیاتی برای شروع کار به صورت رسمی و حرفه‌ای **زمان انتشار اپلیکیشن** است. 

>`نکته:` حتما دقت داشته باشید که حساب‌های سندباکس و پروداکشن کاملا جدا هستند و **داده‌های هر کدام قابل انتقال به دیگری نیستند.** برای همین توصیه می‌کنیم برای انتشار اپلیکیشن از حساب عملیاتی استفاده کنید و حساب سندباکس را فقط با نگاه تستی ببینید.

### دریافت ‌کلیدهای گوگل

چابک به طور پیش‌فرض وقتی که برنامه بسته باشد، با استفاده از سرویس GCM/FCM پوش‌نوتیفیکیشن را به برنامه شما ارسال می‌کند. برای این منظور شما نیاز به **Sender ID** و **Server Key** به عنوان پارامترهای اتصال به چابک دارید که باید از طریق سایت [فایربیس](https://console.firebase.google.com) نسبت به ایجاد آن اقدام نمایید. مراحل ایجاد حساب و دریافت اطلاعات در این [صفحه](/android/required.html#دریافت-کلیدهای-گوگل) توضیح داده شده است.

برای گوشی‌هایی که به سرویس گوگل پلی مجهز نمی‌باشند امکان استفاده از سرویس GCM/FCM وجود ندارد و در این حالت چابک به صورت مستقل حتی در حالتی که برنامه بسته باشد، پوش را دریافت می‌نماید.


### ایجاد گواهی اپل

برای ارسال پوش‌نوتیفیکیشن به اپلیکیشن‌های iOS شما نیاز به **ایجاد گواهی (certificate)** در APNs دارید. برای ایجاد آن می‌توانید به [این صفحه](/ios/required.html#ایجاد-گواهی-اپل) مراجعه نمایید.
