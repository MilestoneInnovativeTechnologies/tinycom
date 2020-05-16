<template>
    <div class="card" style="max-width: 65vh">
        <div class="card-body">
            <graph-bar
                    :padding-left="30"
                    :padding-top="30"
                    :padding-bottom="0"
                    :padding-right="0"
                    :height="graph_height"
                    :width="graph_width"
                    :axis-reverse="true"
                    :labels="graph_days"
                    :values="bar_totals"
                    :axis-min="axis_min"
                    :axis-max="axis_max"
                    display="all"
            >
                <note :text="'Collection Report'"></note>
            </graph-bar>
        </div>
        <div class="card-body">
            <table class="table table-sm">
                <thead><tr><th>Day</th><th>Orders</th><th>Confirm</th><th>Collection</th></tr></thead>
                <tbody>
                <tr v-for="(st,d) in statics" :key="'order-report-static-day-'+st.day">
                    <td>{{ st.day }}</td>
                    <td>{{ st.orders }}</td>
                    <td>{{ st.confirmed }}</td>
                    <td>{{ st.total }}</td>
                </tr>
                </tbody>
            </table>
        </div>
        <div class="card-body">
            <graph-line
                    :padding-left="30"
                    :padding-top="30"
                    :padding-bottom="60"
                    :padding-right="0"
                    :width="graph_width"
                    :height="graph_height"
                    shape="curve"
                    :axis-full-mode="false"
                    :labels="graph_days"
                    :names="line_names"
                    :values="line_values"
                    disply="all"
                    axis-y-style="none"
            >
                <note text="Performance"></note>
                <legends :names="line_names"></legends>
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
            carts(){ return this.$store.getters['CARTS/all'] },
            group(){ return _.omit(_.groupBy(this.carts,({ status,updated_at }) => _.includes(this.avoid_status,status) ? '-' : new Date(updated_at).getDay()),'-') },
            count(){ return _.countBy(this.carts,'status') },
            statics(){ return _.mapValues(this.group,(charts,day) => _.zipObject(['day','orders','confirmed','total'],[this.days[_.toInteger(day)],charts.length,_.get(this.count,'Confirmed',0)+_.get(this.count,'Delivered',0),this.total(charts)])) },
            graph_days(){ return _.map(this.statics,'day') },
            bar_totals(){ return [_.map(this.statics,'total')] },
            axis_min(){ return _.min(this.bar_totals[0]) },
            axis_max(){ return _.max(this.bar_totals[0]) },
            line_names(){ return ['orders','confirmed','total'] },
            line_values(){ return _.map(this.line_names,name => _.map(this.statics,name)) }

        },
        methods: {
            total(array){ return _.sumBy(array,({ amount }) => _.toNumber(amount)) },
        }
    }
</script>