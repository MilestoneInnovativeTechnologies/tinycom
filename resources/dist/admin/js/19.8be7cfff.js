(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[19],{"713b":function(e,t,a){"use strict";a.r(t);var i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("q-layout",{attrs:{view:"hHh lpR fFf"}},[a("q-header",{staticClass:"bg-primary text-white",attrs:{reveal:"",elevated:""}},[a("q-toolbar",[a("q-btn",{attrs:{dense:"",flat:"",round:"",icon:"menu"},on:{click:e.drawDrawer}}),a("q-toolbar-title",[e._v(e._s(e.title))])],1)],1),a("q-drawer",{attrs:{"show-if-above":"",mini:e.miniState,"mini-to-overlay":"",width:256,breakpoint:128,bordered:"","content-class":"bg-grey-1"},model:{value:e.drawer,callback:function(t){e.drawer=t},expression:"drawer"}},[a("q-list",{staticClass:"text-primary",attrs:{separator:""}},[e._l(e.links,(function(t,i){return a("q-item",{directives:[{name:"ripple",rawName:"v-ripple"}],key:"layout-link-"+i,attrs:{clickable:"",to:{name:e.snakeCase(t.menu)}}},[a("q-item-section",{attrs:{avatar:""}},[a("q-icon",{attrs:{name:t.icon}})],1),a("q-item-section",[a("q-item-label",[e._v(e._s(t.menu))])],1)],1)})),a("q-item",{directives:[{name:"ripple",rawName:"v-ripple"}],staticClass:"text-negative",attrs:{clickable:"",tag:"a",href:e.LOGOUT}},[a("q-item-section",{attrs:{avatar:""}},[a("q-icon",{attrs:{name:"logout"}})],1),a("q-item-section",[a("q-item-label",[e._v("Logout")])],1)],1)],2)],1),a("q-page-container",[a("keep-alive",{attrs:{exclude:"PageItemUpdate,PageSourceCreate,PageCustomer,PageReport",max:15}},[a("router-view")],1),a("Subscription")],1)],1)},r=[],n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return e.remain<e.limit?a("q-card",{staticClass:"text-negative bg-light text-center",attrs:{square:""}},[a("q-card-section",[e.remain<0?a("div",[e._v("Your subscriptions expired.."),a("br"),e._v("Features limited.."),a("br"),e._v("All services will be stopped soon!!")]):a("div",[e._v("\n      "+e._s(e.edition)+" Edition - Ony "+e._s(e.remain)+" Day"+e._s(e.remain>1?"s":"")+" Remaining!\n      "),e.remain<e.alert?[a("br"),e._v("Services will be limited if not renewed"),0===e.remain?[e._v(" by today")]:e._e(),e._v(".\n      ")]:e._e()],2)])],1):e._e()},s=[],o=(a("26e9"),a("4e82"),{name:"Subscription",data(){return{limit:15,warn:7,alert:3,SUBSCRIPTIONS:SUBSCRIPTIONS}},computed:{end(){return _(this.SUBSCRIPTIONS).sort((({end:e})=>new Date(e).getTime())).map("end").reverse().first()},remain(){return this.end?_.floor((new Date(this.end).getTime()-(new Date).getTime())/864e5):0},edition(){return _.get(_(this.SUBSCRIPTIONS).find(["status","Current"]),["edition","name"])}}}),l=o,c=a("2877"),m=a("f09f"),d=a("a370"),u=a("eebe"),p=a.n(u),v=Object(c["a"])(l,n,s,!1,null,null,null),w=v.exports;p()(v,"components",{QCard:m["a"],QCardSection:d["a"]});const b=a("d046").links;var h={components:{Subscription:w},data(){return{links:b,drawer:!0,miniState:!0,COMPANY:COMPANY,LOGOUT:LOGOUT}},computed:{title(){return this.$route.meta.title||COMPANY}},methods:{drawDrawer(){return this.drawer?this.drawer&&this.miniState?this.miniState=!1:void(this.drawer&&!this.miniState&&(this.drawer=this.miniState=!1)):this.drawer=this.miniState=!0},snakeCase(e){return _.snakeCase(e)}}},S=h,g=a("4d5a"),q=a("e359"),f=a("65c6"),C=a("9c40"),k=a("6ac5"),O=a("9404"),Q=a("1c1c"),I=a("66e5"),T=a("4074"),y=a("0016"),P=a("0170"),x=a("09e3"),N=a("714f"),R=Object(c["a"])(S,i,r,!1,null,null,null);t["default"]=R.exports;p()(R,"components",{QLayout:g["a"],QHeader:q["a"],QToolbar:f["a"],QBtn:C["a"],QToolbarTitle:k["a"],QDrawer:O["a"],QList:Q["a"],QItem:I["a"],QItemSection:T["a"],QIcon:y["a"],QItemLabel:P["a"],QPageContainer:x["a"]}),p()(R,"directives",{Ripple:N["a"]})}}]);