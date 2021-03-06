---
id: behavior-tracking
title: رصد رفتار درون‌برنامه‌ای
layout: cordova
permalink: cordova/behavior-tracking.html
prev: custom-data.html
next: features.html
---

شما می‌توانید رفتارهای کاربر را در اپلیکیشن خود به طور لحظه‌ای [رصد کنید](/cordova/behavior-tracking.html#متد-رصد) و علاوه بر گرفتن بازخورد، براساس این رفتارها آن‌ها را [دسته‌بندی کنید](/panel/dashboard.html#سگمنت) و برایشان [پیام بفرستید](/cordova/behavior-tracking.html#ارسال-پیام-براساس-رفتار). همچنین [آمار رفتار کاربران](/cordova/behavior-tracking.html#تحلیل-رفتار) را می‌توانید تحلیل کنید.

<Br>


### متد رصد 

برای رصد رفتار باید از متد `track` استفاده کنید. این متد دارای ورودی **نام** و **داده** (`YOUR_TRACK_NAME`,`data`) می‌باشد.


```javascript
chabok.track('YOUR_TRACK_NAME', {"KEY":"VALUE"})
```

> نکته : مقدار `data` در متد `track` یک داده مربوط به رویداد‌ می‌تواند باشد. شما این مقدار را می‌توانید به عنوان `Object` همراه رویداد‌ در نظر بگیرید.


پس از اعمال کد بالا، رفتار با هر بار رخ دادن به همراه زمان وقوع ذخیره خواهد شد.

 به عنوان مثال می‌خواهید رفتار **افزودن به سبد خرید** از فروشگاه اینترنتی خودتان را رصد کنید. برای ثبت این رفتار کد زیر را با الگوی بالا وارد می‌نماییم.

نمونه:

```javascript
const data = {
  value: 35000
}

chabok.track('add-to-card', data)
```

>‍‍‍`نکته:` در متد `track` در صورتی که به `value` مقدار عددی بدهید، آن رفتار در سگمنت با پیشوند **آخرین و مجموع** اضافه می‌شود. اما در صورتی که مقدار غیر عددی (string) بدهید، آن رفتار فقط با پیشوند **آخرین** به سگمنت اضافه می‌شود.

> `نکته` : دقت داشته باشید  **type** مقداری که به `value` در متد `track` داده‌اید، را نمی‌توانید تغییر دهید. به این معنی که اگر `boolean` ذخیره کرده‌اید، دیگر **نمی‌توانید** عدد یا `string` دهید. به مثال زیر توجه کنید.

به عنوان مثال اگر مقدار `status` را مانند زیر `boolean` قرار داده باشید:


```javascript
const data = {
  status: true
}

chabok.track('add-to-card', data)
```

دیگر عدد قرار دادن آن مانند زیر **کار نخواهد کرد:**


```javascript
const data = {
  status: 35000
}

chabok.track('add-to-card', data)
```

<br>

### ارسال مقادیر آرایه‌ای و تاریخ

شما می‌توانید رفتارهای هر کاربر را به کمک متد زیر، در نسخه **۱.۲.۰ به بالا SDK چابک** فراخوانی کنید.

```javascript
chabok.track('add-to-card', {
          firstname: 'Farbod',
          lastname: 'Ahmadi',
          age: 28,
          married: true,
          graduatedAt: new Date()
        })
```

<Br>

### رصد درآمد (Tracking Revenue)

شما می‌توانید در‌آمدی که کاربران با نشان دادن رفتاری از خود (مانند خرید) تولید می‌کنند را رصد و ذخیره کنید.
این کار باید با متد `trackPurchase` برای **نسخه‌های ۱.۲.۰ به بالا SDK چابک** انجام دهید. به عنوان مثال کاربری خریدی با ارزش ۵۰ هزار تومان را انجام داده است.

```javascript
const eventData = {
    revenue: 500000,
    currency: 'RIAL',
    data: {
        purchaseDate: new Date()
    }
}
chabok.trackPurchase('Purchase', eventData)
```

>  نکته : با پیاده‌سازی متدهای بالا می‌توانید **مجموع درآمد** را در [پروفایل کاربر(بخش جزییات و کارت‌ رویداد)](/panel/users.html#%D9%BE%D8%B1%D9%88%D9%81%D8%A7%DB%8C%D9%84-%DA%A9%D8%A7%D8%B1%D8%A8%D8%B1)، [دستگاه (کارت رویداد)](/panel/users.html#%D8%AC%D8%B2%D8%A6%DB%8C%D8%A7%D8%AA-%D8%AF%D8%B3%D8%AA%DA%AF%D8%A7%D9%87) و [سگمنت (فیلتر درآمد)](/panel/segment.html#%D8%AF%D8%B1%D8%A2%D9%85%D8%AF) پنل مشاهده کنید.


<Br>

### ارسال پیام براساس رفتار

رفتارهایی که شما برای رصد تعیین می‌کنید **به صورت خودکار** در بخش **ارسال پیام متنی پنل در قسمت سگمنت** با سه پارامتر **اولین**، **آخرین** و **تعداد** اضافه خواهند شد. در نتیجه از این راه می‌توانید براساس آن رفتارها **کاربرانتان را دسته‌بندی کنید** و **برایشان پیام ارسال کنید**. 

در ادامه مثال بالا، اکنون می‌خواهید برای کسانی که پوشاک خریداری کرده‌اند پیامی بفرستید که آن‌ها را از رسیدن کالکشن‌های جدید فصل خبردار کنید.

![عکس مربوطه](http://uupload.ir/files/2oig_track.png)

### تحلیل رفتار 

رفتاری که شما تعیین می‌کنید در اپلیکیشنتان رصد شود هم به صورت جمعی از سوی همه کاربران و هم به صورت فردی از سوی هر کاربر در پنل قابل بررسی می‌باشد:

- تب رفتارها در داشبورد:

آمار رفتارهای کاربر هم به صورت **نگاه کلی** (quick stats) و هم به صورت **نمودار** (رخدادها) در ماه جاری قابل تحلیل است.

![عکس مربوطه](http://uupload.ir/files/9d6k_behaviors2.png)

![عکس مربوطه](http://uupload.ir/files/q4pk_behaviors.png)

- تاریخچه رفتارها در جزئیات هر دستگاه:

شما می‌توانید رفتارهای هر کاربر را به صورت لیستی از رفتارها به ترتیب و با جزئیات زمان رخ دادن آن‌ها در بخش مشترکین پنل در قسمت **جزئیات دستگاه** مشاهده کنید.

![عکس مربوطه](http://uupload.ir/files/ftel_logg.png)

<br><br>

### تست رصد رفتار (ایونت)
---

#### ۱- آیا ایونت‌ها به درستی رصد و در پروفایل پروفایل کاربر و جزئیات دستگاه در پنل نمایش داده می‌شوند؟

پس از [پیاده‌سازی](/cordova/behavior-tracking.html) ایونت‌ها، می‌توانید آن را در **پروفایل کاربران** بلافاصله **بعد وقوع ایونت** بررسی کنید.

<br>

![enter image description here](http://uupload.ir/files/u9ki_event-test-in-user-profile.png)

<br>

####  ۲- آیا در سگمنت نام و نوع داده ایونت (تحت عنوان رفتار کاربر) قابل نمایش است و کاربران به درستی فیلتر می‌شوند؟
به کمک سگمنت می‌توانید  کاربران  را به همراه تمامی رویدادهایی که در اپلیکیشن اتفاق افتاده است را (مثل خرید) مشاهده و دسته‌بندی کنید.

<br>

![enter image description here](http://uupload.ir/files/m57a_event-test-in-segment.png)
