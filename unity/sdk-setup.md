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

### مقداردهی اولیه

چابک برای راه‌اندازی نیاز به مقداردهی اولیه دارد. متد `init` چابک باید در کلاس Application در متد onCreate تحت هر شرایطی فراخوانی شود.
