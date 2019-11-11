---
id: troubleshoot-old
title: عیب یابی اندروید
layout: android
permalink: android/troubleshoot-old.html
prev: features.html
next: release-note.html
---

در این صفحه به عیب‌یابی مشکلات متداول توسعه‌دهندگان در پیاده‌سازی چابک و ارائه راه‌‌حل‌های مربوط به آن می‌پردازیم. برخی از این مشکلات عبارتند از [کرش کردن اپلیکیشن](/android/troubleshoot.html#اپلیکیشنم-کرش-میکند)، عدم [دریافت پوش‌نوتیفیکیشن](/android/troubleshoot.html#پوش-نمیگیرم)، [نمایش نوتیفیکیشن](/android/troubleshoot.html#اعلانها-نمایش-داده-نمیشوند) و [نمایش تصویر نوتیفیکیشن](#تصویر-نوتیفیکیشن-نمایش-داده-نمیشود).

<Br>

## اپلیکیشنم کرش می‌کند
---

#### چابک را حتما intialize کنید

در صورتی که با ارور **AdpPushClient not initialized, Make sure to call AdpPushClient.init in your Application class onCreate** مواجه شدید، اطمینان یابید چابک را intialize کرده باشید. این کار را از طریق متد `init` با وارد کردن پارامتر‌های مخصوص حساب خود انجام دهید.

<Br>

#### به مقدار `APP_ID/SENDER_ID` دقت کنید

در صورتی که با خطای **Application ID should be in `app-name/number` format** مواجه شدید، از صحیح بودن مقدار `APP_ID/SENDER_ID` در متد `init` اطمینان یابید. مقدار این پارامتر باید `APP_ID` به اضافه `SENDER_ID` (بدون فاصله) باشد. به عنوان مثال این مقدار برای حساب دموی چابک 839879285435/chabok-starter می‌شود. (مقدار عددی **SENDER_ID** است.) 


برای اطلاعات بیشتر می‌توانید مستندات [راه‌اندازی](/android/sdk-setup.html#۳--مقداردهی-اولیه-initialize) را مطالعه کنید.

> `نکته:` این مورد برای **نسخه‌های ۲.۱۷.۱ به پایین** است زیرا در نسخه‌های بعدی این دو پارامتر از هم جدا شده‌اند.

<Br>

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


<Br><Br>

## پوش نمی‌گیرم
---

یکی از مشکلات متداولی که توسعه‌دهندگان پس از نصب چابک با آن مواجه می‌شوند،‌ **عدم دریافت پیام** (هم پیام چابک و هم پوش‌نوتیفیکیشن) است. این مشکل معمولا به راه‌اندازی ناقص یا غیر صحیح چابک بر می‌گردد.

- #### اپ باز است (Background یا Foreground) و پوش نمی‌گیرم:  

##### ۱- از ثبت موفق دستگاه کاربر اطمینان یابید

در صورتی که شما دستگاه را با `userId` که ثبت کردید **در بخش مشترکین پنل مشاهده نکردید** به نکات زیر توجه فرمایید:

 الف- **وی‌پی‌ان دستگاه حتما خاموش باشد**.

 ب- **تعیین درست محیط چابک** (آزمایشی و عملیاتی) توسط متد `setDevelopment`

 پ- **وارد کردن صحیح اطلاعات حساب** (`appId`, `APIKey`, `username`, `password`) در مقداردهی اولیه

پس از بررسی نکات بالا دستگاه شما باید در بخش مشترکین پنل آمده باشد. 

##### ۲- کاربر حتما در کانال ارسالی شما عضو باشد

در صورت مشاهده دستگاه کاربر در بخش مشترکین پنل، از عضویت کاربر در کانالی که با آن پیام خود را ارسال می‌کنید اطمینان یابید. برای اینکه کانال‌هایی که کاربرتان در آن‌ها عضو هستند را مشاهده می‌کنید، می‌توانید روی آیکون ![کانال‌ها](http://uupload.ir/files/24jn_channels.png) در کارت هر دستگاه در بخش مشترکین پنل کلیک کنید. علاوه بر آن شما می‌توانید از اتصال یا عدم اتصال دستگاه از مشاهده **نوار سبز رنگ** در بالای کارت مطلع شوید.

![کانال‌ها](http://uupload.ir/files/avly_test.png)

##### ۳- اطلاعات حساب خود را با دقت وارد کنید (خطای internal server error)

در صورت دریافت خطای فوق در **logcat** از وارد کردن اطلاعات حساب (`appId`, `APIKey`, `username`, `password`) خود اطمینان یابید.

<Br>

- #### اپ بسته است (Terminated) و پوش نمی‌گیرم:

##### ۴- از مراحل ثبت موفق دستگاه و عضویت در کانال ارسال مانند بالا اطمینان یابید

در ابتدا از ثبت موفق کاربر و مشاهده دستگاه در بخش مشترکین و عضویت آن در کانال ارسالی پیام مطمئن شوید.

##### ۵- تنظیمات GCM (پوش‌نوتیفیکیشن) خود را چک کنید

از وارد کردن صحیح اطلاعات دسترسی پوش‌نوتیفیکیشن در هر پلتفرم از [بخش تنظیمات پنل قسمت پلتفرم‌ها](https://doc.chabokpush.com/panel/settings.html#%D9%BE%D9%84%D8%AA%D9%81%D8%B1%D9%85%D9%87%D8%A7) اطمینان یابید.
در صورت مشاهده متن **غیرفعال** در کارت تنظیمات هر پلتفرم، دستگاه به بخش مشترکین اضافه نشده است. برای مثال اگر تنظیمات پوش‌نوتیفیکیشن اندروید را به درستی انجام داده باشید ولی دستگاه اندروید‌ به بخش مشترکین اضافه نشده باشد بر روی کارت تنظیمات پوش‌نوتیفیکیشن اندروید متن غیرفعال را مشاهده خواهید کرد.

##### ۶- `senderId` که در پنل و متد `init` وارد می‌نمایید، صحیح باشد

دقت داشته باشید `senderId` که در پنل قرار داده‌اید با `senderId` که در متد `init` همراه با `appId` به چابک داده‌اید، یکسان باشد.

> `نکته:` ترکیب `APP_ID/SENDERID` به عنوان `YOUR_APP_ID` مورد استفاده قرار می‌گیرد.

##### ۷- از تعریف GCMReceiver برای دریافت پوش اطمینان یابید

 اطمینان یابید که [کد GcmReceiver در فایل AndroidManifes.xml قرار داده شده باشد.](https://doc.chabokpush.com/android/application-class.html#%DB%B3-%D8%AA%D8%B9%D8%B1%DB%8C%D9%81-%D8%B1%D8%B3%DB%8C%D9%88%D8%B1-gcmreceiver)
همچنین برای `YOUR_APPLICATION_PACKAGE_ID` حتما باید `bundleId` اپلیکیشن خود را قرار دهید.

##### ۸- متد `init` را برای شروع حتما فراخوانی کنید

متد `init` چابک حتما باید در کلاس `application` و در متد `onCreate` در هر شرایطی فراخوانی شود و در صورت عدم فراخوانی متد فوق با خطای زیر مواجه خواهید شد.

```bash
AdpPushClient not initialized yet, please first call AdpPushClient.get with parameters
```

##### ۹- دقت کنید که از نسخه درست **buildTools** و **play services** استفاده کنید

نسخه buildTools و play services شما باید به درستی انتخاب شود. برای انتخاب صحیح [مطابق این جدول](https://doc.chabokpush.com/android/gradle-setup.html#%D8%A7%D9%81%D8%B2%D9%88%D8%AF%D9%86-%DA%A9%D8%AA%D8%A7%D8%A8%D8%AE%D8%A7%D9%86%D9%87) عمل کنید. 

##### ۱۰- در حالت بسته بودن اپ، پیام چابک دریافت نمی‌شود (فقط نوتیفیکیشن دریافت خواهد شد)

در پنل حساب کاربری خود در بخش پیام‌ها، **دایره زرد رنگ** به معنی **در صف بود پیام** شما می‌باشد و زمانی که کاربر به چابک متصل شود (اپ را باز کند) پیام را دریافت می‌کند. در بخش نوتیفیکیشن در صورت ارسال موفق به سرور هر پلتفرم، تیک سبز رنگ به همراه لوگوی پلتفرم نشان داده خواهد شد. همچنین خطاهای **Device_Unregisterd** و **GONE** به معنی حذف اپلیکیشن شما توسط کاربر و **SENDER_ID_MISMATCH** به معنی این است که اطلاعات پوش‌نوتیفیکیشن پلتفرم اندروید که در پنل ما قرار داده‌اید با اپلیکیشنی که روی دستگاه نصب نموده‌اید، همخوانی ندارد. نمادها و خطاها را می‌توانید به صورت کامل در مستندات پنل [صفحه پیام‌ها](https://doc.chabokpush.com/panel/inbox.html#نمادها) مشاهده کنید.

<Br>

## نوتیفیکیشن‌ها نمایش داده نمی‌شوند
---

یکی دیگر از مشکلات متداول عدم نمایش اعلان (نوتیفیکیشن) در دستگاه مخاطب است. در این قسمت به دلایل احتمالی این مشکل اشاره‌ خواهیم کرد.

##### ۱- اپلیکیشن روی صفحه نمایش باز نباشد

  در حالت پیش‌فرض، اعلان‌ها در زمانی که اپلیکیشن روی دستگاه شما **باز** و **نمایان** است، نشان داده نمی‌شوند.

##### ۲- مقدار متد `buildNotification` باید `true` باشد

در صورتی که در [متد `buildNotification` مقدار `false` را قرار دهید](https://doc.chabokpush.com/android/notification-handling.html#%D8%AA%D9%86%D8%B8%DB%8C%D9%85-%D9%86%D9%85%D8%A7%DB%8C%D8%B4-%D8%A7%D8%B9%D9%84%D8%A7%D9%86)، اعلان نمایش داده نمی‌شود. (نمایش اعلان بر عهده خودتان خواهد بود)

##### ۳- دقت کنید که اپلیکیشن در حالت Force Stop نباشد

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

##### ۴- گزینه دریافت پوش برای اپلیکیشن  را چک کنید

  تنظیمات نوتیفیکیشن در صفحه Settings > Apps را چک کنید. در صورت خاموش بودن گزینه نوتیفیکیشن، آن را فعال نمایید.

##### ۵- وضعیت اتصال دستگاه به اینترنت را بررسی نمایید

  شبکه اینترنتی که به آن وصل هستید ممکن است اتصال شما به سرورهای گوگل یا اپل را بسته باشد. در این حالت می‌توانید قطع و وصل کردن اینترنت خود را امتحان کنید.

##### ۶- وجود کتابخانه‌های دیگر در کنار چابک

در صورتی که شما از سرویس‌های دیگری هم استفاده می‌کنید و کتابخانه‌های آن‌ها را نصب کرده‌اید امکان عدم نمایش اعلان برای شما وجود خواهد داشت. به عنوان مثال اگر کتابخانه **پوشه** را علاوه بر چابک روی اپ خود داشته باشید، زمانی که اپ شما بسته است، پوش‌نوتیفیکیشن دریافت می‌شود اما اعلان آن در دستگاه کاربر **نمایش داده نمی‌شود**.

##### ۷- خطای firebase

در صورتی که برای نمایش نوتیفیکیشن با خطای زیر در logcat مواجه شدید:

```bash
java.lang.IllegalAccessError: com.google.firebase.messaging.FirebaseMessagingService
``` 
باید در `gradle` کد زیر را اضافه کنید:

```javascript
implementation "com.google.firebase:firebase-messaging:18.0.+"
```

<Br>
 
## تصویر نوتیفیکیشن نمایش داده نمی‌شود
---

#### پوش را با پنل ارسال کرده‌ام

دقت داشته باشید پس از انتخاب تصویر، دکمه **بارگذاری** را حتما بزنید و پیام موفقیت را مشاهده کنید.

<br>

#### پوش را با API ارسال کرده‌ام

در این حالت باید به پارامترهای `mediaType`و `mediaUrl` مقادیر درست دهید.


<br>

## موارد بالا را بررسی کردم اما همچنان مشکلم برطرف نشده
---

در صورتی هم که موارد این صفحه را بررسی کردید و همچنان مشکلتان **برطرف نشده بود**، می‌توانید از **پشتیبانی چابک** در [گیت‌هاب](https://github.com/chabok-io/chabok-client-android/issues) استفاده کنید. در آن جا `issue`های قبلی را مطالعه کنید و اگر مشکل شما بین آن‌ها نبود، می‌توانید یک `issue` جدید برای بررسی تیم فنی چابک باز نمایید.