---  
id: migration-adjust-to-chabok  
title: مهاجرت از ادجاست به چابک  
layout: android  
permalink: android/migration-adjust-to-chabok.html  
---  
  
<Br>  
<Br>  
  
<div width="100%" height="92px" align="center"> 
    <img src="https://raw.githubusercontent.com/chabokpush/chabok-assets/master/chabok-docs/android/Migration-Adjust-To-Chabok.svg?sanitize=true" />  
</div>  
  
<Br/>  
  
<Br/>  
  
<div align="center"> <font size="5"> جایگزین مطمئن و سریع برای کاربران ایرانی <strong> ادجاست</strong>
 </font> </div>  
   
<Br>  
   
با توجه به تحریم کاربران ایرانی از سوی سرویس **ادجاست**، شما می‌توانید به راحتی به سرویس **چابک** مهاجرت کنید و از قابلیت **شمارنده نصب** (Tracker) چابک، **کمپین‌های نصب** و **رفتار درون برنامه‌ای** کاربران اپلیکیشن موبایل و وب خود را رصد کنید.

مزیت استفاده از شمارنده نصب چابک، **تجمیع آمار** کمپین‌های نصب و تحلیل رفتار کاربران روی اپلیکیشن شماست. به این معنی که تمام فرآیند بازاریابی اپلیکیشن شما، از فرآیند جذب تا پایان طول عمر کاربر و زمان حذف او، **یکجا و پکپارچه** مدیریت می‌شود.

از این طریق شما قادر خواهید بود **کیفیت منابع نصب** خود را در طول زمان  در سطح عمیق‌تری از دقت بسنجید.

بر خلاف ادجاست، شما بدون ورود و خروج اطلاعات، روی یک پلتفرم می‌توانید با کاربران از هر کانالی **ارتباط** بگیرید و یا میزان حذف‌ اپلیکیشن را به نسبت کمپین‌های نصب مختلف تحلیل کنید.

 فقط کافی‌ است کتابخانه چابک را به سادگی طبق مراحل زیر به اپلیکیشن خود اضافه کنید و به صورت **آزمایشی** و **رایگان** از خدمات آن استفاده کنید. (برای پیاده‌سازی کتابخانه چابک در اندروید، بخش [راه‌اندازی](/android/sdk-setup.html) را مطالعه کنید.) 
  
<Br>  
  
### تعریف شمارنده نصب (Install tracker)   

جذب کاربر یکی از مهم‌ترین قدم‌های شما برای توسعه اپلیکیشنتان است. در عین حال، با وجود شبکه‌های مختلف تبلیغاتی، کانال‌ها و رسانه‌های متنوع، مدیریت این فرایند پیچیدگی‌های خود را دارد. شما می‌توانید پس از طی کردن مراحل زیر در چابک شمارنده نصب ایجاد کنید.

<Br>  
  
#### ۱. نصب کتابخانه   

کد کتابخانه ادجاست را از بخش `dependencies` حذف کنید:  
  
```javascript 
implementation 'com.adjust.sdk:adjust-android:4.17.0'
implementation 'com.google.android.gms:play-services-analytics:16.0.4'
```  
  
سپس کتابخانه چابک را به بخش `dependencies` اضافه کنید:  
  
```javascript  
implementation 'me.leolin:ShortcutBadger:1.1.22@aar' 
implementation 'com.adpdigital.push:chabok-lib:2.14.0'  
implementation 'com.google.android.gms:play-services-gcm:10.2.6'  
```  

<Br>  
  
#### ۲. توکن پوش‌نوتیفیکیشن

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
  <Br>  
  
#### ۳. راه‌اندازی کتابخانه  

 کد مربوط به راه‌اندازی کتابخانه ادجاست را از کلاس `Application` و از متد `onCreate` پروژه خود حذف کنید:  

```java  
public class GlobalApplication extends Application {
    @Override
    public void onCreate() {
        super.onCreate();

        // Configure adjust SDK.
        String appToken = "XXXXXXXXXXXX";
        String environment = AdjustConfig.ENVIRONMENT_SANDBOX;
        AdjustConfig config = new AdjustConfig(this, appToken, environment);
        config.setLogLevel(LogLevel.VERBOSE);
        Adjust.setPushToken("token");
        
        Adjust.onCreate(config);
        
        ...
    }
}
```  
سپس کدهای مربوط به مقدار دهی اولیه چابک را به کلاس `Application` متد `onCreate` اضافه کنید.  
  
