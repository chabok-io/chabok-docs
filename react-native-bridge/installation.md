---
id: installation
title: نصب چابک
layout: react-native-bridge
permalink: react-native-bridge/installation.html
prev: introducing.html
next: setup.html
---

## افزودن کتابخانه

برای نصب از طریق `npm` یا `yarn`:

```bash
npm install chabokpush --save
```
```bash
yarn add chabokpush
```
> `نکته ` : در اندروید می‌بایست `AndroidManifest.xml` را به صورت دستی تغییر دهید. 


### نصب دستی اندروید

دسترسی زیر را به `AndroidManifest.xml` اضافه کنید:

```markup
.....

<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />

<application ....>
```
