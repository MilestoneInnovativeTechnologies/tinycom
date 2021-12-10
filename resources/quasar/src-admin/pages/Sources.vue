<template>
  <q-page padding>
    <Sources source="sources" />
    <q-btn label="CREATE NEW SOURCE" class="absolute-bottom full-width q-py-sm" color="primary" :to="{ name:'source_create' }" />
  </q-page>
</template>

<script>
import Sources from "components/Sources";
export default {
  name: "PageSources",
  components: {Sources},
}
</script>
