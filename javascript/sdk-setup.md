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

[۳- ثبت کاربر](/javascript/sdk-setup.html#۳--ثبت-کاربر-register)


> `نکته`: شما با پیاده‌سازی زیر علاوه بر  تمام امکانات چابک می‌توانید نصب‌های خود (منظور همان استفاده از **PWA**) را شمارش کنید.
 
<Br>

### ۱- نصب کتابخانه
 نصب کتابخانه چابک به یک از دو روش زیر امکان‌پذیر است:
 
 ۱-۱: نصب کتابخانه چابک از طریق **سنکرون**
 
برای نصب از طریق `npm`:

```bash
npm install chabokpush --save
```
یا `yarn`:

```bash
yarn add chabokpush
```

و یا با استفاده از [CDN](https://unpkg.com/chabokpush@1.6.0/dist/chabokpush.min.js)، چابک را به پروژه خود اضافه کنید.

```bash
<script src="https://unpkg.com/chabokpush@1.6.0/dist/chabokpush.min.js"></script>
```


> `نکته`: توجه داشته باشید که CDN بالا روی مرورگر safari بدون vpn لود نمی‌شود. برای همین توصیه می‌کنیم روی پروژه خودتان آن را هاست کنید.

> `نکته`: دقت داشته باشید که **به هیچ عنوان** برای دریافت کتابخانه چابک از لینک بالا **بدون مشخص کردن نسخه آن** استفاده **نکنید** زیرا آن لینک به طور خودکار آخرین نسخه کتابخانه را در اختیارتان می‌گذارد که در صورت نخواندن تغییرات لیست کتابخانه و هماهنگ شدن با آن، **با مشکل مواجه خواهید شد**.


۱-۲: نصب کتابخانه اسکریپت از طریق **آسنکرون**

برای دریافت کتابخانه از طریق **async** باید با قطعه کد زیر، چابک را به پروژه خود اضافه کنید. 

```bash
(function(d){
     var js, id = 'chabok-jssdk', ref = d.getElementsByTagName('script')[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement('script'); js.id = id; js.async = true;
     js.src = "../dist/chabokpush.min.js";
     ref.parentNode.insertBefore(js, ref);
   }(document));
```
بعد از فراخوانی این متد به راحتی متد زیر پیاده‌سازی خواهد شد.

```bash
 window.chkAsynInit = function() {
    initChabok();
  };
```

>`نکته`: دقت داشته باشید برای استفاده از کتابخانه چابک باید حداقل نسخه آسنکرون‌، ۱.۶.۰ باشد در غیر این صورت باید از روش اول برای نصب کتابخانه استفاده نمایید. 
>`نکته`: در صورتی که فایل **server side rendering** را دارید از راه‌اندازی آسنکرون استفاده کنید. 


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

۲.۱- مقداردهی اولیه در روش اول 

برای ارتباط با سرور چابک، لازم است یک نمونه از کلاس `chabokpush` بسازید و آن را مقدار‌دهی کنید.


برای مقدار‌دهی اولیه می‌بایست از طریق متد `chabok` اطلاعات حساب چابک و تنظیمات اولیه را وارد نمایید. در این متد به جای پارامتر‌های `APP_ID` و `WEB_KEY`،  مقادیر مربوط به حساب چابک خود را وارد نمایید. نحوه ایجاد حساب در بخش [پیش‌نیازها](/javascript/required.html) توضیح داده‌ شده است. در صورت داشتن حساب چابک هم می‌توانید این مقادیر را از پنل بخش تنظیمات قسمت [**دسترسی‌ و توکن‌ها**](/panel/settings.html#دسترسیها-و-توکنها) بردارید.

> `نکته ` : برای استفاده از شناسه `webKey` حتما باید **دامنه** وبسایت خود را در پنل بخش تنظیمات قسمت **دسترسی‌ و توکن‌ها** ثبت کرده‌ باشید. در صورتی هم که می‌خواهید روی سیستم محلی تست کنید کافیست فقط `localhost` (بدون پورت) را در بخش دامنه قرار دهید. 

![عکس مربوطه](http://uupload.ir/files/9ksa_localhost-domain.png)

> `نکته` :‌ تمامی متدهایی که در این بخش بیان می‌شود باید تنها یک بار فراخوانی شود.  

 به قطعه کد زیر دقت کنید:

```javascript
const auth = {
  appId: 'APP_ID',
  webKey: 'WEB_KEY',
  devMode: true
}
const options = {
      webpush: {
        enabled: true,
        publicKey: 'VAPID_Public_Key'
      },
        silent: false,
        realtime: false
    };
const chabok = new chabokpush.Chabok(auth, options)
```

مقدار `devMode` تعیین می‌کند که اپلیکیشن شما به محیط [آزمایشی (Sandbox)](https://sandbox.push.adpdigital.com) و یا [عملیاتی (Production) ](https://panel.push.adpdigital.com) چابک متصل شود. این موضوع بستگی به این دارد که حساب کاربری شما روی کدام محیط تعریف شده باشد.
مقدار `true` به محیط آزمایشی و  مقدار`false` به محیط عملیاتی متصل می‌شود. در نظر داشته باشید، هر محیط به کلیدهای دسترسی (`appId`, `webKey`) خودش در ایجاد کلاس نیاز دارد. بنابراین در صورت تغییر مقدار `devMode` کلید‌های دسترسی آن هم **باید تغییر داده شوند**.



۲.۲- مقداردهی اولیه در روش دوم (استفاده از **async**)

برای ارتباط با سرور چابک لازم است **initChabok** را بسازید و مفداردهی کنید.

برای مقداردهی اولیه باید در ابتدا اطلاعات حساب چابک را وارد کنید که کافیست در این متد به جای پارامترهای `appId`و `webKey` مقادیر مربوط به حساب خود را وارد کنید.

قطعه کد زیر به شما کمک می‌کند تا یک‌بار تابع را فراخوانی کنید:

```bash
function initChabok() {
    const authConfig = {
      appId: 'chabok-starter',
      webKey: '1b98c60220b7e07c76142ea0635f69fb0dba5d7d',
      devMode: true
    };
    const options = {
      webpush: {
        enabled: true,
        publicKey: 'BLbNRYGZ39Qx-qYrlenpoWArW4zNR6A5XG9ch0VrA8YbJDWMJeWV0hK25Qt75NMrjgP_GG07TBnJ8gNPnVPGkyg'
      },
      silent: false,
    };
    const chabok = new chabokpush.Chabok(authConfig, options);
    if (chabok.isRegistered() && chabok.getUserId()) {
      chabok.register(chabok.getUserId())
    } else {
      chabok.registerAsGuest().then(_=>{
        chabok.subscribe("wall")
        chabok.subscribe("private/sport")
      }).catch(e =>{
        console.error(e)
      })
    }
```
 متد زیر معادل قطعه کد بالاست و انگار به جای قطعه کد بالا، دستور زیر را اجرا کردید.
 
```bash
<script id="chabok-jssdk" async="" src="chabokpush.min.js"></script>
 ```
 
در این روش به جای اجرای تک تک تگ‌های اسکریپت، تمامی تگ‌ها به طور همزمان و موازی دانلود و بارگیری می‌شوند و بعد از اتمام دانلود، شروع به اجرا شدن می‌کنند که این روش نسبت به روش بالا مزایای زیادی دارد که در ادامه خواهیم گفت. 

استفاده از روش **async** برای نصب کتابخانه مزایای زیادی دارد، از جمله:

- دانلود شدن همزمان فایل‌های اسکریپت تاثیر زیادی در افزایش سرعت لود صفحه دارند.
- فایل‌های اسکریپت نصفه اجرا نمی‌شوند.
- در صورت نداشتن **async**، صفحه اینقدر سفید می‌مونه تا همه فایل‌ها دانلود شن و در نتیجه لود صفحه کاهش پیدا می‌کند.
- تاثیر مثبت در تجربه کاربر و سئو دارد.
- لود async تاثیری بر لود صفحه ندارد در نتیجه سرعت بارگذاری صفحه افزایش پیدا می‌کند.
- در نسخه‌های قبلی اگر یک فایل اسکریپت در حال بارگذاری بود کلیه فایل‌ه دانلودشان متوقف می‌شد تا فایل اسکریپت به طور کامل دانلود شود اما در این روش اینطور نیست.
- در مرورگرهای قدیمی دو فایل ui و js به طور همزمان دانلود نمی شدند اما در این روش امکان دانلود همزمان چندین فایل وجود دارد.
- تمام مرورگرها از این ویژگی پشتیبانی می‌کنند.

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


### ۳- ثبت کاربر (Register)

یکی از مزیت‌های چابک نسبت به درگاه‌های ارسال پوش‌نوتیفیکیشن، امکان **معرفی** هر کاربر با یک شناسه منحصر به فرد است. این قابلیت به شما امکان می‌دهد دستگاه‌های کاربر را **مدیریت کنید** و سوابق جمع‌آوری شده را همانند یک سیستم مدیریت مشتریان (CRM) در اختیار داشته باشید. این شناسه می‌تواند برای **دستگاه‌های متعدد یک کاربر** استفاده شود. شناسه کاربر می‌تواند هر فیلد با ارزش و معنا‌دار برای کسب و کار شما باشد که کاربر خود را با آن شناسایی می‌کنید. **شماره موبایل**، **کد ملی**، **شماره‌ حساب**، **ایمیل** و یا حتی **شناسه دیتابیس‌تان** مثال‌هایی از شناسه‌های کاربری مناسب در موارد واقعی هستند. ارسال پیام‌ به کاربران توسط همین شناسه‌ها و بدون استفاده از توکن یا شناسه گوشی، به سادگی امکان پذیر خواهد بود.


با استفاده از متد `register` می‌توانید یک نام کاربری به هر کاربر اختصاص دهید. این متد شناسه کاربر را گرفته و کاربر را با آن شناسه روی سرور چابک ثبت نام می‌کند.

```javascript
    chabok.register('<USER_ID>')
```

> `نکته` : متد `register` باید فقط **یک بار** در طول بازدید وبسایت فراخوانی شود.

> `نکته امنیتی` : مقدار `USER_ID` را هرگز به صورت خام در `LocalStorage` ذخیره نکنید، چون این مقدار شناسه معنادار می‌باشد و می‌توان با آن  کاربر را روی چابک ثبت‌نام کرد. برای این منظور می‌توانید از متد `()chabok.getUserId` چابک استفاده کنید که شناسه کاربر را به صورت رمزنگاری شده نگه‌ می‌دارد.

```javascript
if (chabok.isRegistered()) {
    chabok.register(chabok.getUserId())
} else {
    chabok.register('<USER_ID>')
}
```

> `نکته`: مقدار `USER_ID` می‌تواند **بین ۳ تا ۶۴** کاراکتر باشد. زبان فاسی، کاراکترهای `#,+,*,\,/` و فاصله هم در آن **مجاز نیستند**.

> `نکته ` : در صورتی که مقدار‌دهی اولیه به درستی اعمال شده باشد پس از این مرحله می‌توانید اطلاعات دستگاه متصل خود را در [بخش مشترکین پنل چابک](https://sandbox.push.adpdigital.com/front/users/subscribers/list) مشاهده کنید. 

#### کاربر مهمان 

در صورتی که اپلیکیشن شما قابلیت **ایجاد حساب کاربری** داشته باشد می‌توانید کاربر را تا زمانی که حساب ایجاد نکرده است به عنوان **کاربر مهمان** در سیستم خود ثبت کنید و سپس به محض ایجاد حساب و دریافت اطلاعات او، آن کاربر را به عنوان **کاربر دائم** خود مانند بالا ثبت کنید. 

در این متد چابک به صورت خودکار یک **تگ مهمان** (`CHABOK_GUEST`) به کاربر اختصاص می‌دهد که به شما امکان می‌دهد با آن‌ها در **ارتباط** باشید و کمپین‌های تشویقی برای تبدیلشان به کاربر دائم طراحی کنید.

برای این کار از متد `registerAsGuest` استفاده می‌شود:

```javascript
chabok.registerAsGuest()
```

##### کاربر مهمان با شناسه سفارشی 

همچنین می‌توانید کاربر مهمان را با **شناسه دلخواهتان** ثبت کنید: 

```javascript
chabok.registerAsGuest('GUEST_USER_ID')
```

### متد حذف کاربر

برای حذف دستگاه کاربر از سرور چابک می‌توانید از متد `unregister` استفاده کنید. پس از حذف کاربر، چابک دیگر به دستگاه‌های آن `userId` پوش ارسال نخواهد کرد. توصیه می‌شود این متد را زمانی که کاربر در اپلیکیشنتان از حساب خود خارج می‌شود (**Logout**) فراخوانی کنید. این امر باعث می‌شود تا کاربر از حفظ شدن حریم شخصی خود پس از خروج از حساب کاربری اطمینان یابد. پس از آن هم کاربر را به عنوان یک کاربر مهمان ثبت کنید تا همچنان با او تعامل داشته باشید.

```javascript
chabok.unregister()
```
