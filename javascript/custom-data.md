---
id: custom-data
title: داده‌های سفارشی کاربر
layout: javascript
permalink: javascript/custom-data.html
prev: push-notification.html
next: behavior-tracking.html
---

 در این صفحه می‌توانید برای کاربرانتان **اطلاعات، ویژگی‌ها (attributes) و تگ** اضافه کنید. ثبت اطلاعات هر کاربر به تعامل شما با او کمک می‌کند طوری که می‌توانید **پیام‌های شخصی‌سازی شده** برایشان ارسال کنید.

<Br><Br>


### مدیریت اطلاعات کاربر (User Attributes)
---

شما می‌توانید اطلاعات و داده‌هایی که از کاربرانتان دارید را در پروفایل او مدیریت کنید و در تعامل با او از آن‌ها استفاده کنید.

![عکس مربوطه](http://uupload.ir/files/vi3a_user-attributes.png)

<br>

#### ثبت اطلاعات کاربر 


شما می‌توانید اطلاعاتی که از کاربر دارید (مانند نام، نام خانوادگی، جنسیت، سن و ...) را به طور دلخواه با استفاده از متد زیر، در پروفایل او ثبت کنید:

```javascript
this.chabok.setUserInfo({
                firstName: 'مهدی',
                lastName: 'یعقوبی',
                age: 19,
                gender: 'مرد'
            });
```

پس از فراخوانی این متد و ثبت اطلاعات می‌توانید آن را در **پنل>جزئیات دستگاه>کارت اطلاعات کاربر** مانند زیر مشاهده کنید:

![عکس مربوطه](http://uupload.ir/files/9p2w_set-user-info-2.png)

<br><br>

### مدیریت تگ‌ها
---

یکی از قوانین سگمنت، **تگ** یا همان **برچسب‌گذاری کاربران** می‌باشد. به عنوان مثال می‌توانید کاربران خود را بر اساس **جنسیت** برچسب‌گذاری کرده و به آن‌ها پیام خاصی را ارسال کنید و یا به کاربرانی که از پرداخت درون برنامه‌ای شما استفاده می‌کنند یک `Tag` با عنوان `Premium_User` اختصاص دهید.

#### افزودن تگ

با استفاده از متد زیر، شما می‌توانید به کاربر فعلی یک `Tag` اختصاص دهید:

```javascript
chabok.addTag("Premium_User")
```
همچنین برای اضافه چند تگ به طور یکجا می‌توانید از متد زیر استفاده کنید:

```javascript
chabok.addTags('Premium_User', 'Male', 'Teenage')
```

همچنین می‌توانید با استفاده از overload دیگر این متد، از افزودن و یا خطا در عملیات با خبر شوید:
```javascript

chabok.addTag("Premium_User")
  .then( count => {
    console.log(`Premium tag was assign to ${chabok.getUserId} user with ${count} devices")
  })
  .catch( err => console.log("An error happend adding tag ..."))
```
اگر عملیات افزودن تگ با موفقیت انجام شود، می‌توانید از طریق پنل چابک، تگ اضافه شده به کاربر را در بخش مشترکین همانند تصویر زیر مشاهده کنید:

![مشترک چابک](http://uupload.ir/files/ujp8__1x-ios_device.png)

#### حذف تگ

با استفاده از متد زیر، می‌توانید یک `Tag` خاص از کاربر فعلی را حذف کنید:

```javascript
chabok.removeTag("Premium_User")
```

همچنین برای حذف چند تگ به طور یکجا می‌توانید از متد زیر استفاده کنید:

```javascript
chabok.removeTags('Premium_User', 'Male', 'Teenage')
```

> `نکته:` برای حذف همه تگ‌های یک کاربر می‌توانید در متد بالا جای نام تگ (پرانتز) را خالی بگذارید.

#### دریافت تگ‌ها

شما با استفاده از متد `getTags` می‌توانید لیست تگ‌های یک کاربر را دریافت نمایید.

```javascript
chabok.getTags()
     .then(tags => {
          console.log(typeof tags) // array
          console.log('tags', tags) // ['sample_tag1', 'sample_tag2', .... ]
     })
```