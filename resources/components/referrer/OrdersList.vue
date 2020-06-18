<template>
    <b-container>
        <b-table :items="orders" :fields="fields" small show-empty :empty-text="empty_text">
            <template v-slot:cell(status)="data"><span>{{ data.item.status }}</span>, <a :href="data.item.link" target="_blank">{{ data.item.link }}</a></template>
            <template v-slot:cell(link)="data"><a :href="data.item.link" target="_blank"><b-icon icon="arrow-up-right-square"></b-icon></a></template>
            <template v-slot:cell(date)="data">{{ data.item.date | date }}</template>
            <template v-slot:row-details="data" class="p-0 m-0"><p class="text-muted p-0 m-0">{{ data.item.attributes.description }}</p></template>
            <template v-slot:cell(actions)="data">
                <b-button size="sm" variant="primary" @click="data.toggleDetails"><b-icon icon="arrows-expand"></b-icon> More</b-button>
                <b-button size="sm" v-if="isAct('sms',data.item)" variant="warning" :disabled="sms_disable" @click="notification('sms',data.item.id)"><b-icon icon="inbox-fill"></b-icon> SMS</b-button>
                <b-button size="sm" v-if="isAct('email',data.item)" variant="warning" :disabled="email_disable" @click="notification('email',data.item.id)"><b-icon icon="at"></b-icon> Email</b-button>
            </template>
        </b-table>
    </b-container>
</template>

<script>
    export default {
        name: "OrdersList",
        props: ['orders','busy','actions','empty_text'],
        data(){ return {
            sms_disable: false, email_disable: false, cancel_disable: false,
            d_fields: {
                id: { key:'id',label:'Order ID' },
                name: { key:'company',formatter:'companyName' },
                amount: 'amount',status: 'status', link: 'link', date: 'date',
            },
            p_fields: ['id','name','amount','status'],
            pay_order: null, pay_order_company: null,
        } },
        computed: {
            fields(){ return _.map(this.p_fields,field => this.d_fields[field]).concat('actions') }
        },
        methods: {
            companyName(id){ return _.get(this.$store.state.COMPANIES.DATA,[_.get(this.$store.getters['COMPANIES/index'],id,null),'company'],{}) },
            notification(medium,id){ this[medium + '_disable'] = true; this.$post('order','notify',{ id,medium }).then(() => this[medium + '_disable'] = false) },
            cancel(id,confirm){
                if(!confirm) return this.$bvModal.msgBoxConfirm('This is a irreversible action. Are you sure to cancel this Order',{ title:'Cancel An Order',size:'sm',buttonSize:'sm',okVariant:'danger',okTitle: 'YES - Proceed', cancelTitle:'NO' })
                    .then(status => status ? this.cancel(id,true) : null);
                this.cancel_disable = true;
                this.$post('order','cancel',{ id }).then(({ message,variant }) => { this.cancel_disable = false; this.$bvToast.toast(message, {title: 'Cancel Order', variant}) })
            },
            isAct(action,data){ return this.actions && this.actions.includes(action) && data.status === 'New' }
        },
        created() {
            if(this.$attrs.fields) this.p_fields = this.$attrs.fields;
        }
    }
</script>
