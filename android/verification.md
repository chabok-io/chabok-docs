---
id: verification
title: اعتبارسنجی شناسه کاربری
layout: android
permalink: android/verification.html
prev: event-handling.html
next: features.html
---

در بعضی از برنامه‌ها بر اساس منطق برنامه گاهی نیاز است که هویت کاربر تایید شود، در این صورت می‌توان برای او یک **کد فعال‌سازی پیامک و یا ایمیل نمود** و با استفاده از آن **هویت وی را تایید کرد**. چابک این امکان را به شما می‌دهد، درصورتیکه از شرکت [آتیه‌داده‌پرداز](http://www.adpdigital.com) سرشماره پیامک خریداری کرده باشید، این شماره برای حساب شما فعال خواهد بود و می‌توانید از سرویس درخواست ارسال پیامک استفاده نمایید. توجه داشته باشید نیازی نیست که کاربر شما در چابک ثبت‌نام (register) شده باشد، بلکه بهتر است قبل از ثبت‌نام عملیات اعتبارسنجی انجام شود و در صورت معتبر بودن کاربر، شناسه او برای ثبت‌نام مورد استفاده قرار گیرد.

<Br>

###  فراخوانی وب سرویس به طور مستقیم 

ابتدا لازم است تا حساب چابک خود را ایجاد کرده باشید و اطلاعات مربوط به `api-key` را از حساب خود بخوانید. توضیحات مربوط به نحوه فراخوانی وب‌سرویس در [اینجا](https://api.doc.chabok.io/#/Verification) آمده است.

### درخواست کد فعالسازی

برای این منظور لازم است تا متد `requestVerificationCode` فراخوانی شود:

```java
chabok.requestVerificationCode(USER_ID, new Callback() {
    @Override
    public void onSuccess(Object o) {
         Log.d(TAG, "requestVerificationCode sent successfully");
        // implement your logic
    }

    @Override
    public void onFailure(Throwable throwable) {
        Log.d(TAG, "sending request for verification code failed!!!");
        // implement your logic

    }
});
```

> `نکته:` مقدار `USER_ID` می‌تواند شماره‌ همراه و یا آدرس پست الکترونیکی کاربر باشد. در این صورت بر اساس مقدار وارد شده، کد تایید برای کاربر پیامک و یا ایمیل خواهد شد.


### تایید کد ارسال شده

پس از ارسال کد تایید لازم است این کد برای چابک ارسال شود تا صحت آن بررسی گردد. برای این منظور باید متد `verifyUserCode` فراخوانی شود.

```java

chabok.verifyUserCode(USER_ID, CODE, new Callback() {
    @Override
    public void onSuccess(Object o) { 
         Log.d(TAG, " everything is OK :D ");
        // implement your logic
    }

    @Override
    public void onFailure(Throwable throwable) {
         Log.d(TAG, " O O !!!! inserted code is invalid :-/ ");
        // implement your logic

    }
});
```

> `نکته`: مقدار `USER_ID` دقیقا باید همان مقداری باشد که در مرحله قبل برای درخواست کد استفاده شده است.
