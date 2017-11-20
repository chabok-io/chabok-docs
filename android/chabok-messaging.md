---
id: chabok-messaging
title: پیام چابک
layout: android
permalink: android/chabok-messaging.html
prev: gradle-setup.html
next: verification.html
---

### دریافت پیام چابک

شما می‌توانید از طریق یک رسیور پیام‌های جدید چابک را دریافت نمایید. برای این منظور کلاسی با همان نامی که در `manifest` استفاده کردید مثل `PushMessageReceiver` ایجاد نمایید که فرزند `WakefulBroadcastReceiver` باشد. 

```java

public class PushMessageReceiver extends WakefulBroadcastReceiver {

    @Override
    public void onReceive(Context context, Intent intent) {
        Bundle messageData = intent.getExtras();
        String channel = messageData.getString(AdpPushClient.PUSH_MSG_RECEIVED_TOPIC);
        String body = messageData.getString(AdpPushClient.PUSH_MSG_RECEIVED_MSG);
        PushMessage push = PushMessage.fromJson(body, channel);
        handleNewMessage(push);
        completeWakefulIntent(intent);
    }


    private void handleNewMessage(PushMessage message) {
        // write your code to handle new message
    }

}

```

### عضویت روی کانال‌ها

عضویت یک کاربر روی یک کانال برای دریافت پیام‌های ارسالی روی آن کانال `subscribe` نامیده می شود و لغو آن `unsubscribe` نامیده می شود. چابک به طور پیش فرض هر کاربر را روی یک کانال شخصی (بر اساس شناسه کاربر) و یک کانال گروهی (همه کاربران) ثبت نام می‌کند.

متد `subscribe`

با دو امضای متفاوت وجود دارد: امضای اول که نام کانال و یک کال‌بک می‌گیرد و روی کانال دریافتی عضویت کاربر را ثبت می‌کند.

```java

chabok.subscribe(CHANNEL_NAME, new Callback() {
    @Override
    public void onSuccess(Object o) {

    }

    @Override
    public void onFailure(Throwable throwable) {

    }
});

```
امضای دوم علاوه بر موارد قبلی یک پارامتر بولین نیز دریافت می‌کند، این پارامتر به این معناست که آیا کاربر فقط در حالتی که به چابک متصل است پیام‌های این کانال را دریافت کند و یا خیر .

```java

chabok.subscribe(CHANNEL_NAME, true, new Callback() {
    @Override
    public void onSuccess(Object o) {

    }

    @Override
    public void onFailure(Throwable throwable) {

    }
});

```

متد `unsubscribe`

نام کانال و یک کال‌بک می‌گیرد و عضویت کاربر را روی کانال دریافتی لغو می‌کند.

```java
chabok.unsubscribe(CHANNEL_NAME, new Callback() {
    @Override
    public void onSuccess(Object o) {

    }

    @Override
    public void onFailure(Throwable throwable) {
    
    }
});

```

### ارسال پیام

متد `Publish` برای ارسال پیام از سمت کلاینت به سرور‌های چابک استفاده می‌شود. شما از این مکانیزم علاوه بر پیام‌های شخصی می‌توانید برای ارسال اطلاعات و داده‌های کاربر به سمت سرور خود (بجای ارسال با درخواست‌های کلاسیک HTTP) استفاده کنید. مزایای این روش در مقایسه با درخواست‌های کلاسیک HTTP به صورت زیر می باشد:

```java

chabok.publish(myPushMessage, new Callback() {
    @Override
    public void onSuccess(Object o) {
    }

    @Override
    public void onFailure(Throwable throwable) {
    
    }

});

```
روی اتصال موجود چابک می‌توانید تعداد زیادی رویداد سمت سرور بفرستید، در واقع برای هر درخواست یک اتصال جدید ساخته نمی‌شود.
تحویل اطلاعات را در سمت سرور، حتی در شرایطی که کاربر اینترنت ضعیف و یا قطع شده‌ای دارد، تضمین می‌کند. به این ترتیب که کلاینت چابک با استفاده از منطق سعی مجدد خود می‌تواند پیام‌ شما را حتی در شرایط بحرانی یک و فقط یک بار بفرستد. بنابراین مصرف باتری بهینه‌تر خواهد بود.



### دریافت رویداد تحویل پیام‌

با استفاده از متد `enableDeliveryTopic`، دریافت رویداد تایید تحویل پیام‌های ارسالی را فعال نمایید. سپس با پیاده‌سازی متد onEvent می‌توانید از تحویل پیام خود مطلع شوید.


> `نکته` :  برای دریافت رویداد لازم است کلاس مورد نظر برای دریافت را بعنوان Listener‌ رویداد تعیین نمایید.

```java

    chabok.enableDeliveryTopic();
    chabok.addListener(this);


public void onEvent(DeliveryMessage message) {

    // write your code here

}

```


### ارسال وضعیت پیام‌های دریافتی

شما می‌توانید عکس‌العمل کاربر به یک پیام چابک را (خوانده شدن، نادیده گرفته شدن، ...) با استفاده از کلاینت چابک مشخص کنید. 
متد `markAsRead` برای ارسال رویداد خوانده شدن پیام توسط کاربر به سرور می تواند مورد استفاده قرار بگیرد. 
متد `dismiss` نیز می‌تواند برای هر عملی که معنی باز نکردن یا نادیده گرفته شدن پیام را داشته باشد بکار رود. به دو طریق می توان این متدها را فراخوانی نمود:

۱. اگر شی پیام چابک در دسترس است به صورت مستقیم متد را فراخوانی کنید:

```java  

pushMessage.markAsRead();
pushMessage.dismiss();

```               

۲. اگر فقط شناسه پیام چابک در دسترس است می‌توانید نسخه استاتیک متد‌ها را فراخوانی کنید:

```java  

PushMessage.markAsRead("PUSH_MESSAGE_ID");
PushMessage.messageDismissed("PUSH_MESSAGE_ID");

```               

