<script lang="ts">
    //@ts-ignore
    import { browser } from '$app/env';
    import Layout from '$lib/Layout.svelte';
    import File from '$lib/File.svelte';
    import LeftRight from '$lib/LeftRight.svelte';

    import { tohtml, split } from '$lib/kuro';

    import Textfield from '@smui/textfield';
    import IconButton from '@smui/icon-button';

    let input = browser ? localStorage.getItem('kuro') : '';
    const segments = [ 'input', 'output' ];

    // on client-end
    $: if(browser){
        localStorage.setItem('kuro', input);
    }
    // async/await madness
    $: promise = (async() => {
        if(browser && input){
            return (await Promise.all(
                // for each line
                split(input).map(async line => (
                    // for each jpn/non-jpn chunk
                    await Promise.all(line.map(async([ s, isJPN ]) => {
                        if(isJPN){
                            // ruby
                            const res = await fetch('kuromoji/' + s);
                            return tohtml(await res.json());
                        }else{
                            // raw text
                            return s;
                        }
                    }))
                ).join('')),
            )).join('<br>\n');
        }
    })();
</script>

<Layout>
    <IconButton title="Redirect to Ruby" href="/ruby">
        <span class="material-icons">code</span>
    </IconButton>
</Layout>

<main>
    <LeftRight {segments}>
        <section slot="left">
            <File label="upload text" bind:content={input}/>
            <Textfield textarea label="text/plain" variant="outlined" spellcheck="false" bind:value={input}/>
        </section>
        <section id="html" slot="right">
            {#await promise}
                ...
            {:then output}
                {@html output || ''}
            {/await}
        </section>
    </LeftRight>
</main>

