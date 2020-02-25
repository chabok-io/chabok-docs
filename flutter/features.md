---
id: features
title: امکانات‌ دیگر
layout: flutter
permalink: flutter/features.html
prev: behavior-tracking.html
next: release-note.html
---

چابک متناسب با نیاز شما امکانات دیگری را هم در اختیار شما می گذارد. در این صفحه می‌توانید از [وضعیت اتصال سرور و کلاینت](/flutter/features.html#وضعیت-اتصال-به-چابک) مطلع شوید. شناسه‌های [دستگاه](/flutter/features.html#دریافت-شناسه-دستگاه) و [کاربر](/flutter/features.html#دریافت-شناسه-کاربر) خود را از چابک دریافت نمایید.

<Br>

### دریافت شناسه دستگاه

چابک هر **دستگاه** کاربر را به صورت خودکار پس از ثبت با یک شناسه منحصر به فرد در سرور خود ذخیره می‌کند. با فراخوانی متد `getInstallationId` می‌توانید شناسه دستگاه کاربر را دریافت کنید:

```dart
ChabokPush.shared.getInstallationId()
    .then((installationId) => print(installationId)		
    ,onError: (e) => print('InstallationId is null'));
``` 

<br><br>

### دریافت شناسه کاربر

چابک شناسه کاربر را پس از ثبت به صورت **رمزنگاری** شده در حافظه دستگاه ذخیره می‌کند. توصیه می‌شود از ذخیره‌سازی این شناسه **خودداری کنید** و با استفاده از متد `getUserId` شناسه کاربر را دریافت کنید:

```dart
ChabokPush.shared.getUserId()
	.then((userId) => print(userId)
	,onError: (e) => print('UserId is null'));
```

<br><br> 

### وضعیت اتصال به چابک

به متد زیر می‌توانید ورودی‌های مختلف اضافه کنید و از وضعیت اتصالشان به چابک مطلع شوید. 

```dart
ChabokPush.shared.setOnConnectionHandler((status) {
	print('Connection status = ' + status);
});
```
