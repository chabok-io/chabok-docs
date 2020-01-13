---
id: sdk-setup-old
title: راه‌اندازی
layout: react-native-bridge
permalink: react-native-bridge/sdk-setup-old.html
prev: required.html
next: tracker.html
---

پس از طی کردن مراحل صفحه [پیش‌نیازها](/react-native-bridge/required.html)، می‌توانید **راه‌اندازی SDK چابک** را شروع کنید. در ابتدا شما باید کتابخانه چابک را [نصب کنید](/react-native-bridge/sdk-setup.html#۱--نصب-کتابخانه). در انتها، [مقداردهی و راه‌اندازی](/react-native-bridge/sdk-setup.html#۲--مقداردهی-اولیه-initialize) کتابخانه چابک را در اپلیکیشنتان انجام دهید و برای شناخت کاربر توسط چابک، مرحله [ثبت کاربر](/react-native-bridge/sdk-setup.html#۳--ثبت-کاربر-register) را حتما پشت سر بگذارید.

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
شما می‌توانید از نسخه‌های بالاتر از ۲۶ `buildTools` و `compileSdk` هم استفاده کنید. دلیل ما برای استفاده از نسخه ۲۶  این است که پایین‌ترین نسخه‌ای است که اندروید پشتیبانی می‌کند.

- آخرین نسخه فایل کتابخانه چابک از  [اینجا](https://bintray.com/bintray/jcenter?filterByPkgName=com.adpdigital.push) قابل دسترس می‌باشد.
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
  pod 'ChabokPush', '~> 1.20.2'

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

### ۲- مقدار‌دهی اولیه (Initialize)

در ابتدا برای **اندروید** در فایل `MainApplication.java` کد زیر اضافه نمایید:

> `نکته` :‌ تمامی متدهایی که در این بخش بیان می‌شود باید تنها یک بار فراخوانی شود.  

```java
import android.app.Application;

//React-Native
import com.facebook.react.ReactPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactApplication;
import com.adpdigital.push.rn.ChabokReactPackage;
import com.facebook.react.shell.MainReactPackage;

//Chabok
import com.adpdigital.push.AdpPushClient;
import com.adpdigital.push.ChabokNotification;
import com.adpdigital.push.NotificationHandler;
import com.adpdigital.push.ChabokNotificationAction;

//Java
import java.util.List;
import java.util.Arrays;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
              new MainReactPackage(),
              new ChabokReactPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public void onCreate() {
    super.onCreate();

    //AdpPushClient.init() should always be called in onCreate of Application class
    AdpPushClient.init(
            getApplicationContext(),
            MainActivity.class,
            "APP_ID/SENDER_ID", //based on your environment
            "API_KEY",          //based on your environment
            "USERNAME",     //based on your environment
            "PASSWORD"      //based on your environment
    );

    AdpPushClient.get().addNotificationHandler(new NotificationHandler(){
      @Override
      public boolean notificationOpened(ChabokNotification message, ChabokNotificationAction notificationAction) {
        ChabokReactPackage.notificationOpened(message, notificationAction);
        return super.notificationOpened(message, notificationAction);
      }
    });

  }

  @Override
  public void onTerminate() {
    AdpPushClient.get().dismiss();

    super.onTerminate();
  }

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }
}
```

  > `نکته`: در این متد به جای پارامتر‌های `APP_ID/SENDER_ID`, `API_KEY(SDK_KEY)`, `SDK_USERNAME`, `SDK_PASSWORD` مقادیر مربوط به حساب چابک خود را وارد نمایید. نحوه ایجاد حساب در بخش [پیش‌نیازها](/react-native-bridge/required.html) توضیح داده شده است. در صورت داشتن حساب چابک هم می‌توانید این مقادیر را از [**پنل بخش تنظیمات قسمت دسترسی‌ و توکن‌ها**](/panel/settings.html#دسترسیها-و-توکنها) بردارید.   
  
- **APP_ID/SENDER_ID**: برای این مقدار کافی است فقط `SENDER_ID` ([شناسه‌ گوگل برای پوش‌نوتیفیکیشن](/android/required.html#%D8%AF%D8%B1%DB%8C%D8%A7%D9%81%D8%AA-%DA%A9%D9%84%DB%8C%D8%AF%D9%87%D8%A7%DB%8C-%DA%AF%D9%88%DA%AF%D9%84)) و `APP_ID` (شناسه چابک برای هر اپلیکیشن) را در کنار هم قرار دهید. به عنوان مثال این مقدار برای حساب دموی چابک `839879285/chabok-starter` می‌شود. (مقدار عددی `SENDER_ID` است.) 

- **API_KEY**: این مقدار را باید از پنل > تنظیمات > دسترسی و توکن‌ها بردارید.

- **SDK_USERNAME**: این مقدار را باید از پنل > تنظیمات > دسترسی و توکن‌ها بردارید.

- **SDK_PASSWORD**: این مقدار را باید از پنل > تنظیمات > دسترسی و توکن‌ها بردارید.

پس از آن، برای ارتباط با سرور چابک لازم است یک نمونه از کلاس `chabok.AdpPushClient` بسازید و آن را مقدار‌دهی کنید.  فراخوانی این متد فقط یکبار کافی است.

 برای مقدار‌دهی اولیه می‌بایست از طریق متد `init` اطلاعات حساب چابک و تنظیمات اولیه را وارد نمایید. در `const options` به جای پارامتر‌های `APP_ID/SENDER_ID`, `API_KEY`, `SDK_USERNAME`, `SDK_PASSWORD` مقادیر مربوط به حساب چابک خود را که در بالا توضیح داده شده، وارد نمایید.
 به قطعه کد زیر دقت کنید:

```javascript
import { NativeEventEmitter, NativeModules } from 'react-native';
import chabok from 'react-native-chabok';

componentDidMount(){
	const options = {
		appId: "APP_ID/SENDER_ID", 		//based on your environment
		apiKey: "API_KEY",			//based on your environment
		username: "SDK_USERNAME",		//based on your environment
		password: "SDK_PASSWORD", 		//based on your environment

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
  > `نکته`: در این متد به جای پارامتر‌های `APP_ID/SENDER_ID`, `API_KEY(SDK_KEY)`, `SDK_USERNAME`, `SDK_PASSWORD` مقادیر مربوط به حساب چابک خود را وارد نمایید. نحوه ایجاد حساب در بخش [پیش‌نیازها](/react-native-bridge/required.html) توضیح داده شده است. در صورت داشتن حساب چابک هم می‌توانید این مقادیر را از [**پنل بخش تنظیمات قسمت دسترسی‌ و توکن‌ها**](/panel/settings.html#دسترسیها-و-توکنها) بردارید.   
  
- **APP_ID/SENDER_ID**: برای این مقدار کافی است فقط `SENDER_ID` ([شناسه‌ گوگل برای پوش‌نوتیفیکیشن](/android/required.html#%D8%AF%D8%B1%DB%8C%D8%A7%D9%81%D8%AA-%DA%A9%D9%84%DB%8C%D8%AF%D9%87%D8%A7%DB%8C-%DA%AF%D9%88%DA%AF%D9%84)) و `APP_ID` (شناسه چابک برای هر اپلیکیشن) را در کنار هم قرار دهید. به عنوان مثال این مقدار برای حساب دموی چابک `839879285/chabok-starter` می‌شود. (مقدار عددی `SENDER_ID` است.) 

- **API_KEY**: این مقدار را باید از پنل > تنظیمات > دسترسی و توکن‌ها بردارید.

- **SDK_USERNAME**: این مقدار را باید از پنل > تنظیمات > دسترسی و توکن‌ها بردارید.

- **SDK_PASSWORD**: این مقدار را باید از پنل > تنظیمات > دسترسی و توکن‌ها بردارید.

- **devMode**:  تعیین می‌کند که اپلیکیشن شما به محیط  [آزمایشی (Sandbox)](https://sandbox.push.adpdigital.com/)  و یا  [عملیاتی (Production)](https://panel.push.adpdigital.com/) چابک متصل شود. این موضوع بستگی به این دارد که حساب کاربری شما روی کدام محیط تعریف شده باشد. مقدار  `true`  به محیط آزمایشی و مقدار`false`  به محیط عملیاتی متصل می‌شود. در نظر داشته باشید، هر محیط به کلیدهای دسترسی (`appId`,  `apiKey`,  `username`  و  `password`) خودش در متد  `init`  نیاز دارد. بنابراین در صورت تغییر مقدار  `devMode`  کلید‌های دسترسی آن هم باید تغییر داده شود.

> `نکته`: برای درخواست حساب محیط **عملیاتی**، در بخش تنظیمات پنل، وارد بخش [**درخواست حساب عملیاتی**](https://sandbox.push.adpdigital.com/front/setting/accountRequest) شوید و درخواست خود را ثبت نمایید تا پس از تایید و ساخت حساب عملیاتی شما، اطلاعات جدید حسابتان (`appId`, `apiKey`, `username` و `password`) تعیین گردد. 

### ۳- ثبت کاربر (Register)

یکی از مزیت‌های چابک نسبت به درگاه‌های ارسال پوش‌نوتیفیکیشن، امکان **معرفی** هر کاربر با یک شناسه منحصر به فرد است. این قابلیت به شما امکان می‌دهد دستگاه‌های کاربر را **مدیریت کنید** و سوابق جمع‌آوری شده را همانند یک سیستم مدیریت مشتریان (CRM) در اختیار داشته باشید. این شناسه می‌تواند برای **دستگاه‌های متعدد یک کاربر** استفاده شود. شناسه کاربر می‌تواند هر فیلد با ارزش و معنا‌دار برای کسب و کار شما باشد که کاربر خود را با آن شناسایی می‌کنید. **شماره موبایل**، **کدملی**، **شماره‌حساب**، **ایمیل** و یا حتی **شناسه دیتابیس‌تان** مثال‌هایی از شناسه‌های کاربری مناسب در موارد واقعی هستند. ارسال پیام‌ به کاربران توسط همین شناسه‌ها و بدون استفاده از توکن یا شناسه گوشی، به سادگی امکان پذیر خواهد بود.

>` نکته:` ترکرها به طور معمول نصب را **اولین بازدید** حساب می‌کنند (مانند سرویس ادجاست)، اما مزیت ترکر چابک در شمارش نصب این است که شما می‌توانید علاوه بر مدل ادجاست نصب را **پس از ورود کاربر و احراز هویت او** در اپلیکیشنتان تعریف کنید. با این کار شما یک اقدام دیگری برای جلوگیری از تقلب در شمارش نصب انجام می‌دهید، به این دلیل که امضاهای کاربر، قبل و بعد از ثبت او (register) مطابقت داده می‌شوند و در صورت تایید به عنوان یک نصب سالم در نظر گرفته می‌شوند. 

با استفاده از متد `register` می‌توانید یک نام کاربری به هر کاربر اختصاص دهید. این متد `شناسه کاربر` را گرفته و کاربر را با آن شناسه روی سرور چابک ثبت‌نام می‌کند:

> `نکته` : متد `register` باید فقط **یک بار** در طول اجرا اپلیکیشن فراخوانی شود.

```javascript
this.chabok.register('USER_ID');
```

>   `نکته امنیتی` : مقدار `USER_ID` را هرگز به صورت خام در `LocalStorage` ذخیره نکنید، چون این مقدار شناسه معنادار می‌باشد و می‌توان با آن کاربر را روی چابک ثبت‌نام کرد. برای این منظور می‌توانید از [دریافت شناسه کاربر](/react-native-bridge/features.html#دریافت-شناسه-کاربر) در صفحه امکانات دیگر استفاده نمایید.

```javascript
this.chabok.getUserId().then(userId => {
	console.log('userId: ', userId)
}).catch(error => {
	console.log('Fail to getUserId', error)
})
```

به عنوان مثال اگر اپلیکیشن شما دارای صفحه **ورود** و **ثبت‌نام** می‌باشد، متد `register` را در صفحه **ورود** یا **ثبت‌نام**پس از **احراز هویت کاربر** و همچنین، پس از هر بار اجرای (در فایل `App` متد `componentDidMount`) اپلیکیشن فراخوانی کنید تا کاربر به سرور چابک متصل شود.

```javascript
componentDidMount(){
    ...
    
    this.chabok.getUserId().then(userId => {
        if (userId) {
            this.chabok.register(userId)
        } else {
        
            //If user is not registered verify the user and
            //call this.chabok.register('USER_ID') method at login page
            this.chabok.register('USER_ID');
        }
    }).catch(error => {
        console.log('Fail to getUserId ', error)
    })
}
```

> `نکته`: مقدار `USER_ID` می‌تواند **بین ۳ تا ۶۴** کاراکتر باشد. زبان فاسی، کاراکترهای `#,+,*,\,/` و فاصله هم در آن **مجاز نیستند**.

> `نکته` : در صورتی که مقداردهی اولیه و ثبت کاربر به درستی اعمال شده باشد، می‌توانید اطلاعات دستگاه متصل خود را در [بخش مشترکین پنل چابک](https://sandbox.push.adpdigital.com/front/users/subscribers/list) مشاهده کنید.

در صورتی که مقداردهی اولیه و ثبت کاربر به درستی اعمال شده باشد، می‌توانید اطلاعات دستگاه متصل خود را در [بخش مشترکین پنل چابک](https://sandbox.push.adpdigital.com/front/users/subscribers/list) مشاهده کنید. 

#### کاربر مهمان

در صورتی که اپلیکیشن شما قابلیت  **ایجاد حساب کاربری**  داشته باشد می‌توانید کاربر را تا زمانی که حساب ایجاد نکرده است به عنوان  **کاربر مهمان**  در سیستم خود ثبت کنید و سپس به محض ایجاد حساب و دریافت اطلاعات او، آن کاربر را به عنوان **کاربر دائم** خود مانند بالا ثبت کنید. 

> `نکته:` در صورتی که می‌خواهید از ترکر نصب استفاده کنید و نصب‌ها را به محض اولین ورود کاربر محاسبه کنید (مانند سرویس ادجاست) باید از این متد استفاده کنید. دقت داشته باشید که این متد را به تنهایی به کار نبرید زیرا هر بازدید کاربر را مهمان جدید محاسبه می‌کند. برای اطلاعات بیشتر مستندات [ترکر نصب](/react-native-bridge/tracker.html) را مطالعه کنید.

متد زیر کاربر را به عنوان کاربر مهمان ثبت می‌کند و به طور خودکار یک تگ مهمان (CHABOK_GUEST) به او اختصاص می‌دهد:

```javascript
this.chabok.registerAsGuest();
```

#### رویداد تایید ثبت کاربر

رویداد `onRegister` به شما این امکان را می‌دهد که بررسی کنید آیا عملیات ثبت‌ کاربر انجام شده است یا خیر.

```javascript
const chabokEmitter = new NativeEventEmitter(NativeModules.AdpPushClient);

chabokEmitter.addListener('onRegister', (status)=>{  
    if (status.isRegister) {  
        console.log('User registered ', status);  
	} else {  
        console.log('Not registered error:', error);  
	}  
})
```

#### حذف کاربر

برای حذف دستگاه کاربر از سرور چابک می‌توانید از متد `unregister` استفاده کنید. پس از حذف کاربر، چابک دیگر به دستگاه‌های آن `userId` پوش ارسال نخواهد کرد. توصیه می‌شود این متد را زمانی که کاربر در اپلیکیشنتان از حساب خود خارج می‌شود (**Logout**) فراخوانی کنید. این امر باعث می‌شود تا کاربر از حفظ شدن حریم شخصی خود پس از خروج از حساب کاربری اطمینان یابد. پس از آن هم کاربر را به عنوان یک کاربر مهمان ثبت کنید تا همچنان با او تعامل داشته باشید.

برای حذف دستگاه کاربر از سرور چابک می‌توانید از متد زیر استفاده کنید:

```javascript
this.chabok.unregister()
```

پس از اتمام این مراحل شما می‌توانید با فراخوانی [این رویدادها](/react-native-bridge/features.html#اتصال-با-سرور) از اتصال دستگاه به چابک اطمینان یابید.

> `نکته:` پروژه [Starter](https://github.com/chabok-io/chabok-starter-rn) به شما کمک می‌کند بدون هیچ کد اضافه‌ای و فقط با اجرای آن، از پلتفرم چابک استفاده کنید. همچنین به کمک این پروژه با نحوه صحیح پیاده سازی متدهای چابک آشنا خواهید شد.
