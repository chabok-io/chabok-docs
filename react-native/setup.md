---
id: setup
title: راه‌اندازی چابک
layout: react-native
permalink: react-native/setup.html
prev: installation.html
next: methods.html
---

## مقدار‌دهی اولیه
برای ارتباط با سرور چابک، لازم است یک نمونه از کلاس  `chabokpush` بسازید و آن را مقدار دهی کنید.
برای مقدار دهی اولیه می‌بایست از طریق متد `chabok` اطلاعات حساب چابک و تنظیمات اولیه را وارد نمایید.ایجاد حساب در بخش [پیش‌نیازها](required.html) توضیح داده شده است.

```javascript
const auth = {
  appId: 'APP_ID',
  apiKey: 'API_KEY',
  username: 'USERNAME',
  password: 'PASSWORD',
  devMode:true
}
const chabok = new chabokpush.Chabok(auth, options)

chabok.register('012345678910111213')
```

> `نکته ` : برای استفاده از چابک در محیط عملیاتی مقدار `devMode` را `False` کنید. 

> `نکته ` : در صورتی که مقداردهی اولیه به درستی اعمال شده باشد، می‌توانید اطلاعات دستگاه متصل خود را در [بخش مشترکین پنل چابک](https://sandbox.push.adpdigital.com/front/users/subscribers/list) مشاهده کنید. 

## تنظیمات اولیه

| توضیحات | نوع | پیش فرض | پارامتر |
| --- | --- | --- | --- |
|  |  | `Object` | **[options]** |
| فعال/غیرفعال سازی ارتباط آنی | <code>True</code> | <code>Object</code> | **[options.realtime]** |
