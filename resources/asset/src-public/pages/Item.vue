<template>
  <q-page padding>
    <div style="max-width: 65vh;" class="q-mx-auto q-mb-sm">
      <q-btn padding="sm md" size="sm" dense color="warning" :to="{ name:'home' }"><q-icon name="reply_all" left />Browse all</q-btn>
    </div>
    <ItemView :id="id" style="max-width: 65vh;" class="q-mx-auto" />
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
