<script lang="ts">
    import Layout from '$lib/Layout.svelte';

    import Textfield from '@smui/textfield';
    import IconButton, { Icon } from '@smui/icon-button';
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

    let visible = true;
</script>

<Layout title="Kuromoji">
    <IconButton toggle bind:pressed={visible}>
        <Icon class="material-icons" on>visibility</Icon>
        <Icon class="material-icons">visibility_off</Icon>
    </IconButton>
</Layout>


<section class="mdc-typography--body1">
    <Textfield variant="outlined" bind:value={kuromoji.raw} label="raw"/>
    <p>
        {#if !visible}
            <style>
                rt{
                    display: none;
                }
            </style>
        {/if}
        {@html kuromoji.raw}
    </p>
</section>

<style>
    section{
        margin-top: 1rem;
    }
</style>
