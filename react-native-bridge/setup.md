---
id: setup
title: راه‌اندازی چابک
layout: react-native-bridge
permalink: react-native-bridge/setup.html
prev: installation.html
next: chabok-messaging.html
---

## مراحل راه‌اندازی چابک

برای راه‌اندازی چابک باید سه مرحله زیر را به ترتیب انجام دهید:

۱. مقداردهی اولیه

۲. تنظیم پوش‌نوتیفیکشن 

۳. ثبت کاربر

> `نکته` :‌ تمامی متدهایی که در این بخش بیان می‌شود باید تنها یک بار فراخوانی شود.  

### ۱- مقدار‌دهی اولیه 

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


> `نکته ` : برای استفاده از چابک در محیط عملیاتی مقدار `devMode` را `false` کنید. 

### ۲- تعریف رسیور GCM برای دریافت پوش‌نوتیفیکیشن در اندروید

رسیور GcmReceiver را به ترتیب زیر تعریف کنید تا بتوانید نوتیفیکیشن‌هایی که از طریق سرور‌های گوگل ارسال می‌شوند را نیز دریافت کنید.

```markup
<receiver
     android:name="com.google.android.gms.gcm.GcmReceiver"
     android:enabled="true"
     android:exported="true"
     android:permission="com.google.android.c2dm.permission.SEND">
     <intent-filter>
        <action android:name="com.google.android.c2dm.intent.RECEIVE" />
        <action android:name="com.google.android.c2dm.intent.REGISTRATION" />
        <category android:name=" YOUR_APPLICATION_PACKAGE_ID" />
     </intent-filter>
</receiver>           
```
### ایجاد دسترسی دریافت پوش در آی‌او‌اس

لطفا `Push Notifications` را در `Setting > Capabilities` فعال کنید .

و علامت `Remote Notifications` ها را در `Setting > Capabilities > Background Modes` چک کنید.

#### متد افزودن توکن برای ارسال پوش

برای ارسال پوش‌نوتیفیکشن می‌توانید با متد زیر توکن‌ها را به چابک اضافه کنید:

```javascript
this.chabok.setPushNotificationToken("TOKEN")
```

برای نمایش اعلان باید دسترسی‌های زیر را برای دستگاهتان در اندروید و آی‌اواس ایجاد کنید:

```javascript
var PushNotification = require('react-native-push-notification');

PushNotification.configure({
            onRegister:  ({token}) => {
                if(token){
                    this.chabok.setPushNotificationToken(token)
                }
            },
            // (required) Called when a remote or local notification is opened or received
            onNotification: function(notification) {
                console.warn( 'NOTIFICATION:', notification );
                // required on iOS only (see fetchCompletionHandler docs: https://facebook.github.io/react-native/docs/pushnotificationios.html)
                notification.finish(PushNotificationIOS.FetchResult.NoData);
            },
            senderID: "GCM_SenderID", // ANDROID ONLY: (optional) GCM Sender ID.
            permissions: {
                alert: true,
                badge: true,
                sound: true
            },
            popInitialNotification: true,
            requestPermissions: true,
        });
```


### ۳- ثبت کاربر
با استفاده از متد `register` می‌توانید یک نام کاربری به هر کاربر اختصاص دهید. این متد `شناسه کاربر` را گرفته و کاربر را با آن شناسه روی سرور چابک ثبت‌نام می‌کند.

> `نکته` : متد `register` باید فقط **یک بار** در طول اجرا اپلیکیشن فراخوانی شود.


```javascript
this.chabok.register('USER_ID');
```
>   `نکته امنیتی` : مقدار `USER_ID` را هرگز به صورت خام در `LocalStorage` ذخیره نکنید، چون این مقدار شناسه معنادار می‌باشد و می‌توان با آن کاربر را روی چابک ثبت‌نام کرد. برای این منظور می‌توانید از متد زیر استفاده کنید که شناسه کاربر را به صورت رمزنگاری شده نگه‌می‌دارد:


```javascript
chabok.getUserId()
```

> `نکته` : متغیر `USER_ID` شناسه کاربر برای ثبت نام در چابک می‌باشد و ارسال پیام‌ به کاربران توسط همین شناسه‌ها و بدون استفاده از توکن یا شناسه گوشی، به سادگی امکان پذیر خواهد بود شناسه کاربری می تواند هر فیلد با ارزش و معنا‌دار برای کسب و کار شما باشد که کاربر خود را با آن شناسایی می‌کنید. `شماره موبایل، کدملی، شماره حساب و یا ایمیل` مثال‌هایی از شناسه‌های کاربری مناسب در موارد واقعی هستند.
>

> `نکته`: کاراکترهای ‍`#,+,*,\,/` و فاصله در `USER_ID` مجاز نیستند، همچنین طول این رشته نباید کمتر از ۳ و بیشتر از ۳۲ کاراکتر باشد.

> `نکته ` : در صورتی که مقداردهی اولیه و ثبت کاربر به درستی اعمال شده باشد، می‌توانید اطلاعات دستگاه متصل خود را در [بخش مشترکین پنل چابک](https://sandbox.push.adpdigital.com/front/users/subscribers/list) مشاهده کنید. 

```javascript
chabok.isRegistered()
```

### متد حذف کاربر
برای حذف دستگاه کاربر از سرور چابک می‌توانید از متد زیر استفاده کنید:
```javascript
chabok.unregister()
```

پس از اتمام این مراحل شما می‌توانید با فراخوانی [این رویدادها](https://doc.chabokpush.com/react-native-bridge/features.html#اتصال-با-سرور) از اتصال دستگاه به چابک اطمینان یابید.



