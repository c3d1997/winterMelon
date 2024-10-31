import{y as Z,f as u,z as T,A as x,B as A,p as xe,C as ye,q as _e,D as q,E as ve,G as h,H as m,F as Ae}from"./index-ZHrFudoI.js";const Ie="/images/arrorLeft.png",De="/images/arrorRight.png";/**
 * Vue 3 Carousel 0.4.0
 * (c) 2024
 * @license MIT
 */const d={itemsToShow:1,itemsToScroll:1,modelValue:0,transition:300,autoplay:0,snapAlign:"center",wrapAround:!1,throttle:16,pauseAutoplayOnHover:!1,mouseDrag:!0,touchDrag:!0,dir:"ltr",breakpoints:void 0,i18n:{ariaNextSlide:"Navigate to next slide",ariaPreviousSlide:"Navigate to previous slide",ariaNavigateToSlide:"Navigate to slide {slideNumber}",ariaGallery:"Gallery",itemXofY:"Item {currentSlide} of {slidesCount}",iconArrowUp:"Arrow pointing upwards",iconArrowDown:"Arrow pointing downwards",iconArrowRight:"Arrow pointing to the right",iconArrowLeft:"Arrow pointing to the left"}},fe={itemsToShow:{default:d.itemsToShow,type:Number},itemsToScroll:{default:d.itemsToScroll,type:Number},wrapAround:{default:d.wrapAround,type:Boolean},throttle:{default:d.throttle,type:Number},snapAlign:{default:d.snapAlign,validator(e){return["start","end","center","center-even","center-odd"].includes(e)}},transition:{default:d.transition,type:Number},breakpoints:{default:d.breakpoints,type:Object},autoplay:{default:d.autoplay,type:Number},pauseAutoplayOnHover:{default:d.pauseAutoplayOnHover,type:Boolean},modelValue:{default:void 0,type:Number},mouseDrag:{default:d.mouseDrag,type:Boolean},touchDrag:{default:d.touchDrag,type:Boolean},dir:{default:d.dir,validator(e){return["rtl","ltr"].includes(e)}},i18n:{default:d.i18n,type:Object},settings:{default(){return{}},type:Object}};function Te({config:e,slidesCount:n}){const{snapAlign:t,wrapAround:l,itemsToShow:r=1}=e;if(l)return Math.max(n-1,0);let o;switch(t){case"start":o=n-r;break;case"end":o=n-1;break;case"center":case"center-odd":o=n-Math.ceil((r-.5)/2);break;case"center-even":o=n-Math.ceil(r/2);break;default:o=0;break}return Math.max(o,0)}function Ce({config:e,slidesCount:n}){const{wrapAround:t,snapAlign:l,itemsToShow:r=1}=e;let o=0;if(t||r>n)return o;switch(l){case"start":o=0;break;case"end":o=r-1;break;case"center":case"center-odd":o=Math.floor((r-1)/2);break;case"center-even":o=Math.floor((r-2)/2);break;default:o=0;break}return o}function J({val:e,max:n,min:t}){return n<t?e:Math.min(Math.max(e,t),n)}function ke({config:e,currentSlide:n,slidesCount:t}){const{snapAlign:l,wrapAround:r,itemsToShow:o=1}=e;let p=n;switch(l){case"center":case"center-odd":p-=(o-1)/2;break;case"center-even":p-=(o-2)/2;break;case"end":p-=o-1;break}return r?p:J({val:p,max:t-o,min:0})}function pe(e){return e?e.reduce((n,t)=>{var l;return t.type===Ae?[...n,...pe(t.children)]:((l=t.type)===null||l===void 0?void 0:l.name)==="CarouselSlide"?[...n,t]:n},[]):[]}function V({val:e,max:n,min:t=0}){return e>n?V({val:e-(n+1),max:n,min:t}):e<t?V({val:e+(n+1),max:n,min:t}):e}function Ne(e,n){let t;return n?function(...l){const r=this;t||(e.apply(r,l),t=!0,setTimeout(()=>t=!1,n))}:e}function Me(e,n){let t;return function(...l){t&&clearTimeout(t),t=setTimeout(()=>{e(...l),t=null},n)}}function me(e="",n={}){return Object.entries(n).reduce((t,[l,r])=>t.replace(`{${l}}`,String(r)),e)}var Oe=Z({name:"ARIA",setup(){const e=m("config",T(Object.assign({},d))),n=m("currentSlide",u(0)),t=m("slidesCount",u(0));return()=>h("div",{class:["carousel__liveregion","carousel__sr-only"],"aria-live":"polite","aria-atomic":"true"},me(e.i18n.itemXofY,{currentSlide:n.value+1,slidesCount:t.value}))}}),Re=Z({name:"Carousel",props:fe,setup(e,{slots:n,emit:t,expose:l}){var r;const o=u(null),p=u([]),c=u(0),v=u(0),i=T(Object.assign({},d)),s=u((r=e.modelValue)!==null&&r!==void 0?r:0),y=u(0),O=u(0),b=u(0),C=u(0);let _=null,X=null;x("config",i),x("slidesCount",v),x("currentSlide",s),x("maxSlide",b),x("minSlide",C),x("slideWidth",c);const ee=A(()=>Object.assign({},e.breakpoints)),ge=A(()=>Object.assign(Object.assign(Object.assign({},d),e),{i18n:Object.assign(Object.assign({},d.i18n),e.i18n),breakpoints:void 0}));function j(){const a=Object.keys(ee.value||{}).map(f=>Number(f)).sort((f,w)=>+w-+f);let g=Object.assign({},ge.value);a.some(f=>{const w=window.matchMedia(`(min-width: ${f}px)`).matches;return w&&(g=Object.assign(Object.assign({},g),ee.value[f])),w}),he(g)}function he(a){Object.entries(a).forEach(([g,f])=>i[g]=f)}const te=Me(()=>{j(),I(),L()},16);function L(){if(!o.value)return;const a=o.value.getBoundingClientRect();c.value=a.width/i.itemsToShow}function I(){v.value<=0||(O.value=Math.ceil((v.value-1)/2),b.value=Te({config:i,slidesCount:v.value}),C.value=Ce({config:i,slidesCount:v.value}),i.wrapAround||(s.value=J({val:s.value,max:b.value,min:C.value})))}xe(()=>{ye(()=>L()),setTimeout(()=>L(),1e3),j(),oe(),window.addEventListener("resize",te,{passive:!0}),t("init")}),_e(()=>{X&&clearTimeout(X),_&&clearInterval(_),window.removeEventListener("resize",te,{passive:!0})});let S=!1;const D={x:0,y:0},R={x:0,y:0},k=T({x:0,y:0}),P=u(!1),$=u(!1),Se=()=>{P.value=!0},be=()=>{P.value=!1};function ne(a){["INPUT","TEXTAREA","SELECT"].includes(a.target.tagName)||(S=a.type==="touchstart",S||a.preventDefault(),!(!S&&a.button!==0||N.value)&&(D.x=S?a.touches[0].clientX:a.clientX,D.y=S?a.touches[0].clientY:a.clientY,document.addEventListener(S?"touchmove":"mousemove",ae),document.addEventListener(S?"touchend":"mouseup",ie)))}const ae=Ne(a=>{$.value=!0,R.x=S?a.touches[0].clientX:a.clientX,R.y=S?a.touches[0].clientY:a.clientY;const g=R.x-D.x,f=R.y-D.y;k.y=f,k.x=g},i.throttle);function ie(){const a=i.dir==="rtl"?-1:1,g=Math.sign(k.x)*.4,f=Math.round(k.x/c.value+g)*a;if(f&&!S){const w=H=>{H.preventDefault(),window.removeEventListener("click",w)};window.addEventListener("click",w)}M(s.value-f),k.x=0,k.y=0,$.value=!1,document.removeEventListener(S?"touchmove":"mousemove",ae),document.removeEventListener(S?"touchend":"mouseup",ie)}function oe(){!i.autoplay||i.autoplay<=0||(_=setInterval(()=>{i.pauseAutoplayOnHover&&P.value||B()},i.autoplay))}function le(){_&&(clearInterval(_),_=null),oe()}const N=u(!1);function M(a){const g=i.wrapAround?a:J({val:a,max:b.value,min:C.value});s.value===g||N.value||(t("slide-start",{slidingToIndex:a,currentSlideIndex:s.value,prevSlideIndex:y.value,slidesCount:v.value}),N.value=!0,y.value=s.value,s.value=g,X=setTimeout(()=>{if(i.wrapAround){const f=V({val:g,max:b.value,min:0});f!==s.value&&(s.value=f,t("loop",{currentSlideIndex:s.value,slidingToIndex:a}))}t("update:modelValue",s.value),t("slide-end",{currentSlideIndex:s.value,prevSlideIndex:y.value,slidesCount:v.value}),N.value=!1,le()},i.transition))}function B(){M(s.value+i.itemsToScroll)}function z(){M(s.value-i.itemsToScroll)}const re={slideTo:M,next:B,prev:z};x("nav",re),x("isSliding",N);const se=A(()=>ke({config:i,currentSlide:s.value,slidesCount:v.value}));x("slidesToScroll",se);const we=A(()=>{const a=i.dir==="rtl"?-1:1,g=se.value*c.value*a;return{transform:`translateX(${k.x-g}px)`,transition:`${N.value?i.transition:0}ms`,margin:i.wrapAround?`0 -${v.value*c.value}px`:"",width:"100%"}});function ue(){j(),I(),L(),le()}Object.keys(fe).forEach(a=>{["modelValue"].includes(a)||q(()=>e[a],ue)}),q(()=>e.modelValue,a=>{a!==s.value&&M(Number(a))}),q(v,I),t("before-init");const ce={config:i,slidesCount:v,slideWidth:c,next:B,prev:z,slideTo:M,currentSlide:s,maxSlide:b,minSlide:C,middleSlide:O};l({updateBreakpointsConfigs:j,updateSlidesData:I,updateSlideWidth:L,restartCarousel:ue,slideTo:M,next:B,prev:z,nav:re,data:ce});const U=n.default||n.slides,Y=n.addons,de=T(ce);return()=>{const a=pe(U==null?void 0:U(de)),g=(Y==null?void 0:Y(de))||[];a.forEach((G,W)=>G.props.index=W);let f=a;if(i.wrapAround){const G=a.map((F,E)=>ve(F,{index:-a.length+E,isClone:!0,key:`clone-before-${E}`})),W=a.map((F,E)=>ve(F,{index:a.length+E,isClone:!0,key:`clone-after-${E}`}));f=[...G,...a,...W]}p.value=a,v.value=Math.max(a.length,1);const w=h("ol",{class:"carousel__track",style:we.value,onMousedownCapture:i.mouseDrag?ne:null,onTouchstartPassiveCapture:i.touchDrag?ne:null},f),H=h("div",{class:"carousel__viewport"},w);return h("section",{ref:o,class:{carousel:!0,"is-sliding":N.value,"is-dragging":$.value,"is-hover":P.value,"carousel--rtl":i.dir==="rtl"},dir:i.dir,"aria-label":i.i18n.ariaGallery,tabindex:"0",onMouseenter:Se,onMouseleave:be},[H,g,h(Oe)])}}}),K;(function(e){e.arrowUp="arrowUp",e.arrowDown="arrowDown",e.arrowRight="arrowRight",e.arrowLeft="arrowLeft"})(K||(K={}));const Le={arrowUp:"M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z",arrowDown:"M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z",arrowRight:"M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z",arrowLeft:"M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z"};function Ee(e){return e in K}const Q=e=>{const n=m("config",T(Object.assign({},d))),t=String(e.name),l=`icon${t.charAt(0).toUpperCase()+t.slice(1)}`;if(!t||typeof t!="string"||!Ee(t))return;const r=Le[t],o=h("path",{d:r}),p=n.i18n[l]||e.title||t,c=h("title",p);return h("svg",{class:"carousel__icon",viewBox:"0 0 24 24",role:"img","aria-label":p},[c,o])};Q.props={name:String,title:String};const Pe=(e,{slots:n,attrs:t})=>{const{next:l,prev:r}=n||{},o=m("config",T(Object.assign({},d))),p=m("maxSlide",u(1)),c=m("minSlide",u(1)),v=m("currentSlide",u(1)),i=m("nav",{}),{dir:s,wrapAround:y,i18n:O}=o,b=s==="rtl",C=h("button",{type:"button",class:["carousel__prev",!y&&v.value<=c.value&&"carousel__prev--disabled",t==null?void 0:t.class],"aria-label":O.ariaPreviousSlide,onClick:i.prev},(r==null?void 0:r())||h(Q,{name:b?"arrowRight":"arrowLeft"})),_=h("button",{type:"button",class:["carousel__next",!y&&v.value>=p.value&&"carousel__next--disabled",t==null?void 0:t.class],"aria-label":O.ariaNextSlide,onClick:i.next},(l==null?void 0:l())||h(Q,{name:b?"arrowLeft":"arrowRight"}));return[C,_]},Be=()=>{const e=m("config",T(Object.assign({},d))),n=m("maxSlide",u(1)),t=m("minSlide",u(1)),l=m("currentSlide",u(1)),r=m("nav",{}),o=c=>V({val:l.value,max:n.value,min:0})===c,p=[];for(let c=t.value;c<n.value+1;c++){const v=h("button",{type:"button",class:{"carousel__pagination-button":!0,"carousel__pagination-button--active":o(c)},"aria-label":me(e.i18n.ariaNavigateToSlide,{slideNumber:c+1}),onClick:()=>r.slideTo(c)}),i=h("li",{class:"carousel__pagination-item",key:c},v);p.push(i)}return h("ol",{class:"carousel__pagination"},p)};var Ve=Z({name:"CarouselSlide",props:{index:{type:Number,default:1},isClone:{type:Boolean,default:!1}},setup(e,{slots:n}){const t=m("config",T(Object.assign({},d))),l=m("currentSlide",u(0)),r=m("slidesToScroll",u(0)),o=m("isSliding",u(!1)),p=A(()=>e.index===l.value),c=A(()=>e.index===l.value-1),v=A(()=>e.index===l.value+1),i=A(()=>{const s=Math.floor(r.value),y=Math.ceil(r.value+t.itemsToShow-1);return e.index>=s&&e.index<=y});return()=>{var s;return h("li",{style:{width:`${100/t.itemsToShow}%`},class:{carousel__slide:!0,"carousel__slide--clone":e.isClone,"carousel__slide--visible":i.value,"carousel__slide--active":p.value,"carousel__slide--prev":c.value,"carousel__slide--next":v.value,"carousel__slide--sliding":o.value},"aria-hidden":!i.value},(s=n.default)===null||s===void 0?void 0:s.call(n,{isActive:p.value,isClone:e.isClone,isPrev:c.value,isNext:v.value,isSliding:o.value,isVisible:i.value}))}}});export{Re as C,Pe as N,Be as P,Ve as S,Ie as _,De as a};
