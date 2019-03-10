---
id: tracker
title: ترکر
layout: panel
permalink: panel/tracker.html
prev: dashboard.html
next: users.html
---

**ترکرها** (یا شمارنده‌ها) ابزاری برای اندازه‌گیری نتایج کمپین‌های تبلیغاتی هستند؛ با این مکانیزم که داده‌های آماری کمپین (مانند تعداد کلیک، نصب، منابع هر کدام و ...) را در اختیار شما می‌گذارند تا با تحلیل آن‌ها بتوانید کمپین‌های جذب کاربر خود را بهینه‌سازی کنید.


در این قسمت شما می‌توانید برای کمپین‌های نصب خود، **ترکر** [تعریف کنید](/panel/tracker.html#ایجاد-ترکر-جدید). برای این کار باید **نام** و **لینک مقصدی** کمپینتان را ثبت کنید. پس از فعال کردن ترکر می‌توانید آمار لحظه‌ای آن را [مشاهده کنید](/panel/tracker.html#آمار-ترکر ).

<Br>

### ایجاد ترکر جدید

شما می‌توانید علاوه بر **نام** و **لینک مقصد** به ترکر خود فیلترهای دیگری هم مانند **نام، شبکه، گروه تبلیغاتی و خلاقانه**، **پارامتر**، **لینک کال‌بک** و **محدوده اتریبیوشن** اضافه کنید: 

<Br>

![عکس مربوطه](http://uupload.ir/files/rty6_tracker-details.png)
![عکس مربوطه](http://uupload.ir/files/t64a_tracker-redirect-link.png)
![عکس مربوطه](http://uupload.ir/files/4vfm_tracker-callback.png)
![عکس مربوطه](http://uupload.ir/files/qzkp_tracker-attribution.png)

<Br>

#### پارامتر در لینک ترکر
در **لینک ترکر** می‌توانید خودتان جداگانه پارامترهای `redirect_ios` ،`redirect_android`، `campaign`، `adgroup` ،`creative` را مانند زیر قرار دهید:

```markup
https://sand.chabokpush.com/637z3i?campaign=CAMPAIGN&adgroup=AD_GROUP&creative=CREATIVE&redirect_ios=https://itunes.apple.com/us/genre/ios/id36?mt=8&redirect_android=https://play.google.com/store
```

>` نکته:` ترکرها به طور معمول نصب را **اولین بازدید** حساب می‌کنند (مانند سرویس ادجاست)، اما مزیت ترکر چابک در شمارش نصب این است که شما می‌توانید علاوه بر مدل ادجاست نصب را **پس از ورود کاربر و احراز هویت او** در اپلیکیشنتان تعریف کنید. با این کار شما یک اقدام دیگری برای جلوگیری از تقلب در شمارش نصب انجام می‌دهید، به این دلیل که امضاهای کاربر، قبل و بعد از ثبت او (register) مطابقت داده می‌شوند و در صورت تایید به عنوان یک نصب سالم در نظر گرفته می‌شوند. 

<Br>


#### جزئیات

شما می‌توانید نام کمپین، شبکه تبلیغاتی، گروه تبلیغاتی و خلاقانه خود را به ترکر اضافه کنید. با این کار شما ترکرهای خود را **گروه‌بندی** می‌کنید تا آن‌ها را به صورت جداگانه تحلیل کنید. هر کدام از این‌ها سطوحی برای گروه‌بندی ترکر است. مثلا در نمونه بالا شما می‌توانید کمپین جام‌جهانی ۲۰۱۸ را با چند شبکه تبلیغاتی مختلف اجرا کنید. 

#### لینک مقصد

در این قسمت شما تعیین می‌کنید کلیک روی کمپین شما به چه مقصدی هدایت کند. لینک مقصد را می‌توانید براساس پلتفرم هم تعیین کنید. به عنوان مثال کاربران اندرویدی به لینک نصب اپلیکیشن در بازار یا پلی‌ استور هدایت شوند و کاربران آی‌او‌اس به اپ استور. 

در لینک مقصد می‌توانید پارامترهایی را هم قرار دهید:

![عکس مربوطه](http://uupload.ir/files/kihu_parameters.png)

<Br>

#### کال‌بک

شما می‌توانید به ترکر خود **لینک کال‌بک** اضافه کنید. در اختصاص لینک کال‌بک، شما ‌می‌توانید یک سری پارامتر هم در کال‌بک درخواست دهید. این پارامترها در **جدول‌های زیر** قابل مشاهده هستند. شما می‌توانید هر کدام از ان پارامترها را به دلخواه خودتان انتخاب کنید.  

<details style="text-align: right"><summary>جدول پارامترهای کال‌بک کلیک</summary>
<p>
<table>
<thead>
<tr>
<th style="text-align: center">پارامترها</th>
<th style="text-align: right">توضیح</th>
</tr>
</thead>
<tbody><tr>
<td align="center">activity_kind</td>
<td align="right">نوع فعالیت (کلیک، نصب و...)</td>
</tr>
<tr>
<td align="center">tracker</td>
<td align="right">شناسه ترکر</td>
</tr>
<tr>
<td align="center">tracker_name</td>
<td align="right">نام ترکر</td>
</tr>
<tr>
<td align="center">network_name</td>
<td align="right">نام شبکه تبلیغاتی</td>
</tr>
<tr>
<td align="center">campaign_name</td>
<td align="right">نام کمپین</td>
</tr>
<tr>
<td align="center">adgroup_name</td>
<td align="right">نام گروه تبلیغاتی</td>
</tr>
<tr>
<td align="center">creative_name</td>
<td align="right">نام کریتیو</td>
</tr>
<tr>
<td align="center">ip_address</td>
<td align="right">آی‌پی کاربر</td>
</tr>
<tr>
<td align="center">os_name</td>
<td align="right">سیستم‌عامل</td>
</tr>
<tr>
<td align="center">os_version</td>
<td align="right">نسخه سیستم‌عامل</td>
</tr>
<tr>
<td align="center">device_manufacturer</td>
<td align="right">برند دستگاه</td>
</tr>
<tr>
<td align="center">device_name</td>
<td align="right">مدل دستگاه</td>
</tr>
<tr>
<td align="center">click_time</td>
<td align="right">زمان کلیک</td>
</tr>
</tbody></table>
</p>
</details>

<Br>

<details style="text-align: right"><summary>جدول پارامترهای کال‌بک نصب</summary>
<p>
<table>
<thead>
<tr>
<th style="text-align: center">پارامترها</th>
<th style="text-align: right">توضیح</th>
</tr>
</thead>
<tbody><tr>
<td align="center">activity_kind</td>
<td align="right">نوع فعالیت (کلیک، نصب و...)</td>
</tr>
<tr>
<td align="center">tracker</td>
<td align="right">شناسه ترکر</td>
</tr>
<tr>
<td align="center">tracker_name</td>
<td align="right">نام ترکر</td>
</tr>
<tr>
<td align="center">network_name</td>
<td align="right">نام شبکه تبلیغاتی</td>
</tr>
<tr>
<td align="center">campaign_name</td>
<td align="right">نام کمپین</td>
</tr>
<tr>
<td align="center">adgroup_name</td>
<td align="right">نام گروه تبلیغاتی</td>
</tr>
<tr>
<td align="center">creative_name</td>
<td align="right">نام کریتیو</td>
</tr>
<tr>
<td align="center">ip_address</td>
<td align="right">آی‌پی کاربر</td>
</tr>
<tr>
<td align="center">os_name</td>
<td align="right">سیستم‌عامل</td>
</tr>
<tr>
<td align="center">os_version</td>
<td align="right">نسخه سیستم‌عامل</td>
</tr>
<tr>
<td align="center">device_manufacturer</td>
<td align="right">برند دستگاه</td>
</tr>
<tr>
<td align="center">device_name</td>
<td align="right">مدل دستگاه</td>
</tr>
<tr>
<td align="center">click_time</td>
<td align="right">زمان کلیک</td>
</tr>
<tr>
<td align="center">app_id</td>
<td align="right">شناسه اپلیکیشن</td>
</tr>
<tr>
<td align="center">app_version</td>
<td align="right">نسخه اپلیکیشن</td>
</tr>
<tr>
<td align="center">connection_type</td>
<td align="right">نوع اتصال</td>
</tr>
<tr>
<td align="center">android_id</td>
<td align="right">شناسه اندروید (فقط در اندروید)</td>
</tr>
<tr>
<td align="center">installed_at</td>
<td align="right">زمان نصب</td>
</tr>
</tbody></table>
</p>
</details>

<Br>

> `نکته:` شما می‌توانید از `click_id` هم به عنوان پارامتر کال‌بک استفاده کنید. این شناسه را خودتان (یا آژانس تبلیغاتیتان) تعیین می‌کنید و به لینک ترکر چابک اضافه می‌کنید. 

برای مثال به کال‌بک زیر توجه کنید:

![عکس مربوطه](http://uupload.ir/files/ut47_callback-example.png)

<Br>

#### محدوده اتریبیوشن

آخرین قسمت هم تعیین **محدوده اتریبیوشن** است. این اقدام برای جلوگیری از تقلب در شمارش انجام می‌شود. شما می‌توانید تعداد ساعاتی که بین کلیک و نصب برای شما قابل قبول است را مشخص کنید.

#### افزودن CPA

شما می‌توانید کمپین‌های نصب خود را با مدل CPA یا هزینه براساس اکشن (رفتار) اجرا کنید. برای این کار باید **پس از ایجاد ترکر** گزینه ویرایش را در لیست ترکرها بزنید و در پایین صفحه وارد **افزودن CPA** شوید. 

![عکس مربوطه](http://uupload.ir/files/puhr_event-cpa.png)

<br>

در این صفحه علاوه بر تعیین رویداد (یا اکشن) می‌توانید **هدف** مشخص کنید. 

![عکس مربوطه](http://uupload.ir/files/z6a_goal-cpa.png)

<Br>

### آمار ترکر 

با کلیک روی هر ترکر می‌توانید جزئیات آن را به صورت لحظه‌ای مشاهده کنید.

![عکس مربوطه](http://uupload.ir/files/o994_8qnn_trackerperformance1.png)
![عکس مربوطه](http://uupload.ir/files/kmvo_trackerperformance2.png)

**نمودارهای آماری**:

- **رد شده**: تعداد کل نصب‌هایی که چابک **غیر واقعی** تشخیص داده است. در این نمودار می‌توانید سه مورد از عواملی که منجر به رد شده‌اند را در ماه جاری مشاهده کنید. خارج از محدوده همان محدوده اتریبیوشن یا زمان قابل قبولی که بین کلیک و نصب تعیین کرده‌اید. عامل بعدی کوتاه بودن فاصله بین نصب و کلیک است. عامل آخر نصب نامعتبر است که به معنی عدم تطابق امضاهای کاربر در کلیک و نصب می‌باشد.
 
- **بازدید**: درصد کاربرانی که از کمپین نصب مورد نظر آمده‌اند به تفکیک **بازدید** آن‌ها 

- **حذف**: تعداد حذف‌های یک کمپین در ماه جاری

- **سگمنت**: در این قسمت تمام سگمنت‌هایی که کاربران با کمپین نصب مورد نظر جذب شده‌اند، به صورت هوشمند قابل مشاهده می‌باشند. با این قابلیت می‌توانید برای کاربران جدید خود هدف‌ تعیین کنید و از نتایج آن با خبر شوید.
