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

اگر می‌خواهید **از دیپ لینک در ترکر** خود استفاده کنید، نامی که به `scheme` اختصاص دادید را در پارامتر `deep_link` لینک ترکر قرار دهید. به نمونه زیر دقت کنید:

```java
https://a.chabok.io/TRACKER_ID?deep_link=APP_NAME%3A%2F%2Fpagename
```

همچنین در لینک ترکر خود می‌توانید از پارامتر ‍‍‍‍‍`redirect` هم استفاده کنید تا در صورت کار نکردن دیپ لینک، کاربر به این مقصد هدایت شود:

```java
https://a.chabok.io/TRACKER_ID?deep_link=APP_NAME%3A%2F%2Fpagename&redirect=https://chabok.io
``` 

<br>

### نحوه استفاده در نوتیفیکیشن


با اجرای دستور زیر در **Terminal** می‌توانید یک نوتیفیکیشن با **دیپ لینک** ارسال کنید. دقت کنید که در دستور زیر مقدار `<ACCESS_TOKEN>` حساب کاربری خود و مقدار `USER_ID` را شناسه‌ کاربری که می‌خواهید پیام به او تحویل داده شود، وارد نمایید. (این دستور برای ارسال به یک کاربر به خصوص است. برای ارسال به گروهی از کاربران به [این صفحه](https://doc.chabok.io/rest-api/send-push.html#%D8%A7%D8%B1%D8%B3%D8%A7%D9%84-%DA%AF%D8%B1%D9%88%D9%87%DB%8C) مراجعه کنید.)

> `نکته:` در آی‌او‌اس برای اجرای دیپ‌ لینک، اپلیکیشن حتما باید باز شود. برای همین در هنگام گذاشتن دیپ‌ لینک روی نوتیفیکیشن از پنل، برای آن دکمه حالت **«برای این دکمه اپلیکیشن باز شود.»** را انتخاب کنید؛ یا اگر مانند زیر از Curl استفاده می‌کنید در options قسمت اکشن عدد **۴** (یا خود ۴ یا مجموع آن با ۱ و ۲) در آن باشد.

![enter image description here](http://uupload.ir/files/f5yw_action-options-in-ios.png)

<br>

- نمونه Curl

```bash
curl -X POST \
"https://sandbox.push.adpdigital.com/api/push/toUsers?access_token=<ACCESS_TOKEN>" \
-H "accept: application/json" \
-H "Content-Type: application/json" \
-d '{ "user": "USER_ID", "content": "ما را در توئیتر دنبال کنید", "notification": { "clickUrl": "twitter://user?screen_name=chabokpush", "title": "ما را در توئیتر دنبال کنید", "body": "با فالو کردن چابک، از تخفیف ۲۰٪ ما بهرمند شوید.", "actions": [ { "id": "new_tweet_action", "title": "توئیت جدید", "options": 5, "url": "twitter://post?message=%40chabokpush%20%D8%B1%D9%88%20%D9%81%D8%A7%D9%84%D9%88%20%DA%A9%D8%B1%D8%AF%D9%85%20%D9%88%20%D8%AA%D8%AE%D9%81%DB%8C%D9%81%D9%85%D9%88%20%DA%AF%D8%B1%D9%81%D8%AA%D9%85%20" }], "mediaType": "jpeg", "mediaUrl": "https://raw.githubusercontent.com/chabokpush/chabok-assets/master/samples/notification/chabokpush_twitter.jpeg", "mutableContent": true, "category": "__TWITTER_FOLLOW__" } }'
```
با وارد کردن دستور زیر نوتیفیکیشن زیر همراه با دیپ لینک ارسال خواهد شد:

<img src="http://uupload.ir/files/0qha_ios-deep-link.png" alt="Its You" height="583px" width="289.5px">

<br>

## ارسال اطلاعات به سرور

آمار دیپ لینک از طریق متدهای `onCreate` و یا `onNewIntent` انتقال داده می‌شود. زمانی که اپ را باز کنید و یکی از این متدها فراخوانی شوند، می‌توانید اطلاعات دیپ لینک را دریافت کنید. 

{% tabs %}
{% tab OBJECTIVE-C %}

```objectivec
-(BOOL) application:(UIApplication *)app openURL:(NSURL *)url 
                        options:(NSDictionary<UIApplicationOpenURLOptionsKey,id> *)options{
                        
    NSLog(@"app opened with this deeplink %@", url);
    
    return YES;
}
```
{% endtab %}
{% tab SWIFT %}

```swift
func application(_ app: UIApplication, 
                open url: URL, 
                options: [UIApplication.OpenURLOptionsKey : Any] = [:]) -> Bool {
                
    print("app opened with this deeplink \(url)")
    return true
}
```
{% endtab %}
{% endtabs %}

> `نکته:` دقت داشته باشید **در نسخه‌های پایین ۲ کتابخانه چابک**، باید
پس از اینکه اطلاعات دیپ لینک را در اپلیکیشن خود دریافت کردید، متد  `appWillOpenUrl` را فراخوانی کنید. این متد اطلاعات را **از اپلیکیشن به سرور چابک** ارسال می‌کند تا بررسی کند که اتریبیوشن جدید رخ داده است یا خیر.
به نمونه زیر دقت کنید:

{% tabs %}
{% tab OBJECTIVE-C %}

```objectivec

-(BOOL) application:(UIApplication *)app openURL:(NSURL *)url 
                        options:(NSDictionary<UIApplicationOpenURLOptionsKey,id> *)options{
                        
    [_manager appWillOpenUrl:url];
    
    return YES;
}
```
{% endtab %}
{% tab SWIFT %}

```swift

func application(_ app: UIApplication, 
                open url: URL, 
                options: [UIApplication.OpenURLOptionsKey : Any] = [:]) -> Bool {
                
    _manager?.appWillOpen(url)
    return true
}
```
{% endtab %}
{% endtabs %}

<br>

### برای آی‌اواس ۹ به بالا (Universal Link)

اپل برای آی‌اواس ۹ به بالا تغییری را برای بالا بردن امنیت در این مکانیزم انجام داده است. به این صورت که برای مطمئن شدن از اختصاص یک اپلیکیشن به وبسایت آن باید حتما فایلی را به نام **apple-app-site-association** در وبسایت خود برای اعتبارسنجی و تایید اپل قرار دهید. 

زمانی که کاربر با Universal Link وارد وبسایت شما شود، متد زیر فرخوانی می‌شود:

{% tabs %}
{% tab OBJECTIVE-C %}

```objectivec
-(BOOL) application:(UIApplication *)application continueUserActivity:(NSUserActivity *)userActivity
                restorationHandler:(void (^)(NSArray<id<UIUserActivityRestoring>> * _Nullable))restorationHandler{
                        
    if ([[userActivity activityType] isEqualToString:NSUserActivityTypeBrowsingWeb]) {
        NSLog(@"app opened with this deeplink %@", [userActivity webpageURL]);
    }
    
    return YES;
}
```
{% endtab %}
{% tab SWIFT %}

```swift

func application(_ application: UIApplication, 
                continue userActivity: NSUserActivity, 
                restorationHandler: @escaping ([UIUserActivityRestoring]?) -> Void) -> Bool {
    if (userActivity.activityType == NSUserActivityTypeBrowsingWeb) {
        print("app opened with this deeplink \(userActivity.webpageURL)")
    }
    return true
}
```
{% endtab %}
{% endtabs %}

> `نکته:` دقت داشته باشید **در نسخه‌های پایین ۲ کتابخانه چابک**، باید مانند زیر عمل کنید:

{% tabs %}
{% tab OBJECTIVE-C %}

```objectivec
-(BOOL) application:(UIApplication *)application continueUserActivity:(NSUserActivity *)userActivity
                restorationHandler:(void (^)(NSArray<id<UIUserActivityRestoring>> * _Nullable))restorationHandler{
                        
    if ([[userActivity activityType] isEqualToString:NSUserActivityTypeBrowsingWeb]) {
        [_manager appWillOpenUrl:[userActivity webpageURL]];
    }
    
    return YES;
}
```
{% endtab %}
{% tab SWIFT %}

```swift
func application(_ application: UIApplication, 
                continue userActivity: NSUserActivity, 
                restorationHandler: @escaping ([UIUserActivityRestoring]?) -> Void) -> Bool {
    if (userActivity.activityType == NSUserActivityTypeBrowsingWeb) {
        _manager?.appWillOpen(userActivity.webpageURL)
    }
    return true
}
```
{% endtab %}
{% endtabs %}

<br>

### دیپ لینک قبل از نصب اپلیکیشن (Deferred Deep Linking)

این حالت زمانی اتفاق می‌افتد که شما از پارامترها `deep_link` استفاده کرده باشید، اما کاربر در زمان کلیک اپلیکیشن را هنوز روی گوشی خود نداشته باشد. در این حالت می‌توانید یک delegate کالبک را بگذارید تا قبل از باز شدن دیپ لینک، تصمیم بگیرید چابک آن را باز کند یا خودتان مدیریت کنید.

{% tabs %}
{% tab OBJECTIVE-C %}

```objectivec
- (BOOL)chabokDeeplinkResponse:(NSURL *)deeplink {
    // deeplink object contains information about deferred deep link content

    // Apply your logic to determine whether the Chabok SDK should try to open the deep link
    return YES;
    // or
    // return NO;
}
```
{% endtab %}
{% tab SWIFT %}

```swift
func chabokDeeplinkResponse(_ deeplink: URL?) -> Bool {
    // deeplink object contains information about deferred deep link content

    // Apply your logic to determine whether the Chabok SDK should try to open the deep link
    return true
    // or
    // return false;
}
```
{% endtab %}
{% endtabs %}
این کالبک پس از دریافت دیپ لینک فراخوانی می‌شود. مقدار `true` یا `false` بودن تعیین می‌کند که چابک آن را باز کند یا خیر.
