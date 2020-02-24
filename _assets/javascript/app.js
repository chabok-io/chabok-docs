(function ($) {
  'use strict';

  // AFFIX CLASS DEFINITION
  // ======================
    function getVisiblePartOfFooter() {
        var $el = $('#footer'),
            scrollTop = $(this).scrollTop(),
            scrollBot = scrollTop + $(this).height(),
            elTop = $el.offset().top,
            elBottom = elTop + $el.outerHeight(),
            visibleTop = elTop < scrollTop ? scrollTop : elTop,
            visibleBottom = elBottom > scrollBot ? scrollBot : elBottom;
        $('#notification').text(visibleBottom - visibleTop);

        var height = $(window).height() - (visibleBottom - visibleTop)

        if ((visibleBottom - visibleTop) > 0){
            $('.affix').css("height", height - 60)
            $('.affix-bottom').css("height", height - 60)
        } else {
            $('.affix').css("height", 'auto')
            $('.affix-bottom').css("height", 'auto')
        }
    }
    $(window).on('scroll resize', getVisiblePartOfFooter);

  var Affix = function (element, options) {
    this.options = $.extend({}, Affix.DEFAULTS, options)

    this.$target = $(this.options.target)
      .on('scroll.bs.affix.data-api', $.proxy(this.checkPosition, this))
      .on('click.bs.affix.data-api', $.proxy(this.checkPositionWithEventLoop, this))

    this.$element = $(element)
    this.affixed = null
    this.unpin = null
    this.pinnedOffset = null

    this.checkPosition()
  }

  Affix.VERSION = '3.3.6'

  Affix.RESET = 'affix affix-top affix-bottom'

  Affix.DEFAULTS = {
    offset: 0,
    target: window
  }

  Affix.prototype.getState = function (scrollHeight, height, offsetTop, offsetBottom) {
    var scrollTop = this.$target.scrollTop()
    var position = this.$element.offset()
    var targetHeight = this.$target.height()

    if (offsetTop != null && this.affixed == 'top') return scrollTop < offsetTop ? 'top' : false

    if (this.affixed == 'bottom') {
      if (offsetTop != null) return (scrollTop + this.unpin <= position.top) ? false : 'bottom'
      return (scrollTop + targetHeight <= scrollHeight - offsetBottom) ? false : 'bottom'
    }

    var initializing = this.affixed == null
    var colliderTop = initializing ? scrollTop : position.top
    var colliderHeight = initializing ? targetHeight : height

    if (offsetTop != null && scrollTop <= offsetTop) return 'top'
    if (offsetBottom != null && (colliderTop + colliderHeight >= scrollHeight - offsetBottom)) return 'bottom'

    return false
  }

  Affix.prototype.getPinnedOffset = function () {
    if (this.pinnedOffset) return this.pinnedOffset
    this.$element.removeClass(Affix.RESET).addClass('affix')
    var scrollTop = this.$target.scrollTop()
    var position = this.$element.offset()
    return (this.pinnedOffset = position.top - scrollTop)
  }

  Affix.prototype.checkPositionWithEventLoop = function () {
    setTimeout($.proxy(this.checkPosition, this), 1)
  }

  Affix.prototype.checkPosition = function () {
    if (!this.$element.is(':visible')) return

    var height = this.$element.height()
    var offset = this.options.offset
    var offsetTop = offset.top
    var offsetBottom = offset.bottom
    var scrollHeight = Math.max($(document).height(), $(document.body).height())

    if (typeof offset != 'object') offsetBottom = offsetTop = offset
    if (typeof offsetTop == 'function') offsetTop = offset.top(this.$element)
    if (typeof offsetBottom == 'function') offsetBottom = offset.bottom(this.$element)

    var affix = this.getState(scrollHeight, height, offsetTop, offsetBottom)

    if (this.affixed != affix) {
      if (this.unpin != null) this.$element.css('top', '')

      var affixType = 'affix' + (affix ? '-' + affix : '')
      var e = $.Event(affixType + '.bs.affix')

      this.$element.trigger(e)

      if (e.isDefaultPrevented()) return

      this.affixed = affix
      this.unpin = affix == 'bottom' ? this.getPinnedOffset() : null

      this.$element
        .removeClass(Affix.RESET)
        .addClass(affixType)
        .trigger(affixType.replace('affix', 'affixed') + '.bs.affix')
    }

    if (affix == 'bottom') {
      this.$element.offset({
        top: scrollHeight - height - offsetBottom
      })
    }
  }

  // AFFIX PLUGIN DEFINITION
  // =======================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data = $this.data('bs.affix')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.affix', (data = new Affix(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.affix

  $.fn.affix = Plugin
  $.fn.affix.Constructor = Affix


  // AFFIX NO CONFLICT
  // =================

  $.fn.affix.noConflict = function () {
    $.fn.affix = old
    return this
  }


  // AFFIX DATA-API
  // ==============

  $(window).on('load', function () {
    $('[data-spy="affix"]').each(function () {
      var $spy = $(this)
      var data = $spy.data()

      data.offset = data.offset || {}

      if (data.offsetBottom != null) data.offset.bottom = data.offsetBottom
      if (data.offsetTop != null) data.offset.top = data.offsetTop

      Plugin.call($spy, data)
    })
  })

}(jQuery));

