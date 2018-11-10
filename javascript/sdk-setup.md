---
id: sdk-setup
title: راه‌اندازی
layout: javascript
permalink: javascript/sdk-setup.html
prev: required.html
next: chabok-messaging.html
---

پس از طی کردن مراحل صفحه [پیش‌نیازها](/javascript/required.html)، می‌توانید **راه‌اندازی SDK چابک** را شروع کنید. در ابتدا شما باید کتابخانه چابک را [نصب کنید](/android/sdk-setup.html#۱--نصب-کتابخانه)، مقداردهی و راه‌اندازی کتابخانه چابک را در اپلیکیشنتان [انجام دهید](/javascript/sdk-setup.html#۳--مقداردهی-اولیه-initialize) و برای شناخت کاربر توسط چابک، مرحله [ثبت کاربر](/javascript/sdk-setup.html#۴--ثبت-کاربر-register) را حتما پشت سر بگذارید.

برای انجام موفق این کار باید تمام مراحل زیر را به ترتیب انجام دهید:

[ ۱- نصب کتابخانه](/javascript/sdk-setup.html#۱--نصب-کتابخانه)

[۳- مقداردهی اولیه (Initialize)](/javascript/sdk-setup.html#۳--مقداردهی-اولیه-initialize)

[ ۴- ثبت کاربر (Register)](/javascript/sdk-setup.html#۴--ثبت-کاربر-register)

<Br>

> `نکته` :‌ تمامی متدهایی که در این بخش بیان می‌شود باید تنها یک بار فراخوانی شود.  

## نصب کتابخانه

برای نصب از طریق `npm`:

```bash
npm install chabokpush --save
```
```bash
yarn add chabokpush
```
و یا با استفاده از [CDN](https://unpkg.com/chabokpush/dist/chabokpush.min.js) ، چابک را به پروژه ی خود اضافه کنید.

```bash
<script src="https://unpkg.com/chabokpush/dist/chabokpush.min.js"></script>
```

###  افزودن Service Worker
 برای ارسال پوش نوتیفیکشن در پس‌زمینه باید فایل `ChabokSDKWorker.js` را از این [لینک](https://raw.githubusercontent.com/chabokpush/chabok-client-js/master/dist/ChabokSDKWorker.js) دریافت نموده و در root پروژه قرار دهید.
 
 اگر از **Github Desktop** استفاده می کنید برای دریافت از این [لینک](x-github-client://openRepo/https://github.com/chabokpush/chabok-client-js?branch=master&filepath=dist%2FChabokSDKWorker.js) استفاده کنید.

اگر از **Webpack** استفاده می‌کنید می توانید از پلاگین [CopyWebpackPlugin](https://github.com/webpack-contrib/copy-webpack-plugin)‍ برای انتقال service worker به پوشه dist استفاده کنید.

```javascript
 new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '/node_modules/chabokpush/dist/ChabokSDKWorker.js'),
        to: path.resolve(__dirname, '/dist'),
        ignore: ['.*']
      }
    ])
```



### ۱- مقدار‌دهی اولیه
برای ارتباط با سرور چابک، لازم است یک نمونه از کلاس  `chabokpush` بسازید و آن را مقدار‌دهی کنید.
برای مقدار‌دهی اولیه می‌بایست از طریق متد `chabok` اطلاعات حساب چابک و تنظیمات اولیه را وارد نمایید. ایجاد حساب در بخش [پیش‌نیازها](https://doc.chabokpush.com/javascript/required.html) توضیح داده شده است. در صورت داشتن حساب چابک هم می‌توانید این مقادیر را از [**پنل بخش تنظیمات قسمت دسترسی‌ و توکن‌ها**](https://doc.chabokpush.com/panel/settings.html#%D8%AF%D8%B3%D8%AA%D8%B1%D8%B3%DB%8C%D9%87%D8%A7-%D9%88-%D8%AA%D9%88%DA%A9%D9%86%D9%87%D8%A7) بردارید.


برای دریافت یا ارسال پیام از/به سرور چابک، لازم است یک نمونه از کلاس `chabokpush` بسازید و آن را مقدار‌دهی نمایید.  فراخوانی این متد فقط یکبار کافی‌ است. به قطعه کد زیر دقت کنید :

```javascript
const auth = {
  appId: 'APP_ID',
  apiKey: 'API_KEY(SDK_KEY)',
  username: 'USERNAME',
  password: 'PASSWORD',
  devMode:true
}
const options = {
      webpush: {
        enabled: true,
        publicKey: 'VAPID_Public_Key'
      },
      silent: false,
    };
const chabok = new chabokpush.Chabok(auth, options)
```

> `نکته ` : به طور کلی چابک شامل ۲ محیط سندباکس و عملیاتی می‌باشد. حساب‌های رایگان چابک (تا ۳۰ هزار کاربر) بر روی محیط سندباکس و حساب‌های پریمیوم روی عملیاتی قرار می‌گیرند. مقدار `true` برای ‌`devMode` باعث اتصال به محیط سندباکس و مقدار `false` باعث اتصال به محیط عملیاتی ما می‌شود.

##### تنظیمات اولیه

| توضیحات | پیش‌فرض | نوع | پارامتر |
| --- | --- | --- | --- |
|  |  | `Object` | **[options]** |
| فعال/غیرفعال‌سازی ارتباط آنی | <code>true</code> | <code>Boolean</code> | **[options.realtime]** |
|  |  | <code>Object</code> | **[options.webpush]** |
| فعال‌سازی پوش ‌نوتیفیکیشن | <code>false</code> | <code>Object</code> | **[options.webpush.enabled]** |
| پوش‌نوتیفیکیشن Public Key | <code>null</code> | <code>String</code> | **[options.webpush.publicKey]** |
| دریافت مخفی پیام | <code>true</code> | <code>Boolean</code> | **[options.silent]** |


> `نکته ` : برای استفاده از چابک در محیط عملیاتی مقدار `devMode` را `false` کنید. برای تغییر به محیط عملیاتی باید از [**پنل بخش تنظیمات**](https://doc.chabokpush.com/panel/settings.html#%D8%AF%D8%B1%D8%AE%D9%88%D8%A7%D8%B3%D8%AA-%D8%AD%D8%B3%D8%A7%D8%A8-%D8%B9%D9%85%D9%84%DB%8C%D8%A7%D8%AA%DB%8C) درخواست خود را ثبت نمایید تا پس از تایید، اطلاعات جدید حسابتان (AppId, APIKey, Username و Password) تعیین گردد. 


### ۲- ثبت کاربر
با استفاده از متد `register` می‌توانید یک نام کاربری به هر کاربر اختصاص دهید. این متد `شناسه کاربر` را گرفته و کاربر را با آن شناسه روی سرور چابک ثبت نام می‌کند.

```javascript
    chabok.register('<USER_ID>')
```

> `نکته` : متد `register` باید فقط **یک بار** در طول اجرا اپلیکیشن فراخوانی شود.

>   `نکته امنیتی` : مقدار `USER_ID` را هرگز به صورت خام در `LocalStorage` ذخیره نکنید، چون این مقدار شناسه معنادار می‌باشد و می‌توان با آن  کاربر را روی چابک ثبت‌نام کرد. برای این منظور می‌توانید از متد `()chabok.getUserId` چابک استفاده کنید که شناسه کاربر را به صورت رمزنگاری شده نگه‌ می‌دارد.

```javascript
if (chabok.isRegistered()) {
    chabok.register(chabok.getUserId())
} else {
    chabok.register('<USER_ID>')
}
```

> `نکته` : متغیر `USER_ID` شناسه کاربر برای ثبت نام در چابک می‌باشد و ارسال پیام‌ به کاربران توسط همین شناسه‌ها و بدون استفاده از توکن یا شناسه گوشی، به سادگی امکان پذیر خواهد بود شناسه کاربری می تواند هر فیلد با ارزش و معنا‌دار برای کسب و کار شما باشد که کاربر خود را با آن شناسایی می‌کنید. `شماره موبایل، کدملی، شماره حساب و یا ایمیل` مثال‌هایی از شناسه‌های کاربری مناسب در موارد واقعی هستند.
>

> `نکته`: کاراکترهای ‍`#,+,*,\,/` و فاصله در `USER_ID` مجاز نیستند، همچنین طول این رشته نباید کمتر از ۳ و بیشتر از ۳۲ کاراکتر باشد.

> `نکته ` : در صورتی که مقدار‌دهی اولیه به درستی اعمال شده باشد، می‌توانید اطلاعات دستگاه متصل خود را در [بخش مشترکین پنل چابک](https://sandbox.push.adpdigital.com/front/users/subscribers/list) مشاهده کنید. 

### متد حذف کاربر
برای حذف دستگاه کاربر از سرور چابک می‌توانید از متد زیر استفاده کنید :
```javascript
chabok.unregister()
```

### رویداد‌ها :

`connecting`: رویداد در هنگام برقراری اتصال به چابک

```javascript
chabok.on('connecting', _ => {status = 'Connecting ...'}); 
```

`connected`: رویداد در حالت برقراری اتصال به چابک

```javascript
chabok.on('connected', _ => {status = 'connected ...'}); 
```

`disconnected`: رویداد در حالت قطع اتصال چابک

```javascript
chabok.on('disconnected', _ => {status = 'disconnected ...'}); 
```

> نحوه صحیح پیاده سازی متد و رویدادها در قالب پروژه [دمو](https://webpush.chabokpush.com/) پیاده سازی شده است.








