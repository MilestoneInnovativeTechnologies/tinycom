(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[17],{4090:function(t,e,a){"use strict";var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"fit row no-wrap items-center content-start"},[a("div",{staticClass:"col-grow",staticStyle:{overflow:"auto"}},[a("q-input",{attrs:{outlined:"",value:t.value,clearable:"",dense:"",placeholder:"Search.."},on:{input:function(e){return t.$emit("input",e)}},scopedSlots:t._u([{key:"prepend",fn:function(){return[a("q-icon",{attrs:{name:"search"}})]},proxy:!0}])})],1),a("div",[t._v("   ")]),a("div",{staticStyle:{overflow:"auto"}},[a("q-btn",{attrs:{label:t.action||"NEW",color:"primary"},on:{click:function(e){return t.$emit(t.action||"new")}}})],1)])},r=[],n={name:"SearchAndAction",props:["value","action"]},i=n,o=a("2877"),c=a("27f9"),l=a("0016"),u=a("9c40"),d=a("eebe"),p=a.n(d),m=Object(o["a"])(i,s,r,!1,null,null,null);e["a"]=m.exports;p()(m,"components",{QInput:c["a"],QIcon:l["a"],QBtn:u["a"]})},c5d2:function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("q-page",{attrs:{padding:""}},[a("SearchAndAction",{on:{new:function(e){t.create=!0}},model:{value:t.filter,callback:function(e){t.filter=e},expression:"filter"}}),a("CategoryUpdateTable",{staticClass:"q-mt-sm",attrs:{filter:t.filter}}),a("q-dialog",{attrs:{persistent:""},model:{value:t.create,callback:function(e){t.create=e},expression:"create"}},[a("CreateCategoryCard",{on:{created:function(e){t.create=!1}}})],1)],1)},r=[],n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("q-markup-table",{staticClass:"text-left",attrs:{dense:""}},[a("thead",[a("tr",[a("th",[t._v("ID")]),a("th",[t._v("Name")]),a("th",[t._v("Description")]),a("th",[t._v("Status")]),a("th",[t._v("Image")])])]),a("tbody",t._l(t.categories,(function(e,s){return a("CategoryUpdateRow",t._b({key:["form","update","category",s].join("-")},"CategoryUpdateRow",e,!1))})),1)])},i=[],o=(a("e01a"),a("ddb0"),function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("tr",[a("td",[t._v(t._s(t.id))]),a("td",[a("q-input",{staticStyle:{width:"6rem"},attrs:{type:"text",dense:"",square:"",outlined:"",debounce:1e3},model:{value:t.name,callback:function(e){t.name=e},expression:"name"}})],1),a("td",[a("q-input",{staticStyle:{width:"8rem",height:"4rem"},attrs:{type:"textarea",dense:"",square:"",outlined:"",debounce:1e3},model:{value:t.description,callback:function(e){t.description=e},expression:"description"}})],1),a("td",[a("q-select",{staticStyle:{width:"4rem"},attrs:{options:t.options,dense:"",square:"",outlined:""},model:{value:t.status,callback:function(e){t.status=e},expression:"status"}})],1),a("td",[t.image?a("q-img",{staticClass:"rounded-borders",staticStyle:{height:"4rem","max-width":"8rem"},attrs:{src:t.image}}):t._e(),a("q-input",{staticStyle:{width:"6rem"},attrs:{type:"file",dense:"",borderless:""},on:{input:function(e){return t.image=e[0]}}})],1)])}),c=[],l={name:"CategoryUpdateRow",props:["id"],data(){return{options:["Y","N"]}},computed:{name:{get(){return this.$attrs.name},set(t){this.dispatch({name:t})}},description:{get(){return this.$attrs.description},set(t){this.dispatch({description:t})}},status:{get(){return this.$attrs.status},set(t){this.dispatch({status:t})}},image:{get(){return _.isEmpty(this.$attrs.media)?null:imageUrl(this.$attrs.media[0])},set(t){this.changeImage(t)}}},methods:{changeImage(t){this.$store.dispatch("SERVER/serverItemAction",this.formData({image:t}))},formData(t){let e=new FormData;return _.forEach(t,((t,a)=>e.append(a,t))),{id:this.id,data:e,item:"category",action:"update"}},dispatch(t){this.$store.dispatch("SERVER/serverItemAction",this.formData(t))}}},u=l,d=a("2877"),p=a("27f9"),m=a("ddd8"),h=a("068f"),f=a("eebe"),g=a.n(f),b=Object(d["a"])(u,o,c,!1,null,null,null),v=b.exports;g()(b,"components",{QInput:p["a"],QSelect:m["a"],QImg:h["a"]});var y={name:"CategoryUpdateTable",props:["filter"],components:{CategoryUpdateRow:v},computed:{categories(){return this.filter?this.filtered(this.filter.toString().toLowerCase()):_.values(this.$store.state.CATEGORIES.CATEGORIES)}},methods:{filtered(t){return _.filter(this.$store.state.CATEGORIES.CATEGORIES,(({name:e,description:a})=>_.includes([e,a].join(" ").toLowerCase(),t)))}}},C=y,q=a("2bb1"),w=Object(d["a"])(C,n,i,!1,null,null,null),S=w.exports;g()(w,"components",{QMarkupTable:q["a"]});var x=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("q-card",[a("q-card-section",{staticClass:"row items-center q-pb-none"},[a("div",{staticClass:"text-h6"},[t._v("Create New Category")]),a("q-space"),a("q-btn",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{icon:"close",flat:"",round:"",dense:""}})],1),a("q-card-section",[a("q-form",{ref:"category_create_form",staticClass:"q-gutter-y-xs",attrs:{autocorrect:"off",autocapitalize:"off",autocomplete:"off",spellcheck:"false"}},[a("q-input",{attrs:{type:"text",name:"name",outlined:"",label:"Name"},model:{value:t.name,callback:function(e){t.name=e},expression:"name"}}),a("q-input",{staticStyle:{height:"4rem"},attrs:{type:"textarea",name:"description",outlined:"",label:"Description"},model:{value:t.description,callback:function(e){t.description=e},expression:"description"}}),a("q-select",{attrs:{outlined:"",name:"status",options:t.options,label:"Status"},model:{value:t.status,callback:function(e){t.status=e},expression:"status"}}),a("q-input",{attrs:{type:"file",name:"image",borderless:""},model:{value:t.image,callback:function(e){t.image=e},expression:"image"}})],1)],1),a("q-card-actions",{staticClass:"q-pa-md",attrs:{align:"right"}},[a("q-btn",{staticClass:"q-ml-sm",attrs:{label:"Reset",type:"reset",color:"primary",flat:""},on:{click:t.reset}}),a("q-btn",{attrs:{label:"Submit",type:"submit",color:"primary",push:"",loading:t.loading},on:{click:t.create}})],1)],1)},E=[],$={name:"CreateCategoryCard",data(){return{options:["Y","N"],loading:!1,name:"",description:"",status:"Y",image:""}},methods:{reset(){return this.name=this.description=this.image=""},create(){if(""===this.name)return;this.loading=!0;let t=new FormData(this.$refs["category_create_form"].$el);this.$store.dispatch("CATEGORIES/create",t).then((()=>this.$emit("created",this.reset()||!(this.loading=!1)||t)))}}},k=$,Q=a("f09f"),I=a("a370"),A=a("2c91"),R=a("9c40"),O=a("0378"),D=a("4b7e"),T=a("7f67"),U=Object(d["a"])(k,x,E,!1,null,null,null),j=U.exports;g()(U,"components",{QCard:Q["a"],QCardSection:I["a"],QSpace:A["a"],QBtn:R["a"],QForm:O["a"],QInput:p["a"],QSelect:m["a"],QCardActions:D["a"]}),g()(U,"directives",{ClosePopup:T["a"]});var N=a("4090"),G={name:"PageCategories",components:{SearchAndAction:N["a"],CreateCategoryCard:j,CategoryUpdateTable:S},data(){return{filter:"",create:!1}}},F=G,P=a("9989"),Y=a("24e8"),B=Object(d["a"])(F,s,r,!1,null,null,null);e["default"]=B.exports;g()(B,"components",{QPage:P["a"],QDialog:Y["a"]})}}]);