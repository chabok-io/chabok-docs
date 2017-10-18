---
id: setup
title: راه‌اندازی چابک
layout: ios
permalink: ios/setup.html
prev: installation.html
next: publishingMessages.html
---
### مقداردهی اولیه

برای دریافت یا ارسال پیام از/به سرور چابک، بایستی یک نمونه از کلاس AdpPushClient بسازید و آن را مقداردهی نمایید. یکی از بهترین روش‌ها برای ساختن کلاینت چابک استفاده از کلاس اپلیکیشن پروژه شماست. برای این منظور در متد `didFinishLaunchingWithOptions` کلاس `AppDelegate`  کدهای زیر را اضافه کنید.

```objc
//Objective-C:

[self.manager registerApplication:@"YOUR_APP_ID"
                apiKey:@"YOUR_SDK_KEY"
              userName:@"SDK_USERNAME"
            password:@"SDK_PASSWORD"]
```
```swift
//Swift:

self.manager.registerApplication(AppDelegate.applicationId(),
				apiKey : "YOUR_APP_ID",
			   userName:"SDK_USERNAME" ,
			   password:"SDK_PASSWORD" )
```

### پارامترها

با استفاده از متد بالا یک نمونه از AdpPushClient مقدار دهی اولیه می شود. در این متد بجای پارامتر‌های `YOUR_APP_ID`, `YOUR_API_KEY`, `SDK_USERNAME`, `SDK_PASSWORD` مقادیر مربوط به حساب چابک خود را وارد نمایید. نحوه ایجاد حساب در بخش پیش‌نیازها توضیح داده شده است.

### توضیح متدها

۱. متد `setDevelopment`

مشخص می‌کند که برنامه به محیط تستی چابک متصل شود یا به محیط عملیاتی. این موضوع بستگی به این دارد که حساب کاربری شما روی کدام محیط تعریف شده باشد.

```objc
//Objective-C:

[PushClientManager setDevelopment:YES];
```
```swift
//Swift:

PushClientManager.setDevelopment(true)
```


۲. متد `registerUser`

با دو امضای متفاوت وجود دارد: امضای اول که تنها شناسه کاربر را گرفته و کاربر را با آن شناسه روی سرور چابک ثبت نام میکند.

```objc
//Objective-C:

[self.manager registerUser:@"USER_ID"];
```
```swift
//Swift:

self.manager.registerUser("USER_ID")
```


> `نکته` : متغیر `USER_ID` شناسه کاربر برای ثبت نام در چابک می‌باشد و ارسال پیام‌ به کاربران توسط همین شناسه‌ها و بدون استفاده از توکن یا شناسه گوشی، به سادگی امکان پذیر خواهد بود شناسه کاربری می تواند هر فیلد باارزش و معنا‌دار برای کسب و کار شما باشد که کاربر خود را با آن شناسایی می‌کنید. شماره موبایل، کدملی، شماره حساب و یا ایمیل مثال‌هایی از شناسه‌های کاربری مناسب در موارد واقعی هستند. 
>

امضای دوم که علاوه بر شناسه کاربر، لیستی از نام‌ کانال‌هایی که کاربر باید روی آن‌ها عضو شود را نیز دریافت می کند. با ثبت نام در این کانال‌ها کاربر پیام‌های ارسالی روی آن‌ها را دریافت خواهد نمود.

```objc
//Objective-C:

[self.manager registerUser:@"USER_ID" channels:@[@"YOUR_CHANNEL" ]
registrationHandler:^(BOOL isRegistered, NSString *userId, NSError *error) {
// handle registration result from server
}
```
```swift
//Swift:

self.manager.registerUser("USER_ID", channels: ["YOUR_CHANNEL"])
```

رویداد ها:
```objc
//Objective-C:

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
//Swift:

func pushClientManagerDidRegisterUser(_ registration: Bool) {
}

func pushClientManagerDidFailRegisterUser(_ error: Error!) {
}
```
