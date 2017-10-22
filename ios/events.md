---
id: events
title: مدیریت رویدادها
layout: ios
permalink: ios/events.html
prev: notification.html
next: location-config.html
---

### انتشار رویداد به همراه داده
با متد زیر می توانید رویداد های داخل برنامه را منتشر کنید:

> `نکته` : پارامتر ورودی live به این معناست که کاربرانی که به چابک متصل هستند این رویداد را دریافت خواهند نمود.
>

```objc
//Objective-C:

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
//Swift:

func publishEvent(_ eventName: String!, data: [AnyHashable : Any]!) -> Bool

func publishEvent(_ eventName: String!, data: [AnyHashable : Any]!, live: Bool) -> Bool

func publishEvent(_ eventName: String!, data: [AnyHashable : Any]!, stateful: Bool) -> Bool

func publishEvent(_ eventName: String!, data: [AnyHashable : Any]!, live: Bool, stateful: Bool) -> Bool
```

###  فعال کردن دریافت رویداد
با استفاده از متد `enableEventDelivery` می توانید روی یک رویداد خاص `subscribe` کنید، به قطعه کد زیر دقت کنید : 
``` objc 
//Objective-C :

[_manager enableEventDelivery:@"geo"];
```
``` swift
//Swift :

self.manager.enableEventDelivery("geo")
```
متد `enableEventDelivery` دارای سه overload می باشد که ورودی `forPublic` به این معنی است، اگر مقدار ‌`true` به آن داده شود، تمام رویدادهای مربوط به نام وارد شده را دریافت می کند.

```objc
//Objective-C:

- (void)enableEventDelivery:(NSString*)eventName;

- (void)enableEventDelivery:(NSString*)eventName
                       live:(BOOL)live;

- (void)enableEventDelivery:(NSString*)eventName
                  forPublic:(BOOL)forPublic
                       live:(BOOL)live;
```
```swift
//Swift

func enableEventDelivery(_ eventName: String!)

func enableEventDelivery(_ eventName: String!, live: Bool)

func enableEventDelivery(_ eventName: String!, forPublic: Bool, live: Bool)
```

برای دریافت رویداد باید delegate method زیر را پیاده سازی کنید، تا بتوانید رویداد هایی که توسط متد `enableEventDelivery` بر روی یک رویداد خاص `subscribe` کرده اید دریافت کنید :

``` objc
//Objective-C :

- (void) pushClientManagerDidReceivedEventMessage:(EventMessage *)eventMessage{
    NSLog(@"Event message (%@) was received .....",
          eventMessage.data);
}
```
``` swift
//Swift :

func pushClientManagerDidReceivedEventMessage(_ eventMessage: EventMessage!) {
        print("Event message \(eventMessage.data) was received .....")
}
```

### نمونه کد انتشار رویداد
نمونه کد فوق یکی از کاربردهای انتشار رویداد را به شما نشان می دهد. به کمک کلاس [CoreGeoLocation](/ios/location-tracking.html)، می خواهیم موقعیت کاربر را به صورت لحظه ای ارسال کنیم.

``` objc
//Objective-C :

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
//Swift :

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
