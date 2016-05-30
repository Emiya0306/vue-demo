'use strict';

function Layout(jQuery, settings) {
    this.$ = jQuery;
    this.settings = settings;
}

//instantiate the object
Layout.prototype.activate = function () {
    var $ = this.$, _this = this;
    _this.fix();
    _this.fixSidebar();
    $(window, ".wrapper").resize(function () {
        _this.fix();
        _this.fixSidebar();
    });
};

Layout.prototype.fix = function () {
    var $ = this.$, _this = this;
    //Get window height and the wrapper height
    var neg = $('.main-header').outerHeight() + $('.main-footer').outerHeight();
    var window_height = $(window).height();
    var sidebar_height = $(".sidebar").height();
    //Set the min-height of the content and sidebar based on the
    //the height of the document.
    if ($("body").hasClass("fixed")) {
        $(".content-wrapper, .right-side").css('min-height', window_height - $('.main-footer').outerHeight());
    } else {
        var postSetWidth;
        if (window_height >= sidebar_height) {
            $(".content-wrapper, .right-side").css('min-height', window_height - neg);
            postSetWidth = window_height - neg;
        } else {
            $(".content-wrapper, .right-side").css('min-height', sidebar_height);
            postSetWidth = sidebar_height;
        }

        //Fix for the control sidebar height
        var controlSidebar = $(_this.settings.controlSidebarOptions.selector);
        if (typeof controlSidebar !== "undefined") {
            if (controlSidebar.height() > postSetWidth)
                $(".content-wrapper, .right-side").css('min-height', controlSidebar.height());
        }

    }
};

Layout.prototype.fixSidebar = function () {
    var $ = this.$, _this = this;
    //Make sure the body tag has the .fixed class
    if (!$("body").hasClass("fixed")) {
        if (typeof $.fn.slimScroll != 'undefined') {
            $(".sidebar").slimScroll({destroy: true}).height("auto");
        }
        return;
    } else if (typeof $.fn.slimScroll == 'undefined' && window.console) {
        window.console.error("Error: the fixed layout requires the slimscroll plugin!");
    }
    //Enable slimscroll for fixed layout
    if (_this.settings.sidebarSlimScroll) {
        if (typeof $.fn.slimScroll != 'undefined') {
            //Destroy if it exists
            $(".sidebar").slimScroll({destroy: true}).height("auto");
            //Add slimscroll
            $(".sidebar").slimscroll({
                height: ($(window).height() - $(".main-header").height()) + "px",
                color: "rgba(0,0,0,0.2)",
                size: "3px"
            });
        }
    }
};

module.exports = Layout;
