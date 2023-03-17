<script lang="ts">
    import TopAppBar, { AutoAdjust, Row, Section, Title } from '@smui/top-app-bar';
    import IconButton from '@smui/icon-button';

    import type { LayoutData } from './$types';

    import './styles.scss';

    let topAppBar;
    export let data: LayoutData;
    console.log(data);
</script>

<TopAppBar bind:this={topAppBar} variant="short">
    <Row>
        <Section>
          <IconButton class="material-icons">menu</IconButton>
          <Title>Short</Title>
        </Section>
        <Section align="end" toolbar>
          <IconButton class="material-icons" aria-label="Download"
            >file_download</IconButton
          >
        </Section>
    </Row>
</TopAppBar>
<AutoAdjust {topAppBar}>
    <slot />
</AutoAdjust>

<style lang="sass">
</style>
