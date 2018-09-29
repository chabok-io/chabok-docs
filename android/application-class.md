---
id: application-class
title: راه‌اندازی چابک
layout: android
permalink: android/application-class.html
prev: gradle-setup.html
next: rich_notification.html
---

### ۱. تغییرات لازم در فایل manifest

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


### ۲. تعریف رسیور `GcmReceiver`

رسیور `GcmReceiver` را به ترتیب زیر تعریف کنید تا بتوانید نوتیفیکیشن‌هایی که از طریق سرور‌های گوگل ارسال می شوند را نیز دریافت کنید.

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

### ۳. مقداردهی اولیه
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
