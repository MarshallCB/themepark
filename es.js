function s(s){let t="";for(const i in s)t+=`--${i}: ${s[i]};`;return t}export default class{constructor(t,i){this.subscribers=new Map,this.params=t,this.definitions=i,this.vars=this.definitions(this.params),this.css=s(this.vars)}update(t={}){this.vars=this.definitions(Object.assign(this.params,t)),this.css=s(this.vars),this.subscribers.forEach(s=>{s.call(null,{vars:this.vars,params:this.params,css:this.css})})}subscribe(s,t=!0){let i="_"+Math.random().toString(36).substr(2,9);return this.subscribers.set(i,s),t&&this.update(),()=>this.subscribers.delete(i)}style(s){let t="string"==typeof s?()=>document.querySelectorAll(s):()=>[s];try{this.subscribe(({css:s})=>t().forEach(t=>{requestAnimationFrame(()=>{t.style.cssText=s})}))}catch(s){console.error(s)}}}
