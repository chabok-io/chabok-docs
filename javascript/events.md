---
id: events
title: مدیریت رویدادها
layout: javascript
permalink: javascript/events.html
prev: verification.html
next: events-tracking.html
---

### عضویت بر روی یک رویداد
به منظور دریافت رویدادها شما ابتدا باید با استفاده از متد `subscribeEvent` بر روی رویداد عضو شوید.

```javascript

chabok.subscribeEvent(eventName) // public event
chabok.subscribeEvent(eventName, installationId) // private event
chabok.subscribeEvent(eventName, installationId, live)
```

> `نکته` : با فراهم آوردن مقدار `installationId` شما تنها رویدادهایی که از آن دستگاه ارسال می‌شود را دریافت خواهید کرد. توجه داشته باشید که این مقدار را می‌توانید با استفاده از متد `getInstallationId` دریافت نمایید.


## غیر فعال کردن یک رویداد
برای غیرفعال کردن یک رویداد کافی است متد `unSubscribeEvent` را که با دو امضای مختلف وجود دارد را بر اساس نیاز خود فراخوانی نمایید.

```javascript

chabok.unSubscribeEvent(eventName) // public event
chabok.unSubscribeEvent(eventName, installationId) // private event
```
