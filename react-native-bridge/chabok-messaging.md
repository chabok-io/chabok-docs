---
id: chabok-messaging
title: پیام چابک
layout: react-native
permalink: react-native/chabok-messaging.html
prev: setup.html
next: verification.html
---

### ارسال پیام

برای ارسال پیام از مشتری به سرور چابک، از متد زیر استفاده کنید:

```javascript
const msg = {
    channel: "default",
    userId: "USER_ID",
    content:'Hello world',
    data: OBJECT
        };
this.chabok.publish(msg)
```

روی اتصال موجود چابک می‌توانید تعداد زیادی رویداد سمت سرور بفرستید، در واقع برای هر درخواست یک اتصال جدید ساخته نمی‌شود. تحویل اطلاعات را در سمت سرور، حتی در شرایطی که کاربر اینترنت ضعیف و یا قطع شده‌ای دارد، تضمین می‌کند. به این ترتیب که کلاینت چابک با استفاده از منطق سعی مجدد خود می‌تواند پیام‌ شما را حتی در شرایط بحرانی یک و فقط یک بار بفرستد.

> `نکته`: برای ارسال پیام به صورت عمومی بر روی یک کانال بجای عبارت `USER_ID` کاراکتر `*` را وارد نمایید و سپس نام کانال خصوصی خود را وارد کنید.

### عضویت در کانال

عضویت یک کاربر روی یک کانال برای دریافت پیام‌های ارسالی روی آن کانال subscribe نامیده می شود و لغو آن unsubscribe نامیده می شود. چابک به طور پیش فرض هر کاربر را روی یک کانال شخصی (بر اساس شناسه کاربر) ثبت نام می‌کند.

برای عضویت در یک کانال میتوانید از موارد زیر استفاده کنید:

```javascript
this.chabok.subscribe('CHANNEL_NAME');
```

همچنین برای لغو عضویت در یک کانال میتوانید از موارد زیر استفاده کنید:

```javascript
this.chabok.unSubscribe('CHANNEL_NAME');
```

### دریافت پیام

برای دریافت پیام از سرور چابک باید یک listener روی رویداد `ChabokMessageReceived` به صورت زیر اضافه کنید:

```javascript
const chabokEmitter = new NativeEventEmitter(NativeModules.AdpPushClient);

chabokEmitter.addListener( 'ChabokMessageReceived',
    (msg) => {
        const messageJson = this.getMessages() + JSON.stringify(msg);
        alert(messageJson);
    });
```

