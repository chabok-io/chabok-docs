---
id: location-tracking 
title: خدمات مکانی
layout: ios 
permalink: ios/location-tracking.html 
prev: behavior-tracking.html
next: event-handling.html
---

چابک به طور گسترده از **خدمات مکانی (Location Services)** پشتیبانی می‌کند. از جمله این خدمات **رصد موقعیت مکانی کاربر** (Geo-tracking یا location tracking)، **تعیین محدوده جغرافیایی** (Geo-fencing)، **پوش بر اساس موقعیت مکانی** (Location-Based Push Notifications) و **پوش خودکار مکانی** (Geofence Push Notifications) است.

<br>

### ارسال موقعیت مکانی بدون پیاده‌سازی کتابخانه موقعیت مکانی چابک

اگر سرویس لوکیشن در اپلیکیشن‌تان پیاده‌سازی شده و قصد اضافه کردن کتابخانه جدید برای ارسال موقعیت مکانی را ندارید، از طریق کد زیر می‌توانید موقعیت مکانی کاربران را برای چابک ارسال کنید: 

{% tabs %}
{% tab OBJECTIVE-C %}

```objectivec
- (void) publishLocation:(CLLocation *)location {
    NSDate *date = location.timestamp;
    double lat = location.coordinate.latitude;
    double lng = location.coordinate.longitude;
    NSTimeInterval ts = [date timeIntervalSince1970] * 1000;
    
    NSDictionary *payload = @{
        @"lat": @(lat),
        @"lng": @(lng),
        @"ts" : @(ts)
    }
    
    [PushClientManager.defaultManager publishEvent:@"geo" data:payload];
}
```

{% endtab %}
{% tab SWIFT %}

```swift
func publishLocation(location: CLLocation) {
 let ts = location?.timestamp
 let lat = location?.coordinate.latitude ?? 0.0
 let lng = location?.coordinate.longitude ?? 0.0
 
 var payload = [
  "lat": lat,
  "lng": lng,
  "ts": ts
 ]
        
 PushClientManager.default()?.publishEvent("geo", data: payload)
}
```
{% endtab %}
{% endtabs %}

> `نکته:` از ارسال موقعیت مکانی در فاصله زمانی کمتر از ۱۰ ثانیه خودداری کنید.


### مجوز های مورد نیاز موقعیت مکانی

برای استفاده از امکان موقعیت مکانی، نیازمند دریافت مجوزهای زیر می باشد که توضیحات لازم برای هر بخش در زیر آورده شده است :

 1. دسترسی به موقعیت مکانی
 2. مجوز استفاده از موقعیت مکانی

#### ۱- دسترسی به موقعیت مکانی
برای استفاده از موقعیت مکانی در حالت `Background Mode`، ابتدا وارد بخش `Capabilities` پروژه خود شده و از قسمت `Background Modes` گزینه `Location updates` را فعال کنید.

> `نکته` : در صورت فعال نمودن گزینه فوق، کلید `location` باید به فایل `info.plist` اضافه شود، همانند کد زیر :

```markup
<key>UIBackgroundModes</key>
<array>
    ....
    <string>location</string>
    ....
</array>
```

#### ۲- مجوز استفاده از موقعیت مکانی
استفاده از موقعیت مکانی دارای دو حالت، `WhileInUse` , `Always` است که شرح آنها به صورت زیر می باشد :

 - **WhenInUse** : استفاده از موقعیت مکانی، زمانی که نرم افزار در حالت `Foreground` باشد 
 - **Always** : استفاده از موقعیت مکانی، در تمام حالات اجرای نرم افزار (`Foreground`, `Background`)

برای استفاده از هر یک از این حالات کلید دلخواه را در فایل `info.plist` قرار دهید، متن قرار گرفته شده در تگ `string` متن پیامی است که پس از اعلان دریافت مجوز موقعیت مکانی به کاربر نشان داده خواهد شد.
```markup
<key>NSLocationAlwaysUsageDescription</key>
<string>App would like to use your location.</string>
<key>NSLocationWhenInUseUsageDescription</key>
<string>Allow use to access your current location so we can autofill your start/end</string>
```

> `نکته` : در نسخه `iOS 11` باید تمام کلید ها به همراه کلید `NSLocationAlwaysAndWhenInUseUsageDescription` در فایل `info.plist` قرار داده شود.

