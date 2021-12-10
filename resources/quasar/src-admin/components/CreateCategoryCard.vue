<template>
  <q-card>
    <q-card-section class="row items-center q-pb-none"><div class="text-h6">Create New Category</div><q-space /><q-btn icon="close" flat round dense v-close-popup /></q-card-section>
    <q-card-section>
      <q-form autocorrect="off" autocapitalize="off" autocomplete="off" spellcheck="false" class="q-gutter-y-xs" ref="category_create_form">
        <q-input type="text" name="name" outlined v-model="name" label="Name" />
        <q-input type="textarea" name="description" outlined v-model="description" label="Description" style="height: 4rem" />
        <q-select outlined name="status" v-model="status" :options="options" label="Status" />
        <q-input type="file" name="image" borderless v-model="image" />
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
  name: "CreateCategoryCard",
  data(){ return {
    options: ['Y','N'], loading: false,
    name:'',
    description: '',
    status: 'Y',
    image: ''
  } },
  methods: {
    reset(){ return this.name = this.description = this.image = '' },
    create(){
      if(this.name === '') return ;
      this.loading = true;
      let data = new FormData(this.$refs['category_create_form'].$el);
      this.$store.dispatch('CATEGORIES/create',data).then(() => this.$emit('created',this.reset() || !(this.loading = false) || data))
    }
  }
}
</script>
