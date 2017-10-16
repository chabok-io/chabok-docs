---
id: gradle-setup
title: نصب چابک
layout: android
permalink: android/gradle-setup.html
prev: required.html
next: application-class.html
---

### افزودن کتابخانه

کتابخانه چابک از طریق `jcenter` در دسترس است. برای این منظور ابتدا در فایل `gradle` اصلی پروژه، `jcenter` را بعنوان `repository` مطابق قطعه کد زیر اضافه نمایید:

```javascript
buildscript {
  repositories {
    jcenter()
  }
}
  
```

سپس فایل `build.gradle` در مسیر app را بازکرده و در بخش `dependencies` خط زیر را اضافه نمایید:

```javascript
dependencies {
    compile 'com.adpdigital.push:chabok-lib:LATEST_CHABOK_VERSION'
}
```

آخرین نسخه فایل کتابخانه چابک از  [اینجا](https://bintray.com/bintray/jcenter?filterByPkgName=com.adpdigital.push) قابل دسترس می‌باشد.
در انتها گزینه سینک را بزنید.



### کتابخانه با قابلیت مکان‌یابی

 چابک دارای دو کتابخانه استاندارد و با قابلیت مکان‌یابی می‌باشد. درصورتی که در برنامه خود نیاز به استفاده از موقعیت مکانی کاربر دارید لازم است از کتابخانه chabok-lib-geo-VERSION استفاده نمایید. 
 باتوجه به اینکه در این کتابخانه از سرویس فیوز گوگل استفاده شده است لذا لازم است تا تغییرات زیر نیز در قسمت ‌‌‌`dependencies` اعمال شود:
 
 ```javascript
dependencies {
   compile 'com.google.android.gms:play-services-location:10.2.6'
   compile 'com.github.arturogutierrez:badges:1.0.5@aar'
}  
```
