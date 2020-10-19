function toCSSVars(o){
  let s = '';
  for(const k in o)
    s += `--${k}: ${o[k]};`
  return s;
}

class Themepark{
  constructor(params, definitions){
    this.subscribers = new Map()
    this.params = params;
    this.definitions = definitions;
    this.vars = this.definitions(this.params)
    this.css = toCSSVars(this.vars)
  }
  update(updated_params = {}){
    //updates this.params, then uses new this.params to fill vars
    this.vars = this.definitions(Object.assign(this.params,updated_params))
    this.css = toCSSVars(this.vars)
    this.subscribers.forEach((v) => {
      v.call(null, {vars: this.vars, params: this.params, css: this.css})
    })
  }
  subscribe(fn, instant = true){
    let id = "_" + Math.random().toString(36).substr(2, 9)
    this.subscribers.set(id, fn)
    if(instant){
      this.update()
    }
    return () => this.subscribers.delete(id);
  }
  style(target){
    // if it's a string, we assume it's a CSS query. Else, we assume it's a node
    // return a function so if new nodes are added, we get the most up-to-date 
    let nodes = typeof target === 'string' ? ()=>document.querySelectorAll(target) : ()=>[target]
    try{
      this.subscribe(({ css }) => nodes().forEach(e => {
        requestAnimationFrame(()=>{ e.style.cssText = css })
      }))
    } catch(e){
      console.error(e)
    }
  }
}

export default Themepark;