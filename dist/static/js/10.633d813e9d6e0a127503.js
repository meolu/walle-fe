webpackJsonp([10],{"4kd1":function(e,t,r){"use strict";t.e=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return Object(n.b)("task/",e,{target:".wl-table",isRemoveField:!0})},t.d=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};return Object(n.b)("task/"+e,t,r)},t.a=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return Object(n.c)("task/",e,{headers:{"content-type":"multipart/form-data"},transformRequest:[function(e){return s.a.stringify(e)}]})},t.g=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return Object(n.d)("task/"+e,t,{headers:{"content-type":"multipart/form-data"},transformRequest:[function(e){return s.a.stringify(e)}]})},t.b=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return Object(n.d)("task/"+e+"/audit",t,{headers:{"content-type":"multipart/form-data"},transformRequest:[function(e){return s.a.stringify(e)}]})},t.f=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return Object(n.d)("task/"+e+"/reject",t,{headers:{"content-type":"multipart/form-data"},transformRequest:[function(e){return s.a.stringify(e)}]})},t.c=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return Object(n.a)("task/"+e,t)};var n=r("diZN"),a=r("mw3O"),s=r.n(a)},Pi2Z:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=r("//Fk"),a=r.n(n),s=r("Dd8w"),o=r.n(s),i=r("Xxa5"),c=r.n(i),u=r("exGp"),l=r.n(u),m=r("oZit"),f=r("4kd1"),d=r("diZN");function p(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return Object(d.b)("repo/branches/",e,t)}function v(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return Object(d.b)("repo/tags/",e,t)}function h(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return Object(d.b)("repo/commits/",e,t)}var b={props:{taskId:String},created:function(){var e=this;return l()(c.a.mark(function t(){return c.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(!e.isNew){t.next=4;break}e.getProject(e.$route.params.projectId),t.next=7;break;case 4:return t.next=6,e.getTask();case 6:e.getProject();case 7:case"end":return t.stop()}},t,e)}))()},data:function(){return{breadcrumbData:[{to:"/deploy/index",name:"上线单"},{to:"",name:this.id?"编辑":"创建"}],project:{},task:{},branchs:[],tags:[],commits:[],form:{name:"",branch:"",commit_id:"",servers_mode:"全量服务器上线",servers:[],tag:""},rules:{name:[{required:!0,message:"请输入上线单名称",trigger:"blur"}]}}},computed:{isNew:function(){return"TaskCreateOfProject"===this.$route.name&&!this.taskId}},methods:{checkServers:function(){return this.project.servers_info.length===this.task.servers_info.length?"全量服务器上线":"自定义服务器上线"},getProject:function(e){var t=this;return l()(c.a.mark(function r(){var n,a,s,o,i,u;return c.a.wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,Object(m.c)(e||t.task.project_id);case 2:if(n=r.sent,a=n.data,t.project=a,t.isNew?t.form.servers=[].concat(t.project.servers_info):t.form.servers=t.project.servers_info.filter(function(e){return t.task.servers.split(",").indexOf(e.id.toString())>-1}),t.isNew||(t.form.servers_mode=t.checkServers()),"branch"!==t.project.repo_mode){r.next=15;break}return r.next=10,p({project_id:t.project.id});case 10:s=r.sent,o=s.data.branches,t.branchs=o,r.next=20;break;case 15:return r.next=17,v({project_id:t.project.id});case 17:i=r.sent,u=i.data.tags,t.tags=u;case 20:case"end":return r.stop()}},r,t)}))()},getTask:function(){var e=this;return l()(c.a.mark(function t(){var r,n;return c.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,Object(f.d)(e.$route.params.taskId);case 3:return r=t.sent,n=r.data,e.task=n,e.form=o()({},e.form,n),t.abrupt("return",a.a.resolve());case 10:return t.prev=10,t.t0=t.catch(0),t.abrupt("return",a.a.reject(t.t0));case 13:case"end":return t.stop()}},t,e,[[0,10]])}))()},requertForm:function(){var e={name:this.form.name,project_id:this.project.id,servers:this.form.servers.map(function(e){return e.id}).join(","),commit_id:this.form.commit_id,branch:this.form.branch,file_transmission_mode:0,file_list:"*.log",tag:this.form.tag};return console.log(e),e},onSubmit:function(){var e=this;this.$refs.form.validate(function(t){if(!t)return!1;e.isNew?e.addTask():e.updateTask()})},addTask:function(){var e=this;return l()(c.a.mark(function t(){return c.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,Object(f.a)(e.requertForm());case 2:e.$message({type:"success",message:"添加成功"}),e.$router.push("/deploy/index");case 4:case"end":return t.stop()}},t,e)}))()},updateTask:function(){var e=this;return l()(c.a.mark(function t(){return c.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,Object(f.g)(e.$route.params.taskId,e.requertForm());case 2:e.$message({type:"success",message:"修改成功"}),e.$router.push("/deploy/index");case 4:case"end":return t.stop()}},t,e)}))()},deleteServer:function(e,t){this.form.servers.splice(t,1)}},watch:{"form.servers_mode":{immediate:!0,handler:function(e){"全量服务器上线"===e&&(this.form.servers=this.project&&this.project.servers_info?[].concat(this.project.servers_info):[])}},"form.branch":{handler:function(e){var t=this;return l()(c.a.mark(function r(){var n,a;return c.a.wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,h({project_id:t.project.id,branch:e});case 2:n=r.sent,a=n.data.branches,t.commits=a;case 5:case"end":return r.stop()}},r,t)}))()}}}},_={render:function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"wl-task-edit"},[r("wl-breadcrumb",{attrs:{data:e.breadcrumbData}}),e._v(" "),r("div",{staticClass:"wl-task-edit__content"},[r("el-form",{ref:"form",attrs:{model:e.form,"label-width":"100px",rules:e.rules,size:"small"}},[r("el-form-item",{attrs:{label:"上线单标题",prop:"name"}},[r("el-input",{model:{value:e.form.name,callback:function(t){e.$set(e.form,"name",t)},expression:"form.name"}})],1),e._v(" "),e.project&&"branch"===e.project.repo_mode?r("el-form-item",{attrs:{label:"选取分支"}},[r("el-select",{attrs:{placeholder:"选取分支"},model:{value:e.form.branch,callback:function(t){e.$set(e.form,"branch",t)},expression:"form.branch"}},e._l(e.branchs,function(e){return r("el-option",{key:e,attrs:{label:e,value:e}})}))],1):e._e(),e._v(" "),e.project&&"tag"===e.project.repo_mode?r("el-form-item",{attrs:{label:"选取Tag"}},[r("el-select",{attrs:{placeholder:"选取Tag"},model:{value:e.form.tag,callback:function(t){e.$set(e.form,"tag",t)},expression:"form.tag"}},e._l(e.tags,function(e){return r("el-option",{key:e,attrs:{label:e,value:e}})}))],1):e._e(),e._v(" "),e.project&&"branch"===e.project.repo_mode?r("el-form-item",{attrs:{label:"选取版本"}},[r("el-select",{attrs:{placeholder:"选取版本"},model:{value:e.form.commit_id,callback:function(t){e.$set(e.form,"commit_id",t)},expression:"form.commit_id"}},e._l(e.commits,function(e){return r("el-option",{key:e.id,attrs:{label:e.name,value:e.id}})}))],1):e._e(),e._v(" "),r("el-form-item",{attrs:{label:"选取服务器"}},[r("el-radio-group",{model:{value:e.form.servers_mode,callback:function(t){e.$set(e.form,"servers_mode",t)},expression:"form.servers_mode"}},[r("el-radio",{attrs:{label:"全量服务器上线"}}),e._v(" "),r("el-radio",{attrs:{label:"自定义服务器上线"}})],1)],1),e._v(" "),"自定义服务器上线"===e.form.servers_mode?r("el-form-item",[r("div",{staticClass:"wl-task-edit__servers"},e._l(e.form.servers,function(t,n){return r("el-tag",{key:t.id,attrs:{closable:"",type:"info"},on:{close:function(){return e.deleteServer(t,n)}}},[e._v("\n                    "+e._s(t.name)+"\n                  ")])}))]):e._e(),e._v(" "),r("el-form-item",[r("el-button",{attrs:{type:"primary"},on:{click:e.onSubmit}},[e._v("提交")])],1)],1)],1)],1)},staticRenderFns:[]};var g=r("VU/8")(b,_,!1,function(e){r("Zl5i")},null,null);t.default=g.exports},Zl5i:function(e,t){}});
//# sourceMappingURL=10.633d813e9d6e0a127503.js.map