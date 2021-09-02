const Controls = {
    '#switch': {
        icon: [ '▲', '▼' ],
        action: function(this: HTMLElement){
            if(!kashi) return;

            kashi.switch();
            this.innerText = Controls['#switch'].icon[+kashi.isSwitched];
        },
    },
    '#edit': {
        icon: [ 'X', 'I' ],
        action: function(this: HTMLElement){
            let editable = $content.attr('contenteditable') !== 'true';

            // remove click event when editing
            if(editable){
                $content.find('ruby').off('click');
            }else{
                update();
            }

            $content.attr('contenteditable', editable.toString());
            this.innerText = Controls['#edit'].icon[+editable];
        },
    },
    '#toggle': {
        icon: [ 'O', 'Ø' ],
        action: function(this: HTMLElement){
            if(!kashi) return;

            kashi.toggle();
            this.innerText = Controls['#toggle'].icon[+kashi.isToggled];
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
