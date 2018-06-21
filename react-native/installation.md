---
id: installation
title: نصب چابک
layout: react-native
permalink: react-native/installation.html
prev: required.html
next: setup.html
---

## افزودن کتابخانه

برای نصب از طریق `npm` یا `yarn`:

```bash
npm install chabokpush-rn --save
```
```bash
yarn add chabokpush-rn
```
بعد از نصب دستور زیر را اجرا کنید:
```bash
react-native link
```
> `نکته ` : در اندروید می‌بایست `AndroidManifest.xml` را به صورت دستی تغییر دهید. 


### نصب دستی اندروید

دسترسی زیر را به `AndroidManifest.xml` اضافه کنید:

```markup
.....

<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />

<application ....>
```
