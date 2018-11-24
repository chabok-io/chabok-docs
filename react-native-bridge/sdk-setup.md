---
id: sdk-setup
title: راه‌اندازی
layout: react-native-bridge
permalink: react-native-bridge/sdk-setup.html
prev: required.html
next: chabok-messaging.html
---

پس از طی کردن مراحل صفحه [پیش‌نیازها](/react-native-bridge/required.html)، می‌توانید **راه‌اندازی SDK چابک** را شروع کنید. در ابتدا شما باید کتابخانه چابک را [نصب کنید](/react-native-bridge/sdk-setup.html#۱--نصب-کتابخانه). در انتها، [مقداردهی و راه‌اندازی](/react-native-bridge/sdk-setup.html#۲--مقداردهی-اولیه) کتابخانه چابک را در اپلیکیشنتان انجام دهید و برای شناخت کاربر توسط چابک، مرحله [ثبت کاربر](/react-native-bridge/sdk-setup.html#۳--ثبت-کاربر) را حتما پشت سر بگذارید.

برای انجام موفق این کارها باید تمام مراحل زیر را به ترتیب انجام دهید:

[ ۱- نصب کتابخانه](/react-native-bridge/sdk-setup.html#۱--نصب-کتابخانه)

[۲- مقداردهی اولیه (Initialize)](/react-native-bridge/sdk-setup.html#۲--مقداردهی-اولیه-initialize)

[۳- ثبت کاربر (Register)](/react-native-bridge/sdk-setup.html#۳--ثبت-کاربر-register)

<Br>

### ۱- نصب کتابخانه 

برای نصب از طریق `npm`:

```bash
npm install react-native-chabok --save
```
 یا `yarn`:

```bash
yarn add react-native-chabok
```

#### لینک کردن کتابخانه

بعد از اتمام نصب، دستور زیر را اجرا کنید تا ماژول به پروژه شما لینک شود:

```bash
react-native link react-native-chabok
```

>`نکته:` دقت داشته باشید که [اندروید](/react-native-bridge/sdk-setup.html#۱--نصب-کتابخانه-اندروید) و [آی‌اواس](/react-native-bridge/sdk-setup.html#۱--نصب-کتابخانه-آی‌او‌اس) نیاز به نصب جداگانه دارند که در ادامه به هر دو پرداخته می‌شود:

#### نصب کتابخانه اندروید

فایل `build.gradle` در پوشه `android/app` را به صورت زیر ویرایش نمایید:

```javascript
android {
    compileSdkVersion 26
    buildToolsVersion "26.0.2"
    ...
}
dependencies {
    ...
    compile "com.google.android.gms:play-services-gcm:10.2.6"
    compile 'me.leolin:ShortcutBadger:1.1.22@aar'
    compile 'com.adpdigital.push:chabok-lib:+'
    ...
}
```

> `نکته`: برای اینکه نسخه کتابخانه‌ای که استفاده می‌کنید **آخرین** نسخه باشد، می‌توانید به جای ‌VERSION از + استفاده نمایید.

آخرین نسخه فایل کتابخانه چابک از  [اینجا](https://bintray.com/bintray/jcenter?filterByPkgName=com.adpdigital.push) قابل دسترس می‌باشد.
در انتها گزینه سینک را بزنید.

پس از آن، فایل `AndroidManifest.xml` را برای ایجاد رسیور دریافت پوش نوتیفیکیشن مانند نمونه زیر آپدیت کنید:

```markup
<manifest
    xmlns:android="http://schemas.android.com/apk/res/android"
    package="YOUR_APPLICATION_PACKAGE_ID">

    <permission
        android:name="YOUR_APPLICATION_PACKAGE_ID.permission.C2D_MESSAGE"
        android:protectionLevel="signature"/>

    <uses-permission android:name="YOUR_APPLICATION_PACKAGE_ID.permission.C2D_MESSAGE" />

    <application>
        
        <receiver
                android:name="com.google.android.gms.gcm.GcmReceiver"
                android:enabled="true"
                android:exported="true"
                android:permission="com.google.android.c2dm.permission.SEND">
            <intent-filter>
                <action android:name="com.google.android.c2dm.intent.RECEIVE"/>
                <action android:name="com.google.android.c2dm.intent.REGISTRATION"/>
                <category android:name="YOUR_APPLICATION_PACKAGE_ID"/>
            </intent-filter>
        </receiver>

...

    </application>
```

#### نصب کتابخانه آی‌اواس

چابک از طریق CocoaPods در دسترس است. بنابراین برای نصب، در فایل `ios` پروژه خود یک Podfile اضافه کنید:


```bash
$ cd ios
$ pod init
```
سپس dependency` chabokPush` را به Podfile خود مانند زیر اضافه کنید:

```bash
use_frameworks!
platform :ios, '9.0'

target 'YOUR_TARGET_NAME' do

  # Pods for AwesomeProject
  pod 'ChabokPush'

end
```

پس از آن با روش زیر Podfile را نصب کنید:

```bash
$ pod install
```
پس از اجرای دستورات بالا اگر با خطایی روبه رو شدید ، دستور زیر را وارد کنید سپس `pod install` را دوباره اجرا کنید.

```bash
$ pod update
```
حالا برای اطمینان از نصب ، پروژه را در xcode باز کنید ، اگر header فایل چابک را مشاهده کردید افزودن کتابخانه موفقیت آمیز بوده است.


پس از آن پروژه آی‌اواس خود را در `xcworkspace.` با Xcode  و همینطور `node_modules/react-native-chabok/` را باز کنید. فایل‌های `ios/AdpPushClient.h` و `ios/AdpPushClient.m` را به پروژه خود اضافه کنید.

اکنون داخل کلاس `AppDelegate` ایمپورت را مانند زیر انجام دهید:


```objectivec
#import <AdpPushClient/AdpPushClient.h>

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
    if ([PushClientManager.defaultManager application:application didFinishLaunchingWithOptions:launchOptions]) {
        NSLog(@"Application was launch by clicking on Notification...");
    }
    
    ...
   }

- (void)application:(UIApplication *)application didFailToRegisterForRemoteNotificationsWithError:(NSError *)error{
  // Hook and handle failure of get Device token from Apple APNS Server
  [PushClientManager.defaultManager application:application
didFailToRegisterForRemoteNotificationsWithError:error];
}

- (void)application:(UIApplication *)application didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken{
  // Manager hook and handle receive Device Token From APNS Server
  [PushClientManager.defaultManager application:application didRegisterForRemoteNotificationsWithDeviceToken:deviceToken];
}

- (void)application:(UIApplication *)application didRegisterUserNotificationSettings:(UIUserNotificationSettings *)notificationSettings{
  // Manager hook and Handle iOS 8 remote Notificaiton Settings
  [PushClientManager.defaultManager application:application didRegisterUserNotificationSettings:notificationSettings];
}
```

پس از آن برای دریافت پوش در آی‌او‌اس دو مرحله زیر را انجام دهید:

لطفا `Push Notifications` را در `Setting > Capabilities` فعال کنید .

و علامت `Remote Notifications` ها را در `Setting > Capabilities > Background Modes` چک کنید.

> `نکته` :‌ تمامی متدهایی که در این بخش بیان می‌شود باید تنها یک بار فراخوانی شود.  

### ۲- مقدار‌دهی اولیه 

در ابتدا برای **اندروید** در فایل `MainApplication.java` کد زیر اضافه نمایید:

```javascript
public class YourAppClass extends Application {

private AdpPushClient chabok = null;

    @Override
    public void onCreate() {
        super.onCreate();
        if (chabok == null) {
                   chabok = AdpPushClient.init(
                       getApplicationContext(),
                       MainActivity.class,
                       "YOUR_APP_ID/SENDER_ID",
                       "YOUR_API_KEY",
                       "SDK_USERNAME",
                       "SDK_PASSWORD"
                       );
               }
    }

    @Override
    public void onTerminate() {
        if (chabok != null)
            chabok.dismiss();

        super.onTerminate();
    }
}
```

برای ارتباط با سرور چابک، لازم است یک نمونه از کلاس `chabok.AdpPushClient` بسازید و آن را مقدار‌دهی کنید.
 فراخوانی این متد فقط یکبار کافی است. برای مقدار‌دهی اولیه می‌بایست از طریق متد `init` اطلاعات حساب چابک و تنظیمات اولیه را وارد نمایید. ایجاد حساب در بخش [پیش‌نیازها](required.html) توضیح داده شده است. در صورت داشتن حساب چابک هم می‌توانید این مقادیر را از [**پنل بخش تنظیمات قسمت دسترسی‌ و توکن‌ها**](https://doc.chabokpush.com/panel/settings.html#%D8%AF%D8%B3%D8%AA%D8%B1%D8%B3%DB%8C%D9%87%D8%A7-%D9%88-%D8%AA%D9%88%DA%A9%D9%86%D9%87%D8%A7) بردارید.
 به قطعه کد زیر دقت کنید :

```javascript
import { NativeEventEmitter, NativeModules } from 'react-native';
import chabok from 'react-native-chabok';

const options = {
  "appId": "APP_ID/GOOGLE_SENDER_ID",
  "apiKey": "API_KEY",
  "username": "USERNAME",
  "password": "PASSWORD"
};

this.chabok = new chabok.AdpPushClient();
this.chabok.init(options.appId, options.apiKey, options.username, options.password)
    .then((state) => {
        console.log(state);
        })
    .catch((error) => {
        console.log(error);
        });
```

#### متد `setDevelopment`

شما می‌توانید با استفاده از این متد (`setDevelopment`) محیط چابک را به sandbox یا production  تغییر دهید:

```javascript
this.chabok.setDevelopment(true);
```

> `نکته ` : به طور کلی چابک شامل ۲ محیط سندباکس و عملیاتی می‌باشد. حساب‌های رایگان چابک (تا ۳۰ هزار کاربر) بر روی محیط سندباکس و حساب‌های پریمیوم روی عملیاتی قرار می‌گیرند. مقدار `true` برای ‌`devMode` باعث اتصال به محیط سندباکس و مقدار `false` باعث اتصال به محیط عملیاتی ما می‌شود.


> `نکته ` :برای تغییر به محیط عملیاتی (`setDevelopment(false)`) باید از [**پنل بخش تنظیمات**](https://doc.chabokpush.com/panel/settings.html#%D8%AF%D8%B1%D8%AE%D9%88%D8%A7%D8%B3%D8%AA-%D8%AD%D8%B3%D8%A7%D8%A8-%D8%B9%D9%85%D9%84%DB%8C%D8%A7%D8%AA%DB%8C) درخواست خود را ثبت نمایید تا پس از تایید، اطلاعات جدید حسابتان (AppId, APIKey, Username و Password) تعیین گردد. 



### ۳- ثبت کاربر

با استفاده از متد `register` می‌توانید یک نام کاربری به هر کاربر اختصاص دهید. این متد `شناسه کاربر` را گرفته و کاربر را با آن شناسه روی سرور چابک ثبت‌نام می‌کند.

> `نکته` : متد `register` باید فقط **یک بار** در طول اجرا اپلیکیشن فراخوانی شود.


```javascript
this.chabok.register('USER_ID');
```
>   `نکته امنیتی` : مقدار `USER_ID` را هرگز به صورت خام در `LocalStorage` ذخیره نکنید، چون این مقدار شناسه معنادار می‌باشد و می‌توان با آن کاربر را روی چابک ثبت‌نام کرد. برای این منظور می‌توانید از متد زیر استفاده کنید که شناسه کاربر را به صورت رمزنگاری شده نگه‌می‌دارد:


```javascript
this.chabok.getUserId()
```

> `نکته` : متغیر `USER_ID` شناسه کاربر برای ثبت نام در چابک می‌باشد و ارسال پیام‌ به کاربران توسط همین شناسه‌ها و بدون استفاده از توکن یا شناسه گوشی، به سادگی امکان پذیر خواهد بود شناسه کاربری می تواند هر فیلد با ارزش و معنا‌دار برای کسب و کار شما باشد که کاربر خود را با آن شناسایی می‌کنید. `شماره موبایل، کدملی، شماره حساب و یا ایمیل` مثال‌هایی از شناسه‌های کاربری مناسب در موارد واقعی هستند.
>

> `نکته`: کاراکترهای ‍`#,+,*,\,/` و فاصله در `USER_ID` مجاز نیستند، همچنین طول این رشته نباید کمتر از ۳ و بیشتر از ۳۲ کاراکتر باشد.

> `نکته ` : در صورتی که مقداردهی اولیه و ثبت کاربر به درستی اعمال شده باشد، می‌توانید اطلاعات دستگاه متصل خود را در [بخش مشترکین پنل چابک](https://sandbox.push.adpdigital.com/front/users/subscribers/list) مشاهده کنید. 

### متد حذف کاربر

برای حذف دستگاه کاربر از سرور چابک می‌توانید از متد زیر استفاده کنید:

```javascript
this.chabok.unregister()
```

پس از اتمام این مراحل شما می‌توانید با فراخوانی [این رویدادها](https://doc.chabokpush.com/react-native-bridge/features.html#اتصال-با-سرور) از اتصال دستگاه به چابک اطمینان یابید.
