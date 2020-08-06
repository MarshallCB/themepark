import { toCSSVars, fillObject } from './helpers'

export function generate(defaults, definitions){
  let vars = fillObject(definitions, defaults)
  return {
    css: toCSSVars(vars),
    values: vars
  }
}