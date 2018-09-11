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
chabok.publishEvent(EVENT_NAME, {
live: false
}
```
### دریافت رویداد
به منظور دریافت رویدادها شما ابتدا باید با استفاده از متد `subscribeEvent` بر روی رویداد عضو شوید.

```javascript

chabok.subscribeEvent(EVENT_NAME) // public event
chabok.subscribeEvent(EVENT_NAME, installationId) // private event
chabok.subscribeEvent(EVENT_NAME, installationId, live)
```

> `نکته` : با فراهم آوردن مقدار `installationId` شما تنها رویدادهایی که از آن دستگاه ارسال می‌شود را دریافت خواهید کرد. توجه داشته باشید که این مقدار را می‌توانید [با استفاده از متد `getInstallationId`](https://doc.chabokpush.com/react-native/features.html#شناسه-دستگاه-در-چابک) دریافت نمایید.

سپس با دادن نام رویداد از متد زیر آن‌ها را دریافت نمایید:

```javascript

chabok.on('EVENT_NAME', event => {
  // Called When PushClientManager has been received new event from server
  console.log(`${event.content} - ${event.createdAt}`)
})
```

### غیر فعال کردن دریافت یک رویداد

برای غیرفعال کردن یک رویداد کافی است متد `unSubscribeEvent` را که با دو امضای مختلف وجود دارد را بر اساس نیاز خود فراخوانی نمایید.

```javascript

chabok.unSubscribeEvent(EVENT_NAME) // public event
chabok.unSubscribeEvent(EVENT_NAME, installationId) // private event
```
