<template>
  <q-page padding>
    <q-card>
      <q-card-section>
        <graph-bar :padding-left="30" :padding-top="30" :padding-bottom="0" :padding-right="0" :height="graph_height" :axis-reverse="true" :labels="graph_days" :values="bar_totals" :axis-min="axis_min" :axis-max="axis_max" :axis-step="10" display="all">
          <note text="Collection Report"></note>
        </graph-bar>
      </q-card-section>
    </q-card>
    <q-card class="q-mt-sm">
      <q-markup-table dense class="text-right">
        <thead><q-tr><q-th class="text-left">Day</q-th><q-th>Orders</q-th><q-th>Processed</q-th><q-th>Collection</q-th></q-tr></thead>
        <tbody><q-tr v-for="st in statics" :key="'order-report-static-day-'+st.day">
          <q-td class="text-left">{{ st.day }}</q-td><q-td>{{ st.orders }}</q-td><q-td>{{ st.delivered }}</q-td><q-td>{{ st.total }}</q-td>
        </q-tr></tbody>
      </q-markup-table>
    </q-card>
    <q-card class="q-mt-sm">
      <q-card-section>
        <graph-line :padding-left="30" :padding-top="30" :padding-bottom="30" :padding-right="0" :height="graph2_height" shape="curve" :axis-full-mode="true" :labels="graph_days" :values="line_values" disply="all">
          <note text="Collection"></note>
        </graph-line>
      </q-card-section>
    </q-card>
    <q-card class="q-mt-sm">
      <q-card-section>
        <graph-line :padding-left="0" :padding-top="30" :padding-bottom="50" :padding-right="0" :height="graph2_height" :axis-full-mode="true" shape="curve" :opacity="0.6" :borderline="true" :labels="graph_days" :values="area_values">
          <note text="Orders"></note>
          <legends :names="area_names"></legends>
          <guideline :tooltip-y="true"></guideline>
        </graph-line>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
export default {
  name: "PageReport",
  data(){ return {
    graph_key: 0,
    graph_width: 0,
    graph_height: 160, graph2_height: 200,
    days: ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'],
    avoid_status: ['New','Cancelled']
  } },
  computed: {
    date_day(){ return _([6,5,4,3,2,1,0]).mapKeys(d => 'd'+new Date(new Date().getTime() - d*24*60*60*1000).getDate()).mapValues(d => this.days[new Date(new Date().getTime() - d*24*60*60*1000).getDay()]).value() },
    carts(){ return _.filter(this.$store.getters['CARTS/all'],({ status }) => !_.includes(this.avoid_status,status)) },
    group(){ return _.groupBy(this.carts,({ updated_at }) => 'd' + new Date(updated_at).getDate()) },
    count(){ return _.mapValues(this.date_day,(day,dDate) => _.countBy(_.get(this.group,dDate,[]),'status')) },
    statics(){ return _.mapValues(this.date_day,(day,dDate) => _.zipObject(['day','orders','confirmed','delivered','total'],[day,_.get(this.group,dDate,[]).length,_.get(this.count,[dDate,'Confirmed'],0)+_.get(this.count,[dDate,'Delivered'],0),_.get(this.count,[dDate,'Delivered'],0),this.total(_.get(this.group,dDate,[]))])) },
    graph_days(){ return _.map(this.statics,'day') },
    bar_totals(){ return [_.map(this.statics,'total')] },
    axis_min(){ return _.floor(_.min(this.bar_totals[0]),-3); },
    axis_max(){ return _.ceil(_.max(this.bar_totals[0])*1.15,-2) },
    line_values(){ return [_.map(this.statics,'total')] },
    area_names(){ return ['Orders','Confirmed','Delivered'] },
    area_values(){ return _.map(this.area_names,name => _.map(this.statics,_.toLower(name))) },
  },
  methods: {
    total(array){ return _.sumBy(array,({ amount }) => _.toNumber(amount)) },
  },
}
</script>
