---
id: event-handling
title: رویدادهای آنی
layout: react-native-bridge
permalink: react-native-bridge/event-handling.html
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
//Subscribe on a global event from any device. 
this.chabok.subscribeEvent('EVENT_NAME')

//Subscribe on a global event from a specific device.
this.chabok.subscribeEvent('EVENT_NAME', 'INSTALLATION_ID')
```

در صورت استفاده از امضاهای حاوی `INSTALLATION_ID` تمامی رویدادهای مربوط به نام وارد شده به عنوان `EVENT_NAME` که توسط آن دستگاه منتشر می‌شود را دریافت خواهید نمود.

برای مثال، در زیر عضویت روی رویداد `shareTrip` یک دستگاه آورده شده است:

```javascript
//Get a unique device id by calling this.chabok.getInstallationId();
//get user installationId with publish method or your rest api.
String installationId = "USER_INSTALLATION_ID";

this.chabok.subscribeEvent('EVENT_NAME', 'INSTALLATION_ID')
```

> `نکته`: برای دریافت رویدادهای یک دستگاه خاص باید شناسه آن دستگاه (`installationId`) را به جایی که باید دریافت کند، ارسال نمایید.

##### وضعیت عضویت  

برای دریافت وضعیت عضویت روی یک رویداد کد زیر را پیاده‌سازی کنید:

```javascript
const chabokEmitter = new NativeEventEmitter(NativeModules.AdpPushClient);  
  
chabokEmitter.addListener('onSubscribe', (sub) => {  
    if (sub.name) {
        console.log('Subscribe on : ', sub.name);
    } else {
        console.log('Fail subscribe on event with error:', sub.error);
    }
});
```

#### لغو عضویت از رویداد

برای غیرفعال کردن یک رویداد کافی است متد `unSubscribeEvent` را که با دو امضای مختلف وجود دارد، بر اساس نیاز خود فراخوانی نمایید:

```javascript
//Unsubscribe on an event name to get all data published on it.
this.chabok.unSubscribeEvent('EVENT_NAME')

//Unsubscribe on an user event name to get special device event. 
this.chabok.unSubscribeEvent('EVENT_NAME', 'INSTALLATION_ID')
```


> `نکته` : با فراهم آوردن مقدار `installationId` شما تنها رویدادهایی که از آن دستگاه ارسال می‌شود را دریافت خواهید کرد. توجه داشته باشید که این مقدار را می‌توانید [با استفاده از متد `getInstallationId`](/react-native/features.html#دریافت-شناسه-دستگاه
) دریافت نمایید.

##### وضعیت لغو عضویت  

برای دریافت وضعیت لغو عضویت روی یک رویداد کد زیر را پیاده‌سازی کنید:

```javascript
const chabokEmitter = new NativeEventEmitter(NativeModules.AdpPushClient);  
  
chabokEmitter.addListener('onUnsubscribe', (unsub) => {  
    if (unsub.name) {
        console.log('Unsubscribe on : ', unsub.name);
    } else {
        console.log('Fail unsubscribe on event with error:', unsub.error);
    }
});
```

### دریافت رویداد

شما می‌توانید با دادن نام رویداد از متد زیر برای دریافت آن استفاده نمایید:

```javascript
const chabokEmitter = new NativeEventEmitter(NativeModules.AdpPushClient); 

chabokEmitter.addListener('onEvent', (eventMsg) => {
    let data = eventMessage.data;
    let eventName = eventMessage.eventName;
    let installationId = eventMessage.deviceId;
    
    console.log('Got event ' , eventName, 
			    ' from device ', installationId, 
			    ' with data ',data);
})
```

### انتشار رویداد 

با استفاده از متد `publishEvent` می‌توانید رویدادهای دلخواه خود را با یک **نام** و یک **داده** (Data) منتشر کنید، متد زیر به صورت خودکار در صورت قطعی ارتباط اقدام به ارسال مجدد می‌کند و به صورت آنی داده‌های شما را منتشر خواهد کرد. 

با متد زیر می‌توانید رویدادهای داخل برنامه را با نام و داده دلخواه منتشر کنید:

```javascript
this.chabok.publishEvent('EVENT_NAME',[Object])
```

برای نمونه در زیر کد انتشار موقعیت مکانی در اشتراک سفر کاربر قرار داده شده است که پس از دریافت موقعیت مکانی کاربر، آن را با رویدادی تحت عنوان `shareTrip` منتشر می‌کند.

```javascript
let data = {
    'lat': 35.7583719,  
    'lng': 51.4082228,  
    'tripId': 12345678
    }  
  
this.chabok.publishEvent('shareTrip', data)
```
