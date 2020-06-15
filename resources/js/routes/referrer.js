
export const routes = [
    { path: '/', name:'home', component: require("../../components/referrer/Home").default },
    { path: '/profile', name:'profile', component: require("../../components/referrer/Profile").default },
    { path: '/companies', name:'companies', component: require("../../components/referrer/Companies").default, menu: 'Companies' },
    { path: '/clients', name:'clients', component: require("../../components/referrer/Clients").default, menu: 'Clients', children:[
            { path:':id',props:true,name:'client',component: require("../../components/referrer/Client").default }
        ]},
    { path: '/payments', name:'payments', component: require("../../components/referrer/Payments").default, menu: 'Payments' },
]

export const links = _(routes).map('menu').filter().value();

