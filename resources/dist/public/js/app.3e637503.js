(function(t){function e(e){for(var s,n,o=e[0],l=e[1],c=e[2],m=0,d=[];m<o.length;m++)n=o[m],Object.prototype.hasOwnProperty.call(i,n)&&i[n]&&d.push(i[n][0]),i[n]=0;for(s in l)Object.prototype.hasOwnProperty.call(l,s)&&(t[s]=l[s]);u&&u(e);while(d.length)d.shift()();return a.push.apply(a,c||[]),r()}function r(){for(var t,e=0;e<a.length;e++){for(var r=a[e],s=!0,n=1;n<r.length;n++){var l=r[n];0!==i[l]&&(s=!1)}s&&(a.splice(e--,1),t=o(o.s=r[0]))}return t}var s={},i={1:0},a=[];function n(t){return o.p+"js/"+({}[t]||t)+"."+{2:"84d0d16e"}[t]+".js"}function o(e){if(s[e])return s[e].exports;var r=s[e]={i:e,l:!1,exports:{}};return t[e].call(r.exports,r,r.exports,o),r.l=!0,r.exports}o.e=function(t){var e=[],r=i[t];if(0!==r)if(r)e.push(r[2]);else{var s=new Promise((function(e,s){r=i[t]=[e,s]}));e.push(r[2]=s);var a,l=document.createElement("script");l.charset="utf-8",l.timeout=120,o.nc&&l.setAttribute("nonce",o.nc),l.src=n(t);var c=new Error;a=function(e){l.onerror=l.onload=null,clearTimeout(m);var r=i[t];if(0!==r){if(r){var s=e&&("load"===e.type?"missing":e.type),a=e&&e.target&&e.target.src;c.message="Loading chunk "+t+" failed.\n("+s+": "+a+")",c.name="ChunkLoadError",c.type=s,c.request=a,r[1](c)}i[t]=void 0}};var m=setTimeout((function(){a({type:"timeout",target:l})}),12e4);l.onerror=l.onload=a,document.head.appendChild(l)}return Promise.all(e)},o.m=t,o.c=s,o.d=function(t,e,r){o.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},o.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},o.t=function(t,e){if(1&e&&(t=o(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(o.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var s in t)o.d(r,s,function(e){return t[e]}.bind(null,s));return r},o.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return o.d(e,"a",e),e},o.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},o.p="",o.oe=function(t){throw console.error(t),t};var l=window["webpackJsonp"]=window["webpackJsonp"]||[],c=l.push.bind(l);l.push=e,l=l.slice();for(var m=0;m<l.length;m++)e(l[m]);var u=c;a.push([0,0]),r()})({0:function(t,e,r){t.exports=r("2f39")},"0e92":function(t,e,r){"use strict";r.r(e);r("ddb0");var s=r("2b0e");const i={SOURCE:SOURCE,url:{fetch:"/source/fetch"}},a={has({SOURCE:{items:t}}){return e=>void 0===e?_.keys(t).length:_.has(t,_.toInteger(e))},get({SOURCE:{items:t}}){return e=>_.get(t,e,null)}},n={setSource(t,{uuid:e,items:r}){s["a"].set(t.SOURCE,"uuid",e),s["a"].set(t.SOURCE,"items",{}),_.forEach(r,((e,r)=>s["a"].set(t.SOURCE.items,_.toNumber(r),_.toNumber(e))))}},o={fetch({state:t,commit:e}){$.post(t.url.fetch).then((({data:t})=>t?e("setSource",t):null))}};e["default"]={state:i,getters:a,mutations:n,actions:o,namespaced:!0}},"0f9a":function(t,e,r){"use strict";r.r(e);r("e6cf");const s={USER:USER,url:{login:"/user/login",logout:"/user/logout",update:"/user/update"}},i={},a={setUser(t,{id:e,name:r,phone:s}){t.USER=Object.assign({},t.USER,{id:e,name:r,phone:s})},delUser(t){t.USER=null}},n={login({state:t,commit:e,dispatch:r},s){return new Promise((i=>{$.post(t.url.login,s).then((({data:t})=>{e("setUser",t),r("SOURCE/fetch",null,{root:!0}),i(t)}))}))},logout({state:t,commit:e}){$.post(t.url.logout).then((t=>e("delUser")))},update({state:t,commit:e},r){return new Promise((s=>{$.post(t.url.update,r).then((({data:t})=>{_.isString(t)||e("setUser",t),s(t)}))}))}};e["default"]={state:s,getters:i,mutations:a,actions:n,namespaced:!0}},1357:function(t,e,r){"use strict";(function(t){r("e6cf");var s=r("44f1");t._=r("2ef0"),e["a"]=async({Vue:t})=>{_.forEach(s["a"],((e,r)=>t.filter(r,e)))}}).call(this,r("c8ba"))},"1d5b":function(t,e,r){"use strict";r.r(e);r("e01a"),r("fb6a"),r("e6cf");var s=r("2b0e");const i={ITEMS:ITEMS,toNumber:["price","selling","stock"],stock_warn_limit:5,last:null,url:{sync:"/item/sync",create:"/admin/item/create",fetch:"/admin/item/fetch",stock:"/admin/item/stock"},timeout:18e4,fetch:null},a={ITEM_CATEGORIES(t,e,r){let i={};return _(r.CATEGORIES.CATEGORY_ITEMS).forEach(((t,e)=>_.forEach(t,(t=>{t=_.toInteger(t),e=_.toInteger(e),_.has(i,t)||s["a"].set(i,t,[]),_.includes(i[t])||i[t].push(e)})))),i},all({ITEMS:t,toNumber:e},{isOnSale:r,sellPrice:s,image:i,isExclusive:a,left:n}){return _.mapValues(t,(t=>Object.assign({},t,{isOnSale:r(t.id),sellPrice:s(t.id),image:i(t.id),isExclusive:a(t.id),left:_.get(n,t.id)},_.zipObject(e,_.map(e,(e=>_.toNumber(_.get(t,e))))))))},item(t,{all:e}){return t=>_.get(e,_.toInteger(t),_.get(e,t,null))},left({ITEMS:t},e,{CART:r}){let s=_(t).keyBy((({id:t})=>_.toInteger(t))).mapValues((({stock:t})=>_.toNumber(t))).value(),i=r?_(r.items).keyBy((({item:t})=>_.toInteger(t))).mapValues((({quantity:t})=>_.toInteger(t))).value():{};return _.mapValues(s,((t,e)=>t-_.get(i,e,0)))},image({ITEMS:t}){return e=>{let{media:r}=_.get(t,e),s=!r||_.isEmpty(r)?null:r[0];return s?imageUrl(s):null}},isOnSale({ITEMS:t}){return e=>{let{price:r,selling:s}=_.get(t,e);return r=_.toNumber(r),s=_.toNumber(s),0!==s&&s!==r&&s<r}},isExclusive(t,e,r,s){return s["SOURCE/has"]||(()=>!1)},exclusivePrice(t,e,r,s){return s["SOURCE/get"]||(()=>null)},sellPrice({ITEMS:t},{isOnSale:e,isExclusive:r,exclusivePrice:s}){return i=>{let a=t[i],n=r(i)?s(i):e(i)?_.get(a,"selling"):_.get(a,"price");return _.toNumber(n)}},getLast({ITEMS:t,last:e}){return e||_.maxBy(t,(({updated_at:t})=>new Date(t).getTime()))},getLatest({ITEMS:t}){let e=_(t).sortBy((({updated_at:t})=>new Date(t).getTime())).map("id").value(),r=e.length;return t=>t?e.slice(r-_.toInteger(t),r):e},slugs({ITEMS:t}){return _.mapValues(t,(({name:t,description:e})=>_.toLower(t)+" "+_.toLower(e)))}},n={fetch(t,e){s["a"].set(t,"fetch",e)},update(t,e){if(!e||!e.id)return;let r=_.toInteger(e.id);s["a"].set(t.ITEMS,r,e)},setLast(t,e){s["a"].set(t,"last",e)},add(t,e){if(!e||!e.id)return;s["a"].set(t.ITEMS,_.toInteger(e.id),e);let r=_.get(e,"categories");if(_.isEmpty(r))return;_.map(r,(({id:t})=>_.toInteger(t))),_.toInteger(e.id)},stock(t,e){e=_.toInteger(e),_.forEach(t.ITEMS,((r,i)=>s["a"].set(t.ITEMS[i],"stock",e)))}},o={init({state:t,dispatch:e,commit:r}){r("fetch",_.debounce(_.bind(e,null,"fetch"),3500,{leading:!0})),setTimeout((()=>setTimeout((t=>t("sync")),t.timeout,e)))},fetch({state:t,commit:e},r){$.post(t.url.fetch,{id:r}).then((t=>t&&t.id?e("replace",t):null))},sync({state:t,dispatch:e,commit:r}){$.post(t.url.sync).then((({data:t})=>{t&&t.length&&_.forEach(t,(t=>r("update",t)))})).catch((()=>null)).then((()=>setTimeout((t=>t("sync")),t.timeout,e)))},create({state:t,commit:e},r){return new Promise((s=>$.post(t.url.create,r).then((({data:t})=>{e("add",t),s(t)}))))},stock({state:t,commit:e},r){let s=new FormData;return s.append("stock",r),new Promise((r=>$.post(t.url.stock,s).then((({data:t})=>e("stock",_.toInteger(t),{temp:r(t)})))))},update({commit:t,state:e,getters:r},s){if(!s||!s.id)return;let i=_.toInteger(s.id),a=r.ITEM_CATEGORIES[i];if(_.forEach(a,(e=>t("CATEGORIES/removeItem",{item:i,category:e},{root:!0}))),t("update",s),s.categories&&!_.isEmpty(s.categories)){let e=_.map(s.categories,(({id:t})=>_.toInteger(t)));_.forEach(e,(e=>t("CATEGORIES/addItem",{item:i,category:e},{root:!0})))}}};e["default"]={state:i,getters:a,mutations:n,actions:o,namespaced:!0}},2834:function(t,e,r){"use strict";r.r(e);const s={BUNDLES:BUNDLES},i={},a={},n={};e["default"]={state:s,getters:i,mutations:a,actions:n,namespaced:!0}},"2f39":function(t,e,r){"use strict";r.r(e);r("e6cf"),r("5319"),r("7d6e"),r("e54f"),r("4848"),r("c382"),r("985d"),r("31cd");var s=r("2b0e"),i=r("1f91"),a=r("42d2"),n=r("b05d");s["a"].use(n["a"],{config:{},lang:i["a"],iconSet:a["a"]});var o=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{attrs:{id:"q-app"}},[r("router-view")],1)},l=[],c={name:"App"},m=c,u=r("2877"),d=Object(u["a"])(m,o,l,!1,null,null,null),p=d.exports,h=r("2f62");s["a"].use(h["a"]);var g=function(){const t=new h["a"].Store({modules:{CATEGORIES:r("fd2e").default,ITEMS:r("1d5b").default,BUNDLES:r("2834").default,CART:r("499b").default,USER:r("0f9a").default,SOURCE:r("0e92").default},strict:!1});return t},f=r("8c4f"),v=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("q-page",{attrs:{padding:""}},[r("q-input",{attrs:{outlined:"",dense:"",placeholder:"Search.."},scopedSlots:t._u([{key:"prepend",fn:function(){return[r("q-icon",{attrs:{name:"search"}})]},proxy:!0}]),model:{value:t.filter,callback:function(e){t.filter=e},expression:"filter"}}),t.filter?r("ItemList",{attrs:{items:t.filter_items,title:"Search Results"}}):r("div",[t.exclusive.length?r("ItemList",{staticClass:"q-mt-xs",attrs:{more:"exclusive",title:"Exclusive Items",items:t.exclusive,limit:t.exclusive_nos}}):t._e(),t.latest_items.length?r("ItemList",{staticClass:"q-mt-xs",attrs:{title:"Latest Items",items:t.latest_items,limit:t.latest}}):t._e(),t.categories.length>1?r("CategoriesList",{staticClass:"q-mt-xs"}):t._e(),r("ItemList",{staticClass:"q-mt-xs",attrs:{items:t.other_items,limit:t.categories.length>1?8:t.other_items.length}})],1)],1)},y=[],b=(r("fb6a"),r("ddb0"),function(){var t=this,e=t.$createElement,r=t._self._c||e;return t.items?r("div",[t.title?r("div",{staticClass:"text-h6 text-primary q-my-sm"},[t._v(t._s(t.title)+" "),t.more?r("q-btn",{staticStyle:{"text-decoration":"underline"},attrs:{to:{name:t.more},label:"View More",flat:"",size:"sm"}}):t._e()],1):t._e(),r("div",{staticClass:"row q-col-gutter-xs"},t._l(t.items.slice(0,t.limit||5),(function(t){return r("div",{key:"item-list-item"+t,staticClass:"col-12 col-sm-6 col-md-4 col-lg-3"},[r("item",{attrs:{id:t}})],1)})),0)]):t._e()}),q=[],I=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("q-card",[r("q-card-section",{attrs:{horizontal:""}},[r("q-card-section",{staticClass:"col-5 flex flex-center q-py-xs",on:{click:function(e){return t.$router.push({name:"item",params:{id:t.id}})}}},[r("q-img",{staticClass:"rounded-borders",attrs:{src:t.image,height:"5rem"}})],1),r("q-card-section",{staticClass:"q-pa-xs q-pb-md text-primary fit row wrap flex-center",staticStyle:{"min-height":"7rem"}},[r("div",{staticClass:"col-12 q-pt-sm",staticStyle:{height:"3rem","line-height":"1.25"},style:t.prop("name").length>35?{fontSize:"0.8rem"}:{},on:{click:function(e){return t.$router.push({name:"item",params:{id:t.id}})}}},[t.sale||t.exclusive?r("div",{staticClass:"float-right",staticStyle:{"margin-top":"-0.5rem"}},[t.exclusive?r("q-chip",{staticClass:"exclusive_chip",attrs:{size:"0.75rem"}},[r("q-spinner-hearts",{staticClass:"q-mr-xs"}),t._v("For You")],1):t.sale?r("q-chip",{staticClass:"on_sale_chip",attrs:{size:"0.75rem"}},[r("q-spinner-pie",{staticClass:"q-mr-xs"}),t._v("On Sale")],1):t._e()],1):t._e(),t._v("\n        "+t._s(t.prop("name"))+"\n      ")]),r("div",{staticClass:"col-grow",on:{click:function(e){return e.preventDefault(),t.$router.push({name:"item",params:{id:t.id}})}}},[r("span",{staticStyle:{"font-size":"1.1rem"}},[t._v(t._s(t._f("number")(t.price)))]),t.exclusive?r("q-spinner-rings",{attrs:{color:"primary"}}):t._e(),t.sale||t.exclusive?r("del",{staticClass:"block text-grey",staticStyle:{"line-height":"0.4"}},[t._v(t._s(t._f("number")(t.prop("price"))))]):t._e()],1),r("div",{staticClass:"bottom-row q-pr-sm text-center"},[r("ItemStockWarn",{attrs:{id:t.id}}),r("CartIncrementDecrement",{attrs:{id:t.id}})],1)])],1)],1)},E=[],S=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",[r("q-btn",{attrs:{icon:"remove",dense:"",color:"primary",unelevated:"",size:"sm"},on:{click:function(e){return e.preventDefault(),t.decrement(e)}}}),r("a",{staticClass:"text-center inline-block text-weight-bolder",staticStyle:{width:"30px"}},[t._v(t._s(t.quantity))]),r("q-btn",{attrs:{icon:"add",dense:"",color:"primary",unelevated:"",size:"sm",disable:t.disabled},on:{click:function(e){return e.preventDefault(),t.increment(e)}}})],1)},C=[],x={name:"CartIncrementDecrement",props:["id"],computed:{quantity(){return this.$store.getters["CART/itemQuantity"](this.id)},disabled(){return _.toInteger(_.get(this.$store.getters["ITEMS/left"],_.toInteger(this.id)))<=0}},methods:{increment(){this.$store.dispatch("CART/increment",this.id)},decrement(){this.$store.dispatch("CART/decrement",this.id)}}},T=x,w=r("9c40"),O=r("eebe"),R=r.n(O),k=Object(u["a"])(T,S,C,!1,null,null,null),$=k.exports;R()(k,"components",{QBtn:w["a"]});var Q=function(){var t=this,e=t.$createElement,r=t._self._c||e;return t.warn?r("span",{staticClass:"text-red-14 q-ml-sm font-weight-bolder"},[r("q-icon",{attrs:{name:"add_shopping_cart",size:"1.1rem"}}),t._v(" "+t._s(t.left)+" left")],1):t._e()},P=[],A={name:"ItemStockWarn",props:["id"],computed:{left(){return _.toInteger(_.get(this.$store.getters["ITEMS/left"],_.toInteger(this.id)))},max(){return this.$store.state.ITEMS.stock_warn_limit},warn(){return this.left<=this.max}}},M=A,U=r("0016"),L=Object(u["a"])(M,Q,P,!1,null,null,null),B=L.exports;R()(L,"components",{QIcon:U["a"]});var j={name:"Item",components:{ItemStockWarn:B,CartIncrementDecrement:$},props:["id"],data(){return{totalShow:!1}},computed:{item(){return this.$store.getters["ITEMS/item"](this.id)},sale(){return this.prop("isOnSale")},exclusive(){return this.prop("isExclusive")},price(){return this.prop("sellPrice")},quantity(){return this.$store.getters["CART/itemQuantity"](this.id)},image(){return this.prop("image")}},methods:{increment(){this.$store.dispatch("CART/increment",this.id)},decrement(){this.$store.dispatch("CART/decrement",this.id)},prop(t){return _.get(this.item,t,"")}}},G=j,N=r("f09f"),D=r("a370"),z=r("068f"),V=r("b047"),Y=r("71b3"),F=r("163c"),X=r("792f"),H=Object(u["a"])(G,I,E,!1,null,null,null),W=H.exports;R()(H,"components",{QCard:N["a"],QCardSection:D["a"],QImg:z["a"],QChip:V["a"],QSpinnerHearts:Y["a"],QSpinnerPie:F["a"],QSpinnerRings:X["a"]});var J={name:"ItemList",components:{Item:W},props:["items","title","limit","more"]},K=J,Z=Object(u["a"])(K,b,q,!1,null,null,null),tt=Z.exports;R()(Z,"components",{QBtn:w["a"]});var et=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("q-card",{staticClass:"q-mx-auto",staticStyle:{"max-width":"65vh"}},[r("q-card-section",[r("div",{staticClass:"text-h6 text-primary"},[t._v("Available Categories")])]),r("q-list",t._l(t.list,(function(e){return r("div",[r("q-item",{directives:[{name:"ripple",rawName:"v-ripple"}],attrs:{clickable:"",to:{name:"category-items",params:{id:e.id}}}},[r("q-item-section",{attrs:{avatar:""}},[r("q-avatar",{attrs:{rounded:""}},[r("img",{attrs:{src:t.image(e.media)}})])],1),r("q-item-section",[r("q-item-label",[t._v(t._s(e.name))]),e.description?r("q-item-label",{attrs:{caption:"",lines:"2"}},[t._v(t._s(e.description))]):t._e()],1)],1),r("q-separator",{attrs:{inset:"true"}})],1)})),0)],1)},rt=[],st={name:"CategoriesList",computed:{list(){return this.$store.state.CATEGORIES.CATEGORIES}},methods:{image(t){return t.length?imageUrl(t[0]):null}}},it=st,at=r("1c1c"),nt=r("66e5"),ot=r("4074"),lt=r("cb32"),ct=r("0170"),mt=r("eb85"),ut=r("714f"),dt=Object(u["a"])(it,et,rt,!1,null,null,null),pt=dt.exports;R()(dt,"components",{QCard:N["a"],QCardSection:D["a"],QList:at["a"],QItem:nt["a"],QItemSection:ot["a"],QAvatar:lt["a"],QItemLabel:ct["a"],QSeparator:mt["a"]}),R()(dt,"directives",{Ripple:ut["a"]});var ht={name:"PageIndex",components:{CategoriesList:pt,ItemList:tt},data(){return{filter:"",exclusive_nos:8,latest:8}},computed:{filter_items(){return this.filter?_(this.slugs).map(((t,e)=>_.includes(t,_.toLower(this.filter))?_.toInteger(e):null)).filter().value():[]},items(){return _(this.$store.getters["ITEMS/all"]).keys().map(_.toInteger).value()},exclusive(){return _(this.$store.state.SOURCE.SOURCE.items).keys().map(_.toInteger).intersection(this.items).value()},latest_items(){return _.difference(_.map(this.$store.getters["ITEMS/getLatest"](),_.toInteger)||[],this.exclusive.slice(0,this.exclusive_nos))},other_items(){return _.difference(this.items,this.exclusive.slice(0,this.exclusive_nos),this.latest_items.slice(0,this.latest))},slugs(){return this.$store.getters["ITEMS/slugs"]},categories(){return _.keys(this.$store.state.CATEGORIES.CATEGORIES)}}},gt=ht,_t=r("9989"),ft=r("27f9"),vt=Object(u["a"])(gt,v,y,!1,null,null,null),yt=vt.exports;R()(vt,"components",{QPage:_t["a"],QInput:ft["a"],QIcon:U["a"]});var bt=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("q-page",{attrs:{padding:""}},[t.user?r("q-card",{attrs:{flat:""}},[r("q-card-section",[r("div",{staticClass:"text-h6"},[t._v("Profile Update")])]),r("q-card-section",{staticClass:"q-pt-none"},[r("q-input",{attrs:{label:"Name",color:"primary",autofocus:""},model:{value:t.name,callback:function(e){t.name=e},expression:"name"}}),r("q-input",{attrs:{label:"Phone",color:"primary",type:"number"},model:{value:t.phone,callback:function(e){t.phone=e},expression:"phone"}})],1),r("q-card-actions",[t.text?r("div",{staticClass:"text-negative text-center full-width"},[t._v(t._s(t.text))]):t._e(),r("q-btn",{attrs:{color:"primary",label:"Back to Shop",padding:"sm lg",to:{name:"home"}}}),r("q-space"),r("q-btn",{attrs:{color:"primary",label:"Update",padding:"sm lg",loading:t.processing},on:{click:t.update}})],1)],1):r("q-card",{attrs:{flat:""}},[r("q-card-section",[r("div",{staticClass:"text-h6"},[t._v("Login")])]),r("q-card-section",{staticClass:"q-pt-none"},[r("q-input",{attrs:{label:"Phone",color:"primary",autofocus:"",type:"number"},model:{value:t.phone,callback:function(e){t.phone=e},expression:"phone"}})],1),r("q-card-actions",{attrs:{align:"right"}},[t.text?r("div",{staticClass:"text-caption q-mr-md"},[t._v(t._s(t.text))]):t._e(),r("q-btn",{attrs:{color:"primary",label:"Login",padding:"sm lg",loading:t.processing},on:{click:t.login}})],1)],1)],1)},qt=[],It={name:"PageProfile",data(){let t=_.get(this.$store.state.USER,["USER","name"]),e=_.get(this.$store.state.USER,["USER","phone"]);return{name:t,phone:e,processing:!1,text:"",msg:"Processing... Please wait!!"}},methods:{login(){if(this.processing=!0,!this.phone)return this.text="Phone is mandatory fields. Please fill!",void(this.processing=!1);this.$store.dispatch("USER/login",{phone:this.phone}).then((t=>{this.name=_.get(t,"name"),this.phone=_.get(t,"phone"),this.processing=!1,this.text=""}))},update(){if(this.processing=!0,!this.phone)return this.text="Phone is mandatory fields. Please fill!",void(this.processing=!1);this.$store.dispatch("USER/update",{name:this.name,phone:this.phone}).then((t=>{_.isString(t)?this.process(t):this.text="Updated successfully!!",setTimeout((()=>{this.text=""}),2e3),this.processing=!1}))},logout(){location.href=location.origin+"/user/logout"}},computed:{user(){return this.$store.state.USER.USER}},beforeDestroy(){this.processing=!1},watch:{processing(t){t&&setTimeout((t=>t.processing=!1),5e3,this)}}},Et=It,St=r("4b7e"),Ct=r("2c91"),xt=Object(u["a"])(Et,bt,qt,!1,null,null,null),Tt=xt.exports;R()(xt,"components",{QPage:_t["a"],QCard:N["a"],QCardSection:D["a"],QInput:ft["a"],QCardActions:St["a"],QBtn:w["a"],QSpace:Ct["a"]});var wt=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("q-page",{attrs:{padding:""}},[r("q-card",{staticClass:"q-mx-auto",staticStyle:{"max-width":"65vh"},attrs:{flat:""}},[r("img",{attrs:{src:t.src}}),r("CartItems"),r("q-card-section",{staticClass:"bg-grey-2"},[r("div",{staticClass:"text-center text-primary"},[r("div",{staticClass:"text-h4 font-weight-bolder"},[t._v(t._s(t.total))]),r("div",{staticClass:"body font-weight-bolder"},[t._v("TOTAL AMOUNT")])])]),r("q-card-actions",{},[r("q-btn",{attrs:{label:"Back to Shop",color:"primary",to:{name:"home"}}}),r("q-space"),t.user?r("q-btn",{attrs:{label:"Place Order",color:"primary"},on:{click:function(e){return t.trigger(!0)}}}):r("q-btn",{attrs:{label:"Login to Order",color:"primary",to:{name:"profile"}}})],1)],1),t.user?r("q-dialog",{attrs:{persistent:""},model:{value:t.ordered.trigger,callback:function(e){t.$set(t.ordered,"trigger",e)},expression:"ordered.trigger"}},[r("q-card",[r("q-card-section",{staticClass:"bg-grey-2"},[r("div",{staticClass:"text-h6"},[t._v("Confirm Order Details")])]),r("q-card-section",[r("div",{staticClass:"text-bold"},[t._v("Your order will be placed and a representative will call you to confirm delivery address.")])]),r("q-separator"),r("q-card-section",[t._v("\n        Please confirm the below details are correct and belongs to you, Delivery and billing will be done on these details."),r("br"),r("br"),r("strong",[t._v("Name: ")]),t._v(t._s(t.user.name)),r("br"),r("strong",[t._v("Phone: ")]),t._v(t._s(t.user.phone)),r("br")]),r("q-card-actions",{attrs:{align:"right"}},[r("q-btn",{attrs:{color:"primary",label:"Back",disable:t.ordered.status},on:{click:t.cancel}}),r("q-btn",{attrs:{color:"primary",label:"Confirm",loading:t.ordered.status},on:{click:t.order}})],1)],1)],1):t._e(),t.user?r("q-dialog",{attrs:{persistent:""},model:{value:t.response,callback:function(e){t.response=e},expression:"response"}},[t.ordered.error?r("q-card",[r("q-card-section",{staticClass:"bg-grey-2"},[r("div",{staticClass:"text-h6 text-negative"},[t._v("Error")])]),r("q-card-section",[r("div",{staticClass:"text-bold"},[t._v("There is some error in placing your order. Please try again!!"),r("hr"),r("strong",[t._v("Server Response: ")]),t._v(t._s(t.ordered.message))])]),r("q-card-actions",[r("q-btn",{staticClass:"full-width",attrs:{color:"primary",label:"Restart Shopping"},on:{click:function(e){return t.move("start")}}})],1)],1):r("q-card",[r("q-card-section",{staticClass:"bg-grey-2"},[r("div",{staticClass:"text-h6"},[t._v("Ordered Submitted Successfully")])]),r("q-card-section",[r("div",{staticClass:"text-bold"},[t._v("Thank you for the trust in us. Your order placed successfully!!. Our representative will call you soon if required..")])]),r("q-card-actions",[r("q-btn",{staticClass:"full-width",attrs:{color:"primary",label:"Continue Shopping"},on:{click:function(e){return t.move("start")}}})],1)],1)],1):t._e()],1)},Ot=[],Rt=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("q-list",{attrs:{separator:""}},t._l(t.items,(function(e,s){return r("q-item",{key:"cart-item-"+s,staticClass:"q-py-md",attrs:{clickable:""}},[r("q-item-section",[r("q-item-label",{staticClass:"font-weight-bold text-primary",staticStyle:{"font-size":"1.1rem"}},[t._v(t._s(t.name(e.item)))]),r("q-item-label",{staticClass:"row"},[r("div",{staticClass:"col-2"},[t._v(t._s(e.price))]),r("div",{staticClass:"col-7"},[t._v("X "),r("q-badge",{attrs:{color:"dark"}},[t._v(t._s(e.quantity))])],1),r("div",{staticClass:"col-3 font-weight-bold text-primary",staticStyle:{"font-size":"1.1rem"}},[t._v(t._s(e.amount))])])],1),r("q-item-section",{staticClass:"q-gutter-xs",attrs:{side:""}},[r("q-btn",{staticClass:"q-py-xs q-px-none",attrs:{color:"primary",size:"xs",disable:t.disabled(e.item),icon:"add"},on:{click:function(r){return r.preventDefault(),t.increment(e.item)}}}),r("q-btn",{staticClass:"q-py-xs q-px-none",attrs:{color:"primary",size:"xs",icon:"remove"},on:{click:function(r){return r.preventDefault(),t.decrement(e.item)}}})],1)],1)})),1)},kt=[],$t={name:"CartItems",computed:{items(){return this.$store.state.CART.items},details(){return this.$store.getters["CART/details"]},name(){return t=>_.get(this.details,[t,"name"])},desc(){return t=>_.get(this.details,[t,"description"])},total(){return this.$store.getters["CART/total"]},disabled(){return t=>_.toInteger(_.get(this.$store.getters["ITEMS/left"],_.toInteger(t)))<=0}},methods:{increment(t){this.$store.dispatch("CART/increment",t)},decrement(t){this.$store.dispatch("CART/decrement",t)}}},Qt=$t,Pt=r("58a8"),At=Object(u["a"])(Qt,Rt,kt,!1,null,null,null),Mt=At.exports;R()(At,"components",{QList:at["a"],QItem:nt["a"],QItemSection:ot["a"],QItemLabel:ct["a"],QBadge:Pt["a"],QBtn:w["a"]});var Ut={name:"PageCart",components:{CartItems:Mt},data(){return{response:!1}},computed:{images(){return this.$store.getters["CART/images"]},src(){return _.first(this.images)},total(){return this.$store.getters["CART/total"]},user(){return this.$store.state.USER.USER},ordered(){return this.$store.state.CART.ordered}},methods:{trigger(t){this.$store.commit("CART/trigger",void 0===t||t,{root:!0})},order(){this.$store.dispatch("CART/order").then((t=>{this.trigger(!1),this.response=!0}))},move(t){return this.response=!1,"start"===t?window.location.href=location.origin+"/r":this.$router.push({name:"home"})},cancel(){this.response=!1,this.trigger(!1)}}},Lt=Ut,Bt=r("24e8"),jt=Object(u["a"])(Lt,wt,Ot,!1,null,null,null),Gt=jt.exports;R()(jt,"components",{QPage:_t["a"],QCard:N["a"],QCardSection:D["a"],QCardActions:St["a"],QBtn:w["a"],QSpace:Ct["a"],QDialog:Bt["a"],QSeparator:mt["a"]});var Nt=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("q-page",{attrs:{padding:""}},[r("q-btn",{staticClass:"q-mb-sm",attrs:{padding:"sm md",size:"sm",dense:"",color:"warning",to:{name:"home"}}},[r("q-icon",{attrs:{name:"reply_all",left:""}}),t._v("Browse all")],1),r("ItemList",{attrs:{items:t.display,limit:t.limit}})],1)},Dt=[],zt={name:"PageCategory",components:{ItemList:tt},data(){return{filter:"",limit:40}},props:["id"],computed:{category(){return this.$store.state.CATEGORIES.CATEGORIES[this.id]},items(){return this.$store.getters["CATEGORIES/items"](this.id)},slugs(){return _.pick(this.$store.getters["ITEMS/slugs"],this.items)},result(){return _(this.slugs).map(((t,e)=>_.includes(t,_.toLower(this.filter))?_.toInteger(e):null)).filter().value()},display(){return _.intersection(this.items,this.result)}}},Vt=zt,Yt=Object(u["a"])(Vt,Nt,Dt,!1,null,null,null),Ft=Yt.exports;R()(Yt,"components",{QPage:_t["a"],QBtn:w["a"],QIcon:U["a"]});var Xt=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("q-page",{attrs:{padding:""}},[r("q-btn",{staticClass:"q-mb-sm",attrs:{padding:"sm md",size:"sm",dense:"",color:"warning",to:{name:"home"}}},[r("q-icon",{attrs:{name:"reply_all",left:""}}),t._v("Browse all")],1),r("ItemView",{attrs:{id:t.id}})],1)},Ht=[],Wt=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("q-card",{staticClass:"my-card"},[t.image?r("q-img",{attrs:{src:t.image,basic:""}},[r("div",{staticClass:"absolute-bottom text-h6"},[t._v(t._s(t.item.name))])]):t._e(),t.item.description?r("q-card-section",{staticClass:"q-pt-sm"},[t._v(t._s(t.item.description))]):t._e(),r("q-card-actions",{attrs:{align:"right"}},[r("q-chip",{attrs:{"text-color":"white",color:"primary",size:"md",icon:"widgets"}},[t._v(" "+t._s(t.stock_text))]),t.item.isExclusive?r("q-chip",{staticClass:"exclusive_chip",attrs:{icon:"favorite",label:"Special Price"}}):t._e(),t.item.isOnSale?r("q-chip",{staticClass:"on_sale_chip",attrs:{icon:"star_rate",label:"On Sale"}}):t._e()],1),r("q-separator"),r("q-list",[r("q-item",{directives:[{name:"ripple",rawName:"v-ripple"}],attrs:{clickable:""}},[r("q-item-section",{attrs:{avatar:""}},[r("q-icon",{attrs:{color:"primary",name:"payments"}})],1),r("q-item-section",[r("q-item-label",[t._v("Price")])],1),r("q-item-section",{staticStyle:{"font-size":"1.2rem"},attrs:{side:""}},[t._v(t._s(t.price))])],1),r("q-separator",{attrs:{inset:"true"}}),t.item.isOnSale?[r("q-item",{directives:[{name:"ripple",rawName:"v-ripple"}],attrs:{clickable:""}},[r("q-item-section",{attrs:{avatar:""}},[r("q-icon",{attrs:{color:"primary",name:"local_offer"}})],1),r("q-item-section",[r("q-item-label",[t._v("Selling Price")])],1),r("q-item-section",{staticStyle:{"font-size":"1.2rem"},attrs:{side:""}},[t._v(t._s(t.price_selling))])],1),r("q-separator",{attrs:{inset:"true"}})]:t._e(),t.item.isExclusive?[r("q-item",{directives:[{name:"ripple",rawName:"v-ripple"}],attrs:{clickable:""}},[r("q-item-section",{attrs:{avatar:""}},[r("q-icon",{attrs:{color:"primary",name:"favorite"}})],1),r("q-item-section",[r("q-item-label",[t._v("Exclusive Price")])],1),r("q-item-section",{staticStyle:{"font-size":"1.2rem"},attrs:{side:""}},[t._v(t._s(t.price_special))])],1),r("q-separator",{attrs:{inset:"true"}})]:t._e(),r("q-item",{directives:[{name:"ripple",rawName:"v-ripple"}],attrs:{clickable:""}},[r("q-item-section",{attrs:{avatar:""}},[r("q-icon",{attrs:{color:"primary",name:"widgets"}})],1),r("q-item-section",[r("q-item-label",[t._v("Availability")])],1),r("q-item-section",{attrs:{side:""}},[t._v(t._s(t.stock_text))])],1),r("q-separator",{attrs:{inset:"true"}}),r("q-item",[r("q-item-section",[r("q-item-label")],1),r("q-item-section",{attrs:{side:""}},[r("CartIncrementDecrement",{attrs:{id:t.id}})],1)],1)],2)],1)},Jt=[],Kt={name:"ItemView",components:{CartIncrementDecrement:$},props:["id"],computed:{item(){return this.$store.getters["ITEMS/item"](this.id)},image(){return this.item.image?imageUrl(this.item.media[0]):null},price(){return this.item.price},price_selling(){return this.item.selling},price_special(){return this.item.sellPrice},max(){return this.$store.state.ITEMS.stock_warn_limit},stock_text(){let t=this.item.left;return t>this.max?"In Stock":t<=0?"No Stock":"Few remaining"}}},Zt=Kt,te=Object(u["a"])(Zt,Wt,Jt,!1,null,null,null),ee=te.exports;R()(te,"components",{QCard:N["a"],QImg:z["a"],QCardSection:D["a"],QCardActions:St["a"],QChip:V["a"],QSeparator:mt["a"],QList:at["a"],QItem:nt["a"],QItemSection:ot["a"],QIcon:U["a"],QItemLabel:ct["a"]}),R()(te,"directives",{Ripple:ut["a"]});var re={name:"PageItem",components:{ItemView:ee},props:["id"]},se=re,ie=Object(u["a"])(se,Xt,Ht,!1,null,null,null),ae=ie.exports;R()(ie,"components",{QPage:_t["a"],QBtn:w["a"],QIcon:U["a"]});var ne=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("q-page",{attrs:{padding:""}},[r("q-input",{attrs:{outlined:"",dense:"",placeholder:"Search.."},scopedSlots:t._u([{key:"prepend",fn:function(){return[r("q-icon",{attrs:{name:"search"}})]},proxy:!0}]),model:{value:t.filter,callback:function(e){t.filter=e},expression:"filter"}}),t.exclusive.length?r("ItemList",{staticClass:"q-mt-xs",attrs:{items:t.items,limit:t.exclusive.length}}):t._e(),r("q-btn",{staticClass:"q-mt-xs full-width",attrs:{color:"primary",label:(t.exclusive.length?"":"NO ANY EXCLUSIVE ITEMS FOUND, ")+"SHOP ALL",to:{name:"home"},icon:"reply_all"}})],1)},oe=[],le={name:"PageExclusive",components:{ItemList:tt},data(){return{filter:""}},computed:{exclusive(){return _.keys(this.$store.state.SOURCE.SOURCE.items)},slugs(){return _.pick(this.$store.getters["ITEMS/slugs"],this.exclusive)},filter_items(){return this.filter?_(this.slugs).map(((t,e)=>_.includes(t,_.toLower(this.filter))?e:null)).filter().value():this.exclusive},items(){return _.intersection(this.filter_items,this.exclusive)}}},ce=le,me=Object(u["a"])(ce,ne,oe,!1,null,null,null),ue=me.exports;R()(me,"components",{QPage:_t["a"],QInput:ft["a"],QIcon:U["a"],QBtn:w["a"]});var de=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"fullscreen bg-blue text-white text-center q-pa-md flex flex-center"},[r("div",[r("div",{staticStyle:{"font-size":"30vh"}},[t._v("\n      404\n    ")]),r("div",{staticClass:"text-h2",staticStyle:{opacity:".4"}},[t._v("\n      Oops. Nothing here...\n    ")]),r("q-btn",{staticClass:"q-mt-xl",attrs:{color:"white","text-color":"blue",unelevated:"",to:"/",label:"Go Home","no-caps":""}})],1)])},pe=[],he={name:"Error404"},ge=he,_e=Object(u["a"])(ge,de,pe,!1,null,null,null),fe=_e.exports;R()(_e,"components",{QBtn:w["a"]});const ve=[{path:"/",component:()=>Promise.all([r.e(0),r.e(2)]).then(r.bind(null,"713b")),children:[{path:"",name:"home",component:yt},{path:"/profile",name:"profile",component:Tt},{path:"/cart",name:"cart",component:Gt},{path:"/category/:id/items",name:"category-items",component:Ft,props:!0},{path:"/item/:id",name:"item",component:ae,props:!0},{path:"/exclusive",name:"exclusive",component:ue}]},{path:"*",component:fe}];var ye=ve;s["a"].use(f["a"]);var be=function(){const t=new f["a"]({scrollBehavior(t,e,r){return r||{x:0,y:0}},routes:ye,mode:"hash",base:""});return t},qe=async function(){const t="function"===typeof g?await g({Vue:s["a"]}):g,e="function"===typeof be?await be({Vue:s["a"],store:t}):be;t.$router=e;const r={router:e,store:t,render:t=>t(p),el:"#q-app"};return{app:r,store:t,router:e}},Ie=r("9483");Object(Ie["a"])("service-worker.js",{ready(){},registered(){},cached(){},updatefound(){},updated(){},offline(){},error(){}});var Ee=r("1357"),Se=r("758b");/iPad|iPhone|iPod/.test(navigator.userAgent)&&!window.MSStream&&window.navigator.standalone&&r.e(0).then(r.t.bind(null,"a0db",7));const Ce="";async function xe(){const{app:t,store:e,router:r}=await qe();let i=!1;const a=t=>{i=!0;const e=Object(t)===t?r.resolve(t).route.fullPath:t;window.location.href=e},n=window.location.href.replace(window.location.origin,""),o=[Ee["a"],Se["default"]];for(let c=0;!1===i&&c<o.length;c++)if("function"===typeof o[c])try{await o[c]({app:t,router:r,store:e,Vue:s["a"],ssrContext:null,redirect:a,urlPath:n,publicPath:Ce})}catch(l){return l&&l.url?void(window.location.href=l.url):void console.error("[Quasar] boot error:",l)}!0!==i&&new s["a"](t)}xe()},"31cd":function(t,e,r){},"44f1":function(t,e,r){"use strict";r("5319");e["a"]={number(t){return _.toNumber(t)},date(t){if(!t)return"";let e=_.keyBy(new Intl.DateTimeFormat("en",{year:"numeric",month:"short",day:"2-digit",hour:"numeric",minute:"numeric",hour12:!0}).formatToParts(new Date(t)),"type");return"[day]/[month]/[year]".replace(/\[(\w+)\]/g,((t,r)=>_.get(e,[r,"value"])))},time(t){if(!t)return"";let e=_.keyBy(new Intl.DateTimeFormat("en",{year:"numeric",month:"short",day:"2-digit",hour:"numeric",minute:"numeric",hour12:!0}).formatToParts(new Date(t)),"type");return"[hour]:[minute] [dayPeriod]".replace(/\[(\w+)\]/g,((t,r)=>_.get(e,[r,"value"])))}}},"499b":function(t,e,r){"use strict";r.r(e);r("a434"),r("e6cf");var s=r("2b0e");const i={uuid:"",items:[],url:{sync:"/cart/sync",order:"/cart/order"},sync:null,timeout:45e3,ordered:{status:!1,error:null,message:"",trigger:!1}},a={itemQuantity({items:t}){return e=>_.get(_.find(t,["item",_.toInteger(e)]),"quantity",0)},itemTotal({items:t}){return e=>_.get(_.find(t,["item",_.toInteger(e)]),"amount",0)},total({items:t}){return _.sumBy(t,"amount")},itemsCount({items:t}){return t.length},images(t,{details:e}){return _(e).map("image").filter().value()},details({items:t},e,r,s){return _(t).keyBy((({item:t})=>_.toInteger(t))).mapValues((({item:t})=>s["ITEMS/item"](_.toInteger(t)))).value()}},n={init(t,e){s["a"].set(t,"uuid",e)},setSync(t,e){s["a"].set(t,"sync",e)},addItem(t,e){t.items.push(e)},removeItem(t,e){let r=_.findIndex(t.items,["item",e]);t.items.splice(r,1)},incrementByIndex(t,e){let{price:r}=t.items[e],s=++t.items[e].quantity;t.items[e].amount=r*s},decrementByIndex(t,e){let{price:r}=t.items[e],s=--t.items[e].quantity;t.items[e].amount=r*s},ordered(t){t.ordered.status=!0,t.ordered.error=null},orderResponse(t,{error:e,message:r}){t.items.splice(0),t.uuid="",t.ordered.status=!1,t.ordered.error=e,t.ordered.message=r},trigger(t,e){t.ordered.trigger=e}},o={init({commit:t,dispatch:e,state:{timeout:r}},s){let i=_.debounce(_.bind(e,this,"sync"),2e3,{trailing:!0});if(t("setSync",i),setTimeout(i,r),!s||_.isEmpty(s))return;let{uuid:a,items:n}=s;t("init",a),n&&!_.isEmpty(n)&&_.forEach(n,(({item:t,quantity:r})=>e("addItemQuantity",{item:t,quantity:r})))},addItem({rootGetters:t,commit:e},r){let s=t["ITEMS/item"](r),{id:i,sellPrice:a}=s;i=_.toInteger(i),e("addItem",{item:i,price:a,quantity:1,amount:a})},addItemQuantity({rootGetters:t,commit:e},{item:r,quantity:s}){let i=t["ITEMS/item"](r),{id:a,sellPrice:n}=i;r=_.toInteger(a),s=_.toInteger(s);let o=n,l=s*o;e("addItem",{item:r,price:o,quantity:s,amount:l})},increment({state:t,dispatch:e,commit:r},s){s=_.toInteger(s);let i=_.findIndex(t.items,["item",s]);i>-1?r("incrementByIndex",i):e("addItem",s),t.sync()},decrement({state:t,commit:e},r){r=_.toInteger(r);let s=_.findIndex(t.items,["item",r]);-1!==s&&(t.items[s].quantity<=1?e("removeItem",r):e("decrementByIndex",s),t.sync())},sync({state:{url:t,items:e,uuid:r,sync:s,timeout:i},commit:a,dispatch:n}){$.post(t.sync,{items:e}).then((({data:t})=>{r!==t.uuid&&a("init",t.uuid),(t.items&&t.items.length!==e.length||_.sumBy(e,(({quantity:t})=>_.toNumber(t)))!==_.sumBy(t.items,(({quantity:t})=>_.toNumber(t))))&&(_.forEach(e,(({item:t})=>a("removeItem",_.toInteger(t)))),_.forEach(t.items,(({item:t,quantity:e})=>{let r=_.toNumber(e);while(r-- >=1)n("increment",t)})))}))},order({state:{url:{order:t},items:e,uuid:r},commit:s}){return s("ordered"),new Promise((i=>{$.post(t,{items:e,uuid:r}).then((({data:t})=>{s("orderResponse",t),i(t)}))}))}};e["default"]={state:i,getters:a,mutations:n,actions:o,namespaced:!0}},"758b":function(t,e,r){"use strict";(function(t){var e=r("bc3a"),s=r.n(e);t.$=s.a.create({baseURL:location.origin,timeout:5e3,headers:{"X-CSRF-TOKEN":CSRF_TOKEN,"X-Requested-With":"XMLHttpRequest"}})}).call(this,r("c8ba"))},fd2e:function(t,e,r){"use strict";r.r(e);r("c975"),r("a434");var s=r("2b0e");const i={CATEGORIES:CATEGORIES,CATEGORY_ITEMS:CATEGORY_ITEMS,url:{create:"/admin/category/create"}},a={items({CATEGORY_ITEMS:t}){return e=>_.map(_.get(t,_.toInteger(e),[]),_.toInteger)}},n={update(t,e){_.forEach(["name","description","status","media"],(r=>s["a"].set(t.CATEGORIES[e.id],r,e[r])))},add(t,e){e&&e.id&&s["a"].set(t.CATEGORIES,_.toInteger(e.id),e)},addItem(t,{item:e,category:r}){return e=_.toInteger(e),r=_.toInteger(r),_.has(t.CATEGORY_ITEMS,r)?t.CATEGORY_ITEMS[r].push(e):s["a"].set(t.CATEGORY_ITEMS,r,[e])},removeItem(t,{item:e,category:r}){e=_.toInteger(e),r=_.toInteger(r),t.CATEGORY_ITEMS[r]&&_.indexOf(t.CATEGORY_ITEMS[r],e)>-1&&t.CATEGORY_ITEMS[r].splice(_.indexOf(t.CATEGORY_ITEMS[r],e),1)}},o={create({state:t,commit:e},r){$.post(t.url.create,r).then((({data:t})=>e("add",t)))}};e["default"]={state:i,getters:a,mutations:n,actions:o,namespaced:!0}}});