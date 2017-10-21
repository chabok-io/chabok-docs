---
id: publishingMessages
title: پیام چابک
layout: ios
permalink: ios/publishingMessages.html
prev: setup.html
next: notification.html
---

### دریافت پیام
برای دریافت پیام از سرور چابک نیز میتوانید از متدهای زیر استفاده کنید:

```objc
//Objective-C:

- (void)pushClientManagerDidReceivedMessage:(PushClientMessage *)message{
// Called When PushClientManager has been received new message from server
}
- (void)pushClientManagerDidReceivedDelivery:(DeliveryMessage *)delivery{
// Called When PushClientManager has received new delivery from server
}
```
```swift
//Swift:

func pushClientManagerDidReceivedMessage(_ message: PushClientMessage!) {
// Called When PushClientManager has been received new message from server
}
func pushClientManagerDidReceivedDelivery(_ delivery: DeliveryMessage!) {
// Called When PushClientManager has received new delivery from server
}
```

### عضویت در کانال
برای عضویت در یک کانال میتوانید از موارد زیر استفاده کنید:
``` objc
//Objective-C:

[self.manager subscribe:@"myAlerts"]; // private (personal) channel
[self.manager subscribe:@"public/sport"]; // public channel
[self.manager subscribe:@"public/+"]; // all public channels
```
```swift
//Swift:

manager.subscribe("myAlerts") // private (personal) channel
manager.subscribe("public/sport") // public channel
manager.subscribe("public/+") // all public channels
```
همچنین برای لغو عضویت در یک کانال میتوانید از موارد زیر استفاده کنید:

``` objc
//Objective-C:

[self.manager unsubscribe:@"myAlerts"]; // private (personal) channel
[self.manager unsubscribe:@"public/sport"]; // public channel
[self.manager unsubscribe:@"public/+"]; // all public channels
```
```swift
//Swift:

manager.unsubscribe("myAlerts") // private (personal) channel
manager.unsubscribe("public/sport") // public channel
manager.unsubscribe("public/+") // all public channels
```

### ارسال پیام

برای ارسال پیام از مشتری به سرور چابک، از متد زیر استفاده کنید:

```objc
//Objective-C:

PushClientMessage *message = [[PushClientMessage alloc] initWithMessage:@"message body"
withData:@{
@"test": @"value"
}
topic:@"USER_ID/CHANNEL_NAME"];
message.alertText = @"New Message Alert Text";
[self.manager publish:message];
```
```swift
//Swift:

var message = PushClientMessage(message: "message body", withData: ["test": "value"], topic: "USER_ID/CHANNEL_NAME")
message.alertText = "New Message Alert Text"
manager.publish(message)
```

روی اتصال موجود چابک می‌توانید تعداد زیادی رویداد سمت سرور بفرستید، در واقع برای هر درخواست یک اتصال جدید ساخته نمی‌شود. تحویل اطلاعات را در سمت سرور، حتی در شرایطی که کاربر اینترنت ضعیف و یا قطع شده‌ای دارد، تضمین می‌کند. به این ترتیب که کلاینت چابک با استفاده از منطق سعی مجدد خود می‌تواند پیام‌ شما را حتی در شرایط بحرانی یک و فقط یک بار بفرستد. بهینه تر در مصرف باطری

