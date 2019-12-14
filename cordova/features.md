---
id: features
title: امکانات‌ دیگر
layout: cordova
permalink: cordova/features.html
prev: behavior-tracking.html
---

چابک متناسب با نیاز شما امکانات دیگری را هم در اختیار شما می گذارد. در این صفحه می‌توانید از [وضعیت اتصال سرور و کلاینت](/cordova/features.html#وضعیت-اتصال-به-چابک) مطلع شوید. شناسه‌های [دستگاه](/cordova/features.html#دریافت-شناسه-دستگاه) و [کاربر](/cordova/features.html#دریافت-شناسه-کاربر) خود را از چابک دریافت نمایید. همچنین [نشان‌هایی (Badge)](/cordova/features.html#مدیریت-نشانها-badge) که روی آیکون اپ شما در دستگاه کاربر نمایش داده می‌شود را می‌توانید کنترل کنید.

<Br>

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
