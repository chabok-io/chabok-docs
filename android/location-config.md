---
id: location-config
title: تنظیمات مکان‌یابی
layout: android
permalink: android/location-config.html
next: location-tracking.html
prev: event-tracking.html
---

### ۱) تعریف مجوزهای دسترسی به مکان
برای استفاده از امکانات مکان‌یابی چابک لازم است دو مجوز `ACCESS_FINE_LOCATION` و `ACCESS_COARSE_LOCATION`  را در فایل `AndroidManifest.xml` قرار دهید:

```markup
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
برای دریافت گزارش موقعیت مکانی درحالت `kill` لازم است یک `IntentService`  تعریف نمایید تا بتوانید از سرویس مکان‌یابی استفاده کنید.
سپس با استفاده از متد `addCallbackIntent` بایستی Intent فراخوانی سرویس خود را به شیء `LocationManager‌` معرفی کنید، مانند نمونه زیر:
‍
```java
Intent intent = new Intent(getContext(), LocationHostService.class);
locationManger.addCallbackIntent(intent);
```
پس از این کار، Intent موردنظر توسط چابک ذخیره و مورد استفاده قرار خواهد گرفت، مگراینکه با استفاده از متد `removeCallbackIntent` آن را غیرفعال نمایید.
این `IntentService` در هر به‌روزرسانی موقعیت مکانی فراخوانی خواهد شد.
موقعیت مکانی با کلید `LocationManager.LOCATION_KEY` از Intent قابل دریافت است، در متد `onHandleIntent` مانند نمونه زیر می‌توانید اطلاعات موقعیت مکانی به‌روزشده را استخراج نمایید:
```java
public class LocationHostService extends IntentService {

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

        Bundle extras = intent.getExtras();

        if(extras != null) {
            Location location = extras.getParcelable(LocationManager.LOCATION_KEY);
            if(location != null) {
                // use location here
            }
        }
    }

}
```
 کلاس سرویس تعریف شده را به فایل `AndroidManifest.xml` نیز اضافه نمایید،:

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
        </service>
    </application>

</manifest>
```

برای غیرفعال کردن دریافت موقعیت مکانی در سرویس خود متد `removeCallbackIntent` را فراخوانی کنید:

```java
locationManger.removeCallbackIntent();

```


