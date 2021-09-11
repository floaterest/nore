<script lang="ts">
    import Textfield from '@smui/textfield';
    import Layout from '$lib/Layout.svelte';

    // @ts-ignore
    import { browser } from '$app/env';

    let kuromoji = { raw: '' };
    let storage;
    if(browser && (storage = localStorage.getItem('kuromoji'))){
        kuromoji = JSON.parse(storage);
    }

    $: if(browser){
        localStorage.setItem('kuromoji', JSON.stringify(kuromoji));
    }
</script>

<Layout title="Kuromoji">

</Layout>


<section class="mdc-typography--body1">
    <Textfield variant="outlined" bind:value={kuromoji.raw} label="raw"/>
    <p>
        {@html kuromoji.raw}
    </p>
</section>

<style>
    section{
        margin-top: 1rem;
    }
</style>
