---
id: events
title: مدیریت رویدادها
layout: ios
permalink: ios/events.html
prev: publishingMessages.html
next: location-tracking.html
---

### انتشار رویداد با داده ها
با متد زیر می توانید رویداد های داخل اپ را منتشر کنید:

`نکته` :  پارامتر ورودی live به این معنی می باشد، کسانی این رویداد را دریافت خواهند کرد که در آن لحظه `Online` باشند.

```objc
Objective-C:

- (BOOL)publishEvent:(NSString*)eventName
                data:(NSDictionary*)data;

- (BOOL)publishEvent:(NSString*)eventName
                data:(NSDictionary*)data
                live:(BOOL)live;

- (BOOL)publishEvent:(NSString*)eventName
                data:(NSDictionary*)data
            stateful:(BOOL)stateful;

- (BOOL)publishEvent:(NSString*)eventName
                data:(NSDictionary*)data
                live:(BOOL)live
            stateful:(BOOL)stateful;
```
```swift
Swift:

open func publishEvent(_ eventName: String!, data: [AnyHashable : Any]!) -> Bool

open func publishEvent(_ eventName: String!, data: [AnyHashable : Any]!, live: Bool) -> Bool

open func publishEvent(_ eventName: String!, data: [AnyHashable : Any]!, stateful: Bool) -> Bool

open func publishEvent(_ eventName: String!, data: [AnyHashable : Any]!, live: Bool, stateful: Bool) -> Bool
```
## نمونه کد انتشار رویداد
نمونه کد فوق یکی از کاربردهای انتشار رویداد را به شما نشان می دهد. به کمک کلاس [CoreGeoLocation](/ios/location-tracking.html)، می خواهیم موقعیت کاربر را به صورت لحظه ای ارسال کنیم.

``` objc
Objective-C :

-(void) startTrackingUser{
    CoreGeoLocation *locationManager = [CoreGeoLocation sharedInstance];
    
    [locationManager addDelegate:self];
    [locationManager setLocationAutorization:kWhileUseInApp];
    [locationManager setDesiredAccuracy:kCLLocationAccuracyBest];
    [locationManager startLocationUpdate];
}

-(void) receivedLocationUpdates:(NSArray<CLLocation *> *)locations{
    NSDictionary *data = @{@"date":@"some things"};
    [self publishLocation:[locations lastObject] data:data];
}

- (void) publishLocation:(CLLocation *) location data:(NSDictionary *) data{
    NSDate *ts = location.timestamp;
    double lat = location.coordinate.latitude;
    double lng = location.coordinate.longitude;
    NSTimeInterval milliseconds = [ts timeIntervalSince1970] * 1000;
    NSMutableDictionary *geoLocationDic = [[NSMutableDictionary alloc] init];
    
    [geoLocationDic setObject:@(lat) forKey:@"lat"];
    [geoLocationDic setObject:@(lng) forKey:@"lng"];
    [geoLocationDic setObject:@(milliseconds) forKey:@"ts"];
    
    if (data) {
        [geoLocationDic setObject:data forKey:@"data"];
    }
    [self.manager publishEvent:@"geo" data:geoLocationDic live:NO stateful:NO];
}
```
``` swift
Swift :

func startTrackingUser() {
    let locationManager = CoreGeoLocation.sharedInstance()
	    
    locationManager.add(self)
    locationManager.locationAutorization = kWhileUseInApp
    locationManager.desiredAccuracy = kCLLocationAccuracyBest
    locationManager.startUpdate()
}

func receivedLocationUpdates(_ locations: [CLLocation]) {
     let data = ["date": "some things"]
     publishLocation(locations.last, data: data)
}
    
func publishLocation(_ location: CLLocation!, data: [AnyHashable: Any]) {
     let ts: Date? = location.timestamp
     let lat = Double(location.coordinate.latitude)
     let lng = Double(location.coordinate.longitude)
     let milliseconds = (ts?.timeIntervalSince1970)! * 1000
     var geoLocationDic = [AnyHashable: Any]()
     
     geoLocationDic["lat"] = lat
     geoLocationDic["lng"] = lng
     geoLocationDic["ts"] = milliseconds
     
     if !data.isEmpty {
        geoLocationDic["data"] = data
     }
     manager.publishEvent("geo", data: geoLocationDic, live: false, stateful: false)
}
```
