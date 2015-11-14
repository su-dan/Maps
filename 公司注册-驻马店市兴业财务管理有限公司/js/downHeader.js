function downMenu(){
	var header=getClass("div","header")[0];
	var nav_aLi=getClass("div","nav")[0].getElementsByTagName("li");
	var newMenu=getClass("div","newMenu")[0];
	var newMenu_aDiv=newMenu.getElementsByTagName("div");
	newMenu.className="newMenu";

	header.appendChild(newMenu);
	for(var i=0,len=nav_aLi.length;i<len;i++){
		nav_aLi[i].index=i;
		newMenu_aDiv[i].index=i;
		if(i === len-1){
			newMenu_aDiv[nav_aLi[i].index].onmouseover=nav_aLi[i].onmouseover=function(){
				nav_aLi[this.index].style.backgroundColor="#DBC7FF";
				newMenu.style.display="block";
				perfectMove(newMenu_aDiv[this.index],{opacity: 100});
				newMenu_aDiv[this.index].style.width="89px";
				newMenu_aDiv[this.index].className="newMenu_"+this.index;
				newMenu_aDiv[this.index].style.left=this.offsetLeft+"px";
			}
			newMenu_aDiv[nav_aLi[i].index].onmouseout=nav_aLi[i].onmouseout=function(){
				nav_aLi[this.index].style.backgroundColor="#FFF";
				newMenu.style.display="none";
				nav_aLi[this.index].style.color="black";
				perfectMove(newMenu_aDiv[this.index],{opacity: 0});
			}
		}else{
			newMenu_aDiv[nav_aLi[i].index].onmouseover=nav_aLi[i].onmouseover=function(){
				nav_aLi[this.index].style.backgroundColor="#00c9ff";
				newMenu.style.display="block";
				newMenu_aDiv[this.index].style.width="89px";
				newMenu_aDiv[this.index].className="newMenu_"+this.index;
				newMenu_aDiv[this.index].style.left=this.offsetLeft+"px";
				perfectMove(newMenu_aDiv[this.index],{opacity: 100});
			}
			newMenu_aDiv[nav_aLi[i].index].onmouseout=nav_aLi[i].onmouseout=function(){
				nav_aLi[this.index].style.backgroundColor="#FFF";
				newMenu.style.display="none";
				nav_aLi[this.index].style.color="black";
				perfectMove(newMenu_aDiv[this.index],{opacity: 0});
			}
		}
	}
}

addLoad(downMenu);