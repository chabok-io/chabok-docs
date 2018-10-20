---
id: sdk-setup
title: راه‌اندازی SDK
layout: android
permalink: android/sdk-setup.html
prev: required.html
next: chabok-messaging.html
---

پس از طی کردن مراحل صفحه [پیش‌نیازها](https://doc.chabokpush.com/android/required.html)، می‌توانید **راه‌اندازی SDK چابک** را شروع کنید. در ابتدا باید [کتابخانه چابک](https://doc.chabokpush.com/android/sdk-setup.html#۱--نصب-کتابخانه) را نصب کنید و سپس برای فعالسازی پوش‌نوتیفیکیشن چابک بخش‌ [افزودن `GcmReceiver` به فایل `Manifest`](https://doc.chabokpush.com/android/sdk-setup.html#۲--افزودن-کلاس--gcmreceiver-به-فایل-manifest) را مطالعه کرده و همانند مستندات بیان شده پیش بروید. در انتها، [مقداردهی و راه‌اندازی](https://doc.chabokpush.com/android/sdk-setup.html#%DB%B3--%D9%85%D9%82%D8%AF%D8%A7%D8%B1%D8%AF%D9%87%DB%8C-%D8%A7%D9%88%D9%84%DB%8C%D9%87-%D9%88-%D8%B4%D8%B1%D9%88%D8%B9-initialize) کتابخانه چابک را در اپلیکیشنتان انجام نمایید.

برای انجام موفق این کار باید تمام مراحل زیر را به ترتیب انجام دهید:

[ ۱- نصب کتابخانه](sdk-setup.html#۱--نصب-کتابخانه)

[۲- افزودن `GcmReceiver` به فایل `Manifest`](https://doc.chabokpush.com/android/sdk-setup.html#۲--افزودن-کلاس--gcmreceiver-به-فایل-manifest)

[۳- مقداردهی اولیه](https://doc.chabokpush.com/android/sdk-setup.html#%DB%B3--%D9%85%D9%82%D8%AF%D8%A7%D8%B1%D8%AF%D9%87%DB%8C-%D8%A7%D9%88%D9%84%DB%8C%D9%87-%D9%88-%D8%B4%D8%B1%D9%88%D8%B9-initialize)

[ ۴- ثبت کاربر](۴#https://doc.chabokpush.com/android/sdk-setup.html#ثبت-کاربر-register)


<Br>

### ۱- نصب کتابخانه

کتابخانه چابک از طریق `jcenter` در دسترس است. برای این منظور ابتدا در فایل `gradle` اصلی پروژه، `jcenter` را بعنوان `repository` مطابق قطعه کد زیر اضافه نمایید:

```javascript
buildscript {
  repositories {
    jcenter()
  }
}  
```
در این قسمت شما باید *کتابخانه استاندارد* **یا** *کتابخانه با قابلیت مکان‌یابی* را نصب نمایید. برای استفاده از **سرویس پیام‌رسانی** و **قابلیت‌های آنی چابک** می‌توانید از [کتابخانه استاندارد](https://doc.chabokpush.com/android/sdk-setup.html#نصب-کتابخانه-استاندارد-چابک) بهره ببرید. اما در صورتی که می‌خواهید این‌ها را همراه با قابلیت مکان‌یابی داشته باشید باید از [کتابخانه با قابلیت مکان‌یابی](https://doc.chabokpush.com/android/sdk-setup.html#نصب-کتابخانه-با-قابلیت-مکانیابی-چابک) استفاده کنید. دقت کنید که هر دو کتابخانه **همزمان نمی‌توانند کار کنند** و شما باید فقط از یکی از آن‌ها متناسب با نیاز خود استفاده کنید.

#### نصب کتابخانه استاندارد چابک

برای استفاده از کتابخانه چابک **بدون نیاز به قابلیت مکان‌یابی** (استاندارد) از کتابخانه `chabok-lib` که در زیر به آن اشاره‌ شده است، استفاده کنید. 
فایل `build.gradle` در مسیر `app` را باز کرده و در بخش `dependencies` خط زیر را اضافه نمایید:

```javascript
dependencies {
    compile 'me.leolin:ShortcutBadger:1.1.22@aar'
    compile 'com.adpdigital.push:chabok-lib:VERSION'

    //If you want to get the push notification, add to dependencies
    compile 'com.google.android.gms:play-services-gcm:10.2.6' 
}
```
#### نصب کتابخانه با قابلیت مکان‌یابی چابک

درصورتی که در برنامه خود نیاز به استفاده از موقعیت مکانی کاربر دارید، لازم است در ابتدا کتابخانه `chabok-lib` را **حذف** و کتابخانه `chabok-lib-geo` را **جایگزین کنید**. 
 باتوجه به اینکه در این کتابخانه از سرویس فیوز گوگل استفاده شده است باید  تغییرات زیر نیز در قسمت ‌‌‌`dependencies` اعمال شود:
 
 ```javascript
dependencies {
   compile 'me.leolin:ShortcutBadger:1.1.22@aar'
   compile 'com.adpdigital.push:chabok-lib-geo:VERSION'
   compile 'com.google.android.gms:play-services-location:10.2.6'

  //If you want to get the push notification, add to dependencies
   compile 'com.google.android.gms:play-services-gcm:10.2.6'
}  
```

#### نکات ضروری نصب کتابخانه

- برای استفاده از **سرویس GCM گوگل** (پوش‌نوتیفیکیشن) لازم است `play-services-gcm` را همانند بالا (خط آخر هر دو کتابخانه) در بخش `dependencies`  اضافه شود.

- دقت داشته باشید که همیشه از جدیدترین نسخه **ShortcutBadger** استفاده کنید. برای اطلاع از آخرین نسخه می‌توانید به [این لینک](https://github.com/leolin310148/ShortcutBadger) مراجعه نمایید. همچنین با توجه به حجم زیاد مجوزهای نمایش نشان (**Badge**) روی آیکون اپ،‌ می‌توانید از [این قسمت](https://doc.chabokpush.com/android/features.html#برداشتن-مجوزهای-غیر-ضروری-برای-نمایش-نشان-badge-روی-آیکون) هر کدام از آن‌ها را با اختیار خودتان بردارید. 

- آخرین نسخه فایل کتابخانه چابک از [اینجا](https://bintray.com/bintray/jcenter?filterByPkgName=com.adpdigital.push) قابل دسترس می‌باشد. در انتها گزینه سینک را بزنید. چابک این روش را پیشنهاد نمی‌کند.


-  به علت محدودیت‌‌های **اندروید ۸ به بالا** دقت کنید حتما مطابق جدول زیر تنظیمات نسخه‌ها را بدرستی انجام دهید. در صورت رعایت نکردن نسخه‌های ذکر شده در جدول زیر هنگامی که اپلیکیشنتان **kill** شده باشد به هنگام دریافت نوتیفیکیشن با خطا مواجه خواهد شد.

<table dir="ltr">
    <thead>
    <tr align="center">
        <th>buildTools</th>
        <th>compileSdk</th>
        <th>targetSdk</th>
        <th>googlePlayServices</th>
    </tr>
    </thead>
    <tbody>
    <tr align="center">
        <td>25.x.x</td>
        <td>25</td>
        <td>&gt;= 23</td>
        <td>&gt;= 9.6.0</td>
    </tr>
    <tr align="center">
        <td>26.x.x</td>
        <td>26</td>
        <td>&gt;= 23</td>
        <td>&gt;= 9.6.0</td>
    </tr>
    <tr align="center">
        <td>27.x.x</td>
        <td>27</td>
        <td>&gt;= 23</td>
        <td>&gt;= 10.2.1</td>
    </tr>
    </tbody>
</table>

* توجه داشته باشید که برای `VERSION` آخرین نسخه کتابخانه را از [این صفحه](https://doc.chabokpush.com/android/release-note.html) مشاهده کنید و سپس آن را وارد نمایید، همچنین توصیه می‌شود بخش [مدل نسخه‌گذاری در چابک]() را مطالعه نمایید.

#### مدل نسخه‌گذاری در چابک (Semantic Versioning)

چابک از مدل نسخه‌گذاری `MAJOR`.`MINOR`.`PATCH` استفاده می‌کند. همه تغییرات نسخه‌ها بلافاصله پس از انتشارشان به صورت موردی در صفحه **لیست  تغییرات** برای اطلاع شما اضافه می‌شوند. برای همین توصیه می‌کنیم [این صفحه](https://doc.chabokpush.com/android/release-note.html) را حتما مطالعه نمایید. این موارد برای هر نسخه در دو بخش [**ارتقا**](https://doc.chabokpush.com/android/release-note.html#%D8%A7%D8%B1%D8%AA%D9%82%D8%A7) و [**تغییرات**](https://doc.chabokpush.com/android/release-note.html#%D8%AA%D8%BA%DB%8C%DB%8C%D8%B1%D8%A7%D8%AA) برای شما نمایش داده شده‌ است.

- `Patch:` تغییرات در این سطح شامل **Bug Fix** و **قابلیت‌های بسیار کوچک** می‌باشد. به روز رسانی به این نسخه‌ها نیاز به تغییری در کد ندارد. برای آگاهی از آن‌ها، باید بخش [**تغییرات**](https://doc.chabokpush.com/android/release-note.html#%D8%AA%D8%BA%DB%8C%DB%8C%D8%B1%D8%A7%D8%AA) را مطالعه کنید. به عنوان مثال به‌ روز رسانی کتابخانه چابک از نسخه `2.13.0` به نسخه `2.13.2` مربوط به این سطح می‌شود.

- `Minor:` تغییرات در این سطح شامل **قابلیت‌های بزرگتر** و **تغییر در کارکرد (Functionality) کتابخانه** می‌شود. در به روز رسانی به این نسخه‌ها حتما باید بخش [**ارتقا**](https://doc.chabokpush.com/android/release-note.html#%D8%A7%D8%B1%D8%AA%D9%82%D8%A7) و [تغییرات](https://doc.chabokpush.com/android/release-note.html#%D8%AA%D8%BA%DB%8C%DB%8C%D8%B1%D8%A7%D8%AA) صفحه لیست تغییرات را با دقت مطالعه کنید. در صورت بروز هر گونه مشکل در نتیجه رعایت نکردن نکات بخش **ارتقا** و **تغییرات** در به روز رسانی به نسخه‌های **Minor**، تیم چابک مسئولیتی را نمی‌پذیرد. توصیه می‌کنیم که هر سه تا شش ماه اقدام به بررسی نسخه‌های **Minor** نمایید. به عنوان مثال به‌ روز رسانی کتابخانه چابک از نسخه `2.12.1` به نسخه `2.13.2` مربوط به این سطح می‌شود.

- `Major:` این سطح از تغییرات مخصوص **بازنویسی** و یا **تغییرات اساسی** در کتابخانه چابک است. در به روز رسانی به این نسخه‌ها حتما باید بخش [**ارتقا**](https://doc.chabokpush.com/android/release-note.html#%D8%A7%D8%B1%D8%AA%D9%82%D8%A7) و [**تغییرات**](https://doc.chabokpush.com/android/release-note.html#%D8%AA%D8%BA%DB%8C%DB%8C%D8%B1%D8%A7%D8%AA) تغییرات صفحه لیست تغییرات را با دقت مطالعه کنید. در صورت بروز هر گونه مشکل در نتیجه رعایت نکردن نکات بخش **ارتقا** و **تغییرات** در به روز رسانی به نسخه‌های **Major**، تیم چابک مسئولیتی را نمی‌پذیرد. بنابراین توصیه می‌کنیم که هر یک سال اقدام به بررسی نسخه‌های **Major** نمایید. به عنوان مثال به‌روزرسانی کتابخانه چابک از نسخه `1.0.1` به نسخه `2.13.2` مربوط به این سطح می‌شود.

> `نکته:` در مدل `Patch` شما می‌توانید از کاراکتر + (Wildcard) استفاده کنید و به آسانی از تغییرات آن بهره‌مند شوید.

<Br>

### ۲- افزودن کلاس  `GcmReceiver` به فایل `Manifest`

برای دریافت پوش‌نوتیفیکیشن باید `GcmReceiver` را در کلاس `Application` به فایل `AndroidManifest.xml` تا بتوانید نوتیفیکیشن‌هایی که از طریق سرور‌های گوگل ارسال می شوند را نیز دریافت کنید.

```markup
<application
    android:name=".YOUR_APPLICATION_CLASS_NAME"
    ... >
	
	...
    <receiver
        android:name="com.google.android.gms.gcm.GcmReceiver"
        android:enabled="true"
        android:exported="true"
        android:permission="com.google.android.c2dm.permission.SEND">
        <intent-filter>
            <action android:name="com.google.android.c2dm.intent.RECEIVE" />
            <action android:name="com.google.android.c2dm.intent.REGISTRATION" />
            <category android:name="YOUR_APPLICATION_PACKAGE_ID" />
        </intent-filter>
    </receiver>
	
</application>
```

در صورتی که برنامه شما کلاس `Application` ندارد با استفاده از راهنمای ارائه شده در این [پست](https://www.mobomo.com/2011/05/how-to-use-application-object-of-android/)، آن را ایجاد کنید.


> `نکته`: با توجه به حجم زیاد مجوزهای نمایش نشان (**Badge**) روی آیکون اپ،‌ می‌توانید از [این قسمت](https://doc.chabokpush.com/android/features.html#برداشتن-مجوزهای-غیر-ضروری-برای-نمایش-نشان-badge-روی-آیکون) هر کدام از آن‌ها را با اختیار خودتان بردارید. 

<Br>

### ۳- مقداردهی اولیه (Initialize)

چابک برای راه‌اندازی نیاز به مقداردهی اولیه دارد تا بتواند توسط متد `Register` به سرور خود متصل شود و توکن‌های پوش‌نوتیفیکیشن را به سرور خود ارسال کند. متد `init` چابک باید در کلاس `Application` در متد `onCreate` تحت هر شرایطی فراخوانی شود.

<Br>

```java
public class YourAppClass extends Application {

    @Override
    public void onCreate() {
        super.onCreate();

        //AdpPushClient.init() should always be called in onCreate of Application class
    //These four keys (YOUR_APP_ID/SENDER_ID, YOUR_API_KEY, SDK_USERNAME, SDK_PASSWORD) are different for each environment.
        AdpPushClient.init(
                getApplicationContext(),
                YOUR_ACTIVITY.class,
                "YOUR_APP_ID/SENDER_ID",
                "YOUR_API_KEY",
                "SDK_USERNAME",
                "SDK_PASSWORD"
        );

        //true connects to Sandbox environment
        //false connects to Production environment
        AdpPushClient.get().setDevelopment(DEV_MODE);
    }
    
    @Override
    public void onTerminate() {
        if (AdpPushClient.get() != null)
            AdpPushClient.get().dismiss();

        super.onTerminate();
    }
}
```

در این متد به جای پارامتر‌های `YOUR_APP_ID/SENDER_ID`, `YOUR_API_KEY(SDK_KEY)`, `SDK_USERNAME`, `SDK_PASSWORD` مقادیر مربوط به حساب چابک خود را وارد نمایید. نحوه ایجاد حساب در بخش [پیش‌نیازها](https://doc.chabokpush.com/android/required.html) توضیح داده شده است. در صورت داشتن حساب چابک هم می‌توانید این مقادیر را از [**پنل بخش تنظیمات قسمت دسترسی‌ و توکن‌ها**](https://doc.chabokpush.com/panel/settings.html#%D8%AF%D8%B3%D8%AA%D8%B1%D8%B3%DB%8C%D9%87%D8%A7-%D9%88-%D8%AA%D9%88%DA%A9%D9%86%D9%87%D8%A7) بردارید.

مقدار `YOUR_MAIN_ACTIVITY_CLASS` را نام کلاس `Activity`ای قرار دهید که چابک به طور پیش‌فرض پس از کلیک شدن روی اعلان، `Activity `تعیین شده را باز کند. (برای شخصی‌سازی اعلان‌ها این بخش را مشاهده کنید.)

> `نکته`: مقدار `SENDER_ID` در پارامتر `YOUR_APP_ID/SENDER_ID` همان **شناسه گوگل** برای *دریافت پوش‌نوتیفیکیشن* می‌باشد که در پنل در بخش [تنظیمات پلتفرم اندروید](https://dev.doc.chabokpush.com/panel/settings.html#%D9%BE%D9%84%D8%AA%D9%81%D8%B1%D9%85%D9%87%D8%A7) قرار داده‌اید و `YOUR_APP_ID` همان `APP_ID‌`ای که در پنل در بخش [دسترسی و توکن‌ها](https://dev.doc.chabokpush.com/panel/settings.html#%D8%AF%D8%B3%D8%AA%D8%B1%D8%B3%DB%8C%D9%87%D8%A7-%D9%88-%D8%AA%D9%88%DA%A9%D9%86%D9%87%D8%A7) قرار داده شده است، می‌باشد.

> `نکته`:  توجه داشته باشید متد `AdpPushClient.init` تحت هر شرایط **حتما** باید در کلاس `Application` و در متد `onCreate` فراخوانی شود. متد فوق برای مقداردهی پارامتر‌های ضروری چابک می‌باشد و در صورت عدم فراخوانی آن در حالت **Kill** بودن اپلیکیشن با خطا مواجه خواهید شد.

متد `setDevelopment` تعیین می‌کند که اپلیکیشن شما به محیط [آزمایشی (Sandbox)](https://sandbox.push.adpdigital.com)  یا [عملیاتی (Production) ](https://panel.push.adpdigital.com) چابک متصل شود. این موضوع بستگی به این دارد که حساب کاربری شما روی کدام محیط تعریف شده باشد.
مقدار `true` به محیط آزمایشی و  مقدار`false` به محیط عملیاتی متصل می‌شود. در نظر داشته باشید، هر محیط به کلیدهای دسترسی (AppId, APIKey, Username و Password) خودش در متد `init` نیاز دارد. بنابراین در صورت تغییر مقدار `setDevelopment` کلید‌های دسترسی آن هم باید تغییر داده شود.

```java
AdpPushClient.get().setDevelopment(DEV_MODE);
```

> `نکته`: برای *درخواست* حساب محیط **عملیاتی**، در بخش تنظیمات پنل، وارد بخش [**درخواست حساب عملیاتی**](/panel/settings.html#%D8%AF%D8%B1%D8%AE%D9%88%D8%A7%D8%B3%D8%AA-%D8%AD%D8%B3%D8%A7%D8%A8-%D8%B9%D9%85%D9%84%DB%8C%D8%A7%D8%AA%DB%8C) شوید و درخواست خود را ثبت نمایید تا پس از تایید و ساخت حساب عملیاتی شما، اطلاعات جدید حسابتان (AppId, APIKey, Username و Password) تعیین گردد. 

در متد `onTerminate` کلاس `Application` که در واقع آخرین فراخوانی در چرخه حیات این کلاس است، متد `dismiss` از کلاینت چابک را فراخوانی نمایید تا منابع در اختیار آزاد شوند. واضح است بعد از فراخوانی این متد دیگر نمی‌توان از نمونه جاری کلاینت استفاده کرد و باید دوباره نمونه‌سازی کنید.

```java
AdpPushClient.get().dismiss();
```

### ۴- ثبت کاربر (Register)

چابک هر کاربر را با یک **شناسه منحصر به فرد** (`UserId`) ثبت می‌کند. هر شناسه می‌تواند برای دستگاه‌های متعددی به کار برده شود. شناسه کاربر می‌تواند *هر فیلد با ارزش و معنا‌دار* برای کسب و کار شما باشد که کاربر خود را با آن شناسایی می‌کنید. **شماره موبایل**، **کدملی**، **شماره‌حساب**، **ایمیل** و یا حتی یک **کد UUID** مثال‌هایی از شناسه‌های کاربری مناسب در موارد واقعی هستند. ارسال پیام‌ به کاربران توسط همین شناسه‌ها و بدون استفاده از توکن یا شناسه گوشی، به سادگی امکان پذیر خواهد بود. متد `register` عمل **اتصال** به سرور چابک را انجام می‌دهد، بنابراین باید فقط یک بار در طول اجرا اپلیکیشن فراخوانی شود. 
این متد با دو امضای متفاوت وجود دارد:

* امضای اول تنها شناسه کاربر را گرفته و کاربر را با آن شناسه روی سرور چابک ثبت نام می‌کند.

```java
AdpPushClient.get().register("USER_ID");
```

به عنوان مثال اگر اپلیکیشن شما دارای صفحه **ورود** و **ثبت‌نام** می‌باشد، متد `register` را در صفحه **ورود** یا **ثبت‌نام** پس از *احراز هویت کاربر* فراخوانی کنید و همچنین، این متد را پس از هر بار اجرای (در کلاس `Application` متد `onCreate`) اپلیکیشن فراخوانی کنید تا کاربر به سرور چابک متصل شود.

```java
@Override
public void onCreate() {
    super.onCreate();

    ...
    
    String userId = AdpPushClient.get().getUserId();
    
    if (userId != null && !userId.isEmpty()) {
        AdpPushClient.get().register(userId);
    } else {

        //If user is not registered verify the user and
        //call AdpPushClient.get().register("USER_ID") method at login page
        AdpPushClient.get().register("USER_ID");
    }
}
```
* امضای دوم علاوه بر شناسه کاربر، لیستی از نام‌ کانال‌هایی که کاربر باید روی آن‌ها عضو شود را نیز دریافت می کند. با عضویت روی کانال‌های داده شده، کاربر قادر به دریافت پیام‌های ارسالی روی آن‌ کانال‌ها خواهد بود.

```java
chabok.register("USER_ID", new String[]{"CHANNEL_NAME1", "CHANNEL_NAME2", ...});
```

> `نکته`: کاراکترهای ‍`#,+,*,\,/` و فاصله در `USER_ID` مجاز نیستند، همچنین طول این رشته نباید کمتر از ۳ و بیشتر از ۳۲ کاراکتر باشد.

> `نکته امنیتی`: مقدار `USER_ID` را هرگز به صورت خام در `SharedPreferences`
> ذخیره نکنید، چون این مقدار شناسه معنادار می‌باشد و می‌توان با آن کاربر
> را روی چابک ثبت‌نام کرد. برای این منظور می‌توانید از متد `getUserId`
> چابک استفاده کنید که شناسه کاربر را به صورت رمزنگاری شده نگه‌می‌دارد.

اگر عملیات ثبت‌نام به درستی انجام شده باشد، پس از فراخوانی متد `register`،
اطلاعات کاربر در **پنل**  چابک مربوط به [حساب](https://sandbox.push.adpdigital.com/front/users/subscribers/list)
 برنامه، در قسمت **مشترکین**، قابل مشاهده خواهد بود و شما می‌توانید از پنل برای کاربر **پیام** ارسال کنید.

##### تایید ثبت کاربر
برای اطمینان از ثبت شدن کاربر در چابک، می‌توانید از متد `isRegistered` یا رویداد `AppState` استفاده کنید. 

```java
AdpPushClient.get().isRegistered();
```
با رویداد `AppState` می‌توانید در [این بخش](https://doc.chabokpush.com/android/features.html#دریافت-وضعیت-برنامه) جزئیات بیشتری از کاربرتان را مشاهده کنید.
```java
public void onEvent(AppState state) {
    if (state == AppState.REGISTERED) {
        //User successfully registered.
        Log.d(TAG, "User successfully registered.");
    } else {
        Log.d(TAG, "onEvent: The app state is " + state);
    }
}
```

#### حذف کاربر (Unregister)
برای حذف دستگاه کاربر از سرور چابک می‌توانید از متد `unregister` استفاده کنید. توصیه می‌شود این متد را زمانی که کاربر در اپلیکیشنتان از حساب خود خارج می‌شود (**Logout**) فراخوانی کنید، این امر باعث می‌شود تا کاربر از حفظ شدن حریم شخصی خود پس از خروج اطمینان یابد. پس از آن هم کاربر را به عنوان یک کاربر مهمان `register` کنید تا همچنان با او تعامل داشته باشید.

```java
AdpPushClient.get().unregister();
```

>`نکته:`  تمامی مراحلی که در این راهنما بیان شده، در یک پروژه [starter](https://github.com/chabokpush/chabok-starter-android) پیاده‌سازی شده است.
