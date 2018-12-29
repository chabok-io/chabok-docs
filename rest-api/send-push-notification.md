---
id: send-push-notification
title: ارسال‌ پوش‌نوتیفیکیشن
layout: rest-api
permalink: rest-api/send-push-notification.html
prev: send-chabok-message.html
---

علاوه بر ارسال پیام جابک، شما می‌توانید از طریق API **پوش‌نوتیفیکیشن** ارسال کنید. این کار از دو متد پست `notifyUsers` و `notifyUser` انجام می‌شود.

### ارسال پوش‌نوتیفیکیشن به گروهی از کاربران

در این متد (**notifyUsers**) می‌توانید برای **گروهی از کاربران (سگمنت)** یا **همه کاربران** پوش‌نوتیفیکیشنی را از طریق API ارسال کنید. 

#### ساختار درخواست

لینک پایه: `https://sandbox.push.adpdigital.com/api/push/notifyUsers`

نمونه cURL:

```bash
curl -X POST \
"https://sandbox.push.adpdigital.com/api/push/notifyUsers?access_token=<ACCESS_TOKEN>" \
-H "accept: application/json" \
-H "Content-Type: application/json" \
-d "@payload.json"
```
#### پارامترها

<table>
<thead>
<tr>
<th style="text-align: center">پارامترها</th>
<th style="text-align: right">توضیح</th>
<th style="text-align: center">نوع مقدار</th>
<th style="text-align: right">مثال</th>
</tr>
</thead>
<tbody><tr>
<td align="center">target \*</td>
<td align="right">سگمنت مورد نظر یا \* برای کانال عمومی</td>
<td align="center">string</td>
<td align="right">یک سگمنت-id موجود یا فیلترهای سگمنت جدید</td>
</tr>
<tr>
<td align="center">channel</td>
<td align="right">کانال ارسال پیام</td>
<td align="center">string</td>
<td align="right">default</td>
</tr>
<tr>
<td align="center">content \*</td>
<td align="right">متن پیام</td>
<td align="center">string</td>
<td align="right">سلام</td>
</tr>
<tr>
<td align="center">data</td>
<td align="right">دیتای پیام به صورت json</td>
<td align="center">JSON</td>
<td align="left" dir="ltr">{&quot;offer&quot;: &quot;10&quot;, &quot;discountCode&quot;: &quot;Newapp10&quot;}</td>
</tr>
<tr>
<td align="center">trackId</td>
<td align="right">تعیین شناسه ردگیری جداگانه برای رصد پیام</td>
<td align="center">string</td>
<td align="right">adp-1397-6-11</td>
</tr>
<tr>
<td align="center">inApp</td>
<td align="right">کاربران در زمان باز بودن برنامه پیام را دریافت می‌کنند (درون‌برنامه‌ای)</td>
<td align="center">boolean</td>
<td align="right">true</td>
</tr>
<tr>
<td align="center">live</td>
<td align="right">فقط کاربرانی که در لحظه ارسال، برنامه را باز دارند دریافت می‌کنند (زنده)</td>
<td align="center">boolean</td>
<td align="right">false</td>
</tr>
<tr>
<td align="center">useAsAlert</td>
<td align="right">استفاده متن پیام به عنوان متن اعلان</td>
<td align="center">boolean</td>
<td align="right">true</td>
</tr>
<tr>
<td align="center">alertText</td>
<td align="right">استفاده از متن جداگانه برای اعلان</td>
<td align="center">string</td>
<td align="right">سلام خوبی</td>
</tr>
<tr>
<td align="center">ttl</td>
<td align="right">زمان انقضای پیام پس از درخواست (ثانیه)</td>
<td align="center">number</td>
<td align="right">40</td>
</tr>
</tbody></table>

#### پارامترهای اعلان (Notification)

