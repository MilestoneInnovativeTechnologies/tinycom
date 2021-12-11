<template>
    <q-card style="max-width: 65vh" class="q-mx-auto">
      <q-card-section><div class="text-h6 text-primary">Available Categories</div></q-card-section>
      <q-list>
        <div v-for="item in list">
          <q-item clickable v-ripple :to="{ name:'category-items',params:{ id:item.id } }">
            <q-item-section avatar><q-avatar rounded><img :src="image(item.media)"></q-avatar></q-item-section>
            <q-item-section>
              <q-item-label>{{ item.name }}</q-item-label>
              <q-item-label caption v-if="item.description" lines="2">{{ item.description }}</q-item-label>
            </q-item-section>
          </q-item>
          <q-separator inset="true"/>
        </div>
      </q-list>
    </q-card>
</template>

<script>
export default {
  name: "CategoriesList",
  computed: {
    list() {
      return this.$store.state.CATEGORIES.CATEGORIES
    },
  },
  methods: {
    image(media) {
      return media.length ? imageUrl(media[0]) : null
    }
  }
}
</script>
