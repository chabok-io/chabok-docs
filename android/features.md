---
id: features
title: امکانات‌ چابک 
layout: android
permalink: android/features.html
prev: location-tracking.html
---

### مدیریت تگ ها
یکی از مهمترین ابزارهای دسته‌بندی کاربران، استفاده از `Tag` می باشد. به عنوان مثال می‌توانید کاربران خود را بر اساس جنسیت دسته‌بندی کرده و بر اساس جنسیت آنها پیام خاصی را ارسال کنید و یا کاربرانی که از پرداخت درون برنامه‌ای شما استفاده می‌کنند، یک `Tag` با عنوان `Premium_User` به آنها اختصاص دهید.

#### افزودن تگ
با استفاده از متد زیر، شما می‌توانید به کاربر فعلی یک `Tag` اختصاص دهید :
```java
public void addTag(String tagName, VoidCallback callback)
```
پارامتر اول تگ موردنظر و پارامتر دوم یک Callback برای بررسی نتیجه این عمل می‌باشد به شکل زیر:
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

![مشترک چابک](http://uupload.ir/files/p3w3_tag.jpg)

#### حذف تگ
با استفاده از متد زیر، می‌توانید یک `Tag` خاص از کاربر فعلی را حذف کنید :

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
کدفوق تگی بنام Premium_User را از کاربر فعلی حذف می کند.

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

