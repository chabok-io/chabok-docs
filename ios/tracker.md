---
id: tracker
title: ترکر نصب
layout: ios
permalink: ios/tracker.html
next: push-notification.html
prev: sdk-setup.html
---

> `نکته:` مستندات پیاده‌سازی زیر براساس **نسخه‌های ۲ به بالا** کتابخانه چابک نوشته شده است. در صورتی که از نسخه‌ پایین‌تری استفاده می کنید به [ این صفحه](/ios/tracker-old-version.html) مراجعه کنید.


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

[ج- ثبت کاربر](/ios/tracker.html#ج--ثبت-کاربر)

[د- ثبت اطلاعات کاربر (User Attributes)](/ios/tracker.html#د--ثبت-اطلاعات-کاربر-user-attributes)

<br>

>`نکته:` برای دریافت **advertisingId** باید ‍`AdSupport.framework` را به `Linked Frameworks and Libraries` آن پروژه اضافه کنید.

##### الف- افزودن کتابخانه

کتابخانه چابک از طریق **CocoaPods** در دسترس است، برای نصب آن خط زیر را به `Podfile` خود اضافه کنید:


```bash
target 'YourProject' do
  use_frameworks!

  pod 'ChabokPush', '~> 2.0.1'
  
end
```

سپس با روش زیر آن را نصب کنید:

```bash
$ pod install
```

> `نکته:` توجه داشته باشید که برای اطلاع از آخرین نسخه کتابخانه [این صفحه](/ios/release-note.html) را ببینید. همچنین توصیه می‌کنیم بخش [مدل نسخه‌گذاری در چابک](/ios/sdk-setup.html#مدل-نسخهگذاری-در-چابک-semantic-versioning) را مطالعه نمایید.

<br>

##### ب- مقداردهی (Initialize)

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

##### ج- ثبت کاربر

یکی از مزیت‌های چابک امکان **معرفی** هر کاربر با یک شناسه منحصر به فرد است. این قابلیت به شما امکان می‌دهد دستگاه‌های کاربر را **مدیریت کنید** و [سوابق جمع‌آوری شده را همانند یک سیستم مدیریت مشتریان (CRM) در اختیار داشته باشید](/panel/users.html#جزئیات-کاربر).

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

>   `نکته امنیتی` : مقدار `USER_ID` را هرگز به صورت خام در `NSUserDefaults` ذخیره نکنید، چون این مقدار شناسه معنادار می‌باشد و می‌توان با آن  کاربر را روی چابک ثبت‌نام کرد. برای این منظور می‌توانید از متد `_manager.userId` چابک استفاده کنید که شناسه کاربر را به صورت رمزنگاری شده نگه‌می‌دارد. همینطور می‌توانید قبل از عملیات ثبت با استفاده از شماره گوشی از معتبر بودن کاربر (verfication) [اطمینان یابید](/ios/verification.html)،  سپس شناسه او را ثبت نمایید.


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
```
{% endtab %}
{% endtabs %}

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

{% tabs %}
{% tab sandbox %}
حساب‌ رایگان:
```javascipt
https://sand.chabok.io/JY@4sc
``` 
{% endtab %}
{% tab production %} 
حساب عملیاتی:
```javascipt
https://a.chabok.io/JY@4sc
```  
{% endtab %}
{% endtabs %}

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
