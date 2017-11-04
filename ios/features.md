---
id: features
title: امکانات‌ چابک 
layout: ios
permalink: ios/features.html
prev: location-tracking.html
---

###  مدیریت نشان‌ها

اگر می خواهید شماره badge برنامه خود را بازنشانی کنید،با روش زیر می توانید: 

``` objc
//Objetive-C: 

- (void)applicationDidEnterBackground:(UIApplication *)application { 
[PushClientManager resetBadge]; 
} 
- (void)applicationWillEnterForeground:(UIApplication *)application { 
[PushClientManager resetBadge]; 
}
```
```swift
//Swift: 

func applicationDidEnterBackground(_ application: UIApplication) { 
PushClientManager.resetBadge() 
} 

func applicationWillEnterForeground(_ application: UIApplication) { 
PushClientManager.resetBadge() 
} 
``` 
### اتصال با سرور


پس از فراخوانی `manager.addDelegate`، می توانید از متد زیر برای دریافت رویدادهای داخلی چارچوب چابک استفاده کنید.

برای اطلاع از وضعیت آنلاین یا آفلاین بودن،میتوانید از متد زیر استفاده کنید:

```objc
//Objetive-C: 

- (void)pushClientManagerDidChangedServerConnectionState{
// Called When PushClientManager Connecting State has been Changed
}

- (void)pushClientManagerDidChangeServerReachiability:(BOOL)reachable networkType:(PushClientServerReachabilityNetworkType)networkType{
// Called When PushClientManager Server Reachiability has been Changed
}
```
```swift
//Swift:

func pushClientManagerDidChangedServerConnectionState() {
// Called When PushClientManager Connecting State has been Changed
}

func pushClientManagerDidChangeServerReachiability(_ reachable: Bool, networkType: PushClientServerReachabilityNetworkType) {
// Called When PushClientManager Server Reachiability has been Changed
}
```
برای مثال میتوانید به نمونه کد زیر توجه کنید:
```objc
//Objective-C:

- (void)pushClientManagerDidChangedServerConnectionState{
switch (_connectionState) {
case PushClientServerConnectingStartState:
NSLog(@"Init");
break;
case PushClientServerConnectingState:
NSLog(@"Connecting");
break;
case PushClientServerConnectedState:
NSLog(@"Connected");
break;
case PushClientServerDisconnectedState:
NSLog(@"Disconnected");
break;
case PushClientServerDisconnectedErrorState:
NSLog(@"Error");
break;
default:
NSLog(@"Unknown");
break;
};
NSLog(@"Connection State = %@", @(self.manager.connectionState));
}
```
```swift
//Swift:

fund pushClientManagerDidChangedServerConnectionState (){
switch (_connectionState) {
case PushClientServerConnectingStartState:
return @"Init"
break
case PushClientServerConnectingState:
return @"Connecting"
break
case PushClientServerConnectedState:
return @"Connected"
break
case PushClientServerDisconnectedState:
return @"Disconnected"
break
case PushClientServerDisconnectedErrorState:
return @"Error"
break
default:
return @"Unknown"
break
}
}
```

### ارسال موقعیت مکانی در هنگام باز شدن برنامه

با فعال کردن قابلیت `enableLocationOnLaunch`، کتابخانه چابک به هنگام باز شدن برنامه و در صورت پیدا کردن موقعیت مکانی کاربر،‌ موقعیت آن را توسط [انتشار رویداد](/ios/events.html) به سرور ارسال می کند.

> `نکته` : برای ارسال داده خاصی همراه با انتشار رویداد فوق می توانید
> داده خود را property به `locationOnLaunchWithDictionary` داده تا همراه
> با انتشار رویداد ارسال شود.

```objc
//Objetive-C: 

[self.manager.enableLocationOnLaunch = YES];
```
```swift
//Swift:

manager?.enableLocationOnLaunch = true
```
