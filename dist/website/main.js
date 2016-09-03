var imgArr=document.getElementsByClassName("slide"),
	dotArr=document.getElementsByClassName("dot"),
	minNum=0,
	prevbtn=document.getElementById("slide-prev"),
	nextbtn=document.getElementById("slide-next"),
	btnAppear=document.getElementsByClassName("slider-container")[0];

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
        automove(imgArr[0],1);
        automove(imgArr[minNum],0);
        imgArr[0].id="slide-cur";
        for(i=0;i<dotArr.length;i++){
            dotArr[i].className="dot";
        }
        dotArr[0].className="dot dot-now";
        minNum=0;
    }else{
        automove(imgArr[minNum],0);
        imgArr[minNum].id="";
        minNum++;
        automove(imgArr[minNum],1);
        imgArr[minNum].id="slide-cur";
        for(i=0;i<dotArr.length;i++){
            dotArr[i].className="dot";
        }
        dotArr[minNum].className="dot dot-now";
    }
}

var timer=setInterval(move,5000);
function aaa(){
    timer=setInterval(move,5000);
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
            automove(imgArr[this.index],1);
            automove(curImg,0);
            curImg.id="";
            imgArr[this.index].id="slide-cur";
            minNum=this.index;
            return minNum;
            clearInterval(timer);
            var timer=setInterval(move,5000)
    }
}
}

prevbtn.onclick=function(){
    if(minNum==0){
        automove(imgArr[minNum],0);
        imgArr[minNum].id="";
        automove(imgArr[imgArr.length-1],1);
        imgArr[imgArr.length-1].id="slide-cur";
        for(i=0;i<dotArr.length;i++){
            dotArr[i].className="dot";
        }
        dotArr[imgArr.length-1].className="dot dot-now";
        minNum=imgArr.length-1;
        return minNum;
}else{
    automove(imgArr[minNum],0);
    imgArr[minNum].id="";
    automove(imgArr[minNum-1],1);
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
        automove(imgArr[imgArr.length-1],0);
        imgArr[minNum].id="";
        automove(imgArr[0],1);
        imgArr[0].id="slide-cur";
        for(i=0;i<dotArr.length;i++){
            dotArr[i].className="dot";
        }
        dotArr[0].className="dot dot-now";
        return minNum=0;
    }
    automove(imgArr[minNum],0);
    imgArr[minNum].id="";
    automove(imgArr[minNum+1],1);
    imgArr[minNum+1].id="slide-cur";
    for(i=0;i<dotArr.length;i++){
            dotArr[i].className="dot";
        }
    dotArr[minNum+1].className="dot dot-now";
    return minNum++;
}

function automove(ele,itarget){
    itarget=itarget*10000;
    clearInterval(ele.timer);
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
        }else{
            ele.style.opacity=(cur+ispeed)/10000;
            ele.style.filter="alpha(opacity:"+cur+ispeed+")";
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