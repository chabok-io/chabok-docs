---
id: upgrade-chabok-to-2-0-0
title: راهنمای ارتقا به نسخه ۲ چابک
layout: react-native-bridge
permalink: react-native-bridge/upgrade-chabok-to-2-0-0.html
---

با مطالعه راهنمای زیر می‌توانید نسخه کتابخانه ریکت نیتیو خود را به **نسخه‌های ۲.۰.۰ به بعد ارتقا دهید**. برای این کار فقط کافیست نسخه جدید را دریافت کنید، و تعدادی کد را حذف و اضافه کنید.

مراحل ارتقا را باید به ترتیب زیر انجام دهید:

[۱- حذف نسخه قدیمی کتابخانه](/react-native-bridge/upgrade-chabok-to-2-0-0.html#۱--حذف-نسخه-قدیمی-کتابخانه)

[۲- دریافت نسخه ۲.۰.۰ کتابخانه](/react-native-bridge/upgrade-chabok-to-2-0-0.html#۲--دریافت-نسخه-۲۰۰-کتابخانه)

[۳- بروزرسانی پروژه اندروید](/react-native-bridge/upgrade-chabok-to-2-0-0.html#۳--بروزرسانی-پروژه-اندروید)

[۴- بروزرسانی پروژه آی‌او‌اس](/react-native-bridge/upgrade-chabok-to-2-0-0.html#۴--بروزرسانی-پروژه-آی‌او‌اس)

[۵- بروزرسانی پروژه جاوااسکریپت](/react-native-bridge/upgrade-chabok-to-2-0-0.html#۵--بروزرسانی-پروژه-جاوااسکریپت)

[۶- تغییرات ورود کاربر (Login)](/react-native-bridge/upgrade-chabok-to-2-0-0.html#۶--تغییرات-ورود-کاربر-Login)

[۷- تغییرات خروج کاربر (Logout)](/react-native-bridge/upgrade-chabok-to-2-0-0.html#۷--تغییرات-خروج-کاربر-Logout)

[۸- تغییرات پوش‌نوتیفیکیشن](/react-native-bridge/upgrade-chabok-to-2-0-0.html#۸--تغییرات-پوشنوتیفیکیشن)

<br><br>

### ۱- حذف نسخه قدیمی کتابخانه

برای حذف از طریق `npm`:

```bash
npm uninstall react-native-chabok --save
```

یا `yarn`:

```bash
yarn remove react-native-chabok
```

بعد از اتمام حذف، دستور زیر را اجرا کنید تا ماژول از پروژه شما حذف شود:

```bash
react-native unlink react-native-chabok
```

<br><br>

### ۲- دریافت نسخه ۲.۰.۰ کتابخانه

برای نصب از طریق `npm`:

```bash
npm install react-native-chabok --save
```

یا `yarn`:

```bash
yarn add react-native-chabok
```

بعد از اتمام نصب، دستور زیر را اجرا کنید تا ماژول به پروژه شما **لینک** شود:

```bash
react-native link react-native-chabok
```

<br><br>

### ۳- بروزرسانی پروژه اندروید

برای دریافت کتابخانه چابک تغییرات زیر را در فایل `build.gradle` اصلی پروژه اعمال کنید:
```diff
buildscript {
    repositories {
        google()
        jcenter()

+       maven {
+           url "https://plugins.gradle.org/m2/" 
+       }
    }
    
    dependencies {
        classpath 'com.android.tools.build:gradle:3.4.2'

+       classpath 'io.chabok.plugin:chabok-services:1.0.0'
+       classpath 'com.google.gms:google-services:4.3.2'
    }
}
```

تغییرات زیر را در انتهای فایل `build.gradle` ماژول اپلیکیشن خود اعمال کنید:

```diff
dependencies {
-   implementation 'com.google.android.gms:play-services-gcm:10.2.6'
-   implementation 'me.leolin:ShortcutBadger:1.1.22@aar'
-   implementation 'com.adpdigital.push:chabok-lib:2.16.0'
-   implementation 'com.android.installreferrer:installreferrer:1.0'
}

+ apply plugin: 'io.chabok.plugin.chabok-services'
+ apply plugin: 'com.google.gms.google-services'
```

در انتها گزینه سینک گریدل را بزنید.

> `نکته:` وقتی ماژول چابک را به پروژه **لینک** می‌کنید وابستگی‌های مورد نیاز بصورت خودکار به پروژه اندروید اضافه خواهند شد.

اگر قطعه کد زیر را به فایل مانیفست پروژه اضافه کردید دیگر نیازی به آن نیست و می‌توانید آن را حذف کنید:

```diff
- <uses-library android:name="org.apache.http.legacy" android:required="false" /> 
```

حذف متد `AdpPushClient.init` و استفاده از متد `AdpPushClient.configureEnvironment` برای راه‌اندازی اولیه کتابخانه چابک در کلاس `MainApplication`:

```diff
import android.app.Application;
+ import android.content.Context;

//React-Native
import com.facebook.react.ReactPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactApplication;
- import com.adpdigital.push.rn.ChabokReactPackage;
- import com.facebook.react.shell.MainReactPackage;
+ import com.facebook.react.PackageList;

//Chabok
import com.adpdigital.push.AdpPushClient;
- import com.adpdigital.push.ChabokNotification;
- import com.adpdigital.push.NotificationHandler;
- import com.adpdigital.push.ChabokNotificationAction;
+ import com.adpdigital.push.config.Environment;

//Java
import java.util.List;
- import java.util.Arrays;
+ import java.lang.reflect.InvocationTargetException;

public class MainApplication extends Application implements ReactApplication {

    private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
        @Override
        public boolean getUseDeveloperSupport() {
            return BuildConfig.DEBUG;
        }

        @Override
        protected List<ReactPackage> getPackages() {
-           return Arrays.<ReactPackage>asList(
-                 new MainReactPackage(),
-                 new ChabokReactPackage()
-           );

+           @SuppressWarnings("UnnecessaryLocalVariable")
+           List<ReactPackage> packages = new PackageList(this).getPackages();
+           return packages;
        }

        @Override
        protected String getJSMainModuleName() {
            return "index";
        }
    };

    @Override
    public void onCreate() {
        super.onCreate();

-       AdpPushClient.init(
-               getApplicationContext(),
-               MainActivity.class,
-               "APP_ID/SENDER_ID", //based on your environment
-               "API_KEY",          //based on your environment
-               "USERNAME",     //based on your environment
-               "PASSWORD"      //based on your environment
-       );

-       AdpPushClient.get().addNotificationHandler(new NotificationHandler(){
-           @Override
-           public boolean notificationOpened(ChabokNotification message, ChabokNotificationAction notificationAction) {
-               ChabokReactPackage.notificationOpened(message, notificationAction);
-               return super.notificationOpened(message, notificationAction);
-           }
-       });

+       AdpPushClient.configureEnvironment(Environment.SANDBOX); // or PEODUCTION
    }

-   @Override
-   public void onTerminate() {
-       AdpPushClient.get().dismiss();
-   
-       super.onTerminate();
-   }
    
    @Override
    public ReactNativeHost getReactNativeHost() {
        return mReactNativeHost;
    }
}
```

<br><br>

### ۴- بروزرسانی پروژه آی‌او‌اس

در فایل `Podfile` دیگر نیازی به افزودن `ChabokPush` نیست.

```diff
use_frameworks!
platform :ios, '9.0'

target 'YOUR_TARGET_NAME' do
    # Pods for AwesomeProject
-   pod 'ChabokPush', '~> 1.20.2'
end
```

با دستور زیر وابستگی‌های پروژه آی‌او‌اس خود را بروز کنید:

```bash
$ pod update
```

حالا برای اطمینان از نصب، پروژه را در `xcode` باز کنید ، اگر هدر فایل چابک را مشاهده کردید، نصب کتابخانه آی‌او‌اس موفقیت آمیز بوده است.

> `نکته:` اگر فایل‌های `AdpPushClient.h` و `AdpPushClient.m` را به صورت دستی از مسیر `node_modules/react-native-chabok/ios` در پروژه آی‌او‌اس خود کپی کردید دیگر نیازی به این کار نیست و می‌توانید آن‌ها را حذف کنید. با **لینک** کردن ماژول چابک این فایل‌ها بصورت خودکار به پروژه شما اضافه خواهند شد.

متد `configureEnvironment` چابک را در کلاس `AppDelegate` و متد `didFinishLaunchingWithOptions` فراخوانی کنید:

{% tabs %}
{% tab OBJECTIVE-C %}

```objectivec
#import "AppDelegate.h"
#import <AdpPushClient/AdpPushClient.h>

@implementation AppDelegate

-(BOOL) application:(UIApplication *)application
            didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {

    [PushClientManager.defaultManager configureEnvironment:Sandbox]; // or PEODUCTION
    return YES;
}
```

{% endtab %}
{% tab SWIFT %}

```swift
import UIKit
import AdpPushClient

@UIApplicationMain
class AppDelegate: UIResponder, UIApplicationDelegate, PushClientManagerDelegate {
    func application(_ application: UIApplication,
            didFinishLaunchingWithOptions launchOptions: [UIApplicationLaunchOptionsKey: Any]?) -> Bool {

    PushClientManager.default()?.configureEnvironment(.Sandbox) // or PEODUCTION
    return true
}
```

{% endtab %}
{% endtabs %}

دیگر نیازی به فراخوانی متدهای زیر در کلاس `AppDelegate` نیست:

```diff
- -(void)application:(UIApplication *)application
-           didFailToRegisterForRemoteNotificationsWithError:(NSError *)error {
-   [PushClientManager.defaultManager application:application
-           didFailToRegisterForRemoteNotificationsWithError:error];
- }

- -(void)application:(UIApplication *)application
-           didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken {
-   // Manager hook and handle receive Device Token From APNS Server
-   [PushClientManager.defaultManager application:application
-           didRegisterForRemoteNotificationsWithDeviceToken:deviceToken];
- }

- (void)application:(UIApplication *)application
-           didRegisterUserNotificationSettings:(UIUserNotificationSettings *)notificationSettings {
-   // Manager hook and Handle iOS 8 remote Notificaiton Settings
-   [PushClientManager.defaultManager application:application
-           didRegisterUserNotificationSettings:notificationSettings];
- }
```

<br><br>

### ۵- بروزرسانی پروژه جاوااسکریپت

حذف متد `chabok.init` در جاوااسکریپت. دیگر نیازی به فراخوانی این متد نیست.

```diff
componentDidMount() {
-   const options = {
-       appId: "APP_ID/SENDER_ID", 		//based on your environment
-       apiKey: "API_KEY",			//based on your environment
-       username: "SDK_USERNAME",		//based on your environment
-       password: "SDK_PASSWORD", 		//based on your environment
-       devMode: true
-   };

    this.chabok = new chabok.AdpPushClient();

-   this.chabok.init(
-       options.appId,
-       options.apiKey,
-       options.username,
-       options.password,
-       options.devMode
-   ).then((state) => {
-       console.log("Initialize SDK ", state);
-   }).catch((error) => {
-       console.error("Not Initialize error: ", error);
-   });
}
```

<br><br>

### ۶- تغییرات ورود کاربر (Login)

در صورتی که در اپلیکیشن‌تان، پس از احراز هویت، کاربر را با یک نام کاربری (USER_ID) در چابک ثبت می‌کنید، تغییرات زیر را در کدتان اعمال کنید:

```diff
// Javascript

- this.chabok.register("USER_ID");

+ this.chabok.login("USER_ID");
```

> `نکته:` اگر متد `register` را در هر بار اجرای اپلیکیشن در فایل `App.js` متد `componentDidMount` فراخوانی می‌کنید نیازی به این کار نیست و آن دستورات را حذف کنید.

<br><br>

### ۷- تغییرات خروج کاربر (Logout)

چنانچه به هنگام خروج کاربر از حساب کاربری از متدهای `unregister` و یا `registerAsGuest` استفاده می‌کنید، تغییرات زیر را در کد خود اعمال کنید:

```diff
// Javascript

- this.chabok.unregister();
- this.chabok.registerAsGuest();

+ this.chabok.logout();
```

> `نکته:` اگر متد `unregister` و یا `registerAsGuest` را در هر بار اجرای اپلیکیشن در فایل `App.js` متد `componentDidMount` فراخوانی می‌کنید نیازی به این کار نیست و آن دستورات را حذف کنید.

<br><br>

### ۸- تغییرات پوش‌نوتیفیکیشن

**اندروید**

برای دریافت اکشن‌های نوتیفیکیشن نیازی به فراخوانی متد `addNotificationHandler` در کلاس `MainApplication` نیست:

```diff
public class MainApplication extends Application implements ReactApplication {

    @Override
    public void onCreate() {
        super.onCreate();

-       AdpPushClient.get().addNotificationHandler(new NotificationHandler() {
-           @Override
-           public boolean notificationOpened(ChabokNotification message, ChabokNotificationAction notificationAction) {
-               ChabokReactPackage.notificationOpened(message, notificationAction);
-               return super.notificationOpened(message, notificationAction);
-           }
-       });
    }
}
```

**آی‌او‌اس**

برای دریافت اکشن‌های نوتیفیکیشن نیازی به فراخوانی متدهای زیر در کلاس `AppDelegate` نیست:

{% tabs %}
{% tab OBJECTIVE-C %}

```diff
- @interface AppDelegate ()<PushClientManagerDelegate>
- @end

@implementation AppDelegate

-(BOOL)application:(UIApplication *)application
-           didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
-
-   [PushClientManager.defaultManager addDelegate:self];

    return true;
}

- -(void) userNotificationCenter:(UNUserNotificationCenter *)center
-           didReceiveNotificationResponse:(UNNotificationResponse *)response
-           withCompletionHandler:(void (^)(void))completionHandler {
-
-   [AdpPushClient notificationOpened:response.notification.request.content.userInfo
-           actionId:response.actionIdentifier];
- }

- -(void) application:(UIApplication *)application
-           didReceiveRemoteNotification:(NSDictionary *)userInfo
-           fetchCompletionHandler:(void (^)(UIBackgroundFetchResult))completionHandler {
-
-   [AdpPushClient notificationOpened:userInfo];
- }

- -(void) application:(UIApplication *)application
-           didReceiveRemoteNotification:(NSDictionary *)userInfo {
-
-   [AdpPushClient notificationOpened:userInfo];
- }

- -(void)application:(UIApplication *)application
-           handleActionWithIdentifier:(NSString *)identifier
-           forRemoteNotification:(NSDictionary *)userInfo
-           completionHandler:(void (^)())completionHandler {
-
-   [AdpPushClient notificationOpened:userInfo actionId:identifier];
- }
```

{% endtab %}
{% tab SWIFT %}

```diff
@UIApplicationMain

- class AppDelegate: UIResponder, UIApplicationDelegate, PushClientManagerDelegate {

+ class AppDelegate: UIResponder, UIApplicationDelegate {

    func application(_ application: UIApplication,
                     didFinishLaunchingWithOptions launchOptions: [UIApplicationLaunchOptionsKey: Any]?) -> Bool {
-
-       PushClientManager.default()?.addDelegate(self)        

        return true
    }

-   func userNotificationCenter(_ center: UNUserNotificationCenter,
-                               didReceive response: UNNotificationResponse,
-                               withCompletionHandler completionHandler: @escaping () -> Void) {
-
-       PushClientManager.default()?.notificationOpened(userInfo: response.notification.request.content.userInfo,
-                                                       actionId:identifier)
-   }
    
-   func application(_ application: UIApplication,
-                    didReceiveRemoteNotification userInfo: [AnyHashable : Any],
-                    fetchCompletionHandler completionHandler: @escaping (UIBackgroundFetchResult) -> Void) {
-       
-       PushClientManager.default()?.notificationOpened(userInfo: userInfo)
-   }

-   func application(_ application: UIApplication,
-                    didReceiveRemoteNotification userInfo: [AnyHashable : Any]) {
-       
-       PushClientManager.default()?.notificationOpened(userInfo: userInfo)
-   }

-   func application(_ application: UIApplication,
-                    handleActionWithIdentifier identifier: String?,
-                    forRemoteNotification userInfo: [AnyHashable : Any],
-                    withResponseInfo responseInfo: [AnyHashable : Any],
-                    completionHandler: @escaping () -> Void) {
-
-       PushClientManager.default()?.notificationOpened(userInfo: responseInfo,
-                                                       actionId:identifier)
-   }
}
```

{% endtab %}
{% endtabs %}

**جاوااسکریپت**

برای دریافت اکشن‌ها نیازی به فراخوانی متد `notificationOpenedHandler` در انتهای لیسنر `notificationOpened` نیست:

```diff
chabokEmitter.addListener(
            'notificationOpened',
            (msg) => {
                console.log(msg);
                // do something with your message
            }
        );
-       this.chabok.notificationOpenedHandler();
    }
```

<br><br>

<p style="text-align: center;">
    <img src="http://uupload.ir/files/l3ij_done.jpg" style="height:50px;" />
    پس از اعمال تغییرات گفته شده در بالا، <b>ارتقای شما با موفقیت انجام خواهد شد.</b>
</p>