<script lang="ts">
    import TopAppBar, { Section, Row, Title } from '@smui/top-app-bar';
    import IconButton from '@smui/icon-button';
    import TabBar from '@smui/tab-bar';
    import Tab, { Label } from '@smui/tab';

    export let title: string;

    const tabs = [
        'ruby',
    ];
</script>

<TopAppBar variant="static">
    <Row>
        <Section>
            <IconButton class="material-icons">home</IconButton>
            <Title>{title}</Title>
        </Section>
        <Section align="end">
            <slot/>
        </Section>
    </Row>
</TopAppBar>
<TabBar {tabs} let:tab>
    <Tab {tab} href="/{tab}">
        <Label>{tab}</Label>
    </Tab>
</TabBar>
