
### ۱) نصب اندروید
---
برای دریافت کتابخانه چابک دستورات زیر را به فایل `baseProjectTemplate.gradle` اصلی پروژه اضافه کنید (این فایل عموما در مسیر **Assets/Plugins/Android/baseProjectTemplate.gradle** وجود دارد):

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
        classpath 'com.google.gms:google-services:4.3.2'
    }
}
```

دستور زیر را در انتهای فایل `mainTemplate.gradle` اضافه کنید:

```groovy  
apply plugin: 'com.google.gms.google-services'
```
#### نصب کتابخانه استاندارد چابک
برای استفاده از کتابخانه استاندارد چابک از کتابخانه `chabok-lib` که در زیر به آن اشاره‌ شده است، استفاده کنید.   
فایل `mainTemplate.gradle` در ماژول اپلیکیشن را باز کرده و در بخش `dependencies` خطوط زیر را اضافه نمایید:  
  
```groovy
dependencies {
    implementation 'com.adpdigital.push:chabok-lib:3.5.0'

    implementation 'me.leolin:ShortcutBadger:1.1.22@aar'  
    implementation 'com.google.firebase:firebase-messaging:17.1.0'
    implementation 'com.android.installreferrer:installreferrer:1.0'
} 
```

>`نکته:` 
 چابک در حال حاضر از **FCM** بهره می‌برد؛ در عین حال به خاطر قابلیت **backward compatibility** خود از کاربرانی که از نسخه‌های پایین‌تر اندروید استفاده می‌کنند یا از **GCM** به **FCM** مهاجرت نکرده‌اند، **پشتیبانی** می‌کند. توجه داشته باشید که موضوع بسته شدن **GCM** برای سرورهای خودش است و در کلاینت‌های اندروید چابک، دریافت توکن پوش همچنان امکان‌پذیر است.

#### نکات ضروری نصب کتابخانه   
 - تمامی گوشی‌های با **اندروید ۴ یا بالاتر** قابلیت استفاده از کتابخانه چابک را دارند.    

 > `نکته`: برای گوشی‌هایی مانند شیاومی و هواوی که گزینه تنظیمات مربوط به برنامه‌های حفاظت شده دارند (ProtectedApps)، کاربر باید برنامه شما را در لیست برنامه‌های حفاظت شده، فعال کند تا دریافت پوش‌نوتیفیکیشن در همه حالت‌ها امکان‌پذیر شود. برای اطلاعات بیشتر می‌توانید بخش [عیب‌یابی](/android/troubleshoot.html) را مطالعه نمایید.
   
 -	فایل `google-services.json` را از پنل فایربیس دانلود کنید و در پوشه ماژول اصلی اپلیکیشن خود قرار دهید.
 برای دانلود این فایل، مراحل زیر را طی کنید:

  ۱. به <a href="https://console.firebase.google.com/">پنل فایربیس</a> خود وارد شوید و پروژه را باز کنید.
  
  ۲. بر روی آیکون تنظیمات کلیک کنید و گزینه  **Project settings**  را انتخاب نمایید.
  
   ۳. از لیست اپلیکیشن‌ها، اپلیکیشن مورد نظر خود را انتخاب کنید.
   
   ۴. بر روی `google-services.json` کلیک کنید و آن را دانلود کنید.

 - اگر از <a href="https://developer.android.com/jetpack/androidx/">AndroidX</a> استفاده می‌کنید قطعه کد زیر را در فایل `gradleTemplate.properties` پروژه خود اضافه کنید:

```groovy
android.useAndroidX=true
android.enableJetifier=true
```

- کتابخانه چابک از فایربیس نسخه ۱۷.۱.۰ و بالاتر پشتیبانی می‌کند. بنابراین اگر از فایربیس استفاده می‌کنید نسخه آن را به حداقل نسخه‌ی ذکر شده **(۱۷.۱.۰)** ارتقاع دهید. 

>`نکته:`با راه‌اندازی کتابخانه چابک قادر به دریافت پوش نوتیفیکیشن خواهید بود و نیازی به پیاده‌سازی سرویس فایبربیس برای دریافت پوش نوتیفیکیشن نیست.


>`نکته`: حذف توکن به کمک متد `deleteInstanceId` [فایربیس](https://firebase.google.com/docs/reference/android/com/google/firebase/iid/FirebaseInstanceId) در نسخه‌های ۳.۲.۰ به پایین چابک، می‌تواند باعث نامعتبر شدن توکن پوش شود و روی آمار حذف تاثیر بگذارد، پس استفاده از آن توصیه نمی‌شود.
و حذف توکن در نسخه‌ ۳.۲.۰ به بالا چابک به طور خودکار هندل می‌شود و مشکلی برای توکن پیش نمی‌آورد.



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
 
<br><br>

### 2) نصب iOS
---
 > `نکته`:تمام مراحل افزودن Podfile و نصب SDK iOS  چابک به **صورت خودکار** انجام می شود در صورت انجام نشدن, مراحل نصب را طی کنید.  

کتابخانه چابک از طریق CocoaPods در دسترس است، برای نصب خط زیر را به `Podfile` خود اضافه کنید:


```bash
target 'YourProject' do
  use_frameworks!

  pod 'ChabokPush', '~> 2.3.0'
  
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
