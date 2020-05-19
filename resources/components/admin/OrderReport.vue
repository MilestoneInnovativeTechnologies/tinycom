<template>
    <div class="card" style="max-width: 65vh">
        <div class="card-body">
            <graph-bar :padding-left="30" :padding-top="30" :padding-bottom="0" :padding-right="0" :height="graph_height" :width="graph_width" :axis-reverse="true" :labels="graph_days" :values="bar_totals" :axis-min="axis_min" :axis-max="axis_max" display="all">
                <note text="Collection Report"></note>
            </graph-bar>
        </div>
        <div class="card-body">
            <table class="table table-sm">
                <thead><tr><th>Day</th><th>Orders</th><th>Processed</th><th>Collection</th></tr></thead>
                <tbody>
                <tr v-for="(st,d) in statics" :key="'order-report-static-day-'+st.day">
                    <td>{{ st.day }}</td>
                    <td>{{ st.orders }}</td>
                    <td>{{ st.delivered }}</td>
                    <td>{{ st.total }}</td>
                </tr>
                </tbody>
            </table>
        </div>
        <div class="card-body pt-0">
            <graph-line :padding-left="30" :padding-top="30" :padding-bottom="30" :padding-right="0" :width="graph_width" :height="graph_height" shape="curve" :axis-full-mode="true" :labels="graph_days" :values="line_values" disply="all">
                <note text="Collection"></note>
            </graph-line>
        </div>
        <div class="card-body pt-0">
            <graph-line :padding-left="0" :padding-top="30" :padding-bottom="50" :padding-right="0"
                        :width="graph_width"
                    :height="graph_height"
                    :axis-full-mode="true"
                    shape="curve"
                    :opacity="0.6"
                    :borderline="true"
                    :labels="graph_days"
                    :values="area_values">
                <note text="Orders"></note>
                <legends :names="area_names"></legends>
                <guideline :tooltip-y="true"></guideline>
            </graph-line>
        </div>
    </div>
</template>

<script>
    export default {
        name: "OrderReport",
        data(){ return {
            graph_width: window.outerWidth-100,
            graph_height: 160,
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
            axis_min(){ return _.min(this.bar_totals[0]) },
            axis_max(){ return _.max(this.bar_totals[0]) },
            line_values(){ return [_.map(this.statics,'total')] },
            area_names(){ return ['Orders','Confirmed','Delivered'] },
            area_values(){ return _.map(this.area_names,name => _.map(this.statics,_.toLower(name))) },
        },
        methods: {
            total(array){ return _.sumBy(array,({ amount }) => _.toNumber(amount)) },
        }
    }
</script>