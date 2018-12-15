---
id: user-management
title: گروه‌بندی کاربران
layout: android
permalink: android/user-management.html
prev: push-notification.html
next: behavior-tracking.html
---

گروه‌بندی کاربران در چابک از طریق موتور پیشرفته **سگمنت** انجام می‌شود. با این ابزار شما می‌توانید کاربرانتان را با قوانین گوناگون به گروه‌های بسیار ریز و دقیقی تقسیم کنید. این قوانین یا فیلترها تنوع گسترده‌ای را در اختیار شما می‌گذارند تا همواره دست بازتری برای ارتباط هدفمند با کاربرانتان داشته باشید. برخی فیلترها در چابک مانند **زمان نصب**، **بازدید**، [**تگ**](/android/user-management.html#تگها)،‌ **نوع دستگاه**، [**موقعیت مکانی**](/android/location-tracking.html)، **نسخه سیستم‌عامل** و ... از پیش تعریف شده‌اند و نیاز به پیاده‌سازی ندارند. علاوه بر آن شما می‌توانید **فیلترهای جدیدی** را بر مبنای رفتار کاربر از [طریق رصد آن‌ها](/android/user-management.html#افزودن-فیلتر-برمبنای-رفتار) اضافه کنید.

دقت داشته باشید که از [کانال‌ها](/android/chabok-messaging.html#کانال) برای گروه‌بندی کاربران **استفاده نکنید** زیرا این دو مکانیزم با هم متفاوت هستند. به عنوان مثال از کانال برای **جداسازی موضوعات محتوا**، **قابلیت چت**، **کامنت** و ... استفاده می‌شود. اما از گروه‌بندی کاربران برای ارسال کمپین یا پیام به گروهی از کاربران که به عنوان مثال یک **تگ خاص** دارند یا ترکیب آن با ویژگی‌های دیگر مانند کاربرانی که **گوشی‌های اندروید** دارند به کار برده می‌شود.

<Br>

### ایجاد و ذخیره سگمنت

ایجاد و ذخیره سگمنت از طریق **پنل** انجام می‌شود. بدین صورت که شما پس از ورود به  پنل باید به بخش **ارسال پیام متنی** بروید و در بخش [گیرندگان](/panel/send.html#مخاطبان-پیام) گزینه سگمنت را انتخاب نمایید. فیلترهای از پیش تعریف شده سگمنت چابک عبارتند از **بازدید**، **[تگ](/android/user-management.html#تگها)**، **نوع دستگاه**، **موقعیت مکانی**، **نسخه برنامه** و **نسخه سیستم عامل**. همچنین آمار لحظه‌ای سگمنت‌ها را می‌توانید از [داشبورد](/panel/dashboard.html#سگمنت) پنل مشاهده کنید.

![مشترک چابک](http://uupload.ir/files/9vyi_segment.png)

#### افزودن فیلتر برمبنای رفتار

> i این قابلیت فقط برای تعرفه‌های **رشد** و **اختصاصی** است. در صورت استفاده از آن‌ در حساب‌های عملیاتی، تعرفه شما به این تعرفه‌ها ارتقا می‌یابد. برای اطلاعات بیشتر در مورد این تعرفه‌ها، به صفحه [قیمت‌‌گذاری](https://chabokpush.com/pricing.html) مراجعه کنید.

شما می‌توانید علاوه بر فیلترهای پیش‌فرض چابک، فیلترهای جدیدی را بر مبنای **رفتار کاربران** به بخش سگمنت پنل اضافه کنید. این رفتارها می‌توانند **افزودن به سبد خرید**، **کامنت**، **لایک**، **پرداخت** و ... باشند. هر کدام از این فیلترها با سه گزینه اولین بار، آخرین بار و تعداد رخ دادن به منوی سگمنت اضافه خواهند شد. برای پیاده‌سازی این کار باید صفحه [رصد رفتار درون‌برنامه‌ای](android/behavior-tracking.html) را با دقت مطالعه نمایید.

<Br>

### تگ‌ها

یکی از قوانین سگمنت، **تگ** یا همان **برچسب‌گذاری کاربران** می‌باشد. به عنوان مثال می‌توانید کاربران خود را بر اساس **جنسیت** برچسب‌گذاری کرده و به آن‌ها پیام خاصی را ارسال کنید و یا به کاربرانی که از پرداخت درون برنامه‌ای شما استفاده می‌کنند یک `Tag` با عنوان `Premium_User` اختصاص دهید.

#### افزودن تگ

با استفاده از متد `addTag`، شما می‌توانید به کاربر یک یا مجموعه‌ای از `Tag`ها اختصاص دهید:

```java
//Add a tag to current user.
AdpPushClient.get().addTag("TAG_NAME", new Callback() {...});

//Add array of tags to current user.
AdpPushClient.get().addTag(new String[]{"TAG_NAME_1", "TAG_NAME_2"}, new Callback() {...});
```
در مثال زیر به کاربر جاری تگ `Premium_User` اختصاص داده شده است
```java
AdpPushClient.get().addTag("Premium_User", new Callback() {  
	@Override  
	public void onSuccess(Object value) {  
		Log.d(TAG, "Successfully added tag to current user devices");  
	}  
  
	@Override  
	public void onFailure(Throwable value) {  
		Log.d(TAG, "Couldn't add tag to current user devices");  
	}  
});
```
اگر عملیات افزودن تگ با موفقیت انجام شود، می‌توانید از طریق پنل چابک، تگ اضافه شده به کاربر را در بخش مشترکین همانند تصویر زیر مشاهده کنید:

![مشترک چابک](http://uupload.ir/files/jse9_addtag.png)

همچنین با توجه به پشتیبانی این متد از آرایه‌ای از تگ‌ها می‌توانید مانند زیر چند تگ را **یکجا** به کاربر اضافه کنید:

```java
String[] tagsName = new String[]{"GUEST","MALE"};  
  
AdpPushClient.get().addTag(tagsName, new Callback() {  
	@Override  
	public void onSuccess(Object value) {  
		Log.d(TAG, "Successfully added tags to current user devices");  
	}  
	@Override  
	public void onFailure(Throwable value) {  
		Log.d(TAG, "Couldn't add tags to current user devices");  
	}  
});
```
> `نکته` : شما می‌توانید کاربران مهمان اپلیکیشنتان را با گذاشتن تگ **GUEST** گروه‌بندی کنید.

#### حذف تگ
با استفاده از متد `removeTag`، می‌توانید یک `Tag` خاص از کاربر جاری را حذف کنید:

```java
AdpPushClient.get().removeTag("TAG_NAME", new Callback() {...});
```
برای نمونه کد زیر تگ `Premium_User` را از کاربر جاری حذف می‌کند.

```java
AdpPushClient.get().removeTag("Premium_User", new Callback() {  
	@Override  
	public void onSuccess(Object value) {  
		Log.d(TAG, "Successfully removed tag to current user devices");  
	}  
  
	@Override  
	public void onFailure(Throwable value) {  
		Log.d(TAG, "Couldn't remove tag to current user devices");  
	}  
});
```

همچنین با توجه به پشتیبانی این متد از آرایه‌ای از تگ‌ها می‌توانید مانند زیر چند تگ را **یکجا** از کاربر حذف کنید:

```java
String[] tagsName = new String[]{"GUEST", "MALE"};

AdpPushClient.get().removeTag(tagsName, new Callback() {
	@Override
	public void onSuccess(Object value) {
		Log.d(TAG, "Remove array of tags onSuccess: called");
	}

	@Override
	public void onFailure(Throwable t) {
		Log.d(TAG, "Remove array of tags onError: called, message: " + t.getMessage());
	}
});
```

> ‌ `نکته:` برای حذف همه تگ‌های یک کاربر می‌توانید در متد بالا، جای نام تگ‌ها را خالی بگذارید.
