<script lang="ts">
    //@ts-ignore
    import { page } from '$app/stores';
    // @ts-ignore
    import { browser } from '$app/env';

    import TabBar from '@smui/tab-bar';
    import Tab, { Label } from '@smui/tab';
    import IconButton from '@smui/icon-button';
    import TopAppBar, { Section, Row, Title, AutoAdjust } from '@smui/top-app-bar';

    const tabs = [
        'ruby',
        'kuromoji',
    ];

    // current path
    let active: string;
    // substr(1) to remove `/`
    page.subscribe(p => active = p.path.substr(1));
    // default title is nore
    active = active || 'nore';

    let topAppBar;

    const totop = () => browser && window.scrollTo({ top: 0, behavior: 'smooth' });
</script>

<svelte:head>
    <!-- Capitalize -->
    <title>{active[0].toUpperCase()}{active.substr(1)}</title>
</svelte:head>

<TopAppBar style="user-select: none;" variant="fixed" bind:this={topAppBar}>
    <Row>
        <Section>
            <IconButton title="Home" href="/" class="material-icons">home</IconButton>
            <Title title="Back to top" on:click={totop}>{active}</Title>
        </Section>
        <Section align="end">
            <!-- page-specific buttons -->
            <slot/>
        </Section>
    </Row>
</TopAppBar>

<AutoAdjust {topAppBar}>
    <TabBar {tabs} let:tab bind:active>
        <Tab {tab} href="/{tab}">
            <Label>{tab}</Label>
        </Tab>
    </TabBar>
</AutoAdjust>

<style>
    :global(.mdc-top-app-bar__title){
        cursor: pointer;
        text-transform: capitalize;
    }
</style>
