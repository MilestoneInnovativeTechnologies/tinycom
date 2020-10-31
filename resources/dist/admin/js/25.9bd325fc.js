(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[25],{7240:function(t,a,e){"use strict";e.r(a);var s=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("q-page",{attrs:{padding:""}},[e("q-card",[e("q-card-section",[e("graph-bar",{attrs:{"padding-left":30,"padding-top":30,"padding-bottom":0,"padding-right":0,height:t.graph_height,"axis-reverse":!0,labels:t.graph_days,values:t.bar_totals,"axis-min":t.axis_min,"axis-max":t.axis_max,"axis-step":10,display:"all"}},[e("note",{attrs:{text:"Collection Report"}})],1)],1)],1),e("q-card",{staticClass:"q-mt-sm"},[e("q-markup-table",{staticClass:"text-right",attrs:{dense:""}},[e("thead",[e("q-tr",[e("q-th",{staticClass:"text-left"},[t._v("Day")]),e("q-th",[t._v("Orders")]),e("q-th",[t._v("Processed")]),e("q-th",[t._v("Collection")])],1)],1),e("tbody",t._l(t.statics,(function(a){return e("q-tr",{key:"order-report-static-day-"+a.day},[e("q-td",{staticClass:"text-left"},[t._v(t._s(a.day))]),e("q-td",[t._v(t._s(a.orders))]),e("q-td",[t._v(t._s(a.delivered))]),e("q-td",[t._v(t._s(a.total))])],1)})),1)])],1),e("q-card",{staticClass:"q-mt-sm"},[e("q-card-section",[e("graph-line",{attrs:{"padding-left":30,"padding-top":30,"padding-bottom":30,"padding-right":0,height:t.graph2_height,shape:"curve","axis-full-mode":!0,labels:t.graph_days,values:t.line_values,disply:"all"}},[e("note",{attrs:{text:"Collection"}})],1)],1)],1),e("q-card",{staticClass:"q-mt-sm"},[e("q-card-section",[e("graph-line",{attrs:{"padding-left":0,"padding-top":30,"padding-bottom":50,"padding-right":0,height:t.graph2_height,"axis-full-mode":!0,shape:"curve",opacity:.6,borderline:!0,labels:t.graph_days,values:t.area_values}},[e("note",{attrs:{text:"Orders"}}),e("legends",{attrs:{names:t.area_names}}),e("guideline",{attrs:{"tooltip-y":!0}})],1)],1)],1)],1)},r=[],i={name:"PageReport",data(){return{graph_key:0,graph_width:0,graph_height:160,graph2_height:200,days:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],avoid_status:["New","Cancelled"]}},computed:{date_day(){return _([6,5,4,3,2,1,0]).mapKeys((t=>"d"+new Date((new Date).getTime()-24*t*60*60*1e3).getDate())).mapValues((t=>this.days[new Date((new Date).getTime()-24*t*60*60*1e3).getDay()])).value()},carts(){return _.filter(this.$store.getters["CARTS/all"],(({status:t})=>!_.includes(this.avoid_status,t)))},group(){return _.groupBy(this.carts,(({updated_at:t})=>"d"+new Date(t).getDate()))},count(){return _.mapValues(this.date_day,((t,a)=>_.countBy(_.get(this.group,a,[]),"status")))},statics(){return _.mapValues(this.date_day,((t,a)=>_.zipObject(["day","orders","confirmed","delivered","total"],[t,_.get(this.group,a,[]).length,_.get(this.count,[a,"Confirmed"],0)+_.get(this.count,[a,"Delivered"],0),_.get(this.count,[a,"Delivered"],0),this.total(_.get(this.group,a,[]))])))},graph_days(){return _.map(this.statics,"day")},bar_totals(){return[_.map(this.statics,"total")]},axis_min(){return _.floor(_.min(this.bar_totals[0]),-3)},axis_max(){return _.ceil(1.15*_.max(this.bar_totals[0]),-2)},line_values(){return[_.map(this.statics,"total")]},area_names(){return["Orders","Confirmed","Delivered"]},area_values(){return _.map(this.area_names,(t=>_.map(this.statics,_.toLower(t))))}},methods:{total(t){return _.sumBy(t,(({amount:t})=>_.toNumber(t)))}}},d=i,n=e("2877"),l=e("9989"),o=e("f09f"),h=e("a370"),p=e("2bb1"),u=e("bd08"),g=e("357e"),c=e("db86"),m=e("eebe"),v=e.n(m),y=Object(n["a"])(d,s,r,!1,null,null,null);a["default"]=y.exports;v()(y,"components",{QPage:l["a"],QCard:o["a"],QCardSection:h["a"],QMarkupTable:p["a"],QTr:u["a"],QTh:g["a"],QTd:c["a"]})}}]);