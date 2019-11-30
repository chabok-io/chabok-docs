---
id: installation
title: نصب چابک
layout: react-native
permalink: react-native/installation.html
prev: required.html
next: push-notification.html

---

## افزودن کتابخانه

برای **نصب** از طریق `npm` یا `yarn`:

```bash
npm install chabokpush-rn --save
```
یا

```bash
yarn add chabokpush-rn
```

بعد از نصب دستور زیر را اجرا کنید:

```bash
react-native link chabokpush-rn
```

برای **دریافت اطلاعات دستگاه** از طریق `npm` یا `yarn`: 

```bash
npm install react-native-device-info --save
```
یا

```bash
yarn add react-native-device-info
```

بعد از نصب دستور زیر را اجرا کنید:

```bash
react-native link react-native-device-info
```

برای **تنظیم پوش‌نوتیفیکیشن** از طریق `npm` یا `yarn` (اختیاری): 

```bash
npm install react-native-push-notification --save
```
یا

```bash
yarn add react-native-push-notification
```

بعد از نصب دستور زیر را اجرا کنید:

```bash
react-native link react-native-push-notification
```

> `نکته ` : دقت داشته باشید که چابک به طور پیش‌فرض **توکن پوش** نمی‌گیرد، بنابراین برای **تنظیم پوش‌نوتیفیکیشن** می‌توانید با استفاده از مستندات [اندروید](https://doc.chabok.io/react-native/push-notification.html#%D8%A7%D9%86%D8%AF%D8%B1%D9%88%DB%8C%D8%AF) و [آی‌اواس](https://doc.chabok.io/react-native/push-notification.html#%D8%A2%DB%8C%D8%A7%D9%88%D8%A7%D8%B3)  آن را روی پروژه خود پیاده‌سازی کنید.

> `نکته ` : در اندروید می‌بایست `AndroidManifest.xml` را به صورت دستی تغییر دهید. 

### نصب اندروید

دسترسی زیر را به `AndroidManifest.xml` اضافه کنید:

```markup
.....

<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />

<application ....>
```
