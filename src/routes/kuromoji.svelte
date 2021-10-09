<script lang="ts">
    //@ts-ignore
    import { browser } from '$app/env';
    import Layout from '$lib/Layout.svelte';
    import File from '$lib/File.svelte';

    import Textfield from '@smui/textfield';
    import IconButton, { Icon } from '@smui/icon-button';
    import SegmentedButton, { Segment } from '@smui/segmented-button';

    // raw (and fresh) html string from storage
    let raw = browser ? 'help' : '';
</script>

<Layout>
    <IconButton title="Redirect to Ruby" href="/ruby">
        <span class="material-icons">code</span>
    </IconButton>
</Layout>

<main>
    <section>
        <File label="upload text" bind:content={raw}/>
        <Textfield textarea label="text/plain" variant="outlined" spellcheck="false" bind:value={raw}/>
    </section>
    <section></section>
</main>
