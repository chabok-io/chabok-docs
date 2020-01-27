---
id: upgrade-chabok-to-2-0-0
title: راهنمای ارتقا به نسخه ۲ چابک
layout: javascript
permalink: javascript/upgrade-chabok-to-2-0-0.html
---


با مطالعه راهنمای زیر می‌توانید نسخه کتابخانه javascript خود را به **نسخه‌های ۲.۰.۰ به بعد ارتقا دهید**. برای این کار فقط کافیست نسخه جدید را دریافت کنید، و تعدادی کد را حذف و اضافه کنید.

مراحل ارتقا را باید به ترتیب زیر انجام دهید:

[۱- تغییرات ورود کاربر (login)](/javascript/upgrade-chabok-to-2-0-0.html#۱--تغییرات-ورود-کاربر-Login)

[۲- تغییرات خروج کاربر (logout)](/javascript/upgrade-chabok-to-2-0-0.html#۲--تغییرات-خروج-کاربر-Logout)


### ۱- تغییرات ورود کاربر (Login)

در صورتی که در اپلیکیشن‌تان، پس از احراز هویت، کاربر را با یک نام کاربری (USER_ID) در چابک ثبت می‌کنید، تغییرات زیر را در کدتان اعمال کنید:

```diff
- chabok.register("USER_ID");

+ chabok.login("LOGIN_USER_ID"); 
```

> `نکته:` اگر متد `register` را در هر بار باز شدن سایت فراخوانی می‌کنید نیازی به این کار نیست و آن دستورات را حذف کنید.

<br><br>

### ۲- تغییرات خروج کاربر (Logout)

چنانچه به هنگام خروج کاربر از حساب کاربری از متدهای `unregister` و یا `registerAsGuest` استفاده می‌کنید، تغییرات زیر را در کد خود اعمال کنید:

```diff
- chabok.unregister();
- chabok.registerAsGuest();

+ chabok.logout();
```
