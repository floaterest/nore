<script lang="ts">
    // @ts-ignore
    import { browser } from '$app/env';

    import SegmentedButton, { Segment } from '@smui/segmented-button';

    export let segments: string[];
    let selected = segments[0];

    let wait = false;
    let landscape = browser && window.matchMedia('(orientation: landscape)').matches;

    function onresize(){
        if(wait) return;
        wait = true;
        setTimeout(() => {
            landscape = window.matchMedia('(orientation: landscape)').matches;
            wait = false;
        }, 500);
    }
</script>

<svelte:window on:resize={onresize}/>

{#if selected === segments[0]}
    <slot name="left"/>
{/if}

{#if landscape || selected === segments[1]}
    <slot name="right"/>
{/if}

{#if !landscape}
    <SegmentedButton {segments} let:segment singleSelect bind:selected>
        <Segment {segment}>{segment}</Segment>
    </SegmentedButton>
{/if}

<style lang="scss" global>
    // show segmented button
</style>
