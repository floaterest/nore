"use strict";
var HTMLClass;
(function (HTMLClass) {
    HTMLClass["Hidden"] = "hidden";
    HTMLClass["Underline"] = "underline";
    HTMLClass["HideContent"] = "toc-on";
})(HTMLClass || (HTMLClass = {}));
function toggleClass(condition, $el, className) {
    if (condition) {
        $el.addClass(className);
    }
    else {
        $el.removeClass(className);
    }
}
function isSelecting() {
    return document.getSelection().type != 'Caret';
}
var Kashi = /** @class */ (function () {
    function Kashi(elements) {
        this.isSwitched = false;
        this.isToggled = false;
        this.rubySelector = elements.rubySelector;
        this.$switch = elements.switch.text(this.getSwitchText());
        this.$toggle = elements.toggle.text(this.getToggleText());
    }
    Kashi.prototype.getRuby = function () {
        return $(this.rubySelector);
    };
    Kashi.prototype.getSwitchText = function () {
        return SWITCH[+this.isSwitched];
    };
    Kashi.prototype.getToggleText = function () {
        return TOGGLE[+this.isToggled];
    };
    /**
     * switch rt and rb
     */
    Kashi.prototype.switch = function () {
        this.isSwitched = !this.isSwitched;
        var $ruby = this.getRuby();
        $ruby.each(function () {
            this.innerHTML = this.innerHTML.replace(/(\S+)(<rt.*>)(\S+)/, '$3$2$1');
        });
        this.$switch.text(this.getSwitchText());
        toggleClass(this.isSwitched, $ruby, HTMLClass.Underline);
    };
    Kashi.prototype.toggle = function () {
        this.isToggled = !this.isToggled;
        var $ruby = this.getRuby();
        toggleClass(this.isToggled, $ruby, HTMLClass.Hidden);
    };
    return Kashi;
}());
//# sourceMappingURL=kashi.js.map