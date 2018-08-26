---
id: application-class
title: راه‌اندازی چابک
layout: android
permalink: android/application-class.html
prev: gradle-setup.html
next: rich_notification.html
---

### تغییرات لازم در فایل manifest

۱. کدهای زیر را به فایل `AndroidManifest.xml` پروژه اضافه کنید:

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

۲.  کلاس رسیور `PushMessageReceiver`  که نحوه ایجاد آن در بخش [پیام چابک](chabok-messaging.html) توضیح داده شده را نیز به پروژه خود اضافه نمایید.

> `نکته`:  دقت کنید که کلاس `PushMessageReceiver` برای **BuildTools ۲۶ به بالا** برداشته شده‌است، در آن صورت باید از متد `addListener` برای دریافت پیام‌ها استفاده کنید و دیگر نیازی به اضافه نمودن قطعه کد زیر ندارید.


```markup

<receiver android:name="PushMessageReceiver">
    <intent-filter>
        <category android:name="YOUR_APPLICATION_PACKAGE_ID"/>
        <action android:name="com.adpdigital.push.client.MSGRECEIVE"/>
    </intent-filter>
</receiver>

```

۳. رسیور `GcmReceiver` را به ترتیب زیر تعریف کنید تا بتوانید نوتیفیکیشن‌هایی که از طریق سرور‌های گوگل ارسال می شوند را نیز دریافت کنید.

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

### مقداردهی اولیه
برای دریافت یا ارسال پیام از/به سرور چابک، لازم است یک نمونه از کلاس `AdpPushClient` بسازید و آن را مقداردهی نمایید. یکی از بهترین روش‌ها برای ساختن کلاینت چابک استفاده از کلاس اپلیکیشن پروژه شماست. برای این منظور در متد `onCreate` کلاس `Application` کدهای زیر را اضافه کنید.

```java

private AdpPushClient chabok = AdpPushClient.init(
    getApplicationContext(),
    YOUR_MAIN_ACTIVITY_CLASS.class,
    "YOUR_APP_ID",
    "YOUR_API_KEY",
    "SDK_USERNAME",
    "SDK_PASSWORD"
); 

```

#### پارامترها

با استفاده از متد `init` یک نمونه از `AdpPushClient` مقدار دهی اولیه می شود. در این متد بجای پارامتر‌های `YOUR_APP_ID`, `YOUR_API_KEY`, `SDK_USERNAME`, `SDK_PASSWORD` مقادیر مربوط به حساب چابک خود را وارد نمایید. نحوه ایجاد حساب در بخش [پیش‌نیازها](required.html) توضیح داده شده است.

> `نکته`: ترکیب `APP_ID/SENDERID` به عنوان `YOUR_APP_ID` مورد استفاده قرار می‌گیرد.

به عنوان مثال به کد زیر توجه کنید که همیشه یک سینگلتن از کلاس `AdpPushClient` را مدیریت می‌کند. 
در کد زیر متد `getPushClient` برای نمونه گیری و تنظیمات مربوط به `AdpPushClient` تعریف شده است، شما کافیست بجای `YOUR_MAIN_ACTIVITY_CLASS` نام اکتیویتی اصلی (چابک به طور پیش‌فرض بعد از کلیک شدن روی نوتیفیکیشن، این اکتیویتی را باز می‌کند) خود را قرار دهید.


```java

public class YourAppClass extends Application {

private AdpPushClient chabok = null;

    @Override
    public void onCreate() {
        super.onCreate();
        initPushClient();
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
            chabok.register("USER_ID");
        }
    }
    
    public synchronized AdpPushClient getPushClient() throws IllegalStateException {
        if (chabok == null) {
            throw new IllegalStateException("Adp Push Client not initialized");
        }
        return chabok;
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

> `نکته`:  مقدار پیش‌فرض  برابر `true` در نظر گرفته شده است.


> `نکته ` : به طور کلی چابک شامل ۲ محیط سندباکس و عملیاتی می‌باشد. حساب‌های رایگان چابک بر روی محیط سندباکس و حساب‌های پریمیوم روی عملیاتی قرار می‌گیرند. مقدار `true` برای ‌`devMode` باعث اتصال به محیط سندباکس و مقدار `false` باعث اتصال به محیط عملیاتی ما می‌شود.

```java
chabok.setDevelopment("DEV_MODE");
```

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
