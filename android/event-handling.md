---
id: event-handling
title: مدیریت رویدادها
layout: android
permalink: android/event-handling.html
prev: notification-handling.html
next: location-config.html
---



###  فعال کردن دریافت رویداد
برای دریافت تایید تحویل پیام‌های ارسالی بایستی این ویژگی را توسط متد `enableDeliveryTopic` فعال نمایید. سپس با پیاده‌سازی متد onEvent می‌توانید از تحویل پیام خود مطلع شوید.

```java
chabok.enableDeliveryTopic();
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

### دریافت وضعیت برنامه

جهت بررسی وضعیت برنامه در حال اجرا می توانید از این امکان استفاده کنید.
متدهای قابل استفاده:
```java

chabok.isBackground()
chabok.isForeground()
```

نمونه:

```java             
if(chabok.isForeground()) {
// Do something on application foreground
}
```                

### انتشار رویداد با داده های دلخواه

با متدهای زیر می توانید رویداد های داخل اپ را منتشر کنید:

>نکته : پارامتر ورودی live به این معنی است: کسانی این رویداد را دریافت خواهند نمود که در آن لحظه Online باشند.

```java
public void publishEvent(final String event, final JSONObject data)
public void publishEvent(final String event, final JSONObject data, final boolean stateful)
public void publishEvent(final String event, final JSONObject data,
final boolean live, final boolean stateful)

```
می توانید با استفاده از متدهای فوق یک رویداد بانام event که یک رشته متنی می باشد را با داده ای از نوع JSONObject منتشر کنید، مانند نمونه زیر:

```java
try {
JSONObject data = new JSONObject();
data.put("lat", location.getLatitude());
data.put("lng", location.getLongitude());
data.put("ts", location.getTime());
AdpPushClient.get().publishEvent("geo", data, false, true);
} catch (JSONException e) {
Logger.e(TAG, "Cant publish geo location event ", e);
}
```
به کمک نمونه کد فوق با دریافت هر گزارش مکان می توانید موقعیت مکانی کاربر را ارسال نمایید.

### دریافت رویداد
برای دریافت رویداد بایستی کلاس مورد نظر برای دریافت را بعنوان Listener‌ رویداد تعیین نمایید، مانند نمونه زیر:

```java
AdpPushClient.get().addListener(MyActivity.this);
```

سپس در متد onEvent‌به شکل زیر می توانید رویداد مورد نظر را دریافت کنید:

```java
public void onEvent(final EventMessage message) {
if (message != null ) {
runOnUiThread(new Runnable() {
@Override
public void run() {
Log.d(TAG, "run: onEvent" + message.getName());
// get data: JSONObject data = message.getData();
}
});
}
}
```
داده ارسال شده توسط فرستنده بصورت یک JSONObject از متد `getData` قابل بازیابی است.
