---
id: push-notification
title: تنظیم پوش‌نوتیفیکیشن 
layout: react-native-bridge
permalink: react-native-bridge/push-notification.html
prev: chabok-messaging.html
next: deeplink.html
---

چابک علاوه بر پیام چابک، **پوش‌نوتیفیکیشن** هم ارسال می‌کند. برای بکارگیری آن لطفا تنظیمات زیر برای [اندروید](/react-native/push-notification.html#تنظیم-پوشنوتیفیکیشن-اندروید) و [آی‌اواس](/react-native/push-notification.html#تنظیم-پوشنوتیفیکیشن-آیاواس) انجام دهید، سپس توکن‌ها را به چابک [اضافه نمایید](/react-native/push-notification.html#متد-افزودن-توکن-برای-ارسال-پوشنوتیفیکیشن). همچنین می‌توانید از نمایش نوتیفیکیشن به صورت **local** [استفاده کنید](/react-native/push-notification.html#نمایش-local-notifications). 

<Br>

### تنظیم پوش‌نوتیفیکیشن اندروید

برای دریافت پوش‌نوتیفیکیشن باید `GcmReceiver` را در بخش `application` به فایل `AndroidManifest.xml` اضافه نمایید تا بتوانید پوش‌نوتیفیکیشن‌هایی که از طریق سرور‌های گوگل ارسال می شوند را نیز دریافت کنید.

```markup
<application
    android:name=".MY_APPLICATION_CLASS_NAME"
    ... >
	
	...
    <receiver
        android:name="com.google.android.gms.gcm.GcmReceiver"
        android:enabled="true"
        android:exported="true"
        android:permission="com.google.android.c2dm.permission.SEND">
        <intent-filter>
            <action android:name="com.google.android.c2dm.intent.RECEIVE" />
            <action android:name="com.google.android.c2dm.intent.REGISTRATION" />
            <category android:name="MY_APPLICATION_PACKAGE_ID" />
        </intent-filter>
    </receiver>
	
</application>
```

- در ادامه برای **شخصی‌سازی نمایش، دریافت دیتا، کلیک روی نوتیفیکیشن و تنظیم پوش‌نوتیفیکیشن چند رسانه‌ای** به [این صفحه](/android/push-notification.html) مراجعه نمایید.

<Br>

### تنظیم پوش‌نوتیفیکیشن آی‌او‌اس

ابتدا مطمئن شوید که `MobileCoreServices.framework` ،`SystemConfiguration.framework` و `CoreData` را از **Linked Frameworks and Libraries** وارد کرده‌اید.

گزینه `Push Notifications` را در `Setting > Capabilities` فعال کنید،

و علامت `Remote Notifications`ها را در `Setting > Capabilities > Background Modes` بررسی کنید.

- در ادامه برای **شخصی‌سازی نمایش، دریافت دیتا، کلیک روی نوتیفیکیشن و تنظیم پوش‌نوتیفیکیشن چند رسانه‌ای** به [این صفحه](/ios/push-notification.html) مراجعه نمایید.

<br>

### دریافت اکشن‌های نوتیفیکیشن

برای دریافت اکشن‌های کلیک روی نوتیفیکیشن باید ابتدا در **اندروید** و **آی‌اواس** کدهای زیر را قرار دهید. این کدها، اکشن‌ها را تا لود شدن لایه ریکت نینیو نگه می‌دارند:


#### اندروید

کد زیر را در کلاس `MainApplication` متد `onCreate` قرار دهید:

```java
//Java

    @Override
    public void onCreate() {
        super.onCreate();
        SoLoader.init(this, /* native exopackage */ false);
        
        if (chabok == null) {
            chabok = AdpPushClient.init(
                    getApplicationContext(),
                    MainActivity.class,
                    "APP_ID/SENDER_ID",
                    "API_KEY",
                    "USERNAME",
                    "PASSWORD"
            );

+               //true connects to Sandbox environment  
+               //false connects to Production environment  
+             AdpPushClient.get().setDevelopment(DEV_MODE);

+            chabok.addNotificationHandler(new NotificationHandler(){
+                @Override
+                public boolean notificationOpened(ChabokNotification message, ChabokNotificationAction notificationAction) {
+                    ChabokReactPackage.notificationOpened(message, notificationAction);
+                   return super.notificationOpened(message, notificationAction);
+                }
+            });
        }
    }
```

>‍‍`نکته:` دقت داشته باشید که در صورت تغییر محیط چابک (سندباکس و عملیاتی)، حتما مقدار ‍‍`setDevelopment` و کلیدهای مربوط به همان محیط را قرار دهید.

#### آی‌اواس

متد `registerToUNUserNotificationCenter` را مانند زیر قرار دهید:

```objectivec
//Objective-C

+ @interface AppDelegate ()<PushClientManagerDelegate>

+ @end

@implementation AppDelegate

 - (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
  {
    
+    [PushClientManager.defaultManager addDelegate:self];
+    [AdpPushClient registerToUNUserNotificationCenter];
  
    ...
    
    return true;
  }

+ -(void) userNotificationCenter:(UNUserNotificationCenter *)center didReceiveNotificationResponse:(UNNotificationResponse *)response withCompletionHandler:(void (^)(void))completionHandler{
+     [AdpPushClient notificationOpened:response.notification.request.content.userInfo actionId:response.actionIdentifier];
+ }
  
+ -(void) application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)userInfo fetchCompletionHandler:(void (^)(UIBackgroundFetchResult))completionHandler{
+     [AdpPushClient notificationOpened:userInfo];
+ }
  
+ -(void) application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)userInfo{
+    [AdpPushClient notificationOpened:userInfo];
+ }
  
+ -(void)application:(UIApplication *)application handleActionWithIdentifier:(NSString *)identifier forRemoteNotification:(NSDictionary *)userInfo completionHandler:(void (^)())completionHandler{
+     [AdpPushClient notificationOpened:userInfo actionId:identifier];
+ }
```

<br>

#### دریافت رویداد

سپس برای دریافت اکشن‌ها یک `listener` به رویداد ‍‍`notificationOpened` مانند زیر اضافه کنید:

```javascript
chabokEmitter.addListener(
            'notificationOpened',
            (msg) => {
                console.log(msg);

                if (msg.actionType === 'opened'){
                    console.log("Notification opened by user");
                } else if (msg.actionType === 'dismissed'){
                    console.log("Notification dismissed by user");
                } else if (msg.actionType === 'action_taken'){
                    console.log("User tapped on notification " , msg.actionId , " action");
                }

                if (msg.actionUrl) {
                    console.log("Got deep link (", msg.actionUrl, ")");
                }
            }
        );
        // when app is closed, keeps notification actions until react native loads
        this.chabok.notificationOpenedHandler();
    }
```

در آخر متد `notificationOpenedHandler`را قرار دهید. این متد زمانی که اپلیکیشن بسته است، اکشن‌های نوتیفیکیشن را نگه می‌دارد و به محض لود شدن لایه‌ی ریکت نیتیو، `notificationOpened` را صدا می‌زند.
