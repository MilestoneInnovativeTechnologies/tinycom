<template>
    <b-card header="Setup Pending Companies" v-if="companies.length" class="mb-3">
        <b-table :items="companies" :fields="['id','company','domain','created_at']" small>
            <template v-slot:cell(created_at)="data">{{ data.item.created_at | date }}</template>
        </b-table>
    </b-card>
</template>

<script>
    import { CardPlugin,TablePlugin } from 'bootstrap-vue'
    Vue.use(CardPlugin); Vue.use(TablePlugin);

    export default {
        name: "SetupPendingCompanies",
        computed: {
            companies(){ return _.filter(this.$store.state.COMPANIES.DATA,({ setup }) => setup === 'N') },
        }
    }
</script>