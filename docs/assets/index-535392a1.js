var k=Object.defineProperty;var U=(d,n,l)=>n in d?k(d,n,{enumerable:!0,configurable:!0,writable:!0,value:l}):d[n]=l;var u=(d,n,l)=>(U(d,typeof n!="symbol"?n+"":n,l),l);import{e as B,F,ad as g,I as q,o as G,c as I,f as e,w as t,k as o,h as m,b as W,ay as w}from"./index-e153df15.js";import{E as O}from"./card-7222c153.js";import{b as L,c as M,E as T,a as j,d as z}from"./form-item-791c0475.js";import{E as D}from"./button-4880f90f.js";import{E as J,a as K}from"./checkbox-39bbd6b9.js";import"./input-f862da05.js";/* empty css            */import{E as P,a as Q}from"./select-eacb8e37.js";import"./scrollbar-3e9e1590.js";import"./popper-a87d989a.js";import"./event-e06a23af.js";import"./index-585adaae.js";import"./index-9c3a91fe.js";import"./index-797bd7d9.js";import"./isNil-c75b1b34.js";import"./strings-c34a71bd.js";import"./scroll-5d20b4f9.js";class A{constructor(){u(this,"next");u(this,"results");this.next=null,this.results=[]}setNext(n){this.next=n}handle(){if(this.canHandle())return this.doHandle();if(this.next)return this.next.handle();this.errHandle()}handleAll(){return this.canHandle()||this.errHandle(),this.next?(this.doHandle(),this.next.handleAll()):this.doHandle()??!0}handleAllResult(){return this.canHandle()||this.errHandle(),this.results.push(this.doHandle()),this.next?[...this.results,...this.next.handleAllResult()]:this.results}}class S extends A{constructor(l,x,b){super();u(this,"condition");u(this,"action");u(this,"errAction");this.condition=l,this.action=x,this.errAction=b}canHandle(){return this.condition()}doHandle(){if(this.action)return this.action()}errHandle(){if(this.errAction)return this.errAction();throw new Error("ChainNode Error")}}class E extends A{constructor(l){super();u(this,"condition");u(this,"result");this.condition=l,this.result=!1}canHandle(){return this.result=this.condition(),this.result}doHandle(){return this.result}errHandle(){return this.result}}class V{constructor(){u(this,"head");this.head=null}append(n){if(!this.head){this.head=n;return}this.head.setNext(n)}execute(){if(this.head)return this.head.handle();throw new Error("At least one node on the chain")}executeAll(){if(this.head)return this.head.handleAll();throw new Error("At least one node on the chain")}executeAllResult(){if(this.head)return this.head.handleAllResult();throw new Error("At least one node on the chain")}}const X=W("span",{class:"text-18px"},"责任链模式",-1),Y=W("pre",{class:"text-14px"},`        游戏规则:
         1. 狼堡当中灰太狼必须出战
         2. 懒羊羊十分胆小, 它出战必须满足以下条件
            1. 喜羊羊出战
            2. 沸羊羊出战
            3. 慢羊羊必须拿出秘密武器
            4. 红太狼未出战
         3. 当懒羊羊参战且西瓜太狼未参战时, 羊群在白天能够战胜狼群
         4. 夜晚羊群一定被会抓
         5. 如果西瓜太狼参战, 羊群必被抓
      `,-1),_e=B({__name:"index",setup(d){const n=F(null),l=g({time:"",xiSheep:"",feiSheep:"",manSheep:"",lanSheep:"",wolfs:[],isWatermelonWar:!1}),x=g({time:[{required:!0,message:"请选择战斗时间",trigger:"change"}],xiSheep:[{required:!0,message:"请选择是否出战",trigger:"blur"}],feiSheep:[{required:!0,message:"请选择是否出战",trigger:"blur"}],manSheep:[{required:!0,message:"请选择是否出战",trigger:"blur"}],lanSheep:[{required:!0,message:"请选择是否出战",trigger:"blur"}],wolfs:[{trigger:"change",validator(p,a,h){console.log(p);const c=new V,r=new S(()=>a.length,null,()=>h(new Error("至少一只狼出战"))),i=new S(()=>a.includes("greyWolf"),null,()=>h(new Error("灰太狼必须参战")));c.append(r),c.append(i),c.executeAll(),h()}}]}),b=q(()=>l.xiSheep==="fight"&&l.feiSheep==="fight"&&l.manSheep==="secretWeapon"&&!l.wolfs.includes("redWolf"));async function H(){var r;if(!await((r=n.value)==null?void 0:r.validate()))return;const p=new V,a=new E(()=>l.isWatermelonWar),h=new E(()=>l.time==="night"),c=new E(()=>l.lanSheep==="escape");p.append(a),p.append(h),p.append(c),p.execute()?w.error("狼堡获胜"):w.success("羊村获胜")}return(p,a)=>{const h=L,c=M,r=T,i=P,f=Q,_=J,v=K,C=j,N=D,R=z,y=O;return G(),I("div",null,[e(y,{shadow:"hover"},{header:t(()=>[X]),default:t(()=>[Y,e(R,{ref_key:"formRef",ref:n,model:o(l),rules:o(x),"label-width":120,"status-icon":""},{default:t(()=>[e(r,{label:"战斗时间",prop:"time"},{default:t(()=>[e(c,{modelValue:o(l).time,"onUpdate:modelValue":a[0]||(a[0]=s=>o(l).time=s)},{default:t(()=>[e(h,{label:"day"},{default:t(()=>[m("白天")]),_:1}),e(h,{label:"night"},{default:t(()=>[m("夜晚")]),_:1})]),_:1},8,["modelValue"])]),_:1}),e(r,{label:"喜羊羊",prop:"xiSheep"},{default:t(()=>[e(f,{modelValue:o(l).xiSheep,"onUpdate:modelValue":a[1]||(a[1]=s=>o(l).xiSheep=s),clearable:"",placeholder:"请选择是否出战"},{default:t(()=>[e(i,{label:"出战",value:"fight"}),e(i,{label:"逃跑",value:"escape"})]),_:1},8,["modelValue"])]),_:1}),e(r,{label:"沸羊羊",prop:"feiSheep"},{default:t(()=>[e(f,{modelValue:o(l).feiSheep,"onUpdate:modelValue":a[2]||(a[2]=s=>o(l).feiSheep=s),clearable:"",placeholder:"请选择是否出战"},{default:t(()=>[e(i,{label:"出战",value:"fight"}),e(i,{label:"逃跑",value:"escape"})]),_:1},8,["modelValue"])]),_:1}),e(r,{label:"慢羊羊",prop:"manSheep"},{default:t(()=>[e(f,{modelValue:o(l).manSheep,"onUpdate:modelValue":a[3]||(a[3]=s=>o(l).manSheep=s),clearable:"",placeholder:"请选择是否出战"},{default:t(()=>[e(i,{label:"逃跑",value:"escape"}),e(i,{label:"拐杖",value:"crutch"}),e(i,{label:"秘密武器",value:"secretWeapon"})]),_:1},8,["modelValue"])]),_:1}),e(r,{label:"懒羊羊",prop:"lanSheep"},{default:t(()=>[e(f,{modelValue:o(l).lanSheep,"onUpdate:modelValue":a[4]||(a[4]=s=>o(l).lanSheep=s),clearable:"",placeholder:"请选择是否出战"},{default:t(()=>[e(i,{label:"逃跑",value:"escape"}),e(i,{label:"出战",value:"fight",disabled:!o(b)},null,8,["disabled"])]),_:1},8,["modelValue"])]),_:1}),e(r,{label:"狼堡出站",prop:"wolfs"},{default:t(()=>[e(v,{modelValue:o(l).wolfs,"onUpdate:modelValue":a[5]||(a[5]=s=>o(l).wolfs=s)},{default:t(()=>[e(_,{label:"greyWolf"},{default:t(()=>[m("灰太狼")]),_:1}),e(_,{label:"redWolf"},{default:t(()=>[m("红太狼")]),_:1}),e(_,{label:"smallWolf"},{default:t(()=>[m("小灰灰")]),_:1}),e(_,{label:"bananaWolf"},{default:t(()=>[m("蕉太狼")]),_:1})]),_:1},8,["modelValue"])]),_:1}),e(r,{label:"西瓜太狼参战",prop:"isWatermelonWar"},{default:t(()=>[e(C,{modelValue:o(l).isWatermelonWar,"onUpdate:modelValue":a[6]||(a[6]=s=>o(l).isWatermelonWar=s)},null,8,["modelValue"])]),_:1}),e(r,null,{default:t(()=>[e(N,{type:"danger",onClick:H},{default:t(()=>[m("开战")]),_:1})]),_:1})]),_:1},8,["model","rules"])]),_:1})])}}});export{_e as default};
