---
id: event-handling
title: پیام‌رسانی آنی
layout: ios
permalink: ios/event-handling.html
prev: location-tracking.html
next: verification.html
---


چابک به شما این امکان را می‌دهد که بتوانید ارتباط لحظه‌ای (Real-time) بین سرور و کلاینت داشته باشید و داده‌های مورد نظرتان را در لحظه جا به جا کنید. به عنوان مثال در اپلیکیشن‌های هوشمند حمل و نقل می‌توانید درخواست کاربر و تایید آن را به صورت آنی داشته باشید.

زیرساخت چابک از مدل رویدادگرا Pub/Sub استفاده می‌کند. مزیت این مدل علاوه بر آنی بودن این است که ارسال کننده نیازی به این که بداند چه کسانی دریافت می‌کنند، ندارد. برای درک بهتر آن توصیه می‌کنیم [این لینک](https://en.wikipedia.org/wiki/Publish%E2%80%93subscribe_pattern) را مطالعه نمایید. از این طریق شما با [عضویت روی یک رویداد](/android/event-handling.html#عضویت-روی-رویداد)، آن را پس از هر بار رخ دادن [دریافت می‌نمایید](/android/event-handling.html#دریافت-رویداد). علاوه بر آن شما می‌توانید یک رویدادی را با داده دلخواه خود [ارسال کنید](/android/event-handling.html#انتشار-رویداد).

> `نکته`: برای استفاده از پیام‌رسانی آنی باید حتما **قابلیت آنی (realtime)** را فعال کنید. برای این کار مقدار پیش‌فرض آن را در فایل دانلود شده (**Chabok.sandbox.plist**  یا  **Chabok.production.plist**) از پنل تغییر دهید.

<Br>

### رویداد (Event)

رویدادها می‌توانند هر گونه **انتقال داده بین سرور و کلاینت** باشند. برای مثال، فرض کنید شما در اپلیکیشن درخواست تاکسی می‌خواهید سفر خود را با دوستانتان به اشتراک بگذارید. برای این منظور می‌توانید **موقعیت مکانی** و **وضعیت سفر** خود را برای کسانی که روی آن رویداد عضویت دارند، ارسال کنید تا به صورت **آنی‌** (Real-Time) از وضعیت سفر شما مطلع شوند. یا همچنین می‌توانید به جای درخواست‌های HTTP با استفاده از زیرساخت دو طرفه و آنی چابک رویدادهای درون‌برنامه‌ای بین بکند (Back-end) و چند دستگاه منتشر کنید.  

###  عضویت روی رویداد

برای دریافت رویدادها باید کاربر روی رویداد مورد نظر توسط متد `subscribeEvent` عضو شده باشد.

```objectivec 
//Objective-C :

//Subscribe on a global event from any device.  
[PushClientManager.defaultManager subscribeEvent:@"EVENT_NAME"];
//Subscribe on a global event from a specific device.  
[PushClientManager.defaultManager subscribeEvent:@"EVENT_NAME"
                                  installationId:@"INSTALLATION_ID"];
```
``` swift
//Swift :

//Subscribe on a global event from any device.  
PushClientManager.default().subscribeEvent("EVENT_NAME")
//Subscribe on a global event from a specific device.  
PushClientManager.default().subscribeEvent("EVENT_NAME",
                            installationId: "INSTALLATION_ID")
```
> `نکته :` پارامتر ورودی `live` به این معناست که کاربرانی که به چابک متصل هستند این رویداد را دریافت خواهند نمود، مقدار `installiationId`  نیز برابر شناسه منحصر به فرد دستگاه کاربر می‌باشد و از طریق متد  `getInstallationId` به دست می‌آید.

در صورت استفاده از امضاهای حاوی `installiationId` تمامی رویدادهای مربوط به نام وارد شده به عنوان `EVENT_NAME` که توسط آن دستگاه منتشر می‌شود را دریافت خواهید نمود.
> `نکته` : `installationId` در بخش [امکانات‌ چابک](/ios/features.html#دریافت-شناسه-دستگاه) توضیح داده شده است.
جهت عضویت روی یک رویداد، می‌توانید از نمونه کد زیر پیروی کنید:

برای مثال، در زیر عضویت روی رویداد `shareTrip` یک دستگاه آورده شده است:

```objectivec 
//Objective-C :

//Get a unique device id by calling [PushClientManager.defaultManager getInstallationId];
//get user installationId with publish method or your rest api.
NSString *installationId = @"USER_INSTALLATION_ID";
    
[PushClientManager.defaultManager subscribeEvent:@"shareTrip"
                                  installationId:installationId];
```
``` swift
//Swift :

//Get a unique device id by calling PushClientManager.default().getInstallationId();
//get user installationId with publish method or your rest api.
var installationId = "USER_INSTALLATION_ID"

PushClientManager.default().subscribeEvent("shareTrip",
                                installationId: installationId)
```
> `نکته`: برای دریافت رویدادهای یک دستگاه خاص باید شناسه آن دستگاه (`installationId`) را به جایی که باید دریافت کند، ارسال نمایید.

#### تایید عضویت

برای دریافت وضعیت تایید عضویت روی یک رویداد متد زیر را پیاده‌سازی کنید:

```objectivec
//Objective-C

-(void) pushClientManagerDidSubscribed:(NSString *)name {
    NSLog(@"Subscribe on %@", name);
}
```
```swift
//Swift

func pushClientManagerDidSubscribed(_ name: String?) {
    print("Subscribe on \(name)")
}
```

#### خطای عضویت

برای دریافت وضعیت خطای عضویت روی یک رویداد متد زیر را پیاده‌سازی کنید:

```objectivec
//Objective-C

-(void) pushClientManagerDidFailInSubscribe:(NSError *)error {
    NSLog(@"Fail to subscribe. \n ~~ Error: %@", error);
}
```
```swift
//Swift

func pushClientManagerDidFail(inSubscribe error: Error!) {
    print("Fail to subscribe. \n ~~ Error: \(error)")
}
```
### لغو عضویت از رویداد

با استفاده از متد زیر می‌توانید اقدام به لغو عضویت بر روی یک رویداد کنید:

```objectivec 
//Objective-C :

[self.manager unsubscribeEvent:@"EVENT_NAME"];
[self.manager unsubscribeEvent:@"EVENT_NAME"
                  installationId:@"INSTALLATION_ID"];
```

```swift
//Swift :

manager?.unsubscribeEvent("EVENT_NAME")
manager?.unsubscribeEvent("EVENT_NAME",
               installationId: "INSTALLATION_ID") 
```

#### تایید  لغو عضویت

برای دریافت وضعیت تایید لغو عضویت روی یک رویداد متد زیر را پیاده‌سازی کنید:

```objectivec
//Objective-C

-(void) pushClientManagerDidUnsubscribed:(NSString *)name {
    NSLog(@"Unsubscribe in %@", name);
}
```
```swift
//Swift

func pushClientManagerDidUnsubscribed(_ name: String?) {
    print("Unsubscribe in \(name)")
}
```

#### خطای لغو عضویت

برای دریافت وضعیت خطای لغو عضویت روی یک رویداد متد زیر را پیاده‌سازی کنید:

```objectivec
//Objective-C

-(void) pushClientManagerDidFailInUnsubscribe:(NSError *)error {
    NSLog(@"Fail to unsubscribe. \n ~~ Error: %@", error);
}
```
```swift
//Swift

func pushClientManagerDidFail(inUnsubscribe error: Error!) {
    print("Fail to unsubscribe. \n ~~ Error: \(error)")
}
```

### دریافت رویداد

با پیاده‌سازی متد `pushClientManagerDidReceivedEventMessage` قادر به دریافت رویدادها خواهید بود. 

```objectivec
//Objective-C :

-(void) pushClientManagerDidReceivedEventMessage:(EventMessage *)eventMessage{
    NSDictionary *data = eventMessage.data;
    NSString *eventName = eventMessage.eventName;
    NSString *installationId = eventMessage.deviceId;
    
    NSLog(@"Got event %@ from device %@ with data %@", eventName,
            installationId, data);
}
```
``` swift
//Swift :

func pushClientManagerDidReceivedEventMessage(_ eventMessage: EventMessage!) {
    let data = eventMessage?.data
    let eventName = eventMessage?.eventName
    let installationId = eventMessage?.deviceId

    print("Got event \(eventName) from device \(installationId) with data \(data)")
}
```

<Br>

### انتشار رویداد

با استفاده از متد `publishEvent` می‌توانید رویدادهای دلخواه خود را با یک **نام** و یک **داده** (Data) منتشر کنید. متد زیر به صورت خودکار در صورت قطعی ارتباط اقدام به ارسال مجدد می‌کند و به صورت آنی داده‌های شما را منتشر خواهد کرد. 

```objectivec
//Objective-C:

[PushClientManager.defaultManager publishEvent:@"EVENT_NAME"
                                  data:@{@"KEY":@"VALUE"}];
```
```swift
//Swift:

PushClientManager.default().publishEvent("EVENT_NAME", 
                                data: ["KEY": "VALUE"])
```

برای نمونه در زیر کد انتشار موقعیت مکانی در اشتراک سفر کاربر قرار داده شده است که پس از دریافت موقعیت مکانی کاربر، آن را با رویدادی تحت عنوان `shareTrip` منتشر می‌کند.

```objectivec
//Objective-C:

NSDictionary *data = @{@"lat": @35.7583719,
                       @"lng": @51.4082228,
                       @"tripId": @(12345678)
                      };
[PushClientManager.defaultManager publishEvent:@"shareTrip"
                                          data:data];
```
```swift
//Swift:

var data = ["lat": 35.7583719,
            "lng": 51.4082228,
            "tripId": 12345678]
PushClientManager.default().publishEvent("shareTrip",
                                        data: data)
```
