---
id: pem-certificate
title: روش PEM  
layout: ios
permalink: ios/pem-certificate.html
---

برای ایجاد گواهی ارسال نوتیفیکیشن سرور اپل از روش PEM مراحل زیر را طی نمایید:

#### مرحله اول : ایجاد شناسه اپلیکیشن

هر اپلیکیشن iOS که از پوش‌نوتیفیکیشن استفاده می‌کند باید یک App ID منحصر به خودش داشته باشد که بطور یکتا آن اپلیکیشن را مشخص کند. مراحل زیر روش ایجاد یک App ID را توضیح می‌دهد. اگر قبلا برای اپلیکیشنتان در اینجا App ID ایجاد کرده‌اید، از این مرحله بگذرید.

۱- در قسمت [پورتال برنامه نویسان اپل](https://idmsa.apple.com/IDMSWebAuth/login?appIdKey=891bd3417a7776362562d2197f89480a8547b108fd934911bcbea0110d07f757&path=%2Faccount%2F&rv=1)   لاگین کنید.

۲- روی منوی Certificates, Identifiers & Profiles کلیک کنید.

![عکس مربوطه](http://uupload.ir/files/kbty_01-selecting-the-module.jpg)

۳- برای اضافه کردن یک App ID جدید روی منوی App IDs کلیک کنید و بعد دکمه ی + را بزنید.

![عکس مربوطه](http://uupload.ir/files/loyg_02-create-appid.png)

۴- یک نام برای اپلیکیشن در قسمت ۱ و یک نام پکیج یا bundleID در قسمت ۲ مطابق شکل زیر وارد کنید. توجه کنید که باید حتما از Explicit App ID استفاده نمایید. سپس دکمه  Continue را بزنید.

![عکس مربوطه](http://uupload.ir/files/ygkr_03-inputing-bundleid.png)

۵- در این مرحله اطلاعات App ID ای که در حال ساختش هستید را به شما نشان می‌دهد. دکمه Register را بزنید تا این مرحله تمام شود.

#### مرحله ی دوم : ایجاد درخواست گواهی اپل 

شما باید یک فایل درخواست سرتیفیکت ایجاد کنید تا بعدا از آن برای درخواست سرتیفیکیت SSL برای مرحله ی کدنویسی و تست اپلیکیشنتان استفاده کنید.

۱- برنامه Keychain Access را در macOS خود باز کنید.

![عکس مربوطه](http://uupload.ir/files/eod_04-keychainaccess.png)

۲- مسیر زیر را در برنامه انتخاب کنید.

Keychain Access -> Certificate Assistant -> Request a Certificate From a Certificate Authority

![عکس مربوطه](http://uupload.ir/files/ioy9_05-request-sert.png)

۴- اطلاعات لازم را وارد کنید و گزینه ی Save to disk را تیک بزنید و بعد دکمه ی Continue را بزنید.

![عکس مربوطه](http://uupload.ir/files/73ud_06-savesertdesktop.png)

۵- درخواست سرتیفیکیت را با همان نامی که برایش پیشنهاد شده، ذخیره کنید. در صفحه ی بعد دکمه ی Done را بزنید.

![عکس مربوطه](http://uupload.ir/files/73ud_06-savesertdesktop.png)

#### مرحله ی سوم : تنظیم یک شناسه اپلیکیشن، برای استفاده از پوش نوتیفیکیشن

بعد از اینکه App ID را ایجاد کردید، باید تنظیمات دریافت پوش نوتیفیکیشن آن را فعال کنید.

۱- برای تنظیم دریافت پوش نوتیفیکیشن یک App ID ، باید آن اپ را در لیست App IDs انتخاب کنید. بعد در قسمت Application Services دکمه ی Edit مربوط به آن App ID را بزنید.

![عکس مربوطه](http://uupload.ir/files/rcb_08-app-settings.png)

۲- با این کار صفحه ی تنظیمات نشان داده می شود. صفحه را اسکرول کنید تا قسمت Push Notifications را ببینید. چک باکس آن را تیک بزنید (شماره ۱ در عکس زیر) و دکمه Create Certificate را کلیک کنید.

![عکس مربوطه](http://uupload.ir/files/74e7_09-pushnotificationsettings.png)

۳- یک ویزارد نمایش داده می شود. دکمه  Continue را بزنید.

![عکس مربوطه](http://uupload.ir/files/i1mu_10-csr.png)

۴- دکمه ی Choose File را بزنید و فایل درخواست سرتیفیکیت که در مرحله دوم ایجاد کردید را انتخاب کنید. دکمه Generate را بزنید.

![عکس مربوطه](http://uupload.ir/files/axjs_11-generation-certificate.png)

۵- سرتیفیکیت SSL شما ایجاد خواهد شد. حالا می توانید دکمه ی Download را بزنید و آن را دانلود کنید.

![عکس مربوطه](http://uupload.ir/files/786h_12-certificate-is-ready.png)

سرتیفیکیت ایجاد شده را از لیست Application Services هم می توانید دانلود کنید.

![عکس مربوطه](http://uupload.ir/files/qwrm_13-downloadcert.png)

مراحل ایجاد Production Certificate هم به همین صورت هست.

#### مرحله ی چهارم : آماده کردن گواهی‌های اپل 

۱- اسم سرتیفیکیت SSL ای که در انتهای مرحله قبل دانلود کرده‌اید، aps_development.cer است. روی آن کلیک کنید تا در برنامه  Keychain Access نصب شود. این سرتیفیکیت SSL باید توسط پلتفرم چابک استفاده شود تا بتواند به `APNS` برای ارسال پو‌ش‌نوتیفیکیشن به اپلیکیشن شما متصل شود. (APNS: Apple Push Notification Service)

۲- برنامه  Keychain Access را روی Mac خود باز کنید. به قسمت login بروید و براساس دسته بندی Certificates محتوایش را فیلتر کنید. در اینجا گزینه‌ای به نام Apple Development iOS Push Services می بینید که با یک کلید خصوصی جفت شده است.

![عکس مربوطه](https://raw.githubusercontent.com/chabokpush/chabok-assets/master/chabok-docs/ios/certificates.png)

۳- روی این سرتیفیکیت پوش نوتیفیکشن جدیدتان کلیک راست کنید و  گزینه Export "Apple Development iOS Push Services را انتخاب کنید، در صفحه باز شده **File Format** را **cer** انتخاب کرده و فایل حاصل را با نام `Certificates.cer` در جایی که در دسترس‌تان باشد ذخیره کنید.

۴- روی این سرتیفیکیت پوش‌نوتیفیکشن جدیدتان کلیک راست کنید و گزینه Export "Apple Development iOS Push Services را انتخاب کنید،‌ در صفحه باز شده **File Format** را **p12** انتخاب کرده و  فایل حاصل را با نام `Certificates.p12` در جایی که در دسترس‌تان باشد، ذخیره کنید.

برای اکسپورت کردن می توانید پسورد هم وارد کنید اما در این صورت لازم است که همراه با ارسال فایل سرتیفیکیت به چابک، پسورد آن را هم ارسال کنید.

![عکس مربوطه](http://uupload.ir/files/sxee_15-enter-the-password-for-exporting.png)

برای نهایی شدن فرایند اکسپورت کردن سرتیفیکیت، پسورد ادمین سیستم خود را بزنید.

![عکس مربوطه](http://uupload.ir/files/1pkl_16-file-enter-your-usual-admin-password.png)


پس از ایجاد فایل های cer. و p12. دستور زیر را در terminal اجرا کنید:

```bash
openssl x509 -in Certificates.cer -inform der -out pushCert.pem
openssl pkcs12 -nocerts -out pushKey.pem -in Certificates.p12 -nodes
```
فایل‌های ساخته شده را در پنل در بخش تنظیمات > تنظیمات پیشرفته آپلود کنید.

![پنل چابک](http://uupload.ir/files/9kkg_ios-pem-settings.png)

فایل `pushCert.pem` را در قسمت گواهی و فایل `pushKey.pem` را در قسمت کلید اضافه کنید.

![پنل چابک](http://uupload.ir/files/l94t_certificateh.png)
