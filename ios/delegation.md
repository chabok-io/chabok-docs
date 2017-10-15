---
id: delegation
title: مدیریت رویدادها
layout: ios
permalink: ios/delegation.html
prev: notification.html
next: publishingMessages.html
---

مدیریت رویدادها

-------------


پس از فراخوانی `manager.addDelegate` همانطور که در صفحه قبل نشان داده شد، می توانید از متد زیر برای دریافت رویدادهای داخلی چارچوب چابک استفاده کنید:

```objc
Objc:
- (void)pushClientManagerDidRegisterUser:(BOOL)registration{
// called when PushClientManager Registered user Successfully
}


- (void)pushClientManagerDidFailRegisterUser:(NSError *)error{
// Called When PushClientMangager fail in registerApplication:appVersion:userName:password:
// Or - registerUser:userId and registerAgainWithUserId:userId
NSLog(@"%@ %@",@(__PRETTY_FUNCTION__),error);
// OR
NSLog(@"%@ %@",@(__PRETTY_FUNCTION__),self.manager.failureError);
}

- (void)pushClientManagerDidReceivedDelivery:(DeliveryMessage *)delivery{
// Called When PushClientManager has received new delivery from server
}

- (void)pushClientManagerDidReceivedMessage:(PushClientMessage *)message{
// Called When PushClientManager has been received new message from server
}

- (void)pushClientManagerDidChangedServerConnectionState{
// Called When PushClientManager Connecting State has been Changed
}

- (void)pushClientManagerDidChangeServerReachiability:(BOOL)reachable
networkType:(PushClientServerReachabilityNetworkType)networkType{
// Called When PushClientManager Server Reachiability has been Changed
}
```
```swift
Swift:
func pushClientManagerDidRegisterUser(_ registration: Bool) {
}

func pushClientManagerDidFailRegisterUser(_ error: Error!) {
}

func pushClientManagerDidReceivedDelivery(_ delivery: DeliveryMessage!) {
// Called When PushClientManager has received new delivery from server
}

func pushClientManagerDidReceivedMessage(_ message: PushClientMessage!) {
// Called When PushClientManager has been received new message from server
}

func pushClientManagerDidChangedServerConnectionState() {
// Called When PushClientManager Connecting State has been Changed
}

func pushClientManagerDidChangeServerReachiability(_ reachable: Bool, networkType: PushClientServerReachabilityNetworkType) {
// Called When PushClientManager Server Reachiability has been Changed
}
```
