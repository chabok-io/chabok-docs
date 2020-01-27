---
id: sdk-setup
title: راه‌اندازی
layout: javascript
permalink: javascript/sdk-setup.html
prev: required.html
next: chabok-messaging.html
---

پس از طی کردن مراحل صفحه [پیش‌نیازها](/javascript/required.html) می‌توانید **راه‌اندازی SDK چابک** را شروع کنید. در ابتدا شما باید کتابخانه چابک را [نصب کنید](/javascript/sdk-setup.html#۱--نصب-کتابخانه)، سپس مقداردهی و راه‌اندازی کتابخانه چابک را در اپلیکیشنتان [انجام دهید](/javascript/sdk-setup.html#۲--مقداردهی-اولیه-initialize) و در انتها برای شناخت کاربر توسط چابک، مرحله [ثبت کاربر](/javascript/sdk-setup.html#۳--ثبت-کاربر-register) را حتما پشت سر بگذارید.

برای انجام موفق این کار باید تمام مراحل زیر را به ترتیب انجام دهید:

[۱- نصب کتابخانه](/javascript/sdk-setup.html#۱--نصب-کتابخانه)

[۲- مقداردهی اولیه](/javascript/sdk-setup.html#۲--مقداردهی-اولیه-initialize)

[۳- ثبت کاربر](/javascript/sdk-setup.html#۳--ثبت-کاربر)


> `نکته`: شما با پیاده‌سازی زیر علاوه بر  تمام امکانات چابک می‌توانید نصب‌های خود (منظور همان استفاده از **PWA**) را شمارش کنید.
 
<Br>

### ۱- نصب کتابخانه

برای نصب از طریق `npm`:

```bash
npm install chabokpush --save
```
یا `yarn`:

```bash
yarn add chabokpush
```

و یا با استفاده از [CDN](https://unpkg.com/chabokpush@2.0.0/dist/chabokpush.min.js)، چابک را به پروژه خود اضافه کنید.

```bash
<script src="https://unpkg.com/chabokpush@2.0.0/dist/chabokpush.min.js"></script>
```


> `نکته`: توجه داشته باشید که CDN بالا روی مرورگر safari بدون vpn لود نمی‌شود. برای همین توصیه می‌کنیم روی پروژه خودتان آن را هاست کنید.

> `نکته`: دقت داشته باشید که **به هیچ عنوان** برای دریافت کتابخانه چابک از لینک بالا **بدون مشخص کردن نسخه آن** استفاده **نکنید** زیرا آن لینک به طور خودکار آخرین نسخه کتابخانه را در اختیارتان می‌گذارد که در صورت نخواندن تغییرات لیست کتابخانه و هماهنگ شدن با آن، **با مشکل مواجه خواهید شد**.

#### نصب کتابخانه بصورت آسنکرون

شما می‌توانید کتابخانه چابک را بصورت آسنکرون نیز راه‌اندازی کنید. برای این منظور قطعه کد زیر را داخل تگ اسکریپت قرار دهید:

```html
<body>
    <!-- your source code -->

    <script>
        // load the Chabok javascript SDK Asynchronously
        (function(d){
            var js, id = 'chabok-jssdk', ref = d.getElementsByTagName('script')[0];
            if (d.getElementById(id)) {return;}
            js = d.createElement('script'); js.id = id; js.async = true;
            js.src = "https://unpkg.com/chabokpush@2.0.0/dist/chabokpush.min.js"; // Chabok javascript SDK path
            ref.parentNode.insertBefore(js, ref);
        }(document));
    </script>
</body>
```

> `نکته`: کتابخانه چابک از قابلیت Server Side Rendering پشتیبانی می‌کند. برای بهره‌گیری از این قابلیت کتابخانه چابک را بصورت آسنکرون راه‌اندازی و مقداردهی کنید.

#### مدل نسخه‌گذاری در چابک (Semantic Versioning)

چابک از مدل نسخه‌گذاری `MAJOR`.`MINOR`.`PATCH` استفاده می‌کند. همه تغییرات نسخه‌ها بلافاصله پس از انتشارشان به صورت موردی در صفحه **لیست  تغییرات** برای اطلاع شما اضافه می‌شوند. برای همین توصیه می‌کنیم [این صفحه](/javascript/release-note.html) را حتما مطالعه نمایید. این موارد برای هر نسخه در دو بخش [**ارتقا** (در صورت وجود ارتقا)](/javascript/release-note.html#ارتقا) و [**تغییرات**](/javascript/release-note.html#تغییرات) برای شما نمایش داده شده‌ است.

- `Patch:` تغییرات در این سطح شامل **Bug Fix** و **قابلیت‌های بسیار کوچک** می‌باشد. به روز رسانی به این نسخه‌ها نیاز به تغییری در کد ندارد. برای آگاهی از آن‌ها، باید بخش [**تغییرات**](/javascript/release-note.html#تغییرات) را مطالعه کنید. به عنوان مثال به‌ روز رسانی کتابخانه چابک از نسخه `2.13.0` به نسخه `2.13.2` مربوط به این سطح می‌شود.
- `Minor:` تغییرات در این سطح شامل **قابلیت‌های بزرگتر** و **تغییر در کارکرد (Functionality) کتابخانه** می‌شود. در به روز رسانی به این نسخه‌ها حتما باید بخش [**ارتقا**](/javascript/release-note.html#ارتقا) و [تغییرات](/javascript/release-note.html#تغییرات) صفحه لیست تغییرات را با دقت مطالعه کنید. در صورت بروز هر گونه مشکل در نتیجه رعایت نکردن نکات بخش **ارتقا** و **تغییرات** در به روز رسانی به نسخه‌های **Minor**، تیم چابک مسئولیتی را نمی‌پذیرد. توصیه می‌کنیم که هر سه تا شش ماه اقدام به بررسی نسخه‌های **Minor** نمایید. به عنوان مثال به‌ روز رسانی کتابخانه چابک از نسخه `2.12.1` به نسخه `2.13.2` مربوط به این سطح می‌شود.
- `Major:` این سطح از تغییرات مخصوص **بازنویسی** و یا **تغییرات اساسی** در کتابخانه چابک است. در به روز رسانی به این نسخه‌ها حتما باید بخش [**ارتقا**](/javascript/release-note.html#ارتقا) و [**تغییرات**](/javascript/release-note.html#تغییرات) تغییرات صفحه لیست تغییرات را با دقت مطالعه کنید. در صورت بروز هر گونه مشکل در نتیجه رعایت نکردن نکات بخش **ارتقا** و **تغییرات** در به روز رسانی به نسخه‌های **Major**، تیم چابک مسئولیتی را نمی‌پذیرد. بنابراین توصیه می‌کنیم که هر یک سال اقدام به بررسی نسخه‌های **Major** نمایید. به عنوان مثال به‌روزرسانی کتابخانه چابک از نسخه `1.0.1` به نسخه `2.13.2` مربوط به این سطح می‌شود.

<br>

#### افزودن Service Worker

 برای **ارسال پوش‌نوتیفیکشن در پس‌زمینه (‌Background)** باید فایل `ChabokSDKWorker.js` را از [این لینک](https://raw.githubusercontent.com/chabok-io/chabok-client-js/master/dist/ChabokSDKWorker.js) دریافت نموده و در روت پروژه قرار دهید.
 
 اگر از **Github Desktop** استفاده می‌کنید، برای دریافت آن می‌توانید از [این لینک](x-github-client://openRepo/https://github.com/chabok-io/chabok-client-js?branch=master&filepath=dist%2FChabokSDKWorker.js) استفاده نمایید.

اگر هم از **Webpack** استفاده می‌کنید، می‌توانید از پلاگین [CopyWebpackPlugin](https://github.com/webpack-contrib/copy-webpack-plugin)‍ برای انتقال **service worker** به پوشه `dist` استفاده نمایید.

```javascript
 new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '/node_modules/chabokpush/dist/ChabokSDKWorker.js'),
        to: path.resolve(__dirname, '/dist'),
        ignore: ['.*']
      }
    ])
```

> `نکته` :‌ توجه داشته باشید که **service worker** فقط روی دامنه‌های **https** کار می‌کند.

> `نکته`: اگر اپلیکیشن شما **PWA** بوده و در دستگاه **add to homescreen** شده باشد، روی **اندروید** پوش دریافت می‌کنید اما آی‌اواس این قابلیت را پشتیبانی نمی‌کند.

در صورتی که می‌خواهید از **چند service worker به صورت همزمان استفاده کنید**، [این قسمت](/javascript/sdk-setup.html#استفاده-همزمان-از-چند-service-worker) را مطالعه کنید.
<br>

#### پشتیبانی وب‌پوش روی مرورگرها

جدول زیر پشتیبانی **وب‌پوش** و پیام چابک را روی مرورگرهای مختلف نشان می‌دهد:

<table>
<thead>
<tr>
<th style="text-align: center;">مرورگر</th>
<th style="text-align: center;">وب&zwnj;پوش</th>
<th style="text-align: center;">پیام چابک</th>
<th style="text-align: center;">توضیحات</th>
</tr>
</thead>
<tbody>
<tr>
<td align="center"><strong>Chrome</strong></td>
<td align="center">✓ v42 +</td>
<td align="center">✓</td>
<td markdown="1" align="right"><span markdown="1">در نسخه‌های 51 به پایین `gcm_sender_id`  را باید حتما به فایل  `manifest.json` اضافه کنید.</span>
</td>
</tr>
<tr>
  <td align="center"><strong>Edge</strong></td>
<td align="center">✓ v17+</td>
<td align="center">✓</td>
<td align="center">-</td>
</tr>
<tr>
  <td align="center"><strong>Firefox</strong></td>
<td align="center">✓ v44+</td>
<td align="center">✓</td>
<td align="center">-</td>
</tr>
<tr>
  <td align="center"><strong>Opera</strong></td>
<td align="center">✓ v39+ *</td>
<td align="center">✓</td>
<td align="right"><span markdown="1">* وب‌پوش را فقط روی اندروید پشتیبانی می‌کند (و نه روی دسکتاپ) <br>  `gcm_sender_id`  را باید حتما به فایل  `manifest.json`  اضافه کنید.</span></td>
</tr>
<tr>
  <td align="center"><strong>Safari</strong></td>
<td align="center">✗</td>
<td align="center">✓</td>
<td align="center">-</td>
</tr>
<tr>
  <td align="center"><strong>Samsung Internet Browser</strong></td>
<td align="center">✓ v4.0.10-53+</td>
<td align="center">✓</td>
<td align="right"><span markdown="1"> `gcm_sender_id`  را باید حتما به فایل  `manifest.json` اضافه کنید.</span>
</td>
</tr>
</tbody>
</table>

برای پشتیبانی وب‌پوش روی مرورگرهای **کروم**، **اپرا** و **سامسونگ** باید `gcm_sender_id` را به فایل `manifest.json` اضافه کنید: 

> `نکته`: در صورتی که از کلاینت اندروید استفاده می‌کردید، می‌توانید `gcm_sender_id` را از بخش تنظیمات پنل، **کارت اندروید** کپی کنید. در غیر این صورت می‌توانید با مطالعه صفحه [پیش‌نیازهای اندروید](https://doc.chabok.io/android/required.html#دریافت-کلیدهای-گوگل) آن را ایجاد کنید.

```javascript
{
  .....
    "gcm_sender_id": "GCM_SENDER_ID",
  .....
}
```
سپس فایل `manifest.json` را به `index.html` اصلی پروژه خود مانند زیر اضافه کنید:

```html
<head>
 ...
  <link rel="manifest" href="manifest.json">
...
</head>
```

<Br>

### ۲- مقدار‌دهی اولیه (Initialize)

برای ارتباط با سرور چابک، لازم است یک نمونه از کلاس `chabokpush` بسازید و آن را مقدار‌دهی کنید.


برای مقدار‌دهی اولیه می‌بایست از طریق متد `chabok` اطلاعات حساب چابک و تنظیمات اولیه را وارد نمایید. در این متد به جای پارامتر‌های `APP_ID` و `WEB_KEY`،  مقادیر مربوط به حساب چابک خود را وارد نمایید. نحوه ایجاد حساب در بخش [پیش‌نیازها](/javascript/required.html) توضیح داده‌ شده است. در صورت داشتن حساب چابک هم می‌توانید این مقادیر را از پنل بخش تنظیمات قسمت [**دسترسی‌ و توکن‌ها**](/panel/settings.html#دسترسیها-و-توکنها) بردارید.

> `نکته ` : برای استفاده از شناسه `webKey` حتما باید **دامنه** وبسایت خود را در پنل بخش تنظیمات قسمت **دسترسی‌ و توکن‌ها** ثبت کرده‌ باشید. در صورتی هم که می‌خواهید روی سیستم محلی تست کنید کافیست فقط `localhost` (بدون پورت) را در بخش دامنه قرار دهید. 

![عکس مربوطه](http://uupload.ir/files/9ksa_localhost-domain.png)

> `نکته` :‌ تمامی متدهایی که در این بخش بیان می‌شود باید تنها یک بار فراخوانی شود.  

 به قطعه کد زیر توجه کنید:

```javascript
const auth = {
    appId: 'APP_ID',
    webKey: 'WEB_KEY',
    devMode: true
};
const options = {
    webpush: {
        enabled: true,
        publicKey: 'VAPID_Public_Key'
    },
    silent: false,
    realtime: false
};
const chabok = new chabokpush.Chabok(auth, options);
```

مقدار `devMode` تعیین می‌کند که اپلیکیشن شما به محیط [آزمایشی (Sandbox)](https://sandbox.push.adpdigital.com) و یا [عملیاتی (Production) ](https://panel.push.adpdigital.com) چابک متصل شود. این موضوع بستگی به این دارد که حساب کاربری شما روی کدام محیط تعریف شده باشد.
مقدار `true` به محیط آزمایشی و  مقدار`false` به محیط عملیاتی متصل می‌شود. در نظر داشته باشید، هر محیط به کلیدهای دسترسی (`appId`, `webKey`) خودش در ایجاد کلاس نیاز دارد. بنابراین در صورت تغییر مقدار `devMode` کلید‌های دسترسی آن هم **باید تغییر داده شوند**.


##### تنظیمات اولیه

| توضیحات | پیش‌فرض | نوع | پارامتر |
| --- | --- | --- | --- |
|  |  | `Object` | **[options]** |
| فعال/غیرفعال‌سازی ارتباط آنی | <code>true</code> | <code>Boolean</code> | **[options.realtime]** |
|  |  | <code>Object</code> | **[options.webpush]** |
| فعال‌سازی پوش ‌نوتیفیکیشن | <code>false</code> | <code>Object</code> | **[options.webpush.enabled]** |
| پوش‌نوتیفیکیشن Public Key | <code>null</code> | <code>String</code> | **[options.webpush.publicKey]** |
| دریافت مخفی پیام | <code>true</code> | <code>Boolean</code> | **[options.silent]** |


> `نکته ` : برای استفاده از چابک در محیط عملیاتی مقدار `devMode` را `false` کنید. برای تغییر به محیط عملیاتی باید از [**پنل بخش تنظیمات**](https://doc.chabok.io/panel/settings.html#%D8%AF%D8%B1%D8%AE%D9%88%D8%A7%D8%B3%D8%AA-%D8%AD%D8%B3%D8%A7%D8%A8-%D8%B9%D9%85%D9%84%DB%8C%D8%A7%D8%AA%DB%8C) درخواست خود را ثبت نمایید تا پس از تایید، اطلاعات جدید حسابتان (`appId`, `webKey`) تعیین گردد. 

> `نکته ` : زمانی که پارامتر `realtime` را false بگذارید، شنونده‌ (Listener) رویدادهای چابک مانند `connected` و ... فراخوانی **نخواهند شد**.

#### مقداردهی اولیه در روش آسنکرون

اگر کتابخانه چابک را بصورت آسنکرون نصب کرده‌اید، مقداردهی اولیه خود را مانند قطعه کد زیر در متد `chkAsynInit` انجام دهید. این متد پس از نصب کتابخانه چابک بصورت خودکار فراخوانی می‌شود:

```javascript
// this method automatically called when Chabok javascript SDK loaded
window.chkAsynInit = function() {
    const auth = {
        appId: 'APP_ID',
        webKey: 'WEB_KEY',
        devMode: true
    };
    const options = {
        webpush: {
            enabled: true,
            publicKey: 'VAPID_Public_Key'
        },
        silent: false,
        realtime: false
    };
    const chabok = new chabokpush.Chabok(auth, options);
};
```

<Br>

#### استفاده همزمان از چند Service Worker

در صورتی که می‌خواهید از `serviceWorker` خود در کنار `serviceWorker` چابک  به صورت همزمان استفاده کنید کافیست داخل `serviceWorker` خود، `serviceWorker` چابک را مانند زیر ایمپورت کنید (یا می‌توانید از CDN استفاده کنید):

``` javascript
//MY_SERVICE_WORKER.js
importScripts('/chabok/ChabokSDKWorker.js')

...

```
سپس در **تنظیمات راه‌اندازی** نام و scope مربوط به `serviceWorker` خودتان را بگذارید:


```javascript
const options = {
      webpush: {
        enabled: true,
        publicKey: 'xxxxxxxxx'
      },
      silent: false,
      serviceWorker : {
        path : '/MY_SERVICE_WORKER.js',
        scope: '/'
      }
    };
```
<Br>


### ۳- ثبت کاربر

یکی از مزیت‌های چابک نسبت به درگاه‌های ارسال پوش‌نوتیفیکیشن، امکان **معرفی** هر کاربر با یک شناسه منحصر به فرد است. این قابلیت به شما امکان می‌دهد دستگاه‌های کاربر را **مدیریت کنید** و سوابق جمع‌آوری شده را همانند یک سیستم مدیریت مشتریان (CRM) در اختیار داشته باشید.         
این شناسه می‌تواند برای **دستگاه‌های متعدد یک کاربر** استفاده شود. شناسه کاربر می‌تواند هر فیلد با ارزش و معنا‌دار برای کسب و کار شما باشد که کاربر خود را با آن شناسایی می‌کنید. **شماره موبایل**، **کدملی**، **شماره‌حساب**، **ایمیل** و یا حتی **شناسه دیتابیس‌تان** مثال‌هایی از شناسه‌های کاربری مناسب در موارد واقعی هستند. ارسال پیام‌ به کاربران توسط همین شناسه‌ها و بدون استفاده از توکن یا شناسه گوشی، به سادگی امکان پذیر خواهد بود.        
   
#### ورود به حساب کاربری (login)  
متد لاگین تنها زمانی فراخوانی شود که کاربر در اپلیکیشن لاگین یا ثبت‌نام می‌کند. نیازی به فراخوانی این متد در هر بار اجرای اپلیکیشن نیست.  
  
<p>  
فقط شناسه کاربر را گرفته و کاربر را با آن شناسه بر روی سرور چابک ثبت‌ نام می‌کند.  
</p>  

```javascript
chabok.login('<LOGIN_USER_ID>')
```

> `نکته`: مقدار `USER_ID` می‌تواند **بین ۳ تا ۶۴** کاراکتر باشد. زبان فاسی، کاراکترهای `#,+,*,\,/` و فاصله هم در آن **مجاز نیستند**.

#### خروج از حساب کاربری (logout)  
  
در صورتی که کاربر از حساب کاربری خود خارج شد، با فراخوانی متد زیر می‌توانید کاربر را همچنان با یک تگ مهمان در سیستم خود داشته باشید و تعاملتان را با او ادامه دهید.    

```javascript  
chabok.logout();  
``` 
