import{I as u,bv as w,ac as I,x as N,b2 as P,e as S,C as A,o as i,c as K,b as d,S as v,N as o,k as a,a as f,w as m,f as C,aH as E,P as y,E as b,g as _,O as h,a0 as L,_ as $,aA as F}from"./index-d2418495.js";import{a as M}from"./button-a4736b01.js";const V=["class","style"],x=/^on[A-Z]/,Y=(t={})=>{const{excludeListeners:c=!1,excludeKeys:r}=t,p=u(()=>((r==null?void 0:r.value)||[]).concat(V)),e=I();return e?u(()=>{var n;return w(Object.entries((n=e.proxy)==null?void 0:n.$attrs).filter(([l])=>!p.value.includes(l)&&!(c&&x.test(l))))}):u(()=>({}))},D=N({type:{type:String,values:["success","info","warning","danger",""],default:""},closable:Boolean,disableTransitions:Boolean,hit:Boolean,color:{type:String,default:""},size:{type:String,values:P,default:""},effect:{type:String,values:["dark","light","plain"],default:"light"},round:Boolean}),O={close:t=>t instanceof MouseEvent,click:t=>t instanceof MouseEvent},R=S({name:"ElTag"}),U=S({...R,props:D,emits:O,setup(t,{emit:c}){const r=t,p=M(),e=A("tag"),n=u(()=>{const{type:s,hit:k,effect:B,closable:T,round:z}=r;return[e.b(),e.is("closable",T),e.m(s),e.m(p.value),e.m(B),e.is("hit",k),e.is("round",z)]}),l=s=>{c("close",s)},g=s=>{c("click",s)};return(s,k)=>s.disableTransitions?(i(),K("span",{key:0,class:o(a(n)),style:h({backgroundColor:s.color}),onClick:g},[d("span",{class:o(a(e).e("content"))},[v(s.$slots,"default")],2),s.closable?(i(),f(a(b),{key:0,class:o(a(e).e("close")),onClick:y(l,["stop"])},{default:m(()=>[C(a(E))]),_:1},8,["class","onClick"])):_("v-if",!0)],6)):(i(),f(L,{key:1,name:`${a(e).namespace.value}-zoom-in-center`,appear:""},{default:m(()=>[d("span",{class:o(a(n)),style:h({backgroundColor:s.color}),onClick:g},[d("span",{class:o(a(e).e("content"))},[v(s.$slots,"default")],2),s.closable?(i(),f(a(b),{key:0,class:o(a(e).e("close")),onClick:y(l,["stop"])},{default:m(()=>[C(a(E))]),_:1},8,["class","onClick"])):_("v-if",!0)],6)]),_:3},8,["name"]))}});var X=$(U,[["__file","/home/runner/work/element-plus/element-plus/packages/components/tag/src/tag.vue"]]);const Z=F(X);export{Z as E,D as t,Y as u};