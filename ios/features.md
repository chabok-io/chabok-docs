---
id: features
title: امکانات‌ چابک 
layout: ios
permalink: ios/features.html
prev: location-tracking.html
---
Channel Subscription 
------------- 

برای عضویت در یک کانال میتوانید از موارد زیر استفاده کنید: 

``` objc
Objc: 

[self.manager subscribe:@"myAlerts"]; // private (personal) channel 
[self.manager subscribe:@"public/sport"]; // public channel 
[self.manager unsubscribe:@"public/+"]; // all public channels 

```
```swift
Swift: 

manager.subscribe("myAlerts") // private (personal) channel 
manager.subscribe("public/sport") // public channel 
manager.unsubscribe("public/+") // all public channels 

``` 

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
