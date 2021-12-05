(this["webpackJsonpcryptomarket-app"]=this["webpackJsonpcryptomarket-app"]||[]).push([[0],{115:function(e,t,n){},116:function(e,t,n){"use strict";n.r(t);var i=n(0),c=n.n(i),o=n(26),a=n.n(o),r=(n(88),n(8)),s=n(74),l=n(2);var d=function(){return Object(l.jsxs)("div",{id:"nav-bar",children:[Object(l.jsx)("div",{children:Object(l.jsx)("h1",{onClick:function(){return window.location.href="/",!1},children:"CryptoMarketo"})}),Object(l.jsxs)("div",{id:"polygon-ref",children:["Powered by ",Object(l.jsx)("a",{href:"https://polygon.io/",children:"Polygon.io"})]})]})},u=n(21),j=n.n(u),h={getHome:function(){return j.a.get("/").then((function(e){return e.data}))},refreshList:function(e){return j.a.get("/api/myList/refresh/".concat(e)).then((function(e){return e.data}))},getList:function(e){return j.a.get("/api/myList/".concat(e)).then((function(e){return e.data}))},createList:function(e){return j.a.post("/api/myList/".concat(e)).then((function(e){return e.data}))},updateList:function(e,t){return j.a.put("/api/myList/".concat(t),{data:e}).then((function(e){return e.data}))},getCoin:function(e){return j.a.get("/api/coin/".concat(e),{params:e}).then((function(e){return e.data}))},getCoinNews:function(e){return j.a.get("api/coinNews/".concat(e),{params:e}).then((function(e){return e.data}))},testService:function(){return j.a.get("/api/testing").then((function(e){return e.data}))},getAllServer:function(e){return j.a.get("/api/".concat(e)).then((function(e){return e.data}))},searchService:function(e){return j.a.get("/api/search/",{params:e}).then((function(e){return e.data}))}};var b=function(e){var t=e.articleData;return Object(l.jsxs)("div",{className:"article-container",children:[Object(l.jsx)("div",{children:Object(l.jsx)("a",{href:t.article_url,children:t.title})}),Object(l.jsxs)("div",{children:["by: ",t.author]}),Object(l.jsx)("span",{className:"article-divider",children:"-------"})]})};var v=function(e){var t=e.coinNews;return 0===(null===t||void 0===t?void 0:t.length)?Object(l.jsxs)("div",{children:[Object(l.jsx)("div",{className:"module-header",children:" Recent articles:"}),Object(l.jsx)("div",{children:"No recent news about this coin!"})]}):Object(l.jsxs)("div",{children:[Object(l.jsx)("div",{className:"module-header",children:"Recent Articles"}),null===t||void 0===t?void 0:t.map((function(e,t){return Object(l.jsx)("div",{children:Object(l.jsx)(b,{articleData:e})},t)}))]})},f=n(156);var O=function(e){var t=e.listID,n=e.coinData,i=e.coinName,c=e.coinList,o=e.setCoinList;return Object(l.jsxs)("div",{children:[Object(l.jsx)("div",{className:"module-header",children:"Coin information"}),Object(l.jsx)("div",{id:"data-coin-symbol",children:null===n||void 0===n?void 0:n.symbol}),Object(l.jsx)("div",{id:"data-coin-name",children:i}),Object(l.jsxs)("div",{id:"data-coin-price",children:[Object(l.jsxs)("div",{children:["Opening price today: $",null===n||void 0===n?void 0:n.open]}),Object(l.jsxs)("div",{children:["Closing price today: $",null===n||void 0===n?void 0:n.close]})]}),Object(l.jsx)(f.a,{variant:"outlined",onClick:function(){if(function(){var e=!1;return null===c||void 0===c||c.forEach((function(t){t.ticker===(null===n||void 0===n?void 0:n.symbol)&&(e=!0)})),e}())return alert("oops, that's in your list already!"),!1;if(void 0!==n&&void 0!==i){var e={name:i,ticker:null===n||void 0===n?void 0:n.symbol,date:null===n||void 0===n?void 0:n.day,last_price:null===n||void 0===n?void 0:n.close};h.updateList(c.concat(e),t).then((function(t){o(c.concat(e))})).catch((function(e){return console.log(e)}))}return!1},children:"Add to watch list"})]})},m=n(155),x=n(158),p=n(152);var g=function(e){var t=e.listID,n=e.coinList,i=e.setCoinList,o=(e.coinData,e.setCoinData),a=(e.coinNews,e.setCoinNews),s=(e.coinName,e.setCoinName),d=e.setShowSearch,u=c.a.useState(null),j=Object(r.a)(u,2),b=j[0],v=j[1],O=Boolean(b),g=O?"simple-popover":void 0;return Object(l.jsxs)("div",{children:[Object(l.jsxs)("div",{className:"module-header",children:["My Watch List ",Object(l.jsx)(f.a,{variant:"outlined",size:"small",onClick:function(e){return function(e){h.refreshList(e).then((function(e){console.log(e),i(e)})).catch((function(e){return console.log(e)}))}(t)},children:"refresh"}),Object(l.jsx)(f.a,{"aria-describedby":g,variant:"text",size:"small",onClick:function(e){v(e.currentTarget)},children:"?"}),Object(l.jsx)(m.a,{id:g,open:O,anchorEl:b,onClose:function(){v(null)},anchorOrigin:{vertical:"bottom",horizontal:"left"},children:Object(l.jsx)(x.a,{sx:{p:2},children:"API calls are limited to 5/minute, it may take some time to refresh your list and update any prices."})})]}),Object(l.jsx)("div",{children:null===n||void 0===n?void 0:n.map((function(e,c){return Object(l.jsxs)("div",{onClick:function(t){return function(e,t,n){console.log("clicked this",e.currentTarget.id),s(n),h.getCoin(e.currentTarget.id).then((function(e){console.log("coin search",e),d(!1),o(e)})),h.getCoinNews(e.currentTarget.id).then((function(e){console.log("coin news",e),a(e)}))}(t,e.ticker,e.name)},className:"watchlist-coin-container",id:e.ticker,children:[Object(l.jsxs)("div",{children:[Object(l.jsxs)("div",{className:"watchlist-coin-name",children:[Object(l.jsxs)("b",{children:[e.ticker,": "]}),e.name," "]}),Object(l.jsxs)("div",{className:"watchlist-coin-price",children:["$",e.last_price," as of ",e.date]})]}),Object(l.jsx)("div",{children:Object(l.jsx)(p.a,{onClick:function(c){return function(e,c){e.stopPropagation();var o=n.filter((function(e){return e.ticker!==c}));return h.updateList(o,t).then((function(e){console.log(e),i(o)})).catch((function(e){return console.log(e)})),!1}(c,e.ticker)},id:e.name,className:"delete-icon"})})]},c)}))})]})};var C=function(e){var t=e.listID,n=e.showSearch,c=e.results,o=e.coinList,a=e.setShowSearch,s=e.setCoinList,d=Object(i.useState)(),u=Object(r.a)(d,2),j=u[0],b=u[1],f=Object(i.useState)([]),m=Object(r.a)(f,2),x=m[0],p=m[1],C=Object(i.useState)(""),N=Object(r.a)(C,2),w=N[0],L=N[1];return n?0===c.length?Object(l.jsx)("div",{id:"no-result-msg",children:"No result found matching your search term."}):Object(l.jsxs)("div",{id:"search-results",children:[Object(l.jsx)("div",{children:c.map((function(e,t){return Object(l.jsxs)("div",{className:"result-name",id:e.base_currency_symbol,onClick:function(t){return function(e,t){L(t),h.getCoin(e.currentTarget.id).then((function(e){a(!1),b(e)})),h.getCoinNews(e.currentTarget.id).then((function(e){p(e)}))}(t,e.name)},children:[e.base_currency_symbol," (",e.name,")"]},t)}))}),Object(l.jsx)("div",{className:"info-container",id:"coin-watch",children:Object(l.jsx)(g,{listID:t,coinList:o,setCoinList:s,coinData:j,setCoinData:b,coinNews:x,setCoinNews:p,coinName:w,setCoinName:L,setShowSearch:a})})]}):j?Object(l.jsxs)("div",{id:"coin-info-container",children:[Object(l.jsx)("div",{className:"info-container",id:"coin-news",children:Object(l.jsx)(v,{coinNews:x})}),Object(l.jsx)("div",{className:"info-container",id:"coin-data",children:Object(l.jsx)(O,{listID:t,coinData:j,coinName:w,coinList:o,setCoinList:s})}),Object(l.jsx)("div",{className:"info-container",id:"coin-watch",children:Object(l.jsx)(g,{listID:t,coinList:o,setCoinList:s,coinData:j,setCoinData:b,coinNews:x,setCoinNews:p,coinName:w,setCoinName:L,setShowSearch:a})})]}):Object(l.jsx)("div",{className:"info-container",id:"coin-watch",children:Object(l.jsx)(g,{listID:t,coinList:o,setCoinList:s,coinData:j,setCoinData:b,coinNews:x,setCoinNews:p,coinName:w,setCoinName:L,setShowSearch:a})})},N=n(154);var w=function(e){var t=e.listID,n=e.coinList,c=e.setCoinList,o=Object(i.useState)(""),a=Object(r.a)(o,2),s=a[0],d=a[1],u=Object(i.useState)(!1),j=Object(r.a)(u,2),b=j[0],v=j[1],O=Object(i.useState)([]),m=Object(r.a)(O,2),x=m[0],p=m[1];return Object(l.jsx)("div",{children:Object(l.jsxs)("div",{id:"search-component",children:[Object(l.jsx)("div",{id:"search-description",children:"Curious about a coin? Look it up here by ticker or name!"}),Object(l.jsxs)("div",{id:"search",children:[Object(l.jsx)(N.a,{sx:{width:"300px"},id:"outlined-basic",variant:"outlined",type:"text",autoComplete:"off",onChange:function(e){d(e.target.value)}}),Object(l.jsx)(f.a,{sx:{ml:4},id:"search-button",variant:"contained",onClick:function(){return h.searchService(s).then((function(e){v(!0),p(e)})),!1},children:"Search"})]}),Object(l.jsx)("div",{id:"results",children:Object(l.jsx)(C,{listID:t,showSearch:b,results:x,setShowSearch:v,coinList:n,setCoinList:c})})]})})},L=n(73);n(115);var y=function(){var e=Object(i.useState)([]),t=Object(r.a)(e,2),n=t[0],c=t[1],o=Object(i.useState)(""),a=Object(r.a)(o,2),u=a[0],j=a[1];return Object(i.useEffect)((function(){var e=new s.a,t=e.get("marketoListID");if(t)j(t),h.getList(t).then((function(e){c(e.coins)})).catch((function(e){return console.log(e)}));else{var n=Object(L.v4)();e.set("marketoListID",n,{path:"/"}),j(n),h.createList(n).then((function(e){c(e.coins)})).catch((function(e){return console.log(e)}))}}),[]),Object(l.jsxs)("div",{id:"App",children:[Object(l.jsx)(d,{}),Object(l.jsx)(w,{listID:u,coinList:n,setCoinList:c})]})},S=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,160)).then((function(t){var n=t.getCLS,i=t.getFID,c=t.getFCP,o=t.getLCP,a=t.getTTFB;n(e),i(e),c(e),o(e),a(e)}))};a.a.render(Object(l.jsx)(c.a.StrictMode,{children:Object(l.jsx)(y,{})}),document.getElementById("root")),S()},88:function(e,t,n){}},[[116,1,2]]]);
//# sourceMappingURL=main.f202bac7.chunk.js.map