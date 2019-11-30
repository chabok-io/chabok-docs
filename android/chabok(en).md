---
id: chabok(en)
title: Chabok Integration
layout: android
permalink: android/chabok(en).html
direction: ltr
---

## 1. Prerequisites

Before you start, first you'll need a **Chabok account** and your notification **API Keys** (to setup notifications on android and ios).

### 1.1 Creating Chabok Account

There are two kinds of accounts in Chabok. Our free account which is for **testing** and is based on sandbox environment. And our premium which is for launching your app and is based on production environment. Our sandbox account has a limited capacity for users and does not support more. Therefore if you want to release your app, we recommend on using our production account which has no limitations.

For creating a Chabok account [go here](https://chabok.io/register.html).

> `Note:` After creating a new account, you will have your **SDK keys** in panel→settings→Access tokens. These keys are needed for [**initializing our library**](/android/chabok(en).html#23-initialize-library).

### 1.2 Configuring notifications
`Android:`
To send notifications on android , you'll need to enter your **API key** and **senderId** in panel→ settings→ platforms→android cart.
If you don't have the keys, [see how to get them](https://webkul.com/blog/generate-api-key-fcm-sender-id/). 

<br>

`IOS:`
To send notifications on ios, you'll need to upload your p8 file in panel→ settings→ platforms→ios cart.

<br><br>

## 2. SDK Integration

To successfully integrate our SDK, follow the steps below:

[ 1- Add chabok library to your project](/android/chabok(en).html#21-add-chabok-library-to-your-project)

[ 2- Add push notification support (only for android)](/android/chabok(en).html#22-add-push-notification-support-android-only)

[ 3- Initialize library](/android/chabok(en).html#23-initialize-library)

[ 4- Register users](/android/chabok(en).html#24-register-users)

### 2.1 Add chabok library to your project
`Android:` 

Chabok is compatible with **Android 4 and higher**.

Chabok library is available on `jcenter`. Therefore first add `jcenter` as a repository in your main project `gradle`:
```javascript
buildscript {
  repositories {
    jcenter()
  }
}  
```
then open `build.gradle` in `app` file and add the following dependencies:

```javascript
dependencies {
    implementation 'me.leolin:ShortcutBadger:1.1.22@aar'
    implementation 'com.adpdigital.push:chabok-lib:2.14.2'

    //If you want to get the push notification, add to dependencies
    implementation 'com.google.android.gms:play-services-gcm:10.2.6' 
}
```

<br>

`IOS:`

Chabok library is available on `CocoaPods`. Add the following to your `podfile`:
```bash
target 'YourProject' do
  use_frameworks!

  pod 'ChabokPush'
  
end
```
then install the `podfile`:
```bash
$ pod install
```

<br>

### 2.2 Add Push Notification Support (android only)
To enable push notification support, add `GcmReceiver` to `AndroidManifest.xml` in `application` class:
```markup
<application
    android:name=".MY_APPLICATION_CLASS_NAME"
    ... >
	
	...
    <receiver
        android:name="com.google.android.gms.gcm.GcmReceiver"
        android:enabled="true"
        android:exported="true"
        android:permission="com.google.android.c2dm.permission.SEND">
        <intent-filter>
            <action android:name="com.google.android.c2dm.intent.RECEIVE" />
            <action android:name="com.google.android.c2dm.intent.REGISTRATION" />
            <category android:name="MY_APPLICATION_PACKAGE_ID" />
        </intent-filter>
    </receiver>
	
</application>
```

<br>

### 2.3 Initialize library

The `init` function should be called only **once** during your application lifetime to setup the SDK:

`Android:`

```java
public class MyAppClass extends Application {

    @Override
    public void onCreate() {
        super.onCreate();

        //AdpPushClient.init() should always be called in onCreate of Application class
        AdpPushClient.init(
                getApplicationContext(),
                MY_ACTIVITY.class,
                "APP_ID/SENDER_ID", //based on your environment
                "API_KEY",          //based on your environment
                "SDK_USERNAME",     //based on your environment
                "SDK_PASSWORD"      //based on your environment
        );

        //true connects to Sandbox environment
        //false connects to Production environment
        AdpPushClient.get().setDevelopment(DEV_MODE);
    }
    
    @Override
    public void onTerminate() {
        if (AdpPushClient.get() != null) {
            AdpPushClient.get().dismiss();
        }

        super.onTerminate();
    }
}
```
You'll find your API keys (`APP_ID`, `API_KEY`, `SDK_USERNAME`, `SDK_PASSWORD`) in panel→Settings → access keys and tokens.

<br>

`IOS:`

```objectivec
//Objective-C

#import "AppDelegate.h"
#import <AdpPushClient/AdpPushClient.h>

@interface AppDelegate ()<PushClientManagerDelegate>
@property (nonatomic, strong) PushClientManager *manager;
@end

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application
            didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
    
    //YES connects to Sandbox environment
    //NO connects to Production environment
    [PushClientManager setDevelopment:YES];
    //Reset badge and clear notification when app launched.
    [PushClientManager  resetBadge];

	_manager = PushClientManager.defaultManager;
    [_manager addDelegate:self];
    
    //Initialize with credential keys
    BOOL state = [_manager
		                 registerApplication:@"APP_ID" //based on your environment
                         apiKey:@"API_KEY"             //based on your environment
                         userName:@"SDK_USERNAME"      //based on your environment
                         password:@"SDK_PASSWORD"];    //based on your environment
    
    if (state) {
        NSLog(@"Initialized");
    } else {
	    NSLog(@"Not initialized");
    }
    
    if ([_manager application:application didFinishLaunchingWithOptions:launchOptions]) {
        NSLog(@"Launched by tapping on notification");
    }
 
    return YES;
}

#pragma mark - Notification AppDelegation

- (void)application:(UIApplication *)application didFailToRegisterForRemoteNotificationsWithError:(NSError *)error{
    // Handle failure of get Device token from Apple APNS Server
    [_manager application:application didFailToRegisterForRemoteNotificationsWithError:error];
}

- (void)application:(UIApplication *)application didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken{
    // Handle receive Device Token From APNS Server
    [_manager application:application didRegisterForRemoteNotificationsWithDeviceToken:deviceToken];
}

- (void)application:(UIApplication *)application didRegisterUserNotificationSettings:(UIUserNotificationSettings *)notificationSettings{
    // Handle iOS 8 remote Notificaiton Settings
    [_manager application:application didRegisterUserNotificationSettings:notificationSettings];
}
@end
```

```swift
//Swift:

import UIKit
import AdpPushClient

@UIApplicationMain
class AppDelegate: UIResponder, UIApplicationDelegate, PushClientManagerDelegate {
    
    var window: UIWindow?
    let _manager = PushClientManager.default()
    
    func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplicationLaunchOptionsKey: Any]?) -> Bool {
        
        //true connects to Sandbox environment
        //false connects to Production environment
        PushClientManager.setDevelopment(true)
        //Reset badge and clear notification when app launched.
        PushClientManager.resetBadge()
        
        _manager?.addDelegate(self)
        
        //Initialize with credential keys
        let state = _manager?.registerApplication("APP_ID",					//based on your environment
                                                 apiKey: "API_KEY",     	//based on your environment
                                                 userName: "SDK_USERNAME",  //based on your environment
                                                 password: "SDK_PASSWORD")  //based on your environment
        
        if state == true {
            print("Initialized")
        } else {
            print("Not initialized")
        }
        
        if _manager?.application(application, didFinishLaunchingWithOptions: launchOptions) == true {
            print("Launched by tapping on notification")
        }
      
        return true
    }
    
    //MARK : Notification AppDelegation
    
    func application(_ application: UIApplication, didFailToRegisterForRemoteNotificationsWithError error: Error) {
        // Handle failure of get Device token from Apple APNS Server
        _manager?.application(application, didFailToRegisterForRemoteNotificationsWithError: error)
    }
    
    func application(_ application: UIApplication, didRegisterForRemoteNotificationsWithDeviceToken deviceToken: Data) {
        // Handle receive Device Token From APNS Server
        _manager?.application(application, didRegisterForRemoteNotificationsWithDeviceToken: deviceToken)
    }
    
    @available(iOS 8.0, *)
    func application(_ application: UIApplication, didRegister notificationSettings: UIUserNotificationSettings) {
        // Handle iOS 8 remote Notificaiton Settings
        _manager?.application(application, didRegister: notificationSettings)
    }
}
```
You'll find your chabok API keys (`APP_ID`, `API_KEY`, `SDK_USERNAME`, `SDK_PASSWORD`)  panel→Settings → access keys and tokens:

<br>

### 2.4 Register Users
One of chabok's advantages is identifying each and every user with a unique Id. This will allow you to manage all devices of a user and gather user info just like a CRM system. This Id can be used on several devices of a user. You can setup this Id on any meaningful field related to your business. It can be users' phone or social security number, email and even your database's Id. This way your messages will be sent through this Id and not tokens or device Ids.

> `note:` Trackers usually count installs on the first app launch. But with chabok's tracker you can count an install after user login or verification. By doing this you are taking yet another step to prevent fraud. This way users' signatures will be checked before and after registration. 

`Android:`

`register` method handles **connecting to chabok servers**, and should only be called once during an app launch:
```java
AdpPushClient.get().register("USER_ID");
```

<br>

`IOS:`
```objectivec
//Objective-C:

[_manager registerUser:@"USER_ID"];
```
```swift
//Swift:

_manager?.registerUser("USER_ID")
```
#### Register Guest Users
If your application has a signup or register section, you can use this method to register users who don't register, as **guests users**. This method will register those users as guests and automatically assigns a `guest` tag to them. This way you can **send messages to guest users** and also **track installs based on users' first app launch (just like Adjust)**.

`Android:`
```java
@Override
public void onCreate() {
    super.onCreate();

    ...
    
    String userId = AdpPushClient.get().getUserId();
    
    if (userId != null && !userId.isEmpty()) {
        AdpPushClient.get().register(userId);
    } else {

        //If user is not registered verify the user and
        //call AdpPushClient.get().register("USER_ID") method at login page
        
        //If you have guest users
        // should be called here (If you want to track installs on user's first app launch (just like Adjust))
        AdpPushClient.get().registerAsGuest();

    }
}
```

<br>

`IOS:`
```objectivec
//Objective-C

- (BOOL)application:(UIApplication *)application
            didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
    
    ...
    
    if (_manager.userId) {
        [_manager registerUser:_manager.userId];
    } else {
        //If user is not registered verify the user and
        //call [_manager registerUser:@"USER_ID"]; method at login page

        //If you have guest users
        // should be called here (If you want to track installs on user's first app launch (just like Adjust))
        [_manager registerAsGuest];
    }
    
    return YES;
}
```

```swift
//Swift
func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplicationLaunchOptionsKey: Any]?) -> Bool {

    ...
    
    if let userId = _manager?.userId {
        _manager?.registerUser(userId)
    } else {
        //If user is not registered verify the user and
        //call manager?.registerUser("USER_ID") method at login page

        //If you have guest users
        // should be called here (If you want to track installs on user's first app launch (just like Adjust))
        _manager?.registerAsGuest()  
    }

    return true
}
```

<br><br>

## 3. Chabok Messaging and Push notification  
For messaging, chabok utilizes two ways. When user is connected to Chabok, we use our own channels to send in-app messages in realtime and if not, we'll automatically send a notification to get users to open the application and receive your message.

<br>

### 3.1 Click and Personalized Display on Notification 
Chabok automatically shows notifications for its messaging. You can add your code to modify notification display and click. To do that you need to sample a `NotificcationHandler` object. Have a look at the following example:

`Android:`
```java                
NotificationHandler notificationHandler = new NotificationHandler() {
    @Override
    public Class getActivityClass(ChabokNotification chabokNotification) {
        //return preferred activity class to be opened on this message's notification
        return MY_MAIN_ACTIVITY_CLASS.class;
    }

    @Override
    public boolean buildNotification(ChabokNotification chabokNotification,
                                         NotificationCompat.Builder builder) {
        // use builder to customize the notification object
        // return false to prevent this notification to be shown to the user
    	// otherwise true
        return true;
    }
};

AdpPushClient.get().addNotificationHandler(notificationHandler);
```

<br>

#### 3.2 Receive Notification Data
You can also access your notification data. Take a look at the following example:
```java
if (chabokNotification.getExtras() != null) {
    Bundle payload = chabokNotification.getExtras();

    //FCM message data
    Object data = payload.get("data");
} else if (chabokNotification.getMessage() != null) {
    PushMessage payload = chabokNotification.getMessage();

    //Chabok message data
    JSONObject data = payload.getData();
}
```

<br>

`IOS:`

For personalizing notifications you can use the `delegate` method of `pushClientManagerUILocalNotificationDidReceivedMessage`(if you do this Chabok will not show `LocalNotifications`) . Have a look the code below: 

```objectivec
//Objective-C:

-(void)pushClientManagerUILocalNotificationDidReceivedMessage:(PushClientMessage *)message {
    UILocalNotification *localNotification = [[UILocalNotification alloc] init];
    
    localNotification.timeZone = [NSTimeZone localTimeZone];
    localNotification.soundName = UILocalNotificationDefaultSoundName;
    localNotification.applicationIconBadgeNumber = 0;
    localNotification.alertBody = message.messageBody;
    localNotification.alertAction = @"OK";
    localNotification.userInfo = @{@"data":message.toDict};
    
    [[UIApplication sharedApplication] scheduleLocalNotification:localNotification];
}
```
```swift
//Swift:

func pushClientManagerUILocalNotificationDidReceivedMessage(_ message: PushClientMessage) {
    let localNotification = UILocalNotification()
        
    localNotification.timeZone = NSTimeZone.local
    localNotification.soundName = UILocalNotificationDefaultSoundName
    localNotification.applicationIconBadgeNumber = 0
    localNotification.alertBody = message.messageBody
    localNotification.alertAction = "OK"
    localNotification.userInfo = ["data": message.toDict]
        
    UIApplication.shared.scheduleLocalNotification(localNotification)
}
```

<br><br>

## 4. Event Tracking

Every user interaction with your app is considered as an **event**. You can track these events in real-time and analyze user behavior. Event-tracking also lets you run **CPA campaigns** and assign goals for users. 

For this function you can use `track` method. This method acquires two inputs (event name and data): 

`Android:` 
```java
public void track(final String trackName, JSONObject data)
```
For example you want to track **purchases** in your app:
```java
JSONObject data = new JSONObject();
data.put("product_id", 35147652);

AdpPushClient.get().track("purchase", data);
```

<br>

`IOS:`
```objectivec
//Objective-C
[self.manager track:@"YOUR_TRACK_NAME" data:@{@"KEY":@"VALUE"}];
```
```swift
//Swift
self.manager.track("YOUR_TRACK_NAME", data: ["KEY":"VALUE"])
```

For example you want to track **purchases** in your app:
```objectivec
//Objective-C
[self.manager track:@"purchase" data:@{@"product_id":@(35147652)}];
```
```swift
//Swift
self.manager.track("purchase", data: ["product_id":35147652])
```

<br><br>

## 5. Tag Users

Chabok lets you group your users in different ways. One of them is assigning tags to users. For example you can assign tags based on users' gender, age, app usage (premium, gold, silver...).

<br>

### 5.1 Add Tags
Using `addTag`method you can assign one or multiple tags to a user.

`Android:`
```java
//Add a tag to current user.
AdpPushClient.get().addTag("TAG_NAME", new Callback() {...});

//Add array of tags to current user.
AdpPushClient.get().addTag(new String[]{"TAG_NAME_1", "TAG_NAME_2"}, new Callback() {...});
``` 
example:
```java
AdpPushClient.get().addTag("Premium_User", new Callback() {  
	@Override  
	public void onSuccess(Object value) {  
		Log.d(TAG, "Successfully added tag to current user devices");  
	}  
  
	@Override  
	public void onFailure(Throwable value) {  
		Log.d(TAG, "Couldn't add tag to current user devices");  
	}  
});
```

<br>

`IOS:`
```objectivec
//Objective-C:

[self.manager addTag:@"TAG_NAME"];
```
```swift
//Swift:

self.manager?.addTag("TAG_NAME")
```
example of  assigning multiple tags to a user:
```objectivec
//Objective-C
[self.manager addTags:@[@"Premium_User",@"MALE",@"Teenage"] success:^(NSInteger count) {
            NSLog(@"Add tags to %zd devices", count);
        } failure:^(NSError *error) {
            NSLog(@"Error to adding tags %@",error);
        }];
```
```swift
//Swift
manager.addTags(["Premium_User", "MALE", "Teenage"], success: { count in
    print("Add tags to \(count) devices")
}, failure: { error in
    if let anError = error {
        print("Error to adding tags \(anError)")
    }
})
```

### 5.2 Remove Tags
You can also use `removeTag` method to remove assigned tags.

`Android:`
```java
AdpPushClient.get().removeTag("TAG_NAME", new Callback() {...});
```
example:
```java
AdpPushClient.get().removeTag("Premium_User", new Callback() {  
	@Override  
	public void onSuccess(Object value) {  
		Log.d(TAG, "Successfully removed tag to current user devices");  
	}  
  
	@Override  
	public void onFailure(Throwable value) {  
		Log.d(TAG, "Couldn't remove tag to current user devices");  
	}  
});
```
`IOS:`
```objectivec
//Objective-C:

[self.manager removeTag:@"Premium_User"];
```
```swift
//Swift:

self.manager?.removeTag("Premium_User")
```

example:
```objectivec
//Objective-C:

[self.manager removeTag:@"TAG_NAME"];
```
```swift
//Swift:

self.manager?.removeTag("TAG_NAME")
```
