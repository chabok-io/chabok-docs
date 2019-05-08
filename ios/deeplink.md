---
id: deeplink
title: دیپ لینک (Deeplink)
layout: ios
permalink: ios/deeplink.html
prev: push-notification.html
next: user-management.html
---
 
دیپ لینک یا لینک عمقی در واقع استفاده از لینکی است که کاربران را به داخل یک صفحه خاص در وبسایت، و یا **قسمت خاصی از اپلیکیشن** هدایت می‌کند. به عبارت دیگر، دیپ لینک را می‌توانید به عنوان یک **میانبر (Shortcut) هوشمند** در نظر بگیرید که کاربر را به مقصدهای مرتبط (با پیام شما) هدایت می‌کند.

<br>

## مزایا

قابلیت دیپ لینک به شما کمک می‌کند تا **نرخ تبدیل** کمپین‌های خود را به صورت چشمگیری **افزایش دهید**. به عنوان مثال، کاربر شما محصولی را به سبد خرید خود اضافه کرده است اما سبد خود را رها کرده و خرید را تکمیل نکرده است. در این صورت شما می‌توانید با یک نوتیفیکیشن به موقع تخفیف روی آن محصول، کاربر را **مستقیما به صفحه محصول** هدایت کنید و به انجام خرید تشویق کنید.

<p><img style="display: block; margin-left: auto; margin-right: auto;" src="http://uupload.ir/files/z6lx_deeplinkings.png" alt="آپلود عکس" border="0" /></p>

<br>

## پیاده‌سازی 

### برای آی‌اواس پایین‌تر از ۹ (URL Schemes)

برای استفاده از این روش باید Scheme مورد نظر را برای اپلیکیشن خود مشخص کنید. این کار را با باز کردن xcode>project settings> info و وارد کردن Scheme به **The URL Types** انجام دهید. Scheme مورد نظر را به شکل APP_NAME وارد کنید.


<p><img style="display: block; margin-left: auto; margin-right: auto;" src="https://raw.githubusercontent.com/chabokpush/chabok-assets/master/chabok-docs/ios/URL_SCHEME.png" alt="آپلود عکس" border="0" /></p>


برای اینکه آی‌او‌اس لینک شما را بشناسد باید شکل آن را مانند url کنید (به این صورت scheme ://resource). به عنوان مثال APP_NAME://PAGE_NAME را وارد می‌کنیم. 
در صورتی هم که می‌خواهید کاربر را به اخل یک اپلیکیشن هدایت کنید؛ باید متد زیر را در **AppDelegate** پیاده‌سازی کنید.
```swift
func application(_ app: UIApplication, open url: URL,
                 options: [UIApplicationOpenURLOptionsKey : Any] = [:]) -> Bool {
    
    
    
    return true
}
```

در این حالت، نتیجه twitter://user?screen_name=ChabokPush مانند زیر خواهد شد:

```swift
url.scheme = “twitter”
url.host = “user”
parameters = [ “screen_name” : “ChabokPush” ]
```
<br>

### نحوه استفاده در ترکر

همچنین اگر می‌خواهید **از دیپ لینک در ترکر** خود استفاده کنید، نامی که به `scheme` اختصاص دادید را در پارامتر `deep_link` لینک ترکر قرار دهید. به نمونه زیر دقت کنید:

```java
https://a.chabok.io/abc123?deep_link=APP_NAME%3A%2F%2FPAGE_NAME
```
<br>

## ارسال اطلاعات به سرور

آمار دیپ لینک از طریق متدهای `onCreate` و یا `onNewIntent` انتقال داده می‌شود. زمانی که اپ را باز کنید و یکی از این متدها فراخوانی شوند، می‌توانید اطلاعات دیپ لینک را دریافت کنید. 


پس از اینکه اطلاعات دیپ لینک را در اپلیکیشن خود دریافت کردید، متد `appWillOpenUrl` را فراخوانی کنید. این متد اطلاعات را **از اپلیکیشن به سرور چابک** ارسال می‌کند تا بررسی کند که اتریبیوشن جدید رخ داده است یا خیر.
به نمونه زیر دقت کنید:

```objective-c
//Objective-C
-(BOOL) application:(UIApplication *)app openURL:(NSURL *)url 
                        options:(NSDictionary<UIApplicationOpenURLOptionsKey,id> *)options{
                        
    [_manager appWillOpenUrl:url];
    
    return YES;
}
```
```swift
//Swift
func application(_ app: UIApplication, 
                open url: URL, 
                options: [UIApplication.OpenURLOptionsKey : Any] = [:]) -> Bool {
                
    _manager?.appWillOpen(url)
    return true
}
```
### برای آی‌اواس ۹ به بالا (Universal Link)

اپل برای آی‌اواس ۹ به بالا تغییری را برای بالا بردن امنیت در این مکانیزم انجام داده است. به این صورت که برای مطمئن شدن از اختصاص یک اپلیکیشن به وبسایت آن باید حتما فایلی را به نام **apple-app-site-association** در وبسایت خود برای اعتبارسنجی و تایید اپل قرار دهید.

```objective-c
//Objective-C
-(BOOL) application:(UIApplication *)application continueUserActivity:(NSUserActivity *)userActivity
                restorationHandler:(void (^)(NSArray<id<UIUserActivityRestoring>> * _Nullable))restorationHandler{
                        
    if ([[userActivity activityType] isEqualToString:NSUserActivityTypeBrowsingWeb]) {
        [_manager appWillOpenUrl:[userActivity webpageURL]];
    }
    
    return YES;
}
```
```swift
//Swift
func application(_ application: UIApplication, 
                continue userActivity: NSUserActivity, 
                restorationHandler: @escaping ([UIUserActivityRestoring]?) -> Void) -> Bool {
    if (userActivity.activityType == NSUserActivityTypeBrowsingWeb) {
        _manager?.appWillOpen(userActivity.webpageURL)
    }
    return true
}
```
