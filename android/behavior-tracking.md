---
id: behavior-tracking
title: رصد رفتار درون‌برنامه‌ای
layout: android
permalink: android/behavior-tracking.html
prev: user-management.html
next: location-tracking.html
---

شما می‌توانید رفتارهای کاربر را در اپلیکیشن خود به طور لحظه‌ای [رصد کنید](/android/behavior-tracking.html#متد-رصد) و علاوه بر گرفتن بازخورد، براساس این رفتارها آن‌ها را [دسته‌بندی کنید](/panel/dashboard.html#سگمنت) و برایشان [پیام بفرستید](/android/behavior-tracking.html#ارسال-پیام-براساس-رفتار). همچنین [آمار رفتار کاربران](/android/behavior-tracking.html#تحلیل-رفتار) را می‌توانید تحلیل کنید.

<Br>

### متد رصد 

برای رصد رفتار کاربر باید از متد `track` استفاده کنید. این متد دارای مقدار ورودی **نام** و **داده** رفتار (`trackName`,`data`) می‌باشد.

```java
public void track(final String trackName, JSONObject data)
```

> نکته : مقدار `data` در متد `track` یک داده مربوط به رفتار می‌تواند باشد. شما این مقدار را می‌توانید به عنوان `JSONObject` همراه آن در نظر بگیرید.

پس از اعمال کد بالا، رفتار با هر بار رخ دادن به همراه زمان وقوع ذخیره خواهد شد.

 به عنوان مثال می‌خواهید رفتار **افزودن به سبد خرید** از فروشگاه اینترنتی خودتان را رصد کنید. برای ثبت این رفتار کد زیر را با الگوی بالا وارد می‌نماییم.

نمونه:

```java
JSONObject data = new JSONObject();
data.put("value", 35000);
AdpPushClient.get().track("add-to-card", data);
```

>‍‍‍`نکته:` در متد `track` در صورتی که به `value` مقدار عددی بدهید، آن رفتار در سگمنت با پیشوند **آخرین و مجموع** اضافه می‌شود. اما در صورتی که مقدار غیر عددی (string) بدهید، آن رفتار فقط با پیشوند **آخرین** به سگمنت اضافه می‌شود.

> `نکته` : دقت داشته باشید  **type** مقداری که به `value` در متد `track` داده‌اید، را نمی‌توانید تغییر دهید. به این معنی که اگر `boolean` ذخیره کرده‌اید، دیگر **نمی‌توانید** عدد یا `string` دهید. به مثال زیر توجه کنید.

به عنوان مثال اگر مقدار `status` را مانند زیر `boolean` قرار داده باشید:

```java
JSONObject data = new JSONObject();
data.put("status", true);
AdpPushClient.get().track("add-to-card", data);
```

دیگر عدد قرار دادن آن مانند زیر **کار نخواهد کرد:**

```java
JSONObject data = new JSONObject();
data.put("status", 35000);
AdpPushClient.get().track("add-to-card", data);
```

<h3>ارسال مقادیر آرایه‌ای و تاریخ</h3>

شما می‌توانید رفتارهای هر کاربر را به کمک متد زیر، در نسخه **۳.۱.۰ یا بالاتر کتابخانه چابک** فراخوانی کنید.

```java
Bundle data = new Bundle();
data.putStringArray("ProductSelection", new String[]{"Shirt", "Pants"});
data.putString("firstName", "محمدرضا");
data.putString("lastName", "اخوان");
data.putBoolean("scarf", false);
data.putInt("value", 35000);
AdpPushClient.get().track("add-to-card");
```
در صورتی که از نسخه‌های پایین‌تر کتابخانه چابک استفاده می‌کنید، باید متد زیر را به کار ببرید.

```java
JSONObject data = new JSONObject();
try {
    data.put("firstName", "محمدرضا");
    data.put("lastName", "اخوان");
    data.put("value", 35000);
    data.put("scarf", false);
    data.put("ProductSelection", new JSONArray().put("Shirt").put("Pants"));
}catch (JSONException e) {
    e.printStackTrace();
}
AdpPushClient.get().track("add-to-card", data);
```

<Br>

### رصد درآمد (Tracking Revenue)

شما می‌توانید در‌آمدی که کاربران با نشان دادن رفتاری از خود (مانند خرید) تولید می‌کنند را رصد و ذخیره کنید.
این کار باید با متد `trackRevenue` برای **نسخه‌های ۳ به بالا کتابخانه چابک** انجام دهید. به عنوان مثال کاربری خریدی با ارزش ۵۰ هزار تومان را انجام داده است.
 
```java
AdpPushClient.get().trackRevenue(500000);
```

و در صورتی که از **نسخه‌های ۳ به پایین کتابخانه چابک** استفاده می‌کنید، این کار را باید با متد `trackPurchase` انجام دهید. به عنوان مثال کاربر خریدی را با ارزش ۵۰ هزار تومان انجام داده است.

نمونه:

```java
ChabokEvent event = new ChabokEvent(500000, "RIAL");
event.setData(data);               
AdpPushClient.get().trackPurchase("Purchase", event);
```
        
<Br>

### ارسال پیام براساس رفتار

رفتارهایی که شما برای رصد تعیین می‌کنید **به صورت خودکار** در بخش **ارسال پیام متنی پنل در قسمت سگمنت** با سه پارامتر **اولین**، **آخرین** و **تعداد** اضافه خواهند شد. از این طریق می‌توانید براساس آن رفتارها کاربرانتان را **دسته‌بندی** کنید و برایشان **پیام** ارسال کنید. 

در ادامه مثال بالا، اکنون می‌خواهید برای کسانی که پوشاک خریداری کرده‌اند پیامی بفرستید که آن‌ها را از رسیدن کالکشن‌های جدید فصل خبردار کنید.

![عکس مربوطه](http://uupload.ir/files/h69l_behavior-based-push.png)

<Br>

### تحلیل رفتار 

رفتاری که شما تعیین می‌کنید در اپلیکیشنتان رصد شود هم به صورت جمعی از سوی همه کاربران و هم به صورت فردی از سوی هر کاربر در پنل قابل بررسی می‌باشد:

- تب رفتارها در داشبورد:

آمار رفتارهای کاربر هم به صورت **نگاه کلی** (quick stats) و هم به صورت **نمودار** (رخدادها) در ماه جاری قابل تحلیل است.

![عکس مربوطه](http://uupload.ir/files/9d6k_behaviors2.png)

![عکس مربوطه](http://uupload.ir/files/q4pk_behaviors.png)

- تاریخچه رویداد‌ها در جزئیات هر دستگاه:

شما می‌توانید رفتارهای هر کاربر را به صورت لیستی از رویدادها به ترتیب و با جزئیات زمان رخ دادن آن‌ها در بخش مشترکین پنل در قسمت **جزئیات دستگاه** مشاهده کنید.

![عکس مربوطه](http://uupload.ir/files/20aq_activity.png)
