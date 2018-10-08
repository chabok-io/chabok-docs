---
id: push_notification
title: پوش‌نوتیفیکیشن
layout: android
permalink: android/push_notification.html
prev: chabok-messaging.html
next: notification-handling.html
---

### مراحل راه‌اندازی پوش نوتیفیکیشن چندرسانه‌ای

1) ابتدا در فایل `AndroidManifest.xml` اکشن‌های خود را برای `‌BroadcastReceiver` تعیین کنید تا بتوانید برای هر اکشن عملیات مناسب را اعمال کنید:


```markup
<receiver android:name="NOTIFICATION_RECEIVER_CLASS">  
	<intent-filter> 
		<action android:name="YOUR_ACTION_01"/>  
		<action android:name="YOUR_ACTION_02"/> 
		<!-- list of actions ... -->
	</intent-filter>
</receiver>
```

2) کلاس جدید از نوع `BroadcastReceiver` ایجاد کنید تا بتوانید کلیک بر روی هر اکشن را پیاده‌سازی کنید:

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
