"use strict";
var INDEX = 'src/lyrics.json';
var DIRECTORY = 'src/lyrics/';
var Queries = {
    'paste': function (_) {
        document.body.classList.remove(HTMLClass.HideContent);
        // enable edit
        $('#edit').trigger('click');
        $content.on('paste', function (e) {
            // stop data being actually pasted
            // edit, kashi, event
            // no edit, event
            e.stopPropagation();
            e.preventDefault();
            // disable edit
            $('#edit').trigger('click');
            // tsc please
            //@ts-ignore
            kashi = new Kashi(e.originalEvent.clipboardData.getData('text'));
        });
    },
};
var $content = $('#content');
var $menu = $('#menu');
var selected = '';
var kashi;
$('#file').on('change', function () {
    if (!this.files)
        return;
    var filename = this.files[0];
    var reader = new FileReader();
    reader.onload = function () {
        kashi = new Kashi(this.result);
    };
    reader.readAsText(filename, 'utf8');
});
$.getJSON(INDEX).done(function (data) {
    for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
        var line = data_1[_i];
        $menu.prepend(item(line, DIRECTORY + line + '.html'));
    }
});
window.onload = function () {
    // check search params
    var params = new URLSearchParams(window.location.search);
    if (params) {
        var value = void 0;
        for (var _i = 0, _a = Object.entries(Queries); _i < _a.length; _i++) {
            var _b = _a[_i], key = _b[0], func = _b[1];
            // check of has key and value is not false
            if (params.has(key) && (value = params.get(key)) && JSON.parse(value)) {
                func(value);
            }
        }
    }
};
//# sourceMappingURL=index.js.map