"use strict";
var SWITCH = ['▲', '▼'];
var TOGGLE = ['0', '-'];
var HAMBURGER = 'Ξ';
var $content = $('#content');
var $toc = $('#toc');
var directory = 'src/lyrics/';
var selected = '';
var kashi;
$.getJSON('src/lyrics.json').done(function (data) {
    for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
        var line = data_1[_i];
        $toc.prepend(item(line, directory + line + '.html'));
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