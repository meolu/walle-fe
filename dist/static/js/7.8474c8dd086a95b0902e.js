webpackJsonp([7],{"7hsY":function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=s("mvHQ"),n=s.n(o),a=s("0xDb"),r={name:"deploy-log",props:{value:Array},methods:{getLogClass:function(e){return 0===e.status?"success":"error"},getLogContext:function(e){return 0===e.status?e.success:e.error},getLogCommand:function(e){return Object(a.b)(e)?e.cmd||e.output||"":e}}},i={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"wl-task-log"},[s("div",{staticClass:"wl-task-log__body"},[s("pre",[e._v("            "),e._l(e.value,function(t,o){return[e._v("\n                "),s("div",{key:o+"command",staticClass:"wl-task-log__line"},[e._v("\n                    "),s("a"),e._v("\n                    "),s("span",{staticClass:"command"},[e._v(e._s(e.getLogCommand(t)))]),e._v("\n                ")]),e._v("\n                "),e.getLogContext(t)?s("div",{key:o+"log",staticClass:"wl-task-log__line"},[e._v("\n                    "),s("a"),e._v("\n                    "),s("span",{class:e.getLogClass(t)},[e._v(e._s(e.getLogContext(t)))]),e._v("\n                ")]):e._e(),e._v("\n            ")]}),e._v("\n        ")],2)])])},staticRenderFns:[]};var l={prev_release:1,release:2,post_release:3,prev_deploy:4,deploy:5,post_deploy:6},c={components:{DeployLog:s("VU/8")(r,i,!1,function(e){s("BkU0")},null,null).exports},props:{taskId:[String,Number]},data:function(){return{breadcrumbData:[{to:"/deploy/index",name:"上线单"},{to:"",name:"发布"}],activeStep:0,record:[],loading:null,reConnectCount:5}},created:function(){this.initWebSocket()},destroyed:function(){this.websock.close()},methods:{initWebSocket:function(){this.websock=new WebSocket("ws://api.walle-web.io/websocket/console"),this.websock.onmessage=this.websocketonmessage,this.websock.onopen=this.websocketonopen,this.websock.onerror=this.websocketonerror,this.reConnectCount--},websocketonopen:function(){this.loading&&this.loading.close();var e={text:this.taskId};this.websocketsend(n()(e))},websocketonerror:function(){this.loading||(this.loading=this.$loading({lock:!0,text:"Loading",spinner:"el-icon-loading",background:"rgba(0, 0, 0, 0.7)"})),this.reConnectCount>0&&this.initWebSocket()},websocketonmessage:function(e){var t=JSON.parse(e.data);this.record.push(t),console.log(t),t&&t.stage&&(this.activeStep=l[t.stage])},websocketsend:function(e){this.websock.send(e)}}},d={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"wl-task-deploy"},[s("wl-breadcrumb",{attrs:{data:e.breadcrumbData}}),e._v(" "),s("el-steps",{attrs:{active:e.activeStep,"finish-status":"finish"}},[s("el-step",{attrs:{title:"prev_release"}}),e._v(" "),s("el-step",{attrs:{title:"release"}}),e._v(" "),s("el-step",{attrs:{title:"post_release"}}),e._v(" "),s("el-step",{attrs:{title:"prev_deploy"}}),e._v(" "),s("el-step",{attrs:{title:"deploy"}}),e._v(" "),s("el-step",{attrs:{title:"post_deploy"}})],1),e._v(" "),s("deploy-log",{attrs:{value:e.record}})],1)},staticRenderFns:[]};var u=s("VU/8")(c,d,!1,function(e){s("z9CQ")},null,null);t.default=u.exports},BkU0:function(e,t){},z9CQ:function(e,t){}});
//# sourceMappingURL=7.8474c8dd086a95b0902e.js.map