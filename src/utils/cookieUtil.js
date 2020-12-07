module.exports = {
  setCookie: function (name, value, domain){
    var Days = 1;
    var exp = new Date();
    exp.setTime(exp.getTime() + Days*24*60*60*1000);
    document.cookie = name + '='+ escape (value) + (domain ? ';domain=' + domain : '') + ';expires=' + exp.toGMTString()+';path=/';
  },
  getCookie: function (name){
    var arr, reg=new RegExp('(^| )'+name+'=([^;]*)(;|$)');
    if(document.cookie.match(reg)){
      arr=document.cookie.match(reg)
      return unescape(arr[2]);
    } 
    return null;
  },
  delCookie: function (name){
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval=this.getCookie(name);
    if(cval!=null)
    document.cookie= name + '='+cval+';expires='+exp.toGMTString()+';path=/';
  }
}