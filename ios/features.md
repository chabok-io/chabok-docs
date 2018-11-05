---
id: features
title: امکانات‌ چابک 
layout: ios
permalink: ios/features.html
prev: verification.html
next: troubleshoot.html
---

چابک متناسب با نیاز شما امکانات دیگری را هم در اختیارتان می گذارد. در این صفحه می‌توانید از [وضعیت اتصال سرور و کلاینت](/ios/features.html#وضعیت-اتصال-به-چابک) مطلع شوید. شناسه‌های [دستگاه](/ios/features.html#دریافت-شناسه-دستگاه) و [کاربر](/ios/features.html#دریافت-شناسه-کاربر) خود را از چابک دریافت نمایید. همچنین [نشان‌هایی (Badge)](/ios/features.html#مدیریت-نشانها-badge) که روی آیکون اپ شما در دستگاه کاربر نمایش داده می‌شود را می‌توانید کنترل کنید. در آخر می‌توانید از [وضعیت اپ خود](/ios/features.html#دریافت-وضعیت-اپلیکیشن) (فورگراند و بک‌گراند بودن آن) آگاه شوید.

<Br>

### وضعیت اتصال به چابک

پس از فراخوانی `manager.addDelegate`، می‌توانید از متد زیر برای دریافت رویدادهای داخلی چارچوب چابک استفاده کنید.

برای اطلاع از وضعیت آنلاین یا آفلاین بودن،می‌توانید از متد زیر استفاده کنید:

```objectivec
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

```objectivec
//Objective-C:

- (void)pushClientManagerDidChangedServerConnectionState{
    PushClientServerConnectionState _connectionState = self.manager.connectionState;
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
}
```
```swift
//Swift:

func pushClientManagerDidChangedServerConnectionState (){
    let connectionState = self.manager?.connectionState as! PushClientServerConnectionState
    switch connectionState {
    case .connectingStartState:
        print("Init")
    case .connectingState:
        print("Connecting")
    case .connectedState:
        print("Connected")
    case .disconnectedState:
        print("Disconnected")
    case .disconnectedErrorState:
        print("Error")
    default:
        print("Unknown")
    }
}
```

<Br>

### دریافت شناسه دستگاه 

هر دستگاه در سرویس چابک دارای یک شناسه منحصر به فرد می‌باشد، برای دسترسی به این شناسه می‌توانید متد زیر را فراخوانی کنید:

```objectivec
//Objective-C:

NSString *installationId = [self.manager getInstallationId];
```
``` swift
//Swift:

let installationId:NSString = manager?.getInstallationId() as! NSString
```

<Br>

### مدیریت نشان‌ها (Badge)

در صورت تمایل می‌توانید شماره badge اپلیکیشنتان را با متد زیر بازنشانی کنید:

```objectivec
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
<Br>

### ارسال موقعیت مکانی در هنگام باز شدن برنامه

با فعال کردن قابلیت `enableLocationOnLaunch`، کتابخانه چابک به هنگام باز شدن برنامه و در صورت پیدا کردن موقعیت مکانی کاربر،‌ موقعیت آن را توسط [انتشار رویداد](/ios/events.html) به سرور ارسال می کند.

> `نکته` : برای ارسال داده خاصی همراه با انتشار رویداد فوق می توانید
> داده خود را property به `locationOnLaunchWithDictionary` داده تا همراه
> با انتشار رویداد ارسال شود.

```objectivec
//Objetive-C: 

[self.manager.enableLocationOnLaunch = YES];
```
```swift
//Swift:

self.manager?.enableLocationOnLaunch = true
```

<Br>

### فعال‌سازی گزارش‌های چابک

با استفاده از `property`، `enableLog`  می‌توانید گزارش‌های چابک را در بخش `Debugger Output` مشاهده کنید
```objectivec
//Objective-C
PushClientManager.defaultManager.enableLog = YES;
```
```swift
//Swift
PushClientManager.default().enableLog = true
```
