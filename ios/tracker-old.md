---
id: tracker
title: ترکر نصب
layout: ios
permalink: ios/tracker-old-version.html
next: push-notification.html
prev: sdk-setup.html
---

> `نکته:` مستندات پیاده‌سازی زیر مربوط به **نسخه‌های پایین ۲** کتابخانه چابک است. در صورتی که می‌خواهید نسخه خود را ارتقا دهید، حتما [مستندات مهاجرت](/ios/upgrade-chabok-to-2-0-0.html) به نسخه ۲ چابک را مطالعه کنید.

ترکر چابک کلیک و نصب  کمپین‌ها را شمارش می‌کند. همینطور با توجه به قابلیت [رصد رویدادها](/ios/tracker.html#۲۱-رصد-رویدادها-tracking-events) می‌توانید مدل‌های بازاریابی CPI و CPA را برای تبلیغات خود اجرا کنید. مزیت دیگر ترکر چابک [حذف و جلوگیری تقلب](/ios/tracker.html#۴-مکانیزم-ضد-تقلب-fraud-prevention) در کمپین‌های تبلیغاتی است.

 نگران راه‌اندازی هم نباشید این صفحه به طور کامل مراحل **پیاده‌سازی و استفاده از ترکر** را قدم به قدم مرور می‌کند.  

<br>

>‍‍`نکته:` در صورتی که از قبل **SDK** چابک را نصب کرده‌‌اید، از [**رصد رویدادها**](/ios/tracker.html#۲۱-رصد-رویدادها-tracking-events) شروع کنید.
 
### ۱. پیاده‌سازی (SDK Integration)
---

برای ایجاد حساب کاربری کافیست در وبسایت چابک وارد صفحه [شروع کنید](https://chabok.io/register.html) شوید و حساب شخصی خود را بسازید. پس از ایجاد حساب و ثبت اپلیکیشن خود، با مراجعه به بخش [تنظیمات پنل](https://sandbox.push.adpdigital.com/front/setting/access) پارامترهای اتصال به چابک که در مرحله [مقداردهی](/ios/tracker.html#ج--مقداردهی-initialize) مورد نیاز است، در دسترس خواهد بود.


#### ۱.۱. مراحل پیاده‌سازی 

برای راه‌اندازی SDK چابک **۴ مرحله** زیر را به ترتیب انجام ‌دهید:

[الف- افزودن کتابخانه](/ios/tracker.html#الف--افزودن-کتابخانه)

[ب- مقداردهی](/ios/tracker.html#ب--مقداردهی-initialize)

[ج- ثبت کاربر](/ios/tracker.html#ج--ثبت-کاربر-register-users)

[د- ثبت اطلاعات کاربر (User Attributes)](/ios/tracker.html#د--ثبت-اطلاعات-کاربر-user-attributes)

<br>

>`نکته:` برای دریافت **advertisingId** باید ‍`AdSupport.framework` را به `Linked Frameworks and Libraries` آن پروژه اضافه کنید.

##### الف- افزودن کتابخانه

کتابخانه چابک از طریق **CocoaPods** در دسترس است، برای نصب آن خط زیر را به `Podfile` خود اضافه کنید:


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

> `نکته:` توجه داشته باشید که برای اطلاع از آخرین نسخه کتابخانه [این صفحه](/ios/release-note.html) را ببینید. همچنین توصیه می‌کنیم بخش [مدل نسخه‌گذاری در چابک](/ios/sdk-setup.html#مدل-نسخهگذاری-در-چابک-semantic-versioning) را مطالعه نمایید.

<br>

##### ب- مقداردهی (Initialize)

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

در این متد به جای پارامتر‌های `APP_ID/SENDER_ID`, `API_KEY(SDK_KEY)`, `SDK_USERNAME`, `SDK_PASSWORD` مقادیر مربوط به حساب چابک خود را وارد نمایید. نحوه ایجاد حساب در بخش [پیش‌نیازها](/android/required.html) توضیح داده شده است. در صورت داشتن حساب چابک هم می‌توانید این مقادیر را از [**پنل بخش تنظیمات قسمت دسترسی‌ و توکن‌ها**](/panel/settings.html#دسترسیها-و-توکنها) بردارید.

متد `setDevelopment` تعیین می‌کند که اپلیکیشن شما به محیط [آزمایشی (Sandbox)](https://sandbox.push.adpdigital.com) و یا [عملیاتی (Production) ](https://panel.push.adpdigital.com) چابک متصل شود. این موضوع بستگی به این دارد که حساب کاربری شما روی کدام محیط تعریف شده باشد. مقدار `true` به محیط آزمایشی و  مقدار`false` به محیط عملیاتی متصل می‌شود. در نظر داشته باشید، هر محیط به کلیدهای دسترسی (AppId, APIKey, Username و Password) خودش در متد `init` نیاز دارد. بنابراین در صورت تغییر مقدار `setDevelopment` کلید‌های دسترسی آن هم باید تغییر داده شود.

>` نکته:` در کد بالا بخش `Notification AppDelegation` برای **شمارش حذف‌ها** ضروری است.

<br>

##### ج- ثبت کاربر (Register Users)

یکی از مزیت‌های چابک امکان **معرفی** هر کاربر با یک شناسه منحصر به فرد است. این قابلیت به شما امکان می‌دهد دستگاه‌های کاربر را **مدیریت کنید** و [سوابق جمع‌آوری شده را همانند یک سیستم مدیریت مشتریان (CRM) در اختیار داشته باشید](/panel/users.html#جزئیات-کاربر).

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

        //If you have guest users
        // should be called here (If you want to track installs on user's first app launch (just like Adjust))
        [_manager registerAsGuest];
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

        //If you have guest users
        // should be called here (If you want to track installs on user's first app launch (just like Adjust))
        _manager?.registerAsGuest()  
    }

    return true
}
```
{% endtab %}
{% endtabs %}

متد `registerAsGuest` در بالا، کاربر را به عنوان **کاربر مهمان** ثبت می‌کند. این متد به طور خودکار  یک تگ مهمان (CHABOK_GUEST) به کاربر اختصاص می‌دهد. 

>` نکته:` دقت کنید که متد `registerAsGuest` را به درستی استفاده کرده‌ باشید. برای این کار پس از نصب کاربر به **پنل > کاربران** بروید و از اضافه شدن کارت آن کاربر مانند زیر مطمئن شوید:

![عکس مربوط](http://uupload.ir/files/lawy_regis-as-guest2.png)


 متد `register` علاوه بر ثبت کاربر، عمل **اتصال** به سرور چابک را انجام می‌دهد، بنابراین باید **فقط یک بار** در طول اجرای اپلیکیشن (در کلاس application) فراخوانی شود: (برای اطلاعات بیشتر می‌توانید بخش [ثبت کاربر](/ios/sdk-setup.html#۴--ثبت-کاربر-register) را مطالعه کنید.) 


ترکرها به طور معمول نصب را **اولین بازدید** حساب می‌کنند (مانند سرویس ادجاست)، اما مزیت ترکر چابک در شمارش نصب این است که شما می‌توانید علاوه بر مدل ادجاست نصب را **پس از ورود کاربر و احراز هویت او** در اپلیکیشنتان تعریف کنید. با این کار شما یک اقدام دیگری برای جلوگیری از تقلب در شمارش نصب انجام می‌دهید، به این دلیل که امضاهای کاربر، قبل و بعد از ثبت او (register) مطابقت داده می‌شوند و در صورت تایید به عنوان یک نصب سالم در نظر گرفته می‌شوند. 

به عنوان مثال اگر اپلیکیشن شما دارای صفحه **ورود** و **ثبت‌نام** می‌باشد، متد `register` را در صفحه **ورود** یا **ثبت‌نام** پس از **احراز هویت کاربر** و همچنین، پس از هر بار اجرای (در کلاس `Application` متد `onCreate`) اپلیکیشن فراخوانی کنید تا کاربر به سرور چابک متصل شود.

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

> `نکته`: مقدار `USER_ID` می‌تواند **بین ۳ تا ۶۴** کاراکتر باشد. زبان فاسی، کاراکترهای `#,+,*,\,/` و فاصله هم در آن **مجاز نیستند**.


<br>

##### د- ثبت اطلاعات کاربر (User Attributes)

شما می‌توانید اطلاعاتی که از کاربر دارید (مانند نام، نام خانوادگی، جنسیت، سن و ...) را به طور دلخواه با استفاده از property زیر، در پروفایل او ثبت کنید:

{% tabs %}
{% tab OBJECTIVE-C %}
```objectivec
[PushClientManager.defaultManager.userAttributes = @{
		@"firstName": @"نسیم",
		@"lastName" : @"پرتوی",
		@"age"  : @(36),
		@"gender" : @"زن"
}];
```
{% endtab %}
{% tab SWIFT %}
``` swift
PushClientManager.default().userAttributes = [
                       "firstName": "نسیم",
                       "lastName": "پرتوی",
                       "age": 36,
                       "gender": "زن"]
```
{% endtab %}
{% endtabs %}

پس از فراخوانی این متد و ثبت اطلاعات می‌توانید آن را در **پنل>جزئیات دستگاه>کارت اطلاعات کاربر** مانند زیر مشاهده کنید:

![عکس مربوطه](http://uupload.ir/files/g9vk_set-user-info-1.png)

<br>

#### ۲.۱. رصد رویدادها (Tracking Events)

رویدادها در واقع همان تعامل کاربر با اپلیکیشنتان است. از این رو آن‌ها را **رفتار** کاربر می‌نامیم. شما می‌توانید رفتار کاربر را در اپلیکیشن خود به طور **لحظه‌ای** رصد کنید. این امر به شما امکان می‌دهد تا **CPA های پیشرفته** برای کمپین‌هایتان [تعریف کنید](/panel/tracker.html#افزودن-cpa) و نصب‌هایتان با تحقق اهدافی که برای کاربران تعیین کرده‌اید شمرده شوند. 


 به عنوان مثال می‌خواهید رفتار **افزودن به سبد خرید** از فروشگاه اینترنتی خودتان را رصد کنید. برای ثبت این رفتار کد زیر را با الگوی بالا وارد می‌نماییم.

نمونه:

{% tabs %}
{% tab OBJECTIVE-C %}
```objectivec
[self.manager track:@"add-to-card" data:@{@"value":@(35000)}];
```
{% endtab %}
{% tab SWIFT %}
```swift
self.manager.track("add-to-card", data: ["value":35000])
{% endtab %}
{% endtabs %}
```
>‍‍‍`نکته:` در متد `track` در صورتی که به `value` مقدار عددی بدهید، آن رفتار در سگمنت با پیشوند **آخرین و مجموع** اضافه می‌شود. اما در صورتی که مقدار غیر عددی (string) بدهید، آن رفتار فقط با پیشوند **آخرین** به سگمنت اضافه می‌شود.

<Br>

##### رصد درآمد (Tracking Revenue)

شما می‌توانید در‌آمدی که کاربران با نشان دادن رفتاری از خود (مانند خرید) تولید می‌کنند را رصد و ذخیره کنید. این کار را باید با متد `trackPurchase` انجام دهید. به عنوان مثال کاربر خریدی را با ارزش ۵۰ هزار تومان انجام داده است.

نمونه:

{% tabs %}
{% tab OBJECTIVE-C %}
```objectivec
ChabokEvent *chabokEvent = [[ChabokEvent alloc]
                                initWithRevenue:20000
                                currency:@"RIAL"];
    
[PushClientManager.defaultManager trackPurchase:@"Purchase"
                                        chabokEvent:chabokEvent];
```
{% endtab %}
{% tab SWIFT %}
```swift
let chabokEvent = ChabokEvent(revenue: 20000, currency: "RIAL")

PushClientManager.default().trackPurchase("Purchase", chabokEvent: chabokEvent)
```
{% endtab %}
{% endtabs %}

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

برای ایجاد لینک ترکر فقط کافیست وارد صفحه **ترکر** پنل شوید و **ترکر جدید** بسازید. همینطور شما می‌توانید به لینک ترکر خود پارامتر [اضافه کنید](/panel/tracker.html#پارامتر-در-لینک-ترکر).


 برای اطلاعات بیشتر درباره ایجاد ترکر جدید در پنل و مشاهده نمونه‌ای از آن می‌توانید به مستندات [پنل](/panel/tracker.html#ایجاد-ترکر-جدید) مراجعه کنید.

**نمونه لینک ترکر چابک**:

حساب‌ رایگان:

```javascipt
https://sand.chabok.io/JY@4sc
```  
حساب عملیاتی:

```javascipt
https://a.chabok.io/JY@4sc
```  

#### ۲.۲. انتشار لینک ترکر 

پس از ایجاد یک ترکر جدید و گرفتن لینک آن کافی است آن را در کمپین‌های نصب خود قرار دهید.
با این کار ترکر شما فعالیت خود را آغاز می‌کند و از این پس هر کلیک و نصب به صورت لحظه‌ای در پنل به نمایش گذاشته خواهد شد.


<br><br>

### ۳. ترک نصب از استورها

شما می‌توانید منبع (Source) نصب را در کمپین‌های خود بفهمید. برای انجام این کار باید در ابتدا ترکر خود را در پنل ایجاد کنید، **آی‌دی ترکر** را در متد زیر قرار دهید و پس از گرفتن خروجی ipa گرفتن آن را در استور مورد نظر بگذارید. 

{% tabs %}
{% tab OBJECTIVE-C %}

```objectivec
[_manager setDefaultTracker:@"YOUR_TRACKER_ID"];
```
{% endtab %}
{% tab SWIFT %}

```swift
_manager?.setDefaultTracker("YOUR_TRACKER_ID");
```
{% endtab %}
{% endtabs %}

>`نکته:` دقت داشته باشید که `TRACKER_ID` شناسه ۶ کاراکتری است که در لینک ترکر شما وجود دارد. به عنوان مثال در لینک `https://sand.chabok.io/JY@4sc` آی‌دی ترکر `JY@4sc` می‌باشد. این آی‌دی را می‌توانید از پنل>ترکر>جزئیات ترکر مانند تصویر زیر کپی کنید:

![عکس مربوط](http://uupload.ir/files/bjbc_tracker-analytics-s.png)

<br><br>

### ۴. کال‌بک‌های ترکر (Callbacks)
---

در صورتی هم که می‌خواهید داده‌های ترکر را در سیستم‌های دیگر از جمله سرورهای خود دریافت کنید می‌توانید از کال‌بک استفاده کنید. این کار را می‌توانید از پنل هنگام ایجاد ترکر جدید انجام دهید. به این ترتیب لینکی که می‌خواهید زمان رخ دادن رویداد (کلیک یا نصب) فرخوانی شود را وارد می‌کنید. 

همچنین شما می‌توانید در کال‌بک خود از پارامترهایی برای اطلاعات بیشتر از مبدا رویداد کسب کنید. برای مشاهده این پارامترها و نمونه لینک کال‌بک می‌توانید به مستندات [پنل](/panel/tracker.html#کالبک) مراجعه کنید.

<br><br>

### ۵. مکانیزم ضد تقلب (Fraud Prevention)
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

### ۶. آشنایی با برخی مفاهیم ترکر
---

- **اتریبیوشن**: نصب‌هایی که از طریق کمپین‌های تبلیغاتی شمرده می‌شوند.

- **بازدید**: هر بار که اپلیکیشن باز شود یک بازدید محاسبه می‌شود.

- **ترکر**: ابزار شمارش و رصد کمپین‌های تبلیغاتی را ترکر می‌نامند.

- **رد شده**: نصب‌ها و کلیک‌هایی که غیر واقعی تشخیص داده می‌شوند و در شمارش محاسبه نمی‌شوند.

- **رویداد**: هرگونه تعامل کاربر با اپلیکیشن، یک رویداد در نظر گرفته می‌شود. 

- **نصب**: اولین بازدید هر کاربر نصب به حساب می‌آید.
