
const getRoutes = function(){
    return (!_(SUBSCRIPTIONS).filter(({ status }) => _.includes(['Current','Upcoming'],status)).value().length) ? [
            { path: '/', name: 'home', component: require('./../../components/admin/ExpiredHome').default, menu:'Home' },
            { path: '/customers', name: 'customers' ,component: require('./../../components/admin/Customers').default, menu:'Customers' },
            { path: '/customer/:id', name: 'customer' ,component: require('./../../components/admin/Customer').default, props:true },
            { path: '/password', name: 'password' ,component: require('./../../components/admin/AdminPassword').default },
            { path: '/logo', name: 'logo' ,component: require('./../../components/admin/Logo').default },
            { path: '/categories', name: 'categories' ,component: require('./../../components/admin/Categories').default, menu:'Categories' },
            { path: '/items', name: 'items' ,component: require('./../../components/admin/Items').default, menu:'Items' },
            { path: '/price/update', name: 'price_stock_update' ,component: require('./../../components/admin/PriceStockUpdate').default },
            { path: '/item/update', name: 'item_update' ,component: require('./../../components/admin/ItemUpdate').default, props:true },
            { path: '/report', name: 'report' ,component: require('./../../components/admin/OrderReport').default, menu: 'Report' },
            { path: '/live/cart/:id', name: 'live_cart' ,component: require('./../../components/admin/LiveCart').default, props:true },
            { path: '/' + _.random(1874098,9874098), name: 'expired', component: require('./../../components/admin/AdminHome').default },
        ] : [
            { path: '/', name: 'home', component: require('./../../components/admin/AdminHome').default, menu:'Home' },
            { path: '/categories', name: 'categories' ,component: require('./../../components/admin/Categories').default, menu:'Categories' },
            { path: '/items', name: 'items' ,component: require('./../../components/admin/Items').default, menu:'Items' },
            { path: '/price/update', name: 'price_stock_update' ,component: require('./../../components/admin/PriceStockUpdate').default },
            { path: '/sources', name: 'sources' ,component: require('./../../components/admin/Sources').default, menu: 'Sources' },
            { path: '/source/create', name: 'source_create' ,component: require('./../../components/admin/SourceCreate').default },
            { path: '/source/:id', name: 'source' ,component: require('./../../components/admin/Source').default, props:true },
            { path: '/carts', name: 'carts' ,component: require('./../../components/admin/Carts').default, menu: 'Carts' },
            { path: '/orders', name: 'orders' ,component: require('./../../components/admin/Orders').default, menu: 'Orders' },
            { path: '/cart/:id', name: 'cart' ,component: require('./../../components/admin/CartView').default, props:true },
            { path: '/order/:id', name: 'order' ,component: require('./../../components/admin/Order').default, props:true },
            { path: '/confirms', name: 'confirms' ,component: require('./../../components/admin/Confirms').default, menu: 'Confirms' },
            { path: '/bill/:id', name: 'bill' ,component: require('./../../components/admin/Bill').default, props:true },
            { path: '/live/cart/:id', name: 'live_cart' ,component: require('./../../components/admin/LiveCart').default, props:true },
            { path: '/delivered', name: 'delivered' ,component: require('./../../components/admin/Delivered').default, menu: 'Delivered' },
            { path: '/customers', name: 'customers' ,component: require('./../../components/admin/Customers').default, menu:'Customers' },
            { path: '/customer/:id', name: 'customer' ,component: require('./../../components/admin/Customer').default, props:true },
            { path: '/password', name: 'password' ,component: require('./../../components/admin/AdminPassword').default },
            { path: '/report', name: 'report' ,component: require('./../../components/admin/OrderReport').default, menu: 'Report' },
            { path: '/item/update', name: 'item_update' ,component: require('./../../components/admin/ItemUpdate').default, props:true },
            { path: '/logo', name: 'logo' ,component: require('./../../components/admin/Logo').default },
        ]
    ;
}

export const routes = getRoutes();

export const links = _(routes).map('menu').filter().value();
