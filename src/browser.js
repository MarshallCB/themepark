import { fillObject, toCSSVars } from './helpers'

export class Themepark{
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
    this.vars = fillObject(this.definitions, this.params)
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
  shift(h){
    this.hue = h;
    this.update()
  }
  style(query){
    // Todo: create array of each element for each query so we can attach an event listener for unmount
    // So we can automatically attach an unsub event to that
    this.sub((o) => document.querySelectorAll(query).forEach(e => {
      e.style = toCSSVars(o)
    }))
  }
}