'use strict';

function ControlSidebar(jQuery, settings) {
    this.$ = jQuery;
    //this.element = this.$(element);
    this.settings = settings;
}

//instantiate the object
ControlSidebar.prototype.activate = function () {
    //Get the object
    var $ = this.$;
    //Update options
    var o = this.settings;
    //Get the sidebar
    var sidebar = $(o.selector);
    //The toggle button
    var btn = $(o.toggleBtnSelector);

    //Listen to the click event
    btn.on('click', function (e) {
        e.preventDefault();
        //If the sidebar is not open
        if (!sidebar.hasClass('control-sidebar-open')
            && !$('body').hasClass('control-sidebar-open')) {
            //Open the sidebar
            this.open(sidebar, o.slide);
        } else {
            this.close(sidebar, o.slide);
        }
    });

    //If the body has a boxed layout, fix the sidebar bg position
    var bg = $(".control-sidebar-bg");
    this._fix(bg);

    //If the body has a fixed layout, make the control sidebar fixed
    if ($('body').hasClass('fixed')) {
        this._fixForFixed(sidebar);
    } else {
        //If the content height is less than the sidebar's height, force max height
        if ($('.content-wrapper, .right-side').height() < sidebar.height()) {
            this._fixForContent(sidebar);
        }
    }
};

//Open the control sidebar
ControlSidebar.prototype.open = function (sidebar, slide) {
    var $ = this.$;
    //Slide over content
    if (slide) {
        sidebar.addClass('control-sidebar-open');
    } else {
        //Push the content by adding the open class to the body instead
        //of the sidebar itself
        $('body').addClass('control-sidebar-open');
    }
};

//Close the control sidebar
ControlSidebar.prototype.close = function (sidebar, slide) {
    var $ = this.$;
    if (slide) {
        sidebar.removeClass('control-sidebar-open');
    } else {
        $('body').removeClass('control-sidebar-open');
    }
};

ControlSidebar.prototype._fix = function (sidebar) {
    var $ = this.$;
    if ($("body").hasClass('layout-boxed')) {
        sidebar.css('position', 'absolute');
        sidebar.height($(".wrapper").height());
        $(window).resize(function () {
            this._fix(sidebar);
        });
    } else {
        sidebar.css({
            'position': 'fixed',
            'height': 'auto'
        });
    }
};

ControlSidebar.prototype._fixForFixed = function (sidebar) {
    sidebar.css({
        'position': 'fixed',
        'max-height': '100%',
        'overflow': 'auto',
        'padding-bottom': '50px'
    });
};

ControlSidebar.prototype._fixForContent = function (sidebar) {
    var $ = this.$;
    $(".content-wrapper, .right-side").css('min-height', sidebar.height());
};

module.exports = ControlSidebar;
