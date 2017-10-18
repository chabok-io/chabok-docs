$(document).ready(function () {

    var windowHeight = 0;
    var windowWidth = 0;
    window.direction = 'left';
    var citysvg = 0;

    function chnageSizeOfWindwo() {

        if ($(window).height() > 600) {
            windowHeight = $(window).height()
        } else {
            windowHeight = 600
        }
        if ($(window).width() > 1200) {
            windowWidth = $(window).width()
        } else {
            windowWidth = 1200;
        }
        $('.border').css({
            borderRight: windowWidth + 'px solid #fff'
        })
        var cityheight = windowWidth * .25
        $('.citysvg').css({
            height: cityheight
        })
        $('.background > .circle').css({
            bottom: 165 + ((cityheight - 300 ) / 2)
        });
        $('.background > .threeg').css({
            bottom: 165 + ((cityheight - 300 ) / 2)
        });
        $('.background > .bubble').css({
            bottom: 165 + ((cityheight - 300 ) / 2)
        });
        $('.background > .antena').css({
            bottom: 165 + ((cityheight - 300 ) / 2)
        });

        boatbottom = 20 + ((cityheight - 300 ) / 15);
        $('.boatholder').css({
            bottom: boatbottom
        });
        $('.car').css({
            left: windowWidth / 4.8
        });


        $('.fullSlide').css({
            width: windowWidth,
            height: windowHeight
        })
        $('.halfSlide').css({
            width: windowWidth,
            height: windowHeight / 2
        })
        $('.halfSlidemin').css({
            width: windowWidth,
            minHeight: windowHeight / 2
        })
    }

    function gotoSlide2() {
        $('.gotoSlide2').click(function () {
            $('html,body').animate({scrollTop: windowHeight}, '1000', 'linear')
        })
    }

    function khabarname() {
        $('.khabrnamebutt').click(function () {
            var userEmail = $('#khabrnameEmail').val();
            if (!userEmail || userEmail == '' || !userEmail.match(/.+@.+\..+/)) {
                return alert('Ø¢Ø¯Ø±Ø³ Ø§ÛŒÙ…ÛŒÙ„ Ø´Ù…Ø§ Ø¯Ø±Ø³Øª ÙˆØ§Ø±Ø¯ Ù†Ø´Ø¯Ù‡ Ø§Ø³Øª');
            }
            $.ajax({
                url: 'https://push.adpdigital.com/api/email/subscribe',
                type: 'POST',
                data: {
                    email: userEmail,
                    list: 'users',
                    appId: 'chabok-demo'
                }
            })
                .done(function (request) {
                    alert('Ø¢Ø¯Ø±Ø³ Ø§ÛŒÙ…ÛŒÙ„ Ø´Ù…Ø§ Ø¨Ø§ Ù…ÙˆÙÙ‚ÛŒØª Ø¨Ù‡ Ø®Ø¨Ø±Ù†Ø§Ù…Ù‡ Ú†Ø§Ø¨Ú© Ø§ÙØ²ÙˆØ¯Ù‡ Ø´Ø¯');
                })
                .fail(function (err) {
                    alert('Ø®Ø·Ø§ Ø¯Ø± Ø§Ø±ØªØ¨Ø§Ø· Ø¨Ø§ Ø³Ø±ÙˆØ±ØŒ Ù„Ø·ÙÙ† Ø¨Ø¹Ø¯Ù† Ø¯ÙˆØ¨Ø§Ø±Ù‡ Ø§Ù…ØªØ­Ø§Ù† Ú©Ù†ÛŒØ¯');
                    $('.loginError').html(JSON.parse(err.responseText).error.message)
                })
        })
    }

    $(window).resize(function () {
        chnageSizeOfWindwo()
    });

    khabarname();
    chnageSizeOfWindwo();
    gotoSlide2();
});