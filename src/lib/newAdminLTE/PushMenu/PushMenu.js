'use strict';

function PushMenu(settings, button, mainSidebar, contentWrapper) {
    this.DOM = {
        button: button || document.body.querySelector("[data-toggle='offcanvas']"),
        contentWrapper: contentWrapper || document.body.querySelector(".content-wrapper"),
        mainSidebar: mainSidebar || document.body.querySelector(".main-sidebar")
    };
    this.settings = Object.assign({}, {
        screenSizes: {
            xs: 480,
            sm: 768,
            md: 992,
            lg: 1200
        },
        sidebarExpandOnHover: false
    }, settings);
    this.init();
}

PushMenu.prototype.init = function () {
    //Get the screen sizes
    var DOM = this.DOM,
        screenSizes = this.settings.screenSizes,
        sidebarExpandOnHover = this.settings.sidebarExpandOnHover;

    //Enable sidebar toggle
    DOM.button.addEventListener('click', function (e) {
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

    //Enable expand on hover for sidebar mini
    if (sidebarExpandOnHover
        || (document.body.className.indexOf('fixed') >= 0
        && document.body.className.indexOf('sidebar-mini') >= 0)) {
        this.expandOnHover();
    }
};

PushMenu.prototype.expandOnHover = function () {
    var _this = this, screenWidth = this.settings.screenSizes.sm - 1, DOM = this.DOM;
    //Expand sidebar on hover
    DOM.mainSidebar.addEventListener('mouseover', function () {
        if (document.body.className.indexOf('sidebar-mini') >= 0
            && document.body.className.indexOf('sidebar-collapse') >= 0
            && document.body.clientWidth > screenWidth) {
            _this.expand();
        }
    });
    DOM.mainSidebar.addEventListener('mouseout', function () {
        if (document.body.className.indexOf('sidebar-mini') >= 0
            && document.body.className.indexOf('sidebar-expanded-on-hover') >= 0
            && document.body.clientWidth > screenWidth) {
            _this.collapse();
        }
    });
};

PushMenu.prototype.expand = function () {
    document.body.className = document.body.className.replace(' sidebar-collapse', '');
    document.body.className += ' sidebar-expanded-on-hover';
};

PushMenu.prototype.collapse = function () {
    if (document.body.className.indexOf('sidebar-expanded-on-hover') >= 0) {
        document.body.className = document.body.className.replace(' sidebar-expanded-on-hover', '');
        document.body.className += ' sidebar-collapse';
    }
};

module.exports = PushMenu;
