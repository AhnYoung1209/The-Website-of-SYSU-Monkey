var imgArr=document.getElementsByClassName("slide"),
    dotArr=document.getElementsByClassName("dot"),
    minNum=0,
    sliderContainer=document.getElementById("slider-container"),
    prevbtn=document.getElementById("slide-prev"),
    nextbtn=document.getElementById("slide-next"),
    btnAppear=document.getElementsByClassName("slider-container")[0];
var animationNow1=true,
    animationNow2=true;

btnAppear.onmouseover=function(){
    btnmove(prevbtn,"left",0,10);
    btnmove(nextbtn,"right",0,10);
}
btnAppear.onmouseout=function(){
    btnmove(prevbtn,"left",-50,-10);
    btnmove(nextbtn,"right",-50,-10);
}

function btnmove(ele,attr,itarget,speed){
    clearInterval(ele.timer);
    ele.timer=setInterval(function(){
        var curAttr=parseInt(getStyle(ele,attr));
        if(curAttr==itarget){
            clearInterval(ele.timer);
        }else{
            ele.style[attr]=curAttr+speed+"px";
        }
    }, 20);
}
/*自动轮换函数*/
function move(){
    if(minNum==imgArr.length-1){
        automove(imgArr[0],1,animationNow1);
        automove(imgArr[minNum],0,animationNow2);
        imgArr[minNum].id="";
        imgArr[0].id="slide-cur";
        for(i=0;i<dotArr.length;i++){
            dotArr[i].className="dot";
        }
        dotArr[0].className="dot dot-now";
        minNum=0;
    }else{
        automove(imgArr[minNum],0,animationNow2);
        imgArr[minNum].id="";
        minNum++;
        automove(imgArr[minNum],1,animationNow1);
        imgArr[minNum].id="slide-cur";
        for(i=0;i<dotArr.length;i++){
            dotArr[i].className="dot";
        }
        dotArr[minNum].className="dot dot-now";
    }
}

var timer=setInterval(move,7000);
function aaa(){
    timer=setInterval(move,7000);
}



/*焦点点击事件*/
for(i=0;i<dotArr.length;i++){
    dotArr[i].index=i;
    dotArr[i].onclick=function(){
        if(imgArr[this.index].id!="slide-cur"){
            for(i=0;i<dotArr.length;i++){
            dotArr[i].className="dot";
        }
            var curImg=document.getElementById("slide-cur");
            dotArr[this.index].className="dot dot-now";
            automove(imgArr[this.index],1,animationNow1);
            automove(curImg,0,animationNow2);
            curImg.id="";
            imgArr[this.index].id="slide-cur";
            minNum=this.index;
            return minNum;
            clearInterval(timer);
            var timer=setInterval(move,7000)
    }
}
}

prevbtn.onclick=function(){
    if(minNum==0){
        automove(imgArr[minNum],0,animationNow2);
        imgArr[minNum].id="";
        automove(imgArr[imgArr.length-1],1,animationNow1);
        imgArr[imgArr.length-1].id="slide-cur";
        for(i=0;i<dotArr.length;i++){
            dotArr[i].className="dot";
        }
        dotArr[imgArr.length-1].className="dot dot-now";
        minNum=imgArr.length-1;
        return minNum;
}else{
    automove(imgArr[minNum],0,animationNow2);
    imgArr[minNum].id="";
    automove(imgArr[minNum-1],1,animationNow1);
    imgArr[minNum-1].id="slide-cur";
    for(i=0;i<dotArr.length;i++){
            dotArr[i].className="dot";
        }
    dotArr[minNum-1].className="dot dot-now";
    return minNum--;
}
}

nextbtn.onclick=function(){
    if(minNum==imgArr.length-1){
        automove(imgArr[imgArr.length-1],0,animationNow2);
        imgArr[minNum].id="";
        automove(imgArr[0],1,animationNow1);
        imgArr[0].id="slide-cur";
        for(i=0;i<dotArr.length;i++){
            dotArr[i].className="dot";
        }
        dotArr[0].className="dot dot-now";
        return minNum=0;
    }
    automove(imgArr[minNum],0,animationNow2);
    imgArr[minNum].id="";
    automove(imgArr[minNum+1],1,animationNow1);
    imgArr[minNum+1].id="slide-cur";
    for(i=0;i<dotArr.length;i++){
            dotArr[i].className="dot";
        }
    dotArr[minNum+1].className="dot dot-now";
    return minNum++;
}

function automove(ele,itarget,animationNow){
    itarget=itarget*10000;
    clearInterval(ele.timer);
    if(animationNow){
        animationNow=!animationNow;
    ele.timer=setInterval(function(){
        var cur=parseInt(getStyle(ele,"opacity")*10000);
        var ispeed=(itarget-cur)/9;
        if(ispeed>0){
            ispeed=Math.ceil(ispeed);
        }else{
            ispeed=Math.floor(ispeed);
        }
        if(cur==itarget){
            clearInterval(ele.timer);
            animationNow=!animationNow;
        }else{
            ele.style.opacity=(cur+ispeed)/10000;
            ele.style.filter="alpha(opacity:"+cur+ispeed+")";
        }
    },30)
}
}
function getStyle(ele,attr){
    if(ele.currentStyle){
        return ele.currentStyle[attr];
    }else{
        return getComputedStyle(ele,false)[attr];
    }
}

function sliderreset(){
    var windowWid=window.innerWidth;
    var imgSrcArr=[];
    var reArr=[/1920/g,/960/g,/720/g];
    for(var i=0;i<imgArr.length;i++){
        var imgEle=imgArr[i].getElementsByTagName("img")[0];
        imgSrcArr[i]=imgEle.src.toString();
        imgHeight=getStyle(imgEle,"height");
        console.log(imgSrcArr[i]);

        if(windowWid<=960&&windowWid>720){
            if(reArr[0].test(imgSrcArr[i])){
                imgSrcArr[i]=imgSrcArr[i].replace(/1920/g, '960');
            }else{
                imgSrcArr[i]=imgSrcArr[i].replace(/720/g, '960');
            }   
        }else if(windowWid<=720){
            if(reArr[0].test(imgSrcArr[i])){
                imgSrcArr[i]=imgSrcArr[i].replace(/1920/g, '720');
            }else{
                imgSrcArr[i]=imgSrcArr[i].replace(/960/g, '720');
            }  
        }else if(windowWid>960){
            if(reArr[1].test(imgSrcArr[i])){
                imgSrcArr[i]=imgSrcArr[i].replace(/960/g, '1920');
            }else{
                imgSrcArr[i]=imgSrcArr[i].replace(/720/g, '1920');
            } 
        }
        imgEle.src=imgSrcArr[i]
        }
        sliderContainer.style.height=imgHeight;
    };
sliderreset();
//兼容IE10及以下的事件绑定函数
function addEvent(ele,event,fn){
    if(window.attachEvent){
        return ele.attachEvent("on"+event,fn);
    }else{
        return ele.addEventListener(event, fn,false);
    }
}
addEvent(window,"resize",sliderreset)