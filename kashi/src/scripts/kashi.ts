enum HTMLClass{
    Hidden = 'hidden',
    Underline = 'underline',
    HideContent = 'toc-on',
}

function toggleClass(condition: boolean, $el: JQuery, className: HTMLClass){
    if(condition){
        $el.addClass(className);
    }else{
        $el.removeClass(className);
    }
}

function isSelecting(){
    return document.getSelection()!.type != 'Caret';
}

class Kashi{
    isSwitched = false;
    isToggled = false;

    rubySelector: string;
    $switch: JQuery;
    $toggle: JQuery;

    constructor(elements: { rubySelector: string, switch: JQuery, toggle: JQuery }){
        this.rubySelector = elements.rubySelector;
        this.$switch = elements.switch.text(this.getSwitchText());
        this.$toggle = elements.toggle.text(this.getToggleText());
    }

    getRuby(): JQuery{
        return $(this.rubySelector);
    }

    getSwitchText(): string{
        return SWITCH[+this.isSwitched];
    }

    getToggleText(): string{
        return TOGGLE[+this.isToggled];
    }

    /**
     * switch rt and rb
     */
    switch(){
        this.isSwitched = !this.isSwitched;
        let $ruby = this.getRuby();
        $ruby.each(function(){
            this.innerHTML = this.innerHTML.replace(/(\S+)(<rt.*>)(\S+)/, '$3$2$1');
        });

        this.$switch.text(this.getSwitchText());
        toggleClass(this.isSwitched, $ruby, HTMLClass.Underline);
    }

    toggle(){
        this.isToggled = !this.isToggled;
        let $ruby = this.getRuby();
        toggleClass(this.isToggled, $ruby, HTMLClass.Hidden);
    }
}
