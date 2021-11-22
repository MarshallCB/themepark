let { defineProperties, keys, assign } = Object

export function themepark(params={}, definitions=x=>x){
  let theme = function(o){
    if(typeof window !== 'undefined'){
      assign(params, o)
      _update()
      return theme;
    } else {
      return themepark(assign(params,o), definitions)
    }
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
          return true;
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