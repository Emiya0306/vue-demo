'use strict';

function ControlSidebar(settings, button, sidebar, sidebarBackground, wrapper, rightSide) {
    this.DOM = {
        button: button,
        sidebar: sidebar,
        sidebarBackground: sidebarBackground,
        wrapper: wrapper || document.querySelector('.wrapper'),
        rightSide: rightSide || document.querySelector('.content-wrapper, .right-side')
    };
    this.settings = settings;
    this.init();
}

//init the instance
ControlSidebar.prototype.init = function () {

    // get basic params
    var DOM = this.DOM, _this = this;

    // add click event
    DOM.button.addEventListener('click', function (event) {
        event.preventDefault();
        //If the sidebar is not open
        if (!(DOM.sidebar.className.indexOf('control-sidebar-open') >= 0)
            && !(document.body.className.indexOf('control-sidebar-open') >= 0)) {
            //Open the sidebar, enable slide
            _this.open();
        } else {
            _this.close();
        }
    });

    // If the body has a boxed layout, fix the sidebar bg position
    _this._fix(DOM.sidebarBackground);

    //If the body has a fixed layout, make the control sidebar fixed
    if (document.body.className.indexOf('fixed') >= 0) {
        _this._fixForFixed(DOM.sidebar);
    } else {
        //If the content height is less than the sidebar's height, force max height
        if (DOM.rightSide.style.height < DOM.sidebar.style.height) {
            _this._fixForContent(DOM.sidebar);
        }
    }
};

//Open the control sidebar
ControlSidebar.prototype.open = function () {
    var DOM = this.DOM, o = this.settings;
    //Slide over content
    if (o.slide) {
        DOM.sidebar.className = DOM.sidebar.className.indexOf('control-sidebar-open') >= 0 ?
            DOM.sidebar.className : DOM.sidebar.className + ' control-sidebar-open';
    } else {
        //Push the content by adding the open class to the body instead
        //of the sidebar itself
        document.body.className = document.body.className.indexOf('control-sidebar-open') >= 0 ?
            document.body.className : document.body.className + ' control-sidebar-open';
    }
};

//Close the control sidebar
ControlSidebar.prototype.close = function () {
    var DOM = this.DOM, o = this.settings;
    if (o.slide) {
        DOM.sidebar.className = DOM.sidebar.className.indexOf('control-sidebar-open') >= 0 ?
            DOM.sidebar.className.replace(' control-sidebar-open', '') : DOM.sidebar.className;
    } else {
        document.body.className = document.body.className.indexOf('control-sidebar-open') >= 0 ?
            document.body.className.replace(' control-sidebar-open', '') : document.body.className;
    }
};

ControlSidebar.prototype._fix = function (sidebar) {
    var DOM = this.DOM;
    if (document.body.className.indexOf('layout-boxed') >= 0) {
        sidebar.style.position='absolute';
        sidebar.height = DOM.wrapper.style.height;
        window.addEventListener('resize', function () {
            this._fix(sidebar);
        });
    } else {
        sidebar.style.position='fixed';
        sidebar.style.height='auto';
    }
};

ControlSidebar.prototype._fixForFixed = function (sidebar) {
    sidebar.style.position = 'fixed';
    sidebar.style.maxHeight = '100%';
    sidebar.style.overflow = 'auto';
    sidebar.style.paddingBottom = '50px';
};

ControlSidebar.prototype._fixForContent = function (sidebar) {
    var DOM = this.DOM;
    DOM.rightSide.style.minHeight = sidebar.style.height;
};

module.exports = ControlSidebar;
