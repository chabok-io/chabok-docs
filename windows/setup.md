---
id: setup
title: راه‌اندازی چابک
layout: windows
permalink: windows/setup.html
prev: installation.html
---

مقداردهی اولیه
-------------

> `نکته` : کتابخانه چابک در حال حاضر برای Windows Phone 8.1، Windows 8.1
> و Windows Universal 10 در دسترس می باشد

> `نکته` : امکان استفاده از `Push Notification (Cloud messaging)` در
> پروژه های `UWP` در حال حاضر امکان پذیر نمی باشد (به زودی در دسترس قرار
> خواهد گرفت).

متد `Init`  برای مقدار دهی پارامتر های ضروری استفاده می شود. متد فوق را در کلاس `App.xaml.cs` و در رویداد `OnLaunched`  فراخوانی کنید همانند کد زیر :

``` csharp
protected override async void OnLaunched(LaunchActivatedEventArgs e)
{
    ...
	await ADPPushSDK.AdpPushClient.Instance.Init("APP_ID", "API_KEY", "USERNAME", "PASSWORD");
	...
}
```
