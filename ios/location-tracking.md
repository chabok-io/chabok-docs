--- 
id: location-tracking 
title: مکان‌یابی 
layout: ios 
permalink: ios/location-tracking.html 
prev: location-config.html
next: features.html
---
### کلاس CoreGeoLocation 
در ابزار جدید چابک، امکان دریافت موقعیت مکانی کاربر امکان پذیر شده است. برای استفاده از کلاس `CoreGeoLocation` می توانید کلاس فوق را به کلاس خود import کنید:
``` objc
//Objective-C :

#import "CoreGeoLocation.h"
.
.
.
CoreGeoLocation *locationManager =  [CoreGeoLocation sharedInstance];
```
``` swift
//Swift :

import AdpPushClient
.
.
.
let locationManager = CoreGeoLocation.sharedInstance()
```

> `نکته :`  برای استفاده از قابلیت مکان یابی، پیکربندی های لازم که در
> بخش [پیش نیازهای مکان‌یابی](/ios/location-config.html) بیان شده را
> مطالعه کرده و از آن پیروی کنید.

### دریافت موقعیت مکانی
ابتدا پیکربندی متناسب برای دریافت موقعیت مکانی را تعیین کرده و با استفاده از متد `startLocationUpdate` شروع به دریافت موقعیت مکانی کاربر کنید. به قطعه کد زیر دقت کنید‌:
``` objc
//Objective-C :

CoreGeoLocation *locationManager =  [CoreGeoLocation sharedInstance];

[locationManager addDelegate:self];
[locationManager setDistanceFilter:50];
[locationManager setPausesAutomaticUpdate:NO];
[locationManager setLocationAutorization:kAlways];
[locationManager setAllowBackgroundLocationUpdates:YES];
[locationManager setDesiredAccuracy:kCLLocationAccuracyBest];

[locationManager startLocationUpdate];
```
``` swift
//Swift :

let locationManager = CoreGeoLocation.sharedInstance()
            
locationManager.add(self)
locationManager.distanceFilter = 50
locationManager.pausesAutomaticUpdate = false
locationManager.locationAutorization = kAlways
locationManager.allowBackgroundLocationUpdates = true
locationManager.desiredAccuracy = kCLLocationAccuracyBest
            
locationManager.startUpdate()
```
### رویداد دریافت موقعیت مکانی
جهت دریافت موقعیت های مکانی باید `CoreGeoLocationDelegate`  را به `@interface`  کلاس خود اضافه کنید و متد زیر را پیاده سازی کنید :
``` objc
//Objective-C :

- (void) receivedLocationUpdates:(NSArray<CLLocation *> *)locations{
    NSInteger length = locations.count;
    CLLocation *lastLocation = [locations lastObject];
    double latitude = lastLocation.coordinate.latitude;
    double longitude = lastLocation.coordinate.longitude;

    NSLog(@"%zd new locations was received, last location (lat:'%f') , (lng:'%f')",
        length,latitude,longitude);
}
```
``` swift
//Swift :

func receivedLocationUpdates(_ locations: [CLLocation]) {
    let length: Int = locations.count
    let lastLocation: CLLocation? = locations.last
    let latitude = lastLocation?.coordinate.latitude
    let longitude = lastLocation?.coordinate.longitude
    print("\(length) new locations was received, last location (lat:'\(latitude)') , (lng:'\(longitude)')")

}
```

### مکان یابی بر اساس مدت زمان و متر
با استفاده از متد `trackMeUntil:byMeter` می توانید موقعیت کاربر را بر اساس متراژ و بازه زمانی تعیین شده دنبال کنید : 
``` objc
//Objective-C :

CoreGeoLocation *locationManager =  [CoreGeoLocation sharedInstance];
[locationManager trackMeUntil:3600 byMeter:100];
```
``` swift
//Swift :

let locationManager = CoreGeoLocation.sharedInstance()
locationManager.trackMe(until: 3600, byMeter:100)
```

> `نکته :`  متد فوق بعد از دریافت موقعیت مکانی، رویداد 
> `receivedLocationUpdates:locations` را فراخوانی می کند. همچنین پس از
> پایان زمان تعیین شد به صورت خودکار عملیات مکان یابی را متوقف می سازد،
> با متوقف کردن موقعیت کاربر رویداد `didStoppedTrackingMe` فراخوانی
> خواهد شد.

برای بررسی وضعیت مکان یابی کاربر می توانید از متد زیر استفاده کنید :
``` objc
//Objective-C :

trackingStateEnumType trackingState = [locationManager trackingMeState];
if (trackingState == kTracking) {
    NSLog(@"We are tracking user...");
} else if (trackingState == kStopped) {
    NSLog(@"Tracking user was stopped...");
} else {
    NSLog(@"Tracking user interval was expired...");
}
```
``` swift
//Swift :

let trackingState: trackingStateEnumType = locationManager.trackingMeState()
if trackingState == kTracking {
    print("We are tracking user...")
} else if trackingState == kStopped {
    print("Tracking user was stopped...")
} else {
    print("Tracking user interval was expired...")
}
```
جهت متوقف سازی عملیات مکان یابی کار کاربر متد فوق را فراخوانی کنید :
``` objc
//Objective-C :

[locationManager stopTracking];
```

