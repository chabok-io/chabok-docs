---
id: custom-data
title: داده‌های سفارشی کاربر
layout: ios
permalink: ios/custom-data.html
prev: deeplink.html
next: behavior-tracking.html
---

 در این صفحه می‌توانید برای کاربرانتان **اطلاعات، ویژگی‌ها (attributes) و تگ** اضافه کنید. ثبت اطلاعات هر کاربر به تعامل شما با او کمک می‌کند طوری که می‌توانید **پیام‌های شخصی‌سازی شده** برایشان ارسال کنید.

<Br><Br>


### مدیریت اطلاعات کاربر (User Attributes)
---

شما می‌توانید اطلاعات و داده‌هایی که از کاربرانتان دارید را در پروفایل او مدیریت کنید و در تعامل با او از آن‌ها استفاده کنید.

<br>

#### ثبت اطلاعات کاربر 

شما می‌توانید اطلاعاتی که از کاربر دارید (مانند نام، نام خانوادگی، جنسیت، سن و ...) را به طور دلخواه با استفاده از property زیر، در پروفایل او ثبت کنید:

{% tabs %}
{% tab OBJECTIVE-C %}

```objectivec

[PushClientManager.defaultManager.userAttributes = @{
		@"firstName": @"نسیم",
		@"lastName" : @"پرتوی",
		@"age"  : @(36),
		@"gender" : @"زن"
}];
```
{% endtab %}
{% tab SWIFT %}

``` swift

PushClientManager.default().userAttributes = [
                       "firstName": "نسیم",
                       "lastName": "پرتوی",
                       "age": 36,
                       "gender": "زن"]
```
{% endtab %}
{% endtabs %}

پس از فراخوانی این متد و ثبت اطلاعات می‌توانید آن را در **پنل > جزئیات دستگاه > کارت اطلاعات کاربر** مانند زیر مشاهده کنید:

