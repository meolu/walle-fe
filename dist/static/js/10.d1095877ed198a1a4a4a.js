webpackJsonp([10],{HdAN:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n("Xxa5"),a=n.n(r),c=n("exGp"),l=n.n(c),i=n("Dd8w"),o=n.n(i),s=n("oZit"),u={name:"roles",data:function(){return{value:"",columns:function(){var e=this;return[{prop:"name",label:"项目名",width:180},{prop:"status",label:"状态",width:180},{prop:"version",label:"版本",width:180},{label:"操作",minWidth:200,render:function(t,n,r){return t("div",[t("el-button",{attrs:{type:"text",icon:"el-icon-edit",size:"small"},on:{click:function(){return e.edit(o()({},n.row))}}},["编辑"]),t("el-button",{attrs:{type:"text",icon:"el-icon-delete",size:"small"},class:"user-delete",on:{click:function(){return e.delete(o()({},n.row))}}},["删除"])])}}]}.call(this),form:{search:""},breadcrumbData:[{to:"",name:"项目"}]}},methods:{callServe:function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:this.$refs.table;return l()(a.a.mark(function n(){var r,c,l,i;return a.a.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,Object(s.d)({size:t.page.size,page:t.page.currentPage,kw:e.value});case 2:r=n.sent,c=r.data,l=c.list,i=c.count,t.page.total=i,t.list=l;case 8:case"end":return n.stop()}},n,e)}))()},search:function(){this.callServe()},addProject:function(){this.$router.push("/project/create")},edit:function(e){this.$router.push("/project/edit/"+e.id)},deleteRole:function(e){var t=this;return l()(a.a.mark(function n(){return a.a.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,Object(s.b)(e.id);case 2:t.callServe(),t.$message({type:"success",message:"删除成功!"});case 4:case"end":return n.stop()}},n,t)}))()},delete:function(e){var t=this;this.$confirm("确定删除该角色吗?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){t.deleteRole(e)}).catch(function(){t.$message({type:"info",message:"已取消删除"})})}}},d={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"wl-project"},[n("wl-breadcrumb",{attrs:{data:e.breadcrumbData,isBackButton:!1}}),e._v(" "),n("el-form",{attrs:{inline:!0},nativeOn:{submit:function(e){e.preventDefault()}}},[n("el-form-item",[n("el-input",{attrs:{placeholder:"请输入项目名称",size:"small"},nativeOn:{keyup:function(t){return"button"in t||!e._k(t.keyCode,"enter",13,t.key,"Enter")?e.search(t):null}},model:{value:e.value,callback:function(t){e.value=t},expression:"value"}},[n("el-button",{attrs:{slot:"append",icon:"el-icon-search"},on:{click:e.search},slot:"append"})],1)],1),e._v(" "),n("el-form-item",[n("el-button",{attrs:{type:"primary",size:"small"},on:{click:e.addProject}},[e._v("新建项目")])],1)],1),e._v(" "),n("wl-table",{ref:"table",attrs:{columns:e.columns},on:{callServe:e.callServe}})],1)},staticRenderFns:[]};var p=n("VU/8")(u,d,!1,function(e){n("bEfo")},null,null);t.default=p.exports},bEfo:function(e,t){}});
//# sourceMappingURL=10.d1095877ed198a1a4a4a.js.map