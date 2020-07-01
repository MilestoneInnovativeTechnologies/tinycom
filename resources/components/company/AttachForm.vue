<template>
    <b-container>
        <b-form-group label-cols="3" label-align="right" label="Date"><b-form-input :value="details.date" readonly required></b-form-input></b-form-group>
        <b-form-group label-cols="3" label-align="right" label="Amount"><b-form-input type="number" :value="details.amount" readonly required></b-form-input></b-form-group>
        <b-form-file v-model="attachment" placeholder="Choose the Attachment" drop-placeholder="Select file..."></b-form-file>
        <b-button block variant="info" :disabled="disabled" @click.prevent="submit" class="mt-3">SUBMIT</b-button>
    </b-container>
</template>

<script>
    export default {
        name: "AttachForm",
        props: ['id'],
        data(){ return {
            disabled:false, attachment: [],
        } },
        computed: {
            details(){ return _.find(this.$store.state.PAYMENTS.DATA,['id',this.id]) },
        },
        methods: {
            post(){ let fd = new FormData; _.forEach(['id','attachment'],field => fd.append(field,this[field])); return fd },
            submit(){ this.disabled = true; this.$post('payment','attachment',this.post()).then(this.submitted) },
            submitted(payment){ this.disabled = false; this.$emit('submitted',payment) }
        }
    }
</script>
