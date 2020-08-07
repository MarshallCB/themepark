import { toCSSVars, fillObject } from './helpers'

export function generateCSSVars(defaults, definitions){
  let vars = fillObject(definitions, defaults)
  return {
    css: toCSSVars(vars),
    values: vars
  }
}