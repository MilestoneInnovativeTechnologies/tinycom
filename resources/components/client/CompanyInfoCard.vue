<template>
    <b-card :title="company.company" :img-src='img_url' :img-height="100" img-top>
        <b-modal :id="name_modal" hide-footer title="Modify Company name"><company-update :id="company.id" @update="$bvModal.hide(name_modal)"></company-update></b-modal>
        <b-modal :id="logo_modal" hide-footer title="Change Company logo"><company-logo :company="company.id" :current="img_url" @logo="logo"></company-logo></b-modal>
        <b-list-group>
            <b-list-group-item>Domain <span class="float-right">{{ company.domain }}</span></b-list-group-item>
            <b-list-group-item>Since <span class="float-right">{{ company.created_at | date }}</span></b-list-group-item>
            <b-list-group-item>Unpaid Orders <b-badge class="float-right p-2" variant="warning">{{ unpaid.length }}</b-badge></b-list-group-item>
            <b-list-group-item>
                <b-button block variant="outline-info" size="sm" @click.prevent="$bvModal.show(name_modal)">Update Name</b-button>
                <b-button block variant="outline-info" size="sm" @click.prevent="$bvModal.show(logo_modal)">Update Logo</b-button>
            </b-list-group-item>
        </b-list-group>
    </b-card>
</template>

<script>
    import { CardPlugin,ListGroupPlugin,BadgePlugin,ModalPlugin } from 'bootstrap-vue'
    Vue.use(CardPlugin); Vue.use(ListGroupPlugin); Vue.use(BadgePlugin); Vue.use(ModalPlugin);

    export default {
        name: "CompanyInfoCard",
        props: ['company'],
        data(){ return {
            img_url: DATA_IMAGES[this.company.id] || "https://i.ibb.co/BqD2r7h/company-profile.jpg",
        } },
        computed: {
            name_modal(){ return 'update_company_' + this.company + '_name' },
            logo_modal(){ return 'update_company_' + this.company + '_logo' },
            orders(){ return this.$store.getters["ORDERS/companies"][this.company.id] },
            unpaid(){ return _.filter(this.orders,['status','New']) },
        },
        methods: {
            logo(url){ this.img_url = url; this.$bvModal.hide(this.logo_modal) }
        }
    }
</script>