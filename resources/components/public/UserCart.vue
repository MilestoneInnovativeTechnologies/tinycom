<template>
    <section class="user-cart mt-3">
        <div class="card user-cart mx-sm-auto" style="max-width: 65vh">
            <div class="card-header"> <div class="card-title mb-0">Cart Items</div></div>
            <img v-if="src" :src="src" class="card-img-top">
            <div class="card-body"><UserCartItems /></div>
            <div class="card-footer">
                <button class="btn btn-primary text-right" @click.prevent="$router.go(-1)"><i class="fas fa-chevron-left"></i> Shop</button>
                <button class="btn btn-primary float-right" @click.prevent="confirm">Place Order <i class="fas fa-chevron-right"></i></button>
            </div>
        </div>
    </section>
</template>

<script>
    export default {
        name: "UserCart",
        computed: {
            images(){ return this.$store.getters['CART/images'] },
            src(){ return _.sample(this.images) }
        },
        methods: {
            confirm(){ return this.$store.commit('MISC/alterModal') }
        }
    }
</script>