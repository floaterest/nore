<script lang="ts">
    import Layout from '../lib/Layout.svelte';

    import Textfield from '@smui/textfield';
    import IconButton, { Icon } from '@smui/icon-button';
    // @ts-ignore
    import { browser } from '$app/env';


    let html = browser ? localStorage.getItem('kuromoji') : '';

    $: if(browser){
        localStorage.setItem('kuromoji', html);
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
    <Textfield variant="outlined" bind:value={html} label="raw"/>
    <p>
        {@html html}
        {#if !visible}
            <style>
                rt{
                    display: none;
                }
            </style>
        {/if}
    </p>
</section>

<style>
    section{
        margin-top: 1rem;
    }
</style>
