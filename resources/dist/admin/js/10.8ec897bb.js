(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[10],{4090:function(e,t,a){"use strict";var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"fit row no-wrap items-center content-start"},[a("div",{staticClass:"col-grow",staticStyle:{overflow:"auto"}},[a("q-input",{attrs:{outlined:"",value:e.value,clearable:"",dense:"",placeholder:"Search.."},on:{input:function(t){return e.$emit("input",t)}},scopedSlots:e._u([{key:"prepend",fn:function(){return[a("q-icon",{attrs:{name:"search"}})]},proxy:!0}])})],1),a("div",[e._v("   ")]),a("div",{staticStyle:{overflow:"auto"}},[a("q-btn",{attrs:{label:e.action||"NEW",color:"primary"},on:{click:function(t){return e.$emit(e.action||"new")}}})],1)])},r=[],s={name:"SearchAndAction",props:["value","action"]},o=s,l=a("2877"),i=a("27f9"),c=a("0016"),u=a("9c40"),d=a("eebe"),m=a.n(d),p=Object(l["a"])(o,n,r,!1,null,null,null);t["a"]=p.exports;m()(p,"components",{QInput:i["a"],QIcon:c["a"],QBtn:u["a"]})},b185:function(e,t,a){"use strict";var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("q-table",{attrs:{title:e.title,data:e.records,columns:e.columns,dense:"","no-data-label":e.empty,"row-key":e.row_key,pagination:{rowsPerPage:e.limit||5},"rows-per-page-label":"Per Page"},scopedSlots:e._u([e.route?{key:"body-cell-action",fn:function(t){return[a("q-td",{attrs:{props:t}},[a("q-btn",{attrs:{dense:"",flat:"",icon:"double_arrow",size:"sm",color:"primary",to:{name:e.route,params:{id:t.value,back:e.back}}}})],1)]}}:null],null,!0)})},r=[],s={name:"RecordList",props:["records","title","empty","limit","layout","route","row_key","back"],computed:{columns(){return this.route?_.concat(this.layout,[{name:"action",field:this.row_key,label:" "}]):this.layout}}},o=s,l=a("2877"),i=a("eaac"),c=a("db86"),u=a("9c40"),d=a("eebe"),m=a.n(d),p=Object(l["a"])(o,n,r,!1,null,null,null);t["a"]=p.exports;m()(p,"components",{QTable:i["a"],QTd:c["a"],QBtn:u["a"]})},d000:function(e,t,a){"use strict";a.r(t);var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("q-page",{attrs:{padding:""}},[a("SearchAndAction",{attrs:{action:"add"},on:{add:function(t){e.create=!0}},model:{value:e.filter,callback:function(t){e.filter=t},expression:"filter"}}),a("Customers",{staticClass:"q-mt-sm",attrs:{filter:e.filter,source:"customers"}}),a("q-dialog",{attrs:{persistent:""},model:{value:e.create,callback:function(t){e.create=t},expression:"create"}},[a("CreateCustomerCard",{staticStyle:{width:"90vw"},on:{created:function(t){e.create=!1}}})],1)],1)},r=[],s=a("4090"),o=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("RecordList",{attrs:{records:e.customers,layout:e.columns,row_key:"id",limit:e.limit||25,back:e.source,route:"customer"}})},l=[],i=(a("ddb0"),a("b185")),c={name:"Customers",components:{RecordList:i["a"]},props:["limit","filter","source"],data(){return{columns:[{name:"serial",field:"id",label:"#",format:e=>e},{name:"name",field:"name",label:"Name",align:"left"},{name:"phone",field:"phone",label:"Phone"}],layout:{ID:"id",Name:"name",Phone:"phone"},name:"",phone:"",address:""}},computed:{records(){return _.values(this.$store.state.CUSTOMERS.CUSTOMERS)},customers(){return this.filter?_.filter(this.records,(({name:e,phone:t,address:a})=>_.includes([e,t,a].join(" ").toLowerCase(),_.toLower(this.filter)))):this.records}},methods:{create(e){if(!e)return $(this.$refs["customer_create_modal"]).modal("show");this.name&&this.phone&&this.$store.dispatch("CUSTOMERS/create",{name:this.name,phone:this.phone,address:this.address}).then((()=>{this.name="",this.phone=""}))}}},u=c,d=a("2877"),m=Object(d["a"])(u,o,l,!1,null,null,null),p=m.exports,h=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("q-card",[a("q-card-section",{staticClass:"row items-center q-pb-none"},[a("div",{staticClass:"text-h6"},[e._v("Add New Customer")]),a("q-space"),a("q-btn",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{icon:"close",flat:"",round:"",dense:""}})],1),a("q-card-section",[a("q-form",{ref:"create_customer_form",staticClass:"q-gutter-sm",attrs:{autocorrect:"off",autocapitalize:"off",autocomplete:"off",spellcheck:"false"}},[a("q-input",{attrs:{type:"text",name:"name",label:"Name",dense:"",outlined:""},model:{value:e.name,callback:function(t){e.name=t},expression:"name"}}),a("q-input",{attrs:{type:"number",name:"phone",label:"Phone",dense:"",outlined:""},model:{value:e.phone,callback:function(t){e.phone=t},expression:"phone"}}),a("q-input",{attrs:{type:"textarea",name:"address",label:"Address",dense:"",outlined:""},model:{value:e.address,callback:function(t){e.address=t},expression:"address"}})],1)],1),a("q-card-actions",{staticClass:"q-px-md q-pt-none",attrs:{align:"right"}},[a("q-btn",{attrs:{push:"",label:"Submit",color:"primary",loading:e.loading},on:{click:e.create}})],1)],1)},f=[],b={name:"CreateCustomerCard",data(){return{loading:!1,name:"",phone:"",address:""}},computed:{},methods:{create(){this.loading=!0,this.name&&this.phone?this.$store.dispatch("CUSTOMERS/create",new FormData(this.$refs["create_customer_form"].$el)).then((()=>{this.loading=!1,this.name=this.phone=this.address="",this.$emit("created")})):this.loading=!1}}},v=b,C=a("f09f"),w=a("a370"),y=a("2c91"),q=a("9c40"),g=a("0378"),k=a("27f9"),S=a("4b7e"),x=a("7f67"),Q=a("eebe"),E=a.n(Q),P=Object(d["a"])(v,h,f,!1,null,null,null),A=P.exports;E()(P,"components",{QCard:C["a"],QCardSection:w["a"],QSpace:y["a"],QBtn:q["a"],QForm:g["a"],QInput:k["a"],QCardActions:S["a"]}),E()(P,"directives",{ClosePopup:x["a"]});var O={name:"PageCustomers",components:{CreateCustomerCard:A,Customers:p,SearchAndAction:s["a"]},data(){return{filter:"",create:!1}}},R=O,j=a("9989"),N=a("24e8"),T=Object(d["a"])(R,n,r,!1,null,null,null);t["default"]=T.exports;E()(T,"components",{QPage:j["a"],QDialog:N["a"]})}}]);