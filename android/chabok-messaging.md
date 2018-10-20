---
id: chabok-messaging
title: پیام چابک
layout: android
permalink: android/chabok-messaging.html
prev: sdk-setup.html
next: push-notification.html
---

چابک برای **ارسال پیام** هنگامی که کاربر به سرور چابک متصل است (باز بودن اپلیکیشن) **از سرویس آنی خود** (پیام چابک) استفاده می‌کند و در صورت عدم اتصال به چابک (بسته بودن اپلیکیشن) اقدام به **ارسال پوش‌نوتیفیکیشن** می‌کند تا کاربر را از داشتن پیام چابک مطلع سازد. پیام‌های چابک از طریق [کانال‌ها](https://doc.chabokpush.com/android/chabok-messaging.html#کانال) ارسال می‌شوند. بنابراین برای دریافت پیام، باید ابتدا کاربر را در کانال [عضو نمایید](https://doc.chabokpush.com/android/chabok-messaging.html#عضویت-روی-کانال-subscribe). در این قسمت شما می‌توانید پیام [دریافت](https://doc.chabokpush.com/android/chabok-messaging.html#دریافت-پیام-چابک) کنید و برای آن [وضعیت (status) ارسال کنید](https://doc.chabokpush.com/android/chabok-messaging.html#ارسال-وضعیت-پیامهای-دریافتی). همچنین می‌توانید پیام [ارسال](https://doc.chabokpush.com/android/chabok-messaging.html#ارسال-پیام) کنید و از [تحویل](https://doc.chabokpush.com/android/chabok-messaging.html#دریافت-گزارش-تحویل-پیام-delivery) آن‌ها مطلع شوید. 

<Br>

### دریافت پیام چابک

با فراخوانی متد `addListener` و پیاده‌سازی متد `onEvent` در کلاس مورد نظر خود (در زیر به آن اشاره شده است) پیام چابک را دریافت کنید. متد `addListener` را در هر کلاسی می‌توانید اضافه کنید.

```java
client.addListener(this);
```

 پس از آن با پیاده‌سازی متد زیر می‌توانید پیام‌ها را دریافت نمایید.

```java
public void onEvent(PushMessage message) {
    Log.d(TAG, "GOT MESSAGE " + message);
    JSONObject data = message.getData();
    if (data != null){
        Log.d(TAG, "The message data is : " + data);
    }
}
```

<Br>

#### ارسال وضعیت پیام‌های دریافتی

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

### ارسال پیام چابک

متد `Publish` برای ارسال پیام از سمت کلاینت به سرور‌های چابک استفاده می‌شود. شما از این مکانیزم علاوه بر پیام‌های شخصی می‌توانید برای ارسال اطلاعات و داده‌های کاربر به سمت سرور خود (به جای ارسال با درخواست‌های کلاسیک HTTP) استفاده کنید.

> `نکته:` مزایای این روش در مقایسه با درخواست‌های کلاسیک HTTP این است که روی اتصال موجود چابک می‌توانید تعداد زیادی رویداد سمت سرور بفرستید، در واقع برای هر درخواست یک اتصال جدید ساخته نمی‌شود.
این امر تحویل اطلاعات را در سمت سرور، حتی در شرایطی که کاربر اینترنت ضعیف و یا قطع شده‌ای دارد، تضمین می‌کند. به این ترتیب که کلاینت چابک با استفاده از منطق سعی مجدد خود می‌تواند پیام‌ شما را حتی در شرایط بحرانی یک و فقط یک بار بفرستد. بنابراین مصرف باتری بهینه‌تر خواهد بود.

این متد با **سه امضای متفاوت** وجود دارد که در ادامه به توضیح آن‌ها می‌پردازیم:


- امضای اول که یک شیء پیام چابک و یک کال‌بک می‌گیرد و پیام دریافتی را منتشر می‌کند. نمونه کد انتشار پیام با این امضاء به صورت زیر می‌باشد:

> `نکته:` اگر بخواهید پیام چابک دارای مقدار دیتا باشد باید حتما از این
> امضا استفاده کرده و دیتای خود را به شکل `json` برای  پیام چابک تنظیم کنید.

```java
PushMessage myPushMessage = new PushMessage();
myPushMessage.setBody("YOUR_MESSAGE_TEXT");

JSONObject jsonObject = new JSONObject();
jsonObject.put("KEY", "VALUE");
myPushMessage.setData(jsonObject);

myPushMessage.setChannel(CHANNEL_NAME);
myPushMessage.setId(UUID.randomUUID().toString());
myPushMessage.setUseAsAlert(true);
myPushMessage.setAlertText("ALERT_TEXT");
myPushMessage.setUser(TO_USER_ID);


chabok.publish(myPushMessage, new Callback() {
    @Override
    public void onSuccess(Object o) {
        //Add some codes to show publish was successfully done
    }

    @Override
    public void onFailure(Throwable throwable) {
        //Add some codes for showing an error happened
    }

});
```

> `نکته:` مقدار پیش‌فرض برای نام کانال برابر `default` و مقدار
> پیش‌فرض برای `user` مقدار `*` می‌باشد. بنابراین با تنظیم و یا عدم
> تنظیم این مقادیر، چهار حالت مختلف برای ارسال پیام پیش می‌آید.

> `نکته:` نام کانال و شناسه کاربر در این متد باید فاقد کاراکتر / باشد.

- امضای دوم برای انتشار پیام روی کانال عمومی  کاربرد دارد که نام کانال، متن پیام و کال‌بک می‌گیرد و یک پبام چابک با مقادیر داده شده ایجاد کرده و آن را روی کانال دریافتی منتشر می‌کند.

```java
chabok.publish(CHANNEL_NAME, TEXT, new Callback() {
    @Override
    public void onSuccess(Object o) {
        //Add some codes to show publish was successfully done
    }

    @Override
    public void onFailure(Throwable throwable) {
        //Add some codes for showing an error happened
    }
});
```


- امضای آخر برای ارسال پیام به شخص روی کانال کاربرد دارد که شناسه کاربر، نام کانال، متن پیام و کال‌بک می‌گیرد و  یک پبام چابک با مقادیر داده شده ایجاد کرده و آن را روی کانال مورد نظر منتشر می‌کند.

```java
chabok.publish(USER, CHANNEL_NAME, TEXT, new Callback() {
    @Override
    public void onSuccess(Object o) {
        //Add some codes to show publish was successfully done
    }

    @Override
    public void onFailure(Throwable throwable) {
        //Add some codes for showing an error happened
    }
});
```

<Br>


#### دریافت گزارش تحویل پیام‌‌ (Delivery)

با استفاده از متد `enableDeliveryTopic`، دریافت رویداد تایید تحویل پیام‌های ارسالی را فعال نمایید. سپس با پیاده‌سازی متد `onEvent` می‌توانید از تحویل پیام خود مطلع شوید.


> `نکته` :  برای دریافت رویداد لازم است کلاس مورد نظر برای دریافت را بعنوان `Listener‌` رویداد تعیین نمایید.

```java
chabok.enableDeliveryTopic();
chabok.addListener(this);

public void onEvent(DeliveryMessage message) {
    // write your code here
}
```

<Br>


### کانال

همانطور که گفته شد پیام‌رسانی بین سرور چابک و کلاینت‌ها روی **کانال‌** انجام می شود. شما با کانال می‌توانید موضوع پیام یا محتوای خود را جداسازی کنید. عضویت یک کاربر روی یک کانال برای دریافت پیام‌های ارسالی روی آن کانال `subscribe` نامیده می‌شود و لغو آن `unsubscribe` نامیده می‌شود. چابک به طور پیش‌فرض هر کاربر را روی یک کانال شخصی (براساس شناسه کاربر) ثبت نام می‌کند.

> `نکته:` نام کانال به صورت پیش‌فرض به عنوان کانال عمومی در نظر گرفته می‌شود و اگر شما می‌خواهید کاربر را روی کانال شخصی ثبت‌نام کنید کافی است قبل از نام کانال عبارت `/private` را اضافه نمایید.

#### عضویت روی کانال (subscribe)

با دو امضای متفاوت وجود دارد:

- امضای اول که نام کانال و یک کال‌بک می‌گیرد و روی کانال دریافتی عضویت کاربر را ثبت می‌کند.

```java
chabok.subscribe(CHANNEL_NAME, new Callback() {
    @Override
    public void onSuccess(Object o) {
        //Add some codes for find out subscribe was successfully done
    }

    @Override
    public void onFailure(Throwable throwable) {
        //Add some codes for showing an error happened
    }
});
```
- امضای دوم علاوه بر موارد قبلی یک پارامتر بولین نیز دریافت می‌کند، این پارامتر به این معناست که آیا کاربر فقط در حالتی که به چابک متصل است پیام‌های این کانال را دریافت کند و یا خیر .

```java
chabok.subscribe(CHANNEL_NAME, true, new Callback() {
    @Override
    public void onSuccess(Object o) {
        //Add some codes for find out subscribe was successfully done
    }

    @Override
    public void onFailure(Throwable throwable) {
        //Add some codes for showing an error happened
    }
});
```

#### لغو عضویت از کانال (unsubscribe)

نام کانال و یک کال‌بک می‌گیرد و عضویت کاربر را روی کانال دریافتی لغو می‌کند.

```java
chabok.unsubscribe(CHANNEL_NAME, new Callback() {
    @Override
    public void onSuccess(Object o) {
        //Add some codes for find out unsubscribe was successfully done
    }

    @Override
    public void onFailure(Throwable throwable) {
        //Add some codes for showing an error happened
    }
});
```
