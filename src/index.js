// function toCSSVars(o){
//   let s = '';
//   for(const k in o)
//     s += `--${k}:${o[k]};`
//   return s;
// }
// let { assign } = Object;
// class Themepark{
//   constructor(params, definitions){
//     assign(this,{
//       s: new Set(),
//       params,
//       definitions
//     })
//     this.update();
//   }
//   update(updated_params = {}){
//     //updates this.params, then uses new this.params to fill vars
//     this.vars = this.definitions(assign(this.params,updated_params))
//     this.css = toCSSVars(this.vars)
//     this.s.forEach((v) => {
//       v(this)
//     })
//   }
//   subscribe(fn,instant=true){
//     this.s.add(fn)
//     if(instant){
//       this.update()
//     }
//     return () => this.s.delete(fn);
//   }
//   style(target){
//     // if it's a string, we assume it's a CSS query. Else, we assume it's a node
//     // return a function so if new nodes are added, we get the most up-to-date 
//     let nodes = typeof target === 'string' ? ()=>document.querySelectorAll(target) : ()=>[target]
//     this.subscribe(({ css }) => nodes().forEach(e => {
//       requestAnimationFrame(()=>{ e.style.cssText = css })
//     }))
//   }
// }

// export default Themepark;

let { defineProperties, keys, assign } = Object

export function themepark(params={}, definitions=x=>x){
  let theme = function(o){
    assign(params, o)
    _update()
  }
  let vars = definitions(params)
  let _$ = new Set()
  function _update(){
    vars = definitions(params)
    _$.forEach(f => f(theme.$))
  }
  let toCSSVars = () => {
    let s = '';
    for(let k in vars)
      s += `--${k}:${vars[k]};`
    return s;
  }
  theme.toString = toCSSVars
  // smart param setters and getters
  defineProperties(theme, 
    keys(params).concat(keys(vars)).reduce((o, k) => assign(o,{
      [k]: {
        get(){ return keys(vars).includes(k) ? `var(--${k})` : params[k] },
        set(v){
          if(keys(params).includes(k)){
            params[k] = v
            _update()
          }
        }
      }
    }), {})
  )
  // 
  assign(theme,{
    $: new Proxy(function(q,instant=true){
      let t = typeof q;
      let fn = x=>x
      if(t === 'function'){
        fn = q;
      } else {
        let nodes = t === 'string' ? ()=>document.querySelectorAll(q) : ()=>[q]
        fn = () => nodes().forEach(e => {
          requestAnimationFrame(()=>{ e.style.cssText = toCSSVars() })
        })
      }
      _$.add(fn)
      if(instant){
        _update();
      }
      return () => _$.delete(fn);
    }, {
      get(_,k){
        return vars[k] || params[k]
      }
    }),
    [Symbol.toPrimitive]: toCSSVars
  })
  return theme;
}

// export let themepark;