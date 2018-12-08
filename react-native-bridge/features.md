---
id: features
title: امکانات‌ دیگر
layout: react-native-bridge
permalink: react-native-bridge/features.html
prev: verification.html
next: troubleshoot.html
---

<a href="/react-native-bridge/introducing.html#پلنهای-قیمت-گذاری-چابک"> <span style="background-color: #E0FFFF; height: 30px; color: #000000; display: inline-block; padding: 0px 10px 0px 10px; font-weight: bold; font-size:12px; border-radius: 5px;">پلن استارتاپی</span>
<a href="/react-native-bridge/introducing.html#پلنهای-قیمت-گذاری-چابک"> <span style="background-color: #E5F0FF; height: 30px; color: #000000; display: inline-block; padding: 0px 10px 0px 10px; font-weight: bold; font-size:12px; border-radius: 5px;">پلن شرکتی</span>
<a href="/react-native-bridge/introducing.html#پلنهای-قیمت-گذاری-چابک"> <span style="background-color: #D6E8FF; height: 30px; color: #000000; display: inline-block; padding: 0px 10px 0px 10px; font-weight: bold; font-size:12px; border-radius: 5px;">پلن سازمانی</span>
<a>

چابک متناسب با نیاز شما امکانات دیگری را هم در اختیار شما می گذارد. در این صفحه می‌توانید از [وضعیت اتصال سرور و کلاینت](/react-native-bridge/features.html#وضعیت-اتصال-به-سرور) مطلع شوید. نشان‌های (Badge) اپ خود را [کنترل کنید](/react-native-bridge/features.html#مدیریت-نشانها-badge). شناسه‌های [دستگاه](/react-native-bridge/features.html#دریافت-شناسه-دستگاه) و [کاربر](/react-native-bridge/features.html#دریافت-شناسه-کاربر) خود را از چابک دریافت نمایید. همچنین می‌توانید [اطلاعات کاربران](/react-native-bridge/features.html#مدیریت-اطلاعات-کاربر) خود را مدیریت کنید.

<Br>

### وضعیت اتصال به سرور

برای دریافت از وضعیت آنلاین یا آفلاین بودن، باید یک `listener` به رویداد `connectionStatus` مانند زیر اضافه کنید:

```javascript
const chabokEmitter = new NativeEventEmitter(NativeModules.AdpPushClient);

chabokEmitter.addListener(
    'connectionStatus',
        (status) => {
            if (status === 'CONNECTED') {
                //Connected to chabok
            } else if (status === 'CONNECTING') {
                //Connecting to chabok
            } else if (status === 'DISCONNECTED') {
                //Disconnected
            } else {
                // Closed
            }
    });
```

<Br>

### دریافت شناسه دستگاه

هر دستگاه در سرویس چابک دارای یک شناسه منحصر به فرد می‌باشد، برای دسترسی به این شناسه می‌توانید متد زیر را فراخوانی کنید:

```javascript
this.chabok.getInstallationId()
```
### دریافت شناسه کاربر

هر کاربر در سرویس چابک دارای یک شناسه منحصر به فرد می‌باشد، برای دسترسی به این شناسه می‌توانید متد زیر را فراخوانی کنید:

```javascript
this.chabok.getUserId()
```

<Br>

###  مدیریت نشان‌ها (Badge)

اگر می‌خواهید شماره badge برنامه خود را بازنشانی کنید، با روش زیر می‌توانید: 

```java
this.chabok.resetBadge()
``` 
> `نکته`: با توجه به حجم زیاد مجوزهای نمایش نشان (**Badge**) روی آیکون اپ در اندروید،‌ می‌توانید از [این قسمت](https://doc.chabokpush.com/android/features.html#برداشتن-مجوزهای-غیر-ضروری-برای-نمایش-نشان-badge-روی-آیکون) هر کدام از آن‌ها را با اختیار خودتان بردارید. 
