---
id: location-tracking
title: مکان یابی
layout: android
permalink: android/location-tracking.html
prev: location-config.html
---

### استفاده از شیء LocationManager
برای استفاده از امکانات مکان یابی چابک بایستی ابتدا شیء `LocationManager` را مقداردهی اولیه کنید، برای این کار متد `init` را با context موردنظر فراخوانی نمایید، به شکل زیر:

```java
LocationManager locationManger = LocationManager.init(getApplicationContext());
```

همه متدهای مورد نیاز برای بکارگیری امکانات مکان یابی در این شیء قرار دارد.

### درخواست شروع مکان یابی
برای شروع شما باید متد `startLocationUpdates`  را با پارامترهای مربوط که در ادامه توضیح داده می شود، صدا بزنید:

```java
public void startLocationUpdates(LocationParams params)
```
>`نکته:`
>قبل از ادامه توضیحات، توجه داشته باشید که برای دریافت گزارش بروزرسانی مکان بایستی توسط متد `addListener` کلاس مورد نظر برای دریافت بروزرسانی مکان را معرفی نمایید.

>`نکته:`
>درصورتی که نیازی به دریافت مداوم مکان ندارید، می توانید از روش های کم هزینه تر مانند درخواست فقط یکبار با استفاده از متد `requestSingleLocation` یا درخواست به مدت معین با استفاده از متد `startTrackingMe` و روشهای دیگری که توسط چابک ارائه می شود، استفاده نمایید.

### پارامتر ورودی LocationParams
پارامترهای مکان یابی برای تنظیم دقت، فاصله و دوره زمانی گزارش مکان توسط تنها پارامتر ورودی این متد انجام می شود.
این شیء برای تنظیمات اولیه مکان یاب می باشد.
بعنوان مثال نمونه زیر یک شیء برای ست کردن دقت مکان یابی، حداقل تغییر مکان و زمان تناوب بروزرسانی مکان را ست می کند:
```java
LocationParams params = new Builder().setAccuracy(LocationAccuracy.HIGH).setDistance(0).setInterval(500).build();
```
در این نمونه دقت مکان‌یابی حداکثر، جابجایی مکانی حداقل صفر و زمان تناوب گزارش مکان‌یابی ۵۰۰ میلی‌ثانیه می باشد.
در ادامه توضیحات هریک از متدهای شیء `LocationParams` را مشاهده می کنید.

### دقت مکان‌یابی
متد `setAccuracy`

برای تعیین دقت مکان‌یابی از این متد استفاده کنید.
```java
setAccuracy(LocationAccuracy accuracy)
```

برای مقداردهی اولیه آن بایستی یکی از مقادیر enum ذیل را انتخاب نمایید:

```java
enum LocationAccuracy {
    HIGH,
    MEDIUM,
    LOW,
    LOWEST
}
```
مقادیر فوق گویای میزان دقت مکان‌یابی هستند،‌هرچقدر دقت مکان یابی بیشتر باشد، مکان گزارش شده با خطای کمتری خواهد بود، از دیگرسو دقت بیشتر مصرف باتری بیشتری نیز به دنبال خواهد داشد.

- **HIGH**
این مقدار را برای دریافت حداکثر دقت مکان بکار ببرید، بااین تنظیم سرویس مکان‌یابی با احتمال زیادی از GPS برای تشخیص مکان استفاده خواهد کرد.

- **MEDIUM**
این مقدار را برای دریافت دقت مکان‌یابی در یک بلاک شهری بکار ببرید، که دقتی در حدود تقریبی ۱۰۰ متر دارد، این مقدار، خطای نسبتا بزرگی درنظر گرفته می شود، و به احتمال زیاد باتری کمتری مصرف خواهد کرد. با این تنظیم سرویس مکان‌یابی به احتمال زیاد از Wifi‌ و دکل های مخابراتی برای مکان‌یابی استفاده خواهد کرد.

>`نکته:`
>انتخاب منبع دریافت مکان به فاکتورهای زیاد دیگری بستگی دارد، مثلا در دسترس بودن هر منبع، اگر به هر دلیلی منبع مورد نظر در دسترس نباشد، فاکتورها تغییر خواهد کرد.


- **LOW**
این مقدار را برای دریافت دقت مکان‌یابی درسطح شهر در نظر بگیرید، که دقتی در حدود ۱۰ کیلومتر می باشد. با توجه به این نوع دقت مصرف باتری کمتری خواهیم داشت.

- **LOWEST**
اگر مصرف باتری برایتان خیلی مهم است، ولی بروزرسانی مکان را فقط وقتی در دسترس باشد نیاز دارید، از این مقدار استفاده کنید.
با این تنظیم برنامه شما هیچ بروزرسانی مکان را درخواست نخواهد کرد،‌ولی درخواست بروزرسانی توسط برنامه های دیگر را دریافت خواهد نمود.

### حداقل فاصله
متد `setDistance`

