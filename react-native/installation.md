---
id: installation
title: نصب چابک
layout: react-native
permalink: react-native/installation.html
prev: required.html
next: setup.html

---

## افزودن کتابخانه

برای **نصب** از طریق `npm` یا `yarn`:

```bash
npm install chabokpush-rn --save
```

```bash
yarn add chabokpush-rn
```

بعد از نصب دستور زیر را اجرا کنید:

```bash
react-native link chabokpush-rn
```

نصب **دریافت اطلاعات دستگاه** از طریق `npm` یا `yarn`: 

```bash
npm install react-native-device-info --save
```

```bash
yarn add react-native-device-info
```

بعد از نصب دستور زیر را اجرا کنید:

```bash
react-native link react-native-device-info
```

**تنظیم پوش‌نوتیفیکیشن** از طریق `npm` یا `yarn` (اختیاری): 

```bash
npm install react-native-push-notification --save
```

```bash
yarn add react-native-push-notification
```

بعد از نصب دستور زیر را اجرا کنید:

```bash
react-native link react-native-push-notification
```

> `نکته ` : دقت داشته باشید که چابک به طور پیش‌فرض **توکن پوش** نمی‌گیرد، بنابراین برای **تنظیم پوش‌نوتیفیکیشن** می‌توانید با استفاده از مستندات [اندروید](https://doc.chabokpush.com/react-native/android-push-notification.html) و [آی‌اواس](https://doc.chabokpush.com/react-native/ios-push-notification.html)  آن را روی پروژه خود پیاده‌سازی کنید.

> `نکته ` : در اندروید می‌بایست `AndroidManifest.xml` را به صورت دستی تغییر دهید. 

### نصب اندروید

دسترسی زیر را به `AndroidManifest.xml` اضافه کنید:

```markup
.....

<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />

<application ....>
```
