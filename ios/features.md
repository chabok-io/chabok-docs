---
id: features
title: امکانات‌ چابک 
layout: ios
permalink: ios/features.html
prev: location-tracking.html
---

Receive Deliveries 
------------- 
برای فعال کردن دریافت تأییدیه تحویل یک پیام منتشر شده، باید تحویل را قبل از فعالسازی فعال کنید: 

``` objc
Objc: 

self.manager.deliveryChannelEnabeled = YES; 
```
```swift
Swift: 

manager.deliveryChannelEnabeled = true 
``` 

مدیریت Badge
------------- 
اگر می خواهید شماره badge برنامه خود را بازنشانی کنید،با روش زیر می توانید: 

``` objc
Objc: 

- (void)applicationDidEnterBackground:(UIApplication *)application { 
[PushClientManager resetBadge]; 
} 
- (void)applicationWillEnterForeground:(UIApplication *)application { 
[PushClientManager resetBadge]; 
}
```
```swift
Swift: 

func applicationDidEnterBackground(_ application: UIApplication) { 
PushClientManager.resetBadge() 
} 

func applicationWillEnterForeground(_ application: UIApplication) { 
PushClientManager.resetBadge() 
} 
``` 

اتصال با سرور
------------- 

پس از فراخوانی `manager.addDelegate`، می توانید از متد زیر برای دریافت رویدادهای داخلی چارچوب چابک استفاده کنید:

```objc
Objc:

- (void)pushClientManagerDidChangedServerConnectionState{
// Called When PushClientManager Connecting State has been Changed
}

- (void)pushClientManagerDidChangeServerReachiability:(BOOL)reachable
networkType:(PushClientServerReachabilityNetworkType)networkType{
// Called When PushClientManager Server Reachiability has been Changed
}
```
```swift
Swift:

func pushClientManagerDidChangedServerConnectionState() {
// Called When PushClientManager Connecting State has been Changed
}

func pushClientManagerDidChangeServerReachiability(_ reachable: Bool, networkType: PushClientServerReachabilityNetworkType) {
// Called When PushClientManager Server Reachiability has been Changed
}
```
### وضعیت ارسال پیام
 به استفاده از متدهای فوق می توانید روی یک رویداد خاص، subscribe کنید تا بتوانید رویدادهای مورد نیاز خود را دریافت کنید :
 
```objc
Objective-C:

- (void)enableEventDelivery:(NSString*)eventName;

- (void)enableEventDelivery:(NSString*)eventName
                       live:(BOOL)live;

- (void)enableEventDelivery:(NSString*)eventName
                  forPublic:(BOOL)forPublic
                       live:(BOOL)live;
```
```swift
Swift

open func enableEventDelivery(_ eventName: String!)

open func enableEventDelivery(_ eventName: String!, live: Bool)

open func enableEventDelivery(_ eventName: String!, forPublic: Bool, live: Bool)
```
### ارسال موقعیت مکانی در هنگام باز شدن برنامه

با فعال کردن قابلیت `enableLocationOnLaunch`، کتابخانه چابک به هنگام باز شدن برنامه و در صورت پیدا کردن موقعیت مکانی کاربر،‌ موقعیت آن را توسط [انتشار رویداد](/ios/events.html) به سرور ارسال می کند.

`نکته` : برای ارسال داده خاصی همراه با انتشار رویداد فوق می توانید داده خود را property به `locationOnLaunchWithDictionary` داده تا همراه با انتشار رویداد ارسال شود.
```objc
Objc:

self.manager.enableLocationOnLaunch = YES
```
```swift
Swift:

manager.enableLocationOnLaunch = true
```
