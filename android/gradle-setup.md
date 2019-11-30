---
id: gradle-setup
title: نصب چابک
layout: android
permalink: android/gradle-setup.html
prev: firebase.html
next: application-class.html
---


پیش‌فرض این صفحه، این است که شما تمامی مراحل [پیش‌نیازها](https://doc.chabok.io/android/required.html) را طی کرده‌اید.

### افزودن کتابخانه

کتابخانه چابک از طریق `jcenter` در دسترس است. برای این منظور ابتدا در فایل `gradle` اصلی پروژه، `jcenter` را بعنوان `repository` مطابق قطعه کد زیر اضافه نمایید:

```javascript
buildscript {
  repositories {
    jcenter()
  }
}  
```
<Br>

### مدل نسخه‌گذاری در چابک (Semantic Versioning)

چابک از مدل نسخه‌گذاری `MAJOR`.`MINOR`.`PATCH` استفاده می‌کند. همه تغییرات نسخه‌ها بلافاصله پس از انتشارشان به صورت موردی در صفحه **لیست  تغییرات** برای اطلاع شما اضافه می‌شوند. برای همین توصیه می‌کنیم [این صفحه](https://doc.chabok.io/android/release-note.html) را حتما مطالعه نمایید. این موارد برای هر نسخه در دو بخش [**ارتقا**](https://doc.chabok.io/android/release-note.html#%D8%A7%D8%B1%D8%AA%D9%82%D8%A7) و [**تغییرات**](https://doc.chabok.io/android/release-note.html#%D8%AA%D8%BA%DB%8C%DB%8C%D8%B1%D8%A7%D8%AA) برای شما نمایش داده شده‌ است.

- `Patch:` تغییرات در این سطح شامل **Bug Fix** و **قابلیت‌های بسیار کوچک** می‌باشد. به روز رسانی به این نسخه‌ها نیاز به تغییری در کد ندارد. برای آگاهی از آن‌ها، باید بخش [**تغییرات**](https://doc.chabok.io/android/release-note.html#%D8%AA%D8%BA%DB%8C%DB%8C%D8%B1%D8%A7%D8%AA) را مطالعه کنید. به عنوان مثال به‌ روز رسانی کتابخانه چابک از نسخه `2.13.0` به نسخه `2.13.2` مربوط به این سطح می‌شود.

- `Minor:` تغییرات در این سطح شامل **قابلیت‌های بزرگتر** و **تغییر در کارکرد (Functionality) کتابخانه** می‌شود. در به روز رسانی به این نسخه‌ها حتما باید بخش [**ارتقا**](https://doc.chabok.io/android/release-note.html#%D8%A7%D8%B1%D8%AA%D9%82%D8%A7) و [تغییرات](https://doc.chabok.io/android/release-note.html#%D8%AA%D8%BA%DB%8C%DB%8C%D8%B1%D8%A7%D8%AA) صفحه لیست تغییرات را با دقت مطالعه کنید. در صورت بروز هر گونه مشکل در نتیجه رعایت نکردن نکات بخش **ارتقا** و **تغییرات** در به روز رسانی به نسخه‌های **Minor**، تیم چابک مسئولیتی را نمی‌پذیرد. توصیه می‌کنیم که هر سه تا شش ماه اقدام به بررسی نسخه‌های **Minor** نمایید. به عنوان مثال به‌ روز رسانی کتابخانه چابک از نسخه `2.12.1` به نسخه `2.13.2` مربوط به این سطح می‌شود.

- `Major:` این سطح از تغییرات مخصوص **بازنویسی** و یا **تغییرات اساسی** در کتابخانه چابک است. در به روز رسانی به این نسخه‌ها حتما باید بخش [**ارتقا**](https://doc.chabok.io/android/release-note.html#%D8%A7%D8%B1%D8%AA%D9%82%D8%A7) و [**تغییرات**](https://doc.chabok.io/android/release-note.html#%D8%AA%D8%BA%DB%8C%DB%8C%D8%B1%D8%A7%D8%AA) تغییرات صفحه لیست تغییرات را با دقت مطالعه کنید. در صورت بروز هر گونه مشکل در نتیجه رعایت نکردن نکات بخش **ارتقا** و **تغییرات** در به روز رسانی به نسخه‌های **Major**، تیم چابک مسئولیتی را نمی‌پذیرد. بنابراین توصیه می‌کنیم که هر یک سال اقدام به بررسی نسخه‌های **Major** نمایید. به عنوان مثال به‌روزرسانی کتابخانه چابک از نسخه `1.0.1` به نسخه `2.13.2` مربوط به این سطح می‌شود.

> `نکته:` در مدل `Patch` شما می‌توانید از کاراکتر + (Wildcard) استفاده کنید و به آسانی از تغییرات آن بهره‌مند شوید.

### نصب کتابخانه
چابک دارای دو کتابخانه **استاندارد** و **با قابلیت مکان‌یابی** می‌باشد. شما می‌توانید متناسب با نیاز خودتان از **یکی** آن‌ها استفاده کنید.

#### نصب کتابخانه استاندارد چابک
برای استفاده از کتابخانه چابک **بدون نیاز به قابلیت مکان‌یابی** (استاندارد) از کتابخانه `chabok-lib` که در زیر به آن اشاره‌شده است، استفاده کنید. 
فایل `build.gradle` در مسیر app را باز کرده و در بخش `dependencies` خط زیر را اضافه نمایید:

```javascript
dependencies {
    compile 'me.leolin:ShortcutBadger:1.1.22@aar'
    compile 'com.adpdigital.push:chabok-lib:VERSION'
}
```

> `نکته:` توجه داشته باشید که برای `VERSION` آخرین نسخه کتابخانه را از [این صفحه](https://doc.chabok.io/android/release-note.html) مشاهده کنید و سپس آن را وارد نمایید. 

> `نکته:` دقت داشته باشید که همیشه از جدیدترین نسخه **ShortcutBadger** استفاده کنید. برای اطلاع از آخرین نسخه می‌توانید به [این لینک](https://github.com/leolin310148/ShortcutBadger) مراجعه نمایید. همچنین با توجه به حجم زیاد مجوزهای نمایش نشان (**Badge**) روی آیکون اپ،‌ می‌توانید از [این قسمت](https://doc.chabok.io/android/features.html#برداشتن-مجوزهای-غیر-ضروری-برای-نمایش-نشان-badge-روی-آیکون) هر کدام از آن‌ها را با اختیار خودتان بردارید. 

آخرین نسخه فایل کتابخانه چابک از [اینجا](https://bintray.com/bintray/jcenter?filterByPkgName=com.adpdigital.push) قابل دسترس می‌باشد.
در انتها گزینه سینک را بزنید.

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

> `نکته :` به علت محدودیت‌‌های اندروید ۸ به بالا دقت کنید حتما مطابق جدول زیر تنظیمات نسخه‌ها را بدرستی انجام دهید.  در صورت رعایت نکردن نسخه‌های ذکر شده در جدول زیر هنگامی که اپلیکیشن **kill** شده باشد به هنگام دریافت نوتیفیکیشن با خطا مواجه خواهد شد.

> `نکته`: برای استفاده از سرویس جی‌سی‌ام گوگل لازم است خط زیر نیز در بخش
> `dependencies`  اضافه شود:

```javascript
dependencies {
    compile "com.google.android.gms:play-services-gcm:10.2.6" 
}
```

#### نصب کتابخانه با قابلیت مکان‌یابی چابک

درصورتی که در برنامه خود نیاز به استفاده از موقعیت مکانی کاربر دارید، لازم است در ابتدا کتابخانه `chabok-lib` را **حذف** و کتابخانه `chabok-lib-geo` را **جایگزین کنید**. 
 باتوجه به اینکه در این کتابخانه از سرویس فیوز گوگل استفاده شده است باید  تغییرات زیر نیز در قسمت ‌‌‌`dependencies` اعمال شود:
 
 ```javascript
dependencies {
   compile 'com.google.android.gms:play-services-location:10.2.6'
   compile 'com.adpdigital.push:chabok-lib-geo:VERSION'
   compile 'me.leolin:ShortcutBadger:1.1.22@aar'
}  
```
