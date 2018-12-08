---
id: push-notification
title: پوش‌نوتیفیکیشن
layout: android
permalink: android/push-notification.html
prev: chabok-messaging.html
next: user-management.html
---

<a href="/android/introducing.html#پلنهای-قیمت-گذاری-چابک"> <span style="background-color: #E0FFFF; height: 30px; color: #000000; display: inline-block; padding: 0px 10px 0px 10px; font-weight: bold; font-size:12px; border-radius: 5px;">پلن استارتاپی</span>
<a href="/android/introducing.html#پلنهای-قیمت-گذاری-چابک"> <span style="background-color: #E5F0FF; height: 30px; color: #000000; display: inline-block; padding: 0px 10px 0px 10px; font-weight: bold; font-size:12px; border-radius: 5px;">پلن شرکتی</span>
<a href="/android/introducing.html#پلنهای-قیمت-گذاری-چابک"> <span style="background-color: #D6E8FF; height: 30px; color: #000000; display: inline-block; padding: 0px 10px 0px 10px; font-weight: bold; font-size:12px; border-radius: 5px;">پلن سازمانی</span>
<a>

چابک علاوه بر پیام چابک، **پوش‌نوتیفیکیشن** هم ارسال می‌کند. با توجه به این که دریافت پوش‌نوتیفیکیشن از سوی دستگاه‌هایی که **پلی سرویس (play services) گوگل** را ندارند امکان‌پذیر نمی باشد، در این حالت چابک به طور پیش‌فرض اتصال خود را با کلاینت حفظ می‌کند تا در حالت **بسته** (kill) بودن اپلیکیشن هم، [پیام چابک](/android/chabok-messaging.html) را به صورت اعلان دریافت کنند. البته این امکان برای دستگاه‌های آی‌اواس، اندروید O به بالا و دستگاه‌های محافظت شده (مانند شیائومی، اوپو، ردمی و...) وجود ندارد.


 شما می‌توانید نمایش و کلیک این پوش‌نوتیفیکیشن‌ها را [شخصی‌سازی کنید](/android/push-notification.html#شخصیسازی-نمایش-و-کلیک-روی-اعلان). همینطور با [تنظیم پوش‌نوتیفیشکیشن چند رسانه‌ای](/android/push-notification.html#تنظیم-پوشنوتیفیکیشن-چندرسانهای-rich-push-notification) می‌توانید برای هرکدام اکشن تعیین نمایید. 

<Br>

### شخصی‌سازی نمایش و کلیک روی اعلان

کلاینت چابک به طور پیش‌فرض برای پیام‌های دریافتی (پیام چابک و پوش‌نوتیفیکیشن)، اعلان (**نوتیفیکیشن**) نمایش می‌دهد. درصورت تمایل به تنظیم نمایش اعلان‌ها، کد مورد نظر خود را می‌توانید به کلاینت اضافه کنید.
برای این منظور لازم است یک شیء از نوع `NotificationHandler` نمونه‌سازی کنید، مانند قطعه کد زیر:

```java                
NotificationHandler notificationHandler = new NotificationHandler() {
    @Override
    public Class getActivityClass(ChabokNotification chabokNotification) {
        //return preferred activity class to be opened on this message's notification
        return MY_MAIN_ACTIVITY_CLASS.class;
    }

    @Override
    public boolean buildNotification(ChabokNotification chabokNotification,
                                         NotificationCompat.Builder builder) {
        // use builder to customize the notification object
        // return false to prevent this notification to be shown to the user
    	// otherwise true
        return true;
    }
};

AdpPushClient.get().addNotificationHandler(notificationHandler);
```

- شما می‌توانید از کلاس `getActivityClass` برای تعیین صفحه مقصد روی کلیک استفاده کنید.
- در متد `buildNotification` با پارامترهای ورودی متد یعنی `ChabokNotification` و `NotificationCompat.Builder` می‌توانید اعلان دریافتی را **به دلخواه تغییر داده** و **درباره نمایش آن تصمیم بگیرید**. در صورتی که مقدار بازگشتی از این متد `true` باشد، کتابخانه با توجه به تنظیمات مربوطه اعلان را نمایش می‌دهد ولی اگر مقدار بازگشتی `false` باشد بدین معنی است که شما خودتان نمایش را به عهده می‌گیرید.

#### دریافت دیتای اعلان

با استفاده از قطعه کد زیر در متد `buildNotification` که در بخش قبل به آن اشاره شده است، می‌توانید به `data` نوتیفیکیشن دسترسی داشته باشید:

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

<Br>

#### نمایش کامل متن‌های بلند در اعلان

چابک به صورت پیش‌فرض متن پیام و پوش‌نوتیفیکیشن را به صورت `bigText` نمایش **نمی‌دهد**. در این حالت می‌توانید برای نمایش متن پیام و پوش‌نوتیفیکیشن با استفاده از متد `buildNotification` اقدام به نمایش اعلان شخصی‌سازی شده خود کنید و از قطعه کد زیر در متد فوق استفاده کنید: (دقت کنید که در متد فوق در صورت نمایش اعلان شخصی‌سازی شده، باید `return false` برگردانید)

```java
NotificationManager notificationManager = (NotificationManager)
		getApplicationContext().getSystemService(Context.NOTIFICATION_SERVICE);

String notifText = chabokNotification.getText();
builder.setStyle(new NotificationCompat.BigTextStyle().bigText(notifText));
if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.JELLY_BEAN) {
    builder.setPriority(Notification.PRIORITY_MAX);
}

notificationManager.notify(0, builder.build());
```

<Br>

### تنظیم پوش‌نوتیفیکیشن چندرسانه‌ای (Rich Push Notification)

۱- ابتدا در فایل `AndroidManifest.xml` اکشن‌های خود را برای `‌BroadcastReceiver` تعیین کنید تا بتوانید برای هر اکشن عملیات مناسب را اعمال کنید:

```markup
<receiver android:name="NOTIFICATION_RECEIVER_CLASS">  
	<intent-filter> 
		<action android:name="YOUR_ACTION_01"/>  
		<action android:name="YOUR_ACTION_02"/> 
		<!-- list of actions ... -->
	</intent-filter>
</receiver>
```

۲- کلاس جدید از نوع `BroadcastReceiver` ایجاد کنید تا بتوانید کلیک بر روی هر اکشن را پیاده‌سازی کنید:

```java
import android.content.Intent;  
import android.content.Context;  
import android.content.BroadcastReceiver;  
  
public class NOTIFICATION_RECEIVER_CLASS extends BroadcastReceiver {  
    @Override  
    public void onReceive(Context context, Intent intent) {  
        String action = intent.getAction();  
	
        if ("YOUR_ACTION_01".equals(action)) {  
            //Action 01 was clicked by user ...  
        } else if ("YOUR_ACTION_02".equals(action)) {  
            //Action 02 was clicked by user ...
        }  
    }  
}
```

#### نمونه کد پوش‌نوتیفیکیشن چندرسانه‌ای

قطعه کد زیر را در فایل `AndroidManifest.xml` قرار دهید:

```markup
<receiver android:name=".NotificationReceiver">  
	<intent-filter> 
		<action android:name="special_offers_action"/>  
		<action android:name="favorite_product_action"/> 
	</intent-filter>
</receiver>
```

سپس کلاس جدید با نام `NotificationReceiver` از نوع `BroadcastReceiver` ایجاد کنید تا کد مربوط به دو اکشن بالا را با یک `Toast` به نمایش بگذارید:

```java
import android.widget.Toast;
import android.content.Intent;
import android.content.Context;
import android.app.NotificationManager;
import android.content.BroadcastReceiver;

public class NotificationReceiver extends BroadcastReceiver {
    @Override
    public void onReceive(Context context, Intent intent) {
        NotificationManager manager =  (NotificationManager) 
                context.getSystemService(Context.NOTIFICATION_SERVICE);

        String action = intent.getAction();

        if ("special_offers_action".equals(action)) {
            Toast.makeText(context, "Special offers action was clicked by user ...",
                    Toast.LENGTH_SHORT).show();
        } else if ("favorite_product_action".equals(action)) {
            Toast.makeText(context, "Favorite product action was clicked ...",
                    Toast.LENGTH_SHORT).show();
        }

        manager.cancel(0);
    }
}
```

##### نمونه Curl

با اجرای دستور زیر در Terminal می‌توانید یک نوتیفیکیشن چندرسانه‌ای ارسال کنید. دقت کنید که در دستور زیر مقدار `<ACCESS_TOKEN>` حساب کاربری خود و مقدار `USER_ID` را شناسه‌ کاربری که می‌خواهید پیام به او تحویل داده شود، وارد نمایید.

```bash
curl -X POST \
"https://sandbox.push.adpdigital.com/api/push/toUsers?access_token=<ACCESS_TOKEN>" \
-H "accept: application/json" \
-H "Content-Type: application/json" \
-d "{ \"user\": \"USER_ID\", \"content\": \"😍💯 جمعه سیاه 😍💯\", \"notification\": { \"title\": \"😍💯 جمعه سیاه 😍💯\", \"body\": \"در جمعه سیاه می‌توانید با خرید از فروشگاه‌چابک، همزمان با تمام دنیا در این کمپین بزرگ شرکت کنید و با تخفیف های باور نکردنی همراه باشید.\", \"actions\": [ { \"id\": \"special_offers_action\", \"title\": \"پیشنهادهای ویژه\", \"options\": 5 }, { \"id\": \"favorite_product_action\", \"title\": \"کالاهای مورد علاقه من\", \"options\": 5 } ], \"mediaType\": \"png\", \"mediaUrl\": \"https://raw.githubusercontent.com/chabokpush/chabok-assets/master/samples/notification/blackfriday.png\", \"mutableContent\": true, \"category\": \"__BLACK_FRIDAY__\" }}"
```

<img src="https://raw.githubusercontent.com/chabokpush/chabok-assets/master/chabok-docs/android/rich-notification-android.png" alt="Its You" height="583px" width="289.5px">
