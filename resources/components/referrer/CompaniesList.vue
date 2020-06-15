<template>
    <b-container>
        <b-table :items="companies" :fields="fields.concat(actions ? 'actions' : [])" :per-page="per_page" :current-page="current_page">
            <template v-slot:cell(#)="data">{{ data.index+1 }}</template>
            <template v-slot:cell(name)="data">{{ data.item.company }}</template>
            <template v-slot:cell(client)="data">{{ clientName(data.item.user) }}</template>
            <template v-slot:cell(since)="data">{{ data.item.created_at | date }}</template>
            <template v-slot:cell(expire_on)="data">{{ expireDate(data.item.id) | date }}</template>
            <template v-slot:cell(upcoming)="data">{{ upcoming.length ? 'Yes' : 'No' }}</template>
            <template v-slot:cell(actions)="data" v-if="actions">
                <b-button v-if="actions.includes('new_order')" @click.prevent="$bvModal.show(modal_new_order,props.company = data.item.id)" size="sm" variant="outline-warning">New Subscription Order</b-button>
            </template>
        </b-table>
        <b-modal :id="modal_new_order" hide-footer><order-form :company="props.company" @created="new_order"></order-form></b-modal>
    </b-container>
</template>

<script>
    export default {
        name: "CompaniesList",
        props: ['companies','fields','per_page','current_page','actions'],
        data(){ return {
            props: { company:null },
            modal_new_order: 'companies-list-company-new-order-modal-' + Math.random(),
        } },
        computed: {
            clients(){ return _.keyBy(this.$store.state.CLIENTS.CLIENTS,'id') },
            company_subscriptions(){ return _.groupBy(this.$store.state.SUBSCRIPTIONS.DATA,'company') }
        },
        methods: {
            clientName(id){ return _.get(this.clients,[id,'name']) },
            expireDate(id){ return _.get(_.maxBy(_.filter(_.get(this.company_subscriptions,id),['status','Current']),({ end }) => new Date(end).getTime()),'end') },
            upcoming(id){ return _.filter(_.get(this.company_subscriptions,id),['status','Upcoming']) },
            new_order({ message,variant }){ this.$bvToast.toast(message,{ variant,title:'New Order' }); this.$bvModal.hide(this.modal_new_order) }
        }
    }
</script>
