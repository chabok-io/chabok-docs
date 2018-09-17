---
id: installation
title: نصب چابک
layout: react-native-bridge
permalink: react-native-bridge/installation.html
prev: introducing.html
next: setup.html
---


### افزودن کتابخانه 
برای نصب از طریق `npm` یا `yarn`:

```bash
yarn add react-native-chabok
```
یا
```bash
npm install react-native-chabok --save
```

### لینک کردن کتابخانه
بعد از اتمام نصب، دستور زیر را اجرا کنید تا ماژول به پروژه شما لینک شود:

```bash
react-native link react-native-chabok
```

>`نکته:` دقت داشته باشید که هم اندروید و هم آی‌اواس نیازمند نصب جداگانه دارند که در ادامه به هر دو پرداخته می‌شود.

### نصب اندروید

سپس فایل `build.gradle` در پوشه android/app را مانند زیر ویرایش نمایید:

```javascript
android {
    compileSdkVersion 26
    buildToolsVersion "26.0.2"
    ...
}
dependencies {
    ...
    compile "com.google.android.gms:play-services-gcm:10.2.6"
    compile 'me.leolin:ShortcutBadger:1.1.22@aar'
    compile 'com.adpdigital.push:chabok-lib:+'
    ...
}
```

> `نکته`: برای اینکه نسخه کتابخانه‌ای که استفاده می‌کنید همواره آخرین نسخه
> باشد، می‌توانید به جای ‌VERSION از + استفاده نمایید.

آخرین نسخه فایل کتابخانه چابک از  [اینجا](https://bintray.com/bintray/jcenter?filterByPkgName=com.adpdigital.push) قابل دسترس می‌باشد.
در انتها گزینه سینک را بزنید.

### نصب آی‌اواس

