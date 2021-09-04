const Controls = {
    '#switch': {
        icons: [ '▲', '▼' ],
        action: function(this: HTMLElement){
            if(!kashi) return;

            kashi.switch();
            this.innerText = Controls['#switch'].icons[+kashi.isSwitched];
        },
    },
    '#edit': {
        icons: [ 'X', 'I' ],
        action: function(this: HTMLElement){
            let editable = $content.attr('contenteditable') !== 'true';

            // remove click event when editing
            if(editable){
                $content.find('ruby').off('click');
            }else{
                update();
            }

            $content.attr('contenteditable', editable.toString());
            this.innerText = Controls['#edit'].icons[+editable];
        },
    },
    '#toggle': {
        icons: [ 'O', 'Ø' ],
        action: function(this: HTMLElement){
            if(!kashi) return;

            kashi.toggle();
            this.innerText = Controls['#toggle'].icons[+kashi.isToggled];
        },
    },
    '#hamburger': {
        icons: [ 'Ξ' ], // TIL Ξ is called 'xi'
        action: () => document.body.classList.toggle(HTMLClass.HideContent),
    },
};

for(const [ selector, data ] of Object.entries(Controls)){
    $(selector).text(data.icons[0]).on('click', data.action);
}
