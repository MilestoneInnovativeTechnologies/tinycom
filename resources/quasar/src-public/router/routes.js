import Index from 'pages/Index'
import Profile from 'pages/Profile'
import Cart from 'pages/Cart'
import Category from 'pages/Category'
import Item from 'pages/Item'
import Exclusive from 'pages/Exclusive'
import Error404 from 'pages/Error404'


const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout'),
    children: [
      { path: '', name:'home', component: Index },
      { path: '/profile', name:'profile', component: Profile },
      { path: '/cart', name:'cart', component: Cart },
      { path: '/category/:id/items', name:'category-items', component: Category, props:true },
      { path: '/item/:id', name:'item', component: Item, props:true },
      { path: '/exclusive', name:'exclusive', component: Exclusive },
    ]
  },
  { path: '*', component: Error404 }
]
export default routes
