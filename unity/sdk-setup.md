---
id: sdk-setup
title: راه‌اندازی
layout: sdk-setup
permalink: unity/sdk-setup.html
next: tracker.html
---

پس از طی کردن مراحل صفحه [پیش‌نیازها](/unity/required.html)، می‌توانید **راه‌اندازی SDK چابک** را شروع کنید. در ابتدا شما باید کتابخانه چابک را [نصب کنید](/unity/sdk-setup.html#۱--نصب-کتابخانه). پس از آن، [مقداردهی و راه‌اندازی](/unity/sdk-setup.html#۳--مقداردهی-اولیه-initialize) کتابخانه چابک را در اپلیکیشنتان انجام دهید و برای شناخت کاربر توسط چابک، مرحله [ثبت کاربر](/unity/sdk-setup.html#۴--ثبت-کاربر-register) را حتما پشت سر بگذارید.

برای انجام موفق این کار باید تمام مراحل زیر را به ترتیب انجام دهید:

[۱- نصب کتابخانه](/unity/sdk-setup.html#۱--نصب-کتابخانه)

[۲- مقداردهی اولیه (Initialize)](/unity/sdk-setup.html#۳--مقداردهی-اولیه-initialize)

[۳- ثبت کاربر (Register)](/unity/sdk-setup.html#۴--ثبت-کاربر-register)

<Br>

### افزودن Dependency

در ابتدا دقت نمایید که ‍‍`dependency`‌ های لازم را از [این قسمت](https://github.com/Husseinhj/chabok-starter-unity/tree/master/Assets/Plugins/Android) دانلود کنید و در مقصد `myproject/Assets/Plugins/Android` قرار دهید.


### نصب کتابخانه

برای اضافه کردن کتابخانه چابک به پروژه‌تان باید تمام فایل‌هایی که در [فولدر `chabokpush`](https://github.com/Husseinhj/chabok-starter-unity/tree/master/Assets/Scripts/ChabokPush) است را در `Scripts` پروژه خودتان قرار دهید.

#### مدل نسخه‌گذاری در چابک (Semantic Versioning)

چابک از مدل نسخه‌گذاری `MAJOR`.`MINOR`.`PATCH` استفاده می‌کند. همه تغییرات نسخه‌ها بلافاصله پس از انتشارشان به صورت موردی در صفحه **لیست  تغییرات** برای اطلاع شما اضافه می‌شوند. برای همین توصیه می‌کنیم [این صفحه](/android/release-note.html) را حتما مطالعه نمایید. این موارد برای هر نسخه در دو بخش [**ارتقا** (در صورت وجود ارتقا)](/android/release-note.html#ارتقا) و [**تغییرات**](/android/release-note.html#تغییرات) برای شما نمایش داده شده‌ است.

- `Patch:` تغییرات در این سطح شامل **Bug Fix** و **قابلیت‌های بسیار کوچک** می‌باشد. به روز رسانی به این نسخه‌ها نیاز به تغییری در کد ندارد. برای آگاهی از آن‌ها، باید بخش [**تغییرات**](/android/release-note.html#تغییرات) را مطالعه کنید. به عنوان مثال به‌ روز رسانی کتابخانه چابک از نسخه `2.14.0` به نسخه `2.14.1` مربوط به این سطح می‌شود.
- `Minor:` تغییرات در این سطح شامل **قابلیت‌های بزرگتر** و **تغییر در کارکرد (Functionality) کتابخانه** می‌شود. در به روز رسانی به این نسخه‌ها حتما باید بخش [**ارتقا**](/android/release-note.html#ارتقا) و [تغییرات](/android/release-note.html#تغییرات) صفحه لیست تغییرات را با دقت مطالعه کنید. در صورت بروز هر گونه مشکل در نتیجه رعایت نکردن نکات بخش **ارتقا** و **تغییرات** در به روز رسانی به نسخه‌های **Minor**، تیم چابک مسئولیتی را نمی‌پذیرد. توصیه می‌کنیم که هر سه تا شش ماه اقدام به بررسی نسخه‌های **Minor** نمایید. به عنوان مثال به‌ روز رسانی کتابخانه چابک از نسخه `2.12.1` به نسخه `2.14.1` مربوط به این سطح می‌شود.
- `Major:` این سطح از تغییرات مخصوص **بازنویسی** و یا **تغییرات اساسی** در کتابخانه چابک است. در به روز رسانی به این نسخه‌ها حتما باید بخش [**ارتقا**](/android/release-note.html#ارتقا) و [**تغییرات**](/android/release-note.html#تغییرات) تغییرات صفحه لیست تغییرات را با دقت مطالعه کنید. در صورت بروز هر گونه مشکل در نتیجه رعایت نکردن نکات بخش **ارتقا** و **تغییرات** در به روز رسانی به نسخه‌های **Major**، تیم چابک مسئولیتی را نمی‌پذیرد. بنابراین توصیه می‌کنیم که هر یک سال اقدام به بررسی نسخه‌های **Major** نمایید. به عنوان مثال به‌روزرسانی کتابخانه چابک از نسخه `1.0.1` به نسخه `2.14.1` مربوط به این سطح می‌شود.

> `نکته:` توصیه می‌کنیم برای دریافت آخرین نسخه **Bug Fix**ها از کاراکتر + (wildcard) استفاده نمایید تا gradle به صورت خودکار نسخه‌های patch را بیاورد. 

<Br>

### مقداردهی اولیه

چابک برای راه‌اندازی نیاز به مقداردهی اولیه دارد. برای همین متد `init` چابک باید در کلاس `Main.cs` تحت هر شرایطی فراخوانی شود.

```csharp
using System.Collections;
using System.Collections.Generic;
using Application;
using UnityEngine;

public class Main : MonoBehaviour
{
    // Start is called before the first frame update
    void Start()
    {
        AndroidJavaObject unityPlayerActivity = new AndroidJavaClass("com.unity3d.player.UnityPlayer");
        AndroidJavaObject currentActivity = unityPlayerActivity.GetStatic<AndroidJavaObject>("currentActivity");
        AndroidJavaObject context = currentActivity.Call<AndroidJavaObject>("getApplicationContext");

        var chabok = new ChabokPush();
        chabok.Init(context, unityPlayerActivity, "APP_ID/SENDER_ID", "API_KEY", "USERNAME", "PASSWORD");
        chabok.SetDevelopment(true);
}
    }
```

در این متد به جای پارامتر‌های `APP_ID/SENDER_ID`, `API_KEY(SDK_KEY)`, `SDK_USERNAME`, `SDK_PASSWORD` مقادیر مربوط به حساب چابک خود را وارد نمایید. نحوه ایجاد حساب در بخش [پیش‌نیازها](/android/required.html) توضیح داده شده است. در صورت داشتن حساب چابک هم می‌توانید این مقادیر را از [**پنل بخش تنظیمات قسمت دسترسی‌ و توکن‌ها**](/panel/settings.html#دسترسیها-و-توکنها) بردارید.

مقدار `MY_ACTIVITY` را نام کلاس `Activity`ای قرار دهید که چابک به طور پیش‌فرض پس از کلیک شدن روی اعلان، `Activity `تعیین شده را باز کند. (برای شخصی‌سازی اعلان‌ها [این بخش](/android/push-notification.html#شخصیسازی-نمایش-و-کلیک-روی-اعلان) را مشاهده کنید.)

مقدار `SENDER_ID` در پارامتر `APP_ID/SENDER_ID` همان **شناسه گوگل** برای *دریافت پوش‌نوتیفیکیشن* می‌باشد که در پنل در بخش [تنظیمات پلتفرم اندروید](/panel/settings.html#پلتفرمها) قرار داده‌اید و `APP_ID` همان `APP_ID‌`ای که در پنل در بخش [دسترسی و توکن‌ها](/panel/settings.html#دسترسیها-و-توکنها) قرار داده شده است، می‌باشد.

> `نکته`:  توجه داشته باشید متد `AdpPushClient.init` تحت هر شرایط **حتما** باید در کلاس `Application` و در متد `onCreate` فراخوانی شود. متد فوق برای مقداردهی پارامتر‌های ضروری چابک می‌باشد و در صورت عدم فراخوانی آن در حالت **بسته** (Kill) بودن اپلیکیشن، با خطا مواجه خواهید شد.

متد `setDevelopment` تعیین می‌کند که اپلیکیشن شما به محیط [آزمایشی (Sandbox)](https://sandbox.push.adpdigital.com) و یا [عملیاتی (Production) ](https://panel.push.adpdigital.com) چابک متصل شود. این موضوع بستگی به این دارد که حساب کاربری شما روی کدام محیط تعریف شده باشد.
مقدار `true` به محیط آزمایشی و  مقدار`false` به محیط عملیاتی متصل می‌شود. در نظر داشته باشید، هر محیط به کلیدهای دسترسی (AppId, APIKey, Username و Password) خودش در متد `init` نیاز دارد. بنابراین در صورت تغییر مقدار `setDevelopment` کلید‌های دسترسی آن هم باید تغییر داده شود.
