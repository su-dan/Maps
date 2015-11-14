
//侧边栏 免费咨询 
function near(){
	var freeConsultation=getClass("div","freeConsultation")[0];
	var close=getClass("img","close")[0];
	var right_move=getClass("span","right_move")[0];
	var telNum=document.getElementById("telNum");
	var tel_span=getClass("span","tel_span")[0];
	var pattern=/^(131|152|188|177|187)([0-9]{8})$/;
	var submit=document.getElementById("submit");


	freeConsultation.onmouseover=right_move.onmouseover=function(){
		telNum.focus();
		perfectMove(freeConsultation,{left: 0});
	}
	freeConsultation.onmouseout=right_move.onmouseout=function(){
		telNum.blur();
		perfectMove(freeConsultation,{left: -310});
	}
	close.onclick=function(){
		telNum.blur();
		perfectMove(freeConsultation,{left: -310});
	}
	telNum.onkeydown=function(){
		tel_span.style.display="none";
	}
	telNum.onkeyup=function(){
		if(this.value.length === this.maxLength){
			if(pattern.test(this.value)){
				this.style.backgroundColor="#FFF";
			}else{
				this.style.backgroundColor="red";
			}
		}
	}
	submit.onclick=function(){
		telNum.value="";
		telNum.style.backgroundColor="#FFF";
		tel_span.style.display="block";	
	}
}


//轮播
function displayChange(){
	var wrapper=getClass("div","wrapper")[0];
	var banner=getClass("div","banner")[0];
	var list=getClass("ul","list")[0];
	var center_list=getClass("ul","center_list")[0];
	var list_ali=list.getElementsByTagName("li");
	var center_list_ali=center_list.getElementsByTagName("li");

	var prev=document.getElementById("prev");
	var next=document.getElementById("next");
	var display_left=getClass("div","prev_hide")[0];
	var display_right=getClass("div","next_hide")[0];
	var prev=document.getElementById("prev");
	var next=document.getElementById("next");
	prev.onmouseover=display_left.onmouseover=function(){
		prev.style.display="block";
		this.style.cursor="pointer";
	}
	prev.onmouseout=display_left.onmouseout=function(){
		prev.style.display="none";
	}
	next.onmouseover=display_right.onmouseover=function(){
		next.style.display="block";
		this.style.cursor="pointer";
	}
	next.onmouseout=display_right.onmouseout=function(){
		next.style.display="none";
	}

	var nowIndex=0;
	var now=0;
	for(var i=0;i<center_list_ali.length;i++){
		center_list_ali[i].index=i;
		center_list_ali[i].onclick=function(){
			if(this.index == now) {
				return;
			}
			now=this.index;
			tab();
		}
		center_list_ali[i].onmouseover=function(){
			for(var k=0,len=center_list_ali.length;k<len;k+=1){
				perfectMove(this,{"opacity":50});
			}
			perfectMove(this,{"opacity":100});
		}
		center_list_ali[i].onmouseout=function(){
			if(this.index !=now){
				perfectMove(this,{"opacity": 50});
			}
		}
	}
	function tab(){
		nowIndex++;
		center_list_ali[now].timer=null;
		list_ali[now].style.zIndex=nowIndex;
		//实现小图随大图翻转 高亮显示
		for(var j=0;j<center_list_ali.length;j++){
			perfectMove(center_list_ali[j],{"opacity": 50});
		}
		// 当前图片高亮显示
		perfectMove(center_list_ali[now],{"opacity":100});
		//实现高度图片下拉效果
		list_ali[now].style.height=0;
		perfectMove(list_ali[now],{"opacity":100,"height":595});
	}

	//上一张和下一张按钮
	prev.onclick=function(){
		now--;
		if(now === -1){
			now=list_ali.length-1;
		}
		tab();
	}
	next.onclick=function(){
		now++;
		if(now === list_ali.length){
			now=0;
		}
		tab();
	}

	//自动轮播
	var timer=setInterval(next.onclick, 5000);
	wrapper.onmouseover=function(){
		clearInterval(timer);
	}
	//鼠标移开有问题 定时器没开启
	wrapper.onmouseout=function(){
		timer=setInterval(next.onclick, 5000);
	}
}

//goTop && 免费咨询定位 
function goTop(){
	var goTop=document.getElementById("goTop");
	goTop.onclick=function(){
		startMoveScroll(document,0);
	}
	function getScroll(){
		var scrollTop=document.documentElement.scrollTop || document.body.scrollTop;
		var scrollLeft=document.documentElement.scrollLeft || document.body.scrollLeft;
		return {left:scrollLeft,top:scrollTop};
	}
	window.onscroll=window.onresize=function(){
		var json=getScroll();	
		var freeConsultation=getClass("div","freeConsultation")[0];
		freeConsultation.style.top=document.documentElement.clientHeight-294+parseInt(json.top)-246+"px";

		goTop.style.top=document.documentElement.clientHeight-60+parseInt(json.top)-100+"px";
		goTop.style.left=document.documentElement.clientWidth-60+parseInt(json.left)-100+"px";
		if(parseInt(getStyle(goTop,"top")) > 537){
			if(getStyle(goTop,"display") !== "block"){
				goTop.style.display="block";
			}
		}else{
			if(getStyle(goTop,"display") !== "none"){
				goTop.style.display="none";
			}
		}
	}
	function startMoveScroll(obj,iTarget){
		clearInterval(obj.timer);
		obj.timer=setInterval(function(){
			var scrollTop2=document.documentElement.scrollTop || document.body.scrollTop;
			var speed=(iTarget-scrollTop2)/3;
			speed=speed>0?Math.ceil(speed):Math.floor(speed);
			if(scrollTop2 == iTarget){
				clearInterval(obj.timer);
			}else{
				document.documentElement.scrollTop=document.body.scrollTop=scrollTop2+speed;
			}
		},30);
	}
}

//迈出创业第一步，你所必需的服务
function change(){
	var abouteMore=getClass("div","abouteMore")[0];
	var abouteMore_top_li=getClass("div","abouteMore_top")[0].getElementsByTagName("li");
	var abouteMore_bottom=getClass("div","abouteMore_bottom")[0];
	var abouteMore_bottom_div=[];


	for(var i=0,len=abouteMore_top_li.length;i<len;i+=1){
		abouteMore_top_li[i].index=i;
		abouteMore_bottom_div.push(getClass("div","abouteMore_"+(i+1))[0]);
		abouteMore_top_li[i].onmouseover=function(){
			for(var j=0,len=abouteMore_bottom_div.length;j<len;j+=1){
				abouteMore_bottom_div[j].style.display="none";
			}
			abouteMore_bottom_div[this.index].style.display="block";
		}
		abouteMore_top_li[i].onmouseout=function(){

		}
	}
}


addLoad(displayChange);
addLoad(downMenu);
addLoad(near);
addLoad(goTop);
addLoad(change);