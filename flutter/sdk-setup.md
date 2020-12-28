---
id: sdk-setup
title: راه‌اندازی
layout: flutter
permalink: flutter/sdk-setup.html
prev: required.html
next: tracker.html
---

پس از طی کردن مراحل صفحه [پیش‌نیازها](/flutter/required.html)، می‌توانید **راه‌اندازی SDK چابک** را شروع کنید. در ابتدا شما باید کتابخانه چابک را [نصب کنید](/flutter/sdk-setup.html#۱--نصب-کتابخانه). در انتها، [مقداردهی و راه‌اندازی](/flutter/sdk-setup.html#۲--مقداردهی-اولیه-initialize) کتابخانه چابک را در اپلیکیشنتان انجام دهید و برای شناخت کاربر توسط چابک، مرحله [ثبت کاربر](/flutter/sdk-setup.html#۳--ثبت-کاربر) را حتما پشت سر بگذارید.

برای انجام موفق این کارها باید تمام مراحل زیر را به ترتیب انجام دهید:

[ ۱- نصب کتابخانه](/flutter/sdk-setup.html#۱--نصب-کتابخانه)

[۲- مقداردهی اولیه (Initialize)](/flutter/sdk-setup.html#۲--مقداردهی-اولیه-initialize)

[۳- ثبت کاربر](/flutter/sdk-setup.html#۳--ثبت-کاربر)

[ ۴- تست پیاده‌سازی](/flutter/sdk-setup.html#۴--تست-پیادهسازی)


<br>

### ۱- نصب کتابخانه  
---

#### نصب کتابخانه فلاتر 

برای نصب کتابخانه کافی است در بخش **dependencies** فایل `pubspec.yaml‍`، چابک را مانند زیر اضافه کنید:

```yaml
dependencies:
    chabokpush: ^1.0.2 
```

و پس از آن دستور زیر را در ترمینال در مسیر پروژه خود اجرا کنید:

```bash
flutter pub get
```

حالا باید در پروژه خود کد زیر را ایمپورت کنید:

```bash
import 'package:chabokpush/chabokpush.dart';
```

>`نکته:` دقت داشته باشید که [اندروید](/sdk-setup.html#۱-۲-نصب-کتابخانه-اندروید) و [آی‌اواس](/sdk-setup.html#۱-۳-نصب-کتابخانه-آیاواس) نیاز به نصب جداگانه دارند که در ادامه به هر دو پرداخته می‌شود:

#### نصب کتابخانه اندروید 

برای دریافت کتابخانه چابک دستورات زیر را به فایل `build.gradle` اصلی پروژه اضافه کنید:

```javascript  
buildscript {
    repositories {
        google()
        jcenter()
        maven {
            url "https://plugins.gradle.org/m2/" 
        }
    }
    
    dependencies {    
        classpath 'io.chabok.plugin:chabok-services:1.0.0'
        classpath 'com.google.gms:google-services:4.3.2'
    }
}
```

دستور زیر را در انتهای فایل `build.gradle` ماژول اپلیکیشن خود اضافه کنید:

```javascript  
apply plugin: 'io.chabok.plugin.chabok-services'
apply plugin: 'com.google.gms.google-services'
```

>`نکته:`
 این فایل عموما در مسیر زیر وجود دارد:
**app/build.gradle**

#### نصب کتابخانه آی‌او‌اس 

به پوشه پروژه ios بروید و دستور زیر را در ترمینال اجرا کنید:

```bash
$ pod install --repo-update
```

حالا برای اطمینان از نصب، پروژه را در `xcode` باز کنید ، اگر header فایل چابک را مشاهده کردید، نصب کتابخانه آی‌او‌اس موفقیت آمیز بوده است.

<br><br>

### ۲- مقداردهی اولیه (Initialize)  
---
#### مقدار‌دهی اولیه اندروید 

چابک برای راه اندازی نیاز به **مقداردهی اولیه** دارد.
<br>
۱. برای مقداردهی ابتدا از پنل خود وارد بخش **تنظیمات**> **دسترسی و توکن‌ها**> **کتابخانه موبایل**> **فعال‌سازی راه‌اندازی هوشمند**> شوید و فایل **Chabok.sandbox.json** یا **Chabok.production.json** را بسته به محیطتان دانلود کنید.

![enter image description here](http://uupload.ir/files/o0d_android-access-tokens.png)

>`نکته:`
برای غیرفعال کردن قابلیت **پوش نوتیفیکیشن**(pushNotification)، کافیست مقدار پیش ‌فرض آن را در فایل دانلود شده تغییر بدید.

۲. فایل دانلود شده را در پوشه ماژول اصلی پروژه قرار دهید.
<p class="text-center">
<img width="90%" src="http://uupload.ir/files/pby6_download-file-in-main-module-of-project.gif">
</p>

<br>

۳. در مرحله آخر نیاز است کد‌های زیر را در کلاس اپلیکیشن خود فراخوانی کنید.

```java
import com.adpdigital.push.AdpPushClient;
import com.adpdigital.push.config.Environment;

import io.flutter.app.FlutterApplication;

public class MyAppClass extends FlutterApplication {
    @Override
    public void onCreate() {
        super.onCreate();

        AdpPushClient.configureEnvironment(Environment.SANDBOX); // or PRODUCTION
    }
}
```

قطعه کد زیر را در فایل `AndroidManifest.xml` پروژه خود قرار دهید:

```xml
<application
    android:name=".MyAppClass">
</application>
```

 با قرار دادن کد زیر در فایل `AndroidManifest.xml` در تگ `Application` می‌توانید آیکون پیش‌فرض نوتیفیکیشن را به چابک معرفی کنید:
 
 ```xml
<meta-data
            android:name="com.adpdigital.push.client.default_notification_icon"
            android:resource="@drawable/ic_notification_icon" />
```

<br>

-**configureEnvironment**: متد `configureEnvironment` تعیین می‌کند که اپلیکیشن شما به محیط [آزمایشی (Sandbox)](https://sandbox.push.adpdigital.com) و یا [عملیاتی (Production) ](https://panel.push.adpdigital.com) چابک متصل شده. این موضوع بستگی به این دارد که حساب کاربری شما روی کدام محیط تعریف شده باشد.  

>`نکته:`متدی که در بالا قرار دادیم برای راه‌اندازی محیط سندباکس است. در صورتی که **حساب عملیاتی** دارید کافیست `Environment.SANDBOX` را با `Environment.PRODUCTION` عوض کنید.
<br>

> `نکته`: برای درخواست حساب محیط **عملیاتی**، در بخش تنظیمات پنل، وارد بخش [**درخواست حساب عملیاتی**](https://sandbox.push.adpdigital.com/front/setting/accountRequest) شوید و درخواست خود را ثبت نمایید و پس از تایید و ساخت حساب عملیاتی فایل **Chabok.production.json** را دانلود کنید و به جای فایل **Chabok.sandbox.json** در پوشه ماژول اصلی پروژه خود قراردهید. 

> `نکته:` دقت داشته باشید که **قابلیت آنی (realtime)**  چابک به طور پیش فرض **غیر فعال** است. برای فعال کردن مقدار قابلیت آنی (realtime)، کافی است مقدار پیش‌فرض آن را در فایل دانلود شده تغییر بدید. این قابلیت در[ پیام چابک](/android/chabok-messaging.html) و [پیام‌رسانی آنی](/android/event-handling.html) استفاده می‌شود.

####  مقدار‌دهی اولیه آی‌او‌اس 

چابک برای راه‌اندازی نیاز به **مقداردهی اولیه** دارد.

۱- برای مقداردهی ابتدا از پنل خود بخش **تنظیمات> دسترسی و توکن‌ها> کتابخانه موبایل> راه‌اندازی هوشمند** فایل **Chabok.sandbox.plist**  یا  **Chabok.production.plist**  (بسته به محیطتان) را دانلود کنید.

![enter image description here](http://uupload.ir/files/labq_ios-setup-access-tokens.png)

> `نکته:` برای غیر فعال کردن دریافت توکن پوش‌نوتیفیکیشن، کافیست مقدار پیش‌فرض آن را در فایل دانلود شده تغییر دهید.

<br>

۲- فایل دانلود شده را در `Bundle Resources` پروژه خود مطابق تصویر اضافه کنید:

![](https://github.com/chabok-io/chabok-assets/raw/master/chabok-docs/ios/chabok-plist.png)

<br>

۳- در آخر متد چابک را در کلاس `AppDelegate` و متد `didFinishLaunchingWithOptions` فراخوانی کنید.

{% tabs %}
{% tab OBJECTIVE-C %}
```objectivec
#import "AppDelegate.h"
#import "GeneratedPluginRegistrant.h"
#import <AdpPushClient/AdpPushClient.h>

@implementation AppDelegate
- (BOOL)application:(UIApplication *)application
            didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
            
    [PushClientManager.defaultManager configureEnvironment:Sandbox]; // or PRODUCTION
    
    [GeneratedPluginRegistrant registerWithRegistry:self];
    // Override point for customization after application launch.
    return [super application:application didFinishLaunchingWithOptions:launchOptions];
}
@end
```
{% endtab %}
{% tab SWIFT %}
```swift
import UIKit
import AdpPushClient

@UIApplicationMain
class AppDelegate: UIResponder, UIApplicationDelegate {
    func application(_ application: UIApplication,
            didFinishLaunchingWithOptions launchOptions: [UIApplicationLaunchOptionsKey: Any]?) -> Bool {
    PushClientManager.default()?.configureEnvironment(.Sandbox) // or PRODUCTION
    
    GeneratedPluginRegistrant.register(with: self)
    return super.application(application, didFinishLaunchingWithOptions: launchOptions)
}
```
{% endtab %}
{% endtabs %}

> `نکته`: متد بالا برای محیط سندباکس است. در صورتی که حساب عملیاتی دارید کافیست فقط `Sandbox` را با ‍‍`Production` عوض کنید.

> `نکته`: برای درخواست حساب محیط **عملیاتی**، در بخش تنظیمات پنل، وارد بخش [**درخواست حساب عملیاتی**](https://sandbox.push.adpdigital.com/front/setting/accountRequest) شوید و درخواست خود را ثبت نمایید و پس از تایید و ساخت حساب عملیاتی فایل **Chabok.production.plist** را دنلود کنید و به جای فایل **Chabok.sandbox.plist** در روت پروژه خود قراردهید. 

>`نکته` : توجه داشته باشید هنگامی که **گواهی sandbox اپل** را در پنل تستی قرار می‌دهید، فقط امکان دریافت `Push Notification` در حالت `debug` وجود خواهد داشت. اما اگر **گواهی production اپل** را در محیط عملیاتی قرار دهید، زمانی `Push Notification` را دریافت خواهید کرد که اقدام به ساخت **ipa** از پروژه خود کرده و از طریق TestFlight یا Enterprise اپلیکیشن خود را نصب کنید.

> `نکته:` دقت داشته باشید که **قابلیت آنی (realtime)**  چابک به طور پیش فرض **غیر فعال** است. این قابلیت در[ پیام چابک](/ios/chabok-messaging.html) و [پیام‌رسانی آنی](/ios/event-handling.html) استفاده می‌شود.

<br><br>

### ۳- ثبت کاربر 
---
یکی از مزیت‌های چابک نسبت به درگاه‌های ارسال پوش‌نوتیفیکیشن، امکان **معرفی** هر کاربر با یک شناسه منحصر به فرد است. این قابلیت به شما امکان می‌دهد دستگاه‌های کاربر را **مدیریت کنید** و سوابق جمع‌آوری شده را همانند یک سیستم مدیریت مشتریان (CRM) در اختیار داشته باشید.       
این شناسه می‌تواند برای **دستگاه‌های متعدد یک کاربر** استفاده شود. شناسه کاربر می‌تواند هر فیلد با ارزش و معنا‌دار برای کسب و کار شما باشد که کاربر خود را با آن شناسایی می‌کنید. **شماره موبایل**، **کدملی**، **شماره‌حساب**، **ایمیل** و یا حتی **شناسه دیتابیس‌تان** مثال‌هایی از شناسه‌های کاربری مناسب در موارد واقعی هستند. ارسال پیام‌ به کاربران توسط همین شناسه‌ها و بدون استفاده از توکن یا شناسه گوشی، به سادگی امکان پذیر خواهد بود.      
 
#### ورود به حساب کاربری (login)
متد لاگین تنها زمانی فراخوانی شود که کاربر در اپلیکیشن لاگین یا ثبت‌نام می‌کند. نیازی به فراخوانی این متد در هر بار اجرای اپلیکیشن نیست.

<p>
فقط شناسه کاربر را گرفته و کاربر را با آن شناسه بر روی سرور چابک ثبت‌ نام می‌کند.
</p>

```dart
ChabokPush.shared.login("user_id");
```

>`نکته:` مقدار `USER_ID` می‌تواند **بین ۳ تا ۶۴** کاراکتر باشد. زبان فاسی، کاراکترهای `#,+,*,\,/` و فاصله هم در آن **مجاز نیستند**.

#### خروج از حساب کاربری (logout)

در صورتی که کاربر از حساب کاربری خود خارج شد، با فراخوانی متد زیر می‌توانید کاربر را همچنان با یک تگ مهمان در سیستم خود داشته باشید و تعاملتان را با او ادامه دهید.

```dart
ChabokPush.shared.logout();
```

<br><br>

### ۴- تست پیاده‌سازی
---
برای اطمینان از موفقیت‌آمیز بودن راه‌اندازی لطفا تست‌های زیر را انجام دهید.

#### تست SDK

##### آیا پس از راه‌اندازی، دستگاه شما به پنل اضافه شده است؟
در منوی **کاربران** می‌توانید دستگاه‌های موجود را همراه با جزئیات مشاهده کنید. **پس از بازدید اول** از اپلیکیشن اطلاعات دستگاه خود را در پنل با دقت **مطابقت دهید**.

> `نکته:` دقت داشته باشید که **آخرین نسخه SDK** را دریافت کنید و موارد **لیست تغییرات** را مطالعه کنید.

<br>

![](http://uupload.ir/files/w2il_sdk-test.png)

<br><br>

#### تست login کاربران

##### ۱- آیا وضعیت کاربران درست ثبت شده است؟ (لاگین، مهمان، حذف کرده/نکرده)

در صورتی که در اپلیکیشن بخش لاگین دارید، ( [پیاده‌سازی](/flutter/sdk-setup.html#%D9%88%D8%B1%D9%88%D8%AF-%D8%A8%D9%87-%D8%AD%D8%B3%D8%A7%D8%A8-%DA%A9%D8%A7%D8%B1%D8%A8%D8%B1%DB%8C-login) آن را از چابک کرده‌اید) می‌توانید در فیلتر سگمنت جدید  گزینه **وضعیت کاربر** را انتخاب کنید تا متوجه شوید کاربر در چه وضعیتی (لاگین، مهمان، حذف کرده و حذف نکرده)  قرار دارد.

<br>

![](http://uupload.ir/files/ud1r_user-status.png)

<br>

##### ۲- آیا پنل به درستی کاربران را در صورت خروج از اپلیکیشن (logout) به کاربر مهمان تبدیل می‌کند؟
وقتی کاربران بر روی گزینه logout در اپلیکیشن کلیک می‌کنند و از اپ خارج می‌شوند، اطلاعاتشان در چابک ذخیره می‌شود و یک شناسه دیگری به هر کاربر خارج شده اختصاص می‌دهد تا وقتی مجدد وارد اپلیکیشن شود شناسه کاربری او تغییر کند. این کاربران در بخش سگمنت قابل مشاهده‌اند.

<br>

![enter image description here](http://uupload.ir/files/h13x_login-vs-guest.png)

<br><br>

> `نکته:` پروژه [Starter](https://github.com/chabok-io/chabok-client-flutter/tree/master/example) به شما کمک می‌کند بدون هیچ کد اضافه‌ای و فقط با اجرای آن، از پلتفرم چابک استفاده کنید. همچنین به کمک این پروژه با نحوه صحیح پیاده سازی متدهای چابک آشنا خواهید شد.