```markup
<key>NSLocationAlwaysUsageDescription</key>
<string>App would like to use your location.</string>
<key>NSLocationWhenInUseUsageDescription</key>
<string>Allow use to access your current location so we can autofill your start/end</string>
<key>NSLocationAlwaysAndWhenInUseUsageDescription</key>
<string>Allow use to access your current location Always or InUse</string>
```

### ارسال موقعیت مکانی در هنگام باز شدن اپلیکیشن

با فعال کردن قابلیت `enableLocationOnLaunch`، کتابخانه چابک به هنگام باز شدن برنامه و در صورت پیدا کردن موقعیت مکانی کاربر،‌ موقعیت آن را توسط [انتشار رویداد](/ios/events.html) به سرور ارسال می کند.

> `نکته` : برای ارسال داده خاصی همراه با انتشار رویداد فوق می توانید
> داده خود را property به `locationOnLaunchWithDictionary` داده تا همراه
> با انتشار رویداد ارسال شود.

{% tabs %}
{% tab OBJECTIVE-C %}

```objectivec
[self.manager.enableLocationOnLaunch = YES];
```
{% endtab %}
{% tab SWIFT %}

```swift
self.manager?.enableLocationOnLaunch = true
```
{% endtab %}
{% endtabs %}

<br><br>

### کلاس CoreGeoLocation 
در ابزار جدید چابک، امکان دریافت موقعیت مکانی کاربر فراهم شده است. برای استفاده از کلاس `CoreGeoLocation` می توانید کلاس فوق را به کلاس خود import کنید:

{% tabs %}
{% tab OBJECTIVE-C %}

```objectivec
#import "CoreGeoLocation.h"
.
.
.
CoreGeoLocation *locationManager =  [CoreGeoLocation sharedInstance];
```
{% endtab %}
{% tab SWIFT %}

``` swift
import AdpPushClient
.
.
.
let locationManager = CoreGeoLocation.sharedInstance()
```
{% endtab %}
{% endtabs %}

> `نکته :`  برای استفاده از قابلیت مکان یابی، پیکربندی های لازم که در
> بخش [پیش نیازهای مکان‌یابی](/ios/location-config.html) بیان شده را
> مطالعه کرده و از آن پیروی کنید.

### دریافت موقعیت مکانی
ابتدا پیکربندی متناسب برای دریافت موقعیت مکانی را تعیین کرده و با استفاده از متد `startLocationUpdate` شروع به دریافت موقعیت مکانی کاربر کنید. به قطعه کد زیر دقت کنید‌:

{% tabs %}
{% tab OBJECTIVE-C %}

```objectivec
CoreGeoLocation *locationManager =  [CoreGeoLocation sharedInstance];

[locationManager addDelegate:self];
[locationManager setDistanceFilter:50];
[locationManager setPausesAutomaticUpdate:NO];
[locationManager setLocationAutorization:kAlways];
[locationManager setAllowBackgroundLocationUpdates:YES];
[locationManager setDesiredAccuracy:kCLLocationAccuracyBest];

[locationManager startLocationUpdate];
```
{% endtab %}
{% tab SWIFT %}

``` swift
let locationManager = CoreGeoLocation.sharedInstance()
            
locationManager.add(self)
locationManager.distanceFilter = 50
locationManager.pausesAutomaticUpdate = false
locationManager.locationAutorization = kAlways
locationManager.allowBackgroundLocationUpdates = true
locationManager.desiredAccuracy = kCLLocationAccuracyBest
            
locationManager.startUpdate()
```
{% endtab %}
{% endtabs %}

### رویداد دریافت موقعیت مکانی

جهت دریافت موقعیت های مکانی باید `CoreGeoLocationDelegate`  را به `@interface`  کلاس خود اضافه کنید و متد زیر را پیاده سازی کنید :

{% tabs %}
{% tab OBJECTIVE-C %}

```objectivec
- (void) receivedLocationUpdates:(NSArray<CLLocation *> *)locations{
    NSInteger length = locations.count;
    CLLocation *lastLocation = [locations lastObject];
    double latitude = lastLocation.coordinate.latitude;
    double longitude = lastLocation.coordinate.longitude;
    
    NSLog(@"%zd new locations was received, last location (lat:'%f') , (lng:'%f')",
          length,latitude,longitude);
    
    self.locationManager.customizeGeoData = ^NSDictionary * _Nullable
    (CLLocation * _Nullable location) {
        NSDictionary *data = @{@"speed":@(location.speed),
                               @"user":@"ADP"
                               };
        return data;
    };
}
```
{% endtab %}
{% tab SWIFT %}

