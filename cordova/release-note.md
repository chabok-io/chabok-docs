---
id: release-note
title: لیست تغییرات کتابخانه
layout: cordova
permalink: cordova/release-note.html
prev: behavior-tracking.html
---

شما در این صفحه می‌توانید از تغییرات هر نسخه کتابخانه چابک مطلع شوید.

<Br>

## [نسخه ۱.۱.۰ - ۱۳۹۸/۱۰/۱۸](https://github.com/chabok-io/chabok-starter-cordova/releases/tag/v1.1.0) 

- بروزرسانی کتابخانه آی‌او‌اس ([۲.۱.۰](https://github.com/chabok-io/chabok-client-ios/releases/tag/v2.1.0))  
- بروزرسانی کتابخانه اندروید ([۳.۱.۲](https://github.com/chabok-io/chabok-client-android/releases/tag/v3.1.2))  
- از این پس کتابخانه چابک به صورت خودکار راه‌اندازی و نصب می‌شود، همانند کد زیر:  
``` bash  
//SANDBOX  
cordova plugin add com.chabokpush.cordova --variable CHABOK_ENVIRONMENT=SANDBOX  
  
//OR PRODUCTION  
cordova plugin add com.chabokpush.cordova --variable CHABOK_ENVIRONMENT=PRODUCTION  
```  
- افزودن متد `setOnNotificationOpenedCallback` برای دریافت اطلاعات کلیک روی نوتیفیکیشن (اکشن‌ها و رد کردن (dismiss)) 
- حل مشکل دریافت وضعیت اتصال در کتابخانه
   
  
## [نسخه ۱.۰.۰ - ۱۳۹۸/۰۹/۲۳](https://github.com/chabok-io/chabok-starter-cordova/releases/tag/v1.0.0)  
  
### تغییرات  
  
- بروزرسانی کلاینت اندروید چابک به نسخه ۳.۱.۰  
- بروزرسانی کلاینت آی‌او‌اس به نسخه ۲.۰.۱
