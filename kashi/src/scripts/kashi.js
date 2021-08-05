"use strict";
var HTMLClass;
(function (HTMLClass) {
    HTMLClass["Hidden"] = "hidden";
    HTMLClass["Underline"] = "underline";
    HTMLClass["HideContent"] = "hide-content";
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
    function Kashi(content) {
        this.isSwitched = false;
        this.isToggled = false;
        this.$ruby = content.find('ruby');
        this.$rt = this.$ruby.find('rt');
    }
    /**
     * switch rt and rb
     */
    Kashi.prototype.switch = function () {
        this.isSwitched = !this.isSwitched;
        this.$ruby.each(function () {
            this.innerHTML = this.innerHTML.replace(/(\S+)(<rt.*>)(\S+)/, '$3$2$1');
        });
        toggleClass(this.isSwitched, this.$ruby, HTMLClass.Underline);
    };
    Kashi.prototype.toggle = function () {
        this.isToggled = !this.isToggled;
        toggleClass(this.isToggled, this.$rt, HTMLClass.Hidden);
    };
    return Kashi;
}());
//# sourceMappingURL=kashi.js.map