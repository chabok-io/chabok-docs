---
id: PublishingMessages
title: انتشار پیام
layout: ios
permalink: ios/PublishingMessages.html
prev: installation.html
next: introducing.html
---

Publishing Messages
-------------
برای انتشار پیام از مشتری به سرور Chabok، از این استفاده کنید:

```
Objc:

PushClientMessage *message = [[PushClientMessage alloc]
initWithMessage:@"message body"
withData:@{
@"test": @"value"
}
topic:@"USER_ID/CHANNEL_NAME"];
message.alertText = @"New Message Alert Text";

[self.manager publish:message];

Swift:

var message = PushClientMessage(message: "message body", withData: ["test": "value"], topic: "USER_ID/CHANNEL_NAME")
message.alertText = "New Message Alert Text"
manager.publish(message)

```
