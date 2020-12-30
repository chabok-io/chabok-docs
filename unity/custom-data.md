---
id: custom-data
title: داده‌های سفارشی کاربر
layout: unity
permalink: unity/custom-data.html
prev: user-management.html
next: behavior-tracking.html
---

در این صفحه می‌توانید برای کاربرانتان **اطلاعات (attributes) و تگ** اضافه کنید. ثبت اطلاعات هر کاربر به تعامل شما با او کمک می‌کند طوری که می‌توانید **پیام‌های شخصی‌سازی شده** برایشان ارسال کنید.

<Br><Br>


### مدیریت اطلاعات کاربر (User Attributes)
---

شما می‌توانید اطلاعات و داده‌هایی که از کاربرانتان دارید را در پروفایل او مدیریت کنید و در تعامل با او از آن‌ها استفاده کنید.

<br>

#### ثبت اطلاعات کاربر 

با فراخوانی متد زیر می‌توانید اطلاعات و سوابق کاربر را جمع‌آوری و ذخیره کنید:

```csharp
var birthdayDate = new DateTime(1993,5,19, 20,10,33);
string[] favorites = { "Sport","TV", "Book", "Coding" };
Dictionary<string, object> attributes = new Dictionary<string, object>();
attributes.Add("FirstName", "Hossein");
attributes.Add("LastName", "Shooshtari");
attributes.Add("Age", 27);
attributes.Add("Married", false);
attributes.Add("Birthday", birthdayDate);
attributes.Add("Favorites", favorites);

chabokPush.SetUserAttributes(attributes);
```

پس از فراخوانی این متد و ثبت اطلاعات می‌توانید آن را در **پنل > جزئیات دستگاه > کارت اطلاعات کاربر** مانند زیر مشاهده کنید:

![عکس مربوطه](http://uupload.ir/files/ovf0_set-user-info.png)

<br>

>`نکته` : در صورتی که از شماره تلفن (پارامتر phone) در اطلاعات کاربران (Attribute) استفاده کنید، می‌توانید با smart API  چابک اقدام به ارسال پیامک کنید. فقط دقت داشته باشید که شماره همراه کاربر با کد کشور او شروع شود؛ به عنوان مثال ۹۸۹۱۲۰۴۹۸.

>`نکته`: در صورتی که از آدرس ایمیل (پارامتر email) در اطلاعات کاربران (Attribute) استفاده می‌کنید، می‌توانید با smart API چابک به کاربران ایمیل بزنید. 


> `نکته` : دقت داشته باشید  **type** مقداری که به `value` در متد `setUserAttributes` داده‌اید، را نمی‌توانید تغییر دهید . به این معنی که اگر `boolean` ذخیره کرده‌اید، دیگر **نمی‌توانید** عدد یا `string` دهید یا برعکس. به مثال زیر توجه کنید. 

به عنوان مثال اگر مقدار `age` را مانند زیر `string` قرار داده باشید:


```csharp
attributes("age", "27");
chabokPush.SetUserAttributes(attributes);
```

دیگر عدد قرار دادن آن مانند زیر **کار نخواهد کرد:**

```csharp
attributes("age", 27);
chabokPush.SetUserAttributes(attributes);
```
<br>

#### افزودن به مقادیر آرایه‌ای در داده‌های سفارشی کاربر

برای اضافه کردن اطلاعات آرایه‌ای در داده‌های سفارشی کاربران کافیست متد زیر را فراخوانی نمایید:

```csharp
chabokPush.AddToUserAttributeArray("Favorites", "Sleeping");
```

#### حذف از مقادیر آرایه‌ای در داده‌های سفارشی کاربر

متد زیر **آرایه‌ای** از اطلاعات کاربران (attribute) را حذف می‌کند.

```csharp
chabokPush.RemoveFromUserAttributeArray("Favorites", "Book");
```
طبق مثال بالا برای حذف کردن محصول از لیست علاقه‌مندی کاربران باید از قطعه کد بالا استفاده نمایید.

<br>

#### افزایش داده‌های کمیتی کاربر

شما می‌توانید داده‌های کمیتی کاربر را مانند **بازدید از محصول یا صفحه‌ای، خرید آیتم خاصی** و .. را به تعداد دلخواهتان **افزایش** دهید. برای این کار متد زیر را فراخوانی کنید: 

```csharp
chabokPush.IncrementUserAttribute("Age", 2.0);
```

<br>

#### کاهش داده‌های کمیتی کاربر

شما همچنین می‌توانید داده‌های کمیتی کاربر را **کاهش** دهید. برای این کار متد زیر را فراخوانی کنید: 

```csharp
chabokPush.DecrementUserAttribute("Age", 5.0);
```

### مدیریت تگ‌ها
---

یکی از قوانین سگمنت، **تگ** یا همان **برچسب‌گذاری کاربران** می‌باشد. به عنوان مثال می‌توانید کاربران خود را بر اساس **جنسیت** برچسب‌گذاری کرده و به آن‌ها پیام خاصی را ارسال کنید و یا به کاربرانی که از پرداخت درون برنامه‌ای شما استفاده می‌کنند یک `Tag` با عنوان `Premium_User` اختصاص دهید.

#### افزودن تگ

با استفاده از متد `addTag`، شما می‌توانید به کاربر یک یا مجموعه‌ای از `Tag`ها اختصاص دهید:

```csharp
chabokPush.AddTag("Tag Name", null);
```
در مثال زیر به کاربر جاری تگ `Premium_User` اختصاص داده شده است:

```java
chabokPush.AddTag("Premium_User", null);
```
اگر عملیات افزودن تگ با موفقیت انجام شود، می‌توانید از طریق پنل چابک، تگ اضافه شده به کاربر را در بخش مشترکین همانند تصویر زیر مشاهده کنید:

![مشترک چابک](http://uupload.ir/files/jse9_addtag.png)


#### حذف تگ

با استفاده از متد `removeTag`، می‌توانید یک `Tag` خاص از کاربر جاری را حذف کنید:

```csharp
chabokPush.RemoveTag("Tag Name", null);
```
