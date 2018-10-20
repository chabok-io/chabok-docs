---
id: event-handling
title: رویدادهای آنی
layout: android
permalink: android/event-handling.html
prev: user-management.html
next: behavior-tracking.html
---

با چابک شما علاوه بر پیام می‌توانید [رویدادهای دلخواه خود را منتشر کنید](https://doc.chabokpush.com/android/event-handling.html#انتشار-رویداد-با-دادههای-دلخواه). سپس می‌توانید با `subscribeEvent` روی یک رویداد، [هر بار وقوع آن را دریافت کنید](https://doc.chabokpush.com/android/event-handling.html#دریافت-رویداد). در صورتی هم که دیگر نمی‌خواستید آن رویداد را دریافت کنید [می‌توانید با `unsubscribeEvent` آن را لغو کنید](https://doc.chabokpush.com/android/event-handling.html#غیرفعال-کردن-دریافت-رویداد).

<Br>

### انتشار رویداد

با متدهای زیر می‌توانید رویدادهای داخل برنامه را منتشر کنید:


```java
public void publishEvent(final String event, final JSONObject data)
public void publishEvent(final String event, final JSONObject data, final boolean live)
public void publishEvent(final String event, final JSONObject data,
final boolean live, final boolean stateful)
```

>`نکته` : پارامتر ورودی `live` به این معناست که کاربرانی که به چابک متصل هستند این رویداد را دریافت خواهند نمود.

می توانید با استفاده از متدهای فوق یک رویداد با نام `event` که یک رشته متنی می باشد را با داده‌ای از نوع `JSONObject` منتشر کنید، مانند نمونه زیر:

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
به کمک نمونه کد فوق با دریافت هر گزارش مکان می‌توانید موقعیت مکانی کاربر را ارسال نمایید.
در نمونه فوق رویدادی بنام `geo` با داده‌هایی که در شیٔ `data‌` بصورت یک `JSONObject‌` قرار می‌گیرد، منتشر می‌شود.

### دریافت رویداد
برای دریافت رویداد لازم است کلاس مورد نظر برای دریافت را بعنوان `Listener`‌ رویداد تعیین نمایید و با استفاده از متد `subscribeEvent` روی رویداد موردنظر `subscribe` کنید، به قطعه کد زیر توجه نمایید:

```java
AdpPushClient.get().addListener(MyActivity.this);


chabok.subscribeEvent(EVENT_NAME, new Callback() {
    @Override
    public void onSuccess(Object value) {

    }

    @Override
    public void onFailure(Throwable value) {

    }
});
```

متد `subscribeEvent` با امضاهای زیر موجود است که بر اساس نیاز خود می‌توانید آن‌ها را فراخوانی نمایید:

```java
public void subscribeEvent(String eventName, final Callback clbk)
public void subscribeEvent(String eventName, boolean live, final Callback clbk)
public void subscribeEvent(String eventName, String installationId, final Callback clbk)
public void subscribeEvent(final String eventName, final String installationId, final boolean live, final Callback clbk)
```
> `نکته :` پارامتر ورودی `live` به این معناست که کاربرانی که به چابک
> متصل هستند این رویداد را دریافت خواهند نمود، مقدار
> `installiationId`  نیز برابر شناسه منحصر به فرد دستگاه کاربر می‌باشد و
> از طریق متد  `getInstallationId` به دست می‌آید.

در صورت استفاده از امضاهای حاوی `installiationId` تمامی رویدادهای مربوط به نام وارد شده به عنوان `eventName` که توسط آن دستگاه منتشر می‌شود را دریافت خواهید نمود.

پس از ثبت‌نام برای دریافت رویداد،‌ با استفاده از متد `onEvent` ‌می‌توانید رویداد مورد نظر را دریافت کنید:

```java
public void onEvent(final EventMessage message) {
        if (message != null ) {
            runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    Log.d(TAG, "run: onEvent" + message.getName());
                    
                    JSONObject data = message.getData();
                }
            });
        }
    }
```
داده ارسال شده توسط فرستنده بصورت یک `JSONObject` از متد `getData` قابل بازیابی است.

### غیرفعال کردن دریافت رویداد
 برای غیرفعال کردن دریافت رویداد کافی است متد `unsubscribeEvent`  را که با دو امضای مختلف وجود دارد،  برا اساس نیاز خود فراخوانی نمایید.


```java
public void unsubscribeEvent(String eventName, final Callback clbk)
public void unsubscribeEvent(final String eventName, final String installationId, final Callback clbk)
```



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
### مفهوم رویداد‌

رفتار کاربران را رویداد‌هایی تعیین می‌کنند که آن‌ها در اپلیکیشنتان رقم می‌زنند. این رویداد‌ها می‌توانند هر تعامل و اتفاقی که در اپ شما رخ می‌دهد، باشند. به عنوان مثال **کلیک روی لینک**، **لایک کردن**، **کامنت نوشتن**، **اضافه کردن محصولی به سبد خرید**، **انجام خرید** و ... همگی به عنوان رویداد‌ حساب می‌شوند. در اینجا شما می‌توانید با توجه به نیازتان این رویداد‌ها را برای رصد تعریف کنید (**custom events**).
