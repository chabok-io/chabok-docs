---
id: setup
title: راه اندازی چابک
layout: ios
permalink: ios/setup.html
prev: installation.html
next: introducing.html
---



Chabok Push راه اندازی
-------------
در متد `didFinishLaunchingWithOptions` در کلاس `AppDelegate` کدهای زیر را اضافه کنید:


برای انتخاب سرورهای chabok sandbox از کد زیر استفاده کنید:
```
Objc:
[PushClientManager setDevelopment:YES];

Swift:  
PushClientManager.setDevelopment(false)

```

حالا یک singleton instance از PushClientManager با استفاده از `defaultManager` ایجاد کنید:

```
Objc:
self.manager = [PushClientManager defaultManager];

Swift:
self.manager = PushClientManager.default()

```
سپس delegate  را از  AppDelegate اضافه کنید:
```
Objc:
[self.manager addDelegate:self];

Swift:
self.manager.addDelegate(self)

```
سپس کد زیر را اضافه کنید :
```
Objc:
[self.manager application:application didFinishLaunchingWithOptions:launchOptions])

Swift:
self.manager.application(application, didFinishLaunchingWithOptions: launchOptions)

```
اکنون حساب کاربری APP_ID، SDK_USERNAME و SDK_PASSWORD را تعریف کنید. شما می توانید SDK_KEY خود را از پنل وب chabok پیدا کنید:

```
Objc:
[self.manager registerApplication:@"YOUR_APP_ID"
apiKey:@"YOUR_SDK_KEY"
userName:@"SDK_USERNAME"
password:@"SDK_PASSWORD"]

Swift:
self.manager.registerApplication(AppDelegate.applicationId(),
apiKey : "YOUR_APP_ID",userName:"SDK_USERNAME" ,password:"SDK_PASSWORD" )
```

زمان آن است که کاربر را با یک userId ثبت کنید
```
Objc:
[self.manager registerUser:@"USER_ID" channels:@[@"YOUR_CHANNEL" ]
registrationHandler:^(BOOL isRegistered, NSString *userId, NSError *error) {
// handle registration result from server
}

Swift:
self.manager.registerUser("USER_ID", channels: ["YOUR_CHANNEL"])
```
بعد از ثبت نام برای اولین بار، self.manager.userId تنظیم خواهد شد و شما میتوانید پنل را بررسی کنید تا ببینید آیا userId ثبت شده است یا خیر.
