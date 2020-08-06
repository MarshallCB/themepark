export function fillObject(definitions, parameters){
  let ans = {}
  Object.keys(definitions).forEach(k => {
    if(typeof definitions[k] === 'function'){
      ans[k] = definitions[k](parameters)
    } else {
      ans[k] = definitions[k]
    }
  })
  return ans;
}

export function toCSSVars(o){
  let s = '';
  Object.keys(o).forEach(k => {
    s += `--${k}: ${o[k]};`
  })
  return s;
}