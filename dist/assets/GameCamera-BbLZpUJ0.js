import{f as r,p as c,q as m,d,e as l,o as g}from"./index-DT5jkuKi.js";import{_ as w}from"./_plugin-vue_export-helper-DlAUqK2U.js";const _={class:"game-container"},f={__name:"GameCamera",setup(h){const n=r(null),i=r(0),s=e=>{if(e.origin!==window.location.origin)return;const{type:o,data:a}=e.data;switch(o){case"gameOver":i.value=a.score,console.log("遊戲結束，分數：",a.score);break}},t=()=>{if(!n.value)return;const e=window.innerWidth,o=window.innerHeight,a=Math.min(e/320,o/416);n.value.style.width=`${320*a}px`,n.value.style.height=`${416*a}px`};return c(()=>{t(),window.addEventListener("resize",t),window.addEventListener("message",s)}),m(()=>{window.removeEventListener("resize",t),window.removeEventListener("message",s)}),(e,o)=>(g(),d("div",_,[l("iframe",{ref_key:"gameFrame",ref:n,src:"/gameCamera/index.html",frameborder:"0",scrolling:"no",class:"game-frame"},null,512)]))}},v=w(f,[["__scopeId","data-v-751fb4e9"]]);export{v as default};
