(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[9],{"0b35":function(e,t,r){"use strict";r.r(t);var a=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("q-page",{attrs:{padding:""}},[r("PendingOrders",{attrs:{limit:"15",source:"orders"}})],1)},n=[],o=r("6822"),l={name:"PageOrders",components:{PendingOrders:o["a"]}},s=l,i=r("2877"),c=r("9989"),u=r("eebe"),d=r.n(u),m=Object(i["a"])(s,a,n,!1,null,null,null);t["default"]=m.exports;d()(m,"components",{QPage:c["a"]})},6822:function(e,t,r){"use strict";var a=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("RecordList",{attrs:{records:e.carts,layout:e.layout,empty:e.empty,route:"order",limit:e.limit||5,back:e.source,row_key:e.row_key}})},n=[],o=(r("26e9"),r("b185")),l={name:"PendingOrders",components:{RecordList:o["a"]},props:["limit","source"],data(){return{layout:[{name:"id",label:"ID",field:"id",align:"left"},{name:"customer",label:"Customer",field:"customer_name",align:"left"},{name:"total",label:"Total",field:"total"}],empty:"No any pending orders!!",row_key:"id"}},computed:{carts(){return _(this.$store.getters["CARTS/all"]).filter(["status","Ordered"]).sortBy((({time:e})=>_.toInteger(e))).reverse().value()}}},s=l,i=r("2877"),c=Object(i["a"])(s,a,n,!1,null,null,null);t["a"]=c.exports},b185:function(e,t,r){"use strict";var a=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("q-table",{attrs:{title:e.title,data:e.records,columns:e.columns,dense:"","no-data-label":e.empty,"row-key":e.row_key,pagination:{rowsPerPage:e.limit||5},"rows-per-page-label":"Per Page"},scopedSlots:e._u([e.route?{key:"body-cell-action",fn:function(t){return[r("q-td",{attrs:{props:t}},[r("q-btn",{attrs:{dense:"",flat:"",icon:"double_arrow",size:"sm",color:"primary",to:{name:e.route,params:{id:t.value,back:e.back}}}})],1)]}}:null],null,!0)})},n=[],o={name:"RecordList",props:["records","title","empty","limit","layout","route","row_key","back"],computed:{columns(){return this.route?_.concat(this.layout,[{name:"action",field:this.row_key,label:" "}]):this.layout}}},l=o,s=r("2877"),i=r("eaac"),c=r("db86"),u=r("9c40"),d=r("eebe"),m=r.n(d),p=Object(s["a"])(l,a,n,!1,null,null,null);t["a"]=p.exports;m()(p,"components",{QTable:i["a"],QTd:c["a"],QBtn:u["a"]})}}]);