---
id: sdk-setup
title: راه‌اندازی
layout: react-native-bridge
permalink: react-native-bridge/sdk-setup.html
prev: required.html
next: tracker.html
---

> `نکته:` مستندات پیاده‌سازی زیر براساس **نسخه‌های ۲.۰.۰ به بالا** کتابخانه چابک نوشته شده است. در صورتی که از نسخه‌ پایین‌تری استفاده می‌کنید به [ این صفحه](/react-native-bridge/sdk-setup-old.html) مراجعه کنید.
>
> در صورتی که می‌خواهید نسخه خود را ارتقا دهید، حتما [مستندات مهاجرت](/react-native-bridge/upgrade-chabok-to-2-0-0.html) به نسخه ۲ چابک را مطالعه کنید. 

پس از طی کردن مراحل صفحه [پیش‌نیازها](/react-native-bridge/required.html)، می‌توانید **راه‌اندازی SDK چابک** را شروع کنید. در ابتدا شما باید کتابخانه چابک را [نصب کنید](/react-native-bridge/sdk-setup.html#۱--نصب-کتابخانه). در انتها، [مقداردهی و راه‌اندازی](/react-native-bridge/sdk-setup.html#۲--مقداردهی-اولیه-initialize) کتابخانه چابک را در اپلیکیشنتان انجام دهید و برای شناخت کاربر توسط چابک، مرحله [ثبت کاربر](/react-native-bridge/sdk-setup.html#۳--ثبت-کاربر) را حتما پشت سر بگذارید.

برای انجام موفق این کارها باید تمام مراحل زیر را به ترتیب انجام دهید:

[ ۱- نصب کتابخانه](/react-native-bridge/sdk-setup.html#۱--نصب-کتابخانه)

[۲- مقداردهی اولیه (Initialize)](/react-native-bridge/sdk-setup.html#۲--مقداردهی-اولیه-initialize)

[۳- ثبت کاربر (Register)](/react-native-bridge/sdk-setup.html#۳--ثبت-کاربر)

<Br>

### ۱- نصب کتابخانه 

#### نصب کتابخانه جاوااسکریپ

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

>`نکته:` دقت داشته باشید که [اندروید](/sdk-setup.html#۱-۲-نصب-کتابخانه-اندروید) و [آی‌اواس](/sdk-setup.html#۱-۳-نصب-کتابخانه-آیاواس) نیاز به نصب جداگانه دارند که در ادامه به هر دو پرداخته می‌شود:


#### نصب کتابخانه اندروید

برای دریافت کتابخانه چابک دستورات زیر را به فایل `build.gradle` اصلی پروژه اضافه کنید:

```javascript  
buildscript {
    repositories {
        google()
        jcenter()
        maven {
            url "https://plugins.gradle.org/m2/" 
        }
    }
    
    dependencies {    
        classpath 'io.chabok.plugin:chabok-services:1.0.0'
        classpath 'com.google.gms:google-services:4.3.2'
    }
}
```

دستور زیر را در انتهای فایل `build.gradle` ماژول اپلیکیشن خود اضافه کنید:

```javascript  
apply plugin: 'io.chabok.plugin.chabok-services'
apply plugin: 'com.google.gms.google-services'
```

>`نکته:`
 این فایل عموما در مسیر زیر وجود دارد:
**app/build.gradle**

> `نکته:` بصورت پیش‌فرض چند پرمیشن به خروجی نهایی اپلیکیشن شما در اندروید توسط ماژول چابک اضافه می‌شود که یکی از آن‌ها برای دیباگ اپلیکیشن کاربرد دارد، در صورت عدم نیاز می‌توانید این پرمیشن را از فایل مانیفست پروژه خود در مسیر `android/app/src/main/AndroidManifest.xml` با دستور زیر حذف کنید:
> ```xml
> <!-- android.permission.SYSTEM_ALERT_WINDOW - required for debug mode -->
> <uses-permission android:name="android.permission.SYSTEM_ALERT_WINDOW" tools:node="remove"/>
> ```

#### نصب کتابخانه آی‌او‌اس

کتابخانه چابک پس از لینک کردن ماژول چابک در دسترس است، با روش زیر آن را نصب کنید:

```bash
$ pod install --repo-update
```
پس از اجرای دستورات بالا اگر با خطایی رو به رو شدید، دستور زیر را وارد کنید، سپس `pod install` را دوباره اجرا کنید.

```bash
$ pod update
```
حالا برای اطمینان از نصب، پروژه را در `xcode` باز کنید ، اگر header فایل چابک را مشاهده کردید، نصب کتابخانه آی‌او‌اس موفقیت آمیز بوده است.

<Br>

### ۲- مقدار‌دهی اولیه (Initialize)

#### مقدار‌دهی اولیه اندروید

چابک برای راه اندازی نیاز به **مقداردهی اولیه** دارد.
<br>
۱. برای مقداردهی ابتدا از پنل خود وارد بخش **تنظیمات**> **دسترسی و توکن‌ها**> **کتابخانه موبایل**> **فعال‌سازی راه‌اندازی هوشمند**> شوید و فایل **Chabok.sandbox.json** یا **Chabok.production.json** را بسته به محیطتان دانلود کنید.
<p class="text-center">
<img src="http://uupload.ir/files/9tlr_sandbox-android-chabok-doc.gif">
</p>

>`نکته:`
برای غیرفعال کردن قابلیت **پوش نوتیفیکیشن**(pushNotification)، کافیست مقدار پیش ‌فرض آن را در فایل دانلود شده تغییر بدید.

۲. فایل دانلود شده را در پوشه ماژول اصلی پروژه قرار دهید.
<p class="text-center">
<img width="90%" src="http://uupload.ir/files/pby6_download-file-in-main-module-of-project.gif">
</p>

<br>

۳. در مرحله آخر نیاز است کد‌های زیر را در کلاس اپلیکیشن خود فراخوانی کنید.

```java
import android.app.Application;
import android.content.Context;

//React-Native
import com.facebook.react.PackageList;
import com.facebook.react.ReactApplication;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;

//Chabok
import com.adpdigital.push.AdpPushClient;
import com.adpdigital.push.config.Environment;

//Java
import java.lang.reflect.InvocationTargetException;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

    private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
        @Override
        public boolean getUseDeveloperSupport() {
            return BuildConfig.DEBUG;
        }
        
        @Override
        protected List<ReactPackage> getPackages() {
            @SuppressWarnings("UnnecessaryLocalVariable")
            List<ReactPackage> packages = new PackageList(this).getPackages();
            return packages;
        }
        
        @Override
        protected String getJSMainModuleName() {
            return "index";
        }
    };

    @Override
    public ReactNativeHost getReactNativeHost() {
        return mReactNativeHost;
    }

    @Override
    public void onCreate() {
        super.onCreate();

        AdpPushClient.configureEnvironment(Environment.SANDBOX); // or PEODUCTION
    }
}
```

<br>

-**configureEnvironment**: متد `configureEnvironment` تعیین می‌کند که اپلیکیشن شما به محیط [آزمایشی (Sandbox)](https://sandbox.push.adpdigital.com) و یا [عملیاتی (Production) ](https://panel.push.adpdigital.com) چابک متصل شده. این موضوع بستگی به این دارد که حساب کاربری شما روی کدام محیط تعریف شده باشد.  

>`نکته:`متدی که در بالا قرار دادیم برای راه‌اندازی محیط سندباکس است. در صورتی که **حساب عملیاتی** دارید کافیست `Environment.SANDBOX` را با `Environment.PRODUCTION` عوض کنید.
<br>

> `نکته`: برای درخواست حساب محیط **عملیاتی**، در بخش تنظیمات پنل، وارد بخش [**درخواست حساب عملیاتی**](https://sandbox.push.adpdigital.com/front/setting/accountRequest) شوید و درخواست خود را ثبت نمایید و پس از تایید و ساخت حساب عملیاتی فایل **Chabok.production.json** را دانلود کنید و به جای فایل **Chabok.sandbox.json** در پوشه ماژول اصلی پروژه خود قراردهید. 


> `نکته:` دقت داشته باشید که **قابلیت آنی (realtime)**  چابک به طور پیش فرض **غیر فعال** است. برای فعال کردن مقدار قابلیت آنی (realtime)، کافی است مقدار پیش‌فرض آن را در فایل دانلود شده تغییر بدید. این قابلیت در[ پیام چابک](/android/chabok-messaging.html) و [پیام‌رسانی آنی](/android/event-handling.html) استفاده می‌شود.
 

#### مقدار‌دهی اولیه آی‌او‌اس

چابک برای راه‌اندازی نیاز به **مقداردهی اولیه** دارد.


۱- برای مقداردهی ابتدا از پنل خود بخش **تنظیمات> دسترسی و توکن‌ها> کتابخانه موبایل> راه‌اندازی هوشمند** فایل **Chabok.sandbox.plist**  یا  **Chabok.production.plist**  (بسته به محیطتان) را دانلود کنید.

![enter image description here](http://uupload.ir/files/hgt4_ios-configuration-file.png)

> `نکته:` برای غیر فعال کردن دریافت توکن پوش‌نوتیفیکیشن، کافیست مقدار پیش‌فرض آن را در فایل دانلود شده تغییر دهید.

<br>

۲- فایل دانلود شده را در **روت پروژه** خود قرار دهید:

![](http://uupload.ir/files/4818_root-of-project.png)

<br>

۳- در آخر متد چابک را در کلاس `AppDelegate` و متد `didFinishLaunchingWithOptions` فراخوانی کنید.

{% tabs %}
{% tab OBJECTIVE-C %}
```objectivec
#import "AppDelegate.h"
#import <AdpPushClient/AdpPushClient.h>

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application
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

    func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplicationLaunchOptionsKey: Any]?) -> Bool {
    
    PushClientManager.default()?.configureEnvironment(.Sandbox) // or PEODUCTION
    
    return true
}
```
{% endtab %}
{% endtabs %}

> `نکته`: متد بالا برای محیط سندباکس است. در صورتی که حساب عملیاتی دارید کافیست فقط `Sandbox` را با ‍‍`Production` عوض کنید.


> `نکته`: برای درخواست حساب محیط **عملیاتی**، در بخش تنظیمات پنل، وارد بخش [**درخواست حساب عملیاتی**](https://sandbox.push.adpdigital.com/front/setting/accountRequest) شوید و درخواست خود را ثبت نمایید و پس از تایید و ساخت حساب عملیاتی فایل **Chabok.production.plist** را دنلود کنید و به جای فایل **Chabok.sandbox.plist** در روت پروژه خود قراردهید. 

>`نکته` : توجه داشته باشید هنگامی که **گواهی sandbox اپل** را در پنل تستی قرار می‌دهید، فقط امکان دریافت `Push Notification` در حالت `debug` وجود خواهد داشت. اما اگر **گواهی production اپل** را در محیط عملیاتی قرار دهید، زمانی `Push Notification` را دریافت خواهید کرد که اقدام به ساخت **ipa** از پروژه خود کرده و از طریق TestFlight یا Enterprise اپلیکیشن خود را نصب کنید.

> `نکته:` دقت داشته باشید که **قابلیت آنی (realtime)**  چابک به طور پیش فرض **غیر فعال** است. این قابلیت در[ پیام چابک](/ios/chabok-messaging.html) و [پیام‌رسانی آنی](/ios/event-handling.html) استفاده می‌شود.

<br>
 

### ۳- ثبت کاربر

یکی از مزیت‌های چابک نسبت به درگاه‌های ارسال پوش‌نوتیفیکیشن، امکان **معرفی** هر کاربر با یک شناسه منحصر به فرد است. این قابلیت به شما امکان می‌دهد دستگاه‌های کاربر را **مدیریت کنید** و سوابق جمع‌آوری شده را همانند یک سیستم مدیریت مشتریان (CRM) در اختیار داشته باشید.       
این شناسه می‌تواند برای **دستگاه‌های متعدد یک کاربر** استفاده شود. شناسه کاربر می‌تواند هر فیلد با ارزش و معنا‌دار برای کسب و کار شما باشد که کاربر خود را با آن شناسایی می‌کنید. **شماره موبایل**، **کدملی**، **شماره‌حساب**، **ایمیل** و یا حتی **شناسه دیتابیس‌تان** مثال‌هایی از شناسه‌های کاربری مناسب در موارد واقعی هستند. ارسال پیام‌ به کاربران توسط همین شناسه‌ها و بدون استفاده از توکن یا شناسه گوشی، به سادگی امکان پذیر خواهد بود.      
 
#### ورود به حساب کاربری (login)
متد لاگین تنها زمانی فراخوانی شود که کاربر در اپلیکیشن لاگین یا ثبت‌نام می‌کند. نیازی به فراخوانی این متد در هر بار اجرای اپلیکیشن نیست.

<p>
فقط شناسه کاربر را گرفته و کاربر را با آن شناسه بر روی سرور چابک ثبت‌ نام می‌کند.
</p>

```java
chabok.login("user_id");
```

>`نکته:` مقدار `USER_ID` می‌تواند **بین ۳ تا ۶۴** کاراکتر باشد. زبان فاسی، کاراکترهای `#,+,*,\,/` و فاصله هم در آن **مجاز نیستند**.


#### خروج از حساب کاربری (logout)

در صورتی که کاربر از حساب کاربری خود خارج شد، با فراخوانی متد زیر می‌توانید کاربر را همچنان با یک تگ مهمان در سیستم خود داشته باشید و تعاملتان را با او ادامه دهید.

```java
chabok.logout();
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

> `نکته:` پروژه [Starter](https://github.com/chabok-io/chabok-client-rn) به شما کمک می‌کند بدون هیچ کد اضافه‌ای و فقط با اجرای آن، از پلتفرم چابک استفاده کنید. همچنین به کمک این پروژه با نحوه صحیح پیاده سازی متدهای چابک آشنا خواهید شد.
