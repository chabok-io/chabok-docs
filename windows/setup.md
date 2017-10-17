---
id: setup
title: راه‌اندازی چابک
layout: windows
permalink: windows/setup.html
prev: installation.html
---

## مقداردهی اولیه


> `نکته` : کتابخانه چابک در حال حاضر برای Windows Phone 8.1، Windows 8.1
> و Windows Universal 10 در دسترس می باشد

> `نکته` : امکان استفاده از (Push Notification (Cloud messaging در
> پروژه های `UWP` در حال حاضر امکان پذیر نمی باشد (به زودی در دسترس قرار
> خواهد گرفت).

متد `Init`  برای مقدار دهی پارامتر های ضروری استفاده می شود. متد فوق را در کلاس `App.xaml.cs` و در رویداد `OnLaunched`  فراخوانی کنید همانند کد زیر :

``` csharp
private AdpPushClient _chabokPush;
protected override async void OnLaunched(LaunchActivatedEventArgs e)
{
    ...
    _chabokPush = ADPPushSDK.AdpPushClient.Instance;
	await _chabokPush.Init("APP_ID", "API_KEY", "USERNAME", "PASSWORD");
	...
}
```

### محیط چابک

با استفاده از متد زیر می توانید محیط عملیاتی و یا تستی را تعیین کنید.
`نکته` : متد فوق را در کلاس `App.xaml.cs` و در رویداد `OnLaunched` فراخوانی کنید همانند کد زیر :

``` csharp
_chabokPush.SetDevelopment(true);
```

### ثبت کاربر

در پایان شما باید برای کاربر خود یک `userId` تعیین نمایید، همانند قطعه کد زیر :

``` csharp
await _chabokPush.Register(userId: "USER_ID");
```

> `نکته` : `userId` می تواند هر عبارتی باشد ( شماره تلفن، ایمیل، کد ملی،
> یک شناسه واحد و ...) اما حتما باید آن را مقدار دهی کنید.

>  `نکته` : کانال آرایه ای می باشد که می خواهید کاربر فقط به کانال های خاصی
> دسترسی داشته باشد تا در صورت ارسال پیام، کاربرانی که عضو آن کانال هستند
> قادر به دریافت پیام خواهند بود.

 متد Register همچنین می تواند یک channel نیز دریافت کند، همانند کد زیر
 
``` csharp
var channels = new[]
{
    "public/default",
    "sport",
    "public/news"
};

await _chabokPush.Register(userId: "USER_ID", channelNames: channels);
```


