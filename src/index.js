import { fillDefinitions, toCSSVars } from './helpers'

class Themepark{
  constructor(params, definitions){
    this.subscribers = new Map()
    this.params = params;
    this.definitions = definitions;
    this.update()
  }
  update(updated_params = {}){
    this.params = {
      ...this.params,
      ...updated_params
    }
    this.vars = fillDefinitions(this.params, this.definitions)
    this.css = toCSSVars(this.vars)
    this.subscribers.forEach((v,k) => {
      v.call(null, this.vars)
    })
  }
  sub(fn, instant = true){
    let id = "_" + Math.random().toString(36).substr(2, 9)
    this.subscribers.set(id, fn)
    if(instant){
      fn.call(null,this.vars)
    }
  }
  unsub(id){
    this.subscribers.delete(id)
  }
  style(query){
    try{
      this.sub((o) => document.querySelectorAll(query).forEach(e => {
        e.style = toCSSVars(o)
      }))
    } catch(e){
      console.error(e)
    }
  }
}
Themepark.toCSSVars = toCSSVars;

export default Themepark;