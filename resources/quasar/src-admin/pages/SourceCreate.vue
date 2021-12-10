<template>
  <q-page padding>
    <BackButton right :to="{ name:'sources' }" class="q-mb-sm" />
    <q-form autocorrect="off" autocapitalize="off" autocomplete="off" spellcheck="false" ref="source_create_form">
      <q-list bordered>
        <q-expansion-item group="source" icon="how_to_vote" label="Basic Details" default-opened header-class="text-primary">
          <q-card>
            <q-card-section class="q-pt-none q-gutter-xs">
              <q-input type="text" name="title" dense outlined v-model="basic.title" label="Name" />
              <q-input type="textarea" name="description" dense outlined v-model="basic.description" label="Description" style="height: 4rem" />
              <input type="hidden" name="expire" v-model="expire" />
              <div class="q-mt-sm text-bold">Expire After</div>
              <div class="row text-bold q-my-none">
                <q-input class="col-6" type="number" dense outlined v-model="exp_num" />
                <q-select class="col-6" dense outlined v-model="exp_period" :options="exp_period_opts" emit-value map-options />
              </div>
              <div class="q-mt-sm text-bold">Image</div>
              <div class="row">
                <q-input type="file" name="image" v-model="basic.image" borderless dense />
              </div>
            </q-card-section>
          </q-card>
        </q-expansion-item>
        <q-separator />
        <q-expansion-item group="source" icon="groups" label="Group" header-class="text-primary">
          <q-card>
            <q-card-section class="q-pt-none">
              <q-input outlined dense v-model="g_filter" clearable class="q-mb-xs" />
              <q-option-group :options="f_group_list" type="checkbox" v-model="groups" dense  />
            </q-card-section>
          </q-card>
        </q-expansion-item>
        <q-separator />
        <q-expansion-item group="source" icon="how_to_reg" label="Customers" header-class="text-primary">
          <q-card>
            <q-card-section class="q-pt-none">
              <q-input outlined dense v-model="c_filter" clearable class="q-mb-xs" />
              <q-option-group :options="f_customer_list" name="customers[]" type="checkbox" v-model="customers" dense  />
            </q-card-section>
          </q-card>
        </q-expansion-item>
        <q-separator />
        <q-expansion-item group="source" icon="category" label="Items" header-class="text-primary">
          <q-card>
            <q-card-section class="q-pt-none">
              <q-input outlined dense v-model="i_filter" clearable class="q-mb-xs" />
              <q-list dense separator>
                <q-item tag="label" dense v-ripple v-for="item in f_item_list" :key="['source','create','item','list',item.id].join('-')">
                  <q-item-section avatar>
                    <q-checkbox v-model="items" name="items[]" :val="item.id" :value="item.id" />
                  </q-item-section>
                  <q-item-section>{{ item.name }}</q-item-section>
                  <q-item-section side>
                    <q-input type="number" outlined dense :name="'item['+item.id+']'" v-model="item_price[item.id]" style="width: 5rem" @input="val => items.includes(item.id) ? null : items.push(item.id)" />
                  </q-item-section>
                </q-item>
              </q-list>
            </q-card-section>
          </q-card>
        </q-expansion-item>
        <q-separator />
        <q-expansion-item group="source" icon="widgets" label="Categories" header-class="text-primary">
          <q-card>
            <q-card-section class="q-pt-none">
              <q-input outlined dense v-model="t_filter" clearable class="q-mb-xs" />
              <q-list dense separator>
                <q-item tag="label" dense v-ripple v-for="category in f_category_list" :key="['source','create','category','list',category.id].join('-')">
                  <q-item-section avatar>
                    <q-checkbox v-model="categories" name="categories[]" :val="category.id" :value="category.id" />
                  </q-item-section>
                  <q-item-section>{{ category.name }}</q-item-section>
                  <q-item-section side>
                    <q-input type="number" outlined dense :name="'category['+category.id+']'" v-model="category_disc[category.id]" style="width: 5rem" @input="val => categories.includes(category.id) ? 0 : categories.push(category.id)" />
                  </q-item-section>
                </q-item>
              </q-list>
            </q-card-section>
          </q-card>
        </q-expansion-item>
        <q-separator />
        <q-expansion-item group="source" icon="backup_table" label="Submit" header-class="text-primary">
          <q-card>
            <q-card-section>
              <div class="text-bold">{{ basic.title }}</div>
              <div class="text-caption">{{ basic.description }}</div>
              <div class="text-caption"><strong>Image Uploaded:</strong> {{ basic.image ? 'Yes' : 'No' }}</div>
              <div class="text-bold">Customers: {{ customers.length || 'All' }}</div>
              <div class="text-bold">Categories: {{ categories.length || 'None' }}</div>
              <div class="text-bold">Items: {{ items.length || 'None' }}</div>
            </q-card-section>
            <q-card-actions>
              <q-btn color="primary" push class="full-width" label="CREATE SOURCE" @click="create" :loading="loading" />
            </q-card-actions>
          </q-card>
        </q-expansion-item>
      </q-list>
    </q-form>
  </q-page>
