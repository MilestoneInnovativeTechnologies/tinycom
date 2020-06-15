<template>
    <b-container class="mt-3">
        <b-row>
            <b-col cols="3">
                <b-card no-body header="Clients">
                    <b-list-group flush>
                        <b-list-group-item v-if="clients.length > 15"><b-input placeholder="Filter Client" v-model="filter"></b-input></b-list-group-item>
                        <b-list-group-item class="d-flex justify-content-between align-items-center" v-for="client in filtered" :key="'clients-client-list-client-'+client.id">{{ client.name }}<b-link :to="{ name:'client',params:{ id:client.id } }"><b-icon icon="arrow-right-circle"></b-icon></b-link></b-list-group-item>
                    </b-list-group>
                </b-card>
            </b-col>
            <b-col cols="9">
                <div class="clearfix justify-content-end mb-3"><b-button @click.prevent="$bvModal.show(modal)" squared variant="info" class="float-right"><b-icon icon="building" class="mr-1"></b-icon> Add</b-button></div>
                <transition name="trans" mode="out-in"><keep-alive><router-view></router-view></keep-alive></transition>
            </b-col>
        </b-row>
        <b-modal :id="modal" title="New Client" hide-footer><client-form @response="response"></client-form></b-modal>
    </b-container>
</template>

<script>
    export default {
        name: "Clients",
        data(){ return {
            modal: 'client-clint-add-modal', filter: ''
        } },
        computed: {
            clients(){ return this.$store.state.CLIENTS.CLIENTS },
            filtered(){ return this.filter ? _.filter(this.clients,({ name,email,phone }) => [name,email,phone].join(' ').toLowerCase().includes(this.filter.toLowerCase())) : this.clients }
        },
        methods: {
            response({ message,variant }){ this.$bvModal.hide(this.modal); this.$bvToast.toast(message,{ title:'Adding New Client',variant }) }
        }
    }
</script>
