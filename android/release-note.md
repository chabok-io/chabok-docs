---
id: release-note
title: لیست تغییرات کتابخانه
layout: android
permalink: android/release-note.html
prev: features.html
---
### نسخه ۲.۱۰.۰

ارتقا ####
*‌مقدار پیش‌فرض برای حالت `devMode` وجود نداشت که برابر `true` در نظر گرفته شد.
* عدم اتصال مجدد سرویس چابک با روشن شدن صفحه گوشی.
* حذف متد `reRegister`. کافیست به جای این متد از متد `register` استفاده شود.

#### تغییرات

* بهبود connection handling
* افزودن متد `hasProtectedAppSupport`. با استفاده از این متد می‌توان بررسی نمود آیا گوشی استفاده شده برنامه را در لیست  protectedApp قرار می‌دهد یا خیر.
* افزودن متد `showProtectedAppSettings` برای نمایش پیغام مربوط به برنامه‌های محافظت شده


### نسخه ۲.۹.۱

#### تغییرات

* افزودن متد `addCallbackIntent` برای دسترسی به موقعیت مکانی در حالت `kill` و `background`

### نسخه ۲.۹.۰

ارتقا ####

  * عضویت در کانال عمومی به صورت `CHANNEL_NAME` و در کانال خصوصی به صورت `private/CHANNEL_NAME` امکان پذیر است.
* متد `getSubscriptions` لیست کانال‌ها را بر اساس الگوی جدبد برمی‌گرداند.
* `حذف` امضای  زیر از متد publish، بنابراین اگر بخواهید پیام چابک دارای مقدار دیتا باشد باید دیتای خود را به شکل json برای آن ست کنید و از امضایی که پیام چابک می‌گیرد استفاده نمایید.

```java
public void publish(String channel, String text, JSONObject data, Callback clbk) 
```

* تفییر نام متدهای `set/getTopicName` به `set/getChannel`
* تغییر نام متد `enableEventDelivery` به `subscribeEvent`
* پارامتر سوم در متد `publishEvent` از  `stateful` به `live` تغییر نمود


```java
 public void publishEvent(final String event, final JSONObject data, final boolean live)
```

#### تغییرات


* در پیام چابک مقدار پیش‌فرض برای نام کانال برابر default و مقدار پیش‌فرض برای user مقدار * می‌باشد. 
* افرودن یک امضای جدید برای متد publish به صورت زیر:

```java
public void publish(final String user, final String channel, final String text, final com.adpdigital.push.Callback clbk) 
```

* افزودن متد `unsubscribeEvent`
