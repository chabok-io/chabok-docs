---
id: push-notification
title: پوش‌نوتیفیکیشن
layout: flutter
permalink: flutter/push-notification.html
prev: chabok-messaging.html
next: custom-data.html
---

چابک علاوه بر پیام چابک، **پوش‌نوتیفیکیشن** هم ارسال می‌کند. با توجه به این که دریافت پوش‌نوتیفیکیشن از سوی دستگاه‌هایی که **پلی سرویس (play services) گوگل** را ندارند امکان‌پذیر نمی باشد، در این حالت چابک به طور پیش‌فرض اتصال خود را با کلاینت حفظ می‌کند تا در حالت **بسته** (kill) بودن اپلیکیشن هم، [پیام چابک](/flutter/chabok-messaging.html) را به صورت نوتیفیکیشن دریافت کنند. البته این امکان برای دستگاه‌های آی‌اواس، اندروید O به بالا و دستگاه‌های محافظت شده (مانند شیائومی، اوپو، ردمی و...) وجود ندارد.

در این قسمت شما می‌توانید دیتای نوتیفیکیشن خود را [دریافت کنید](/flutter/push-notification.html#%D8%AF%D8%B1%DB%8C%D8%A7%D9%81%D8%AA-%D8%AF%DB%8C%D8%AA%D8%A7%DB%8C-%D9%86%D9%88%D8%AA%DB%8C%D9%81%DB%8C%DA%A9%DB%8C%D8%B4%D9%86) و همچنین نوتیفیکیشن چند‌رسانه‌ای [ارسال کنید](/flutter/push-notification.html#%D8%AA%D9%86%D8%B8%DB%8C%D9%85-%D9%BE%D9%88%D8%B4%D9%86%D9%88%D8%AA%DB%8C%D9%81%DB%8C%DA%A9%DB%8C%D8%B4%D9%86-%DA%86%D9%86%D8%AF%D8%B1%D8%B3%D8%A7%D9%86%D9%87%D8%A7%DB%8C-rich-push-notification).

<Br>

### دریافت دیتای نوتیفیکیشن

 متد `setOnShowNotificationHandler` برای دریافت دیتای **نمایش** توتیفیکیشن است: 

```dart
ChabokPush.shared.setOnShowNotificationHandler((notif) {
print('Notification show to user' + notif);
});
```

متد `setOnNotificationOpenedHandler` برای دریافت دیتای **کلیک، اکشن یا dismiss** نوتیفیکیشن است: 

```dart
ChabokPush.shared.setOnNotificationOpenedHandler((notif) {
var notifObject = json.decode(notif);

print('User intract with notification = ' + notifObject['actionType'].toString() +
', \n notification payload = ' + notifObject['message'].toString());
});
```
<Br>

### تنظیم پوش‌نوتیفیکیشن چندرسانه‌ای (Rich Push Notification)

برای تنظیم پوش‌نوتیفیکیشن چندرسانه‌‌ای در **اندروید** [این قسمت](/android/push-notification.html#تنظیم-پوشنوتیفیکیشن-چندرسانهای-rich-push-notification) را مطالعه کنید.

برای تنظیم پوش‌نوتیفیکیشن چندرسانه‌‌ای در **آی‌او‌اس** [این قسمت](/ios/push-notification.html#تنظیم-پوشنوتیفیکیشن-چندرسانهای-rich-push-notification) را مطالعه کنید.

##### نمونه Curl

با اجرای دستور زیر در **Terminal** می‌توانید یک نوتیفیکیشن چندرسانه‌ای ارسال کنید. دقت کنید که در دستور زیر مقدار `<ACCESS_TOKEN>` حساب کاربری خود و مقدار `USER_ID` را شناسه‌ کاربری که می‌خواهید پیام به او تحویل داده شود، وارد نمایید. (این دستور برای ارسال به **یک کاربر به خصوص** است. برای ارسال به **گروهی از کاربران** به [این صفحه](https://doc.chabok.io/rest-api/send-chabok-message.html#ارسال-به-گروهی-از-کاربران-byquery) مراجعه کنید.)

```bash
curl -X POST \
"https://sandbox.push.adpdigital.com/api/push/toUsers?access_token=<ACCESS_TOKEN>" \
-H "accept: application/json" \
-H "Content-Type: application/json" \
-d "{ \"user\": \"USER_ID\", \"content\": \"😍💯 جمعه سیاه 😍💯\", \"notification\": { \"title\": \"😍💯 جمعه سیاه 😍💯\", \"body\": \"در جمعه سیاه می‌توانید با خرید از فروشگاه‌چابک، همزمان با تمام دنیا در این کمپین بزرگ شرکت کنید و با تخفیف های باور نکردنی همراه باشید.\", \"actions\": [ { \"id\": \"special_offers_action\", \"title\": \"پیشنهادهای ویژه\", \"options\": 5 }, { \"id\": \"favorite_product_action\", \"title\": \"کالاهای مورد علاقه من\", \"options\": 5 } ], \"mediaType\": \"png\", \"mediaUrl\": \"https://raw.githubusercontent.com/chabokpush/chabok-assets/master/samples/notification/blackfriday.png\", \"mutableContent\": true, \"category\": \"__BLACK_FRIDAY__\" }}"
```

<img src="https://raw.githubusercontent.com/chabokpush/chabok-assets/master/chabok-docs/android/rich-notification-android.png" alt="Its You" height="583px" width="289.5px">
