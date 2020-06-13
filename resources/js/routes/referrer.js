
export const routes = [
    { path: '/', name:'home', component: require("../../components/referrer/Home").default },
    { path: '/profile', name:'profile', component: require("../../components/referrer/Profile").default },
]

export const links = _(routes).map('menu').filter().value();

