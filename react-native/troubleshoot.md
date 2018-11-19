---
id: troubleshoot
title: عیب یابی ریکت نیتیو
layout: react-native
permalink: react-native/troubleshoot.html
prev: features.html
next: release-note.html
---

در این صفحه به عیب‌یابی مشکلات متداول توسعه‌دهندگان در پیاده‌سازی چابک و ارائه راه‌‌حل‌های مربوط به آن می‌پردازیم. برخی از این مشکلات عبارتند از عدم [دریافت پوش‌نوتیفیکیشن](/react-native/troubleshoot.html#۱--پوش-نمیگیرم) و [نمایش اعلان](/react-native/troubleshoot.html#۲--اعلانها-نمایش-داده-نمیشوند).

<Br>

## پوش نمی‌گیرم
---

یکی از مشکلات متداولی که توسعه‌دهندگان پس از نصب چابک با آن مواجه می‌شوند،‌ **عدم دریافت پیام** (هم پیام چابک و هم پوش‌نوتیفیشکن) است. این مشکل معمولا به راه‌اندازی ناقص یا غیر صحیح چابک بر می‌گردد. عیب‌یابی این مشکل را در دو حالت باز و بسته بودن اپلیکیشن بررسی خواهیم کرد.

- #### اپ باز است (Background یا Foreground) و پوش نمی‌گیرم:

##### ۱- از ثبت موفق دستگاه کاربر اطمینان یابید

در صورتی که شما دستگاه را با `userId` که ثبت کردید در **بخش مشترکین پنل** مشاهده نکردید به نکات زیر توجه فرمایید:

الف- **وی‌پی‌ان دستگاه حتما خاموش باشد**.

ب- **تعیین درست محیط چابک** (آزمایشی و عملیاتی) در راه‌اندازی

پ- **وارد کردن صحیح اطلاعات حساب** (`appId`, `APIKey`, `username`, `password`) در مقداردهی اولیه


پس از بررسی نکات بالا دستگاه شما باید در بخش مشترکین پنل آمده باشد. 

##### ۲- کاربر حتما در کانال ارسالی شما عضو باشد 

در صورت مشاهده دستگاه کاربر در **بخش مشترکین پنل**، از عضویت کاربر در کانالی که با آن پیام خود را ارسال می‌کنید، اطمینان یابید. برای اینکه کانال‌هایی که کاربرتان در آن‌ها عضو هستند را مشاهده می‌کنید، می‌توانید روی آیکون ![کانال‌ها](http://uupload.ir/files/24jn_channels.png) در کارت هر دستگاه در بخش مشترکین پنل کلیک کنید. علاوه بر آن شما می‌توانید از اتصال یا عدم اتصال دستگاه از مشاهده **نوار سبز رنگ** در بالای کارت مطلع شوید.


![کانال‌ها](http://uupload.ir/files/avly_test.png
)

##### ۳- اطلاعات حساب خود را با دقت وارد کنید (خطای internal server error)
<span style="background-color: #a4c639; height: 30px; color: #fff; display: inline-block; padding: 1px 10px 1px 10px; font-weight: bold; font-size:12px; border-radius: 5px;">Android</span><span style="background-color: #d3d3d3; height: 30px; color: #fff; display: inline-block; padding: 1px 10px 1px 10px; font-weight: bold; font-size:12px; border-radius: 5px;">IOS</span>

در صورت دریافت خطای فوق در **xcode log** و **logcat** از وارد کردن اطلاعات حساب (`appId`, `APIKey`, `username`, `password`) خود اطمینان یابید.

<Br>

- #### اپ بسته است (Terminated) و پوش نمی‌گیرم:

##### ۱- از مراحل ثبت موفق دستگاه و عضویت در کانال ارسال مانند بالا اطمینان یابید

در ابتدا از ثبت موفق کاربر و مشاهده دستگاه در بخش مشترکین و عضویت آن در کانال ارسالی پیام مطمئن شوید.

##### ۲- تنظیمات APN (پوش‌نوتیفیکیشن) خود را چک کنید
<span style="background-color: #d3d3d3; height: 30px; color: #fff; display: inline-block; padding: 1px 10px 1px 10px; font-weight: bold; font-size:12px; border-radius: 5px;">IOS</span>

از وارد کردن صحیح اطلاعات دسترسی پوش‌نوتیفیکیشن در هر پلتفرم از [بخش تنظیمات پنل قسمت پلتفرم‌ها](https://doc.chabokpush.com/panel/settings.html#%D9%BE%D9%84%D8%AA%D9%81%D8%B1%D9%85%D9%87%D8%A7) اطمینان یابید.
در صورت مشاهده متن **غیرفعال** در کارت تنظیمات هر پلتفرم، دستگاه به بخش مشترکین اضافه نشده است. برای مثال اگر تنظیمات پوش‌نوتیفیکیشن آی‌اواس را به درستی انجام داده باشید ولی دستگاه آی‌اواس به بخش مشترکین اضافه نشده باشد بر روی کارت تنظیمات پوش‌نوتیفیکیشن آی‌اواس متن غیرفعال را مشاهده خواهید کرد.

##### ۳- پوش‌ روی Simulator آی‌او‌اس دریافت نمی‌شود
<span style="background-color: #d3d3d3; height: 30px; color: #fff; display: inline-block; padding: 1px 10px 1px 10px; font-weight: bold; font-size:12px; border-radius: 5px;">IOS</span>
 
امکان دریافت پوش‌نویفیکیشن بر روی Simulator آی‌او‌اس وجود ندارد.

> `نکته:‍` توجه داشته باشید هنگامی که گواهی **sandbox اپل** را در پنل تستی قرار می‌دهید، فقط امکان دریافت Cloud Messaging در **حالت debug** وجود خواهد داشت. اما اگر گواهی **production اپل** را در محیط عملیاتی قرار دهید، زمانی Cloud Messaging را دریافت خواهید کرد که اقدام به ساخت **ipa** از پروژه خود کرده و از طریق TestFlight یا Enterprise اپلیکیشن خود را نصب کنید.

##### ۴- تنظیمات GCM (پوش‌نوتیفیشکن) خود را چک کنید
<span style="background-color: #a4c639; height: 25px; color: #fff; display: inline-block; padding: 8px 10px 0px 10px; font-weight: bold; font-size:12px; border-radius: 5px;">Android</span>

از وارد کردن صحیح اطلاعات دسترسی پوش‌نوتیفیکیشن در هر پلتفرم از [بخش تنظیمات پنل قسمت پلتفرم‌ها](https://doc.chabokpush.com/panel/settings.html#%D9%BE%D9%84%D8%AA%D9%81%D8%B1%D9%85%D9%87%D8%A7) اطمینان یابید.
در صورت مشاهده متن **غیرفعال** در کارت تنظیمات هر پلتفرم، دستگاه به بخش مشترکین اضافه نشده است. برای مثال اگر تنظیمات پوش‌نوتیفیکیشن اندروید را به درستی انجام داده باشید ولی دستگاه اندروید‌ به بخش مشترکین اضافه نشده باشد بر روی کارت تنظیمات پوش‌نوتیفیکیشن اندروید متن غیرفعال را مشاهده خواهید کرد.

##### ۵- از تعریف GCMReceiver برای دریافت پوش اطمینان یابید
<span style="background-color: #a4c639; height: 25px; color: #fff; display: inline-block; padding: 8px 10px 0px 10px; font-weight: bold; font-size:12px; border-radius: 5px;">Android</span>

 اطمینان یابید که [کد GcmReceiver در فایل AndroidManifes.xml قرار داده شده باشد.](https://doc.chabokpush.com/android/application-class.html#%DB%B3-%D8%AA%D8%B9%D8%B1%DB%8C%D9%81-%D8%B1%D8%B3%DB%8C%D9%88%D8%B1-gcmreceiver)
همچنین برای `YOUR_APPLICATION_PACKAGE_ID` حتما باید `bundleId` اپلیکیشن خود را قرار دهید.

##### ۶- در حالت بسته بودن اپ، پیام چابک دریافت نمی‌شود (فقط نوتیفیکیشن دریافت خواهد شد)
<span style="background-color: #a4c639; height: 25px; color: #fff; display: inline-block; padding: 8px 10px 0px 10px; font-weight: bold; font-size:12px; border-radius: 5px;">Android</span><span style="background-color: #d3d3d3; height: 25px; color: #fff; display: inline-block; padding: 8px 10px 0px 10px; font-weight: bold; font-size:12px; border-radius: 5px;">IOS</span>


در پنل حساب کاربری خود در بخش پیام‌ها، **دایره زرد رنگ** به معنی **در صف بود پیام** شما می‌باشد و زمانی که کاربر به چابک متصل شود (اپ را باز کند) پیام را دریافت می‌کند. در بخش نوتیفیکیشن در صورت ارسال موفق به سرور هر پلتفرم، تیک سبز رنگ به همراه لوگوی پلتفرم نشان داده می‌شود. همچنین خطاهای **GONE** به معنی حذف اپلیکیشن شما توسط کاربر و **DeviceTokenNotForTopic** به معنی این است که اطلاعات پلتفرم آی‌او‌اس که در پنل ما قرار داده‌اید با اپلیکیشنی که روی دستگاه نصب کرده‌اید همخوانی ندارد. این نمادها را می‌توانید به صورت کامل در [مستندات پنل بخش پیام‌ها](https://doc.chabokpush.com/panel/inbox.html#نمادهای-وضعیت-پیام) مشاهده کنید.

<Br>

### اعلان‌ها نمایش داده نمی‌شوند
---

یکی دیگر از مشکلات متداول عدم نمایش اعلان (نوتیفیکیشن) در دستگاه مخاطب است. در این قسمت به دلایل احتمالی این مشکل اشاره‌ خواهیم کرد.

##### ۱- اپلکیشن روی صفحه نمایش باز نباشد

اعلان‌ها در زمانی که اپلیکیشن روی دستگاه شما **باز** و **نمایان** است، نشان داده نمی‌شوند.

##### ۲- تنظیمات اکشن کلیک و محتوا در اعلان به درستی قرار داده‌ شود
<span style="background-color: #d3d3d3; height: 25px; color: #fff; display: inline-block; padding: 8px 10px 0px 10px; font-weight: bold; font-size:12px; border-radius: 5px;">IOS</span>


زمانی که این آپشن‌ها گذاشته می‌شوند باید تنظیمات اپ به‌ درستی ذخیره شده باشد.

##### ۳- دقت کنید که اپلیکیشن در حالت Force Stop نباشد
<span style="background-color: #a4c639; height: 25px; color: #fff; display: inline-block; padding: 8px 10px 0px 10px; font-weight: bold; font-size:12px; border-radius: 5px;">Android</span>

در حالتی که اپلیکیشن شما در حالت **Force Stop** از سوی کاربر گذاشته شده باشد، اکثر رویداد‌ها از جمله دریافت پیام‌های GCM/FCM رخ نخواهد داد. به طور کلی یک اپلیکیشن در حالت‌های زیر می‌تواند **Force Stop** شود: 

الف- انتخاب گزینه **Force Stop** در صفحه Settings > Apps

ب- نگه‌ داشتن دکمه بازگشت روی بعضی گوشی‌ها 

پ- استفاده از یک برنامه برای بستن اپلیکیشن‌ها (App Killers)

ت- swipe اپلیکیشن حین دیباگ از دور (Remote Debugging)

ث- swipe اپلیکیشن از لیست Recent Apps در دستگاه‌های شیائومی

ج- به صورت خودکار از سوی بعضی برندهای گوشی برای بهینه سازی مصرف باتری. برای غیرفعال کردن آن قدم‌های زیر انجام دهید:

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

##### ۴- گزینه دریافت پوش برای اپلیکیشن را چک کنید

تنظیمات نوتیفیکیشن در صفحه Settings > Notifications را چک کنید. در صورت خاموش بودن گزینه نوتیفیکیشن، آن را فعال نمایید.

##### ۵- وضعیت اتصال دستگاه به اینترنت را بررسی نمایید

شبکه اینترنتی که به آن وصل هستید ممکن است اتصال شما به سرورهای گوگل یا اپل را بسته باشد. در این حالت می‌توانید قطع و وصل کردن اینترنت خود را امتحان کنید.

 
