---
id: features
title: امکانات‌ دیگر
layout: javascript
permalink: javascript/features.html
prev: verification.html
next: troubleshoot.html
---

چابک متناسب با نیاز شما امکانات دیگری را هم در اختیارتان می گذارد. در این صفحه می‌توانید از [وضعیت اتصال سرور و کلاینت](/javascript/features.html#وضعیت-اتصال-به-سرور) مطلع شوید. شناسه‌های [دستگاه](/javascript/features.html#دریافت-شناسه-دستگاه) و [کاربر](/javascript/features.html#دریافت-شناسه-کاربر) خود را از چابک دریافت نمایید.

<Br>

### دریافت شناسه کاربر

چابک شناسه کاربر را پس از ثبت به صورت **رمزنگاری** شده در حافظه دستگاه ذخیره می‌کند. توصیه می‌شود از ذخیره‌سازی این شناسه **خودداری کنید** و با استفاده از متد `getUserId` شناسه کاربر را دریافت کنید:


```javascript
chabok.getUserId()
```
<Br><Br>

### دریافت شناسه دستگاه

هر دستگاه در سرویس چابک دارای یک شناسه منحصر به فرد می‌باشد، برای دسترسی به این شناسه می‌توانید متد زیر را فراخوانی کنید:

```javascript
chabok.getInstallationId()
```
<Br><Br>

### وضعیت اتصال به سرور

برای اطلاع از وضعیت آنلاین یا آفلاین بودن، می‌توانید از متد زیر استفاده کنید:

`connecting`: دریافت وضیت در حال اتصال

```javascript
chabok.on('connecting', _ => {status = 'Connecting ...'}); 
```

`connected`: دریافت وضعیت اتصال برقرار شده است

```javascript
chabok.on('connected', _ => {status = 'connected ...'}); 
```

`disconnected`: دریافت وضعیت اتصال قطع شده است

```javascript
chabok.on('disconnected', _ => {status = 'disconnected ...'}); 
```
