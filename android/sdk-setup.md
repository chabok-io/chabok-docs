---
id: sdk-setup
title: راه‌اندازی SDK
layout: android
permalink: android/sdk-setup.html
prev: required.html
next: chabok-messaging.html
---

پس از انجام مراحل صفحه [پیش‌نیازها](https://doc.chabokpush.com/android/required.html)، **راه‌اندازی SDK چابک** را شروع خواهیم کرد.
برای انجام موفق این کار باید تمام مراحل زیر را به ترتیب انجام دهید:

[۱- نصب کتابخانه](https://doc.chabokpush.com/android/sdk-setup.html#%DB%B1--%D9%86%D8%B5%D8%A8-%DA%A9%D8%AA%D8%A7%D8%A8%D8%AE%D8%A7%D9%86%D9%87)

[۲- تغییرات فایل `Manifest`]()

[۳- افزودن رسیور GCM]()

[۴- مقداردهی و شروع]()

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
در این قسمت شما باید کتابخانه استاندارد **یا** کتابخانه با قابلیت مکان‌یابی را نصب نمایید. برای استفاده از سرویس پیام‌رسانی و قابلیت‌های آنی چابک می‌توانید از کتابخانه استاندارد بهره ببرید. اما در صورتی که می‌خواهید این‌ها را با قابلیت مکان‌یابی داشته باشید باید از کتابخانه با قابلیت مکان‌یابی استفاده کنید. شما می‌توانید متناسب با نیاز خودتان از **یکی** آن‌ها استفاده کنید.

#### نصب کتابخانه استاندارد چابک

برای استفاده از کتابخانه چابک **بدون نیاز به قابلیت مکان‌یابی** (استاندارد) از کتابخانه `chabok-lib` که در زیر به آن اشاره‌شده است، استفاده کنید. 
فایل `build.gradle` در مسیر app را باز کرده و در بخش `dependencies` خط زیر را اضافه نمایید:

```javascript
dependencies {
    compile 'me.leolin:ShortcutBadger:1.1.22@aar'
    compile 'com.adpdigital.push:chabok-lib:VERSION'
}
```

> `نکته:` دقت داشته باشید که همیشه از جدیدترین نسخه **ShortcutBadger** استفاده کنید. برای اطلاع از آخرین نسخه می‌توانید به [این لینک](https://github.com/leolin310148/ShortcutBadger) مراجعه نمایید. همچنین با توجه به حجم زیاد مجوزهای نمایش نشان (**Badge**) روی آیکون اپ،‌ می‌توانید از [این قسمت](https://doc.chabokpush.com/android/features.html#برداشتن-مجوزهای-غیر-ضروری-برای-نمایش-نشان-badge-روی-آیکون) هر کدام از آن‌ها را با اختیار خودتان بردارید. 

> `نکته:` توجه داشته باشید که برای `VERSION` آخرین نسخه کتابخانه را از [این صفحه](https://doc.chabokpush.com/android/release-note.html) مشاهده کنید و سپس آن را وارد نمایید. 

### مدل نسخه‌گذاری در چابک (Semantic Versioning)

چابک از مدل نسخه‌گذاری `MAJOR`.`MINOR`.`PATCH` استفاده می‌کند. همه تغییرات نسخه‌ها بلافاصله پس از انتشارشان به صورت موردی در صفحه **لیست  تغییرات** برای اطلاع شما اضافه می‌شوند. برای همین توصیه می‌کنیم [این صفحه](https://doc.chabokpush.com/android/release-note.html) را حتما مطالعه نمایید. این موارد برای هر نسخه در دو بخش [**ارتقا**](https://doc.chabokpush.com/android/release-note.html#%D8%A7%D8%B1%D8%AA%D9%82%D8%A7) و [**تغییرات**](https://doc.chabokpush.com/android/release-note.html#%D8%AA%D8%BA%DB%8C%DB%8C%D8%B1%D8%A7%D8%AA) برای شما نمایش داده شده‌ است.

- `Patch:` تغییرات در این سطح شامل **Bug Fix** و **قابلیت‌های بسیار کوچک** می‌باشد. به روز رسانی به این نسخه‌ها نیاز به تغییری در کد ندارد. برای آگاهی از آن‌ها، باید بخش [**تغییرات**](https://doc.chabokpush.com/android/release-note.html#%D8%AA%D8%BA%DB%8C%DB%8C%D8%B1%D8%A7%D8%AA) را مطالعه کنید. به عنوان مثال به‌ روز رسانی کتابخانه چابک از نسخه `2.13.0` به نسخه `2.13.2` مربوط به این سطح می‌شود.

- `Minor:` تغییرات در این سطح شامل **قابلیت‌های بزرگتر** و **تغییر در کارکرد (Functionality) کتابخانه** می‌شود. در به روز رسانی به این نسخه‌ها حتما باید بخش [**ارتقا**](https://doc.chabokpush.com/android/release-note.html#%D8%A7%D8%B1%D8%AA%D9%82%D8%A7) و [تغییرات](https://doc.chabokpush.com/android/release-note.html#%D8%AA%D8%BA%DB%8C%DB%8C%D8%B1%D8%A7%D8%AA) صفحه لیست تغییرات را با دقت مطالعه کنید. در صورت بروز هر گونه مشکل در نتیجه رعایت نکردن نکات بخش **ارتقا** و **تغییرات** در به روز رسانی به نسخه‌های **Minor**، تیم چابک مسئولیتی را نمی‌پذیرد. توصیه می‌کنیم که هر سه تا شش ماه اقدام به بررسی نسخه‌های **Minor** نمایید. به عنوان مثال به‌ روز رسانی کتابخانه چابک از نسخه `2.12.1` به نسخه `2.13.2` مربوط به این سطح می‌شود.

- `Major:` این سطح از تغییرات مخصوص **بازنویسی** و یا **تغییرات اساسی** در کتابخانه چابک است. در به روز رسانی به این نسخه‌ها حتما باید بخش [**ارتقا**](https://doc.chabokpush.com/android/release-note.html#%D8%A7%D8%B1%D8%AA%D9%82%D8%A7) و [**تغییرات**](https://doc.chabokpush.com/android/release-note.html#%D8%AA%D8%BA%DB%8C%DB%8C%D8%B1%D8%A7%D8%AA) تغییرات صفحه لیست تغییرات را با دقت مطالعه کنید. در صورت بروز هر گونه مشکل در نتیجه رعایت نکردن نکات بخش **ارتقا** و **تغییرات** در به روز رسانی به نسخه‌های **Major**، تیم چابک مسئولیتی را نمی‌پذیرد. بنابراین توصیه می‌کنیم که هر یک سال اقدام به بررسی نسخه‌های **Major** نمایید. به عنوان مثال به‌روزرسانی کتابخانه چابک از نسخه `1.0.1` به نسخه `2.13.2` مربوط به این سطح می‌شود.

> `نکته:` در مدل `Patch` شما می‌توانید از کاراکتر + (Wildcard) استفاده کنید و به آسانی از تغییرات آن بهره‌مند شوید.


آخرین نسخه فایل کتابخانه چابک از [اینجا](https://bintray.com/bintray/jcenter?filterByPkgName=com.adpdigital.push) قابل دسترس می‌باشد.
در انتها گزینه سینک را بزنید.

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

> `نکته :` به علت محدودیت‌‌های اندروید ۸ به بالا دقت کنید حتما مطابق جدول زیر تنظیمات نسخه‌ها را بدرستی انجام دهید.  در صورت رعایت نکردن نسخه‌های ذکر شده در جدول زیر هنگامی که اپلیکیشن **kill** شده باشد به هنگام دریافت نوتیفیکیشن با خطا مواجه خواهد شد.

> `نکته`: برای استفاده از سرویس GCM گوگل لازم است خط زیر نیز در بخش
> `dependencies`  اضافه شود:

```javascript
dependencies {
    compile "com.google.android.gms:play-services-gcm:10.2.6" 
}
```

#### نصب کتابخانه با قابلیت مکان‌یابی چابک

درصورتی که در برنامه خود نیاز به استفاده از موقعیت مکانی کاربر دارید، لازم است در ابتدا کتابخانه `chabok-lib` را **حذف** و کتابخانه `chabok-lib-geo` را **جایگزین کنید**. 
 باتوجه به اینکه در این کتابخانه از سرویس فیوز گوگل استفاده شده است باید  تغییرات زیر نیز در قسمت ‌‌‌`dependencies` اعمال شود:
 
 ```javascript
dependencies {
   compile 'com.google.android.gms:play-services-location:10.2.6'
   compile 'com.adpdigital.push:chabok-lib-geo:VERSION'
   compile 'me.leolin:ShortcutBadger:1.1.22@aar'
}  
```
### ۲- تغییرات لازم در فایل Manifest

کدهای زیر را به فایل `AndroidManifest.xml` پروژه اضافه کنید:

دربخش مجوز‌ها موارد زیر را اضافه کرده و نام کلاس `Application` خود را نیز بجای `YOUR_APPLICATION_CLASS_NAME` وارد کنید. عبارت `YOUR_APPLICATION_PACKAGE_ID` را با نام پکیج برنامه خود جایگزین کنید.

```markup

<manifest
    xmlns:android="http://schemas.android.com/apk/res/android"
    package="YOUR_APPLICATION_PACKAGE_ID">

    <permission
        android:name="YOUR_APPLICATION_PACKAGE_ID.permission.C2D_MESSAGE"
        android:protectionLevel="signature"/>

    <uses-permission android:name="YOUR_APPLICATION_PACKAGE_ID.permission.C2D_MESSAGE" />

    <application
        android:name=".YOUR_APPLICATION_CLASS_NAME"
        android:allowBackup="true"
        android:icon="@drawable/ic_launcher"
        android:label="@string/app_name"
        android:theme="@style/AppTheme">

...

    </application>

```

در صورتی که برنامه شما کلاس `Application` ندارد با استفاده از راهنمای ارائه شده در این [پست](https://www.mobomo.com/2011/05/how-to-use-application-object-of-android/)، آن را ایجاد کنید.


> `نکته`: با توجه به حجم زیاد مجوزهای نمایش نشان (**Badge**) روی آیکون اپ،‌ می‌توانید از [این قسمت](https://doc.chabokpush.com/android/features.html#برداشتن-مجوزهای-غیر-ضروری-برای-نمایش-نشان-badge-روی-آیکون) هر کدام از آن‌ها را با اختیار خودتان بردارید. 


### ۳- افزودن کلاس رسیور `GcmReceiver`

گیرنده `GcmReceiver` را به ترتیب زیر تعریف کنید تا بتوانید نوتیفیکیشن‌هایی که از طریق سرور‌های گوگل ارسال می شوند را نیز دریافت کنید.

```markup

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

```

### ۴- مقداردهی اولیه

برای دریافت یا ارسال پیام از/به سرور چابک، لازم است یک نمونه از کلاس `AdpPushClient` بسازید و آن را مقداردهی نمایید. یکی از بهترین روش‌ها برای ساختن کلاینت چابک استفاده از کلاس اپلیکیشن پروژه شماست. برای این منظور در متد `onCreate` کلاس `Application` کدهای زیر را اضافه کنید.

```java

private AdpPushClient chabok = AdpPushClient.init(
    getApplicationContext(),
    YOUR_MAIN_ACTIVITY_CLASS.class,
    "YOUR_APP_ID",
    "YOUR_API_KEY(SDK_KEY)",
    "SDK_USERNAME",
    "SDK_PASSWORD"
); 

```

#### پارامترها

با استفاده از متد `init` یک نمونه از `AdpPushClient` مقداردهی اولیه می شود. در این متد بجای پارامتر‌های `YOUR_APP_ID`, `YOUR_API_KEY(SDK_KEY)`, `SDK_USERNAME`, `SDK_PASSWORD` مقادیر مربوط به حساب چابک خود را وارد نمایید. نحوه ایجاد حساب در بخش [پیش‌نیازها](required.html) توضیح داده شده است. در صورت داشتن حساب چابک هم می‌توانید این مقادیر را از [**پنل بخش تنظیمات قسمت دسترسی‌ و توکن‌ها**](https://doc.chabokpush.com/panel/settings.html#%D8%AF%D8%B3%D8%AA%D8%B1%D8%B3%DB%8C%D9%87%D8%A7-%D9%88-%D8%AA%D9%88%DA%A9%D9%86%D9%87%D8%A7) بردارید.

> `نکته`: ترکیب `APP_ID/SENDERID` به عنوان `YOUR_APP_ID` مورد استفاده قرار می‌گیرد.

در کد زیر متد `initPushClient` برای نمونه‌گیری و تنظیمات مربوط به `AdpPushClient` تعریف شده است، شما کافی‌ست به جای `YOUR_MAIN_ACTIVITY_CLASS` نام اکتیویتی اصلی (چابک به طور پیش‌فرض بعد از کلیک شدن روی نوتیفیکیشن، این اکتیویتی را باز می‌کند) خود را قرار دهید.
> `نکته`:  توجه داشته باشید متد `AdpPushClient.init` تحت هر شرایط **حتما** باید در کلاس `Application` و در متد `onCreate` فراخوانی شود. متد فوق برای مقداردهی پارامتر‌های ضروری چابک می‌باشد و در صورت عدم فراخوانی آن در حالت **Kill** بودن اپلیکیشن با خطا مواجه خواهید شد.

```java

public class YourAppClass extends Application {

private AdpPushClient chabok = null;

    @Override
    public void onCreate() {
        super.onCreate();
        initPushClient();

        String userId = chabok.getUserId();
        if (userId != null && !userId.isEmpty()) {
            chabok.register(userId);
        }
    }

    private synchronized void initPushClient() {
        if (chabok == null) {
            chabok = AdpPushClient.init(
                getApplicationContext(),
                YOUR_MAIN_ACTIVITY_CLASS.class,
                "YOUR_APP_ID",
                "YOUR_API_KEY",
                "SDK_USERNAME",
                "SDK_PASSWORD"
                );
            chabok.setDevelopment("DEV_MODE");
        }
    }
    
    @Override
    public void onTerminate() {
        if (chabok != null)
            chabok.dismiss();

        super.onTerminate();
    }
}

```

### توضیح متدها

#### ۱- متد `setDevelopment` 

مشخص می‌کند که برنامه به محیط [تستی](https://sandbox.push.adpdigital.com) چابک متصل شود یا به محیط [عملیاتی](https://panel.push.adpdigital.com). این موضوع بستگی به این دارد که حساب کاربری شما روی کدام محیط تعریف شده باشد.


> `نکته ` : به طور کلی چابک شامل ۲ محیط سندباکس و عملیاتی می‌باشد. حساب‌های رایگان چابک بر روی محیط سندباکس و حساب‌های پریمیوم روی عملیاتی قرار می‌گیرند. مقدار `true` برای ‌`devMode` باعث اتصال به محیط سندباکس و مقدار `false` باعث اتصال به محیط عملیاتی ما می‌شود.

```java
chabok.setDevelopment("DEV_MODE");
```

> `نکته`:  مقدار پیش‌فرض  برابر `true` در نظر گرفته شده است. برای تغییر به محیط عملیاتی (`false`) باید از [**پنل بخش تنظیمات**](https://doc.chabokpush.com/panel/settings.html#%D8%AF%D8%B1%D8%AE%D9%88%D8%A7%D8%B3%D8%AA-%D8%AD%D8%B3%D8%A7%D8%A8-%D8%B9%D9%85%D9%84%DB%8C%D8%A7%D8%AA%DB%8C) درخواست خود را ثبت نمایید تا پس از تایید، اطلاعات جدید حسابتان (AppId, APIKey, Username و Password) تعیین گردد. 

#### ۲- متد `register`

با استفاده از این متد شما می‌توانید کاربر را با شناسه کاربری وی روی سرور چابک ثبت‌نام نمایید. شناسه کاربر می تواند هر فیلد با ارزش و معنا‌دار برای کسب و کار شما باشد که کاربر خود را با آن شناسایی می‌کنید. شماره موبایل، کدملی، شماره‌حساب، ایمیل  و یا حتی یک کد UUID مثال‌هایی از شناسه‌های کاربری مناسب در موارد واقعی هستند.  ارسال پیام‌ به کاربران توسط همین شناسه‌ها و بدون استفاده از توکن یا شناسه گوشی، به سادگی امکان پذیر خواهد بود.

این متد با دو امضای متفاوت وجود دارد:
امضای اول که تنها شناسه کاربر را گرفته و کاربر را با آن شناسه روی سرور چابک ثبت نام میکند.

```java
chabok.register("USER_ID");
```

کاراکترهای ‍`#,+,*,\,/` و فاصله در `USER_ID` مجاز نیستند، همچنین طول این رشته نباید کمتر از ۳ و بیشتر از ۳۲ کاراکتر باشد.

> `نکته`: هر بار که برنامه اجرا می‌شود لازم است این متد فراخوانی شود تا اتصال چابک برقرار گردد.


برای اعتبارسنجی شناسه کاربری می‌توانید از سرویس چابک که در بخش مربوط به [اعتبارسنجی](verification.html) توضیح داده شده، استفاده نمایید، در غیر این صورت مسئولیت احراز هویت شناسه کاربری به عهده برنامه شما به عنوان استفاده کننده از کتابخانه چابک می‌باشد.

اگر عملیات ثبت‌نام به درستی انجام شده باشد، پس از فراخوانی این متد،
اطلاعات کاربر در `پنل`  چابک مربوط به [حساب](http://chabokpush.com)
 برنامه، در قسمت `مشترکین`، قابل مشاهده خواهد بود و شما می‌توانید از پنل به
کاربر `مسیج` و `پوش ` بفرستید.


امضای دوم که علاوه بر شناسه کاربر، لیستی از نام‌ کانال‌هایی که کاربر باید روی آن‌ها عضو شود را نیز دریافت می کند. با ثبت نام در این کانال‌ها کاربر پیام‌های ارسالی روی آن‌ها را دریافت خواهد نمود.

```java
chabok.register("USER_ID", new String[]{"CHANNEL_NAME1", "CHANNEL_NAME2", ...});
```

> `نکته امنیتی`: مقدار `USER_ID` را هرگز به صورت خام در `SharedPreferences`
> ذخیره نکنید، چون این مقدار شناسه معنادار می‌باشد و می‌توان با آن کاربر
> را روی چابک ثبت‌نام کرد. برای این منظور می‌توانید از متد `getUserId`
> چابک استفاده کنید که شناسه کاربر را به صورت رمزنگاری شده نگه‌می‌دارد.

#### رویداد تایید ثبت کاربر

برای اینکه از ثبت شدن کاربرتان اطمینان یابید، می‌توانید از رویداد زیر استفاده کنید. علاوه بر آن، این رویداد داده‌هایی مانند **نصب** و **بازدید** را در اختیار شما قرار می‌دهد.

```java
 public void onEvent(AppState state){
        switch (state) {
            case REGISTERED:
                Log.d(TAG, "Registered");
                break;
            case INSTALL:
                Log.d(TAG, "Install");
                break;
            case LAUNCH:
                Log.d(TAG, "Launch");
                break;
            default:
                Log.d(TAG, "Protected grant needed");
        }
    }
```

#### ۳- متد `isRegistered`

به کاربر این امکان را می‌دهد که بررسی کند آیا عملیات ثبت‌نام انجام شده است یا خیر.


```java
chabok.isRegistered();
```

#### ۴- متد `unregister`

تمامی اطلاعات مربوط به کاربر جاری را حذف می‌نماید.


```java
chabok.unregister();
```

#### ۵- متد `dismiss`

در متد `onTerminate` کلاس اپلیکیشن (یا اگر بجای کلاس اپلیکیشن از یک اکتیویتی برای مدیریت کلاینت استفاده می کنید در متد `onDestroy`) که در واقع آخرین فراخوانی در چرخه حیات این کلاس است، متد `dismiss` از کلاینت چابک را فراخوانی نمایید تا منابع در اختیار آزاد شوند. واضح است بعد از فراخوانی این متد دیگر نمی توان از نمونه جاری کلاینت استفاده کرد و باید دوباره نمونه‌سازی کنید.

```java

@Override
public void onTerminate() {
    chabok.dismiss();
    super.onTerminate();
}

```

>`نکته:`  تمامی مراحلی که در این راهنما بیان شده، در یک پروژه [starter](https://github.com/chabokpush/chabok-starter-android) پیاده‌سازی شده است.
