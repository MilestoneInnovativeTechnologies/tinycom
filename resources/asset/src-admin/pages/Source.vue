<template>
  <q-page padding>
    <SourceDetailCard :id="id" />
    <SourceExtendCard :id="id" class="q-mt-sm" />
    <SourceShareCard :id="id" class="q-mt-sm" />
    <BackButton right class="q-mt-sm" v-if="hasBack" :to="backRoute" />
  </q-page>
</template>

<script>
    import SourceDetailCard from "components/SourceDetailCard";
    import SourceExtendCard from "components/SourceExtendCard";
    import SourceShareCard from "components/SourceShareCard";
    import {backRoute} from "src/mixins/back";
    export default {
      name: "PageSource",
      components: {SourceShareCard, SourceExtendCard, SourceDetailCard},
      props: ['id'],
      mixins: [backRoute],
      computed: {
        source(){ return this.$store.getters["SOURCES/source"](this.id) },
      }
    }
</script>
