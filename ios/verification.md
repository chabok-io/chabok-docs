---
id: verification
title: اعتبارسنجی شناسه کاربری
layout: ios
permalink: ios/verification.html
prev: event_handling.html
next: features.html
---

در بعضی از برنامه‌ها بر اساس منطق برنامه گاهی نیاز است که هویت کاربر تایید شود، در این صورت می‌توان برای او یک **کد فعال‌سازی پیامک و یا ایمیل نمود** و با استفاده از آن **هویت وی را تایید کرد**. چابک این امکان را به شما می‌دهد، درصورتیکه از شرکت [آتیه‌داده‌پرداز](http://www.adpdigital.com) سرشماره پیامک خریداری کرده باشید، این شماره برای حساب شما فعال خواهد بود و می‌توانید از سرویس درخواست ارسال پیامک استفاده نمایید. توجه داشته باشید نیازی نیست که کاربر شما در چابک ثبت‌نام (register) شده باشد، بلکه بهتر است قبل از ثبت‌نام عملیات اعتبارسنجی انجام شود و در صورت معتبر بودن کاربر، شناسه او برای ثبت‌نام مورد استفاده قرار گیرد.

<Br>

#### فراخوانی وب سرویس به طور مستقیم


ابتدا لازم است تا حساب چابک خود را ایجاد کرده باشید و اطلاعات مربوط به `api-key` را از حساب خود بخوانید. توضیحات مربوط به نحوه فراخوانی وب‌سرویس در [اینجا](https://apidoc.chabok.io/#/Verification) آمده است.

#### استفاده از متدهای ارائه شده در کتابخانه

برای این منظور لازم است تا متد `requestVerificationCode` فراخوانی شود:

{% tabs %}
{% tab OBJECTIVE-C %}
 ```objectivec
[self.manager requestVerificationCode:@"USER_ID" completionBlock:^(BOOL sent, NSError *error) {
         if (error) {
             NSLog(@"ERROR");
             return ;
         }
         if (sent) {
             NSLog(@"Verification Code Sent");
         } else {
             NSLog(@"There was a problem sending validation code,Try again");
        }
    }];
```
{% endtab %}
{% tab SWIFT %}
```swift
manager?.requestVerificationCode("USER_ID", completionBlock: {(_ sent: Bool, _ error: Error?) -> Void in
         if error != nil {
             print("ERROR")
             return
         }
         if sent {
             print("Verification Code Sent")
         } else {
             print("There was a problem sending validation code,Try again")
         }
    })
```
{% endtab %}
{% endtabs %}

>`نکته` مقدار `USER_ID` می‌تواند شماره‌ همراه کاربر و یا آدرس `پست الکترونیکی`
> وی باشد. در این صورت بر اساس مقدار وارد شده، کد تایید برای کاربر پیامک
> می‌شود و یا برای او ایمیل خواهد شد.

#### تایید کد ارسال شده


پس از ارسال کد تایید لازم است این کد برای چابک ارسال شود تا صحت آن بررسی گردد. برای این منظور باید متد `verifyUserCode` فراخوانی شود.

{% tabs %}
{% tab OBJECTIVE-C %}
```objectivec
[self.manager verifyUserCode:@"USER_ID" userCode:@"Verfication_Code" completionBlock:^(BOOL isVerify, NSError *error) {
         if (error) {
             NSLog(@"ERROR");
             return ;
         }

         if (isVerify){
             NSLog(@"Verified :)");
         } else {
             NSLog(@"The verification code is not correct,Try again");
         }
    }];
```
{% endtab %}
{% tab SWIFT %}
```swift
//Swift:

manager?.verifyUserCode("USER_ID", userCode: "Verfication_Code", completionBlock: {(_ isVerify: Bool, _ error: Error?) -> Void in
         if error != nil {
             print("ERROR")
             return
         }
         if isVerify {
             print("Verified :)")
         } else {
             print("The verification code is not correct,Try again")
         }
    })
```
{% endtab %}
{% endtabs %}
>  `نکته`: مقدار `USER_ID`  دقیقا باید همان مقداری باشد که در مرحله قبل  برای درخواست کد استفاده شده است.

