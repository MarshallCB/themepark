import { toCSSVars, fillObject } from './helpers'

export function generateTheme(defaults, definitions){
  let vars = fillObject(definitions, defaults)
  return {
    css: toCSSVars(vars),
    values: vars
  }
}