``` swift
func receivedLocationUpdates(_ locations: [CLLocation]) {
    let length: Int = locations.count
    let lastLocation: CLLocation? = locations.last
    let latitude = lastLocation?.coordinate.latitude
    let longitude = lastLocation?.coordinate.longitude
  
    print("\(length) new locations was received, last location (lat:'\(latitude)') , (lng:'\(longitude)')")
  
  	locationManager?.customizeGeoData = {
            (location: CLLocation?) -> [AnyHashable: Any] in
            let data = ["speed": location?.speed, "user": "ADP"] as [String : Any]
            return data
    }
}
```
{% endtab %}
{% endtabs %}

> `نکته`: چابک بصورت خودکار اقدام به publish موقعیت مکانی می‌کند، برای افزودن داده مورد نیاز همراه با موقعیت مکانی، باید Closures `customizeGeoData` را پیاده سازی کنید.
>
> `نکته` : برای جلوگیری publish موقعیت مکانی توسط چابک، مقدار بازگشتی Closures `customizeGeoData`‌ را ‌**nil** قرار دهید.

### مکان یابی بر اساس مدت زمان و فاصله

با استفاده از متد `trackMeUntil:byMeter` می توانید موقعیت کاربر را بر اساس فاصله و بازه زمانی (**برحسب ثانیه**) تعیین شده دنبال کنید :

{% tabs %}
{% tab OBJECTIVE-C %} 

```objectivec
CoreGeoLocation *locationManager =  [CoreGeoLocation sharedInstance];
[locationManager trackMeUntil:3600 byMeter:100];
```
{% endtab %}
{% tab SWIFT %}

``` swift
let locationManager = CoreGeoLocation.sharedInstance()
locationManager.trackMe(until: 3600, byMeter:100)
```
{% endtab %}
{% endtabs %}

> `نکته :` دقت داشته باشید که مدت زمان در متد `trackMeUntil` برحسب ثانیه است. به عنوان مثال در کد بالا مدت زمان ۳۶۰۰ ثانیه تعیین شده است.

> `نکته :`  متد فوق بعد از دریافت موقعیت مکانی، رویداد 
> `receivedLocationUpdates:locations` را فراخوانی می کند. همچنین پس از
> پایان زمان تعیین شد به صورت خودکار عملیات مکان یابی را متوقف می سازد،
> با متوقف کردن موقعیت کاربر رویداد `didStoppedTrackingMe` فراخوانی
> خواهد شد.

برای بررسی وضعیت مکان یابی کاربر می توانید از متد زیر استفاده کنید :

{% tabs %}
{% tab OBJECTIVE-C %}

```objectivec
trackingStateEnumType trackingState = [locationManager trackingMeState];
if (trackingState == kTracking) {
    NSLog(@"We are tracking user...");
} else if (trackingState == kStopped) {
    NSLog(@"Tracking user was stopped...");
} else {
    NSLog(@"Tracking user interval was expired...");
}
```
{% endtab %}
{% tab SWIFT %}

``` swift
let trackingState: trackingStateEnumType = locationManager.trackingMeState()
if trackingState == kTracking {
    print("We are tracking user...")
} else if trackingState == kStopped {
    print("Tracking user was stopped...")
} else {
    print("Tracking user interval was expired...")
}
```
{% endtab %}
{% endtabs %}

جهت متوقف سازی عملیات مکان یابی کار کاربر متد فوق را فراخوانی کنید :

{% tabs %}
{% tab OBJECTIVE-C %}

```objectivec
[locationManager stopTracking];
```
{% endtab %}
{% tab SWIFT %}

``` swift 
locationManager.stopTracking()
```
{% endtab %}
{% endtabs %}

### دریافت یک موقعیت مکانی
به کمک متد `requestSingleLocation` می توانید تنها یک موقعیت مکانی دریافت کنید.

{% tabs %}
{% tab OBJECTIVE-C %}

