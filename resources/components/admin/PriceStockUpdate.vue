<template>
    <section class="items">
        <h5 class="d-flex"><span class="mt-1">Items</span> <input type="text" class="form-control-sm ml-auto" placeholder="search" v-model="search"></h5>
        <div class="table-responsive">
            <table class="table table-sm">
                <thead><tr><th>ID</th><th>Price</th><th>Selling</th><th>Stock</th></tr></thead>
                <tbody>
                    <template v-for="id in items" v-if="details[id].status === 'Y'">
                        <tr><td rowspan="2">{{ id }}</td>
                            <th colspan="3">{{ details[id].name }}</th>
                        </tr>
                        <ItemUpdateTR :id="id" class="mb-2" />
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
            search: ''
        } },
        computed: {
            slugs(){ return _.mapValues(this.$store.state.ITEMS.ITEMS, obj => _(obj).values().join(' ').toLowerCase() ) },
            details(){ return _.mapValues(this.$store.state.ITEMS.ITEMS,({ name,status }) => _.zipObject(['name','status'],[name,status])) },
            items(){ if(_.isEmpty(this.search)) return _.keys(this.slugs); let keys = [],search = _.toLower(this.search); _.forEach(this.slugs,(text,id) => (_.includes(text,search)) ? keys.push(id) : null); return keys },
        },
    }
</script>

<style>
    td[rowspan] { vertical-align: middle }
</style>