با استفاده از این متد حداقل فاصله برای تریگر کردن مکان‌یابی براساس متر می تواند تنظیم شود.
```java
setDistance(float distance)
```



### دوره تناوب دریافت مکان‌یابی
متد `setInterval`

 می توانید فاصله زمانی بین دریافت هر بروزرسانی مکان را براساس میلی‌ثانیه با این متد تنظیم نمایید.
```java
setInterval(long interval)
```


### متد addListener
برای دریافت گزارش بروزرسانی مکان بایستی توسط متد `addListener` کلاس مورد نظر برای دریافت بروزرسانی مکان را معرفی نمایید.
```java
public void addListener(OnLocationUpdateListener listener)
```

همچنین برای اینکه این listener را حذف نمایید، مثلا برای مدیریت lifecycle اکتیویتی در متد `onPause` می توانید متد `removeListener` را فراخوانی کنید:
‍
```java
public void removeListener()
```

قبل از اینکه کلاس خود را با متد `addListener` معرفی کنید،
 باید اینترفیس  `OnLocationUpdateListener` را برای کلاس مورد نظر خود که قصد دریافت مکان را در آن دارید پیاده سازی نمایید.
 
 ```java
 public interface OnLocationUpdateListener {
     void onConnected(@Nullable Bundle bundle);
     void onLocationUpdated(Location location);
     void onSuspended();
     void onConnectionFailed(ConnectionResult connectionResult);
     void onGeofencesRegisteredSuccessful();
 }
 ```
 
به عنوان مثال کلاس GeoFragment در نمونه کد زیر اینترفیس `OnLocationUpdateListener` را پیاده سازی نموده است:

```java
public class GeoFragment extends Fragment 
    implements OnLocationUpdateListener {
    
    private LocationManager locationManger;
    
    @Override
    public View onCreateView(LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        view = inflater.inflate(R.layout.fragment_geo, container, false);
        
        locationManger = LocationManager.init(getContext());
        locationManger.addListener(this);
        
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

### متدهای OnLocationUpdateListener

متد `onConnected`

وقتی کلاینت مکان‌یابی متصل شد، این متد فراخوانی خواهدشد
معمولا در اینجا می توانید مقداردهی های اولیه در نمایش را انجام دهید، مثلا با فراخوانی متد `getLastLocation` از شیء `locationManager` می توانید آخرین مکان ثبت شده را برای نمایش نقطه اولیه روی نقشه دریافت نمایید.

متد `onLocationUpdated`

هربار که مکان براساس تنظیمات اولیه بروزرسانی شود، این متد فراخوانی شده و شیء `Location` شامل اطلاعات نقطه جغرافیایی مورد نظر را می دهد.

متد `onSuspended`

وقتی کلاینت مکان‌یابی بصورت موقت در وضعیت عدم اتصال قرار بگیرد، فراخوانی می شود.

متد `onConnectionFailed`

وقتی کلاینت مکان‌یابی در عملیات اتصال ناموفق بود، فراخوانی می شود.

متد `onGeofencesRegisteredSuccessful`

درصورتی که با متد `setUpGeofence` اقدام به تعریف geofence کرده باشید و با موفقیت ثبت شود، متد فوق فراخوانی خواهد شد.



### دریافت موقعیت مکانی یکبار در زمان شروع برنامه 
با استفاده از متد `enableLocationOnLaunch` می توانید گزارش مکان را در کلاس listener ‌خود برای یکبار دریافت نمایید، پس از یکبار گزارش، سرویس مکان یابی بصورت خودکار متوقف خواهد شد.
می توانید این متد را در جای مناسبی مانند `onCreate` اکتیویتی یا کلاس `Application‌` فراخوانی نمایید.
```java
public void enableLocationOnLaunch()
```
توجه نمایید که برای دریافت گزارش مکان باید کلاس listener ‌خود  را برای دریافت این گزارش معرفی کرده باشید.

### دریافت یک موقعیت مکانی
 با هربار فراخوانی متد `requestSingleLocation` می توانید مکان بروزشده را یکبار در کلاس listener خود دریافت نمایید.

```java
public void requestSingleLocation(final LocationListener listener)
```
با استفاده از این متد می توانید توسط پارامتر ورودی `LocationListener` یکبار درخواست مکان یابی نمایید و در متد مربوط در زمان فراخوانی آن، مکان بروز شده را دریافت و مورد استفاده قرار دهید، به این صورت:
```java
locationManager.requestSingleLocation(new LocationListener() {
            @Override
            public void onLocationChanged(Location location) {
                // Do what you want with location
            }
        });
