---
id: send-push
title: ارسال‌ پوش
layout: rest-api
permalink: rest-api/send-push.html
prev: guide.html
---
 در این صفحه راهنمای استفاده صحیح و آسان برای ارسال پوش از طریق API را با هم بررسی خواهیم کرد. برای این کار دو متد post (پست) **toUsers** و **byQuery** وجود دارد که در ادامه به هر دوی آن‌ها خواهیم پرداخت.


### ارسال پوش از طریق کانال‌های چابک 

در این متد (**toUsers**) می‌توانیم برای یک **یک یا چند کاربر بخصوص** یا **همه کاربران یک کانال** پیامی را از طریق API ارسال کنیم. (پیام خصوصی و عمومی)

#### ساختار درخواست

لینک پایه: `https://sandbox.push.adpdigital.com/api/push/toUsers`

نمونه cURL:

```bash
curl -X POST \
"https://sandbox.push.adpdigital.com/api/push/toUsers?access_token=<ACCESS_TOKEN>" \
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
<td align="center">User</td>
<td align="right">شناسه کاربر ثبت شده یا * برای کانال عمومی</td>
<td align="center">string</td>
<td align="right">userTest</td>
</tr>
<tr>
<td align="center">channel</td>
<td align="right">کانال ارسال پوش</td>
<td align="center">string</td>
<td align="right">default</td>
</tr>
<tr>
<td align="center">content</td>
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
<tr>
<td align="center">fallback</td>
<td align="right">پیامک جایگزین</td>
<td align="center">JSON</td>
<td align="left" dir="ltr">{
                           &quot;content&quot;: &quot;سلام&quot;,
                           &quot;delay&quot;: 5,
                           &quot;media&quot;: &quot;sms&quot;
                           }</td>
</tr>
<tr>
<td align="center">notification</td>
<td align="right">تنظیمات اعلان</td>
<td align="center">payload</td>
<td align="right">مثال در جدول زیر</td>
</tr>
<tr>
<td align="center">silent</td>
<td align="right">پیام بدون اعلان ارسال شود</td>
<td align="center">boolean</td>
<td align="right">false</td>
</tr>
</tbody></table>

#### پارامترهای اعلان (Notification)

| پارامترها | توضیح| نوع مقدار|مثال  |          
| :-----------------: |-------------:| :-----:|  ---------:|
|   title      | عنوان اعلان | string|  ثبت درخواست |
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


> `نکته :` برای ارسال به چند کاربر با متد `toUsers`، باید به ازای هر کاربر payload مورد نظر را ایجاد نموده و یک آرایه از payloadهای ایجاد شده را ارسال نمایید. به نمونه زیر توجه فرمایید:

```bash
[
  {
    "user": "USER_1",
    "content": "sample",
    "channel": "default",
    "notification": {
      "title": "from chabok",
      "body": "Salam 😀"
  },
  {
    "user": "USER_2",
    "content": "sample",
    "channel": "default",
    "notification": {
      "title": "from chabok",
      "body": "Salam 😀"
    }
  }
  },
  {
    "user": "USER_2",
    "content": "sample",
    "channel": "default",
    "notification": {
      "title": "from chabok",
      "body": "Salam 😀"
    }
  }
]
```

#### پاسخ
پاسخ درخواست‌های ارسال پیام به صورت تعداد دستگاه‌هایی که پیام به آن‌ها ارسال می‌شود، می باشد.

```javascript
{
  "count": number
}
```
<br><br>

### مثال از متد toUsers

#### درخواست

> `نکته :` از پارامتر‌هایی که در این عمل استفاده می‌شوند، `user` و `content` (شناسه کاربر و محتوای پیام) **الزامی** هستند و بدون آن‌ها درخواست شما صورت نمی‌گیرد. (برای پیام عمومی در قسمت `user` به جای شناسه کاربر، استریسک(*) را وارد نمایید.)

بسته به نوع پیامی که می‌خواهید ارسال کنید می‌توانید از **انواع پارامترها** استفاده کنید. به عنوان مثال می‌خواهیم یک پیامی برای هشدار یک کاربر با `userId` (شناسه کاربری) **Test** از تاخیر پرواز هواپیمای خود ارسال کنیم. متن پیام هم می‌خواهیم به عنوان متن اعلان به کار برده شود.

```bash
curl -X POST \
"https://sandbox.push.adpdigital.com/api/push/toUsers?access_token=<ACCESS_TOKEN>" \
-H "accept: application/json" \
-H "Content-Type: application/json" \
-d "{ \"user\": \"Test\", \"content\": \"پرواز شما دچار نیم ساعت تاخیر شده است.\", \"useAsAlert\": true}"
```

#### پاسخ

همانطور که می‌بینید درخواست شما با موفقیت انجام شد و پیام هشدار به یک (count: 1) دستگاه کاربر **Test** ارسال شد.

```javascript
{
  "count": 1
}
```

حالا می‌توانید در **پنل بخش پیام‌ها قسمت پیام‌ها** جزئیات ارسال و تحویل پیام خود را مشاهده کنید.


![عکس مربوطه](http://uupload.ir/files/gxlv_byuser.png)

> `نکته :` برای تست کردن این عمل می‌توانید [به این لینک](https://api.doc.chabokpush.com/#/push/push_toUsers) مراجعه فرمایید.

<br><br>

### ارسال پوش از طریق گروه‌بندی کاربران (Segmented Push)

در این متد (**byQuery**) به جای ارسال پیام به صورت خصوصی یا عمومی می‌خواهیم به **گروهی از کاربران** ارسال کنیم. برای آشنایی با **نحوه استفاده از سگمنت در API** لطفا [راهنمای آن را مطالعه نمایید](https://doc.chabokpush.com/rest-api/send-push.html#%D9%86%D8%AD%D9%88%D9%87-%D8%A7%D8%B3%D8%AA%D9%81%D8%A7%D8%AF%D9%87-%D8%A7%D8%B2-%D8%B3%DA%AF%D9%85%D9%86%D8%AA%D9%87%D8%A7-%D8%AF%D8%B1-api).

#### ساختار درخواست

لینک پایه: `https://sandbox.push.adpdigital.com/api/push/byquery`

