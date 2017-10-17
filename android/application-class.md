---
id: application-class
title: راه‌اندازی چابک
layout: android
permalink: android/application-class.html
prev: gradle-setup.html
next: manifest.html
---
### مقداردهی اولیه
برای دریافت یا ارسال پیام از/به سرور چابک، بایستی یک نمونه از کلاس `AdpPushClient` بسازید و آن را مقداردهی نمایید. یکی از بهترین روش‌ها برای ساختن کلاینت چابک استفاده از کلاس اپلیکیشن پروژه شماست. برای این منظور در متد `onCreate` کلاس `Application` کدهای زیر را اضافه کنید.

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

در صورتی که برنامه شما کلاس `Application` ندارد با استفاده از راهنمای ارایه شده در این [پست](https://www.mobomo.com/2011/05/how-to-use-application-object-of-android/)، آن را ایجاد کنید.

### پارامترها

با استفاده از متد init یک نمونه از AdpPushClient مقدار دهی اولیه می شود. در این متد بجای پارامتر‌های `YOUR_APP_ID`, `YOUR_API_KEY`, `SDK_USERNAME`, `SDK_PASSWORD` مقادیر مربوط به حساب چابک خود را وارد نمایید. نحوه ایجاد حساب در بخش [پیش‌نیازها](required.html) توضیح داده شده است.

> `نکته`: ترکیب APP_ID/SENDERID به عنوان YOUR_APP_ID مورد استفاده قرار می‌گیرد.

به عنوان مثال به کد زیر توجه کنید که همیشه یک سینگلتن از کلاس `AdpPushClient` را مدیریت می‌کند. 
در کد زیر متد `getPushClient` برای نمونه گیری و تنظیمات مربوط به `AdpPushClient` تعریف شده است، شما کافیست بجای `YOUR_MAIN_ACTIVITY_CLASS` نام اکتیویتی اصلی (چابک به طور پیش‌فرض بعد از کلیک شدن روی نوتیفیکیشن، این اکتیویتی را باز می‌کند) خود را قرار دهید.


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

### توضیح متدها

۱. متد setDevelopment

مشخص می‌کند که برنامه به محیط تستی چابک متصل شود یا به محیط عملیاتی. این موضوع بستگی به این دارد که حساب کاربری شما روی کدام محیط تعریف شده باشد.

```java
chabok.setDevelopment(DEV_MODE);
```


۲. متد register

با دو امضای متفاوت وجود دارد:
امضای اول که تنها شناسه کاربر را گرفته و کاربر را با آن شناسه روی سرور چابک ثبت نام میکند.

```java
chabok.register(USER_ID);
```

امضای دوم که علاوه بر شناسه کاربر، لیستی از نام‌ کانال‌هایی که کاربر باید روی آن‌ها عضو شود را نیز دریافت می کند. با ثبت نام در این کانال‌ها کاربر پیام‌های ارسالی روی آن‌ها را دریافت خواهد نمود.

```java
chabok.register(USER_ID, new String[]{CHANNEL_NAME1, CHANNEL_NAME2, ...});
```

متغیر `USER_ID` شناسه کاربر برای ثبت نام در چابک می‌باشد و ارسال پیام‌ به کاربران توسط همین شناسه‌ها و بدون استفاده از توکن یا شناسه گوشی، به سادگی امکان پذیر خواهد بود شناسه کاربری می تواند هر فیلد باارزش و معنا‌دار برای کسب و کار شما باشد که کاربر خود را با آن شناسایی می‌کنید. شماره موبایل، کدملی، شماره حساب و یا ایمیل مثال‌هایی از شناسه‌های کاربری مناسب در موارد واقعی هستند. 

۳. متد dismiss

در متد `onTerminate` کلاس اپلیکیشن (یا اگر بجای کلاس اپلیکیشن از یک اکتیویتی برای مدیریت کلاینت استفاده می کنید در متد `onDestroy`) که در واقع آخرین فراخوانی در چرخه حیات این کلاس است، متد `dismiss` از کلاینت چابک را فراخوانی نمایید تا منابع در اختیار آزاد شوند. واضح است بعد از فراخوانی این متد دیگر نمی توان از نمونه جاری کلاینت استفاده کرد و باید دوباره نمونه‌سازی کنید.

```java

@Override
public void onTerminate() {
    chabok.dismiss();
    super.onTerminate();
}
   
```

