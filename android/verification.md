---
id: verification
title: تایید پیامکی کاربر
layout: android
permalink: android/verification.html
prev: chabok-messaging.html
next: notification-handling.html
---

### درخواست پیامک تایید کاربر

درصورتیکه از شرکت [آتیه‌داده‌پرداز](http://www.adpdigital.com) سرشماره پیامک خریداری کرده باشید، این شماره برای حساب شما فعال خواهد بود و می‌توانید از سرویس درخواست ارسال پیامک استفاده نمایید.
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

مقدار `USER_ID` می‌تواند شماره‌ همراه کاربر و یا آدرس `پست الکترونیکی` وی باشد. در این صورت بر اساس مقدار وارد شده، کد تایید برای کاربر پیامک می‌شود و یا برای او ایمیل خواهد شد.



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

>  `نکته`: مقدار `USER_ID`  دقیقا باید همان مقداری باشد که در مرحله قبل
> برای `درخواست کد` استفاده شده است.
