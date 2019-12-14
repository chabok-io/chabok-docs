---
id: deeplink
title: دیپ لینک (Deeplink)
layout: cordova
permalink: cordova/deeplink.html
prev: chabok-messaging.html
next: user-management.html
---
 
دیپ لینک یا لینک عمقی در واقع استفاده از لینکی است که کاربران را به داخل یک صفحه خاص در وبسایت، و یا **قسمت خاصی از اپلیکیشن** هدایت می‌کند. به عبارت دیگر، دیپ لینک را می‌توانید به عنوان یک **میانبر (Shortcut) هوشمند** در نظر بگیرید که کاربر را به مقصدهای مرتبط (با پیام شما) هدایت می‌کند.

<br>

## مزایا

قابلیت دیپ لینک به شما کمک می‌کند تا **نرخ تبدیل** کمپین‌های خود را به صورت چشمگیری **افزایش دهید**. به عنوان مثال، کاربر شما محصولی را به سبد خرید خود اضافه کرده است اما سبد خود را رها کرده و خرید را تکمیل نکرده است. در این صورت شما می‌توانید با یک نوتیفیکیشن به موقع تخفیف روی آن محصول، کاربر را **مستقیما به صفحه محصول** هدایت کنید و به انجام خرید تشویق کنید.

<p><img style="display: block; margin-left: auto; margin-right: auto;" src="http://uupload.ir/files/z6lx_deeplinkings.png" alt="آپلود عکس" border="0" /></p>

<br>

### پیاده‌سازی اندروید

 در اندروید، برای استفاده از دیپ لینک باید **مقصد** مورد نظر را در قالب `host`، `scheme` و `prefix` (در صورت نیاز) تعیین کنید. این پارامترها را باید در دیتای کلاس `intent-filter` در **activity** دلخواه خود (صفحه‌ای که می‌خواهید هنگام اجرای اپلیکیشن باز شود) در فایل `AndroidManifest.xml` تعریف کنید:

```xml
<activity
    android:name=".MainActivity"
    android:configChanges="orientation|keyboardHidden"
    android:label="@string/app_name"
    android:screenOrientation="portrait">

    <intent-filter android:label="@string/filter_view_example_gizmos">
        <action android:name="android.intent.action.VIEW" />
        <category android:name="android.intent.category.DEFAULT" />
        <category android:name="android.intent.category.BROWSABLE" />
        
        <!-- Accepts URIs that begin with "twitter://user” 
        <data android:scheme="twitter"
              android:host="user" />  -->
              
        <data android:scheme="APP_NAME"
              android:host="PAGE_NAME" />
    </intent-filter>
</activity>
```
<br>


### پیاده‌سازی آی‌اواس

در آی‌اواس هم باید `Scheme` مورد نظر را در اپلیکیشن خود مشخص کنید. این کار را با باز کردن **xcode>project settings> info** و وارد کردن `Scheme` به **The URL Types** انجام دهید. `Scheme` مورد نظر را به شکل APP_NAME وارد کنید.


<p><img style="display: block; margin-left: auto; margin-right: auto;" src="https://raw.githubusercontent.com/chabokpush/chabok-assets/master/chabok-docs/ios/URL_SCHEME.png" alt="آپلود عکس" border="0" /></p>


