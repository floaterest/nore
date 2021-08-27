const Controls = {
    '#switch': {
        icon: [ '▲', '▼' ],
        action: function(e: JQuery.ClickEvent){
            if(!kashi) return;

            kashi.switch();
            e.target.innerText = Controls['#switch'].icon[+kashi.isSwitched];
        },
    },
    '#edit': {
        icon: [ 'X', 'I' ],
        action: function(e: JQuery.ClickEvent){
            let editable = $content.attr('contenteditable') !== 'true';
            $content.attr('contenteditable', editable.toString());
            e.target.innerText = Controls['#edit'].icon[+editable];
        },
    },
    '#toggle': {
        icon: [ 'O', 'Ø' ],
        action: function(e: JQuery.ClickEvent){
            if(!kashi) return;

            kashi.toggle();
            e.target.innerText = Controls['#toggle'].icon[+kashi.isToggled];
        },
    },
    '#hamburger': {
        icon: [ 'Ξ' ], // TIL Ξ is called 'xi'
        action: () => document.body.classList.toggle(HTMLClass.HideContent),
    },
};

for(const [ selector, data ] of Object.entries(Controls)){
    $(selector).text(data.icon[0]).on('click', data.action);
}
