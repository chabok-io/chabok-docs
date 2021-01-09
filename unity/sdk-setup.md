---
id: sdk-setup
title: راه‌اندازی
layout: unity
permalink: unity/sdk-setup.html
next: custom-data.html
---

پس از طی کردن مراحل صفحه [پیش‌نیازها](/unity/required.html)، می‌توانید **راه‌اندازی SDK چابک** را شروع کنید. در ابتدا کتابخانه چابک را [نصب کنید](/unity/sdk-setup.html#۱--نصب-پکیج). پس از آن، [مقداردهی و راه‌اندازی](/unity/sdk-setup.html#۲--مقداردهی-اولیه-initialize) کتابخانه چابک را در اپلیکیشنتان انجام دهید و برای شناخت کاربر توسط چابک، مرحله [ثبت کاربر](/unity/sdk-setup.html#۳--ثبت-کاربر-register) را حتما پشت سر بگذارید.

برای انجام موفق این کار باید تمام مراحل زیر را به ترتیب انجام دهید:

[ ۱- نصب پکیج](/unity/sdk-setup.html#۱--نصب-پکیج)  
  
[۲- مقداردهی اولیه (Initialize)](/unity/sdk-setup.html#۲--مقداردهی-اولیه-initialize)  
  
[ ۳- ثبت کاربر](/unity/sdk-setup.html#۳--ثبت-کاربر)  

[ ۴- تست پیاده‌سازی](/unity/sdk-setup.html#۴--تست-پیادهسازی)  

<Br>

### ۱- نصب پکیج
---

برای نصب کتابخانه کافیست تا این [پکیج](https://github.com/chabok-io/chabok-starter-unity/blob/master/ChabokPush.unitypackage) را دریافت کنید و پس از باز نمودن فایل روی دکمه **Import** کلیک کنید.

<div style="text-align: center ;"><img src="https://uupload.ir/files/4f9u_chabok_package.png" class="img-fluid" style="
    height: 500px;
"></div> 

<br>

 > `نکته`:در صورت وجود **External Dependency Manager** در پروژه خود تیک آن را بردارید. 

 > `نکته`:با import کردن پکیج چابک تمام مراحل افزودن و نصب **SDK چابک** به صورت **خودکار** انجام می شود در صورت انجام نشدن, مراحل [نصب](/chabok-docs/unity/sdk-setup-manual.html) را طی کنید.  


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
