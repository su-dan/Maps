window.onload = function() {
	var timer = null;
	timer = setInterval(showTime,1000);
}
function showTime() {
	var endtime = new Date("2015/12/12,23:59:59");//结束时间
	var nowtime = new Date();//当前时间
	var lefttime = parseInt((endtime.getTime()-nowtime.getTime())/1000);//得出整数的秒
	var d = parseInt(lefttime/(24*60*60));
	var h = parseInt(lefttime/(60*60)%24);
	var m = parseInt(lefttime/60%60);
	var s = parseInt(lefttime%60);	

	var d1 = parseInt(d/10);//取得天数的十位
	var d2 = d%10;          //取得天数的个位
	var h1 = parseInt(h/10);//取得小时的十位
	var h2 = h%10;          //取得小时的个位
	var m1 = parseInt(m/10);
	var m2 = m%10;
	var s1 = parseInt(s/10);
	var s2 = s%10;

	var images = document.getElementById("images");
	var pictures = images.getElementsByTagName("img");//用来替换数字图片数组
	var box = document.getElementById("box");
	var time_pictures = box.getElementsByTagName("img");//保存每张占位图片的数组（0-7）

	var sourse_d1 = pictures[d1].getAttribute("src");//用来替换数字图片的路径	
	var sourse_d2 = pictures[d2].getAttribute("src");	

	var sourse_h1 = pictures[h1].getAttribute("src");	
	var sourse_h2 = pictures[h2].getAttribute("src");
	
	var sourse_m1 = pictures[m1].getAttribute("src");	
	var sourse_m2 = pictures[m2].getAttribute("src");	

	var sourse_s1 = pictures[s1].getAttribute("src");	
	var sourse_s2 = pictures[s2].getAttribute("src");	

	var sourse_arry = [sourse_d1,sourse_d2,sourse_h1,sourse_h2,sourse_m1,sourse_m2,sourse_s1,sourse_s2];
	for(var i=0;i < 8;i ++) {
		if(lefttime == 0) {
			d = h = m = s = 0;
			clearInterval(timer);
		} else {
			time_pictures[i].setAttribute("src", sourse_arry[i]);
		}
	}

	
}

