---
id: update-promo-code
title: بروزرسانی کد تخفیف
layout: rest-api
permalink: rest-api/update-promo-code.html
---

>`نکته:` برای ایجاد دسترسی (Access Token) [راهنمای استفاده](https://doc.chabok.io/rest-api/guide.html#%D8%A7%DB%8C%D8%AC%D8%A7%D8%AF-%D8%AF%D8%B3%D8%AA%D8%B1%D8%B3%DB%8C) را مطالعه کنید.

<Br>

### POST |  بروز‌رسانی  کد  تخفیف‌های  یک  کمپین 

با فراخوانی API زیر می‌توانید کد تخفیف‌های یک کمپین را بروز کنید تا پیام‌های بعدی از کد تخفیف‌های جدید استفاده کنند:

```bash
https://{APP_ID}.push.adpdigital.com/api/containers/updatePromoCodes/{PUSH_TRACK_ID}
```

محتوای فایل CSV باید به شکل زیر باشد:

``` json
ABC123
EFG456
first-ticket
new-user
```

<p class="text-center"> 
    <img src="https://raw.githubusercontent.com/chabok-io/chabok-assets/master/chabok-docs/rest-api/promo_code_csv.png"
     width="70%">
</p>

فرمت درخواست باید `multipart/form-data` باشد و فایل CSV کد تخفیف‌های جدید با کلید file باید ارسال شوند. در ادامه، نمونه یک درخواست cURL آورده شده است:

```bash
curl --location --request POST \
'https://{APP_ID}.push.adpdigital.com/api/containers/updatePromoCodes/{PUSH_TRACK_ID}' \
--header 'X-Access-Token: {ACCESS_TOKEN}' \
--header 'Content-Type: multipart/form-data' \
--form 'file=@/Users/user/Desktop/promoCode.csv'
```

دقت کنید که `PUSH_TRACK_ID` شناسه‌ی رهگیری **trackId** کمپین شماست و `ACCESS_TOKEN` نیز همان API Key (Access Token) شماست.


روش عملکرد API مذکور به صورت خودکار بوده و به محض اتمام عملیات با مجموعه‌ی قبلی جایگزین خواهد شد.

#### پاسخ درست

در صورت که عملیات با موفقیت انجام شود، پاسخ زیر را دریافت خواهید کرد که به این معنی است که، بروزرسانی کد تخفیف با موفقیت انجام شده است.

```json
{
    "promoSetId": "b7815e64-16cb-4050-8481-8dc081edeaf6",
    "totalRows": 200
}
```

#### پاسخ نادرست

در صورت بروز خطا در فراخوانی وب سرویس با خطای زیر مواجه خواهید شد:

خطای اشتباه بود مقدار شناسه کمپین (trackId):

```json
{
    "error": {
        "name": "Error",
        "status": 404,
        "message": "Invalid userPush id"
    }
}
```

<Br>

### POST | کد  تخفیف‌های  عمومی 

کد تخفیف‌های عمومی در مواقعی به کار می‌روند که برای یک کمپین دارای کد تخفیف، فایلی بارگذاری نشده باشد یا در هنگام اجرای کمپین، تمام کدهای بارگذاری‌شده‌ی اختصاصی مصرف و تمام شده باشند.



با فراخوانی API زیر می‌توانید کد تخفیف‌های عمومی اپلیکیشن خود را بروز کنید:

```bash
https://{APP_ID}.push.adpdigital.com/api/containers/updateGlobalPromoCodes
```

محتوای فایل CSV باید به شکل زیر باشد:

``` json
ABC123
EFG456
first-ticket
new-user
```

<p class="text-center"> 
    <img src="https://raw.githubusercontent.com/chabok-io/chabok-assets/master/chabok-docs/rest-api/promo_code_csv.png"
     width="70%">
</p>

فرمت درخواست باید `multipart/form-data` باشد و فایل CSV کد تخفیف‌های جدید با کلید file باید ارسال شوند. در ادامه، نمونه یک درخواست cURL آورده شده است:

```bash
curl --location --request POST \
'https://{APP_ID}.push.adpdigital.com/api/containers/updateGlobalPromoCodes' \
--header 'X-Access-Token: {ACCESS_TOKEN}' \
--header 'Content-Type: multipart/form-data' \
--form 'file=@/Users/user/Desktop/promoCode.csv'
```


روش عملکرد API مذکور به صورت خودکار بوده و به محض اتمام عملیات با مجموعه‌ی قبلی جایگزین خواهد شد.

### پاسخ درست

در صورت که عملیات با موفقیت انجام شود، پاسخ زیر را دریافت خواهید کرد که به این معنی است که، بروزرسانی کد تخفیف با موفقیت انجام شده است.

```json
{
    "promoSetId": "{YOUR_APP_ID}",
    "totalRows": 200 
}
```

