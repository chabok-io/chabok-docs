---
id: event-handling
title: رویدادهای آنی
layout: ios
permalink: ios/event-handling.html
prev: location-tracking.html
next: verification.html
---

چابک علاوه بر پیام‌رسانی متنی به شما این امکان را می‌دهد که بتوانید [رویدادهای](/ios/event-handling.html#رویداد-event) اپلیکیشن خود را مدیریت کنید. مدیریت رویداد برخلاف رصد آن که فقط رویدادی را پس از رخ دادن ارسال می‌کند، به شما امکان می‌دهد تا به صورت **لحظه‌ای ارسال و دریافت داده** داشته باشید. از این طریق شما با [عضویت روی یک رویداد](/ios/event-handling.html#عضویت-روی-رویداد)، آن را پس از هر بار رخ دادن [دریافت می‌نمایید](/ios/event-handling.html#دریافت-رویداد). علاوه بر آن شما می‌توانید یک رویدادی را با داده دلخواه خود [ارسال کنید](/android/event-handling.html#انتشار-رویداد).

زیرساخت چابک از مدل رویدادگرای Pub/Sub استفاده می‌کند. مزیت این مدل علاوه بر آنی بودن این است که ارسال کننده نیازی به این که بداند چه کسانی دریافت می‌کنند، ندارد. برای درک بهتر آن توصیه می‌کنیم [این لینک](https://en.wikipedia.org/wiki/Publish%E2%80%93subscribe_pattern) را مطالعه نمایید.

<Br>

### رویداد (Event)

رویدادها می‌توانند هر گونه **انتقال داده بین سرور و کلاینت** باشند. برای مثال، فرض کنید شما در اپلیکیشن درخواست تاکسی می‌خواهید سفر خود را با دوستانتان به اشتراک بگذارید. برای این منظور می‌توانید **موقعیت مکانی** و **وضعیت سفر** خود را برای کسانی که روی آن رویداد عضویت دارند، ارسال کنید تا به صورت **آنی‌** (Real-Time) از وضعیت سفر شما مطلع شوند. یا همچنین می‌توانید به جای درخواست‌های HTTP با استفاده از زیرساخت دو طرفه و آنی چابک رویدادهای درون‌برنامه‌ای بین بکند (Back-end) و چند دستگاه منتشر کنید.  

###  عضویت روی رویداد

برای دریافت رویدادها باید کاربر روی رویداد مورد نظر توسط متد `subscribeEvent` عضو شده باشد.

```objectivec 
//Objective-C :

- (void)subscribeEvent:(NSString*)eventName;
- (void)subscribeEvent:(NSString*)eventName live:(BOOL)live;
- (void)subscribeEvent:(NSString*)eventName installationId:(NSString *)installationId;
- (void)subscribeEvent:(NSString*)eventName installationId:(NSString *)installationId live:(BOOL)live;
```
``` swift
//Swift :

manager?.subscribeEvent(eventName: String!)
manager?.subscribeEvent(eventName: String!, live: Bool)
manager?.subscribeEvent(eventName: String!, installationId: String!)
manager?.subscribeEvent(eventName: String!, installationId: String!, live: Bool)
```
> `نکته :` پارامتر ورودی `live` به این معناست که کاربرانی که به چابک متصل هستند این رویداد را دریافت خواهند نمود، مقدار `installiationId`  نیز برابر شناسه منحصر به فرد دستگاه کاربر می‌باشد و از طریق متد  `getInstallationId` به دست می‌آید.

در صورت استفاده از امضاهای حاوی `installiationId` تمامی رویدادهای مربوط به نام وارد شده به عنوان `eventName` که توسط آن دستگاه منتشر می‌شود را دریافت خواهید نمود.
> `نکته` : `installationId` در بخش [امکانات‌ چابک](/ios/features.html) توضیح داده شده است.
جهت عضویت روی یک رویداد، می‌توانید از نمونه کد زیر پیروی کنید :

```objectivec 
//Objective-C :

[self.manager subscribeEvent:@"geo"]; //Public event    
[self.manager subscribeEvent:@"talk"
                  installationId:@"INSTALLATION_ID"]; //Private event
```
``` swift
//Swift :

manager?.subscribeEvent("geo") //public event
manager?.subscribeEvent("talk",
             installationId: "INSTALLATION_ID") //private event
```

### لغو عضویت از رویداد

با استفاده از متد زیر می‌توانید اقدام به لغو عضویت بر روی یک رویداد کنید :

```objectivec 
//Objective-C :

[self.manager unsubscribeEvent:@"geo"]; //Public event
[self.manager unsubscribeEvent:@"geo"
                  installationId:@"INSTALLATION_ID"]; //Private event
```

```swift
//Swift :

manager?.unsubscribeEvent("geo") //public event
manager?.unsubscribeEvent("talk",
               installationId: "INSTALLATION_ID") //private event
```

### دریافت رویداد

برای دریافت رویداد باید delegate method زیر را پیاده سازی کنید، تا بتوانید رویدادهایی که توسط متد `subscribeEvent` بر روی یک رویداد خاص `subscribe` کرده‌اید دریافت کنید:

```objectivec
//Objective-C :

- (void) pushClientManagerDidReceivedEventMessage:(EventMessage *)eventMessage{
    NSLog(@"Event message (%@) was received .....",
          eventMessage.data);
}
```
``` swift
//Swift :

func pushClientManagerDidReceivedEventMessage(_ eventMessage: EventMessage!) {
        print("Event message \(eventMessage.data) was received .....")
}
```

<Br>

### انتشار رویداد

با استفاده از متد `publishEvent` می‌توانید رویدادهای دلخواه خود را با یک **نام** و یک **داده** (Data) منتشر کنید. متد زیر به صورت خودکار در صورت قطعی ارتباط اقدام به ارسال مجدد می‌کند و به صورت آنی داده‌های شما را منتشر خواهد کرد. 

```objectivec
//Objective-C:

- (BOOL)publishEvent:(NSString*)eventName data:(NSDictionary*)data;
- (BOOL)publishEvent:(NSString*)eventName data:(NSDictionary*)data live:(BOOL)live;
- (BOOL)publishEvent:(NSString*)eventName data:(NSDictionary*)data stateful:(BOOL)stateful;
- (BOOL)publishEvent:(NSString*)eventName data:(NSDictionary*)data live:(BOOL)live stateful:(BOOL)stateful;
```
```swift
//Swift:

manager?.publishEvent(eventName: String!, data: [AnyHashable : Any]!)
manager?.publishEvent(eventName: String!, data: [AnyHashable : Any]!, live: Bool)
manager?.publishEvent(eventName: String!, data: [AnyHashable : Any]!, stateful: Bool)
manager?.publishEvent(eventName: String!, data: [AnyHashable : Any]!, live: Bool, stateful: Bool)
```
> `نکته` : پارامتر ورودی `live` به این معناست که کاربرانی که به چابک متصل هستند این رویداد را دریافت خواهند نمود.

جهت انتشار یک رویداد می‌توانید از نمونه کد زیر پیروی کنید:

```objectivec
//Objective-C:

NSDictionary *geoData = @{@"lat":@35.7590822,
                           @"lng":@51.4006114};
[self.manager publishEvent:@"geo" data:geoData];
```
```swift
//Swift:

let geoData:[AnyHashable : Any] = ["lat":35.7590822,
                                 "lng":51.4006114];
manager?.publishEvent("geo", data: geoData)
```


