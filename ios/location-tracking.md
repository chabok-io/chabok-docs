--- 
id: location-tracking 
title: مکان یابی 
layout: ios 
permalink: ios/location-tracking.html 
--- 
## کلاس CoreGeoLocation 
در ابزار جدید چابک، امکان دریافت موقعیت مکانی کاربر امکان پذیر شده است. برای استفاده از کلاس `CoreGeoLocation` می توانید کلاس فوق را به کلاس خود import کنید:
``` objc
#import "CoreGeoLocation.h"
.
.
.
CoreGeoLocation *locationManager =  [CoreGeoLocation sharedInstance];
```
----------
`نکته :`  برای استفاده از قابلیت مکان یابی، پیکربندی های لازم که در بخش [پیکربندی](config) بیان شده را مطالعه کرده و از آن پیروی کنید.

### دریافت موقعیت مکانی
ابتدا پیکربندی متناسب برای دریافت موقعیت مکانی را تعیین کرده و با استفاده از متد `startLocationUpdate` شروع به دریافت موقعیت مکانی کاربر کنید. به قطعه کد زیر دقت کنید‌:
``` objc
CoreGeoLocation *locationManager =  [CoreGeoLocation sharedInstance];

[locationManager addDelegate:self];
[locationManager setDistanceFilter:50];
[locationManager setPausesAutomaticUpdate:NO];
[locationManager setLocationAutorization:kAlways];
[locationManager setAllowBackgroundLocationUpdates:YES];
[locationManager setDesiredAccuracy:kCLLocationAccuracyBest];

[locationManager startLocationUpdate];
```
***رویداد دریافت موقعیت مکانی***
جهت دریافت موقعیت های مکانی باید `CoreGeoLocationDelegate`  را به `@interface`  کلاس خود اضافه کنید و متد زیر را پیاده سازی کنید :
``` objc
- (void) receivedLocationUpdates:(NSArray<CLLocation *> *)locations{
    NSInteger length = locations.count;
    CLLocation *lastLocation = [locations lastObject];
    double latitude = lastLocation.coordinate.latitude;
    double longitude = lastLocation.coordinate.longitude;

    NSLog(@"%zd new locations was received, last location (lat:'%f') , (lng:'%f')",
        length,latitude,longitude);
}
```
### مکان یابی بر اساس مدت زمان و متر
با استفاده از متد `trackMeUntil:byMeter` می توانید موقعیت کاربر را بر اساس متراژ و بازه زمانی تعیین شده دنبال کنید : 
``` objc
CoreGeoLocation *locationManager =  [CoreGeoLocation sharedInstance];
[locationManager trackMeUntil:3600 
byMeter:kCLLocationAccuracyNearestTenMeters];
```
`نکته :`  متد فوق بعد از دریافت موقعیت مکانی، رویداد  `receivedLocationUpdates:locations` را فراخوانی می کند. همچنین پس از پایان زمان تعیین شد به صورت خودکار عملیات مکان یابی را متوقف می سازد، با متوقف کردن موقعیت کاربر رویداد `didStoppedTrackingMe` فراخوانی خواهد شد.

برای بررسی وضعیت مکان یابی کاربر می توانید از متد زیر استفاده کنید :
``` objc
trackingStateEnumType trackingState = [locationManager trackingMeState];
if (trackingState == kTracking) {
    NSLog(@"We are tracking user...");
} else if (trackingState == kStopped) {
    NSLog(@"Tracking user was stopped...");
} else {
    NSLog(@"Tracking user interval was expired...");
}
```
جهت متوقف سازی عملیات مکان یابی کار کاربر متد فوق را فراخوانی کنید :
``` objc
[locationManager stopTracking];
```
### دریافت یک موقعیت مکانی
به کمک متد `requestSingleLocation` می توانید تنها یک موقعیت مکانی دریافت کنید.
``` objc
[locationManager requestSingleLocation:^(CLLocation * _Nullable location, NSError * _Nullable error) {
    if (location != nil) {
        NSLog(@"Single location was received");
    }
}];
```
`نکته :` با فراخوانی متد فوق ممکن است به عملکرد متدهای  `trackMeUntil:byMeter` و `startLocationUpdate‍` اختلال ایجاد کند.

### دریافت موقعیت مکانی در حالت Terminated
امکان دریافت موقعیت مکان در حتی در حالتی که اپلیکشن شما Terminate شده باشد نیز وجود دارد.
``` objc
[locationManager startMonitoringSignificantLocationChanges]
```
`نکته :‍` برای فعال شدن این قابلیت باید حتما `authorization` مربوط به  location روی حالت `kAlways` باشد.

`نکته :` متد فوق ممکن است پس از پیمودن ۵۰۰ متر یا بیشتر اپلیکیشن را به صورت کامل در background اجرا کند. برای داشتن تغییرات موقعیت کاربری به صورت مداوم باید کلید `launchOptions` را از رویداد `didFinishLaunchingWithOptions` و در صورت اجرا شدن توسط `location` متد  `startLocationUpdate‍` را فراخوانی کنید. قطعه کد زیر بیانگر این نکته می باشد.
``` objc
- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
    if ([launchOptions objectForKey:UIApplicationLaunchOptionsLocationKey]){
        //App was launch by location update
        CoreGeoLocation *locationManager =  [CoreGeoLocation sharedInstance];
        [locationManager startLocationUpdate];
    }
}
```
## Geofence 
جهت استفاده از قابلیت Geofence باید متد `startMonitoringRegion` را فراخوانی کنید. متد فوق دارای سه overload می باشد :

Objective-C :
``` objc
-(void) startMonitoringRegion:(CLRegion *_Nonnull) region;

-(void) startMonitoringRegion:(CLLocationCoordinate2D) center radius:(CLLocationDistance) radius identifier:(NSString *_Nonnull) identifier;

-(void) startMonitoringRegion:(CLRegion *_Nonnull) region
                  expireCount:(NSInteger) count
                     expireTs:(NSTimeInterval) ts
                 enterMessage:(NSString *_Nullable) enter
                  exitMessage:(NSString *_Nullable) exit;
```
Swift : 
``` swift
func startMonitoringRegion(_ region: CLRegion)
func startMonitoringRegion(_ center: CLLocationCoordinate2D, radius: CLLocationDistance, identifier: String)
func startMonitoringRegion(_ region: CLRegion, expireCount count: Int, expireTs ts: TimeInterval, enterMessage enter: String?, exitMessage exit: String?)
```

> `Note` : برای استفاده قابلیت Geofence شما نیاز به استفاده از startLocationUpdate و یا startMonitoringSignificantLocationChanges نیست.

نمونه کد فوق استفاده از قابلیت geofence را به شما نشان می دهد : 

Objective-C :
``` objc
CLLocationCoordinate2D center = CLLocationCoordinate2DMake(35.759227, 51.401044);
    CLRegion *region = [[CLCircularRegion alloc] initWithCenter:center radius:150 identifier:@"adpDigitalCompany"];
[_locationManager startMonitoringRegion:region];
```
Swift :
``` swift
var center: CLLocationCoordinate2D = CLLocationCoordinate2DMake(35.759227, 51.401044)

var region: CLRegion? = CLCircularRegion(center: center, radius: 150, identifier: "adpDigitalCompany")

locationManager.startMonitoringRegion(region)
```
### رویدادهای Geofence
پس از فراخوانی متد `startMonitoringRegion` رویدادهای زیر فرخوانی خواهند شد :

Objective-C
``` objc
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
Swift :
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