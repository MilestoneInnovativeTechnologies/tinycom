<template>
    <b-container class="mt-3">
        <div class="d-flex justify-content-between align-items-center mb-3">
            <h5>Companies</h5>
            <b-button @click.prevent="$bvModal.show(modal)" squared variant="info"><b-icon icon="building" class="mr-1"></b-icon> Add</b-button>
        </div>
        <companies-list :companies="companies" :fields="['#','name','domain','client','since','expire_on','upcoming']" :per-page="per_page" :current-page="current_page"></companies-list>
        <b-pagination v-model="current_page" :total-rows="companies.length" :per-page="per_page" align="center" size="sm"></b-pagination>
        <b-modal :id="modal" hide-footer title="New Company"><company-form @response="response"></company-form></b-modal>
    </b-container>
</template>

<script>
    export default {
        name: "Companies",
        data(){ return { current_page:1,per_page:30,modal:'companies-company-create-modal' } },
        computed: {
            companies(){ return this.$store.state.COMPANIES.DATA },
        },
        methods: {
            response({ message,variant }){ this.$bvModal.hide(this.modal); this.$bvToast.toast(message,{ title:'Add Company',variant }) },
        }
    }
</script>
