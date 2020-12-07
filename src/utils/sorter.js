export const dateSorter = function(a, b){
  let aTime=new Date(a).getTime();
  let bTime=new Date(b).getTime();
  return aTime-bTime
}