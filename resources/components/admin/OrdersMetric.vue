<template>
    <div class="card text-center bg-light mx-auto" style="max-width: 65vh">
        <div class="card-body p-1">
            <div class="card-title mt-2 font-weight-bolder">TODAY</div>
            <div class="d-flex flex-row">
                <div class="jumbotron bg-white mb-0 px-1 py-3 flex-grow-1 text-uppercase"><strong class="font-weight-bolder metric-count">{{ carts.length || 0 }}</strong><br><span>ORDER</span></div>
                <div class="jumbotron bg-white mb-0 px-1 py-3 flex-grow-1 text-uppercase mx-1"><strong class="font-weight-bolder metric-count">{{ confirmed || 0 }}</strong><br><span>CONFIRM</span></div>
                <div class="jumbotron bg-white mb-0 px-1 py-3 flex-grow-1 text-uppercase"><strong class="font-weight-bolder metric-count">{{ delivered || 0 }}</strong><br><span>DELIVER</span></div>
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
            consider: ['Ordered','Confirmed','Delivered'],
            today: new Date().getDate()
        } },
        computed: {
            carts(){ return _.filter(this.$store.getters["CARTS/all"],({ status,updated_at }) => new Date(updated_at).getDate() === this.today && _.includes(this.consider,status)) },
            group(){ return _.groupBy(this.carts,'status') },
            delivered(){ return _.get(this.group,'Delivered',[]).length; },
            confirmed(){ return _.get(this.group,'Confirmed',[]).length + this.delivered; },
            total(){ return _.sumBy(_.get(this.group,'Delivered',[{ amount:0 }]),({ amount }) => _.toNumber(amount)) }
        }
    }
</script>