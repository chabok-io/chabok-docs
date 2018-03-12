---
id: installation
title: نصب چابک
layout: react-native-bridge
permalink: react-native-bridge/installation.html
prev: introducing.html
next: setup.html
---


### نصب روی پلتفرم موردنظر
هم Android و هم iOS نیازمند نصب جداگانه هستند.

### افزودن کتابخانه - Android
ماژول chabok-client-chabok را مانند دستور زیر نصب کنید:

```bash
yarn add react-native-chabok
```
یا
```bash
npm install react-native-chabok --save
```

### عمل link
بعد از اتمام نصب، دستور زیر را اجرا کنید تا ماژول به پروژه شما link‌ شود:

```bash
react-native link react-native-chabok
```
پس از این کار در کلاس Application پروژه‌تان در نمونه `ReactNativeHost` پکیج `ChabokReactPackage` مانند کد زیر افزوده خواهد شد:
```java
private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
              new ChabokReactPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };
```


### افزودن در gradle
کتابخانه چابک از طریق `jcenter` در دسترس است. برای این منظور ابتدا در فایل `gradle` اصلی پروژه، `jcenter` را بعنوان `repository` مطابق قطعه کد زیر اضافه نمایید:

```javascript
buildscript {
  repositories {
    jcenter()
  }
}
  
```

سپس فایل `build.gradle` در پوشه android/app را بازکرده و در بخش `dependencies` خط زیر را اضافه نمایید:

```javascript
dependencies {
    compile 'me.leolin:ShortcutBadger:1.1.18@aar'
    compile 'com.adpdigital.push:chabok-lib-VERSION'
}
```

> `نکته`: برای اینکه نسخه کتابخانه‌ای که استفاده می‌کنید همواره آخرین نسخه
> باشد، می‌توانید به جای ‌VERSION از + استفاده نمایید.

آخرین نسخه فایل کتابخانه چابک از  [اینجا](https://bintray.com/bintray/jcenter?filterByPkgName=com.adpdigital.push) قابل دسترس می‌باشد.
در انتها گزینه سینک را بزنید.

> `نکته`: برای استفاده از سرویس جی‌سی‌ام گوگل لازم است خط زیر نیز در بخش
> `dependencies`  اضافه شود:

```javascript
dependencies {
    compile "com.google.android.gms:play-services-gcm:10.2.6" 
}
```
