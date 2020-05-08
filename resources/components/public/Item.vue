<template>
    <table class="table table-sm table-light item-display mb-0">
        <tbody>
            <tr class="title-row" @click.prevent="$router.push({ name:'item',params:{ id } })">
                <td class="item-image p-2" rowspan="2"><img v-show="image" :src="image" width="75" height="75"></td>
                <td class="item-title pt-2" colspan="2">
                    {{ prop('name') }}
                    <span class="badge badge-warning float-right p-2" v-if="exclusive"><i class="fas fa-signature mr-1"></i> FOR YOU</span>
                    <span class="badge badge-success float-right p-2" v-else-if="sale"><i class="fas fa-star mr-1"></i> On Sale</span>
                </td>
            </tr><tr class="price-row">
                <td class="item-prices">
                    <span class="item-price text-capitalize text-primary"><i v-if="exclusive" class="spinner-grow text-success exclusive"></i>{{ price }}</span><br />
                    <del v-if="sale" class="">{{ prop('price') | number }}</del>
                </td>
                <td class="pb-2">
                    <div class="form-inline float-right">
                        <button @click.prevent="decrement" class="btn btn-sm btn-info"><i class="fas text-white fa-level-up-alt fa-rotate-180"></i></button>
                        <input type='text' name='quantity' v-model="quantity" class='form-control form-control-sm border-0 text-center font-weight-bold text-info' style="width: 2rem" />
                        <button @click.prevent="increment" class="btn btn-sm btn-info" ><i class="fas text-white fa-level-up-alt"></i></button>
                    </div>
                </td>

            </tr>
        </tbody>
    </table>
</template>

<script>
    export default {
        name: "Item",
        props: ['id'],
        data(){ return { totalShow:false } },
        computed: {
            item(){ return this.$store.getters['ITEMS/item'](this.id) },
            prop(){ return (prop) => _.get(this.item,prop) },
            sale(){ return this.prop('isOnSale') },
            exclusive(){ return this.prop('isExclusive') },
            price(){ return this.prop('sellPrice') },
            quantity(){ return this.$store.getters['CART/itemQuantity'](this.id) },
            amount(){ return this.$store.getters['CART/itemTotal'](this.id) },
            image(){ return this.prop('image') },
        },
        methods: {
            increment(){ this.$store.dispatch('CART/increment',this.id) },
            decrement(){ this.$store.dispatch('CART/decrement',this.id) },
        },
        watch: {
            amount(value){ this.totalShow = true; setTimeout(($vm) => $vm.totalShow = false,2500,this) }
        }
    }
</script>