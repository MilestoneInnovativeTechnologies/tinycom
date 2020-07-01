<template>
    <b-table :items="companies" small :fields="fields" show-empty :busy="busy" primary-key="id">
        <template v-slot:cell(no)="data">{{ data.index + 1 }}</template>
        <template v-slot:cell(expire)="data">{{ expires[parseInt(data.item.id)] | date }}</template>
        <template v-if="actions" v-slot:cell(actions)="data">
            <b-button v-for="action in actions" :key="'companies-list-action-' + action[0]" :variant="action[2]" size="sm" @click.prevent="$emit(action[0],data.item)"><b-icon v-if="action[3]" :icon="action[3]"></b-icon>{{ action[1] }}</b-button>
        </template>
        <template slot="empty"><h6 class="text-center">{{ empty_text || 'No companies' }}</h6></template>
    </b-table>
</template>

<script>
    export default {
        name: "CompaniesList",
        props: ['companies','busy','actions','empty_text'],
        data(){ return {
            fields: ['no',{ key:'company',label:'Name' },'domain', 'expire', { key:'actions',label:'' }]
        } },
        computed: {
            expires(){ return this.$store.getters["SUBSCRIPTIONS/expires"] }
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
