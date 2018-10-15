---
id: features
title: امکانات‌ چابک 
layout: android
permalink: android/features.html
prev: verification.html
next: troubleshoot.html
---

چابک امکانات کاربردی دیگر را برای آسان‌تر کردن کار شما ارائه می‌دهد. یکی از این امکانات، [قابلیت کنترل و مدیریت Badge اپلیکیشنتان است](). 
علاوه بر آن شما هر زمانی که مایل بودید می‌توانید [وضعیت برنامه (باز یا بسته بودن)]() و یا [وضعیت اتصال کلاینت به سرورهای چابک]() را بررسی کنید.

<Br>

###  مدیریت نشان‌ها (Badge)

اگر می‌خواهید شماره **badge** برنامه خود را بازنشانی کنید، با روش زیر می‌توانید: 


```java
chabok.resetBadge();
```

#### برداشتن مجوز‌های غیر ضروری برای نمایش نشان (Badge) روی آیکون

با توجه به حجم زیاد این مجوزها امکان دارد کاربر حس منفی پیدا کند، برای همین می‌توانید با استفاده از دستور‌های زیر هر کدام آن‌ها را با اختیار خود بردارید.

```markup
<uses-permission android:name="com.sec.android.provider.badge.permission.READ" tools:node="remove" />
<uses-permission android:name="com.sec.android.provider.badge.permission.WRITE" tools:node="remove" />
<uses-permission android:name="com.htc.launcher.permission.READ_SETTINGS" tools:node="remove" />
<uses-permission android:name="com.htc.launcher.permission.UPDATE_SHORTCUT" tools:node="remove" />
<uses-permission android:name="com.sonyericsson.home.permission.BROADCAST_BADGE" tools:node="remove" />
<uses-permission android:name="com.sonymobile.home.permission.PROVIDER_INSERT_BADGE" tools:node="remove" />
<uses-permission android:name="com.anddoes.launcher.permission.UPDATE_COUNT" tools:node="remove" />
<uses-permission android:name="com.majeur.launcher.permission.UPDATE_BADGE" tools:node="remove" />
<uses-permission android:name="com.huawei.android.launcher.permission.CHANGE_BADGE" tools:node="remove"/>
<uses-permission android:name="com.huawei.android.launcher.permission.READ_SETTINGS" tools:node="remove" />
<uses-permission android:name="com.huawei.android.launcher.permission.WRITE_SETTINGS" tools:node="remove" />
<uses-permission android:name="android.permission.READ_APP_BADGE" tools:node="remove" />
<uses-permission android:name="com.oppo.launcher.permission.READ_SETTINGS" tools:node="remove" />
<uses-permission android:name="com.oppo.launcher.permission.WRITE_SETTINGS" tools:node="remove" />
<uses-permission android:name="me.everything.badger.permission.BADGE_COUNT_READ" tools:node="remove" />
<uses-permission android:name="me.everything.badger.permission.BADGE_COUNT_WRITE" tools:node="remove"/> 
```

همچنین باید کد زیر را به تگ manifest در بالای فایل اضافه کنید.

``` markup
xmlns:tools="http://schemas.android.com/tools"
```
 
نمونه اضافه کد به فایل manifest: 
```markup
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
          xmlns:tools="http://schemas.android.com/tools"
          package="com.chabok.example">
          ...
</manifest>
```
<Br>

### دریافت وضعیت برنامه

جهت بررسی وضعیت برنامه در حال اجرا می‌توانید از این امکان استفاده کنید.
متدهای قابل استفاده:
```java

chabok.isBackground()
chabok.isForeground()
```

نمونه:

```java             
if(chabok.isForeground()) {
// Do something on application foreground
}
```                
<Br>

### وضعیت اتصال با سرور


 برای این منظور ابتدا کلاس مورد نظر برای دریافت رویداد را بعنوان Listener‌ آن تعیین نموده سپس با استفاده از متد زیر رویدادهای داخلی چارچوب چابک را دریافت نمایید:

```java


public void onEvent(final ConnectionStatus status) {
if (status != null) {
    switch (status) {
        case CONNECTED:
        // your logic
        break;

    case CONNECTING:
        // your logic
        break;

    case DISCONNECTED:
        // your logic
        break;
        }
    }
}

```

> نکته: اگر می‌خواهید تغییرات وضعیت اتصال به سرور چابک را در سمت لایه UI
> نشان دهید، چون ممکن است قبل از اینکه کلاس شما به عنوان `listener` معرفی
> شود، ایونت تغییر وضعیت اتصال به شما برسد و شما آن را از دست بدهید،
> بهتر است برای اولین بار وضعیت اتصال را با استفاده از متد `getStatus`
> از چابک دریافت نمایید.

```java

chabok.getStatus(new Callback<ConnectionStatus>() {
    @Override
    public void onSuccess(ConnectionStatus connectionStatus) {
        Log.i(TAG + "_fetch", connectionStatus.name());
    }

    @Override
    public void onFailure(Throwable throwable) {
        Log.i(TAG, "errrror ");
    }
});
```













