webpackJsonp([14],{"/8bb":function(e,t){},"/JwC":function(e,t){},"/xoS":function(e,t){},"0Nhe":function(e,t){},"0xDb":function(e,t,n){"use strict";t.b=i,t.c=function(e){return void 0===e},t.a=function(e){if(!i(e))return!1;return"function"==typeof e};var r=n("pFYg"),s=n.n(r);function i(e){var t=void 0===e?"undefined":s()(e);return null!=e&&("object"===t||"function"===t)}},"1spD":function(e,t){},"4MTg":function(e,t,n){"use strict";t.f=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return Object(r.b)("user/",e,{isRemoveField:!0,target:".wl-table"})},t.b=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return Object(r.c)("user/",e,{headers:{"content-type":"multipart/form-data"},transformRequest:[function(e){return i.a.stringify(e)}]})},t.h=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return Object(r.d)("user/"+e,t,{target:".wl-table",headers:{"content-type":"multipart/form-data"},transformRequest:[function(e){return i.a.stringify(e)}]})},t.c=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return Object(r.d)("user/"+e+"/block/",t,{target:".wl-table",headers:{"content-type":"multipart/form-data"},transformRequest:[function(e){return i.a.stringify(e)}]})},t.a=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return Object(r.d)("user/"+e+"/active/",t,{target:".wl-table",headers:{"content-type":"multipart/form-data"},transformRequest:[function(e){return i.a.stringify(e)}]})},t.d=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return Object(r.a)("user/"+e,t)},t.e=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return Object(r.b)("general/menu",e,{isLoading:!1})},t.g=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return Object(r.c)("passport/login",e,{headers:{"content-type":"multipart/form-data"},transformRequest:[function(e){return i.a.stringify(e)}]})};var r=n("diZN"),s=n("mw3O"),i=n.n(s)},HdUi:function(e,t){},NCUp:function(e,t){},NHnr:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n("7+uW"),s={render:function(){var e=this.$createElement,t=this._self._c||e;return t("div",{attrs:{id:"app"}},[t("router-view")],1)},staticRenderFns:[]};var i=n("VU/8")({name:"App"},s,!1,function(e){n("jWk2")},null,null).exports,a=n("zL8q"),o=n.n(a),l=(n("tvR6"),n("Dd8w")),u=n.n(l),c=n("nvbp"),d=n.n(c),m=n("pFYg"),p=n.n(m),f=n("0xDb");var h={name:"wl-table",data:function(){return{list:[],page:{total:0,currentPage:1,size:10},sort:{prop:"",order:""}}},props:{isReload:{type:Boolean,default:!0},inline:{type:Boolean,default:!0},formSize:{type:String,default:"small"},isPage:{type:Boolean,default:!0},pageSizes:{type:Array,default:function(){return[10,20,50,100,150]}},pageSize:{type:Number,default:10},pageLayout:{type:String,default:"total, sizes, prev, pager, next"},form:{type:Object},rules:{type:Object,default:function(){return{}}},columns:{type:Array,default:function(){return[]}},onTable:{type:Object,default:function(){return{}}},elAttr:{type:Object,default:function(){return{}}},tbClass:{type:Object,default:function(){return{}}},tbStyle:{type:Object,default:function(){return{}}}},created:function(){this.page.size=this.pageSize,this.isReload&&this.$emit("callServe",this)},methods:{renderForm:function(e){return e("el-form",{ref:"form",attrs:{inline:this.inline,model:this.form,rules:this.rules,size:this.formSize}},[this.$slots.form])},renderPage:function(e){return e("el-pagination",{class:"wl-table__page",attrs:{background:!0,"current-page":this.page.currentPage,"page-sizes":this.pageSizes,"page-size":this.pageSize,layout:this.pageLayout,total:this.page.total},on:{"size-change":this.sizeChange,"current-change":this.currentChange}})},search:function(){var e=this;this.$refs.form.validate(function(t){if(!t)return!1;e.page.currentPage=1,e.$emit("callServe",e)})},refresh:function(){this.page.currentPage=1,this.$emit("callServe",this)},renderColumns:function(e){var t=this;return this._l(this.columns,function(n){return t.renderColumn(e,n)})},renderColumn:function(e,t){var n=t.render;switch(!0){case Object(f.a)(n):var r=t.methods||{},s=function e(t){if("object"!==(void 0===t?"undefined":p()(t)))return t;var n={};for(var r in t)n[r]=e(t[r]);return n}(t);return delete s.render,delete s.methods,e("el-table-column",d()([this._renderColumnProps(s),{scopedSlots:{default:function(t){return n(e,t,r)}}}]));default:return e("el-table-column",this._renderColumnProps(t))}},_renderColumnProps:function(e){return{props:u()({},e)}},resetFields:function(){this.$refs.form.resetFields()},currentChange:function(e){this.page.currentPage=e,this.$emit("callServe",this)},sizeChange:function(e){this.page.size=e,this.page.currentPage=1,this.$emit("callServe",this)},sortChange:function(e){var t=e.prop,n=e.order;this.sort.prop=t,this.sort.order=n,this.$emit("callServe",this)},$table:function(){return this.$refs.table}},render:function(e){var t={props:u()({},this.elAttr),on:u()({},this.onTable),class:u()({},this.tbClass),style:u()({},this.tbStyle)};return e("div",{class:"wl-table"},[this.$slots.form&&this.renderForm(e),e("el-table",d()([{ref:"table",attrs:{data:this.list,size:"mini"},style:"width: 100%;",on:{"sort-change":this.sortChange}},t]),[this.columns.length>0?this.renderColumns(e):this.$slots.default]),this.isPage&&this.renderPage(e)])}};var v=n("VU/8")(h,null,!1,function(e){n("cM6q")},null,null).exports;v.install=function(e){e.component(v.name,v)};var g=v,b={name:"wl-breadcrumb",props:{data:{type:Array,required:!0},isBackButton:{type:Boolean,default:!0}},methods:{back:function(){var e=this.data.length;this.$router.push(this.data[e-2].to)}}},_={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"wl-breadcrumb"},[n("el-breadcrumb",{attrs:{"separator-class":"el-icon-arrow-right"}},e._l(e.data,function(t){return n("el-breadcrumb-item",{key:t.name,attrs:{to:{path:t.to}}},[e._v(e._s(t.name))])})),e._v(" "),e.isBackButton?n("el-button",{attrs:{type:"primary",size:"small"},on:{click:e.back}},[e._v("返回")]):e._e()],1)},staticRenderFns:[]};var w=n("VU/8")(b,_,!1,function(e){n("QuUu")},null,null).exports;w.install=function(e){e.component(w.name,w)};var y=w,C={name:"wl-split",props:{title:String}},F={render:function(){var e=this.$createElement;return(this._self._c||e)("div",{staticClass:"wl-split"},[this._v("\n    "+this._s(this.title)+"\n")])},staticRenderFns:[]};var x=n("VU/8")(C,F,!1,function(e){n("yQsV")},null,null).exports;x.install=function(e){e.component(x.name,x)};var S=x,j={name:"wl-fullscreen",data:function(){return{id:"aasss",isSupportFullScreen:this.supportFullScreen()}},methods:{toggle:function(e){void 0===e?this.getFullScreenStatus()?this.exitFullscreen():this.enterFullscreen():e?this.enterFullscreen():this.exitFullscreen()},getFullScreenStatus:function(){return!!(document.fullscreen||document.mozFullScreen||document.fullscreenElement||document.msFullscreenElement||document.webkitIsFullScreen)},supportFullScreen:function(){var e=document.documentElement;return"requestFullscreen"in e||"mozRequestFullScreen"in e&&document.mozFullScreenEnabled||"msRequestFullscreen"in e&&document.msFullscreenEnabled||"webkitRequestFullScreen"in e},enterFullscreen:function(){var e=this.$el;e.requestFullscreen?e.requestFullscreen():e.webkitRequestFullscreen?e.webkitRequestFullscreen():e.mozRequestFullScreen?e.mozRequestFullScreen():e.msRequestFullscreen&&e.msRequestFullscreen()},exitFullscreen:function(){document.exitFullscreen?document.exitFullscreen():document.webkitExitFullscreen?document.webkitExitFullscreen():document.mozCancelFullScreen?document.mozCancelFullScreen():document.msExitFullscreen&&document.msExitFullscreen()}}},R={render:function(){var e=this.$createElement;return(this._self._c||e)("div",{staticClass:"wl-fullscreen"},[this._t("default")],2)},staticRenderFns:[]};var k=n("VU/8")(j,R,!1,function(e){n("VKcg")},null,null).exports;k.install=function(e){e.component(k.name,k)};var E=[g,y,S,k],O=navigator.userAgent,$={install:function(e){e.use(o.a),e.$loading=e.prototype.$loading=o.a.Loading.service,E.forEach(function(t){e.use(t)}),e.prototype.$isChrome=/chrome\/([\d/.]+)/i.test(O)}},U=n("NYxO"),z=n("1spD"),P=n("HdUi"),M=n("NCUp"),q=n("Xxa5"),A=n.n(q),T=n("exGp"),N=n.n(T),H=n("4MTg"),L={state:{user:null,menu:null,space:null},getters:{user:function(e){var t=e.user;return t},space:function(e){var t=e.space;return t},menu:function(e){var t=e.menu;return t}},mutations:{SET_USER_INFO:function(e,t){var n=t.user,r=t.space,s=t.menu;e.user=n,e.menu=s,e.space=r}},actions:{FETCH_USER_INFO:function(e){var t=this,n=e.commit;return N()(A.a.mark(function e(){var r,s;return A.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(H.e)();case 2:r=e.sent,s=r.data,n("SET_USER_INFO",s);case 5:case"end":return e.stop()}},e,t)}))()}}};r.default.use(U.a);var I=new U.a.Store({actions:z,getters:M,mutations:P,modules:{User:L},strict:!1}),V={render:function(){var e=this.$createElement;return(this._self._c||e)("div",{staticClass:"wl-body"},[this._t("default")],2)},staticRenderFns:[]};var B=n("VU/8")({name:"wl-body"},V,!1,function(e){n("/8bb")},null,null).exports;B.install=function(e){e.component(B.name,B)};var D=B,W=n("bZyb"),J={props:{visible:{type:Boolean,default:!1}},data:function(){return{activeName:"info",defaultIcon:W.c,info:{username:"",email:"",avatar:""},rules:{email:[{required:!0,message:"请输入邮箱地址",trigger:"blur"},{type:"email",message:"请输入正确的邮箱地址",trigger:"blur"}],username:[{required:!0,message:"请输入昵称",trigger:"blur"}]}}},computed:u()({},Object(U.c)(["user"]),{uploadSrc:function(){return this.user?"http://"+location.host+"/api/user/"+this.user.id+"/avater":""}}),watch:{user:{immediate:!0,deep:!0,handler:function(e){e&&(this.info=u()({},e))}}},methods:u()({},Object(U.b)({getUser:"FETCH_USER_INFO"}),{onCancel:function(){this.$emit("update:visible"),this.$emit("close")},save:function(){var e=this;return N()(A.a.mark(function t(){return A.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return console.log(e.info),t.next=3,Object(H.h)(e.user.id,{username:e.info.username,email:e.info.email});case 3:e.getUser(),e.onCancel();case 5:case"end":return t.stop()}},t,e)}))()},beforeAvatarUpload:function(e){var t="image/jpeg"===e.type,n=e.size/1024/1024<2;return t||this.$message.error("上传头像图片只能是 JPG 格式!"),n||this.$message.error("上传头像图片大小不能超过 2MB!"),t&&n},handleAvatarSuccess:function(e,t){this.info.avatar=URL.createObjectURL(t.raw)}})},Q={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("el-dialog",{staticClass:"wl-self",attrs:{width:"600px",title:"个人设置",visible:e.visible,"before-close":e.onCancel,"append-to-body":!0}},[n("el-tabs",{attrs:{"tab-position":"left"},model:{value:e.activeName,callback:function(t){e.activeName=t},expression:"activeName"}},[n("el-tab-pane",{attrs:{label:"基本设置",name:"info"}},[n("div",{staticClass:"wl-self__info"},[n("el-form",{ref:"form",attrs:{model:e.info,"label-position":"top"}},[n("el-form-item",{attrs:{label:"Avatar"}},[n("span",{staticClass:"item"},[n("img",{staticClass:"icon",attrs:{src:e.info.avatar||e.defaultIcon}})]),e._v(" "),n("el-upload",{staticClass:"avatar-uploader",attrs:{action:e.uploadSrc,"show-file-list":!1,"on-success":e.handleAvatarSuccess,"before-upload":e.beforeAvatarUpload}},[n("el-button",{attrs:{size:"small",type:"primary"}},[e._v("点击上传")])],1)],1),e._v(" "),n("el-form-item",{attrs:{label:"昵称",prop:"username",rules:e.rules.username}},[n("el-input",{model:{value:e.info.username,callback:function(t){e.$set(e.info,"username",t)},expression:"info.username"}})],1),e._v(" "),n("el-form-item",{attrs:{label:"邮箱",prop:"email",rules:e.rules.email}},[n("el-input",{model:{value:e.info.email,callback:function(t){e.$set(e.info,"email",t)},expression:"info.email"}})],1),e._v(" "),n("el-form-item",[n("el-button",{attrs:{size:"small",type:"primary"},on:{click:e.save}},[e._v("更新基本信息")])],1)],1)],1)]),e._v(" "),n("el-tab-pane",{attrs:{label:"安全设置",name:"password"}},[e._v("安全设置")])],1)],1)},staticRenderFns:[]};var Z={name:"wl-header",components:{SelfDialog:n("VU/8")(J,Q,!1,function(e){n("eQIH")},null,null).exports},data:function(){return{isCollapse:!1,visible:!1,defaultIcon:W.c}},computed:u()({},Object(U.c)(["space","user"])),methods:{command:function(e){this[e]&&this[e]()},logout:function(){this.$router.replace("/login")},self:function(){this.visible=!0},onCollapse:function(){this.isCollapse=!this.isCollapse,this.$emit("toggle",this.isCollapse)},toggleSpace:function(e){console.log(e)}}},Y={render:function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("header",{staticClass:"wl-header"},[r("div",{staticClass:"logo",class:{"is-collapse":e.isCollapse}},[r("img",{attrs:{src:n("dLd/")}}),e._v(" "),r("h1",[e._v("  Walle")])]),e._v(" "),r("div",{staticClass:"tool"},[r("i",{staticClass:"btn-collapse wl-icon-expend",on:{click:e.onCollapse}}),e._v(" "),r("div",{staticClass:"user"},[e.space?r("el-dropdown",{staticClass:"user-info",attrs:{trigger:"click"},on:{command:e.toggleSpace}},[r("span",[e._v("\n          "+e._s(e.space.current.name)+"\n          "),r("i",{staticClass:"el-icon-arrow-down el-icon--right"})]),e._v(" "),r("el-dropdown-menu",{staticClass:"wl-header__space-menu",attrs:{slot:"dropdown"},slot:"dropdown"},e._l(e.space.available,function(t){return r("el-dropdown-item",{key:t.id,class:{selected:t.id===e.space.current.id},attrs:{command:t}},[e._v(e._s(t.name))])}))],1):e._e(),e._v(" "),r("el-dropdown",{staticClass:"user-info",on:{command:e.command}},[r("span",[r("img",{attrs:{src:e.user&&e.user.avatar||e.defaultIcon}}),e._v(" "),e.user&&e.user.username?r("span",[e._v(e._s(e.user.username))]):e._e(),e._v(" "),r("i",{staticClass:"el-icon-arrow-down el-icon--right"})]),e._v(" "),r("el-dropdown-menu",{attrs:{slot:"dropdown"},slot:"dropdown"},[r("el-dropdown-item",{attrs:{command:"self"}},[r("i",{staticClass:"wl-icon-user"}),e._v("   个人中心")]),e._v(" "),r("el-dropdown-item",{attrs:{divided:"",command:"logout"}},[r("i",{staticClass:"wl-icon-exit"}),e._v("   退出登录")])],1)],1)],1)]),e._v(" "),r("self-dialog",{attrs:{visible:e.visible},on:{"update:visible":function(t){e.visible=t}}})],1)},staticRenderFns:[]};var G=n("VU/8")(Z,Y,!1,function(e){n("/JwC")},null,null).exports;G.install=function(e){e.component(G.name,G)};var K=G,X={name:"wl-sidebar",props:{isCollapse:{type:Boolean,default:!1}},data:function(){return{menus:[],selected:"m0"}},created:function(){this.initSelected(this.$route)},computed:u()({},Object(U.c)(["menu"])),methods:{select:function(e){this.selected=e,this.$router.push(e)},initSelected:function(e){var t=e.meta,n=e.path;t&&t.isMenu&&(this.selected=t.menu||n)}},watch:{$route:function(e){this.initSelected(e)},menu:{deep:!0,immediate:!0,handler:function(e){this.menus=e}}}},ee={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("el-scrollbar",{staticClass:"wl-sidebar",class:{"is-collapse":e.isCollapse}},[n("el-menu",{attrs:{"default-active":e.selected,"background-color":"#001529","unique-opened":!0,collapse:e.isCollapse},on:{select:e.select}},e._l(e.menus,function(t,r){return t.sub_menu&&t.sub_menu.length>0?n("el-submenu",{key:"menu"+r,attrs:{index:"m"+r,"popper-class":"wl-sidebar__submenu"}},[n("template",{slot:"title"},[t.icon?n("i",{staticClass:"wl-sidebar-icon",class:[t.icon]}):e._e(),e._v(" "),n("span",{attrs:{slot:"title"},slot:"title"},[e._v(e._s(t.title))])]),e._v(" "),e._l(t.sub_menu,function(t,s){return n("el-menu-item",{key:"wlCMenu"+r+"-"+s,attrs:{index:t.url||"child"+r+"-"+s}},[n("span",{attrs:{slot:"title"},slot:"title"},[e._v(e._s(t.title))])])})],2):n("el-menu-item",{attrs:{index:t.url||"m"+r}},[t.icon?n("i",{staticClass:"wl-sidebar-icon",class:[t.icon]}):e._e(),e._v(" "),n("span",{attrs:{slot:"title"},slot:"title"},[e._v(e._s(t.title))])])}))],1)},staticRenderFns:[]};var te=n("VU/8")(X,ee,!1,function(e){n("iTuk")},null,null).exports;te.install=function(e){e.component(te.name,te)};var ne=te,re={render:function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"wl-content"},[t("div",{staticClass:"wl-content__main"},[this._t("default")],2)])},staticRenderFns:[]};var se=n("VU/8")(null,re,!1,function(e){n("0Nhe")},null,null).exports;se.install=function(e){e.component(se.name,se)};var ie={name:"layout",components:{wlBody:D,wlHeader:K,wlSidebar:ne,wlContent:se},data:function(){return{isCollapse:!1}},created:function(){this.user||this.getUserInfo()},computed:u()({},Object(U.c)(["user"])),methods:u()({},Object(U.b)({getUserInfo:"FETCH_USER_INFO"}),{toggle:function(e){this.isCollapse=e}})},ae={render:function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"wl-layout"},[t("wl-header",{on:{toggle:this.toggle}}),this._v(" "),t("wl-body",[t("wl-sidebar",{attrs:{isCollapse:this.isCollapse}}),this._v(" "),t("wl-content",[t("router-view")],1)],1)],1)},staticRenderFns:[]};var oe=n("VU/8")(ie,ae,!1,function(e){n("/xoS")},null,null).exports,le=n("/ocq"),ue=function(){return n.e(12).then(n.bind(null,"dOXA"))},ce=function(){return n.e(3).then(n.bind(null,"m9Po"))},de=function(){return Promise.all([n.e(0),n.e(11)]).then(n.bind(null,"HdAN"))},me=function(){return Promise.all([n.e(0),n.e(1)]).then(n.bind(null,"3fVA"))},pe=function(){return n.e(4).then(n.bind(null,"7vJ7"))},fe=function(){return Promise.all([n.e(0),n.e(8)]).then(n.bind(null,"sroI"))},he=function(){return Promise.all([n.e(0),n.e(2)]).then(n.bind(null,"CMUu"))},ve=function(){return n.e(9).then(n.bind(null,"j4WE"))},ge=function(){return Promise.all([n.e(0),n.e(10)]).then(n.bind(null,"Pi2Z"))},be=function(){return Promise.all([n.e(0),n.e(5)]).then(n.bind(null,"RYHy"))},_e=function(){return n.e(7).then(n.bind(null,"7hsY"))},we=function(){return n.e(6).then(n.bind(null,"Rm9u"))};r.default.use(le.a);var ye=[],Ce={path:"/",children:[],component:oe};!function(e){e.push({path:"/login",name:"Login",component:ue})}(ye),function(e){e.push({path:"/user/index",name:"userList",meta:{isMenu:!0},component:ce})}(Ce.children),function(e){e.push({path:"/project/index",name:"projectList",meta:{isMenu:!0},component:de},{path:"/project/create",name:"ProjectCreate",component:me,meta:{isMenu:!0,menu:"/project/index"},props:!0},{path:"/project/edit/:id",name:"ProjectEdit",meta:{isMenu:!0,menu:"/project/index"},component:me,props:!0},{path:"/project/members/:id",name:"ProjectMembers",meta:{isMenu:!0,menu:"/project/index"},component:he,props:!0},{path:"/server/index",name:"Server",meta:{isMenu:!0},component:pe},{path:"/environment/index",name:"Environment",meta:{isMenu:!0},component:fe})}(Ce.children),function(e){e.push({path:"/deploy/index",name:"taskList",meta:{isMenu:!0},component:ve},{path:"/task/edit",name:"TaskEdit",component:ge,meta:{isMenu:!0,menu:"/deploy/index"},props:!0},{path:"/task/edit/:taskId",name:"TaskEditOfTask",component:ge,meta:{isMenu:!0,menu:"/deploy/index"},props:!0},{path:"/task/create",name:"TaskCreate",meta:{isMenu:!0,menu:"/deploy/index"},component:be,props:!0},{path:"/task/create/:projectId",name:"TaskCreateOfProject",meta:{isMenu:!0,menu:"/deploy/index"},component:ge,props:!0},{path:"/task/deploy/:taskId",name:"TaskDeploy",meta:{isMenu:!0,menu:"/deploy/index"},component:_e,props:!0})}(Ce.children),function(e){e.push({path:"/space/index",name:"spaceList",meta:{isMenu:!0},component:we})}(Ce.children);var Fe=new le.a({mode:"history",routes:ye.concat(Ce,{path:"*",redirect:"/"})});r.default.config.productionTip=!1,r.default.use($),new r.default({el:"#app",router:Fe,store:I,components:{App:i},template:"<App/>"})},QuUu:function(e,t){},VKcg:function(e,t){},bZyb:function(e,t,n){"use strict";n.d(t,"a",function(){return r}),n.d(t,"b",function(){return s}),n.d(t,"c",function(){return i});var r="/api/",s={SUPER:"超级管理员",OWNER:"空间所有者",MASTER:"项目管理员",DEVELOPER:"开发者",REPORTER:"访客"},i="https://gw.alipayobjects.com/zos/rmsportal/eHBsAsOrrJcnvFlnzNTT.png"},cM6q:function(e,t){},"dLd/":function(e,t,n){e.exports=n.p+"static/img/logo.10fba75.png"},diZN:function(e,t,n){"use strict";var r=n("mvHQ"),s=n.n(r),i=n("fZjL"),a=n.n(i),o=n("Dd8w"),l=n.n(o),u=n("bZyb"),c=n("//Fk"),d=n.n(c),m=n("7+uW"),p=n("mtWM"),f=n.n(p),h=n("0xDb"),v=f.a.create({timeout:2e4,withCredentials:!0}),g=[],b=!1,_=null;v.interceptors.request.use(function(e){if(e.isLoading&&(g.push(e.url),!b)){b=!0;var t={text:e.text||"努力加载中..."};e.target&&(t.target=e.target),_=m.default.$loading(t)}return e},function(e){d.a.reject(e)}),v.interceptors.response.use(function(e){var t=e.data,n=t.code,r=t.message,s=t.data,i=e.config;if(i.isLoading){var a=g.indexOf(i.url);g.splice(a,1),_&&0===g.length&&(_.close(),_=null,b=!1)}return Object(h.c)(n)?e.data:0!==n?(i.isAutoMsg&&m.default.prototype.$notify.error({title:""+(i.messageTitle||""),message:""+(i.messagePrefix||"")+r}),d.a.reject({code:n,data:s,message:r})):e.data},function(e){return g=[],_&&(_.close(),_=null),b=!1,e.response,m.default.prototype.$notify.error({title:"操作提示",message:"网络异常, 请刷新重试"}),d.a.reject(e)});var w=v;t.b=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},r=l()({},y,n);return r.params=x(t,r),w.get(F(e,r.isApiHost),r)},t.c=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},r=l()({},y,C,n);return w.post(F(e,r.isApiHost),x(t,r),r)},t.d=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},r=l()({},y,C,n);return w.put(F(e,r.isApiHost),x(t,r),r)},t.a=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},r=l()({},y,C,n);return w.delete(F(e,r.isApiHost),x(t,r),r)};var y={isAutoMsg:!0,messageTitle:"操作提示",messagePrefix:void 0,isLoading:!0,target:void 0,hasUid:!0,isApiHost:!0,isRemoveField:!1,removeField:[]},C={headers:{"content-type":"application/json"}};function F(e,t){if(!t)return e;var n=[u.a];return n.push(e),n.join("")}function x(e,t){return t.isRemoveField?S(e,t.removeField):e}function S(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[],n=JSON.parse(s()(e)),r=t;return 0===t.length&&(r=a()(e)),r.forEach(function(e){var t=n[e];""!==t&&void 0!==t&&null!==t||delete n[e]}),n}},eQIH:function(e,t){},iTuk:function(e,t){},jWk2:function(e,t){},tvR6:function(e,t){},yQsV:function(e,t){}},["NHnr"]);
//# sourceMappingURL=app.dbcc1e39f8ae705c8758.js.map