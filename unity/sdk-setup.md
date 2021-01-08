---
id: sdk-setup
title: راه‌اندازی
layout: unity
permalink: unity/sdk-setup.html
next: custom-data.html
---

پس از طی کردن مراحل صفحه [پیش‌نیازها](/unity/required.html)، می‌توانید **راه‌اندازی SDK چابک** را شروع کنید. در ابتدا کتابخانه چابک را [نصب کنید](/unity/sdk-setup.html#۱--نصب-کتابخانه). پس از آن، [مقداردهی و راه‌اندازی](/unity/sdk-setup.html#۲--مقداردهی-اولیه-initialize) کتابخانه چابک را در اپلیکیشنتان انجام دهید و برای شناخت کاربر توسط چابک، مرحله [ثبت کاربر](/unity/sdk-setup.html#۳--ثبت-کاربر-register) را حتما پشت سر بگذارید.

برای انجام موفق این کار باید تمام مراحل زیر را به ترتیب انجام دهید:

[ ۱- نصب کتابخانه](/android/sdk-setup.html#۱--نصب-پکیج)  
  
[۲- مقداردهی اولیه (Initialize)](/android/sdk-setup.html#۲--مقداردهی-اولیه-initialize)  
  
[ ۳- ثبت کاربر](/android/sdk-setup.html#۳--ثبت-کاربر)  

[ ۴- تست پیاده‌سازی](/android/sdk-setup.html#۴--تست-پیادهسازی)  

<Br>

### ۱- نصب پکیج
---

برای نصب کتابخانه کافیست تا این [پکیج](https://github.com/chabok-io/chabok-starter-unity/blob/master/ChabokPush.unitypackage) را دریافت کنید و پس از باز نمودن فایل روی دکمه **Import** کلیک کنید.

<div style="text-align: center ;"><img src="https://uupload.ir/files/4f9u_chabok_package.png" class="img-fluid" style="
    height: 500px;
"></div> 

<br>

 > `نکته`:در صورت وجود **External Dependency Manager** در پروژه خود تیک آن را بردارید. 
 
 
 <br>

 > `نکته`:با import کردن پکیج چابک تمام مراحل افزودن و نصب **SDK چابک** به صورت **خودکار** انجام می شود در صورت انجام نشدن, مراحل نصب را طی کنید.  


### ۱) نصب اندروید
---
برای دریافت کتابخانه چابک دستورات زیر را به فایل `baseProjectTemplate.gradle` اصلی پروژه اضافه کنید (این فایل عموما در مسیر **Assets/Plugins/Android/baseProjectTemplate.gradle** وجود دارد):

```groovy  
buildscript {
    repositories {
        google()
        jcenter()
        maven {
            url "https://plugins.gradle.org/m2/" 
        }
    }
    
    dependencies {
        classpath 'com.google.gms:google-services:4.3.2'
    }
}
```

دستور زیر را در انتهای فایل `mainTemplate.gradle` اضافه کنید:

```groovy  
apply plugin: 'com.google.gms.google-services'
```
#### نصب کتابخانه استاندارد چابک
برای استفاده از کتابخانه استاندارد چابک از کتابخانه `chabok-lib` که در زیر به آن اشاره‌ شده است، استفاده کنید.   
فایل `mainTemplate.gradle` در ماژول اپلیکیشن را باز کرده و در بخش `dependencies` خطوط زیر را اضافه نمایید:  
  
```groovy
dependencies {
    implementation 'com.adpdigital.push:chabok-lib:3.5.0'

    implementation 'me.leolin:ShortcutBadger:1.1.22@aar'  
    implementation 'com.google.firebase:firebase-messaging:17.1.0'
    implementation 'com.android.installreferrer:installreferrer:1.0'
} 
```

>`نکته:` 
 چابک در حال حاضر از **FCM** بهره می‌برد؛ در عین حال به خاطر قابلیت **backward compatibility** خود از کاربرانی که از نسخه‌های پایین‌تر اندروید استفاده می‌کنند یا از **GCM** به **FCM** مهاجرت نکرده‌اند، **پشتیبانی** می‌کند. توجه داشته باشید که موضوع بسته شدن **GCM** برای سرورهای خودش است و در کلاینت‌های اندروید چابک، دریافت توکن پوش همچنان امکان‌پذیر است.

#### نکات ضروری نصب کتابخانه   
 - تمامی گوشی‌های با **اندروید ۴ یا بالاتر** قابلیت استفاده از کتابخانه چابک را دارند.    

 > `نکته`: برای گوشی‌هایی مانند شیاومی و هواوی که گزینه تنظیمات مربوط به برنامه‌های حفاظت شده دارند (ProtectedApps)، کاربر باید برنامه شما را در لیست برنامه‌های حفاظت شده، فعال کند تا دریافت پوش‌نوتیفیکیشن در همه حالت‌ها امکان‌پذیر شود. برای اطلاعات بیشتر می‌توانید بخش [عیب‌یابی](/android/troubleshoot.html) را مطالعه نمایید.
   
 -	فایل `google-services.json` را از پنل فایربیس دانلود کنید و در پوشه ماژول اصلی اپلیکیشن خود قرار دهید.
 برای دانلود این فایل، مراحل زیر را طی کنید:

  ۱. به <a href="https://console.firebase.google.com/">پنل فایربیس</a> خود وارد شوید و پروژه را باز کنید.
  
  ۲. بر روی آیکون تنظیمات کلیک کنید و گزینه  **Project settings**  را انتخاب نمایید.
  
   ۳. از لیست اپلیکیشن‌ها، اپلیکیشن مورد نظر خود را انتخاب کنید.
   
   ۴. بر روی `google-services.json` کلیک کنید و آن را دانلود کنید.

 - اگر از <a href="https://developer.android.com/jetpack/androidx/">AndroidX</a> استفاده می‌کنید قطعه کد زیر را در فایل `gradleTemplate.properties` پروژه خود اضافه کنید:

```groovy
android.useAndroidX=true
android.enableJetifier=true
```

- کتابخانه چابک از فایربیس نسخه ۱۷.۱.۰ و بالاتر پشتیبانی می‌کند. بنابراین اگر از فایربیس استفاده می‌کنید نسخه آن را به حداقل نسخه‌ی ذکر شده **(۱۷.۱.۰)** ارتقاع دهید. 

>`نکته:`با راه‌اندازی کتابخانه چابک قادر به دریافت پوش نوتیفیکیشن خواهید بود و نیازی به پیاده‌سازی سرویس فایبربیس برای دریافت پوش نوتیفیکیشن نیست.


>`نکته`: حذف توکن به کمک متد `deleteInstanceId` [فایربیس](https://firebase.google.com/docs/reference/android/com/google/firebase/iid/FirebaseInstanceId) در نسخه‌های ۳.۲.۰ به پایین چابک، می‌تواند باعث نامعتبر شدن توکن پوش شود و روی آمار حذف تاثیر بگذارد، پس استفاده از آن توصیه نمی‌شود.
و حذف توکن در نسخه‌ ۳.۲.۰ به بالا چابک به طور خودکار هندل می‌شود و مشکلی برای توکن پیش نمی‌آورد.



 - دقت داشته باشید که همیشه از جدیدترین نسخه **ShortcutBadger** استفاده کنید. برای اطلاع از آخرین نسخه می‌توانید به [این لینک](https://github.com/leolin310148/ShortcutBadger) مراجعه نمایید. هم‌چنین با توجه به حجم زیاد مجوزهای نمایش نشان (**Badge**) روی آیکون اپ،‌ می‌توانید از [این قسمت](/android/features.html#برداشتن-مجوزهای-غیر-ضروری-برای-نمایش-نشان-badge-روی-آیکون) هر کدام از آن‌ها را با اختیار خودتان بردارید.     
- به علت محدودیت‌‌های **اندروید ۸ به بالا** دقت کنید حتما مطابق جدول زیر تنظیمات نسخه‌ها را به درستی انجام دهید. در صورت رعایت نکردن نسخه‌های ذکر شده در جدول زیر هنگامی که اپلیکیشنتان **kill** شده باشد به هنگام دریافت نوتیفیکیشن با خطا مواجه خواهد شد. 

<table dir="ltr">  
    <thead>  <tr align="center">  
        <th>buildTools</th>  
        <th>compileSdk</th>  
        <th>targetSdk</th>  
        <th>googlePlayServices</th>  
    </tr>  
    </thead>  
    <tbody>  
    <tr align="center">  
        <td>25.x.x</td>  
        <td>25</td>  
        <td>&gt;= 23</td>  
        <td>&gt;= 9.6.0</td>  
    </tr>  
    <tr align="center">  
        <td>26.x.x</td>  
        <td>26</td>  
        <td>&gt;= 23</td>  
        <td>&gt;= 9.6.0</td>  
    </tr>  
    <tr align="center">  
        <td>27.x.x</td>  
        <td>27</td>  
        <td>&gt;= 23</td>  
        <td>&gt;= 10.2.1</td>  
    </tr>  
    </tbody>  
</table>  
 - توجه داشته باشید که برای `VERSION` آخرین نسخه کتابخانه را از [این صفحه](/android/release-note.html) مشاهده کنید و سپس آن را وارد نمایید، همچنین توصیه می‌شود بخش [مدل نسخه‌گذاری در چابک](/android/sdk-setup.html#مدل-نسخهگذاری-در-چابک-semantic-versioning) را مطالعه نمایید. 
 
<br><br>

### 2) نصب iOS
---
 > `نکته`:تمام مراحل افزودن Podfile و نصب SDK iOS  چابک به **صورت خودکار** انجام می شود در صورت انجام نشدن, مراحل نصب را طی کنید.  

کتابخانه چابک از طریق CocoaPods در دسترس است، برای نصب خط زیر را به `Podfile` خود اضافه کنید:


```bash
target 'YourProject' do
  use_frameworks!

  pod 'ChabokPush', '~> 2.3.0'
  
end
```

سپس با روش زیر آن را نصب کنید:

```bash
$ pod install --repo-update
```
پس از اجرای دستورات بالا اگر با خطایی رو به رو شدید، دستور زیر را وارد کنید، سپس `pod install` را دوباره اجرا کنید.

```bash
$ pod update
```
حالا برای اطمینان از نصب، پروژه را در `xcode` باز کنید ، اگر header فایل چابک را مشاهده کنید، افزودن کتابخانه موفقیت آمیز بوده است.



### ۲- مقداردهی اولیه (Initialize)

### ۱) اندروید

کد‌های زیر را در کلاس اپلیکیشن خود فراخوانی کنید.

```java
public class MyAppClass extends Application {

	AdpPushClient adpPush = null;
	
    @Override
    public void onCreate() {
         super.onCreate();

         AdpPushClient.setLogLevel(LogLevel.VERBOSE);
		 AdpPushClient.setApplicationContext(this);
		
		 AdpPushClient.init(getApplicationContext(),
               ChabokActivity.class,
               "APP_ID",
               "API_KEY",
               "SDK_USERNAME",
               "SDK_PASSWORD");
				  
		 AdpPushClient.get().setEnableRealtime(false);
    }
}
```

### ۲)  iOS

متدهای زیر را فرخوانی کنید.

> `نکته` :‌ تمامی متدهایی که در این بخش بیان می‌شود باید به کلاس `AppDelegate` اضافه شده و متدهای چابک باید در `delegate` متد `didFinishLaunchingWithOptions` فراخوانی شوند.

> `نکته` :‌ تمامی متدهای این بخش به صورت خودکار به پروژه import می شود و نیاز به اضافه کردن مجدد نیست.
تنها تغییراتی که باید انجام شود اضافه نمودن پارامتر‌های حساب چابک پروژه می باشد.

```objectivec
#import "UnityAppController.h"
#import <AdpPushClient/AdpPushClient.h>

@interface AppDelegate : UnityAppController
@end

@interface AppDelegate () <PushClientManagerDelegate>
@end

@implementation AppDelegate

-(void) startUnity: (UIApplication*) application {
   [super startUnity: application];
}

- (BOOL)application:(UIApplication *)application
            didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {

    [PushClientManager.defaultManager setLogLevel:ChabokLogLevelVerbose];
    
    [PushClientManager.defaultManager initWithAppId:@"APP_ID"
                                             apiKey:@"API_KEY"
                                           username:@"SDK_USERNAME"
                                           password:@"SDK_PASSWORD"];
    
    [PushClientManager  resetBadge]; //Optional
    [PushClientManager.defaultManager addDelegate:self]; //Optional
    
    [PushClientManager.defaultManager setEnableRealtime:NO];

    return [super application:application 
    		didFinishLaunchingWithOptions:launchOptions];
}

@end

IMPL_APP_CONTROLLER_SUBCLASS( AppDelegate )
```

<br>


> `نکته` :‌ در متد init در اندروید و initWithAppId در iOS به جای پارامتر‌های `APP_ID`, `API_KEY`, `SDK_USERNAME`, `SDK_PASSWORD` مقادیر مربوط به حساب چابک خود را وارد نمایید. نحوه ایجاد حساب در بخش [پیش‌نیازها](/unity/required.html) توضیح داده شده است. در صورت داشتن حساب چابک هم می‌توانید این مقادیر را از [**پنل بخش تنظیمات قسمت دسترسی‌ و توکن‌ها**](/panel/settings.html#دسترسیها-و-توکنها) بردارید.


> متد `setDevelopment` تعیین می‌کند که اپلیکیشن شما به محیط [آزمایشی (Sandbox)](https://sandbox.push.adpdigital.com) و یا [عملیاتی (Production) ](https://panel.push.adpdigital.com) چابک متصل شود. این موضوع بستگی به این دارد که حساب کاربری شما روی کدام محیط تعریف شده باشد.
 مقدار `true` به محیط آزمایشی و  مقدار`false` به محیط عملیاتی متصل می‌شود. در نظر داشته باشید، هر محیط به کلیدهای دسترسی (AppId, APIKey, Username و Password) خودش در متد `init` نیاز دارد. بنابراین در صورت تغییر مقدار `setDevelopment` کلید‌های دسترسی آن هم باید تغییر داده شود.

<br>

### ۳) اسکریپت C#

کدهای زیر را در کلاس اسکریپت خود وارد کنید.

```csharp
    ChabokPush chabokPush;

    void Start() {
		chabokPush = ChabokPush.GetInstance();
	 }
```

### ۳- ثبت کاربر
---
یکی از مزیت‌های چابک نسبت به درگاه‌های ارسال پوش‌نوتیفیکیشن، امکان **معرفی** هر کاربر با یک شناسه منحصر به فرد است. این قابلیت به شما امکان می‌دهد دستگاه‌های کاربر را **مدیریت کنید** و سوابق جمع‌آوری شده را همانند یک سیستم مدیریت مشتریان (CRM) در اختیار داشته باشید.       
این شناسه می‌تواند برای **دستگاه‌های متعدد یک کاربر** استفاده شود. شناسه کاربر می‌تواند هر فیلد با ارزش و معنا‌دار برای کسب و کار شما باشد که کاربر خود را با آن شناسایی می‌کنید. **شماره موبایل**، **کدملی**، **شماره‌حساب**، **ایمیل** و یا حتی **شناسه دیتابیس‌تان** مثال‌هایی از شناسه‌های کاربری مناسب در موارد واقعی هستند. ارسال پیام‌ به کاربران توسط همین شناسه‌ها و بدون استفاده از توکن یا شناسه گوشی، به سادگی امکان پذیر خواهد بود.      
 
#### ورود به حساب کاربری (login)
متد لاگین تنها زمانی فراخوانی شود که کاربر در اپلیکیشن لاگین یا ثبت‌نام می‌کند. نیازی به فراخوانی این متد در هر بار اجرای اپلیکیشن نیست.


<p>
فقط شناسه کاربر را گرفته و کاربر را با آن شناسه بر روی سرور چابک ثبت‌ نام می‌کند.
</p>

```csharp
chabokPush.Login("User Id");
```

>`نکته:` مقدار `USER_ID` می‌تواند **بین ۳ تا ۶۴** کاراکتر باشد. زبان فاسی، کاراکترهای `#,+,*,\,/` و فاصله هم در آن **مجاز نیستند**.

>`نکته امنیتی:` مقدار `USER_ID` را هرگز به صورت خام در `SharedPreferences` ذخیره نکنید، چون مقدار این شناسه معنادار است و می‌توان با آن، کاربر را روی چابک ثبت‌نام کرد. همینطور می‌توانید قبل از عملیات ثبت با استفاده از شماره گوشی از معتبر بودن کاربر (verification) [اطمینان یابید](/android/verification.html)، سپس شناسه او را ثبت نمایید.


#### خروج از حساب کاربری (logout)

در صورتی که کاربر از حساب کاربری خود خارج شد، با فراخوانی متد زیر می‌توانید کاربر را همچنان با یک تگ مهمان در سیستم خود داشته باشید و تعاملتان را با او ادامه دهید.

```csharp
chabokPush.Logout()
```

<br>

### ۴- تست پیاده‌سازی
---
برای اطمینان از موفقیت‌آمیز بودن راه‌اندازی لطفا تست‌های زیر را انجام دهید.

#### تست SDK

##### آیا پس از راه‌اندازی، دستگاه شما به پنل اضافه شده است؟
در منوی **کاربران** می‌توانید دستگاه‌های موجود را همراه با جزئیات مشاهده کنید. **پس از بازدید اول** از اپلیکیشن اطلاعات دستگاه خود را در پنل با دقت **مطابقت دهید**.

> `نکته:` دقت داشته باشید که **آخرین نسخه SDK** را دریافت کنید و موارد **لیست تغییرات** را مطالعه کنید.

<br>

![](http://uupload.ir/files/w2il_sdk-test.png)

<br>

#### تست login کاربران

##### ۱- آیا وضعیت کاربران درست ثبت شده است؟ (لاگین، مهمان، حذف کرده/نکرده)

در صورتی که در اپلیکیشن بخش لاگین دارید، ( [پیاده‌سازی](/android/sdk-setup.html#%D9%88%D8%B1%D9%88%D8%AF-%D8%A8%D9%87-%D8%AD%D8%B3%D8%A7%D8%A8-%DA%A9%D8%A7%D8%B1%D8%A8%D8%B1%DB%8C-login) آن را از چابک کرده‌اید) می‌توانید در فیلتر سگمنت جدید  گزینه **وضعیت کاربر** را انتخاب کنید تا متوجه شوید کاربر در چه وضعیتی (لاگین، مهمان، حذف کرده و حذف نکرده)  قرار دارد.

<br>

![](http://uupload.ir/files/ud1r_user-status.png)

<br>

##### ۲- آیا پنل به درستی کاربران را در صورت خروج از اپلیکیشن (logout) به کاربر مهمان تبدیل می‌کند؟
وقتی کاربران بر روی گزینه logout در اپلیکیشن کلیک می‌کنند و از اپ خارج می‌شوند، اطلاعاتشان در چابک ذخیره می‌شود و یک شناسه دیگری به هر کاربر خارج شده اختصاص می‌دهد تا وقتی مجدد وارد اپلیکیشن شود شناسه کاربری او تغییر کند. این کاربران در بخش سگمنت قابل مشاهده‌اند.

<br>

![enter image description here](http://uupload.ir/files/h13x_login-vs-guest.png)
<br><br>



> `نکته:`  پروژه  [Starter](https://github.com/chabok-io/chabok-starter-unity)  به شما کمک می‌کند بدون هیچ کد اضافه‌ای و فقط با اجرای آن، از پلتفرم چابک استفاده کنید. همچنین به کمک این پروژه با نحوه صحیح پیاده سازی متدهای چابک آشنا خواهید شد.
