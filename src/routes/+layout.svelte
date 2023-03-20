<script lang="ts">
    import TopAppBar, { AutoAdjust, Row, Section, Title } from '@smui/top-app-bar';
    import IconButton from '@smui/icon-button';

    import './styles.scss';

    let topAppBar;
</script>

<TopAppBar bind:this={topAppBar} variant="short">
    <Row>
        <Section>
          <IconButton class="material-icons">menu</IconButton>
          <Title>{document.title || 'Nore'}</Title>
        </Section>
        <Section align="end" toolbar>
          <IconButton class="material-icons" aria-label="Download"
            >file_download</IconButton
          >
        </Section>
    </Row>
</TopAppBar>
<AutoAdjust {topAppBar}>
    <slot/>
</AutoAdjust>

<style lang="sass">
</style>
