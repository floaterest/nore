<script lang="ts">
    // @ts-ignore
    import { browser } from '$app/env';
    import Layout from '$lib/Layout.svelte';

    import Textfield from '@smui/textfield';
    import IconButton, { Icon } from '@smui/icon-button';
    import SegmentedButton, { Segment } from '@smui/segmented-button';

    // raw (and fresh) html string from storage
    let raw = browser ? localStorage.getItem('raw') : '';
    let files;
    let visible = true;
    let normal = true;
    let selected = 'raw';

    // when user chooses a file
    $: if(files && files[0]){
        const reader = new FileReader();
        reader.onload = function(){
            raw = this.result as string;
            files = [];
        };
        reader.readAsText(files[0], 'utf8');
    }
    // on client-end
    $: if(browser){
        localStorage.setItem('raw', raw);
    }
    // when user click on flip button
    $: html = normal ? raw : raw.split('<ruby>')
        .map(l => l.replace(/(\S+)(<rt.*>)(\S+)(?=<\/rt>)/, '$3$2$1'))
        .join('<ruby>');
</script>

<Layout>
    <IconButton title="Toggle rt" toggle bind:pressed={visible}>
        <Icon class="material-icons" on>visibility</Icon>
        <Icon class="material-icons">visibility_off</Icon>
    </IconButton>
    <IconButton title="Switch rt rb" toggle bind:pressed={normal}>
        <div class="loop material-icons" class:normal>loop</div>
    </IconButton>
</Layout>

<main>
    <!-- hide 'raw' when portrait and 'html' is selected -->
    <section style={selected==='raw'?'':'display: none'}>
        <label for="file" class="mdc-button mdc-button--outlined">
            <span class="mdc-button__ripple"></span>
            <span class="mdc-button__label">upload html</span>
        </label>
        <input id="file" type="file" accept="text/html" bind:files>
        <Textfield textarea label="html" variant="outlined" spellcheck="false" bind:value={raw}/>
    </section>
    <!-- add class if 'raw' is selected, so that 'html' will hide if portrait -->
    <section id="html" class={selected==='raw'?'html':''}>
        {@html html}
        <!-- hide rt -->
        {#if !visible}
            <style>
                rt{ display: none }
            </style>
        {/if}
        <!-- underline ruby -->
        {#if !normal}
            <style>
                ruby{ box-shadow: inset 0 -1px; }
            </style>
        {/if}
    </section>
</main>

<SegmentedButton segments={['raw','html']} let:segment singleSelect bind:selected>
    <Segment {segment}>{segment}</Segment>
</SegmentedButton>

<style lang="scss">
    @use 'ruby';

    .loop{
        // rotation transition
        $rotate: all 0.5s ease-in-out;
        transition: $rotate;

        &.normal{
            transition: $rotate;
            transform: rotate(180deg);
        }
    }
</style>
