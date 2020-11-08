---
id: location-tracking
title: خدمات مکانی
layout: android
permalink: android/location-tracking.html
prev: behavior-tracking.html
next: event-handling.html
---

چابک به طور گسترده از **خدمات مکانی (Location Services)** پشتیبانی می‌کند. از جمله این خدمات **رصد موقعیت مکانی کاربر** (Geo-tracking یا location tracking)، **تعیین محدوده جغرافیایی** (Geo-fencing)، **پوش بر اساس موقعیت مکانی** (Location-Based Push Notifications) و **پوش خودکار مکانی** (Geofence Push Notifications) است.

<br><br>


### قابلیت‌های مکانی

چابک کنترل و تعامل با API‌ های مربوط به GPS و سرویس‌دهنده‌های دیگر را مدیریت می نماید.
قابلیت مکان‌یابی در اندروید با استفاده از API های Google Play services بهبود یافته است. **دریافت آخرین موقعیت مکانی کاربر، دریافت متناوب موقعیت مکانی، قابلیت تعریف محدوده جغرافیایی** و ... از جمله امکانات ارائه شده هستند.
چابک با استفاده از این قابلیت‌ها در کتابخانه خود، می تواند کارکردن با این ابزارها را سهولت بخشد.

<!--
به عنوان مثال شما برای دریافت یک موقعیت مکانی در شروع برنامه لازم نیست با API های اندروید درگیر شده و حالات مختلف را کنترل نمایید، بلکه کافیست با استفاده از متد `enableLocationOnLaunch` و پیاده سازی Listener ‌مربوطه، به سادگی نیاز خود را برطرف سازید.
همچنین برای استفاده از قابلیت Tracking درطول زمان و جابجایی معین، کافیست متد `startTrackingMe` را با پارامترهای مربوط فراخوانی کنید و پس از آن در دوره زمانی تعیین شده و میزان جابجایی که در پارامترها مشخص نموده‌اید موقعیت مکانی را دریافت خواهید کرد و پس از طی این زمان نیز سرویس مکان‌یابی بصورت خودکار متوقف خواهد شد.
--->

<br>

### ارسال موقعیت مکانی بدون پیاده‌سازی کتابخانه موقعیت مکانی چابک

اگر سرویس لوکیشن در اپلیکیشن‌تان پیاده‌سازی شده و قصد اضافه کردن کتابخانه جدید برای ارسال موقعیت مکانی را ندارید، از طریق کد زیر می‌توانید موقعیت مکانی کاربران را برای چابک ارسال کنید: 

```java
public void publishLocation(Location location) {
    try {
        JSONObject data = new JSONObject();
        
        data.put("lat", location.getLatitude());
        data.put("lng", location.getLongitude());
        data.put("ts", location.getTime());
        
        AdpPushClient.get().publishEvent("geo", data);
    } catch (JSONException e) {
        Logger.e(TAG, "Cant publish geo location event ", e);
    }
}
```

> `نکته:` از ارسال موقعیت مکانی در کمتر از ۵ الی ۱۰ ثانیه خودداری نمایید.

### تعریف مجوزهای دسترسی به موقعیت مکانی

برای استفاده از امکانات مکان‌یابی چابک لازم است حتما دو مجوز `ACCESS_FINE_LOCATION` و `ACCESS_COARSE_LOCATION`  را در فایل `AndroidManifest.xml` قرار دهید:

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

در ادامه این بخش به معرفی امکانات مکان‌یابی چابک خواهیم پرداخت:

<br>

### دریافت موقعیت مکانی یک‌بار در زمان شروع برنامه 
با استفاده از متد `enableLocationOnLaunch` می توانید موقعیت مکانی را در کلاس listener ‌خود برای یک‌بار دریافت نمایید، پس از یکبار گزارش، سرویس مکان‌یابی بصورت خودکار متوقف خواهد شد.
می‌توانید این متد را در جای مناسبی مانند `onCreate` اکتیویتی یا کلاس `Application‌` فراخوانی نمایید.

