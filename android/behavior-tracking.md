---
id: behavior-tracking
title: رصد رفتار درون‌برنامه‌ای
layout: android
permalink: android/behavior-tracking.html
prev: user-management.html
next: location-tracking.html
---

<a href="/android/introducing.html#پلنهای-قیمت-گذاری-چابک"> <span style="background-color: #E5F0FF; height: 30px; color: #000000; display: inline-block; padding: 0px 10px 0px 10px; font-weight: bold; font-size:12px; border-radius: 5px;">پلن شرکتی</span>
<a href="/android/introducing.html#پلنهای-قیمت-گذاری-چابک"> <span style="background-color: #D6E8FF; height: 30px; color: #000000; display: inline-block; padding: 0px 10px 0px 10px; font-weight: bold; font-size:12px; border-radius: 5px;">پلن سازمانی</span>
<a>

شما می‌توانید رفتارهای کاربر را در اپلیکیشن خود به طور لحظه‌ای [رصد کنید](/android/behavior-tracking.html#متد-رصد) و علاوه بر گرفتن بازخورد، براساس این رفتارها آن‌ها را [دسته‌بندی کنید](/panel/dashboard.html#سگمنت) و برایشان [پیام بفرستید](/android/behavior-tracking.html#ارسال-پیام-براساس-رفتار). همچنین [آمار رفتار کاربران](/android/behavior-tracking.html#تحلیل-رفتار) را می‌توانید تحلیل کنید.

<Br>

### متد رصد 

برای رصد رفتار کاربر باید از متد `track` استفاده کنید. این متد دارای مقدار ورودی **نام** و **داده** رفتار (`trackName`,`data`) می‌باشد.

```java
public void track(final String trackName, JSONObject data)
```

> نکته : مقدار `data` در متد `track` یک داده مربوط به رفتار می‌تواند باشد. شما این مقدار را می‌توانید به عنوان `JSONObject` همراه آن در نظر بگیرید.

پس از اعمال کد بالا، رفتار با هر بار رخ دادن به همراه زمان وقوع ذخیره خواهد شد.

 به عنوان مثال می‌خواهید رفتار **خرید‌های پوشاک** از فروشگاه اینترنتی خودتان را رصد کنید. برای ثبت این رفتار کد زیر را با الگوی بالا وارد می‌نماییم.

نمونه:

```java
JSONObject data = new JSONObject();
data.put("clothes_id", 35147652);

AdpPushClient.get().track("purchase-clothing", data);
```

<Br>

### ارسال پیام براساس رفتار

رفتارهایی که شما برای رصد تعیین می‌کنید **به صورت خودکار** در بخش **ارسال پیام متنی پنل در قسمت سگمنت** با سه پارامتر **اولین**، **آخرین** و **تعداد** اضافه خواهند شد. از این طریق می‌توانید براساس آن رفتارها کاربرانتان را **دسته‌بندی** کنید و برایشان **پیام** ارسال کنید. 

در ادامه مثال بالا، اکنون می‌خواهید برای کسانی که پوشاک خریداری کرده‌اند پیامی بفرستید که آن‌ها را از رسیدن کالکشن‌های جدید فصل خبردار کنید.

![عکس مربوطه](http://uupload.ir/files/2oig_track.png)

<Br>

### تحلیل رفتار 

رفتاری که شما تعیین می‌کنید در اپلیکیشنتان رصد شود هم به صورت جمعی از سوی همه کاربران و هم به صورت فردی از سوی هر کاربر در پنل قابل بررسی می‌باشد:

- تب رفتارها در داشبورد:

آمار رفتارهای کاربر هم به صورت **نگاه کلی** (quick stats) و هم به صورت **نمودار** (رخدادها) در ماه جاری قابل تحلیل است.

![عکس مربوطه](http://uupload.ir/files/9d6k_behaviors2.png)

![عکس مربوطه](http://uupload.ir/files/q4pk_behaviors.png)

- تاریخچه رویداد‌ها در جزئیات هر دستگاه:

شما می‌توانید رفتارهای هر کاربر را به صورت لیستی از رویدادها به ترتیب و با جزئیات زمان رخ دادن آن‌ها در بخش مشترکین پنل در قسمت **جزئیات دستگاه** مشاهده کنید.

![عکس مربوطه](http://uupload.ir/files/ftel_logg.png)