(function ($) {
  $.fn.toc = function (options) {
    var defaults = {
        noBackToTopLinks: false,
        title: '<i></i>',
        minimumHeaders: 3,
        headers: 'h1, h2, h3,h4,h5,h6',
        listType: 'ol', // values: [ol|ul]
        showEffect: 'show', // values: [show|slideDown|fadeIn|none]
        showSpeed: 'slow', // set to 0 to deactivate effect
        classes: {
          list: 'toc-list',
          item: ''
        }
      },
      settings = $.extend(defaults, options);

    function fixedEncodeURIComponent(str) {
      return encodeURIComponent(str).replace(/[!'()*]/g, function (c) {
        return '%' + c.charCodeAt(0).toString(16);
      });
    }

    function createLink(header) {
      const innerText = (header.textContent === undefined) ? header.innerText : header.textContent;
      const headerText = innerText.split('|')

      if (headerText.length > 1) {
        return `<span class='web-service-http-method-${headerText[0].toLowerCase()}'>${headerText[0]}</span>` +
            "<a href='#" + fixedEncodeURIComponent(header.id) + "'>" + headerText[1] + "</a>"
      }

      return "<a href='#" + fixedEncodeURIComponent(header.id) + "'>" + headerText[0] + "</a>";
    }

    var headers = $(settings.headers).filter(function () {
      var previousSiblingName = $(this).prev().attr("name");
      if (!this.id && previousSiblingName) {
        this.id = $(this).attr("id", previousSiblingName.replace(/\./g, "-"));
      }
      return this.id;
    }), output = $(this);
    if (!headers.length || headers.length < settings.minimumHeaders || !output.length) {
      $(this).hide();
      return;
    }

    if (0 === settings.showSpeed) {
      settings.showEffect = 'none';
    }

    var render = {
      show: function () {
        output.hide().html(html).show(settings.showSpeed);
      },
      slideDown: function () {
        output.hide().html(html).slideDown(settings.showSpeed);
      },
      fadeIn: function () {
        output.hide().html(html).fadeIn(settings.showSpeed);
      },
      none: function () {
        output.html(html);
      }
    };

    var get_level = function (ele) {
      return parseInt(ele.nodeName.replace("H", ""), 10);
    };
    var highest_level = headers.map(function (_, ele) {
      return get_level(ele);
    }).get().sort()[0];
    var return_to_top = '<i class="icon-arrow-up back-to-top"> </i>';

    var level = get_level(headers[0]),
      this_level,
      html = settings.title + " <" + settings.listType + " data-spy=\"affix\" data-offset-top=\"100\" data-offset-bottom=\"200\"  class=\"" + settings.classes.list + "\">";
    headers.on('click', function () {
      if (!settings.noBackToTopLinks) {
        window.location.hash = this.id;
      }
    })
      .addClass('clickable-header')
      .each(function (_, header) {
        this_level = get_level(header);
        if (!settings.noBackToTopLinks && this_level === highest_level) {
          $(header).addClass('top-level-header').after(return_to_top);
        }
        if (this_level === level) // same level as before; same indenting
          html += "<li class=\"" + settings.classes.item + "\">" + createLink(header);
        else if (this_level <= level) { // higher level than before; end parent ol
          for (var i = this_level; i < level; i++) {
            html += "</li></" + settings.listType + ">"
          }
          html += "<li class=\"" + settings.classes.item + "\">" + createLink(header);
        }
        else if (this_level > level) { // lower level than before; expand the previous to contain a ol
          for (i = this_level; i > level; i--) {
            html += "<" + settings.listType + " class=\"" + settings.classes.list + " sub-li \">" +
              "<li class=\"" + settings.classes.item + "\">"
          }
          html += createLink(header);
        }
        level = this_level; // update for the next one
      });
    html += "</" + settings.listType + ">";
    if (!settings.noBackToTopLinks) {
      $(document).on('click', '.back-to-top', function () {
        $(window).scrollTop(0);
        window.location.hash = '';
      });
    }

    render[settings.showEffect]();
  };
})(jQuery);

$('#toc').toc({listType: 'ul'});


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

function handleTabs() {
  $('.tab_toggle').click(function(e){
    e.preventDefault();
    var $this = $(this);
    var curtab = $this.attr('data-tab');

    $('.tab_toggle_ul.ab-nav-tabs li').removeClass('active');
    $('.tab_toggle_ul.ab-nav-tabs li.' + curtab).addClass('active');
    $('div.tab_toggle_div div.ab-tab-pane').removeClass('active');
    $('div.tab_toggle_div div.' + curtab + '_tab').addClass('active');

  });
  $('.tab_toggle_only').click(function(e){
    e.preventDefault();

    var $this = $(this);
    var curtab = $this.attr('data-tab');
    var partab = $this.attr('data-tab-target');

    $('#' + partab + '_nav li').removeClass('active');
    $('#' + partab + '_nav li.' + curtab).addClass('active');
    $('#' + partab + ' div.ab-tab-pane').removeClass('active');

    $('#' + partab + ' div.' + curtab + '_tab').addClass('active');

  });
  $('.ab-tab-content .ab-tab-pane:first-child').addClass('active');
}

$(document).ready(function () {
  khabarname();
  sideMenu();
  handleTabs();

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
