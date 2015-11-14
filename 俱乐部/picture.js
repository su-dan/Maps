
//鼠标触发事件
var part = document.getElementsByTagName("a");
for(var i=0;i<part.length;i++) {
	part[i].onmouseover = function changePicture() {
		var picture = this.getElementsByTagName("img");
		picture[0].setAttribute("src","images/2.gif");
	}
	part[i].onmouseout = function returnPicture() {
		var picture = this.getElementsByTagName("img");
		picture[0].setAttribute("src","images/1.gif");
	}
}

