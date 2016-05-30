'use strict';

function BoxWidget(jQuery, settings) {
    this.$ = jQuery;
    //this.element = this.$(element);
    this.settings = settings;
    this.selectors = this.settings.boxWidgetOptions.boxWidgetSelectors;
    this.icons = this.settings.boxWidgetOptions.boxWidgetIcons;
    this.animationSpeed = this.settings.animationSpeed;
}

//instantiate the object
BoxWidget.prototype.activate = function (_box) {
    var _this = this, $ = this.$;
    if (!_box) {
        _box = document; // activate all boxes per default
    }
    //Listen for collapse event triggers
    $(_box).on('click', _this.selectors.collapse, function (e) {
        e.preventDefault();
        _this.collapse($(this));
    });

    //Listen for remove event triggers
    $(_box).on('click', _this.selectors.remove, function (e) {
        e.preventDefault();
        _this.remove($(this));
    });
};

//Open the control sidebar
BoxWidget.prototype.collapse = function (element) {
    var _this = this, $ = this.$;
    //Find the box parent
    var box = element.parents(".box").first();
    //Find the body and the footer
    var box_content = box.find("> .box-body, > .box-footer, > form  >.box-body, > form > .box-footer");
    if (!box.hasClass("collapsed-box")) {
        //Convert minus into plus
        element.children(":first")
            .removeClass(_this.icons.collapse)
            .addClass(_this.icons.open);
        //Hide the content
        box_content.slideUp(_this.animationSpeed, function () {
            box.addClass("collapsed-box");
        });
    } else {
        //Convert plus into minus
        element.children(":first")
            .removeClass(_this.icons.open)
            .addClass(_this.icons.collapse);
        //Show the content
        box_content.slideDown(_this.animationSpeed, function () {
            box.removeClass("collapsed-box");
        });
    }
};

//Close the control sidebar
BoxWidget.prototype.remove = function (element) {
    //Find the box parent
    var box = element.parents(".box").first();
    box.slideUp(this.animationSpeed);
};

module.exports = BoxWidget;
