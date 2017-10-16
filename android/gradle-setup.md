---
id: gradle-setup
title: نصب چابک
layout: android
permalink: android/gradle-setup.html
prev: required.html
next: application-class.html
---

افزودن کتابخانه چابک به پروژه اندروید به دو روش امکان‌پذیر است.

## افزودن کتابخانه چابک از طریق jcenter

برای این منظور ابتدا در فایل gradle اصلی پروژه بایستی jcenter را بعنوان repository اضافه نمایید، مطابق نمونه زیر:

```javascript
buildscript {
  repositories {
    jcenter()
  }
}
  
```

حالا فایل build.gradle در مسیر app را بازکرده و در بخش dependencies خط زیر را وارد نمایید:

```javascript
dependencies {
    compile 'com.adpdigital.push:chabok-lib:LATEST_CHABOK_VERSION'
}
```



##  افزودن دستی فایل کتابخانه

چنانچه قصد استفاده از jcenter را ندارید، می توانید آخرین نسخه فایل کتابخانه چابک را از اینجا دانلود کرده، سپس در پوشه‌ای با نام aars در داخل پوشه اصلی پروژه خود قرار دهید: 

```code
project/app/aars
```

سپس خط زیر را در بخش dependencies فایل گریدل پروژه بیافزایید:

```javascript
dependencies {
    compile(name: 'chabok-lib-2.8.3', ext: 'aar')
}
   
```

در بالای صفحه سمت راست گزینه سینک را بزنید تا گریدل سینک شود.


