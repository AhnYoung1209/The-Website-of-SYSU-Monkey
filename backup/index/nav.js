/**
 * 
 * @authors 忽如寄(谢志强) (594613537@qq.com)
 * @date    2016-07-11 17:32:52
 * @version $Id$
 */
(function(){ 
	var nav=document.getElementById("nav");
    var navTop=nav.offsetTop;
    function scroll(){
         if(document.scrollTop>navTop||document.body.scrollTop>navTop){
        nav.className+=" navfixed";
    }else{
       var navclass=nav.className;
        var navclassArr=navclass.split(" ");
        for(var i=0;i<navclassArr.length;i++){
            if(navclassArr[i]=="navfixed"){
                navclassArr[i]="";
            }
        }
        nav.className=navclassArr.join(" ");
    }
}

addEvent(document,"scroll",scroll);

//兼容IE10及以下的事件绑定函数
function addEvent(ele,event,fn){
    if(window.attachEvent){
        return ele.attachEvent("on"+event,fn);
    }else{
        return ele.addEventListener(event, fn,false);
    }
}})();
