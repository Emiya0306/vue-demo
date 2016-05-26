'use strict';

var settings = require('./defaultSettings');
var Layout = require('./Layout/Layout');
var PushMenu = require('./PushMenu/PushMenu');
var ControlSidebar = require('./ControlSidebar/ControlSidebar');
var BoxWidget = require('./BoxWidget/BoxWidget');

var FastClick = require('./plugins/fastclick');
var Slimscroll = require('slimscroll');

function AdminLTE($, userSettings) {
    var jQuery = this.$ = $, _this = this;

    $("body").removeClass("hold-transition");

    var o = this.settings = Object.assign({}, userSettings, settings);

    //Set up the object
    this.init();

    //Activate the layout maker
    this.layout.activate();

    //Enable sidebar tree view controls
    this.tree('.sidebar');

    //Enable control sidebar
    if (o.enableControlSidebar) {
        this.controlSidebar.activate();
    }

    //Add slimscroll to navbar dropdown
    if (o.navbarMenuSlimscroll) {

        var navbarMenus = document.querySelectorAll('.navbar .menu');

        for ( var i = 0; i < navbarMenus.length; i++ ) {
            _this._instances.navbarMenuSlimscroll.push(new Slimscroll({
                height: o.navbarMenuHeight,
                alwaysVisible: false,
                size: o.navbarMenuSlimscrollWidth
            }, navbarMenus[i]));
        }
    }

    //Activate sidebar push menu
    if (o.sidebarPushMenu) {
        this.pushMenu.activate(o.sidebarToggleSelector);
    }

    ////Activate Bootstrap tooltip
    //if (o.enableBSToppltip) {
    //    $('body').tooltip({
    //        selector: o.BSTooltipSelector
    //    });
    //}

    //Activate box widget
    if (o.enableBoxWidget) {
        this.boxWidget.activate();
    }

    //Activate fast click
    if (o.enableFastclick) {
        FastClick.attach(document.body);
    }

    //Activate direct chat widget
    if (o.directChat.enable) {
        $(document).on('click', o.directChat.contactToggleSelector, function () {
            var box = $(this).parents('.direct-chat').first();
            box.toggleClass('direct-chat-contacts-open');
        });
    }

    /*
     * INITIALIZE BUTTON TOGGLE
     * ------------------------
     */
    $('.btn-group[data-toggle="btn-toggle"]').each(function () {
        var group = $(this);
        $(this).find(".btn").on('click', function (e) {
            group.find(".btn.active").removeClass("active");
            $(this).addClass("active");
            e.preventDefault();
        });

    });
}

/* ----------------------------------
 * - Initialize the AdminLTE Object -
 * ----------------------------------
 * All AdminLTE functions are implemented below.
 */
AdminLTE.prototype.init = function _init() {
    /* Layout
     * ======
     * Fixes the layout height in case min-height fails.
     *
     * @type Object
     * @usage $.AdminLTE.layout.activate()
     *        $.AdminLTE.layout.fix()
     *        $.AdminLTE.layout.fixSidebar()
     */
    var $ = this.$, settings = this.settings;

    this.layout = new Layout($, settings);
    this.pushMenu = new PushMenu($, settings);
    this.controlSidebar = new ControlSidebar($, settings);
    this.boxWidget = new BoxWidget($, settings);
    this.tree = function (menu) {
        var _this = this, $ = this.$;
        var animationSpeed = _this.settings.animationSpeed;
        $(document).on('click', menu + ' li a', function (e) {
            //Get the clicked link and the next element
            var $this = $(this);
            var checkElement = $this.next();

            //Check if the next element is a menu and is visible
            if ((checkElement.is('.treeview-menu')) && (checkElement.is(':visible')) && (!$('body').hasClass('sidebar-collapse'))) {
                //Close the menu
                checkElement.slideUp(animationSpeed, function () {
                    checkElement.removeClass('menu-open');
                    //Fix the layout in case the sidebar stretches over the height of the window
                    //_this.layout.fix();
                });
                checkElement.parent("li").removeClass("active");
            }
            //If the menu is not visible
            else if ((checkElement.is('.treeview-menu')) && (!checkElement.is(':visible'))) {
                //Get the parent menu
                var parent = $this.parents('ul').first();
                //Close all open menus within the parent
                var ul = parent.find('ul:visible').slideUp(animationSpeed);
                //Remove the menu-open class from the parent
                ul.removeClass('menu-open');
                //Get the parent li
                var parent_li = $this.parent("li");

                //Open the target menu and add the menu-open class
                checkElement.slideDown(animationSpeed, function () {
                    //Add the class active to the parent li
                    checkElement.addClass('menu-open');
                    parent.find('li.active').removeClass('active');
                    parent_li.addClass('active');
                    //Fix the layout in case the sidebar stretches over the height of the window
                    _this.layout.fix();
                });
            }
            //if this isn't a link, prevent the page from being redirected
            if (checkElement.is('.treeview-menu')) {
                e.preventDefault();
            }
        });
    };

    this._instances = {
        navbarMenuSlimscroll: []
    }
};

module.exports = AdminLTE;