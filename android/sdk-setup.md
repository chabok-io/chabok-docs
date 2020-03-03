---  
id: sdk-setup
title: راه‌اندازی  
layout: android  
permalink: android/sdk-setup.html  
prev: required.html  
next: tracker.html  
---  

> `نکته:` مستندات پیاده‌سازی زیر براساس **نسخه‌های ۳ به بالا** کتابخانه چابک نوشته شده است. در صورتی که از نسخه‌ پایین‌تری استفاده می‌کنید به [این صفحه](/android/sdk-setup-old.html) مراجعه کنید.
>
> اگر از نسخه‌های پایین‌تر از ۳ کتابخانه چابک استفاده می‌کنید توصیه می‌کنیم کتابخانه چابک را به نسخه ۳ **ارتقا** دهید.
>
> در صورتی که می‌خواهید نسخه خود را ارتقا دهید، حتما [مستندات مهاجرت](/android/upgrade-chabok-to-3-0-0.html) به نسخه ۳ چابک را مطالعه کنید. 

پس از طی کردن مراحل صفحه [پیش‌نیاز‌ها](/android/required.html)، می‌توانید **راه‌اندازی SDK چابک** را شروع کنید.
 برای انجام این مراحل ابتدا نیاز است کتابخانه چابک را <a href="https://doc.chabok.io/android/sdk-setup.html#%DB%B1--%D9%86%D8%B5%D8%A8-%DA%A9%D8%AA%D8%A7%D8%A8%D8%AE%D8%A7%D9%86%D9%87">نصب</a> کنید. سپس [مقداردهی و راه‌اندازی](/android/sdk-setup.html#۲--مقداردهی-اولیه-initialize) کتابخانه چابک را در اپلیکیشنتان انجام دهید و در آخر برای شناخت کاربر توسط چابک، مرحله[ ثبت کاربر](/android/sdk-setup.html#۳--ثبت-کاربر)   را حتما پشت سر بگذارید. 
  
[ ۱- نصب کتابخانه](/android/sdk-setup.html#۱--نصب-کتابخانه)  
  
[۲- مقداردهی اولیه (Initialize)](/android/sdk-setup.html#۲--مقداردهی-اولیه-initialize)  
  
[ ۳- ثبت کاربر](/android/sdk-setup.html#۳--ثبت-کاربر)  
  
### ۱- نصب کتابخانه 
برای دریافت کتابخانه چابک دستورات زیر را به فایل `build.gradle` اصلی پروژه اضافه کنید (این فایل عموما در مسیر **app/build.gradle** وجود دارد):

```groovy  
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

```groovy  
apply plugin: 'io.chabok.plugin.chabok-services'
apply plugin: 'com.google.gms.google-services'
```

در این قسمت شما باید *کتابخانه استاندارد* **یا** *کتابخانه با قابلیت مکان‌یابی* را نصب نمایید. برای استفاده از **سرویس پیام‌رسانی** و **قابلیت‌های آنی چابک** می‌توانید از [کتابخانه استاندارد](/android/sdk-setup.html#نصب-کتابخانه-استاندارد-چابک) بهره ببرید. در صورتی هم که می‌خواهید این‌ امکانات را همراه با قابلیت مکان‌یابی داشته باشید باید از [کتابخانه با قابلیت مکان‌یابی](/android/sdk-setup.html#نصب-کتابخانه-با-قابلیت-مکانیابی-چابک) استفاده کنید. دقت نمایید که هر دو کتابخانه **همزمان نمی‌توانند کار کنند** و شما باید فقط از **یکی** از آن‌ها متناسب با نیاز خود استفاده کنید.
<br>
#### نصب کتابخانه استاندارد چابک
برای استفاده از کتابخانه استاندارد چابک (بدون قابلیت مکان‌یابی) از کتابخانه `chabok-lib` که در زیر به آن اشاره‌ شده است، استفاده کنید.   
فایل `build.gradle` در ماژول اپلیکیشن را باز کرده و در بخش `dependencies` خطوط زیر را اضافه نمایید:  
  
```groovy
dependencies {
    implementation 'com.adpdigital.push:chabok-lib:3.2.0'

    implementation 'me.leolin:ShortcutBadger:1.1.22@aar'  
    implementation 'com.google.firebase:firebase-messaging:17.1.0'
    implementation 'com.android.installreferrer:installreferrer:1.0'
} 
```

>`نکته:` 
 چابک در حال حاضر از **FCM** بهره می‌برد؛ در عین حال به خاطر قابلیت **backward compatibility** خود از کاربرانی که از نسخه‌های پایین‌تر اندروید استفاده می‌کنند یا از **GCM** به **FCM** مهاجرت نکرده‌اند، **پشتیبانی** می‌کند. توجه داشته باشید که موضوع بسته شدن **GCM** برای سرورهای خودش است و در کلاینت‌های اندروید چابک، دریافت توکن پوش همچنان امکان‌پذیر است.

#### نصب کتابخانه با قابلیت مکان‌یابی چابک   

درصورتی که در برنامه خود نیاز به استفاده از موقعیت مکانی کاربر دارید، لازم است در ابتدا کتابخانه `chabok-lib` را **حذف** و کتابخانه `chabok-lib-geo` را **جایگزین** کنید.    با توجه به این که در این کتابخانه از سرویس **فیوز گوگل** استفاده شده است، باید  تغییرات زیر نیز در قسمت ‌‌‌`dependencies` اعمال شود:

```groovy
dependencies {
    implementation 'com.adpdigital.push:chabok-lib-geo:3.2.0'

    implementation 'me.leolin:ShortcutBadger:1.1.22@aar'  
    implementation 'com.google.firebase:firebase-messaging:17.1.0'
    implementation'com.google.android.gms:play-services-location:10.2.6'
    implementation 'com.android.installreferrer:installreferrer:1.0'
}
```

#### نکات ضروری نصب کتابخانه   
 - تمامی گوشی‌های با **اندروید ۴ یا بالاتر** قابلیت استفاده از کتابخانه چابک را دارند.    
 > `نکته`: برای گوشی‌هایی مانند شیاومی و هواوی که گزینه تنظیمات مربوط به برنامه‌های حفاظت شده دارند (ProtectedApps)، کاربر باید برنامه شما را در لیست برنامه‌های حفاظت شده، فعال کند تا دریافت پوش‌نوتیفیکیشن در همه حالت‌ها امکان‌پذیر شود. برای اطلاعات بیشتر می‌توانید بخش [عیب‌یابی](/android/troubleshoot.html) را مطالعه نمایید.  
 -	فایل `google-services.json` را از پنل فایربیس دانلود کنید و در پوشه ماژول اصلی اپلیکیشن خود قرار دهید.
 برای دانلود این فایل، مراحل زیر را طی کنید:

  ۱. به <a href="https://console.firebase.google.com/">پنل فایربیس</a> خود وارد شوید و پروژه را باز کنید.
  
  ۲. بر روی آیکون تنظیمات کلیک کنید و گزینه  **Project settings**  را انتخاب نمایید.
  
   ۳. از لیست اپلیکیشن‌ها، اپلیکیشن مورد نظر خود را انتخاب کنید.
   
   ۴. بر روی `google-services.json` کلیک کنید و آن را دانلود کنید.

 - اگر از <a href="https://developer.android.com/jetpack/androidx/">AndroidX</a> استفاده می‌کنید قطعه کد زیر را در فایل `gradle.properties` پروژه خود اضافه کنید:

```groovy
android.useAndroidX=true
android.enableJetifier=true
```

- کتابخانه چابک از فایربیس نسخه ۱۷.۱.۰ و بالاتر پشتیبانی می‌کند. بنابراین اگر از فایربیس استفاده می‌کنید نسخه آن را به حداقل نسخه‌ی ذکر شده **(۱۷.۱.۰)** ارتقاع دهید. 

>`نکته:`با راه‌اندازی کتابخانه چابک قادر به دریافت پوش نوتیفیکیشن خواهید بود و نیازی به پیاده‌سازی سرویس فایبربیس برای دریافت پوش نوتیفیکیشن نیست.


>`نکته`: حذف توکن به کمک متد `deleteInstanceId` [فایربیس](https://firebase.google.com/docs/reference/android/com/google/firebase/iid/FirebaseInstanceId) در نسخه‌های ۳.۱.۳ به پایین چابک، می‌تواند باعث نامعتبر شدن توکن پوش شود و روی آمار حذف تاثیر بگذارد، پس استفاده از آن توصیه نمی‌شود.
و حذف توکن در نسخه‌ ۳.۱.۳ به بالا چابک به طور خودکار هندل می‌شود و مشکلی برای توکن پیش نمی‌آورد.



 - دقت داشته باشید که همیشه از جدیدترین نسخه **ShortcutBadger** استفاده کنید. برای اطلاع از آخرین نسخه می‌توانید به [این لینک](https://github.com/leolin310148/ShortcutBadger) مراجعه نمایید. هم‌چنین با توجه به حجم زیاد مجوزهای نمایش نشان (**Badge**) روی آیکون اپ،‌ می‌توانید از [این قسمت](/android/features.html#برداشتن-مجوزهای-غیر-ضروری-برای-نمایش-نشان-badge-روی-آیکون) هر کدام از آن‌ها را با اختیار خودتان بردارید.     
- به علت محدودیت‌‌های **اندروید ۸ به بالا** دقت کنید حتما مطابق جدول زیر تنظیمات نسخه‌ها را به درستی انجام دهید. در صورت رعایت نکردن نسخه‌های ذکر شده در جدول زیر هنگامی که اپلیکیشنتان **kill** شده باشد به هنگام دریافت نوتیفیکیشن با خطا مواجه خواهد شد. 
<table dir="ltr">  
    <thead>  <tr align="center">  
        <th>buildTools</th>  
        <th>compileSdk</th>  
        <th>targetSdk</th>  
        <th>googlePlayServices</th>  
    </tr>  
    </thead>  
    <tbody>  
    <tr align="center">  
        <td>25.x.x</td>  
        <td>25</td>  
        <td>&gt;= 23</td>  
        <td>&gt;= 9.6.0</td>  
    </tr>  
    <tr align="center">  
        <td>26.x.x</td>  
        <td>26</td>  
        <td>&gt;= 23</td>  
        <td>&gt;= 9.6.0</td>  
    </tr>  
    <tr align="center">  
        <td>27.x.x</td>  
        <td>27</td>  
        <td>&gt;= 23</td>  
        <td>&gt;= 10.2.1</td>  
    </tr>  
    </tbody>  
</table>  
 - توجه داشته باشید که برای `VERSION` آخرین نسخه کتابخانه را از [این صفحه](/android/release-note.html) مشاهده کنید و سپس آن را وارد نمایید، همچنین توصیه می‌شود بخش [مدل نسخه‌گذاری در چابک](/android/sdk-setup.html#مدل-نسخهگذاری-در-چابک-semantic-versioning) را مطالعه نمایید. 
 
#### نصب دستی کتابخانه  
   
  آخرین نسخه فایل کتابخانه چابک از [اینجا](https://bintray.com/bintray/jcenter?filterByPkgName=com.adpdigital.push) قابل دسترس می‌باشد. در انتها گزینه سینک را بزنید. برای نصب کتابخانه استفاده از این روش را **توصیه نمی‌کنیم.** زیرا شما از به روز رسانی‌ نسخه‌های چابک مطلع نمی‌شوید.    

### ۲- مقداردهی اولیه (Initialize) 

چابک برای راه اندازی نیاز به **مقداردهی اولیه** دارد.
<br>
۱. برای مقداردهی ابتدا از پنل خود وارد بخش **تنظیمات**> **دسترسی و توکن‌ها**> **کتابخانه موبایل**> **فعال‌سازی راه‌اندازی هوشمند**> شوید و فایل **Chabok.sandbox.json** یا **Chabok.production.json** را بسته به محیطتان دانلود کنید.
<p class="text-center">
<img  src="http://uupload.ir/files/9tlr_sandbox-android-chabok-doc.gif">
</p>
>`نکته:`
برای غیرفعال کردن قابلیت **پوش نوتیفیکیشن** (pushNotification)، کافیست مقدار پیش ‌فرض آن را در فایل دانلود شده تغییر بدید.

۲. فایل دانلود شده را در پوشه ماژول اصلی پروژه قرار دهید.
<p class="text-center">
<img width="90%" src="http://uupload.ir/files/pby6_download-file-in-main-module-of-project.gif">
</p>

<br>

۳. در مرحله آخر نیاز است کد‌های زیر را در کلاس اپلیکیشن خود فراخوانی کنید.

```java
public class MyAppClass extends Application {
      @Override
      public void onCreate() {
          super.onCreate();

          AdpPushClient.configureEnvironment(Environment.SANDBOX);
    }
}
```

<br>
**configureEnvironment**: متد `configureEnvironment` تعیین می‌کند که اپلیکیشن شما به محیط [آزمایشی (Sandbox)](https://sandbox.push.adpdigital.com) و یا [عملیاتی (Production) ](https://panel.push.adpdigital.com) چابک متصل شده. این موضوع بستگی به این دارد که حساب کاربری شما روی کدام محیط تعریف شده باشد.  
<br>
در صورتی که **حساب عملیاتی** دارید کافیست `Environment.SANDBOX` را با `Environment.PRODUCTION` عوض کنید.

  برای درخواست حساب محیط **عملیاتی**، در بخش تنظیمات پنل، وارد بخش [**درخواست حساب عملیاتی**](https://sandbox.push.adpdigital.com/front/setting/accountRequest) شوید و درخواست خود را ثبت نمایید و پس از تایید و ساخت حساب عملیاتی فایل **Chabok.production.json** را دانلود کنید و به جای فایل **Chabok.sandbox.json** در پوشه ماژول اصلی پروژه خود قراردهید. 

> `نکته:` دقت داشته باشید که **قابلیت آنی (realtime)**  چابک به طور پیش فرض **غیر فعال** است. برای فعال کردن مقدار قابلیت آنی (realtime)، کافی است مقدار پیش‌فرض آن را در فایل دانلود شده تغییر بدید. این قابلیت در[ پیام چابک](/android/chabok-messaging.html) و [پیام‌رسانی آنی](/android/event-handling.html) استفاده می‌شود.

اگر از کامپوننت‌های اندروید در <a href="https://developer.android.com/guide/components/processes-and-threads#Processes">پراسس دیگری</a> استفاده می‌کنید. حتما متد `setApplicationContext` را قبل از متد `configureEnvironment` فراخوانی کنید. در نهایت کلاس اپلیکیشنتان به شکل زیر خواهد بود: 

```java
public class MyAppClass extends Application {
      @Override
      public void onCreate() {
          super.onCreate();

          AdpPushClient.setApplicationContext(this);
          AdpPushClient.configureEnvironment(Environment.SANDBOX);
      }
}
```  

 با قرار دادن کد زیر در فایل `AndroidManifest.xml` در تگ `Application` می‌توانید آیکون پیش‌فرض نوتیفیکیشن را به چابک معرفی کنید:
 
 ```xml
<meta-data
            android:name="com.adpdigital.push.client.default_notification_icon"
            android:resource="@drawable/ic_notification_icon" />
```

### ۳- ثبت کاربر   
یکی از مزیت‌های چابک نسبت به درگاه‌های ارسال پوش‌نوتیفیکیشن، امکان **معرفی** هر کاربر با یک شناسه منحصر به فرد است. این قابلیت به شما امکان می‌دهد دستگاه‌های کاربر را **مدیریت کنید** و سوابق جمع‌آوری شده را همانند یک سیستم مدیریت مشتریان (CRM) در اختیار داشته باشید.       
این شناسه می‌تواند برای **دستگاه‌های متعدد یک کاربر** استفاده شود. شناسه کاربر می‌تواند هر فیلد با ارزش و معنا‌دار برای کسب و کار شما باشد که کاربر خود را با آن شناسایی می‌کنید. **شماره موبایل**، **کدملی**، **شماره‌حساب**، **ایمیل** و یا حتی **شناسه دیتابیس‌تان** مثال‌هایی از شناسه‌های کاربری مناسب در موارد واقعی هستند. ارسال پیام‌ به کاربران توسط همین شناسه‌ها و بدون استفاده از توکن یا شناسه گوشی، به سادگی امکان پذیر خواهد بود.      
 
#### ورود به حساب کاربری (login)
متد لاگین تنها زمانی فراخوانی شود که کاربر در اپلیکیشن لاگین یا ثبت‌نام می‌کند. نیازی به فراخوانی این متد در هر بار اجرای اپلیکیشن نیست.

متد ثبت کاربر با چهار امضای متفاوت وجود دارد:

- امضای اول:

<p>
فقط شناسه کاربر را گرفته و کاربر را با آن شناسه بر روی سرور چابک ثبت‌ نام می‌کند.
</p>

```java
public void login(String userId)
```

>`نکته:` مقدار `USER_ID` می‌تواند **بین ۳ تا ۶۴** کاراکتر باشد. زبان فاسی، کاراکترهای `#,+,*,\,/` و فاصله هم در آن **مجاز نیستند**.

>`نکته امنیتی:` مقدار `USER_ID` را هرگز به صورت خام در `SharedPreferences` ذخیره نکنید، چون مقدار این شناسه معنادار است و می‌توان با آن، کاربر را روی چابک ثبت‌نام کرد. همینطور می‌توانید قبل از عملیات ثبت با استفاده از شماره گوشی از معتبر بودن کاربر (verification) [اطمینان یابید](/android/verification.html)، سپس شناسه او را ثبت نمایید.

- امضای دوم:
<p>
  
  علاوه بر شناسه کاربر، اطلاعات کاربر (Attributes) را نیز دریافت می‌کند.
 </p>

```java
public void login(String userId, HashMap<String, Object> attributes)
```

برای ثبت اطلاعات کاربران مستندات [داده‌های سفارشی کاربر](/android/custom-data.html#ثبت-اطلاعات-کاربر)، را مطالعه کنید.

- امضای سوم:
<p>
به غیر از شناسه کاربر، رفتار مورد نظر کاربر را نیز رصد می‌کند.
</p>

```java
public void login(String userId, String eventName, @Nullable JSONObject data)
```

برای ارسال رویداد مستندات [رصد رفتار درون‌برنامه‌ای](/android/behavior-tracking.html#متد-رصد)، را مطالعه کنید.

- امضای چهارم:

<p>
به غیر از شناسه کاربر، لیست تگ‌ها را دریافت می‌کند.
</p>

به کمک لیست تگ‌ها در چابک می‌توانید کاربرانتان را بر اساس ویژگی‌های مورد نظرتان، دسته‌بندی و برچسب‌گذاری کنید و با آن‌ها ارتباط برقرار کنید.
برای کسب اطلاعات بیشتر به <a href="https://doc.chabok.io/panel/dashboard.html#رفتار">این صفحه</a> مراجعه کنید.

```java
public void login(String userId, String[] tagsName)
```

#### خروج از حساب کاربری (logout)

در صورتی که کاربر از حساب کاربری خود خارج شد، با فراخوانی متد زیر می‌توانید کاربر را همچنان با یک تگ مهمان در سیستم خود داشته باشید و تعاملتان را با او ادامه دهید.

```java
public void logout()
```

> `نکته:`  پروژه  [Starter](https://github.com/chabok-io/chabok-starter-android)  به شما کمک می‌کند بدون هیچ کد اضافه‌ای و فقط با اجرای آن، از پلتفرم چابک استفاده کنید. همچنین به کمک این پروژه با نحوه صحیح پیاده سازی متدهای چابک آشنا خواهید شد.
