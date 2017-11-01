---
id: features
title: امکانات‌ چابک 
layout: android
permalink: android/features.html
prev: location-tracking.html
---


###  مدیریت نشان‌ها

اگر می‌خواهید شماره badge برنامه خود را بازنشانی کنید، با روش زیر می‌توانید: 


```java
chabok.resetBadge();
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

private AdpPushClient chabok;

@Override
protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    chabok = ((DemoApplication) getApplication()).getPushClient();

}

@Override
protected void onResume() {
    super.onResume();
    attachPushClient();
}


@Override
protected void onPause() {
    super.onPause();
    detachPushClient();
}

@Override
    protected void onDestroy() {
    detachPushClient();
    super.onDestroy();
}

private void attachPushClient() {
    if (chabok != null) {
        chabok.setPushListener(this);
    }
}

private void detachPushClient() {
    if (chabok != null) {
        chabok.removePushListener(this);
    }
}

public void onEvent(final ConnectionStatus status) {
    runOnUiThread(new Runnable() {
        @Override
        public void run() {
            updateConnectionStatus(status);
        }
    });
}

private void updateConnectionStatus(ConnectionStatus status) {

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

