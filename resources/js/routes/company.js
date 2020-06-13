
export const routes = [
    { path: '/', name:'home', component: require("../../components/company/Home").default },
    { path: '/profile', name:'profile', component: require("../../components/company/Profile").default },
    { path: '/companies', name:'companies', component: require("../../components/company/Companies").default, children: [
            { path: 'pending', name: 'companies-pending', component: require("../../components/company/Pending").default, meta: { title:'Setup Pending Companies' } },
            { path: 'new', name: 'companies-new', component: require("../../components/company/Newly").default, meta: { title:'Newly Added Companies' } },
            { path: 'expiring', name: 'companies-expiring', component: require("../../components/company/Expiring").default, meta: { title:'Recently Expiring Companies',filter:true } },
            { path: 'expired', name: 'companies-expired', component: require("../../components/company/Expired").default, meta: { title:'Recently Expired Companies',filter:true } },
            { path: 'inactive', name: 'companies-inactive', component: require("../../components/company/Inactive").default, meta: { title:'Expired & Inactive Companies',filter:true } },
            { path: 'active', name: 'companies-active', component: require("../../components/company/Active").default, meta: { title:'Active Companies',filter:true } },
        ], menu: 'Companies' },
    { path: '/clients', name:'clients', component: require("../../components/company/Clients").default, menu:'Clients' },
    { path: '/referrers', name:'referrers', component: require("../../components/company/Referrers").default, menu:'Referrers' },
    { path: '/orders', name:'orders', component: require("../../components/company/Orders").default, menu: 'Orders' },
    { path: '/payments', name:'payments', component: require("../../components/company/Payments").default, menu: 'Payments' },
]

export const links = _(routes).map('menu').filter().value();