```java
public void enableLocationOnLaunch()
```

<br>


### دریافت موقعیت مکانی در حالت kill

برای دریافت گزارش موقعیت مکانی درحالت `kill` لازم است یک `IntentService` تعریف نمایید تا بتوانید از سرویس مکان‌یابی استفاده کنید.
سپس با استفاده از متد `addCallbackIntent` بایستی Intent فراخوانی سرویس خود را به شیء `LocationManager‌` معرفی کنید، مانند نمونه زیر:
‍
```java
Intent intent = new Intent(getContext(), LocationHostService.class);
locationManager.addCallbackIntent(intent);
```
پس از این کار، Intent موردنظر توسط چابک ذخیره و مورد استفاده قرار خواهد گرفت، مگر اینکه با استفاده از متد `removeCallbackIntent` آن را غیرفعال نمایید.
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

```java
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
locationManager.removeCallbackIntent();
```

<br>

### استفاده از شیء LocationManager

برای استفاده از قابلیت مکان‌یابی چابک لازم است از شیء `LocationManager` استفاده نمایید. برای مقداردهی اولیه متد `init` را با context موردنظر فراخوانی نمایید، به شکل زیر:

```java
LocationManager locationManager = LocationManager.init(getApplicationContext());
```

همه متدهای موردنیاز برای مکان‌یابی در این شیء قرار دارد.

<br>

### دریافت موقعیت مکانی

برای دریافت موقعیت مکانی بصورت مداوم، باید متد `startLocationUpdates` با پارامتر مربوطه که در ادامه توضیح داده می‌شود فراخوانی شود. 

درصورتی که نیازی به دریافت مداوم موقعیت مکانی ندارید، می‌توانید از روش‌های کم هزینه‌تر مانند درخواست فقط یکبار با استفاده از متد `requestSingleLocation` یا درخواست به مدت معین با استفاده از متد `startTrackingMe` و روش‌های دیگری که توسط چابک ارائه می‌شود، استفاده نمایید.

```java
public void startLocationUpdates(LocationParams params)
```

>`نکته:`
> توجه داشته باشید که برای دریافت تغییرات موقعیت مکانی، کلاس مورد نظر برای دریافت آن را توسط متد `addListener` معرفی نمایید.




در حالت دریافت مداوم موقعیت مکانی، توجه کنید که برای جلوگیری از اتلاف مصرف باتری، در زمانی که نیازی به ادامه این کار نیست، مثلا زمانی که کاربر از برنامه خارج می شود و نیازی به ادامه سرویس دهی در حالت Background و Kill‌ نیست بایستی حالت background‌ را غیرفعال نمایید و متد `stop` را فراخوانی کنید، 
مثلا در نمونه کد زیر در متد onStop فرگمنت مورد نظر، قابلیت مکان‌یابی متوقف شده است:


```java
@Override
public void onStop() {
    super.onStop();
    if (locationManager != null) {
        locationManager.stop();
    }
    ...
}
```

>`نکته:`
>درصورتی که حالت background غیرفعال باشد، با فراخوانی متد `stop` سرویس متوقف خواهدشد، این حالت بصورت پیش‌فرض  غیرفعال می باشد. 
> توضیحات مربوط به فعال‌سازی و غیرفعال‌سازی حالت ‌background در ادامه همین صفحه آمده است.



#### پارامتر ورودی 

پارامترهای دقت، فاصله و دوره زمانی گزارش موقعیت مکانی برای شیء `LocationParams` تنظیم می‌شود و این شیء به عنوان پارامتر ورودی متد فوق مورد استفاده قرار می‌گیرد.
بعنوان مثال قطعه کد زیر را در نظر بگیرید:

```java
LocationParams params = new Builder().setAccuracy(LocationAccuracy.HIGH).setDistance(0).setInterval(500).build();
```

