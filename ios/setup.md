---
id: setup
title: راه‌اندازی چابک
layout: ios
permalink: ios/setup.html
prev: installation.html
next: publishingMessages.html
---


### مراحل راه‌اندازی چابک
برای راه‌اندازی چابک باید سه مرحله زیر را به ترتیب انجام دهید تا بتوانید دستگاه خود را در پنل چابک مشاهده کنید :

1. مقداردهی اولیه
2. ثبت کاربر
3. متدهای ضروری

> `نکته :` جهت راه‌اندازی و استفاده پوش محتوا (`Rich Notification`) وارد صفحه [پوش محتوا](rich_notification.html) شوید.

> `نکته` :‌ تمامی متدهایی که در این بخش بیان می‌شود باید به کلاس `AppDelegate` اضافه شده و متدهای چابک باید در `delegate` متد `didFinishLaunchingWithOptions` فراخوانی شوند.

> پروژه [Starter](https://github.com/chabok-io/chabok-starter-ios)، به شما کمک می‌کند بدون هیچ کد اضافه‌ای و فقط با اجرا آن، از پلتفرم چابک استفاده کنید. همچنین به کمک پروژه فوق از نحوه صحیح پیاده سازی متدهای چابک آشنا خواهید شد.

#### ۱- مقداردهی اولیه
برای دریافت یا ارسال پیام از/به سرور چابک، لازم است یک نمونه از کلاس AdpPushClient بسازید و آن را مقداردهی نمایید. یکی از بهترین روش‌ها برای ساختن کلاینت چابک استفاده از کلاس اپلیکیشن پروژه شماست،‌‌ زیرا فراخوانی این متد فقط یکبار کافی ست. به قطعه کد زیر دقت کنید :

{% tabs %}
{% tab OBJECTIVE-C %}
```objectivec
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
{% endtab %}
{% tab SWIFT %}
```swift
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
{% endtab %}
{% endtabs %}

متد `setDevelopment` مشخص می‌کند که برنامه به محیط [آزمایشی](https://sandbox.push.adpdigital.com) چابک متصل شود یا به محیط [عملیاتی](https://panel.push.adpdigital.com). این موضوع بستگی به این دارد که حساب کاربری شما روی کدام محیط تعریف شده باشد.


>`نکته` : توجه داشته باشید هنگامی که **گواهی sandbox اپل** را در پنل تستی قرار می‌دهید، فقط امکان دریافت `Cloud Messaging` در حالت `debug` وجود خواهد داشت. اما اگر **گواهی production اپل** را در محیط عملیاتی قرار دهید، زمانی `Cloud Messaging` را دریافت خواهید کرد که اقدام به ساخت **ipa** از پروژه خود کرده و از طریق TestFlight یا Enterprise اپلیکیشن خود را نصب کنید.


> `نکته` : به طور کلی چابک شامل ۲ محیط تست (سندباکس) و عملیاتی می‌باشد. حساب‌های رایگان چابک (تا ۳۰ هزار کاربر) بر روی محیط سندباکس و حساب‌های پریمیوم روی عملیاتی قرار می‌گیرند. کلاینت چابک به صورت پیش‌فرض بر روی حالت **تست (sandbox)** می‌باشد. برای تغییر به محیط عملیاتی (`setDevelopment:NO`) باید از [**پنل بخش تنظیمات**](https://doc.chabok.io/panel/settings.html#%D8%AF%D8%B1%D8%AE%D9%88%D8%A7%D8%B3%D8%AA-%D8%AD%D8%B3%D8%A7%D8%A8-%D8%B9%D9%85%D9%84%DB%8C%D8%A7%D8%AA%DB%8C) درخواست خود را ثبت نمایید تا پس از تایید، اطلاعات جدید حسابتان (AppId, APIKey, Username و Password) تعیین گردد. 

{% tabs %}
{% tab OBJECTIVE-C %}
```objectivec
[PushClientManager setDevelopment:YES];
```
{% endtab %}
{% tab SWIFT %}
```swift
PushClientManager.setDevelopment(true)
```
{% endtab %}
{% endtabs %}

به منظور استفاده از پلتفرم چابک، ابتدا باید متد `registerApplication` را فراخوانی کرده و مقادیر مورد نیاز جهت فعال سازی کتابخانه چابک را وارد نمایید. در این متد بجای پارامتر‌های `YOUR_APP_ID`, `YOUR_API_KEY`, `SDK_USERNAME`, `SDK_PASSWORD` مقادیر مربوط به حساب چابک خود را که در بخش تنظیمات پنل است، وارد نمایید. نحوه ایجاد حساب در بخش [پیش‌نیازها](/ios/required.html) توضیح داده شده است. در صورت داشتن حساب چابک هم می‌توانید این مقادیر را از [**پنل بخش تنظیمات قسمت دسترسی‌ و توکن‌ها**](https://doc.chabok.io/panel/settings.html#%D8%AF%D8%B3%D8%AA%D8%B1%D8%B3%DB%8C%D9%87%D8%A7-%D9%88-%D8%AA%D9%88%DA%A9%D9%86%D9%87%D8%A7) بردارید.

همانند کد زیر، متد `registerApplication` را در کلاس `AppDelegate` و در متد `didFinishLaunchingWithOptions` فراخوانی کنید :

{% tabs %}
{% tab OBJECTIVE-C %}
```objectivec
[_manager registerApplication:@"APP_ID"
                           apiKey:@"API_KEY(SDK_KEY)"
                         userName:@"SDK_USERNAME"
                         password:@"SDK_PASSWORD"];
```
{% endtab %}
{% tab SWIFT %}
```swift
manager?.registerApplication("APP_ID", apiKey: "API_KEY(SDK_KEY)", userName: "SDK_USERNAME", password: "SDK_PASSWORD")
```
{% endtab %}
{% endtabs %}

جهت دسترسی به `delegate‌های` چابک باید متد `addDelegate` را همانند کد زیر فراخوانی کنید :

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

چابک برای فهمیدن نحوه باز شدن برنامه نیاز به قطعه کد زیر دارد، بنابراین فراخوانی این کد **ضروری** می‌باشد:

{% tabs %}
{% tab OBJECTIVE-C %}
```objectivec
//Check app was launch by clicking on Notification.
if ([_manager application:application didFinishLaunchingWithOptions:launchOptions]) {
	NSLog(@"Application was launch by clicking on Notification...");
}
```
{% endtab %}
{% tab SWIFT %}
```swift
//Check app was launch by clicking on Notification.
let launchByNotification = (manager?.application(application, didFinishLaunchingWithOptions: launchOptions))!
if launchByNotification{
    print("Application was launch by clicking on Notification...")
}
```
{% endtab %}
{% endtabs %}

#### ۲- ثبت کاربر
با استفاده از متد `registerUser` می‌توانید یک نام کاربری به هر کاربر اختصاص دهید. این متد با دو امضای متفاوت وجود دارد: امضای اول که تنها `شناسه کاربر` را گرفته و کاربر را با آن شناسه روی سرور چابک ثبت نام میکند.

> `نکته` : متد `registerUser` باید فقط **یک بار** در طول اجرا اپلیکیشن فراخوانی شود. بعنوان مثال، اگر اپلیکیشن شما دارای صفحه **ثبت نام** است، متد `registerUser` را در این `UIViewController` فراخوانی کنید و و هم پس از ثبت نام، در `AppDelegate`، متد `registerUser` را فراخوانی کنید تا با **شناسه ثبت نام** شده هر بار به سرور چابک متصل شود.

>   `نکته امنیتی` : مقدار `USER_ID` را هرگز به صورت خام در `NSUserDefaults` ذخیره نکنید، چون این مقدار شناسه معنادار می‌باشد و می‌توان با آن  کاربر را روی چابک ثبت‌نام کرد. برای این منظور می‌توانید از متد `PushClientManager.default().userId` چابک استفاده کنید که شناسه کاربر را به صورت رمزنگاری شده نگه‌می‌دارد.

{% tabs %}
{% tab OBJECTIVE-C %}
```objectivec
[self.manager registerUser:@"USER_ID"];
```
{% endtab %}
{% tab SWIFT %}
```swift
self.manager?.registerUser("USER_ID")
```
{% endtab %}
{% endtabs %}

> `نکته` : متغیر `USER_ID` شناسه کاربر برای ثبت نام در چابک می‌باشد و ارسال پیام‌ به کاربران توسط همین شناسه‌ها و بدون استفاده از توکن یا شناسه گوشی، به سادگی امکان پذیر خواهد بود شناسه کاربری می تواند هر فیلد باارزش و معنا‌دار برای کسب و کار شما باشد که کاربر خود را با آن شناسایی می‌کنید. `شماره موبایل، کدملی، شماره حساب و یا ایمیل` مثال‌هایی از شناسه‌های کاربری مناسب در موارد واقعی هستند.
>

> `نکته`: کاراکترهای ‍`#,+,*,\,/` و فاصله در `USER_ID` مجاز نیستند، همچنین طول این رشته نباید کمتر از ۳ و بیشتر از ۳۲ کاراکتر باشد.


امضای دوم که علاوه بر شناسه کاربر، لیستی از نام‌ کانال‌هایی که کاربر باید روی آن‌ها عضو شود را نیز دریافت می کند. با ثبت نام در این کانال‌ها کاربر پیام‌های ارسالی روی آن‌ها را دریافت خواهد نمود.

{% tabs %}
{% tab OBJECTIVE-C %}
```objectivec
[self.manager registerUser:@"USER_ID" channels:@[@"YOUR_CHANNEL" ]];
```
{% endtab %}
{% tab SWIFT %}
```swift
self.manager.registerUser("USER_ID", channels: ["YOUR_CHANNEL"])
```
{% endtab %}
{% endtabs %}

#### ۳- متدهای ضروری
در مرحله آخر شما باید قطعه کد زیر را در کلاس `AppDelegate` قرار دهید تا کتابخانه چابک بتواند راه‌اندازی شود، سه متد فوق برای دریافت token از سرویس `APNs` اپل می‌باشد که چابک برای ارسال پوش نوتیفیکشن به آن نیازمند است.

>`نکته`:پس از قرار دادن کدهای زیر در AppDelegate،
> اطلاعات کاربر در `پنل`  چابک مربوط به [حساب](http://chabok.io)
> برنامه، در قسمت مشترکین، قابل مشاهده خواهد بود و شما می‌توانید از پنل به
> کاربر `مسیج` و `پوش ` بفرستید.

{% tabs %}
{% tab OBJECTIVE-C %}
```objectivec
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
{% endtab %}
{% tab SWIFT %}
```swift
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
{% endtab %}
{% endtabs %}

> نحوه صحیح پیاده سازی متدها در قالب پروژه [Starter](https://github.com/chabok-io/chabok-starter-ios) پیاده سازی شده است.

### متد حذف کاربر

برای حذف دستگاه کاربر از سرور چابک می‌توانید از متدهای زیر استفاده کنید:

{% tabs %}
{% tab OBJECTIVE-C %}
```objectivec
[PushClientManager.defaultManager unregisterUser];
```
{% endtab %}
{% tab SWIFT %}
```swift
PushClientManager.default().unregisterUser()
```
{% endtab %}
{% endtabs %}

### رویداد ها:
با استفاده از دو رویداد `pushClientManagerDidRegisterUser` و `pushClientManagerDidFailRegisterUser` می توانید از ثبت نام و یا مشکل به وجود آماده در عملیات ثبت نام اطلاعات لازم را دریافت کنید :

{% tabs %}
{% tab OBJECTIVE-C %}
```objectivec
- (void)pushClientManagerDidRegisterUser:(BOOL)registration{
// called when PushClientManager Registered user Successfully
}

- (void)pushClientManagerDidFailRegisterUser:(NSError *)error{
// Called When PushClientMangager fail in registerApplication:appVersion:userName:password:
// Or - registerUser:userId and registerAgainWithUserId:userId
NSLog(@"%@ %@",@(__PRETTY_FUNCTION__),error);
// OR
NSLog(@"%@ %@",@(__PRETTY_FUNCTION__),self.manager.failureError);
}
```
{% endtab %}
{% tab SWIFT %}
```swift
func pushClientManagerDidRegisterUser(_ registration: Bool) {
}

func pushClientManagerDidFailRegisterUser(_ error: Error!) {
}
```
{% endtab %}
{% endtabs %}
