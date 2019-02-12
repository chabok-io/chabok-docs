---
id: add-tag
title: افزودن تگ
layout: rest-api
permalink: rest-api/add-tag.html
prev: send-push-notification.html
---

یکی از قوانین سگمنت، **تگ** یا همان برچسب‌گذاری کاربران می‌باشد. به عنوان مثال می‌توانید کاربران خود را بر اساس **جنسیت** برچسب‌گذاری کرده و به آن‌ها پیام خاصی را ارسال کنید و یا به کاربرانی که از پرداخت درون برنامه‌ای شما استفاده می‌کنند یک **Tag** با عنوان ‍‍‍`Premium_User‍` اختصاص دهید.


### یک تگ به تمام دستگاه‌های یک کاربر

در این نمونه می‌خواهیم **یک تگ** را به تمام دستگاه‌های یک کاربر از طریق API اضافه کنیم.


> `نکته :` دقت داشته باشید که این عمل با متد `GET` انجام می‌شود.


#### درخواست

برای این کار فقط نیاز به `userId` و **نام تگ** دارید. به عنوان مثال، تگ ما قرار است **جنسیت مرد** باشد برای همین نام تگ را **male** می گذاریم. همینطور `userId` کاربر ما هم **starter** است. 
```bash
curl -X GET \
"https://sandbox.push.adpdigital.com/api/installations/addTag/starter/male?access_token=<ACCESS_TOKEN>" \
-H "accept: application/json"
```

#### پاسخ

درخواست با موفقیت انجام شد و تگ **male** به هر دو (count: 2) دستگاه کاربر با `userId` (شناسه کاربری) **starter** اضافه شد.


```javascript
{
  "count": 2
}
```
حالا می‌توانید در بخش **مشترکین قسمت جزییات کاربر** تگ خود را مشاهده کنید.


![عکس مربوطه](http://uupload.ir/files/jdf5_tag.png)

> `نکته :` برای تست کردن این عمل می‌توانید [به این لینک](https://api.doc.chabokpush.com/#/installation/installation_addTag) مراجعه فرمایید.

<br>

### چند تگ به تمام دستگاه‌های یک کاربر

در این قسمت به جای **یک تگ** می‌خواهیم **دو یا چند تگ** را به همه دستگاه یک کاربر اضافه کنیم.


> `نکته :` دقت داشته باشید که این عمل با متد `POST` انجام می‌شود.


#### درخواست

در اینجا هم مانند مثال قبل فقط نیاز به `userId` و **نام تگ‌هایی** که می‌خواهید اضافه کنید، دارید. این بار تگ‌های **کاربر طلایی** و **نوجوان** را به همان کاربر با `userId` (شناسه کاربری) **starter** اضافه می‌کنیم. 

```bash
curl -X POST/
"https://sandbox.push.adpdigital.com/api/installations/addTags?access_token=<ACCESS_TOKEN> \
 -H "accept: application/json" -H "Content-Type: application/json" \
 -d "{ \"userId\": \"starter\", \"tags\": [ \"golden\", \"teenage\" ]}"
```

#### پاسخ

با توجه به اینکه کاربر همان کاربر **starter** است دوباره پاسخ  دو دستگاه (count: 2) را برای اضافه شدن تگ‌ها مشاهده می‌کنید.


```javascript
{
  "count": 2
}
```
حالا می‌توانید در بخش **مشترکین قسمت جزییات کاربر** تگ خود را مشاهده کنید.

![عکس مربوطه](http://uupload.ir/files/so9x_tag2.png)

> `نکته :` برای تست کردن این عمل می‌توانید [به این لینک](https://api.doc.chabokpush.com/#/installation/installation_addTags) مراجعه فرمایید.
