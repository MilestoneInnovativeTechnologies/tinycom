const routeMaster = {
  home: { path: '/', name: 'home', component: () => import('pages/Home'), icon:'dashboard', menu:'Home' },
  categories: { path: '/categories', name: 'categories' ,component: () => import('pages/Categories'), icon:'widgets', menu:'Categories', meta:{ title:'Categories' } },
  items: { path: '/items', name: 'items' ,component: () => import('pages/Items'), icon:'category', menu:'Items', meta:{ title:'Items' } },
  item: { path: '/item/:id', name: 'item' ,component: () => import('pages/Item'), props:true },
  stock: { path: '/update', name: 'stock' ,component: () => import('pages/Stock'), meta:{ title:'Stock & Price Update' } },
  sources: { path: '/sources', name: 'sources' ,component: () => import('pages/Sources'), icon:'insert_link', menu: 'Sources', meta:{ title:'Sources' } },
  source_create: { path: '/source/create', name: 'source_create' ,component: () => import('pages/SourceCreate'), meta:{ title:'Create Source' } },
  source: { path: '/source/:id', name: 'source' ,component: () => import('pages/Source'), props:true, meta:{ title:'Source Details' } },
  carts: { path: '/carts', name: 'carts' ,component: () => import('pages/Carts'), icon:'store', menu: 'Carts', meta:{ title:'Carts' } },
  cart: { path: '/cart/:id', name: 'cart' ,component: () => import('pages/Cart'), props:true, meta:{ title:'Cart Details' } },
  orders: { path: '/orders', name: 'orders' ,component: () => import('pages/Orders'), icon:'shopping_cart', menu: 'Orders', meta:{ title:'Pending Orders' } },
  order: { path: '/order/:id', name: 'order' ,component: () => import('pages/Order'), props:true, meta:{ title:'Order Details' } },
  confirmed: { path: '/confirmed', name: 'confirmed' ,component: () => import('pages/Confirmed'), icon:'shopping_basket', menu: 'Confirmed', meta:{ title:'Delivery Pending' } },
  bill: { path: '/bill/:id', name: 'bill' ,component: () => import('pages/Bill'), props:true, meta:{ title:'Bill Details' } },
  delivered: { path: '/delivered', name: 'delivered' ,component: () => import('pages/Delivered'), icon:'local_shipping', menu: 'Delivered', meta:{ title:'Delivered Orders' } },
  customers: { path: '/customers', name: 'customers' ,component: () => import('pages/Customers'), icon:'recent_actors', menu:'Customers', meta:{ title:'Customers' } },
  customer: { path: '/customer/:id', name: 'customer' ,component: () => import('pages/Customer'), props:true },
  report: { path: '/report', name: 'report' ,component: () => import('pages/Report'), icon:'menu_book', menu: 'Report' },
  password: { path: '/password', name: 'password' ,component: () => import('pages/Password'), icon:'lock_open', menu: 'Password', meta: { title: 'Change Password' } },
  logo: { path: '/logo', name: 'logo' ,component: () => import('pages/Logo'), icon:'add_photo_alternate', menu: 'Logo', meta: { title: 'Change Logo' } },
  expired: { path: '/' + (parseInt(Math.random()*1000000)), name: 'home', component: () => import('pages/Expired') },
  live: { path: '/live/:id', name: 'live' ,component: () => import('pages/Live'), props:true },
}

const { home,customers,customer,logo,categories,items,stock,item,report,live,expired,password } = routeMaster;
const expiredRoutes = { home:{ ...home,name:'expired',path:expired.path },customers,customer,categories,items,stock,item,report,live,password,logo,expired:{ ...expired,path:'/' } };


const routes = [
  {
    path: '/', component: () => import('layouts/MainLayout'),
    children: getRoutes()
  },
  { path: '*', component: () => import('pages/Error404') }
]
export default routes
export const links = getRoutes().map(({ menu,icon }) => menu ? new Object({ menu,icon }) : null).filter(a => a);


function getRoutes(){
  return (SUBSCRIPTIONS.filter(({ status }) => status === 'Current' || status === 'Upcoming').length)
    ? Object.values(routeMaster)
    : Object.values(expiredRoutes)
}
