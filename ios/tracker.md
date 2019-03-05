---
id: tracker
title: ترکر
layout: android
permalink: android/tracker.html
prev: push-notification.html
next: user-management.html
---

ترکر چابک کلیک و نصب  کمپین‌ها را شمارش می‌کند. همینطور با توجه به قابلیت [رصد رویدادها](/ios/tracker.html#۲۱-رصد-رویدادها-tracking-events) می‌توانید مدل‌های بازاریابی CPI و CPA را برای تبلیغات خود اجرا کنید. مزیت دیگر ترکر چابک [حذف و جلوگیری تقلب](/ios/tracker.html#۴-مکانیزم-ضد-تقلب-fraud-prevention) در کمپین‌های تبلیغاتی است.

 نگران راه‌اندازی هم نباشید این صفحه به طور کامل مراحل **پیاده‌سازی و استفاده از ترکر** را قدم به قدم مرور می‌کند.  


<br>

>‍‍`نکته:` در صورتی که از قبل **SDK** چابک را نصب کرده‌‌اید، از [**رصد رویدادها**](/ios/tracker.html#۲۱-رصد-رویدادها-tracking-events) شروع کنید.
 
### ۱. پیاده‌سازی (SDK Integration)
---

برای ایجاد حساب کاربری کافیست در وبسایت چابک وارد صفحه [شروع کنید](https://chabokpush.com/register.html) شوید و حساب شخصی خود را بسازید. پس از ایجاد حساب و ثبت اپلیکیشن خود، با مراجعه به بخش [تنظیمات پنل](https://sandbox.push.adpdigital.com/front/setting/access) پارامترهای اتصال به چابک که در مرحله [مقداردهی](/ios/tracker.html#ج--مقداردهی-initialize) مورد نیاز است، در دسترس خواهد بود.


#### ۱.۱. مراحل پیاده‌سازی 

برای راه‌اندازی SDK چابک **۴ مرحله** زیر را به ترتیب انجام ‌دهید:

[الف- افزودن کتابخانه](/ios/tracker.html#الف--افزودن-کتابخانه)

[ب- مقداردهی](/ios/tracker.html#ج--مقداردهی-initialize)

[ج- ثبت کاربر](/ios/tracker.html#د--ثبت-کاربر-register)

##### الف- افزودن کتابخانه

کتابخانه چابک از طریق **CocoaPods** در دسترس است، برای نصب آن خط زیر را به `Podfile` خود اضافه کنید:


```bash
target 'YourProject' do
  use_frameworks!

  pod 'ChabokPush'
  
end
```

سپس با روش زیر آن را نصب کنید:

```bash
$ pod install
```

> `نکته:` توجه داشته باشید که برای اطلاع از آخرین نسخه کتابخانه [این صفحه](/ios/release-note.html) را ببینید. همچنین توصیه می‌کنیم بخش [مدل نسخه‌گذاری در چابک](/ios/sdk-setup.html#مدل-نسخهگذاری-در-چابک-semantic-versioning) را مطالعه نمایید.

<br>

##### ج- مقداردهی (Initialize)

چابک برای راه‌اندازی نیاز به مقداردهی اولیه دارد. متد `registerApplication` چابک **باید** در کلاس `AppDelegate` در متد `didFinishLaunchingWithOptions` تحت هر شرایطی فراخوانی شود.

> `نکته` :‌ تمامی متدهایی که در این بخش بیان می‌شود باید به کلاس `AppDelegate` اضافه شده و متدهای چابک باید در `delegate` متد `didFinishLaunchingWithOptions` فراخوانی شوند.

کد زیر **تمام متدهایی** که باید مقداردهی شوند را در بر دارد:

```objectivec
//Objective-C

#import "AppDelegate.h"
#import <AdpPushClient/AdpPushClient.h>

@interface AppDelegate ()<PushClientManagerDelegate>
@property (nonatomic, strong) PushClientManager *manager;
@end

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application
            didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
    
    //YES connects to Sandbox environment
    //NO connects to Production environment
    [PushClientManager setDevelopment:YES];
    //Reset badge and clear notification when app launched.
    [PushClientManager  resetBadge];

	_manager = PushClientManager.defaultManager;
    [_manager addDelegate:self];
    
    //Initialize with credential keys
    BOOL state = [_manager
		                 registerApplication:@"APP_ID" //based on your environment
                         apiKey:@"API_KEY"             //based on your environment
                         userName:@"SDK_USERNAME"      //based on your environment
                         password:@"SDK_PASSWORD"];    //based on your environment
    
    if (state) {
        NSLog(@"Initialized");
    } else {
	    NSLog(@"Not initialized");
    }
    
    if ([_manager application:application didFinishLaunchingWithOptions:launchOptions]) {
        NSLog(@"Launched by tapping on notification");
    }
 
    return YES;
}

#pragma mark - Notification AppDelegation

- (void)application:(UIApplication *)application didFailToRegisterForRemoteNotificationsWithError:(NSError *)error{
    // Handle failure of get Device token from Apple APNS Server
    [_manager application:application didFailToRegisterForRemoteNotificationsWithError:error];
}

- (void)application:(UIApplication *)application didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken{
    // Handle receive Device Token From APNS Server
    [_manager application:application didRegisterForRemoteNotificationsWithDeviceToken:deviceToken];
}

- (void)application:(UIApplication *)application didRegisterUserNotificationSettings:(UIUserNotificationSettings *)notificationSettings{
    // Handle iOS 8 remote Notificaiton Settings
    [_manager application:application didRegisterUserNotificationSettings:notificationSettings];
}
@end
```

```swift
//Swift:

import UIKit
import AdpPushClient

@UIApplicationMain
class AppDelegate: UIResponder, UIApplicationDelegate, PushClientManagerDelegate {
    
    var window: UIWindow?
    let _manager = PushClientManager.default()
    
    func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplicationLaunchOptionsKey: Any]?) -> Bool {
        
        //true connects to Sandbox environment
        //false connects to Production environment
        PushClientManager.setDevelopment(true)
        //Reset badge and clear notification when app launched.
        PushClientManager.resetBadge()
        
        _manager?.addDelegate(self)
        
        //Initialize with credential keys
        let state = _manager?.registerApplication("APP_ID",					//based on your environment
                                                 apiKey: "API_KEY",     	//based on your environment
                                                 userName: "SDK_USERNAME",  //based on your environment
                                                 password: "SDK_PASSWORD")  //based on your environment
        
        if state == true {
            print("Initialized")
        } else {
            print("Not initialized")
        }
        
        if _manager?.application(application, didFinishLaunchingWithOptions: launchOptions) == true {
            print("Launched by tapping on notification")
        }
      
        return true
    }
    
    //MARK : Notification AppDelegation
    
    func application(_ application: UIApplication, didFailToRegisterForRemoteNotificationsWithError error: Error) {
        // Handle failure of get Device token from Apple APNS Server
        _manager?.application(application, didFailToRegisterForRemoteNotificationsWithError: error)
    }
    
    func application(_ application: UIApplication, didRegisterForRemoteNotificationsWithDeviceToken deviceToken: Data) {
        // Handle receive Device Token From APNS Server
        _manager?.application(application, didRegisterForRemoteNotificationsWithDeviceToken: deviceToken)
    }
    
    @available(iOS 8.0, *)
    func application(_ application: UIApplication, didRegister notificationSettings: UIUserNotificationSettings) {
        // Handle iOS 8 remote Notificaiton Settings
        _manager?.application(application, didRegister: notificationSettings)
    }
}
```

در این متد به جای پارامتر‌های `APP_ID/SENDER_ID`, `API_KEY(SDK_KEY)`, `SDK_USERNAME`, `SDK_PASSWORD` مقادیر مربوط به حساب چابک خود را وارد نمایید. نحوه ایجاد حساب در بخش [پیش‌نیازها](/android/required.html) توضیح داده شده است. در صورت داشتن حساب چابک هم می‌توانید این مقادیر را از [**پنل بخش تنظیمات قسمت دسترسی‌ و توکن‌ها**](/panel/settings.html#دسترسیها-و-توکنها) بردارید.

متد `setDevelopment` تعیین می‌کند که اپلیکیشن شما به محیط [آزمایشی (Sandbox)](https://sandbox.push.adpdigital.com) و یا [عملیاتی (Production) ](https://panel.push.adpdigital.com) چابک متصل شود. این موضوع بستگی به این دارد که حساب کاربری شما روی کدام محیط تعریف شده باشد. مقدار `true` به محیط آزمایشی و  مقدار`false` به محیط عملیاتی متصل می‌شود. در نظر داشته باشید، هر محیط به کلیدهای دسترسی (AppId, APIKey, Username و Password) خودش در متد `init` نیاز دارد. بنابراین در صورت تغییر مقدار `setDevelopment` کلید‌های دسترسی آن هم باید تغییر داده شود.



<br>

##### د- ثبت کاربر (Register Users)

یکی از مزیت‌های چابک امکان **معرفی** هر کاربر با یک شناسه منحصر به فرد است. این قابلیت به شما امکان می‌دهد دستگاه‌های کاربر را **مدیریت کنید** و سوابق جمع‌آوری شده را همانند یک سیستم مدیریت مشتریان (CRM) در اختیار داشته باشید.


 متد `register` عمل **اتصال** به سرور چابک را انجام می‌دهد، بنابراین باید **فقط یک بار** در طول اجرای اپلیکیشن (در کلاس application) فراخوانی شود: (برای اطلاعات بیشتر می‌توانید بخش [ثبت کاربر](/ios/sdk-setup.html#۴--ثبت-کاربر-register) را مطالعه کنید.) 

```objectivec
//Objective-C:

[_manager registerUser:@"USER_ID"];
```
```swift
//Swift:

_manager?.registerUser("USER_ID")
```

>` نکته:` ترکرها به طور معمول نصب را **اولین بازدید** حساب می‌کنند (مانند سرویس ادجاست)، اما مزیت ترکر چابک در شمارش نصب این است که شما می‌توانید علاوه بر مدل ادجاست نصب را **پس از ورود کاربر و احراز هویت او** در اپلیکیشنتان تعریف کنید. با این کار شما یک اقدام دیگری برای جلوگیری از تقلب در شمارش نصب انجام می‌دهید، به این دلیل که امضاهای کاربر، قبل و بعد از ثبت او (register) مطابقت داده می‌شوند و در صورت تایید به عنوان یک نصب سالم در نظر گرفته می‌شوند. 

به عنوان مثال اگر اپلیکیشن شما دارای صفحه **ورود** و **ثبت‌نام** می‌باشد، متد `register` را در صفحه **ورود** یا **ثبت‌نام** پس از **احراز هویت کاربر** و همچنین، پس از هر بار اجرای (در کلاس `Application` متد `onCreate`) اپلیکیشن فراخوانی کنید تا کاربر به سرور چابک متصل شود.

```objectivec
//Objective-C

- (BOOL)application:(UIApplication *)application
            didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
    
    ...
    
    if (_manager.userId) {
        [_manager registerUser:_manager.userId];
    } else {
        //If user is not registered verify the user and
        //call [_manager registerUser:@"USER_ID"]; method at login page

        //If you have guest users
        // should be called here (If you want to track installs on user's first app launch (just like Adjust))
        [_manager registerAsGuest];
    }
    
    return YES;
}
```

```swift
//Swift
func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplicationLaunchOptionsKey: Any]?) -> Bool {

    ...
    
    if let userId = _manager?.userId {
        _manager?.registerUser(userId)
    } else {
        //If user is not registered verify the user and
        //call manager?.registerUser("USER_ID") method at login page

        //If you have guest users
        // should be called here (If you want to track installs on user's first app launch (just like Adjust))
        _manager?.registerAsGuest()  
    }

    return true
}
```

##### کاربر مهمان

متد `registerAsGuest` در بالا، کاربر را به عنوان **کاربر مهمان** ثبت می‌کند. این متد به طور خودکار  یک تگ مهمان (CHABOK_GUEST) به کاربر اختصاص می‌دهد. 

با توجه به اینکه این متد در ابتدای هر بازدید فراخوانی می‌شود، برای شمارش نصب با **بازدید اول کاربر** می‌توانید از آن استفاده کنید (مانند سرویس ادجاست). 

> `نکته`: کاراکترهای ‍`#,+,*,\,/` و فاصله در `USER_ID` مجاز نیستند، همچنین طول این رشته نباید کمتر از ۳ و بیشتر از ۳۲ کاراکتر باشد.

<br>

#### ۲.۱. رصد رویدادها (Tracking Events)

رویدادها در واقع همان تعامل کاربر با اپلیکیشنتان است. از این رو آن‌ها را **رفتار** کاربر می‌نامیم. شما می‌توانید رفتار کاربر را در اپلیکیشن خود به طور **لحظه‌ای** رصد کنید. این امر به شما امکان می‌دهد تا **CPA های پیشرفته** برای کمپین‌هایتان تعریف کنید و نصب‌هایتان با تحقق اهدافی که برای کاربران تعیین کرده‌اید شمرده شوند. 


با کد زیر می‌توانید  رفتار کاربر (رویداد) را در چابک رصد کنید:  
  
```java  
JSONObject data = new JSONObject();  
data.put("currency", "EUR");  
data.put("revenue", 0.01)  
data.put("orderId", "{OrderId}");  
  
AdpPushClient.get().track("purchase", data);  
```
برای اطلاعات بیشتر مربوط به رصد رویدادها [اینجا](/ios/behavior-tracking.html) را مطالعه کنید.

<br>

#### ۳.۱. تست راه‌اندازی 

اگر عملیات ثبت‌ کاربر به درستی انجام شده باشد، اطلاعات کاربر در [پنل](https://sandbox.push.adpdigital.com/front/users/subscribers/list)  چابک قسمت **کاربران** قابل مشاهده خواهد بود.  

البته محیط آزمایشی فقط برای تست و آشنایی با امکانات است و دارای محدودیت سقف کاربر می‌باشد. بنابراین برای اپلیکیشن‌های تجاری و اپ‌استور توصیه می‌کنیم از حساب عملیاتی که این سقف را ندارد، استفاده کنید.

#### ۴.۱. انتشار اپلیکیشن در استورها

به طور کلی چابک دارای دو نوع حساب رایگان (محیط آزمایشی) و عملیاتی  است. در صورتی که روی حساب رایگان هستید می‌توانید روی همان حساب نسخه جدید را منتشر کنید.

 داده‌های شما از حساب رایگان به عملیاتی به هیج وجه منتقل نمی‌شوند و برای انتقال باید آپدیت فوری از اپلیکیشن خود بدهید و تمام کاربران را به نسخه جدید بیاورید. برای همین در صورتی هم که حساب عملیاتی دارید  باید حتما **روی محیط عملیاتی** نسخه جدید اپلیکیشن خود را در استورها منتشر کنید.

<br><br>

### ۲. ترک نصب‌ها (Tracking Installs)
---
 
پس از اینکه راه‌اندازی SDK چابک را در اپلیکیشنتان انجام دادید می‌توانید برای کمپین‌های نصب خود ترکر فعال کنید. 

#### ۱.۲. ایجاد لینک ترکر 

برای ایجاد لینک ترکر فقط کافیست وارد صفحه **ترکر** پنل شوید و **ترکر جدید** بسازید.

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

### ۳. کال‌بک‌های ترکر (Callbacks)
---

در صورتی هم که می‌خواهید داده‌های ترکر را در سیستم‌های دیگر از جمله سرورهای خود دریافت کنید می‌توانید از کال‌بک استفاده کنید. این کار را می‌توانید از پنل هنگام ایجاد ترکر جدید انجام دهید. به این ترتیب لینکی که می‌خواهید زمان رخ دادن رویداد (کلیک یا نصب) فرخوانی شود را وارد می‌کنید. 

همچنین شما می‌توانید در کال‌بک خود از پارامترهایی برای اطلاعات بیشتر از مبدا رویداد کسب کنید. برای مشاهده این پارامترها و نمونه لینک کال‌بک می‌توانید به مستندات [پنل](/panel/tracker.html#کالبک) مراجعه کنید.

<br><br>

### ۴. مکانیزم ضد تقلب (Fraud Prevention)
---

ترکر چابک منابع و کانال‌هایی است که داده‌های غیر واقعی را وارد سیستم شما می‌کند تشخیص می‌دهد. SDK چابک به گونه‌ای پیاده‌سازی شده است که امکان تقلب و نصب غیر واقعی در روش‌های مبتنی بر نصب و رفتار (CPA و CPI) را به طور کامل از بین می‌برد و علاوه بر آن، به هیج وجه فراخوانی و رصد رویداد‌های چابک قابل دستکاری نیستند. 

مواردی که SDK رد می‌کند عبارتند از:

- **IP Filtering**:

این روش IP کاربر را در زمان کلیک و نصب برای تطبیق مقایسه می‌کند و همینطور از نصب‌های متعدد با یک IP جلوگیری می‌نماید.

- **User Verification**:

با توجه به ساختار کاربر محور بودن سیستم چابک، این روش تمام اطلاعات کاربر را در کلیک و نصب مقایسه می‌کند و اطمینان می‌یابد که کاربر جذب شده واقعی و یکتا است.

- **SDK Spoofing**:

یکی از راه‌های تقلب است که نصب‌ها را روی دستگاه‌های واقعی شبیه‌سازی می‌کند و آن را جزو نصب‌های کمپین محاسبه می‌نماید. این کار را معمولا از اپلیکیشن‌های دیگر روی دستگاه انجام‌ می‌دهند و نصب‌های بی‌شمار غیر واقعی را وارد کمپین‌ شما می‌کند.

- **SDK Signature**:

این روش روی SDK امضای خاصی را می‌گذارد تا هنگام کلیک دریافت شود و پس از نصب با اپلیکیشن شما تطبیق داده شود و از صحت نصب اطمینان یابد.

- **Server to Server Verification**:

این روش اطلاعات کاربر را هنگام کلیک جمع‌آوری می‌کند و با اطلاعاتی که سرور شما در نصب دریافت می‌کند اعتبارسنجی می‌نماید و در صورت عدم تطابق، نصب را رد می‌کند.

- **TTI**:

این روش همان زمان قابل قبول بین کلیک و نصب است. چابک به طور خودکار فاصله بسیار کوتاه را رد می‌کند و همینطور در صورتی که از محدوده‌ای که شما تعیین کرده‌اید بیشتر شود باز نصب شمرده نخواهد شد.

- **Two-Phase Authentication**:

این روش احراز هویت از واقعی بودن کاربر در هنگام نصب اطمینان می‌یابد. در چابک این کار از طریق ارسال پیام کوتاه انجام می‌شود.

<br><br>

### ۵. آشنایی با برخی مفاهیم ترکر
---

- **اتریبیوشن**: نصب‌هایی که از طریق کمپین‌های تبلیغاتی شمرده می‌شوند.

- **بازدید**: هر بار که اپلیکیشن باز شود یک بازدید محاسبه می‌شود.

- **ترکر**: ابزار شمارش و رصد کمپین‌های تبلیغاتی را ترکر می‌نامند.

- **رد شده**: نصب‌ها و کلیک‌هایی که غیر واقعی تشخیص داده می‌شوند و در شمارش محاسبه نمی‌شوند.

- **رویداد**: هرگونه تعامل کاربر با اپلیکیشن، یک رویداد در نظر گرفته می‌شود. 

- **نصب**: اولین بازدید هر کاربر نصب به حساب می‌آید.
