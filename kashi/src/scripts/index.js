"use strict";
var INDEX = 'src/lyrics.json';
var DIRECTORY = 'src/lyrics/';
var Queries = {
    'paste': function (value) {
        if (!value || value == 'false' || value == '0')
            return false;
        document.body.classList.remove(HTMLClass.HideContent);
        // enable edit
        $('#edit').trigger('click');
        $content.on('paste', function (e) {
            // stop data actually being pasted
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
        return true;
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
    // check of url has hash
    if (window.location.hash) {
        // remove '#' then decode to utf8
        var hash = decodeURIComponent(window.location.hash.slice(1));
        if (data.includes(hash)) {
            $menu.find("p:contains(\"" + hash + "\")").trigger('click');
        }
        else {
            console.error(hash, 'not found');
        }
    }
    else {
        // check search params
        var params = new URLSearchParams(window.location.search);
        if (params) {
            for (var _a = 0, _b = Object.entries(Queries); _a < _b.length; _a++) {
                var _c = _b[_a], key = _c[0], func = _c[1];
                params.has(key) && func(params.get(key));
            }
        }
    }
});
//# sourceMappingURL=index.js.map