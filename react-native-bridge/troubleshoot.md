---
id: troubleshoot
title: عیب یابی ریکت نیتیو
layout: react-native-bridge
permalink: react-native-bridge/troubleshoot.html
prev: features.html
next: release-note.html
---

در این صفحه به عیب‌یابی مشکلات متداول توسعه‌دهندگان در پیاده‌سازی چابک و ارائه راه‌‌حل‌های مربوط به آن می‌پردازیم. برخی از این مشکلات عبارتند از: [کرش کردن اپلیکیشن](/react-native-bridge/troubleshoot.html#%D8%A7%D9%BE%D9%84%DB%8C%DA%A9%DB%8C%D8%B4%D9%86%D9%85-%DA%A9%D8%B1%D8%B4-%D9%85%DB%8C%DA%A9%D9%86%D8%AF)، عدم [دریافت پوش‌نوتیفیکیشن](/react-native-bridge/troubleshoot.html#پوش-نمیگیرم)، [نمایش نوتیفیکیشن](/react-native-bridge/troubleshoot.html#نوتیفیکیشنها-نمایش-داده-نمیشوند) و [نمایش تصویر نوتیفیکیشن](#تصویر-نوتیفیکیشن-نمایش-داده-نمیشود)

<Br>
 
## اپلیکیشنم کرش می‌کند
---

##### ۱- چابک را حتما intialize کنید

در صورتی که با خطای:

```java
AdpPushClient not initialized, Make sure to call AdpPushClient.init in your Application class onCreate
```

 مواجه شدید، اطمینان یابید چابک را **intialize** کرده باشید. این کار را از طریق متد `init` با وارد کردن پارامتر‌های مخصوص حساب خود انجام دهید.

<Br>

##### ۲- به مقدار `APP_ID/SENDER_ID` دقت کنید

<span style="background-color: #a4c639; height: 30px; color: #fff; display: inline-block; padding: 0px 10px 0px 10px; font-weight: bold; font-size:12px; border-radius: 5px;">Android</span>

در صورتی که با خطای **Application ID should be in `app-name/number` format** مواجه شدید، از صحیح بودن مقدار `APP_ID/SENDER_ID` در متد `init` اطمینان یابید. مقدار این پارامتر باید `APP_ID` به اضافه `SENDER_ID` (بدون فاصله) باشد. به عنوان مثال این مقدار برای حساب دموی چابک 839879285435/chabok-starter می‌شود. (مقدار عددی **SENDER_ID** است.) 


برای اطلاعات بیشتر می‌توانید مستندات [راه‌اندازی](/android/sdk-setup.html#۳--مقداردهی-اولیه-initialize) را مطالعه کنید.

> `نکته:` این مورد برای **نسخه‌های ۲.۱۷.۱ به پایین اندروید** است زیرا در نسخه‌های بعدی این دو پارامتر از هم جدا شده‌اند.

<Br>

##### ۳- نسخه‌ سرویس‌های گوگل پلی را بررسی کنید
<span style="background-color: #a4c639; height: 30px; color: #fff; display: inline-block; padding: 0px 10px 0px 10px; font-weight: bold; font-size:12px; border-radius: 5px;">Android</span>

در صورتی با خطاهای:

```java
;java.lang.NoClassDefFoundError: Failed resolution of: Lcom/google/android/gms/iid/InstanceID
```
 و یا

```java
Caused by: java.lang.ClassNotFoundException: Didn’t find class com.google.android.gms.iid.InstanceID
```

 مواجه شدید، دقت کنید که نسخه‌ سرویس‌های گوگل پلی شما با هم، همخوانی و تطابق داشته باشند.

<Br><Br>
 
## یک پوش را چند بار می‌گیرم
---

##### ۱- از قطعه کد زیر استفاده کنید
<span style="background-color: #a4c639; height: 30px; color: #fff; display: inline-block; padding: 0px 10px 0px 10px; font-weight: bold; font-size:12px; border-radius: 5px;">Android</span>

در صورتی که از سرویس‌های دیگر پوش استفاده کنید (3rd parties)، حتما از کد زیر استفاده کنید. 
این کد باعث می‌شود تا فقط پوش‌نوتیفیکشن‌های چابک نمایش داده شوند؛ برای این کار کد زیر در فایل `AndroidManifest.xml` قرار دهید:

```xml
<meta-data android:name="com.adpdigital.push.client.SHOW_ONLY_CHABOK_NOTIFICATIONS" android:value="ENABLE" />
```
<Br>

##### ۲- از AutoNotify فایربیس استفاده نکنید
<span style="background-color: #a4c639; height: 30px; color: #fff; display: inline-block; padding: 0px 10px 0px 10px; font-weight: bold; font-size:12px; border-radius: 5px;">Android</span>

در صورتی که از Auto Notify سرویس فایربیس استفاده می‌کنید (در این مدل نمایش نوتیفیکیشن را سیستم‌عامل برعهده دارد)، در زمان‌هایی که اپلیکیشن در بک‌گراند یا بسته است، کد رسیور چابک و شما فراخوانی نخواهد شد در نتیجه نوتیفیکیشن ۲بار نمایش داده خواهد شد.


<Br><Br>

## پوش نمی‌گیرم
---

یکی از مشکلات متداولی که توسعه‌دهندگان پس از نصب چابک با آن مواجه می‌شوند،‌ **عدم دریافت پیام** (هم پیام چابک و هم پوش‌نوتیفیشکن) است. این مشکل معمولا به راه‌اندازی ناقص یا غیر صحیح چابک بر می‌گردد. عیب‌یابی این مشکل را در دو حالت باز و بسته بودن اپلیکیشن بررسی خواهیم کرد.

#### حالت اول: اپ باز است (Background یا Foreground) و پوش نمی‌گیرم:

##### ۱- از ثبت موفق دستگاه کاربر اطمینان یابید

در صورتی که شما دستگاه را با `userId` که ثبت کردید در **بخش مشترکین پنل** مشاهده نکردید به نکات زیر توجه فرمایید:

الف- **وی‌پی‌ان دستگاه حتما خاموش باشد**.

ب- **تعیین درست محیط چابک** (آزمایشی و عملیاتی) در راه‌اندازی

پ- **وارد کردن صحیح اطلاعات حساب** (`appId`, `APIKey`, `username`, `password`) در مقداردهی اولیه


پس از بررسی نکات بالا دستگاه شما باید در بخش مشترکین پنل آمده باشد. 

##### ۲- کاربر حتما در کانال ارسالی شما عضو باشد 

در صورت مشاهده دستگاه کاربر در **بخش مشترکین پنل**، از عضویت کاربر در کانالی که با آن پیام خود را ارسال می‌کنید، اطمینان یابید. برای اینکه کانال‌هایی که کاربرتان در آن‌ها عضو هستند را مشاهده می‌کنید، می‌توانید روی آیکون ![کانال‌ها](http://uupload.ir/files/24jn_channels.png) در کارت هر دستگاه در بخش مشترکین پنل کلیک کنید. علاوه بر آن شما می‌توانید از اتصال یا عدم اتصال دستگاه از مشاهده **نوار سبز رنگ** در بالای کارت مطلع شوید.


![کانال‌ها](http://uupload.ir/files/avly_test.png)

##### ۳- اطلاعات حساب خود را با دقت وارد کنید (خطای internal server error)
<span style="background-color: #a4c639; height: 30px; color: #fff; display: inline-block; padding: 0px 10px 0px 10px; font-weight: bold; font-size:12px; border-radius: 5px;">Android</span><span style="background-color: #d3d3d3; height: 30px; color: #fff; display: inline-block; padding: 0px 10px 0px 10px; font-weight: bold; font-size:12px; border-radius: 5px;">IOS</span>

در صورت دریافت خطای فوق در **xcode log** و **logcat** از وارد کردن اطلاعات حساب (`appId`, `APIKey`, `username`, `password`) خود اطمینان یابید.

<Br>

#### حالت دوم: اپ بسته است (Terminated) و پوش نمی‌گیرم:

##### ۱- از مراحل ثبت موفق دستگاه و عضویت در کانال ارسال مانند بالا اطمینان یابید

در ابتدا از ثبت موفق کاربر و مشاهده دستگاه در بخش مشترکین و عضویت آن در کانال ارسالی پیام مطمئن شوید.

##### ۲- تنظیمات APN (پوش‌نوتیفیکیشن) خود را چک کنید
<span style="background-color: #d3d3d3; height: 30px; color: #fff; display: inline-block; padding: 0px 10px 0px 10px; font-weight: bold; font-size:12px; border-radius: 5px;">IOS</span>

از وارد کردن صحیح اطلاعات دسترسی پوش‌نوتیفیکیشن در هر پلتفرم از [بخش تنظیمات پنل قسمت پلتفرم‌ها](https://doc.chabok.io/panel/settings.html#%D9%BE%D9%84%D8%AA%D9%81%D8%B1%D9%85%D9%87%D8%A7) اطمینان یابید.
در صورت مشاهده متن **غیرفعال** در کارت تنظیمات هر پلتفرم، دستگاه به بخش مشترکین اضافه نشده است. برای مثال اگر تنظیمات پوش‌نوتیفیکیشن آی‌اواس را به درستی انجام داده باشید ولی دستگاه آی‌اواس به بخش مشترکین اضافه نشده باشد بر روی کارت تنظیمات پوش‌نوتیفیکیشن آی‌اواس متن غیرفعال را مشاهده خواهید کرد.

##### ۳- پوش‌ روی Simulator آی‌او‌اس دریافت نمی‌شود
<span style="background-color: #d3d3d3; height: 30px; color: #fff; display: inline-block; padding: 0px 10px 0px 10px; font-weight: bold; font-size:12px; border-radius: 5px;">IOS</span>
 
امکان دریافت پوش‌نویفیکیشن بر روی Simulator آی‌او‌اس وجود ندارد.

##### ۴- سوئیچ سرور عملیاتی اپل را در پنل به درستی تنظیم کنید
<span style="background-color: #d3d3d3; height: 30px; color: #fff; display: inline-block; padding: 0px 10px 0px 10px; font-weight: bold; font-size:12px; border-radius: 5px;">IOS</span>

به طور کلی (در هر محیط چابک)، زمانی که گواهی **sandbox اپل** را در پنل قرار دهید، سوئیچ سرور عملیاتی اپل باید **خاموش** باشد. اما در زمانی که گواهی **production اپل** را قرار دهید، این سوئیچ باید حتما **روشن** باشد.

> `نکته:‍` توجه داشته باشید هنگامی که گواهی **sandbox اپل** را در پنل آزمایشی قرار می‌دهید، فقط امکان دریافت Push Notification در **حالت debug** وجود خواهد داشت. اما اگر گواهی **production اپل** را در محیط عملیاتی قرار دهید، زمانی Push Notification را دریافت خواهید کرد که اقدام به ساخت **ipa** از پروژه خود کرده و از طریق TestFlight یا Enterprise اپلیکیشن خود را نصب کنید.

##### ۵- تنظیمات GCM (پوش‌نوتیفیشکن) خود را چک کنید
<span style="background-color: #a4c639; height: 30px; color: #fff; display: inline-block; padding: 0px 10px 0px 10px; font-weight: bold; font-size:12px; border-radius: 5px;">Android</span>

از وارد کردن صحیح اطلاعات دسترسی پوش‌نوتیفیکیشن در هر پلتفرم از [بخش تنظیمات پنل قسمت پلتفرم‌ها](https://doc.chabok.io/panel/settings.html#%D9%BE%D9%84%D8%AA%D9%81%D8%B1%D9%85%D9%87%D8%A7) اطمینان یابید.
در صورت مشاهده متن **غیرفعال** در کارت تنظیمات هر پلتفرم، دستگاه به بخش مشترکین اضافه نشده است. برای مثال اگر تنظیمات پوش‌نوتیفیکیشن اندروید را به درستی انجام داده باشید ولی دستگاه اندروید‌ به بخش مشترکین اضافه نشده باشد بر روی کارت تنظیمات پوش‌نوتیفیکیشن اندروید متن غیرفعال را مشاهده خواهید کرد.

##### ۶- `senderId` که در پنل و متد `init` وارد می‌نمایید، صحیح باشد
<span style="background-color: #a4c639; height: 30px; color: #fff; display: inline-block; padding: 0px 10px 0px 10px; font-weight: bold; font-size:12px; border-radius: 5px;">Android</span>

دقت داشته باشید `senderId` که در پنل قرار داده‌اید با `senderId` که در متد `init` همراه با `appId` به چابک داده‌اید، یکسان باشد.

> `نکته:` ترکیب `APP_ID/SENDERID` به عنوان `YOUR_APP_ID` مورد استفاده قرار می‌گیرد.

##### ۷- از تعریف GCMReceiver برای دریافت پوش اطمینان یابید
<span style="background-color: #a4c639; height: 30px; color: #fff; display: inline-block; padding: 0px 10px 0px 10px; font-weight: bold; font-size:12px; border-radius: 5px;">Android</span>

 اطمینان یابید که [کد GcmReceiver در فایل AndroidManifest.xml قرار داده شده باشد.](https://doc.chabok.io/android/application-class.html#%DB%B3-%D8%AA%D8%B9%D8%B1%DB%8C%D9%81-%D8%B1%D8%B3%DB%8C%D9%88%D8%B1-gcmreceiver)
همچنین برای `YOUR_APPLICATION_PACKAGE_ID` حتما باید `bundleId` اپلیکیشن خود را قرار دهید.

##### ۸- متد `init` را برای شروع حتما فراخوانی کنید
<span style="background-color: #a4c639; height: 30px; color: #fff; display: inline-block; padding: 0px 10px 0px 10px; font-weight: bold; font-size:12px; border-radius: 5px;">Android</span>


متد `init` چابک حتما باید در کلاس `application` و در متد `onCreate` در هر شرایطی فراخوانی شود و در صورت عدم فراخوانی متد فوق با خطای زیر مواجه خواهید شد.

```bash
AdpPushClient not initialized yet, please first call AdpPushClient.get with parameters
```

##### ۹- دقت کنید که از نسخه درست **buildTools** و **play services** استفاده کنید
<span style="background-color: #a4c639; height: 30px; color: #fff; display: inline-block; padding: 0px 10px 0px 10px; font-weight: bold; font-size:12px; border-radius: 5px;">Android</span>


نسخه buildTools و play services شما باید به درستی انتخاب شود. برای انتخاب صحیح [مطابق این جدول](https://doc.chabok.io/android/gradle-setup.html#%D8%A7%D9%81%D8%B2%D9%88%D8%AF%D9%86-%DA%A9%D8%AA%D8%A7%D8%A8%D8%AE%D8%A7%D9%86%D9%87) عمل کنید.

##### ۱۰- در حالت بسته بودن اپ، پیام چابک دریافت نمی‌شود (فقط نوتیفیکیشن دریافت خواهد شد)
<span style="background-color: #a4c639; height: 30px; color: #fff; display: inline-block; padding: 0px 10px 0px 10px; font-weight: bold; font-size:12px; border-radius: 5px;">Android</span><span style="background-color: #d3d3d3; height: 30px; color: #fff; display: inline-block; padding: 0px 10px 0px 10px; font-weight: bold; font-size:12px; border-radius: 5px;">IOS</span>


در پنل حساب کاربری خود در بخش پیام‌ها، **دایره زرد رنگ** به معنی **در صف بود پیام** شما می‌باشد و زمانی که کاربر به چابک متصل شود (اپ را باز کند) پیام را دریافت می‌کند. در بخش نوتیفیکیشن در صورت ارسال موفق به سرور هر پلتفرم، تیک سبز رنگ به همراه لوگوی پلتفرم نشان داده می‌شود. همچنین خطاهای **GONE** به معنی حذف اپلیکیشن شما توسط کاربر، **DeviceTokenNotForTopic** در آی‌اواس و **SENDER_ID_MISMATCH** در اندروید  به معنی این است که اطلاعات پلتفرم که در پنل ما قرار داده‌اید با اپلیکیشنی که روی دستگاه نصب کرده‌اید تطابق ندارد. نمادها و خطاها را می‌توانید به صورت کامل در مستندات پنل [صفحه پیام‌ها](https://doc.chabok.io/panel/inbox.html#نمادها) مشاهده کنید.

<Br>

## نوتیفیکیشن‌ها نمایش داده نمی‌شوند
---

یکی دیگر از مشکلات متداول عدم نمایش نوتیفیکیشن در دستگاه مخاطب است. در این قسمت به دلایل احتمالی این مشکل اشاره‌ خواهیم کرد.

##### ۱- اپلکیشن روی صفحه نمایش باز نباشد

نوتیفیکیشن‌ها در زمانی که اپلیکیشن روی دستگاه شما **باز** و **نمایان** است، نشان داده نمی‌شوند.

##### ۲- تنظیمات اکشن کلیک و محتوا در نوتیفیکیشن به درستی قرار داده‌ شود
<span style="background-color: #d3d3d3; height: 30px; color: #fff; display: inline-block; padding: 0px 10px 0px 10px; font-weight: bold; font-size:12px; border-radius: 5px;">IOS</span>


زمانی که این آپشن‌ها گذاشته می‌شوند باید تنظیمات اپ به‌ درستی ذخیره شده باشد.

##### ۳- دقت کنید که اپلیکیشن در حالت Force Stop نباشد
<span style="background-color: #a4c639; height: 30px; color: #fff; display: inline-block; padding: 0px 10px 0px 10px; font-weight: bold; font-size:12px; border-radius: 5px;">Android</span>

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

##### ۶- وجود کتابخانه‌های دیگر در کنار چابک
<span style="background-color: #a4c639; height: 30px; color: #fff; display: inline-block; padding: 0px 10px 0px 10px; font-weight: bold; font-size:12px; border-radius: 5px;">Android</span>

در صورتی که شما از سرویس‌های دیگری هم استفاده می‌کنید و کتابخانه‌های آن‌ها را نصب کرده‌اید امکان عدم نمایش نوتیفیکیشن برای شما وجود خواهد داشت. به عنوان مثال اگر کتابخانه **پوشه** را علاوه بر چابک روی اپ خود داشته باشید، زمانی که اپ شما بسته است، پوش‌نوتیفیکیشن دریافت می‌شود اما نوتیفیکیشن آن در دستگاه کاربر **نمایش داده نمی‌شود**.

##### ۷- خطای نمایش پوش‌نوتیفیکیشن در اندروید ۷ به بالا (در ساخت Notification Channel)
<span style="background-color: #a4c639; height: 30px; color: #fff; display: inline-block; padding: 0px 10px 0px 10px; font-weight: bold; font-size:12px; border-radius: 5px;">Android</span>

در صورتی که در اندروید ۷ به بالا در نمایش نوتیفیکیشن با ارور زیر در Logcat خود مواجه شدید؛

```bash
‍‍RNPushNotification: failed to send push notification
RNPushNotification: java.lang.IllegalArgumentException
RNPushNotification:    at android.os.Parcel.createException(Parcel.java:1970)
RNPushNotification:    at android.os.Parcel.readException(Parcel.java:1934)
RNPushNotification:    at android.os.Parcel.readException(Parcel.java:1884)
RNPushNotification:    at android.app.INotificationManager$Stub$Proxy.createNotificationChannels(INotificationManager.java:1888)
RNPushNotification:    at android.app.NotificationManager.createNotificationChannels(NotificationManager.java:577)
RNPushNotification:    at android.app.NotificationManager.createNotificationChannel(NotificationManager.java:565)
RNPushNotification:    at com.dieam.reactnativepushnotification.modules.RNPushNotificationHelper.checkOrCreateChannel(RNPushNotificationHelper.java:577)
RNPushNotification:    at com.dieam.reactnativepushnotification.modules.RNPushNotificationHelper.sendToNotificationCentre(RNPushNotificationHelper.java:326)
RNPushNotification:    at com.dieam.reactnativepushnotification.modules.RNPushNotificationListenerService.handleRemotePushNotification(RNPushNotificationListenerService.java:135)
RNPushNotification:    at com.dieam.reactnativepushnotification.modules.RNPushNotificationListenerService.access$000(RNPushNotificationListenerService.java:28)
RNPushNotification:    at com.dieam.reactnativepushnotification.modules.RNPushNotificationListenerService$1.run(RNPushNotificationListenerService.java:86)
```
کد زیر را در فایل `AndroidManifest.xml` خود قرار دهید.

```xml
<meta-data  android:name="com.dieam.reactnativepushnotification.notification_channel_name"
                android:value="default"/>
```
<Br>
 
## تصویر نوتیفیکیشن نمایش داده نمی‌شود
---

##### ۱- پوش را با پنل ارسال کرده‌ام

دقت داشته باشید پس از انتخاب تصویر، دکمه **بارگذاری** را حتما بزنید و پیام موفقیت را مشاهده کنید.

<br>

##### ۲- پوش را با API ارسال کرده‌ام

در این حالت باید به پارامترهای `mediaType`، `mediaUrl` و `mutableContent` (در آی‌اواس) مقادیر درست دهید.

<span style="background-color: #d3d3d3; height: 30px; color: #fff; display: inline-block; padding: 0px 10px 0px 10px; font-weight: bold; font-size:12px; border-radius: 5px;">IOS</span>

>`نکته:` در حالت **پوش پس‌زمینه** (background) با API، پارامتر `mutableContent` حتما باید `true` باشد.

<br>

## موارد بالا را بررسی کردم اما همچنان مشکلم برطرف نشده!
---

در صورتی هم که موارد این صفحه را بررسی کردید و همچنان مشکلتان **برطرف نشده بود**، می‌توانید از **پشتیبانی چابک** در [گیت‌هاب](https://github.com/chabok-io/chabok-client-rn/issues) استفاده کنید. در آن جا `issue`های قبلی را مطالعه کنید و اگر مشکل شما بین آن‌ها نبود، می‌توانید یک `issue` جدید برای بررسی تیم فنی چابک باز نمایید.
