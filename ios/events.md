---
id: events
title: مدیریت رویدادها
layout: ios
permalink: ios/events.html
prev: notification.html
next: location-config.html
---

### انتشار رویداد به همراه داده
با متد زیر می توانید رویداد های داخل برنامه را منتشر کنید:

> `نکته` : پارامتر ورودی live به این معناست که کاربرانی که به چابک متصل هستند این رویداد را دریافت خواهند نمود.
>

```objc
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
عضویت بر روی یک رویداد به دو صورت می‌باشد:

- رویداد **عمومی**
- رویداد **خصوصی** به کمک `installationId`

> `نکته` : installationId در بخش [امکانات‌ چابک](/ios/features.html) توضیح داده شده است.

با استفاده از متد `subscribeEvent` می توانید روی یک رویداد خاص `subscribe` کنید، به قطعه کد زیر دقت کنید : 

``` objc 
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

```objc 
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

``` objc
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
