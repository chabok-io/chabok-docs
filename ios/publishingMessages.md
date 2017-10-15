---
id: publishingMessages
title: پیام چابک
layout: ios
permalink: ios/publishingMessages.html
prev: delegation.html
next: location-tracking.html
---

پیام چابک

-------------
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
func pushClientManagerDidReceivedMessage(_ message: PushClientMessage!) {
// Called When PushClientManager has been received new message from server
}
func pushClientManagerDidReceivedDelivery(_ delivery: DeliveryMessage!) {
// Called When PushClientManager has received new delivery from server
}
```
