var Tree = function (settings, Menu) {
    this.DOM = {
        Menu: Menu || document.querySelector('.sidebar'),
        MenuItems: Menu.querySelectorAll('.sidebar-menu > li > a')
    };
    this.settings = {
        animationSpeed: settings.animationSpeed || 500
    };

    this.init();
};

Tree.prototype.init = function () {
    this.DOM.MenuItems.forEach((function (item) {
        item.addEventListener('click', (function (event) {
            var checkElement = item.nextElementSibling;

            //check if the element is existed
            if (!checkElement) return null;

            //Check if the next element is a menu and is visible
            if (checkElement.className.indexOf('treeview-menu') >= 0 &&
                window.getComputedStyle(checkElement, null).display !== 'none' &&
                !(document.body.className.indexOf('sidebar-collapse') >= 0)) {
                //Close the menu
                this.slideUp(checkElement, this.settings.animationSpeed, function () {
                    checkElement.className =
                        checkElement.className.replace('menu-open', '').trim();
                    //Fix the layout in case the sidebar stretches over the height of the window
                    //_this.layout.fix();
                });
                checkElement.parentElement.className =
                    checkElement.parentElement.className.replace('active', '').trim();
            }
            //If the menu is not visible
            else if (checkElement.className.indexOf('treeview-menu') >= 0 &&
                window.getComputedStyle(checkElement, null).display === 'none') {
                //Close all open menus within the parent
                this.closeAllSubMenu();

                //Get the parent li
                var parent = item.parentElement;

                //Open the target menu and add the menu-open class
                this.slideDown(checkElement, this.settings.animationSpeed, function () {
                    //Add the class active to the parent li
                    checkElement.className += ' menu-open';
                    parent.className += ' active';
                    //Fix the layout in case the sidebar stretches over the height of the window
                    //_this.layout.fix();
                });
            }
            //if this isn't a link, prevent the page from being redirected
            if (checkElement.className.indexOf('treeview-menu') >= 0) {
                event.preventDefault();
            }
        }).bind(this));
    }).bind(this));
};

Tree.prototype.slideUp = function (element, animationSpeed, cb) {
    this.getStyle(element, 'paddingTop');
    this.getStyle(element, 'paddingBottom');
    this.getStyle(element, 'height');
    this.getStyle(element, 'marginTop');
    this.getStyle(element, 'marginBottom');
    this.getStyle(element, 'borderTopWidth');
    this.getStyle(element, 'borderBottomWidth');
    element.style.transition = 'all '+ animationSpeed/1000.0 +'s ease';
    element.style.paddingTop = '0';
    element.style.paddingBottom = '0';
    element.style.overflow = 'hidden';
    element.style.height = '0';
    element.style.borderTopWidth = '0';
    element.style.borderBottomWidth = '0';
    var timer = setInterval(function () {
        cb ? cb() : null;
        clearInterval(timer);
    }, animationSpeed);
};

Tree.prototype.slideDown = function (element, animationSpeed, cb) {
    element.style.transition = 'all '+ animationSpeed/1000.0 +'s ease';
    element.style.paddingTop = element.attributes.getNamedItem('data-paddingTop').value;
    element.style.paddingBottom = element.attributes.getNamedItem('data-paddingBottom').value;
    element.style.height = element.attributes.getNamedItem('data-height').value;
    var timer = setInterval(function () {
        cb ? cb() : null;
        clearInterval(timer);
    }, animationSpeed);
};

Tree.prototype.getStyle = function (element, styleName) {
    if(!element.attributes.getNamedItem('data-' + styleName)) {
        var computedStyle = window.getComputedStyle(element, null)[styleName];
        var styleAttribute = document.createAttribute('data-' + styleName);
        styleAttribute.nodeValue = computedStyle;
        element.attributes.setNamedItem(styleAttribute);
        element.style[styleName] = element.attributes.getNamedItem('data-' + styleName).value;
    }
};

Tree.prototype.closeAllSubMenu = function () {
    this.DOM.MenuItems.forEach((function(item) {
        var menuList = item.nextElementSibling;
        if (!menuList) return null;

        if (menuList.className.indexOf('treeview-menu') >= 0) {
            this.slideUp(menuList, this.settings.animationSpeed, function() {
                //Remove the menu-open class from the parent
                menuList.parentElement.className =
                    menuList.parentElement.className.replace('menu-open', '').trim();
                menuList.parentElement.className =
                    menuList.parentElement.className.replace('active', '').trim();
            });
        }
    }).bind(this));
};

module.exports = Tree;