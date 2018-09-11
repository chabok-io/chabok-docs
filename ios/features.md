---
id: features
title: امکانات‌ چابک 
layout: ios
permalink: ios/features.html
prev: location-tracking.html
next: troubleshoot.html
---
### مدیریت تگ‌ها
یکی از مهمترین ابزارهای دسته‌بندی کاربران، استفاده از `Tag` می باشد. به عنوان مثال می‌توانید کاربران خود را بر اساس جنسیت دسته‌بندی کرده و بر اساس جنسیت آنها پیام خاصی را ارسال کنید و یا کاربرانی که از پرداخت درون برنامه‌ای شما استفاده می‌کنند، یک `Tag` با عنوان `Premium_User` به آنها اختصاص دهید.

#### افزودن تگ
با استفاده از متد زیر، شما می‌توانید به کاربر فعلی یک `Tag` اختصاص دهید :

```objectivec
//Objective-C:

[self.manager addTag:@"Premium_User"];
```
```swift
//Swift:

self.manager?.addTag("Premium_User")
```
همچنین می‌توانید با استفاده از overload دیگر این متد، از افزودن و یا خطا در عملیات با خبر شوید :
```objectivec
//Objective-C:

[self.manager addTag:@"Premium_User" success:^(NSInteger count) {
        NSLog(@"%@ tag was assign to '%@' user with [%zd] devices",@"Premium_User",self.manager.userId,count);
    } failure:^(NSError *error) {
        NSLog(@"An error happend adding tag ...");
    }];
```
```swift
//Swift:

self.manager?.addTag("Premium_User",
        success: {(_ count: Int) -> Void in
	                 print("\("Premium_User") tag was assign to '\(self.manager?.userId)' user with [\(count)] devices")
},
        failure: {(_ error: Error?) -> Void in
	                 print("An error happend adding tag ...")
})
```
اگر عملیات افزودن تگ با موفقیت انجام شود، می‌توانید از طریق پنل چابک، تگ اضافه شده به کاربر را در بخش مشترکین همانند تصویر زیر مشاهده کنید :

![مشترک چابک](http://uupload.ir/files/ujp8__1x-ios_device.png)
#### حذف تگ
با استفاده از متد زیر، می‌توانید یک `Tag` خاص از کاربر فعلی را حذف کنید :

```objectivec
//Objective-C:

[self.manager removeTag:@"Premium_User"];
```
```swift
//Swift:

self.manager?.removeTag("Premium_User")
```
### شناسه دستگاه در چابک
هر دستگاه در سرویس چابک دارای یک شناسه منحصر به فرد می‌باشد، برای دسترسی به این شناسه می‌توانید متد زیر را فراخوانی کنید :
```objectivec
//Objective-C:

NSString *installationId = [self.manager getInstallationId];
```
``` swift
//Swift:

let installationId:NSString = manager?.getInstallationId() as! NSString

```

###  مدیریت نشان‌ها

اگر می خواهید شماره badge برنامه خود را بازنشانی کنید،با روش زیر می توانید: 

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
### اتصال با سرور


پس از فراخوانی `manager.addDelegate`، می توانید از متد زیر برای دریافت رویدادهای داخلی چارچوب چابک استفاده کنید.

برای اطلاع از وضعیت آنلاین یا آفلاین بودن،میتوانید از متد زیر استفاده کنید:

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
