---
id: sdk-setup
title: راه‌اندازی
layout: ios
permalink: ios/sdk-setup.html
prev: required.html
next: chabok-messaging.html
---

پس از طی کردن مراحل صفحه [پیش‌نیازها](/ios/required.html)، می‌توانید **راه‌اندازی SDK چابک** را شروع کنید. در ابتدا شما باید کتابخانه چابک را [نصب کنید](/ios/sdk-setup.html#۱--نصب-کتابخانه)، سپس [مقداردهی و راه‌اندازی](/ios/sdk-setup.html#۳--مقداردهی-اولیه-initialize) کتابخانه چابک را در اپلیکیشنتان انجام دهید و در آخر برای شناخت کاربر توسط چابک، مرحله [ثبت کاربر](/ios/sdk-setup.html#۴--ثبت-کاربر-register) را حتما پشت سر بگذارید.

[۱- نصب کتابخانه](/ios/sdk-setup.html#۱--نصب-کتابخانه)

[۲- مقداردهی اولیه (Initialize)](/ios/sdk-setup.html#۲--مقداردهی-اولیه-initialize)

[۳- ثبت کاربر (Register)](/ios/sdk-setup.html#۳--ثبت-کاربر-register)

<Br>

### ۱- نصب کتابخانه

چابک از طریق CocoaPods در دسترس است، برای نصب آن خط زیر را به Podfile خود اضافه کنید:


```bash
target 'YourProject' do
  use_frameworks!

  pod 'ChabokPush'
  
end
```

سپس با روش زیر نصب کنید:

```bash
$ pod install
```
پس از اجرای دستورات بالا اگر با خطایی رو به رو شدید، دستور زیر را وارد کنید، سپس `pod install` را دوباره اجرا کنید.

```bash
$ pod update
```
حالا برای اطمینان از نصب ، پروژه را در `xcode` باز کنید ، اگر header فایل چابک را مشاهده کنید، افزودن کتابخانه موفقیت آمیز بوده است.


#### نصب دستی کتابخانه 

برای دسترسی به کتابخانه چابک هم می‌توانید وارد [این صفحه](https://github.com/chabokpush/chabok-client-ios) شوید. برای نصب کتابخانه استفاده از این روش را **توصیه نمی‌کنیم** زیرا شما از به روز رسانی‌ نسخه‌های چابک مطلع نمی‌شوید.

#### مدل نسخه‌گذاری در چابک (Semantic Versioning)

چابک از مدل نسخه‌گذاری `MAJOR`.`MINOR`.`PATCH` استفاده می‌کند. همه تغییرات نسخه‌ها بلافاصله پس از انتشارشان به صورت موردی در صفحه **لیست  تغییرات** برای اطلاع شما اضافه می‌شوند. برای همین توصیه می‌کنیم [این صفحه](/ios/release-note.html) را حتما مطالعه نمایید. این موارد برای هر نسخه در دو بخش [**ارتقا** (در صورت وجود ارتقا)](/ios/release-note.html#ارتقا) و [**تغییرات**](/ios/release-note.html#تغییرات) برای شما نمایش داده شده‌ است.

- `Patch:` تغییرات در این سطح شامل **Bug Fix** و **قابلیت‌های بسیار کوچک** می‌باشد. به روز رسانی به این نسخه‌ها نیاز به تغییری در کد ندارد. برای آگاهی از آن‌ها، باید بخش [**تغییرات**](/ios/release-note.html#تغییرات) را مطالعه کنید. به عنوان مثال به‌ روز رسانی کتابخانه چابک از نسخه `2.13.0` به نسخه `2.13.2` مربوط به این سطح می‌شود.
- `Minor:` تغییرات در این سطح شامل **قابلیت‌های بزرگتر** و **تغییر در کارکرد (Functionality) کتابخانه** می‌شود. در به روز رسانی به این نسخه‌ها حتما باید بخش [**ارتقا**](/ios/release-note.html#ارتقا) و [تغییرات](/ios/release-note.html#تغییرات) صفحه لیست تغییرات را با دقت مطالعه کنید. در صورت بروز هر گونه مشکل در نتیجه رعایت نکردن نکات بخش **ارتقا** و **تغییرات** در به روز رسانی به نسخه‌های **Minor**، تیم چابک مسئولیتی را نمی‌پذیرد. توصیه می‌کنیم که هر سه تا شش ماه اقدام به بررسی نسخه‌های **Minor** نمایید. به عنوان مثال به‌ روز رسانی کتابخانه چابک از نسخه `2.12.1` به نسخه `2.13.2` مربوط به این سطح می‌شود.
- `Major:` این سطح از تغییرات مخصوص **بازنویسی** و یا **تغییرات اساسی** در کتابخانه چابک است. در به روز رسانی به این نسخه‌ها حتما باید بخش [**ارتقا**](/ios/release-note.html#ارتقا) و [**تغییرات**](/ios/release-note.html#تغییرات) تغییرات صفحه لیست تغییرات را با دقت مطالعه کنید. در صورت بروز هر گونه مشکل در نتیجه رعایت نکردن نکات بخش **ارتقا** و **تغییرات** در به روز رسانی به نسخه‌های **Major**، تیم چابک مسئولیتی را نمی‌پذیرد. بنابراین توصیه می‌کنیم که هر یک سال اقدام به بررسی نسخه‌های **Major** نمایید. به عنوان مثال به‌روزرسانی کتابخانه چابک از نسخه `1.0.1` به نسخه `2.13.2` مربوط به این سطح می‌شود.

> `نکته:` توصیه می‌کنیم برای دریافت آخرین نسخه **Bug Fix**ها از کاراکتر + (wildcard) استفاده نمایید تا gradle به صورت خودکار نسخه‌های patch را بیاورد. 

<Br>

### ۲- مقداردهی اولیه (Initialize)

برای دریافت یا ارسال پیام از/به سرور چابک، لازم است یک نمونه از کلاس AdpPushClient بسازید و آن را مقداردهی نمایید. یکی از بهترین روش‌ها برای ساختن کلاینت چابک استفاده از کلاس اپلیکیشن پروژه شماست،‌‌ زیرا فراخوانی این متد فقط برای یکبار کافی‌ است. 

> `نکته` :‌ تمامی متدهایی که در این بخش بیان می‌شود باید به کلاس `AppDelegate` اضافه شده و متدهای چابک باید در `delegate` متد `didFinishLaunchingWithOptions` فراخوانی شوند.

به قطعه کد زیر دقت کنید:

```objectivec
//Objective-C

#import <AdpPushClient/AdpPushClient.h>

@interface AppDelegate () <PushClientManagerDelegate, PushClientManagerDelegate>
@property (nonatomic, strong) PushClientManager *manager;
@end

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
    _manager = [PushClientManager defaultManager];
    ...
    return YES;
}
...
@end
```

```swift
//Swift:

import AdpPushClient

@UIApplicationMain
class AppDelegate: UIResponder, UIApplicationDelegate, PushClientManagerDelegate {
    
    var window: UIWindow?
    var manager: PushClientManager?

    func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplicationLaunchOptionsKey: Any]?) -> Bool {
        manager = PushClientManager.default()
        ...
        return true
    }
...
}
```
متد `setDevelopment` مشخص می‌کند که اپلیکیشن شما به محیط [آزمایشی (Sandbox)](https://sandbox.push.adpdigital.com) و یا [عملیاتی (production)](https://panel.push.adpdigital.com) چابک متصل شود. این موضوع بستگی به این دارد که حساب کاربری شما روی کدام محیط تعریف شده باشد. مقدار `true` یا `YES` به محیط آزمایشی و مقدار`false` یا `NO` به محیط عملیاتی متصل می‌شود. در نظر داشته باشید، هر محیط به کلیدهای دسترسی (AppId, APIKey, Username و Password) خودش در متد `init` نیاز دارد. بنابراین در صورت تغییر مقدار `setDevelopment` کلید‌های دسترسی آن هم باید تغییر داده شود.

```objectivec
//Objective-C:

[PushClientManager setDevelopment:YES];
```
```swift
//Swift:

PushClientManager.setDevelopment(true)
```
>`نکته` : توجه داشته باشید هنگامی که **گواهی sandbox اپل** را در پنل تستی قرار می‌دهید، فقط امکان دریافت `Cloud Messaging` در حالت `debug` وجود خواهد داشت. اما اگر **گواهی production اپل** را در محیط عملیاتی قرار دهید، زمانی `Cloud Messaging` را دریافت خواهید کرد که اقدام به ساخت **ipa** از پروژه خود کرده و از طریق TestFlight یا Enterprise اپلیکیشن خود را نصب کنید.

به منظور استفاده از سرویس چابک، ابتدا باید متد `registerApplication` را فراخوانی کرده و مقادیر مورد نیاز جهت فعالسازی کتابخانه چابک را وارد نمایید. در این متد بجای پارامتر‌های `APP_ID`, `API_KEY(SDK_KEY)`, `SDK_USERNAME`, `SDK_PASSWORD` مقادیر مربوط به حساب چابک خود را که در بخش تنظیمات پنل است، وارد نمایید. نحوه ایجاد حساب در بخش [پیش‌نیازها](https://doc.chabokpush.com/ios/required.html) توضیح داده شده است. در صورت داشتن حساب چابک هم می‌توانید این مقادیر را از [**پنل بخش تنظیمات قسمت دسترسی‌ و توکن‌ها**](https://doc.chabokpush.com/panel/settings.html#%D8%AF%D8%B3%D8%AA%D8%B1%D8%B3%DB%8C%D9%87%D8%A7-%D9%88-%D8%AA%D9%88%DA%A9%D9%86%D9%87%D8%A7) بردارید.

> `نکته`: برای درخواست حساب محیط **عملیاتی**، در بخش تنظیمات پنل، وارد بخش [**درخواست حساب عملیاتی**](https://sandbox.push.adpdigital.com/front/setting/accountRequest) شوید و درخواست خود را ثبت نمایید تا پس از تایید و ساخت حساب عملیاتی شما، اطلاعات جدید حسابتان (AppId, APIKey, Username و Password) تعیین گردد. 

همانند کد زیر، متد `registerApplication` را در کلاس `AppDelegate` و در متد `didFinishLaunchingWithOptions` فراخوانی کنید:

```objectivec
//Objective-C:
  
[_manager registerApplication:@"APP_ID"                  //based on your environment    
                           apiKey:@"API_KEY(SDK_KEY)"    //based on your environment
                         userName:@"SDK_USERNAME"        //based on your environment
                         password:@"SDK_PASSWORD"];      //based on your environment
```
```swift
//Swift:

manager?.registerApplication("APP_ID", apiKey: "API_KEY(SDK_KEY)", userName: "SDK_USERNAME", password: "SDK_PASSWORD")    //based on your environment
```

جهت دسترسی به `delegate‌های` چابک باید متد `addDelegate` را همانند کد زیر فراخوانی کنید:

```objectivec
//Objective-C:

[_manager addDelegate:self];
```
```swift
//Swift :

manager?.addDelegate(self)
```
چابک برای فهمیدن نحوه باز شدن اپلیکیشن نیاز به قطعه کد زیر دارد، بنابراین فراخوانی این کد **ضروری** می‌باشد:

```objectivec
//Objective-C:
//Check app was launch by clicking on Notification.
if ([_manager application:application didFinishLaunchingWithOptions:launchOptions]) {
	NSLog(@"Application was launch by clicking on Notification...");
}
```
```swift
//Swift:

//Check app was launch by clicking on Notification.
let launchByNotification = (manager?.application(application, didFinishLaunchingWithOptions: launchOptions))!
if launchByNotification{
    print("Application was launch by clicking on Notification...")
}
```

<Br>

### ۳- ثبت کاربر (Register)

یکی از مزیت‌های چابک نسبت به درگاه‌های ارسال پوش‌نوتیفیکیشن، امکان **معرفی** هر کاربر با یک شناسه منحصر به فرد است. این قابلیت به شما امکان می‌دهد دستگاه‌های کاربر را **مدیریت کنید** و سوابق جمع‌آوری شده را همانند یک سیستم مدیریت مشتریان (CRM) در اختیار داشته باشید. این شناسه می‌تواند برای **دستگاه‌های متعدد یک کاربر** استفاده شود. شناسه کاربر می‌تواند هر فیلد با ارزش و معنا‌دار برای کسب و کار شما باشد که کاربر خود را با آن شناسایی می‌کنید. **شماره موبایل**، **کدملی**، **شماره‌حساب**، **ایمیل** و یا حتی **شناسه دیتابیس‌تان** مثال‌هایی از شناسه‌های کاربری مناسب در موارد واقعی هستند. ارسال پیام‌ به کاربران توسط همین شناسه‌ها و بدون استفاده از توکن یا شناسه گوشی، به سادگی امکان پذیر خواهد بود.


متد `registerUser` عمل **اتصال** به سرور چابک را انجام می‌دهد، بنابراین باید فقط **یک بار** در طول اجرا اپلیکیشن فراخوانی شود. بعنوان مثال، اگر اپلیکیشن شما دارای صفحه **ثبت نام** است، متد `registerUser` را در این `UIViewController` فراخوانی کنید و و هم پس از ثبت نام، در `AppDelegate`، متد `registerUser` را فراخوانی کنید تا با **شناسه ثبت نام** شده هر بار به سرور چابک متصل شود.


این متد با دو امضای متفاوت وجود دارد:

- امضای اول فقط شناسه کاربر را گرفته و کاربر را با آن شناسه روی سرور چابک ثبت نام می‌کند.

```objectivec
//Objective-C:

[self.manager registerUser:@"USER_ID"];
```
```swift
//Swift:

self.manager?.registerUser("USER_ID")
```

> `نکته` : متغیر `USER_ID` شناسه کاربر برای ثبت نام در چابک می‌باشد.

> `نکته`: کاراکترهای ‍`#,+,*,\,/` و فاصله در `USER_ID` مجاز نیستند، همچنین طول این رشته نباید کمتر از ۳ و بیشتر از ۳۲ کاراکتر باشد.

>   `نکته امنیتی` : مقدار `USER_ID` را هرگز به صورت خام در `NSUserDefaults` ذخیره نکنید، چون این مقدار شناسه معنادار می‌باشد و می‌توان با آن  کاربر را روی چابک ثبت‌نام کرد. برای این منظور می‌توانید از متد `PushClientManager.default().userId` چابک استفاده کنید که شناسه کاربر را به صورت رمزنگاری شده نگه‌می‌دارد. همینطور می‌توانید قبل از عملیات ثبت با استفاده از شماره گوشی از معتبر بودن کاربر (verfication) [اطمینان یابید](/ios/verification.html)،  سپس شناسه او را ثبت نمایید.


- امضای دوم علاوه بر شناسه کاربر، لیستی از نام‌ کانال‌هایی (برای آشنایی با مفهوم کانال و کاربرد آن [این قسمت](/ios/chabok-messaging.html#کانال) را مطالعه نمایید) که کاربر باید روی آن‌ها عضو شود را نیز دریافت می‌کند. با عضویت روی کانال‌های داده شده، کاربر قادر به دریافت پیام‌های ارسالی روی آن‌ کانال‌ها خواهد بود.

```objectivec
//Objective-C:

[self.manager registerUser:@"USER_ID" channels:@[@"YOUR_CHANNEL" ]];
```
```swift
//Swift:

self.manager.registerUser("USER_ID", channels: ["YOUR_CHANNEL"])
```

در مرحله آخر شما باید قطعه کد زیر را در کلاس `AppDelegate` قرار دهید تا کتابخانه چابک بتواند راه‌اندازی شود، سه متد فوق برای دریافت token از سرویس `APNs` اپل می‌باشد که چابک برای ارسال پوش نوتیفیکشن به آن نیازمند است.

>`نکته`:پس از قرار دادن کدهای زیر در `AppDelegate`، اطلاعات کاربر در پنل چابک مربوط به [حساب](http://chabokpush.com) برنامه، در قسمت مشترکین، قابل مشاهده خواهد بود و شما می‌توانید از پنل به کاربر پیام چابک و پوش‌نوتیفیکیشن بفرستید.

```objectivec
//Objective-C:

#pragma mark - Notification AppDelegation

- (void)application:(UIApplication *)application didFailToRegisterForRemoteNotificationsWithError:(NSError *)error{
    // Hook and handle failure of get Device token from Apple APNS Server
    [self.manager application:application
                  didFailToRegisterForRemoteNotificationsWithError:error];
}

- (void)application:(UIApplication *)application didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken{
    // Manager hook and handle receive Device Token From APNS Server
    [self.manager application:application didRegisterForRemoteNotificationsWithDeviceToken:deviceToken];
}

- (void)application:(UIApplication *)application didRegisterUserNotificationSettings:(UIUserNotificationSettings *)notificationSettings{
    // Manager hook and Handle iOS 8 remote Notificaiton Settings
    [self.manager application:application didRegisterUserNotificationSettings:notificationSettings];
}
```
```swift
//Swift :

//MARK : Notification AppDelegation
    
func application(_ application: UIApplication, didFailToRegisterForRemoteNotificationsWithError error: Error) {
	self.manager?.application(application, didFailToRegisterForRemoteNotificationsWithError: error)
}
    
func application(_ application: UIApplication, didRegisterForRemoteNotificationsWithDeviceToken deviceToken: Data) {
	self.manager?.application(application, didRegisterForRemoteNotificationsWithDeviceToken: deviceToken)        
}
    
@available(iOS 8.0, *)
func application(_ application: UIApplication, didRegister notificationSettings: UIUserNotificationSettings) {
	self.manager?.application(application, didRegister: notificationSettings)
}
```

#### حذف کاربر (Unregister)

برای حذف دستگاه کاربر از سرور چابک می‌توانید از متد `unRegisterUser` استفاده کنید. پس از حذف کاربر، چابک دیگر به دستگاه‌های آن `userId` پوش ارسال نخواهد کرد. توصیه می‌شود این متد را زمانی که کاربر در اپلیکیشنتان از حساب خود خارج می‌شود (**Logout**) فراخوانی کنید. این امر باعث می‌شود تا کاربر از حفظ شدن حریم شخصی خود پس از خروج از حساب کاربری اطمینان یابد. پس از آن هم کاربر را به عنوان یک کاربر مهمان `register` کنید تا همچنان با او تعامل داشته باشید.
برای حذف دستگاه کاربر از سرور چابک می‌توانید از متد زیر استفاده کنید:

```objectivec
//Objective-C:

[PushClientManager.defaultManager unregisterUser];
```
```swift
//Swift:

PushClientManager.default().unregisterUser()
```

> `نکته:` پروژه [Starter](https://github.com/chabokpush/chabok-starter-ios)، به شما کمک می‌کند بدون هیچ کد اضافه‌ای و فقط با اجرا آن، از سرویس چابک استفاده کنید. همچنین به کمک پروژه فوق با نحوه صحیح پیاده سازی متدهای چابک آشنا خواهید شد.



