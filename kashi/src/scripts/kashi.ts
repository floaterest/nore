enum HTMLClass{
    Hidden = 'hidden',
    Underline = 'underline',
    HideContent = 'hide-content',
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

function update(content: string): JQuery{
    $content.html(content).find('ruby').on('click', function(){
        if(isSelecting()) return;
        $(this).each(function(){
            this.classList.toggle(HTMLClass.Hidden);
        });
    });
    return $content;
}

/**
 * generate a new item for the table of contents
 * @param text innerText for this element
 * @param path file to download when clicked
 */
function item(text: string, path: string): JQuery{
    return $('<p>').on('click', async function(){
        // if clicked on selected, refresh the content
        let refresh = this.innerText == selected;
        let content = sessionStorage.getItem(path);
        if(refresh || content == null){
            console.debug(refresh ? 'refreshed' : 'downloaded', text, 'from sessionStorage!');
            // download file, set session storage, assign to content
            await $.get(path, f => sessionStorage.setItem(path, content = f));
        }else{
            console.debug('got', text, 'from sessionStorage!');
        }
        kashi = new Kashi(content!);

        selected = this.innerText;
        window.scrollTo(0, 0);

    }).text(text);
}


class Kashi{
    isSwitched = false;
    isToggled = false;

    $ruby: JQuery;

    constructor(content: string){
        this.$ruby = update(content).find('ruby');
        document.body.classList.remove(HTMLClass.HideContent);
    }

    /**
     * switch rt and rb
     */
    switch(){
        this.isSwitched = !this.isSwitched;
        this.$ruby.each(function(){
            this.innerHTML = this.innerHTML.replace(/(\S+)(<rt.*>)(\S+)<\/rt>/, '$3$2$1</rt>');
        });

        toggleClass(this.isSwitched, this.$ruby, HTMLClass.Underline);
    }

    toggle(){
        this.isToggled = !this.isToggled;
        toggleClass(this.isToggled, this.$ruby, HTMLClass.Hidden);
    }
}
