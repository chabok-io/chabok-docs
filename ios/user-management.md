---
id: user-management
title: گروه‌بندی کاربران
layout: ios
permalink: ios/user-management.html
prev: push-notification.html
next: behavior-tracking.html
---

<a href="/ios/introducing.html#پلنهای-قیمت-گذاری-چابک"> <span style="background-color: #E0FFFF; height: 30px; color: #000000; display: inline-block; padding: 0px 10px 0px 10px; font-weight: bold; font-size:12px; border-radius: 5px;">پلن استارتاپی</span>
<a href="/ios/introducing.html#پلنهای-قیمت-گذاری-چابک"> <span style="background-color: #E5F0FF; height: 30px; color: #000000; display: inline-block; padding: 0px 10px 0px 10px; font-weight: bold; font-size:12px; border-radius: 5px;">پلن شرکتی</span>
<a href="/ios/introducing.html#پلنهای-قیمت-گذاری-چابک"> <span style="background-color: #D6E8FF; height: 30px; color: #000000; display: inline-block; padding: 0px 10px 0px 10px; font-weight: bold; font-size:12px; border-radius: 5px;">پلن سازمانی</span>
<a>
	
گروه‌بندی کاربران در چابک از طریق موتور پیشرفته **سگمنت** انجام می‌شود. با این ابزار شما می‌توانید کاربرانتان را با قوانین گوناگون به گروه‌های بسیار ریز و دقیقی تقسیم کنید. این قوانین یا فیلترها تنوع گسترده‌ای را در اختیار شما می‌گذارند تا همواره دست بازتری برای ارتباط هدفمند با کاربرانتان داشته باشید. برخی فیلترها در چابک مانند **زمان نصب**، **بازدید**، [**تگ**](/ios/user-management.html#تگها)،‌ **نوع دستگاه**، [**موقعیت مکانی**](/ios/location-tracking.html)، **نسخه سیستم‌عامل** و ... از پیش تعریف شده‌اند و نیاز به پیاده‌سازی ندارند. علاوه بر آن شما می‌توانید **فیلترهای جدیدی** را بر مبنای رفتار کاربر از [طریق رصد آن‌ها](/ios/user-management.html#افزودن-فیلتر-برمبنای-رفتار) اضافه کنید.

دقت داشته باشید که از [کانال‌ها](/ios/chabok-messaging.html#کانال) برای گروه‌بندی کاربران **استفاده نکنید** زیرا این دو مکانیزم با هم متفاوت هستند. به عنوان مثال از کانال برای **جداسازی موضوعات محتوا**، **قابلیت چت**، **کامنت** و ... استفاده می‌شود. اما از گروه‌بندی کاربران برای ارسال کمپین یا پیام به گروهی از کاربران که به عنوان مثال یک **تگ خاص** دارند یا ترکیب آن با ویژگی‌های دیگر مانند کاربرانی که **گوشی‌های آیفون** دارند به کار برده می‌شود.

<Br>

### ایجاد و ذخیره سگمنت

ایجاد و ذخیره سگمنت از طریق **پنل** انجام می‌شود. بدین صورت که شما پس از ورود به  پنل باید به بخش **ارسال پیام متنی** بروید و در بخش [گیرندگان](/panel/send.html#مخاطبان-پیام) گزینه سگمنت را انتخاب نمایید. فیلترهای از پیش تعریف شده سگمنت چابک عبارتند از **بازدید**، **[تگ](/ios/user-management.html#تگها)**، **نوع دستگاه**، **موقعیت مکانی**، **نسخه برنامه** و **نسخه سیستم عامل**. همچنین آمار لحظه‌ای سگمنت‌ها را می‌توانید از [داشبورد](/panel/dashboard.html#سگمنت) پنل مشاهده کنید.

![مشترک چابک](http://uupload.ir/files/9vyi_segment.png)

#### افزودن فیلتر برمبنای رفتار

<a href="/ios/introducing.html#پلنهای-قیمت-گذاری-چابک"> <span style="background-color: #E5F0FF; height: 30px; color: #000000; display: inline-block; padding: 0px 10px 0px 10px; font-weight: bold; font-size:12px; border-radius: 5px;">پلن شرکتی</span>
<a href="/ios/introducing.html#پلنهای-قیمت-گذاری-چابک"> <span style="background-color: #D6E8FF; height: 30px; color: #000000; display: inline-block; padding: 0px 10px 0px 10px; font-weight: bold; font-size:12px; border-radius: 5px;">پلن سازمانی</span>
<a>

شما می‌توانید علاوه بر فیلترهای پیش‌فرض چابک، فیلترهای جدیدی را بر مبنای **رفتار کاربران** به بخش سگمنت پنل اضافه کنید. این رفتارها می‌توانند **افزودن به سبد خرید**، **کامنت**، **لایک**، **پرداخت** و ... باشند. هر کدام از این فیلترها با سه گزینه اولین بار، آخرین بار و تعداد رخ دادن به منوی سگمنت اضافه خواهند شد. برای پیاده‌سازی این کار باید صفحه [رصد رفتار درون‌برنامه‌ای](/ios/behavior-tracking.html) را با دقت مطالعه نمایید.

<Br>

### تگ‌ها

یکی از قوانین سگمنت، **تگ** یا همان **برچسب‌گذاری کاربران** می‌باشد. به عنوان مثال می‌توانید کاربران خود را بر اساس **جنسیت** برچسب‌گذاری کرده و به آن‌ها پیام خاصی را ارسال کنید و یا به کاربرانی که از پرداخت درون برنامه‌ای شما استفاده می‌کنند یک `Tag` با عنوان `Premium_User` اختصاص دهید.

#### افزودن تگ

با استفاده از متد `addTag`، شما می‌توانید به کاربر یک یا مجموعه‌ای از `Tag`ها اختصاص دهید:

```objectivec
//Objective-C:

[self.manager addTag:@"Premium_User"];
```
```swift
//Swift:

self.manager?.addTag("Premium_User")
```
برای اختصاص چند تگ به طور یکجا به کاربر از متد زیر استفاده کنید:

```objectivec
//Objective-C
[self.manager addTags:@[@"Premium_User",@"MALE",@"Teenage"] success:^(NSInteger count) {
            NSLog(@"Add tags to %zd devices", count);
        } failure:^(NSError *error) {
            NSLog(@"Error to adding tags %@",error);
        }];
```
```swift
//Swift
manager.addTags(["Premium_User", "MALE", "Teenage"], success: { count in
    print("Add tags to \(count) devices")
}, failure: { error in
    if let anError = error {
        print("Error to adding tags \(anError)")
    }
})
```
همچنین می‌توانید با استفاده از `overload` دیگر این متد، از افزودن و یا خطا در عملیات با خبر شوید:

```objectivec
//Objective-C:

[self.manager addTag:@"Premium_User" success:^(NSInteger count) {
        NSLog(@"%@ tag was assign to '%@' user with [%zd] devices",@"Premium_User",self.manager.userId,count);
    } failure:^(NSError *error) {
        NSLog(@"An error happend adding tag ...");
    }];
```
```swift
//Swift:

self.manager?.addTag("Premium_User",
        success: {(_ count: Int) -> Void in
	                 print("\("Premium_User") tag was assign to '\(self.manager?.userId)' user with [\(count)] devices")
},
        failure: {(_ error: Error?) -> Void in
	                 print("An error happend adding tag ...")
})
```
اگر عملیات افزودن تگ با موفقیت انجام شود، می‌توانید از طریق پنل چابک، تگ اضافه شده به کاربر را در بخش مشترکین همانند تصویر زیر مشاهده کنید :

![مشترک چابک](http://uupload.ir/files/ujp8__1x-ios_device.png)

> `نکته` : شما می‌توانید کاربران مهمان اپلیکیشنتان را با گذاشتن تگ **GUEST** گروه‌بندی کنید.

#### حذف تگ

با استفاده از متد `removeTag`، می‌توانید یک `Tag` خاص از کاربر جاری را حذف کنید. برای نمونه کد زیر تگ `Premium_User` را از کاربر جاری حذف می‌کند:


```objectivec
//Objective-C:

[self.manager removeTag:@"Premium_User"];
```
```swift
//Swift:

self.manager?.removeTag("Premium_User")
```

همچنین با توجه به پشتیبانی این متد از آرایه‌ای از تگ‌ها می‌توانید مانند زیر چند تگ را **یکجا** از کاربر حذف کنید:


```objectivec
//Objective-C
[self.manager removeTags:@[@"Premium_User",@"MALE",@"Teenage"] success:^(NSInteger count) {
            NSLog(@"Remove tags to %zd devices", count);
        } failure:^(NSError *error) {
            NSLog(@"Error to removing tags %@",error);
        }];
```
```swift
//Swift
manager.removeTags("Premium_User", "MALE", "Teenage"], success: { count in
    print("Remove tags to \(count) devices")
}, failure: { error in
    if let anError = error {
        print("Error to removing tags \(anError)")
    }
})
```

> ‌ `نکته:` برای حذف همه تگ‌های یک کاربر می‌توانید در متد بالا، جای نام تگ‌ها را خالی بگذارید.
