<template>
    <section class="cart-view">
        <div class="card col-lg-3 m-lg-auto" v-if="cart">
            <div class="card-body">
                <h5 class="card-title">Cart ID: {{ cart.id }}</h5>
                <div class="card-text">
                    <dl>
                        <span v-for="(key,head,idx) in layout" :key="'cart-view-detail-index-'+idx"><dt>{{ head }}</dt><dd>{{ cart[key] }}</dd></span>
                    </dl>
                </div>
            </div>
            <h4 class="card-title">Items</h4>
            <ul class="list-group list-group-flush">
                <li class="list-group-item" v-for="item in (cart.items || [])" :key="'cart-view-items-'+item.id">
                    <div class="row">
                        <div class="col-12"><strong>{{ itemName(item.id) }}</strong></div>
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
        name: "CartView",
        props: ['id'],
        data(){ return {
            layout: { UUID:'uuid',Source:'source_title',Customer:'customer_name',Phone:'customer_phone',Status:'status','Last Updated':'updated' }
        } },
        computed: {
            cart(){ return this.$store.getters['CARTS/cart'](this.id) },
        },
        methods: {
            itemName(id){ return _.get(_.head(_.filter(this.$store.state.ITEMS.ITEMS,['id',id])),'name') }
        }
    }
</script>