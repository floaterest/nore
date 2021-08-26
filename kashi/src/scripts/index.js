"use strict";
var SWITCH = ['▲', '▼'];
var TOGGLE = ['O', 'Ø'];
var EDIT = ['X', 'I'];
var HAMBURGER = 'Ξ';
var INDEX = 'src/lyrics.json';
var DIRECTORY = 'src/lyrics/';
var QUERIES = {
    'paste': paste,
};
var $content = $('#content');
var $toc = $('#toc');
var selected = '';
var kashi;
$('#file').on('change', function (e) {
    if (!e.target.files)
        return;
    var filename = e.target.files[0];
    var reader = new FileReader();
    reader.onload = function (e) {
        kashi = new Kashi(update(e.target.result));
    };
    reader.readAsText(filename, 'utf8');
});
function paste(yes) {
    if (!yes || yes == 'false' || yes == '0')
        return false;
    document.body.classList.toggle(HTMLClass.HideContent);
    $content.attr('contenteditable', 'true');
    $content.on('focusout', function (e) {
        kashi = new Kashi(update(e.target.innerText));
    });
    return true;
}
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
        // check search params
        var params = new URLSearchParams(window.location.search);
        if (params) {
            // only parse the first valid entry
            for (var _a = 0, _b = Object.entries(QUERIES); _a < _b.length; _a++) {
                var _c = _b[_a], key = _c[0], func = _c[1];
                if (params.has(key) && func(params.get(key)))
                    break;
            }
        }
    }
});
$('#switch').text(SWITCH[0]).on('click', function () {
    if (!kashi)
        return;
    kashi.switch();
    this.innerText = SWITCH[+kashi.isSwitched];
});
$('#edit').text(EDIT[0]).on('click', function () {
    var editable = !$content.attr('contenteditable');
    $content.attr('contenteditable', editable.toString());
    this.innerText = EDIT[+editable];
});
$('#toggle').text(TOGGLE[0]).on('click', function () {
    if (!kashi)
        return;
    kashi.toggle();
    this.innerText = TOGGLE[+kashi.isToggled];
});
$('#hamburger').text(HAMBURGER).on('click', function () { return document.body.classList.toggle(HTMLClass.HideContent); });
//# sourceMappingURL=index.js.map