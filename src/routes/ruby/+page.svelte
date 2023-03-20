<script lang="ts">
    import Textfield from '@smui/textfield';
    import type { PageData } from './$types';

    export let data: PageData;
    
    const { fetch } = data;

    const label = 'text/plain';
    let [value, output] = ['', ''];
    let timeout: NodeJS.Timeout;

    async function request(){
        output = (await Promise.all(value.split('\n').map(
            async body => await (await fetch('/ruby', {
                method: 'POST', body,
            })).text(),
        ))).join('\n');
    }

    function keyup(){
        clearTimeout(timeout);
        timeout = setTimeout(request, 500);
    }
</script>

<section>
    <Textfield on:keyup={keyup} bind:value {label}
        style="width: 100%; height: 100px"
        textarea variant="outlined" spellcheck="false" />
</section>
<section class="html mdc-elevation--z24">{@html output}</section>

<style lang="sass">
section
    flex: 1
    margin: 0.5em
.html
    white-space: pre
    padding: 1em
</style>
