(this["webpackJsonpcryptomarket-app"]=this["webpackJsonpcryptomarket-app"]||[]).push([[0],{101:function(t,e,n){},102:function(t,e,n){"use strict";n.r(e);var c=n(0),r=n.n(c),i=n(25),o=n.n(i),a=(n(76),n(2));var s=function(){return Object(a.jsx)("div",{id:"navbar",children:"CryptoMarketo nav bar goes here"})},u=n(12),l=n(28),d=n.n(l),j={getList:function(t){return d.a.get("/api/myList/".concat(t)).then((function(t){return t.data}))},getCoin:function(t){return d.a.get("/coin/".concat(t),{params:t}).then((function(t){return t.data}))},testService:function(){return d.a.get("/api/testing").then((function(t){return t.data}))},getAllServer:function(t){return d.a.get("/api/".concat(t)).then((function(t){return t.data}))},searchService:function(t){return d.a.get("/api/search/",{params:t}).then((function(t){return t.data}))}};var h=function(t){var e=t.showCoin,n=t.results;return console.log("inside result",n),e?0===n.length?Object(a.jsx)("div",{children:"No result found!!~"}):Object(a.jsx)("div",{children:n.map((function(t,e){return Object(a.jsxs)("div",{id:t.ticker,onClick:function(t){return function(t){console.log("clicked this",t.currentTarget.id)}(t)},children:[t.name," (",t.ticker,")!!"]},e)}))}):Object(a.jsx)("div",{children:"empty"})},f=n(135),g=n(136);var b=function(){var t=Object(c.useState)(""),e=Object(u.a)(t,2),n=e[0],r=e[1],i=Object(c.useState)(!1),o=Object(u.a)(i,2),s=o[0],l=o[1],d=Object(c.useState)([]),b=Object(u.a)(d,2),v=b[0],p=b[1];return Object(a.jsxs)("div",{children:[Object(a.jsxs)("div",{id:"search",children:[Object(a.jsx)(f.a,{id:"outlined-basic",variant:"outlined",type:"text",autoComplete:"off",onChange:function(t){r(t.target.value)}}),Object(a.jsx)(g.a,{variant:"contained",onClick:function(){return console.log("searching"),console.log(n),j.searchService(n).then((function(t){console.log("search result",t),l(!0),p(t)})),!1},children:"Search"})]}),Object(a.jsx)("div",{id:"results",children:Object(a.jsx)(h,{showCoin:s,results:v})})]})};n(101);var v=function(){var t=window.location.href.split("/")[3];return t=t.split("?")[0],console.log("pageurl",t),Object(c.useEffect)((function(){j.getAllServer(t).then((function(t){return console.log("frontend",t)}))})),Object(a.jsxs)("div",{id:"App",children:[Object(a.jsx)(s,{}),Object(a.jsx)(b,{})]})},p=function(t){t&&t instanceof Function&&n.e(3).then(n.bind(null,138)).then((function(e){var n=e.getCLS,c=e.getFID,r=e.getFCP,i=e.getLCP,o=e.getTTFB;n(t),c(t),r(t),i(t),o(t)}))};o.a.render(Object(a.jsx)(r.a.StrictMode,{children:Object(a.jsx)(v,{})}),document.getElementById("root")),p()},76:function(t,e,n){}},[[102,1,2]]]);
//# sourceMappingURL=main.09976910.chunk.js.map