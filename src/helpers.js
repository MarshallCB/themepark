export function fillDefinitions(params, definitions){
  return definitions.call(null, params)
}

export function toCSSVars(o){
  let s = '';
  for(const k in o)
    s += `--${k}: ${o[k]};`
  return s;
}