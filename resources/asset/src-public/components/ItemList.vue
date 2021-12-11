<template>
  <div v-if="items">
    <div class="text-h6 text-primary q-my-sm" v-if="title">{{ title }} <q-btn v-if="more" :to="{ name:more }" label="View More" flat size="sm" style="text-decoration: underline" /></div>
    <div class="row q-col-gutter-xs">
      <div class="col-12 col-sm-6 col-md-4 col-lg-3" v-for="item_id in items.slice(0,limit || 5)" :key="'item-list-item' + item_id">
        <item :id="item_id"/>
      </div>
    </div>
  </div>
</template>

<script>
import Item from "./../components/Item";

export default {
  name: "ItemList",
  components: {Item},
  props: ['items', 'title', 'limit','more'],
}
</script>
