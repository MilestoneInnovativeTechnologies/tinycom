<template>
    <section class="order-view">
        <div class="modal fade" tabindex="-1" role="dialog" ref="order_confirm_modal">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">{{ title }}</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    </div>
                    <div class="modal-body" v-if="type === 'error'">
                        <p class="lead">{{ message }}</p>
                        <p>Please try again!!</p>
                    </div>
                    <div class="modal-body" v-if="type === 'warning'">
                        <p class="lead">{{ message }}</p>
                        <textarea class="form-control" v-model="reason"></textarea>
                    </div>
                    <div class="modal-footer">
                        <button v-if="type === 'error'" type="button" class="btn btn-secondary" @click.prevent="$router.push({ name:'orders' })" data-dismiss="modal">Back to Orders</button>
                        <button v-if="type === 'warning'" type="button" class="btn btn-danger" @click.prevent="cancel(true)" data-dismiss="modal">Cancel Order</button>
                    </div>
                </div>
            </div>
        </div>
        <button class="mb-2 btn btn-info text-light py-2" @click="$router.push({ name:'orders' })"><i class="fas fa-backward fa-fw mr-2"></i> Back to Pending Orders</button>
        <div class="card mx-sm-auto" style="max-width: 65vh" v-if="order">
            <div class="card-body">
                <div class="row py-1 px-2" v-for="(key,head,idx) in layout" :key="'order-view-detail-index-'+idx">
                    <div class="col-3 px-0">{{ head }}</div><div class="col-9 text-right px-0">{{ order[key] }}</div>
                </div>
                <div class="row py-1 px-2">
                    <div class="col-3 px-0">Source</div><div class="col-9 text-right px-0"><button v-if="order.source" class="btn btn-link p-0" @click="$router.push({ name:'source',params:{ id:order.source } })">{{ order.source_title }}</button><span v-else>{{ order.source_title }}</span></div>
                </div>
            </div>
            <h4 class="card-title px-4">Items</h4>
            <ul class="list-group list-group-flush" v-if="order.items && order.items.length">
                <li class="list-group-item" v-for="item in (order.items || [])" :key="'order-view-items-'+item.id">
                    <div class="row">
                        <div class="col-12"><strong>{{ itemName(item.item) }}</strong></div>
                        <div class="col-6">{{ item.price }} X {{ item.quantity }}</div>
                        <div class="col-6 text-right font-weight-bolder">{{ item.amount }}</div>
                    </div>
                </li>
                <li class="list-group-item"><h5 class="text-right">{{ order.total }}</h5></li>
            </ul>
            <div class="card-body text-center">
                <button class="btn btn-block btn-warning" :disabled="disabled" :class="{ disabled }" @click.prevent="confirm">Confirm Order</button>
                <button class="btn btn-link text-danger mt-3" :disabled="disabled" :class="{ disabled }" @click.prevent="cancel(false)">Cancel Order</button>
                <button class="btn btn-link text-dark mt-3" :disabled="disabled" :class="{ disabled }" @click.prevent="$store.dispatch('CARTS/fetch',order.id)">Update from server</button>
            </div>
        </div>
    </section>
</template>

<script>
    export default {
        name: "Order",
        props: ['id'],
        data(){ return {
            layout: { 'Order ID':'id',UUID:'uuid',Customer:'customer_name',Phone:'customer_phone',Status:'status','Last Updated':'updated' },
            disabled: false, message: '', title: '', reason: '', type: false,
        } },
        computed: {
            order(){ return this.$store.getters['CARTS/cart'](this.id) },
        },
        methods: {
            itemName(id){ return _.get(_.head(_.filter(this.$store.state.ITEMS.ITEMS,['id',_.toInteger(id)])),'name') },
            confirm(){
                this.disabled = true;
                this.$store.dispatch('CARTS/confirm',this.order.id).then(({ error,message }) => {
                    if(error) {
                        this.type = 'error';
                        this.message = message;
                        this.title = 'Error while performing requested action';
                        $(this.$refs['order_confirm_modal']).modal('show');
                    }
                    else this.$router.push({ name:'bill',params:{ id:this.id } })
                })
            },
            cancel(status){
                this.disabled = true; this.type = 'warning'
                if(!status) {
                    this.message = 'Please provide a valid reason for for cancellation!';
                    this.title = 'You are about to cancel this order, Sure??';
                    $(this.$refs['order_confirm_modal']).modal('show');
                } else {
                    this.$store.dispatch('CARTS/cancel',{ id:this.order.id,reason:this.reason }).then(({ error,message }) => {
                        if(error) {
                            this.message = message;
                            this.title = 'Error while performing requested action';
                        }
                        else this.$router.push({ name:'orders' })
                    })
                }
            }
        },
        beforeRouteLeave(to,from,next){
            this.type = this.disabled = false;
            next();
        }
    }
</script>