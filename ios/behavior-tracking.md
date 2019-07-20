---
id: behavior-tracking
title: رصد رفتار درون‌برنامه‌ای
layout: ios
permalink: ios/behavior-tracking.html
prev: user-management.html
next: location-tracking.html
---

شما می‌توانید رفتارهای کاربر را در اپلیکیشن خود به طور لحظه‌ای [رصد کنید](/ios/behavior-tracking.html#متد-رصد) و علاوه بر گرفتن بازخورد، براساس این رفتارها آن‌ها را [دسته‌بندی کنید](/panel/dashboard.html#سگمنت) و برایشان [پیام بفرستید](/ios/behavior-tracking.html#ارسال-پیام-براساس-رفتار). همچنین [آمار رفتار کاربران](/ios/behavior-tracking.html#تحلیل-رفتار) را می‌توانید تحلیل کنید.

<Br>

### متد رصد 

برای رصد رفتارها باید از متد `track` استفاده کنید. این متد دارای ورودی **نام** و **داده** رفتار (`YOUR_TRACK_NAME`,`data`) می‌باشد.


```objectivec
//Objective-C
[self.manager track:@"YOUR_TRACK_NAME" data:@{@"KEY":@"VALUE"}];
```
```swift
//Swift
self.manager.track("YOUR_TRACK_NAME", data: ["KEY":"VALUE"])
```

> نکته : مقدار `data` در متد `track` یک داده مربوط به رفتار می‌تواند باشد. شما این مقدار را می‌توانید به عنوان `NSDictionary` همراه رفتار در نظر بگیرید.


پس از اعمال کد بالا، رفتار با هر بار رخ دادن به همراه زمان وقوع ذخیره خواهد شد.

 به عنوان مثال می‌خواهید رفتار **افزودن به سبد خرید** از فروشگاه اینترنتی خودتان را رصد کنید. برای ثبت این رفتار کد زیر را با الگوی بالا وارد می‌نماییم.

نمونه:
```objectivec
//Objective-C
[self.manager track:@"add-to-card" data:@{@"value":@(35000)}];
```
```swift
//Swift
self.manager.track("add-to-card", data: ["value":35000])
```
>‍‍‍`نکته:` در متد `track` در صورتی که به `value` مقدار عددی بدهید، آن رفتار در سگمنت با پیشوند **آخرین و مجموع** اضافه می‌شود. اما در صورتی که مقدار غیر عددی (string) بدهید، آن رفتار فقط با پیشوند **آخرین** به سگمنت اضافه می‌شود.

<Br>

### رصد درآمد (Tracking Revenue)

شما می‌توانید در‌آمدی که کاربران با نشان دادن رفتاری از خود (مانند خرید) تولید می‌کنند را رصد و ذخیره کنید. این کار را باید با متد `trackPurchase` انجام دهید. به عنوان مثال کاربر خریدی را با ارزش ۵۰ هزار تومان انجام داده است.

نمونه:

```objectivec
//Objective-C
ChabokEvent *chabokEvent = [[ChabokEvent alloc]
                                initWithRevenue:20000
                                currency:@"RIAL"];
    
[PushClientManager.defaultManager trackPurchase:@"Purchase"
                                        chabokEvent:chabokEvent];
```
```swift
//Swift
let chabokEvent = ChabokEvent(revenue: 20000, currency: "RIAL")

PushClientManager.default().trackPurchase("Purchase", chabokEvent: chabokEvent)
```

<Br>

### ارسال پیام براساس رفتار

رفتارهایی که شما برای رصد تعیین می‌کنید **به صورت خودکار** در بخش **ارسال پیام متنی پنل در قسمت سگمنت** با سه پارامتر **اولین**، **آخرین** و **تعداد** اضافه خواهند شد. در نتیجه از این راه می‌توانید براساس آن رفتارها **کاربرانتان را دسته‌بندی کنید** و **برایشان پیام ارسال کنید**. 

در ادامه مثال بالا، اکنون می‌خواهید برای کسانی که پوشاک خریداری کرده‌اند پیامی بفرستید که آن‌ها را از رسیدن کالکشن‌های جدید فصل خبردار کنید.

![عکس مربوطه](http://uupload.ir/files/p1lb_behavior-based-push.png)

<Br>

### تحلیل رفتار 

رفتاری که شما برای رصد تعیین می‌نمایید هم به صورت **جمعی** از سوی همه کاربران:

- تب رفتارها در داشبورد

![عکس مربوطه](http://uupload.ir/files/9d6k_behaviors2.png)

![عکس مربوطه](http://uupload.ir/files/q4pk_behaviors.png)

 و هم به صورت **فردی** از سوی هر کاربر قابل بررسی می‌باشد: 

- تاریخچه رویداد‌ها در جزئیات دستگاه

![عکس مربوطه](http://uupload.ir/files/xurb_activity.png)
