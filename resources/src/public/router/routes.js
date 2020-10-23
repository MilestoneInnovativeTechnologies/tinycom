
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout'),
    children: [
      { path: '', name:'home', component: () => import('pages/Index') },
      { path: '/profile', name:'profile', component: () => import("pages/Profile") },
      { path: '/cart', name:'cart', component: () => import("pages/Cart") },
      { path: '/category/:id/items', name:'category-items', component: () => import("pages/Category"), props:true },
      { path: '/item/:id', name:'item', component: () => import("pages/Item"), props:true },
      // { path: '/exclusive', name:'exclusive', component: require("../../components/public/ExclusiveItems").default },
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404')
  }
]
export default routes