برای اینکه آی‌او‌اس لینک شما را بشناسد باید شکل آن را مانند url کنید (به این صورت scheme ://resource). به عنوان مثال APP_NAME://PAGE_NAME را وارد می‌کنیم. 

در این حالت، نتیجه twitter://user?screen_name=ChabokPush مانند زیر خواهد شد:

```swift
url.scheme = “twitter”
url.host = “user”
parameters = [ “screen_name” : “ChabokPush” ]
```

پس از آن کد زیر را `AppDelegate.m` اضافه کنید:

```objectivec
#import <React/RCTLinkingManager.h>
```
در آخر، پایین `implementation` کد زیر را هم اضافه کنید:

```objectivec
- (BOOL)application:(UIApplication *)application openURL:(NSURL *)url
  sourceApplication:(NSString *)sourceApplication annotation:(id)annotation
{
  return [RCTLinkingManager application:application openURL:url
                      sourceApplication:sourceApplication annotation:annotation];
}

// Only if your app is using [Universal Links](https://developer.apple.com/library/prerelease/ios/documentation/General/Conceptual/AppSearch/UniversalLinks.html).
- (BOOL)application:(UIApplication *)application continueUserActivity:(NSUserActivity *)userActivity
 restorationHandler:(void (^)(NSArray * _Nullable))restorationHandler
{
 return [RCTLinkingManager application:application
                  continueUserActivity:userActivity
                    restorationHandler:restorationHandler];
}
```
<br>

### دریافت دیپ لینک

پس از پیاده‌سازی دیپ لینک در **اندروید و آی‌اواس** با فراخوانی متد زیر می‌توانید آن را دریافت کنید. همچنین شما می‌توانید با استفاده از متد `appWillOpenUrl` اطلاعات را **از اپلیکیشن به سرور چابک** ارسال کنید:


```javascript
componentDidMount() {
  ...
  
  Linking.getInitialURL().then((url) => {
    if (url) {
      this.handleOpenURL({ url });
    }
  });
  
  Linking.addEventListener('url', this.handleOpenURL.bind(this));
}

componentWillUnmount() {
  Linking.removeEventListener('url', this.handleOpenURL);
}

handleOpenURL(event) {
  console.log("Got deep-link url = ", event.url);
  const route = event.url.replace(/.*?:\/\//g, '');
  // do something with the url, in our case navigate(route)

  if (event && event.url) {
    this.chabok.appWillOpenUrl(event.url);
  }
}
```

>‍`نکته:‍` برای اطلاعات بیشتر می‌توانید [این صفحه](https://medium.com/react-native-training/deep-linking-your-react-native-app-d87c39a1ad5e) را مطالعه کنید.

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

### نمونه Curl

با اجرای دستور زیر در **Terminal** می‌توانید یک نوتیفیکیشن با **دیپ لینک** ارسال کنید. دقت کنید که در دستور زیر مقدار `<ACCESS_TOKEN>` حساب کاربری خود و مقدار `USER_ID` را شناسه‌ کاربری که می‌خواهید پیام به او تحویل داده شود، وارد نمایید. (این دستور برای ارسال به یک کاربر به خصوص است. برای ارسال به گروهی از کاربران به [این صفحه](https://doc.chabokpush.com/rest-api/send-push.html#ارسال-گروهی) مراجعه کنید.)

```bash
curl -X POST \
"https://sandbox.push.adpdigital.com/api/push/toUsers?access_token=<ACCESS_TOKEN>" \
-H "accept: application/json" \
-H "Content-Type: application/json" \
-d '{ "user": "USER_ID", "content": "ما را در توئیتر دنبال کنید", "notification": { "clickUrl": "twitter://user?screen_name=chabokpush", "title": "ما را در توئیتر دنبال کنید", "body": "با فالو کردن چابک، از تخفیف ۲۰٪ ما بهرمند شوید.", "actions": [ { "id": "new_tweet_action", "title": "توئیت جدید", "options": 5, "url": "twitter://post?message=%40chabokpush%20%D8%B1%D9%88%20%D9%81%D8%A7%D9%84%D9%88%20%DA%A9%D8%B1%D8%AF%D9%85%20%D9%88%20%D8%AA%D8%AE%D9%81%DB%8C%D9%81%D9%85%D9%88%20%DA%AF%D8%B1%D9%81%D8%AA%D9%85%20" }], "mediaType": "jpeg", "mediaUrl": "https://raw.githubusercontent.com/chabokpush/chabok-assets/master/samples/notification/chabokpush_twitter.jpeg", "mutableContent": true, "category": "__TWITTER_FOLLOW__" } }'
```
با وارد کردن دستور زیر نوتیفیکیشن زیر همراه با دیپ لینک ارسال خواهد شد:

<img src="http://uupload.ir/files/0qha_ios-deep-link.png" alt="Its You" height="583px" width="289.5px">
