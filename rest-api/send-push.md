---
id: send-push
title: ارسال‌ پوش
layout: rest-api
permalink: rest-api/send-push.html
prev: add-tag.html

---
 در این صفحه راهنمای استفاده صحیح و آسان برای ارسال پوش از طریق API را با هم بررسی خواهیم کرد. برای این کار دو متد post (پست) **toUsers** و **byQuery** وجود دارد که در ادامه به هر دوی آن‌ها خواهیم پرداخت.


### ارسال پوش از طریق کانال‌های چابک 

در این متد (**toUsers**) می‌توانیم برای یک **کاربر بخصوص** یا **همه کاربران یک کانال** پیامی را از طریق API ارسال کنیم. (پیام خصوصی و عمومی)

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

| پارامترها | توضیح| نوع مقدار|مثال  |          
| -----------------: |-------------:| :-----:|  ---------:|
| User      | شناسه کاربر ثبت شده یا * برای کانال عمومی | string|     userTest    |
| channel    | کانال ارسال پوش      |   string |     Public        |
| content | متن پیام     |    string |     سلام     |
| data | دیتای پیام به صورت جی‌سان| JSON |{"offer": "10", "discountCode": "Newapp10"} 
| trackId | تعیین شناسه ردگیری جداگانه برای رصد پیام | string| adp-1397-6-11
| inApp | کاربران در زمان باز بودن برنامه پیام را دریافت می‌کنند (درون‌برنامه‌ای)| boolean | true 
| live | فقط کاربرانی که در لحظه ارسال، برنامه را باز دارند دریافت می‌کنند (زنده) |boolean| false
|useAsAlert |استفاده متن پیام به عنوان متن اعلان| boolean| true
| alertText |  استفاده از متن جداگانه برای اعلان| string| سلام خوبی
| ttl | زمان انقضای پیام پس از درخواست (ثانیه)|number| 40
| fallback |  کار گذاشتن پیامک جایگزین در صورت ارسال نشدن پیام| JSON|   {"fallback": {"fallbackDelay": "30", "fallbackText": "سلام" }}
| silent | پیام بدون اعلان ارسال شود| boolean| false

#### پارامترهای اعلان (Notification)

| پارامترها | توضیح| نوع مقدار|مثال  |          
| :-----------------: |-------------:| :-----:|  ---------:|
|   title      | عنوان اعلان | string|  ثبت درخواست |
|body| متن اعلان|string| سفارش شما ثبت شد
|icon| تصویر اعلان      |  string | "نام تصویر"|
| sound|صدای اعلان (به فرمت صدا دقت داشته باشید) |   string | "نام صدا"   |
|clickUrl| لینک هنگام کلیک|string|"لینک"
|(id (action| شناسه اکشن | string| check
|(title (action| عنوان اکشن|string| status
|(options (action| رفتار اکشن (فقط برای آی‌او‌اس) |number| 1
|(icon (action| نام آیکون در فولدر drawable  (فقط در اندروید)| string| "نام فایل"
|mediaType|  نوع رسانه| string| jpeg
|mediaUrl| لینک رسانه|string| "لینک"
|contentAvailable|  برای انجام یک آپدیت بی‌صدا در بک‌گراند یا فورگراند مقدار 1 را بگذارید | boolean|  1 
|mutableContent| برای پشتیبانی از اعلان چندرسانه‌ای مقدار 1 را حتما قرار دهید| boolean| 1
|category| شناسه اعلان برای ذخیره آن|string| delivery


#### پاسخ
پاسخ درخواست‌های ارسال پیام به صورت تعداد دستگاه‌هایی که پیام به آن‌ها ارسال می‌شود، می باشد.

```javascript
{
  "count": number
}
```
<br><br>

### مثال از متد byUsers

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

در این متد (**byQuery**) به جای ارسال پیام به صورت خصوصی یا عمومی می‌خواهیم به **گروهی از کاربران** ارسال کنیم.

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

| پارامترها | توضیح| نوع مقدار|مثال  |          
| -----------------: |-------------:| :-----:|  ---------:|
|target | گروه‌بندی مخاطبان (سگمنت)| array of strings| {"deviceType": {"inq": ["android", "ios"]}}
| channel    | کانال ارسال پوش      |   string |     Public        |
| content | متن پیام     |    string |     سلام     |
| data | دیتای پیام به صورت جی‌سان| JSON |{"offer": "10", "discountCode": "Newapp10"} 
| trackId | تعیین شناسه ردگیری جداگانه برای رصد پیام | string| adp-1397-6-11
| inApp | کاربران در زمان باز بودن برنامه پیام را دریافت می‌کنند (درون‌برنامه‌ای)| boolean | true 
| live | فقط کاربرانی که در لحظه ارسال، برنامه را باز دارند دریافت می‌کنند (زنده) |boolean| false
|useAsAlert |استفاده متن پیام به عنوان متن اعلان| boolean| true
| alertText |  استفاده از متن جداگانه برای اعلان| string| سلام خوبی
| ttl | زمان انقضای پیام پس از درخواست (ثانیه)|number| 40
| fallback |  کار گذاشتن پیامک جایگزین در صورت ارسال نشدن پیام| JSON|   {"fallback": {"fallbackDelay": "30", "fallbackText": "سلام" }}
| silent | پیام بدون اعلان ارسال شود| boolean| false

#### پارامترهای اعلان (Notification)

| پارامترها | توضیح| نوع مقدار|مثال  |          
| :-----------------: |-------------:| :-----:|  ---------:|
|   title      | عنوان اعلان | string|  ثبت درخواست |
|body| متن اعلان|string| سفارش شما ثبت شد
|icon| تصویر اعلان      |  string | "نام تصویر"|
| sound|صدای اعلان (به فرمت صدا دقت داشته باشید) |   string | "نام صدا"   |
|clickUrl| لینک هنگام کلیک|string|"لینک"
|(id (action| شناسه اکشن | string| check
|(title (action| عنوان اکشن|string| status
|(options (action| رفتار اکشن (فقط برای آی‌او‌اس) |number| 1
|(icon (action| نام آیکون در فولدر drawable  (فقط در اندروید)| string| "نام فایل"
|mediaType|  نوع رسانه| string| jpeg
|mediaUrl| لینک رسانه|string| "لینک"
|contentAvailable|  برای انجام یک آپدیت بی‌صدا در بک‌گراند یا فورگراند مقدار 1 را بگذارید | boolean|  1 
|mutableContent| برای پشتیبانی از اعلان چندرسانه‌ای مقدار 1 را حتما قرار دهید| boolean| 1
|category| شناسه اعلان برای ذخیره آن|string| delivery


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
-d "{\t\"target\": {\t\t\"deviceType\": {"ios\"]}\t},\t\"content\": \"سلام به اپلیکیشن ما خوش‌آمدید. برای خرید اولتان از اپلیکیشن می‌توانید از کد تخفیف 10٪ استفاده کنید. کد تخفیف: NewApp10 \",\t\"useAsAlert\": true}"
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



