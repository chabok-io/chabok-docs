---
id: installation
title: نصب چابک
layout: javascript
permalink: javascript/installation.html
prev: introducing.html
next: setup.html
---

## افزودن کتابخانه

برای نصب از طریق `npm` :

```bash
npm install chabokpush --save
```
```bash
yarn add chabokpush
```
و یا با استفاده از [CDN](https://unpkg.com/chabokpush/dist/chabokpush.min.js) ، چابک را به پروژه ی خود اضافه کنید.


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