``` swift 
//Swift :

locationManager.stopTracking()
```
### دریافت یک موقعیت مکانی
به کمک متد `requestSingleLocation` می توانید تنها یک موقعیت مکانی دریافت کنید.
``` objc
//Objective-C :

[locationManager requestSingleLocation:^(CLLocation * _Nullable location, NSError * _Nullable error) {
    if (location != nil) {
        NSLog(@"Single location was received");
    }
}];
```
``` swift 
//Swift :

locationManager.requestSingleLocation({(_ location: CLLocation?, _ error: Error?) -> Void in
    if location != nil {
        print("Single location was received")
    }
})
```

> `نکته :` با فراخوانی متد فوق ممکن است به عملکرد متدهای 
> `trackMeUntil:byMeter` و `startLocationUpdate‍` اختلال ایجاد کند.

### دریافت موقعیت مکانی در حالت Terminated
امکان دریافت موقعیت مکان حتی در حالتی که اپلیکشن شما `Terminate` شده باشد نیز وجود دارد.
``` objc
//Objective-C :

[locationManager startMonitoringSignificantLocationChanges];
```
``` swift
//Swift :

locationManager.startMonitoringSignificantLocationChanges()
```

> `نکته :‍` برای فعال شدن این قابلیت باید حتما `authorization` مربوط به 
> location روی حالت `kAlways` باشد.

> `نکته :` متد فوق ممکن است پس از پیمودن ۵۰۰ متر یا بیشتر اپلیکیشن را به
> صورت کامل در background اجرا کند. برای داشتن تغییرات موقعیت کاربری به
> صورت مداوم باید کلید `launchOptions` را از رویداد
> `didFinishLaunchingWithOptions` و در صورت اجرا شدن توسط `location` متد
> `startLocationUpdate‍` را فراخوانی کنید. قطعه کد زیر بیانگر این نکته
> می باشد.

``` objc
//Objective-C :

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
    if ([launchOptions objectForKey:UIApplicationLaunchOptionsLocationKey]){
        //App was launch by location update
        CoreGeoLocation *locationManager =  [CoreGeoLocation sharedInstance];
        [locationManager startLocationUpdate];
    }
}
```
``` swift
//Swift :

func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplicationLaunchOptionsKey: Any]?) -> Bool {
    if launchOptions?[.location] != nil {
        //App was launch by location update
        let locationManager = CoreGeoLocation.sharedInstance()
        locationManager.startUpdate()
    }
    return true
}
```

### محدوده جغرافیایی
جهت استفاده از قابلیت `Geofence` باید متد `startMonitoringRegion` را فراخوانی کنید. متد فوق دارای سه overload می باشد :

``` objc
//Objective-C :

-(void) startMonitoringRegion:(CLRegion *_Nonnull) region;

-(void) startMonitoringRegion:(CLLocationCoordinate2D) center radius:(CLLocationDistance) radius identifier:(NSString *_Nonnull) identifier;

-(void) startMonitoringRegion:(CLRegion *_Nonnull) region
                  expireCount:(NSInteger) count
                     expireTs:(NSTimeInterval) ts
                 enterMessage:(NSString *_Nullable) enter
                  exitMessage:(NSString *_Nullable) exit;
```

``` swift
//Swift : 

func startMonitoringRegion(_ region: CLRegion)
func startMonitoringRegion(_ center: CLLocationCoordinate2D, radius: CLLocationDistance, identifier: String)
func startMonitoringRegion(_ region: CLRegion, expireCount count: Int, expireTs ts: TimeInterval, enterMessage enter: String?, exitMessage exit: String?)
```

> `نکته ` : برای استفاده قابلیت Geofence شما نیاز به استفاده از
> `startLocationUpdate` و یا `startMonitoringSignificantLocationChanges`
> نیست.

نمونه کد فوق استفاده از قابلیت geofence را به شما نشان می دهد : 

``` objc
//Objective-C :

CLLocationCoordinate2D center = CLLocationCoordinate2DMake(35.759227, 51.401044);
    CLRegion *region = [[CLCircularRegion alloc] initWithCenter:center radius:150 identifier:@"adpDigitalCompany"];
[_locationManager startMonitoringRegion:region];
```
``` swift
//Swift :

var center: CLLocationCoordinate2D = CLLocationCoordinate2DMake(35.759227, 51.401044)

var region: CLRegion? = CLCircularRegion(center: center, radius: 150, identifier: "adpDigitalCompany")

locationManager.startMonitoringRegion(region)
```

چنانچه می خواهید یک geofence را start کنید که بتوانید بصورت بسیار ساده آن را مدیریت کنید، می توانید از قطعه کد زیر استفاده کنید :

> `نکته` : زمان انقضای تاریخ geofence به صورت `unix millisecond` می
> باشد.

``` objc
//Objective-C :

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

``` swift
//Swift :

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
### رویدادهای محدوده جغرافیایی
پس از فراخوانی متد `startMonitoringRegion` رویدادهای زیر فرخوانی خواهند شد :

``` objc
//Objective-C :

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
``` swift
//Swift :

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
برای متوقف سازی geofence می توانید از متد های زیر استفاده کنید :

``` objc
//Objective-C :

[_locationManager stopMonitoringAllRegions];
[_locationManager stopMonitoringRegion:region];
```

``` swift
//Swift : 

locationManager.stopMonitoringAllRegions()
locationManager.stopMonitoringRegion(region!)
```