در این نمونه دقت مکان‌یابی حداکثر، جابجایی موقعیت مکانی حداقل صفر و زمان تناوب گزارش مکان‌یابی ۵۰۰ میلی‌ثانیه می‌باشد.
در ادامه توضیحات هریک از متدهای شیء `LocationParams` را مشاهده می‌کنید.

<br>

##### دقت مکان‌یابی

متد `setAccuracy`

برای تعیین دقت مکان‌یابی از این متد استفاده کنید.

```java
setAccuracy(LocationAccuracy accuracy)
```

برای مقداردهی اولیه آن لازم است یکی از مقادیر enum زیر را انتخاب نمایید:

```java
enum LocationAccuracy {
    HIGH,
    MEDIUM,
    LOW,
    LOWEST
}
```
مقادیر فوق گویای میزان دقت مکان‌یابی هستند،‌ هرچه دقت مکان‌یابی بیشتر باشد موقعیت مکانی گزارش شده با خطای کمتری خواهد بود. از طرف دیگر دقت بیشتر، مصرف باتری بیشتری نیز به همراه خواهد داشت.

- **HIGH**
این مقدار را برای دریافت حداکثر دقت موقعیت مکانی بکار ببرید، با این تنظیم، سرویس مکان‌یابی با احتمال زیادی از GPS برای تشخیص موقعیت مکانی استفاده خواهدکرد.
- **MEDIUM**
این مقدار را برای دریافت دقت مکان‌یابی در یک بلاک شهری بکار ببرید که دقتی در حدود ۱۰۰ متر دارد، این مقدار، خطای نسبتا بزرگی درنظر گرفته می‌شود بنابراین باتری کمتری مصرف خواهد کرد. با این تنظیم، سرویس مکان‌یابی به احتمال زیاد از Wifi‌ و دکل‌های مخابراتی برای مکان‌یابی استفاده خواهد کرد.
>`نکته:`
>انتخاب سرویس‌دهنده موقعیت مکانی به فاکتورهای زیاد دیگری بستگی دارد، مثلا در دسترس بودن آن، اگر به هر دلیلی سرویس‌دهنده مورد نظر در دسترس نباشد، فاکتورها تغییر خواهد کرد.
- **LOW**
این مقدار را برای دریافت دقت مکان‌یابی درسطح شهر در نظر بگیرید، که دقتی در حدود ۱۰ کیلومتر دارد. با توجه به این نوع دقت مصرف باتری کمتری خواهیم‌ داشت.
- **LOWEST**
اگر مصرف باتری برایتان خیلی مهم است، ولی به‌روزرسانی موقعیت مکانی را فقط وقتی در دسترس باشد نیاز دارید، از این مقدار استفاده کنید.
با این تنظیم، برنامه شما هیچ به‌روزرسانی موقعیت مکانی را درخواست نخواهد کرد،‌ولی درخواست به‌روزرسانی توسط برنامه‌های دیگر را دریافت خواهد نمود.

<br>

##### حداقل فاصله

متد `setDistance`

با استفاده از این متد حداقل فاصله برای مکان‌یابی براساس متر می‌تواند تنظیم شود.

```java
setDistance(float distance)
```

##### دوره تناوب دریافت موقعیت مکانی

متد `setInterval`

 می توانید فاصله زمانی بین دریافت هر به‌روزرسانی موقعیت مکانی را براساس میلی‌ثانیه با این متد تنظیم نمایید.

```java
setInterval(long interval)
```

<br>

#### متد addListener

برای دریافت گزارش به‌روزرسانی موقعیت مکانی لازم است توسط متد `addListener` کلاس مورد نظر برای دریافت به‌روزرسانی مکان را معرفی نمایید.

```java
public void addListener(OnLocationUpdateListener listener)
```

