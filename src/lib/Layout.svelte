<script lang="ts">
    import TopAppBar, { AutoAdjust, Row, Section, Title } from '@smui/top-app-bar';
    import IconButton from '@smui/icon-button';

    import '../styles.scss';

    export let title = 'Nore';

    let topAppBar;
    // +layout.svelte doesn't support named slots
</script>

<TopAppBar bind:this={topAppBar} variant="short">
    <Row>
        <Section>
          <IconButton class="material-icons">menu</IconButton>
          <Title>{title}</Title>
        </Section>
        <Section align="end" toolbar>
            <slot name="top"/>
        </Section>
    </Row>
</TopAppBar>
<AutoAdjust {topAppBar}>
    <slot/>
</AutoAdjust>

<style lang="sass">
</style>
