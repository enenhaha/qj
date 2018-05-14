/*var addClass=function(obj,objaddClass){
	if(obj){
		obj.className=obj.className+" "+objaddClass;		
	}else{
		return false;
	}
}
*/

/*
className
删除、修改   全部删除、全部删除


Alert    默认居中    位置 px

删除元素

滚动鼠标 导航条固定


写遮罩  写class     id用来获取元素
 */


var removeClass=function(obj,objremoveClass){
	if(obj){
		obj.className=obj.className.replace(objremoveClass,"");
		return true;
	}else{
		return false;
	}
}
var AllremoveClass=function(obj,objremoveClass){
	if(obj[0]){
		for(var i=0;i<obj.length;i++){
			obj[i].className=obj[i].className.replace(objremoveClass,"");
		}
		return true;
	}else{
		return false;
	}
}
var changeClass=function(obj,objoldClass,objnewClass){
	if(obj){
		obj.className=obj.className.replace(objoldClass,objnewClass);
	}else{
		return false;
	}
}
var AllchangeClass=function(obj,objoldClass,objnewClass){
	if(obj[0]){
		for(var i=0;i<obj.length;i++){
			obj[i].className=obj[i].className.replace(objoldClass,objnewClass);
		}
	}else{
		return false;
	}
}



function Alert(content,intime,outtime,className,position,inanimation,outanimation,Function){
	var div=document.createElement("div");
	div.style.cssText=" position: absolute;width: 100%;left: 0;top: 0;";
	var Odiv=document.createElement("div");
	Odiv.innerHTML="<i class='fa fa-check'></i><span>"+content+"</span>";
	var intime=intime||"0.35s";
	var outtime=outtime||"0.35s";
	var inanimation=inanimation||"fadeInUp";
	var outanimation=outanimation||"fadeOutDown";
	if(className){
		Odiv.className="Alert "+className;
	}else{
		Odiv.className="Alert"
	}


	Odiv.style.animation=inanimation+" "+(intime/1000)+"s";

	if(position){
		position.appendChild(div);
		div.appendChild(Odiv);
	}else{
		document.body.appendChild(div);
		div.appendChild(Odiv);
	}
	Odiv.style.left="calc(50% - "+Odiv.offsetHeight+"px/2)";

	setTimeout(function(){
		Odiv.style.animation=outanimation +" ease-in 0.35s forwards";
		setTimeout(function(){
			div.parentNode.removeChild(div);
			Function();
			return	true;
		},350);
	},Number(intime+outtime));
}
var remove=function(obj){
	if(obj){
		obj.parentNode.removeChild(obj);		
	}else{
		return false;
	}
}
var Allremove=function(obj){
	if(obj[0]){
		for(var i=0;i<obj.length;i++){
			obj[i].parentNode.removeChild(obj[i]);
		}
	}else{
		return false;
	}
}

var Confirm=function(confirm){

	// title
	// content
	// parent
	// id
	// callback

	// title,content,parent,aa

	var title=confirm.title||'';
	var content=confirm.content||"";
	var parent=confirm.parent||document.body;
	var id=confirm.id||"";
	var aa=confirm.callback||"";


	var Odiv_1=document.createElement("div");
	Odiv_1.id=id;
	Odiv_1.className=confirm.classname!=undefined?confirm.classname+" Confirm":'Confirm';
	var Odiv_2='<div id="Confirm"><div id="title">'+title+'</div>'+
		'<div id="content">'+content+'</div>'+
		'<div id="btn">'+
		'<div id="ok">确认</div>'+
		'<div id="close">取消</div></div></div>';
	Odiv_1.innerHTML=Odiv_2;
	parent.appendChild(Odiv_1);

	var confirm=Odiv_1.querySelector("#Confirm");
	confirm.style.top=(parent.offsetHeight-confirm.offsetHeight)/2+"px";
	confirm.style.left="calc(50% - "+confirm.offsetHeight+"px/2)";//(parent.offsetWidth-confirm.offsetWidth)/2+"px";

	var state=true;

	confirm.querySelector("#btn>#close").onclick=function(){
		if(state){
			// this.parentNode.parentNode.style.cssText="transform: scale(0)"; 
			// setTimeout(function(){
			var qq=this;
			var dd=function(){
				var dd=qq.parentNode.parentNode;
				remove(dd.parentNode);
				return true;
			}
			if(aa && aa(false,dd)){
				state=true;
			}
			// }.bind(this),350);
		}
		state=false;
	}

	confirm.querySelector("#btn>#ok").onclick=function(){
		
		if(state){
			// this.parentNode.parentNode.style.cssText="transform: scale(0)"; 
			// setTimeout(function(){
			var qq=this;
			var dd=function(){
				var dd=qq.parentNode.parentNode;
				remove(dd.parentNode);
				return true;
			}
			if(aa && aa(true,dd)){
				state=true;
			}
		}
		state=false;

		// remove(this.parentNode.parentNode);
		// }.bind(this),350);
	}

	

	drag(confirm.querySelector("#title"),confirm.querySelector("#title").parentNode);
}

function drag(click_obj,click_obj_parent){

	var downX,downY;
	click_obj.onmousedown=function(e){
		this.setAttribute("index",1);
		var e = e || window.event;
		downX = e.clientX - click_obj_parent.offsetLeft;
	    downY = e.clientY - click_obj_parent.offsetTop;

		document.onmousemove=function(e){
			if(click_obj.getAttribute("index")==1){
				var e = e || window.event;

				var x=e.clientX - downX;
				var y=e.clientY - downY;

				if(x<=0&&y<=0){x=0;y=0;}//左上角
				if(x>=(document.body.offsetWidth-click_obj_parent.offsetWidth)&&y<=0){//右上角
					x=document.body.offsetWidth-click_obj_parent.offsetWidth
					y=0;
				}
				if(x<=0&&y>=(document.body.offsetHeight-click_obj_parent.offsetHeight)){//左下角
					x=0
					y=document.body.offsetHeight-click_obj_parent.offsetHeight;
				}
				if(x>=(document.body.offsetWidth-click_obj_parent.offsetWidth)&&y>=(document.body.offsetHeight-click_obj_parent.offsetHeight)){//右下角
					x=document.body.offsetWidth-click_obj_parent.offsetWidth;
					y=document.body.offsetHeight-click_obj_parent.offsetHeight;
				}
				if(x<=0){x=0;}//靠左移动
				if(y<=0){y=0;}//靠上移动
				if(x>=(document.body.offsetWidth-click_obj_parent.offsetWidth)){x=document.body.offsetWidth-click_obj_parent.offsetWidth;}//靠右移动
				if(y>=(document.body.offsetHeight-click_obj_parent.offsetHeight)){y=document.body.offsetHeight-click_obj_parent.offsetHeight;;}//靠下移动
				click_obj_parent.style.top = y + "px";
				click_obj_parent.style.left = x + "px";

			}
		}

		document.onmouseup=function(event){
			click_obj.setAttribute("index",0);
		}

	}

}
