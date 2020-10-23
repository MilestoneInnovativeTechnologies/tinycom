<template>
  <q-page padding>
    <q-btn padding="sm md" size="sm" dense class="q-mb-sm" color="warning" :to="{ name:'home' }"><q-icon name="reply_all" left />Browse all</q-btn>
    <ItemView :id="id" />
  </q-page>
</template>

<script>
import ItemView from "../components/ItemView";
export default {
  name: 'PageItem',
  components: {ItemView},
  props: ['id'],
}
</script>
