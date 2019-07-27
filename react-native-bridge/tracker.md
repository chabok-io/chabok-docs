---
id: tracker
title: ترکر نصب
layout: react-native-bridge
permalink: react-native-bridge/tracker.html
prev: sdk-setup.html
next: chabok-messaging.html
---

ترکر چابک کلیک و نصب  کمپین‌ها را شمارش می‌کند. همینطور با توجه به قابلیت [رصد رویدادها](/react-native-bridge/tracker.html#۲۱-رصد-رویدادها-tracking-events) می‌توانید مدل‌های بازاریابی CPI و CPA را برای تبلیغات خود اجرا کنید. مزیت دیگر ترکر چابک [حذف و جلوگیری تقلب](/react-native-bridge/tracker.html#۴-مکانیزم-ضد-تقلب-fraud-prevention) در کمپین‌های تبلیغاتی است.

 نگران راه‌اندازی هم نباشید این صفحه به طور کامل مراحل **پیاده‌سازی و استفاده از ترکر** را قدم به قدم مرور می‌کند.  

<br>

>‍‍`نکته:` در صورتی که از قبل **SDK** چابک را نصب کرده‌‌اید، از [**رصد رویدادها**](/react-native-bridge/tracker.html#۲۱-رصد-رویدادها-tracking-events) شروع کنید.
 
### ۱. پیاده‌سازی (SDK Integration)
---

برای ایجاد حساب کاربری کافیست در وبسایت چابک وارد صفحه [شروع کنید](https://chabokpush.com/register.html) شوید و حساب شخصی خود را بسازید. پس از ایجاد حساب و ثبت اپلیکیشن خود، با مراجعه به بخش [تنظیمات پنل](https://sandbox.push.adpdigital.com/front/setting/access) پارامترهای اتصال به چابک که در مرحله [مقداردهی](/react-native-bridge/tracker.html#ج--مقداردهی-initialize) مورد نیاز است، در دسترس خواهد بود.


#### ۱.۱. مراحل پیاده‌سازی 

برای راه‌اندازی SDK چابک ۳ مرحله زیر را به ترتیب انجام ‌دهید:

[ الف- نصب کتابخانه](/react-native-bridge/tracker.html#الف--نصب-کتابخانه)

[ب- مقداردهی اولیه (Initialize)](/react-native-bridge/tracker.html#ب--مقداردهی-اولیه-initialize)

[ج- ثبت کاربر (Register)](/react-native-bridge/tracker.html#ج--ثبت-کاربر-register-users)

<Br>

#### الف- نصب کتابخانه

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
    implementation "com.google.android.gms:play-services-gcm:10.2.6"
    implementation 'me.leolin:ShortcutBadger:1.1.22@aar'
    implementation 'com.adpdigital.push:chabok-lib:2.16.0'
    implementation 'com.android.installreferrer:installreferrer:1.0'
    ...
}
```

آخرین نسخه فایل کتابخانه چابک از  [اینجا](https://bintray.com/bintray/jcenter?filterByPkgName=com.adpdigital.push) قابل دسترس می‌باشد.
در انتها گزینه سینک را بزنید.

<blockquote markdown="1">
 `نکته:` در اندروید ۹ به بالا در صورت مقداردهی `targetSdkVersion` در فایل `build.gradle` به مقدار `28`،  کد زیر را به فایل `AndroidManifest.xml` در تگ `application` اضافه کنید:

```xml 
<uses-library android:name="org.apache.http.legacy" android:required="false" /> 
```
</blockquote>

#### نصب کتابخانه آی‌اواس

چابک از طریق CocoaPods در دسترس است. بنابراین برای نصب، در فایل `ios` پروژه خود یک `Podfile` اضافه کنید:

```bash
$ cd ios
$ pod init
```
سپس chabokPush` dependency` را به `Podfile` خود مانند زیر اضافه کنید:

```bash
use_frameworks!
platform :ios, '9.0'

target 'YOUR_TARGET_NAME' do

  # Pods for AwesomeProject
  pod 'ChabokPush'

end
```

پس از آن با روش زیر `Podfile` را نصب کنید:

```bash
$ pod install
```
پس از اجرای دستورات بالا اگر با خطایی روبه رو شدید ، دستور زیر را وارد کنید سپس `pod install` را دوباره اجرا کنید.

```bash
$ pod update
```
حالا برای اطمینان از نصب، پروژه را در `xcode` باز کنید ، اگر header فایل چابک را مشاهده کردید، نصب کتابخانه آی‌او‌اس موفقیت آمیز بوده است.


پس از آن پروژه آی‌اواس خود را در `xcworkspace.` با `xcode` و همینطور `node_modules/react-native-chabok/` را باز کنید. فایل‌های `ios/AdpPushClient.h` و `ios/AdpPushClient.m` را به پروژه خود اضافه کنید.

اکنون داخل کلاس `AppDelegate`، ایمپورت را مانند زیر انجام دهید:


```objectivec
#import <AdpPushClient/AdpPushClient.h>

....

- (void)application:(UIApplication *)application didFailToRegisterForRemoteNotificationsWithError:(NSError *)error{
  // Hook and handle failure of get Device token from Apple APNS Server
  [PushClientManager.defaultManager application:application didFailToRegisterForRemoteNotificationsWithError:error];
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

<Br>

### ب- مقدار‌دهی اولیه (Initialize)

پس از نصب کتابخانه‌ باید آن‌ها را با پارامترهای مخصوص حساب خود مقداردهی کنید. دقت داشته باشید که کتابخانه اندروید را باید به طور جداگانه مقداردهی نمایید.

#### اندروید

در ابتدا در فایل `MainApplication.java` کد زیر اضافه نمایید:

> `نکته` :‌ تمامی متدهایی که در این بخش بیان می‌شود باید تنها یک بار فراخوانی شود.  

```java
public class MyAppClass extends Application {

    @Override
    public void onCreate() {
        super.onCreate();

        //AdpPushClient.init() should always be called in onCreate of Application class
        AdpPushClient.init(
                getApplicationContext(),
                MainActivity.class,
                "APP_ID/SENDER_ID", //based on your environment
                "API_KEY",          //based on your environment
                "SDK_USERNAME",     //based on your environment
                "SDK_PASSWORD"      //based on your environment
        );
    }
    
    @Override
    public void onTerminate() {
        AdpPushClient.get().dismiss();

        super.onTerminate();
    }
}
```

برای ارتباط با سرور چابک، لازم است یک نمونه از کلاس `chabok.AdpPushClient` بسازید و آن را مقدار‌دهی کنید.
 فراخوانی این متد فقط یکبار کافی است.

 برای مقدار‌دهی اولیه می‌بایست از طریق متد `init` اطلاعات حساب چابک و تنظیمات اولیه را وارد نمایید. در `const options` به جای پارامتر‌های `APP_ID`, `API_KEY(SDK_KEY)`, `SDK_USERNAME`, `SDK_PASSWORD` مقادیر مربوط به حساب چابک خود را وارد نمایید. نحوه ایجاد حساب در بخش [پیش‌نیازها](/react-native/required.html) توضیح داده شده است. در صورت داشتن حساب چابک هم می‌توانید این مقادیر را از [**پنل بخش تنظیمات قسمت دسترسی‌ و توکن‌ها**](/panel/settings.html#دسترسیها-و-توکنها) بردارید.

 به قطعه کد زیر دقت کنید:

```javascript
import { NativeEventEmitter, NativeModules } from 'react-native';
import chabok from 'react-native-chabok';

componentDidMount(){
	const options = {
		appId: "APP_ID/GOOGLE_SENDER_ID", //based on your environment
		apiKey: "API_KEY",				  //based on your environment
		username: "SDK_USERNAME",		  //based on your environment
		password: "SDK_PASSWORD", 		  //based on your environment

		//true connects to Sandbox environment
		//false connects to Production environment
		devMode: true
	};

	this.chabok = new chabok.AdpPushClient();

	this.chabok.init(
		    options.appId,
		    options.apiKey,
		    options.username,
		    options.password,
		    options.devMode
	).then((state) => {
		    console.log("Initialize SDK ", state);
	}).catch((error) => {
		    console.error("Not Initialize error: ", error);
	});
	
	...
}
```

در  `options`  به جای پارامتر‌های  `APP_ID`,  `API_KEY(SDK_KEY)`,  `SDK_USERNAME`,  `SDK_PASSWORD`مقادیر مربوط به حساب چابک خود را وارد نمایید. نحوه ایجاد حساب در بخش  [پیش‌نیازها](/react-native-bridge/required.html)  توضیح داده شده است. در صورت داشتن حساب چابک هم می‌توانید این مقادیر را از  [**پنل بخش تنظیمات قسمت دسترسی‌ و توکن‌ها**](/panel/settings.html#%D8%AF%D8%B3%D8%AA%D8%B1%D8%B3%DB%8C%D9%87%D8%A7-%D9%88-%D8%AA%D9%88%DA%A9%D9%86%D9%87%D8%A7)  بردارید.

مقدار  `devMode`  تعیین می‌کند که اپلیکیشن شما به محیط  [آزمایشی (Sandbox)](https://sandbox.push.adpdigital.com/)  و یا  [عملیاتی (Production)](https://panel.push.adpdigital.com/) چابک متصل شود. این موضوع بستگی به این دارد که حساب کاربری شما روی کدام محیط تعریف شده باشد. مقدار  `true`  به محیط آزمایشی و مقدار`false`  به محیط عملیاتی متصل می‌شود. در نظر داشته باشید، هر محیط به کلیدهای دسترسی (`appId`,  `apiKey`,  `username`  و  `password`) خودش در متد  `init`  نیاز دارد. بنابراین در صورت تغییر مقدار  `devMode`  کلید‌های دسترسی آن هم باید تغییر داده شود.

> `نکته`: برای درخواست حساب محیط **عملیاتی**، در بخش تنظیمات پنل، وارد بخش [**درخواست حساب عملیاتی**](https://sandbox.push.adpdigital.com/front/setting/accountRequest) شوید و درخواست خود را ثبت نمایید تا پس از تایید و ساخت حساب عملیاتی شما، اطلاعات جدید حسابتان (`appId`, `apiKey`, `username` و `password`) تعیین گردد. 

### ج- ثبت کاربر (Register Users)

یکی از مزیت‌های چابک امکان **معرفی** هر کاربر با یک شناسه منحصر به فرد است. این قابلیت به شما امکان می‌دهد دستگاه‌های کاربر را **مدیریت کنید** و سوابق جمع‌آوری شده را همانند یک سیستم مدیریت مشتریان (CRM) [در اختیار داشته باشید](/panel/users.html#جزئیات-کاربر).


```javascript
componentDidMount() {

    ...
    
    this.chabok.getUserId()
     .then(userId => {
        if (userId) {
            this.chabok.register(userId);
        }
     })
    .catch((e)=> {
        //If user is not registered verify the user and
        //call  this.chabok.register("USER_ID") method at login page
        
        //If you have guest users
        // should be called here (If you want to track installs on user's first app launch (just like Adjust))
	
	this.chabok.registerAsGuest();
    });
}
```

متد `registerAsGuest` کاربر را به عنوان **کاربر مهمان** ثبت می‌کند. این متد به طور خودکار  یک تگ مهمان (CHABOK_GUEST) به کاربر اختصاص می‌دهد.

>` نکته:` دقت کنید که متد `registerAsGuest` را به درستی استفاده کرده‌ باشید. برای این کار پس از نصب کاربر به **پنل > کاربران** بروید و از اضافه شدن کارت آن کاربر مانند زیر مطمئن شوید:

![عکس مربوط](http://uupload.ir/files/lawy_regis-as-guest2.png)

 متد `register` علاوه بر ثبت کاربر، عمل **اتصال به سرور چابک** را انجام می‌دهد، بنابراین باید **فقط یک بار** در طول اجرای اپلیکیشن (در کلاس application) فراخوانی شود: (برای اطلاعات بیشتر می‌توانید بخش [ثبت کاربر](/react-native/sdk-setup.html#۴--ثبت-کاربر-register) را مطالعه کنید.) 

>` نکته:` دقت کنید که متد `registerAsGuest` را تنها استفاده نکنید و مانند بالا عمل کنید. در صورت فراخوانی این متد به تنهایی کاربر با هر بازدید به عنوان یک مهمان جدید محاسبه خواهد شد.

ترکرها به طور معمول نصب را **اولین بازدید** حساب می‌کنند (مانند سرویس ادجاست)، اما مزیت ترکر چابک در شمارش نصب این است که شما می‌توانید علاوه بر مدل ادجاست نصب را **پس از ورود کاربر و احراز هویت او** در اپلیکیشنتان تعریف کنید. با این کار شما یک اقدام دیگری برای جلوگیری از تقلب در شمارش نصب انجام می‌دهید، به این دلیل که امضاهای کاربر، قبل و بعد از ثبت او (register) مطابقت داده می‌شوند و در صورت تایید به عنوان یک نصب سالم در نظر گرفته می‌شوند. 

به عنوان مثال اگر اپلیکیشن شما دارای صفحه **ورود** و **ثبت‌نام** می‌باشد، متد `register` را در صفحه **ورود** یا **ثبت‌نام** پس از **احراز هویت کاربر** و همچنین، پس از هر بار اجرای (در کلاس `Application` متد `onCreate`) اپلیکیشن فراخوانی کنید تا کاربر به سرور چابک متصل شود.

```javascript
this.chabok.register('USER_ID').then(({deviceId}) => {
	console.log('Regsitered ', deviceId)
}).catch(error => {
	console.log('Fail to register user ', error)
})
```

> `نکته`: مقدار `USER_ID` می‌تواند **بین ۳ تا ۶۴** کاراکتر باشد. زبان فاسی، کاراکترهای `#,+,*,\,/` و فاصله هم در آن **مجاز نیستند**.

<br>

#### ۲.۱. رصد رویدادها (Tracking Events)

رویدادها در واقع همان تعامل کاربر با اپلیکیشنتان است. از این رو آن‌ها را **رفتار** کاربر می‌نامیم. شما می‌توانید رفتار کاربر را در اپلیکیشن خود به طور **لحظه‌ای** رصد کنید. این امر به شما امکان می‌دهد تا **CPA های پیشرفته** برای کمپین‌هایتان [تعریف کنید](/panel/tracker.html#افزودن-cpa) و نصب‌هایتان با تحقق اهدافی که برای کاربران تعیین کرده‌اید شمرده شوند. 


به عنوان مثال می‌خواهید رفتار **افزودن به سبد خرید** از فروشگاه اینترنتی خودتان را رصد کنید. برای ثبت این رفتار کد زیر را با الگوی بالا وارد می‌نماییم.

نمونه:

```javascript
const data = {
  "value": 35000
}

this.chabok.track('add-to-card', data)
```

>‍‍‍`نکته:` در متد `track` در صورتی که به `value` مقدار عددی بدهید، آن رفتار در سگمنت با پیشوند **آخرین و مجموع** اضافه می‌شود. اما در صورتی که مقدار غیر عددی (string) بدهید، آن رفتار فقط با پیشوند **آخرین** به سگمنت اضافه می‌شود.

<Br>

##### رصد درآمد (Tracking Revenue)

شما می‌توانید در‌آمدی که کاربران با نشان دادن رفتاری از خود (مانند خرید) تولید می‌کنند را رصد و ذخیره کنید. این کار را باید با متد `trackPurchase` انجام دهید. به عنوان مثال کاربر خریدی را با ارزش ۵۰ هزار تومان انجام داده است.

نمونه:

```java
this.chabok.trackPurchase('Purchase', {revenue: 50000, currency: "RIAL"});
```
برای اطلاعات بیشتر مربوط به رصد رویدادها [اینجا](/react-native-bridge/behavior-tracking.html) را مطالعه کنید.

<br>

#### ۳.۱. تست راه‌اندازی 

اگر عملیات ثبت‌ کاربر به درستی انجام شده باشد، اطلاعات کاربر در [پنل](https://sandbox.push.adpdigital.com/front/users/subscribers/list)  چابک قسمت **کاربران** قابل مشاهده خواهد بود.  

البته محیط آزمایشی فقط برای تست و آشنایی با امکانات است و دارای محدودیت سقف کاربر می‌باشد. بنابراین برای اپلیکیشن‌های تجاری و اپ‌استور توصیه می‌کنیم از حساب عملیاتی که این سقف را ندارد، استفاده کنید.

> `نکته` : در صورتی که مقداردهی اولیه و ثبت کاربر به درستی اعمال شده باشد، می‌توانید اطلاعات دستگاه متصل خود را در [بخش مشترکین پنل چابک](https://sandbox.push.adpdigital.com/front/users/subscribers/list) مشاهده کنید.

در صورتی که مقداردهی اولیه و ثبت کاربر به درستی اعمال شده باشد، می‌توانید اطلاعات دستگاه متصل خود را در [بخش مشترکین پنل چابک](https://sandbox.push.adpdigital.com/front/users/subscribers/list) مشاهده کنید.


#### ۴.۱. انتشار اپلیکیشن در استورها

به طور کلی چابک دارای دو نوع حساب رایگان (محیط آزمایشی) و عملیاتی  است. در صورتی که روی حساب رایگان هستید می‌توانید روی همان حساب نسخه جدید را منتشر کنید.

 داده‌های شما از حساب رایگان به عملیاتی به هیج وجه منتقل نمی‌شوند و برای انتقال باید آپدیت فوری از اپلیکیشن خود بدهید و تمام کاربران را به نسخه جدید بیاورید. برای همین در صورتی هم که حساب عملیاتی دارید  باید حتما **روی محیط عملیاتی** نسخه جدید اپلیکیشن خود را در استورها منتشر کنید.

<br><br>

### ۲. ترک نصب‌ها (Tracking Installs)
---
 
پس از اینکه راه‌اندازی SDK چابک را در اپلیکیشنتان انجام دادید می‌توانید برای کمپین‌های نصب خود ترکر فعال کنید. 

#### ۱.۲. ایجاد لینک ترکر 

برای ایجاد لینک ترکر فقط کافیست وارد صفحه **ترکر** پنل شوید و **ترکر جدید** بسازید. همینطور شما می‌توانید به لینک ترکر خود پارامتر [اضافه کنید](/panel/tracker.html#پارامتر-در-لینک-ترکر).


 برای اطلاعات بیشتر درباره ایجاد ترکر جدید در پنل و مشاهده نمونه‌ای از آن می‌توانید به مستندات [پنل](/panel/tracker.html#ایجاد-ترکر-جدید) مراجعه کنید.


**نمونه لینک ترکر چابک**:

حساب‌ رایگان:

```javascipt
https://sand.chabokpush.com/JY@4sc
```  
حساب عملیاتی:

```javascipt
https://a.chabok.io/JY@4sc
```  

#### ۲.۲. انتشار لینک ترکر 

پس از ایجاد یک ترکر جدید و گرفتن لینک آن کافی است آن را در کمپین‌های نصب خود قرار دهید.
با این کار ترکر شما فعالیت خود را آغاز می‌کند و از این پس هر کلیک و نصب به صورت لحظه‌ای در پنل به نمایش گذاشته خواهد شد.


<br><br>

### ۳. ترک کمپین‌های نصب از استور‌ها
---

شما می‌توانید  نصب‌های خود که از استور‌های مختلف **اندروید و آی‌اواس** گرفته‌اید را ترک کنید. 

>‍`نکته:‍‍‍‍` دقت داشته باشید که برای ترک کمپین‌های نصب باید حتما نسخه SDK چابک شما **۱.۳.۰ به بالا** باشد.

<br>

##### گوگل پلی استور

برای انجام این کار باید از `INSTALL_REFERRER` intent اندروید استفاده کنید. این Referrer وظیفه اطلاع رسانی نصب از گوگل پلی را  به SDK چابک دارد. فقط کافیست اپلیکیشن شما آن را دریافت کند. بنابراین اطمینان یابید که کد زیر در `build.gradle` شما اضافه شده باشد:

```java
implementation 'com.android.installreferrer:installreferrer:1.0'
```

<br>

#### استورهای غیر از گوگل پلی (Third-Party App Stores)

این کار را چابک با دو روش **استفاده از روش Referrer** و **آی‌دی ترکر** انجام می‌دهد. 

> `نکته:` این روش را می‌توانید برای ترک نصب از **گوگل پلی استور** هم استفاده کنید. فقط **زمان کلیک** و **زمان شروع دانلود** را در اختیار شما قرار نمی‌دهد.

##### روش Referrer 

در صورتی که می‌خواهید از استورهای غیر از گوگل پلی که Referrer را **پشتیبانی می‌کنند** ترک کنید، تگ `receiver` را در کلاس `application`  فایل `AndroidManifest.xml` خود قرار دهید: 

```xml
<receiver
    android:name="com.adpdigital.push.ChabokReferrerReceiver"
    android:permission="android.permission.INSTALL_PACKAGES"
    android:exported="true">
       <intent-filter>
            <action android:name="com.android.vending.INSTALL_REFERRER" />
        </intent-filter>
</receiver>
```

زمانی که شما دریافت Referrer را در اپلیکیشن خود پیاده‌سازی کردید، اطلاعات کمپین را دریافت می‌کند و به شما انتقال خواهد داد.

از طریق Referrer شما اطلاعات کلیدی ترکر خود مانند منبع نصب، آی‌دی ترکر و سطح ترکر را ارسال می‌کنید.

#### روش آی‌دی ترکر (Pre-Install Campaigns)

اگر هم استورها Referrer را کلا **پشتیبانی نکنند** شما همچنان می‌توانید منبع (Source) نصب را در کمپین خود برای اندروید و آی‌اواس بفهمید. برای انجام این کار باید در ابتدا ترکر خود را در پنل ایجاد کنید و **آی‌دی ترکر** را در کد apk یا ipa خود قرار دهید.


```javascript
this.chabok.setDefaultTracker("YOUR_TRACKER_ID");
```

>`نکته:` دقت داشته باشید که `TRACKER_ID` شناسه ۶ کاراکتری است که در لینک ترکر شما وجود دارد. به عنوان مثال در لینک `https://sand.chabokpush.com/JY@4sc` آی‌دی ترکر `JY@4sc` می‌باشد. این آی‌دی را می‌توانید از پنل>ترکر>جزئیات ترکر مانند تصویر زیر کپی کنید:

![عکس مربوط](http://uupload.ir/files/bjbc_tracker-analytics-s.png)

<br><br>

### ۴. ترک جستجوی ارگانیک گوگل
---

گوگل به کاربران امکان می‌دهد تا با جستجوی اپلیکیشن در موتور جستجوی خود و کلیک روی آیکون آن به **گوگل پلی** بروند و آنجا به طور مستقیم نصب کنند.

شما می‌توانید **کلید واژه‌‌ای** که کاربر در **گوگل** جستجو کرده است را داشته باشید. چابک این کلید واژه را در سطح `campaign` ترکر ایجاد می‌کند. 

علاوه بر آن، چابک پارامتر `utm_medium` را در سطح `adgroup` ایجاد می‌کند. این پارامتر همان معیار شمارش است.

>`نکته:` دقت داشته باشید که برای استفاده از این قابلیت باید حتما ‍‍`referrer` را پیاده‌سازی کرده باشید.

<br><br>

### ۵. کال‌بک‌های ترکر (Callbacks)
---

در صورتی هم که می‌خواهید داده‌های ترکر را در سیستم‌های دیگر از جمله سرورهای خود دریافت کنید می‌توانید از کال‌بک استفاده کنید. این کار را می‌توانید از پنل هنگام ایجاد ترکر جدید انجام دهید. به این ترتیب لینکی که می‌خواهید زمان رخ دادن رویداد (کلیک یا نصب) فرخوانی شود را وارد می‌کنید. 

همچنین شما می‌توانید در کال‌بک خود از پارامترهایی برای اطلاعات بیشتر از مبدا رویداد کسب کنید. برای مشاهده این پارامترها و نمونه لینک کال‌بک می‌توانید به مستندات [پنل](/panel/tracker.html#کالبک) مراجعه کنید.

<br><br>

### ۶. مکانیزم ضد تقلب (Fraud Prevention)
---

SDK چابک به گونه‌ای پیاده‌سازی شده است که امکان تقلب و نصب غیر واقعی در روش‌های مبتنی بر نصب و رفتار (CPA و CPI) را به طور کامل از بین می‌برد. علاوه بر آن، به هیج وجه فراخوانی و رصد رویداد‌های چابک قابل دستکاری نیستند. 

مواردی که چابک برای حذف تقلب انجام می‌دهد عبارتند از:

- **IP Filtering**:

آی‌پی کاربر را در زمان کلیک و نصب تطبیق می‌دهد، جلوی نصب‌های متعدد با یک آی‌پی را می‌گیرد و همچنین آی‌پی‌های ناشناخته را رد می‌کند.

- **User Verification**:

با توجه به ساختار کاربر محور بودن سیستم چابک، تمام اطلاعات کاربر در کلیک و نصب را مقایسه می‌کند تا واقعی بودن کاربر جذب شده مشخص شود.

- **SDK Signature**:

روی SDK امضای خاصی را می‌گذارد تا هنگام کلیک دریافت شود و پس از نصب با اپلیکیشن شما تطبیق داده شود. همچنین یکی از راه‌های مقابله با **SDK Spoofing** است. SDK Spoofing یکی از راه‌های تقلب است که نصب‌ها را روی دستگاه‌های واقعی شبیه‌سازی می‌کند و آن را جزو نصب‌های کمپین محاسبه می‌نماید. این کار معمولا از اپلیکیشن‌های دیگر روی دستگاه صورت می‌گیرد و نصب‌های بی‌شمار غیر واقعی را وارد کمپین‌ شما می‌کند.


- **Server to Server Verification**:

اطلاعات کاربر را هنگام کلیک جمع‌آوری می‌کند و با اطلاعاتی که سرور شما در هنگام نصب دریافت می‌کند اعتبارسنجی می‌نماید؛ در صورت عدم تطابق، نصب را رد می‌کند.

- **TTI**:

زمان قابل قبول بین کلیک و نصب است. چابک به طور خودکار فاصله زمانی بسیار کوتاه را رد می‌کند و همینطور در صورتی که از محدوده‌ای که شما تعیین کرده‌اید بیشتر شود ([محدوده اتریبیوشن](/panel/tracker.html#محدوده-اتریبیوشن))، نصب شمرده نخواهد شد.

- **Two-Phase Authentication**:

احراز هویت برای تشخیص واقعی بودن کاربر در هنگام نصب است. در چابک این کار از طریق ارسال پیام کوتاه انجام می‌شود.

<br><br>

### ۷. آشنایی با برخی مفاهیم ترکر
---

- **اتریبیوشن**: نصب‌هایی که از طریق کمپین‌های تبلیغاتی شمرده می‌شوند.

- **بازدید**: هر بار که اپلیکیشن باز شود یک بازدید محاسبه می‌شود.

- **ترکر**: ابزار شمارش و رصد کمپین‌های تبلیغاتی را ترکر می‌نامند.

- **رد شده**: نصب‌ها و کلیک‌هایی که غیر واقعی تشخیص داده می‌شوند و در شمارش محاسبه نمی‌شوند.

- **رویداد**: هرگونه تعامل کاربر با اپلیکیشن، یک رویداد در نظر گرفته می‌شود. 

- **نصب**: اولین بازدید هر کاربر نصب به حساب می‌آید.
