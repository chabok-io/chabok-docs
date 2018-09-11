---
id: features
title: امکانات‌ چابک 
layout: android
permalink: android/features.html
prev: location-tracking.html
next: troubleshoot.html
---

### مدیریت تگ ها
یکی از مهمترین ابزارهای دسته‌بندی کاربران، استفاده از `Tag` می باشد. به عنوان مثال می‌توانید کاربران خود را بر اساس جنسیت دسته‌بندی کرده و بر اساس جنسیت آنها پیام خاصی را ارسال کنید و یا به کاربرانی که از پرداخت درون برنامه‌ای شما استفاده می‌کنند یک `Tag` با عنوان Premium_User اختصاص دهید.

#### افزودن تگ
با استفاده از متد زیر، شما می‌توانید به کاربر یک `Tag` اختصاص دهید :
```java
public void addTag(String tagName, VoidCallback callback)
```
پارامتر اول نام تگ موردنظر و پارامتر دوم یک Callback برای بررسی نتیجه این عمل می‌باشد. برای مثال به قطعه کد زیر توجه کنید:
```java
chabok.addTag("Premium_User", new VoidCallback() {
            @Override
            public void onSuccess() {
                Log.d(TAG, "addTag onSuccess: called");
            }

            @Override
            public void onError(Throwable t) {
                Log.d(TAG, "addTag onError: called, message: " + t.getMessage());
            }
        });
```
کدفوق تگی بنام Premium_User را به کاربر فعلی اضافه می‌کند.
اگر عملیات افزودن تگ با موفقیت انجام شود، می‌توانید از طریق پنل چابک، تگ اضافه شده به کاربر را در بخش مشترکین همانند تصویر زیر مشاهده کنید :

![مشترک چابک](http://uupload.ir/files/urem__1x-android_device.png)

#### حذف تگ
با استفاده از متد زیر، می‌توانید یک `Tag` خاص از کاربر را حذف کنید :

```java
chabok.removeTag("Premium_User", new VoidCallback() {
            @Override
            public void onSuccess() {
                Log.d(TAG, "removeTag onSuccess: called");
            }

            @Override
            public void onError(Throwable t) {
                Log.d(TAG, "removeTag onError: called, message: " + t.getMessage());
            }
        });
```
کدفوق تگی بنام Premium_User را از کاربر حذف می کند.

###  مدیریت نشان‌ها (Badge)

اگر می‌خواهید شماره badge برنامه خود را بازنشانی کنید، با روش زیر می‌توانید: 


```java
chabok.resetBadge();
```

#### برداشتن مجوز‌های غیر ضروری برای نمایش نشان (Badge) روی آیکون

با توجه به حجم زیاد این مجوزها امکان دارد کاربر حس منفی پیدا کند برای همین می‌توانید از دستور‌های زیر هر کدام آن‌ها را با اختیار خود بردارید.

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
> نشان دهید، چون ممکن است قبل از اینکه کلاس شما به عنوان listener معرفی
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













