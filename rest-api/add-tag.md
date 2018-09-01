---
id: add-tag
title: افزودن تگ
layout: rest-api
permalink: rest-api/add-tag.html
prev: guide.html
next: send-push.html
---



### افزودن تگ به تمام دستگاه‌های یک کاربر

در این نمونه می‌خواهیم **یک** تگ را به تمام دستگاه‌های یک کاربر از طریق API اضافه کنیم.


> `نکته :` دقت داشته باشید که این عمل با متد `GET` انجام می‌شود.


#### درخواست

برای این کار فقط نیاز به `userId` و **نام تگی** است که می‌خواهید اضافه کنید، دارید. به عنوان مثال، تگ ما قرار است که جنسیت مرد باشد، برای همین نام تگ را **male** می گذاریم. همینطور `userId` کاربر ما هم **starter** می باشد. 
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


### افزودن چند تگ به تمام دستگاه‌های یک کاربر

در این قسمت به جای یک **تگ** می‌خواهیم **دو یا چند تگ** را به همه دستگاه یک کاربر اضافه کنیم.


> `نکته :` دقت داشته باشید که این عمل با متد `POST` انجام می‌شود.


#### درخواست

در اینجا هم مانند مثال قبل فقط به `userId` و **نام‌های تگی** که می‌خواهید اضافه کنید، دارید. این بار تگ‌های **کاربر طلایی** و **نوجوان** را به همان کاربر با `userId` (شناسه کاربری) **starter** اضافه می‌کنیم. 

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

