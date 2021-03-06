---
id: send-event
title: وب سرویس ارسال رویداد از سمت سرور
layout: rest-api
permalink: rest-api/send-event.html
---

شما می‌توانید با فرخوانی این وب‌ سرویس، **دیتای رویداد‌هایی که در اپلیکیشن شما اتفاق می‌افتد** را به سرور چابک ارسال کنید.

<Br>

>`نکته:` برای ایجاد دسترسی (Access Token) [راهنمای استفاده](https://doc.chabok.io/rest-api/guide.html#%D8%A7%DB%8C%D8%AC%D8%A7%D8%AF-%D8%AF%D8%B3%D8%AA%D8%B1%D8%B3%DB%8C) را مطالعه کنید.

<Br>

### ارسال رویداد (Track) 
---

#### POST | لینک پایه (Path) 

لینک پایه ارسال رویداد**post** `https://{APP_ID}.push.adpdigital.com/api/installations/track`
است. شما می‌توانید به یکی از دو روش شناسه نصب یا شناسه کاربری، رویداد را به سرور چابک ارسال کنید.


<Br>


##### مثال ارسال رویداد به سرور چابک از طریق شناسه کاربری


```javascript
{
  "userId": "USER_ID",
  "eventName": "EVENT_NAME",
  "eventTime": 1575965125110,
  "eventData": {}
}
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
{
    "eventData" : {
        "orderDate": "2020-02-06T12:12:25.408Z",
        "isNew": true,
        "avgOrder": 2.4,
        "categories": ["comedy", "action"]
    }
}
```

> `نکته`: مقادیر تاریخ (date) حتما باید با formatهای ISO و یا UTC ارسال
> شوند.


##### نمونه CURL

نمونه CURL زیر رویداد `addToCart` را برای کاربر `09331952921` ارسال می‌کند:

```bash
curl --location --request POST 'https://sandbox.push.adpdigital.com/api/installations/track' \
--header 'X-Access-Token: bbb64330870b02fd081f9bb5babb04d5c5d02aac' \
--header 'Content-Type: application/json' \
--data-raw '{
  "userId": "09331952921",
  "eventName": "addToCart",
  "eventData": {
  	"productId": 12345,
  	"productName": "milk"
  }
}'
```

<Br>

##### مثال ارسال رویداد به سرور چابک از طریق شناسه نصب در چابک


```javascript
{
  "installationId": "INSTALLATION_ID",
  "eventName": "EVENT_NAME",
  "eventTime": 1575965125110,
  "eventData": {}
}
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
{
    "eventData" : {
        "orderDate": "2020-02-06T12:12:25.408Z",
        "isNew": true,
        "avgOrder": 2.4,
        "categories": ["comedy", "action"]
    }
}
```

> `نکته`: مقادیر تاریخ (date) حتما باید با formatهای ISO و یا UTC ارسال
> شوند.

##### نمونه CURL

نمونه CURL زیر رویداد `addToCart` را برای دستگاه `123456789` ارسال می‌کند:

```bash
curl --location --request POST 'https://sandbox.push.adpdigital.com/api/installations/track' \
--header 'X-Access-Token: bbb64330870b02fd081f9bb5babb04d5c5d02aac' \
--header 'Content-Type: application/json' \
--data-raw '{
  "installationId": "123456789",
  "eventName": "addToCart",
  "eventData": {
  	"productId": 12345,
  	"productName": "milk"
  }
}'
```

### ارسال رویداد درآمد (Tracking Purchase)
---


#### POST | لینک پایه (Path) 

لینک پایه ارسال رویداد**post**
`https://{APP_ID}.push.adpdigital.com/api/installations/trackPurchase`
است. شما می‌توانید به یکی از دو روش شناسه نصب یا شناسه کاربری، رویداد را
به سرور چابک ارسال کنید.


<Br>
  

##### مثال ارسال رویداد درآمد به سرور چابک از طریق شناسه کاربری

```javascript
{
  "userId": "USER_ID",
  "eventName": "EVENT_NAME",
  "eventTime": 1575965125110,
  "revenue": 25000,
  "currency": "RIAL",
  "eventData": {}
}
```

- `userId` (اجباری)

شناسه کاربری که رویداد را انجام داده است.

>`نکته`:توجه داشته باشید شناسه کاربر، شامل اطلاعات دستگاه‌هایی که کاربر با آن‌ها وارد اپلیکیشن شده نمی‌شود؛
         شما برای ذخیره رویداد از سمت کاربر و دستگاهی که رویداد با آن در اپلیکیشن انجام شده، رویداد را  به شیوه شناسه نصب ارسال کنید. درصورت ارسال رویداد بر اساس شناسه کاربری، چابک نمی‌تواند تشخیص دهد که رویداد از چه دستگاهی ارسال شده است، در نتیجه چابک به طور خودکار آخرین دستگاهی که کاربر با آن وارد اپلیکیشن شده را به عنوان دستگاهی که رویداد در آن انجام شده ذخیره می‌کند.


-  `eventName` (اجباری)

نام رویدادی که می‌خواهید ثبت کنید را به عنوان مقدار **eventName** ارسال کنید.

- `revenue` (اجباری)

مبلغ خرید کاربر را به عنوان مقدار **revenue** ارسال کنید.

- `currency` (اختیاری)

واحد پولی که کاربر خرید را انجام داده است را به عنوان مقدار **currency**
ارسال کنید.

- `eventTime` (اختیاری)

زمان وقوع رویداد را به عنوان مقدار **eventTime** ارسال کنید.

>`نکته:`در صورت ارسال نکردن زمان رویداد، چابک زمان دریافت رویداد را به عنوان زمان وقوع رویداد برای شما ذخیره می‌کند.

- `eventData` (اختیاری)

اطلاعات مربوط به ایونت را می‌توانید به عنوان مقدار **eventData** ارسال کنید.


نمونه‌ای از typeهای متفاوت در `eventData`:

```javascript
{
    "eventData" : {
        "orderDate": "2020-02-06T12:12:25.408Z",
        "isNew": true,
        "avgOrder": 2.4,
        "categories": ["comedy", "action"]
    }
}
```

> `نکته`: مقادیر تاریخ (date) حتما باید با formatهای ISO و یا UTC ارسال
> شوند.


##### نمونه CURL


نمونه CURL زیر رویداد درآمد `purchase` را برای کاربر `09331952921` ارسال می‌کند:

```bash
curl --location --request POST 'https://sandbox.push.adpdigital.com/api/installations/trackPurchase' \
--header 'X-Access-Token: bbb64330870b02fd081f9bb5babb04d5c5d02aac' \
--header 'Content-Type: application/json' \
--data-raw '{
  "userId": "09331952921",
  "eventName": "purchase",
  "revenue": 200000,
  "currency": "rial",
  "eventData": {
  	"productId": 12345,
  	"productName": "milk"
  }
}'
```


##### مثال ارسال رویداد درآمد به سرور چابک از طریق شناسه نصب در چابک

```javascript
{
  "installationId": "INSTALLATION_ID",
  "eventName": "EVENT_NAME",
  "eventTime": 1575965125110,
  "revenue": 25000,
  "currency": "RIAL",
  "eventData": {}
}
```

-  `installationId` (اجباری)

این شناسه نصب توسط چابک گزارش می‌شود. برای ارسال رویداد انجام شده توسط یک کاربر باید شناسه نصب آن را به سرور چابک ارسال کنید که می‌توانید شناسه نصب (شناسه دستگاه) را در زمان ارسال رویداد از **SDK چابک** دریافت کنید.

- `eventName` (اجباری)

نام رویدادی که می‌خواهید برای کاربر ثبت کنید را به عنوان مقدار **eventName** ارسال کنید.

- `revenue` (اجباری)

مبلغ خرید کاربر را به عنوان مقدار **revenue** ارسال کنید.

- `currency` (اختیاری)

واحد پولی که کاربر خرید را انجام داده است را به عنوان مقدار **currency**
ارسال کنید.

- `eventTime` (اختیاری)

زمان وقوع رویداد را به عنوان مقدار **eventTime** ارسال کنید.

>`نکته:`در صورت ارسال نکردن زمان رویداد، چابک زمان دریافت رویداد را به عنوان زمان وقوع رویداد برای شما ذخیره می‌کند.

- `eventData` (اختیاری)

اطلاعات و داده مربوط به ایونت را می‌توانید به عنوان مقدار **eventData** ارسال کنید.


نمونه‌ای از typeهای متفاوت در `eventData`:

```javascript
{
    "eventData" : {
        "orderDate": "2020-02-06T12:12:25.408Z",
        "isNew": true,
        "avgOrder": 2.4,
        "categories": ["comedy", "action"]
    }
}
```

> `نکته`: مقادیر تاریخ (date) حتما باید با formatهای ISO و یا UTC ارسال
> شوند.


##### نمونه CURL

نمونه CURL زیر رویداد درآمد `addToCart` را برای دستگاه `123456789` ارسال می‌کند:

```bash
curl --location --request POST 'https://sandbox.push.adpdigital.com/api/installations/trackPurchase' \
--header 'X-Access-Token: bbb64330870b02fd081f9bb5babb04d5c5d02aac' \
--header 'Content-Type: application/json' \
--data-raw '{
  "installationId": "123456789",
  "eventName": "purchase",
  "revenue": 200000,
  "currency": "rial",
  "eventData": {
  	"productId": 12345,
  	"productName": "milk"
  }
}'
```


### ارسال رویداد درآمد (Tracking Revenue)
---


#### POST | لینک پایه (Path) 

لینک پایه ارسال رویداد**post**
`https://{APP_ID}.push.adpdigital.com/api/installations/trackRevenue`
است. شما می‌توانید به یکی از دو روش شناسه نصب یا شناسه کاربری، رویداد درآمد با نام `Purchase` را
به سرور چابک ارسال کنید.


<Br>
  

##### مثال ارسال رویداد درآمد به سرور چابک از طریق شناسه کاربری

```javascript
{
  "userId": "USER_ID",
  "eventTime": 1575965125110,
  "revenue": 25000,
  "currency": "RIAL",
  "eventData": {}
}
```

- `userId` (اجباری)

شناسه کاربری که رویداد را انجام داده است.

>`نکته`:توجه داشته باشید شناسه کاربر، شامل اطلاعات دستگاه‌هایی که کاربر با آن‌ها وارد اپلیکیشن شده نمی‌شود؛
         شما برای ذخیره رویداد از سمت کاربر و دستگاهی که رویداد با آن در اپلیکیشن انجام شده، رویداد را  به شیوه شناسه نصب ارسال کنید. درصورت ارسال رویداد بر اساس شناسه کاربری، چابک نمی‌تواند تشخیص دهد که رویداد از چه دستگاهی ارسال شده است، در نتیجه چابک به طور خودکار آخرین دستگاهی که کاربر با آن وارد اپلیکیشن شده را به عنوان دستگاهی که رویداد در آن انجام شده ذخیره می‌کند.


- `revenue` (اجباری)

مبلغ خرید کاربر را به عنوان مقدار **revenue** ارسال کنید.

- `currency` (اختیاری)

واحد پولی که کاربر خرید را انجام داده است را به عنوان مقدار **currency**
ارسال کنید.

- `eventTime` (اختیاری)

زمان وقوع رویداد را به عنوان مقدار **eventTime** ارسال کنید.

>`نکته:`در صورت ارسال نکردن زمان رویداد، چابک زمان دریافت رویداد را به عنوان زمان وقوع رویداد برای شما ذخیره می‌کند.

- `eventData` (اختیاری)

اطلاعات مربوط به ایونت را می‌توانید به عنوان مقدار **eventData** ارسال کنید.


نمونه‌ای از typeهای متفاوت در `eventData`:

```javascript
{
    "eventData" : {
        "orderDate": "2020-02-06T12:12:25.408Z",
        "isNew": true,
        "avgOrder": 2.4,
        "categories": ["comedy", "action"]
    }
}
```

> `نکته`: مقادیر تاریخ (date) حتما باید با formatهای ISO و یا UTC ارسال
> شوند.


##### نمونه CURL


نمونه CURL زیر رویداد درآمد `purchase` را برای کاربر `09331952921` ارسال می‌کند:

```bash
curl --location --request POST 'https://sandbox.push.adpdigital.com/api/installations/trackRevenue' \
--header 'X-Access-Token: bbb64330870b02fd081f9bb5babb04d5c5d02aac' \
--header 'Content-Type: application/json' \
--data-raw '{
  "userId": "09331952921",
  "revenue": 200000,
  "currency": "rial",
  "eventData": {
  	"productId": 12345,
  	"productName": "milk"
  }
}'
```


##### مثال ارسال رویداد درآمد به سرور چابک از طریق شناسه نصب در چابک

```javascript
{
  "installationId": "INSTALLATION_ID",
  "eventTime": 1575965125110,
  "revenue": 25000,
  "currency": "RIAL",
  "eventData": {}
}
```

-  `installationId` (اجباری)

این شناسه نصب توسط چابک گزارش می‌شود. برای ارسال رویداد انجام شده توسط یک کاربر باید شناسه نصب آن را به سرور چابک ارسال کنید که می‌توانید شناسه نصب (شناسه دستگاه) را در زمان ارسال رویداد از **SDK چابک** دریافت کنید.

- `revenue` (اجباری)

مبلغ خرید کاربر را به عنوان مقدار **revenue** ارسال کنید.

- `currency` (اختیاری)

واحد پولی که کاربر خرید را انجام داده است را به عنوان مقدار **currency**
ارسال کنید.

- `eventTime` (اختیاری)

زمان وقوع رویداد را به عنوان مقدار **eventTime** ارسال کنید.

>`نکته:`در صورت ارسال نکردن زمان رویداد، چابک زمان دریافت رویداد را به عنوان زمان وقوع رویداد برای شما ذخیره می‌کند.

- `eventData` (اختیاری)

اطلاعات و داده مربوط به ایونت را می‌توانید به عنوان مقدار **eventData** ارسال کنید.


نمونه‌ای از typeهای متفاوت در `eventData`:

```javascript
{
    "eventData" : {
        "orderDate": "2020-02-06T12:12:25.408Z",
        "isNew": true,
        "avgOrder": 2.4,
        "categories": ["comedy", "action"]
    }
}
```

> `نکته`: مقادیر تاریخ (date) حتما باید با formatهای ISO و یا UTC ارسال
> شوند.


##### نمونه CURL

نمونه CURL زیر رویداد درآمد `addToCart` را برای دستگاه `123456789` ارسال می‌کند:

```bash
curl --location --request POST 'https://sandbox.push.adpdigital.com/api/installations/trackPurchase' \
--header 'X-Access-Token: bbb64330870b02fd081f9bb5babb04d5c5d02aac' \
--header 'Content-Type: application/json' \
--data-raw '{
  "installationId": "123456789",
  "revenue": 200000,
  "currency": "rial",
  "eventData": {
  	"productId": 12345,
  	"productName": "milk"
  }
}'
```
