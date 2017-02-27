var DragMc = function(){}
DragMc.prototype = {
	addDragObject:function(){ //dt拖动的鼠标触发对象  db拖拽的整个容器
		var the = this;
		var disX = disY = 0;
		var ifDrag = false;
		var dt = arguments[0];
		var db = arguments[1];
		var dp = arguments[2];
		
		if(dp)the.getId(dp).style.position = "relative";
		
		the.getId(db).style.position = "absolute";
		//the.getId(dt).style.cursor = "move";
		
		the.getId(dt).onmousedown = function(e){
			//the.getId(db).style.zIndex++;
			var e = e || window.event;	
			disX = e.clientX - the.getId(db).offsetLeft;
			disY = e.clientY - the.getId(db).offsetTop;	
			ifDrag = true;
			
			document.onmousemove = function(e){
				if(!ifDrag) return;
				
				var e = e || window.event;	
				var ex = e.clientX - disX;
				var ey = e.clientY - disY;
				
				var maxw = dp ? the.getId(dp).offsetWidth - the.getId(db).offsetWidth : document.documentElement.clientWidth - the.getId(db).offsetWidth;
				var maxh = dp ? the.getId(dp).offsetHeight - the.getId(db).offsetHeight : document.documentElement.clientHeight - the.getId(db).offsetHeight;
				
				ex = ex < 0 ? 0 : ex;
				ex = ex > maxw ? maxw : ex; 
				
				ey = ey < 0 ? 0 : ey;
				ey = ey > maxh ? maxh : ey;
				
				the.getId(db).style.marginTop = the.getId(db).style.marginLeft = 0;
				
				the.getId(db).style.left = ex + "px";
				the.getId(db).style.top = ey + "px";	
			}
			return false;
		}
		
		document.onmouseup = function(){
			ifDrag = false;
			document.onmousemove = null;
		}
	},
	getId:function(id){
		return document.getElementById(id) || id;	
	}
}