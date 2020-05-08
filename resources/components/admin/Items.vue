<template>
    <section class="items">
        <h5>Items <input type="text" class="form-control-sm float-right" placeholder="search" v-model="search"></h5>
        <div class="table-responsive">
            <table class="table table-sm">
                <thead><tr><th>Image</th><th>Name</th><th>Description</th><th>Price</th><th>Selling</th><th>Stock</th><th>Status</th></tr></thead>
                <tbody>
                    <ItemUpdateTR v-for="id in items" :key="['form','update','item',id].join('-')" :id="id" />
                </tbody>
            </table>
        </div>
    </section>
</template>

<script>
    export default {
        name: "Items",
        data(){ return {
            search: '',
        } },
        computed: {
            slugs(){ return _.mapValues(this.$store.state.ITEMS.ITEMS, obj => _(obj).values().join(' ').toLowerCase() ) },
            items(){ if(_.isEmpty(this.search)) return _.keys(this.slugs); let keys = [],search = _.toLower(this.search); _.forEach(this.slugs,(text,id) => (_.includes(text,search)) ? keys.push(id) : null); return keys }
        }
    }
</script>