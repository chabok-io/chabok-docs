---
id: features
title: امکانات‌ دیگر
layout: cordova
permalink: cordova/features.html
prev: behavior-tracking.html
next: release-note.html
---

چابک متناسب با نیاز شما امکانات دیگری را هم در اختیارتان می گذارد. در این صفحه می‌توانید از [وضعیت اتصال سرور و کلاینت](/cordova/features.html#وضعیت-اتصال-به-سرور) مطلع شوید. شناسه‌های [دستگاه](/cordova/features.html#دریافت-شناسه-دستگاه) و [کاربر](/cordova/features.html#دریافت-شناسه-کاربر) خود را از چابک دریافت نمایید.

<Br>

### دریافت شناسه کاربر

چابک شناسه کاربر را پس از ثبت به صورت **رمزنگاری** شده در حافظه دستگاه ذخیره می‌کند. توصیه می‌شود از ذخیره‌سازی این شناسه **خودداری کنید** و با استفاده از متد `getUserId` شناسه کاربر را دریافت کنید:


```javascript
chabok.getUserId()
```
<Br><Br>

### دریافت شناسه دستگاه

هر دستگاه در پلتفرم چابک دارای یک شناسه منحصر به فرد می‌باشد، برای دسترسی به این شناسه می‌توانید متد زیر را فراخوانی کنید:

```javascript
chabok.getInstallationId()
```
<Br><Br>

### وضعیت اتصال به سرور

برای اطلاع از وضعیت آنلاین یا آفلاین بودن، می‌توانید از متد زیر استفاده کنید:

```javascript
chabok.setOnConnectionStatusCallback((status) => {
    console.log(status); // status => [CONNECTED, CONNECTING, DISCONNECTED]
})
```
