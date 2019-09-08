---
id: receive-uninstall-data
title: وب سرویس دریافت دیتای حذف
layout: rest-api
permalink: rest-api/receive-uninstall-data.html
---

شما می‌توانید با فرخوانی یک وب‌ سرویس،**دیتای دستگاه‌هایی که اپلیکیشن شما را حذف کرده‌اند** را در تاریخ‌های دلخواهتان دریافت کنید.

<Br>

### لینک پایه (Path)

 لینک پایه دریافت دیتا `https://sandbox.push.adpdigital.com/api/installations/v1/uninstall/report/:from/:to` است.


>`نکته:` دقت داشته لینک بالا برای حساب‌های سندباکس است و در صورت داشتن حساب عملیاتی باید از لینک `https://{APP_ID}.push.adpdigital.com/api/installations/v1/uninstall/report/:from/:to` استفاده کنید.

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

<Br>

### نمونه Curl

نمونه زیر دریافت دیتای حذف را از **نتایج ۱۰۰ام تا ۲۰۰ام** درخواست می‌کند.

```bash
curl -X GET \  
--header 'Accept: application/json' \  
'[https://sandbox.push.adpdigital.com/api/installations/v1/uninstall/report/1567922666521/1567836276088?limit=100&offset=100&access_token={YOUR_ACCESS_TOKEN}](https://slack-redir.net/link?url=https%3A%2F%2Fsandbox.push.adpdigital.com%2Fapi%2Finstallations%2Fv1%2Funinstall%2Freport%2F1567922666521%2F1567836276088%3Flimit%3D100%26offset%3D100%26access_token%3D%7BYOUR_ACCESS_TOKEN%7D)
```
