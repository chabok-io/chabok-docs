---
id: push-notification
title: پوش‌نوتیفیکیشن
layout: android
permalink: android/push-notification.html
prev: chabok-messaging.html
next: user-management.html
---

یکی دیگر از راه‌های پیام‌رسانی چابک، ارسال **پوش‌نوتیفیکیشن** است. دقت داشته باشید، دستگاه‌هایی که **Play Services گوگل** را ندارند یا فقط نسخه قدیمی آن را پشتیبانی می‌کنند و قادر به دریافت پوش‌نوتیفیکیشن نمی‌باشند، چابک اتصال خود را حفظ می‌کند تا در حالت **kill** بودن اپلیکیشن هم [پیام چابک]() را به صورت اعلان را دریافت کنید. در صورت پشتیبانی هم شما می‌توانید پوش‌نوتیفیکیشن‌های خود را تنظیم کنید. به این ترتیب که می‌توانید [نمایش و کلیک اعلان را مدیریت کنید]()، [متن بلند اعلان خود را به طور کامل نشان دهید]()، [دیتای اعلان خود را دریافت کنید]() و [پوش‌نوتیفیکیشن چند رسانه‌ای پشتیبانی نمایید]().

<Br>


### تنظیم نمایش و کلیک روی اعلان

کلاینت چابک به طور پیش‌فرض برای پیام‌های دریافتی، اعلان (نوتیفیکیشن) نمایش می‌دهد. درصورت تمایل به تنظیم نمایش اعلان‌ها، کد مورد نظر خود را می‌توانید به کلاینت اضافه کنید.
برای این منظور لازم است یک شیء از نوع `NotificationHandler` نمونه‌سازی کنید، مانند قطعه کد زیر:

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
- شما می‌توانید از کلاس `getActivityClass` برای تعیین صفحه مقصد روی کلیک استفاده کنید.

- در متد `buildNotification` با پارامترهای ورودی متد یعنی `ChabokNotification` و `NotificationCompat.Builder` می‌توانید اعلان دریافتی را **به دلخواه تغییر داده** و **درباره نمایش آن تصمیم بگیرید**. در صورتی که مقدار بازگشتی از این متد `true` باشد، کتابخانه با توجه به تنظیمات مربوطه اعلان را نمایش می‌دهد ولی اگر مقدار بازگشتی `false` باشد بدین معنی است که شما خود نمایش را به عهده می‌گیرید.

###  نمایش کامل متن بلند در اعلان
چابک به صورت پیش‌فرض متن پیام و پوش‌نوتیفیکیشن را به صورت `bigText` نمایش **نمی‌دهد**. در این حالت می‌توانید برای نمایش متن پیام و پوش‌نوتیفیکیشن با استفاده از متد `buildNotification` اقدام به نمایش اعلان شخصی‌سازی شده خود کنید و از قطعه کد زیر در متد فوق استفاده کنید (دقت کنید که در متد فوق در صورت نمایش اعلان شخصی‌سازی شده، باید `return false` برگردانید):

```java
NotificationManager notificationManager = (NotificationManager) getApplicationContext().getSystemService(Context.NOTIFICATION_SERVICE);

String notifText = chabokNotification.getText();
builder.setStyle(new NotificationCompat.BigTextStyle().bigText(notifText));
if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.JELLY_BEAN) {
    builder.setPriority(Notification.PRIORITY_MAX);
}

notificationManager.notify(0, builder.build());
```
<Br>

### دریافت دیتای اعلان

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
			//Action 01 was clicked by user ...............  
		} else if ("YOUR_ACTION_02".equals(action)) {  
			//Action 02 was clicked by user ...............
		}  
	}  
}
```

#### نمونه کد نوتیفیکیشن چندرسانه‌ای

قطعه کد زیر را در فایل `AndroidManifest.xml` قرار دهید:

```markup
<receiver android:name=".NotificationReceiver">  
	<intent-filter> 
		<action android:name="demoAction"/>  
		<action android:name="closeAction"/> 
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
		NotificationManager manager =  (NotificationManager) context.getSystemService(Context.NOTIFICATION_SERVICE);  

		String action = intent.getAction();  

		if ("demoAction".equals(action)) {  
			Toast.makeText(context, "Demo action was clicked by user .......", Toast.LENGTH_SHORT).show();  
		} else if ("closeAction".equals(action)) {  
			Toast.makeText(context, "Close action was clicked .....", Toast.LENGTH_SHORT).show();  
		}  
  
		manager.cancel(0);  
	}  
}
```

![نوتیفیکیشن چندرسانه‌ای](http://uupload.ir/files/z8bi_rich_notification_screenshot-android-small.png)

