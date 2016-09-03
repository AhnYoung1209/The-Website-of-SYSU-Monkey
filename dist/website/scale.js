

function setAttr(imgcontainerClass){
	var imgContainer=document.getElementsByClassName(imgcontainerClass);
	for(var i=0;i<imgContainer.length;i++){
		var hisheight=getStyle(imgContainer[i],"height"),
		    hisWidth=getStyle(imgContainer[i],"width");
		imgContainer[i].style.height=hisheight;
		imgContainer[i].style.width=hisWidth;
	}
}

function getStyle(ele,attr){
	if(ele.currentStyle){
		return ele.currentStyle[attr]
	}else{
		return getComputedStyle(ele,false)[attr]
	}
}

setAttr("scale-img-container");