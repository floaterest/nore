<script lang="ts">
    //@ts-ignore
    import { browser } from '$app/env';
    import Layout from '../../lib/Layout.svelte';
    import File from '../../lib/File.svelte';

    import { tohtml, split } from '../../lib/kuro';

    import Textfield from '@smui/textfield';
    import IconButton from '@smui/icon-button';
    import SegmentedButton, { Segment } from '@smui/segmented-button';

    let input = browser ? localStorage.getItem('kuro') : '';
    // on client-end
    $: if(browser){
        localStorage.setItem('kuro', input);
    }
    // async/await madness
    $: output = (async() => {
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
    <section>
        <File label="upload text" bind:content={input}/>
        <Textfield textarea label="text/plain" variant="outlined" spellcheck="false" bind:value={input}/>
    </section>
    <section>
        {#await output}
            wait
        {:then html}
            {@html html || ''}
        {/await}
    </section>
</main>
