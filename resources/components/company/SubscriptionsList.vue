<template>
    <b-table :items="subscriptions" small :fields="fields" show-empty :busy="busy" primary-key="id">
        <template v-slot:cell(no)="data">{{ data.index + 1 }}</template>
        <template v-if="actions" v-slot:cell(actions)="data">
            <b-button v-for="action in actions" :key="'companies-list-action-' + action[0]" :variant="action[2]" size="sm" @click.prevent="$emit(action[0],data.item)"><b-icon v-if="action[3]" :icon="action[3]"></b-icon>{{ action[1] }}</b-button>
        </template>
        <template slot="empty"><h6 class="text-center">{{ empty_text || 'No any subscriptions' }}</h6></template>
    </b-table>
</template>

<script>
    export default {
        name: "SubscriptionsList",
        props: ['subscriptions','busy','actions','empty_text'],
        data(){ return {
            fields: ['no',{ key:'edition.name',label:'Edition' }, { key:'start',label:'Start Date',formatter:'dateFilter' }, { key:'end',label:'End Date',formatter:'dateFilter' }, 'status' ]
        } },
        methods: {
            dateFilter(value){ return this.$options.filters.date(value) }
        },
        created() {
            if(this.$attrs.fields) this.fields = this.$attrs.fields;
        }
    }

    /*
    * ACTIONS FORMAT
    * [
    *   [name,label,variant,icon]
    * ]
    *
    * */
</script>
