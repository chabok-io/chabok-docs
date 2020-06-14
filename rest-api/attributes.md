---
id: attributes
title: وب سرویس ارسال اطلاعات کاربر از سمت سرور
layout: rest-api
permalink: rest-api/attributes.html
---

شما می‌توانید با فراخوانی این وب‌ سرویس، **اطلاعات و مشخصات کاربر** را به سرور چابک ارسال کنید.

>`نکته:` برای ایجاد دسترسی (Access Token) [راهنمای استفاده](https://doc.chabok.io/rest-api/guide.html#%D8%A7%DB%8C%D8%AC%D8%A7%D8%AF-%D8%AF%D8%B3%D8%AA%D8%B1%D8%B3%DB%8C) را مطالعه کنید.

<Br>

### POST | لینک پایه (Path) 

لینک پایه ارسال رویداد**post** `https://{APP_ID}.push.adpdigital.com/api/installations/attributes`
 است. شما می‌توانید به یکی از دو روش شناسه نصب یا شناسه کاربری، رویداد را به سرور چابک ارسال کنید.


<Br>

#### مثال ارسال اطلاعات کاربر به سرور چابک از طریق شناسه کاربری 

```json
{
  "userId": "USER_ID",
  "attributes": {
    "fistName": "Ali",
    "lastName": "Ahmadi",
    "isVIP": true,
    "score": 2.4,
    "birthday": "2020-02-06T12:12:25.408Z",
    "favoriteCategories": ["comedy", "action"]
  }
}
```

- ``userId`` (اجباری)

برای ذخیره و بروزرسانی اطلاعات کاربر باید شناسه کاربری را به سرور چابک ارسال کنید.

>`نکته`: برای ذخیره اطلاعات کاربر روی یکی از دستگاه‌هایی که کاربر با آن وارد اپلیکیشن شده است، از شیوه ارسال از طریق شناسه نصب استفاده کنید. چابک در شیوه دوم ارسال (از طریق شناسه کاربر)، اطلاعات کاربر را روی تمام دستگاه‌هایش ذخیره می‌کند. 

- ``attributes`` (اجباری)

اطلاعات مربوط به کاربر را مي‌توانید به عنوان مقدار **attributes** ارسال کنید.

>`نکته`: اطلاعات کاربر می‌تواند از نوع **عدد**، **رشته**، **منطقی**، **آرایه‌ای از رشته** و **تاریخ** باشد. 

> `نکته`: مقادیر تاریخ (date) حتما باید با formatهای ISO و یا UTC ارسال شوند.



#### نمونه CURL

نمونه CURL زیر اتریبیوت‌ها با نوع‌های مختلف برای کاربر اعمال می‌کند:

```bash
curl --location --request POST 'https://sandbox.push.adpdigital.com/api/installations/attributes' \
--header 'X-Access-Token: bbb64330870b02fd081f9bb5babb04d5c5d02aac' \
--header 'Content-Type: application/json' \
--data-raw '{
  "userId": "09331952921",
  "attributes": {
    "fistName": "Ali",
    "lastName": "Ahmadi",
    "isVIP": true,
    "score": 2.4,
    "birthday": "2020-02-06T12:12:25.408Z",
    "favoriteCategories": ["comedy", "action"]
  }
}'
```


#### مثال ارسال اطلاعات کاربر به سرور چابک از طریق شناسه نصب در چابک 

```json
{
  "installationId": "INSTALLATION_ID",
  "attributes": {
    "fistName": "Ali",
    "lastName": "Ahmadi",
    "isVIP": true,
    "score": 2.4,
    "birthday": "2020-02-06T12:12:25.408Z",
    "favoriteCategories": ["comedy", "action"]
  }
}
```

-  ``installationId`` (اجباری)

برای ذخیره و بروزرسانی اطلاعات کاربر باید شناسه نصب را به سرور چابک ارسال کنید که می‌توانید شناسه نصب (شناسه دستگاه) را از **SDK چابک** دریافت کنید. 

- ``attributes`` (اجباری)

اطلاعات مربوط به کاربر را مي‌توانید به عنوان مقدار **attributes** ارسال کنید.

>`نکته`: اطلاعات کاربر می‌تواند از نوع **عدد**، **رشته**، **منطقی**، **آرایه‌ای از رشته** و **تاریخ** باشد. 

> `نکته`: مقادیر تاریخ (date) حتما باید با formatهای ISO و یا UTC ارسال شوند.


#### نمونه CURL

نمونه CURL زیر اتریبیوت‌ها با نوع‌های مختلف بر روی دستگاه کاربر اعمال می‌کند:

```bash
curl --location --request POST 'https://sandbox.push.adpdigital.com/api/installations/attributes' \
--header 'X-Access-Token: bbb64330870b02fd081f9bb5babb04d5c5d02aac' \
--header 'Content-Type: application/json' \
--data-raw '{
  "installationId": "INSTALLATION_ID",
  "attributes": {
    "fistName": "Ali",
    "lastName": "Ahmadi",
    "isVIP": true,
    "score": 2.4,
    "birthday": "2020-02-06T12:12:25.408Z",
    "favoriteCategories": ["comedy", "action"]
  }
}'
```
