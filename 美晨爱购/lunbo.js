void function(){
	var lunbo = document.getElementById("lunbo");
	var buttons = document.getElementById("buttons");
	var button = buttons.getElementsByTagName("span");
	var list = document.getElementById("list");//得到列表中的所有图片
	var lis = list.getElementsByTagName("li");
	var timer = null;
	index = 1;

	var oneSize = lis[0].offsetWidth;//每张图片所占的长度
	list.style.width = lis.length * oneSize + "px";	//给图片的那个列表动态的添加长度
	var moved = false;

	function movePic(moving) {
		moved = true;
		var interval = 10;//每10毫秒移动一次
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
		timer = setInterval(function() {
			next();
		},3000);
	}
	function stop() {
		clearInterval(timer);
	}
	lunbo.onmouseover = stop;
	lunbo.onmouseout = play;
	play();

	 function prev() {
	 	if(index == 1) {
			index = 4;
		} else {
			index --;
		}	
		showButton();
		if(moved == false) {
			movePic(oneSize);					
		}
	}
	function next() {
		if(index == 4) {
			index = 1;
		} else {
			index ++;
		}
		showButton();
		if(moved == false) {
			movePic(-oneSize);				
		}					
	}

	function showButton() {
		for(var i=0;i<button.length;i++) {
			if(button[i].className == "on") {
				button[i].className="on_b";
				break;
			} 			
		}
		button[index - 1].className = "on";
	}

	for(var i=0;i<button.length;i++) {
		button[i].onclick = function() {
			if(this.className == "on") {
				return;
			} else {
				var myIndex = parseInt(this.getAttribute("index"));
				moving = -oneSize * (myIndex - index);
				index = myIndex;
				movePic(moving);
				showButton();
			}
		}
	}
}();
	



