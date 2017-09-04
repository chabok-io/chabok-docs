---
id: installation
title: افزودن کتابخانه چابک به پروژه
layout: android
permalink: android/installation.html
prev: knowledge.html
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

```bash
project/app/aars
```

سپس خط زیر را در بخش dependencies فایل گریدل پروژه بیافزایید:



