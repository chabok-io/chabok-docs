---
id: deeplink
title: دیپ لینک (Deeplink)
layout: ios
permalink: ios/deeplink.html
prev: push-notification.html
next: user-management.html
---
 
دیپ لینک یا لینک عمقی در واقع استفاده از لینکی است که کاربران را به داخل یک صفحه خاص در وبسایت، و یا **قسمت خاصی از اپلیکیشن** هدایت می‌کند. به عبارت دیگر، دیپ لینک را می‌توانید به عنوان یک **میانبر (Shortcut) هوشمند** در نظر بگیرید که کاربر را به مقصدهای مرتبط (با پیام شما) هدایت می‌کند.

<br>

## مزایا

قابلیت دیپ لینک به شما کمک می‌کند تا **نرخ تبدیل** کمپین‌های خود را به صورت چشمگیری **افزایش دهید**. به عنوان مثال، کاربر شما محصولی را به سبد خرید خود اضافه کرده است اما سبد خود را رها کرده و خرید را تکمیل نکرده است. در این صورت شما می‌توانید با یک نوتیفیکیشن به موقع تخفیف روی آن محصول، کاربر را **مستقیما به صفحه محصول** هدایت کنید و به انجام خرید تشویق کنید.

<p><img style="display: block; margin-left: auto; margin-right: auto;" src="http://uupload.ir/files/z6lx_deeplinkings.png" alt="آپلود عکس" border="0" /></p>

<br>

## پیاده‌سازی 

### افزودن intent filter

برای استفاده از دیپ لینک باید **مقصد** مورد نظر را در قالب `host`، `scheme` و `prefix` (در صورت نیاز) تعیین کنید. این پارامترها را باید در دیتای کلاس `intent-filter` در **activity** دلخواه خود (صفحه‌ای که می‌خواهید هنگام اجرای اپلیکیشن باز شود) در فایل `AndroidManifest.xml` تعریف کنید:

```java
<activity
    android:name=".MainActivity"
    android:configChanges="orientation|keyboardHidden"
    android:label="@string/app_name"
    android:screenOrientation="portrait">

    <intent-filter android:label="@string/filter_view_example_gizmos">
        <action android:name="android.intent.action.VIEW" />
        <category android:name="android.intent.category.DEFAULT" />
        <category android:name="android.intent.category.BROWSABLE" />
        
        <!-- Accepts URIs that begin with "twitter://user” 
        <data android:scheme="twitter"
              android:host="user" />  -->
              
        <data android:scheme="APP_NAME"
              android:host="PAGE_NAME" />
    </intent-filter>
</activity>
```
<br>

### نحوه استفاده در ترکر

همچنین اگر می‌خواهید **از دیپ لینک در ترکر** خود استفاده کنید، نامی که به `scheme` اختصاص دادید را در پارامتر `deep_link` لینک ترکر قرار دهید. به نمونه زیر دقت کنید:

```java
https://a.chabok.io/abc123?deep_link=APP_NAME%3A%2F%2Fpagename
```

**مقصد** پارامتر `deep_link` را کلاس **activity** در `android:launchMode` فایل Manifest مشخص می‌کند.

<br>

## ارسال اطلاعات به سرور

آمار دیپ لینک از طریق متدهای `onCreate` و یا `onNewIntent` انتقال داده می‌شود. زمانی که اپ را باز کنید و یکی از این متدها فراخوانی شوند، می‌توانید اطلاعات دیپ لینک را دریافت کنید. 

پس از اینکه اطلاعات دیپ لینک را در اپلیکیشن خود دریافت کردید، متد `appWillOpenUrl` را فراخوانی کنید. این متد اطلاعات را **از اپلیکیشن به سرور چابک** ارسال می‌کند تا بررسی کند که اتریبیوشن جدید رخ داده است یا خیر.

به نمونه زیر دقت کنید:

```java
@Override
protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_main);

    Intent intent = getIntent();
    AdpPushClient.get().appWillOpenUrl(data);
}

@Override
protected void onNewIntent(Intent intent) {
    super.onNewIntent(intent);

    Uri data = intent.getData();
    AdpPushClient.get().appWillOpenUrl(data);
}
```
