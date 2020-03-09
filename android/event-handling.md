---
id: event-handling
title: پیام‌رسانی آنی
layout: android
permalink: android/event-handling.html
prev: location-tracking.html
next: verification.html
---

چابک به شما این امکان را می‌دهد که بتوانید ارتباط لحظه‌ای (Real-time) بین سرور و کلاینت داشته باشید و داده‌های مورد نظرتان را در لحظه جا به جا کنید. به عنوان مثال در اپلیکیشن‌های هوشمند حمل و نقل می‌توانید درخواست کاربر و تایید آن را به صورت آنی داشته باشید.

زیرساخت چابک از مدل رویدادگرا Pub/Sub استفاده می‌کند. مزیت این مدل علاوه بر آنی بودن این است که ارسال کننده نیازی به این که بداند چه کسانی دریافت می‌کنند، ندارد. برای درک بهتر آن توصیه می‌کنیم [این لینک](https://en.wikipedia.org/wiki/Publish%E2%80%93subscribe_pattern) را مطالعه نمایید. از این طریق شما با [عضویت روی یک رویداد](/android/event-handling.html#عضویت-روی-رویداد)، آن را پس از هر بار رخ دادن [دریافت می‌نمایید](/android/event-handling.html#دریافت-رویداد). علاوه بر آن شما می‌توانید یک رویدادی را با داده دلخواه خود [ارسال کنید](/android/event-handling.html#انتشار-رویداد).

> `نکته:` دقت داشته باشید که **قابلیت آنی (realtime)**  چابک از نسخه ۳ به بعد پیش فرض **غیر فعال** است. برای فعال کردن مقدار قابلیت آنی (realtime)، کافی است مقدار پیش‌فرض آن را در فایل تنظیمات چابک که از پنل دانلود می‌کنید تغییر دهید.

<Br>

### رویداد (Event)

رویدادها می‌توانند هر گونه **انتقال داده بین سرور و کلاینت** باشند. برای مثال، فرض کنید شما در اپلیکیشن درخواست تاکسی می‌خواهید سفر خود را با دوستانتان به اشتراک بگذارید. برای این منظور می‌توانید **موقعیت مکانی** و **وضعیت سفر** خود را برای کسانی که روی آن رویداد عضویت دارند، ارسال کنید تا به صورت **آنی‌** (Real-Time) از وضعیت سفر شما مطلع شوند. یا همچنین می‌توانید به جای درخواست‌های HTTP با استفاده از زیرساخت دو طرفه و آنی چابک رویدادهای درون‌برنامه‌ای بین بکند (Back-end) و چند دستگاه منتشر کنید.   

#### عضویت روی رویداد

برای دریافت رویدادها باید کاربر روی رویداد مورد نظر توسط متد `subscribeEvent` عضو شده باشد.

```java
//Subscribe on a global event from any device.  
AdpPushClient.get().subscribeEvent("EVENT_NAME", new Callback() {...});  

//Subscribe on a global event from a specific device.  
AdpPushClient.get().subscribeEvent("EVENT_NAME", "INSTALLATION_ID", new Callback() {...});
```

> نکته: `INSTALLATION_ID` شناسه منحصر به فرد دستگاه کاربر می‌باشد و از طریق متد `getInstallationId` به دست می‌آید. 

در صورت استفاده از امضاهای حاوی `INSTALLATION_ID` تمامی رویدادهای مربوط به نام وارد شده به عنوان `EVENT_NAME` که توسط آن دستگاه منتشر می‌شود را دریافت خواهید نمود.

برای مثال، در زیر عضویت روی رویداد `shareTrip` یک دستگاه آورده شده است:

```java
//Get a unique device id by calling AdpPushClient.get().getInstallationId();
//get user installationId with publish method or your rest api.
String installationId = "USER_INSTALLATION_ID";

AdpPushClient.get().subscribeEvent("shareTrip", installationId, new Callback() {...});
```

> `نکته`: برای دریافت رویدادهای یک دستگاه خاص باید شناسه آن دستگاه (`installationId`) را به جایی که باید دریافت کند، ارسال نمایید.

#### لغو عضویت از رویداد

برای لغو عضویت از یک رویداد کافی است متد `unsubscribeEvent`  را که با دو امضای مختلف وجود دارد، متناسب با نیاز خود فراخوانی نمایید.

```java
//Unsubscribe on an event name to get all data published on it.  
public void unsubscribeEvent("EVENT_NAME", new Callback() {...})

//Unsubscribe on an user event name to get special device event. 
public void unsubscribeEvent("EVENT_NAME", "INSTALLATION_ID", new Callback() {...})
```
<Br>

#### دریافت رویداد

با پیاده‌سازی متد `onEvent` و معرفی کلاس آن به متد `addListener` قادر به دریافت رویدادها خواهید بود. 

```java
AdpPushClient.get().addListener(this);

public void onEvent(final EventMessage message) {
    JSONObject data = message.getData();
    String eventName = message.getName();
    String installationId = message.getInstallationId();

    Log.d(TAG, "Got event " + eventName + 
                " from device " + installationId +
                " with data " + data);
}
```

> نکته: توجه داشته باشید زمانی متد `onEvent` فراخوانی خواهد شد که کاربر روی نام رویدادهای منتشر شده، عضویت داشته باشد. برای این منظور بخش [عضویت روی رویداد](/android/event-handling.html#عضویت-روی-رویداد) را مطالعه کنید.

<Br>

#### انتشار رویداد

با استفاده از متد `publishEvent` می‌توانید رویدادهای دلخواه خود را با یک **نام** و یک **داده** (Data) منتشر کنید، متد زیر به صورت خودکار در صورت قطعی ارتباط اقدام به ارسال مجدد می‌کند و به صورت آنی داده‌های شما را منتشر خواهد کرد. 

```java
AdpPushClient.get().publishEvent("EVENT_NAME",JSONObject data)
```

برای نمونه در زیر کد انتشار موقعیت مکانی در اشتراک سفر کاربر قرار داده شده است که پس از دریافت موقعیت مکانی کاربر، آن را با رویدادی تحت عنوان `shareTrip` منتشر می‌کند.

```java
JSONObject data = new JSONObject();

data.put("lat", 35.7583719);
data.put("lng", 51.4082228);
data.put("tripId", 12345678);

AdpPushClient.get().publishEvent("shareTrip", data);
```

#### انتشار رویداد در بک گراند

شما می‌توانید در مواقعی که اپلیکیشن بسته (kill) یا در بک گراند است هم رویداد منتشر کنید. 

برای نمونه از مثال بالا استفاده می‌کنیم:

```java
JSONObject data = new JSONObject();

data.put("lat", 35.7583719);
data.put("lng", 51.4082228);
data.put("tripId", 12345678);

AdpPushClient.get().publishBackground("shareTrip", data);
```
