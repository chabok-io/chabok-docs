---
id: features
title: امکانات‌ دیگر
layout: android
permalink: android/features.html
prev: verification.html
next: troubleshoot.html
---

چابک متناسب با نیاز شما امکانات دیگری را هم در اختیار شما می گذارد. در این صفحه می‌توانید از [وضعیت اتصال سرور و کلاینت](/android/features.html#وضعیت-اتصال-به-چابک) مطلع شوید. شناسه‌های [دستگاه](/android/features.html#دریافت-شناسه-دستگاه) و [کاربر](/android/features.html#دریافت-شناسه-کاربر) خود را از چابک دریافت نمایید. همچنین [نشان‌هایی (Badge)](/android/features.html#مدیریت-نشانها-badge) که روی آیکون اپ شما در دستگاه کاربر نمایش داده می‌شود را می‌توانید کنترل کنید. در آخر می‌توانید از [وضعیت اپ خود](/android/features.html#دریافت-وضعیت-اپلیکیشن) (فورگراند و بک‌گراند بودن آن) آگاه شوید.

<Br>

### نمایش فقط نوتیفیکیشن‌های چابک 

شما می‌توانید تنظیم کنید که فقط نوتیفیکیشن‌های مربوط به چابک برای کاربر نمایش داده شوند. این قابلیت به شما امکان می‌دهد تا در صورتی که از دو یا چند کتابخانه استفاده می‌کنید، برای کاربر دو یا چند تا پوش ارسال نشود.

برای این کار کد زیر در فایل `AndroidManifest.xml` قرار دهید:

```xml
<meta-data android:name="com.adpdigital.push.client.SHOW_ONLY_CHABOK_NOTIFICATIONS" android:value="ENABLE" />
```

<Br>

### ثبت اطلاعات کاربر (User Attributes)

با فراخوانی متد زیر می‌توانید اطلاعات و سوابق کاربر را جمع‌آوری و ذخیره کنید:

```java
HashMap<String, Object> userInfo = new HashMap<>();

userInfo.put("firstName", "محمدرضا");
userInfo.put("lastName", "اخوان");
userInfo.put("age", 35);
userInfo.put("gender", "مرد");

AdpPushClient.get().setUserAttributes(userInfo);
```

پس از فراخوانی این متد و ثبت اطلاعات می‌توانید آن را در **پنل>جزئیات دستگاه>کارت اطلاعات کاربر** مانند زیر مشاهده کنید:

![عکس مربوطه](http://uupload.ir/files/ovf0_set-user-info.png)

#### دریافت اطلاعات کاربر

برای دریافت اطلاعت کاربر متد زیر را فراخوانی کنید:

```java
AdpPushClient.get().getUserAttributes(userInfo);
```

>`نکته:` در نسخه‌های ۲.۱۶.۰ یا پایین‌تر از متد زیر استفاده کنید:

```java
HashMap<String, Object> userInfo = new HashMap<>();

userInfo.put("firstName", "محمدرضا");
userInfo.put("lastName", "اخوان");
userInfo.put("age", 35);
userInfo.put("gender", "مرد");

AdpPushClient.get().setUserInfo(userInfo);
```

<br><br>

### افزایش داده‌های کمیتی کاربر

شما می‌توانید داده‌های کمیتی کاربر را مانند **بازدید از محصول یا صفحه‌ای، خرید آیتم خاصی** و .. را به تعداد دلخواهتان **افزایش** دهید. برای این کار متد زیر را فراخوانی کنید: 

```java
AdpPushClient.get().incrementUserAttribute("visit");
AdpPushClient.get().incrementUserAttribute("visit", 5);
```

<br><br>

### دریافت شناسه دستگاه

چابک هر **دستگاه** کاربر را به صورت خودکار پس از ثبت با یک شناسه منحصر به فرد در سرور خود ذخیره می‌کند. با فراخوانی متد `getInstallationId` می‌توانید شناسه دستگاه کاربر را دریافت کنید:

```java
AdpPushClient.get().getInstallationId();
``` 

<br><br>

### دریافت شناسه کاربر

چابک شناسه کاربر را پس از ثبت به صورت **رمزنگاری** شده در حافظه دستگاه ذخیره می‌کند. توصیه می‌شود از ذخیره‌سازی این شناسه **خودداری کنید** و با استفاده از متد `getUserId` شناسه کاربر را دریافت کنید:

```java
AdpPushClient.get().getUserId();
```

<br><br>

### مدیریت نشان‌ها (Badge)

اگر می‌خواهید شماره **badge** برنامه خود را بازنشانی کنید، با روش زیر می‌توانید: 

```java
AdpPushClient.get().resetBadge();
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

``` markup
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
#### غیرفعالسازی نمایش نشان (Badge) روی آیکون

برای غیرفعالسازی نمایش Badge برای اعلان‌ها روی آیکون اپلیکیشنتان، کد زیر را به فایل `AndroidManifest.xml` خود اضافه کنید:

```markup
<meta-data android:name="com.adpdigital.push.client.BadgeCount" android:value="DISABLE" />
```
<br><br>

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

<br><br>

### رویداد وضعیت اپلیکیشن

با پیاده‌سازی متد `onEvent` و معرفی کلاس آن به متد `addListener` قادر به دریافت وضعیت اپلیکیشنتان (**ثبت کاربر**، **نصب**، **باز شدن اپلیکیشن** و **برنامه‌های حفاظت شده**) خواهید بود.
 
```java
AdpPushClient.get().addListener(this);

public void onEvent(AppState state) {
    if (state == AppState.REGISTERED) {
        Log.d(TAG, "User successfully registered...");
    } else if (state == AppState.INSTALL) {
        //This state will call one time.
        Log.d(TAG, "The application installed");
    } else if (state == AppState.LAUNCH) {
        Log.d(TAG, "The application launched");
    } else if (state == AppState.PROTECTED_GRANT_NEEDED) {
        Log.d(TAG, "Protected grant needed");
    }
}
```

<br><br>

### دریافت وضعیت اپلیکیشن

جهت بررسی وضعیت اپلیکیشن خود در حال اجرا (**Background** یا **Foreground**) می‌توانید متد‌های زیر را فراخوانی کنید:

```java
//App is in background.
AdpPushClient.get().isBackground();

//App is in foreground.
AdpPushClient.get().isForeground();
```

<br><br>

### تغییر نام پیش‌فرض کانال نوتیفیکیشن (مخصوص اندروید ۸ به بالا)

اندروید در نسخه‌های ۸ به بالا از کانال نوتیفیکیشن استفاده می‌کند. به این صورت که کاربر در تنظیمات اپلیکیشن می‌تواند این کانال‌ها را مشاهده و یا آن‌ها را غیر فعال کند. شما می‌توانید با متد زیر نام این کانال را به دلخواهتان تغییر دهید:

```java
AdpPushClient.get().setDefaultNotificationChannel(“Personal Alert”);
```
