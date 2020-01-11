---
id: chabok-messaging
title: پیام چابک
layout: react-native-bridge
permalink: react-native-bridge/chabok-messaging.html
prev: tracker.html
next: push-notification.html
---

چابک برای **ارسال پیام** هنگامی که کاربر به سرور چابک متصل است (باز بودن اپلیکیشن) **از سرویس آنی خود** استفاده می‌کند (پیام چابک) و در صورت عدم اتصال به چابک (بسته بودن اپلیکیشن) اقدام به **ارسال پوش‌نوتیفیکیشن** می‌کند تا کاربر را از داشتن پیام چابک مطلع سازد. برای همین از این پس منظور از واژه **پیام**، همان **پیام چابک** است و منظور از **پوش** یا **نوتیفیکیشن**، **پوش‌نوتیفیکیشن** می‌باشد.

 پیام‌های چابک از طریق [کانال‌](/react-native-bridge/chabok-messaging.html#کانال) ارسال می‌شوند. بنابراین برای دریافت پیام، باید ابتدا کاربر را در کانال [عضو نمایید](/react-native-bridge/chabok-messaging.html#عضویت-روی-کانال-subscribe). در این قسمت شما می‌توانید پیام [دریافت کنید](/react-native-bridge/chabok-messaging.html#دریافت-پیام). همچنین می‌توانید پیام [ارسال کنید](/react-native-bridge/chabok-messaging.html#ارسال-پیام).

<Br>

### دریافت پیام

برای دریافت پیام از سرور چابک باید یک `listener` روی رویداد `ChabokMessageReceived` به صورت زیر اضافه کنید:

```javascript
const chabokEmitter = new NativeEventEmitter(NativeModules.AdpPushClient);

chabokEmitter.addListener('ChabokMessageReceived',
    (msg) => {
        const messageJson = this.getMessages() + JSON.stringify(msg);
        alert(messageJson);
    });
```

<Br>

### ارسال پیام

برای ارسال پیام از مشتری به سرور چابک، از متد زیر استفاده کنید:

```javascript
let msg = {  
	userId: "USER_ID", //Required. For public channel set * (wildcard)  
	channel: "CHANNEL_NAME",//Required. Chabok by default subscribed user on default channel  
	content: "Hello World!",//Required.  
  
	sound: "SOUND", //Optional  
	data: {             //Optional  
		key: "VALUE",  
	},  
};

this.chabok.publish(msg);
```

روی اتصال موجود چابک می‌توانید تعداد زیادی رویداد سمت سرور بفرستید، در واقع برای هر درخواست یک اتصال جدید ساخته نمی‌شود. تحویل اطلاعات را در سمت سرور، حتی در شرایطی که کاربر اینترنت ضعیف و یا قطع شده‌ای دارد، تضمین می‌کند. به این ترتیب که کلاینت چابک با استفاده از منطق سعی مجدد خود می‌تواند پیام‌ شما را حتی در شرایط بحرانی یک و فقط یک بار بفرستد.

> `نکته`: برای ارسال پیام به صورت عمومی بر روی یک کانال بجای عبارت `USER_ID` کاراکتر `*` را وارد نمایید و سپس نام کانال خصوصی خود را وارد کنید.

<Br>

### کانال

پیام‌رسانی بین سرور و کلاینت‌ چابک از طریق **کانال‌** انجام می‌شود. کانال یک مفهوم انتزاعی است و نقش یک مجرا را برای ارسال و دریافت پیام ایفا می‌کند. شما با کانال می‌توانید انتشار محتوا با موضوعات مختلف را **جداسازی** کنید. دقت داشته باشید که از [کانال‌ها](react-native-bridge/chabok-messaging.html#کانال) برای گروه‌بندی کاربران **استفاده نکنید** زیرا این دو مکانیزم با هم متفاوت هستند. به عنوان مثال از کانال برای **جداسازی موضوعات محتوا**، **قابلیت چت**، **کامنت** و ... استفاده می‌شود. اما از گروه‌بندی کاربران برای ارسال کمپین یا پیام به گروهی از کاربران که به عنوان مثال در **محدوده مکانی خاص** قرار دارند یا ترکیب آن با ویژگی‌های دیگر مانند کاربرانی که **گوشی‌های اندروید** دارند به کار برده می‌شود.

به طور کلی کانال‌ها به دو دسته **عمومی** (public) و **خصوصی** (private) تقسیم می‌شوند. کانال شخصی برای ارسال پیام شخصی **به یک کاربر به خصوص** است و کانال عمومی برای **انتشار پیام** برای **مجموعه‌ای از کاربران** می‌باشد. عضویت کاربر روی یک کانال برای دریافت پیام‌های ارسالی آن کانال `subscribe` و لغو آن `unsubscribe` نامیده می‌شود. چابک به طور پیش‌فرض هر کاربر را روی **دو کانال شخصی** براساس **شناسه کاربر** (`default`) و **شناسه دستگاه** (`installationId`)  ثبت نام می‌کند. 

> `نکته:` نام کانال به صورت پیش‌فرض به عنوان کانال عمومی در نظر گرفته می‌شود و اگر شما می‌خواهید کاربر را روی کانال شخصی ثبت‌نام کنید کافی است قبل از نام کانال عبارت `/private` را اضافه نمایید.

#### عضویت روی کانال (Subscribe)

برای عضویت در یک کانال می‌توانید از موارد زیر استفاده کنید:

```javascript
//Subscribe on public alert channel.
this.chabok.subscribe("alert");

//Subscribe on private league channel.
this.chabok.subscribe("private/league");
```

#### لغو عضویت از کانال (Unsubscribe)

همچنین برای لغو عضویت در یک کانال می‌توانید از موارد زیر استفاده کنید:

```javascript
//Unsubscribe to alert channel.
this.chabok.unSubscribe("alert");

//Unsubscribe to private league channel.
this.chabok.unSubscribe("private/league");
```
