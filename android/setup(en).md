---
id: setup-en
title: Chabok Integration
layout: android
permalink: android/setup-en.html
direction: ltr
---

## 1. Prerequisites

Before you start, first you'll need to **create a Chabok account** and **generate your notification API Keys**.

### 1.1 Creating Chabok Account

There are two kinds of accounts in Chabok. Our free account which is for **testing** and is based on **sandbox** environment. And our premium which is for launching your app and is based on **production** environment.

 Our **sandbox** account has a **limited capacity for users** and does not support more. Therefore if you want to release your app in official stores, we recommend on using our production account which has no limitations. Also your **data** cannot be transferred between these two accounts, since they are completely separate and based on different environments.

For creating a Chabok account [go here](https://chabok.io/demo.html).

> `Note:` After creating a new account, you will have your **SDK keys** in panel→settings→Access tokens. These keys are needed for [**initializing our library**](/android/chabok(en).html#23-initialize-library).

### 1.2 Configuring notifications

To send notifications on android , you'll need to enter your generated **API key** and **senderId** in  settings⚙️→ platforms→android cart.
If you don't have the keys, [see how to get them](https://webkul.com/blog/generate-api-key-fcm-sender-id/). 

![enter image description here](http://uupload.ir/files/49vx_panel-api-keys.png)

<br><br>

## 2. SDK Integration

To successfully integrate our SDK, follow the steps below:

[ 1- Add chabok library to your project](/android/chabok(en).html#21-add-chabok-library-to-your-project)

[ 2- Add push notification support](/android/chabok(en).html#22-add-push-notification-support-android-only)

[ 3- Initialize library](/android/chabok(en).html#23-initialize-library)

[ 4- Register users](/android/chabok(en).html#24-register-users)

### 2.1 Add chabok library to your project

Chabok is compatible with **Android 4 and higher**.

Chabok library is available on `jcenter`. Therefore first **add `jcenter` as a repository** in your main project `gradle`:

```javascript
buildscript {
  repositories {
    jcenter()
  }
}  
```

then **open** `build.gradle` in `app` file and **add** the following dependencies:

```javascript
dependencies {
    implementation 'me.leolin:ShortcutBadger:1.1.22@aar'
    implementation 'com.adpdigital.push:chabok-lib:2.16.0'

    //If you want to get the push notification, add to dependencies
    implementation 'com.google.android.gms:play-services-gcm:10.2.6' 
    implementation 'com.android.installreferrer:installreferrer:1.0'
}
```

<br>

### 2.2 Add Push Notification Support

To **activate push notifications** for your app, **add** `GcmReceiver` to `AndroidManifest.xml` in `application` class:
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

The `init` function should be called only **once** during your application lifetime to connect and verify the SDK:

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
You'll find your API keys (`APP_ID`, `API_KEY`, `SDK_USERNAME`, `SDK_PASSWORD`) in panel→Settings⚙️ → access keys and tokens.

<br>

### 2.4 Register Users

One of Chabok's advantages is identifying each and every user with a **unique Id**. This will allow you to **manage all devices of a user** and gather user info just like a CRM system. This Id **can be used on several devices of a user**. You can setup this Id on any meaningful field related to your business. It can be users' phone or social security number, email and even your database's Id. This way your messages will be sent through this Id and not tokens or device Ids.

> `note:` Trackers usually count installs on the first app launch. But with chabok's tracker you can count an install after user login or verification. By doing this you are taking yet another step to prevent fraud. This way users' signatures will be checked before and after registration. 

`register` method handles **connecting to chabok servers**, and should only be **called once** during an app launch:

```java
AdpPushClient.get().register("USER_ID");
```

#### Register Guest Users

If your application has a signup or register section, you can use this method to register users who don't register, as **guests users**. This method will register those users as guests and automatically assigns a `guest` tag to them. This way you can **send messages to guest users** and also **track installs based on users' first app launch (just like Adjust)**.

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
<br><br>

## 3. Chabok Messaging and Push notification  

For messaging, chabok utilizes **two ways**. When user is **connected to Chabok**, we use our own channels to send in-app messages in realtime and if not, we'll automatically send a **notification** to get users to open the application and receive your message.

<br>

### 3.1 Click and Personalized Display on Notification
 
By default Chabok shows notifications for its messaging. You can add your code to modify notification **display and click**. To do that you need to sample a `NotificcationHandler` object. Have a look at the following example:

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

You can also **access your notification data**. Take a look at the following example:

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
<br><br>

## 4. Event Tracking

Every user interaction with your app is considered as an **event**. You can track these events in real-time and analyze user behavior. Event-tracking also lets you run **CPA campaigns** and assign goals for users. 

For this function you can use `track` method. This method acquires two inputs (event name and data): 

```java
public void track(final String trackName, JSONObject data)
```
For example you want to track **purchases** in your app:
```java
JSONObject data = new JSONObject();
data.put("product_id", 35147652);

AdpPushClient.get().track("purchase", data);
```
<br><br>

## 5. Tag Users

Chabok lets you **group your users** in different ways. One of them is **assigning tags** to users. For example you can assign tags based on users' gender, age, app subscription (premium, gold, silver...).

<br>

### 5.1 Add Tags

Using `addTag`method you can assign one or multiple tags to a user.

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
### 5.2 Remove Tags

You can also use `removeTag` method to **remove assigned tags** .

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
<br><br>

## Tracking Installs from Application Stores

With Chabok tracker you can track your installs from different android stores. 

### Track from Google Play Store

To do this you need to use  android's `INSTALL_REFERRER` intent. This referrer is used to **inform** our SDK your new installs from Google Play store. You just have to make sure you're listening. Therefore make sure you have added the following to your `build.gradle`.

```java
implementation 'com.android.installreferrer:installreferrer:1.0'
```
### Track from Third-party App Stores

You have **two ways** of doing this depending on whether the store supports the `INSTALL_REFERRER`or not. If it does you just have to **add a broadcast receiver**. And if not, you can **use Chabok's tracker ID**.

#### Using Referrer

For tracking third-party stores that support the referrer, **add** the following `receiver` tag inside the `application` tag in your `AndroidManifest.xml`:

```java
<receiver
    android:name="com.adpdigital.push.ChabokReferrerReceiver"
    android:permission="android.permission.INSTALL_PACKAGES"
    android:exported="true">
       <intent-filter>
            <action android:name="com.android.vending.INSTALL_REFERRER" />
        </intent-filter>
</receiver>
```
#### Using Tracker ID

For tracking third-party stores that don't support the referrer, you can **use Chabok's tracker ID to figure out the install source**. To do that first you have to create a tracker then put the ID in your apk file.

```java
AdpPushClient.setDefaultTracker("YOUR_TRACKER_ID");
```

> `Note:` TrackerId is the six character id that is in your tracker URL. For example in `https://sand.chabok.io/JY@4sc` the trackerId is `JY@4sc`. You can get this Id from your panel>tracker>details as shown in the following picture:
![enter image description here](http://uupload.ir/files/75o8_bjbc_tracker-analytics-s.png)

<br><br>

## Deeplink

Deep linking refers to the use of a specific URL that **directs users to a particular page** on a website, mobile site, or a precise location within the app. 

![enter image description here](http://uupload.ir/files/kc0g_deeplinking.jpg)

To configure deeplink, you'll need to specify your destination by **scheme, host and prefix (if necessary)**. You'll have to **assign them to the activity** you want to launch once your app opens in the`AndroidManifest.xml`file. Add the  `intent-filter`  section to your desired activity in the manifest file and assign an  `android:scheme` property value with the desired scheme name:

```java
<activity
    android:name=".MainActivity"
    android:configChanges="orientation|keyboardHidden"
    android:label="@string/app_name"
    android:screenOrientation="portrait">

    <intent-filter android:label="@string/filter_view_example_gizmos">
        <action android:name="android.intent.action.VIEW" />
        <category android:name="android.intent.category.DEFAULT" />
        <category android:name="android.intent.category.BROWSABLE" />
        
        <!-- Accepts URIs that begin with "twitter://user” 
        <data android:scheme="twitter"
              android:host="user" />  -->
              
        <data android:scheme="APP_NAME"
              android:host="PAGE_NAME" />
    </intent-filter>
</activity>
```
If you want your app to **launch once the tracker URL is selected**, use the assigned scheme name in the Chabok tracker URL's  `deep_link`  parameter. It would look something like this:

```java
https://a.chabok.io/abc123?deep_link=APP_NAME%3A%2F%2Fpagename
```

Once you have received the deeplink content in your app, you can call  `appWillOpenUrl`  method for **sending information to the Chabok backend**.
Here's how its done:

```java
@Override
protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_main);

    Intent intent = getIntent();
    AdpPushClient.get().appWillOpenUrl(data);
}

@Override
protected void onNewIntent(Intent intent) {
    super.onNewIntent(intent);

    Uri data = intent.getData();
    AdpPushClient.get().appWillOpenUrl(data);
}
```