همچنین برای اینکه این listener را حذف نمایید، مثلا برای مدیریت lifecycle اکتیویتی در متد `onPause` می توانید متد `removeListener` را فراخوانی کنید:
‍
```java
public void removeListener()
```

قبل از اینکه کلاس خود را با متد `addListener` معرفی کنید،
 باید اینترفیس  `OnLocationUpdateListener` را برای کلاس مورد نظر خود که قصد دریافت مکان را در آن دارید پیاده‌سازی نمایید.
 
 ```java
 public interface OnLocationUpdateListener {
     void onConnected(@Nullable Bundle bundle);
     void onLocationUpdated(Location location);
     void onSuspended();
     void onConnectionFailed(ConnectionResult connectionResult);
     void onGeofencesRegisteredSuccessful();
 }
 ```
 
به عنوان مثال کلاس GeoFragment در نمونه کد زیر اینترفیس `OnLocationUpdateListener` را پیاده‌سازی نموده است:

```java
public class GeoFragment extends Fragment 
    implements OnLocationUpdateListener {
    
    private LocationManager locationManager;
    
    @Override
    public View onCreateView(LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        view = inflater.inflate(R.layout.fragment_geo, container, false);
        
        locationManager = LocationManager.init(getContext());
        locationManager.addListener(this);
        
        return view;
    }
    
    @Override
        public void onLocationUpdated(Location location) {
            mCurrentLocation = location;
            ...
        }
    
        @Override
        public void onConnected(@Nullable Bundle bundle) {
            // Locatoin client is connected
        }
    
        @Override
        public void onSuspended() {
    
        }
    
        @Override
        public void onConnectionFailed(ConnectionResult connectionResult) {
    
        }
    
        @Override
        public void onGeofencesRegisteredSuccessful() {
            
        }
    ...
}
```

<br>

#### متدهای OnLocationUpdateListener

- متد `onConnected`

وقتی کلاینت مکان‌یابی متصل شد، این متد فراخوانی می‌شود.

- متد `onLocationUpdated`

هر بار که موقعیت مکانی براساس تنظیمات اولیه به‌روزرسانی شود، این متد فراخوانی شده و شیء `Location` شامل اطلاعات نقطه جغرافیایی مورد نظر را می دهد.

- متد `onSuspended`

وقتی کلاینت مکان‌یابی بصورت موقت در وضعیت عدم اتصال قرار بگیرد، فراخوانی می‌شود.

- متد `onConnectionFailed`

وقتی کلاینت مکان‌یابی در عملیات اتصال ناموفق بود، فراخوانی می‌شود.

- متد `onGeofencesRegisteredSuccessful`

درصورتی که با متد `setUpGeofence` اقدام به تعریف geofence کرده باشید و با موفقیت ثبت شود، متد فوق فراخوانی خواهد
شد.

<br>

### متد addCallbackIntent

با استفاده از متد `addCallbackIntent` بایستی Intent فراخوانی سرویس خود را به شیء LocationManager‌ معرفی کنید، مانند نمونه زیر:
‍
```java
Intent intent = new Intent(getContext(), LocationHostService.class);
locationManager.addCallbackIntent(intent);
```
پس از اجرای کد فوق می‌توانید گزارش به‌روزرسانی موقعیت مکانی را در سرویس خود (LocationHostService) دریافت نمایید.  برای جزيیات بیشتر درمورد دریافت موقعیت مکانی در حالت‌های مختلف، به بخش [تنظیمات مکان‌یابی](location-config.html) مراجعه کنید.

>`نکته:`
>برای اینکه دریافت موقعیت مکانی در این سرویس پس از خروج از برنامه یعنی حالات Kill و Background ادامه یابد بایستی حالت Background ‌را توسط متد `enableBackgroundMode` فعال کرده باشید.

<br>

### دریافت یک موقعیت مکانی

 با هربار فراخوانی متد `requestSingleLocation` می‌توانید موقعیت مکانی به‌روزشده را در کلاس listener خود دریافت نمایید.

