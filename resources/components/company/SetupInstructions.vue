<template>
    <b-list-group flush>
        <b-list-group-item>Create Subdomain <template v-if="company"><strong>{{ company.domain.split(".")[0] }}</strong> for <strong>{{ company.domain.split(".").slice(1,10).join('.') }}</strong></template></b-list-group-item>
        <b-list-group-item>Create Database <template v-if="company"><strong>{{ company.database }}</strong></template></b-list-group-item>
        <b-list-group-item>Create User <template v-if="company"><strong>{{ company.database_username }}</strong></template></b-list-group-item>
        <b-list-group-item>Assign User <template v-if="company"><strong>{{ company.database_username }}</strong> to database <strong>{{ company.database }}</strong></template> </b-list-group-item>
        <b-list-group-item v-if="setup_url"><a @click.prevent="setup(setup_url)" href="#">Click here</a> to do setup (migration and seeding)</b-list-group-item>
        <b-list-group-item v-if="company && !busy">Send Setup Completed Notification mail to client <a @click.prevent="mail" href="#"> (Click here to mail)</a></b-list-group-item>
    </b-list-group>
</template>

<script>
    import {COMPANIES} from "../../js/mixins/companies";

    export default {
        name: "SetupInstructions",
        mixins: [COMPANIES],
        props: ['company'],
        data(){ return {
            busy: false,
        } },
        computed: {
            setup_url(){
                if(!this.company) return null;
                let token = btoa(JSON.stringify({ company:this.company.id,password:this.company.password,done:SETUP }))
                return 'http://'+this.company.domain+'/setup?token='+token;
            }
        },
        methods: {
            setup(url){ window.open(url,'_blank','height=100,width=100,location=0,menubar=0,resizable=0,scrollbars=0,status=0,titlebar=0,toolbar=0') },
            mail(){ this.busy = true; this.sendSetupInfoMail(this.company.id).then(() => this.busy = false); }
        }
    }
</script>