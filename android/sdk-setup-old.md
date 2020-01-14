---  
id: sdk-setup  
title: راه‌اندازی  
layout: android  
permalink: android/sdk-setup-old.html  
prev: required.html  
next: tracker.html  
---  
  
پس از طی کردن مراحل صفحه [پیش‌نیازها](/android/required.html)، می‌توانید **راه‌اندازی SDK چابک** را شروع کنید. در ابتدا شما باید کتابخانه چابک را [نصب کنید](/android/sdk-setup.html#۱--نصب-کتابخانه) و سپس برای فعالسازی پوش‌نوتیفیکیشن چابک بخش‌ [افزودن `GcmReceiver` به فایل `Manifest`](/android/sdk-setup.html#۲--افزودن-کلاس--gcmreceiver-به-فایل-manifest) را مطالعه کرده و همانند مستندات بیان شده پیش بروید. در انتها، [مقداردهی و راه‌اندازی](/android/sdk-setup.html#۳--مقداردهی-اولیه-initialize) کتابخانه چابک را در اپلیکیشنتان انجام دهید و برای شناخت کاربر توسط چابک، مرحله [ثبت کاربر](/android/sdk-setup.html#۴--ثبت-کاربر-register) را حتما پشت سر بگذارید.  
  
برای انجام موفق این کار باید تمام مراحل زیر را به ترتیب انجام دهید:  
  
[ ۱- نصب کتابخانه](/android/sdk-setup.html#۱--نصب-کتابخانه)  
  
[۲- افزودن `GcmReceiver` به فایل `Manifest`](/android/sdk-setup.html#۲--افزودن-کلاس-gcmreceiver-به-فایل-manifest)  
  
[۳- مقداردهی اولیه (Initialize)](/android/sdk-setup.html#۳--مقداردهی-اولیه-initialize)  
  
[ ۴- ثبت کاربر (Register)](/android/sdk-setup.html#۴--ثبت-کاربر-register)  
  
<Br> 
    
<Br> 

### ۱- نصب کتابخانه  
  
کتابخانه چابک از طریق `jcenter` در دسترس است. برای این منظور ابتدا در فایل `gradle` اصلی پروژه، `jcenter` را بعنوان `repository` مطابق قطعه کد زیر اضافه نمایید:  
  
```javascript  
buildscript {  
  repositories {  
    jcenter()  
  }  
}    
```  
  
در این قسمت شما باید *کتابخانه استاندارد* **یا** *کتابخانه با قابلیت مکان‌یابی* را نصب نمایید. برای استفاده از **سرویس پیام‌رسانی** و **قابلیت‌های آنی چابک** می‌توانید از [کتابخانه استاندارد](/android/sdk-setup.html#نصب-کتابخانه-استاندارد-چابک) بهره ببرید. در صورتی هم که می‌خواهید این‌ امکانات را همراه با قابلیت مکان‌یابی داشته باشید باید از [کتابخانه با قابلیت مکان‌یابی](/android/sdk-setup.html#نصب-کتابخانه-با-قابلیت-مکانیابی-چابک) استفاده کنید. دقت نمایید که هر دو کتابخانه **همزمان نمی‌توانند کار کنند** و شما باید فقط از **یکی** از آن‌ها متناسب با نیاز خود استفاده کنید.  
  
#### نصب کتابخانه استاندارد چابک  
  
برای استفاده از کتابخانه استاندارد چابک (بدون قابلیت مکان‌یابی) از کتابخانه `chabok-lib` که در زیر به آن اشاره‌ شده است، استفاده کنید.   
فایل `build.gradle` در مسیر `app` را باز کرده و در بخش `dependencies` خط زیر را اضافه نمایید:  
  
```javascript  
dependencies {  
    implementation 'me.leolin:ShortcutBadger:1.1.22@aar'  
    implementation 'com.adpdigital.push:chabok-lib:2.18.0'  
  
    //If you want to get the push notification, add to dependencies  
    implementation 'com.google.android.gms:play-services-gcm:10.2.6'   
    implementation 'com.android.installreferrer:installreferrer:1.0'  
}  
``` 
> `نکته:` چابک در حال حاضر از **FCM** بهره می‌برد؛ در عین حال به خاطر قابلیت **backward compatibility** خود از کاربرانی که از نسخه‌های پایین‌تر اندروید استفاده می‌کنند یا از **GCM** به **FCM** مهاجرت نکرده‌اند، **پشتیبانی** می‌کند. توجه داشته باشید که موضوع بسته شدن **GCM** برای سرورهای خودش است و در کلاینت‌های اندروید چابک، دریافت توکن پوش همچنان امکان‌پذیر است.

- اگر از سرویس‌های پوش دیگری در کنار چابک استفاده می‌کنید می‌توانید با کد زیر از **نمایش دوباره آن جلوگیری کنید.**

این کد باعث می‌شود تا فقط پوش‌نوتیفیکشن‌های چابک نمایش داده شوند؛ برای این کار کد زیر در فایل `AndroidManifest.xml` قرار دهید:

```xml
<meta-data android:name="com.adpdigital.push.client.SHOW_ONLY_CHABOK_NOTIFICATIONS" android:value="ENABLE" />
```
<Br>  

#### نصب کتابخانه با قابلیت مکان‌یابی چابک  
  
درصورتی که در برنامه خود نیاز به استفاده از موقعیت مکانی کاربر دارید، لازم است در ابتدا کتابخانه `chabok-lib` را **حذف** و کتابخانه `chabok-lib-geo` را **جایگزین کنید**.   
 با توجه به این که در این کتابخانه از سرویس **فیوز گوگل** استفاده شده است باید  تغییرات زیر نیز در قسمت ‌‌‌`dependencies` اعمال شود:  
  
```javascript  
dependencies {  
   implementation 'me.leolin:ShortcutBadger:1.1.22@aar'  
   implementation 'com.adpdigital.push:chabok-lib-geo:2.18.0'  
   implementation 'com.google.android.gms:play-services-location:10.2.6'  
  
  //If you want to get the push notification, add to dependencies  
   implementation 'com.google.android.gms:play-services-gcm:10.2.6'  
   implementation 'com.android.installreferrer:installreferrer:1.0'  
}    
```  
  
#### نکات ضروری نصب کتابخانه  
  
- تمامی گوشی‌های با **اندروید ۴ یا بالاتر** قابلیت استفاده از کتابخانه چابک را دارند.  
  
> `نکته`: برای گوشی‌هایی مانند شیاومی و هواوی که گزینه تنظیمات مربوط به برنامه‌های حفاظت شده دارند (ProtectedApps) کاربر باید برنامه شما را در لیست برنامه‌های حفاظت شده، فعال کند تا دریافت پوش‌نوتیفیکیشن در همه حالت‌ها امکان‌پذیر شود. برای اطلاعات بیشتر می‌توانید بخش [عیب‌یابی](/android/troubleshoot.html) را مطالعه نمایید.  
  
- برای استفاده از **سرویس GCM گوگل** (پوش‌نوتیفیکیشن) لازم است `play-services-gcm` را همانند بالا (خط آخر هر دو کتابخانه) در بخش `dependencies` اضافه کنید.  
  
- دقت داشته باشید که همیشه از جدیدترین نسخه **ShortcutBadger** استفاده کنید. برای اطلاع از آخرین نسخه می‌توانید به [این لینک](https://github.com/leolin310148/ShortcutBadger) مراجعه نمایید. همچنین با توجه به حجم زیاد مجوزهای نمایش نشان (**Badge**) روی آیکون اپ،‌ می‌توانید از [این قسمت](/android/features.html#برداشتن-مجوزهای-غیر-ضروری-برای-نمایش-نشان-badge-روی-آیکون) هر کدام از آن‌ها را با اختیار خودتان بردارید.   
  
- به علت محدودیت‌‌های **اندروید ۸ به بالا** دقت کنید حتما مطابق جدول زیر تنظیمات نسخه‌ها را به درستی انجام دهید. در صورت رعایت نکردن نسخه‌های ذکر شده در جدول زیر هنگامی که اپلیکیشنتان **kill** شده باشد به هنگام دریافت نوتیفیکیشن با خطا مواجه خواهد شد.  
  
<table dir="ltr">  
    <thead>  
    <tr align="center">  
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

آخرین نسخه فایل کتابخانه چابک از [اینجا](https://bintray.com/bintray/jcenter?filterByPkgName=com.adpdigital.push) قابل دسترس می‌باشد. در انتها گزینه سینک را بزنید. برای نصب کتابخانه استفاده از این روش را **توصیه نمی‌کنیم** زیرا شما از به روز رسانی‌ نسخه‌های چابک مطلع نمی‌شوید.  

### ۲- افزودن کلاس `GcmReceiver` به فایل `Manifest`  
  
برای دریافت پوش‌نوتیفیکیشن باید `GcmReceiver` را در بخش `application` به فایل `AndroidManifest.xml` اضافه نمایید تا بتوانید پوش‌نوتیفیکیشن‌هایی که از طریق سرور‌های گوگل ارسال می شوند را نیز دریافت کنید.  
  
```markup  
<application  
    android:name=".MY_APPLICATION_CLASS_NAME"  
    ... >  
     
   ...  
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
     
</application>  
```  
  دقت کنید که افزودن `receiver` **ضروری** است.

 اگر از سرویس‌های پوش دیگری (مانند FCM) در کنار چابک استفاده می‌کنید می‌توانید با کد زیر از **نمایش دوباره آن جلوگیری کنید.**
این کد باعث می‌شود تا فقط پوش‌نوتیفیکشن‌های چابک نمایش داده شوند؛ برای این کار کد زیر در فایل `AndroidManifest.xml` قرار دهید:

```xml
<meta-data android:name="com.adpdigital.push.client.SHOW_ONLY_CHABOK_NOTIFICATIONS" android:value="ENABLE" />
```
در صورتی که برنامه شما کلاس `Application` ندارد با استفاده از راهنمای ارائه شده در این [پست](https://www.mobomo.com/2011/05/how-to-use-application-object-of-android/)، آن را ایجاد کنید.  
  
> `نکته`: با توجه به حجم زیاد مجوزهای نمایش نشان (**Badge**) روی آیکون اپ،‌ می‌توانید از [این قسمت](/android/features.html#برداشتن-مجوزهای-غیر-ضروری-برای-نمایش-نشان-badge-روی-آیکون) هر کدام از آن‌ها را با اختیار خودتان بردارید.   
<blockquote markdown="1">  
 `نکته:` در اندروید ۹ به بالا در صورت مقداردهی `targetSdkVersion` در فایل `build.gradle` به مقدار `28`،  کد زیر را به فایل `AndroidManifest.xml` در تگ `application` اضافه کنید:  
  
```xml   
<uses-library android:name="org.apache.http.legacy" android:required="false" />   
```  
</blockquote>  
  
<Br>  
  
### ۳- مقداردهی اولیه (Initialize)  
  
چابک برای راه‌اندازی نیاز به مقداردهی اولیه دارد. متد `init` چابک **باید** در کلاس `Application` در متد `onCreate` تحت هر شرایطی فراخوانی شود.  
  
```java  
public class MyAppClass extends Application {  
  
    @Override  
    public void onCreate() {  
        super.onCreate();  
  
        //AdpPushClient.init() should always be called in onCreate of Application class  
        AdpPushClient.init(  
                getApplicationContext(),  
                MainActivity.class,  
                "APP_ID", //based on your environment  
                "API_KEY",          //based on your environment  
                "SDK_USERNAME",     //based on your environment  
                "SDK_PASSWORD",      //based on your environment  
                "SENDER_ID"
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
  
  > `نکته`: در این متد به جای پارامتر‌های `APP_ID/SENDER_ID`, `API_KEY(SDK_KEY)`, `SDK_USERNAME`, `SDK_PASSWORD` مقادیر مربوط به حساب چابک خود را وارد نمایید. نحوه ایجاد حساب در بخش [پیش‌نیازها](/android/required.html) توضیح داده شده است. در صورت داشتن حساب چابک هم می‌توانید این مقادیر را از [**پنل بخش تنظیمات قسمت دسترسی‌ و توکن‌ها**](/panel/settings.html#دسترسیها-و-توکنها) بردارید.  
 
- ‍‍‍‍‍**MY_ACTIVITY**: این مقدار را نام کلاس `Activity` ای قرار دهید که چابک به طور پیش‌فرض پس از کلیک شدن روی اعلان، `Activity` تعیین شده را باز کند. (برای شخصی‌سازی اعلان‌ها [این بخش](/android/push-notification.html#شخصیسازی-نمایش-و-کلیک-روی-اعلان) را مشاهده کنید.)  
  
- **APP_ID**: این مقدار را باید از پنل > تنظیمات > دسترسی و توکن‌ها بردارید.

- **API_KEY**: این مقدار را باید از پنل > تنظیمات > دسترسی و توکن‌ها بردارید.

- **SDK_USERNAME**: این مقدار را باید از پنل > تنظیمات > دسترسی و توکن‌ها بردارید.

- **SDK_PASSWORD**: این مقدار را باید از پنل > تنظیمات > دسترسی و توکن‌ها بردارید.

- **SENDER_ID**: برای این مقدار کافی است بخش [شناسه‌ گوگل برای پوش‌نوتیفیکیشن](/android/required.html#%D8%AF%D8%B1%DB%8C%D8%A7%D9%81%D8%AA-%DA%A9%D9%84%DB%8C%D8%AF%D9%87%D8%A7%DB%8C-%DA%AF%D9%88%DA%AF%D9%84) را مطالعه کنید.

> `نکته:` در صورت عدم استفاده از پوش‌نوتیفیکیشن مقدار **SENDER_ID** را `null` قرار دهید. (شمارش حذف و دریافت نوتیفیکیشن در اپلیکیشن‌تان غیرفعال خواهد شد.)

- ‍‍‍‍‍‍‍‍**setDevelopment**: متد `setDevelopment` تعیین می‌کند که اپلیکیشن شما به محیط [آزمایشی (Sandbox)](https://sandbox.push.adpdigital.com) و یا [عملیاتی (Production) ](https://panel.push.adpdigital.com) چابک متصل شود. این موضوع بستگی به این دارد که حساب کاربری شما روی کدام محیط تعریف شده باشد.
    
مقدار `true` به محیط آزمایشی و  مقدار`false` به محیط عملیاتی متصل می‌شود. در نظر داشته باشید، هر محیط به کلیدهای دسترسی (AppId, APIKey, Username و Password) خودش در متد `init` نیاز دارد. بنابراین در صورت تغییر مقدار `setDevelopment` کلید‌های دسترسی آن هم باید تغییر داده شود.  
  
```java  
AdpPushClient.get().setDevelopment(DEV_MODE);  
```  

> `نکته`: توجه داشته باشید متد `AdpPushClient.init` تحت هر شرایط **حتما** باید در کلاس `Application` و در متد `onCreate` فراخوانی شود. متد فوق برای مقداردهی پارامتر‌های ضروری چابک می‌باشد و در صورت عدم فراخوانی آن در حالت **بسته** (Kill) بودن اپلیکیشن، با خطا مواجه خواهید شد.  
  
> `نکته`: برای درخواست حساب محیط **عملیاتی**، در بخش تنظیمات پنل، وارد بخش [**درخواست حساب عملیاتی**](https://sandbox.push.adpdigital.com/front/setting/accountRequest) شوید و درخواست خود را ثبت نمایید تا پس از تایید و ساخت حساب عملیاتی شما، اطلاعات جدید حسابتان (AppId, APIKey, Username و Password) تعیین گردد.  

- **dismiss**: در متد `onTerminate` کلاس `Application` که در واقع آخرین فراخوانی در چرخه حیات این کلاس است، متد `dismiss` از کلاینت چابک را فراخوانی نمایید تا منابع در اختیار آزاد شوند. واضح است بعد از فراخوانی این متد دیگر نمی‌توان از نمونه جاری کلاینت استفاده کرد و باید دوباره نمونه‌سازی کنید.  
  
```java  
AdpPushClient.get().dismiss();  
```  

<Br>  

در صورت عدم نیاز به قابلیت آنی (real-time) چابک از کد زیر در فایل `AndroidManifest.xml` استفاده کنید:

``` xml
<application ... >
    <meta-data android:name="com.adpdigital.push.client.DISABLE_REALTIME" android:value="TRUE" />
<application />
```
>`نکته:` در صورت غیرفعال‌سازی قابلیت آنی چابک، امکان استفاده از [پیام چابک](/android/chabok-messaging.html) و [پیام‌رسانی آنی](/android/event-handling.html) را از دست خواهید داد.
  
<Br>  
  
### ۴- ثبت کاربر (Register)  
  
یکی از مزیت‌های چابک نسبت به درگاه‌های ارسال پوش‌نوتیفیکیشن، امکان **معرفی** هر کاربر با یک شناسه منحصر به فرد است. این قابلیت به شما امکان می‌دهد دستگاه‌های کاربر را **مدیریت کنید** و سوابق جمع‌آوری شده را همانند یک سیستم مدیریت مشتریان (CRM) در اختیار داشته باشید.   
  
  
این شناسه می‌تواند برای **دستگاه‌های متعدد یک کاربر** استفاده شود. شناسه کاربر می‌تواند هر فیلد با ارزش و معنا‌دار برای کسب و کار شما باشد که کاربر خود را با آن شناسایی می‌کنید. **شماره موبایل**، **کدملی**، **شماره‌حساب**، **ایمیل** و یا حتی **شناسه دیتابیس‌تان** مثال‌هایی از شناسه‌های کاربری مناسب در موارد واقعی هستند. ارسال پیام‌ به کاربران توسط همین شناسه‌ها و بدون استفاده از توکن یا شناسه گوشی، به سادگی امکان پذیر خواهد بود.  
  
  
 علاوه بر ثبت کاربر،‌ متد `register` عمل **اتصال** به سرور چابک را انجام می‌دهد، بنابراین باید **فقط یک بار** در طول اجرا اپلیکیشن (در کلاس application) فراخوانی شود.   
این متد با دو امضای متفاوت وجود دارد:  
  
##### امضای اول   
امضای اول فقط شناسه کاربر را گرفته و کاربر را با آن شناسه روی سرور چابک ثبت نام می‌کند.  
  
```java  
AdpPushClient.get().register(USER_ID);  
```  
>` نکته:` ترکرها به طور معمول نصب را **اولین بازدید** حساب می‌کنند (مانند سرویس ادجاست)، اما مزیت ترکر چابک در شمارش نصب این است که شما می‌توانید علاوه بر مدل ادجاست، نصب را **ایجاد حساب و احراز هویت او** در اپلیکیشنتان تعریف کنید. با این کار شما یک اقدام دیگری برای جلوگیری از تقلب در شمارش نصب انجام می‌دهید، به این دلیل که امضاهای کاربر، قبل و بعد از ثبت او (register) مطابقت داده می‌شوند و در صورت تایید به عنوان یک نصب سالم در نظر گرفته می‌شوند.   
  
به عنوان مثال اگر اپلیکیشن شما صفحه **ورود** و **ثبت‌نام** دارد، متد `register` را در صفحه **ورود** یا **ثبت‌نام** پس از **احراز هویت کاربر** و همچنین، پس از هر بار اجرای (در کلاس `Application` متد `onCreate`) اپلیکیشن فراخوانی کنید تا کاربر به سرور چابک متصل شود.  
  
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
        //call AdpPushClient.get().register(USER_ID) method at login page  
        AdpPushClient.get().registerAsGuest();  
    }  
}  
```  
  
> `نکته`: مقدار `USER_ID` می‌تواند **بین ۳ تا ۶۴** کاراکتر باشد. زبان فاسی، کاراکترهای `#,+,*,\,/` و فاصله هم در آن **مجاز نیستند**.
  
> `نکته امنیتی`: مقدار `USER_ID` را هرگز به صورت خام در `SharedPreferences` ذخیره نکنید، چون مقدار این شناسه معنادار است و می‌توان با آن، کاربر را روی چابک ثبت‌نام کرد. برای این منظور می‌توانید از متد `getUserId` چابک استفاده کنید که شناسه کاربر را به صورت رمزنگاری شده نگه‌می‌دارد.   
  
همینطور می‌توانید قبل از عملیات ثبت با استفاده از شماره گوشی از معتبر بودن کاربر (verification) [اطمینان یابید](/android/verification.html)، سپس شناسه او را ثبت نمایید.  
  
##### امضای دوم  
  
امضای دوم علاوه بر شناسه کاربر، لیستی از نام‌ کانال‌هایی (برای آشنایی با مفهوم کانال و کاربرد آن [این قسمت](/android/chabok-messaging.html#کانال) را مطالعه نمایید) که کاربر باید روی آن‌ها عضو شود را نیز دریافت می‌کند. با عضویت روی کانال‌های داده شده، کاربر قادر به دریافت پیام‌های ارسالی روی آن‌ کانال‌ها خواهد بود.   
  
```java  
AdpPushClient.get().register(USER_ID, new String[]{"CHANNEL_NAME1", "CHANNEL_NAME2", ...});  
```    
اگر عملیات ثبت‌ کاربر به درستی انجام شده باشد، اطلاعات کاربر در **پنل** چابک مربوط به [حساب](https://sandbox.push.adpdigital.com/front/users/subscribers/list) برنامه، در قسمت **مشترکین** قابل مشاهده خواهد بود و شما می‌توانید از پنل برای کاربر **پیام** ارسال کنید.  

#### کاربر مهمان  
  
اگر اپلیکیشن شما قابلیت **ایجاد حساب کاربری** دارد، می‌توانید کاربر را تا زمانی که حساب ایجاد نکرده است به عنوان **کاربر مهمان** در سیستم خود ثبت کنید و سپس به محض ایجاد حساب و دریافت اطلاعات او، آن کاربر را به عنوان **کاربر دائم** خود مانند بالا ثبت کنید.   
  
> `نکته:` در صورتی که می‌خواهید از ترکر استفاده کنید و نصب‌ها را به محض اولین بازدید کاربر محاسبه کنید (مانند سرویس ادجاست) باید از این متد استفاده کنید.   
  
متد زیر کاربر را به عنوان کاربر مهمان ثبت می‌کند و به طور خودکار یک تگ مهمان (CHABOK_GUEST) به او اختصاص می‌دهد. دقت داشته باشید که **این متد را به تنهایی به کار نبرید** زیرا هر بازدید کاربر را مهمان جدید محاسبه می‌کند. برای اطلاعات بیشتر مستندات [ترکر نصب](/android/tracker.html) را مطالعه کنید.  
  
```java  
AdpPushClient.get().registerAsGuest();  
```  

##### کاربر مهمان با شناسه سفارشی 

همچنین می‌توانید کاربر مهمان را با **شناسه دلخواهتان** ثبت کنید: 

```java
AdpPushClient.get().registerAsGuest("MY_GUEST_ID");
```
  
##### دریافت وضعیت ثبت کاربر  
  
برای اطمینان از ثبت شدن کاربر در چابک، می‌توانید از متد `isRegistered` یا رویداد `AppState` استفاده کنید.   
  
```java  
AdpPushClient.get().isRegistered();  
```  
  
با رویداد `AppState` می‌توانید در [این بخش](/android/features.html#رویداد-وضعیت-اپلیکیشن) جزئیات بیشتری از کاربرتان را مشاهده کنید.  
  
```java  
public void onEvent(AppState state) {  
    if (state == AppState.REGISTERED) {  
        //User successfully registered.  
        Log.d(TAG, "User successfully registered.");  
    } else {  
        Log.d(TAG, "onEvent: The app state is " + state);  
    }  
}  
```  

#### حذف کاربر (Unregister)  
  
برای حذف دستگاه کاربر از سرور چابک می‌توانید از متد `unregister` استفاده کنید. پس از حذف کاربر، چابک دیگر به دستگاه‌های آن `userId` پوش ارسال نخواهد کرد. توصیه می‌شود این متد را زمانی که کاربر در اپلیکیشنتان از حساب خود خارج می‌شود (**Logout**) فراخوانی کنید. این امر باعث می‌شود تا کاربر از حفظ شدن حریم شخصی خود پس از خروج از حساب کاربری اطمینان یابد. پس از آن هم کاربر را به عنوان یک کاربر مهمان ثبت کنید تا همچنان با او تعامل داشته باشید.  
  
```java  
AdpPushClient.get().unregister();  
```  
  
> `نکته:` پروژه [Starter](https://github.com/chabok-io/chabok-starter-android) به شما کمک می‌کند بدون هیچ کد اضافه‌ای و فقط با اجرای آن، از پلتفرم چابک استفاده کنید. همچنین به کمک این پروژه با نحوه صحیح پیاده سازی متدهای چابک آشنا خواهید شد.
