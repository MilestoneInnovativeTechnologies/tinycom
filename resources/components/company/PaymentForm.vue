<template>
    <b-container>
        <b-form-group label-cols="3" label-align="right" label="Select Order" v-if="order_show"><b-form-select v-model="order" required :options="option_orders"></b-form-select></b-form-group>
        <b-form-group label-cols="3" label-align="right" label="Amount"><b-form-input type="number" v-model="amount" readonly required></b-form-input></b-form-group>
        <b-form-file v-model="attachment" placeholder="Choose a receipt" drop-placeholder="Drop file here..."></b-form-file>
        <b-button block variant="info" :disabled="disabled" @click.prevent="submit" class="mt-3">SUBMIT</b-button>
    </b-container>
</template>

<script>
    export default {
        name: "PaymentForm",
        data(){ return {
            fields: ['order','order_reference','amount','attachment'], order_show: true,
            order: null, attachment: null,
            disabled: false,
        } },
        computed: {
            orders(){ return _(this.$store.state.ORDERS.DATA).filter(['status','New']).value() },
            index(){ return _.get(this.$store.getters["ORDERS/index"],this.order) },
            option_orders(){ return _(this.orders).map(({ id,attributes }) => _.zipObject(['value','text'],[id,attributes.description])).value() },
            order_reference(){ return this.order ? _.get(this.$store.state.ORDERS.DATA,[this.index,'reference'],null) : null },
            amount(){ return this.order ? _.get(this.$store.state.ORDERS.DATA,[this.index,'amount'],0) : 0 },
        },
        methods: {
            post(){ let fd = new FormData; _.forEach(this.fields,field => fd.append(field,this[field])); return fd },
            submit(){ this.disabled = true; this.$post('payment','manual',this.post()).then(this.submitted) },
            submitted(payment){ this.disabled = false; this.$emit('submitted',payment) }
        },
        created() {
            if(!_.size(this.option_orders)) this.$post('order','fetch');
            if(this.$attrs.order){ this.order = this.$attrs.order; this.order_show = false; }
        }
    }
</script>
