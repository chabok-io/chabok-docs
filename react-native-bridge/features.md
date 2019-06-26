---
id: features
title: امکانات‌ دیگر
layout: react-native-bridge
permalink: react-native-bridge/features.html
prev: verification.html
next: troubleshoot.html
---

چابک متناسب با نیاز شما امکانات دیگری را هم در اختیار شما می گذارد. در این صفحه می‌توانید از [وضعیت اتصال سرور و کلاینت](/react-native-bridge/features.html#وضعیت-اتصال-به-سرور) مطلع شوید. نشان‌های (Badge) اپ خود را [کنترل کنید](/react-native-bridge/features.html#مدیریت-نشانها-badge). شناسه‌های [دستگاه](/react-native-bridge/features.html#دریافت-شناسه-دستگاه) و [کاربر](/react-native-bridge/features.html#دریافت-شناسه-کاربر) خود را از چابک دریافت نمایید. همچنین می‌توانید [اطلاعات کاربران](/react-native-bridge/features.html#مدیریت-اطلاعات-کاربر) خود را مدیریت کنید.

<Br>

### ثبت اطلاعات کاربر (User Attributes)

شما می‌توانید اطلاعاتی که از کاربر دارید (مانند نام، نام خانوادگی، جنسیت، سن و ...) را به طور دلخواه با استفاده از متد زیر، در پروفایل او ثبت کنید:


```javascript
this.chabok.setUserAttributes({
                firstName: 'مهدی',
                lastName: 'یعقوبی',
                age: 19,
                gender: 'مرد'
            });
```

پس از فراخوانی این متد و ثبت اطلاعات می‌توانید آن را در **پنل>جزئیات دستگاه>کارت اطلاعات کاربر** مانند زیر مشاهده کنید:

![عکس مربوطه](http://uupload.ir/files/9p2w_set-user-info-2.png)


#### دریافت اطلاعات کاربر

برای دریافت اطلاعت کاربر متد زیر را فراخوانی کنید:

```java
this.chabok.getInstallationId()
```

>`نکته:` در نسخه‌های ۱.۴.۰ یا پایین‌تر از متد زیر استفاده کنید:

```javascript
this.chabok.setUserAttributes({
                firstName: 'مهدی',
                lastName: 'یعقوبی',
                age: 19,
                gender: 'مرد'
            });
```

<br>


### افزایش داده‌های کمیتی کاربر

شما می‌توانید داده‌های کمیتی کاربر را مانند **بازدید از محصول یا صفحه‌ای، خرید آیتم خاصی** و .. را به تعداد دلخواهتان **افزایش** دهید. برای این کار متد زیر را فراخوانی کنید: 

```javascript
this.chabok.incrementUserAttribute('visit_comedy_shows');
```

<br>

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

###  مدیریت نشان‌ها (Badge)

اگر می‌خواهید شماره badge برنامه خود را بازنشانی کنید، با روش زیر می‌توانید: 

```java
this.chabok.resetBadge()
``` 
> `نکته`: با توجه به حجم زیاد مجوزهای نمایش نشان (**Badge**) روی آیکون اپ در اندروید،‌ می‌توانید از [این قسمت](https://doc.chabokpush.com/android/features.html#برداشتن-مجوزهای-غیر-ضروری-برای-نمایش-نشان-badge-روی-آیکون) هر کدام از آن‌ها را با اختیار خودتان بردارید. 
