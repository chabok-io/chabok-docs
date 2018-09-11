---
id: troubleshoot
title: عیب یابی اندروید
layout: android
permalink: android/troubleshoot.html
prev: features.html
---

## اعلان‌ها

در این بخش به مشکلات متداول مربوط به اعلان‌ها (Notifications) می‌پردازیم.

### اعلان‌ها نمایش داده نمی‌شوند:

یکی از مشکلات متداول اعلان‌ها عدم نمایش آن‌ها در دستگاه مخاطب است. در این قسمت به دلایل احتمالی این مشکل اشاره‌ خواهیم کرد.


#### ۱- اپلکیشن روی صفحه نمایش باز است
در حالت پیش‌فرض، اعلان‌ها در زمانی که اپلیکیشن روی دستگاه شما **باز** و **نمایان** است نشان داده نمی‌شوند.

#### ۲-  اپلیکیشن در حالت Force Stop است

در حالتی که اپلیکیشن شما در حالت **Force Stop** از سوی کاربر گذاشته شده باشد، اکثر رویداد‌ها از جمله دریافت پیام‌های GCM/FCM رخ نخواهد داد. به طور کلی یک اپلیکیشن در حالت‌های زیر می‌تواند **Force Stop** شود: 
- انتخاب گزینه **Force Stop** در صفحه Settings > Apps
- نگه‌ داشتن دکمه بازگشت روی بعضی گوشی‌ها 
- استفاده از یک برنامه برای بستن اپلیکیشن‌ها (App Killers)
- swipe اپلیکیشن حین دیباگ از دور (Remote Debugging)
- swipe اپلیکیشن از لیست Recent Apps در دستگاه‌های شیائومی
- به صورت خودکار از سوی بعضی برندهای گوشی برای بهینه سازی مصرف باتری. برای غیرفعال کردن آن قدم‌های زیر انجام دهید:

**سامسونگ:** غیرفعال کردن [battery usage optimization](https://android.gadgethacks.com/how-to/fix-delayed-notifications-your-galaxy-s8-s8-0177437/) 

**هواوی:** قدم اول: به settings > advanced settings > battery manager بروید و اپ را انتخاب کنید.

 قدم دوم: به settings > apps > advanced > ignore battery optimizations بروید و اپ را انتخاب کنید.

 قدم سوم: به settings > notification panel & status bar > notification center بروید و پس از انتخاب اپ، "allow notifications" و "priority display" را فعال کنید.

برای EMUI 5.0 / Android 7 پایین‌تر به Settings > Protected apps بروید و اپ خود را چک کنید. [راهنمای کامل](http://phandroid.com/2017/02/02/huawei-honor-emui-first-thing/)

**سونی:** آیکون باتری را بزنید و به Power Management > STAMINA mode > Apps active in standby بروید و اپ خود را اضافه کنید.

**ایسوس**: اپ خود را در Auto-start Manager چک کنید.

**وان‌پلاس**: به Settings > Battery > Battery Optimization > Application بروید و Don't Optimize را بزنید.

**اوپو**: به Settings > Security settings > Data saving بروید و اپ خود را فعال کنید.

**شیائومی**: به Security (App) > Permissions > Autostart بروید و اپ خود را فعال کنید.

**ردمی**: به Settings > Developer Options بروید و "memory optimization" را غیرفعال کنید. [راهنمای کامل](https://www.forbes.com/sites/bensin/2016/11/17/how-to-fix-push-notifications-on-xiaomis-miui-8-for-real/#384f6af97572)

#### ۳- گزینه دریافت پوش برای اپلیکیشن غیر‌فعال شده است
 تنظیمات نوتیفیکیشن در صفحه Settings > Apps را چک کنید. در صورت خاموش بودن گزینه نوتیفیکیشن، آن را فعال نمایید.


#### ۴- مشکل اتصال به اینترنت دارید
شبکه اینترنتی که به آن وصل هستید ممکن است اتصال شما به سرورهای گوگل یا اپل را بسته باشد. در این حالت می‌توانید قطع و وصل کردن اینترنت خود را امتحان کنید.
