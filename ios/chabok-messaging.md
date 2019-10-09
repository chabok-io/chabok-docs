---
id: chabok-messaging
title: پیام چابک
layout: ios
permalink: ios/chabok-messaging.html
prev: tracker.html
next: push-notification.html
---

چابک برای **ارسال پیام** هنگامی که کاربر به سرور چابک متصل است (باز بودن اپلیکیشن) **از سرویس آنی خود** استفاده می‌کند (پیام چابک) و در صورت عدم اتصال (بسته بودن اپلیکیشن) اقدام به **ارسال پوش‌نوتیفیکیشن** می‌کند تا کاربر را از داشتن پیام چابک مطلع سازد. از این پس منظور از واژه **پیام**، همان **پیام چابک** است و منظور از **پوش** یا **نوتیفیکیشن**، همان **پوش‌نوتیفیکیشن** می‌باشد. 

پیام‌های چابک از طریق [کانال‌](/ios/chabok-messaging.html#کانال) ارسال می‌شوند. بنابراین برای دریافت پیام، باید ابتدا کاربر را در کانال [عضو نمایید](/ios/chabok-messaging.html#عضویت-روی-کانال-subscribe). در این قسمت شما می‌توانید پیام [دریافت کنید](/ios/chabok-messaging.html#دریافت-پیام) و برای آن [وضعیت (status) ارسال کنید](/ios/chabok-messaging.html#ارسال-وضعیت-برای-پیامهای-دریافتی). همچنین می‌توانید پیام [ارسال کنید](/ios/chabok-messaging.html#ارسال-پیام) و از وضعیت تحویل آن‌ [مطلع شوید](/ios/chabok-messaging.html#دریافت-گزارش-تحویل-پیام-delivery). 

> `نکته`: برای استفاده از پیام‌رسانی آنی باید حتما **قابلیت آنی (realtime)** را فعال کنید. برای این کار مقدار پیش‌فرض آن را در فایل دانلود شده (**Chabok.sandbox.plist**  یا  **Chabok.production.plist**) از پنل تغییر دهید.

<Br>

### دریافت پیام 

برای دریافت پیام چابک می‌توانید از رویداد `pushClientManagerDidReceivedMessage` استفاده کنید. در زیر نمونه کدی جهت دریافت اطلاعات از پیام چابک آمده است:

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

چابک به طور پیش‌فرض برای پیام‌های دریافتی (پیام چابک و پوش‌نوتیفیکیشن)، **اعلان** (نوتیفیکیشن) نمایش می‌دهد. برای **شخصی‌سازی و تنظیم کلیک** روی اعلان [این بخش](/ios/push-notification.html#شخصیسازی-نمایش-و-کلیک-روی-اعلان) را مطالعه نمایید.


#### ارسال وضعیت برای پیام‌های دریافتی

شما می‌توانید عکس‌العمل کاربر به یک پیام چابک (خوانده شدن، نادیده گرفته شدن، ...) را با استفاده از کلاینت چابک مشخص کنید. 
متد `markAsRead` برای ارسال رویداد خوانده شدن پیام توسط کاربر به سرور می تواند مورد استفاده قرار بگیرد. 
متد `messageDismissed` نیز می‌تواند برای هر عملی که معنی باز نکردن یا نادیده گرفته شدن پیام را داشته باشد به کار رود. به دو طریق می توان این متدها را فراخوانی نمود:

```objectivec
//Objective-C:

[PushClientManager.defaultManager markAsRead:@"MESSAGE_ID"];
[PushClientManager.defaultManager messageDismissed:@"MESSAGE_ID"];
```
```swift
//Swift:

PushClientManager.default().mark(asRead: @"MESSAGE_ID")
PushClientManager.default().messageDismissed(@"MESSAGE_ID")
```

<Br>

### ارسال پیام

متد `publish` برای ارسال پیام از سمت کلاینت به سرور‌های چابک استفاده می‌شود. شما از این مکانیزم علاوه بر پیام‌های شخصی می‌توانید برای ارسال اطلاعات و داده‌های کاربر به سمت سرور خود (به جای ارسال با درخواست‌های کلاسیک HTTP) استفاده کنید.

ارسال پیام چابک به دو طریق زیر امکان‌پذیر است:


- با استفاده از متد `publish` می‌توانید به یک **کانال خاص** (خصوصی/عمومی) برای یک **کاربر خاص** پیام ارسال کنید.

```objectivec
//Objective-C:

[PushClientManager.defaultManager publish:@"USER_ID"
                    		toChannel:@"CHANNEL_NAME"
                    		 withText:@"Hello World!"];
```

```swift
//Swift:

PushClientManager.default().publish("USER_ID", toChannel: "CHANNEL_NAME", withText: "Hello World!")
```
> `نکته`: برای انتشار پیام در یک کانال عمومی به جای عبارت `USER_ID` باید کاراکتر `*` را وارد نمایید. همینطور برای ارسال پیام در کانال‌های خصوصی باید `USER_ID` کاربر را وارد کنید. در هر دو صورت کاربر برای دریافت پیام در کانالی که ارسال می‌نمایید باید حتما عضو شده باشد.

روی اتصال موجود چابک می‌توانید تعداد زیادی پیام سمت سرور بفرستید. در واقع برای هر درخواست یک اتصال جدید ساخته نمی‌شود. این ویژگی تحویل اطلاعات را در سمت سرور حتی در شرایطی که کاربر اینترنت ضعیف و یا قطع شده‌ای دارد، تضمین می‌کند. به این ترتیب که کلاینت چابک با استفاده از منطق سعی مجدد خود می‌تواند پیام‌ شما را حتی در شرایط بحرانی یک و فقط یک بار بفرستد.


- برای ارسال پیام با جزئیات بیشتر می‌توانید از signature دیگر متد `publish` استفاده کنید، همانند نمونه کد زیر:

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

let message = PushClientMessage(message: messageBody,
                                 withData: customData,
                                 toUserId: toUserId,
                                  channel: toChannel)

message.notification["badge"] = 1 //Optional
message.notification["sound"] = "SOUND" //Optional
message.notification["title"] = "TITLE" //Optional
message.notification["subtitle"] = "SUBTITLE" //Optional

PushClientManager.default().publish(message)
```

در صورت رخ دادن خطا به هنگام `publish` پیام، `delegate method` زیر فراخوانی خواهد شد:

```objectivec
//Objective-C:

-(void) pushClientManagerDidFailInPublish:(NSError *)error{
    NSLog(@"Error in publishing message %@",error);
}
```

``` swift
//Swift:

func pushClientManagerDidFail(inPublish error: Error!) {
	print("Error in publishing message \(error)")
}
```

#### دریافت گزارش تحویل پیام (Delivery)

برای فعال کردن دریافت گزارش تحویل یک پیام منتشر شده، باید ابتدا `deliveryChannelEnabeled` را مقداردهی کنید: 

```objectivec
//Objetive-C: 

PushClientManager.defaultManager.deliveryChannelEnabeled = YES; 
```
```swift
//Swift: 

PushClientManager.default().deliveryChannelEnabeled = true 
```

پس از آن برای دریافت گزارش تحویل پیام‌های ارسالی، رویداد `pushClientManagerDidReceivedDelivery` فراخوانی خواهد شد:

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

<Br>

### کانال

پیام‌رسانی بین سرور و کلاینت‌ چابک از طریق **کانال‌** انجام می‌شود. کانال یک مفهوم انتزاعی است و نقش یک مجرا را برای ارسال و دریافت پیام ایفا می‌کند. شما با کانال می‌توانید انتشار محتوا با موضوعات مختلف را **جداسازی** کنید. دقت داشته باشید که از [کانال‌ها](ios/chabok-messaging.html#کانال) برای گروه‌بندی کاربران **استفاده نکنید** زیرا این دو مکانیزم با هم متفاوت هستند. به عنوان مثال از کانال برای **جداسازی موضوعات محتوا**، **قابلیت چت**، **کامنت** و ... استفاده می‌شود. اما از گروه‌بندی کاربران برای ارسال کمپین یا پیام به گروهی از کاربران که به عنوان مثال در **محدوده مکانی خاص** قرار دارند یا ترکیب آن با ویژگی‌های دیگر مانند کاربرانی که **گوشی‌های اندروید** دارند به کار برده می‌شود.

به طور کلی کانال‌ها به دو دسته **عمومی** (public) و **خصوصی** (private) تقسیم می‌شوند. کانال شخصی برای ارسال پیام شخصی **به یک کاربر به خصوص** است و کانال عمومی برای **انتشار پیام** برای **مجموعه‌ای از کاربران** می‌باشد. عضویت کاربر روی یک کانال برای دریافت پیام‌های ارسالی آن کانال `subscribe` و لغو آن `unsubscribe` نامیده می‌شود. چابک به طور پیش‌فرض هر کاربر را روی **دو کانال شخصی** براساس **شناسه کاربر** (`default`) و **شناسه دستگاه** (`installationId`)  ثبت نام می‌کند. 

> `نکته:` نام کانال به صورت پیش‌فرض به عنوان کانال عمومی در نظر گرفته می‌شود و اگر شما می‌خواهید کاربر را روی کانال شخصی ثبت‌نام کنید کافی است قبل از نام کانال عبارت `/private` را اضافه نمایید.


#### عضویت روی کانال (Subscribe)

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
در صورت موفق بودن عمل عضویت روی یک کانال، متد `delegate` زیر فراخوانی خواهد شد:

```objectivec
//Objective-C:

-(void) pushClientManagerDidSubscribed:(NSString *)channel{
    NSLog(@"Subscribed on '%@' channel",channel);
}
```

``` swift
//Swift:

func pushClientManagerDidSubscribed(_ channel: String!) {
	print("Subscribed on '\(channel)' channel")
}
```
 همچنین در صورت رخ دادن خطا به هنگام عضویت روی یک کانال، با استفاده از متد `delegate` زیر می‌توانید از خطای رخ داده شده با خبر شوید:

```objectivec
//Objective-C:

-(void) pushClientManagerDidFailInSubscribe:(NSError *)error{
    NSLog(@"Error subscribing on channel %@",error);
}
```

``` swift
//Swift:

func pushClientManagerDidFail(inSubscribe error: Error!) {
	print("Error subscribing on channel \(error)")
}
```
#### لغو عضویت از کانال (Unsubscribe)

برای لغو عضویت از یک کانال می‌توانید از متد `unsubscribe` استفاده کنید که در زیر به آن اشاره شده است:

```objectivec
//Objective-C:

[PushClientManager.defaultManager unsubscribe:@"alert"]; // public channel
[PushClientManager.defaultManager unsubscribe:@"private/league"]; // private (personal) channel
```

```swift
//Swift:

PushClientManager.default().unsubscribe("alert") // public channel
PushClientManager.default().unsubscribe("private/league") // private (personal) channel
```
در صورت موفق بودن عمل لغو عضویت از یک کانال، متد `delegate` زیر فراخوانی خواهد شد:

```objectivec
//Objective-C:

-(void) pushClientManagerDidUnsubscribed:(NSString *)channel{
    NSLog(@"Unsubscribed from '%@' channel",channel);
}
```

```swift
//Swift:

func pushClientManagerDidUnsubscribed(_ channel: String!) {
	print("Unsubscribed from '\(channel)' channel")
}
```
در صورت رخ دادن خطا به هنگام لغو عضویت از یک کانال با استفاده از متد `delegate` زیر می‌توانید از خطا رخ داده شده با خبر شوید:

```objectivec
//Objective-C:

-(void) pushClientManagerDidFailInUnsubscribe:(NSError *)error{
    NSLog(@"Error in unsubscribe from channel %@",error);
}
```

```swift
//Swift:

func pushClientManagerDidFail(inUnsubscribe error: Error!) {
	print("Error in unsubscribe from channel \(error)")
}
```
