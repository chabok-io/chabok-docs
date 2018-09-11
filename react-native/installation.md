---
id: installation
title: نصب چابک
layout: react-native
permalink: react-native/installation.html
prev: required.html
next: setup.html
---

## افزودن کتابخانه

برای نصب از طریق `npm` یا `yarn`:

```bash
npm install chabokpush-rn --save
```
```bash
yarn add chabokpush-rn
```

> `نکته ` : دقت داشته باشید که چابک به طور پیش‌فرض توکن نمی‌گیرد، بنابراین برای **تنظیم پوش‌نوتیفیکیشن** می‌توانید با استفاده از [این پکیج](https://github.com/zo0r/react-native-push-notification#readme) آن را روی پروژه خود پیاده‌سازی کنید.

بعد از نصب دستور زیر را اجرا کنید:
```bash
react-native link
```
> `نکته ` : در اندروید می‌بایست `AndroidManifest.xml` را به صورت دستی تغییر دهید. 


### نصب اندروید

دسترسی زیر را به `AndroidManifest.xml` اضافه کنید:

```markup
.....

<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />

<application ....>
``` 

### تعریف رسیور GCM برای دریافت پوش‌نوتیفیکیشن

رسیور GcmReceiver را به ترتیب زیر تعریف کنید تا بتوانید نوتیفیکیشن‌هایی که از طریق سرور‌های گوگل ارسال می شوند را نیز دریافت کنید.

```bash
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
