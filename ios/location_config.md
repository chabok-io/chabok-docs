`نکته :`  برای دسترسی به location باید کلید های زیر را با پیام مناسب
در فایل `info.plist` قرار دهید

```xml
<key>NSLocationAlwaysUsageDescription</key>
<string>App would like to use your location.</string>
<key>NSLocationWhenInUseUsageDescription</key>
<string>Allow use to access your current location so we can autofill your start/end</string>
<key>NSLocationAlwaysAndWhenInUseUsageDescription</key>
<string>Allow use to access your current location Always or InUse</string>
```
