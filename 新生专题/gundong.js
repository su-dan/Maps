void function(){
	var prev = document.getElementById("prev");
	var next = document.getElementById("next");

	var pic_box = document.getElementById("pic_box");
	var list = document.getElementById("list");//得到列表中的所有图片
	var lis = list.getElementsByTagName("li");
	var timer = null;

	var oneSize = lis[0].offsetWidth;//每张图片所占的长度
	list.style.width = lis.length * oneSize + "px";	//给图片的那个列表动态的添加长度
	var moved = false;
	function movePic(moving) {
		moved = true;
		var interval = 15;//每10毫秒移动一次
		var time = 300;//一张图位移time毫秒完成
		var moveSpeed = moving/(time/10);//图片的移动速度，小于0就是向左移，大于0 就是向右移
		var newLeft = parseInt(list.style.left) + moving;//移动后的新左边距（目标边距）
		
		function move() {
			if((moveSpeed < 0 && newLeft < parseInt(list.style.left)) || (moveSpeed > 0 && newLeft > parseInt(list.style.left))) {
				list.style.left = moveSpeed + parseInt(list.style.left) + "px";
				setTimeout(move,interval);	
			} else {
				moved = false;
				list.style.left = newLeft + "px";
				if(newLeft > (-oneSize)) {				
					list.style.left = -(lis.length-2)*oneSize + "px";
				}
				if(newLeft < -(lis.length - 2) * oneSize) {
					list.style.left = -oneSize + "px";
				}
			}
		}
		move();			
	}
	//自动播放
	function play() {
		var timer = setInterval(function() {
			next.onclick();
		},4000);
	}
	function stop() {
		clearInterval(timer);
	}
	pic_box.onmouseover = stop;
	pic_box.onmouseout = play;
	play();

	prev.onclick = function() {	
		clearInterval(timer);
		if(moved == false) {
			movePic(oneSize);		
		}
	}
	next.onclick = function() {	
		clearInterval(timer);
		if(moved == false) {
			movePic(-oneSize);	
		}					
	}
/*
	//点击下面的小圆点切换图片
	for(var i=0;i < button.length;i ++) {
		button[i].onclick = function () {
			if(this.className == "on") {
				return;//如果当前显示的就是你想要看的图片，这个函数就不执行
			}
			var myIndex = parseInt(this.getAttribute("index"));
			var offset = -600 * (myIndex - index);//用目标位置减去当前位置，乘上距离
			animate(offset);
			index = myIndex;// 更新当前index的值，比如切换到了第五张，就把当前的index更新为5
			showButton();
		}
	}

	function showButton() {		
		for (var i = 0; i < button.length; i ++) {
			if(button[i].className == "on") {
				button[i].className = " ";//之前的按钮暗下去
				break;
			}
		}
		button[index - 1].className = "on";//当前按钮亮起来
	}*/
}();
	



