---
id: publishingMessages
title: پیام چابک
layout: ios
permalink: ios/publishingMessages.html
prev: rich_notification.html
next: validation.html
---

### ارسال پیام

برای ارسال پیام از مشتری به سرور چابک، از متد زیر استفاده کنید:

```objectivec
//Objective-C:

[self.manager publish:@"USER_ID"
                    toChannel:@"CHANNEL_NAME"
                     withText:@"`Hello World!`"];
```

```swift
//Swift:

manager?.publish("USER_ID", toChannel: "CHANNEL_NAME", withText: "Hello World!")
```

روی اتصال موجود چابک می‌توانید تعداد زیادی رویداد سمت سرور بفرستید، در واقع برای هر درخواست یک اتصال جدید ساخته نمی‌شود. تحویل اطلاعات را در سمت سرور، حتی در شرایطی که کاربر اینترنت ضعیف و یا قطع شده‌ای دارد، تضمین می‌کند. به این ترتیب که کلاینت چابک با استفاده از منطق سعی مجدد خود می‌تواند پیام‌ شما را حتی در شرایط بحرانی یک و فقط یک بار بفرستد. بهینه تر در مصرف باطری

> `نکته`: برای ارسال پیام به صورت عمومی بر روی یک کانال بجای عبارت `USER_ID` کاراکتر `*` را وارد نمایید و سپس نام کانال خصوصی خود را وارد کنید.

برای ارسال پیام با جزئیات بیشتر می‌توانید از signature دیگر متد publish استفاده کنید، همانند نمونه کد زیر :

```objectivec
//Objective-C:

PushClientMessage *message = [[PushClientMessage alloc]
                                  initWithMessage:@"message body"
                                  withData:@{
                                             @"KEY": @"VALUE"
                                             }
                                  toUserId:@"USER_ID"
                                  channel:@"CHANNEL_NAME"];
message.alertText = @"New Message Alert Text";

[self.manager publish:message];
```

```swift
//Swift:

var message = PushClientMessage(message: "message body",
                                withData: ["KEY": "VALUE"],
                                toUserId: "USER_ID",
                                channel: "CHANNEL_NAME")
message?.alertText = "New Message Alert Text"

manager?.publish(message)
```

در صورت خطا در publish پیام delegate method زیر فراخوانی خواهد شد :

```objectivec
//Objective-C:

-(void) pushClientManagerDidFailInPublish:(NSError *)error{
    NSLog(@"Error in publishing message %@",error);
}
```

``` swift
//Swift:

func pushClientManagerDidFail(inPublish error: Error!) {
	print("Error in publishing message %@",error)
}
```

### عضویت در کانال

کانال‌ها در چابک به بخش خصوصی و عمومی تقسیم می‌شوند قالب کانال بصورت زیر می‌باشد:

- خصوصی : private/channel
- عمومی : channel یا public/channel

برای عضویت در یک کانال میتوانید از موارد زیر استفاده کنید:

```objectivec
//Objective-C:

[self.manager subscribe:@"alert"]; // public channel
[self.manager subscribe:@"public/sport"]; // public channel
[self.manager subscribe:@"private/league"]; // private (personal) channel
```

```swift
//Swift:

manager.subscribe("alert") // public channel
manager.subscribe("public/sport") // public channel
manager.subscribe("private/league") // private (personal) channel
```

در صورت رخ دادن خطا به هنگام subscribe با استفاده از delegate method زیر می‌توانید از عضویت یا خطا رخ داده شده با خبر شوید :

```objectivec
//Objective-C:

-(void) pushClientManagerDidSubscribed:(NSString *)channel{
    NSLog(@"Subscribed on '%@' channel",channel);
}
-(void) pushClientManagerDidFailInSubscribe:(NSError *)error{
    NSLog(@"Error subscribe to channel %@",error);
}
```

