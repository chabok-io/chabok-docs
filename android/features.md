---
id: features
title: امکانات‌ چابک 
layout: android
permalink: android/features.html
prev: location-tracking.html
---

### دریافت وضعیت برنامه

جهت بررسی وضعیت برنامه در حال اجرا می توانید از این امکان استفاده کنید.
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


chabok.setPushListener(this);

public void onEvent(final ConnectionStatus status) {
    runOnUiThread(new Runnable() {
        @Override
            public void run() {
                updateConnectionStatus(status);
            }
    });
}

protected void updateConnectionStatus(ConnectionStatus status) {

if (connectionStatus != null && status != null) {
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
### ارسال موقعیت مکانی در هنگام باز شدن برنامه

با فعال کردن قابلیت `enableLocationOnLaunch`، کتابخانه چابک به هنگام باز شدن برنامه و در صورت پیدا کردن موقعیت مکانی کاربر،‌ موقعیت آن را توسط [انتشار رویداد](/android/event-handling.html) به سرور ارسال می کند.


```java
getLocationManger().enableLocationOnLaunch();
```

