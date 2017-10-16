---
id: publishingMessages
title: پیام چابک
layout: ios
permalink: ios/publishingMessages.html
prev: events.html
next: location-tracking.html
---
### پیام چابک

برای انتشار پیام از مشتری به سرور چابک، از این استفاده کنید:

```objc
Objc:

PushClientMessage *message = [[PushClientMessage alloc]
initWithMessage:@"message body"
withData:@{
@"test": @"value"
}
topic:@"USER_ID/CHANNEL_NAME"];
message.alertText = @"New Message Alert Text";
[self.manager publish:message];
```
```swift
Swift:

var message = PushClientMessage(message: "message body", withData: ["test": "value"], topic: "USER_ID/CHANNEL_NAME")
message.alertText = "New Message Alert Text"
manager.publish(message)
```
رویدادهای پیام چابک:

```objc
Objc:

- (void)pushClientManagerDidReceivedMessage:(PushClientMessage *)message{
// Called When PushClientManager has been received new message from server
}
- (void)pushClientManagerDidReceivedDelivery:(DeliveryMessage *)delivery{
// Called When PushClientManager has received new delivery from server
}
```
```swift
Swift:
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
Objc: 

[self.manager subscribe:@"myAlerts"]; // private (personal) channel 
[self.manager subscribe:@"public/sport"]; // public channel 
[self.manager subscribe:@"public/+"]; // all public channels 

```
```swift
Swift: 

manager.subscribe("myAlerts") // private (personal) channel 
manager.subscribe("public/sport") // public channel 
manager.subscribe("public/+") // all public channels 

``` 
 همچنین برای لغو عضویت در یک کانال میتوانید از موارد زیر استفاده کنید:

``` objc
Objc: 

[self.manager unsubscribe:@"myAlerts"]; // private (personal) channel 
[self.manager unsubscribe:@"public/sport"]; // public channel 
[self.manager unsubscribe:@"public/+"]; // all public channels 

```
```swift
Swift: 

manager.unsubscribe("myAlerts") // private (personal) channel 
manager.unsubscribe("public/sport") // public channel 
manager.unsubscribe("public/+") // all public channels 

``` 
