---
id: sdk-setup
title: راه‌اندازی
layout: react-native
permalink: react-native/sdk-setup.html
prev: required.html
next: tracker.html
---

پس از طی کردن مراحل صفحه [پیش‌نیازها](/react-native/required.html)، می‌توانید **راه‌اندازی SDK چابک** را شروع کنید. در ابتدا شما باید کتابخانه چابک را [نصب کنید](/react-native/sdk-setup.html#۱--نصب-کتابخانه). در انتها، [مقداردهی و راه‌اندازی](/react-native/sdk-setup.html#۲--مقداردهی-اولیه) کتابخانه چابک را در اپلیکیشنتان انجام دهید و برای شناخت کاربر توسط چابک، مرحله [ثبت کاربر](/react-native/sdk-setup.html#۳--ثبت-کاربر) را حتما پشت سر بگذارید.

برای انجام موفق این کارها باید تمام مراحل زیر را به ترتیب انجام دهید:

[ ۱- نصب کتابخانه](/react-native/sdk-setup.html#۱--نصب-کتابخانه)

[۲- مقداردهی اولیه (Initialize)](/react-native/sdk-setup.html#۲--مقداردهی-اولیه-initialize)

[۳- ثبت کاربر (Register)](/react-native/sdk-setup.html#۳--ثبت-کاربر-register)

<Br>

> `نکته `: دقت داشته باشید که در ریکت، چابک به طور پیش‌فرض **توکن پوش** نمی‌گیرد، بنابراین برای استفاده از **پوش‌نوتیفیکیشن** باید تنظیمات آن را در صفحه پوش‌نوتیفیکیشن برای [اندروید](/react-native/push-notification.html#تنظیم-پوشنوتیفیکیشن-اندروید) و [آی‌اواس](/react-native/push-notification.html#تنظیم-پوشنوتیفیکیشن-آیاواس) مطالعه نمایید و روی پروژه خود پیاده‌سازی کنید.

<br>

### ۱- نصب کتابخانه
---

در این مرحله شما باید دو پکیج `chabokpush` و ‍‍‍‍‍‍‍‍‍‍‍`react-native-device-info`(دریافت اطلاعات دستگاه) را نصب نمایید. همینطور با توجه به این که چابک به طور پیش‌فرض پوش‌نوتیفیکیشن نمایش نمی‌دهد، برای همین در صورتی که می‌خواهید از این امکان استفاده کنید **باید حتما** پکیج `react-native-push-notification` را هم نصب کنید.

برای **نصب** از طریق `npm`:

```bash
# install chabok library
npm install chabokpush-rn --save
react-native link chabokpush-rn 

# receive user device info
npm install react-native-device-info --save
react-native link react-native-device-info

# configure push notification
npm install react-native-push-notification --save
react-native link react-native-push-notification
```
 یا `yarn`:

```bash
# install chabok library
yarn add chabokpush-rn
react-native link chabokpush-rn

# receive user device info
yarn add react-native-device-info
react-native link react-native-device-info

# configure push notification
yarn add react-native-push-notification
react-native link react-native-push-notification
```

<br>

#### مدل نسخه‌گذاری در چابک (Semantic Versioning)

چابک از مدل نسخه‌گذاری `MAJOR`.`MINOR`.`PATCH` استفاده می‌کند. همه تغییرات نسخه‌ها بلافاصله پس از انتشارشان به صورت موردی در صفحه **لیست  تغییرات** برای اطلاع شما اضافه می‌شوند. برای همین توصیه می‌کنیم [این صفحه](/react-native/release-note.html) را حتما مطالعه نمایید. این موارد برای هر نسخه در دو بخش [**ارتقا** (در صورت وجود ارتقا)](/react-native/release-note.html#ارتقا) و [**تغییرات**](/react-native/release-note.html#تغییرات) برای شما نمایش داده شده‌ است.

- `Patch:` تغییرات در این سطح شامل **Bug Fix** و **قابلیت‌های بسیار کوچک** می‌باشد. به روز رسانی به این نسخه‌ها نیاز به تغییری در کد ندارد. برای آگاهی از آن‌ها، باید بخش [**تغییرات**](/react-native/release-note.html#تغییرات) را مطالعه کنید. به عنوان مثال به‌ روز رسانی کتابخانه چابک از نسخه `2.13.0` به نسخه `2.13.2` مربوط به این سطح می‌شود.
- `Minor:` تغییرات در این سطح شامل **قابلیت‌های بزرگتر** و **تغییر در کارکرد (Functionality) کتابخانه** می‌شود. در به روز رسانی به این نسخه‌ها حتما باید بخش [**ارتقا**](/react-native/release-note.html#ارتقا) و [تغییرات](/react-native/release-note.html#تغییرات) صفحه لیست تغییرات را با دقت مطالعه کنید. در صورت بروز هر گونه مشکل در نتیجه رعایت نکردن نکات بخش **ارتقا** و **تغییرات** در به روز رسانی به نسخه‌های **Minor**، تیم چابک مسئولیتی را نمی‌پذیرد. توصیه می‌کنیم که هر سه تا شش ماه اقدام به بررسی نسخه‌های **Minor** نمایید. به عنوان مثال به‌ روز رسانی کتابخانه چابک از نسخه `2.12.1` به نسخه `2.13.2` مربوط به این سطح می‌شود.
- `Major:` این سطح از تغییرات مخصوص **بازنویسی** و یا **تغییرات اساسی** در کتابخانه چابک است. در به روز رسانی به این نسخه‌ها حتما باید بخش [**ارتقا**](/react-native/release-note.html#ارتقا) و [**تغییرات**](/react-native/release-note.html#تغییرات) تغییرات صفحه لیست تغییرات را با دقت مطالعه کنید. در صورت بروز هر گونه مشکل در نتیجه رعایت نکردن نکات بخش **ارتقا** و **تغییرات** در به روز رسانی به نسخه‌های **Major**، تیم چابک مسئولیتی را نمی‌پذیرد. بنابراین توصیه می‌کنیم که هر یک سال اقدام به بررسی نسخه‌های **Major** نمایید. به عنوان مثال به‌روزرسانی کتابخانه چابک از نسخه `1.0.1` به نسخه `2.13.2` مربوط به این سطح می‌شود.

<Br><br>

### ۲- مقدار‌دهی اولیه (Initialize)
---

برای ارتباط با سرور چابک، لازم است یک نمونه از کلاس `chabokpush` بسازید و آن را مقدار‌دهی کنید.
برای مقدار‌دهی اولیه می‌بایست از طریق متد `chabok` اطلاعات حساب چابک و تنظیمات اولیه را وارد نمایید. 

> `نکته` :‌ تمامی متدهایی که در این بخش بیان می‌شود باید تنها یک بار فراخوانی شود.  

برای دریافت یا ارسال پیام از/به سرور چابک، لازم است یک نمونه از کلاس `chabokpush` بسازید و آن را مقداردهی نمایید. فراخوانی این متد فقط یکبار کافی است. به قطعه کد زیر دقت کنید:

```javascript
import React from 'react';
import chabokpush from 'chabokpush-rn';

export default class App extends React.Component {

    componentDidMount() {
        const authConfig = {
            //true connects to Sandbox environment
            //false connects to Production environment
            devMode: true,
            appId: 'APP_ID',            //based on your environment
            apiKey: 'API_KEY',          //based on your environment
            username: 'SDK_USERNAME',   //based on your environment
            password: 'SDK_PASSWORD'    //based on your environment
        };
        const options = {
            silent: false,
            realtime: true, //Enable ChabokPush realtime
        };
        this.chabok = new chabokpush(authConfig, options);
    }

}
```

در `authConfig` به جای پارامتر‌های `APP_ID`, `API_KEY(SDK_KEY)`, `SDK_USERNAME`, `SDK_PASSWORD` مقادیر مربوط به حساب چابک خود را وارد نمایید. نحوه ایجاد حساب در بخش [پیش‌نیازها](/react-native/required.html) توضیح داده شده است. در صورت داشتن حساب چابک هم می‌توانید این مقادیر را از [**پنل بخش تنظیمات قسمت دسترسی‌ و توکن‌ها**](/panel/settings.html#دسترسیها-و-توکنها) بردارید.

مقدار `devMode` تعیین می‌کند که اپلیکیشن شما به محیط [آزمایشی (Sandbox)](https://sandbox.push.adpdigital.com) و یا [عملیاتی (Production) ](https://panel.push.adpdigital.com) چابک متصل شود. این موضوع بستگی به این دارد که حساب کاربری شما روی کدام محیط تعریف شده باشد.
مقدار `true` به محیط آزمایشی و  مقدار`false` به محیط عملیاتی متصل می‌شود. در نظر داشته باشید، هر محیط به کلیدهای دسترسی (`appId`, `apiKey`, `username` و `password`) خودش در متد `init` نیاز دارد. بنابراین در صورت تغییر مقدار `devMode` کلید‌های دسترسی آن هم باید تغییر داده شود.

> `نکته`: برای درخواست حساب محیط **عملیاتی**، در بخش تنظیمات پنل، وارد بخش [**درخواست حساب عملیاتی**](https://sandbox.push.adpdigital.com/front/setting/accountRequest) شوید و درخواست خود را ثبت نمایید تا پس از تایید و ساخت حساب عملیاتی شما، اطلاعات جدید حسابتان (`appId`, `apiKey`, `username` و `password`) تعیین گردد. 



##### تنظیمات اولیه

| توضیحات | پیش‌فرض | نوع | پارامتر |
| --- | --- | --- | --- |
|  |  | `Object` | **[options]** |
| فعال/غیرفعال سازی ارتباط آنی | <code>true</code> | <code>Boolean</code> | **[options.realtime]** |
| دریافت مخفی پیام | <code>true</code> | <code>Boolean</code> | **[options.silent]** |

<Br><br>

### ۳- ثبت کاربر (Register)
---

یکی از مزیت‌های چابک نسبت به درگاه‌های ارسال پوش‌نوتیفیکیشن، امکان **معرفی** هر کاربر با یک شناسه منحصر به فرد است. این قابلیت به شما امکان می‌دهد دستگاه‌های کاربر را **مدیریت کنید** و سوابق جمع‌آوری شده را همانند یک سیستم مدیریت مشتریان (CRM) در اختیار داشته باشید. این شناسه می‌تواند برای **دستگاه‌های متعدد یک کاربر** استفاده شود. 

شناسه کاربر می‌تواند هر فیلد با ارزش و معنا‌دار برای کسب و کار شما باشد که کاربر خود را با آن شناسایی می‌کنید. **شماره موبایل**، **کدملی**، **شماره‌حساب**، **ایمیل** و یا حتی **شناسه دیتابیس‌تان** مثال‌هایی از شناسه‌های کاربری مناسب در موارد واقعی هستند. ارسال پیام‌ به کاربران توسط همین شناسه‌ها و بدون استفاده از توکن یا شناسه گوشی، به سادگی امکان پذیر خواهد بود.


این کار را متد `register` انجام می‌دهد. این متد شناسه کاربر را گرفته و کاربر را با آن شناسه روی سرور چابک ثبت‌نام می‌کند.

> `نکته` : متد `register` باید فقط **یک بار** در طول اجرا اپلیکیشن فراخوانی شود.

```javascript
this.chabok.register('USER_ID').then(({deviceId}) => {
	console.log('Regsitered ', deviceId)
}).catch(error => {
	console.log('Fail to register user ', error)
})
```

> `نکته`: مقدار `USER_ID` می‌تواند **بین ۳ تا ۳۲** کاراکتر باشد. زبان فاسی، کاراکترهای `#,+,*,\,/` و فاصله هم در آن **مجاز نیستند**.

در صورتی که مقداردهی اولیه و ثبت کاربر به درستی اعمال شده باشد، می‌توانید اطلاعات دستگاه متصل خود را در [بخش مشترکین پنل چابک](https://sandbox.push.adpdigital.com/front/users/subscribers/list) مشاهده کنید. 

<br>

#### اپلیکیشن‌هایی که حساب کاربری دارند

اگر اپلیکیشن شما دارای صفحه **ورود** و **ثبت‌نام** است، می‌توانید متد `register` را در صفحه **ورود** یا **ثبت‌نام** پس از **احراز هویت کاربر** قرار دهید. همچنین **باید** پس از هر بار اجرای اپلیکیشن فراخوانی کنید (در فایل `App` متد `componentDidMount`) تا کاربر به سرور چابک متصل شود.

> `نکته:` ترکرها به طور معمول نصب را **اولین بازدید** حساب می‌کنند (مانند سرویس ادجاست)، اما مزیت ترکر چابک در شمارش نصب این است که شما می‌توانید علاوه بر مدل ادجاست نصب را **پس از ورود کاربر و احراز هویت او** در اپلیکیشنتان تعریف کنید. با این کار شما یک اقدام دیگری برای جلوگیری از تقلب در شمارش نصب انجام می‌دهید، به این دلیل که امضاهای کاربر، قبل و بعد از ثبت او (register) مطابقت داده می‌شوند و در صورت تایید به عنوان یک نصب سالم در نظر گرفته می‌شوند. 

```javascript
componentDidMount(){
    ...
    
    this.chabok.getUserId().then(userId => {
        if (userId) {
            this.chabok.register(userId)
        } else {
        
            //If user is not registered verify the user and
            //call this.chabok.register('USER_ID') method at login page
            this.chabok.register('USER_ID').then(({deviceId}) => {
				console.log('Regsitered ', deviceId)
			}).catch(error => {
				console.log('Fail to register user ', error)
			})
        }
    }).catch(error => {
        console.log('Fail to getUserId ', error)
    })
}
```

> `نکته امنیتی` : مقدار `USER_ID` را هرگز به صورت خام در `LocalStorage` ذخیره نکنید، چون این مقدار شناسه معنادار می‌باشد و می‌توان با آن کاربر را روی چابک ثبت‌نام کرد. برای این منظور می‌توانید از متد زیر استفاده کنید که شناسه کاربر را به صورت رمزنگاری شده نگه‌می‌دارد:

```javascript
this.chabok.getUserId().then(userId => {
	console.log('userId: ', userId)
}).catch(error => {
	console.log('Fail to getUserId', error)
})
```

پس از اتمام این مراحل شما می‌توانید با فراخوانی [این رویدادها](https://doc.chabokpush.com/react-native/features.html#اتصال-با-سرور) از اتصال دستگاه به چابک اطمینان یابید.

<br>

#### کاربر مهمان (Guest User)

در صورتی که اپلیکیشن شما قابلیت  **ایجاد حساب کاربری**  داشته باشد می‌توانید کاربر را تا زمانی که حساب ایجاد نکرده است به عنوان  **کاربر مهمان**  در سیستم خود ثبت کنید و سپس به محض ایجاد حساب و دریافت اطلاعات او، آن کاربر را به عنوان  **کاربر دائم**  خود مانند بالا ثبت کنید. 

> `نکته:` در صورتی که می‌خواهید از ترکر نصب استفاده کنید و نصب‌ها را به محض اولین ورود کاربر محاسبه کنید (مانند سرویس ادجاست) باید از این متد استفاده کنید. دقت داشته باشید که این متد را به تنهایی به کار نبرید زیرا هر بازدید کاربر را مهمان جدید محاسبه می‌کند. برای اطلاعات بیشتر مستندات [ترکر نصب](/react-native/tracker.html) را مطالعه کنید.

متد زیر کاربر را به عنوان کاربر مهمان ثبت می‌کند و به طور خودکار یک تگ مهمان (CHABOK_GUEST) به او اختصاص می‌دهد:

```javascript
this.chabok.registerAsGuest();
```
<br>

##### کاربر مهمان با شناسه دلخواه

شما می‌توانید به کاربران مهمان خود هم شناسه بدهید.

نمونه:

```javascript
this.chabok.registerAsGuest(GUEST_USER_ID);
```

<br>

#### ورودی Advertising ID 

در متدهای ثبت کاربر یا ثبت کاربر مهمان، شما می‌توانید پارامتر **Advertising ID** را به آن‌ها اضافه کنید. اضافه کردن این پارامتر به شما امکان می‌دهد شبکه‌های تبلیغاتی که از این کلید استفاده می‌کنند (مانند تبلیغات بنر و جستجوی کافه بازار، گوگل اد وردز) را اندازه‌گیری کنید و نصب‌های آن را شمارش کنید.

- متد ثبت کاربر:

```javascript
this.chabok.register(USER_ID, Ad_Id);
```
- متد ثبت کاربر مهمان:

```javascript
this.chabok.registerAsGuest(GUEST_USER_ID, Ad_Id);
```

<br>

### متد تایید ثبت کاربر

متد `isRegistered` یا همان تایید ثبت کاربر به شما این امکان را می‌دهد که بررسی کنید آیا عملیات ثبت‌نام انجام شده است یا خیر.

```javascript
chabok.isRegistered();
```

<br>

### حذف کاربر (Unregister)

برای حذف دستگاه کاربر از سرور چابک می‌توانید از متد `unregister` استفاده کنید. پس از حذف کاربر، چابک دیگر به دستگاه‌های آن `userId` پوش ارسال نخواهد کرد. توصیه می‌شود این متد را زمانی که کاربر در اپلیکیشنتان از حساب خود خارج می‌شود (**Logout**) فراخوانی کنید. این امر باعث می‌شود تا کاربر از حفظ شدن حریم شخصی خود پس از خروج از حساب کاربری اطمینان یابد. پس از آن هم کاربر را به عنوان یک کاربر مهمان `register` کنید تا همچنان با او تعامل داشته باشید.

```javascript
chabok.unregister()
```

> نحوه صحیح پیاده سازی متد و رویدادها در قالب پروژه [دمو](https://github.com/chabokpush/chabok-rn-chat) پیاده‌سازی شده است.
