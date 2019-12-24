---
id: sdk-setup
title: راه‌اندازی
layout: ios
permalink: ios/sdk-setup-old-version.html
prev: required.html
next: tracker.html
---

> `نکته:` مستندات پیاده‌سازی زیر مربوط به **نسخه‌های پایین ۲** کتابخانه چابک است. در صورتی که می‌خواهید نسخه خود را ارتقا دهید، حتما [مستندات مهاجرت](/ios/upgrade-chabok-to-2-0-0.html) به نسخه ۲ چابک را مطالعه کنید.

پس از طی کردن مراحل صفحه [پیش‌نیازها](/ios/required.html)، می‌توانید **راه‌اندازی SDK چابک** را شروع کنید. در ابتدا شما باید کتابخانه چابک را [نصب کنید](/ios/sdk-setup.html#۱--نصب-کتابخانه)، سپس [مقداردهی و راه‌اندازی](/ios/sdk-setup.html#۲--مقداردهی-اولیه-initialize) کتابخانه چابک را در اپلیکیشنتان انجام دهید و در آخر برای شناخت کاربر توسط چابک، مرحله [ثبت کاربر](/ios/sdk-setup.html#۳--ثبت-کاربر-register) را حتما پشت سر بگذارید.

[۱- نصب کتابخانه](/ios/sdk-setup.html#۱--نصب-کتابخانه)

[۲- مقداردهی اولیه (Initialize)](/ios/sdk-setup.html#۲--مقداردهی-اولیه-initialize)

[۳- ثبت کاربر (Register)](/ios/sdk-setup.html#۳--ثبت-کاربر-register)

<Br>

### ۱- نصب کتابخانه

کتابخانه چابک از طریق CocoaPods در دسترس است، برای نصب خط زیر را به `Podfile` خود اضافه کنید:


```bash
target 'YourProject' do
  use_frameworks!

  pod 'ChabokPush', '~> 1.20.1'
  
end
```

سپس با روش زیر آن را نصب کنید:

```bash
$ pod install
```
پس از اجرای دستورات بالا اگر با خطایی رو به رو شدید، دستور زیر را وارد کنید، سپس `pod install` را دوباره اجرا کنید.

```bash
$ pod update
```
حالا برای اطمینان از نصب، پروژه را در `xcode` باز کنید ، اگر header فایل چابک را مشاهده کنید، افزودن کتابخانه موفقیت آمیز بوده است.


#### نصب دستی کتابخانه 

برای دسترسی به کتابخانه چابک هم می‌توانید وارد [این صفحه](https://github.com/chabok-io/chabok-client-ios) شوید. برای نصب کتابخانه، استفاده از این روش را **توصیه نمی‌کنیم** زیرا شما از به روز رسانی‌ نسخه‌های چابک مطلع نمی‌شوید.

#### مدل نسخه‌گذاری در چابک (Semantic Versioning)

چابک از مدل نسخه‌گذاری `MAJOR`.`MINOR`.`PATCH` استفاده می‌کند. همه تغییرات نسخه‌ها بلافاصله پس از انتشارشان به صورت موردی در صفحه **لیست  تغییرات** برای اطلاع شما اضافه می‌شوند. برای همین توصیه می‌کنیم [این صفحه](/ios/release-note.html) را حتما مطالعه نمایید. این موارد برای هر نسخه در دو بخش [**ارتقا** (در صورت وجود ارتقا)](/ios/release-note.html#ارتقا) و [**تغییرات**](/ios/release-note.html#تغییرات) برای شما نمایش داده شده‌ است.

- `Patch:` تغییرات در این سطح شامل **Bug Fix** و **قابلیت‌های بسیار کوچک** می‌باشد. به روز رسانی به این نسخه‌ها نیاز به تغییری در کد ندارد. برای آگاهی از آن‌ها، باید بخش [**تغییرات**](/ios/release-note.html#تغییرات) را مطالعه کنید. به عنوان مثال به‌ روز رسانی کتابخانه چابک از نسخه `1.17.0` به نسخه `1.17.1` مربوط به این سطح می‌شود.
- `Minor:` تغییرات در این سطح شامل **قابلیت‌های بزرگتر** و **تغییر در کارکرد (Functionality) کتابخانه** می‌شود. در به روز رسانی به این نسخه‌ها حتما باید بخش [**ارتقا**](/ios/release-note.html#ارتقا) و [تغییرات](/ios/release-note.html#تغییرات) صفحه لیست تغییرات را با دقت مطالعه کنید. در صورت بروز هر گونه مشکل در نتیجه رعایت نکردن نکات بخش **ارتقا** و **تغییرات** در به روز رسانی به نسخه‌های **Minor**، تیم چابک مسئولیتی را نمی‌پذیرد. توصیه می‌کنیم که هر سه تا شش ماه اقدام به بررسی نسخه‌های **Minor** نمایید. به عنوان مثال به‌ روز رسانی کتابخانه چابک از نسخه `1.17.1` به نسخه `1.18.0` مربوط به این سطح می‌شود.
- `Major:` این سطح از تغییرات مخصوص **بازنویسی** و یا **تغییرات اساسی** در کتابخانه چابک است. در به روز رسانی به این نسخه‌ها حتما باید بخش [**ارتقا**](/ios/release-note.html#ارتقا) و [**تغییرات**](/ios/release-note.html#تغییرات) تغییرات صفحه لیست تغییرات را با دقت مطالعه کنید. در صورت بروز هر گونه مشکل در نتیجه رعایت نکردن نکات بخش **ارتقا** و **تغییرات** در به روز رسانی به نسخه‌های **Major**، تیم چابک مسئولیتی را نمی‌پذیرد. بنابراین توصیه می‌کنیم که هر یک سال اقدام به بررسی نسخه‌های **Major** نمایید. به عنوان مثال به‌روزرسانی کتابخانه چابک از نسخه `0.9.0` به نسخه `1.18.0` مربوط به این سطح می‌شود.

> `نکته:` توصیه می‌کنیم برای دریافت آخرین نسخه **Bug Fix**ها از کاراکتر + (wildcard) استفاده نمایید تا به صورت خودکار نسخه‌های patch بیاید. 

<Br>

### ۲- مقداردهی اولیه (Initialize)

چابک برای راه‌اندازی نیاز به مقداردهی اولیه دارد. متد `registerApplication` چابک **باید** در کلاس `AppDelegate` در متد `didFinishLaunchingWithOptions` تحت هر شرایطی فراخوانی شود.

> `نکته` :‌ تمامی متدهایی که در این بخش بیان می‌شود باید به کلاس `AppDelegate` اضافه شده و متدهای چابک باید در `delegate` متد `didFinishLaunchingWithOptions` فراخوانی شوند.

کد زیر **تمام متدهایی** که باید مقداردهی شوند را در بر دارد:

{% tabs %}
{% tab OBJECTIVE-C %}
```objectivec
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
{% endtab %}
{% tab SWIFT %}
```swift
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
{% endtab %}
{% endtabs %}

#### نکات ضروری مقداردهی متدها

- متد `setDevelopment`:

متد `setDevelopment` مشخص می‌کند که اپلیکیشن شما به محیط [آزمایشی (Sandbox)](https://sandbox.push.adpdigital.com) و یا [عملیاتی (production)](https://panel.push.adpdigital.com) چابک متصل شود. این موضوع بستگی به این دارد که حساب کاربری شما روی کدام محیط تعریف شده باشد. مقدار `true` یا `YES` به محیط آزمایشی و مقدار`false` یا `NO` به محیط عملیاتی متصل می‌شود. در نظر داشته باشید، هر محیط به کلیدهای دسترسی (`appId`, `apiKey`, `username` و `password`) خودش در متد `registerApplication` نیاز دارد. بنابراین در صورت تغییر مقدار `setDevelopment` کلید‌های دسترسی آن هم باید تغییر داده شود.

{% tabs %}
{% tab OBJECTIVE-C %}
```objectivec
[PushClientManager setDevelopment:YES];
```
{% endtab %}
{% tab SWIFT %}
```swift
//Swift:

PushClientManager.setDevelopment(true)
```
{% endtab %}
{% endtabs %}

- متد `registerApplication`:

به منظور استفاده از پلتفرم چابک، ابتدا باید متد `registerApplication` را فراخوانی کرده و مقادیر مورد نیاز جهت فعالسازی کتابخانه چابک را وارد نمایید. 

همانند کد زیر، متد `registerApplication` را در کلاس `AppDelegate` و در متد `didFinishLaunchingWithOptions` فراخوانی کنید:

{% tabs %}
{% tab OBJECTIVE-C %}
```objectivec
[_manager registerApplication:@"APP_ID"             //based on your environment    
                           apiKey:@"API_KEY"    	//based on your environment
                         userName:@"SDK_USERNAME"   //based on your environment
                         password:@"SDK_PASSWORD"]; //based on your environment
```
{% endtab %}
{% tab SWIFT %}
```swift
_manager?.registerApplication("APP_ID", 	 //based on your environment
					apiKey: "API_KEY",		 //based on your environment
					userName: "SDK_USERNAME",//based on your environment
					password: "SDK_PASSWORD")//based on your environment
```
{% endtab %}
{% endtabs %}

در این متد بجای پارامتر‌های `APP_ID`, `API_KEY`, `SDK_USERNAME`, `SDK_PASSWORD` مقادیر مربوط به حساب چابک خود را که در بخش تنظیمات پنل است، وارد نمایید. نحوه ایجاد حساب در بخش [پیش‌نیازها](https://doc.chabok.io/ios/required.html) توضیح داده شده است. در صورت داشتن حساب چابک هم می‌توانید این مقادیر را از پنل بخش تنظیمات قسمت [**دسترسی‌ و توکن‌ها**](https://doc.chabok.io/panel/settings.html#%D8%AF%D8%B3%D8%AA%D8%B1%D8%B3%DB%8C%D9%87%D8%A7-%D9%88-%D8%AA%D9%88%DA%A9%D9%86%D9%87%D8%A7) بردارید.

>`نکته` : توجه داشته باشید هنگامی که **گواهی sandbox اپل** را در پنل تستی قرار می‌دهید، فقط امکان دریافت `Push Notification` در حالت `debug` وجود خواهد داشت. اما اگر **گواهی production اپل** را در محیط عملیاتی قرار دهید، زمانی `Push Notification` را دریافت خواهید کرد که اقدام به ساخت **ipa** از پروژه خود کرده و از طریق TestFlight یا Enterprise اپلیکیشن خود را نصب کنید.

> `نکته`: برای درخواست حساب محیط **عملیاتی**، در بخش تنظیمات پنل، وارد بخش [**درخواست حساب عملیاتی**](https://sandbox.push.adpdigital.com/front/setting/accountRequest) شوید و درخواست خود را ثبت نمایید تا پس از تایید و ساخت حساب عملیاتی شما، اطلاعات جدید حسابتان (`appId`, `apiKey`, `username` و `password`) تعیین گردد. 

- متد `addDelegate`:

جهت دسترسی به `delegate‌`های چابک باید متد `addDelegate` را همانند کد زیر فراخوانی کنید:

{% tabs %}
{% tab OBJECTIVE-C %}
```objectivec
[_manager addDelegate:self];
```
{% endtab %}
{% tab SWIFT %}
```swift
manager?.addDelegate(self)
```
{% endtab %}
{% endtabs %}

- متد `didFinishLaunchingWithOptions`:

چابک برای فهمیدن نحوه باز شدن اپلیکیشن نیاز به قطعه کد زیر دارد، بنابراین فراخوانی این کد **ضروری** می‌باشد:

{% tabs %}
{% tab OBJECTIVE-C %}
```objectivec
if ([_manager application:application didFinishLaunchingWithOptions:launchOptions]) {
	NSLog(@"Launched by tapping on notification");
}
```
{% endtab %}
{% tab SWIFT %}
```swift
//Swift:

if _manager?.application(application, didFinishLaunchingWithOptions: launchOptions) == true {
	print("Launched by tapping on notification")
}
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
//Swift:

PushClientManager.resetBadge()
```
{% endtab %}
{% endtabs %}

#### متدهای ضروری

در مرحله آخر شما باید قطعه کد زیر را در کلاس `AppDelegate` قرار دهید تا کتابخانه چابک بتواند راه‌اندازی شود:

{% tabs %}
{% tab OBJECTIVE-C %}
```objectivec
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
```
{% endtab %}
{% tab SWIFT %}
```swift
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
```
{% endtab %}
{% endtabs %}

<Br>

### ۳- ثبت کاربر (Register)

یکی از مزیت‌های چابک نسبت به درگاه‌های ارسال پوش‌نوتیفیکیشن، امکان **معرفی** هر کاربر با یک شناسه منحصر به فرد است. این قابلیت به شما امکان می‌دهد دستگاه‌های کاربر را **مدیریت کنید** و سوابق جمع‌آوری شده را همانند یک سیستم مدیریت مشتریان (CRM) در اختیار داشته باشید. این شناسه می‌تواند برای **دستگاه‌های متعدد یک کاربر** استفاده شود. شناسه کاربر می‌تواند هر فیلد با ارزش و معنا‌دار برای کسب و کار شما باشد که کاربر خود را با آن شناسایی می‌کنید. **شماره موبایل**، **کدملی**، **شماره‌حساب**، **ایمیل** و یا حتی **شناسه دیتابیس‌تان** مثال‌هایی از شناسه‌های کاربری مناسب در موارد واقعی هستند. ارسال پیام‌ به کاربران توسط همین شناسه‌ها و بدون استفاده از توکن یا شناسه گوشی، به سادگی امکان پذیر خواهد بود.


 متد `registerUser` عمل **اتصال** به سرور چابک را انجام می‌دهد، بنابراین باید **فقط یک بار** در طول اجرا اپلیکیشن (در کلاس `AppDelegate`) فراخوانی شود. 

>` نکته:` دقت داشته باشید که متدهای `registerUser` و `registerAsGuest` را در **background thread** فراخوانی **نکنید** و آن‌ها را حتما در **main thread** قرار دهید.

این متد با دو امضای متفاوت وجود دارد:

- امضای اول فقط شناسه کاربر را گرفته و کاربر را با آن شناسه روی سرور چابک ثبت نام می‌کند.

{% tabs %}
{% tab OBJECTIVE-C %}
```objectivec
[_manager registerUser:@"USER_ID"];
```
{% endtab %}
{% tab SWIFT %}
```swift
_manager?.registerUser("USER_ID")
```
{% endtab %}
{% endtabs %}

<br>

ترکرها به طور معمول نصب را **اولین بازدید** حساب می‌کنند (مانند سرویس ادجاست)، اما مزیت ترکر چابک در شمارش نصب این است که شما می‌توانید علاوه بر مدل ادجاست نصب را **پس از ورود کاربر و احراز هویت او** در اپلیکیشنتان تعریف کنید. با این کار شما یک اقدام دیگری برای جلوگیری از تقلب در شمارش نصب انجام می‌دهید، به این دلیل که امضاهای کاربر، قبل و بعد از ثبت او (register) مطابقت داده می‌شوند و در صورت تایید به عنوان یک نصب سالم در نظر گرفته می‌شوند. 

به عنوان مثال اگر اپلیکیشن شما دارای صفحه **ورود** و **ثبت‌نام** می‌باشد، متد `registerUser` را در صفحه **ورود** یا **ثبت‌نام** پس از **احراز هویت کاربر** و همچنین، پس از هر بار اجرای (در کلاس `AppDelegate` متد `didFinishLaunchingWithOptions`) اپلیکیشن فراخوانی کنید تا کاربر به سرور چابک متصل شود.

{% tabs %}
{% tab OBJECTIVE-C %}
```objectivec
- (BOOL)application:(UIApplication *)application
            didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
    
    ...
    
    if (_manager.userId) {
        [_manager registerUser:_manager.userId];
    } else {
        //If user is not registered verify the user and
        //call [_manager registerUser:@"USER_ID"]; method at login page
        [_manager registerUser:@"USER_ID"];
    }
    
    return YES;
}
```
{% endtab %}
{% tab SWIFT %}
```swift
func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplicationLaunchOptionsKey: Any]?) -> Bool {

    ...
    
    if let userId = _manager?.userId {
        _manager?.registerUser(userId)
    } else {
        //If user is not registered verify the user and
        //call manager?.registerUser("USER_ID") method at login page
        _manager?.registerUser("USER_ID")
    }

    return true
}
```
{% endtab %}
{% endtabs %}

> `نکته`: مقدار `USER_ID` می‌تواند **بین ۳ تا ۶۴** کاراکتر باشد. زبان فاسی، کاراکترهای `#,+,*,\,/` و فاصله هم در آن **مجاز نیستند**.

>   `نکته امنیتی` : مقدار `USER_ID` را هرگز به صورت خام در `NSUserDefaults` ذخیره نکنید، چون این مقدار شناسه معنادار می‌باشد و می‌توان با آن  کاربر را روی چابک ثبت‌نام کرد. برای این منظور می‌توانید از متد `_manager.userId` چابک استفاده کنید که شناسه کاربر را به صورت رمزنگاری شده نگه‌می‌دارد. همینطور می‌توانید قبل از عملیات ثبت با استفاده از شماره گوشی از معتبر بودن کاربر (verfication) [اطمینان یابید](/ios/verification.html)،  سپس شناسه او را ثبت نمایید.


- امضای دوم

 علاوه بر شناسه کاربر، لیستی از نام‌ کانال‌هایی (برای آشنایی با مفهوم کانال و کاربرد آن [این قسمت](/ios/chabok-messaging.html#کانال) را مطالعه نمایید) که کاربر باید روی آن‌ها عضو شود را نیز دریافت می‌کند. با عضویت روی کانال‌های داده شده، کاربر قادر به دریافت پیام‌های ارسالی روی آن‌ کانال‌ها خواهد بود.

{% tabs %}
{% tab OBJECTIVE-C %}
```objectivec
[_manager registerUser:@"USER_ID" channels:@[@"CHANNEL_NAME1", @"CHANNEL_NAME2"]];
```
{% endtab %}
{% tab SWIFT %}
```swift
_manager.registerUser("USER_ID", channels: ["CHANNEL_NAME1", CHANNEL_NAME2])
```
{% endtab %}
{% endtabs %}

>`نکته`:پس از انجام مراحل فوق در پنل چابک مربوط به [حساب](http://chabok.io) برنامه، در قسمت مشترکین، قابل مشاهده خواهد بود و شما می‌توانید از پنل به کاربر پیام چابک و پوش‌نوتیفیکیشن بفرستید.

##### دریافت وضعیت ثبت کاربر

برای اطمینان از ثبت شدن کاربر در چابک، می‌توانید از متد `isRegistered` یا رویداد `pushClientManagerDidRegisterUser` و `pushClientManagerDidFailRegisterUser` استفاده کنید. 

{% tabs %}
{% tab OBJECTIVE-C %}
```objectivec
_manager.isRegistered
```
{% endtab %}
{% tab SWIFT %}
```swift
_manager.isRegistered
```
{% endtab %}
{% endtabs %}

با رویداد `pushClientManagerDidRegisterUser` می‌توانید از ثبت شدن کاربر در چابک باخبر شوید.

{% tabs %}
{% tab OBJECTIVE-C %}
```objectivec
-(void) pushClientManagerDidRegisterUser:(BOOL)registration{
	NSLog(@"Successfully registered");
}
```
{% endtab %}
{% tab SWIFT %}
```swift
//Swift

func pushClientManagerDidRegisterUser(_ registration: Bool) {
	print("Successfully registered")
}
```
{% endtab %}
{% endtabs %}

با رویداد `pushClientManagerDidFailRegisterUser` می‌توانید در صورت رخ دادن خطا در ثبت کاربر از خطای آن باخبر شوید.

{% tabs %}
{% tab OBJECTIVE-C %}
```objectivec
-(void) pushClientManagerDidFailRegisterUser:(BOOL)registration{
	NSLog(@"Fail to register user \n ~~ error: %@", error);
}
```
{% endtab %}
{% tab SWIFT %}
```swift
//Swift

func pushClientManagerDidFailRegisterUser(_ error: Error!) {
	print("Fail to register user \n ~~ error: \(error)")
}
```
{% endtab %}
{% endtabs %}

##### کاربر مهمان

در صورتی که اپلیکیشن شما قابلیت  **ایجاد حساب کاربری**  داشته باشد می‌توانید کاربر را تا زمانی که حساب ایجاد نکرده است به عنوان  **کاربر مهمان**  در سیستم خود ثبت کنید و سپس به محض ایجاد حساب و دریافت اطلاعات او، آن کاربر را به عنوان  **کاربر دائم**  خود مانند بالا ثبت کنید. 

> `نکته:` در صورتی که می‌خواهید از ترکر نصب استفاده کنید و نصب‌ها را به محض اولین ورود کاربر محاسبه کنید (مانند سرویس ادجاست) باید از این متد استفاده کنید. دقت داشته باشید که این متد را به تنهایی به کار نبرید زیرا هر بازدید کاربر را مهمان جدید محاسبه می‌کند. برای اطلاعات بیشتر مستندات [ترکر نصب](/ios/tracker.html) را مطالعه کنید.

متد زیر کاربر را به عنوان کاربر مهمان ثبت می‌کند و به طور خودکار یک تگ مهمان (CHABOK_GUEST) به او اختصاص می‌دهد:

{% tabs %}
{% tab OBJECTIVE-C %}

```objectivec
[_manager registerAsGuest];
```
{% endtab %}
{% tab SWIFT %}

```swift
_manager?.registerAsGuest()
```
{% endtab %}
{% endtabs %}

##### کاربر مهمان با شناسه سفارشی 

همچنین می‌توانید کاربر مهمان را با **شناسه دلخواهتان** ثبت کنید: 

{% tabs %}
{% tab OBJECTIVE-C %}

```objectivec
[_manager registerWithGuestId:@"MY_GUEST_ID"];
```
{% endtab %}
{% tab SWIFT %}

```swift
_manager.default()?.register(withGuestId: "MY_GUEST_ID")
```
{% endtab %}
{% endtabs %}

#### حذف کاربر (Unregister)

برای حذف دستگاه کاربر از سرور چابک می‌توانید از متد `unRegisterUser` استفاده کنید. پس از حذف کاربر، چابک دیگر به دستگاه‌های آن `userId` پوش ارسال نخواهد کرد. توصیه می‌شود این متد را زمانی که کاربر در اپلیکیشنتان از حساب خود خارج می‌شود (**Logout**) فراخوانی کنید. این امر باعث می‌شود تا کاربر از حفظ شدن حریم شخصی خود پس از خروج از حساب کاربری اطمینان یابد. پس از آن هم کاربر را به عنوان یک کاربر مهمان ثبت کنید تا همچنان با او تعامل داشته باشید.
برای حذف دستگاه کاربر از سرور چابک می‌توانید از متد زیر استفاده کنید:

{% tabs %}
{% tab OBJECTIVE-C %}

```objectivec
[_manager unregisterUser];
```
{% endtab %}
{% tab SWIFT %}

```swift
_manager?.unregisterUser()
```
{% endtab %}
{% endtabs %}

> `نکته:` پروژه [Starter](https://github.com/chabok-io/chabok-starter-ios) به شما کمک می‌کند بدون هیچ کد اضافه‌ای و فقط با اجرای آن، از پلتفرم چابک استفاده کنید. همچنین به کمک این پروژه با نحوه صحیح پیاده‌سازی متدهای چابک آشنا خواهید شد.
