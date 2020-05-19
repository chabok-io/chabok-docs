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

[۴- تست پیاده‌سازی](/ios/sdk-setup.html#۴--تست-پیادهسازی)

<Br>

### ۱- نصب کتابخانه
---

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

<Br><Br>

### ۲- مقداردهی اولیه (Initialize)
---

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

<br><Br>

### ۳- ثبت کاربر
---

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

<br><br>

### ۴- تست پیاده‌سازی
---
برای اطمینان از موفقیت‌آمیز بودن راه‌اندازی لطفا تست‌های زیر را انجام دهید.

#### تست SDK

##### آیا پس از راه‌اندازی، دستگاه شما به پنل اضافه شده است؟
در منوی **کاربران** می‌توانید دستگاه‌های موجود را همراه با جزئیات مشاهده کنید. پس از بازدید اول از اپلیکیشن اطلاعات دستگاه خود را در پنل با دقت **مطابقت دهید**.

> `نکته:` دقت داشته باشید که **آخرین نسخه SDK** را دریافت کنید و موارد **لیست تغییرات** را مطالعه کنید.

<br>

![
](http://uupload.ir/files/g9f0_user-successful.png)

<br><br>

#### تست login کاربران

##### ۱- آیا در اپلیکیشن امکان login و logout دارید؟

اگر دارید (و [پیاده‌سازی](/android/sdk-setup.html#%D9%88%D8%B1%D9%88%D8%AF-%D8%A8%D9%87-%D8%AD%D8%B3%D8%A7%D8%A8-%DA%A9%D8%A7%D8%B1%D8%A8%D8%B1%DB%8C-login) آن را از چابک کرده‌اید) می‌توانید در فیلتر سگمنت جدید  گزینه **وضعیت کاربر** را انتخاب کنید تا متوجه شوید کاربر در چه وضعیتی (لاگین، مهمان، حذف کرده و حذف نکرده)  قرار دارد.

<br>

![
](http://uupload.ir/files/q4hh_user-login.png)

<br>

##### ۲- پس از ورود کاربر (login) به اپلیکیشن، آیا کاربر به عنوان کاربر login شده در پنل ثبت می‌شود؟
این را هم می‌توانید در بخش سگمنت هم از طریق تعداد کاربران و هم زمان لاگین آن‌ها بررسی کنید.

##### ۳- آیا پنل به درستی کاربران را در صورت خروج از اپلیکیشن (logout) به کاربر مهمان تبدیل می‌کند؟
وقتی کاربران بر روی گزینه logout در اپلیکیشن کلیک می‌کنند و از اپ خارج می‌شوند، اطلاعاتشان در چابک ذخیره می‌شود و یک شناسه دیگری به هر کاربر خارج شده اختصاص می‌دهد تا وقتی مجدد وارد اپلیکیشن شود شناسه کاربری او تغییر کند. این کاربران در بخش سگمنت قابل مشاهده‌اند.

<br>

![enter image description here](http://uupload.ir/files/jbgl_login-vs-logout-2.png)
<br><br>


> `نکته:` پروژه [Starter](https://github.com/chabok-io/chabok-starter-ios) به شما کمک می‌کند بدون هیچ کد اضافه‌ای و فقط با اجرای آن، از پلتفرم چابک استفاده کنید. همچنین به کمک این پروژه با نحوه صحیح پیاده‌سازی متدهای چابک آشنا خواهید شد.
