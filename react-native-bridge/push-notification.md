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

 تنظیم پوش نوتیفیکیشن در اندروید به صورت اتوماتیک انجام می‌شود و نیاز به تنظیم خاصی ندارد. به دلیل خودکار بودن این فرایند **استفاده همزمان از چند سرویس نوتیفیکیشن را به هیچ وجه توصیه نمی‌کنیم**. زیرا امکان دارد کدهایی که در سرویس فایربیس خود می‌گذارید ریست یا پاک شوند. 

> `نکته:` در صورت **به روز رسانی SDK فایربیس به نسخه ۲۰.۱.۱ به بالا**، با توجه به امکان تغییر توکن و اختلال در ارسال کمپین و شمارش حذف، حتما [مستندات آن](https://firebase.google.com/support/release-notes/android#2020-02-27) را با دقت مطالعه کنید.

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

<br><br>

### تست ارسال پوش
---
#### ۱- آیا پوش‌نوتیفیکیشن‌ها با موفقیت دریافت می‌شوند؟
برای اطمینان از ارسال ودریافت موفق پوش کافیست بخش نوتیفیکیشن داشبورد را مشاهده کنید. در این نمودار آمار ارسال ناموفق پوش نوتیفیکیشن نیز موجود است که می‌توانید آن را زیر نظر داشته باشید.

> `نکته:` در صورت بروز مشکل در ارسال پوش بخش [عیب‌یابی](/react-native-bridge/troubleshoot.html#%D9%BE%D9%88%D8%B4-%D9%86%D9%85%DB%8C%DA%AF%DB%8C%D8%B1%D9%85) را مطالعه کنید.
 
<br>

![enter image description here](http://uupload.ir/files/x6nc_notification-test-in-dashboard.png)

<br>

#### ۲- آیا حذف‌ها به درستی شمرده می‌شوند؟

در صورتی که از پوش‌نوتیفیکیشن هم استفاده نمی‌کنید، بعد از حذف اپلیکیشن یک پوش به اپ کاربران ارسال کنید تا از شمارش حذف دستگاه کاربران اطمینان حاصل کنید. 

> `نکته:` حتما برای شمارش حذف و ریزش این مورد را بررسی کنید. همچنین دقت داشته باشید فرایند حذف اپلیکیشن مدت کوتاهی (حدود ۲۰ دقیقه) طول می‌کشد.

چابک به طور روزانه توکن‌های کاربران را چک می‌کند و اگر کاربری اپلیکیشن شما را حذف کند متوجه این موضوع خواهد شد و در حساب عملیاتی آمار حذف و ریزش بروزرسانی می‌شود.

<br>

![enter image description here](http://uupload.ir/files/gl_uninstall-test-in-dashboard.png)
