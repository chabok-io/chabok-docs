---
id: notification
title: مدیریت اعلان‌ها
layout: javascript
permalink: javascript/notification.html
prev: publishingMessages.html
next: verification.html
---

 سرویس چابک دارای `Messageing` و `Push Notification`  می‌باشد،‌ به همین جهت برای دریافت اعلام در پس‌زمینه می‌بایست فایل `ChabokSDKWorker.js` را در پروژه خود قرار دهید.
 
####  افزودن Service Worker
 برای ارسال پوش نوتیفیکشن در پس‌زمینه باید فایل `ChabokSDKWorker.js` را از این [لینک](https://raw.githubusercontent.com/chabokpush/chabok-client-js/master/dist/ChabokSDKWorker.js) دریافت نموده و در root پروژه قرار دهید.
 
 اگر از **Github Desktop** استفاده می کنید برای دریافت از این [لینک](x-github-client://openRepo/https://github.com/chabokpush/chabok-client-js?branch=master&filepath=dist%2FChabokSDKWorker.js) استفاده کنید.

اگر از **Webpack** استفاده می‌کنید می توانید از پلاگین [CopyWebpackPlugin](https://github.com/webpack-contrib/copy-webpack-plugin)‍ برای انتقال service worker به پوشه dist استفاده کنید.

```javascript
 new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '/node_modules/chabokpush/dist/ChabokSDKWorker.js'),
        to: path.resolve(__dirname, '/dist'),
        ignore: ['.*']
      }
    ])
```


#### ۱. LocalNotification
اگر مقدار ‍`silent` را در تنظیمات اولیه `False‍` قرار دهید، در صورتی که اتصال کاربر با چابک برقرار باشد پیام‌های چابک در قالب LocalNotification به کاربر نمایش داده می‌شود.

#### ۲. Background Notification
برای ارسال Notification در شرایطی که ارتباط کاربر با چابک برقرار نشده باشد می‌بایست در تنظیمات اولیه در بخش ‍`webpush` مقدار `enabled` را `True` قرار دهید و `publicKey` را از بخش تنظیمات ارسال نوتیفیکیشن وب در قسمت تنظیمات پنل چابک مقدار‌دهی کنید.
از این پس بعد از اولین اتصال با چابک به صورت پیش‌فرض اجازه دسترسی دریافت نوتیفیکیشن را از کاربر درخواست می کند. بعد از تایید، شما می توانید به راحتی به کاربر Notification ارسال کنید.

> `نکته` : اگر مرورگر شما `بسته` شده باشد، دریافت Notification امکان پذیر نیست

> `نکته` : اگر مرورگر شما از `Service Worker` پشتیبانی نکند، دریافت Notification در حالت Background امکان پذیر نیست 

