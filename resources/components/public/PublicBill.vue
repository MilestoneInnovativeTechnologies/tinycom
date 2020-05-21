<template>
    <section class="bill-view">
        <div class="card col-lg-3 m-lg-auto" v-if="bill">
            <div class="card-body px-0">
                <h4 class="card-title text-center">{{ $root.COMPANY }}</h4>
                <hr>
                <dl class="row m-0">
                    <dt class="col-3 p-0">Order # </dt><dd class="col-9 p-0">{{ bill.uuid }}</dd>
                    <dt class="col-3 p-0">Date: </dt><dd class="col-9 p-0">{{ bill.confirmed_at | date }} <span class="float-right">{{ bill.confirmed_at | time }}</span></dd>
                    <dt class="col-3 p-0">Customer: </dt><dd class="col-9 p-0">{{ bill.customer_name }}<em class="text-right float-right" style="font-size: 0.8rem">{{ bill.customer_phone }}</em></dd>
                </dl>
                <table class="table table-sm mt-3">
                    <thead><tr><th>#</th><th>Item</th><th class="text-center">Qty</th><th class="text-right">Total</th></tr></thead>
                    <tbody v-if="bill.items && bill.items.length">
                    <tr v-for="(item,idx) in bill.items" :key="'bill-detail-item-index-'+idx">
                        <td>{{ idx+1 }}</td>
                        <td>{{ itemName(item.id) }}<br>{{ item.price }}</td>
                        <td class="text-center">{{ item.quantity | number }}</td>
                        <td class="text-right">{{ item.amount }}</td>
                    </tr>
                    </tbody>
                    <tfoot>
                    <tr><th colspan="4" class="text-right font-weight-bolder" style="font-size: 1.2rem"><i class="fas fa-rupee-sign"></i> {{ total }}</th></tr>
                    </tfoot>
                </table>
                <hr>
                <p class="text-center" style="font-size: 1.5rem"><i class="fas fa-rupee-sign"></i> {{ bill_total }}</p>
                <hr>
            </div>
        </div>
    </section>
</template>

<script>
    export default {
        name: "PublicBill",
        props: ['id'],
        data(){ return {
            layout: { UUID:'uuid',Source:'source_title',Customer:'customer_name',Status:'status','Last Updated':'updated' },
        } },
        computed: {
            bill(){ return this.$store.getters['CARTS/cart'](_.toInteger(this.id)) },
            total(){ return _.sumBy(this.bill.items,({ amount }) => _.toNumber(amount)) },
            bill_total(){ return _.get(this.bill,'amount') },
            date(){ return _.get(this.bill,'confirmed_at') },
        },
        methods: {
            itemName(id){ return _.get(_.head(_.filter(this.$store.state.ITEMS.ITEMS,['id',id])),'name') },
        }
    }
</script>