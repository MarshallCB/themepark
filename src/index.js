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
      v.call(null, this.vars)
    })
  }
  sub(fn, instant = true){
    let id = "_" + Math.random().toString(36).substr(2, 9)
    this.subscribers.set(id, fn)
    if(instant){
      fn.call(null,this.vars)
    }
    return id;
  }
  unsub(id){
    this.subscribers.delete(id)
  }
  style(query){
    try{
      this.sub((o) => document.querySelectorAll(query).forEach(e => {
        e.style.cssText = toCSSVars(o)
      }))
    } catch(e){
      console.error(e)
    }
  }
}

export default Themepark;