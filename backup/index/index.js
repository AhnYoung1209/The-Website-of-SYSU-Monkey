/*(function(){*/
	var target = [],
		height = [],
		ch = window.innerHeight || document.body.clientHeight;
	function throttle(fn,interval){
	 	var _self = fn,
	 		timer,
	 		firstTime = true;
	 	return function(){
	 		var args = arguments,
	 			_me = this;
	 		if(firstTime){
	 			_self.apply(_me,args);
	 			return firstTime = false;
	 		}
	 		if(timer){
	 			return false;
	 		}
	 		timer = setTimeOut(function(){
	 			clearTimeOut(timer);
	 			timer = null;
	 			_self.apply(_me,args);
	 		},interval || 500);
	 	};
	}
	function hasClass(node,className){    
        var cNames=node.className.split(/\s+/);//根据空格来分割node里的元素；    
        for(var i=0;i<cNames.length;i++){    
            if(cNames[i]==className){
            	return true;
            }    
        }    
        return false;    
    }

	var scroll = {
		getEle: function(className){    
            if(document.getElementByClassName){    
                return document.getElementByClassName(className); //FF下因为有此方法，所以可以直接获取到；    
            }    
            var nodes=document.getElementsByTagName("*"),//获取页面里所有元素，因为他会匹配全页面元素，所以性能上有缺陷，但是可以约束他的搜索范围；    
                target=[];//用来保存符合的className；    
            for(var i=0;i<nodes.length;i++){    
                if(hasClass(nodes[i],className)){
                	target.push(nodes[i]);
               	}    
            }    
            return target;    
        }, 
        getHeight: function(){
			for(var i=0;i<target.length;i++){
				(function(i){
					var ht = target[i].getBoundingClientRect().top;
					height.push(ht);					
				})(i);
				console.log(height);
			}        	
        },
        init: function(){
        	scroll.getHeight();
			for(var i=0;i<target.length;i++){
				(function(i){
					if(height[i] > ch){
						target[i].style='display: none';
					}
				})(i);
			}
        },		
		judge: function(){
			var sc = document.body.scrollTop || document.documentElement.scrollTop;
			for(var i=0;i<target.length;i++){
				(function(i){
					if(height[i]<(ch+sc+50)){
						target[i].style='display: block';
					}
				})(i);
			}
		}
	};	
	var target = scroll.getEle('container');
	window.onload = function(){
		scroll.init();
	}
	window.onscroll = function(){
		throttle(scroll.judge(),2000);
	};
/*})();*/
	/*
	var EventUtil = {
		addHandler: function(element, type, handler){
			if(element.addEventListener){
				element.addEventListener(type,handler,false);
			}else if(element.attachEvent){
				element.attachEvent("on" + type, handler);
			}else{
				elmenet["on" + type] = handler;
			}
		},
		removeHandler: function(element, type, handler){
			if(element.removeEventListener){
					element.removeEventListener(type, handler, false);
			}else if(element.detachEvent){
					element.detachEvent("on"+type, handler);
			}else{
				element["on"+type] = null;
			}
		}
	}; */