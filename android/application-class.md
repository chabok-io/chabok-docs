---
id: application-class
title: راه‌اندازی چابک
layout: android
permalink: android/application-class.html
prev: gradle-setup.html
next: manifest.html
---

برای دریافت یا ارسال پیام از/به سرور چابک، بایستی یک نمونه از کلاس AdpPushClient بسازید و آن را مقداردهی نمایید. یکی از بهترین روش‌ها برای ساختن کلاینت چابک استفاده از کلاس اپلیکیشن پروژه شماست. برای این منظور در متد onCreate کلاس Application کدهای زیر را اضافه کنید.

```java
                
private AdpPushClient chabok = AdpPushClient.init(
        getApplicationContext(),
        YOUR_MAIN_ACTIVITY_CLASS.class,
        YOUR_APP_ID,
        YOUR_API_KEY,
        SDK_USERNAME,
        SDK_PASSWORD
); 
```

در صورتی که برنامه شما کلاس Application ندارد با استفاده از راهنمای زیر آن را ایجاد کنید.


```code
https://www.mobomo.com/2011/05/how-to-use-application-object-of-android/
```

با استفاده از متد init یک نمونه از AdpPushClient مقدار دهی اولیه می شود. در این متد بجای پارامتر‌های YOUR_APP_ID, YOUR_API_KEY, SDK_USERNAME, SDK_PASSWORD مقادیر مربوط به حساب چابک خود را وارد نمایید. 
به عنوان مثال به کد زیر توجه کنید که همیشه یک سینگلتن از کلاس AdpPushClient را مدیریت می‌کند. 
در کد زیر متد getPushClient برای نمونه گیری و تنظیمات مربوط به AdpPushClient تعریف شده است، شما کافیست بجای YOUR_MAIN_ACTIVITY_CLASS نام اکتیویتی اصلی (چابک به طور پیش‌فرض بعد از کلیک شدن روی نوتیفیکیشن، این اکتیویتی را باز می‌کند) خود را قرار دهید.


```java

public class YourAppClass extends Application {

  private AdpPushClient chabok = null;

  @Override
  public void onCreate() {
    super.onCreate();
    getPushClient();
  }

  public synchronized AdpPushClient getPushClient() {
    if (chabok == null) {
        chabok = AdpPushClient.init(
            getApplicationContext(),
            YOUR_MAIN_ACTIVITY_CLASS.class,
            YOUR_APP_ID,
            YOUR_API_KEY,
            SDK_USERNAME,
            SDK_PASSWORD
        );
        chabok.setDevelopment(DEV_MODE);
        chabok.register(USER_ID, new String[]{CHANNEL_NAME});
    }
    return chabok;
  }
}
```

در متد onTerminate کلاس اپلیکیشن (یا اگر بجای کلاس اپلیکیشن از یک اکتیویتی برای مدیریت کلاینت استفاده می کنید در متد onDestroy) که در واقع آخرین فراخوانی در چرخه حیات این کلاس است، متد dismiss از کلاینت چابک را فراخوانی نمایید تا منابع در اختیار آزاد شوند. واضح است بعد از فراخوانی این متد دیگر نمی توان از نمونه جاری کلاینت استفاده کرد و باید دوباره نمونه‌سازی کنید.

```java

@Override
public void onTerminate() {
    chabok.dismiss();
    super.onTerminate();
}
   
```




