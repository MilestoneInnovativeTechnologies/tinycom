(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[5],{"713b":function(t,e,a){"use strict";a.r(e);var r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("q-layout",{attrs:{view:"hHh lpR fFf"}},[a("q-header",{staticClass:"title_bar_bg title_bar_text",attrs:{elevated:""}},[a("q-toolbar",[a("q-toolbar-title",[t._v("\n          "+t._s(t.COMPANY)+"\n        ")]),a("NavbarUser")],1)],1),a("q-page-container",[a("transition",{attrs:{appear:"","enter-active-class":"animated fadeIn",mode:"out-in","leave-active-class":"animated fadeOut"}},[a("router-view")],1)],1),a("q-footer",{staticClass:"title_bar_bg title_bar_text",attrs:{elevated:""}},[a("q-toolbar",{staticClass:"q-py-sm"},[a("q-toolbar-title",{staticClass:"text-left",staticStyle:{"font-size":"0.8rem"}},[a("div",{staticStyle:{"font-size":"1.2rem"}},[a("q-icon",{staticClass:"q-mr-xs",attrs:{name:"shopping_cart",size:"1.5rem"}}),t._v(t._s(t.cartItems))],1),a("div",[t._v("ITEMS")])]),a("q-toolbar-title",{staticClass:"text-center",staticStyle:{"font-size":"0.8rem"}},[a("div",{staticStyle:{"font-size":"1.2rem"}},[a("q-icon",{staticClass:"q-mr-xs",attrs:{name:"payments",size:"1.5rem"}}),t._v(t._s(t.cartTotal))],1),a("div",[t._v("AMOUNT")])]),"cart"===t.page?[t.user?a("q-toolbar-title",{staticClass:"text-right",staticStyle:{"font-size":"0.8rem"},on:{click:t.trigger}},[a("div",{staticStyle:{"font-size":"1.2rem"}},[a("q-icon",{staticClass:"q-mr-xs",staticStyle:{transform:"rotateY(180deg)"},attrs:{name:"reply_all",size:"1.5rem"}})],1),a("div",[t._v("ORDER")])]):a("q-toolbar-title",{staticClass:"text-right",staticStyle:{"font-size":"0.8rem"},on:{click:function(e){return t.$router.push({name:"profile"})}}},[a("div",{staticStyle:{"font-size":"1.2rem"}},[a("q-icon",{staticClass:"q-mr-xs",staticStyle:{transform:"rotateY(180deg)"},attrs:{name:"reply_all",size:"1.5rem"}})],1),a("div",[t._v("LOGIN")])])]:a("q-toolbar-title",{staticClass:"text-right",staticStyle:{"font-size":"0.8rem"},on:{click:function(e){return t.$router.push({name:"cart"})}}},[a("div",{staticStyle:{"font-size":"1.2rem"}},[a("q-icon",{staticClass:"q-mr-xs",staticStyle:{transform:"rotateY(180deg)"},attrs:{name:"reply_all",size:"1.5rem"}})],1),a("div",[t._v("CART")])])],2)],1)],1)},s=[],i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return t.user||t.profile?!t.user&&t.profile?a("q-btn",{attrs:{flat:"",unelevated:"",label:"Back to Shop",to:{name:"home"}}}):t.user&&t.profile?a("q-btn",{attrs:{flat:"",unelevated:"",label:"Logout"},on:{click:t.logout}}):a("q-btn",{attrs:{flat:"",unelevated:"",label:t.name,to:{name:"profile"}}}):a("q-btn",{attrs:{flat:"",unelevated:"",label:"Login",to:{name:"profile"}}})},o=[],n={name:"NavbarUser",computed:{user(){return this.$store.state.USER.USER},name(){return _.get(this.user,"name")},phone(){return _.get(this.user,"phone")},login(){return"login"===this.$route.name},profile(){return"profile"===this.$route.name}},methods:{logout(){location.href=location.origin+"/user/logout"}}},l=n,c=a("2877"),u=a("9c40"),m=a("eebe"),h=a.n(m),f=Object(c["a"])(l,i,o,!1,null,null,null),d=f.exports;h()(f,"components",{QBtn:u["a"]});var p={components:{NavbarUser:d},data(){return{COMPANY:COMPANY}},computed:{header(){return this.$route.params.header||this.COMPANY||"TinyCOM"},back(){return window.history.length>0&&"home"!==this.$route.name},cartTotal(){return this.$store.getters["CART/total"]},cartItems(){return this.$store.getters["CART/itemsCount"]},page(){return this.$route.name},user(){return this.$store.state.USER.USER}},mounted(){this.$store.dispatch("CART/init",CART).then((()=>null)),this.$store.dispatch("ITEMS/init").then((()=>null))},methods:{trigger(){this.$store.commit("CART/trigger",!0,{root:!0})}}},v=p,b=a("4d5a"),g=a("e359"),q=a("65c6"),C=a("6ac5"),y=a("cb32"),S=a("09e3"),$=a("7ff0"),z=a("0016"),T=Object(c["a"])(v,r,s,!1,null,null,null);e["default"]=T.exports;h()(T,"components",{QLayout:b["a"],QHeader:g["a"],QToolbar:q["a"],QToolbarTitle:C["a"],QAvatar:y["a"],QPageContainer:S["a"],QFooter:$["a"],QIcon:z["a"]})}}]);