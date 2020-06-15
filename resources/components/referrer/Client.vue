<template>
    <b-container>
        <b-card v-if="client">
            <div class="d-flex justify-content-between align-items-center">
                <detail title="Name" icon="person">{{ client.name }}</detail>
                <detail title="Email" icon="at">{{ client.email }}</detail>
                <detail title="Phone" icon="phone">{{ client.phone }}</detail>
                <detail title="Since" icon="clock-history">{{ client.created_at | date }}</detail>
                <b-button size="sm" variant="outline-primary" @click="$bvModal.show(modal)">Add Company</b-button>
            </div>
        </b-card>
        <b-card v-if="client && companies" header="Companies" class="mt-3">
            <companies-list :companies="companies" :fields="['#','name','domain','since','expire_on','upcoming']" :actions="['new_order']" :per_page="companies.length" :current_page="1"></companies-list>
        </b-card>
        <b-card v-if="client && payments" header="Payments" class="mt-3">
            <payments-list :payments="payments" :fields="['#','date','amount','description','status','receipt']" :actions="['sms','email']" :per_page="payments.length" :current_page="1"></payments-list>
        </b-card>
        <b-modal :id="modal" hide-footer title="New Company"><company-form @response="response" :user="id"></company-form></b-modal>
    </b-container>
</template>

<script>
    export default {
        name: "Client",
        props: ['id'],
        data(){ return {
            modal: 'client-company-add',
        } },
        computed: {
            client(){ return _.find(this.$store.state.CLIENTS.CLIENTS,['id',this.id]) },
            companies(){ return _.filter(this.$store.state.COMPANIES.DATA,['user',this.id]) },
            c_companies(){ return _.map(this.companies,({ id }) => _.toInteger(id)); },
            payments(){ return _.filter(this.$store.state.ORDERS.DATA,({ company,status }) => _.includes(this.c_companies,_.toInteger(company)) && _.includes(['New','Paid'],status)) },
        },
        methods: {
            response({ message,variant }){ this.$bvModal.hide(this.modal); this.$bvToast.toast(message,{ title:'Add Company',variant }) },
        }
    }
</script>
