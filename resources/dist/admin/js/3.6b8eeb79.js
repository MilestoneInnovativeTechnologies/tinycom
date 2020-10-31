(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[3],{"4e6f":function(t,e,a){"use strict";var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("q-markup-table",{attrs:{dense:""}},[a("thead",{staticClass:"text-left"},[a("tr",[a("th",[t._v("ID")]),a("th",[t._v("Status")]),a("th",[t._v("Name")]),a("th",[t._v("Description")]),a("th",[t._v(" ")])])]),a("tbody",t._l(t.items,(function(e,s){return a("ItemUpdateRow",t._b({key:["active","item","update","row",s].join("-")},"ItemUpdateRow",e,!1))})),1)])},n=[],r=(a("e01a"),a("806c")),i={name:"InActiveItems",components:{ItemUpdateRow:r["a"]},props:["filter"],computed:{items(){return _(this.$store.getters["ITEMS/all"]).filter((({status:t})=>"N"===t)).filter((({name:t,description:e})=>_.isEmpty(this.filter)||_.includes(_.toLower(t+e),_.toLower(this.filter)))).value()}}},o=i,c=a("2877"),l=a("2bb1"),d=a("eebe"),u=a.n(d),p=Object(c["a"])(o,s,n,!1,null,null,null);e["a"]=p.exports;u()(p,"components",{QMarkupTable:l["a"]})},"726e":function(t,e,a){"use strict";a.d(e,"a",(function(){return n}));var s=a("74c9");const n={props:["back"],components:{BackButton:s["a"]},computed:{hasBack(){return!!this.back},backRoute(){return this.hasBack?this.getBackRoute():null}},methods:{getBackRoute(){let t=this.back;return _.isString(t)?{name:t}:_.isArray(t)?{name:t[0],params:{id:t[1]}}:null}}}},"74c9":function(t,e,a){"use strict";var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{class:t.cls},[a("q-btn",{staticClass:"q-px-sm q-py-xs",attrs:{dense:"",size:"sm",label:"Back",icon:"reply_all",color:"warning",to:t.to}})],1)},n=[],r={name:"BackButton",props:["right","to"],computed:{cls(){return void 0!==this.right?["text-right"]:["text-left"]}}},i=r,o=a("2877"),c=a("9c40"),l=a("eebe"),d=a.n(l),u=Object(o["a"])(i,s,n,!1,null,null,null);e["a"]=u.exports;d()(u,"components",{QBtn:c["a"]})},"806c":function(t,e,a){"use strict";var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("q-tr",[a("q-td",[t._v(t._s(t.id))]),a("q-td",[a("q-select",{staticStyle:{width:"3rem"},attrs:{options:t.options,dense:"",square:"",outlined:""},model:{value:t.status,callback:function(e){t.status=e},expression:"status"}})],1),a("q-td",[a("q-input",{staticStyle:{width:"8rem"},attrs:{type:"text",dense:"",square:"",outlined:"",debounce:1e3},model:{value:t.name,callback:function(e){t.name=e},expression:"name"}})],1),a("q-td",[a("q-input",{staticStyle:{width:"8rem",height:"4rem"},attrs:{type:"textarea",dense:"",square:"",outlined:"",debounce:1e3},model:{value:t.description,callback:function(e){t.description=e},expression:"description"}})],1),a("q-td",[a("q-btn",{attrs:{icon:"double_arrow",flat:"",size:"sm",color:"primary",to:{name:"item",params:{id:t.id}}}})],1)],1)},n=[],r=(a("e01a"),{name:"ItemUpdateRow",props:["id"],data(){return{options:["Y","N"]}},computed:{name:{get(){return this.$attrs.name},set(t){this.dispatch({name:t})}},description:{get(){return this.$attrs.description},set(t){this.dispatch({description:t})}},status:{get(){return this.$attrs.status},set(t){this.dispatch({status:t})}}},methods:{formData(t){let e=new FormData;return _.forEach(t,((t,a)=>e.append(a,t))),{id:this.id,data:e,item:"item",action:"update"}},dispatch(t){this.$store.dispatch("SERVER/serverItemAction",this.formData(t))}}}),i=r,o=a("2877"),c=a("bd08"),l=a("db86"),d=a("ddd8"),u=a("27f9"),p=a("9c40"),m=a("eebe"),h=a.n(m),f=Object(o["a"])(i,s,n,!1,null,null,null);e["a"]=f.exports;h()(f,"components",{QTr:c["a"],QTd:l["a"],QSelect:d["a"],QInput:u["a"],QBtn:p["a"]})},"94eb":function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("q-page",{attrs:{padding:""}},[a("UpdateCustomerCard",{attrs:{id:t.id}}),t.hasBack?a("BackButton",{staticClass:"q-mt-sm",attrs:{right:"",to:t.backRoute}}):t._e()],1)},n=[],r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("q-card",[a("q-card-section",{staticClass:"row items-center q-pb-none"},[a("div",{staticClass:"text-h6"},[t._v("Update Customer")])]),a("q-card-section",[a("q-form",{ref:"update_customer_form",staticClass:"q-gutter-sm",attrs:{autocorrect:"off",autocapitalize:"off",autocomplete:"off",spellcheck:"false"}},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.id,expression:"id"}],attrs:{type:"hidden",name:"id"},domProps:{value:t.id},on:{input:function(e){e.target.composing||(t.id=e.target.value)}}}),a("q-input",{attrs:{type:"text",name:"name",label:"Name",dense:"",outlined:""},model:{value:t.name,callback:function(e){t.name=e},expression:"name"}}),a("q-input",{attrs:{type:"number",name:"phone",label:"Phone",dense:"",outlined:""},model:{value:t.phone,callback:function(e){t.phone=e},expression:"phone"}}),a("q-input",{attrs:{type:"textarea",name:"address",label:"Address",dense:"",outlined:""},model:{value:t.address,callback:function(e){t.address=e},expression:"address"}})],1)],1),a("q-card-actions",{staticClass:"q-px-md q-pt-none",attrs:{align:"right"}},[a("q-btn",{attrs:{label:"SHOP",color:"primary",to:{name:"home"},loading:t.loading}}),a("q-space"),a("q-btn",{attrs:{push:"",label:"Update",color:"primary",loading:t.loading},on:{click:t.update}}),a("q-btn",{staticClass:"q-mt-md full-width",attrs:{flat:"","text-color":"primary",label:"fetch from server",size:"sm",loading:t.loading},on:{click:t.fetch}})],1)],1)},i=[],o=(a("e6cf"),a("a79d"),a("4e6f")),c={name:"UpdateCustomerCard",components:{InActiveItems:o["a"]},props:["id"],data(){let{name:t,phone:e,address:a}=this.$store.getters["CUSTOMERS/customer"](this.id);return{loading:!1,name:t,phone:e,address:a}},methods:{update(){this.loading=!0,this.name&&this.phone?this.$store.dispatch("CUSTOMERS/update",new FormData(this.$refs["update_customer_form"].$el)).then((()=>this.loading=!1)):this.loading=!1},fetch(){this.loading=!0,this.$store.dispatch("CUSTOMERS/fetch",this.id).then((t=>["name","phone","address"].forEach((e=>this[e]=t[e])))).finally((()=>this.loading=!1))}}},l=c,d=a("2877"),u=a("f09f"),p=a("a370"),m=a("0378"),h=a("27f9"),f=a("4b7e"),b=a("9c40"),v=a("2c91"),g=a("eebe"),q=a.n(g),_=Object(d["a"])(l,r,i,!1,null,null,null),k=_.exports;q()(_,"components",{QCard:u["a"],QCardSection:p["a"],QForm:m["a"],QInput:h["a"],QCardActions:f["a"],QBtn:b["a"],QSpace:v["a"]});var x=a("726e"),w={name:"PageCustomer",components:{UpdateCustomerCard:k},props:["id"],mixins:[x["a"]]},C=w,y=a("9989"),S=Object(d["a"])(C,s,n,!1,null,null,null);e["default"]=S.exports;q()(S,"components",{QPage:y["a"]})}}]);