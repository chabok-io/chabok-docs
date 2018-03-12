---
id: chabok-messaging
title: پیام چابک
layout: react-native-bridge
permalink: react-native-bridge/chabok-messaging.html
prev: gradle-setup.html
next: verification.html
---

### دریافت پیام چابک

شما می‌توانید از طریق قرار دادن listener بر روی ‍`message`، پیام‌های جدید چابک را دریافت نمایید.

```javascript
chabok.on('message', msg => {
    messageArray.push({
              _id: msg.id,
              text: msg.content,
              createdAt: msg.createdAt,
    })
})    
```

### عضویت روی کانال‌ها

عضویت یک کاربر روی یک کانال برای دریافت پیام‌های ارسالی روی آن کانال `subscribe` نامیده می شود و لغو آن `unsubscribe` نامیده می شود. چابک به طور پیش فرض هر کاربر را روی یک کانال شخصی (بر اساس شناسه کاربر) ثبت نام می‌کند.

> `نکته:` نام کانال به صورت `پیش‌فرض` به عنوان کانال `عمومی` در نظر
> گرفته می‌شود و اگر شما می‌خواهید کاربر را روی کانال `شخصی` ثبت‌نام
> کنید کافی است قبل از نام کانال عبارت `/private` را اضافه نمایید.


