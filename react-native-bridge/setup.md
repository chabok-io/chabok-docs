---
id: setup
title: راه‌اندازی چابک
layout: react-native-bridge
permalink: react-native-bridge/setup.html
prev: installation.html
next: methods.html
---

### تغییرات لازم در فایل manifest
در پروژه react-native خود در بخش اندروید تغییرات ذیل را اعمال کنید:
۱. کدهای زیر را به فایل `AndroidManifest.xml` پروژه اضافه کنید:

دربخش مجوز‌ها موارد زیر را اضافه کرده و نام کلاس `Application` خود را نیز بجای `YOUR_APPLICATION_CLASS_NAME` وارد کنید. عبارت `YOUR_APPLICATION_PACKAGE_ID` را با نام پکیج برنامه خود جایگزین کنید.

```bash

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

۲.  کلاس رسیور `PushMessageReceiver`  که نحوه ایجاد آن در بخش [پیام چابک](chabok-messaging.html) توضیح داده شده را نیز به پروژه خود اضافه نمایید.

```bash

<receiver android:name="PushMessageReceiver">
    <intent-filter>
        <category android:name="YOUR_APPLICATION_PACKAGE_ID"/>
        <action android:name="com.adpdigital.push.client.MSGRECEIVE"/>
    </intent-filter>
</receiver>

```

۳. رسیور `GcmReceiver` را به ترتیب زیر تعریف کنید تا بتوانید نوتیفیکیشن‌هایی که از طریق سرور‌های گوگل ارسال می شوند را نیز دریافت کنید.

```bash

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
برای دریافت یا ارسال پیام از/به سرور چابک، لازم است یک نمونه از کلاس `AdpPushClient` بسازید و آن را مقداردهی نمایید. برای این منظور در متد `onCreate` کلاس `Application` کدهای زیر را اضافه کنید.

```java

private AdpPushClient chabok = AdpPushClient.init(
    getApplicationContext(),
    YOUR_MAIN_ACTIVITY_CLASS.class,
    YOUR_APP_ID,
    YOUR_API_KEY,
    SDK_USERNAME,
    SDK_PASSWORD
); 

```

#### پارامترها

با استفاده از متد init یک نمونه از AdpPushClient مقدار دهی اولیه می شود. در این متد بجای پارامتر‌های `YOUR_APP_ID`, `YOUR_API_KEY(SDK_KEY)`, `SDK_USERNAME`, `SDK_PASSWORD` مقادیر مربوط به حساب چابک خود را وارد نمایید. نحوه ایجاد حساب در بخش [پیش‌نیازها](https://doc.chabokpush.com/react-native-bridge/required.html) توضیح داده شده است. در صورت داشتن حساب چابک هم می‌توانید این مقادیر را از [**پنل بخش تنظیمات قسمت دسترسی‌ و توکن‌ها**](https://doc.chabokpush.com/panel/settings.html#%D8%AF%D8%B3%D8%AA%D8%B1%D8%B3%DB%8C%D9%87%D8%A7-%D9%88-%D8%AA%D9%88%DA%A9%D9%86%D9%87%D8%A7) بردارید.


> `نکته`: ترکیب APP_ID/SENDERID به عنوان YOUR_APP_ID مورد استفاده قرار می‌گیرد.

در نمونه کد زیر تنظیمات مربوط به `AdpPushClient` تعریف شده است، شما کافیست بجای `YOUR_MAIN_ACTIVITY_CLASS` نام اکتیویتی اصلی (چابک به طور پیش‌فرض بعد از کلیک شدن روی نوتیفیکیشن، این اکتیویتی را باز می‌کند) خود را قرار دهید.


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
                YOUR_APP_ID,
                YOUR_API_KEY(SDK_KEY),
                SDK_USERNAME,
                SDK_PASSWORD
                );
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


### متد `dismiss`

در متد `onTerminate` کلاس اپلیکیشن که در واقع آخرین فراخوانی در چرخه حیات این کلاس است، متد `dismiss` از کلاینت چابک را فراخوانی نمایید تا منابع در اختیار آزاد شوند. واضح است بعد از فراخوانی این متد دیگر نمی توان از نمونه جاری کلاینت استفاده کرد و باید دوباره نمونه‌سازی کنید.

```java

@Override
public void onTerminate() {
    chabok.dismiss();
    super.onTerminate();
}

```
