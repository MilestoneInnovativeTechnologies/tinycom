<template>
    <b-row class="mt-3">
        <b-col cols="3">
            <b-card no-body>
                <template slot="header"><b-badge variant="info" class="mr-2 p-2">{{ companies.length }}</b-badge> Companies <b-button variant="info" class="float-right btn-sm" @click.prevent="$bvModal.show('company-form-modal')"><b-icon icon="person-plus"></b-icon> Add</b-button></template>
                <b-list-group flush>
                    <b-list-group-item class="align-items-center d-flex"><b-icon variant="info" icon="arrows-angle-contract" class="mr-2"></b-icon> Setup Pending <b-badge :to="{ name:'companies-pending' }" variant="info" class="ml-auto p-2">{{ pending.length }}</b-badge></b-list-group-item>
                    <b-list-group-item class="align-items-center d-flex"><b-icon variant="info" icon="arrows-angle-contract" class="mr-2"></b-icon> Newly Added <b-badge :to="{ name:'companies-new' }" variant="info" class="ml-auto p-2">{{ newly.length }}</b-badge></b-list-group-item>
                    <b-list-group-item class="align-items-center d-flex"><b-icon variant="info" icon="diamond-half" class="mr-2"></b-icon> Recently Expiring <b-badge :to="{ name:'companies-expiring' }" variant="info" class="ml-auto p-2">{{ expiring.length }}</b-badge></b-list-group-item>
                    <b-list-group-item class="align-items-center d-flex"><b-icon variant="info" icon="exclude" class="mr-2"></b-icon> Recently Expired <b-badge :to="{ name:'companies-expired' }" variant="info" class="ml-auto p-2">{{ expired.length }}</b-badge></b-list-group-item>
                    <b-list-group-item class="align-items-center d-flex"><b-icon variant="info" icon="eye-slash" class="mr-2"></b-icon> Expired & Inactive <b-badge :to="{ name:'companies-inactive' }" variant="info" class="ml-auto p-2">{{ inactive.length }}</b-badge></b-list-group-item>
                    <b-list-group-item class="align-items-center d-flex"><b-icon variant="info" icon="bounding-box" class="mr-2"></b-icon> Active <b-badge :to="{ name:'companies-active' }" variant="info" class="ml-auto p-2">{{ active.length }}</b-badge></b-list-group-item>
                </b-list-group>
            </b-card>
        </b-col>
        <b-col cols="9">
            <b-card header-class="d-flex align-items-center justify-content-between">
                <template slot="header" v-if="$route.meta.title">
                    {{ $route.meta.title }}
                    <b-input placeholder="Filter" size="sm" class="w-25" v-model="filter" v-if="$route.meta.filter"></b-input>
                </template>
                <transition name="trans" mode="out-in"><keep-alive><router-view :filter="filter"></router-view></keep-alive></transition>
            </b-card>
        </b-col>
        <b-modal id="company-form-modal" centered scrollable title="Add Company" hide-footer no-close-on-backdrop><company-form @response="response"></company-form></b-modal>
        <b-modal id="setup-instructions-modal" centered scrollable title="Setup Instructions" hide-footer no-close-on-backdrop><setup-instructions></setup-instructions></b-modal>
    </b-row>
</template>

<script>
    import { COMPANIES } from "../../js/mixins/companies";

    export default {
        name: "Companies",
        mixins: [COMPANIES],
        data(){ return {
            item: 'company', filter: ''
        } },
        computed: {
            header(){ return _.get(this.$route,['meta','title'],'') }
        },
        methods: {
            response({ error,message,variant }){ this.$bvToast.toast(message,{ variant,title:'Company' }) },
        },
    }
</script>
