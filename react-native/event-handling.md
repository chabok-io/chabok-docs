---
id: event-handling
title: رویدادهای آنی
layout: react-native
permalink: react-native/event-handling.html
prev: behavior-tracking.html
next: verification.html
---

چابک علاوه بر پیام‌رسانی متنی به شما این امکان را می‌دهد که بتوانید [رویدادهای](/react-native/event-handling.html#رویداد-event) اپلیکیشن خود را مدیریت کنید. مدیریت رویداد برخلاف رصد که فقط رویدادی را پس از رخ دادن ارسال می‌کند، به شما امکان می‌دهد تا به صورت **لحظه‌ای ارسال و دریافت داده** داشته باشید. از این طریق شما با [عضویت روی یک رویداد](/react-native/event-handling.html#عضویت-روی-رویداد)، آن را پس از هر بار رخ دادن [دریافت می‌نمایید](/react-native/event-handling.html#دریافت-رویداد). علاوه بر آن شما می‌توانید یک رویدادی را با داده دلخواه خود [ارسال کنید](/react-native/event-handling.html#انتشار-رویداد).

زیرساخت چابک از مدل رویدادگرا **Pub/Sub** استفاده می‌کند. مزیت این مدل علاوه بر آنی بودن این است که ارسال کننده نیازی به این که بداند چه کسانی دریافت می‌کنند، ندارد. برای درک بهتر آن توصیه می‌کنیم [این لینک](https://en.wikipedia.org/wiki/Publish%E2%80%93subscribe_pattern) را مطالعه نمایید.

<Br>

### رویداد (Event)

رویدادها می‌توانند هر گونه **انتقال داده بین سرور و کلاینت** باشند. برای مثال، فرض کنید شما در اپلیکیشن درخواست تاکسی می‌خواهید سفر خود را با دوستانتان به اشتراک بگذارید. برای این منظور می‌توانید **موقعیت مکانی** و **وضعیت سفر** خود را برای کسانی که روی آن رویداد عضویت دارند، ارسال کنید تا به صورت **آنی‌** (Real-Time) از وضعیت سفر شما مطلع شوند. یا همچنین می‌توانید به جای درخواست‌های HTTP با استفاده از زیرساخت دو طرفه و آنی چابک رویدادهای درون‌برنامه‌ای بین بکند (Back-end) و چند دستگاه منتشر کنید.   

#### عضویت روی رویداد

به منظور دریافت رویدادها شما ابتدا باید با استفاده از متد `subscribeEvent` بر روی رویداد عضو شوید:

```javascript

chabok.subscribeEvent(EVENT_NAME) // public event
chabok.subscribeEvent(EVENT_NAME, installationId) // private event
chabok.subscribeEvent(EVENT_NAME, installationId, live)
```

#### لغو عضویت از رویداد

برای غیرفعال کردن یک رویداد کافی است متد `unSubscribeEvent` را که با دو امضای مختلف وجود دارد، بر اساس نیاز خود فراخوانی نمایید:

```javascript

chabok.unSubscribeEvent(EVENT_NAME) // public event
chabok.unSubscribeEvent(EVENT_NAME, installationId) // private event
```


> `نکته` : با فراهم آوردن مقدار `installationId` شما تنها رویدادهایی که از آن دستگاه ارسال می‌شود را دریافت خواهید کرد. توجه داشته باشید که این مقدار را می‌توانید [با استفاده از متد `getInstallationId`](/react-native/features.html#دریافت-شناسه-دستگاه
) دریافت نمایید.

### دریافت رویداد

شما می‌توانید با دادن نام رویداد از متد زیر برای دریافت آن استفاده نمایید:

```javascript

chabok.on('EVENT_NAME', event => {
  // Called When PushClientManager has been received new event from server
  console.log(`${event.content} - ${event.createdAt}`)
})
```

### انتشار رویداد 

با متد زیر می‌توانید رویدادهای داخل برنامه را با نام و داده دلخواه منتشر کنید:

```javascript
chabok.publishEvent(EVENT_NAME, {
live: false
}
```


