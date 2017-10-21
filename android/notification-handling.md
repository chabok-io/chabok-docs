---
id: notification-handling
title: مدیریت اعلان‌ها
layout: android
permalink: android/notification-handling.html
prev: chabok-messaging.html
next: event-handling.html
---

### شخصی‌سازی نمایش اعلان

کلاینت چابک به طور پیش‌فرض برای پیام‌های دریافتی اعلان (`نوتیفیکیشن`) نمایش می‌دهد. درصورت تمایل به شخصی‌سازی نوتیفیکیشن‌ها، کد مورد نظر خود را می‌توانید به کلاینت اضافه کنید.
برای این منظور لازم است یک شیء از نوع `NotificationHandler` نمونه سازی کنید، مانند نمونه زیر:

```java                
NotificationHandler myHandler = new NotificationHandler() {

    @Override
    public Class getActivityClass(ChabokNotification chabokNotification) {
    // return preferred activity class to be opened on this message's notification
    return YOUR_MAIN_ACTIVITY_CLASS.class;
    }

    @Override
    public boolean buildNotification(ChabokNotification chabokNotification, NotificationCompat.Builder builder) {
    // use builder to customize the notification object
    // return false to prevent this notification to be shown to the user, otherwise true
    return false;
    }
};

chabok.addNotificationHandler(myHandler);

```               

در متد `buildNotification` با پارامترهای ورودی متد یعنی `ChabokNotification` و `NotificationCompat.Builder` می توانید نوتیفیکیشن دریافتی را به دلخواه تغییر داده و درباره نمایش آن تصمیم بگیرید. در صورتی که مقدار بازگشتی از این متد `true` باشد، کتابخانه با توجه به تنظیمات مربوطه نوتیفیکیشن را نمایش می دهد ولی اگر مقدار بازگشتی `false` باشد بدین معنی است که شما خود نمایش را به عهده می گیرید.
