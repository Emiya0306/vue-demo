'use strict';

function PushMenu(settings, button, contentWrapper) {
    this.DOM = {
        button: button || document.body.querySelector("[data-toggle='offcanvas']"),
        contentWrapper: contentWrapper || document.body.querySelector(".content-wrapper")
    };
    this.settings = settings || {
            screenSizes: {
                xs: 480,
                sm: 768,
                md: 992,
                lg: 1200
            },
            sidebarExpandOnHover: false
        };
    this.init();
}

PushMenu.prototype.init = function () {
    //Get the screen sizes
    var DOM = this.DOM,
        screenSizes = this.settings.screenSizes,
        sidebarExpandOnHover = this.settings.sidebarExpandOnHover;

    //Enable sidebar toggle
    DOM.button.addEventListener('click', function(e) {
        e.preventDefault();

        //Enable sidebar push menu
        if (document.body.clientWidth > (screenSizes.sm - 1)) {
            if (document.body.className.indexOf('sidebar-collapse') >= 0) {
                //$("body").removeClass('sidebar-collapse').trigger('expanded.pushMenu');
                document.body.className = document.body.className.replace(' sidebar-collapse', '');
            } else {
                //$("body").addClass('sidebar-collapse').trigger('collapsed.pushMenu');
                document.body.className += ' sidebar-collapse';
            }
        }
        //Handle sidebar push menu for small screens
        else {
            if (document.body.className.indexOf('sidebar-open') >= 0) {
                //$("body").removeClass('sidebar-open').removeClass('sidebar-collapse').trigger('collapsed.pushMenu');
                document.body.className = document.body.className.replace(' sidebar-open', '').replace(' sidebar-collapse', '');
            } else {
                //$("body").addClass('sidebar-open').trigger('expanded.pushMenu');
                document.body.className += ' sidebar-open';
                console.log(document.body.className);
            }
        }
    });

    DOM.contentWrapper.addEventListener('click', function () {
        //Enable hide menu when clicking on the content-wrapper on small screens
        if (document.body.clientWidth <= (screenSizes.sm - 1) &&
            (document.body.className.indexOf('sidebar-open') >= 0)) {
            document.body.className = document.body.className.replace(' sidebar-open', '');
        }
    });

    // TODO: sidebar mini is not finished
    //Enable expand on hover for sidebar mini
    //if (sidebarExpandOnHover
    //    || (document.body.className.indexOf('fixed') >= 0
    //    && document.body.className.indexOf('sidebar-mini') >= 0)) {
    //    //this.expandOnHover();
    //}
};

//PushMenu.prototype.expandOnHover = function () {
//    var _this = this;
//    var screenWidth = this.settings.screenSizes.sm - 1;
//    //Expand sidebar on hover
//    $('.main-sidebar').hover(function () {
//        if ($('body').hasClass('sidebar-mini')
//            && $("body").hasClass('sidebar-collapse')
//            && $(window).width() > screenWidth) {
//            _this.expand();
//        }
//    }, function () {
//        if ($('body').hasClass('sidebar-mini')
//            && $('body').hasClass('sidebar-expanded-on-hover')
//            && $(window).width() > screenWidth) {
//            _this.collapse();
//        }
//    });
//};
//
//PushMenu.prototype.expand = function () {
//    var $ = this.$;
//    $("body").removeClass('sidebar-collapse').addClass('sidebar-expanded-on-hover');
//};
//
//PushMenu.prototype.collapse = function () {
//    var $ = this.$;
//    if ($('body').hasClass('sidebar-expanded-on-hover')) {
//        $('body').removeClass('sidebar-expanded-on-hover').addClass('sidebar-collapse');
//    }
//};

module.exports = PushMenu;
