import{f as r,p as c,q as d,d as m,e as l,o as g}from"./index-DT5jkuKi.js";import{_ as u}from"./_plugin-vue_export-helper-DlAUqK2U.js";const w={class:"game-container"},_={__name:"GameRun",setup(f){const o=r(null),i=r(0),t=n=>{if(n.origin!==window.location.origin)return;const{type:a,data:e}=n.data;switch(a){case"gameOver":i.value=e.score,console.log("遊戲結束，分數：",e.score),console.log("最高分：",e.bestScore);break}},s=()=>{if(!o.value)return;const n=window.innerWidth,a=window.innerHeight,e=Math.min(n/320,a/416);o.value.style.width=`${320*e}px`,o.value.style.height=`${416*e}px`};return c(()=>{s(),window.addEventListener("resize",s),window.addEventListener("message",t)}),d(()=>{window.removeEventListener("resize",s),window.removeEventListener("message",t)}),(n,a)=>(g(),m("div",w,[l("iframe",{ref_key:"gameFrame",ref:o,src:"/gameRun/index.html",frameborder:"0",scrolling:"no",class:"game-frame"},null,512)]))}},v=u(_,[["__scopeId","data-v-c0959e99"]]);export{v as default};
