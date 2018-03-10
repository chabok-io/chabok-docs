function khabarname() {
    $('body')
        .on('click', '.khabrnamebutt', function () {
            const userEmail = $('#khabrnameEmail').val();
            if (!userEmail || userEmail == '' || !userEmail.match(/.+@.+\..+/)) {
                return alert('آدرس ایمیل شما درست وارد نشده است');
            }
            $
                .ajax({
                    url: 'https://push.adpdigital.com/api/email/subscribe',
                    type: 'POST',
                    data: {
                        email: userEmail,
                        list: 'users',
                        appId: 'chabok-demo'
                    }
                })
                .done(function (request) {
                    alert('آدرس ایمیل شما با موفقیت به خبرنامه چابک افزوده شد');
                })
                .fail(function (err) {
                    alert('خطا در ارتباط با سرور، لطفن بعدن دوباره امتحان کنید');
                    $('.loginError').html(JSON.parse(err.responseText).error.message)
                })
        })
}


function sideMenu() {
    var $body = $('body'),
        $html = $('html'),
        $sidebar = $('#sidebar');

    $body.on('click touch', '.overlayModal', function () {
        var $overlayModal = $('.overlayModal');

        if ($overlayModal.length) {
            $overlayModal.remove();
        }
        $sidebar.removeClass('drawer-menu-active');
        $html.removeClass('noScroll');

    });

    $('#sideMenuHandler').on('click touch', function () {
        var $overlayModal = $('.overlayModal');
        $sidebar.addClass('drawer-menu-active');
        $html.addClass('noScroll');
        if ($overlayModal.length) {
            $overlayModal.remove();
        }
        $body.append('<div class="overlayModal"></div>')
    })
}

$(document).ready(function () {
    khabarname();
    sideMenu();

    FastClick.attach(document.body);

    var elem = window.location.hash ? $('#' + decodeURIComponent(window.location.hash.replace('#', ''))) : ''
    var HEADER_HEIGHT = 75;

    $('.h2,h3,h4,h5,h6').filter('[id]').each(function () {
        $(this).html('<a href="#' + $(this).attr('id') + '">' + $(this).text() + '</a>');
    });

    if (elem.length) {
        $('html, body').animate({
            scrollTop: elem.offset().top - HEADER_HEIGHT
        }, 1000);
    }

    $('.entry').find('img').each(function () {
        $(this).addClass('img-fluid')
    });

    $('pre').each(function () {
        $(this).addClass('line-numbers')
    });

    Prism.highlightAll();

    $(".line-numbers-rows span:last-child").remove()

    $('a[href^="#"]').click(function () {
        var href = $.attr(this, 'href');

        $('html, body').animate({
            scrollTop: $(href).offset().top - HEADER_HEIGHT
        }, 500);
        window.location.hash = href;

        return false;
    });

});
