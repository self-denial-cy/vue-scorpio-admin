import{o as n,c as v,b as h,e as y,F as d,bk as z,r as k,f as e,w as t,a as u,g as _,l as B,ay as s,E as H}from"./index-d2418495.js";import{E as I}from"./card-2cae3166.js";import{E as M}from"./input-9bff9bd2.js";import{E as N}from"./button-a4736b01.js";/* empty css             *//* empty css            */import{E as S,a as D}from"./select-2428c051.js";import"./scrollbar-ebd476ef.js";import"./popper-1400ae5f.js";import"./event-e06a23af.js";import"./index-2ff8ffc7.js";import"./isNil-c75b1b34.js";import"./index-5376bfed.js";import"./strings-28a00192.js";import"./scroll-ce2de36b.js";import"./index-3acd8632.js";const O={viewBox:"0 0 1024 1024",width:"1em",height:"1em"},U=h("path",{fill:"currentColor",d:"M128 320v576h576V320H128zm-32-64h640a32 32 0 0 1 32 32v640a32 32 0 0 1-32 32H96a32 32 0 0 1-32-32V288a32 32 0 0 1 32-32zM960 96v704a32 32 0 0 1-32 32h-96v-64h64V128H384v64h-64V96a32 32 0 0 1 32-32h576a32 32 0 0 1 32 32zM256 672h320v64H256v-64zm0-192h320v64H256v-64z"},null,-1),$=[U];function A(f,o){return n(),v("svg",O,$)}const F={name:"ep-document-copy",render:A},P=h("span",{class:"text-18px"},"剪切板",-1),le=y({name:"clipboard",__name:"index",setup(f){const o=d(""),a=d("method"),{copy:x,isSupported:E}=z();function V(){if(!E){s.error("Your browser does not support Clipboard API");return}if(!o.value){s.warning("请输入要复制的文本内容");return}x(o.value),s.success(`复制成功：${o.value}`)}return(Y,l)=>{const p=S,w=D,c=F,i=H,m=N,b=M,g=I,C=k("clipboard");return n(),v("div",null,[e(g,null,{header:t(()=>[P]),default:t(()=>[e(b,{modelValue:o.value,"onUpdate:modelValue":l[1]||(l[1]=r=>o.value=r),clearable:"",size:"large",type:"text",maxlength:"16","show-word-limit":"",placeholder:"请输入要复制的文本内容"},{prepend:t(()=>[e(w,{modelValue:a.value,"onUpdate:modelValue":l[0]||(l[0]=r=>a.value=r),size:"large",placeholder:"请选择复制方式",class:"w-120px"},{default:t(()=>[e(p,{label:"函数方式",value:"method"}),e(p,{label:"指令方式",value:"directive"})]),_:1},8,["modelValue"])]),append:t(()=>[a.value==="method"?(n(),u(m,{key:0,size:"large",onClick:V},{default:t(()=>[e(i,{class:"w-16px! h-16px!"},{default:t(()=>[e(c,{class:"text-16px"})]),_:1})]),_:1})):_("",!0),a.value==="directive"?B((n(),u(m,{key:1,size:"large"},{default:t(()=>[e(i,{class:"w-16px! h-16px!"},{default:t(()=>[e(c,{class:"text-16px"})]),_:1})]),_:1})),[[C,o.value]]):_("",!0)]),_:1},8,["modelValue"])]),_:1})])}}});export{le as default};