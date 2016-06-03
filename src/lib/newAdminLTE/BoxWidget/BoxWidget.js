'use strict';

function BoxWidget(settings, BoxWidget) {
    this.settings = settings || {
            boxWidgetIcons: {
                //Collapse icon
                collapse: 'fa-minus',
                //Open icon
                open: 'fa-plus',
                //Remove icon
                remove: 'fa-times'
            },
            boxWidgetSelectors: {
                //Remove button selector
                remove: '[data-widget="remove"]',
                //Collapse button selector
                collapse: '[data-widget="collapse"]'
            },
            animationSpeed: 500
        };
    this.DOM = {
        BoxWidget: BoxWidget || document.querySelector('.box'),
        RemoveButton: BoxWidget.querySelector('*' + this.settings.boxWidgetSelectors.remove),
        CollapseButton: BoxWidget.querySelector('*' + this.settings.boxWidgetSelectors.collapse).firstChild
    };
    this.selectors = this.settings.boxWidgetSelectors;
    this.icons = this.settings.boxWidgetIcons;
    this.animationSpeed = this.settings.animationSpeed;
    this.init();
}

//instantiate the object
BoxWidget.prototype.init = function () {
    var DOM = this.DOM;
    //Listen for collapse event triggers
    this.DOM.BoxWidget.addEventListener('click', (function (event) {
        event.preventDefault();

        //Get data-widget button
        var buttonElement = event.target.attributes.getNamedItem('data-widget') ? event.target : event.target.parentNode;

        //If no data-widget button
        if (!buttonElement.attributes.getNamedItem('data-widget')) return null;

        //Listen for collapse event triggers
        if (buttonElement.attributes.getNamedItem('data-widget').value === 'collapse') {
            this.collapse();
        }

        //Listen for remove event triggers
        else if (buttonElement.attributes.getNamedItem('data-widget').value === 'remove') {
            this.remove();
        }
    }).bind(this));
};

//Open the control sidebar
BoxWidget.prototype.collapse = function () {
    var DOM = this.DOM;

    //Find the body and the footer
    var box_content = DOM.BoxWidget.querySelector('.box-body');
    var box_footer = DOM.BoxWidget.querySelector('.box-footer');
    var box_formContent = DOM.BoxWidget.querySelector('form .box-body');
    var box_formFooter = DOM.BoxWidget.querySelector('form .box-footer');

    if (DOM.BoxWidget.className.indexOf('collapsed-box') < 0) {
        //Convert minus into plus
        DOM.CollapseButton.className = DOM.CollapseButton.className.replace(' ' + this.icons.collapse, '');
        DOM.CollapseButton.className += (' ' + this.icons.open);
        //Hide the content
        // Add block style, because if change display, the animation will not take effect
        box_content.style.display = 'block';
        this.slideUp(box_content, this.animationSpeed, function () {
            DOM.BoxWidget.className += (' collapsed-box');
        });
    }

    else {
        //Convert plus into minus
        DOM.CollapseButton.className = DOM.CollapseButton.className.replace(' ' + this.icons.open, '');
        DOM.CollapseButton.className += (' ' + this.icons.collapse);
        //Show the content
        DOM.BoxWidget.className = DOM.BoxWidget.className.replace(' collapsed-box', '');
        box_content.style.display = 'block';
        this.slideDown(box_content, this.animationSpeed, function () {});
    }
};

//Close the control sidebar
BoxWidget.prototype.remove = function () {
    var DOM = this.DOM;

    //Find the box parent
    this.slideUp(DOM.BoxWidget, this.animationSpeed, function() {
        DOM.BoxWidget.style.display = 'none';
    })
};

BoxWidget.prototype.slideUp = function (element, animationSpeed, cb) {
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
        cb();
        clearInterval(timer);
    }, animationSpeed);
};

BoxWidget.prototype.slideDown = function (element, animationSpeed, cb) {
    element.style.transition = 'all '+ animationSpeed/1000.0 +'s ease';
    element.style.paddingTop = element.attributes.getNamedItem('data-paddingTop').value;
    element.style.paddingBottom = element.attributes.getNamedItem('data-paddingBottom').value;
    element.style.height = element.attributes.getNamedItem('data-height').value;
    var timer = setInterval(function () {
        cb();
        clearInterval(timer);
    }, animationSpeed);
};

BoxWidget.prototype.getStyle = function (element, styleName) {
    var computedStyle = window.getComputedStyle(element, null)[styleName];
    var styleAttribute = document.createAttribute('data-' + styleName);
    styleAttribute.nodeValue = computedStyle;
    element.attributes.setNamedItem(styleAttribute);
    element.style[styleName] = element.attributes.getNamedItem('data-' + styleName).value;
};

module.exports = BoxWidget;
