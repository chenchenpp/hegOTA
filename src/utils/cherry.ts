export const queryString= function(obj: object){
  return Object.keys(obj).reduce((addStr, curStr, index)=>{
      return index===0 ? `${addStr}${curStr}=${obj[curStr]}` : `${addStr} & ${curStr}=${obj[curStr]}`
  }, '?')
}