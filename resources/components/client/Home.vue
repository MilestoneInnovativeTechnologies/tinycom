<template>
    <b-container class="mt-3" fluid>
        <div class="d-flex justify-content-between align-items-center mb-3">
            <div><h5>Hi, {{ $store.getters["PROFILE/name"] }}</h5></div>
            <div>
                <new-company-setup class="mb-1"></new-company-setup>
                <new-subscription-order-setup></new-subscription-order-setup>
            </div>
        </div>

        <setup-pending-companies></setup-pending-companies>
        <b-form-row v-for="company in companies" :key="'company-'+company.id" class="mb-3">
            <b-col cols="3">
                <company-info-card :company="company"></company-info-card>
            </b-col>
            <b-col cols="3">
                <company-current-subscription :company="company.id" class="mb-1"></company-current-subscription>
                <company-upcoming-subscription :company="company.id" class="mb-1"></company-upcoming-subscription>
            </b-col>
            <b-col cols="6">
                <company-pending-payments-card :company="company.id" class="mb-1"></company-pending-payments-card>
                <company-previous-payments-card :company="company.id" class="mb-1"></company-previous-payments-card>
            </b-col>
        </b-form-row>
    </b-container>
</template>

<script>
    export default {
        name: "Home",
        data(){ return {
            order: null,
        } },
        computed: {
            companies(){ return _.filter(this.$store.state.COMPANIES.DATA,['setup','N']) },
        },
        methods: {
        }
    }
</script>