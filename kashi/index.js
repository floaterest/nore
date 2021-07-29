"use strict";
/*
* Regex for Japanese
* Kanji: [\u3005\u4e00-\u9faf]
* Hiragana: [\u3040-\u309f]
* */
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
    HTMLClass["TocOn"] = "toc-on";
})(HTMLClass || (HTMLClass = {}));
//#region constants
var switches = {
    '⇅': '⇵',
    '⇵': '⇅',
};
var toggles = {
    '０': 'ー',
    'ー': '０',
};
//#endregion constants
//#region variables
var directory = 'lyrics/';
var $toc = $('#toc');
var $lrc = $('#lrc');
var $toggle = $('#toggle');
var $switch = $('#switch');
var selected;
//#endregion variables
//#region functions
/* get the first key of a dictionary/object */
function init(o) {
    return Object.keys(o)[0];
}
/* populate table of contents */
function getToc(title, file) {
    var p = $('<p>');
    p.text(title);
    p.on('click', function () {
        return __awaiter(this, void 0, void 0, function () {
            var lyrics;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this == selected)
                            return [2 /*return*/];
                        lyrics = sessionStorage.getItem(file);
                        if (!!lyrics) return [3 /*break*/, 2];
                        return [4 /*yield*/, $.get(directory + file, function (f) { return sessionStorage.setItem(file, f); })];
                    case 1:
                        _a.sent();
                        lyrics = sessionStorage.getItem(file);
                        _a.label = 2;
                    case 2:
                        // update ui
                        lrc(lyrics, $lrc);
                        selected = this;
                        document.body.classList.remove(HTMLClass.TocOn);
                        window.scrollTo(0, 0);
                        return [2 /*return*/];
                }
            });
        });
    });
    return p;
}
/* add lyrics */
function lrc(lyrics, element) {
    // reset buttons' symbols to default
    $toggle.text(init(toggles));
    $switch.text(init(switches));
    element.html(lyrics).find('ruby').on('click', function () {
        Array.from(this.getElementsByTagName('rt')).forEach(function (e) {
            e.classList.toggle(HTMLClass.Hidden);
        });
    });
}
//#endregion functions
$.getJSON(directory.replace('/', '.json')).done(function (data) {
    return data.forEach(function (d) { return $toc.prepend(getToc(d, d + '.html')); });
});
$toggle.text(init(toggles)).on('click', function () {
    // switch the symbol
    this.innerText = toggles[this.innerText];
    // toggle rt's visibility
    $('rt').toggleClass(HTMLClass.Hidden);
});
$switch.text(init(switches)).on('click', function () {
    // switch the symbol
    this.innerText = switches[this.innerText];
    $('ruby').each(function () {
        // switch the texts
        // 'rb' and 'rt' stand for 'ruby base' and 'ruby top' ?
        // bottom<rt>top</rt>
        this.innerHTML = this.innerHTML.replace(/(\S+)<rt.*>(\S+)<\/rt>/, '$2<rt>$1</rt>');
        // rb will be underlined when rb is furigana
        this.classList.toggle(HTMLClass.Underline);
    });
});
$('#to-top').on('click', function () { return window.scrollTo(0, 0); });
$('#menu').on('click', function () { return document.body.classList.toggle(HTMLClass.TocOn); });
