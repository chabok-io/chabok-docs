---
id: receive-gone-data
title: وب سرویس دریافت دیتای حذف
layout: rest-api
permalink: rest-api/receive-gone-data.html
---

شما می‌توانید با فرخوانی یک وب‌ سرویس،**دیتای کاربرانی که اپلیکیشن شما را حذف کرده‌اند** را در تاریخ‌های دلخواهتان دریافت کنید.


<Br>

به طور کلی برای دریافت دیتای حذف باید از لینک `https://sandbox.push.adpdigital.com/api/installations/v1/uninstall/report/:from/:to?limit=10&offset=0` استفاده کنید.


>`نکته:` دقت داشته لینک بالا برای حساب‌های سندباکس است و در صورت داشتن حاسب عملیاتی باید از لینک `https://{APP_ID}.push.adpdigital.com/api/installations/v1/uninstall/report/:from/:to?limit=10&offset=0` استافده کنید.


### پارامترها


- `from`

این پارامتر **time stamp** است. (از چه تاریخی دیتا دریافت شود.)

- `to`

این پارامتر **time stamp** است. (تا چه تاریخی دیتا دریافت شود.)

- `offset` (اختیاری)

این پارامتر عددی تعیین می‌کند نتایج دیتای درخواستی شما از کجا شروع شود. پیش‌فرض این پارامتر عدد صفر می‌باشد.
 
- `limit` (اختیاری)

این پارامتر عددی تعیین می‌کند از `offset` شما به بعد چه تعداد از نتایج درخواستی شما دریافت شود.

### نمونه Curl

نمونه زیر دریافت دیتای حذف را از تاریخ **دیروز تا امروز** از **نتایج ۱۰۰ام تا ۲۰۰ام** را درخواست می‌کند.

```bash
curl -X GET --header 'Accept: application/json' '[https://sandbox.push.adpdigital.com/api/installations/v1/uninstall/report/1567922666521/1567836276088?limit=100&offset=100&access_token={YOUR_ACCESS_TOKEN}]
```