```java
public void requestSingleLocation(final LocationListener listener)
```
با استفاده از این متد می‌توانید توسط پارامتر ورودی `LocationListener` یک‌بار درخواست مکان‌یابی نمایید و در متد مربوط در زمان فراخوانی آن، موقعیت مکانی بروز شده را دریافت و مورد استفاده قرار دهید، به صورت زیر:
```java
locationManager.requestSingleLocation(new LocationListener() {
            @Override
            public void onLocationChanged(Location location) {
                // Do what you want with location
            }
        });
```
>`نکته:`
>درصورتی که با استفاده از متد `startTrackingMe` مکان‌یابی زمان‌دار را فعال کرده باشید، تا زمانی که این مدت زمان به پایان نرسیده است، متد `requestSingleLocation` عمل نخواهدکرد.

<br>

### مکان‌یابی براساس مدت زمان و جابجایی

با کمک متد `startTrackingMe` می توانید در طول زمانی مشخص، با یک تناوب زمانی معین و حداقل فاصله جابجایی، گزارش تغییرات موقعیت مکانی را دریافت نمایید.

```java
public void startTrackingMe(long duration, long interval, float distance)
```
پارامتر اول `duration` مدت زمان انجام مکان‌یابی **برحسب ثانیه**، پارامتر دوم `interval` دوره زمانی اعلام موقعیت مکانی **برحسب ثانیه** و پارامتر سوم، `distance` حداقل میزان جابجایی مورد نیاز برای اعلام موقعیت مکانی **برحسب متر** می‌باشد.

>`نکته:`
>پس از پایان زمان تعیین شده، سرویس مکان‌یابی بصورت خودکار متوقف خواهدشد.

>`نکته:`
>توجه داشته باشید که در حالت Tracking متد `requestSingleLocation` عمل نخواهدکرد.

<br>

### تعیین محدوده جغرافیایی

قابلیت تعیین محدوده جغرافیایی یا `Geofence`‌ برای تعریف یک محدوده مشخص برای تشخیص ورود و خروج کاربر استفاده می‌شود.

با استفاده از متد `setUpGeofence` می‌توانید پارامترهای مورد نیاز Geofence‌ را تعریف و فعال نمایید، پس از تعریف این محدوده، می‌توان ورود و خروج کاربر به/از محدوده مورد نظر را تشخیص داد.

```java
public void setUpGeofence(final GeofenceParams params, String enterMessage, String exitMessage, int count)
```
`پارامتراول` این متد یک شی، از نوع `GeofenceParams` می باشد که لازم است مانند نمونه زیر مقداردهی شود:

```java
GeofenceParams geofenceParams = new GeofenceParams.Builder()
    .setCenter("geoFenceId", 35.759227, 51.401044)
    .setExpire(1508239200264)
    .setRadius(1200).build();
```
`پارامتر دوم` setUpGeofence یک پیام متنی برای نمایش در زمان ورود به محدوده مورد نظر است.
`پارامتر سوم` نیز پیام متنی برای نمایش در زمان خروج از محدوده می‌باشد.
`پارامتر چهارم` این متد نیز یک عدد برای تعیین حداکثر تعداد نمایش مجموع پیام‌های ورود و خروج به محدوده است.

<br>

#### متدهای GeofenceParams
متد `setCenter`

با استفاده از این متد می‌توانید مرکز محدوده مورد نظر را به همراه شناسه‌ای یکتا مشخص نمایید.
`پارامتر اول` این متد یک رشته‌ی حرفی است که بعنوان شناسه‌ی یکتا مورد استقاده قرار می‌گیرد و `پارامترهای بعدی` به ترتیب `طول و عرض جغرافیایی` مرکز محدوده مورد نظر می‌باشد.

متد `setExpire`

زمان منقضی شدن این Geofence برحسب میلی ثانیه را با این متد تنظیم کنید.

متد `setRadius`

