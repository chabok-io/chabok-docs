---
id: certificate
title: پیش‌نیازها
layout: ios
permalink: ios/certificate.html

---


### مرحله اول : ایجاد App ID

هر برنامه ی iOS که از پوش نوتیفیکیشن استفاده می کند باید یک App ID منحصر به خودش داشته باشد که بطور یکتا آن برنامه را مشخص کند. مراحل زیر روش ایجاد یک App ID را توضیح می دهد. اگر قبلا برای برنامه تان در اینجا App ID ایجاد کرده اید، از این مرحله گذر کنید.

۱- در قسمت [پورتال برنامه نویسان اپل](https://idmsa.apple.com/IDMSWebAuth/login?appIdKey=891bd3417a7776362562d2197f89480a8547b108fd934911bcbea0110d07f757&path=%2Faccount%2F&rv=1)   لاگین کنید. 

۲- روی منوی Certificates, Identifiers & Profiles کلیک کنید.

![عکس مربوطه](http://uupload.ir/files/zvei_selecting_the_module.png.jpg)

۳- برای اضافه کردن یک App ID جدید روی منوی App IDs کلیک کنید و بعد دکمه ی + را بزنید.

![عکس مربوطه](http://bayanbox.ir/view/1490261004272402286/Create-AppID.png.jpg)

۴- یک نام برای اپلیکیشن در قسمت ۱ و یک نام پکیج یا bundleID در قسمت ۲ مطابق شکل زیر وارد کنید. توجه کنید که باید حتما از Explicit App ID استفاده کنید. سپس دکمه ی Continue را بزنید.

![عکس مربوطه](http://bayanbox.ir/view/6851324387876995449/Inputing-BundleID.jpg)

۵- در این مرحله اطلاعات App ID ای که در حال ساختش هستید را به شما نشان می دهد. دکمه ی Register را بزنید تا این مرحله تمام شود.

### مرحله ی دوم : ایجاد درخواست سرتیفیکیت (Certificate)
شما باید یک فایل درخواست سرتیفیکت ایجاد کنید تا بعدا از آن برای درخواست سرتیفیکیت SSL برای مرحله ی کدنویسی و تست برنامه تان استفاده کنید.

۱- برنامه ی Keychain Access را در macOS خود باز کنید.

![عکس مربوطه](http://bayanbox.ir/view/1779708111711163821/Keychainaccess.png)

۲- مسیر زیر را در برنامه انتخاب کنید.

Keychain Access -> Certificate Assistant -> Request a Certificate From a Certificate Authority

![عکس مربوطه](http://bayanbox.ir/view/7339941578567240303/Request-sert.png)

۴- اطلاعات لازم را وارد کنید و گزینه ی Save to disk را تیک بزنید و بعد دکمه ی Continue را بزنید.

![عکس مربوطه](http://bayanbox.ir/view/3130890332012957922/Savesertdesktope.png)

۵- درخواست سرتیفیکیت را با همان نامی که برایش پیشنهاد شده، ذخیره کنید. در صفحه ی بعد دکمه ی Done را بزنید.

![عکس مربوطه](http://bayanbox.ir/view/3130890332012957922/Savesertdesktope.png)

### مرحله ی سوم : تنظیم یک App ID برای استفاده از پوش نوتیفیکیشن

بعد از اینکه App ID را ایجاد کردید، باید تنظیمات دریافت پوش نوتیفیکیشن آن را فعال کنید.

۱- برای تنظیم دریافت پوش نوتیفیکیشن یک App ID ، باید آن اپ را در لیست App IDs انتخاب کنید. بعد در قسمت Application Services دکمه ی Edit مربوط به آن App ID را بزنید.

![عکس مربوطه](http://bayanbox.ir/view/5680371853899590674/App-settings.png)

۲- با این کار صفحه ی تنظیمات نشان داده می شود. صفحه را اسکرول کنید تا قسمت Push Notifications را ببینید. چک باکس آن را تیک بزنید (شماره ۱ در عکس زیر) و دکمه Create Certificate را کلیک کنید.

![عکس مربوطه](http://bayanbox.ir/view/5128664118357539891/PushNotificationSettings.png)

۳- یک ویزارد نمایش داده می شود. دکمه  Continue را بزنید.

![عکس مربوطه](http://bayanbox.ir/view/8878575710405019872/CSR.png)

۴- دکمه ی Choose File را بزنید و فایل درخواست سرتیفیکیت که در مرحله دوم ایجاد کردید را انتخاب کنید. دکمه Generate را بزنید.

![عکس مربوطه](http://bayanbox.ir/view/7047098200909611658/Generation-certificate.png)

۵- سرتیفیکیت SSL شما ایجاد خواهد شد. حالا می توانید دکمه ی Download را بزنید و آن را دانلود کنید.

![عکس مربوطه](http://bayanbox.ir/view/1440458512717609008/Certificate-is-ready.png)

سرتیفیکیت ایجاد شده را از لیست Application Services هم می توانید دانلود کنید.

![عکس مربوطه](http://bayanbox.ir/view/5803013104963660436/DownloadCert.png)

مراحل ایجاد Production Certificate هم به همین صورت هست.

### مرحله ی چهارم : آماده کردن سرتیفیکت های APNS

۱- اسم سرتیفیکیت SSL ای که در انتهای مرحله قبل دانلود کرده اید، aps_development.cer است. روی آن کلیک کنید تا در برنامه  Keychain Access نصب شود. این سرتیفیکیت SSL باید توسط سرویس پوشه استفاده شود تا بتواند به APNS برای ارسال پوش نوتیفیکیشن به برنامه شما متصل شود. (APNS: Apple Push Notification Service)

۲- برنامه  Keychain Access را روی Mac خود باز کنید. به قسمت login بروید و براساس دسته بندی Certificates محتوایش را فیلتر کنید. در اینجا گزینه ای به نام Apple Development iOS Push Services می بینید که با یک کلید خصوصی جفت شده است.

![عکس مربوطه](http://bayanbox.ir/view/4974318213442530133/Keychain2.jpg)

۳- روی این سرتیفیکیت پوش نوتیفیکشن جدیدتان کلیک راست کنید و  گزینه ی Export "Apple Development iOS Push Services را انتخاب کنید و فایل حاصل را با نام apns-dev-cert.p12 در جایی که در دسترس تان باشد ذخیره کنید. 

برای اکسپورت کردن می توانید پسورد هم وارد کنید اما در اینصورت لازم است که همراه با ارسال فایل سرتیفیکیت به چابک، پسورد آن را هم ارسال کنید.

![عکس مربوطه](http://bayanbox.ir/view/3470455199681879504/Enter-the-password-for-exporting.png)

برای نهایی شدن فرآیند اکسپورت کردن سرتیفیکیت، پسورد ادمین سیستم خود را بزنید.

![عکس مربوطه](http://bayanbox.ir/view/8511862378341283401/File-Enter-your-usual-admin-password.png)

برای ایجاد فایل p12. مربوط به Production هم همین مراحل را برای سرتیفیکت Production انجام دهید.



به این ترتیب شما دو فایل سرتیفیکت یکی برای Development و یکی برای  Production خواهید داشت که پسوند هر دو p12. است. این دو فایل برای ارسال چابک به برنامه شما لازم است و شما این دو را باید برای ما بفرستید.
