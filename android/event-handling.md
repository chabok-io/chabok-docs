---
id: event-handling
title: رویدادهای آنی
layout: android
permalink: android/event-handling.html
prev: user-management.html
next: behavior-tracking.html
---

با چابک شما علاوه بر پیام می‌توانید [رویدادهای دلخواه خود را منتشر کنید](https://doc.chabokpush.com/android/event-handling.html#انتشار-رویداد-با-دادههای-دلخواه). سپس می‌توانید با `subscribeEvent` روی یک رویداد، [هر بار وقوع آن را دریافت کنید](https://doc.chabokpush.com/android/event-handling.html#دریافت-رویداد). در صورتی هم که دیگر نمی‌خواستید آن رویداد را دریافت کنید [می‌توانید با `unsubscribeEvent` آن را لغو کنید](https://doc.chabokpush.com/android/event-handling.html#غیرفعال-کردن-دریافت-رویداد).

<Br>

### رویداد (Event)

رفتار کاربران را رویداد‌هایی تعیین می‌کنند که آن‌ها در اپلیکیشنتان رقم می‌زنند. این رویداد‌ها می‌توانند هر تعامل و اتفاقی که در اپ شما رخ می‌دهد، باشند. برای مثال فرض کنید شما در اپلیکیشن درخواست تاکسی می‌خواهید سفر خود را برای دوستانتان به اشتراک بگذارید، برای این منظور می‌توانید موقعیت مکانی و وضعیت سفر خود را برای کسانی که رو آن رویداد عضویت دارند ارسال کنید تا به صورت آنی‌ (Real-Time) از وضعیت سفر شما باخبر شوند و یا شما می‌توانید درخواست‌های درون برنامه‌ای اپلیکیشنتان را با استفاده از **رویداد** بین Back-End و چند دستگاه منتشر کنید و به صورت لحظه‌ای رویدادها را دریافت کنید.

#### انتشار رویداد

با استفاده از متد `publishEvent` قادر خواهید بود رویدادهای دلخواه خود را با یک نام و یک داده (Data) منتشر کنید، متد فوق به صورت خودکار در صورت قطعی ارتباط اقدام به ارسال مجدد می‌کند و به صورت آنی داده‌های شما را منتشر خواهد کرد. 

```java
AdpPushClient.get().publishEvent("EVENT_NAME",JSONObject data)
```

برای نمونه، کد انتشار موقعیت مکانی در اشتراک سفر کاربر قرار داده شده است که پس از دریافت موقعیت مکانی کاربر آن را با رویدادی تحت عنوان `shareTrip` منتشر می‌کند.

```java
JSONObject data = new JSONObject();

data.put("lat", 35.7583719);
data.put("lng", 51.4082228);
data.put("tripId", 12345678);

AdpPushClient.get().publishEvent("shareTrip", data);
```

#### دریافت رویداد

با پیاده‌سازی متد `onEvent` و معرفی کلاسی آن به متد `addListener` قادر به دریافت رویدادها خواهید بود. 

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

> نکته: توجه داشته باشید زمانی متد `onEvent` صدا زده خواهد شد که کاربر روی نام رویدادهای منتشر شده در صورت نیاز عضویت داشته باشد. برای این منظور بخش عضویت روی رویداد را مطالعه کنید.

#### عضویت روی رویداد

برای دریافت رویدادها باید کاربر روی رویداد مورد نظر توسط متد `subscribeEvent` عضویت داشته باشد.

```java
//Subscribe on an event name to get all data published on it.  
AdpPushClient.get().subscribeEvent("EVENT_NAME", new Callback() {...});  

//Subscribe on an user event name to get special device event.  
AdpPushClient.get().subscribeEvent("EVENT_NAME", "INSTALLATION_ID", new Callback() {...});
```

> نکته: `INSTALLATION_ID` شناسه منحصر به فرد دستگاه کاربر می‌باشد و از طریق متد `getInstallationId` به دست می‌آید. 

در صورت استفاده از امضاهای حاوی `INSTALLATION_ID` تمامی رویدادهای مربوط به نام وارد شده به عنوان `EVENT_NAME` که توسط آن دستگاه منتشر می‌شود را دریافت خواهید نمود.

برای مثال، در زیر عضویت روی رویداد `shareTrip` یک دستگاه آورده شده است.

```java
//Get a device unique id with calling AdpPushClient.get().getInstallationId();
//Should get user installationId with publish method or your rest api.
String installationId = "USER_INSTALLATION_ID";

AdpPushClient.get().subscribeEvent("shareTrip", installationId, new Callback() {...});
```

> `نکته`: برای عضویت روی رویداد یک دستگاه خاص باید شناسه دستگاه (`installationId`) را از کاربر دریافت کنید. به این صورت که کاربر در صورت رعایت مسائل امنیتی `installationId` خود را برای کاربری که می‌خواهد رویدادهای او را دریافت کند از طریق متد `publishEvent` ارسال می‌کند.

### لغو عضویت از رویداد

برای لغو عضویت از یک رویداد کافی است متد `unsubscribeEvent`  را که با دو امضای مختلف وجود دارد،  برا اساس نیاز خود فراخوانی نمایید.

```java
//Unsubscribe on an event name to get all data published on it.  
public void unsubscribeEvent("EVENT_NAME", new Callback() {...})

//Unsubscribe on an user event name to get special device event. 
public void unsubscribeEvent("EVENT_NAME", "INSTALLATION_ID", new Callback() {...})
```
