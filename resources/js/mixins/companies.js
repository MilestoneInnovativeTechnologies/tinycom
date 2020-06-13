export const COMPANIES = {
    data(){ return {
        time: {
            expiring: new Date().getTime() + (14*24*60*60*1000),
            r_expired: new Date().getTime() - (14*24*60*60*1000),
            r_new: new Date().getTime() - (3*24*60*60*1000),
        }
    } },
    computed: {
        companies(){ return this.$store.state.COMPANIES.DATA },
        subscriptions(){ return this.$store.state.SUBSCRIPTIONS.DATA },
        orders(){ return this.$store.state.ORDERS.DATA },

        has_upcoming(){ return (r_company) => _.some(this.subscriptions,({ company,status }) => (status === 'Upcoming' && company == r_company)) },
        has_current(){ return (r_company) => _.some(this.subscriptions,({ company,status }) => (status === 'Current' && company == r_company)) },

        pending(){ return _.filter(this.companies,({ setup }) => setup === 'N') },
        expiring(){ return _.filter(this.subscriptions,({ end,status,company }) => status === 'Current' && (new Date(end).getTime() < this.time.expiring) && !this.has_upcoming(company)) },
        expired(){ return _.filter(this.subscriptions,({ end,status,company }) => status === 'Expired' && (new Date(end).getTime() > this.time.r_expired) && !this.has_current(company)) },
        inactive(){ return _.filter(this.subscriptions,({ end,status,company }) => status === 'Expired' && (new Date(end).getTime() < this.time.r_expired) && !this.has_current(company)) },
        active(){ return _.filter(this.subscriptions,({ status }) => status === 'Current') },
        upcoming(){ return _.filter(this.subscriptions,({ status }) => status === 'Upcoming') },
        newly(){ return _.filter(this.companies,({ setup,created_at }) => setup === 'Y' && new Date(created_at).getTime() > this.time.r_new) },

        company_subscriptions(){ return this.$store.getters['SUBSCRIPTIONS/companies'] },
        company_orders(){ return this.$store.getters['ORDERS/companies'] },
    },
    methods: {
        sendSetupInfoMail(company){ return new Promise(resolve => this.$post('company','sendSetupMail',{ company }).then(({ message,variant }) => resolve(this.$bvToast.toast(message,{ variant,title:'Setup Info' })) )) },
        changeReferrer(company,referrer){ return new Promise(resolve => this.$post('company','referrer',{ company,referrer }).then(({ message,variant }) => resolve(this.$bvToast.toast(message,{ variant,title:'Change Referrer' })) )) },
        sendExpiringInfoMail(subscription){ return new Promise(resolve => this.$post('subscription','sendExpiringMail',{ subscription }).then(({ message,variant }) => resolve(this.$bvToast.toast(message,{ variant,title:'Subscription Expiring' })) )) },
        sendExpiredInfoMail(subscription){ return new Promise(resolve => this.$post('subscription','sendExpiredMail',{ subscription }).then(({ message,variant }) => resolve(this.$bvToast.toast(message,{ variant,title:'Subscription Expired' })) )) },
    },
    created() {
        if(!this.companies.length) this.$post('company','fetch');
        if(!this.subscriptions.length) this.$post('subscription','all');
        if(!this.orders.length) this.$post('order','fetch');
    }

}