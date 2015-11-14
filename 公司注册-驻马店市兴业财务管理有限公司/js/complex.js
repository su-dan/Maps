	//如果给运动的元素添加上了border、padding、或其他属性，可能会影响到效果
	//这个函数用来获取元素的属性，可以只得到他的单纯的属性
	function getStyleSub(obj,attr) {
		if(obj.currentStyle) {
			return obj.currentStyle[attr];//IE
		} else {
			return getComputedStyle(obj,false)[attr];
		}
	}	
	//用Json的方法来接受参数，可以同时对多个属性进行操作
	function change(currentObj,json,fn) {
		var flag = true;//假设所有值都达到了要求
		clearInterval(currentObj.timer);
		currentObj.timer = setInterval(function() {	
			for(var attr in json) {
				var curStyle = 0;
				if(attr == "opacity") {
					curStyle = Math.round(parseFloat(getStyleSub(currentObj,attr))*100);
				} else {
					curStyle = parseInt(getStyleSub(currentObj,attr));
				}			
				//缓冲速度
				var speed = (json[attr] - curStyle)/5;
				speed = (speed > 0) ? Math.ceil(speed) : Math.floor(speed);
				if(curStyle != json[attr]) {
					//如果有一个值没有达到要求就将flag设置为false
					flag = false;
				} 
				if(attr == "opacity") {
					currentObj.style.filter = "alpha(opacity:" + (curStyle + speed) + ")";
					currentObj.style.opacity = (curStyle + speed) / 100;
				} else {
					currentObj.style[attr] = curStyle + speed + "px";		
				}
				if(flag) {//如果flag是true就说明所有值都达到了要求
					clearInterval(currentObj.timer);
					if(fn) {
						fn();
					}
				}									
				
			}						
		},100);
	}


//底部的问题部分
(function() {
	//问题
	var oQuestions = document.getElementById("questions");
	var sLis = oQuestions.getElementsByTagName("li");
	var aAnswer = oQuestions.getElementsByTagName("div");

	for(var i=0;i<sLis.length;i++) {
		sLis[i].index = i;
		sLis[i].onclick = function() {
			var that = this;
			for(var j=0;j<aAnswer.length;j++) {				
				aAnswer[j].style.display = "none";
				sLis[j].className = "opacity";
				change(sLis[j],{width:300});//将所有的li设置原始宽度
				//当li的索引超过一半的时候让它显示在li的上面
				if(j>=aAnswer.length/2) {
					aAnswer[j].style.top = -200 + "px";
				}
			}		
			this.className = "noOpacity";	
			aAnswer[this.index].style.display = "block";	
			change(this,{width:700},function() {
				change(that,{width:300});
			});
			this.className = "opacity";	
		}
	}
})();

//图片淡隐淡出轮换
(function () {
	var box = document.getElementById("motto");
	var ul = box.getElementsByTagName("ul");
	var oDivs = box.getElementsByTagName("div");//图片
	var lis = ul[0].getElementsByTagName("li");//小圆点
	var timer = null;
	var index = 0;
	var i = 0; 
	//鼠标放在小圆点上面的时候	
	for (i = 0; i < lis.length; i++) {
		lis[i].index = i;
		lis[i].onmouseover = function () {
			clearInterval(play);
			changePic(this.index);
		}
	}
	//鼠标悬停
	box.onmouseover = function () {
		clearInterval(play);
	};
	//鼠标离开播放
	box.onmouseout = function () {
		autoPlay();
	}; 
	//自动播放函数
	function autoPlay () {
		play = setInterval(function () {
			index++;
			if(index >= oDivs.length) {
				index = 0;
			}
			changePic(index); 
		},4000); 
	}
	autoPlay();//应用图片切换 淡入淡出效果
	function changePic (Index) {
		index = Index;
		var alpha = 0;
		for (i = 0; i < lis.length; i++) {
			lis[i].className = "";//将所有小圆点的样式设为空
		}
		lis[index].className = "index_first";//给当前小圆点应用样式
		clearInterval(timer); //每次播放函数之前都清除上一次的定时器
		for (i = 0; i < oDivs.length; i++) {
			oDivs[i].style.opacity = 0;
			oDivs[i].style.filter = "alpha(opacity=0)"; 
		}
		timer = setInterval(function () {//逐渐改变图片的透明度
			alpha += 2;
			oDivs[index].style.opacity = alpha / 100;
			oDivs[index].style.filter = "alpha(opacity = " + alpha + ")";
			if(alpha == 100) {
				clearInterval(timer);
			}
		},60);
	}
})();


