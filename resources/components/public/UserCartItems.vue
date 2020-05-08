<template>
    <ul class="list-group list-group-flush">
        <li class="list-group-item px-0" v-for="(item,idx) in items" :key="'cart-item-'+idx">
            <div class="d-flex">
                <div class="details flex-grow-1">
                    <h4 class="h4 font-weight-bolder mb-0">{{ name(item.item) }}</h4>
                    <div class="text-muted">{{ desc(item.item) }}</div>
                    <div class="row mr-2 mt-2"><div class="col-4 pr-0">{{ item.price }}</div><div class="col-4 px-0">X {{ item.quantity }}</div><div class="col-4 pl-0 text-right">{{ item.amount }}</div></div>
                </div>
                <div class="counter flex-grow-0 d-flex flex-column">
                    <button class="btn btn-sm btn-info text-white" @click.prevent="increment(item.item)" style="margin-bottom: 3px"><i class="fas fa-plus"></i></button>
                    <button class="btn btn-sm btn-info text-white" @click.prevent="decrement(item.item)"><i class="fas fa-minus"></i></button>
                </div>
            </div>
        </li>
        <li class="list-group-item px-0 bg-light text-center">
            <h3 class="font-weight-bolder cart-total text-info">{{ total }}</h3>
        </li>
    </ul>
</template>

<script>
    export default {
        name: "UserCartItems",
        computed: {
            items(){ return this.$store.state.CART.items },
            details(){ return this.$store.state.CART.details },
            name(){ return (id) => _.get(this.details,[id,'name']) },
            desc(){ return (id) => _.get(this.details,[id,'description']) },
            total(){ return this.$store.getters['CART/total'] }
        },
        methods: {
            increment(item){ this.$store.dispatch('CART/increment',item) },
            decrement(item){ this.$store.dispatch('CART/decrement',item) },
        }
    }
</script>
