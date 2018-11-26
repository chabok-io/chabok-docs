---
id: push-notification
title: تنظیم پوش‌نوتیفیکیشن 
layout: react-native-bridge
permalink: react-native-bridge/push-notification.html
prev: chabok-messaging.html
next: user-management.html
---

چابک علاوه بر پیام چابک، **پوش‌نوتیفیکیشن** هم ارسال می‌کند. برای بکارگیری آن لطفا تنظیمات زیر برای [اندروید](/react-native/push-notification.html#تنظیم-پوشنوتیفیکیشن-اندروید) و [آی‌اواس](/react-native/push-notification.html#تنظیم-پوشنوتیفیکیشن-آیاواس) انجام دهید، سپس توکن‌ها را به چابک [اضافه نمایید](/react-native/push-notification.html#متد-افزودن-توکن-برای-ارسال-پوشنوتیفیکیشن). همچنین می‌توانید از نمایش اعلان به صورت **local** [استفاده کنید](/react-native/push-notification.html#نمایش-local-notifications).

<Br>

### تنظیم پوش‌نوتیفیکیشن اندروید

برای دریافت پوش‌نوتیفیکیشن باید `GcmReceiver` را در کلاس `Application` به فایل `AndroidManifest.xml` اضافه نمایید تا بتوانید پوش‌نوتیفیکیشن‌هایی که از طریق سرور‌های گوگل ارسال می شوند را نیز دریافت کنید.

```markup
<application
    android:name=".MY_APPLICATION_CLASS_NAME"
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
            <category android:name="MY_APPLICATION_PACKAGE_ID" />
        </intent-filter>
    </receiver>
	
</application>
```

- در ادامه برای **شخصی‌سازی نمایش، دریافت دیتا، کلیک روی اعلان و تنظیم پوش‌نوتیفیکیشن چند رسانه‌ای** به [این صفحه](/android/push-notification.html) مراجعه نمایید.

<Br>

### تنظیم پوش‌نوتیفیکیشن آی‌او‌اس

ابتدا مطمئن شوید که `MobileCoreServices.framework` ،`SystemConfiguration.framework` و `CoreData` را از **Linked Frameworks and Libraries** وارد کرده‌اید.

گزینه `Push Notifications` را در `Setting > Capabilities` فعال کنید،

و علامت `Remote Notifications`ها را در `Setting > Capabilities > Background Modes` بررسی کنید.

- در ادامه برای **شخصی‌سازی نمایش، دریافت دیتا، کلیک روی اعلان و تنظیم پوش‌نوتیفیکیشن چند رسانه‌ای** به [این صفحه](/ios/push-notification.html) مراجعه نمایید.

