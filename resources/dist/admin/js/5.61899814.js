(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[5],{"2ab2":function(t,e,a){"use strict";a.r(e);var r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("q-page",{attrs:{padding:""}},[a("CartDetailCard",{staticClass:"q-mx-auto",staticStyle:{"max-width":"55vh"},attrs:{id:t.id}}),a("OrderShareCard",{staticClass:"q-mx-auto q-mt-sm",staticStyle:{"max-width":"55vh"},attrs:{id:t.id}}),a("OrderActionCard",{staticClass:"q-mx-auto q-mt-sm",staticStyle:{"max-width":"55vh"},attrs:{id:t.id}}),t.hasBack?a("BackButton",{staticClass:"q-mx-auto q-mt-sm",staticStyle:{"max-width":"55vh"},attrs:{right:"",to:t.backRoute}}):t._e()],1)},s=[],i=a("36c6"),n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("q-card",{staticClass:"q-py-md"},[a("q-card-actions",[a("q-btn",{staticClass:"full-width",attrs:{loading:t.loading,push:"",color:"primary",label:"confirm order"},on:{click:t.confirm}})],1),a("q-card-actions",{attrs:{align:"center"}},[a("q-btn",{attrs:{loading:t.loading,flat:"",label:"cancel","text-color":"negative"},on:{click:function(e){return t.cancel(null)}}}),a("q-btn",{attrs:{loading:t.loading,flat:"",label:"update from server","text-color":"warning"}})],1)],1),a("q-dialog",{attrs:{persistent:""},model:{value:t.prompt,callback:function(e){t.prompt=e},expression:"prompt"}},[a("q-card",[a("q-card-section",[a("div",{staticClass:"text-h6"},[t._v("Reason")])]),a("q-card-section",{staticClass:"q-pt-none"},[a("q-input",{attrs:{dense:"",autofocus:""},model:{value:t.reason,callback:function(e){t.reason=e},expression:"reason"}})],1),a("q-card-actions",{staticClass:"text-primary",attrs:{align:"right"}},[a("q-btn",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{flat:"",label:"Cancel"}}),a("q-btn",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{flat:"",label:"Submit"},on:{click:function(e){return t.cancel(t.reason)}}})],1)],1)],1),a("q-dialog",{model:{value:t.alert,callback:function(e){t.alert=e},expression:"alert"}},[a("q-card",[a("q-card-section",[a("div",{staticClass:"text-h6"},[t._v("Error")])]),a("q-card-section",{staticClass:"q-pt-none"},[t._v(t._s(t.error))]),a("q-card-actions",{attrs:{align:"right"}},[a("q-btn",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{flat:"",label:"OK",color:"primary"}})],1)],1)],1)],1)},o=[],c=a("8107"),l={name:"OrderActionCard",props:["id"],data(){return{loading:!1,prompt:!1,alert:!1,reason:"",error:""}},methods:{confirm(){this.loading=!0,this.$store.dispatch("CARTS/confirm",this.id).then((({error:t,message:e})=>{if(this.loading=!1,!t)return this.$router.push({name:"bill",params:{id:this.id}});this.error=e,this.alert=!0}))},cancel(t){if(this.prompt=!1,!t)return this.prompt=!0;this.$store.dispatch("CARTS/cancel",c["a"].obj({id:this.id,reason:t})).then((({error:t,message:e})=>{this.loading=!1,t||this.$router.push({name:"orders"})}))},fetch(){this.$store.dispatch("CARTS/fetch",this.id)}}},d=l,m=a("2877"),u=a("f09f"),p=a("4b7e"),h=a("9c40"),q=a("24e8"),b=a("a370"),v=a("27f9"),C=a("7f67"),f=a("eebe"),g=a.n(f),x=Object(m["a"])(d,n,o,!1,null,null,null),y=x.exports;g()(x,"components",{QCard:u["a"],QCardActions:p["a"],QBtn:h["a"],QDialog:q["a"],QCardSection:b["a"],QInput:v["a"]}),g()(x,"directives",{ClosePopup:C["a"]});var S=a("726e"),k=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("q-card",[a("q-card-section",{staticClass:"q-pb-xs"},[a("div",{staticClass:"text-weight-bold"},[t._v("Share Order Summary")])]),a("q-card-actions",{staticClass:"q-px-md"},[a("q-btn",{staticClass:"q-px-sm",attrs:{push:"",color:"primary",label:"WhatsApp"},on:{click:t.s_whatsapp}})],1)],1)},w=[],Q=(a("5319"),a("b06b"));a("843c"),a("4d90"),a("498a");const{formatDate:A}=a("fe09").date,B="\nHi *[customer_name_trimmed]*,\nThank you very much for your order on [company_name].\n\nHere is your order details\n```Order #: ```*[id]*\n```Date   : ```*[human_date]*\n```Time   : ```*[human_time]*\n\n```Items  : ```\n[items_text]\n```--------------------```\n```-[total_center]-```\n```--------------------```\n\n```Address:```\n[address_text]\n```Phone  : ```*[customer_phone_trimmed]*\n\n```--------------------```\n[note]\n```--------------------```\n",O="```[idx]. ```*[item_name]*\n```[item_price]``` x ```[item_quantity]``` = [item_total]\n",$={company_name(){return""+COMPANY},human_date({updated_at:t}){return A(new Date(t),"DD/MMM/YY")},human_time({updated_at:t}){return A(new Date(t),"hh:mm A")},total_center({total:t}){return _.pad("```*"+_.toNumber(t).toFixed(2)+"*```",26)},customer_name_trimmed({customer_name:t}){return _.trim(t)},customer_phone_trimmed({customer_phone:t}){return _.trim(t)},idx(t,e){return _.padStart(_.toNumber(e),2,"0")},item_name({item:t},e,a){return _.get(a,[t,"name"])},item_price({price:t}){return _.padEnd(_.toNumber(t).toFixed(2),7)},item_quantity({quantity:t}){return _.padStart(_.toNumber(t),2,"0")},item_total({amount:t}){return _.padStart("*"+_.toNumber(t).toFixed(2)+"*",10)}};var T={name:"OrderShareCard",props:["id"],computed:{cart(){return this.$store.getters["CARTS/cart"](this.id)},item_details(){return this.$store.state.ITEMS.ITEMS}},methods:{s_whatsapp(){let t=B.replace(/\[(\w+)\]/g,((t,e,a)=>_.has(this,e)?this[e](this.cart):_.has($,e)?$[e](this.cart):_.has(this.cart,e)?this.cart[e]:"")),e=encodeURI(t),a="91"+this.cart.customer_phone;Object(Q["a"])(urlParse("WHATSAPP",{phone:a,text:e}).replace(/\?\_\=\d+/g,""))},items_text({items:t}){let e=[],a=0;return _.forEach(t,(t=>{a++,e.push(O.replace(/\[(\w+)\]/g,((e,r,s)=>_.has(this,r)?this[r](t,a,this.item_details):_.has($,r)?$[r](t,a,this.item_details):_.has(this.cart,r)?this.cart[r]:"")))})),e.join("\n")}}},I=T,D=Object(m["a"])(I,k,w,!1,null,null,null),E=D.exports;g()(D,"components",{QCard:u["a"],QCardSection:b["a"],QCardActions:p["a"],QBtn:h["a"]});var N={name:"PageCart",components:{OrderShareCard:E,OrderActionCard:y,CartDetailCard:i["a"]},mixins:[S["a"]],props:["id"]},R=N,j=a("9989"),P=Object(m["a"])(R,r,s,!1,null,null,null);e["default"]=P.exports;g()(P,"components",{QPage:j["a"],QBtn:h["a"]})},"36c6":function(t,e,a){"use strict";var r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("q-card",[a("q-card-section",[a("div",{staticClass:"text-h6"},[t._v("Cart ID: "+t._s(t.cart.id))])]),a("q-list",{attrs:{dense:"",bordered:"",separator:""}},t._l(t.layout,(function(e,r){return a("q-item",{key:["cart","detail","head",e].join("-")},[a("q-item-section",[t._v(t._s(r))]),a("q-item-section",{attrs:{side:""}},[t._v(t._s(t.cart[e]))])],1)})),1),a("q-list",{attrs:{separator:""}},[a("q-item-section",[a("q-item-label",{attrs:{header:""}},[t._v("Items")])],1),t._l(t.cart.items,(function(e){return a("q-item",{key:["cart","detail","item",e.item].join("-")},[a("q-item-section",{attrs:{avatar:""}},[a("q-icon",{attrs:{name:"done_all",color:"primary"}})],1),a("q-item-section",[a("q-item-label",[t._v(t._s(t.itemName(e.item)))]),a("q-item-label",{attrs:{caption:""}},[t._v(t._s(e.price)+" X "),a("q-badge",{attrs:{color:"dark"}},[t._v(t._s(e.quantity))])],1)],1),a("q-item-section",{staticClass:"text-primary text-weight-bolder",attrs:{side:""}},[t._v(t._s(e.amount))])],1)})),a("q-item",[a("q-item-section",[t._v(" ")]),a("q-item-section",{staticClass:"text-primary text-weight-bolder",staticStyle:{"font-size":"1.25rem"},attrs:{side:""}},[t._v(t._s(t.cart.total))])],1)],2),a("q-list",{staticClass:"q-pb-sm",attrs:{separator:"",bordered:""}},[a("q-item",[a("q-item-section",[a("q-item-label",{staticClass:"text-weight-bold"},[t._v("Delivery Address")]),a("q-item-label",{attrs:{caption:""},domProps:{innerHTML:t._s(t.cart.address_text.replace("\n","<br >"))}})],1)],1),t.cart.note?a("q-item",[a("q-item-section",[a("q-item-label",{staticClass:"text-weight-bold"},[t._v("Order Note:")]),a("q-item-label",{attrs:{caption:""}},[t._v(t._s(t.cart.note))])],1)],1):t._e()],1)],1)},s=[],i={name:"CartDetailCard",props:["id","live"],data(){return{layout:{Customer:"customer_name",Phone:"customer_phone",Status:"status",Source:"source_title","Last Updated":"updated"}}},computed:{live_carts(){return this.$store.getters["CARTS/live"]},cart(){return this.live?_.head(_.filter(this.live_carts,["id",this.id])):this.$store.getters["CARTS/cart"](this.id)}},methods:{itemName(t){return _.get(this.$store.state.ITEMS.ITEMS,[t,"name"],t)}}},n=i,o=a("2877"),c=a("f09f"),l=a("a370"),d=a("1c1c"),m=a("66e5"),u=a("4074"),p=a("0170"),h=a("0016"),q=a("58a8"),b=a("eebe"),v=a.n(b),C=Object(o["a"])(n,r,s,!1,null,null,null);e["a"]=C.exports;v()(C,"components",{QCard:c["a"],QCardSection:l["a"],QList:d["a"],QItem:m["a"],QItemSection:u["a"],QItemLabel:p["a"],QIcon:h["a"],QBadge:q["a"]})},"726e":function(t,e,a){"use strict";a.d(e,"a",(function(){return s}));var r=a("74c9");const s={props:["back"],components:{BackButton:r["a"]},computed:{hasBack(){return!!this.back},backRoute(){return this.hasBack?this.getBackRoute():null}},methods:{getBackRoute(){let t=this.back;return _.isString(t)?{name:t}:_.isArray(t)?{name:t[0],params:{id:t[1]}}:null}}}},"74c9":function(t,e,a){"use strict";var r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{class:t.cls},[a("q-btn",{staticClass:"q-px-sm q-py-xs",attrs:{dense:"",size:"sm",label:"Back",icon:"reply_all",color:"warning",to:t.to}})],1)},s=[],i={name:"BackButton",props:["right","to"],computed:{cls(){return void 0!==this.right?["text-right"]:["text-left"]}}},n=i,o=a("2877"),c=a("9c40"),l=a("eebe"),d=a.n(l),m=Object(o["a"])(n,r,s,!1,null,null,null);e["a"]=m.exports;d()(m,"components",{QBtn:c["a"]})}}]);