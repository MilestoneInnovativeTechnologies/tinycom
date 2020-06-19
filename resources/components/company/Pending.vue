<template>
    <div>
        <b-modal id="company-setup-instructions-modal" centered scrollable title="Setup Instructions" hide-footer no-close-on-backdrop><setup-instructions :company="company"></setup-instructions></b-modal>
        <b-modal id="pending-companies-update-modal" centered scrollable title="Update Company" hide-footer no-close-on-backdrop><company-update :id="company" @update="updated"></company-update></b-modal>
        <b-table :items="pending" :fields="fields" small>
            <template v-slot:cell(no)="data">{{ data.index+1 }}</template>
            <template v-slot:cell(actions)="data">
                <b-button size="sm" variant="info" @click.prevent="viewInstruction(data.item)"><b-icon icon="file-text"></b-icon> View Instruction</b-button>
                <b-button size="sm" :disabled="mail_disabled" variant="warning" @click.prevent="mailSetupCompleted(data.item.id)"><b-icon icon="envelope"></b-icon> Send Setup Complete Mail</b-button>
                <b-button size="sm" variant="warning" @click.prevent="updateCompany(data.item.id)"><b-icon icon="pencil-square"></b-icon> Update Company</b-button>
                <b-button size="sm" variant="danger" @click.prevent="deleteCompany(data.item.id)"><b-icon icon="trash"></b-icon> Delete Company</b-button>
            </template>
        </b-table>
    </div>
</template>

<script>
    import {COMPANIES} from "../../js/mixins/companies";

    export default {
        name: "Pending",
        mixins: [COMPANIES],
        data(){ return {
            company: null, mail_disabled: false,
            fields: ['no', { key:'company',label:'Name' },'domain',{ key:'created_at',label:'Added On',formatter:'dateFilter' },{ key:'user',label:'Client',formatter:'clientName' },'actions'],
        } },
        computed: {
            client(){ let clients = this.$store.state.CLIENTS.CLIENTS, index = this.$store.getters["CLIENTS/index"]; return id => _.get(clients,index[id]) }
        },
        methods: {
            dateFilter(value){ return this.$options.filters.date(value) },
            viewInstruction(company){
                this.company = company;
                this.$bvModal.show('company-setup-instructions-modal')
            },
            clientName(id){ return _.get(this.client(id),'name','') },
            mailSetupCompleted(id){ this.mail_disabled = true; this.sendSetupInfoMail(id).then(() => this.mail_disabled = false); },
            deleteCompany(company,confirm){
                if(confirm === undefined) return this.$bvModal.msgBoxConfirm('This is an IRREVERSIBLE action. Are you sure??',{ title:'Delete Company',okVariant:'danger',okTitle:'Delete',size:'sm',cancelVariant:'success' }).then(s => this.deleteCompany(company,s))
                if(confirm) this.$post('company','delete',{ id:company }).then(({ message,variant }) => this.$bvToast.toast(message,{ variant,title:'Delete Company!!' }));
            },
            updateCompany(id){ this.company = id; this.$bvModal.show('pending-companies-update-modal'); },
            updated({ message,variant }){ this.$bvModal.hide('pending-companies-update-modal'); this.$bvToast.toast(message,{ title:'Company Update',variant }) }
        },
        created() {
            if(!this.$store.state.CLIENTS.CLIENTS.length) this.$post('client','fetch');
        }
    }
</script>