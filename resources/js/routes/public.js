
export const routes = [
    { path: '/', name:'home', component: require("../../components/public/PublicHome").default },
    { path: '/profile', name:'profile', component: require("../../components/public/Profile").default },
    { path: '/cart', name:'cart', component: require("../../components/public/UserCart").default },
    { path: '/exclusive', name:'exclusive', component: require("../../components/public/ExclusiveItems").default },
    { path: '/category/:id/items', name:'category-items', component: require("../../components/public/CategoryItems").default, props:true },
    { path: '/item/:id', name:'item', component: require("../../components/public/ItemView").default, props:true },
]
