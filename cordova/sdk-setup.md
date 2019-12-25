---  
id: sdk-setup  
title: راه‌اندازی  
layout: cordova  
permalink: cordova/sdk-setup.html  
prev: required.html  
next: tracker.html  
---  

پس از طی کردن مراحل صفحه [پیش‌نیازها](/cordova/required.html)، می‌توانید **راه‌اندازی SDK چابک** را شروع کنید. در ابتدا شما باید کتابخانه چابک را [نصب کنید](/cordova/sdk-setup.html#۱--نصب-کتابخانه). در انتها، [مقداردهی و راه‌اندازی](/cordova/sdk-setup.html#۲--مقداردهی-اولیه-initialize) کتابخانه چابک را در اپلیکیشنتان انجام دهید و برای شناخت کاربر توسط چابک، مرحله [ثبت کاربر](/cordova/sdk-setup.html#۳--ثبت-کاربر-register) را حتما پشت سر بگذارید.

برای انجام موفق این کارها باید تمام مراحل زیر را به ترتیب انجام دهید:

[ ۱- نصب کتابخانه](/cordova/sdk-setup.html#۱--نصب-کتابخانه)

[۲- مقداردهی اولیه (Initialize)](/cordova/sdk-setup.html#۲--مقداردهی-اولیه-initialize)

[۳- ثبت کاربر](/cordova/sdk-setup.html#۳--ثبت-کاربر)

<Br>

### ۱- نصب کتابخانه 

برای نصب از طریق `cordova-cli` :

```bash
cordova plugin add com.chabokpush.cordova
```
>`نکته:` دقت داشته باشید که [اندروید](/cordova/sdk-setup.html#نصب-کتابخانه-اندروید) و [آی‌اواس](/cordova/sdk-setup.html#نصب-کتابخانه-آیاواس) نیاز به نصب جداگانه دارند که در ادامه به هر دو پرداخته می‌شود:

#### ۱.۱- نصب کتابخانه اندروید 

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
        classpath "io.chabok.plugin:chabok-services:1.0.0"
        classpath 'com.google.gms:google-services:4.3.2'
    }
}
```

#### ۱.۲- نصب کتابخانه آی‌او‌اس 

>`نکته:` نصب کتابخانه آی‌او‌اس به صورت اتوماتیک انجام می‌شود و نیاز به نصب جداگانه‌ای ندارد.

### ۲- مقدار‌دهی اولیه (Initialize)

####   ۲.۱- مقداردهی اولیه جاوااسکریپ 

 مقداردهی اولیه در جاوا اسکریپ به صورت زیر انجام می‌شود.
 
 ```javascript
 chabok = new ChabokPush();
 ```


####   ۲.۲- مقداردهی اولیه اندروید 

 مقداردهی اولیه اندروید به صورت زیر انجام می‌شود.

چابک برای راه اندازی نیاز به **مقداردهی اولیه** دارد.
<br>
۱. برای مقداردهی ابتدا از پنل خود وارد بخش **تنظیمات**> **دسترسی و توکن‌ها**> **کتابخانه موبایل**> **فعال‌سازی راه‌اندازی هوشمند**> شوید و فایل **Chabok.sandbox.json** یا **Chabok.production.json** را بسته به محیطتان دانلود کنید.
<p class="text-center">
<img  src="http://uupload.ir/files/9tlr_sandbox-android-chabok-doc.gif">
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
public class MyAppClass extends Application {  
      @Override  
      public void onCreate() {
          super.onCreate();  
          AdpPushClient.configureEnvironment(Environment.SANDBOX); // ضروری  
          AdpPushClient.setLogLevel(LogLevel.VERBOSE); // اختیاری
          AdpPushClient.setDefaultTracker("Ym3gy7"); // اختیاری
    }
}
``` 
<br>
-**configureEnvironment**: متد `configureEnvironment` تعیین می‌کند که اپلیکیشن شما به محیط [آزمایشی (Sandbox)](https://sandbox.push.adpdigital.com) و یا [عملیاتی (Production) ](https://panel.push.adpdigital.com) چابک متصل شده. این موضوع بستگی به این دارد که حساب کاربری شما روی کدام محیط تعریف شده باشد.  

>`نکته:`متدی که در بالا قرار دادیم برای راه‌اندازی محیط سندباکس است. در صورتی که **حساب عملیاتی** دارید کافیست `Environment.SANDBOX` را با `Environment.PRODUCTION` عوض کنید.
<br>

> `نکته`: برای درخواست حساب محیط **عملیاتی**، در بخش تنظیمات پنل، وارد بخش [**درخواست حساب عملیاتی**](https://sandbox.push.adpdigital.com/front/setting/accountRequest) شوید و درخواست خود را ثبت نمایید و پس از تایید و ساخت حساب عملیاتی فایل **Chabok.production.json** را دانلود کنید و به جای فایل **Chabok.sandbox.json** در پوشه ماژول اصلی پروژه خود قراردهید. 


> `نکته:` دقت داشته باشید که **قابلیت آنی (realtime)**  چابک به طور پیش فرض **غیر فعال** است. برای فعال کردن مقدار قابلیت آنی (realtime)، کافی است مقدار پیش‌فرض آن را در فایل دانلود شده تغییر بدید. این قابلیت در[ پیام چابک](/android/chabok-messaging.html) و [پیام‌رسانی آنی](/android/event-handling.html) استفاده می‌شود.

اگر از کامپوننت‌های اندروید در <a href="https://developer.android.com/guide/components/processes-and-threads#Processes">پراسس دیگری</a> استفاده می‌کنید. حتما متد `setApplicationContext` را قبل از متد `configureEnvironment` فراخوانی کنید. در نهایت کلاس اپلیکیشنتان به شکل زیر خواهد بود: 

```java
public class MyAppClass extends Application {  
      @Override  
      public void onCreate() {
          super.onCreate();  
          AdpPushClient.setApplicationContext(this); // ضروری
          AdpPushClient.configureEnvironment(Environment.SANDBOX); // ضروری  
          AdpPushClient.setLogLevel(LogLevel.VERBOSE); // اختیاری
          AdpPushClient.setDefaultTracker("Ym3gy7"); // اختیاری
      }
}
```  


####   ۲.۳- مقداردهی اولیه آی‌او‌اس 

 مقداردهی اولیه در آی‌او‌اس به صورت زیر انجام می‌شود.

چابک برای راه‌اندازی نیاز به **مقداردهی اولیه** دارد.


۱- برای مقداردهی ابتدا از پنل خود بخش **تنظیمات> دسترسی و توکن‌ها> کتابخانه موبایل> راه‌اندازی هوشمند** فایل **Chabok.sandbox.plist**  یا  **Chabok.production.plist**  (بسته به محیطتان) را دانلود کنید.

![enter image description here](http://uupload.ir/files/hgt4_ios-configuration-file.png)

> `نکته:` برای غیر فعال کردن دریافت توکن پوش‌نوتیفیکیشن، کافیست مقدار پیش‌فرض آن را در فایل دانلود شده تغییر دهید.

<br>

۲- فایل دانلود شده را در **روت پروژه** خود قرار دهید:

![](http://uupload.ir/files/4818_root-of-project.png)
<br>

۳- در آخر متدهای زیر را فرخوانی کنید.

> `نکته` :‌ تمامی متدهایی که در این بخش بیان می‌شود باید به کلاس `AppDelegate` اضافه شده و متدهای چابک باید در `delegate` متد `didFinishLaunchingWithOptions` فراخوانی شوند.

{% tabs %}
{% tab OBJECTIVE-C %}
```objectivec
#import "AppDelegate.h"
#import <AdpPushClient/AdpPushClient.h>

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application
            didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
    
    [PushClientManager  resetBadge]; //Optional
    [PushClientManager.defaultManager addDelegate:self]; //Optional
    
    [PushClientManager.defaultManager configureEnvironment:Sandbox];
 
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
    
    PushClientManager.resetBadge() //Optional
    PushClientManager.default()?.addDelegate(self) //Optional
    
    PushClientManager.default()?.configureEnvironment(.Sandbox)
    
    return true
}
```
{% endtab %}
{% endtabs %}

> `نکته`: متد بالا برای محیط سندباکس است. در صورتی که حساب عملیاتی دارید کافیست فقط `Sandbox` را با ‍‍`Production` عوض کنید.



> `نکته`: برای درخواست حساب محیط **عملیاتی**، در بخش تنظیمات پنل، وارد بخش [**درخواست حساب عملیاتی**](https://sandbox.push.adpdigital.com/front/setting/accountRequest) شوید و درخواست خود را ثبت نمایید و پس از تایید و ساخت حساب عملیاتی فایل **Chabok.production.plist** را دنلود کنید و به جای فایل **Chabok.sandbox.plist** در روت پروژه خود قراردهید. 

>`نکته` : توجه داشته باشید هنگامی که **گواهی sandbox اپل** را در پنل تستی قرار می‌دهید، فقط امکان دریافت `Push Notification` در حالت `debug` وجود خواهد داشت. اما اگر **گواهی production اپل** را در محیط عملیاتی قرار دهید، زمانی `Push Notification` را دریافت خواهید کرد که اقدام به ساخت **ipa** از پروژه خود کرده و از طریق TestFlight یا Enterprise اپلیکیشن خود را نصب کنید.

جهت دسترسی به `delegate‌`های چابک باید متد `addDelegate` را همانند کد زیر فراخوانی کنید:

{% tabs %}
{% tab OBJECTIVE-C %}
```objectivec
[PushClientManager.defaultManager addDelegate:self];
```
{% endtab %}
{% tab SWIFT %}
```swift
PushClientManager.default()?.addDelegate(self)
```
{% endtab %}
{% endtabs %}

- متد `resetBadge`:

چابک به طور **پیش‌فرض** برای هر پیام در اپلیکیشنتان نشان (**Badge**) اعمال می‌کند. متد `resetBadge` برای خالی کردن و ریست Badge به کار می‌رود. شما با توجه به نیاز خود می‌توانید این متد را در جای خاصی از اپلیکیشنتان (مانند صندوق پیام‌ها) یا در حین باز شدن (launch) اپ خود فراخوانی کنید.

{% tabs %}
{% tab OBJECTIVE-C %}
```objectivec
[PushClientManager  resetBadge];
```
{% endtab %}
{% tab SWIFT %}
```swift
PushClientManager.resetBadge()
```
{% endtab %}
{% endtabs %}

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
> `نکته:` پروژه [Starter](https://github.com/chabok-io/chabok-starter-cordova) به شما کمک می‌کند بدون هیچ کد اضافه‌ای و فقط با اجرای آن، از پلتفرم چابک استفاده کنید. همچنین به کمک این پروژه با نحوه صحیح پیاده سازی متدهای چابک آشنا خواهید شد.
