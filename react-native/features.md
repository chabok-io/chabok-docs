---
id: features
title: امکانات‌ دیگر
layout: react-native
permalink: react-native/features.html
prev: verification.html
next: troubleshoot.html
---

چابک متناسب با نیاز شما امکانات دیگری را هم در اختیار شما می گذارد. در این صفحه می‌توانید از [وضعیت اتصال سرور و کلاینت](/react-native/features.html#وضعیت-اتصال-به-سرور) مطلع شوید. شناسه‌های [دستگاه](/react-native/features.html#دریافت-شناسه-دستگاه) و [کاربر](/react-native/features.html#دریافت-شناسه-کاربر) خود را از چابک دریافت نمایید. در آخر می‌توانید از [اطلاعات کاربران](/react-native/features.html#مدیریت-اطلاعات-کاربر) خود را مدیریت کنید.

<Br>

### وضعیت اتصال به سرور

برای اطلاع از وضعیت آنلاین یا آفلاین بودن،میتوانید از متد زیر استفاده کنید:

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
`closed`: دریافت وضعیت اتصال بسته شده است

```javascript
chabok.on('closed', _ => {status = 'closed ...'}); 
```

`error`: رویداد دریافت خطا‌ها 

```javascript
chabok.on('error', _ => {status = 'error ...'}); 
```
<Br>

### دریافت شناسه دستگاه

هر دستگاه در سرویس چابک دارای یک شناسه منحصر به فرد می‌باشد، برای دسترسی به این شناسه می‌توانید متد زیر را فراخوانی کنید:

```javascript
chabok.getInstallationId().then( installationId => {
	console.log('InstallationId: ', installationId)
}).catch(error => {
	console.log('Fail to getInstallationId', error)
})
```
### دریافت شناسه کاربر

هر کاربر در سرویس چابک دارای یک شناسه منحصر به فرد می‌باشد، برای دسترسی به این شناسه می‌توانید متد زیر را فراخوانی کنید:

```javascript
chabok.getUserId().then(userId => {
	console.log('userId: ', userId)
}).catch(error => {
	console.log('Fail to getUserId', error)
})
```
