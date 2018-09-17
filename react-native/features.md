---
id: features
title: امکانات‌ چابک 
layout: react-native
permalink: react-native/features.html
prev: event-tracking.html
---
### مدیریت تگ ها
یکی از مهمترین ابزارهای دسته‌بندی کاربران، استفاده از `Tag` می باشد. به عنوان مثال می‌توانید کاربران خود را بر اساس جنسیت دسته‌بندی کرده و بر اساس جنسیت آنها پیام خاصی را ارسال کنید و یا کاربرانی که از پرداخت درون برنامه‌ای شما استفاده می‌کنند، یک `Tag` با عنوان `Premium_User` به آنها اختصاص دهید.

#### افزودن تگ
با استفاده از متد زیر، شما می‌توانید به کاربر فعلی یک `Tag` اختصاص دهید :

```javascript
chabok.addTag("Premium_User")
```
اگر هم می‌خواهید به کاربرتان چند `Tag` یکجا اضافه کنید، می‌توانید از کد زیر استفاده کنید:

```javascript
chabok.addTags("Premium_User", "Male", "Teenage")
```

همچنین می‌توانید با استفاده از این متد، از افزودن و یا خطا در عملیات با خبر شوید :
```javascript

this.chabok.addTag(this.state.tagName)
                .then(({count}) => {
                    alert(this.state.tagName + ' tag was assign to ' + this.getUserId() + ' user with '+ count + ' devices');
                })
                .catch(_ => console.warn("An error happend adding tag ..."));
```
اگر عملیات افزودن تگ با موفقیت انجام شود، می‌توانید از طریق پنل چابک، تگ اضافه شده به کاربر را در بخش مشترکین همانند تصویر زیر مشاهده کنید :

![مشترک چابک](http://uupload.ir/files/ujp8__1x-ios_device.png)

#### حذف تگ
با استفاده از متد زیر، می‌توانید یک `Tag` خاص از کاربر فعلی را حذف کنید :

```javascript
chabok.removeTag("Premium_User")
```

اگر هم می‌خواهید به کاربرتان چند `Tag` یکجا حذف کنید، می‌توانید از کد زیر استفاده کنید:

```javascript
chabok.removeTags("Premium_User", "Male", "Teenage")
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
`closed`: دریافت وضعیت اتصال بسته شده است

```javascript
chabok.on('closed', _ => {status = 'closed ...'}); 
```

`error`: رویداد دریافت خطا‌ها 

```javascript
chabok.on('error', _ => {status = 'error ...'}); 
```

### شناسه دستگاه در چابک
هر دستگاه در سرویس چابک دارای یک شناسه منحصر به فرد می‌باشد، برای دسترسی به این شناسه می‌توانید متد زیر را فراخوانی کنید:
```javascript
chabok.getInstallationId()
```
### مدیریت اطلاعات کاربر
شما با دو متد زیر می‌توانید اطلاعات کاربر را تنظیم و دریافت کنید. 

- متد `setUserInfo` برای تنظیم اطلاعات کاربر:

```javascript
chabok.setUserInfo({
 firstname: 'ahmad',
 lastname: 'mirzaee',
 email: 'ahmad.m@gmail.com',
 age: 17
})
```
- متد `getUserInfo` برای دریافت اطلاعات کاربر:

```javascript
chabok.getUserInfo()
```