```objectivec
[locationManager requestSingleLocation:^(CLLocation * _Nullable location, NSError * _Nullable error) {
    if (location != nil) {
        NSLog(@"Single location was received");
    }
}];
```
{% endtab %}
{% tab SWIFT %}

``` swift 
locationManager.requestSingleLocation({(_ location: CLLocation?, _ error: Error?) -> Void in
    if location != nil {
        print("Single location was received")
    }
})
```
{% endtab %}
{% endtabs %}

> `نکته :` با فراخوانی متد فوق ممکن است به عملکرد متدهای 
> `trackMeUntil:byMeter` و `startLocationUpdate‍` اختلال ایجاد کند.
>
> `نکته` : با فراخوانی متد `requestSingleLocation` چابک اقدام به publish موقعیت مکانی نمی‌کند.

### دریافت موقعیت مکانی در حالت Terminated
امکان دریافت موقعیت مکان حتی در حالتی که اپلیکشن شما `Terminate` شده باشد نیز وجود دارد.
{% tabs %}
{% tab OBJECTIVE-C %}

```objectivec
[locationManager startMonitoringSignificantLocationChanges];
```
{% endtab %}
{% tab SWIFT %}

``` swift
locationManager.startMonitoringSignificantLocationChanges()
```
{% endtab %}
{% endtabs %}

> `نکته :‍` برای فعال شدن این قابلیت باید حتما `authorization` مربوط به 
> location روی حالت `kAlways` باشد.

> `نکته :` متد فوق ممکن است پس از پیمودن ۵۰۰ متر یا بیشتر اپلیکیشن را به
> صورت کامل در background اجرا کند. برای داشتن تغییرات موقعیت کاربری به
> صورت مداوم باید کلید `launchOptions` را از رویداد
> `didFinishLaunchingWithOptions` و در صورت اجرا شدن توسط `location` متد
> `startLocationUpdate‍` را فراخوانی کنید. قطعه کد زیر بیانگر این نکته
> می باشد.

{% tabs %}
{% tab OBJECTIVE-C %}

```objectivec
- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
    if ([launchOptions objectForKey:UIApplicationLaunchOptionsLocationKey]){
        //App was launch by location update
        CoreGeoLocation *locationManager =  [CoreGeoLocation sharedInstance];
        [locationManager startLocationUpdate];
    }
}
```
{% endtab %}
{% tab SWIFT %}

``` swift
func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplicationLaunchOptionsKey: Any]?) -> Bool {
    if launchOptions?[.location] != nil {
        //App was launch by location update
        let locationManager = CoreGeoLocation.sharedInstance()
        locationManager.startUpdate()
    }
    return true
}
```
{% endtab %}
{% endtabs %}

### محدوده جغرافیایی

جهت استفاده از قابلیت `Geofence` باید متد `startMonitoringRegion` را فراخوانی کنید. متد فوق دارای سه overload می باشد :

{% tabs %}
{% tab OBJECTIVE-C %}

```objectivec
-(void) startMonitoringRegion:(CLRegion *_Nonnull) region;

-(void) startMonitoringRegion:(CLLocationCoordinate2D) center radius:(CLLocationDistance) radius identifier:(NSString *_Nonnull) identifier;

-(void) startMonitoringRegion:(CLRegion *_Nonnull) region
                  expireCount:(NSInteger) count
                     expireTs:(NSTimeInterval) ts
                 enterMessage:(NSString *_Nullable) enter
                  exitMessage:(NSString *_Nullable) exit;
```
{% endtab %}
{% tab SWIFT %}

``` swift
func startMonitoringRegion(_ region: CLRegion)
func startMonitoringRegion(_ center: CLLocationCoordinate2D, radius: CLLocationDistance, identifier: String)
func startMonitoringRegion(_ region: CLRegion, expireCount count: Int, expireTs ts: TimeInterval, enterMessage enter: String?, exitMessage exit: String?)
```
{% endtab %}
{% endtabs %}

> `نکته ` : برای استفاده قابلیت Geofence شما نیاز به استفاده از
> `startLocationUpdate` و یا `startMonitoringSignificantLocationChanges`
> نیست.

نمونه کد فوق استفاده از قابلیت geofence را به شما نشان می دهد : 

{% tabs %}
{% tab OBJECTIVE-C %}

