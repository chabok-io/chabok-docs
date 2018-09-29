---
id: features
title: امکانات‌ چابک 
layout: react-native-bridge
permalink: react-native-bridge/features.html
prev: event-tracking.html
---
### مدیریت تگ ها
یکی از مهمترین ابزارهای دسته‌بندی کاربران، استفاده از `Tag` می باشد. به عنوان مثال می‌توانید کاربران خود را بر اساس جنسیت دسته‌بندی کرده و بر اساس جنسیت آنها پیام خاصی را ارسال کنید و یا کاربرانی که از پرداخت درون برنامه‌ای شما استفاده می‌کنند، یک `Tag` با عنوان `Premium_User` به آنها اختصاص دهید.

#### افزودن تگ
با استفاده از متد زیر، شما می‌توانید به کاربر فعلی یک `Tag` اختصاص دهید :

```javascript
this.chabok.addTag("Premium_User")
```
اگر هم می‌خواهید به کاربرتان چند `Tag` یکجا اضافه کنید، می‌توانید از کد زیر استفاده کنید:

```javascript
this.chabok.addTags("Premium_User", "Male", "Teenage")
```

همچنین می‌توانید با استفاده از این متد، از افزودن و یا خطا در عملیات با خبر شوید :
```javascript

this.chabok.addTag('TAG_NAME')
    .then(res => {
        alert('This tag was assign to ' + this.chabok.getUserId() + ' user');
        })
    .catch(_ => console.warn("An error happend adding tag ...",_));
```
اگر عملیات افزودن تگ با موفقیت انجام شود، می‌توانید از طریق پنل چابک، تگ اضافه شده به کاربر را در بخش مشترکین همانند تصویر زیر مشاهده کنید :

![مشترک چابک](http://uupload.ir/files/ujp8__1x-ios_device.png)

#### حذف تگ
با استفاده از متد زیر، می‌توانید یک `Tag` خاص از کاربر فعلی را حذف کنید :

```javascript
this.chabok.removeTag("Premium_User")
```

اگر هم می‌خواهید به کاربرتان چند `Tag` یکجا حذف کنید، می‌توانید از کد زیر استفاده کنید:

```javascript
this.chabok.removeTags("Premium_User", "Male", "Teenage")
```

###  مدیریت نشان‌ها (Badge)

اگر می‌خواهید شماره badge برنامه خود را بازنشانی کنید، با روش زیر می‌توانید: 


```java
this.chabok.resetBadge()
``` 
> `نکته`: با توجه به حجم زیاد مجوزهای نمایش نشان (**Badge**) روی آیکون اپ،‌ می‌توانید از [این قسمت](https://doc.chabokpush.com/android/features.html#برداشتن-مجوزهای-غیر-ضروری-برای-نمایش-نشان-badge-روی-آیکون) هر کدام از آن‌ها را با اختیار خودتان بردارید. 


### اتصال با سرور
برای دریافت از وضعیت آنلاین یا آفلاین بودن، باید یک listener به رویداد `connectionStatus` مانند زیر اضافه کنید:

```javascript
const chabokEmitter = new NativeEventEmitter(NativeModules.AdpPushClient);

chabokEmitter.addListener(
    'connectionStatus',
        (status) => {
            if (status === 'CONNECTED') {
                //Connected to chabok
            } else if (status === 'CONNECTING') {
                //Connecting to chabok
            } else if (status === 'DISCONNECTED') {
                //Disconnected
            } else {
                // Closed
            }
    });
```

### شناسه دستگاه در چابک
هر دستگاه در سرویس چابک دارای یک شناسه منحصر به فرد می‌باشد، برای دسترسی به این شناسه می‌توانید متد زیر را فراخوانی کنید:
```javascript
this.chabok.getInstallationId()
```
### مدیریت اطلاعات کاربر
شما با دو متد زیر می‌توانید اطلاعات کاربر را تنظیم و دریافت کنید. 

- متد `setUserInfo` برای تنظیم اطلاعات کاربر:

```javascript
this.chabok.setUserInfo({
 firstname: 'ahmad',
 lastname: 'mirzaee',
 email: 'ahmad.m@gmail.com',
 age: 17
})
```
- متد `getUserInfo` برای دریافت اطلاعات کاربر:

```javascript
this.chabok.getUserInfo()
```