شعاع محدوده تعیین شده را با این متد تنظیم نمایید.

<br>

#### حذف یک Geofence
به کمک متد `removeGeofenceById` و با شناسه یکتای Geofence که در زمان ایجاد آن تعیین نمودید می‌توانید Geofence موردنظر را حذف نمایید.

```java
public void removeGeofenceById(String geofenceId)
```

<br>

#### حذف گروهی Geofence ها
با استفاده از متد `removeGeofencesByIds` و لیستی از شناسه‌های Geofence ها می‌توانید همه آنها را یکجا حذف کنید.

```java
public void removeGeofencesByIds(List<String> geofenceIds)
```

<br>

### دریافت آخرین مکان ثبت شده کاربر

پس از اینکه کلاینت مکان‌یابی متصل شد، با استفاده از متد `getLastLocation` از شیء `locationManager` می توانید آخرین موقعیت مکانی ثبت شده را دریافت نمایید.

معمولا با استفاده از این مقدار می‌توانید مقداردهی‌های اولیه در نمایش را انجام دهید، مثلا می‌توانید آخرین موقعیت مکانی ثبت شده را برای نمایش نقطه اولیه روی نقشه دریافت نمایید.

توجه کنید که این موقعیت مکانی لزوما موقعیت مکانی جاری نمی‌باشد.

```java
public Location getLastLocation()
```

<!-- ### ارسال موقعیت مکانی کاربر به‌عنوان یک رویداد -->
<!-- به کمک متد publishLocation می‌توانید موقعیت مکانی کاربر را به‌عنوان رویدادی بنام geo به سرور چابک ارسال نمایید. -->
<!-- ```java -->
<!-- public void publishLocation(Location location) -->
<!-- ``` -->
<!-- >‍`نکته:` -->
<!-- >دقت کنید، موقعیت مکانی کاربر در دو وضعیت بصورت خودکار به‌عنوان رویداد geo ارسال می شود: -->
<!-- > -->
<!-- > ۱- وقتی متد `enableLocationOnLaunch` را فراخوانی می کنید. -->
<!-- > -->
<!-- > ۲- وقتی حالت سرویس‌دهی background‌ فعال باشد. -->
<!-- > -->
<!-- > لذا در این دوحالت لازم نیست متد `publishLocation` را فراخوانی کنید، زیرا بصورت خودکار فراخوانی می‌‌شود. -->

<br>

### متد enableBackgroundMode
درصورتی که بخواهید سرویس مکان‌یابی حتی زمانی که برنامه شما Terminate شده یا وقتی که در background قرار دارد، عمل گزارش موقعیت مکانی را ادامه دهد، می‌توانید توسط متد enableBackgroundMode آن را فعال کنید.

```java
public void enableBackgroundMode()
```

<br>

### متد disableBackgroundMode
برای غیرفعال‌سازی امکان background می‌توانید این متد را فراخوانی کنید.

```java
public void disableBackgroundMode()
```
وقتی حالت background غیرفعال باشد، با فراخوانی متد `stop` سرویس متوقف خواهد شد و درحالت kill‌ بودن برنامه، سرویس دریافت موقعیت مکانی فراخوانی نمی‌شود و شما به اطلاعات موقعیت مکانی دسترسی نخواهید داشت.

>`نکته:`
>برای جزيیات بیشتر درمورد دریافت موقعیت مکانی در حالت‌های مختلف، به بخش [تنظیمات مکان‌یابی](location-config.html) مراجعه کنید.
 

>`نکته:`
>وقتی از امکان Geofence و Tracking استفاده می‌کنید حالت Background‌ بصورت خودکار فعال می شود.

<br>

### isBackgoundModeEnabled

برای بررسی فعال بودن یا نبودن حالت background می‌توانید از این متد استفاده کنید، مقدار بازگشتی یک boolean‌ می‌باشد.

```java
public boolean isBackgoundModeEnabled()
```
