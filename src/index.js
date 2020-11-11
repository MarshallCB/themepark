function toCSSVars(o){
  let s = '';
  for(const k in o)
    s += `--${k}:${o[k]};`
  return s;
}

let { assign } = Object;
class Themepark{
  constructor(params, definitions){
    assign(this,{
      s: new Set(),
      params,
      definitions
    })
    this.update();
  }
  update(updated_params = {}){
    //updates this.params, then uses new this.params to fill vars
    this.vars = this.definitions(assign(this.params,updated_params))
    this.css = toCSSVars(this.vars)
    this.s.forEach((v) => {
      // this has { vars, params, css }
      v(this)
    })
  }
  subscribe(fn,instant=true){
    this.s.add(fn)
    if(instant){
      this.update()
    }
    return () => this.s.delete(fn);
  }
  style(target){
    // if it's a string, we assume it's a CSS query. Else, we assume it's a node
    // return a function so if new nodes are added, we get the most up-to-date 
    let nodes = typeof target === 'string' ? ()=>document.querySelectorAll(target) : ()=>[target]
    this.subscribe(({ css }) => nodes().map(e => {
      requestAnimationFrame(()=>{ e.style.cssText = css })
    }))
  }
}

// function Themepark(){
//   assign(this,{
//     s: new Set(),
//     params,
//     definitions
//   })
//   this.update();
// }

// assign(Themepark.prototype, {
//   update(updated_params = {}){
//       //updates this.params, then uses new this.params to fill vars
//       this.vars = this.definitions(assign(this.params,updated_params))
//       this.css = toCSSVars(this.vars)
//       this.s.forEach((v) => {
//         // this has { vars, params, css }
//         v.call(null, this)
//       })
//     },
//     subscribe(fn,instant=true){
//       this.s.add(fn)
//       if(instant){
//         this.update()
//       }
//       return () => this.s.delete(fn);
//     },
//     style(target){
//       // if it's a string, we assume it's a CSS query. Else, we assume it's a node
//       // return a function so if new nodes are added, we get the most up-to-date 
//       let nodes = typeof target === 'string' ? ()=>document.querySelectorAll(target) : ()=>[target]
//       this.subscribe(({ css }) => nodes().forEach(e => {
//         requestAnimationFrame(()=>{ e.style.cssText = css })
//       }))
//     }
// })

export default Themepark;