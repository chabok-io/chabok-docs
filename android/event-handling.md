---
id: event-handling
title: مدیریت رویدادها
layout: android
permalink: android/event-handling.html
prev: customize.html
next: location-tracking.html
---

## ارسال وضعیت پیام‌های دریافتی

شما می‌توانید عکس‌العمل کاربر به یک پیام چابک را (خوانده شدن، نادیده گرفته شدن، ...) با استفاده از کلاینت چابک مشخص کنید. 
متد markAsRead برای ارسال رویداد خوانده شدن پیام توسط کاربر به سرور می تواند مورد استفاده قرار بگیرد. 
متد dismiss نیز می‌تواند برای هر عملی که معنی باز نکردن یا نادیده گرفته شدن پیام را داشته باشد بکار رود. به دو طریق می توان این متدها را فراخوانی نمود:
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
            
## دریافت وضعیت برنامه

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
            




