---
id: push-notification
title: پوش‌نوتیفیکیشن
layout: android
permalink: android/push-notification.html
prev: chabok-messaging.html
next: deeplink.html
---

چابک علاوه بر پیام چابک، **پوش‌نوتیفیکیشن** هم ارسال می‌کند. با توجه به این که دریافت پوش‌نوتیفیکیشن از سوی دستگاه‌هایی که **پلی سرویس (play services) گوگل** را ندارند امکان‌پذیر نمی باشد، در این حالت چابک به طور پیش‌فرض اتصال خود را با کلاینت حفظ می‌کند تا در حالت **بسته** (kill) بودن اپلیکیشن هم، [پیام چابک](/android/chabok-messaging.html) را به صورت نوتیفیکیشن دریافت کنند. البته این امکان برای دستگاه‌های آی‌اواس، اندروید O به بالا و دستگاه‌های محافظت شده (مانند شیائومی، اوپو، ردمی و...) وجود ندارد.

 شما می‌توانید نمایش و کلیک این پوش‌نوتیفیکیشن‌ها را [شخصی‌سازی کنید](/android/push-notification.html#شخصیسازی-نمایش-و-کلیک-روی-نوتیفیکیشن). همینطور با [تنظیم پوش‌نوتیفیشکیشن چند رسانه‌ای](/android/push-notification.html#تنظیم-پوشنوتیفیکیشن-چندرسانهای-rich-push-notification) می‌توانید برای هرکدام اکشن تعیین نمایید. 

> `نکته:` در صورتی که پس از پیاده‌سازی این بخش، اپلیکیشن شما پوش دریافت نمی‌کرد بخش [عیب یابی](/android/troubleshoot.html#اپ-بسته-است-terminated-و-پوش-نمیگیرم) را مطالعه کنید.

<Br>

### دریافت پوش نوتیفیکیشن توسط چابک


اگر می‌خواهید کلاس `FirebaseMessagingService` را خودتان پیاده‌سازی کنید و تمایل دارید چابک نیز پوش نوتیفیکیشن را دریافت کند، لازم است که متد `ChabokFirebaseMessaging.refreshToken` در متد `onNewToken` کلاس فایربیس و متد `ChabokFirebaseMessaging.onMessageReceived` در متد `onMessageReceived` کلاس فایربیس فراخوانی شود. مطابق قطعه کد زیر:
 
 ```java
public class MyFirebaseMessagingService extends FirebaseMessagingService {
    @Override
    public void onNewToken(String token) {
        ChabokFirebaseMessaging.refreshToken(token, getApplicationContext());
    }

    @Override
    public void onMessageReceived(@NonNull RemoteMessage remoteMessage) {
        super.onMessageReceived(remoteMessage);

        if (ChabokFirebaseMessaging.isChabokPushNotification(remoteMessage.getData())) {
            ChabokFirebaseMessaging.onMessageReceived(remoteMessage, getApplicationContext());
        }
        /* 
         * place your code here
         */
    }
}
```

### شخصی‌سازی نمایش و کلیک روی نوتیفیکیشن

کلاینت چابک به طور پیش‌فرض برای پیام‌های دریافتی (پیام چابک و پوش‌نوتیفیکیشن)، اعلان (**نوتیفیکیشن**) نمایش می‌دهد. درصورت تمایل به تنظیم نمایش نوتیفیکیشن‌ها، کد مورد نظر خود را می‌توانید به کلاینت اضافه کنید.
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

    @Override
    public boolean notificationOpened(ChabokNotification message, ChabokNotificationAction notificationAction) {
        if (notificationAction.type == ChabokNotificationAction.ActionType.ActionTaken){
            //Click on an action.
        } else if (notificationAction.type == ChabokNotificationAction.ActionType.Opened){
            //Notification opened
        } else if (notificationAction.type == ChabokNotificationAction.ActionType.Dismissed){
            //Notification dismissed
        }

        //false to prevent launch activity that returned from getActivityClass or navigation to a url.
        return super.notificationOpened(message, notificationAction);
    }
};

AdpPushClient.get().addNotificationHandler(notificationHandler);
```

- شما می‌توانید از کلاس `getActivityClass` برای تعیین صفحه مقصد روی کلیک استفاده کنید.
- در متد `buildNotification` با پارامترهای ورودی متد یعنی `ChabokNotification` و `NotificationCompat.Builder` می‌توانید نوتیفیکیشن دریافتی را **به دلخواه تغییر داده** و **درباره نمایش آن تصمیم بگیرید**. در صورتی که مقدار بازگشتی از این متد `true` باشد، کتابخانه با توجه به تنظیمات مربوطه نوتیفیکیشن را نمایش می‌دهد ولی اگر مقدار بازگشتی `false` باشد بدین معنی است که شما خودتان نمایش را به عهده می‌گیرید و همینطور **آمار کلیک، دکمه‌ها (actions) و رد کردن (dismiss) نوتیفیکیشن را نخواهید داشت.**
- با متد `notificationOpened` می‌توانید دیتای کلیک، اکشن یا dimiss نوتیفیکیشن را دریافت کنید. 

#### دریافت دیتای نوتیفیکیشن

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

#### نمایش کامل متن‌های بلند در نوتیفیکیشن

چابک به صورت پیش‌فرض متن پیام و پوش‌نوتیفیکیشن را به صورت `bigText` نمایش **نمی‌دهد**. در این حالت می‌توانید برای نمایش متن پیام و پوش‌نوتیفیکیشن با استفاده از متد `buildNotification` اقدام به نمایش نوتیفیکیشن شخصی‌سازی شده خود کنید و از قطعه کد زیر در متد فوق استفاده کنید:

```java
@Override
public boolean buildNotification(ChabokNotification chabokNotification, NotificationCompat.Builder builder) {
	boolean isRichNotification = false;

	if (chabokNotification.getExtras() != null) {
        	Bundle payload = chabokNotification.getExtras();

        	//FCM message
        	isRichNotification = payload.containsKey("mediaUrl");
	} else if (chabokNotification.getMessage() != null) {
        	PushMessage payload = chabokNotification.getMessage();

        	//Chabok message
        	if (payload.getNotification() != null) {
                	isRichNotification = payload.getNotification().has("mediaUrl");
        	}
	}

	if (!isRichNotification) {
        	String notifText = chabokNotification.getText();
        	if (notifText != null) {
                	builder.setStyle(new NotificationCompat.BigTextStyle().bigText(notifText));
                	if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.JELLY_BEAN) {
                        	builder.setPriority(Notification.PRIORITY_MAX);
                	}
        	}
	}
	
	return super.buildNotification(chabokNotification, builder);
}
```

>`نکته`: در صورت استفاده از نسخه ۲.۱۸.۰ به بالا، کد‌ها به طور خودکار توسط کتابخانه چابک اجرا می‌شوند، در غیر این صورت باید از قطعه کد بالا برای نمایش متن‌های بلند استفاده کرد.


<Br>

#### پشتیبانی چینش راست به چپ (RTL Support)

برای پشتیبانی از چینش راست به چپ باید `"android:supportsRtl="true` را به کلاس ‍‍`application` در `AndroidManifest.xml` اضافه کنید.

```xml
<application
             android:supportsRtl="true"
             android:icon="@drawable/ic_launcher"
             android:theme="@style/AppTheme"
             android:label="Chabok Example"
             android:name=".ChabokExampleApp">
     ...
  </application>
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

