<template>
  <q-card>
    <q-card-section class="row items-center q-pb-none"><div class="text-h6">Create New Item</div><q-space /><q-btn icon="close" flat round dense v-close-popup /></q-card-section>
    <q-card-section>
      <q-form autocorrect="off" autocapitalize="off" autocomplete="off" spellcheck="false" class="row q-col-gutter-xs" ref="item_create_form">
        <div class="col-8"><q-input type="text" name="name" outlined v-model="name" label="Name" /></div>
        <div class="col-4"><q-select outlined name="category" v-model="category" :options="categories" option-label="name" option-value="id" emit-value map-options label="Category" /></div>
        <div class="col-12"><q-input type="textarea" name="description" outlined v-model="description" label="Description" style="height: 4rem" /></div>
        <div class="col-4"><q-input type="text" name="price" outlined v-model="price" label="Price" /></div>
        <div class="col-4"><q-input type="text" name="selling" outlined v-model="selling" label="Selling Price" /></div>
        <div class="col-4"><q-input type="text" name="stock" outlined v-model="stock" label="Stock" /></div>
        <div class="col-4"><q-select outlined name="status" v-model="status" :options="options" label="Status" /></div>
        <div class="col-8"><q-input type="file" name="image" borderless v-model="image" label="Image" /></div>
      </q-form>
    </q-card-section>
    <q-card-actions align="right" class="q-pa-md">
        <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" @click="reset" />
        <q-btn label="Submit" type="submit" color="primary" push @click="create" :loading="loading" />
    </q-card-actions>
  </q-card>
</template>

<script>
export default {
  name: "CreateItemCard",
  data(){ return {
    options: ['Y','N'], loading: false,
    name:'', category:'',
    description: '',
    price: 0, selling: 0, stock: 1,
    status: 'Y',
    image: ''
  } },
  computed: {
    categories(){ return _.values(this.$store.state.CATEGORIES.CATEGORIES) }
  },
  methods: {
    reset(){ return this.name = this.description = this.category = this.image = '' },
    create(){
      if(this.name === '' || this.category === '') return; this.loading = true;
      let data = new FormData(this.$refs['item_create_form'].$el), $commit = this.$store.commit, $category = this.category;
      this.$store.dispatch('ITEMS/create',data)
        .then((data) => {
          if (!data || !data.id) return;
          $commit('CATEGORIES/addItem', {item: data.id, category: $category});
          this.reset();
          this.loading = false;
          this.$emit('created')
        })
    }
  }
}
</script>
