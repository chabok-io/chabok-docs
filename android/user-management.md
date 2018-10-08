---
id: user-management
title: گروه‌بندی کاربران
layout: android
permalink: android/user-management.html
prev: notification-handling.html
next: events.html
---
 
به طور کلی  کاربران شما با ۳ روش متناسب با نیازهای مختلف گرو‌بندی می شوند:

[۱- عضویت روی کنال]()

[۲- افزودن تگ]()

[۳- سگمنت]()

### ۱- عضویت روی کانال‌ها

عضویت یک کاربر روی یک کانال برای دریافت پیام‌های ارسالی روی آن کانال `subscribe` نامیده می شود و لغو آن `unsubscribe` نامیده می شود. چابک به طور پیش فرض هر کاربر را روی یک کانال شخصی (بر اساس شناسه کاربر) ثبت نام می‌کند.

> `نکته:` نام کانال به صورت `پیش‌فرض` به عنوان کانال `عمومی` در نظر
> گرفته می‌شود و اگر شما می‌خواهید کاربر را روی کانال `شخصی` ثبت‌نام
> کنید کافی است قبل از نام کانال عبارت `/private` را اضافه نمایید.


متد `subscribe`

با دو امضای متفاوت وجود دارد:

 امضای اول که نام کانال و یک کال‌بک می‌گیرد و روی کانال دریافتی عضویت کاربر را ثبت می‌کند.

```java

chabok.subscribe(CHANNEL_NAME, new Callback() {
    @Override
    public void onSuccess(Object o) {
        //Add some codes for find out subscribe was successfully done
    }

    @Override
    public void onFailure(Throwable throwable) {
        //Add some codes for showing an error happened
    }
});

```

امضای دوم علاوه بر موارد قبلی یک پارامتر بولین نیز دریافت می‌کند، این پارامتر به این معناست که آیا کاربر فقط در حالتی که به چابک متصل است پیام‌های این کانال را دریافت کند و یا خیر.

```java

chabok.subscribe(CHANNEL_NAME, true, new Callback() {
    @Override
    public void onSuccess(Object o) {
        //Add some codes for find out subscribe was successfully done
    }

    @Override
    public void onFailure(Throwable throwable) {
        //Add some codes for showing an error happened
    }
});

```

متد `unsubscribe`

نام کانال و یک کال‌بک می‌گیرد و عضویت کاربر را روی کانال دریافتی لغو می‌کند.

```java
chabok.unsubscribe(CHANNEL_NAME, new Callback() {
    @Override
    public void onSuccess(Object o) {
        //Add some codes for find out unsubscribe was successfully done
    }

    @Override
    public void onFailure(Throwable throwable) {
        //Add some codes for showing an error happened
    }
});

```

### ۲- مدیریت تگ ها

یکی دیگر از ابزارهای دسته‌بندی کاربران، استفاده از `Tag` می باشد. به عنوان مثال می‌توانید کاربران خود را بر اساس جنسیت دسته‌بندی کرده و بر اساس جنسیت آنها پیام خاصی را ارسال کنید و یا به کاربرانی که از پرداخت درون برنامه‌ای شما استفاده می‌کنند یک `Tag` با عنوان Premium_User اختصاص دهید.

#### افزودن تگ
با استفاده از متد زیر، شما می‌توانید به کاربر یک `Tag` اختصاص دهید:

```java
public void addTag(String tagName, Callback callback)
```
پارامتر اول نام تگ موردنظر و پارامتر دوم یک Callback برای بررسی نتیجه این عمل می‌باشد. برای مثال به قطعه کد زیر توجه کنید:

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

کدفوق تگی بنام Premium_User را به کاربر فعلی اضافه می‌کند.
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
کدفوق تگی بنام Premium_User را از کاربر حذف می کند.

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


### ۳- ایجاد سگمنت

