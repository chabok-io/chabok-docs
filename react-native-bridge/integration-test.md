---
id: integration-test
title: تست پیاده‌سازی
layout: react-native-bridge
permalink: react-native-bridge/integration-test.html
prev: features.html
next: troubleshoot.html
---

پس از پیاده‌سازی چابک می‌توانید با انجام مراحل زیر از موفقیت‌آمیز بودن فرایندهای راه‌اندازی اطمینان یابید.

> `نکته:` توصیه می‌کنیم **قبل از انتشار اپلیکیشنتان** حتما مراحل زیر را با دقت بررسی کنید. 

<br>

### تست SDK

##### آیا پس از راه‌اندازی، دستگاه شما به پنل اضافه شده است؟
در منوی **کاربران** می‌توانید دستگاه‌های موجود را همراه با جزئیات مشاهده کنید. **پس از بازدید اول** از اپلیکیشن اطلاعات دستگاه خود را در پنل با دقت **مطابقت دهید**.

> `نکته:` دقت داشته باشید که **آخرین نسخه SDK** را دریافت کنید و موارد **لیست تغییرات** را مطالعه کنید.

<br>

![](http://uupload.ir/files/w2il_sdk-test.png)

<br><br>

### تست login کاربران

#### ۱- آیا وضعیت کاربران درست ثبت شده است؟ (لاگین، مهمان، حذف کرده/نکرده)

در صورتی که در اپلیکیشن بخش لاگین دارید، ( [پیاده‌سازی](/react-native-bridge/sdk-setup.html#%D9%88%D8%B1%D9%88%D8%AF-%D8%A8%D9%87-%D8%AD%D8%B3%D8%A7%D8%A8-%DA%A9%D8%A7%D8%B1%D8%A8%D8%B1%DB%8C-login) آن را از چابک کرده‌اید) می‌توانید در فیلتر سگمنت جدید  گزینه **وضعیت کاربر** را انتخاب کنید تا متوجه شوید کاربر در چه وضعیتی (لاگین، مهمان، حذف کرده و حذف نکرده)  قرار دارد.

<br>

![](http://uupload.ir/files/ud1r_user-status.png)

<br>

#### ۲- آیا پنل به درستی کاربران را در صورت خروج از اپلیکیشن (logout) به کاربر مهمان تبدیل می‌کند؟
وقتی کاربران بر روی گزینه logout در اپلیکیشن کلیک می‌کنند و از اپ خارج می‌شوند، اطلاعاتشان در چابک ذخیره می‌شود و یک شناسه دیگری به هر کاربر خارج شده اختصاص می‌دهد تا وقتی مجدد وارد اپلیکیشن شود شناسه کاربری او تغییر کند. این کاربران در بخش سگمنت قابل مشاهده‌اند.

<br>

![enter image description here](http://uupload.ir/files/h13x_login-vs-guest.png)

<br><br>

### تست ارسال پوش
---
##### ۱- آیا پوش‌نوتیفیکیشن‌ها با موفقیت دریافت می‌شوند؟
برای اطمینان از ارسال ودریافت موفق پوش کافیست بخش نوتیفیکیشن داشبورد را مشاهده کنید. در این نمودار آمار ارسال ناموفق پوش نوتیفیکیشن نیز موجود است که می‌توانید آن را زیر نظر داشته باشید.

> `نکته:` در صورت بروز مشکل در ارسال پوش بخش [عیب‌یابی](/react-native-bridge/troubleshoot.html#%D9%BE%D9%88%D8%B4-%D9%86%D9%85%DB%8C%DA%AF%DB%8C%D8%B1%D9%85) را مطالعه کنید.
 
<br>

![enter image description here](http://uupload.ir/files/x6nc_notification-test-in-dashboard.png)

<br>

##### ۲- آیا حذف‌ها به درستی شمرده می‌شوند؟

در صورتی که از پوش‌نوتیفیکیشن هم استفاده نمی‌کنید، بعد از حذف اپلیکیشن یک پوش به اپ کاربران ارسال کنید تا از شمارش حذف دستگاه کاربران اطمینان حاصل کنید. 

> `نکته:` حتما برای شمارش حذف و ریزش این مورد را بررسی کنید. همچنین دقت داشته باشید فرایند حذف اپلیکیشن مدت کوتاهی (حدود ۲۰ دقیقه) طول می‌کشد.

چابک به طور روزانه توکن‌های کاربران را چک می‌کند و اگر کاربری اپلیکیشن شما را حذف کند متوجه این موضوع خواهد شد و در حساب عملیاتی آمار حذف و ریزش بروزرسانی می‌شود.

<br>

![enter image description here](http://uupload.ir/files/gl_uninstall-test-in-dashboard.png)

<br><br>

### تست رصد رفتار (ایونت)
---
##### ۱- آیا ایونت‌ها به درستی رصد و در پروفایل پروفایل کاربر و جزئیات دستگاه در پنل نمایش داده می‌شوند؟

پس از [پیاده‌سازی](/react-native-bridge/behavior-tracking.html) ایونت‌ها، می‌توانید آن را در **پروفایل کاربران** بلافاصله **بعد وقوع ایونت** بررسی کنید.

<br>

![enter image description here](http://uupload.ir/files/u9ki_event-test-in-user-profile.png)

<br>

#####  ۲- آیا در سگمنت نام و نوع داده ایونت (تحت عنوان رفتار کاربر) قابل نمایش است و کاربران به درستی فیلتر می‌شوند؟
به کمک سگمنت می‌توانید  کاربران  را به همراه تمامی رویدادهایی که در اپلیکیشن اتفاق افتاده است را (مثل خرید) مشاهده و دسته‌بندی کنید.

<br>

![enter image description here](http://uupload.ir/files/m57a_event-test-in-segment.png)

<br><br>

### تست ترکر
---

##### ۱- آیا کلیک‌ها، نصب‌ها، ایونت‌ها و حذف‌ها به درستی شمرده می‌شوند؟

 با پشت سر گذاشتن مراحل زیر ترکر را تست کنید:

۱- یک خروجی قابل نصب از اپلیکیشن بگیرید و آن‌ را در جای دلخواه آپلود کنید.

۲- از پنل یک ترکر ایجاد کنید و لینک جایی که آپلود کرده‌اید (به عنوان لینک **مقصد**) را در آن قرار دهید.

۳- با دستگاه‌های مختلف روی لینک ترکر کلیک کنید، اپلیکیشن را نصب و باز کنید. پس از آن چک کنید که کلیک و نصب به درستی شمارش شده است یا خیر.

۴- ایونتی که مد نظر دارید را به لینک ترکر اضافه کنید و سپس در اپلیکیشن آن را فراخوانی نمایید. چک کنید که ایونت به درستی رصد شده است یا خیر.

۵- در آخر، اپلیکیشن را حذف کنید و پس از مدت کوتاهی (۱۵ دقیقه) به همان دستگاه پوش تستی بزنید. چک کنید که حذف به درستی شمرده شده است یا خیر.

> `نکته:` اگر از CPA/CPO (یا در کل ایونت‌هایی که خارج از اپلیکیشن رخ می‌دهند مانند خرید) استفاده می‌کنید، دقت کنید که حتما از [وب‌سرویس چابک](/rest-api/send-event.html#%D8%A7%D8%B1%D8%B3%D8%A7%D9%84-%D8%B1%D9%88%DB%8C%D8%AF%D8%A7%D8%AF-track) استفاده کنید. 

<br>

![enter image description here](http://uupload.ir/files/67ls_tracker-test-in-details-1.png)
![](http://uupload.ir/files/dum8_tracker-test-in-details-2.png)
