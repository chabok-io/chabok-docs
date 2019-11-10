---
id: troubleshoot
title: عیب یابی اندروید
layout: android
permalink: android/troubleshoot.html
prev: features.html
next: release-note.html
---
> `نکته`  عیب‌یابی مشکلات متداول زیر بر اساس نسخه‌های ۳ به بالا کتابخانه چابک نوشته شده است. در صورتی که از نسخه پایین‌تری استفاده می‌کنید به<a href="https://dev.doc.chabokpush.com/android/troubleshoot-old.html" title="این یک لینک است"> این صفحه </a> مراجعه کنید.


در این صفحه به عیب‌یابی مشکلات متداول توسعه‌دهندگان در پیاده‌سازی چابک و ارائه راه‌‌حل‌های مربوط به آن می‌پردازیم. برخی از این مشکلات عبارتند از [کرش کردن اپلیکیشن](/android/troubleshoot.html#اپلیکیشنم-کرش-میکند)، [عدم دریافت پوش‌نوتیفیکیشن](/android/troubleshoot.html#پوش-نمیگیرم)، [نمایش نوتیفیکیشن](/android/troubleshoot.html#اعلانها-نمایش-داده-نمیشوند) و [نمایش تصویر نوتیفیکیشن](#تصویر-نوتیفیکیشن-نمایش-داده-نمیشود) است.

<Br>

## اپلیکیشنم کرش می‌کند.
---

#### چابک را حتما intialize کنید.
 اگر چابک را intialize نکنید ممکن است با خطاهای زیر مواجه شوید:
 
۱. در صورتی که با ارور **AdpPushClient not initialized, Make sure to call AdpPushClient.configureEnvironment(Environment) in onCreate() method of your Application class** مواجه شدید، اطمینان یابید چابک را intialize کرده باشید. معمولا این ارور به دلیل صدا نزدن متد `configureEnvironment` اتفاق می‌افتد و برای رفع مشکل، تنها باید [متد](/android/sdk-setup.html#۲--مقداردهی-اولیه-initialize) را بسته به محیط صدا بزنید.

<br>
۲. اگر با یکی از ارورهای **AdpPushClient not initialized, Make sure to configure correct environment** و یا **AdpPushClient not initialized, Make sure to put the json files in root of your project** مواجه شدید، یعنی فایل **Chabok.sandbox.json** یا **Chabok.production.json** در جای مناسبی قرار نگرفتند و یا اگر در جای درستی هستند، محتویات آنان کامل نیستند.
برای اطلاعات بیشتر می‌توانید مستندات [راه‌اندازی](/android/sdk-setup.html#۲--مقداردهی-اولیه-initialize) را مطالعه کنید.

#### نسخه‌ سرویس‌های گوگل پلی را بررسی کنید

در صورتی با ارورهای **;java.lang.NoClassDefFoundError: Failed resolution of: Lcom/google/android/gms/iid/InstanceID** و یا **Caused by: java.lang.ClassNotFoundException: Didn’t find class com.google.android.gms.iid.InstanceID** مواجه شدید، دقت کنید که نسخه‌ سرویس‌های گوگل پلی شما با هم، همخوانی و تطابق داشته باشند.

<Br><Br>

## یک پوش را چند بار می‌گیرم
---

#### از قطعه کد زیر استفاده کنید

در صورتی که از سرویس‌های دیگر پوش استفاده کنید (3rd parties)، حتما از کد زیر استفاده کنید. 
این کد باعث می‌شود تا فقط پوش‌نوتیفیکشن‌های چابک نمایش داده شوند؛ برای این کار کد زیر در فایل `AndroidManifest.xml` قرار دهید:

```xml
<meta-data android:name="com.adpdigital.push.client.SHOW_ONLY_CHABOK_NOTIFICATIONS" android:value="ENABLE" />
```
<Br>

#### از AutoNotify فایربیس استفاده نکنید
در صورتی که از Auto Notify سرویس فایربیس استفاده می‌کنید (در این مدل نمایش نوتیفیکیشن را سیستم‌عامل برعهده دارد)، در زمان‌هایی که اپلیکیشن در بک‌گراند یا بسته است، کد رسیور چابک و شما فراخوانی نخواهد شد در نتیجه نوتیفیکیشن ۲بار نمایش داده خواهد شد.


<Br>


