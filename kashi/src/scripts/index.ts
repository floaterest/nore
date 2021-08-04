const SWITCH = [ '⇈', '⇊' ];
const TOGGLE = [ '0', '-' ];
const HAMBURGER = 'Ξ';

let c = $('#content');
let t = $('#toc');
let d = 'src/lyrics/';
let selected = '';
let kashi: Kashi;

function update(content: string): JQuery{
    c.html(content).find('ruby').on('click', function(){
        if(isSelecting()) return;
        $(this).each(function(){
            this.classList.toggle(HTMLClass.Hidden);
        });
    });
    return c;
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
            // download file, set session storage, assign to content
            await $.get(path, f => sessionStorage.setItem(path, content = f));
        }
        kashi = new Kashi(update(content!));

        selected = this.innerText;
        document.body.classList.remove(HTMLClass.HideContent);
        window.scrollTo(0, 0);

    }).text(text);
}

$.getJSON('src/lyrics.json').done((data: string[]) => {
    for(const line of data){
        t.prepend(item(line, d + line + '.html'));
    }
});

$('#switch').text(SWITCH[0]).on('click', function(){
    if(!kashi) return;

    kashi.switch();
    this.innerText = SWITCH[+kashi.isSwitched];
});

$('#toggle').text(TOGGLE[0]).on('click', function(){
    if(!kashi) return;

    kashi.toggle();
    this.innerText = TOGGLE[+kashi.isToggled];
});

$('#hamburger').text(HAMBURGER).on('click',()=>document.body.classList.toggle(HTMLClass.HideContent));
