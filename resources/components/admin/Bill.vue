<template>
    <section class="bill-view">
        <div class="modal fade" tabindex="-1" role="dialog" ref="order_deliver_modal">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Mark As Delivered</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    </div>
                    <div class="modal-body">
                        <p>You are going to make this order as delivered, Are you sure?</p>
                        <p class="lead">Enter the amount collected</p>
                        <input type="text" class="form-control" v-model="collect">
                    </div>
                    <div class="modal-footer"><button type="button" class="btn btn-warning" @click.prevent="deliver(true)" data-dismiss="modal">Mark Delivered</button></div>
                </div>
            </div>
        </div>
        <button class="mb-2 btn btn-info text-light py-2" @click="$router.push({ name:'confirms' })"><i class="fas fa-backward fa-fw mr-2"></i> Back to Confirmed Orders</button>
        <div class="card mx-lg-auto bill" style="max-width: 65vh" v-if="bill" :class="{ delivered }">
            <div class="card-body">
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
                            <td>{{ itemName(item.item) }}<br>{{ item.price }}</td>
                            <td class="text-center">{{ item.quantity | number }}</td>
                            <td class="text-right">{{ item.amount }}</td>
                        </tr>
                    </tbody>
                    <tfoot>
                        <tr><th colspan="4" class="text-right font-weight-bolder" style="font-size: 1.2rem"><i class="fas fa-rupee-sign"></i> {{ bill.total }}</th></tr>
                    </tfoot>
                </table>
                <hr>
                <p class="text-center" style="font-size: 1.5rem"><i class="fas fa-rupee-sign"></i> {{ bill_total }}</p>
                <hr>
                <p v-if="delivered && bill.amount !== bill_total" class="text-center" style="font-size: 0.8rem">Paid {{ bill.amount }}</p>
            </div>
        </div>
        <div class="card mt-2">
            <div class="card-body">
                <dl class="row mb-0">
                    <dt class="col-3">Share</dt>
                    <dt class="col-6"><a :href="whatsapp" target="_blank"><i class="text-success fab fa-whatsapp"></i> Whatsapp</a></dt>
                </dl>
            </div>
        </div>
        <div class="card mt-2" v-if="!delivered">
            <div class="card-body">
                <button class="btn btn-warning btn-block" @click="deliver(false)">Delivered</button>
            </div>
        </div>
    </section>
</template>

<script>
    export default {
        name: "Bill",
        props: ['id'],
        data(){ return {
            layout: { UUID:'uuid',Source:'source_title',Customer:'customer_name',Status:'status','Last Updated':'updated' },
            collect: 0
        } },
        computed: {
            bill(){ return this.$store.getters['CARTS/cart'](this.id) },
            bill_total(){ return this.collect = this.bill.total },
            date(){ return _.get(this.bill,'confirmed_at') },
            url(){ return urlParse('BILL_LINK',{ uuid:this.bill.uuid }) },
            whatsapp(){ return urlParse('WHATSAPP',{ phone:'91'+this.bill.customer_phone,text:this.url }) },
            delivered(){ return this.bill.status === 'Delivered' }
        },
        methods: {
            itemName(id){ return _.get(_.head(_.filter(this.$store.state.ITEMS.ITEMS,['id',id])),'name') },
            deliver(post){
                if(!post) return $(this.$refs['order_deliver_modal']).modal('show');
                this.$store.dispatch('CARTS/delivered',{ id:this.bill.id,amount:this.collect });//.then(() => this.$router.push({ name:'delivered' }))
            }
        }
    }
</script>