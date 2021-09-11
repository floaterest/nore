<script lang="ts">
    import Drawer, { Content } from '@smui/drawer';
    import List, { Item } from '@smui/list';
    import TopAppBar, { Section, Row, Title } from '@smui/top-app-bar';
    import IconButton from '@smui/icon-button';

    export let title:string;

    let open = false;
</script>

<TopAppBar variant="static">
    <Row>
        <Section>
            <IconButton class="material-icons" on:click={()=>open=!open}>menu</IconButton>
            <Title>{title}</Title>
        </Section>
        <Section align="end" toolbal>
            <slot/>
        </Section>
    </Row>
</TopAppBar>
<Drawer variant="modal" bind:open>
    <Content>
        <List>
            <Item href="/kuromoji">Kuromoji</Item>
        </List>
    </Content>
</Drawer>
