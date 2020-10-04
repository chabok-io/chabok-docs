---
id: bulk-send-event
title: وب سرویس ارسال رویداد Bulk
layout: rest-api
permalink: rest-api/bulk-send-event.html
---

شما می‌توانید با فرخوانی این وب‌ سرویس، **رویداد‌هایی که در اپلیکیشن‌تان اتفاق می‌افتد** را به سرور چابک ارسال کنید.

<Br>

>`نکته:` برای ایجاد دسترسی (Access Token) [راهنمای استفاده](https://doc.chabok.io/rest-api/guide.html#%D8%A7%DB%8C%D8%AC%D8%A7%D8%AF-%D8%AF%D8%B3%D8%AA%D8%B1%D8%B3%DB%8C) را مطالعه کنید.

<Br>

### ارسال رویداد به صورت Bulk
---

#### POST | لینک پایه (Path) 

لینک پایه ارسال رویداد**post** `https://{APP_ID}.push.adpdigital.com/api/installations/trackBulk`
است. شما می‌توانید به یکی از دو روش شناسه کاربری یا نصب، آرایه‌ای از رویدادها را برای چابک ارسال کنید.

> `نکته:` توجه داشته باشید، حداکثر طول آرایه در این درخواست ۱۰۰۰ می‌باشد.

<Br>

##### مثال ارسال رویداد به سرور چابک از طریق شناسه کاربری


```javascript
[{
  "userId": "USER_ID",
  "eventName": "EVENT_NAME1",
  "eventTime": 1575965125110,
  "eventData": {}
},
{
  "userId": "USER_ID",
  "eventName": "EVENT_NAME2",
  "eventTime": 1575965328110,
  "eventData": {}
}, ...]
```

- `userId` (اجباری)

شناسه کاربری که رویداد را انجام داده است.

>`نکته`:توجه داشته باشید شناسه کاربر، شامل اطلاعات دستگاه‌هایی که کاربر با آن‌ها وارد اپلیکیشن شده نمی‌شود؛
         شما برای ذخیره رویداد از سمت کاربر و دستگاهی که رویداد با آن در اپلیکیشن انجام شده، رویداد را  به شیوه شناسه نصب ارسال کنید. درصورت ارسال رویداد بر اساس شناسه کاربری، چابک نمی‌تواند تشخیص دهد که رویداد از چه دستگاهی ارسال شده است، در نتیجه چابک به طور خودکار آخرین دستگاهی که کاربر با آن وارد اپلیکیشن شده را به عنوان دستگاهی که رویداد در آن انجام شده ذخیره می‌کند.


-  `eventName` (اجباری)

نام رویدادی که می‌خواهید ثبت کنید را به عنوان مقدار **eventName** ارسال کنید.

- `eventTime` (اختیاری)

زمان وقوع رویداد را به عنوان مقدار **eventTime** ارسال کنید.

>`نکته:`در صورت ارسال نکردن زمان رویداد، چابک زمان دریافت رویداد را به عنوان زمان وقوع رویداد برای شما ذخیره می‌کند.

- `eventData` (اختیاری)

اطلاعات مربوط به ایونت را می‌توانید به عنوان مقدار **eventData** ارسال
کنید.

نمونه‌ای از typeهای متفاوت در `eventData`:

```javascript
[{
	... ,
	
    "eventData" : {
        "orderDate": "2020-02-06T12:12:25.408Z",
        "isNew": true,
        "avgOrder": 2.4,
        "categories": ["comedy", "action"]
    }
}]
```

> `نکته`: مقادیر تاریخ (date) حتما باید با formatهای ISO و یا UTC ارسال
> شوند.


##### نمونه CURL

نمونه CURL زیر رویدادهای `addToCart` و `purchase` را برای کاربر `09331952921` ارسال می‌کند:

```bash
curl --location --request POST 'https://sandbox.push.adpdigital.com/api/installations/trackBulk' \
--header 'X-Access-Token: bbb64330870b02fd081f9bb5babb04d5c5d02aac' \
--header 'Content-Type: application/json' \
--data-raw '[{
  "userId": "09331952921",
  "eventName": "addToCart",
  "eventData": {
      "productId": 12345,
      "productName": "milk"
  }
},{
  "userId": "09331952921",
  "eventName": "purchase",
  "eventData": {
      "productId": 7890,
      "productName": "fish"
  }
}]'
```

##### پاسخ درست
در صورت درست بودن درخواست وب‌سرویس، پاسخ زیر را دریافت خواهید کرد، که در اینجا n به معنی تعداد ایونت‌هایی هست که بدرستی در صف قرار گرفته است.
```json
{
    "queued": true,
    "n": 2
}
```

<Br>

##### مثال ارسال رویداد به سرور چابک از طریق شناسه نصب در چابک


```javascript
[{
  "installationId": "INSTALLATION_ID",
  "eventName": "EVENT_NAME1",
  "eventTime": 1575965125110,
  "eventData": {}
},
{
  "installationId": "INSTALLATION_ID",
  "eventName": "EVENT_NAME2",
  "eventTime": 1575965328110,
  "eventData": {}
}, ...]
```

-  `installationId` (اجباری)

این شناسه نصب توسط چابک گزارش می‌شود. برای ارسال رویداد انجام شده توسط یک کاربر باید شناسه نصب آن را به سرور چابک ارسال کنید که می‌توانید شناسه نصب (شناسه دستگاه) را در زمان ارسال رویداد از **SDK چابک** دریافت کنید.

- `eventName` (اجباری)

نام رویدادی که می‌خواهید برای کاربر ثبت کنید را به عنوان مقدار **eventName** ارسال کنید.

- `eventTime` (اختیاری)

زمان وقوع رویداد را به عنوان مقدار **eventTime** ارسال کنید.

>`نکته:`در صورت ارسال نکردن زمان رویداد، چابک زمان دریافت رویداد را به عنوان زمان وقوع رویداد برای شما ذخیره می‌کند.

- `eventData` (اختیاری)

اطلاعات و داده مربوط به ایونت را می‌توانید به عنوان مقدار **eventData** ارسال کنید.

نمونه‌ای از typeهای متفاوت در `eventData`:

```javascript
[{
	... ,
    "eventData" : {
        "orderDate": "2020-02-06T12:12:25.408Z",
        "isNew": true,
        "avgOrder": 2.4,
        "categories": ["comedy", "action"]
    }
}]
```

> `نکته`: مقادیر تاریخ (date) حتما باید با formatهای ISO و یا UTC ارسال
> شوند.

##### نمونه CURL

نمونه CURL زیر رویداد `addToCart` را برای دستگاه `123456789` ارسال می‌کند:

```bash
curl --location --request POST 'https://sandbox.push.adpdigital.com/api/installations/trackBulk' \
--header 'X-Access-Token: bbb64330870b02fd081f9bb5babb04d5c5d02aac' \
--header 'Content-Type: application/json' \
--data-raw '[{
  "installationId": "123456789",
  "eventName": "addToCart",
  "eventData": {
      "productId": 12345,
      "productName": "milk"
  }
},{
  "installationId": "876543",
  "eventName": "purchase",
  "eventData": {
      "productId": 7890,
      "productName": "fish"
  }
}]'
```
##### پاسخ درست
در صورت درست بودن درخواست وب‌سرویس، پاسخ زیر را دریافت خواهید کرد، که در اینجا n به معنی تعداد ایونت‌هایی هست که بدرستی در صف قرار گرفته است.
```json
{
    "queued": true,
    "n": 2
}
```
