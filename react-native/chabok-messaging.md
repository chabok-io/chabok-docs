---
id: chabok-messaging
title: پیام چابک
layout: react-native
permalink: react-native/chabok-messaging.html
prev: gradle-setup.html
next: verification.html
---

### ارسال پیام

برای ارسال پیام از مشتری به سرور چابک، از متد زیر استفاده کنید:

```javascript
chabok.publish({
    content: "Hello World!",
    channel: "CHANNEL_NAME",
    user: "USER_ID"
})
```

روی اتصال موجود چابک می‌توانید تعداد زیادی رویداد سمت سرور بفرستید، در واقع برای هر درخواست یک اتصال جدید ساخته نمی‌شود. تحویل اطلاعات را در سمت سرور، حتی در شرایطی که کاربر اینترنت ضعیف و یا قطع شده‌ای دارد، تضمین می‌کند. به این ترتیب که کلاینت چابک با استفاده از منطق سعی مجدد خود می‌تواند پیام‌ شما را حتی در شرایط بحرانی یک و فقط یک بار بفرستد.

> `نکته`: برای ارسال پیام به صورت عمومی بر روی یک کانال بجای عبارت `USER_ID` کاراکتر `*` را وارد نمایید و سپس نام کانال خصوصی خود را وارد کنید.

### عضویت در کانال

کانال‌ها در چابک به بخش خصوصی و عمومی تقسیم می‌شوند قالب کانال بصورت زیر می‌باشد:

- خصوصی : private/channel
- عمومی : channel یا public/channel

برای عضویت در یک کانال میتوانید از موارد زیر استفاده کنید:

```javascript
chabok.subscribe("alert") // public channel
chabok.subscribe("public/sport") // public channel
chabok.subscribe("private/league") // private (personal) channel
```

همچنین برای لغو عضویت در یک کانال میتوانید از موارد زیر استفاده کنید:

```javascript
chabok.unsubscribe("alert") // public channel
chabok.unsubscribe("public/sport") // public channel
chabok.unsubscribe("private/league") // private (personal) channel
```

### دریافت پیام

برای دریافت پیام از سرور چابک نیز میتوانید از متدهای زیر استفاده کنید:

```javascript
chabok.on('message', msg => {
  // Called When PushClientManager has been received new message from server
  console.log(`${msg.content} - ${msg.createdAt}`)
})
```

<!---

### رویداد دریافت تأییدیه تحویل
برای دریافت تأییدیه تحویل، باید از رویداد زیر استفاده کنید :

```javascript
chabok.on('messageDelivery', msg => {
 // Called When PushClientManager has received new delivery from server
})
```

### ارسال وضعیت پیام‌های دریافتی

شما می‌توانید عکس‌العمل کاربر به یک پیام چابک را (خوانده شدن، نادیده گرفته شدن، ...) با استفاده از کلاینت چابک مشخص کنید. 
متد `markAsRead` برای ارسال رویداد خوانده شدن پیام توسط کاربر به سرور می تواند مورد استفاده قرار بگیرد. 
متد `messageDismissed` نیز می‌تواند برای هر عملی که معنی باز نکردن یا نادیده گرفته شدن پیام را داشته باشد بکار رود. به دو طریق می توان این متدها را فراخوانی نمود:

```javascript
chabok.messageMarkAsRead("MESSAGE_ID")
chabok.messageDismissed("MESSAGE_ID")
```
-->
