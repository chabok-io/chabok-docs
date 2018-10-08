---
id: required
title: پیش‌نیازها
layout: ios
permalink: ios/required.html
prev: introducing.html
next: installation.html

---

### ایجاد حساب چابک

اگر شما هنوز [حساب چابک](http://chabokpush.com) خود را ایجاد نکرده‌اید ابتدا آن را ایجاد نمایید. با مراجعه به بخش تنظیمات پنل، پارامترهای اتصال به چابک که در بخش [راه‌اندازی چابک](setup.html) مورد نیاز است، در دسترس خواهد بود.

> `نکته :` کتابخانه چابک در حال حاضر برای ios 7  به بالا در دسترس می‌باشد و قابلیت پشتیبانی ios 11 را نیز دارد.

### ایجاد گواهی اپل

برای ارسال پوش به برنامه ی iOS لازم هست که اجازه نامه (certificate) ارسال پوش را برای برنامه تان ایجاد کنید. روش این کار در این [پست](certificate.html)  توضیح داده شده است.

###  تنظیمات

ابتدا اطمینان حاصل کنید که `MobileCoreServices.framework`، `SystemConfiguration.framework` و `CoreData` را از Linked Frameworks and Libraries وارد کرده اید.

لطفا `Push Notifications` را در `Setting > Capabilities` فعال کنید .

و علامت `Remote Notifications` ها را در `Setting > Capabilities > Background Modes` چک کنید.