```
>`نکته:`
>درصورتی که با استفاده از متد `startTrackingMe` مکان یابی زماندار را فعال کرده باشید، تا زمانی که این مدت زمان به پایان نرسیده است، متد `requestSingleLocation` عمل نخواهد کرد.

### مکان یابی براساس مدت زمان و متر
با کمک متد `startTrackingMe` می توانید در طول زمانی مشخص، با یک تناوب زمانی معین و حداقل فاصله جابجایی، گزارش مکان‌یابی را دریافت نمایید.
```java
public void startTrackingMe(long duration, long interval, float distance)
```
پارامتر اول `duration` مدت زمان انجام مکان یابی و پارامتر دوم `interval` دوره زمانی اعلام مکان برحسب ثانیه و پارامتر سوم، `distance` حداقل میزان جابجایی مورد نیاز برای اعلام مکان برحسب متر می باشد.

>`نکته:`
>پس از پایان زمان تعیین شده، سرویس مکان یابی بصورت خودکار متوقف خواهد شد.

>`نکته:`
>توجه داشته باشید که در حالت Tracking متد `requestSingleLocation` عمل نخواهد کرد.

### Geofence
قابلیت حصار جغرافیایی یا Geofence‌ برای تعریف یک محدوده مشخص برای مکان یابی کاربر استفاده می شود.
با استفاده از متد `setUpGeofence` می توانید پارامترهای مورد نیاز Geofence‌ را تعریف و فعال نمایید،‌این 
با تعریف Geofence می توان ورود و خروج کاربر به/از محدوده مورد نظر را تشخیص داد.

```java
public void setUpGeofence(final GeofenceParams params, String enterMessage, String exitMessage, int count)
```
پارامتراول این متد یک شی، از نوع `GeofenceParams` می باشد که بایستی مانند نمونه زیر مقداردهی شود:

```java
GeofenceParams geofenceParams = new GeofenceParams.Builder()
    .setCenter("geoFenceId", 35.759227, 51.401044)
    .setExpire(1508239200264)
    .setRadius(1200).build();
```
پارامتر دوم `setUpGeofence` یک پیام متنی برای نمایش در زمان ورود به محدوده مورد نظر است.
پارامتر سوم نیز پیام متنی برای نمایش در زمان خروج از محدوده می باشد.
پارامتر چهارم این متد نیز یک عدد برای تعیین حداکثر تعداد نمایش مجموع پیامهای ورود و خروج به محدوده است.

### متدهای GeofenceParams
متد `setCenter`

با استفاده از متد `setCenter` بایستی مرکز محدوده مورد نظر را به همراه شناسه ای یکتا مشخص نمایید.
پارامتر اول این متد یک مقدار String بعنوان شناسه یکتا و پارامترهای بعدی به ترتیب طول و عرض جغرافیایی مرکز محدوده مورد نظر می باشد.

متد `setExpire`

زمان منقضی شدن این Geofence برحسب میلی ثانیه در آینده، را با این متد تنظیم کنید.

متد `setRadius`

شعاع محدوده تعیین شده را با این متد تنظیم نمایید.


### حذف یک Geofence
به کمک متد `removeGeofenceById` و با شناسه یکتای Geofence که در زمان ایجاد آن تعیین نمودید می توانید این Geofence را حذف نمایید.
```java
public void removeGeofenceById(String geofenceId)
```

### حذف گروهی Geofence ها
با استفاده از متد `removeGeofencesByIds` و لیستی از شناسه های Geofence ها می توانید همه آنها را یکجا حذف کنید.
```java
public void removeGeofencesByIds(List<String> geofenceIds)
```

### دریافت آخرین مکان ثبت شده کاربر
پس از اینکه کلاینت مکان یابی متصل شد، می توانید با استفاده از متد getLastLocation آخرین مکان ثبت شده کاربر را دریافت کنید که لزوما مکان بروزشده نمی باشد.
```java
public Location getLastLocation()
```

### ارسال موقعیت مکانی کاربر بعنوان یک رویداد
به کمک متد publishLocation می توانید موقعیت مکانی کاربر را بعنوان رویدادی بنام geo ارسال نمایید.
```java
public void publishLocation(Location location)
```

### متد enableBackgroundMode
درصورتی که بخواهید سرویس مکان‌یابی حتی زمانی که برنامه شما Terminate شده یا وقتی که در background قرار دارد، عمل گزارش مکان را ادامه دهد، می توانید توسط متد enableBackgroundMode آن را فعال کنید.
```java
public void enableBackgroundMode()
```

### متد disableBackgroundMode
برای غیرفعالسازی امکان background service می توانید این متد را فراخوانی کنید.
```java
public void disableBackgroundMode()
```
با فراخوانی این متد درحالت kill‌ بودن برنامه سرویس مکانی فراخوانی نمی شود و شما به اطلاعات مکانی دسترسی نخواهید داشت.

>`نکته:`
>وقتی از امکان Geofence و Tracking استفاده می کنید حالت Background‌ بصورت خودکار فعال می شود.

### isBackgoundModeEnabled
برای بررسی فعال بودن یا نبودن امکان background service می توانید از این متد استفاده کنید، مقدار بازگشتی یک boolean‌ می باشد.
```java
public boolean isBackgoundModeEnabled()
```


