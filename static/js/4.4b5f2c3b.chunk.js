(this["webpackJsonpoverwatch-logs"]=this["webpackJsonpoverwatch-logs"]||[]).push([[4],{371:function(e,t,a){e.exports={MainPage:"MainPage_MainPage__pCp6N"}},439:function(e,t,a){"use strict";a.r(t);var n=a(23),r=a(24),l=a(26),o=a(25),i=a(0),c=a.n(i),s=a(27),u=a.n(s),d=a(9),g=a.n(d),p=a(352),f=a(103),m=a(179),h=a(440),k=a(441),v=a(32),y=a(39),D=a(38),E=a(371),C=a.n(E),x="updatable",T=function(e){Object(l.a)(a,e);var t=Object(o.a)(a);function a(){var e;Object(n.a)(this,a);for(var r=arguments.length,l=new Array(r),o=0;o<r;o++)l[o]=arguments[o];return(e=t.call.apply(t,[this].concat(l))).state={logs:[],roles:{1:{label:"Tank",color:"#218ffe"},2:{label:"Damage",color:"#4A4C4E"},3:{label:"Support",color:"#FA9C1D"}},loading:!1,error:!1,idToDel:null,modalText:"Are you sure you want to delete the log?"},e.getList=function(){e.setState({loading:!0}),u.a.get("/log/list").then((function(t){var a=t.data.data;e.setState({logs:a,loading:!1})})).catch((function(t){console.log(t.response),e.setState({error:!0,loading:!1})}))},e.deleteLogHandler=function(){var t=e.state,a=t.logs,n=t.idToDel;p.a.loading({content:"Deleting...",key:x}),u.a.delete("log/delete/".concat(n)).then((function(t){var r=a.filter((function(e){return e._id!==n}));e.setState({logs:r,idToDel:null}),p.a.success({content:"The Log has been successfully deleted!",key:x,duration:1})}))},e.goToCreateLogHandler=function(){e.props.history.push("/create")},e}return Object(r.a)(a,[{key:"componentDidMount",value:function(){this.getList()}},{key:"render",value:function(){var e=this,t=this.state,a=t.roles,n=t.logs,r=t.error,l=t.loading,o=t.idToDel,i=c.a.createElement(c.a.Fragment,null,c.a.createElement("p",{className:C.a.MessageNoLogs,style:{textAlign:"center",fontSize:"24px",color:"#FA9C1D",marginTop:"40px"}},"You have no logs yet!"),c.a.createElement(f.a,{type:"primary",onClick:this.goToCreateLogHandler},"Create Log!"));if(r&&(i=c.a.createElement(y.a,null,"Something went wrong!")),n.length){var s=[{title:"Role",dataIndex:"role",render:function(e){return c.a.createElement(m.a,{color:a[e].color},a[e].label)}},{title:"Character/Hero",dataIndex:"characters",render:function(e){}},{title:"Map",dataIndex:"map"},{title:"Previous Rank",dataIndex:"previousRank"},{title:"Rank",dataIndex:"rank"},{title:"Result",dataIndex:"result",render:function(e){return e>0?"+".concat(e):e}},{title:"Date",dataIndex:"date",render:function(e){return g()(e).format("DD-MM-YYYY")}},{dataIndex:"_id",render:function(t){return c.a.createElement(f.a,{type:"danger",onClick:function(){return e.setState({idToDel:t})}},"Delete")}}],u=n.map((function(e){return{_id:e._id,role:e.role,characters:e.heroes,map:e.map,previousRank:e.previousRating,rank:e.rating,result:e.result,date:e.date}}));i=c.a.createElement(h.a,{columns:s,dataSource:u,rowKey:"_id"})}return c.a.createElement("div",{className:C.a.MainPage},c.a.createElement(D.a,null,l?c.a.createElement(v.a,null):c.a.createElement(c.a.Fragment,null,c.a.createElement(k.a,{onOk:this.deleteLogHandler,visible:!!o,onCancel:function(){return e.setState({idToDel:null})},footer:[c.a.createElement(f.a,{key:"cancel",onClick:function(){return e.setState({idToDel:null})}},"Cancel"),c.a.createElement(f.a,{key:"delete",type:"danger",onClick:this.deleteLogHandler},"Delete")]},c.a.createElement("p",{style:{fontSize:18}},this.state.modalText)),i)))}}]),a}(i.Component);t.default=T}}]);
//# sourceMappingURL=4.4b5f2c3b.chunk.js.map