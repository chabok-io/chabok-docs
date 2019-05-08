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

### برای آی‌اواس پایین ۹ (URL Schemes)

برای استفاده از این روش باید Scheme مورد نظر را برای اپلیکیشن خود مشخص کنید. این کار را با باز کردن xcode>project settings> info و وارد کردن Scheme به **The URL Types** انجام دهید. Scheme مورد نظر را به شکل com.myApp وارد کنید.

<p><img style="display: block; margin-left: auto; margin-right: auto;" src="http://uupload.ir/files/q1u_ios-deeplink-scheme.png" alt="آپلود عکس" border="0" /></p>

برای اینکه آی‌او‌اس لینک شما را بشناسد باید شکل آن را مانند url کنید (به این صورت scheme ://resource). به عنوان مثال com.myApp://main را وارد می‌کنیم. 

در صورتی هم که می‌خواهید کاربر را به اخل یک اپلیکیشن هدایت کنید؛ باید متد زیر را در **AppDelegate** پیاده‌سازی کنید.

```swift
func application(_ app: UIApplication, open url: URL,
                 options: [UIApplicationOpenURLOptionsKey : Any] = [:]) -> Bool {
    if let scheme = url.scheme,
        scheme.localizedCaseInsensitiveCompare("com.myApp") == .orderedSame,
        let view = url.host {
        
        var parameters: [String: String] = [:]
        URLComponents(url: url, resolvingAgainstBaseURL: false)?.queryItems?.forEach {
            parameters[$0.name] = $0.value
        }
        
        redirect(to: view, with: parameters)
    }
    return true
}
```

اینگونه نتیجه ”com.myApp://profile?user=”Hossein مانند زیر خواهد شد:

```swift
url.scheme = “com.myApp”
url.host = “profile”
parameters = [ “user” : “Hossein” ]
```

<br>

### نحوه استفاده در ترکر

همچنین اگر می‌خواهید **از دیپ لینک در ترکر** خود استفاده کنید، نامی که به `scheme` اختصاص دادید را در پارامتر `deep_link` لینک ترکر قرار دهید. به نمونه زیر دقت کنید:

```java
https://a.chabok.io/abc123?deep_link=myapp%3A%2F%2Fpagename
```


<br>

## ارسال اطلاعات به سرور

آمار دیپ لینک از طریق متدهای `onCreate` و یا `onNewIntent` انتقال داده می‌شود. زمانی که اپ را باز کنید و یکی از این متدها فراخوانی شوند، می‌توانید اطلاعات دیپ لینک را دریافت کنید. 

پس از اینکه اطلاعات دیپ لینک را در اپلیکیشن خود دریافت کردید، متد `appWillOpenUrl` را فراخوانی کنید. این متد اطلاعات را **از اپلیکیشن به سرور چابک** ارسال می‌کند تا بررسی کند که اتریبیوشن جدید رخ داده است یا خیر.

به نمونه زیر دقت کنید:

```java
@Override
protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_main);

    Intent intent = getIntent();
    AdpPushClient.get().appWillOpenUrl(data);
}

@Override
protected void onNewIntent(Intent intent) {
    super.onNewIntent(intent);

    Uri data = intent.getData();
    AdpPushClient.get().appWillOpenUrl(data);
}
```

### برای آی‌اواس ۹ به بالا (Universal Link)

اپل برای آی‌اواس ۹ به بالا تغییری را برای بالا بردن امنیت در این مکانیزم انجام داده است. به این صورت که برای مطمئن شدن از اختصاص یک اپلیکیشن به وبسایت آن باید حتما فایلی را به نام **apple-app-site-association** در وبسایت خود برای اعتبارسنجی و تایید اپل قرار دهید.
