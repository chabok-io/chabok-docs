---
id: event-handling
title: رویدادهای آنی
layout: javascript
permalink: javascript/event-handling.html
prev: behavior-tracking.html
next: verification.html
---

چابک علاوه بر پیام‌رسانی متنی به شما این امکان را می‌دهد که بتوانید [رویدادهای](/javascript/event-handling.html#رویداد-event) اپلیکیشن خود را مدیریت کنید. مدیریت رویداد برخلاف رصد که فقط رویدادی را پس از رخ دادن ارسال می‌کند، به شما امکان می‌دهد تا به صورت **لحظه‌ای ارسال و دریافت داده** داشته باشید. از این طریق شما با [عضویت روی یک رویداد](/javascript/event-handling.html#عضویت-روی-رویداد)، آن را پس از هر بار رخ دادن [دریافت می‌نمایید](/javascript/event-handling.html#دریافت-رویداد). علاوه بر آن شما می‌توانید یک رویدادی را با داده دلخواه خود [ارسال کنید](/javascript/event-handling.html#انتشار-رویداد).

زیرساخت چابک از مدل رویدادگرا Pub/Sub استفاده می‌کند. مزیت این مدل علاوه بر آنی بودن این است که ارسال کننده نیازی به این که بداند چه کسانی دریافت می‌کنند، ندارد. برای درک بهتر آن توصیه می‌کنیم [این لینک](https://en.wikipedia.org/wiki/Publish%E2%80%93subscribe_pattern) را مطالعه نمایید.

<Br>

### رویداد (Event)

رویدادها می‌توانند هر گونه **انتقال داده بین سرور و کلاینت** باشند. برای مثال، فرض کنید شما در اپلیکیشن درخواست تاکسی می‌خواهید سفر خود را با دوستانتان به اشتراک بگذارید. برای این منظور می‌توانید **موقعیت مکانی** و **وضعیت سفر** خود را برای کسانی که روی آن رویداد عضویت دارند، ارسال کنید تا به صورت **آنی‌** (Real-Time) از وضعیت سفر شما مطلع شوند. یا همچنین می‌توانید به جای درخواست‌های HTTP با استفاده از زیرساخت دو طرفه و آنی چابک رویدادهای درون‌برنامه‌ای بین بکند (Back-end) و چند دستگاه منتشر کنید.  

#### عضویت بر روی یک رویداد

به منظور دریافت رویدادها شما ابتدا باید با استفاده از متد `subscribeEvent` بر روی رویداد عضو شوید.

```javascript

chabok.subscribeEvent(eventName) // public event
chabok.subscribeEvent(eventName, installationId) // private event
chabok.subscribeEvent(eventName, installationId, live)
```

> `نکته` : با فراهم آوردن مقدار `installationId` شما تنها رویدادهایی که از آن دستگاه ارسال می‌شود را دریافت خواهید کرد. توجه داشته باشید که این مقدار را می‌توانید با استفاده از متد `getInstallationId` دریافت نمایید.


#### غیر فعال کردن یک رویداد

برای غیرفعال کردن یک رویداد کافی است متد `unSubscribeEvent` را که با دو امضای مختلف وجود دارد را بر اساس نیاز خود فراخوانی نمایید.

```javascript

chabok.unSubscribeEvent(eventName) // public event
chabok.unSubscribeEvent(eventName, installationId) // private event
```
#### دریافت رویداد

با پیاده‌سازی متد `onEvent` و معرفی کلاس آن به متد `addListener` قادر به دریافت رویدادها خواهید بود. 

```javascript
function onEvent(message) {
  console.log(message)
}
chabok.on('eventName',  onEvent)
```

> نکته: توجه داشته باشید زمانی متد `onEvent` فراخوانی خواهد شد که کاربر روی نام رویدادهای منتشر شده، عضویت داشته باشد. برای این منظور بخش [عضویت روی رویداد](/javascript/event-handling.html#عضویت-روی-رویداد) را مطالعه کنید.

<Br>

#### انتشار رویداد

با استفاده از متد `publishEvent` می‌توانید رویدادهای دلخواه خود را با یک **نام** و یک **داده** (Data) منتشر کنید، متد زیر به صورت خودکار در صورت قطعی ارتباط اقدام به ارسال مجدد می‌کند و به صورت آنی داده‌های شما را منتشر خواهد کرد. 

```javascript
chabok.publishEvent('eventName', {data: 'JSONObject'})
```

برای نمونه در زیر کد انتشار موقعیت مکانی در اشتراک سفر کاربر قرار داده شده است که پس از دریافت موقعیت مکانی کاربر، آن را با رویدادی تحت عنوان `shareTrip` منتشر می‌کند.

```javascript
const data = {
  lat: 35.7583719,
  lng: 51.4082228,
  tripId: 12345678
}
chabok.publishEvent('shareTrip', data)
```
