<template>
    <div class="card text-center bg-light mx-auto" style="max-width: 65vh">
        <div class="card-body p-1">
            <div class="card-title mt-2 font-weight-bolder">LIVE</div>
            <div class="d-flex flex-row">
                <div class="jumbotron bg-white mb-0 px-1 py-3 w-100 text-uppercase"><strong class="font-weight-bolder metric-count"><i class="fas fa-user-friends fa-fw"></i> {{ customers }}</strong><br><span>CUSTOMER</span></div>
                <div class="jumbotron bg-white mb-0 px-1 py-3 w-100 text-uppercase mx-1"><strong class="font-weight-bolder metric-count">{{ carts }} <i class="fas fa-shopping-cart"></i></strong><br><span>CART</span></div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "LiveMetric",
        computed: {
            carts(){ return _.size(this.$store.getters["CARTS/live"]) },
            customers(){ return _.size(this.$store.getters["CUSTOMERS/live"]) },
        }
    }
</script>