<template>
  <q-page padding>
    <div class="row fit wrap content-start items-center q-mb-sm">
      <div class="text-h6 col-grow">{{ name }}</div>
      <q-btn icon="reply_all" label="BACK" color="warning" dense size="sm" class="q-mb-sm q-px-sm q-py-xs" :to="{ name:'items' }" />
    </div>
    <q-form ref="item-update-form" class="q-gutter-y-xs" :key="upd">
      <q-input type="text" outlined name="name" label="Name" v-model="item.name" />
      <q-input type="textarea" outlined name="description" label="Description" style="height: 5rem" v-model="item.description" />
      <q-input type="text" outlined name="price" label="Price" v-model="item.price" />
      <q-input type="text" outlined name="selling" label="Selling Price" v-model="item.selling" />
      <q-input type="text" outlined name="stock" label="Stock" v-model="item.stock" />
      <q-select outlined name="status" label="Status" v-model="item.status" :options="['Y','N']" />
      <div class="q-mt-xs row fit wrap content-start items-center">
        <q-img v-if="image" ratio="1" class="rounded-borders col-4" :src="image" />
        <div class="col-8 q-px-sm"><q-input type="file" borderless dense name="image" value="" /></div>
      </div>
      <div class="text-bold q-mt-md">Category</div>
      <q-option-group :options="category_list" label="Category" name="categories[]" type="checkbox" v-model="categories" dense  />
    </q-form>
    <div class="text-right">
      <q-btn type="submit" color="primary" label="Update" push class="q-px-md" :loading="loading" @click="update" />
    </div>
  </q-page>
</template>

<script>
export default {
  name: "PageItem",
  props: ['id'],
  data() {
    return {
      upd: 0,
      item: this.$store.getters["ITEMS/item"](this.id),
      categories: this.$store.getters["ITEMS/ITEM_CATEGORIES"][this.id],
      loading: false
    }
  },
  computed: {
    name(){ return _.get(this.$store.state.ITEMS.ITEMS,[this.id,'name']) },
    image(){ return _.isEmpty(this.item.media) ? null : imageUrl(this.item.media[0]) },
    category_list(){ return _.map(this.$store.state.CATEGORIES.CATEGORIES,({ id,name }) => _.zipObject(['value','label'],[id,name])) },
  },
  methods: {
    update(){
      this.loading = true; let { name, price } = this.item;
      if(!name || !price || _.isEmpty(this.categories)) return this.loading = false;
      this.$store.dispatch('SERVER/serverItemAction',{ id:this.id,data:new FormData(this.$refs['item-update-form'].$el),item:'item',action:'update' })
        .then(data => (this.loading = false) || this.upd++)
    }
  },
  watch: {
    id(id){ this.item = this.$store.getters["ITEMS/item"](id) },
  }
}
</script>
