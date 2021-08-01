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

    $ruby: JQuery;
    $rt: JQuery;

    constructor(content: JQuery){
        this.$ruby = content.find('ruby');
        this.$rt = this.$ruby.find('rt');
    }

    /**
     * switch rt and rb
     */
    switch(){
        this.isSwitched = !this.isSwitched;
        this.$ruby.each(function(){
            this.innerHTML = this.innerHTML.replace(/(\S+)(<rt.*>)(\S+)/, '$3$2$1');
        });

        toggleClass(this.isSwitched, this.$ruby, HTMLClass.Underline);
    }

    toggle(){
        this.isToggled = !this.isToggled;
        toggleClass(this.isToggled, this.$rt, HTMLClass.Hidden);
    }
}
