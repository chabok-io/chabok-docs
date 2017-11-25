---
id: validation
title: اعتبارسنجی
layout: ios
permalink: ios/validation.html
prev: publishingMessages.html
next: notification.html
---

### اعتبارسنجی

درصورتیکه از شرکت [آتیه‌داده‌پرداز](http://www.adpdigital.com) سرشماره پیامک خریداری کرده باشید، این شماره برای حساب شما فعال خواهد بود و می‌توانید از سرویس درخواست ارسال پیامک استفاده نمایید.  برای این منظور لازم است تا متد `requestVerificationCode` فراخوانی شود:


 ```objc
//Objective-C

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
```swift
//Swift:

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
>`نکته` مقدار `USER_ID` می‌تواند شماره‌ همراه کاربر و یا آدرس `پست الکترونیکی`
> وی باشد. در این صورت بر اساس مقدار وارد شده، کد تایید برای کاربر پیامک
> می‌شود و یا برای او ایمیل خواهد شد.

### تایید کد ارسال شده


پس از ارسال کد تایید لازم است این کد برای چابک ارسال شود تا صحت آن بررسی گردد. برای این منظور باید متد `verifyUserCode` فراخوانی شود.

```objc
//Objective-C

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
>  `نکته`: مقدار `USER_ID`  دقیقا باید همان مقداری باشد که در مرحله قبل  برای `درخواست کد` استفاده شده است.

