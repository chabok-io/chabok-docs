---
id: location-config
title: تنظیمات مکان‌یابی
layout: android
permalink: android/location-config.html
next: location-tracking.html
prev: event-handling.html
---

### ۱) تعریف مجوزهای دسترسی به مکان
برای استفاده از امکانات مکان‌یابی چابک لازم است دو مجوز `ACCESS_FINE_LOCATION` و `ACCESS_COARSE_LOCATION`  را در فایل `AndroidManifest.xml` قرار دهید:

```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.adpdigital.push.demo" >
    
    ...
    
    <uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
    <uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
    
    <application ... >
        
    </application>
    
</manifest>
```

### ۲) دریافت موقعیت مکانی در حالت kill
برای دریافت گزارش مکان درحالت `kill` لازمست یک `IntentService` با اکشن com.adpdigital.push.intent.action.PENDING_INTENT_SERVICE تعریف نمایید تا مانند نمونه کد زیر بتوانید از سرویس مکان یابی استفاده کنید.
این `IntentService` در هر به‌روزرسانی مکان فراخوانی خواهد شد.

```java
public class LocationHostService extends IntentService {

    private static final String hostServiceAction =
            "com.adpdigital.push.intent.action.PENDING_INTENT_SERVICE";
    private static final String TAG = "LocationHostService";

    public LocationHostService() {super("LocationHostService");}
    /**
     * Creates an IntentService.  Invoked by your subclass's constructor.
     *
     * @param name Used to name the worker thread, important only for debugging.
     */
    public LocationHostService(String name) {
        super(name);
    }


    @Override
    public void onDestroy() {
        super.onDestroy();
    }

    @Override
    protected void onHandleIntent(Intent intent) {
        boolean result = LocationResult.hasResult(intent);
        LocationResult resultData = LocationResult.extractResult(intent);
        if(resultData != null) {
            Location location = resultData.getLastLocation();
            // TODO your location is here
        }
    }

}
```
سپس سرویس را در فایل `AndroidManifest.xml` نیز تعریف نمایید، توجه کنید که اکشن سرویس مطابق نمونه زیر باشد:

```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.adpdigital.push.demo" >
    
    <application
        android:name=".app.DemoApplication"
        android:icon="@drawable/ic_launcher"
        android:label="@string/app_name"
        android:theme="@style/Theme.AppCompat.Light">
        
        ...
        
        <service android:name=".service.LocationHostService" >
            <intent-filter>
                <action android:name="com.adpdigital.push.intent.action.PENDING_INTENT_SERVICE" />
            </intent-filter>
        </service>
    </application>

</manifest>
```

در متد `onHandleIntent` مانند نمونه فوق می‌توانید اطلاعات مکان به‌روزشده را استخراج نمایید.

