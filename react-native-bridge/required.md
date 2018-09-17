---
id: required
title: پیش‌نیازها
layout: react-native-bridge
permalink: react-native-bridge/required.html
prev: introducing.html
next: installation.html
---

### ایجاد حساب چابک
اگر شما هنوز [حساب چابک](http://chabokpush.com) خود را ایجاد نکرده‌اید ابتدا آن را ایجاد نمایید.بعد از [نصب چابک](installation.html) با مراجعه به بخش تنظیمات پنل، پارامترهای اتصال به چابک  که در بخش [راه‌اندازی چابک](setup.html) مورد نیاز است، در دسترس خواهد بود. 


>`نکته:`  تمامی مراحلی که در این راهنما بیان شده، در یک پروژه [Demo](https://github.com/chabokpush/chabok-rn-chat) پیاده‌سازی شده است.

### تنظیم پوش‌نوتیفیکیشن اندروید

#### دریافت ‌SENDERID از گوگل
چابک وقتی که برنامه بسته باشد، با استفاده از سرویس GCM/FCM اعلان‌ها را به برنامه شما ارسال می‌کند، برای این منظور شما نیاز به SENDERID به عنوان یکی از پارامترهای اتصال به چابک دارید که باید از طریق سایت [فایربیس](https://firebase.google.com) نسبت به ایجاد آن اقدام نمایید. مراحل ایجاد حساب و دریافت اطلاعات در این [پست](https://doc.chabokpush.com/android/firebase.html) توضیح داده شده است.

برای گوشی‌هایی که به سرویس گوگل پلی مجهز نمی‌باشند امکان استفاده از سرویس GCM/FCM وجود ندارد و در این حالت چابک به صورت مستقل حتی در حالتی که برنامه بسته باشد، پوش را دریافت می‌نماید.

### تنظیم پوش‌نوتیفیکیشن آی‌او‌اس

#### ایجاد گواهی اپل

برای ارسال پوش به برنامه ی iOS لازم هست که اجازه نامه (certificate) ارسال پوش را برای برنامه‌تان ایجاد کنید. روش این کار در این [پست](https://dev.doc.chabokpush.com/ios/certificate.html) توضیح داده شده است.

همینطور اطمینان یابید که `MobileCoreServices.framework` ،`SystemConfiguration.framework` و `CoreData` را از Linked Library وارد کرده‌اید.

لطفا `Push Notifications` را در `Setting > Capabilities` فعال کنید .

و علامت `Remote Notifications` ها را در `Setting > Capabilities > Background Modes` چک کنید.

