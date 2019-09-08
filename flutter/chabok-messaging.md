---
id: chabok-messaging
title: پیام چابک
layout: flutter
permalink: flutter/chabok-messaging.html
prev: tracker.html
next: push-notification.html
---

چابک برای **ارسال پیام** هنگامی که کاربر به سرور چابک متصل است (باز بودن اپلیکیشن) **از سرویس آنی خود** استفاده می‌کند (پیام چابک) و در صورت عدم اتصال به چابک (بسته بودن اپلیکیشن) اقدام به **ارسال پوش‌نوتیفیکیشن** می‌کند تا کاربر را از داشتن پیام چابک مطلع سازد. برای همین از این پس منظور از واژه **پیام**، همان **پیام چابک** است و منظور از **پوش** یا **نوتیفیکیشن**، **پوش‌نوتیفیکیشن** می‌باشد.

 پیام‌های چابک از طریق کانال‌ ارسال می‌شوند. در این قسمت شما می‌توانید پیام [دریافت کنید](/flutter/chabok-messaging.html#دریافت-پیام) و همچنین پیام [ارسال کنید](/flutter/chabok-messaging.html#ارسال-پیام).

<Br>

### دریافت پیام 

با پیاده‌سازی متد `setOnMessageCallback` قادر به دریافت پیام خواهید بود. 

```dart
ChabokPush.shared.setOnMessageCallback((message){

print('Got message --> ' + message);

});
```

چابک به طور پیش‌فرض برای پیام‌های دریافتی، نوتیفیکیشن نمایش می‌دهد. برای **شخصی‌سازی و تنظیم کلیک** روی اعلان [این بخش](/flutter/push-notification.html#شخصیسازی-نمایش-و-کلیک-روی-اعلان) را مطالعه نمایید.

<Br>

### ارسال پیام

متد `publish` برای ارسال پیام از سمت کلاینت به سرور‌های چابک استفاده می‌شود. شما از این مکانیزم علاوه بر پیام‌های شخصی می‌توانید برای ارسال اطلاعات و داده‌های کاربر به سمت سرور خود (به جای ارسال با درخواست‌های کلاسیک HTTP) استفاده کنید.

```dart
_publishMessageButtonClicked() {

ChabokPush.shared.publish(new ChabokMessage("989125336383", "default","Hello world"));

}
```

> `نکته:` نام کانال و شناسه کاربر در متد `publish` باید فاقد کاراکتر `/` باشد.

> `نکته:` مقدار پیش‌فرض برای نام کانال **خصوصی** برابر `default` می‌باشد.

> `نکته`: برای ارسال پیام در یک کانال **عمومی** به جای عبارت `USER_ID` باید کاراکتر `*` را وارد نمایید. همچنین برای ارسال پیام در یک کانال‌ **خصوصی** باید `USER_ID` کاربر را وارد کنید. توجه داشته باشید که کاربر هنگامی پیام شما را دریافت خواهد کرد که بر روی کانال تعیین شده، عضویت داشته باشد.