نمونه cURL:

```bash
curl -X POST \
"https://sandbox.push.adpdigital.com/api/push/byQuery?access_token=<ACCESS_TOKEN>" \
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
<td align="center">target</td>
<td align="right">ویژگی‌های گروه‌بندی</td>
<td align="center">object</td>
<td align="left" dir="ltr">{&quot;target&quot;:{
  &quot;deviceType&quot;: &quot;ios&quot;
}}</td>
</tr>
<tr>
<td align="center">channel</td>
<td align="right">کانال ارسال پوش</td>
<td align="center">string</td>
<td align="right">default</td>
</tr>
<tr>
<td align="center">content</td>
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
<tr>
<td align="center">notification</td>
<td align="right">تنظیمات اعلان</td>
<td align="center">payload</td>
<td align="right">مثال در جدول زیر</td>
</tr>
<tr>
<td align="center">silent</td>
<td align="right">پیام بدون اعلان ارسال شود</td>
<td align="center">boolean</td>
<td align="right">false</td>
</tr>
</tbody></table>


#### پارامترهای اعلان (Notification)

| پارامترها | توضیح| نوع مقدار|مثال  |          
| :-----------------: |-------------:| :-----:|  ---------:|
|   title      | عنوان اعلان | string|  ثبت درخواست |
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
پاسخ درخواست‌های ارسال پیام به صورت تعداد دستگاه‌هایی که پیام به آن‌ها ارسال می‌شود، می باشد.

```javascript
{
  "count": number
}
```
<br><br>

### مثال از متد byQuery

#### درخواست

اکنون می‌خواهیم کمپینی را بسازیم و گروهی از کاربران را براساس ویژگی‌های مورد نظر‌ (**سگمنت**) مخاطب قرار دهیم. به عنوان مثال این کمپین به مناسبت راه‌افتادن اپلیکیشن موبایل در **آی‌ا‌و‌اس** می‌خواهد کد تخفیفی را مخصوص کسانی که اپلیکیشن شما را در موبایل خود دارند، ارسال کند. متن پیام هم می‌خواهیم به عنوان متن اعلان به کار برده شود.

> `نکته :` از پارامتر‌هایی که در این عمل استفاده می‌شوند، `target` و `content` (ویژگی‌های گروه و محتوای پیام) **الزامی** هستند و بدون آن‌ها درخواست شما صورت نمی‌گیرد.

> `نکته :` در قسمت سگمنت، فیلترهای پیش‌فرض چابک ‍‍‍‍‍‍‍‍‍‍‍‍‍`installDate` (اولین بازدید یا نصب) ، `launchTime` (آخرین بازدید) ،‌ `launchCount` (تعداد بازدید) ، `clientVersion` (نسخه برنامه) ،‌ `osVersion` (نسخه سیستم‌عامل) ، `deviceType` (نوع دستگاه) ، `tags` (تگ‌ها) ، `nearBy` (موقعیت مکانی) می‌باشند. درصورت اضافه کردن سگمنت از سوی خودتان هم فقط کافی‌‌ست نام آن را وارد نمایید.


```bash
curl -X POST \
"https://sandbox.push.adpdigital.com/api/push/byQuery?access_token=<ACCESS_TOKEN>" \
-H "accept: application/json" \
-H "Content-Type: application/json" \
-d "{\t\"target\": {\t\t\"deviceType\": \"ios\"\t},\t\"content\": \"سلام به اپلیکیشن ما خوش‌آمدید. برای خرید اولتان از اپلیکیشن می‌توانید از کد تخفیف 10٪ استفاده کنید. کد تخفیف: NewApp10\",\t\"useAsAlert\": true}"
```


#### پاسخ

درخواست شما با موفقیت انجام شد و کمپین شما به ۴۴ دستگاه  (count : 44) ارسال شد.

```javascript
{
  "count": 44
}
```
پس از ارسال موفقیت آمیز می‌توانید در **پنل بخش کمپین‌ها** آمار ارسال و تحویلتان را مشاهده کنید.

![عکس مربوطه](http://uupload.ir/files/5dy_byquery.png)


> `نکته :` برای تست کردن این عمل می‌توانید [به این لینک](https://api.doc.chabokpush.com/#/push/push_byQuery) مراجعه فرمایید.


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

> `نکته:` عملوند‌های `before` و `after` مخصوص فیلد‌هایی از جنس زمان هستند، و مقداری که در قسمت `value` این نوع شرط‌ها قرار میگیرد به صورت `xh` می‌باشد. نمونه: `value: '6h'`.

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
