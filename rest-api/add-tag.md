---
id: add-tag
title: مدیریت تگ
layout: rest-api
permalink: rest-api/add-tag.html
prev: send-push-notification.html
---

یکی از قوانین سگمنت، **تگ** یا همان برچسب‌گذاری کاربران می‌باشد. به عنوان مثال می‌توانید کاربران خود را بر اساس **جنسیت** برچسب‌گذاری کرده و به آن‌ها پیام خاصی را ارسال کنید و یا به کاربرانی که از پرداخت درون برنامه‌ای شما استفاده می‌کنند یک **Tag** با عنوان ‍‍‍`Premium_User‍` اختصاص دهید.

>`نکته:` برای ایجاد دسترسی (Access Token) [راهنمای استفاده](https://doc.chabok.io/rest-api/guide.html#%D8%A7%DB%8C%D8%AC%D8%A7%D8%AF-%D8%AF%D8%B3%D8%AA%D8%B1%D8%B3%DB%8C) را مطالعه کنید.

<br>

## افزودن تگ 

در این قسمت می‌ توانید به کاربران خود یک یا چند تگ اضافه کنید. همچنین می‌توانید از تگ با کلید و مقدار استفاده نمایید.

<br>

### GET | یک تگ به کاربر 

برای افزودن **یک تگ به همه دستگاه‌های کاربر** می‌توانید از `https://sandbox.push.adpdigital.com/api/installations/addTag` استفاده کنید.

> `نکته :` دقت داشته باشید که این عمل با متد `GET` انجام می‌شود.

<br>

#### مثال افزودن یک تگ به کاربر

برای این کار فقط نیاز به `userId` و **نام تگ** دارید. به عنوان مثال، تگ ما قرار است **جنسیت مرد** باشد برای همین نام تگ را **male** می گذاریم. همینطور `userId` کاربر ما هم **starter** است. 

```bash
curl -X GET \
"https://sandbox.push.adpdigital.com/api/installations/addTag/starter/male?access_token=<ACCESS_TOKEN>" \
-H "accept: application/json"
```

درخواست با موفقیت انجام شد و تگ **male** به هر دو (count: 2) دستگاه کاربر با `userId` (شناسه کاربری) **starter** اضافه شد.

حالا می‌توانید در بخش **مشترکین قسمت جزییات کاربر** تگ خود را مشاهده کنید:


![عکس مربوطه](http://uupload.ir/files/jdf5_tag.png)

> `نکته :` برای تست کردن این عمل می‌توانید [به این لینک](https://apidoc.chabok.io/#/installation/installation_addTag) مراجعه فرمایید.

<br>

### POST | چند تگ به کاربر

برای افزودن **چند تگ به همه دستگاه‌های کاربر** می‌توانید از `https://sandbox.push.adpdigital.com/api/installations/addTags` استفاده کنید.

> `نکته :` دقت داشته باشید که این عمل با متد `POST` انجام می‌شود.

<br>

#### مثال افزودن دو یا چند تگ به کاربر

در اینجا هم مانند مثال قبل فقط نیاز به `userId` و **نام تگ‌هایی** که می‌خواهید اضافه کنید، دارید. این بار تگ‌های **کاربر طلایی** و **نوجوان** را به همان کاربر با `userId` (شناسه کاربری) **starter** اضافه می‌کنیم. 

```bash
curl -X POST/
"https://sandbox.push.adpdigital.com/api/installations/addTags?access_token=<ACCESS_TOKEN> \
 -H "accept: application/json" -H "Content-Type: application/json" \
 -d "{ \"userId\": \"starter\", \"tags\": [ \"golden\", \"teenage\" ]}"
```
با توجه به اینکه کاربر همان کاربر **starter** است دوباره پاسخ  دو دستگاه (count: 2) را برای اضافه شدن تگ‌ها مشاهده می‌کنید.

حالا می‌توانید در بخش **مشترکین قسمت جزییات کاربر** تگ خود را مشاهده کنید:

![عکس مربوطه](http://uupload.ir/files/so9x_tag2.png)

> `نکته :` برای تست کردن این عمل می‌توانید [به این لینک](https://apidoc.chabok.io/#/installation/installation_addTags) مراجعه فرمایید.

<br>

### POST | تگ از نوع کلید/مقدار 

برای افزودن یا **ویرایش** **یک تگ از نوع کلید/مقدار به همه دستگاه‌های کاربر** می‌توانید از `https://sandbox.push.adpdigital.com/api/installations/addValueTag` استفاده کنید.

> `نکته :` دقت داشته باشید که این عمل با متد `POST` انجام می‌شود.

<br>

#### مثال افزودن تگ از نوع کلید/مقدار به کاربر

برای این کار فقط نیاز به `userId`، **نام و مقدار تگ** دارید. به عنوان مثال، تگ ما قرار است **شهر** باشد برای همین مقدار تگ را مثلا **tehran** می گذاریم. همینطور `userId` کاربر ما هم **starter** است. 

```bash
curl -X POST "https://sandbox.push.adpdigital.com/api/installations/addValueTag?access_token=<ACCESS_TOKEN" \
 -H "accept: application/json" -H "Content-Type: application/json" \
 -d "{ \"userId\": \"starter\", \"tag\": \"city\", \"value\": \"tehran\"}"
```
با توجه به اینکه کاربر همان کاربر **starter** است دوباره پاسخ  دو دستگاه (count: 2) را برای اضافه شدن تگ‌ها مشاهده می‌کنید.

برای **ویرایش** تگ باید ‍‍`userId` و **نام** را همان وارد کنید و فقط **مقدار (value)** را عوض کنید. 

<br><br>

## حذف تگ

در این قسمت می‌ توانید یک یا چند تگ را از کاربران خود حذف کنید. همچنین می‌توانید تگ با کلید و مقدار را هم حذف کنید.

<br>

### GET | یک تگ از کاربر 

برای حذف **یک تگ از همه دستگاه‌های کاربر** می‌توانید از `https://sandbox.push.adpdigital.com/api/installations/removeTag` استفاده کنید.

> `نکته :` دقت داشته باشید که این عمل با متد `GET` انجام می‌شود.

<br>

#### مثال حذف یک تگ از کاربر

برای این کار فقط نیاز به `userId` و **نام تگ** دارید. به عنوان مثال، می‌خواهیم تگ **male** را از کاربر **starter** حذف کنیم.

```bash
curl -X GET \
"https://sandbox.push.adpdigital.com/api/installations/removeTag/starter/male?access_token=<ACCESS_TOKEN>" \
-H "accept: application/json"
```

> `نکته :` برای تست کردن این عمل می‌توانید [به این لینک](https://apidoc.chabok.io/#/installation/installation_removeTag) مراجعه فرمایید.

<br>

### POST | چند تگ از کاربر 

برای حذف **چند تگ از همه دستگاه‌های کاربر** می‌توانید از `https://sandbox.push.adpdigital.com/api/installations/removeTags` استفاده کنید.

> `نکته :` دقت داشته باشید که این عمل با متد `POST` انجام می‌شود.

<br>

#### مثال حذف دو یا چند تگ از کاربر

در اینجا هم مانند مثال قبل فقط نیاز به `userId` و **نام تگ‌هایی** که می‌خواهید حذف کنید، دارید. این بار تگ‌های **کاربر طلایی** و **نوجوان** را از همان کاربر با `userId` (شناسه کاربری) **starter** حذف می‌کنیم. 

```bash
curl -X POST/
"https://sandbox.push.adpdigital.com/api/installations/removeTags?access_token=<ACCESS_TOKEN> \
 -H "accept: application/json" -H "Content-Type: application/json" \
 -d "{ \"userId\": \"starter\", \"tags\": [ \"golden\", \"teenage\" ]}"
```

> `نکته :` برای تست کردن این عمل می‌توانید [به این لینک](https://apidoc.chabok.io/#/installation/installation_removeTags) مراجعه فرمایید.

<br>

### POST | تگ از نوع کلید/مقدار 

برای حذف یک تگ از نوع کلید/مقدار از همه دستگاه‌های کاربر می‌توانید از `https://sandbox.push.adpdigital.com/api/installations/addValueTag` استفاده کنید.

> `نکته :` دقت داشته باشید که این عمل با متد `POST` انجام می‌شود.

<br>

#### مثال حذف تگ از نوع کلید/مقدار از کاربر

برای این کار فقط نیاز به `userId`، **نام تگ** دارید. به عنوان مثال، تگ ما **شهر** است. همینطور `userId` کاربر ما هم **starter** است. 

```bash
curl -X POST "https://sandbox.push.adpdigital.com/api/installations/removeValueTag?access_token=<ACCESS_TOKEN" \
 -H "accept: application/json" -H "Content-Type: application/json" \
 -d "{ \"userId\": \"starter\", \"tag\": \"city\"}"
```
