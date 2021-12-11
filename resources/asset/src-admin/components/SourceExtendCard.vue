<template>
  <q-card v-if="source" :key="card_upd">
    <q-card-section class="q-pb-none"><div class="text-h6">Extend expire time from now</div></q-card-section>
    <q-card-section class="q-py-none">
      <q-form ref="source_extend_form">
        <div class="row q-col-gutter-sm">
          <q-input class="col-6" type="number" dense outlined v-model="exp_num" />
          <q-select class="col-6" dense outlined v-model="exp_period" :options="exp_period_opts" emit-value map-options />
        </div>
      </q-form>
    </q-card-section>
    <q-card-actions class="q-pt-xs q-px-md">
      <q-btn class="full-width" :loading="loading" push color="primary" label="Extend" @click="extend" />
    </q-card-actions>
  </q-card>
</template>

<script>
export default {
  name: "SourceExtendCard",
  props: ['id'],
  data(){ return {
    loading: false, card_upd: 0,
    exp_num: 1, exp_period: 60,
    exp_period_opts: [{ label:'Minute',value:60 },{ label:'Hour',value:3600 },{ label:'Day',value:86400 }],
  } },
  computed: {
    source(){ return this.$store.getters["SOURCES/source"](this.id) },
    expire(){ return _.toSafeInteger(this.exp_num) * _.toSafeInteger(this.exp_period) },
  },
  methods: {
    extend(){
      this.loading = true; let frmData = new FormData; frmData.append('id',this.id); frmData.append('expire',this.expire);
      this.$store.dispatch('SOURCES/extend',frmData).then(data => this.card_upd += _.toSafeInteger(!(this.loading = false))) }
  }
}
</script>
