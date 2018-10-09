---
id: publishingMessages
title: پیام چابک
layout: ios
permalink: ios/publishingMessages.html
prev: rich_notification.html
next: validation.html
---

### ارسال پیام

ارسال پیام در چابک دارای دو حالت زیر می‌باشد:
- به یک کانال **خصوصی** برای یک **کاربر خاص**
- به یک کانال **عمومی**

با استفاده از متد `publish` می‌توانید به یک کانال خاص (خصوصی/عمومی) پیام ارسال کنید.
```objectivec
//Objective-C:

[self.manager publish:@"USER_ID"
                    toChannel:@"CHANNEL_NAME"
                     withText:@"Hello World!"];
```

```swift
//Swift:

manager?.publish("USER_ID", toChannel: "CHANNEL_NAME", withText: "Hello World!")
```
> `نکته`: برای ارسال پیام به صورت عمومی بر روی یک کانال بجای عبارت `USER_ID` کاراکتر `*` را وارد نمایید و سپس نام کانال خصوصی خود را وارد کنید.

روی اتصال موجود چابک می‌توانید تعداد زیادی پیام سمت سرور بفرستید، در واقع برای هر درخواست یک اتصال جدید ساخته نمی‌شود. تحویل اطلاعات را در سمت سرور، حتی در شرایطی که کاربر اینترنت ضعیف و یا قطع شده‌ای دارد، تضمین می‌کند. به این ترتیب که کلاینت چابک با استفاده از منطق سعی مجدد خود می‌تواند پیام‌ شما را حتی در شرایط بحرانی یک و فقط یک بار بفرستد.


برای ارسال پیام با جزئیات بیشتر می‌توانید از signature دیگر متد `publish` استفاده کنید، همانند نمونه کد زیر:

```objectivec
//Objective-C:

NSString *toUserId = @"USER_ID"; //Required. For public channel set * (wildcard)
NSString *toChannel = @"CHANNEL"; //Required
NSString *messageBody = @"MESSAGE_BODY"; //Required
NSDictionary *customData = @{@"KEY":@"VALUE"}; //Optional

PushClientMessage *message = [[PushClientMessage new] initWithMessage:messageBody
                                                             withData:customData
                                                             toUserId:toUserId
                                                             channel:toChannel];

[message.notification setValue:@(1) forKey:@"badge"];   //Optional
[message.notification setValue:@"SOUND" forKey:@"sound"];   //Optional
[message.notification setValue:@"TITLE" forKey:@"title"];   //Optional
[message.notification setValue:@"SUBTITLE" forKey:@"subtitle"];//Optional

[PushClientManager.defaultManager publish:message];
```

```swift
//Swift:

let toUserId = "USER_ID" //Required. For public channel set * (wildcard)
let toChannel = "CHANNEL" //Required
let messageBody = "MESSAGE_BODY" //Required
let customData = ["KEY": "VALUE"] //Optional

let message = PushClientMessage()(message: messageBody,
                                 withData: customData,
                                 toUserId: toUserId,
                                  channel: toChannel)

message.notification["badge"] = 1 //Optional
message.notification["sound"] = "SOUND" //Optional
message.notification["title"] = "TITLE" //Optional
message.notification["subtitle"] = "SUBTITLE" //Optional

PushClientManager.default().publish(message)
```

در صورت  رخ دادن خطا به هنگام publish پیام delegate method زیر فراخوانی خواهد شد:

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

### عضویت روی کانال (Subscribe)

کانال‌ها در چابک به بخش خصوصی و عمومی تقسیم می‌شوند قالب کانال بصورت زیر می‌باشد:

- خصوصی : private/channel
- عمومی : channel یا public/channel

برای عضویت روی یک کانال می‌توانید از متد `subscribe` استفاده کنید که در زیر به آن اشاره شده است:

```objectivec
//Objective-C:

[self.manager subscribe:@"alert"]; // public channel
[self.manager subscribe:@"private/league"]; // private (personal) channel
```

```swift
//Swift:

manager.subscribe("alert") // public channel
manager.subscribe("private/league") // private (personal) channel
```
در صورت موفق بودن عمل عضویت روی یک کانال، delegate method زیر فراخوانی خواهد شد:
```objectivec
//Objective-C:

-(void) pushClientManagerDidSubscribed:(NSString *)channel{
    NSLog(@"Subscribed on '%@' channel",channel);
}
```

``` swift
//Swift:

func pushClientManagerDidSubscribed(_ channel: String!) {
	print("Subscribed on '%@' channel",channel)
}
```
 همچنین در صورت رخ دادن خطا به هنگام عضویت روی یک کانال، با استفاده از delegate method زیر می‌توانید از خطای رخ داده شده با خبر شوید:

