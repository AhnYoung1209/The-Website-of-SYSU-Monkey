/**
 * 
 * @authors 谢志强 (594613537@qq.com)
 * @date    2016-07-07 11:43:54
 * @version $Id$
 */
var searchBtn=document.getElementById("js-toggle-search");
var menuBtn=document.getElementById("js-toggle-menu");
var searchBox=document.getElementById("js-toggle-search-data");
var menuBox=document.getElementById("js-toggle-nav-data");
var searchBoolean=true;
var menuBoolean=true;


searchBtn.onclick=function(){
    if(searchBoolean){
        searchBox.style.display="block";
        startmove(searchBox,42);
    }else{
        startmove(searchBox,0);
    }
    searchBoolean=!searchBoolean;
}

menuBtn.onclick=function(){
    if(menuBoolean){
        menuBox.style.display="block";
        startmove(menuBox,148);
    }else{
        startmove(menuBox,0);
    }
    menuBoolean=!menuBoolean;
}

function startmove(ele,itarget){
    clearInterval(ele.timer);
    ele.timer=setInterval(function(){
        var cur=parseInt(getStyle(ele,"height"));
        ispeed=(itarget-cur)/7;
        if(ispeed>0){
            ispeed=Math.ceil(ispeed);
        }else{
            ispeed=Math.floor(ispeed);
        }
        if(cur==itarget){
            clearInterval(ele.timer);
        }else{
            ele.style.height=cur+ispeed+"px";
        }
    },30)
}

function getStyle(ele,attr){
    if(ele.currentStyle){
        return ele.currentStyle[attr];
    }else{
        return getComputedStyle(ele,false)[attr];
    }
}
