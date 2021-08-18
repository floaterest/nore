"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
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
function update(content) {
    $content.html(content).find('ruby').on('click', function () {
        if (isSelecting())
            return;
        $(this).each(function () {
            this.classList.toggle(HTMLClass.Hidden);
        });
    });
    return $content;
}
/**
 * generate a new item for the table of contents
 * @param text innerText for this element
 * @param path file to download when clicked
 */
function item(text, path) {
    return $('<p>').on('click', function () {
        return __awaiter(this, void 0, void 0, function () {
            var refresh, content;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        refresh = this.innerText == selected;
                        content = sessionStorage.getItem(path);
                        if (!(refresh || content == null)) return [3 /*break*/, 2];
                        console.debug(refresh ? 'refreshed' : 'downloaded', text, 'from sessionStorage!');
                        // download file, set session storage, assign to content
                        return [4 /*yield*/, $.get(path, function (f) { return sessionStorage.setItem(path, content = f); })];
                    case 1:
                        // download file, set session storage, assign to content
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        console.debug('got', text, 'from sessionStorage!');
                        _a.label = 3;
                    case 3:
                        kashi = new Kashi(update(content));
                        selected = this.innerText;
                        document.body.classList.remove(HTMLClass.HideContent);
                        window.scrollTo(0, 0);
                        return [2 /*return*/];
                }
            });
        });
    }).text(text);
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