```objectivec
//Objective-C:

-(void) pushClientManagerDidFailInSubscribe:(NSError *)error{
    NSLog(@"Error subscribe to channel %@",error);
}
```

``` swift
//Swift:

func pushClientManagerDidFail(inSubscribe error: Error!) {
	print("Error subscribe to channel %@",error)
}
```
### لغو عضویت از کانال (Unsubscribe)
برای لغو عضویت از یک کانال می‌توانید از متد `unsubscribe` استفاده کنید که در زیر به آن اشاره شده است:

```objectivec
//Objective-C:

[self.manager unsubscribe:@"alert"]; // public channel
[self.manager unsubscribe:@"private/league"]; // private (personal) channel
```

```swift
//Swift:

manager.unsubscribe("alert") // public channel
manager.unsubscribe("private/league") // private (personal) channel
```
در صورت موفق بودن عمل لغو عضویت از یک کانال، delegate method زیر فراخوانی خواهد شد:
```objectivec
//Objective-C:

-(void) pushClientManagerDidUnsubscribed:(NSString *)channel{
    NSLog(@"Unsubscribed on '%@' channel",channel);
}
```

```swift
//Swift:

func pushClientManagerDidUnsubscribed(_ channel: String!) {
	print("Unsubscribed on '%@' channel",channel)
}
```
در صورت رخ دادن خطا به هنگام لغو عضویت از یک کانال با استفاده از delegate method زیر می‌توانید از خطا رخ داده شده با خبر شوید:

```objectivec
//Objective-C:

-(void) pushClientManagerDidFailInUnsubscribe:(NSError *)error{
    NSLog(@"Error in unsubscribe to channel %@",error);
}
```

```swift
//Swift:

func pushClientManagerDidFail(inUnsubscribe error: Error!) {
	print("Error in unsubscribe to channel %@",error)
}
```

### دریافت پیام چابک

برای دریافت پیام چابک می‌توانید از رویداد `pushClientManagerDidReceivedMessage` استفاده کنید، در زیر نمونه کدی جهت دریافت اطلاعات از پیام چابک آمده است:

```objectivec
//Objective-C:

- (void)pushClientManagerDidReceivedMessage:(PushClientMessage *)message{
    // Called When PushClientManager has been received new message from server
    
    NSString *channel = message.channel;
    NSString *senderId = message.senderId;
    NSDictionary *customData = message.data;
    
    NSString *body = [message.notification valueForKey:@"body"];
    NSString *title = [message.notification valueForKey:@"title"];
    NSString *subtitle = [message.notification valueForKey:@"subtitle"];
    
    NSLog(@"\n\n Got the Chabok message : \n \n %@", message.toDict);
}
```
```swift
//Swift:

func pushClientManagerDidReceivedMessage(_ message: PushClientMessage?) {
    // Called When PushClientManager has been received new message from server

    let channel = message?.channel
    let customData = message?.data
    let senderId = message?.senderId

    let body = message?.notification["body"] as? String
    let title = message?.notification["title"] as? String
    let subtitle = message?.notification["subtitle"] as? String

    if let chabokPayload = message?.toDict {
        print("\n\n Got the Chabok message : \n \n \(chabokPayload)")
    }
}
```

### گزارش تحویل (Delivery)

برای فعال کردن دریافت گزارش تحویل یک پیام منتشر شده، باید تحویل را قبل از با استفاده از مقدار دهی به property `deliveryChannelEnabeled` فعالسازی فعال کنید: 

```objectivec
//Objetive-C: 

[self.manager.deliveryChannelEnabeled = YES]; 
```
```swift
//Swift: 

manager.deliveryChannelEnabeled = true 
```

#### دریافت گزارش تحویل پیام‌‌های ارسالی

برای دریافت گزارش تحویل پیام‌های ارسالی، رویداد `pushClientManagerDidReceivedDelivery` فراخوانی خواهد شد:

```objectivec
//Objective-C:

- (void)pushClientManagerDidReceivedDelivery:(DeliveryMessage *)delivery{
    // Called When PushClientManager has received new delivery from server
    
    NSString *messageId = delivery.messageId;
    NSDate * deliverdAt = delivery.deliveredAt;
    NSString *deliveredToUser = delivery.deliveredUserId;
    
    NSLog(@"\n\n Got message delivery %@, delivered to %@ at %@", messageId, deliveredToUser, deliverdAt);
}
```
```swift
//Swift:

func pushClientManagerDidReceivedDelivery(_ delivery: DeliveryMessage?) {
    // Called When PushClientManager has received new delivery from server

    let messageId = delivery?.messageId
    let deliverdAt: Date? = delivery?.deliveredAt
    let deliveredToUser = delivery?.deliveredUserId

    print("\n\n Got message delivery \(messageId ?? ""), delivered to \(deliveredToUser ?? "") at \(deliverdAt)")
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
