---
id: push-notification
title: پوش‌نوتیفیکیشن 
layout: react-native-bridge
permalink: react-native-bridge/push-notification.html
prev: chabok-messaging.html
next: deeplink.html
---

> `نکته:` مستندات پوش نوتیفیکیشن زیر براساس **نسخه‌های ۲.۰.۰ به بالا** کتابخانه چابک نوشته شده است. در صورتی که از نسخه‌ پایین‌تری استفاده می‌کنید به [ این صفحه](/react-native-bridge/push-notification-old.html) مراجعه کنید.

چابک علاوه بر پیام چابک، **پوش‌نوتیفیکیشن** هم ارسال می‌کند. برای بکارگیری آن لطفا تنظیمات زیر برای [اندروید](/react-native-bridge/push-notification.html#اندروید) و [آی‌اواس](/react-native-bridge/push-notification.html#آی‌او‌اس) انجام دهید.

<Br>

### تنظیم پوش‌نوتیفیکیشن
---

#### اندروید


>`نکته:` تنظیم پوش نوتیفیکیشن در اندروید به صورت اتوماتیک انجام می‌شود و نیاز به تنظیم خاصی ندارد.


#### آی‌اوس

ابتدا مطمئن شوید که `MobileCoreServices.framework` ،`SystemConfiguration.framework` و `CoreData` را از **Linked Frameworks and Libraries** وارد کرده‌اید.

گزینه `Push Notifications` را در `Setting > Capabilities` فعال کنید،

و علامت `Remote Notifications`ها را در `Setting > Capabilities > Background Modes` بررسی کنید.


<br>

### پوش‌نوتیفیکیشن چندرسانه‌ای (Rich Push Notifcation)
---

برای تنظیم پوش‌نوتیفیکیشن چند رسانه‌ای به صفحات پوش [اندروید](/android/push-notification.html#تنظیم-پوشنوتیفیکیشن-چندرسانهای-rich-push-notification) و [آی‌اواس](/ios/push-notification.html#تنظیم-نوتیفیکیشن-چندرسانهای-rich-push-notification) مراجعه نمایید.

<br>


### دریافت اکشن‌های نوتیفیکیشن
---

برای دریافت اکشن‌ها یک `listener` به رویداد ‍‍`notificationOpened` مانند زیر اضافه کنید:

```javascript
chabokEmitter.addListener(
            'notificationOpened',
            (msg) => {
                console.log(msg);

                if (msg.actionType === 'opened') {
                    console.log("Notification opened by user");
                } else if (msg.actionType === 'dismissed') {
                    console.log("Notification dismissed by user");
                } else if (msg.actionType === 'action_taken') {
                    console.log("User tapped on notification " , msg.actionId , " action");
                }

                if (msg.actionUrl) {
                    console.log("Got deep link (", msg.actionUrl, ")");
                }
            }
        );
    }
```
