export const dateFormat= function(date, flagText='-'){
  if (!(date instanceof Date)) {
    date = date ? new Date(date) : new Date();
  }
  var obj = {
    y: date.getFullYear(),
    M: date.getMonth() + 1 > 9 ? date.getMonth() + 1 : '0'+(date.getMonth() + 1) ,
    d: date.getDate()>9 ? date.getDate() : '0'+date.getDate() ,
  };
  let dateStr= Object.values(obj).reduce((addItem, curItem)=>{
    return  addItem ? addItem+flagText+curItem : addItem+curItem
  }, '')
  return dateStr;
}