![عکس مربوطه](http://uupload.ir/files/g9vk_set-user-info-1.png)

<br>

> `نکته` : در صورتی که از ویژگی  (**phone** (Attribute استفاده کنید، می‌توانید با smart API چابک اقدام به ارسال  پیامک کنید. فقط دقت داشته باشید که شماره همراه کاربر با کد کشور او شروع شود؛ به عنوان مثال ***۹۸۹۱۲۰۴۹۸.

<br>

دقت داشته باشید برای **نسخه‌های ۱.۱۹.۰۰ یا پایین‌تر** از پراپرتی زیر استفاده کنید.

{% tabs %}
{% tab OBJECTIVE-C %}

```objectivec

[PushClientManager.defaultManager.userInfo = @{
		@"firstName": @"نسیم",
		@"lastName" : @"پرتوی",
		@"age"  : @(36),
		@"gender" : @"زن"
}];
```
{% endtab %}
{% tab SWIFT %}

``` swift

PushClientManager.default().userInfo = [
                       "firstName": "نسیم",
                       "lastName": "پرتوی",
                       "age": 36,
                       "gender": "زن"]
```
{% endtab %}
{% endtabs %}

> نکته: لطفا property زیر را [بعد از register شدن کاربر](/ios/sdk-setup.html#%D8%AF%D8%B1%DB%8C%D8%A7%D9%81%D8%AA-%D9%88%D8%B6%D8%B9%DB%8C%D8%AA-%D8%AB%D8%A8%D8%AA-%DA%A9%D8%A7%D8%B1%D8%A8%D8%B1) فراخوانی کنید به عنوان مثال، به قطعه کد زیر توجه کنید:
> 

{% tabs %}
{% tab OBJECTIVE-C %}

```objectivec

[PushClientManager.defaultManager  registerUser:@"USER_ID"  registrationHandler:^(BOOL isRegistered, NSString *userId, NSError *error) {
	if (isRegistered) {
		[PushClientManager.defaultManager  setUserInfo:@{
				@"firstName": @"نسیم",
				@"lastName" : @"پرتوی",
				@"age"  : @(36),
				@"gender" : @"زن"
		}];
	}
}];
```
{% endtab %}
{% tab SWIFT %}

```swift

PushClientManager.default()?.registerUser("USER_ID", registrationHandler: { (register, userId, error) in
	if register {
		PushClientManager.default()?.userInfo = [
                       "firstName": "نسیم",
                       "lastName": "پرتوی",
                       "age": 36,
                       "gender": "زن"]
	}
})
```
{% endtab %}
{% endtabs %}

> `نکته` : دقت داشته باشید  **type** مقداری که به `value` در متد `userAttributes` داده‌اید، را نمی‌توانید تغییر دهید . به این معنی که اگر `boolean` ذخیره کرده‌اید، دیگر **نمی‌توانید** عدد یا `string` دهید یا برعکس. به مثال زیر توجه کنید. 

به عنوان مثال اگر مقدار `age` را مانند زیر `string` قرار داده باشید:

{% tabs %}
{% tab OBJECTIVE-C %}

```objectivec

[PushClientManager.defaultManager.userAttributes = @{
		@"age": @"نوزده"
}];
```
{% endtab %}
{% tab SWIFT %}

``` swift

PushClientManager.default().userAttributes = [
                       "age": "نوزده"]
```
{% endtab %}
{% endtabs %}

دیگر عدد قرار دادن آن مانند زیر **کار نخواهد کرد:**

{% tabs %}
{% tab OBJECTIVE-C %}

```objectivec

[PushClientManager.defaultManager.userAttributes = @{
		@"age": @19
}];
```
{% endtab %}
{% tab SWIFT %}

``` swift

PushClientManager.default().userAttributes = [
                       "age": 19]
```
{% endtab %}
{% endtabs %}

<br>

#### افزایش داده‌های کمیتی کاربر

شما می‌توانید داده‌های کمیتی کاربر را مانند **بازدید از محصول یا صفحه‌ای، خرید آیتم خاصی و ..** را **افزایش** دهید. برای این کار متد زیر را فراخوانی کنید: 

{% tabs %}
{% tab OBJECTIVE-C %}

```objectivec

[PushClientManager.defaultManager incrementUserAttribute:@"visit_comedy_shows"];
```
{% endtab %}
{% tab SWIFT %}

``` swift

PushClientManager.default().incrementUserAttribute("visit_comedy_shows")
```
{% endtab %}
{% endtabs %}

<br>

##### افزودن به چند attribute

همچنین متد بالا از آرایه‌ای از اطلاعات کاربر (attribute) هم پشتیبانی می‌کند. برای همین می‌توانید به بیش از یک attribute اضافه کنید. به نمونه زیر دقت کنید: 

{% tabs %}
{% tab OBJECTIVE-C %}

```objectivec
NSArray<NSString *> *attributes = @[@"comedy_move", @"shoes_size"];
    
[PushClientManager.defaultManager incrementUserAttributes:attributes];
```
{% endtab %}
{% tab SWIFT %}

``` swift
let attributes = ["comedy_move", "shoes_size"]

PushClientManager.default().incrementUserAttributes(attributes)
```
{% endtab %}
{% endtabs %}
<br>

##### افزودن مقدار دلخواه به یک attribute

با متد زیر می‌توانید به یک attribute مقدار دلخواهتان را اضافه کنید:

{% tabs %}
{% tab OBJECTIVE-C %}

```objectivec
[PushClientManager.defaultManager incrementUserAttributeValue:@"player_level" value:2];
```
{% endtab %}
{% tab SWIFT %}

``` swift

PushClientManager.default().incrementUserAttributeValue("player_level", value: 2)
```
{% endtab %}
{% endtabs %}
<br>

##### افزودن مقدار دلخواه به چند attribute

متد زیر از dictionary از attributeها پشتیبانی می‌کند، بنابراین می‌توانید به چند attribute مقدار دلخواهتان را اضافه کنید:

{% tabs %}
{% tab OBJECTIVE-C %}

```objectivec
NSMutableDictionary<NSString *, NSNumber *> *attributesDic = [NSMutableDictionary new];
[attributesDic setObject:[NSNumber numberWithDouble:5] forKey:@"visit"];
[attributesDic setObject:[NSNumber numberWithDouble:100] forKey:@"workout"];
    
[PushClientManager.defaultManager incrementUserAttributeValues:[attributesDic copy]];
```
{% endtab %}
{% tab SWIFT %}

``` swift

let attributesDic = ["visit":NSNumber(5),
		             "workout":NSNumber(100)]

PushClientManager.default().incrementUserAttributeValues(attributesDic)
```
{% endtab %}
 {% endtabs %}
 
<br><br>

### مدیریت تگ‌ها
---

یکی از قوانین سگمنت، **تگ** یا همان **برچسب‌گذاری کاربران** می‌باشد. به عنوان مثال می‌توانید کاربران خود را بر اساس **جنسیت** برچسب‌گذاری کرده و به آن‌ها پیام خاصی را ارسال کنید و یا به کاربرانی که از پرداخت درون برنامه‌ای شما استفاده می‌کنند یک `Tag` با عنوان `Premium_User` اختصاص دهید.

#### افزودن تگ

با استفاده از متد `addTag`، شما می‌توانید به کاربر یک یا مجموعه‌ای از `Tag`ها اختصاص دهید:

{% tabs %}
{% tab OBJECTIVE-C %}

```objectivec
[self.manager addTag:@"Premium_User"];
```
{% endtab %}
{% tab SWIFT %}

```swift
self.manager?.addTag("Premium_User")
```
{% endtab %}
{% endtabs %}

برای اختصاص چند تگ به طور یکجا به کاربر از متد زیر استفاده کنید:

{% tabs %}
{% tab OBJECTIVE-C %}

```objectivec
[self.manager addTags:@[@"Premium_User",@"MALE",@"Teenage"] success:^(NSInteger count) {
            NSLog(@"Add tags to %zd devices", count);
        } failure:^(NSError *error) {
            NSLog(@"Error to adding tags %@",error);
        }];
```
{% endtab %}
{% tab SWIFT %}

```swift
manager.addTags(["Premium_User", "MALE", "Teenage"], success: { count in
    print("Add tags to \(count) devices")
}, failure: { error in
    if let anError = error {
        print("Error to adding tags \(anError)")
    }
})
```
{% endtab %}
{% endtabs %}

همچنین می‌توانید با استفاده از `overload` دیگر این متد، از افزودن و یا خطا در عملیات با خبر شوید:

{% tabs %}
{% tab OBJECTIVE-C %}

```objectivec
[self.manager addTag:@"Premium_User" success:^(NSInteger count) {
        NSLog(@"%@ tag was assign to '%@' user with [%zd] devices",@"Premium_User",self.manager.userId,count);
    } failure:^(NSError *error) {
        NSLog(@"An error happend adding tag ...");
    }];
```
{% endtab %}
{% tab SWIFT %}

```swift
self.manager?.addTag("Premium_User",
        success: {(_ count: Int) -> Void in
	                 print("\("Premium_User") tag was assign to '\(self.manager?.userId)' user with [\(count)] devices")
},
        failure: {(_ error: Error?) -> Void in
	                 print("An error happend adding tag ...")
})
```
{% endtab %}
{% endtabs %}
اگر عملیات افزودن تگ با موفقیت انجام شود، می‌توانید از طریق پنل چابک، تگ اضافه شده به کاربر را در بخش مشترکین همانند تصویر زیر مشاهده کنید :

![مشترک چابک](http://uupload.ir/files/ujp8__1x-ios_device.png)

> `نکته` : شما می‌توانید کاربران مهمان اپلیکیشنتان را با گذاشتن تگ **GUEST** گروه‌بندی کنید.

#### حذف تگ

با استفاده از متد `removeTag`، می‌توانید یک `Tag` خاص از کاربر جاری را حذف کنید. برای نمونه کد زیر تگ `Premium_User` را از کاربر جاری حذف می‌کند:

{% tabs %}
{% tab OBJECTIVE-C %}

```objectivec
[self.manager removeTag:@"Premium_User"];
```
{% endtab %}
{% tab SWIFT %}
```swift
self.manager?.removeTag("Premium_User")
```
{% endtab %}
{% endtabs %}
همچنین با توجه به پشتیبانی این متد از آرایه‌ای از تگ‌ها می‌توانید مانند زیر چند تگ را **یکجا** از کاربر حذف کنید:

{% tabs %}
{% tab OBJECTIVE-C %}
```objectivec
[self.manager removeTags:@[@"Premium_User",@"MALE",@"Teenage"] success:^(NSInteger count) {
            NSLog(@"Remove tags to %zd devices", count);
        } failure:^(NSError *error) {
            NSLog(@"Error to removing tags %@",error);
        }];
```
{% endtab %}
{% tab SWIFT %}

```swift
manager.removeTags("Premium_User", "MALE", "Teenage"], success: { count in
    print("Remove tags to \(count) devices")
}, failure: { error in
    if let anError = error {
        print("Error to removing tags \(anError)")
    }
})
```
{% endtab %}
{% endtabs %}

> ‌ `نکته:` برای حذف همه تگ‌های یک کاربر می‌توانید در متد بالا، جای نام تگ‌ها را خالی بگذارید.
