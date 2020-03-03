---
id: sdk-setup
title: راه‌اندازی
layout: ios
permalink: ios/sdk-setup.html
prev: required.html
next: tracker.html
---

> `نکته:` مستندات پیاده‌سازی زیر براساس **نسخه‌های ۲ به بالا** کتابخانه چابک نوشته شده است. در صورتی که از نسخه‌ پایین‌تری استفاده می‌کنید به [ این صفحه](/ios/sdk-setup-old-version.html) مراجعه کنید.

پس از طی کردن مراحل صفحه [پیش‌نیازها](/ios/required.html)، می‌توانید **راه‌اندازی SDK چابک** را شروع کنید. در ابتدا شما باید کتابخانه چابک را [نصب کنید](/ios/sdk-setup.html#۱--نصب-کتابخانه)، سپس [مقداردهی و راه‌اندازی](/ios/sdk-setup.html#۲--مقداردهی-اولیه-initialize) کتابخانه چابک را در اپلیکیشنتان انجام دهید و در آخر برای شناخت کاربر توسط چابک، مرحله [ثبت کاربر](/ios/sdk-setup.html#۳--ثبت-کاربر) را حتما پشت سر بگذارید.

[۱- نصب کتابخانه](/ios/sdk-setup.html#۱--نصب-کتابخانه)

[۲- مقداردهی اولیه (Initialize)](/ios/sdk-setup.html#۲--مقداردهی-اولیه-initialize)

[۳- ثبت کاربر](/ios/sdk-setup.html#۳--ثبت-کاربر)

<Br>

### ۱- نصب کتابخانه

کتابخانه چابک از طریق CocoaPods در دسترس است، برای نصب خط زیر را به `Podfile` خود اضافه کنید:


```bash
target 'YourProject' do
  use_frameworks!

  pod 'ChabokPush', '~> 2.1.0'
  
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

چابک برای راه‌اندازی نیاز به **مقداردهی اولیه** دارد.


۱- برای مقداردهی ابتدا از پنل خود بخش **تنظیمات> دسترسی و توکن‌ها> کتابخانه موبایل> راه‌اندازی هوشمند** فایل **Chabok.sandbox.plist**  یا  **Chabok.production.plist**  (بسته به محیطتان) را دانلود کنید.

![enter image description here](http://uupload.ir/files/hgt4_ios-configuration-file.png)

> `نکته:` برای غیر فعال کردن دریافت توکن پوش‌نوتیفیکیشن، کافیست مقدار پیش‌فرض آن را در فایل دانلود شده تغییر دهید.

<br>

۲- فایل دانلود شده را در `Bundle Resources` پروژه خود مطابق تصویر اضافه کنید:

![](https://github.com/chabok-io/chabok-assets/raw/master/chabok-docs/ios/chabok-plist.png)
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

یکی از مزیت‌های چابک نسبت به درگاه‌های ارسال پوش‌نوتیفیکیشن، امکان **معرفی** هر کاربر با یک شناسه منحصر به فرد است. این قابلیت به شما امکان می‌دهد دستگاه‌های کاربر را **مدیریت کنید** و سوابق جمع‌آوری شده را همانند یک سیستم مدیریت مشتریان (CRM) در اختیار داشته باشید. این شناسه می‌تواند برای **دستگاه‌های متعدد یک کاربر** استفاده شود. شناسه کاربر می‌تواند هر فیلد با ارزش و معنا‌دار برای کسب و کار شما باشد که کاربر خود را با آن شناسایی می‌کنید. **شماره موبایل**، **کدملی**، **شماره‌حساب**، **ایمیل** و یا حتی **شناسه دیتابیس‌تان** مثال‌هایی از شناسه‌های کاربری مناسب در موارد واقعی هستند. ارسال پیام‌ به کاربران توسط همین شناسه‌ها و بدون استفاده از توکن یا شناسه گوشی، به سادگی امکان پذیر خواهد بود.

#### ورود به حساب کاربری (Login)

>` نکته:` دقت داشته باشید که متدهای `login` و `logout` را در **background thread** فراخوانی **نکنید** و آن‌ها را حتما در **main thread** قرار دهید.

متد ثبت کاربر با سه امضای متفاوت وجود دارد:

- امضای اول

فقط شناسه کاربر را گرفته و کاربر را با آن شناسه روی سرور چابک ثبت نام می‌کند.

{% tabs %}
{% tab OBJECTIVE-C %}

```objectivec
[PushClientManager.defaultManager login:@"USER_ID"];
```
{% endtab %}
{% tab SWIFT %}

```swift
PushClientManager.default()?.login("USER_ID")
```
{% endtab %}
{% endtabs %}

>` نکته:` در صورتی از نسخه‌های قبل چابک استفاده می‌کردید و کاربر از قبل ثبت شده بود، توصیه می‌کنیم خودتان بلافاصله پس از مقداردهی این را مدیریت کنید.

<br>


> `نکته`: مقدار `USER_ID` می‌تواند **بین ۳ تا ۶۴** کاراکتر باشد. زبان فاسی، کاراکترهای `#,+,*,\,/` و فاصله هم در آن **مجاز نیستند**.

>   `نکته امنیتی` : مقدار `USER_ID` را هرگز به صورت خام در `NSUserDefaults` ذخیره نکنید، چون این مقدار شناسه معنادار می‌باشد و می‌توان با آن  کاربر را روی چابک ثبت‌نام کرد. همینطور می‌توانید قبل از عملیات ثبت با استفاده از شماره گوشی از معتبر بودن کاربر (verfication) [اطمینان یابید](/ios/verification.html)،  سپس شناسه او را ثبت نمایید.


- امضای دوم

 علاوه بر شناسه کاربر، اطلاعات کاربر (Attributes) را دریافت می‌کند.
 
 {% tabs %}
 {% tab OBJECTIVE-C %}
 
```objectivec
[PushClientManager.defaultManager login:@"USER_ID" userAttributes:];
```
{% endtab %}
{% tab SWIFT %}

```swift
PushClientManager.default()?.login("USER_ID", userAttributes: [AnyHashable : Any])
```
{% endtab %}
{% endtabs %}

>`نکته`:پس از انجام مراحل فوق در پنل چابک مربوط به [حساب](http://chabok.io) برنامه، در قسمت مشترکین، قابل مشاهده خواهد بود و شما می‌توانید از پنل به کاربر پیام چابک و پوش‌نوتیفیکیشن بفرستید.

- امضای سوم

علاوه بر شناسه کاربر، رفتار مورد نظر کاربر را رصد می‌کند.

{% tabs %}
{% tab OBJECTIVE-C %}

```objectivec
[PushClientManager.defaultManager login:@"USER_ID" event:@"EVENT_NAME" data:]
```
{% endtab %}
{% tab SWIFT %}

```swift
PushClientManager.default()?.login("USER_ID", event: "EVENT_NAME", data: [AnyHashable : Any])
```
{% endtab %}
{% endtabs %}

#### خروج از حساب کاربری (Logout)

در صورتی که کاربر از حساب کاربری خود خارج شد، با فراخوانی متد زیر می‌توانید کاربر را همچنان با یک تگ مهمان در سیستم خود داشته باشید و تعاملتان را با او ادامه دهید.

{% tabs %}
{% tab OBJECTIVE-C %}

```objectivec
[PushClientManager.defaultManager logout];
```
{% endtab %}
{% tab SWIFT %}

```swift
PushClientManager.default()?.logout()
```
{% endtab %}
{% endtabs %}

> `نکته:` پروژه [Starter](https://github.com/chabok-io/chabok-starter-ios) به شما کمک می‌کند بدون هیچ کد اضافه‌ای و فقط با اجرای آن، از پلتفرم چابک استفاده کنید. همچنین به کمک این پروژه با نحوه صحیح پیاده‌سازی متدهای چابک آشنا خواهید شد.
