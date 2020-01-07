---
id: receive-uninstall-data
title: وب سرویس دریافت دیتای حذف
layout: rest-api
permalink: rest-api/receive-uninstall-data.html
---

شما می‌توانید با فراخوانی یک وب‌ سرویس، **دیتای دستگاه‌هایی که اپلیکیشن شما را حذف کرده‌اند** را در تاریخ‌های دلخواهتان دریافت کنید.

<Br>

### لینک پایه (Path)

 لینک پایه دریافت دیتا `https://{APP_ID}.push.adpdigital.com/api/installations/v1/uninstall/report/:from/:to` است.


<Br>

### پارامترها


- `from`

این پارامتر **timestamp** است. (از چه تاریخی دیتا دریافت شود.)

- `to`

این پارامتر **timestamp** است. (تا چه تاریخی دیتا دریافت شود.)

- `offset` (اختیاری)

این پارامتر عددی تعیین می‌کند نتایج دیتای درخواستی شما از کجا شروع شود. پیش‌فرض این پارامتر عدد ۰ می‌باشد.
 
- `limit` (اختیاری)

این پارامتر عددی تعیین می‌کند از `offset` شما به بعد چه تعداد از نتایج درخواستی شما دریافت شود. پیش‌فرض این پارامتر عدد ۲۵ است.

- `type` (اختیاری)

این پارامتر مشخص می‌کند که حذف‌ها گزارش شوند یا ریزش‌ها، اگر مقدار این پارامتر را‍ `churn` قرار دهید فقط مواردی در گزارش مشاهده می‌شود که کاربر اپلیکیشن را حذف کرده و دستگاه فعال دیگری نداشته باشد.

<Br>

### نمونه Curl

نمونه زیر دریافت دیتای حذف را از **نتایج ۱۰۰ام تا ۲۰۰ام** درخواست می‌کند.

```bash
curl -X GET \  
--header 'Accept: application/json' \  
'https://{APP_ID}.push.adpdigital.com/api/installations/v1/uninstall/report/1567922666521/1567836276088?limit=100&offset=100&access_token={YOUR_ACCESS_TOKEN}'
```

پاسخ درخواست مانند زیر خواهد بود:

```bash
{
  "count": 1,
  "data": [
    {
      "time": "2019-08-28T22:30:18.148Z",
      "installationId": "DEVICE_ID",
      "deviceType": "DEVICE_TYPE(android, ios,...)",
      "userId": "USER_ID"
    }
  ]
}
```
