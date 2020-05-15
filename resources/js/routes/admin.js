
export const links = [
    'Home','Customers','Categories','Items','Orders','Confirms','Delivered','Sources','Carts'
];

export const routes = [
    { path: '/', name: 'home', component: require('./../../components/admin/AdminHome').default },
    { path: '/categories', name: 'categories' ,component: require('./../../components/admin/Categories').default },
    { path: '/items', name: 'items' ,component: require('./../../components/admin/Items').default },
    { path: '/sources', name: 'sources' ,component: require('./../../components/admin/Sources').default },
    { path: '/source/create', name: 'source_create' ,component: require('./../../components/admin/SourceCreate').default },
    { path: '/source/:id', name: 'source' ,component: require('./../../components/admin/Source').default, props:true },
    { path: '/carts', name: 'carts' ,component: require('./../../components/admin/Carts').default },
    { path: '/orders', name: 'orders' ,component: require('./../../components/admin/Orders').default },
    { path: '/cart/:id', name: 'cart' ,component: require('./../../components/admin/CartView').default, props:true },
    { path: '/order/:id', name: 'order' ,component: require('./../../components/admin/Order').default, props:true },
    { path: '/confirms', name: 'confirms' ,component: require('./../../components/admin/Confirms').default },
    { path: '/bill/:id', name: 'bill' ,component: require('./../../components/admin/Bill').default, props:true },
    { path: '/live/cart/:id', name: 'live_cart' ,component: require('./../../components/admin/LiveCart').default, props:true },
    { path: '/delivered', name: 'delivered' ,component: require('./../../components/admin/Delivered').default },
    { path: '/customers', name: 'customers' ,component: require('./../../components/admin/Customers').default },
    { path: '/customer/:id', name: 'customer' ,component: require('./../../components/admin/Customer').default, props:true },
    { path: '/password', name: 'password' ,component: require('./../../components/admin/AdminPassword').default },
]
