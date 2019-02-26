---
id: tracker
title: ترکر
layout: android
permalink: android/tracker.html
prev: push-notification.html
next: user-management.html
---

ترکر چابک را به آسانی در کمپین‌های تبلیغاتی خود بگذارید و جذب کاربران خود را بهینه کنید. نگران راه‌اندازی هم نباشید 
این صفحه به طور کامل مراحل پیاده‌سازی و استفاده از **ترکر** را قدم به قدم مرور می‌کند.  


<br>

>‍‍`نکته:` در صورتی که از قبل **SDK** چابک را نصب کرده‌ بودید، از مرحله ۳ (رصد رویدادها) شروع کنید.
 
### ۱. شروع 
---

برای ایجاد حساب کاربری کافیست در وبسایت چابک وارد صفحه [شروع کنید](https://chabokpush.com/register.html) شوید و حساب شخصی خود را بسازید. پس از ایجاد حساب و ثبت اپلیکیشن خود، با مراجعه به بخش [تنظیمات پنل](https://sandbox.push.adpdigital.com/front/setting/access) پارامترهای اتصال به چابک که در بخش راه‌اندازی چابک مورد نیاز است، در دسترس خواهد بود.


#### ۱.۱. پیاده‌سازی (SDK Integration)

برای راه‌اندازی SDK چابک ۴ مرحله زیر را به ترتیب انجام ‌دهید:

[الف- افزودن کتابخانه](/android/tracker.html#الف--افزودن-کتابخانه)

[ب- توکن پوش‌نوتیفیکیشن](/android/tracker.html#ب--توکن-پوشنوتیفیکیشن)

[ج- مقداردهی](/android/tracker.html#ج--مقداردهی-initialize)

[د- ثبت کاربر](/android/tracker.html#د--ثبت-کاربر-register)

##### الف- افزودن کتابخانه

کتابخانه چابک از طریق `jcenter` در دسترس است. برای این منظور ابتدا در فایل `gradle` اصلی پروژه، `jcenter` را بعنوان `repository` مطابق قطعه کد زیر اضافه نمایید:

```javascript
buildscript {
  repositories {
    jcenter()
  }
}  
```

فایل `build.gradle` در مسیر `app` را باز کرده و در بخش `dependencies` خط زیر را اضافه نمایید:

```javascript
dependencies {
    implementation 'me.leolin:ShortcutBadger:1.1.22@aar'
    implementation 'com.adpdigital.push:chabok-lib:2.14.1'
    implementation 'com.google.android.gms:play-services-gcm:10.2.6' 
}
```

> `نکته:` توجه داشته باشید که برای اطلاع از آخرین نسخه کتابخانه [این صفحه](/android/release-note.html) را مشاهده کنید و سپس آن را وارد نمایید، همچنین توصیه می‌کنیم بخش [مدل نسخه‌گذاری در چابک](/android/sdk-setup.html#مدل-نسخهگذاری-در-چابک-semantic-versioning) را مطالعه نمایید.

##### ب- توکن پوش‌نوتیفیکیشن

 چابک برای **نمایش پوش‌نوتیفیکیشن** و همچنین تشخیص **حذف و نصب مجدد اپلیکیشن** به دریافت توکن نیاز دارد.
 
کد زیر را به فایل `AndroidManifest.xml` بخش `application` اضافه کنید:  
  
```xml  
<receiver
    android:name="com.google.android.gms.gcm.GcmReceiver"
    android:enabled="true"
    android:exported="true"
    android:permission="com.google.android.c2dm.permission.SEND">
    <intent-filter>
        <action android:name="com.google.android.c2dm.intent.RECEIVE" />
        <action android:name="com.google.android.c2dm.intent.REGISTRATION" />
        <category android:name="MY_APPLICATION_PACKAGE_ID" />
    </intent-filter>
</receiver>
```  

##### ج- مقداردهی (Initialize)

چابک برای راه‌اندازی نیاز به مقداردهی اولیه دارد. متد `init` چابک **باید** در کلاس `Application` در متد `onCreate` تحت هر شرایطی فراخوانی شود.

```java
public class MyAppClass extends Application {

    @Override
    public void onCreate() {
        super.onCreate();

        //AdpPushClient.init() should always be called in onCreate of Application class
        AdpPushClient.init(
                getApplicationContext(),
                MY_ACTIVITY.class,
                "APP_ID/SENDER_ID", //based on your environment
                "API_KEY",          //based on your environment
                "SDK_USERNAME",     //based on your environment
                "SDK_PASSWORD"      //based on your environment
        );

        //true connects to Sandbox environment
        //false connects to Production environment
        AdpPushClient.get().setDevelopment(DEV_MODE);
    }
    
    @Override
    public void onTerminate() {
        if (AdpPushClient.get() != null) {
            AdpPushClient.get().dismiss();
        }

        super.onTerminate();
    }
}
```

در این متد به جای پارامتر‌های `APP_ID/SENDER_ID`, `API_KEY(SDK_KEY)`, `SDK_USERNAME`, `SDK_PASSWORD` مقادیر مربوط به حساب چابک خود را وارد نمایید. نحوه ایجاد حساب در بخش [پیش‌نیازها](/android/required.html) توضیح داده شده است. در صورت داشتن حساب چابک هم می‌توانید این مقادیر را از [**پنل بخش تنظیمات قسمت دسترسی‌ و توکن‌ها**](/panel/settings.html#دسترسیها-و-توکنها) بردارید.


##### د- ثبت کاربر (Register)

یکی از مزیت‌های چابک امکان **معرفی** هر کاربر با یک شناسه منحصر به فرد است. این قابلیت به شما امکان می‌دهد دستگاه‌های کاربر را **مدیریت کنید** و سوابق جمع‌آوری شده را همانند یک سیستم مدیریت مشتریان (CRM) در اختیار داشته باشید.

 متد `register` عمل **اتصال** به سرور چابک را انجام می‌دهد، بنابراین باید **فقط یک بار** در طول اجرای اپلیکیشن (در کلاس application) فراخوانی شود: (برای اطلاعات بیشتر می‌توانید بخش [ثبت کاربر](/android/sdk-setup.html#۴--ثبت-کاربر-register) را مطالعه کنید.) 

```java
AdpPushClient.get().register("USER_ID");
```

به عنوان مثال اگر اپلیکیشن شما دارای صفحه **ورود** و **ثبت‌نام** می‌باشد، متد `register` را در صفحه **ورود** یا **ثبت‌نام** پس از **احراز هویت کاربر** و همچنین، پس از هر بار اجرای (در کلاس `Application` متد `onCreate`) اپلیکیشن فراخوانی کنید تا کاربر به سرور چابک متصل شود.

```java
@Override
public void onCreate() {
    super.onCreate();

    ...
    
    String userId = AdpPushClient.get().getUserId();
    
    if (userId != null && !userId.isEmpty()) {
        AdpPushClient.get().register(userId);
    } else {

        //If user is not registered verify the user and
        //call AdpPushClient.get().register("USER_ID") method at login page
        AdpPushClient.get().register("USER_ID");
    }
}
```

> `نکته`: کاراکترهای ‍`#,+,*,\,/` و فاصله در `USER_ID` مجاز نیستند، همچنین طول این رشته نباید کمتر از ۳ و بیشتر از ۳۲ کاراکتر باشد.


#### ۲.۱. رصد رویدادها (Tracking Events)

شما می‌توانید رفتار کاربر را در اپلیکیشن خود به طور **لحظه‌ای** رصد کنید.

با کد زیر می‌توانید  رفتار (رویداد) را در چابک رصد کنید:  
  
```java  
JSONObject data = new JSONObject();  
data.put("currency", "EUR");  
data.put("revenue", 0.01)  
data.put("orderId", "{OrderId}");  
  
AdpPushClient.get().track("abc123", data);  
```
برای اطلاعات بیشتر مربوط به رصد رویدادها [اینجا](/android/behavior-tracking.html) را مطالعه کنید.

#### ۳.۱. تست راه‌اندازی

اگر عملیات ثبت‌ کاربر به درستی انجام شده باشد، اطلاعات کاربر در **پنل**  چابک مربوط به [حساب](https://sandbox.push.adpdigital.com/front/users/subscribers/list) برنامه، در قسمت **کاربران** قابل مشاهده خواهد بود و شما می‌توانید از پنل برای کاربر **پیام** ارسال کنید.

پس از اینکه **SDK** چابک را راه‌اندازی کردید، می‌توانید برای اطمینان از موفق بودن آن روی محیط آزمایشی (سندباکس) تست کنید. از این محیط می‌توانید تمام امکانات ترکر را تجربه کنید. 

البته محیط آزمایشی فقط برای تست است و دارای محدودیت سقف کاربر می‌باشد. بنابراین برای اپلیکیشن‌های تجاری و اپ‌استور توصیه می‌کنیم از حساب عملیاتی که این سقف را ندارد، استفاده کنید.

#### ۴.۱. انتشار اپلیکیشن در استورها

به طور کلی چابک دارای دو نوع حساب آزمایشی (Sandbox) و عملیاتی (Production) است. در صورتی که روی حساب رایگان (آزمایشی) هستید می‌توانید روی همان حساب نسخه جدید را منتشر کنید. در صورتی هم که حساب عملیاتی دارید باید حتما روی محیط عملیاتی نسخه جدید اپلیکیشن خود را در استورها منتشر کنید.

<br><br>

### ۲. ترک نصب‌ها 
---
 
با افزودن SDK چابک و راه‌اندازی آن دراپلیکیشنتان می‌توانید برای کمپین‌های تبلیغاتی خود ترکر ایجاد کنید.

#### ۱.۲. ایجاد لینک ترکر

برای ایجاد لینک ترکر فقط کافیست وارد صفحه **ترکر** پنل شوید و روی **ترکر جدید** کلیک کنید.

نمونه لینک ترکر چابک:
```
https://sand.chabokpush.com/JY@4sc
```  
برای اطلاعات بیشتر درباره ایجاد ترکر جدید و مشاهده نمونه‌ای از آن می‌توانید به مستندات [پنل](/panel/tracker.html#ایجاد-ترکر-جدید) مراجعه کنید.

#### ۲.۲. انتشار لینک ترکر

پس از ایجاد یک ترکر جدید و گرفتن لینک آن کافی است آن را در کمپین‌های تبلیغاتی خود قرار دهید.
با این کار ترکر شما فعالیت خود را آغاز می‌کند و از این پس هر کلیک و نصب به صورت لحظه‌ای در پنل قابل مشاهده خواهد بود.


<br><br>

### ۳. کال‌بک‌های ترکر
---

در صورتی هم که می‌خواهید داده‌های ترکر را در سیستم‌های دیگر از جمله سرورهای خود دریافت کنید می‌توانید از کال‌بک استفاده کنید. این کار را می‌توانید از پنل هنگام ایجاد ترکر جدید انجام دهید. به این ترتیب که لینکی که می‌خواهید زمان رخ دادن رویداد (کلیک یا نصب) فرخوانی شود را وارد می‌کنید. 

همچنین شما می‌توانید در کال‌بک خود از پارامترهایی برای اطلاعات بیشتر از مبدا رویداد کسب کنید. برای مشاهده این پارامترها و نمونه لینک کال‌بک می‌توانید به مستندات [پنل](/panel/tracker.html#کالبک) مراجعه کنید.

<br><br>

### ۴. آشنایی با برخی مفاهیم ترکر
---

- **اتریبیوشن**: نصب‌هایی که از طریق کمپین‌های تبلیغاتی شمرده می‌شوند.

- **بازدید**: هر بار که اپلیکیشن باز شود یک بازدید محاسبه می‌شود.

- **ترکر**: ابزار شمارش و رصد کمپین‌های تبلیغاتی را ترکر می‌نامند.

- **رد شده**: نصب‌ها و کلیک‌هایی که غیر واقعی تشخیص داده می‌شوند و در شمارش محاسبه نمی‌شوند.

- **رویداد**: هرگونه تعامل کاربر با اپلیکیشن، یک رویداد در نظر گرفته می‌شود. 

- **نصب**: اولین بازدید هر کاربر نصب به حساب می‌آید.

