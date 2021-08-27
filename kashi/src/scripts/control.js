"use strict";
var Controls = {
    '#switch': {
        icon: ['▲', '▼'],
        action: function (e) {
            if (!kashi)
                return;
            kashi.switch();
            e.target.innerText = Controls['#switch'].icon[+kashi.isSwitched];
        },
    },
    '#edit': {
        icon: ['X', 'I'],
        action: function (e) {
            var editable = $content.attr('contenteditable') !== 'true';
            $content.attr('contenteditable', editable.toString());
            e.target.innerText = Controls['#edit'].icon[+editable];
        },
    },
    '#toggle': {
        icon: ['O', 'Ø'],
        action: function (e) {
            if (!kashi)
                return;
            kashi.toggle();
            e.target.innerText = Controls['#toggle'].icon[+kashi.isToggled];
        },
    },
    '#hamburger': {
        icon: ['Ξ'],
        action: function () { return document.body.classList.toggle(HTMLClass.HideContent); },
    },
};
for (var _i = 0, _a = Object.entries(Controls); _i < _a.length; _i++) {
    var _b = _a[_i], selector = _b[0], data = _b[1];
    $(selector).text(data.icon[0]).on('click', data.action);
}
//# sourceMappingURL=control.js.map