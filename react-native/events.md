---
id: events
title: مدیریت رویدادها
layout: react-native
permalink: react-native/events.html
prev: verification.html
next: event-tracking.html
---

### انتشار رویداد با داده‌های دلخواه

با متد زیر می توانید رویدادهای داخل برنامه را با نام و داده دلخواه منتشر کنید:

```javascript
chabok.publishEvent(eventName, {
live: false,
}
```
### دریافت رویداد
به منظور دریافت رویدادها شما ابتدا باید با استفاده از متد `subscribeEvent` بر روی رویداد عضو شوید.

```javascript

chabok.subscribeEvent(eventName) // public event
chabok.subscribeEvent(eventName, installationId) // private event
chabok.subscribeEvent(eventName, installationId, live)
```

> `نکته` : با فراهم آوردن مقدار `installationId` شما تنها رویدادهایی که از آن دستگاه ارسال می‌شود را دریافت خواهید کرد. توجه داشته باشید که این مقدار را می‌توانید با استفاده از متد `getInstallationId` دریافت نمایید.

سپس با دادن نام رویداد از متد زیر آن‌ها را دریافت نمایید:

```javascript

chabok.on('eventName', msg => {
  // Called When PushClientManager has been received new message from server
  console.log(`${msg.content} - ${msg.createdAt}`)
})
```

### غیر فعال کردن دریافت یک رویداد

برای غیرفعال کردن یک رویداد کافی است متد `unSubscribeEvent` را که با دو امضای مختلف وجود دارد را بر اساس نیاز خود فراخوانی نمایید.

```javascript

chabok.unSubscribeEvent(eventName) // public event
chabok.unSubscribeEvent(eventName, installationId) // private event
```