| پارامترها | توضیح| نوع مقدار|مثال  |          
| :-----------------: |-------------:| :-----:|  ---------:|
|     title \*     | عنوان اعلان | string|  ثبت درخواست |
|body| متن اعلان|string| سفارش شما ثبت شد
|icon| تصویر اعلان      |  string | نام تصویر|
| sound|صدای اعلان (به فرمت صدا دقت داشته باشید) |   string | نام صدا   |
|clickUrl| لینک هنگام کلیک|string|لینک
|ledColor|تنظیم رنگ led (فقط اندروید)|string|کد رنگ HEX
|smallIcon| آیکون کوچک اعلان (فقط اندروید)|string|نام آیکون
|(id (action| شناسه اکشن | string| check
|(title (action| عنوان اکشن|string| status
|(options (action| رفتار اکشن (فقط آی‌او‌اس) |number| 1
|(icon (action| نام آیکون در فولدر drawable  (فقط اندروید)| string| نام آیکون
|mediaType|  نوع رسانه| string| jpeg
|mediaUrl| لینک رسانه|string| لینک
|contentAvailable|  برای انجام یک آپدیت بی‌صدا در بک‌گراند یا فورگراند مقدار 1 را بگذارید | boolean|  1 
|mutableContent| برای پشتیبانی از اعلان چندرسانه‌ای مقدار 1 را حتما قرار دهید| boolean| 1
|category| شناسه اعلان برای ذخیره آن|string| delivery


> `نکته :` در پارامترهای اعلان، پارامتر `options` یا همان رفتار اکشن (فقط در آی‌او‌اس) می‌توانید عدد ۱ برای اکشن [Authentication Required (اکشن در صورت قفل نبودن دستگاه اجرا می‌شود)](https://developer.apple.com/documentation/usernotifications/unnotificationactionoptions/unnotificationactionoptionauthenticationrequired?language=objc)،‌ ۲ برای اکشن [Destructive (اکشن تسک مخرب انجام می‌دهد)](https://developer.apple.com/documentation/usernotifications/unnotificationactionoptions/unnotificationactionoptiondestructive?language=objc)، ۴ برای اکشن [Foreground (اکشن موجب باز شدن اپ در فورگراند می‌شود)](https://developer.apple.com/documentation/usernotifications/unnotificationactionoptions/unnotificationactionoptionforeground?language=objc) و جمع این اعداد را برای ترکیب آن‌ها با هم قرار دهید.

#### پاسخ

پاسخ درخواست‌های ارسال پیام به صورت تعداد دستگاه‌هایی که پیام به آن‌ها ارسال می‌شود، می‌باشد.

```javascript
{
  "count": number
}
```
<br><br>

### مثال از متد notifyUsers

#### درخواست

> `نکته :` از پارامتر‌هایی که در این عمل استفاده می‌شوند، `target` و `content` (سگمنت کاربران و محتوای پیام) **الزامی** هستند و بدون آن‌ها درخواست شما صورت نمی‌گیرد. (برای پوش‌نوتیفیکیشن عمومی در قسمت `target` به جای سگمنت، {} را خالی بگذارید.)

بسته به نوع نوتیفیکیشنی که می‌خواهید ارسال کنید می‌توانید از **انواع پارامترها** استفاده کنید. به عنوان مثال می‌خواهید یک نوتیفیکیشنی را برای اعلام انتشار نسخه جدید اپلیکیشن خود به همه کاربران، ارسال کنید. 

```bash
curl -X POST \
"https://sandbox.push.adpdigital.com/api/push/toUsers?access_token=<ACCESS_TOKEN>" \
-H "accept: application/json" \
-H "Content-Type: application/json" \
-d "{ \"target\": \"{}\", \"content\": \"نسخه جدید اپلیکیشن رسید!\"}"
```

> `نکته :` در قسمت سگمنت، فیلترهای پیش‌فرض چابک ‍‍‍‍‍‍‍‍‍‍‍‍‍`installDate` (اولین بازدید یا نصب) ، `launchTime` (آخرین بازدید) ،‌ `launchCount` (تعداد بازدید) ، `clientVersion` (نسخه برنامه) ،‌ `osVersion` (نسخه سیستم‌عامل) ، `deviceType` (نوع دستگاه) ، `tags` (تگ‌ها) ، `nearBy` (موقعیت مکانی) می‌باشند. درصورت اضافه کردن سگمنت از سوی خودتان هم فقط کافی‌‌ست نام آن را وارد نمایید.

#### پاسخ

همانطور که می‌بینید درخواست شما با موفقیت انجام شد و نوتیفیکیشن شما به ۶۴۰ (count: 640) دستگاه ارسال شد.

```javascript
{
  "count": 640
}
```

حالا می‌توانید در **پنل بخش پیام‌ها قسمت پیام‌ها** جزئیات ارسال و تحویل پیام خود را مشاهده کنید.


![عکس مربوطه](http://uupload.ir/files/2g53_apipush1.png)

> `نکته :` برای تست کردن این عمل می‌توانید [به این لینک](https://api.doc.chabokpush.com/#/push/push_notifyUsers) مراجعه کنید.

<br><br>

### ارسال پوش‌نوتیفیکیشن به یک کاربر

در این متد (**notifyUser**) شما می‌توانید پوش‌نوتیفیکیشنی را به **یک کاربر** (userId) ارسال کنید.

#### ساختار درخواست

لینک پایه: `https://sandbox.push.adpdigital.com/api/push/notifyUser`

نمونه cURL:

```bash
curl -X POST \
"https://sandbox.push.adpdigital.com/api/push/notifyUser?access_token=<ACCESS_TOKEN>" \
-H "accept: application/json" \
-H "Content-Type: application/json" \
-d "@payload.json"
```

#### پارامترها

<table>
<thead>
<tr>
<th style="text-align: center">پارامترها</th>
<th style="text-align: right">توضیح</th>
<th style="text-align: center">نوع مقدار</th>
<th style="text-align: right">مثال</th>
</tr>
</thead>
<tbody><tr>
<td align="center">userId \*</td>
<td align="right">شناسه کاربری</td>
<td align="center">string</td>
<td>userTest</td>
</tr>
<tr>
<td align="center">channel</td>
<td align="right">کانال ارسال پیام</td>
<td align="center">string</td>
<td align="right">default</td>
</tr>
<tr>
<td align="center">content \*</td>
<td align="right">متن پیام</td>
<td align="center">string</td>
<td align="right">سلام</td>
</tr>
<tr>
<td align="center">data</td>
<td align="right">دیتای پیام به صورت json</td>
<td align="center">JSON</td>
<td align="left" dir="ltr">{&quot;offer&quot;: &quot;10&quot;, &quot;discountCode&quot;: &quot;Newapp10&quot;}</td>
</tr>
<tr>
<td align="center">trackId</td>
<td align="right">تعیین شناسه ردگیری جداگانه برای رصد پیام</td>
<td align="center">string</td>
<td align="right">adp-1397-6-11</td>
</tr>
<tr>
<td align="center">inApp</td>
<td align="right">کاربران در زمان باز بودن برنامه پیام را دریافت می‌کنند (درون‌برنامه‌ای)</td>
<td align="center">boolean</td>
<td align="right">true</td>
</tr>
<tr>
<td align="center">live</td>
<td align="right">فقط کاربرانی که در لحظه ارسال، برنامه را باز دارند دریافت می‌کنند (زنده)</td>
<td align="center">boolean</td>
<td align="right">false</td>
</tr>
<tr>
<td align="center">useAsAlert</td>
<td align="right">استفاده متن پیام به عنوان متن اعلان</td>
<td align="center">boolean</td>
<td align="right">true</td>
</tr>
<tr>
<td align="center">alertText</td>
<td align="right">استفاده از متن جداگانه برای اعلان</td>
<td align="center">string</td>
<td align="right">سلام خوبی</td>
</tr>
<tr>
<td align="center">ttl</td>
<td align="right">زمان انقضای پیام پس از درخواست (ثانیه)</td>
<td align="center">number</td>
<td align="right">40</td>
</tr>
</tbody></table>


#### پارامترهای اعلان (Notification)

| پارامترها | توضیح| نوع مقدار|مثال  |          
| :-----------------: |-------------:| :-----:|  ---------:|
|    title \*     | عنوان اعلان | string|  ثبت درخواست |
|body| متن اعلان|string| سفارش شما ثبت شد
|icon| تصویر اعلان      |  string | نام تصویر|
| sound|صدای اعلان (به فرمت صدا دقت داشته باشید) |   string | نام صدا   |
|clickUrl| لینک هنگام کلیک|string|لینک
|ledColor|تنظیم رنگ led (فقط اندروید)|string|کد رنگ HEX
|smallIcon| آیکون کوچک اعلان (فقط اندروید)|string|نام آیکون
|(id (action| شناسه اکشن | string| check
|(title (action| عنوان اکشن|string| status
|(options (action| رفتار اکشن (فقط آی‌او‌اس) |number| 1
|(icon (action| نام آیکون در فولدر drawable  (فقط اندروید)| string| نام آیکون
|mediaType|  نوع رسانه| string| jpeg
|mediaUrl| لینک رسانه|string| لینک
|contentAvailable|  برای انجام یک آپدیت بی‌صدا در بک‌گراند یا فورگراند مقدار 1 را بگذارید | boolean|  1 
|mutableContent| برای پشتیبانی از اعلان چندرسانه‌ای مقدار 1 را حتما قرار دهید| boolean| 1
|category| شناسه اعلان برای ذخیره آن|string| delivery


> `نکته :` در پارامترهای اعلان، پارامتر `options` یا همان رفتار اکشن (فقط در آی‌او‌اس) می‌توانید عدد ۱ برای اکشن [Authentication Required (اکشن در صورت قفل نبودن دستگاه اجرا می‌شود)](https://developer.apple.com/documentation/usernotifications/unnotificationactionoptions/unnotificationactionoptionauthenticationrequired?language=objc)،‌ ۲ برای اکشن [Destructive (اکشن تسک مخرب انجام می‌دهد)](https://developer.apple.com/documentation/usernotifications/unnotificationactionoptions/unnotificationactionoptiondestructive?language=objc)، ۴ برای اکشن [Foreground (اکشن موجب باز شدن اپ در فورگراند می‌شود)](https://developer.apple.com/documentation/usernotifications/unnotificationactionoptions/unnotificationactionoptionforeground?language=objc) و جمع این اعداد را برای ترکیب آن‌ها با هم قرار دهید.

#### پاسخ

پاسخ درخواست‌های ارسال پیام به صورت تعداد دستگاه‌هایی که پیام به آن‌ها ارسال می‌شود، می‌باشد.

```javascript
{
  "count": number
}
```
<br><br>

### مثال از متد notifyUser

#### درخواست


> `نکته :` از پارامتر‌هایی که در این عمل استفاده می‌شوند، `userId` و `payload` (شناسه کاربر و پی‌لود نوتیفیکیشن) **الزامی** هستند و بدون آن‌ها درخواست شما صورت نمی‌گیرد.

به عنوان مثال می‌خواهید یک پوش‌نوتیفیکیشن برای اعلام ثبت موفق سفارش به یک کاربر ارسال کنید.


```bash
curl -X POST \
 "https://sandbox.push.adpdigital.com/api/push/notifyUser/989335******" \
 -H "accept: application/json" \
 -H "Content-Type: application/json" \
 -d "{ \"title\": \"ثبت موفق\", \"body\": \"سفارش شما با موفقیت ثبت شد.\"}"
```


#### پاسخ

درخواست شما با موفقیت انجام شد و کمپین شما به ۲ دستگاه  (count : 2) ارسال شد.

```javascript
{
  "count": 2
}
```
پس از ارسال موفقیت آمیز می‌توانید در **پنل بخش پیام‌ها** آمار ارسال و تحویلتان را مشاهده کنید.

![عکس مربوطه](http://uupload.ir/files/fk2s_apipush2.png)


> `نکته :` برای تست کردن این عمل می‌توانید [به این لینک](https://api.doc.chabokpush.com/#/push/push_notifyUser) مراجعه کنید.

<Br>

### نحوه استفاده از سگمنت‌ها در API

هر سگمنت می‌تواند شامل یک یا چند شرط (**rule**) باشد.

#### شرط‌ها

هر شرط شامل ۳ قسمت اصلی می‌باشد:

- `name` نام فیلد

- `operator` نوع عملوند (مانند بزرگتر، مساوی‌ با و غیره)

- `value` مقداری که سنجش می‌شود

#### عملوند‌های مجاز (operators)

- `equal_to`

- `not_equal`

- `lesser_than`

- `lesser_equals`

- `greater_than`

- `greater_equals`

- `include`

- `not_include`

- `before`

- `after`

> `نکته:` عملوند‌های `before` و `after` مخصوص فیلد‌هایی از جنس زمان هستند، و مقداری که در قسمت `value` این نوع شرط‌ها قرار میگیرد به صورت `xh` می‌باشد. نمونه: `'value: '6h`.

#### nameهای مجاز

- `installDate` زمان اولین بازدید

- `launchTime` زمان آخرین بازدید

- `launchCount` تعداد بازدید

- `tags` تگ‌های کاربر

- `deviceType` نوع دستگاه

- `clientVersion` نسخه برنامه

- `osVersion` نسخه سیستم‌عامل

#### نمونه

```bash
"segment": {
  "all": [
    {
       "name": "installDate",
       "operator": "after",
       "value": "6h"
    },
    {
       "name": "launchCount",
       "operator": "greater_than",
       "value": 2
    }
  ]
}
```
مثال بالا کاربرانی را هدف قرار می‌دهد که بعد از ۶ ساعت پیش، برنامه‌ را نصب کرده‌اند و بیش از ۲ بار هم آن را باز نموده‌اند.