//注册完之后能得到什么
( function() {
	var notice_tit = document.getElementById("title");
	var titles = notice_tit.getElementsByTagName("li");
	var notice_con = document.getElementById("meterial_pic");
	var contents = notice_con.getElementsByTagName("div");
	var index = 0;
	var timer = null;
	//切换样式
	function change (Index) {
		for(var i = 0;i < titles.length;i ++) {
				titles[i].className = "opacity";
				contents[i].style.display = "none";
			}
			titles[Index].className = "noOpacity";
			contents[Index].style.display = "block";
			index = Index;
	}
	//自动播放
	if(timer) {          //如果有等待的定时器，先把它清空
		clearInterval(timer);
		timer = null;
	}
	timer = setInterval(play,3000);
	function play() {
		index ++;
		if(index == titles.length) {
			index = 0;
		}	
		change(index);	
	}
	
	//鼠标的触发
	for(var i=0;i<titles.length;i++) {
		titles[i].index = i;
		titles[i].onmouseover = function() {
			clearInterval(timer);
			change(this.index);
		}
		titles[i].onmouseout = function() {
			timer = setInterval(play,2000);
		}
	}


	//注册公司
	var title_degiter = document.getElementById("title_degiter");
	var degiters = title_degiter.getElementsByTagName("li");
	var degiterContent = document.getElementById("degiter_content");
	var divs = degiterContent.getElementsByTagName("div");
	for(var i = 0;i < degiters.length;i ++) {
		degiters[i].index = i;//添加一个索引
		degiters[i].onclick = function() {
			F(degiters,divs,this);
		}		
	}

	//公司成立后还需要做什么
	var oUl = document.getElementById("nav");
	var oLis = oUl.getElementsByTagName("li");
	var oOuter = document.getElementById("outer");
	var oDivs = oOuter.getElementsByTagName("div");
	for(var i = 0;i < oLis.length;i ++) {
		oLis[i].index = i;//添加一个索引
		oLis[i].onclick = function() {
			F(oLis,oDivs,this);
		}		
	}
	function F(LIs,DIV,current) {
		for(var j = 0;j<LIs.length;j ++) {
				LIs[j].className = "opacity";
				DIV[j].style.display = "none";
		}
		current.className = "noOpacity";
		DIV[current.index].style.display = "block";
		return false;
	}

})();

//返回顶部
(function() {
	var back = document.getElementById("back");
	//获取当前页面可视高度
	var height = document.documentElement.clientHeight || document.body.clientHeight;
	var timer = null;
	var isScroll = true;//判断用户是否滚动滚轮
	back.onclick = function() {
		clearTimeout(timer); //每次点击都清除一下定时器，就不会发生多次点击网页不能下拉的情况啦啦！
		scroll();	
	}
	back = null;
	function scroll() {
		//滚动条到顶部的距离，兼容浏览器
		var toTop = document.documentElement.scrollTop || document.body.scrollTop;
		var speed = Math.floor(-toTop/5);//这里加负号是为了回到顶部时距离为0，向下取整
		document.documentElement.scrollTop = document.body.scrollTop = toTop + speed;
		
		isScroll = true;		
		// console.log(toTop + speed);
		if(toTop == 0) {
			clearTimeout(timer); 
		} else {
			timer = setTimeout(scroll,30);
		}
	}
	//滚动条滚动时触发
	window.onscroll = function() {
		var back = document.getElementById("back");
		var toTop = document.documentElement.scrollTop || document.body.scrollTop;
		if(toTop >= height) {
			back.style.display = "block";
		} else {
			back.style.display = "none";
		}
		if(! isScroll) {//在返回顶部的中途滚动滚轮，页面下拉
			clearTimeout(timer);
		}
		isScroll = false;
	}
})();