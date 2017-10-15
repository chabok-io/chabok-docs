---
id: setup
title: مقداردهی اولیه
layout: ios
permalink: ios/setup.html
prev: installation.html
next: notification.html
---



مقداردهی اولیه

-------------
در متد `didFinishLaunchingWithOptions` در کلاس `AppDelegate` کدهای زیر را اضافه کنید.


برای انتخاب سرورهای `chabok sandbox` از کد زیر استفاده کنید:
```objc
Objc:
[PushClientManager setDevelopment:YES];
```
```swift
Swift:  
PushClientManager.setDevelopment(true)
```

حالا یک `singleton instance` از `PushClientManager` با استفاده از `defaultManager` ایجاد کنید:

```objc
Objc:
self.manager = [PushClientManager defaultManager];
```
```swift
Swift:
self.manager = PushClientManager.default()
```
سپس delegate  را از  AppDelegate اضافه کنید:
```objc
Objc:
[self.manager addDelegate:self];
```
```swift
Swift:
self.manager.addDelegate(self)
```
سپس کد زیر را اضافه کنید :
```objc
Objc:
[self.manager application:application didFinishLaunchingWithOptions:launchOptions])
```
```swift
Swift:
self.manager.application(application, didFinishLaunchingWithOptions: launchOptions)
```
اکنون حساب کاربری `APP_ID، SDK_USERNAME` و `SDK_PASSWORD` را تعریف کنید. شما می توانید `SDK_KEY` خود را از پنل وب چابک پیدا کنید:

```objc
Objc:
[self.manager registerApplication:@"YOUR_APP_ID"
apiKey:@"YOUR_SDK_KEY"
userName:@"SDK_USERNAME"
password:@"SDK_PASSWORD"]
```
```swift
Swift:
self.manager.registerApplication(AppDelegate.applicationId(),
apiKey : "YOUR_APP_ID",
userName:"SDK_USERNAME" ,
password:"SDK_PASSWORD" )
```

زمان آن است که کاربر را با یک `userId` ثبت کنید.
```objc
Objc:
[self.manager registerUser:@"USER_ID" channels:@[@"YOUR_CHANNEL" ]
registrationHandler:^(BOOL isRegistered, NSString *userId, NSError *error) {
// handle registration result from server
}
```
```swift
Swift:
self.manager.registerUser("USER_ID", channels: ["YOUR_CHANNEL"])
```
بعد از ثبت نام برای اولین بار، `self.manager.userId` تنظیم خواهد شد و شما میتوانید پنل را بررسی کنید تا ببینید آیا `userId` ثبت شده است یا خیر.

رویداد ها:
```objc
Objc:
- (void)pushClientManagerDidRegisterUser:(BOOL)registration{
// called when PushClientManager Registered user Successfully
}

- (void)pushClientManagerDidFailRegisterUser:(NSError *)error{
// Called When PushClientMangager fail in registerApplication:appVersion:userName:password:
// Or - registerUser:userId and registerAgainWithUserId:userId
NSLog(@"%@ %@",@(__PRETTY_FUNCTION__),error);
// OR
NSLog(@"%@ %@",@(__PRETTY_FUNCTION__),self.manager.failureError);
}
```
```swift
Swift:
func pushClientManagerDidRegisterUser(_ registration: Bool) {
}

func pushClientManagerDidFailRegisterUser(_ error: Error!) {
}
```
