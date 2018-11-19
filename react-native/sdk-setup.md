---
id: sdk-setup
title: راه‌اندازی
layout: react-native
permalink: react-native/sdk-setup.html
prev: required.html
next: chabok-messaging.html
---

پس از طی کردن مراحل صفحه [پیش‌نیازها](/react-native/required.html)، می‌توانید **راه‌اندازی SDK چابک** را شروع کنید. در ابتدا شما باید کتابخانه چابک را [نصب کنید](/react-native/sdk-setup.html#۱--نصب-کتابخانه) و سپس برای دریافت پوش‌نوتیفیکیشن در اندروید و آی‌اواس [تنظیمات](/react-native/sdk-setup.html#۲--دریافت-پوشنوتیفیکیشن) آن را مطالعه کرده و همانند مستندات بیان شده پیش بروید. در انتها، [مقداردهی و راه‌اندازی](/react-native/sdk-setup.html#۳--مقداردهی-اولیه) کتابخانه چابک را در اپلیکیشنتان انجام دهید و برای شناخت کاربر توسط چابک، مرحله [ثبت کاربر](/react-native/sdk-setup.html#۴--ثبت-کاربر) را حتما پشت سر بگذارید.

برای انجام موفق این کارها باید تمام مراحل زیر را به ترتیب انجام دهید:

[ ۱- نصب کتابخانه](/react-native/sdk-setup.html#۱--نصب-کتابخانه)

[۲- دریافت پوش‌نوتیفیکشن](/react-native/sdk-setup.html#۲--دریافت-پوشنوتیفیکیشن) 

[۳- مقداردهی اولیه (Initialize)](/react-native/sdk-setup.html#۳--مقداردهی-اولیه)

[ ۴- ثبت کاربر (Register)](/react-native/sdk-setup.html#۴--ثبت-کاربر)

<Br>

### ۱- نصب کتابخانه

برای **نصب** از طریق `npm`:

```bash
npm install chabokpush-rn --save
```
 یا `yarn`:

```bash
yarn add chabokpush-rn
```

بعد از نصب دستور زیر را اجرا کنید:

```bash
react-native link chabokpush-rn
```

برای **دریافت اطلاعات دستگاه** از طریق `npm`: 

```bash
npm install react-native-device-info --save
```
 یا `yarn`:

```bash
yarn add react-native-device-info
```

بعد از نصب دستور زیر را اجرا کنید:

```bash
react-native link react-native-device-info
```

برای **تنظیم پوش‌نوتیفیکیشن** از طریق `npm` (اختیاری): 

```bash
npm install react-native-push-notification --save
```
یا `yarn`:

```bash
yarn add react-native-push-notification
```

بعد از نصب دستور زیر را اجرا کنید:

```bash
react-native link react-native-push-notification
```

> `نکته ` : دقت داشته باشید که چابک به طور پیش‌فرض **توکن پوش** نمی‌گیرد، بنابراین برای **تنظیم پوش‌نوتیفیکیشن** می‌توانید با استفاده از مستندات آن در صفحه پوش‌نوتیفیکیشن برای [اندروید](https://doc.chabokpush.com/react-native/push-notification.html#%D8%A7%D9%86%D8%AF%D8%B1%D9%88%DB%8C%D8%AF) و [آی‌اواس](https://doc.chabokpush.com/react-native/push-notification.html#%D8%A2%DB%8C%D8%A7%D9%88%D8%A7%D8%B3) آن را روی پروژه خود پیاده‌سازی کنید.

> `نکته ` : در اندروید می‌بایست `AndroidManifest.xml` را به صورت دستی تغییر دهید. برای این کار
دسترسی زیر را به `AndroidManifest.xml` اضافه کنید:

```markup
.....

<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />

<application ....>
```

<Br>

### ۲- دریافت پوش‌نوتیفیکیشن

برای دریافت پوش‌نوتیفیکیشن در اندروید و آی‌اواس مراحل زیر را طی کنید.

#### تعریف رسیور GCM برای اندروید

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
#### ایجاد دسترسی پوش‌نوتیفیکیشن برای آی‌او‌اس

لطفا `Push Notifications` را در `Setting > Capabilities` فعال کنید .

و علامت `Remote Notifications` ها را در `Setting > Capabilities > Background Modes` چک کنید.

#### متد افزودن توکن برای ارسال پوش‌نوتیفیکیشن

برای ارسال پوش‌نوتیفیکشن می‌توانید با متد زیر توکن‌ها را به چابک اضافه کنید:

```javascript
this.chabok.setPushNotificationToken("TOKEN")
```

برای **نمایش اعلان** باید دسترسی‌های زیر را برای دستگاهتان در **اندروید** و **آی‌اواس** ایجاد کنید:

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

<Br>

### ۳- مقدار‌دهی اولیه

برای ارتباط با سرور چابک، لازم است یک نمونه از کلاس `chabokpush` بسازید و آن را مقدار‌دهی کنید.
برای مقدار‌دهی اولیه می‌بایست از طریق متد `chabok` اطلاعات حساب چابک و تنظیمات اولیه را وارد نمایید. ایجاد حساب در بخش [پیش‌نیازها](required.html) توضیح داده شده است. در صورت داشتن حساب چابک هم می‌توانید این مقادیر را از پنل بخش تنظیمات قسمت [**دسترسی‌ و توکن‌ها**](https://doc.chabokpush.com/panel/settings.html#%D8%AF%D8%B3%D8%AA%D8%B1%D8%B3%DB%8C%D9%87%D8%A7-%D9%88-%D8%AA%D9%88%DA%A9%D9%86%D9%87%D8%A7) بردارید.

> `نکته` :‌ تمامی متدهایی که در این بخش بیان می‌شود باید تنها یک بار فراخوانی شود.  

برای دریافت یا ارسال پیام از/به سرور چابک، لازم است یک نمونه از کلاس `chabokpush` بسازید و آن را مقداردهی نمایید. فراخوانی این متد فقط یکبار کافی است. به قطعه کد زیر دقت کنید:

```javascript
const auth = {
  appId: 'APP_ID',
  apiKey: 'API_KEY',
  username: 'USERNAME',
  password: 'PASSWORD',
  devMode:true
}
const options = {
      silent: false,
      realtime: true
    };
this.chabok = new chabokpush(auth, options);
```

> `نکته ` : به طور کلی چابک شامل ۲ محیط سندباکس و عملیاتی می‌باشد. حساب‌های رایگان چابک (تا ۳۰ هزار کاربر) بر روی محیط سندباکس و حساب‌های پریمیوم روی عملیاتی قرار می‌گیرند. مقدار `true` برای ‌`devMode` باعث اتصال به محیط سندباکس و مقدار `false` باعث اتصال به محیط عملیاتی ما می‌شود.

##### تنظیمات اولیه

| توضیحات | پیش‌فرض | نوع | پارامتر |
| --- | --- | --- | --- |
|  |  | `Object` | **[options]** |
| فعال/غیرفعال سازی ارتباط آنی | <code>true</code> | <code>Boolean</code> | **[options.realtime]** |
| دریافت مخفی پیام | <code>true</code> | <code>Boolean</code> | **[options.silent]** |


> `نکته ` : برای تغییر به محیط عملیاتی (`devMode:false`) باید از [**پنل بخش تنظیمات**](https://doc.chabokpush.com/panel/settings.html#%D8%AF%D8%B1%D8%AE%D9%88%D8%A7%D8%B3%D8%AA-%D8%AD%D8%B3%D8%A7%D8%A8-%D8%B9%D9%85%D9%84%DB%8C%D8%A7%D8%AA%DB%8C) درخواست خود را ثبت نمایید تا پس از تایید، اطلاعات جدید حسابتان (`appId`, `apiKey`, `username` و `password`) تعیین گردد. 

<Br>

### ۴- ثبت کاربر

با استفاده از متد `register` می‌توانید یک نام کاربری به هر کاربر اختصاص دهید. این متد شناسه کاربر را گرفته و کاربر را با آن شناسه روی سرور چابک ثبت‌نام می‌کند.

> `نکته` : متد `register` باید فقط **یک بار** در طول اجرا اپلیکیشن فراخوانی شود.


```javascript
chabok.register('USER_ID')
```
> `نکته امنیتی` : مقدار `USER_ID` را هرگز به صورت خام در `LocalStorage` ذخیره نکنید، چون این مقدار شناسه معنادار می‌باشد و می‌توان با آن کاربر را روی چابک ثبت‌نام کرد. برای این منظور می‌توانید از متد زیر استفاده کنید که شناسه کاربر را به صورت رمزنگاری شده نگه‌می‌دارد:


```javascript
chabok.getUserId()
```

> `نکته` : متغیر `USER_ID` شناسه کاربر برای ثبت نام در چابک می‌باشد و ارسال پیام‌ به کاربران توسط همین شناسه‌ها و بدون استفاده از توکن یا شناسه گوشی، به سادگی امکان پذیر خواهد بود شناسه کاربری می تواند هر فیلد با ارزش و معنا‌دار برای کسب و کار شما باشد که کاربر خود را با آن شناسایی می‌کنید. `شماره موبایل، کدملی، شماره حساب و یا ایمیل` مثال‌هایی از شناسه‌های کاربری مناسب در موارد واقعی هستند.
>

> `نکته`: کاراکترهای ‍`#,+,*,\,/` و فاصله در `USER_ID` مجاز نیستند، همچنین طول این رشته نباید کمتر از ۳ و بیشتر از ۳۲ کاراکتر باشد.

> `نکته ` : در صورتی که مقداردهی اولیه و ثبت کاربر به درستی اعمال شده باشد، می‌توانید اطلاعات دستگاه متصل خود را در [بخش مشترکین پنل چابک](https://sandbox.push.adpdigital.com/front/users/subscribers/list) مشاهده کنید. 

### متد تایید ثبت کاربر

متد `isRegistered` یا همان تایید ثبت کاربر به شما این امکان را می‌دهد که بررسی کنید آیا عملیات ثبت‌نام انجام شده است یا خیر.

```javascript
chabok.isRegistered()
```

### متد حذف کاربر

برای حذف دستگاه کاربر از سرور چابک می‌توانید از متد زیر استفاده کنید:
```javascript
chabok.unregister()
```

پس از اتمام این مراحل شما می‌توانید با فراخوانی [این رویدادها](https://doc.chabokpush.com/react-native/features.html#اتصال-با-سرور) از اتصال دستگاه به چابک اطمینان یابید.

> نحوه صحیح پیاده سازی متد و رویدادها در قالب پروژه [دمو](https://github.com/chabokpush/chabok-rn-chat) پیاده سازی شده است.
