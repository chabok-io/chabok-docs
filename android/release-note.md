---
id: release-note
title: لیست تغییرات کتابخانه
layout: android
permalink: android/release-note.html
prev: features.html
---

### نسخه ۲.۹.۱ 

#### ارتقا به نسخه جدید

* تغییر در قرارداد جهت عضویت بر روی یک کانال
  * عضویت در کانال عمومی به صورت `CHANNEL_NAME` و در کانال خصوصی به صورت `private/CHANNEL_NAME` امکان پذیر است.
* افرودن یک signature جدید برای متد publish به صورت زیر:

```java
public void publish(final String user, final String channel, final String text, final com.adpdigital.push.Callback clbk) 
```
* `حذف` signature  زیر از متد publish:

```java
public void publish(String channel, String text, JSONObject data, Callback clbk) 
```

* تغییر نام متد `enableEventDelivery` به `subscribeEvent`
* تغییر signature متد `publishEvent` با جایگزینی پارامتر `live` به جای `stateful` به صورت زیر:


```java
//remove this signature
 public void publishEvent(final String event, final JSONObject data, final boolean stateful)

//add new signature
 public void publishEvent(final String event, final JSONObject data, final boolean live)
```
* افزودن متد `unsubscribeEvent`