```java  
public class GlobalApplication extends Application {    
    @Override
    public void onCreate() {
        super.onCreate();

        AdpPushClient.init(
                getApplicationContext(),
                MY_ACTIVITY.class,
                "APP_ID/SENDER_ID", //based on your environment
                "API_KEY",          //based on your environment
                "SDK_USERNAME",     //based on your environment
                "SDK_PASSWORD"      //based on your environment
        );
        AdpPushClient.get().setDevelopment(true);

		...
    }
    
    @Override
    public void onTerminate() {
        AdpPushClient.get().dismiss();

        super.onTerminate();
    }
}
```  
در متد `init` به جای پارامتر‌های `APP_ID/SENDER_ID`, `API_KEY(SDK_KEY)`, `SDK_USERNAME`, `SDK_PASSWORD` مقادیر مربوط به حساب چابک خود را وارد نمایید. نحوه ایجاد حساب در بخش [پیش‌نیازها](/android/required.html) توضیح داده شده است. در صورت داشتن حساب چابک هم می‌توانید این مقادیر را از [**پنل بخش تنظیمات قسمت دسترسی‌ و توکن‌ها**](/panel/settings.html#%D8%AF%D8%B3%D8%AA%D8%B1%D8%B3%DB%8C%D9%87%D8%A7-%D9%88-%D8%AA%D9%88%DA%A9%D9%86%D9%87%D8%A7) بردارید.
  
   
<Br>  
 
#### ۴. ثبت کاربر  

یکی از مزیت‌های چابک نسبت به ادجاست، امکان **معرفی** هر کاربر با یک شناسه منحصر به فرد است. این قابلیت به شما امکان می‌دهد تا **دستگاه‌های متعدد** کاربر را مدیریت کنید.

 شناسه کاربر می‌تواند هر فیلد با ارزش و معنا‌دار برای کسب و کار شما باشد که کاربر خود را با آن شناسایی می‌کنید.**شماره موبایل**، **کدملی**، **شماره‌حساب**، **ایمیل** و یا حتی **شناسه دیتابیس‌تان** مثال‌هایی از شناسه‌های کاربری مناسب در موارد واقعی هستند. یکی از کاربردهای این شناسه امکان تشخیص اینکه کدام کاربر اپلیکیشن را حذف کرده و یا مجددا نصب کرده می‌باشد.
 
متد `register` عمل **اتصال** به سرور چابک را انجام می‌دهد، بنابراین باید **فقط یک بار** در طول اجرا اپلیکیشن (در کلاس application) فراخوانی شود. برای اطلاعات بیشتر می‌توانید بخش ثبت کاربر را مطالعه کنید.
  
```java  
String userId = AdpPushClient.get().getUserId();

if (userId != null && !userId.isEmpty()) {
	AdpPushClient.get().register(userId);
} else {
	
	//If user is not registered verify the user and
	//call AdpPushClient.get().register("USER_ID") method at login page 
	AdpPushClient.get().register("USER_ID");
}  
```  

<Br>  
   
#### ۵. ایجاد شمارنده نصب  
  
برای رصد کمپین‌ها، باید در ابتدا با **پر کردن فرم شمارنده‌ی جدید**، آن را برای چابک تعریف کنید. این فرم در تنظیمات پنل> بخش **شمارش نصب** قرار دارد. به عنوان مثال می‌خواهید شمارنده‌ی کمپینی را به مناسبت **یک جشنواره** برای نصب اپلیکیشنتان از طریق **کافه بازار** تعریف کنید:

 ![عکس مربوطه](https://raw.githubusercontent.com/chabokpush/chabok-assets/master/chabok-docs/panel/Create-tracker.png)

<Br>

شما در انتهای همین صفحه می‌توانید **تعداد کلیک، نصب و نرخ تبدیل** هر شمارنده را مشاهده کنید.

 ![عکس مربوطه](http://uupload.ir/files/p51o_trackerlist.png)

<Br>
  
### رصد رفتار کاربر (Track event)   

شما می‌توانید رفتار کاربر را در اپلیکیشن خود به طور **لحظه‌ای** رصد کنید و علاوه بر گرفتن بازخورد، براساس این رفتارها آن‌ها را دسته‌بندی کنید.

با استفاده از متد `track` در کتابخانه ادجاست این امکان صورت می‌پذیرد همانند مثال زیر:  
  
```java  
AdjustEvent event = new AdjustEvent("abc123");  
event.setRevenue(0.01, "EUR");  
event.setOrderId("{OrderId}");  
  
Adjust.trackEvent(event);  
```  

با تغییر مثال بالا به کد زیر می‌توانید همان رفتار را در چابک رصد کنید:  
  
```java  
JSONObject data = new JSONObject();  
data.put("currency", "EUR");  
data.put("revenue", 0.01)  
data.put("orderId", "{OrderId}");  
  
AdpPushClient.get().track("abc123", data);  
```

<BR>

برای اطلاعات بیشتر، بخش [بهینه‌سازی کمپین‌های نصب](/panel/usecase-optimize-pre-install-campaigns.html) را مطالعه کنید و اگر سوالی داشتید با ما [تماس](https://chabokpush.com/contact.html) بگیرید.

<div align="center">   
    <a style="display: inline-block; text-align: center; border-radius: 40px; background: #4285f4; color: white !important; padding: 7px 25px; margin-right: 15px; cursor: pointer; transition: all 0.25s ease;" href="https://chabokpush.com/register.html">ایجاد حساب رایگان و مهاجرت از ادجاست</a>
</div>