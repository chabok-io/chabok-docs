---
id: features
title: امکانات‌ چابک 
layout: react-native
permalink: react-native/features.html
prev: notification.html
---
### مدیریت تگ ها
یکی از مهمترین ابزارهای دسته‌بندی کاربران، استفاده از `Tag` می باشد. به عنوان مثال می‌توانید کاربران خود را بر اساس جنسیت دسته‌بندی کرده و بر اساس جنسیت آنها پیام خاصی را ارسال کنید و یا کاربرانی که از پرداخت درون برنامه‌ای شما استفاده می‌کنند، یک `Tag` با عنوان `Premium_User` به آنها اختصاص دهید.

#### افزودن تگ
با استفاده از متد زیر، شما می‌توانید به کاربر فعلی یک `Tag` اختصاص دهید :

```javascript
chabok.addTag("Premium_User")
```
همچنین می‌توانید با استفاده از overload دیگر این متد، از افزودن و یا خطا در عملیات با خبر شوید :
```javascript

chabok.addTag("Premium_User")
  .then( count => {
    console.log(`Premium tag was assign to ${chabok.getUserId} user with ${count} devices")
  })
  .catch( err => console.log("An error happend adding tag ..."))
```
اگر عملیات افزودن تگ با موفقیت انجام شود، می‌توانید از طریق پنل چابک، تگ اضافه شده به کاربر را در بخش مشترکین همانند تصویر زیر مشاهده کنید :

![مشترک چابک](http://uupload.ir/files/ujp8__1x-ios_device.png)
#### حذف تگ
با استفاده از متد زیر، می‌توانید یک `Tag` خاص از کاربر فعلی را حذف کنید :

```javascript
chabok.removeTag("Premium_User")
```
### شناسه دستگاه در چابک
هر دستگاه در سرویس چابک دارای یک شناسه منحصر به فرد می‌باشد، برای دسترسی به این شناسه می‌توانید متد زیر را فراخوانی کنید :
```javascript
chabok.getInstallationId()
```

### اتصال با سرور
برای اطلاع از وضعیت آنلاین یا آفلاین بودن،میتوانید از متد زیر استفاده کنید:

`connecting`: دریافت وضیت در حال اتصال

```javascript
chabok.on('connecting', _ => {status = 'Connecting ...'}); 
```

`connected`: دریافت وضعیت اتصال برقرار شده است

```javascript
chabok.on('connected', _ => {status = 'connected ...'}); 
```

`disconnected`: دریافت وضعیت اتصال قطع شده است

```javascript
chabok.on('disconnected', _ => {status = 'disconnected ...'}); 
```
