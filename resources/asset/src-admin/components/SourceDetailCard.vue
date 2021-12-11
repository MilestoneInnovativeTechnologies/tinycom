<template>
  <q-card>
    <img v-if="image" :src="image">
    <q-card-section>
      <div class="text-h6">{{ source.title }}</div>
      <div class="text-caption">{{ source.desc }}</div>
    </q-card-section>
    <q-list dense separator>
      <q-item-label header>Items</q-item-label>
      <q-item v-for="item in source.items" :key="['source','item',item.item].join('-')">
        <q-item-section>{{ item.name }}</q-item-section>
        <q-item-section side>{{ item.price }}</q-item-section>
      </q-item>
    </q-list>
    <q-list dense separator>
      <q-item-label header>Other Details</q-item-label>
      <q-item v-for="(key,disp) in layout" :key="['source','other',key].join('-')">
        <q-item-section>{{ disp }}</q-item-section>
        <q-item-section side>{{ source[key] }}</q-item-section>
      </q-item>
    </q-list>
  </q-card>
</template>

<script>
export default {
  name: "SourceDetailCard",
  props: ['id'],
  computed: {
    source(){ return this.$store.getters["SOURCES/source"](this.id) },
    image(){ return _.isEmpty(this.source.media) ? null : imageUrl(this.source.media[0]) },
    layout(){ return { Status:'status',Expire:'expire',Orders:'orders',Hits:'hit','Hits after expire':'expire_hits' } },
  }
}
</script>
