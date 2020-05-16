<template>
    <div class="card text-center bg-light" style="max-width: 65vh">
        <div class="card-body p-1">
            <div class="card-title mt-2 font-weight-bolder">TODAY</div>
            <div class="d-flex flex-row">
                <div @click="$router.push({ name:'orders' })" class="jumbotron bg-white mb-0 px-1 py-3 flex-grow-1 text-uppercase"><strong class="font-weight-bolder metric-count">{{ count.Ordered || 0 }}</strong><br><span>ORDER</span></div>
                <div @click="$router.push({ name:'confirms' })" class="jumbotron bg-white mb-0 px-1 py-3 flex-grow-1 text-uppercase mx-1"><strong class="font-weight-bolder metric-count">{{ count.Confirmed || 0 }}</strong><br><span>CONFIRM</span></div>
                <div @click="$router.push({ name:'delivered' })" class="jumbotron bg-white mb-0 px-1 py-3 flex-grow-1 text-uppercase"><strong class="font-weight-bolder metric-count">{{ count.Delivered || 0 }}</strong><br><span>DELIVER</span></div>
            </div>
        </div>
        <div class="card-body text-uppercase font-weight-bolder metric-summary py-2">
            Collection
            <i class="fas fa-rupee-sign fa-fw"></i>
            {{ total }}
        </div>
    </div>
</template>

<script>
    export default {
        name: "OrdersMetric",
        data(){ return {
            statuses: ['Ordered','Confirmed','Delivered']
        } },
        computed: {
            carts(){ return this.$store.getters["CARTS/all"] },
            today(){ return new Date().getDate() },
            group(){ return _.groupBy(this.carts, ({ status,updated_at }) => (_.includes(this.statuses,status) && new Date(updated_at).getDate() === this.today) ? status : '-') },
            count(){ return _.mapValues(this.group,group => group.length) },
            total(){ return _.sumBy(this.group['Delivered'],({ amount }) => _.toNumber(amount)) }
        }
    }
</script>