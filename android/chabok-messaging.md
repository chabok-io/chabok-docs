---
id: chabok-messaging
title: پیام چابک
layout: android
permalink: android/chabok-messaging.html
prev: gradle-setup.html
next: notification-handling.html
---

## دریافت پیام چابک

شما می‌توانید از طریق یک رسیور پیام‌های جدید چابک را دریافت نمایید. برای این منظور کلاسی با همان نامی که در manifest استفاده کردید مثل PushMessageReceiver ایجاد نمایید که فرزند WakefulBroadcastReceiver باشد. 

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


## عضویت روی کانال‌ها

عضویت یک کاربر روی یک کانال برای دریافت پیام‌های ارسالی روی آن کانال subscribe نامیده می شود و لغو آن unsubscribe نامیده می شود. چابک به طور پیش فرض هر کاربر را روی یک کانال شخصی (بر اساس شناسه کاربر) و یک کانال گروهی (همه کاربران) ثبت نام می‌کند.

## ارسال پیام

متد Publish برای ارسال پیام از سمت کلاینت به سرور‌های چابک استفاده می‌شود. شما از این مکانیزم علاوه بر پیام‌های شخصی می‌توانید برای ارسال اطلاعات و داده‌های کاربر به سمت سرور خود (بجای ارسال با درخواست‌های کلاسیک HTTP) استفاده کنید. مزایای این روش در مقایسه با درخواست‌های کلاسیک HTTP به صورت زیر می باشد:

روی اتصال موجود چابک می‌توانید تعداد زیادی رویداد سمت سرور بفرستید، در واقع برای هر درخواست یک اتصال جدید ساخته نمی‌شود.
تحویل اطلاعات را در سمت سرور، حتی در شرایطی که کاربر اینترنت ضعیف و یا قطع شده‌ای دارد، تضمین می‌کند. به این ترتیب که کلاینت چابک با استفاده از منطق سعی مجدد خود می‌تواند پیام‌ شما را حتی در شرایط بحرانی یک و فقط یک بار بفرستد.
بهینه تر در مصرف باطری.

