---
id: Send-smart-message
title: وب سرویس ارسال پیام هوشمند از سمت سرور
layout: rest-api
permalink: rest-api/Send-smart-message.html
---

شما می‌توانید با فراخوانی این وب‌ سرویس، **پیام هوشمند** را به سرور چابک ارسال کنید.

<Br>

### لینک پایه (Path)

لینک پایه ارسال رویداد**post** `https://{APP_ID}.push.adpdigital.com/api/push/notifyUsers`
است.


<Br>

### مثال ارسال پیام هوشمند به سرور چابک از طریق شناسه در چابک 


```java
{
  "user": "userId",
  "content": "MESSAGE TEXT",
  "ttl": 60,
  "fallback": {
    "content": "SMS Content",
    "delay": 60,
    "media": "sms",
    "policy": "NOTIFICATION_SHOWN"
  },
  "notification": {
    "title": "title",
    "body": "body"
  }
}
```

-  ``user`` (اجباری)



- ``content`` (اجباری)



- `ttl` (اختیاری)



- `fallback` (اختیاری)



  - `content`
 
 
  
  -  `delay`
  
  
  
  -  `media`
  
  
  
  -  `policy`
  

  
- `notification`

  - `title`
  
  - `body`