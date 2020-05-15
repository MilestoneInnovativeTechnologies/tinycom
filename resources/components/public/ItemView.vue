<template>
    <section class="item-view">
        <div class="card m-lg-auto" style="max-width: 75vh">
            <img v-if="image" :src="image" class="card-img-top" alt="">
            <div class="card-body">
                <h5 class="card-title">{{ item.name }}</h5>
                <p class="card-text">{{ item.description }}</p>
            </div>
            <div class="card-body row" v-if="item.isExclusive || item.isOnSale">
                <div class="col text-success" v-if="item.isOnSale"><i class="fas fa-check-double mr-2"></i> On Sale</div>
                <div class="col text-success" v-if="item.isExclusive"><i class="fas fa-check-double mr-2"></i> Special Price</div>
            </div>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">Price <span class="float-right">{{ price }}</span></li>
                <li class="list-group-item" v-if="item.isOnSale">Selling Price <span class="float-right">{{ price_selling }}  <p class="badge-warning badge p-2" v-if="item.isExclusive">For YOU</p></span></li>
                <li class="list-group-item">Availability <span class="float-right">{{ stock_text }}</span></li>
            </ul>
            <div class="card-body">
                <CartIncrementDecrement class="float-right" :id="id" />
            </div>
        </div>
    </section>
</template>

<script>
    export default {
        name: "ItemView",
        props: ['id'],
        computed: {
            item(){ return this.$store.getters["ITEMS/item"](this.id) },
            image(){ return this.item.image ? imageUrl(this.item.media[0]) : null },
            price(){ return this.item.price },
            price_selling(){ return this.item.selling },
            max(){ return this.$store.state.ITEMS.stock_warn_limit },
            stock_text(){ let left = this.item.left; return (left > this.max) ? 'In Stock' : (left <= 0 ? 'No Stock' : 'Few remaining') }
        }
    }
</script>
