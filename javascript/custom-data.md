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

<br>

#### ثبت اطلاعات کاربر 


شما می‌توانید اطلاعاتی که از کاربر دارید (مانند نام، نام خانوادگی، جنسیت، سن و ...) را به طور دلخواه با استفاده از متد زیر، در پروفایل او ثبت کنید:

```javascript
const attributes = {
          firstName: 'مهدی',
          lastName: 'یعقوبی',
          age: 19,
          married: true,
          gender: 'مرد'
        }
chabok.setUserAttributes(attributes)
```


پس از فراخوانی این متد و ثبت اطلاعات می‌توانید آن را در **پنل > جزئیات دستگاه > کارت اطلاعات کاربر** مانند زیر مشاهده کنید:

![عکس مربوطه](http://uupload.ir/files/9p2w_set-user-info-2.png)

<br>

> `نکته` : در صورتی که از ویژگی  (**phone** (Attribute استفاده کنید، می‌توانید با smart API چابک اقدام به ارسال  پیامک کنید. فقط دقت داشته باشید که شماره همراه کاربر با کد کشور او شروع شود؛ به عنوان مثال ***۹۸۹۱۲۰۴۹۸.

>`نکته:` دقت داشته باشید که برای ثبت اطلاعات کاربر در **نسخه‌های ۱.۴.۰ به پایین** باید از متد زیر استفاده کنید:

```javascript
const attributes = {
    firstName: 'مهدی',
    lastName: 'یعقوبی',
    age: 19,
    married: true,
    gender: 'مرد'
}

this.chabok.setUserInfo(attributes);
```

> `نکته` : دقت داشته باشید  **type** مقداری که به `value` در متد `setUserAttributes` داده‌اید، را نمی‌توانید تغییر دهید . به این معنی که اگر `boolean` ذخیره کرده‌اید، دیگر **نمی‌توانید** عدد یا `string` دهید یا برعکس. به مثال زیر توجه کنید. 

به عنوان مثال اگر مقدار `age` را مانند زیر `string` قرار داده باشید:

```javascript
const attributes = {
          age: 'نوزده'
        }
chabok.setUserAttributes(attributes)
```

دیگر عدد قرار دادن آن مانند زیر **کار نخواهد کرد:**

```javascript
const attributes = {
          age: 19
        }
chabok.setUserAttributes(attributes)
```

<br>


#### ارسال مقادیر آرایه‌ای و تاریخ در داده‌های سفارشی کاربر

در صورت استفاده از **نسخه ۲.۰.۰ یا بالاتر کتابخانه چابک**، باید متد زیر را فراخوانی کنید.

```javascript
const attributes = {
    firstname: 'Farbod',
    lastname: 'Ahmadi',
    age: 28,
    married: true,
    birthday: new Date(),
}

chabok.setUserAttributes(attributes)
```

>`نکته:`
از شی `Date` تنها در نسخه **۲.۰.۰ یا بالاتر کتابخانه چابک** استفاده می‌شود.

<br>

#### افزودن به مقادیر آرایه‌ای در داده‌های سفارشی کاربر

برای اضافه کردن اطلاعات آرایه‌ای در داده‌های سفارشی کاربران کافیست متد زیر را فراخوانی نمایید:

```javascript
chabok.addToUserAttributeArray('favorite_movies', 'movies_05');
```
کاربران وقتی به محصولی علاقه نشان می‌دهند، آن را به لیست علاقه‌مندی خود اضافه می‌کنند که برای افزودن محصول، باید شبه کد زیر را به متد اصلی اضافه ‌کنید.

```javascript
chabok.addToUserAttributeArray('action_movie', 'movies_02');
```

#### حذف از مقادیر آرایه‌ای در داده‌های سفارشی کاربر

متد زیر **آرایه‌ای** از اطلاعات کاربران (attribute) را حذف می‌کند.

```javascript
chabok.removeFromUserAttributeArray('favorite_movies', 'movies_02');
```
طبق مثال بالا برای حذف کردن محصول از لیست علاقه‌مندی کاربران باید از قطعه کد بالا استفاده نمایید.

<br>

####  حذف داده‌های سفارشی کاربران

برای حذف اطلاعات کاربران (attribute)، متد زیر را فراخوانی کنید.

```javascript
chabok.unsetUserAttribute('firstName');
chabok.unsetUserAttribute('age');
```

<br>

#### افزایش داده‌های کمیتی کاربر

شما می‌توانید داده‌های کمیتی کاربر را مانند **بازدید از محصول یا صفحه‌ای، خرید آیتم خاصی** و .. را به تعداد دلخواهتان **افزایش** دهید. برای این کار متد زیر را فراخوانی کنید: 

```javascript
chabok.incrementUserAttribute('comedy_movie')
chabok.incrementUserAttribute('comedy_movie', 3)
```
 همچنین این متد از **آرایه‌ای** از اطلاعات کاربر (attribute) هم پشتیبانی می‌کند. به نمونه زیر دقت کنید: 

```javascript
chabok.incrementUserAttribute(['comedy_movie', 'workout'])
```
کد بالا به هر کدام از attributeها **یک عدد** اضافه می‌کند.

برای اضافه کردن **تعداد دلخواه** به چند attribute می‌توانید از کد زیر استفاده کنید:

```javascript
chabok.incrementUserAttribute({workout: 10, size: 40})
```

<br>

#### دریافت اطلاعات کاربر

برای دریافت اطلاعات کاربر باید متد زیر را فراخوانی کنید:

```javascript
const attributes = chabok.getUserAttributes();
```

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