``` swift
//Swift:

func pushClientManagerDidSubscribed(_ channel: String!) {
	print("Subscribed on '%@' channel",channel)
}
func pushClientManagerDidFail(inSubscribe error: Error!) {
	print("Error subscribe to channel %@",error)
}
```

همچنین برای لغو عضویت در یک کانال میتوانید از موارد زیر استفاده کنید:

```objectivec
//Objective-C:

[self.manager unsubscribe:@"alert"]; // public channel
[self.manager unsubscribe:@"public/sport"]; // public channel
[self.manager unsubscribe:@"private/league"]; // private (personal) channel
```

```swift
//Swift:

manager.unsubscribe("alert") // public channel
manager.unsubscribe("public/sport") // public channel
manager.unsubscribe("private/league") // private (personal) channel
```

در صورت رخ دادن خطا به هنگام unsubscribe با استفاده از delegate method زیر می‌توانید از عدم عضویت یا خطا رخ داده شده با خبر شوید :

```objectivec
//Objective-C:

-(void) pushClientManagerDidUnsubscribed:(NSString *)channel{
    NSLog(@"Unsubscribed on '%@' channel",channel);
}
-(void) pushClientManagerDidFailInUnsubscribe:(NSError *)error{
    NSLog(@"Error in unsubscribe to channel %@",error);
}
```

```swift
//Swift:

func pushClientManagerDidUnsubscribed(_ channel: String!) {
	print("Unsubscribed on '%@' channel",channel)
}
func pushClientManagerDidFail(inUnsubscribe error: Error!) {
	print("Error in unsubscribe to channel %@",error)
}
```

### دریافت پیام

برای دریافت پیام از سرور چابک نیز میتوانید از متدهای زیر استفاده کنید:

```objectivec
//Objective-C:

- (void)pushClientManagerDidReceivedMessage:(PushClientMessage *)message{
// Called When PushClientManager has been received new message from server
}
```
```swift
//Swift:

func pushClientManagerDidReceivedMessage(_ message: PushClientMessage!) {
// Called When PushClientManager has been received new message from server
}
```

### دریافت تأییدیه تحویل

برای فعال کردن دریافت تأییدیه تحویل یک پیام منتشر شده، باید تحویل را قبل از فعالسازی فعال کنید: 

```objectivec
//Objetive-C: 

[self.manager.deliveryChannelEnabeled = YES]; 
```
```swift
//Swift: 

manager.deliveryChannelEnabeled = true 
```

### رویداد دریافت تأییدیه تحویل
برای دریافت تأییدیه تحویل، باید از رویداد زیر استفاده کنید :

```objectivec
//Objective-C:

- (void)pushClientManagerDidReceivedDelivery:(DeliveryMessage *)delivery{
// Called When PushClientManager has received new delivery from server
}
```
```swift
//Swift:

func pushClientManagerDidReceivedDelivery(_ delivery: DeliveryMessage!) {
// Called When PushClientManager has received new delivery from server
}
```


### ارسال وضعیت پیام‌های دریافتی

شما می‌توانید عکس‌العمل کاربر به یک پیام چابک را (خوانده شدن، نادیده گرفته شدن، ...) با استفاده از کلاینت چابک مشخص کنید. 
متد `markAsRead` برای ارسال رویداد خوانده شدن پیام توسط کاربر به سرور می تواند مورد استفاده قرار بگیرد. 
متد `messageDismissed` نیز می‌تواند برای هر عملی که معنی باز نکردن یا نادیده گرفته شدن پیام را داشته باشد بکار رود. به دو طریق می توان این متدها را فراخوانی نمود:

```objectivec
//Objective-C:

[self.manager markAsRead:@"MESSAGE_ID"];
[self.manager messageDismissed:@"MESSAGE_ID"];

```
```swift
//Swift:

PushClientManager.default().mark(asRead: @"MESSAGE_ID")
PushClientManager.default().messageDismissed(@"MESSAGE_ID")

```

