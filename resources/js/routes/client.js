
export const routes = [
    { path: '/', name:'home', component: require("../../components/client/Home").default },
    { path: '/profile', name:'profile', component: require("../../components/client/Profile").default },
]

export const links = _(routes).map('menu').filter().value();