</template>

<script>
import BackButton from "components/BackButton";
export default {
  name: "PageSourceCreate",
  components: {BackButton},
  data(){
    return {
      loading: false,
      g_filter: '', c_filter: '', i_filter: '', t_filter: '',
      exp_num: 1, exp_period: 60,
      exp_period_opts: [{ label:'Minute',value:60 },{ label:'Hour',value:3600 },{ label:'Day',value:86400 }],
      groups: [], customers: [], items: [], categories: [],
      basic: { title:'',description:'', image:'' },
      group_list: _.map(this.$store.state.CUSTOMERS.GROUPS,({ id,name }) => _.zipObject(['value','label'],[id,name])),
      customer_list: _.map(this.$store.state.CUSTOMERS.CUSTOMERS,({ id,name,phone }) => _.zipObject(['value','label'],[id,name + ', ' + phone])),
      item_list: _.map(this.$store.state.ITEMS.ITEMS,({ id,name,selling,price }) => new Object({ id,name,price,selling })),
      category_list: _.map(this.$store.state.CATEGORIES.CATEGORIES,({ id,name }) => new Object({ id,name })),
      item_price: _.mapValues(this.$store.state.ITEMS.ITEMS,({ selling,price }) => selling || price),
      category_disc: _.mapValues(this.$store.state.CATEGORIES.CATEGORIES,() => 0),
    }
  },
  computed: {
    expire(){ return _.toSafeInteger(this.exp_num) * _.toSafeInteger(this.exp_period) },
    all_groups(){ return _.keyBy(this.$store.state.CUSTOMERS.GROUPS,'id') },
    f_group_list(){ return this.g_filter ? _.filter(this.group_list,({ label }) => _.includes(_.toLower(label),_.toLower(this.g_filter))) : this.group_list },
    f_customer_list(){ return this.c_filter ? _.filter(this.customer_list,({ label }) => _.includes(_.toLower(label),_.toLower(this.c_filter))) : this.customer_list },
    f_item_list(){ return this.i_filter ? _.filter(this.item_list,({ name }) => _.includes(_.toLower(name),_.toLower(this.i_filter))) : this.item_list },
    f_category_list(){ return this.t_filter ? _.filter(this.category_list,({ name }) => _.includes(_.toLower(name),_.toLower(this.t_filter))) : this.category_list },
  },
  methods: {
    create(){
      this.loading = true;
      if((this.items.length || this.categories.length) && this.basic.title){
        let frmData = new FormData(this.$refs['source_create_form'].$el);
        this.$store.dispatch('SOURCES/create',frmData)
          .then(({ id }) => {
            this.loading = false
            this.$router.push({name: 'source', params: {id}});
          })
      } else this.loading = false;
    }
  },
  watch: {
    groups(n,o){
      let add = null, rem = null;
      if(n.length > o.length) add = _.difference(n,o); else if(n.length < o.length) rem = _.difference(o,n);
      if(add) this.customers = _.uniq(_.concat(this.customers,this.all_groups[add[0]].customers));
      if(rem) this.customers = _.uniq(_.difference(this.customers,this.all_groups[rem[0]].customers));
    }
  }
}
</script>
