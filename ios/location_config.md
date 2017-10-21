--- 
id: location-config
title: تنظیمات مکان‌یابی
layout: ios 
permalink: ios/location-config.html 
prev: events.html
next: location-tracking.html
---
### مجوز های مورد نیاز موقعیت مکانی
برای استفاده از امکان موقعیت مکانی، نیازمند دریافت مجوزهای زیر می باشد که توضیحات لازم برای هر بخش در زیر آورده شده است :

 1. دسترسی به موقعیت مکانی
 2. مجوز استفاده از موقعیت مکانی

#### ۱- دسترسی به موقعیت مکانی
برای استفاده از موقعیت مکانی در حالت `Background Mode`، ابتدا وارد بخش `Capabilities` پروژه خود شده و از قسمت `Background Modes` گزینه `Location updates` را فعال کنید.

> `نکته` : در صورت فعال نمودن گزینه فوق، کلید `location` باید به فایل `info.plist` اضافه شود، همانند کد زیر :

```xml
<key>UIBackgroundModes</key>
<array>
    ....
    <string>location</string>
    ....
</array>
```

#### ۲- مجوز استفاده از موقعیت مکانی
استفاده از موقعیت مکانی دارای دو حالت، `WhileInUse` , `Always` است که شرح آنها به صورت زیر می باشد :

 - **WhenInUse** : استفاده از موقعیت مکانی، زمانی که نرم افزار در حالت `Foreground` باشد 
 - **Always** : استفاده از موقعیت مکانی، در تمام حالات اجرای نرم افزار (`Foreground`, `Background`)

برای استفاده از هر یک از این حالات کلید دلخواه را در فایل `info.plist` قرار دهید، متن قرار گرفته شده در تگ `string` متن پیامی است که پس از اعلان دریافت مجوز موقعیت مکانی به کاربر نشان داده خواهد شد.
```xml
<key>NSLocationAlwaysUsageDescription</key>
<string>App would like to use your location.</string>
<key>NSLocationWhenInUseUsageDescription</key>
<string>Allow use to access your current location so we can autofill your start/end</string>
```

> `نکته` : در نسخه `iOS 11` باید تمام کلید ها به همراه کلید `NSLocationAlwaysAndWhenInUseUsageDescription` در فایل `info.plist` قرار داده شود.

```xml
<key>NSLocationAlwaysUsageDescription</key>
<string>App would like to use your location.</string>
<key>NSLocationWhenInUseUsageDescription</key>
<string>Allow use to access your current location so we can autofill your start/end</string>
<key>NSLocationAlwaysAndWhenInUseUsageDescription</key>
<string>Allow use to access your current location Always or InUse</string>
```
