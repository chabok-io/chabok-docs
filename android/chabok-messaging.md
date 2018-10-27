---
id: chabok-messaging
title: پیام چابک
layout: android
permalink: android/chabok-messaging.html
prev: sdk-setup.html
next: push-notification.html

---

چابک برای **ارسال پیام** هنگامی که کاربر به سرور چابک متصل است (باز بودن اپلیکیشن) **از سرویس آنی خود** استفاده می‌کند (پیام چابک) و در صورت عدم اتصال به چابک (بسته بودن اپلیکیشن) اقدام به **ارسال پوش‌نوتیفیکیشن** می‌کند تا کاربر را از داشتن پیام چابک مطلع سازد. پیام‌های چابک از طریق [کانال‌](/android/chabok-messaging.html#کانال) ارسال می‌شوند. بنابراین برای دریافت پیام، باید ابتدا کاربر را در کانال [عضو نمایید](/android/chabok-messaging.html#عضویت-روی-کانال-subscribe). در این قسمت شما می‌توانید پیام [دریافت](/android/chabok-messaging.html#دریافت-پیام-چابک) کنید و برای آن [وضعیت (status) ارسال کنید](/android/chabok-messaging.html#ارسال-وضعیت-برای-پیامهای-دریافتی). همچنین می‌توانید پیام [ارسال](/android/chabok-messaging.html#ارسال-پیام) کنید و از وضعیت [تحویل](/android/chabok-messaging.html#دریافت-گزارش-تحویل-پیام-delivery) آن‌ها مطلع شوید. 

<Br>

### دریافت پیام چابک

با فراخوانی متد `addListener` و پیاده‌سازی متد `onEvent` در کلاس مورد نظر خود (در زیر به آن اشاره شده است) پیام چابک را دریافت کنید. متد `addListener` را در هر کلاسی می‌توانید اضافه کنید.

```java
AdpPushClient.get().addListener(this);
```

 پس از آن با پیاده‌سازی متد زیر می‌توانید پیام‌ها را دریافت نمایید.

```java
public void onEvent(PushMessage message) {
    String channel = message.getChannel();
    String senderId = message.getSenderId();
    JSONObject data = message.getData();

    String body = message.getBody();
    String title = message.getAlertTitle();

    Log.d(TAG, "Got chabok message " + message);
}
```

<Br>

#### ارسال وضعیت برای پیام‌های دریافتی

شما می‌توانید عکس‌العمل کاربر به یک پیام چابک را (خوانده شدن، نادیده گرفته شدن، ...) با استفاده از کلاینت چابک مشخص کنید. 
متد `markAsRead` برای ارسال رویداد خوانده شدن پیام توسط کاربر به سرور می تواند مورد استفاده قرار بگیرد. 
متد `dismiss` نیز می‌تواند برای هر عملی که معنی باز نکردن یا نادیده گرفته شدن پیام را داشته باشد بکار رود. به دو طریق می‌توان این متدها را فراخوانی نمود:

۱- اگر شی پیام چابک در دسترس است به صورت مستقیم متد را فراخوانی کنید:

```java  
pushMessage.markAsRead();
pushMessage.dismiss();
```

۲- اگر فقط شناسه پیام چابک در دسترس است می‌توانید نسخه استاتیک متد‌ها را فراخوانی کنید:

```java  
PushMessage.markAsRead("PUSH_MESSAGE_ID");
PushMessage.messageDismissed("PUSH_MESSAGE_ID");
```

<Br>

### ارسال پیام

متد `publish` برای ارسال پیام از سمت کلاینت به سرور‌های چابک استفاده می‌شود. شما از این مکانیزم علاوه بر پیام‌های شخصی می‌توانید برای ارسال اطلاعات و داده‌های کاربر به سمت سرور خود (به جای ارسال با درخواست‌های کلاسیک HTTP) استفاده کنید.

این متد با **سه امضای متفاوت** وجود دارد که در ادامه به توضیح آن‌ها می‌پردازیم:

- امضای اول برای ارسال یک پیام ساده روی کانال **عمومی** استفاده می‌شود.

```java
AdpPushClient.get().publish("PUBLIC_CHANNEL", "MESSAGE_BODY", new Callback() {...});
```

> `نکته:` نام کانال و شناسه کاربر در متد `publish` باید فاقد کاراکتر `/` باشد.

- امضای دوم برای ارسال یک پیام ساده به کاربر روی کانال **خصوصی** آن، استفاده می‌شود.

```java
AdpPushClient.get().publish("USER_ID", "PRIVATE_CHANNEL", "MESSAGE_BODY", new Callback() {...});
```

> `نکته:` مقدار پیش‌فرض برای نام کانال **خصوصی** برابر `default` می‌باشد.

- امضای سوم برای ارسال یک پیام پیشرفته با جزئیات بیشتر استفاده می‌شود که نمونه کد آن در زیر آمده است:

```java
PushMessage message = new PushMessage();

message.setUser("USER_ID"); //Required. For public channel set * (wildcard)
message.setChannel("CHANNEL"); //Required. Chabok by default subscribed user on default channel
message.setBody("MESSAGE_BODY"); //Required

JSONObject customData = new JSONObject();
customData.put("KEY", "VALUE");
message.setData(customData);//Optional

message.setSound("SOUND"); //Optional
message.setAlertTitle("TITLE"); //Optional

AdpPushClient.get().publish(message, new Callback() {
    @Override
    public void onSuccess(Object o) {
        Log.d(TAG, "onSuccess: Successfully published the message");
    }
    @Override
    public void onFailure(Throwable throwable) {
        Log.d(TAG, "onSuccess: An error happen " + throwable.getMessage());
    }
});
```

> `نکته`: برای ارسال پیام در یک کانال **عمومی** به جای عبارت `USER_ID` باید کاراکتر `*` را وارد نمایید. همچنین برای ارسال پیام در یک کانال‌ **خصوصی** باید `USER_ID` کاربر را وارد کنید. توجه داشته باشید که کاربر هنگامی پیام شما را دریافت خواهد کرد که بر روی کانال تعیین شده، عضویت داشته باشد.

> `نکته:` اگر بخواهید پیام چابک دارای مقدار دیتا باشد باید حتما از این
> امضا استفاده کرده و دیتای خود را به شکل `json` برای  پیام چابک تنظیم کنید.

> `نکته`: در ارسال پیام چابک شما می‌توانید اعلان پیامتان را [شخصی‌سازی](/android/push-notification.html#شخصیسازی-نمایش-و-کلیک-روی-اعلان) کنید. 

<Br>

#### دریافت گزارش تحویل پیام‌‌ (Delivery)

با استفاده از متد `onEvent` می‌توانید، گزارش تایید تحویل برای پیام‌های ارسال را دریافت کنید. برای فعال‌سازی آن باید یک بار متد `enableDeliveryTopic` را فراخوانی کنید تا گزارش‌ پیام‌های ارسالی به شما داده شود. سپس با پیاده‌سازی متد `onEvent` می‌توانید از تحویل پیام‌های ارسالی مطلع شوید.

```java
AdpPushClient.get().enableDeliveryTopic();
```

با استفاده از متد `addListener` کلاسی را که متد `onEvent` را در آن پیاده‌سازی کرده‌اید را به چابک معرفی می‌کنید.

```java
AdpPushClient.get().addListener(this);

public void onEvent(DeliveryMessage delivery) {
    String messageId = delivery.getDeliveredMessageId();
    Date deliveredAt = new Date(delivery.getDeliveredAt());
    String deliveredToUser = delivery.getDeliveredUserId();

    Log.d(TAG, "Got message delivery " + messageId +
               " delivered to " + deliveredToUser +
               " at " + deliveredAt);
}
```

<Br>

### کانال

پیام‌رسانی بین سرور و کلاینت‌ چابک از طریق **کانال‌** انجام می‌شود. کانال یک مفهوم انتزاعی است و نقش یک مجرا را برای ارسال و دریافت پیام ایفا می‌کند. شما با کانال می‌توانید انتشار محتوا با موضوعات مختلف را **جداسازی** کنید. دقت داشته باشید که از [کانال‌ها](android/chabok-messaging.html#کانال) برای گروه‌بندی کاربران **استفاده نکنید** زیرا این دو مکانیزم با هم متفاوت هستند. به عنوان مثال از کانال برای **جداسازی موضوعات محتوا**، **قابلیت چت**، **کامنت** و ... استفاده می‌شود. اما از گروه‌بندی کاربران برای ارسال کمپین یا پیام به گروهی از کاربران که به عنوان مثال در **محدوده مکانی خاص** قرار دارند یا ترکیب آن با ویژگی‌های دیگر مانند کاربرانی که **گوشی‌های اندروید** دارند به کار برده می‌شود.

به طور کلی کانال‌ها به دو دسته **عمومی** (public) و **خصوصی** (private) تقسیم می‌شوند. کانال شخصی برای ارسال پیام شخصی **به یک کاربر به خصوص** است و کانال عمومی برای **انتشار پیام** برای **مجموعه‌ای از کاربران** می‌باشد. عضویت کاربر روی یک کانال برای دریافت پیام‌های ارسالی آن کانال `subscribe` و لغو آن `unsubscribe` نامیده می‌شود. چابک به طور پیش‌فرض هر کاربر را روی یک کانال **شخصی** (براساس شناسه کاربر) ثبت نام می‌کند. 

> `نکته:` نام کانال به صورت پیش‌فرض به عنوان کانال عمومی در نظر گرفته می‌شود و اگر شما می‌خواهید کاربر را روی کانال شخصی ثبت‌نام کنید کافی است قبل از نام کانال عبارت `/private` را اضافه نمایید.

#### عضویت روی کانال (Subscribe)

برای عضویت روی یک کانال می‌توانید از متد `subscribe` استفاده کنید که در زیر به دو امضای این متد اشاره شده است:

- امضای اول کاربر را روی یک کانال عضو می‌کند:

```java
//Subscribe on public alert channel.
AdpPushClient.get().subscribe("alert", new Callback() {...});

//Subscribe on private league channel.
AdpPushClient.get().subscribe("private/league", new Callback() {...});
```

- امضای دوم علاوه بر نام کانال، یک پارامتر دیگر با عنوان `live` که از نوع `boolean` است، نیز دریافت می‌کند. در صورت قرار دادن مقدار `true` در پارامتر `live` به این معنی است که کاربر فقط در حالتی که به چابک **متصل** است پیام‌های این کانال را دریافت کند.

```java
//Subscribe on public alert channel.
AdpPushClient.get().subscribe("alert", true, new Callback() {...});

//Subscribe on private league channel.
AdpPushClient.get().subscribe("private/league", true, new Callback() {...});
```

#### لغو عضویت از کانال (Unsubscribe)

برای لغو عضویت از یک کانال می‌توانید از متد `unsubscribe` استفاده کنید که در زیر به آن اشاره شده است:

```java
//Unsubscribe to alert channel.
AdpPushClient.get().unsubscribe("alert", new Callback() {...});
    
//Unsubscribe to private league channel.
AdpPushClient.get().unsubscribe("private/league", new Callback() {...});
```

