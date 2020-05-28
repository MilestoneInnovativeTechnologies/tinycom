<template>
    <section class="items">
        <div class="modal fade" tabindex="-1" role="dialog" ref="common_stock_modal">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Common Stock</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    </div>
                    <div class="modal-body">
                        <p class="lead"> Update all item's Stock</p>
                        <p class="text-muted">This will update all items stock to this given number.</p>
                        <input type="text" v-model="stock" class="form-control" placeholder="Stock">
                        <button type="button" class="btn btn-warning btn-block mt-2" @click.prevent="commonStock(true)" data-dismiss="modal">Update Stock</button>
                    </div>
                </div>
            </div>
        </div>
        <h5 class="d-flex">
            <span class="mt-1">Items</span>
            <input type="text" class="form-control-sm mx-auto" placeholder="filter" v-model="search">
            <button class="btn btn-outline-primary btn-sm" @click.prevent="commonStock()">Common Stock</button>
        </h5>
        <div class="table-responsive">
            <table class="table table-sm">
                <thead><tr><th>ID</th><th>Price</th><th>Selling</th><th>Stock</th></tr></thead>
                <tbody>
                    <template v-for="id in items" v-if="details[id].status === 'Y'">
                        <tr><td rowspan="2">{{ id }}</td>
                            <th colspan="3">{{ details[id].name }}</th>
                        </tr>
                        <PriceStockUpdateRow :id="id" class="mb-2" />
                    </template>
                </tbody>
            </table>
        </div>
    </section>
</template>

<script>
    export default {
        name: "PriceStockUpdate",
        data(){ return {
            search: '', stock: ''
        } },
        computed: {
            slugs(){ return _.mapValues(this.$store.state.ITEMS.ITEMS, obj => _(obj).values().join(' ').toLowerCase() ) },
            details(){ return _.mapValues(this.$store.state.ITEMS.ITEMS,({ name,status }) => _.zipObject(['name','status'],[name,status])) },
            items(){ if(_.isEmpty(this.search)) return _.keys(this.slugs); let keys = [],search = _.toLower(this.search); _.forEach(this.slugs,(text,id) => (_.includes(text,search)) ? keys.push(id) : null); return keys },
        },
        methods: {
            commonStock(post){ return post ? this.$store.dispatch('ITEMS/stock',this.stock) : $(this.$refs['common_stock_modal']).modal('show'); }
        }
    }
</script>
