---
id: features
title: امکانات‌ دیگر
layout: android
permalink: android/features.html
prev: verification.html
next: troubleshoot.html
---

چابک تعدادی امکانات جزئی اما مهم دیگری را برای آسانی کار شما ارائه می‌دهد. در این صفحه می‌توانید از [وضعیت اتصال سرور و کلاینت](android/features.html#وضعیت-اتصال-به-چابک) مطلع شوید. همچنین [نشان‌هایی (Badge)](android/features.html#مدیریت-نشانها-badge) که روی آیکون اپ شما در دستگاه کاربر نمایش داده می‌شود می‌توانید کنترل کنید. در آخر می‌توانید از [وضعیت اپ خود](android/features.html#دریافت-وضعیت-اپلیکیشن) (فورگراند و بک‌گراند بودن آن) آگاه شوید.

<Br>

### وضعیت اتصال به چابک

برای دریافت وضعیت اتصال به چابک، می‌توانید از دو روش رویداد `onEvent` و متد `getStatus` استفاده کنید.

#### رویداد وضعیت اتصال

با استفاده از متد `onEvent`، همانند قطعه کد زیر پیاده‌سازی قادر به دریافت وضعیت اتصال به چابک خواهید بود و با فراخوانی متد `addListener`، کلاسی را که متد `onEvent` در آن پیاده‌سازی شده است را به چابک معرفی کنید.

```java
AdpPushClient.get().addListener(this);
public void onEvent(final ConnectionStatus status) {
    switch (status) {
        case CONNECTED:
            Log.d(TAG, "Connected to the chabok");
            break;
        case CONNECTING:
            Log.d(TAG, "Connecting to the chabok");
            break;
        case DISCONNECTED:
            Log.d(TAG, "Disconnected");
            break;
        default:
            Log.d(TAG, "Disconnected");
    }
}
```

#### متد وضعیت اتصال

با فراخوانی متد `getStatus` می‌توانید از وضعیت آخر اتصال به چابک مطلع شوید.

```java
AdpPushClient.get().getStatus(new Callback<ConnectionStatus>() {
    @Override
    public void onSuccess(ConnectionStatus connectionStatus) {
        Log.d(TAG, "Connection status is " + connectionStatus.name());
    }
    @Override
    public void onFailure(Throwable throwable) {
        Log.d(TAG, "Error happend " + throwable.getMessage());
    }
});
```

> `نکته:` اگر می‌خواهید تغییرات وضعیت اتصال به سرور چابک را در سمت لایه UI نشان دهید، چون ممکن است قبل از اینکه کلاس شما به عنوان `listener` معرفی شود، ایونت تغییر وضعیت اتصال به شما برسد و شما آن را از دست بدهید، بهتر است برای اولین بار وضعیت اتصال را با استفاده از متد `getStatus` از چابک دریافت نمایید.

### مدیریت نشان‌ها (Badge)

اگر می‌خواهید شماره **badge** برنامه خود را بازنشانی کنید، با روش زیر می‌توانید: 

```java
chabok.resetBadge();
```

#### برداشتن مجوز‌های غیر ضروری برای نمایش نشان (Badge) روی آیکون

با توجه به حجم زیاد این مجوزها امکان دارد کاربر نسبت به این دسترسی‌های غیر ضروری حس منفی پیدا کند، برای همین می‌توانید با استفاده از دستور‌های زیر هر کدام آن‌ها را با اختیار خود بردارید: 

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

همچنین باید کد زیر را به تگ `manifest` در بالای فایل اضافه کنید.

```markup
xmlns:tools="http://schemas.android.com/tools"
```

نمونه اضافه کد به فایل `manifest`: 

```markup
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
          xmlns:tools="http://schemas.android.com/tools"
          package="com.chabok.example">
          ...
</manifest>
```

<Br>

### دریافت وضعیت اپلیکیشن

جهت بررسی وضعیت اپلیکیشن خود در حال اجرا (**Background** یا **Foreground**) می‌توانید متد‌های زیر را فراخوانی کنید:

```java
//App is in background.
AdpPushClient.get().isBackground();
//App is in foreground.
AdpPushClient.get().isForeground();
```
