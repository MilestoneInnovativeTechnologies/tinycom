<template>
    <b-container class="mt-3">
        <div class="d-flex justify-content-between align-items-center mb-3">
            <h5>Companies</h5>
            <b-button @click.prevent="$bvModal.show(modal)" squared variant="info"><b-icon icon="building" class="mr-1"></b-icon> Add</b-button>
        </div>
        <b-card no-body>
            <b-tabs card>
                <b-tab title="All Companies" active>
                    <companies-list :companies="companies" :fields="['#','name','domain','client','since','expire_on','upcoming']" :per_page="per_page" :current_page="current_page"></companies-list>
                    <b-pagination v-model="current_page" :total-rows="companies.length" :per-page="per_page" align="center" size="sm"></b-pagination>
                </b-tab>
                <b-tab title="Newly Added Companies">
                    <companies-list :companies="newly" :fields="['#','name','domain','client','added']" :actions="['update_name']"  :per_page="newly.length" :current_page="1"></companies-list>
                </b-tab>
                <b-tab title="Recently Expiring Companies">
                    <subscription-company-list :items="expiring" :fields="['no','company_name','edition','domain','client','expire','upcoming']" :actions="['subscriptions','unpaid_orders','mail_expiring','add_order']" :per-page="per_page" :current-page="current_page"></subscription-company-list>
                </b-tab>
                <b-tab title="Recently Expired Companies">
                    <subscription-company-list :items="expired" :fields="['no','company_name','edition','domain','client','expired']"  :actions="['subscriptions','unpaid_orders','mail_expired','add_order']" :per-page="per_page" :current-page="current_page"></subscription-company-list>
                </b-tab>
                <b-tab title="Expired & Inactive Companies">
                    <subscription-company-list :items="inactive" :fields="['no','company_name','domain','client','since','expired']" :actions="['subscriptions','unpaid_orders','add_order']" :per-page="per_page" :current-page="current_page"></subscription-company-list>
                </b-tab>
                <b-tab title="Active Companies">
                    <subscription-company-list :items="active" :fields="['no','company_name','edition','domain','client','since','expire','upcoming']" :pagination="true" :actions="['subscriptions','unpaid_orders','update_name','add_order']" :per-page="per_page" :current-page="current_page"></subscription-company-list>
                </b-tab>
            </b-tabs>
        </b-card>
        <b-modal :id="modal" hide-footer title="New Company"><company-form @response="response"></company-form></b-modal>
    </b-container>
</template>

<script>
    import {COMPANIES} from "../../js/mixins/companies";

    export default {
        name: "Companies",
        mixins: [COMPANIES],
        data(){ return {
            current_page:1,per_page:30,modal:'companies-company-create-modal',
            selected: null,
        } },
        computed: {
            companies(){ return this.selected ? this[this.selected] : this.$store.state.COMPANIES.DATA },
        },
        methods: {
            response({ message,variant }){ this.$bvModal.hide(this.modal); this.$bvToast.toast(message,{ title:'Add Company',variant }) },
        }
    }
</script>
