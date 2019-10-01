---
id: features
title: امکانات‌ دیگر 
layout: ios
permalink: ios/features.html
prev: verification.html
next: troubleshoot.html
---

چابک متناسب با نیاز شما امکانات دیگری را هم در اختیارتان می‌گذارد. در این صفحه می‌توانید از [وضعیت اتصال سرور و کلاینت](/ios/features.html#وضعیت-اتصال-به-چابک) مطلع شوید. [رویدادهای اپلیکیشن (ثبت کاربر، نصب و بازدید)](/ios/features.html#رویداد-وضعیت-اپلیکیشن) و شناسه‌های [دستگاه](/ios/features.html#دریافت-شناسه-دستگاه) و [کاربر](/ios/features.html#دریافت-شناسه-کاربر) را دریافت نمایید. [نشان‌هایی (Badge)](/ios/features.html#مدیریت-نشانها-badge) که روی آیکون اپ شما در دستگاه کاربر نمایش داده می‌شود را می‌توانید مدیریت کنید. همچنین [ارسال موقعیت مکانی در هنگام باز شدن اپلیکیشن](/ios/features.html#ارسال-موقعیت-مکانی-در-هنگام-باز-شدن-اپلیکیشن) و [مشاهده گزارش‌های چابک](/ios/features.html#فعالسازی-گزارشهای-چابک) را هم می‌توانید پیاده‌سازی کنید. در آخر می‌توانید از [وضعیت اپ خود](/ios/features.html#دریافت-وضعیت-اپلیکیشن) (فورگراند و بک‌گراند بودن آن) آگاه شوید.

<Br>

### دریافت شناسه دستگاه 

هر **دستگاه** در پلتفرم چابک دارای یک شناسه منحصر به فرد می‌باشد، برای دسترسی به این شناسه می‌توانید متد زیر را فراخوانی کنید:

```objectivec
//Objective-C:

NSString *installationId = [self.manager getInstallationId];
```
``` swift
//Swift:

let installationId:NSString = manager?.getInstallationId() as! NSString
```
<br><br>

### دریافت شناسه کاربر

هر **کاربر** در پلتفرم چابک دارای یک شناسه منحصر به فرد می‌باشد، برای دسترسی به این شناسه می‌توانید متد زیر را فراخوانی کنید:

```objectivec
//Objective-C
[PushClientManager defaultManager].userId;
```
```swift
//Swift
PushClientManager.default().userId
```
<br><br>

### مدیریت نشان‌ها (Badge)

بسته به نوع اپلیکیشنی که دارید، بازنشانی badge معنای متفاوتی پیدا می‌کند. به عنوان مثال اگر اپلیکیشن پیام‌رسانی و چت دارید آن موقع، بازنشانی **پس از خواندن پیام** معنا دارد. در غیر این صورت معمولا بازنشانی پس از فقط باز کردن اپلیکیشن انجام می‌شود. 
در صورت تمایل می‌توانید شماره badge اپلیکیشنتان را با متد زیر بازنشانی (reset) کنید:

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
<br><br>

### ارسال موقعیت مکانی در هنگام باز شدن اپلیکیشن

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

<br><br>

### وضعیت اتصال به چابک

پس از فراخوانی `manager.addDelegate`، می‌توانید از متد زیر برای دریافت رویدادهای داخلی چارچوب چابک استفاده کنید.

برای اطلاع از وضعیت آنلاین یا آفلاین بودن، می‌توانید از متد زیر استفاده کنید:

```objectivec
//Objetive-C: 

- (void)pushClientManagerDidChangedServerConnectionState{
	// Called When PushClientManager Connecting State has been Changed
}

- (void)pushClientManagerDidChangeServerReachiability:(BOOL)reachable networkType:(PushClientServerReachabilityNetworkType)networkType{
	// Called When PushClientManager Server Reachability has been Changed
}
```
```swift
//Swift:

func pushClientManagerDidChangedServerConnectionState() {
	// Called When PushClientManager Connecting State has been Changed
}

func pushClientManagerDidChangeServerReachiability(_ reachable: Bool, networkType: PushClientServerReachabilityNetworkType) {
	// Called When PushClientManager Server Reachability has been Changed
}
```
برای مثال می‌توانید به نمونه کد زیر توجه کنید:

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

<br><br>

### رویداد وضعیت اپلیکیشن

با پیاده‌سازی متدهای زیر قادر به دریافت وضعیت اپلیکیشنتان (**ثبت کاربر**، **نصب** و **باز شدن اپلیکیشن**) خواهید بود.

- ثبت کاربر: 

```objectivec
//Objective-C
- (void)pushClientManagerDidRegisterUser:(BOOL)registration{
    NSLog(@"User sucessfully registered.");
}
- (void) pushClientManagerDidFailRegisterUser:(NSError *)error {
    NSLog(@"User not registered because of '%@' error", error);
}
```
```swift
//Swift
func pushClientManagerDidRegisterUser(_ registration: Bool) {
    print("User sucessfully registered.")
}
    
func pushClientManagerDidFailRegisterUser(_ error: Error!) {
    print("User not registered because of '\(String(describing: error))' error")
}
```

- نصب:

```objectivec
//Objective-C
- (BOOL) application:(UIApplication *) application
                didFinishLaunchingWithOptions:(NSDictionary *) launchOptions{
    ...
    
    [[NSNotificationCenter defaultCenter] addObserver:self
                                             selector:@selector(detectAppNewInstalled:)
                                                 name:kPushClientDetectAppNewInstall
                                               object:nil];
    ...
    
    return YES;
}
- (void) detectAppNewInstalled:(NSNotification *) notification{
    NSLog(@"New Install :  ----------------- %@ ---------------",notification.userInfo);
}
```
```swift
//Swift
func application(_ application: UIApplication,
                didFinishLaunchingWithOptions launchOptions: [UIApplicationLaunchOptionsKey: Any]?) -> Bool {
        
    ...
            
    NotificationCenter.default.addObserver(self,
                                       selector: #selector(self.detectAppNewInstalled(_:)),
                                       name: kPushClientDetectAppNewInstall,
                                       object: nil)
    ...
    return true
}
    
@objc func detectAppNewInstalled(_ notification: Notification?) {
    if (notification?.userInfo) != nil {
        print("App installed")
    }
}
```

- بازدید:

```objectivec
//Objective-C
- (BOOL) application:(UIApplication *) application
                didFinishLaunchingWithOptions:(NSDictionary *) launchOptions{
    ....
    
    [[NSNotificationCenter defaultCenter] addObserver:self
                                             selector:@selector(detectLaunched:)
                                                 name:kPushClientDetectAppWasLaunched
                                               object:nil];
    ...
    
    return YES;
}
-(void) detectLaunched:(NSNotification *) notification{
    NSLog(@"App launched",notification.userInfo);
}
```
```swift
//Swift
func application(_ application: UIApplication,
                didFinishLaunchingWithOptions launchOptions: [UIApplicationLaunchOptionsKey: Any]?) -> Bool {
        
    ...
            
    NotificationCenter.default.addObserver(self,
                                       selector: #selector(self.detectLaunched(_:)),
                                       name: kPushClientDetectAppWasLaunched,
                                       object: nil)
    ...
    return true
}
    
@objc func detectLaunched(_ notification: Notification?) {
    if (notification?.userInfo) != nil {
        print("App launched")
    }
}
``` 
<br><br>

### دریافت وضعیت اپلیکیشن

جهت بررسی وضعیت اپلیکیشن خود در حال اجرا (**Background** یا **Foreground**) می‌توانید متد‌های زیر را فراخوانی کنید:

```objectivec
//Objective-C

switch (UIApplication.sharedApplication.applicationState) {
	case UIApplicationStateActive:
		NSLog(@"App is active in foreground");
		break;
   
	case UIApplicationStateInactive:
		NSLog(@"App is inactive in foreground");
		break;

	case UIApplicationStateBackground:
		NSLog(@"App is in background");
		break;
    }
```

```swift
//Swift

switch UIApplication.shared.applicationState {
	case .active:
		print("App is active in foreground")
	case .inactive:
		print("App is inactive in foreground")
	case .background:
		print("App is in background")
}
```

<br><br>

### فعال‌سازی گزارش‌های چابک

با استفاده از `property`، `enableLog`  می‌توانید گزارش‌های چابک را در بخش `Debugger Output` مشاهده کنید:

```objectivec
//Objective-C
[PushClientManager.defaultManager setLogLevel:ChabokLogLevelVerbose];  // enable all logging
[PushClientManager.defaultManager setLogLevel:ChabokLogLevelDebug];    // enable more logging
[PushClientManager.defaultManager setLogLevel:ChabokLogLevelInfo];     // the default
[PushClientManager.defaultManager setLogLevel:ChabokLogLevelWarn];     // disable info logging
[PushClientManager.defaultManager setLogLevel:ChabokLogLevelError];    // disable warnings as well
[PushClientManager.defaultManager setLogLevel:ChabokLogLevelAssert];   // disable errors as well
[PushClientManager.defaultManager setLogLevel:ChabokLogLevelSuppress]; // disable all logging
```
```swift
//Swift
PushClientManager.default().logLevel = ChabokLogLevelVerbose // enable all logging
PushClientManager.default().logLevel = ChabokLogLevelDebug // enable more logging
PushClientManager.default().logLevel = ChabokLogLevelInfo // the default
PushClientManager.default().logLevel = ChabokLogLevelWarn // disable info logging
PushClientManager.default().logLevel = ChabokLogLevelError // disable warnings as well
PushClientManager.default().logLevel = ChabokLogLevelAssert // disable errors as well
PushClientManager.default().logLevel = ChabokLogLevelSuppress  // disable all logging
```

> `نکته:`  دقت داشته باشید  **در نسخه‌های پایین ۲ کتابخانه چابک**، باید مانند زیر عمل کنید:

```objectivec
//Objective-C
PushClientManager.defaultManager.enableLog = YES;
```
```swift
//Swift
PushClientManager.default().enableLog = true
```
