---
id: manifest
title: تنظیمات
layout: android
permalink: android/manifest.html
prev: application-class.html
next: chabok-messaging.html
---

### تغییرات لازم در فایل manifest

۱. کدهای زیر را به فایل AndroidManifest.xml پروژه اضافه کنید:
دربخش مجوز‌ها موارد زیر را اضافه کرده و نام کلاس Application خود را نیز بجای YOUR_APPLICATION_CLASS_NAME وارد کنید. عبارت YOUR_APPLICATION_PACKAGE_ID را با نام پکیج برنامه خود جایگزین کنید.

```xml

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

۲. کلاس رسیور PushMessageReceiver را نیز به پروژه خود اضافه نمایید.

```xml

<receiver android:name="PushMessageReceiver">
    <intent-filter>
        <category android:name="YOUR_APPLICATION_PACKAGE_ID"/>
        <action android:name="com.adpdigital.push.client.MSGRECEIVE"/>
    </intent-filter>
</receiver>
                
```

۳. رسیور GcmReceiver را به ترتیب زیر تعریف کنید تا بتوانید نوتیفیکیشن‌هایی که از طریق سرور‌های گوگل ارسال می شوند را نیز دریافت کنید.

```xml

<receiver
     android:name="com.google.android.gms.gcm.GcmReceiver"
     android:enabled="true"
     android:exported="true"
     android:permission="com.google.android.c2dm.permission.SEND">
     <intent-filter>
        <action android:name="com.google.android.c2dm.intent.RECEIVE" />
        <action android:name="com.google.android.c2dm.intent.REGISTRATION" />
        <category android:name=" YOUR_APPLICATION_PACKAGE_ID" />
     </intent-filter>
</receiver>
                
```




