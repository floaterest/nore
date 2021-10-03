<script lang="ts">
    //@ts-ignore
    import { page } from '$app/stores';

    import TabBar from '@smui/tab-bar';
    import Tab, { Label } from '@smui/tab';
    import IconButton from '@smui/icon-button';
    import TopAppBar, { Section, Row, Title, AutoAdjust } from '@smui/top-app-bar';

    const tabs = [
        'ruby',
    ];

    // current path
    let active;
    // substr(1) to remove `/`
    page.subscribe(p => active = p.path.substr(1));

    let topAppBar;
</script>

<TopAppBar variant="fixed" bind:this={topAppBar}>
    <Row>
        <Section>
            <IconButton href="/" class="material-icons">home</IconButton>
            <Title style="text-transform: capitalize">{tabs.includes(active) ? active : 'nore'}</Title>
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
