let{assign:s}=Object;export default class{constructor(t,e){s(this,{s:new Set,params:t,definitions:e}),this.update()}update(t={}){this.vars=this.definitions(s(this.params,t)),this.css=function(s){let t="";for(const e in s)t+=`--${e}:${s[e]};`;return t}(this.vars),this.s.map(s=>{s(this)})}subscribe(s,t=!0){return this.s.add(s),t&&this.update(),()=>this.s.delete(s)}style(s){let t="string"==typeof s?()=>document.querySelectorAll(s):()=>[s];this.subscribe(({css:s})=>t().map(t=>{requestAnimationFrame(()=>{t.style.cssText=s})}))}}
