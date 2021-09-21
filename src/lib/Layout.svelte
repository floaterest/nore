<script lang="ts">
    //@ts-ignore
    import { page } from '$app/stores';

    import TopAppBar, { Section, Row, Title } from '@smui/top-app-bar';
    import IconButton from '@smui/icon-button';
    import TabBar from '@smui/tab-bar';
    import Tab, { Label } from '@smui/tab';

    const tabs = [
        'ruby',
    ];

    // current path
    let active;
    // substr(1) to remove `/`
    page.subscribe(p => active = p.path.substr(1));
</script>

<TopAppBar variant="static">
    <Row>
        <Section>
            <IconButton href="/" class="material-icons">home</IconButton>
            <Title style="text-transform: capitalize">{tabs.includes(active) ? active : 'nore'}</Title>
        </Section>
        <Section align="end">
            <slot/>
        </Section>
    </Row>
</TopAppBar>

<TabBar {tabs} let:tab bind:active>
    <Tab {tab} href="/{tab}">
        <Label>{tab}</Label>
    </Tab>
</TabBar>

<style lang="scss" global>
    @import "@material/typography/typography";

    main{
        @include typography(body1);
    }
</style>