با اجرای دستور زیر در **Terminal** می‌توانید یک نوتیفیکیشن چندرسانه‌ای ارسال کنید. دقت کنید که در دستور زیر مقدار `<ACCESS_TOKEN>` حساب کاربری خود و مقدار `USER_ID` را شناسه‌ کاربری که می‌خواهید پیام به او تحویل داده شود، وارد نمایید. (این دستور برای ارسال به **یک کاربر به خصوص** است. برای ارسال به **گروهی از کاربران** به [این صفحه](https://doc.chabok.io/rest-api/send-chabok-message.html#ارسال-به-گروهی-از-کاربران-byquery) مراجعه کنید.)

```bash
curl -X POST \
"https://sandbox.push.adpdigital.com/api/push/toUsers?access_token=<ACCESS_TOKEN>" \
-H "accept: application/json" \
-H "Content-Type: application/json" \
-d "{ \"user\": \"USER_ID\", \"content\": \"😍💯 جمعه سیاه 😍💯\", \"notification\": { \"title\": \"😍💯 جمعه سیاه 😍💯\", \"body\": \"در جمعه سیاه می‌توانید با خرید از فروشگاه‌چابک، همزمان با تمام دنیا در این کمپین بزرگ شرکت کنید و با تخفیف های باور نکردنی همراه باشید.\", \"actions\": [ { \"id\": \"special_offers_action\", \"title\": \"پیشنهادهای ویژه\", \"options\": 5 }, { \"id\": \"favorite_product_action\", \"title\": \"کالاهای مورد علاقه من\", \"options\": 5 } ], \"mediaType\": \"png\", \"mediaUrl\": \"https://raw.githubusercontent.com/chabokpush/chabok-assets/master/samples/notification/blackfriday.png\", \"mutableContent\": true, \"category\": \"__BLACK_FRIDAY__\" }}"
```

<img src="https://raw.githubusercontent.com/chabokpush/chabok-assets/master/chabok-docs/android/rich-notification-android.png" alt="Its You" height="583px" width="289.5px">
