---
id: publishingMessages
title: پیام چابک
layout: ios
permalink: ios/publishingMessages.html
prev: setup.html
next: notification.html
---

پیام چابک

-------------
برای انتشار پیام از مشتری به سرور Chabok، از این استفاده کنید:

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
