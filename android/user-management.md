---
id: user-management
title: گروه‌بندی کاربران
layout: android
permalink: android/user-management.html
prev: push-notification.html
next: behavior-tracking.html
---
 
گروه‌بندی کاربران در چابک از طریق موتور پویای **سگمنت** انجام می‌شود. با این ابزار شما می‌توانید کاربرانتان را با وضع قوانین گوناگون به گروه‌های بسیار ریز و دقیقی تقسیم کنید. این قوانین یا فیلترها تنوع گسترده‌ای را در اختیار شما می‌گذارند تا همواره دست بازتری برای ارتباط هدفمند با کاربرانتان داشته باشید. برخی فیلترها در چابک مانند **بازدید**، **[تگ](https://doc.chabokpush.com/android/user-management.html#تگها)**،‌ **نوع دستگاه**، **[موقعیت مکانی](https://doc.chabokpush.com/android/location-tracking.html)** و نسخه اندروید و ... از پیش تعریف شده‌اند و نیاز به پیاده‌سازی ندارند. علاوه بر آن شما می‌توانید **فیلترهای جدیدی** را بر مبنای رفتار کاربر از [طریق رصد آن‌ها](https://doc.chabokpush.com/android/behavior-tracking.html) اضافه کنید.

<Br>

###  ایجاد و ذخیره سگمنت

تنها راه ایجاد و ذخیره سگمنت از طریق **پنل** است. بدین صورت که شما پس از وارد شدن در پنل به بخش **ارسال پیام متنی** می‌روید و در بخش گیرندگان گزینه [سگمنت](https://doc.chabokpush.com/panel/send.html#%D9%85%D8%AE%D8%A7%D8%B7%D8%A8%D8%A7%D9%86-%D9%BE%DB%8C%D8%A7%D9%85) را انتخاب می‌نمایید.

![مشترک چابک](http://uupload.ir/files/9vyi_segment.png)

#### افزودن فیلتر به سگمنت

شما می‌توانید علاوه بر فیلترهای پیش‌فرض چابک، فیلترهای جدیدی را بر مبنای [رفتار کاربران](https://doc.chabokpush.com/android/behavior-tracking.html) به بخش سگمنت پنل اضافه کنید. این رفتارها می‌توانند افزودن به سبد خرید، کامنت، لایک و ... باشند.

###  تگ‌ها

یکی از قوانین سگمنت، **تگ** یا همان **برچسب‌گذاری کاربران** می‌باشد. به عنوان مثال می‌توانید کاربران خود را بر اساس جنسیت برچسب‌گذاری کرده و براساس جنسیت آنها پیام خاصی را ارسال کنید و یا به کاربرانی که از پرداخت درون برنامه‌ای شما استفاده می‌کنند یک `Tag` با عنوان `Premium_User` اختصاص دهید.

#### افزودن تگ

با استفاده از متد زیر، شما می‌توانید به کاربر یک `Tag` اختصاص دهید:

```java
public void addTag(String tagName, Callback callback)
```
پارامتر اول نام تگ موردنظر و پارامتر دوم یک `Callback` برای بررسی نتیجه این عمل می‌باشد. برای مثال به قطعه کد زیر توجه کنید:

```java
chabok.addTag("Premium_User", new Callback() {
            @Override
            public void onSuccess(Object value) {
                Log.d(TAG, "addTag onSuccess: called");
            }

            @Override
            public void onError(Throwable t) {
                Log.d(TAG, "addTag onError: called, message: " + t.getMessage());
            }
        });
```

کد فوق تگی به نام `Premium_User` را به کاربر فعلی اضافه می‌کند.
اگر عملیات افزودن تگ با موفقیت انجام شود، می‌توانید از طریق پنل چابک، تگ اضافه شده به کاربر را در بخش مشترکین همانند تصویر زیر مشاهده کنید:

![مشترک چابک](http://uupload.ir/files/urem__1x-android_device.png)

همچنین با توجه به پشتیبانی این متد از آرایه‌ای از تگ‌ها می‌توانید مانند زیر چند تگ را یکجا به کاربر اضافه کنید:

```java
String[] tagsName = {"Premium_User", "MALE", "Teenage"};
client.addTag(tagsName, new Callback() {
	@Override
	public void onSuccess(Object value) {
		Log.d(TAG, "add array of tags onSuccess: called");
	}

	@Override
	public void onFailure(Throwable t) {
		Log.d(TAG, "add array of tags onError: called, message: " + t.getMessage());
	}
});
```

#### حذف تگ
با استفاده از متد زیر، می‌توانید یک `Tag` خاص از کاربر را حذف کنید:

```java
chabok.removeTag("Premium_User", new Callback() {
            @Override
            public void onSuccess(Object value) {
                Log.d(TAG, "removeTag onSuccess: called");
            }

            @Override
            public void onError(Throwable t) {
                Log.d(TAG, "removeTag onError: called, message: " + t.getMessage());
            }
        });
```
کدفوق تگی بنام `Premium_User` را از کاربر حذف می کند.

همچنین با توجه به پشتیبانی این متد از آرایه‌ای از تگ‌ها می‌توانید مانند زیر چند تگ را یکجا از کاربر حذف کنید:

```java
String[] tagsName = {"Premium_User", "MALE", "Teenage"};
client.removeTag(tagsName, new Callback() {
	@Override
	public void onSuccess(Object value) {
		Log.d(TAG, "remove array of tags onSuccess: called");
	}

	@Override
	public void onFailure(Throwable t) {
		Log.d(TAG, "remove array of tags onError: called, message: " + t.getMessage());
	}
});
```

>‌ `نکته:` برای حذف همه تگ‌های یک کاربر می‌توانید در متد بالا جای نام تگ‌ها را خالی بگذارید.

