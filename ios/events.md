---
id: events
title: مدیریت رویدادها
layout: ios
permalink: ios/events.html
prev: notification.html
next: location-config.html
---

### انتشار رویداد به همراه داده
با متدهای زیر می توانید رویداد های داخل برنامه را منتشر کنید:
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
> `نکته` : پارامتر ورودی live به این معناست که کاربرانی که به چابک متصل هستند این رویداد را دریافت خواهند نمود.

جهت انتشار یک رویداد می‌توانید از نمونه کد زیر پیروی کنید :

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

###  عضویت بر روی یک رویداد

متد subscribeEvent با امضاهای زیر موجود است که بر اساس نیاز خود می‌توانید آن‌ها را فراخوانی نمایید:
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
> `نکته :` پارامتر ورودی `live` به این معناست که کاربرانی که به چابک `متصل` هستند این رویداد را دریافت خواهند نمود، مقدار `installiationId`  نیز برابر `شناسه منحصر به فرد دستگاه کاربر` می‌باشد و از طریق متد  `getInstallationId` به دست می‌آید.

در صورت استفاده از امضاهای حاوی installiationId تمامی رویدادهای مربوط به نام وارد شده به عنوان eventName که توسط آن دستگاه منتشر می‌شود را دریافت خواهید نمود.
> `نکته` : installationId در بخش [امکانات‌ چابک](/ios/features.html) توضیح داده شده است.
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

### لغو عضویت برروی یک رویداد

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

برای دریافت رویداد باید delegate method زیر را پیاده سازی کنید، تا بتوانید رویداد هایی که توسط متد `subscribeEvent` بر روی یک رویداد خاص `subscribe` کرده اید دریافت کنید :

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
