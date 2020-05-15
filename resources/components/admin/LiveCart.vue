<template>
    <section class="cart-view">
        <div class="card col-lg-3 m-lg-auto" v-if="cart">
            <div class="card-body">
                <div class="row"><div class="spinner-grow text-success float-right"></div></div>
                <div class="row">
                    <h5 class="card-title">Cart ID: {{ cart.id }}</h5>
                </div>
                <div v-for="(key,head,idx) in layout" :key="'live-cart-view-detail-index-'+idx" class="row">
                    <div class="col-3 px-0">{{ head }}</div><div class="col-9 text-right px-0">{{ cart[key] }}</div>
                </div>
                <div class="row" v-if="cart.source">
                    <div class="col-3 px-0">Source</div><div class="col-9 text-right px-0"><button class="btn btn-link px-0" @click="$router.push({ name:'source',params:{ id:cart.source_id } })">{{ cart.title }}</button></div>
                </div>
            </div>
            <h4 class="card-title">Items</h4>
            <ul class="list-group list-group-flush">
                <li class="list-group-item" v-for="item in (cart.items || [])" :key="'live-cart-view-items-'+item.item">
                    <div class="row">
                        <div class="col-12"><strong>{{ itemName(item.item) }}</strong></div>
                        <div class="col-6">{{ item.price }} X {{ item.quantity }}</div>
                        <div class="col-6 text-right font-weight-bolder">{{ item.amount }}</div>
                    </div>
                </li>
                <li class="list-group-item"><h5 class="text-right">{{ cart.total }}</h5></li>
            </ul>

        </div>
    </section>
</template>

<script>
    export default {
        name: "LiveCart",
        props: ['id'],
        data(){ return {
            layout: { UUID:'uuid',Customer:'name',Phone:'phone',Amount:'total',Updated:'updated' }
        } },
        computed: {
            carts(){ return this.$store.getters['CARTS/live'] },
            cart(){ return _.head(_.filter(this.carts,['id',this.id])) },
        },
        methods: {
            itemName(id){ return _.get(_.head(_.filter(this.$store.state.ITEMS.ITEMS,['id',_.toInteger(id)])),'name') }
        }
    }
</script>