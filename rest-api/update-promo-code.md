---
id: update-promo-code
title: وب سرویس بروزرسانی کد تخفیف
layout: rest-api
permalink: rest-api/update-promo-code.html
---

##  بروز‌رسانی  کد  تخفیف‌های  یک  کمپین <span class='web-service-http-method-post'>POST<span> 



با فراخوانی API زیر می‌توانید کد تخفیف‌های یک کمپین را بروز کنید تا پیام‌های بعدی از کد تخفیف‌های جدید استفاده کنند:

```curl
https://{APP_ID}.push.adpdigital.com/api/containers/updatePromoCodes/{PUSH_TRACK_ID}
```

محتوای فایل CSV باید به شکل زیر باشد:

```
ABC123
EFG456
first-ticket
new-user
```

<p align="center"> 
    <img src="https://raw.githubusercontent.com/chabok-io/chabok-assets/master/chabok-docs/rest-api/promo_code_csv.png"
     width="300px" 
     height="235px">
</p>

فرمت درخواست باید `multipart/form-data` باشد و فایل CSV کد تخفیف‌های جدید با کلید file باید ارسال شوند. در ادامه، نمونه یک درخواست cURL آورده شده است:

```curl
curl --location --request POST \
'https://{APP_ID}.push.adpdigital.com/api/containers/updatePromoCodes/{PUSH_TRACK_ID}' \
--header 'X-Access-Token: {ACCESS_TOKEN}' \
--header 'Content-Type: multipart/form-data' \
--form 'file=@/Users/user/Desktop/promoCode.csv'
```

دقت کنید که `PUSH_TRACK_ID` شناسه‌ی رهگیری **trackId** کمپین شماست و `ACCESS_TOKEN` نیز همان API Key (Access Token) شماست.


روش عملکرد API مذکور به صورت خودکار بوده و به محض اتمام عملیات با مجموعه‌ی قبلی جایگزین خواهد شد.

​

##  کد  تخفیف‌های  عمومی <span class='web-service-http-method-post'>POST<span> 




کد تخفیف‌های عمومی در مواقعی به کار می‌روند که برای یک کمپین دارای کد تخفیف، فایلی بارگذاری نشده باشد یا در هنگام اجرای کمپین، تمام کدهای بارگذاری‌شده‌ی اختصاصی مصرف و تمام شده باشند.

​

با فراخوانی API زیر می‌توانید کد تخفیف‌های عمومی اپلیکیشن خود را بروز کنید:

```curl
https://{APP_ID}.push.adpdigital.com/api/containers/updateGlobalPromoCodes
```

محتوای فایل CSV باید به شکل زیر باشد:

```
ABC123
EFG456
first-ticket
new-user
```

<p align="center"> 
    <img src="https://raw.githubusercontent.com/chabok-io/chabok-assets/master/chabok-docs/rest-api/promo_code_csv.png"
     width="300px" 
     height="235px">
</p>

فرمت درخواست باید `multipart/form-data` باشد و فایل CSV کد تخفیف‌های جدید با کلید file باید ارسال شوند. در ادامه، نمونه یک درخواست cURL آورده شده است:

```curl
curl --location --request POST \
'https://{APP_ID}.push.adpdigital.com/api/containers/updateGlobalPromoCodes' \
--header 'X-Access-Token: {ACCESS_TOKEN}' \
--header 'Content-Type: multipart/form-data' \
--form 'file=@/Users/user/Desktop/promoCode.csv'
```


روش عملکرد API مذکور به صورت خودکار بوده و به محض اتمام عملیات با مجموعه‌ی قبلی جایگزین خواهد شد.
