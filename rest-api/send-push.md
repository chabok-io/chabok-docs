---
id: send-push
title: ارسال‌ پوش
layout: rest-api
permalink: rest-api/send-push.html
prev: guide.html
next: add-tag.html
---

در ایجاد تعامل با کاربر چابک علاوه بر پنل وب، API‌ هم در اختیار شما قرار می‌دهد. در این صفحه راهنمای استفاده صحیح و آسان برای ارسال پیام و نوتیفیکیشن از طریق API را با هم بررسی خواهیم کرد.

<Br>

>`نکته:` توجه داشته باشید که **پیام چابک** به طور پیش‌فرض شامل **نوتیفیکیشن** هم می‌شود. برای اطلاعات بیشتر درباره تفاوت **پیام چابک** و **نوتیفیکیشن** [این قسمت](/panel/send.html#سیاست-ارسال) را مطالعه کنید.

<Br>

### ارسال شخصی
--- 

این قسمت مخصوص ارسال تراکنشی یا تعامل یک به یک با کاربر است. پیام شخصی به شما امکان می‌دهد به یک یا چند شناسه کاربری (`userId`) پوش بفرستید:

#### POST | ارسال شخصی پیام چابک 

برای ارسال شخصی پیام چابک می‌توانید از لینک `https://sandbox.push.adpdigital.com/api/push/toUsers` استفاده کنید. 

نمونه زیر یک cURL معتبر است:

```bash
curl -X POST \
"https://sandbox.push.adpdigital.com/api/push/toUsers?access_token=<ACCESS_TOKEN>" \
-H "accept: application/json" \
-H "Content-Type: application/json" \
-d "@payload.json"
```
<details style="text-align: right"><summary>جدول پارامترها</summary>
<p>
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
<td align="center">User <font color="red">*</font>
</td>
<td align="right">شناسه کاربر ثبت شده یا * برای کانال عمومی</td>
<td align="center">string</td>
<td align="right">userTest</td>
</tr>
<tr>
<td align="center">channel</td>
<td align="right">کانال ارسال پیام</td>
<td align="center">string</td>
<td align="right">default</td>
</tr>
<tr>
<td align="center">content <font color="red">*</font>
</td>
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
<td align="center">autoNotify</td>
<td align="right">نمایش پیام توسط گوگل صورت می‌گیرد</td>
<td align="center">boolean</td>
<td align="right">false</td>
</tr>
<tr>
<td align="center">live</td>
<td align="right">فقط کاربرانی که در لحظه ارسال، برنامه را باز دارند دریافت می‌کنند (زنده)</td>
<td align="center">boolean</td>
<td align="right">false</td>
</tr>
<tr>
<td align="center">useAsAlert</td>
<td align="right">استفاده متن پیام به عنوان متن نوتیفیکیشن</td>
<td align="center">boolean</td>
<td align="right">true</td>
</tr>
<tr>
<td align="center">alertText</td>
<td align="right">استفاده از متن جداگانه برای نوتیفیکیشن</td>
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
<td align="center">clientId</td>
<td align="right">شناسه‌ای که کلاینت برای رصد پیام تعیین می‌کند</td>
<td align="center">string</td>
<td align="right">gybpq0458</td>
</tr>
<tr>
<td align="center">notification</td>
<td align="right">تنظیمات نوتیفیکیشن</td>
<td align="center">payload</td>
<td align="right">مثال در جدول زیر</td>
</tr>
<tr>
<td align="center">silent</td>
<td align="right">پیام بدون نوتیفیکیشن ارسال شود</td>
<td align="center">boolean</td>
<td align="right">false</td>
</tr>
</tbody></table>
</p>

<div markdown="1">

> `نکته :` نماد <font color="red">*</font> در جدول پارامترها به معنی **الزامی** بودن پارامتر است و بدون آن‌ درخواست شما صورت نمی‌گیرد. 
<br>

> `نکته:` نام کانال به صورت پیش‌فرض به عنوان کانال عمومی (`public`) در نظر گرفته می‌شود و اگر شما می‌خواهید به کاربر روی کانال شخصی پوش ارسال کنید باید قبل از نام کانال عبارت `/private` را اضافه نمایید. دقت کنید که کاربر یا کاربرانی که می‌خواهید برایشان پوش ارسال کنید روی کانالی که می‌فرستید حتما **عضو** باشند.

</div>
</details>

<br>

<details style="text-align: right"><summary> جدول پارامترهای نوتیفیکیشن</summary>
<p>
<table class="table table-striped table-bordered">
<thead>
<tr>
<th style="text-align: center;">پارامترها</th>
<th style="text-align: right;">توضیح</th>
<th style="text-align: center;">نوع مقدار</th>
<th style="text-align: right;">مثال</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align: center;">title <font color="red">*</font></td>
<td style="text-align: right;">عنوان نوتیفیکیشن</td>
<td style="text-align: center;">string</td>
<td style="text-align: right;">ثبت درخواست</td>
</tr>
<tr>
<td style="text-align: center;">body</td>
<td style="text-align: right;">متن نوتیفیکیشن</td>
<td style="text-align: center;">string</td>
<td style="text-align: right;">سفارش شما ثبت شد</td>
</tr>
<tr>
<td style="text-align: center;">groupId</td>
<td style="text-align: right;">برای گروه&zwnj;بندی شخصی نوتیفیکیشن&zwnj;ها</td>
<td style="text-align: center;">string</td>
<td style="text-align: right;">news</td>
</tr>
<tr>
<td style="text-align: center;">icon</td>
<td style="text-align: right;">تصویر نوتیفیکیشن</td>
<td style="text-align: center;">string</td>
<td style="text-align: right;">نام تصویر</td>
</tr>
<tr>
<td style="text-align: center;">sound</td>
<td style="text-align: right;">صدای نوتیفیکیشن (به فرمت صدا دقت داشته باشید)</td>
<td style="text-align: center;">string</td>
<td style="text-align: right;">نام صدا</td>
</tr>
<tr>
<td style="text-align: center;">clickUrl</td>
<td style="text-align: right;">لینک هنگام کلیک</td>
<td style="text-align: center;">string</td>
<td style="text-align: right;">لینک</td>
</tr>
<tr>
<td style="text-align: center;">ledColor</td>
<td style="text-align: right;">تنظیم رنگ led (فقط اندروید)</td>
<td style="text-align: center;">string</td>
<td style="text-align: right;">کد رنگ HEX</td>
</tr>
<tr>
<td style="text-align: center;">smallIcon</td>
<td style="text-align: right;">آیکون کوچک نوتیفیکیشن (فقط اندروید)</td>
<td style="text-align: center;">string</td>
<td style="text-align: right;">نام آیکون</td>
</tr>
<tr>
<td style="text-align: center;">actions</td>
<td style="text-align: right;">دکمه (اکشن)</td>
<td style="text-align: center;">array</td>
<td style="text-align: right;">آرایه‌ای از جدول زیر</td>
</tr>
<tr>
<td style="text-align: center;">mediaType</td>
<td style="text-align: right;">نوع رسانه</td>
<td style="text-align: center;">string</td>
<td style="text-align: right;">jpeg</td>
</tr>
<tr>
<td style="text-align: center;">mediaUrl</td>
<td style="text-align: right;">لینک رسانه</td>
<td style="text-align: center;">string</td>
<td style="text-align: right;">لینک</td>
</tr>
<tr>
<td style="text-align: center;">contentAvailable</td>
<td style="text-align: right;">برای انجام یک آپدیت بی&zwnj;صدا در بک&zwnj;گراند یا فورگراند مقدار 1 را بگذارید</td>
<td style="text-align: center;">boolean</td>
<td style="text-align: right;">1</td>
</tr>
<tr>
<td style="text-align: center;">mutableContent</td>
<td style="text-align: right;">برای پشتیبانی از نوتیفیکیشن چندرسانه&zwnj;ای مقدار 1 را حتما قرار دهید</td>
<td style="text-align: center;">boolean</td>
<td style="text-align: right;">1</td>
</tr>
<tr>
<td style="text-align: center;">category</td>
<td style="text-align: right;">شناسه نوتیفیکیشن برای ذخیره آن</td>
<td style="text-align: center;">string</td>
<td style="text-align: right;">delivery</td>
</tr>
</tbody>
</table>

<br>
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
<td style="text-align: center;">(id (action</td>
<td style="text-align: right;">شناسه اکشن</td>
<td style="text-align: center;">string</td>
<td style="text-align: right;">forecast_action</td>
</tr>
<tr>
<td style="text-align: center;">(title (action</td>
<td style="text-align: right;">عنوان اکشن</td>
<td style="text-align: center;">string</td>
<td style="text-align: right;">پیش‌بینی کن</td>
</tr>
<tr>
<td style="text-align: center;">(options (action</td>
<td style="text-align: right;">رفتار اکشن (فقط آی&zwnj;او&zwnj;اس)</td>
<td style="text-align: center;">number</td>
<td style="text-align: right;">1</td>
</tr>
<tr>
<td style="text-align: center;">(icon (action</td>
<td style="text-align: right;">نام آیکون در فولدر drawable (فقط اندروید)</td>
<td style="text-align: center;">string</td>
<td style="text-align: right;">نام آیکون</td>
</tr>
<tr>
<td style="text-align: center;">(url (action</td>
<td style="text-align: right;">لینک مقصد یا دیپ لینک</td>
<td style="text-align: center;">string</td>
<td style="text-align: right;">starter:/detail?id=123</td>
</tr>
</tbody>
</table>
</p>

<div markdown="1">

> `نکته :` نماد <font color="red">*</font> در جدول پارامترها به معنی **الزامی** بودن پارامتر است و بدون آن‌ درخواست شما صورت نمی‌گیرد. 
<br>

> `نکته :` در پارامترهای نوتیفیکیشن، پارامتر `options` یا همان رفتار اکشن (فقط در آی‌او‌اس) می‌توانید عدد ۱ برای اکشن [Authentication Required (اکشن در صورت قفل نبودن دستگاه اجرا می‌شود)](https://developer.apple.com/documentation/usernotifications/unnotificationactionoptions/unnotificationactionoptionauthenticationrequired?language=objc)،‌ ۲ برای اکشن [Destructive (اکشن تسک مخرب انجام می‌دهد)](https://developer.apple.com/documentation/usernotifications/unnotificationactionoptions/unnotificationactionoptiondestructive?language=objc)، ۴ برای اکشن [Foreground (اکشن موجب باز شدن اپ در فورگراند می‌شود)](https://developer.apple.com/documentation/usernotifications/unnotificationactionoptions/unnotificationactionoptionforeground?language=objc) و جمع این اعداد را برای ترکیب آن‌ها با هم قرار دهید.

</div>

</details>

##### مثال ارسال شخصی پیام چابک به یک کاربر

نمونه زیر یک cURL معتبر از ارسال پیام چابک به یک کاربر (با شناسه کاربری Test) است:

```bash
curl -X POST \
"https://sandbox.push.adpdigital.com/api/push/toUsers?access_token=<ACCESS_TOKEN>" \
-H "accept: application/json" \
-H "Content-Type: application/json" \
-d "{ \"user\": \"Test\", \"content\": \"پرواز شما دچار نیم ساعت تاخیر شده است.\", \"useAsAlert\": true}"
```

##### مثال ارسال شخصی پیام چابک به چند کاربر با یک محتوا

برای ارسال پیام چابک به به چند شناسه کاربری می‌توانید از روش زیر استفاده کنید:

پی‌لود:

```bash
{
  "users": ["USER_1", "USER_2", "USER_3", "USER_4"],
  "content": "سفارش شما با موفقیت ثبت شد",
  "channel": "default",
  "notification": {
   "title": "چابک",
   "body": "سفارش ثبت شد"
  }
}
```
برای ارسال با پی‌لود بالا cURL زیر را در ترمینال اجرا کنید:

```bash
curl -X POST "https://sandbox.push.adpdigital.com/api/push/toUsers?access_token=<ACCESS_TOKEN>" -H "accept: application/json" -H "Content-Type: application/json" \
-d "{ \"users\": [\"USER_1\", \"USER_2\", \"USER_3\", \"USER_4\"], \"content\": \"سفارش شما با موفقیت ثبت شد\", \"channel\": \"default\", \"notification\": { \"title\": \"چابک\", \"body\": \"سفارش ثبت شد\" } }"
```

##### مثال ارسال شخصی پیام چابک به چند کاربر با محتواهای متفاوت

برای ارسال پیام چابک به به چند شناسه کاربری با محتواهای متفاوت می‌توانید از روش زیر استفاده کنید:

پی‌لود:

```bash
[
  {
    "user": "USER_1",
    "content": "سفارش شما با موفقیت ثبت شد",
    "channel": "default",
    "notification": {
      "title": "چابک",
      "body": "سفارش ثبت شد"
    }
  },
  {
    "user": "USER_2",
    "content": "سفارش شما با موفقیت ثبت شد",
    "channel": "default",
    "notification": {
      "title": "چابک",
      "body": "سفارش ثبت شد"
    }
  },
  {
    "user": "USER_2",
    "content": "سفارش شما با موفقیت ثبت شد",
    "channel": "default",
    "notification": {
      "title": "چابک",
      "body": "سفارش ثبت شد"
    }
  }
]
```
برای ارسال با پی‌لود بالا cURL زیر را در ترمینال اجرا کنید:

```bash
curl -X POST "https://sandbox.push.adpdigital.com/api/push/toUsers?access_token=<ACCESS_TOKEN>" -H "accept: application/json" -H "Content-Type: application/json" \
-d [ "{ \"user\": \"USER_1\", \"content\": \"سفارش شما با موفقیت ثبت شد\", \"channel\": \"default\", \"notification\": { \"title\": \"چابک\", \"body\": \"سفارش ثبت شد\" } }, { \"user\": \"USER_2\", \"content\": \"سفارش شما با موفقیت ثبت شد\", \"channel\": \"default\", \"notification\": { \"title\": \"چابک\", \"body\": \"سفارش ثبت شد\" } }, { \"user\": \"USER_2\", \"content\": \"سفارش شما با موفقیت ثبت شد\", \"channel\": \"default\", \"notification\": { \"title\": \"چابک\", \"body\": \"سفارش ثبت شد\" } }" ]
```
<br>

#### POST | ارسال شخصی نوتیفیکیشن 

برای ارسال شخصی نوتیفیکیش می‌توانید از لینک `https://sandbox.push.adpdigital.com/api/push/notifyUsers` استفاده کنید. 

نمونه زیر یک cURL معتبر است:

```bash
curl -X POST \
"https://sandbox.push.adpdigital.com/api/push/notifyUsers?access_token=<ACCESS_TOKEN>" \
-H "accept: application/json" \
-H "Content-Type: application/json" \
-d "@payload.json"
```
>` نکته:` متد ارسال نوتیفیکیشن پی‌لودهای ارسال پیام چابک را پشتیبانی می‌کند، بنابراین می‌توانید از مثال‌های آن استفاده کنید و فقط کافیست متد را از `toUsers` به `notifyUsers` تغییر دهید.

<br><br><br>

### ارسال گروهی 

این قسمت مخصوص ارسال گروهی یا اجرای کمپین است. پیام گروهی به شما امکان می‌دهد به یک سگمنتی (سگمنت‌ آی‌دی یا فیلترهای سگمنت) پوش بفرستید: 

برای مشاهده نحوه استفاده از [سگمنت](/rest-api/send-push.html#نحوه-استفاده-از-سگمنتها-در-api) اینجا را مطالعه کنید.

#### POST | ارسال گروهی پیام چابک 

برای ارسال شخصی پیام چابک می‌توانید از لینک `https://sandbox.push.adpdigital.com/api/push/byQuery` استفاده کنید. 

نمونه زیر یک cURL معتبر است:

```bash
curl -X POST \
"https://sandbox.push.adpdigital.com/api/push/byQuery?access_token=<ACCESS_TOKEN>" \
-H "accept: application/json" \
-H "Content-Type: application/json" \
-d "@payload.json"
```
<details style="text-align: right"><summary>جدول پارامترها</summary>
<p>
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
<td align="center">target <font color="red">*</font>
</td>
<td align="right">ویژگی‌های گروه‌بندی</td>
<td align="center">object</td>
<td align="left" dir="ltr">{&quot;target&quot;:{
  &quot;deviceType&quot;: &quot;ios&quot;
}}</td>
</tr>
<tr>
<td align="center">channel</td>
<td align="right">کانال ارسال پیام</td>
<td align="center">string</td>
<td align="right">default</td>
</tr>
<tr>
<td align="center">content <font color="red">*</font>
</td>
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
<td align="center">autoNotify</td>
<td align="right">نمایش پیام توسط گوگل صورت می‌گیرد</td>
<td align="center">boolean</td>
<td align="right">false</td>
</tr>
<tr>
<td align="center">useAsAlert</td>
<td align="right">استفاده متن پیام به عنوان متن نوتیفیکیشن</td>
<td align="center">boolean</td>
<td align="right">true</td>
</tr>
<tr>
<td align="center">alertText</td>
<td align="right">استفاده از متن جداگانه برای نوتیفیکیشن</td>
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
<td align="right">تنظیمات نوتیفیکیشن</td>
<td align="center">payload</td>
<td align="right">مثال در جدول زیر</td>
</tr>
<tr>
<td align="center">silent</td>
<td align="right">پیام بدون نوتیفیکیشن ارسال شود</td>
<td align="center">boolean</td>
<td align="right">false</td>
</tr>
</tbody></table>
</p>

<div markdown="1">

> `نکته :` نماد <font color="red">*</font> در جدول پارامترها به معنی **الزامی** بودن پارامتر است و بدون آن‌ درخواست شما صورت نمی‌گیرد. 
<br>

> `نکته:` نام کانال به صورت پیش‌فرض به عنوان کانال عمومی (`public`) در نظر گرفته می‌شود و اگر شما می‌خواهید به کاربر روی کانال شخصی پوش ارسال کنید باید قبل از نام کانال عبارت `/private` را اضافه نمایید. دقت کنید که کاربر یا کاربرانی که می‌خواهید برایشان پوش ارسال کنید روی کانالی که می‌فرستید حتما **عضو** باشند.

</div>
</details>

<br>


<details style="text-align: right"><summary> جدول پارامترهای نوتیفیکیشن</summary>
<p>
<table class="table table-striped table-bordered">
<thead>
<tr>
<th style="text-align: center;">پارامترها</th>
<th style="text-align: right;">توضیح</th>
<th style="text-align: center;">نوع مقدار</th>
<th style="text-align: right;">مثال</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align: center;">title <font color="red">*</font></td>
<td style="text-align: right;">عنوان نوتیفیکیشن</td>
<td style="text-align: center;">string</td>
<td style="text-align: right;">ثبت درخواست</td>
</tr>
<tr>
<td style="text-align: center;">body</td>
<td style="text-align: right;">متن نوتیفیکیشن</td>
<td style="text-align: center;">string</td>
<td style="text-align: right;">سفارش شما ثبت شد</td>
</tr>
<tr>
<td style="text-align: center;">groupId</td>
<td style="text-align: right;">برای گروه&zwnj;بندی شخصی نوتیفیکیشن&zwnj;ها</td>
<td style="text-align: center;">string</td>
<td style="text-align: right;">news</td>
</tr>
<tr>
<td style="text-align: center;">icon</td>
<td style="text-align: right;">تصویر نوتیفیکیشن</td>
<td style="text-align: center;">string</td>
<td style="text-align: right;">نام تصویر</td>
</tr>
<tr>
<td style="text-align: center;">sound</td>
<td style="text-align: right;">صدای نوتیفیکیشن (به فرمت صدا دقت داشته باشید)</td>
<td style="text-align: center;">string</td>
<td style="text-align: right;">نام صدا</td>
</tr>
<tr>
<td style="text-align: center;">clickUrl</td>
<td style="text-align: right;">لینک هنگام کلیک</td>
<td style="text-align: center;">string</td>
<td style="text-align: right;">لینک</td>
</tr>
<tr>
<td style="text-align: center;">ledColor</td>
<td style="text-align: right;">تنظیم رنگ led (فقط اندروید)</td>
<td style="text-align: center;">string</td>
<td style="text-align: right;">کد رنگ HEX</td>
</tr>
<tr>
<td style="text-align: center;">smallIcon</td>
<td style="text-align: right;">آیکون کوچک نوتیفیکیشن (فقط اندروید)</td>
<td style="text-align: center;">string</td>
<td style="text-align: right;">نام آیکون</td>
</tr>
<tr>
<td style="text-align: center;">actions</td>
<td style="text-align: right;">دکمه (اکشن)</td>
<td style="text-align: center;">array</td>
<td style="text-align: right;">آرایه‌ای از جدول زیر</td>
</tr>
<tr>
<td style="text-align: center;">mediaType</td>
<td style="text-align: right;">نوع رسانه</td>
<td style="text-align: center;">string</td>
<td style="text-align: right;">jpeg</td>
</tr>
<tr>
<td style="text-align: center;">mediaUrl</td>
<td style="text-align: right;">لینک رسانه</td>
<td style="text-align: center;">string</td>
<td style="text-align: right;">لینک</td>
</tr>
<tr>
<td style="text-align: center;">contentAvailable</td>
<td style="text-align: right;">برای انجام یک آپدیت بی&zwnj;صدا در بک&zwnj;گراند یا فورگراند مقدار 1 را بگذارید</td>
<td style="text-align: center;">boolean</td>
<td style="text-align: right;">1</td>
</tr>
<tr>
<td style="text-align: center;">mutableContent</td>
<td style="text-align: right;">برای پشتیبانی از نوتیفیکیشن چندرسانه&zwnj;ای مقدار 1 را حتما قرار دهید</td>
<td style="text-align: center;">boolean</td>
<td style="text-align: right;">1</td>
</tr>
<tr>
<td style="text-align: center;">category</td>
<td style="text-align: right;">شناسه نوتیفیکیشن برای ذخیره آن</td>
<td style="text-align: center;">string</td>
<td style="text-align: right;">delivery</td>
</tr>
</tbody>
</table>

<br>
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
<td style="text-align: center;">(id (action</td>
<td style="text-align: right;">شناسه اکشن</td>
<td style="text-align: center;">string</td>
<td style="text-align: right;">forecast_action</td>
</tr>
<tr>
<td style="text-align: center;">(title (action</td>
<td style="text-align: right;">عنوان اکشن</td>
<td style="text-align: center;">string</td>
<td style="text-align: right;">پیش‌بینی کن</td>
</tr>
<tr>
<td style="text-align: center;">(options (action</td>
<td style="text-align: right;">رفتار اکشن (فقط آی&zwnj;او&zwnj;اس)</td>
<td style="text-align: center;">number</td>
<td style="text-align: right;">1</td>
</tr>
<tr>
<td style="text-align: center;">(icon (action</td>
<td style="text-align: right;">نام آیکون در فولدر drawable (فقط اندروید)</td>
<td style="text-align: center;">string</td>
<td style="text-align: right;">نام آیکون</td>
</tr>
<tr>
<td style="text-align: center;">(url (action</td>
<td style="text-align: right;">لینک مقصد یا دیپ لینک</td>
<td style="text-align: center;">string</td>
<td style="text-align: right;">starter:/detail?id=123</td>
</tr>
</tbody>
</table>
</p>

<div markdown="1">


> `نکته :` نماد <font color="red">*</font> در جدول پارامترها به معنی **الزامی** بودن پارامتر است و بدون آن‌ درخواست شما صورت نمی‌گیرد. 
<br>

> `نکته :` در پارامترهای نوتیفیکیشن، پارامتر `options` یا همان رفتار اکشن (فقط در آی‌او‌اس) می‌توانید عدد ۱ برای اکشن [Authentication Required (اکشن در صورت قفل نبودن دستگاه اجرا می‌شود)](https://developer.apple.com/documentation/usernotifications/unnotificationactionoptions/unnotificationactionoptionauthenticationrequired?language=objc)،‌ ۲ برای اکشن [Destructive (اکشن تسک مخرب انجام می‌دهد)](https://developer.apple.com/documentation/usernotifications/unnotificationactionoptions/unnotificationactionoptiondestructive?language=objc)، ۴ برای اکشن [Foreground (اکشن موجب باز شدن اپ در فورگراند می‌شود)](https://developer.apple.com/documentation/usernotifications/unnotificationactionoptions/unnotificationactionoptionforeground?language=objc) و جمع این اعداد را برای ترکیب آن‌ها با هم قرار دهید.

</div>

</details>

##### مثال ارسال گروهی پیام چابک 

نمونه زیر یک cURL معتبر از ارسال پیام چابک گروهی است. گروه مخاطب این پیام، خانم‌هایی هستند که بیش از یک بار خرید داشته‌اند و از موبایل (دستگاه‌های اندروید و آی‌اواس) استفاده می‌کنند.

```bash
curl -X POST \
"https://sandbox.push.adpdigital.com/api/push/byQuery?access_token=<ACCESS_TOKEN>" \
-H "accept: application/json" \
-H "Content-Type: application/json" \
-d "{\"segment\": { \"all\": [ { \"name\": \"deviceType\", \"operator\": \"include\", \"value\": [ \"android\", \"ios\" ] }, { \"name\": \"tags\", \"operator\": \"include\", \"value\": [ \"FEMALE\" ] }, { \"name\": \"purchase.count\", \"operator\": \"greater_than\", \"value\": 1 } ] },\"content\": \"خریدهای عیدتان را از همین الان شروع کنید!\",\"useAsAlert\": \"true\"}"
```
<br>

#### POST | ارسال گروهی نوتیفیکیشن 

برای ارسال گروهی نوتیفیکیش می‌توانید از لینک `https://sandbox.push.adpdigital.com/api/push/notifyUsers` استفاده کنید. 

نمونه زیر یک cURL معتبر است:

```bash
curl -X POST \
"https://sandbox.push.adpdigital.com/api/push/notifyUsers?access_token=<ACCESS_TOKEN>" \
-H "accept: application/json" \
-H "Content-Type: application/json" \
-d "@payload.json"
```
>` نکته:` متد ارسال نوتیفیکیشن پی‌لودهای ارسال پیام چابک را پشتیبانی می‌کند، بنابراین می‌توانید از مثال‌های آن استفاده کنید و فقط کافیست متد را از `byQuery` به `notifyUsers` تغییر دهید.

<br><br><br>

<!--
### ارسال عمومی
---

این قسمت مخصوص انتشار پیام برای همه کاربران است. پیام عمومی به شما امکان می‌دهد تمام کاربران یک [کانال](/android/chabok-messaging.html#کانال) پوش بفرستید:

#### ارسال عمومی پیام چابک 

برای ارسال عمومی پیام چابک می‌توانید از لینک `https://sandbox.push.adpdigital.com/api/push/toUsers` استفاده کنید. 

نمونه زیر یک cURL معتبر است:

```bash
curl -X POST \
"https://sandbox.push.adpdigital.com/api/push/toUsers?access_token=<ACCESS_TOKEN>" \
-H "accept: application/json" \
-H "Content-Type: application/json" \
-d "@payload.json"
```
<details style="text-align: right"><summary>جدول پارامترها</summary>
<p>
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
<td align="center">User <font color="red">*</font>
</td>
<td align="right">شناسه کاربر ثبت شده یا * برای کانال عمومی</td>
<td align="center">string</td>
<td align="right">userTest</td>
</tr>
<tr>
<td align="center">channel</td>
<td align="right">کانال ارسال پیام</td>
<td align="center">string</td>
<td align="right">default</td>
</tr>
<tr>
<td align="center">content <font color="red">*</font>
</td>
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
<td align="center">autoNotify</td>
<td align="right">نمایش پیام توسط گوگل صورت می‌گیرد</td>
<td align="center">boolean</td>
<td align="right">false</td>
</tr>
<tr>
<td align="center">live</td>
<td align="right">فقط کاربرانی که در لحظه ارسال، برنامه را باز دارند دریافت می‌کنند (زنده)</td>
<td align="center">boolean</td>
<td align="right">false</td>
</tr>
<tr>
<td align="center">useAsAlert</td>
<td align="right">استفاده متن پیام به عنوان متن نوتیفیکیشن</td>
<td align="center">boolean</td>
<td align="right">true</td>
</tr>
<tr>
<td align="center">alertText</td>
<td align="right">استفاده از متن جداگانه برای نوتیفیکیشن</td>
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
<td align="center">clientId</td>
<td align="right">شناسه‌ای که کلاینت برای رصد پیام تعیین می‌کند</td>
<td align="center">string</td>
<td align="right">gybpq0458</td>
</tr>
<tr>
<td align="center">notification</td>
<td align="right">تنظیمات نوتیفیکیشن</td>
<td align="center">payload</td>
<td align="right">مثال در جدول زیر</td>
</tr>
<tr>
<td align="center">silent</td>
<td align="right">پیام بدون نوتیفیکیشن ارسال شود</td>
<td align="center">boolean</td>
<td align="right">false</td>
</tr>
</tbody></table>
</p>

<div markdown="1">

> `نکته :` نماد <font color="red">*</font> در جدول پارامترها به معنی **الزامی** بودن پارامتر است و بدون آن‌ درخواست شما صورت نمی‌گیرد. 
<br>

> `نکته:` نام کانال به صورت پیش‌فرض به عنوان کانال عمومی (`public`) در نظر گرفته می‌شود و اگر شما می‌خواهید به کاربر روی کانال شخصی پوش ارسال کنید باید قبل از نام کانال عبارت `/private` را اضافه نمایید. دقت کنید که کاربر یا کاربرانی که می‌خواهید برایشان پوش ارسال کنید روی کانالی که می‌فرستید حتما **عضو** باشند.

</div>
</details>

<br>

<details style="text-align: right"><summary> جدول پارامترهای نوتیفیکیشن</summary>
<p>
<table class="table table-striped table-bordered">
<thead>
<tr>
<th style="text-align: center;">پارامترها</th>
<th style="text-align: right;">توضیح</th>
<th style="text-align: center;">نوع مقدار</th>
<th style="text-align: right;">مثال</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align: center;">title <font color="red">*</font></td>
<td style="text-align: right;">عنوان نوتیفیکیشن</td>
<td style="text-align: center;">string</td>
<td style="text-align: right;">ثبت درخواست</td>
</tr>
<tr>
<td style="text-align: center;">body</td>
<td style="text-align: right;">متن نوتیفیکیشن</td>
<td style="text-align: center;">string</td>
<td style="text-align: right;">سفارش شما ثبت شد</td>
</tr>
<tr>
<td style="text-align: center;">groupId</td>
<td style="text-align: right;">برای گروه&zwnj;بندی شخصی نوتیفیکیشن&zwnj;ها</td>
<td style="text-align: center;">string</td>
<td style="text-align: right;">news</td>
</tr>
<tr>
<td style="text-align: center;">icon</td>
<td style="text-align: right;">تصویر نوتیفیکیشن</td>
<td style="text-align: center;">string</td>
<td style="text-align: right;">نام تصویر</td>
</tr>
<tr>
<td style="text-align: center;">sound</td>
<td style="text-align: right;">صدای نوتیفیکیشن (به فرمت صدا دقت داشته باشید)</td>
<td style="text-align: center;">string</td>
<td style="text-align: right;">نام صدا</td>
</tr>
<tr>
<td style="text-align: center;">clickUrl</td>
<td style="text-align: right;">لینک هنگام کلیک</td>
<td style="text-align: center;">string</td>
<td style="text-align: right;">لینک</td>
</tr>
<tr>
<td style="text-align: center;">ledColor</td>
<td style="text-align: right;">تنظیم رنگ led (فقط اندروید)</td>
<td style="text-align: center;">string</td>
<td style="text-align: right;">کد رنگ HEX</td>
</tr>
<tr>
<td style="text-align: center;">smallIcon</td>
<td style="text-align: right;">آیکون کوچک نوتیفیکیشن (فقط اندروید)</td>
<td style="text-align: center;">string</td>
<td style="text-align: right;">نام آیکون</td>
</tr>
<tr>
<td style="text-align: center;">actions</td>
<td style="text-align: right;">دکمه (اکشن)</td>
<td style="text-align: center;">array</td>
<td style="text-align: right;">آرایه‌ای از جدول زیر</td>
</tr>
<tr>
<td style="text-align: center;">mediaType</td>
<td style="text-align: right;">نوع رسانه</td>
<td style="text-align: center;">string</td>
<td style="text-align: right;">jpeg</td>
</tr>
<tr>
<td style="text-align: center;">mediaUrl</td>
<td style="text-align: right;">لینک رسانه</td>
<td style="text-align: center;">string</td>
<td style="text-align: right;">لینک</td>
</tr>
<tr>
<td style="text-align: center;">contentAvailable</td>
<td style="text-align: right;">برای انجام یک آپدیت بی&zwnj;صدا در بک&zwnj;گراند یا فورگراند مقدار 1 را بگذارید</td>
<td style="text-align: center;">boolean</td>
<td style="text-align: right;">1</td>
</tr>
<tr>
<td style="text-align: center;">mutableContent</td>
<td style="text-align: right;">برای پشتیبانی از نوتیفیکیشن چندرسانه&zwnj;ای مقدار 1 را حتما قرار دهید</td>
<td style="text-align: center;">boolean</td>
<td style="text-align: right;">1</td>
</tr>
<tr>
<td style="text-align: center;">category</td>
<td style="text-align: right;">شناسه نوتیفیکیشن برای ذخیره آن</td>
<td style="text-align: center;">string</td>
<td style="text-align: right;">delivery</td>
</tr>
</tbody>
</table>

<br>
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
<td style="text-align: center;">(id (action</td>
<td style="text-align: right;">شناسه اکشن</td>
<td style="text-align: center;">string</td>
<td style="text-align: right;">forecast_action</td>
</tr>
<tr>
<td style="text-align: center;">(title (action</td>
<td style="text-align: right;">عنوان اکشن</td>
<td style="text-align: center;">string</td>
<td style="text-align: right;">پیش‌بینی کن</td>
</tr>
<tr>
<td style="text-align: center;">(options (action</td>
<td style="text-align: right;">رفتار اکشن (فقط آی&zwnj;او&zwnj;اس)</td>
<td style="text-align: center;">number</td>
<td style="text-align: right;">1</td>
</tr>
<tr>
<td style="text-align: center;">(icon (action</td>
<td style="text-align: right;">نام آیکون در فولدر drawable (فقط اندروید)</td>
<td style="text-align: center;">string</td>
<td style="text-align: right;">نام آیکون</td>
</tr>
<tr>
<td style="text-align: center;">(url (action</td>
<td style="text-align: right;">لینک مقصد یا دیپ لینک</td>
<td style="text-align: center;">string</td>
<td style="text-align: right;">starter:/detail?id=123</td>
</tr>
</tbody>
</table>
</p>

<div markdown="1">


> `نکته :` نماد <font color="red">*</font> در جدول پارامترها به معنی **الزامی** بودن پارامتر است و بدون آن‌ درخواست شما صورت نمی‌گیرد. 
<br>

> `نکته :` در پارامترهای نوتیفیکیشن، پارامتر `options` یا همان رفتار اکشن (فقط در آی‌او‌اس) می‌توانید عدد ۱ برای اکشن [Authentication Required (اکشن در صورت قفل نبودن دستگاه اجرا می‌شود)](https://developer.apple.com/documentation/usernotifications/unnotificationactionoptions/unnotificationactionoptionauthenticationrequired?language=objc)،‌ ۲ برای اکشن [Destructive (اکشن تسک مخرب انجام می‌دهد)](https://developer.apple.com/documentation/usernotifications/unnotificationactionoptions/unnotificationactionoptiondestructive?language=objc)، ۴ برای اکشن [Foreground (اکشن موجب باز شدن اپ در فورگراند می‌شود)](https://developer.apple.com/documentation/usernotifications/unnotificationactionoptions/unnotificationactionoptionforeground?language=objc) و جمع این اعداد را برای ترکیب آن‌ها با هم قرار دهید.

</div>

</details>

##### مثال ارسال عمومی پیام چابک 

نمونه زیر یک cURL معتبر از ارسال پیام چابک عمومی است:

```bash
curl -X POST \
"https://sandbox.push.adpdigital.com/api/push/toUsers?access_token=<ACCESS_TOKEN>" \
-H "accept: application/json" \
-H "Content-Type: application/json" \
-d "{ \"user\": \"*\", \"content\": \"نسخه جدید اپلیکیشن را نصب کنید.\", \"channel\": \"public/sport\", \"useAsAlert\": true}"
```
<br>

#### ارسال عمومی نوتیفیکیشن 

با توجه به این که در نوتیفیکیشن مفهوم **کانال** معنی نمی‌دهد بنابراین ارسال عمومی هم قابل اجرا نیست. در صورتی که می‌خواهید به همه کاربران نوتیفیکیشن بفرستید باید از [ارسال گروهی](/send-push.html#ارسال-گروهی-نوتیفیکیشن) این کار را انجام دهید.

-->
<br>

### نحوه استفاده از سگمنت‌ها در API

هر سگمنت می‌تواند شامل یک یا چند شرط (**rule**) باشد.

#### شرط‌ها

هر شرط شامل ۳ قسمت اصلی می‌باشد:

- `name`: نام فیلد

- `operator`: نوع عملوند (مانند بزرگتر، مساوی‌ با و غیره)

- `value`: مقداری که سنجش می‌شود

#### عملوند‌های مجاز (operators)

- `equal_to`: برابر با

- `not_equal`: برابر نباشد با

- `lesser_than`: کوچکتر از

- `lesser_equals`: کوچکتر مساوی

- `greater_than`: بزرگتر از

- `greater_equals`: بزرگتر مساوی

- `include`: یکی از

- `not_include`: هیچکدام از

- `before`: قبل از

- `after`: بعد از

> `نکته:` عملوند‌های `before` و `after` مخصوص فیلد‌هایی از جنس زمان هستند، و مقداری که در قسمت `value` این نوع شرط‌ها قرار میگیرد به صورت `xh` می‌باشد. نمونه: `'value: '6h`.

#### nameهای مجاز

- `installDate`: زمان اولین بازدید

- `launchTime`: زمان آخرین بازدید

- `launchCount`: تعداد بازدید

- `tags`: تگ‌های کاربر

- `deviceType`: نوع دستگاه

- `clientVersion`: نسخه برنامه

- `osVersion`: نسخه سیستم‌عامل

مثال زیر کاربرانی را هدف قرار می‌دهد که **بعد از ۶ ساعت پیش**، برنامه‌ را نصب کرده‌اند و **بیش از ۲ بار** هم آن را باز نموده‌اند:

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
