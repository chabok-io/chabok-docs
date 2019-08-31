---
id: installation
title: نصب چابک
layout: ios
permalink: ios/installation.html
prev: required.html
next: setup.html

---

### افزودن کتابخانه

چابک از طریق CocoaPods در دسترس است ، برای نصب آن به سادگی خط زیر را به Podfile خود اضافه کنید:


```bash
target 'YourProject' do
  use_frameworks!

  pod 'ChabokPush'
  
end
```

سپس با روش زیر نصب کنید :

```bash
$ pod install
```
پس از اجرای دستورات بالا اگر با خطایی روبه رو شدید ، دستور زیر را وارد کنید سپس `pod install` را دوباره اجرا کنید.

```bash
$ pod update
```
حالا برای اطمینان از نصب ، پروژه را در xcode باز کنید ، اگر header فایل چابک را مشاهده کردید افزودن کتابخانه موفقیت آمیز بوده است.

<Br>

برای دسترسی به کتابخانه چابک هم می‌توانید وارد [این صفحه](https://github.com/chabok-io/chabok-client-ios) شوید.


