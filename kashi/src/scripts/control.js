"use strict";
var Controls = {
    '#switch': {
        icons: ['▲', '▼'],
        action: function () {
            if (!kashi)
                return;
            kashi.switch();
            this.innerText = Controls['#switch'].icons[+kashi.isSwitched];
        },
    },
    '#edit': {
        icons: ['X', 'I'],
        action: function () {
            var editable = $content.attr('contenteditable') !== 'true';
            // remove click event when editing
            if (editable) {
                $content.find('ruby').off('click');
            }
            else {
                update();
            }
            $content.attr('contenteditable', editable.toString());
            this.innerText = Controls['#edit'].icons[+editable];
        },
    },
    '#toggle': {
        icons: ['O', 'Ø'],
        action: function () {
            if (!kashi)
                return;
            kashi.toggle();
            this.innerText = Controls['#toggle'].icons[+kashi.isToggled];
        },
    },
    '#hamburger': {
        icons: ['Ξ'],
        action: function () { return document.body.classList.toggle(HTMLClass.HideContent); },
    },
};
for (var _i = 0, _a = Object.entries(Controls); _i < _a.length; _i++) {
    var _b = _a[_i], selector = _b[0], data = _b[1];
    $(selector).text(data.icons[0]).on('click', data.action);
}
//# sourceMappingURL=control.js.map