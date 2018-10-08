---
id: notification-handling
title: مدیریت اعلان‌ها
layout: android
permalink: android/notification-handling.html
prev: verification.html
next: event-handling.html
---

### تنظیم نمایش و کلیک روی اعلان

کلاینت چابک به طور پیش‌فرض برای پیام‌های دریافتی اعلان (`نوتیفیکیشن`) نمایش می‌دهد. درصورت تمایل به تنظیم نمایش اعلان‌ها، کد مورد نظر خود را می‌توانید به کلاینت اضافه کنید.
برای این منظور لازم است یک شیء از نوع `NotificationHandler` نمونه سازی کنید، مانند قطعه کد زیر:

```java                
NotificationHandler notifHandler = new NotificationHandler() {
    @Override
    public Class getActivityClass(ChabokNotification chabokNotification) {
    // return preferred activity class to be opened on this message's notification
    return YOUR_MAIN_ACTIVITY_CLASS.class;
    }

    @Override
    public boolean buildNotification(ChabokNotification chabokNotification, NotificationCompat.Builder builder) {
    // use builder to customize the notification object
    // return false to prevent this notification to be shown to the user, otherwise true
    return true;
    }
};

chabok.addNotificationHandler(notifHandler);
```               

در متد `buildNotification` با پارامترهای ورودی متد یعنی `ChabokNotification` و `NotificationCompat.Builder` می‌توانید اعلان دریافتی را به دلخواه تغییر داده و درباره نمایش آن تصمیم بگیرید. در صورتی که مقدار بازگشتی از این متد `true` باشد، کتابخانه با توجه به تنظیمات مربوطه اعلان را نمایش می‌دهد ولی اگر مقدار بازگشتی `false` باشد بدین معنی است که شما خود نمایش را به عهده می‌گیرید.

### دریافت دیتای نوتیفیکیشن
با استفاده از قطعه کد زیر در متد `buildNotification` که در بخش [تنظیم نمایش اعلان](notification-handling.html#%D8%AA%D9%86%D8%B8%DB%8C%D9%85-%D9%86%D9%85%D8%A7%DB%8C%D8%B4-%D9%88-%DA%A9%D9%84%DB%8C%DA%A9-%D8%B1%D9%88%DB%8C-%D8%A7%D8%B9%D9%84%D8%A7%D9%86) به آن اشاره شده است، می‌توانید به `data` نوتیفیکیشن دسترسی داشته باشید :
```java
if (chabokNotification.getExtras() != null) {
    Bundle payload = chabokNotification.getExtras();
    //FCM message data
    Object data = payload.get("data");
} else if (chabokNotification.getMessage() != null) {
    PushMessage payload = chabokNotification.getMessage();
    //Chabok message data
    JSONObject data = payload.getData();
}
```

###  نمایش کامل متن بلند در اعلان
چابک به صورت پیش‌فرض متن پیام و پوش‌نوتیفیکیشن را به صورت `bigText` نمایش نمی‌دهد. برای نمایش متن پیام و پوش‌نوتیفیکیشن با استفاده از متد `buildNotification` اقدام به نمایش نوتیفیکیشن شخصی‌سازی شده خود کنید (دقت کنید که در متد فوق در صورت نمایش اعلان شخصی‌سازی شده، باید `return false` برگردانید) و از قطعه کد زیر در متد فوق استفاده کنید :

```java
NotificationManager notificationManager = (NotificationManager) getApplicationContext().getSystemService(Context.NOTIFICATION_SERVICE);

String notifText = chabokNotification.getText();
builder.setStyle(new NotificationCompat.BigTextStyle().bigText(notifText));
if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.JELLY_BEAN) {
    builder.setPriority(Notification.PRIORITY_MAX);
}

notificationManager.notify(0, builder.build());
```
