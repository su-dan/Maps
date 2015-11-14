//给window.onload添加函数
function addLoad(func){
	var oldOnLoad=window.onload;
	if(typeof window.onload !== "function"){
		window.onload=func;
	}else{
		window.onload=function(){
			oldOnLoad();
			func();
		}
	}
}

//跨浏览器添加事件
function addEvent(obj,type,fn){
	if (obj.addEventListener) {
		obj.addEventListener(type,fn,false);		
	} else if(obj.attachEvent){
		obj.attachEvent("on"+type,fn);
	};
}

//跨浏览器移除事件
function removeEvent (obj,type,fn) {
	if (obj.removeEventListener) {
		obj.removeEventListener(type,fn,false);		
	} else if(obj.detachEvent){
		obj.detachEvent("on"+type,fn);
	};
}

//跨浏览器阻止默认行为
function preDef (ev) {
	var ev=ev||event;
	if (ev.preventDefault) {
		ev.preventDefault();	
	} else{
		ev.returnValue=false;
	};
}

//跨浏览器选择文本
function selectText (textBox,startIndex,stopIndex) {
	if (textBox.setSelectionRange) {
		textBox.setSelectionRange(startIndex,stopIndex);
	} else if(textBox.createTextRange){
		var range=textBox.createTextRange();
		range.collapse();
		range.moveStart("character",startIndex);
		range.moveEnd("character",stopIndex-startIndex);
		range.select();
	};
}

//跨浏览器获得选取的文本
function getSelectedText (textBox) {
	if (typeof textBox.selectionStart == "number") {
		return textBox.value.substring(textBox.selectionStart,textBox.selectionEnd);
	} else if(document.selection){
		return document.selection.createRange().text;
	};
}

//跨浏览器获取字符编码
function getCharCode (ev) {
	var ev=ev||event;
	if (typeof ev.charCode == "number") {
		return ev.charCode;
	} else{
		return ev.keyCode;
	};
}




//获得元素的样式
function getStyle(obj,name){
	return obj.currentStyle?obj.currentStyle[name]:getComputedStyle(obj,false)[name];
}

//获得标签名为tagName,类名className的元素
function getClass(tagName,className) //获得标签名为tagName,类名className的元素
{
    if(document.getElementsByClassName) //支持这个函数
    {        
    	return document.getElementsByClassName(className);
    }
    else
    {       
    	var tags=document.getElementsByTagName(tagName);//获取标签
        var tagArr=[];//用于返回类名为className的元素
        for(var i=0;i < tags.length; i++)
        {
            if(tags[i].className == className)
            {
                tagArr.push(tags[i]);//保存满足条件的元素
            }
        }
        return tagArr;
    }
}


//完美运动框架 
function perfectMove(obj,json,fEnd){
	clearInterval(obj.timer);
	obj.timer=setInterval(function(){
		var bStop=true;//验证最后是否所有的都到了目标值  所有都到了才关闭定时器 即 只要一个没到就不关闭定时器

		for(var attr in json ){
			var current_protery=0;
			if(attr == "opacity"){
				//这里可能出现误差 例如 0.07*100不等于7 而是 7.000000000001
				current_protery=Math.round(parseFloat(getStyle(obj, attr))*100);
			}else{
				current_protery=parseInt(getStyle(obj, attr));
			}
			var speed=(json[attr]-current_protery)/5;
			speed=speed>0?Math.ceil(speed):Math.floor(speed);
			if(current_protery != json[attr]){
				bStop=false;
			}
			if(attr == "opacity"){
				obj.style.filter="alpha(opacity:"+(current_protery+speed)+")";
				obj.style.opacity=(current_protery+speed)/100;
			}else if(attr == "zIndex"){
				obj.style[attr]=current_protery+speed;
			}else{
				obj.style[attr]=current_protery+speed+"px";
			}
		}
		if(bStop){
			clearInterval(obj.timer);
			if(fEnd) fEnd();
		}
	},30);
}

// //自动切换焦点
function tabForward3(ev,obj){
	var ev=ev||event;
	var target=ev.target||ev.srcElement;
	if(target.value.length == target.maxLength){
		for(var i=0,len=1;i<len;i++){
			if(obj.elements[i] == target){
				if(obj.elements[i]){
					obj.elements[i+1].focus();
				}
				return;						
			}
		}
	}
}

//验证输入
function beforeSubmit(form){
	return confirm("登录的用户名为 "+form.elements["username"].value+"?");
}

//任意值的运动框架  特殊属性的处理: 透明度 opacity、
function startMove(obj,name,iTarget){
	clearInterval(obj.timer);
	obj.timer=setInterval(function(){
		var current_protery=0;
		if(name == "opacity"){
			//这里可能出现误差 例如 0.07*100不等于7 而是 7.000000000001
			current_protery=Math.round(parseFloat(getStyle(obj, name))*100);
		}else{
			current_protery=parseInt(getStyle(obj, name));
		}
		var speed=(iTarget-current_protery)/5;
		speed=speed>0?Math.ceil(speed):Math.floor(speed);
		if(current_protery == iTarget){
			clearInterval(obj.timer);
		}else{
			if(name == "opacity"){
				obj.style.filter="alpha(opacity:"+(current_protery+speed)+")";
				obj.style.opacity=(current_protery+speed)/100;
			}else{
				obj.style[name]=current_protery+speed+"px";
			}
		}
	},30);
}



