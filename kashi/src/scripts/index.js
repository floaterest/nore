"use strict";
/*
* Regex for Japanese
* Kanji: [\u3005\u4e00-\u9faf]
* Hiragana: [\u3040-\u309f]
* */
var SWITCH = ['▲', '▼'];
var TOGGLE = ['0', '-'];
var HAMBURGER = 'Ξ';
var INDEX = 'src/lyrics.json';
var DIRECTORY = 'src/lyrics/';
var $content = $('#content');
var $toc = $('#toc');
var selected = '';
var kashi;
$.getJSON(INDEX).done(function (data) {
    for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
        var line = data_1[_i];
        $toc.prepend(item(line, DIRECTORY + line + '.html'));
    }
    // check of url has hash
    if (window.location.hash) {
        // remove '#' then decode to utf8
        var hash = decodeURIComponent(window.location.hash.slice(1));
        if (data.includes(hash)) {
            $toc.find("p:contains(\"" + hash + "\")").trigger('click');
        }
        else {
            console.error(hash, 'not found');
        }
    }
    else {
        var params = new URLSearchParams(window.location.search);
        var content = void 0;
        if (params && (content = params.get('s'))) {
            // check if has query
            kashi = new Kashi(update(content));
            document.body.classList.remove(HTMLClass.HideContent);
        }
    }
});
$('#switch').text(SWITCH[0]).on('click', function () {
    if (!kashi)
        return;
    kashi.switch();
    this.innerText = SWITCH[+kashi.isSwitched];
});
$('#toggle').text(TOGGLE[0]).on('click', function () {
    if (!kashi)
        return;
    kashi.toggle();
    this.innerText = TOGGLE[+kashi.isToggled];
});
$('#hamburger').text(HAMBURGER).on('click', function () { return document.body.classList.toggle(HTMLClass.HideContent); });
//# sourceMappingURL=index.js.map