---
id: upgrade-chabok-to-3-0-0
title: راهنمای ارتقا به نسخه ۳ چابک
layout: android
permalink: android/upgrade-chabok-to-3-0-0.html
---

با مطالعه راهنمای زیر می‌توانید نسخه کتابخانه اندروید خود را به **نسخه‌های ۳.۰.۰ به بعد ارتقا دهید**. برای این کار فقط کافیست نسخه جدید را دریافت کنید، و تعدادی کد را حذف و اضافه کنید.

مراحل ارتقا را باید به ترتیب زیر انجام دهید:

[۱- نصب کتابخانه](/android/upgrade-chabok-to-3-0-0.html#۱--نصب-کتابخانه)

[۲- مقداردهی اولیه](/android/upgrade-chabok-to-3-0-0.html#۲--مقداردهی-اولیه)

[۳- تغییرات فایل مانیفست](/android/upgrade-chabok-to-3-0-0.html#۳--تغییرات-فایل-مانیفست)

[۴- تغییرات ورود کاربر (Login)](/android/upgrade-chabok-to-3-0-0.html#۴--تغییرات-ورود-کاربر-login)

[۵- تغییرات خروج کاربر (Logout)](/android/upgrade-chabok-to-3-0-0.html#۵--تغییرات-خروج-کاربر-logout)

<br><br>

### ۱- نصب کتابخانه

برای دریافت کتابخانه چابک تغییرات زیر را در فایل `build.gradle` اعمال کنید:

```diff
buildscript {
    repositories {
+       google()
        jcenter()
+       maven {
+           url "https://plugins.gradle.org/m2/" 
+       }
    }
    
    dependencies {    
+       classpath 'io.chabok.plugin:chabok-services:1.0.0'
+       classpath 'com.google.gms:google-services:4.3.2'
    }
}
```

برای استفاده از کتابخانه استاندارد چابک (بدون قابلیت مکان‌یابی) از کتابخانه `chabok-lib` که در زیر به آن اشاره‌ شده است، استفاده کنید.
فایل `build.gradle` در ماژول اپلیکیشن را باز کرده و در بخش `dependencies` خطوط زیر را اضافه نمایید:

```diff
dependencies {
-   implementation 'com.adpdigital.push:chabok-lib:2.18.0'
+   implementation 'com.adpdigital.push:chabok-lib:3.3.1'

-   implementation 'com.google.android.gms:play-services-gcm:10.2.6'
+   implementation 'com.google.firebase:firebase-messaging:17.1.0'

    implementation 'me.leolin:ShortcutBadger:1.1.22@aar'
    implementation 'com.android.installreferrer:installreferrer:1.0'
}

+ apply plugin: 'io.chabok.plugin.chabok-services'
+ apply plugin: 'com.google.gms.google-services'
```

درصورتی که در برنامه خود نیاز به استفاده از موقعیت مکانی کاربر دارید، لازم است در ابتدا کتابخانه `chabok-lib` را حذف و کتابخانه `chabok-lib-geo` را جایگزین کنید:

```diff
dependencies {
-   implementation 'com.adpdigital.push:chabok-lib-geo:2.18.0'
+   implementation 'com.adpdigital.push:chabok-lib-geo:3.3.1'
}
```

در انتها گزینه سینک گریدل را بزنید.

<br><br>

### ۲- مقداردهی اولیه

برای مقداردهی ابتدا از پنل خود وارد بخش **تنظیمات**> **دسترسی و توکن‌ها**> **کتابخانه موبایل**> **فعال‌سازی راه‌اندازی هوشمند**> شوید و فایل **Chabok.sandbox.json** یا **Chabok.production.json** را بسته به محیطتان دانلود کنید. 
فایل دانلود شده را در پوشه ماژول اصلی پروژه قرار دهید. 
برای توضیحات بیشتر به بخش [مقداردهی اولیه](/android/sdk-setup.html#۲--مقداردهی-اولیه-initialize) در مستندات اندروید مراجعه کنید.
<br>
فایل **google-services.json** را از پنل فایربیس خود دانلود کنید و در پوشه ماژول اصلی اپلیکیشن خود قرار دهید. 
برای توضیحات بیشتر به بخش [نکات ضروری نصب کتابخانه](/android/sdk-setup.html#نکات-ضروری-نصب-کتابخانه) در مستندات اندروید مراجعه کنید.
<br>

حذف متد `AdpPushClient.init` و استفاده از متد `AdpPushClient.configureEnvironment` برای راه‌اندازی اولیه کتابخانه چابک در کلاس `Application`:

```diff
public class MyAppClass extends Application {
    @Override
    public void onCreate() {
        super.onCreate();  

-       AdpPushClient.init(
-               getApplicationContext(),
-               MainActivity.class,
-               "APP_ID",
-               "API_KEY",
-               "SDK_USERNAME",
-               "SDK_PASSWORD",
-               "SENDER_ID"
-       ); 
-       AdpPushClient.get().setDevelopment(DEV_MODE);

+       AdpPushClient.configureEnvironment(Environment.SANDBOX); // or PRODUCTION
    }
 
-   @Override
-   public void onTerminate() {
-       if (AdpPushClient.get() != null) {
-           AdpPushClient.get().dismiss();
-       }
-       super.onTerminate();
-   }
}
```

اگر از کامپوننت‌های اندروید در پراسس دیگری استفاده می‌کنید. حتما متد `setApplicationContext` را قبل از متد `configureEnvironment` فراخوانی کنید.

<br><br>

### ۳- تغییرات فایل مانیفست

حذف کلاس `GcmReceiver` و متادیتاهای غیرضروری از فایل مانیفست پروژه:

```diff
- <uses-library android:name="org.apache.http.legacy"
-               android:required="false" />   

<application
    android:name=".MyAppClass">
    
-   <meta-data android:name="com.adpdigital.push.client.SHOW_ONLY_CHABOK_NOTIFICATIONS"
-              android:value="ENABLE" />
-   <meta-data android:name="com.adpdigital.push.client.DISABLE_REALTIME"
-              android:value="TRUE" />
-
-   <receiver
-       android:name="com.google.android.gms.gcm.GcmReceiver"
-       android:enabled="true"
-       android:exported="true"
-       android:permission="com.google.android.c2dm.permission.SEND">
-       <intent-filter>
-           <action android:name="com.google.android.c2dm.intent.RECEIVE" />
-           <action android:name="com.google.android.c2dm.intent.REGISTRATION" />
-           <category android:name="MY_APPLICATION_PACKAGE_ID" />
-       </intent-filter>
-   </receiver>

</application>
```

<br><br>

### ۴- تغییرات ورود کاربر (Login)

در صورتی که در اپلیکیشن‌تان، پس از احراز هویت، کاربر را با یک نام کاربری (USER_ID) در چابک ثبت می‌کنید، تغییرات زیر را در کدتان اعمال کنید:

```diff
- AdpPushClient.get().register("USER_ID");

+ AdpPushClient.get().login("USER_ID"); 
```

> `نکته:` اگر متد `register` را در هر بار اجرای اپلیکیشن در کلاس `Application` متد `()onCreate` فراخوانی می‌کنید نیازی به این کار نیست و آن دستورات را حذف کنید.

<br><br>

### ۵- تغییرات خروج کاربر (Logout)

چنانچه به هنگام خروج کاربر از حساب کاربری از متدهای `unregister` و یا `registerAsGuest` استفاده می‌کنید، تغییرات زیر را در کد خود اعمال کنید:

```diff
- AdpPushClient.get().unregister();
- AdpPushClient.get().registerAsGuest();

+ AdpPushClient.get().logout();
```

> `نکته:` اگر متد `unregister` و یا `registerAsGuest` را در هر بار اجرای اپلیکیشن در کلاس `Application` متد `()onCreate` فراخوانی می‌کنید نیازی به این کار نیست و آن دستورات را حذف کنید.

<br><br>

<p style="text-align: center;">
    <img src="http://uupload.ir/files/l3ij_done.jpg" style="height:50px;" />
    پس از اعمال تغییرات گفته شده در بالا، <b>ارتقای شما با موفقیت انجام خواهد شد.</b>
</p>
