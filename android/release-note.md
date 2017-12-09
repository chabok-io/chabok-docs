---
id: release-note
title: لیست تغییرات کتابخانه
layout: android
permalink: android/release-note.html
prev: features.html
---

### ارتقا به نسخه ۲.۹.۱ 

  * عضویت در کانال عمومی به صورت `CHANNEL_NAME` و در کانال خصوصی به صورت `private/CHANNEL_NAME` امکان پذیر است.
* `حذف` امضای  زیر از متد publish، بنابراین اگر بخواهید پیام چابک دارای مقدار دیتا باشد باید دیتای خود را به شکل json برای آن ست کنید.

```java
public void publish(String channel, String text, JSONObject data, Callback clbk) 
```

* تغییر نام متد `enableEventDelivery` به `subscribeEvent`
* پارامتر سوم در متد `publishEvent` از  `stateful` به `live` تغییر نمود


```java
 public void publishEvent(final String event, final JSONObject data, final boolean live)
```

### تغییرات


* در پیام چابک مقدار پیش‌فرض برای نام کانال برابر default و مقدار پیش‌فرض برای user مقدار * می‌باشد. 
* افرودن یک امضای جدید برای متد publish به صورت زیر:

```java
public void publish(final String user, final String channel, final String text, final com.adpdigital.push.Callback clbk) 
```

* افزودن متد `unsubscribeEvent`