```objectivec
CLLocationCoordinate2D center = CLLocationCoordinate2DMake(35.759227, 51.401044);
    CLRegion *region = [[CLCircularRegion alloc] initWithCenter:center radius:150 identifier:@"adpDigitalCompany"];
[_locationManager startMonitoringRegion:region];
```
{% endtab %}
{% tab SWIFT %}

``` swift
var center: CLLocationCoordinate2D = CLLocationCoordinate2DMake(35.759227, 51.401044)

var region: CLRegion? = CLCircularRegion(center: center, radius: 150, identifier: "adpDigitalCompany")

locationManager.startMonitoringRegion(region)
```
{% endtab %}
{% endtabs %}

چنانچه می خواهید یک geofence را start کنید که بتوانید بصورت بسیار ساده آن را مدیریت کنید، می توانید از قطعه کد زیر استفاده کنید :

> `نکته` : زمان انقضای تاریخ geofence به صورت `unix millisecond` می
> باشد.

{% tabs %}
{% tab OBJECTIVE-C %}

```objectivec
NSInteger count = 20; // count for enter to region
CLLocationDistance radius = 150; // per meter
CLLocationDegrees lat = 35.759227;
CLLocationDegrees lng = 51.401044;
NSString *exit = @"You exit to AdpDigital company building.....";
NSString *enter = @"Hi dear user, You are close to AdpDigital company building.....";
CLLocationCoordinate2D coordinate = CLLocationCoordinate2DMake(lat, lng);
NSTimeInterval expireTs = [[NSDate dateWithTimeIntervalSinceNow:3600] timeIntervalSince1970];
CLRegion *region = [[CLCircularRegion alloc] initWithCenter:coordinate
                        radius:radius
                        identifier:@"adpDigitalCompany"];
    
[_locationManager startMonitoringRegion:region expireCount:count expireTs:expireTs enterMessage:enter exitMessage:exit];
```
{% endtab %}
{% tab SWIFT %}

``` swift
let count: Int = 20 // count for enter to region
let radius: CLLocationDistance = 150 // per meter
let lat: CLLocationDegrees = 35.759227
let lng: CLLocationDegrees = 51.401044
let exitMessage = "You exit to AdpDigital company building....."
let enterMessage = "Hi dear user, You are close to AdpDigital company building....."
let coordinate: CLLocationCoordinate2D = CLLocationCoordinate2DMake(lat, lng)
let expireTs: TimeInterval = Date(timeIntervalSinceNow: 3600).timeIntervalSince1970
let region: CLRegion? = CLCircularRegion(center: coordinate, radius: radius, identifier: "adpDigitalCompany")

locationManager.startMonitoringRegion(region!, expireCount: count, expireTs: expireTs, enterMessage: enterMessage, exitMessage: exitMessage)
```
{% endtab %}
{% endtabs %}
#### رویدادهای محدوده جغرافیایی

پس از فراخوانی متد `startMonitoringRegion` رویدادهای زیر فرخوانی خواهند شد :

{% tabs %}
{% tab OBJECTIVE-C %}

```objectivec
-(void) didEnterToRegion:(CLRegion *)region{
    NSLog(@"Hi dear user, You are close to AdpDigital company building.....");
}

-(void) didExitFromRegion:(CLRegion *)region{
    NSLog(@"You exit to AdpDigital company building.....");
}
    
-(void) didStartMonitoringRegion:(CLRegion *)region{
    NSLog(@"Start monitoring %@ region",region.identifier);
}
```
{% endtab %}
{% tab SWIFT %}

``` swift
func didEnter(to region: CLRegion) {
    print("Hi dear user, You are close to AdpDigital company building.....")
}

func didExit(from region: CLRegion) {
    print("You exit to AdpDigital company building.....")
}

func didStartMonitoringRegion(_ region: CLRegion) {
    print("Start monitoring \(region.identifier) region")
}
```
{% endtab %}
{% endtabs %}

برای متوقف سازی geofence می توانید از متد های زیر استفاده کنید :

{% tabs %}
{% tab OBJECTIVE-C %}

```objectivec
[_locationManager stopMonitoringAllRegions];
[_locationManager stopMonitoringRegion:region];
```
{% endtab %}
{% tab SWIFT %}

``` swift
locationManager.stopMonitoringAllRegions()
locationManager.stopMonitoringRegion(region!)
```
{% endtab %}
{% endtabs %}
