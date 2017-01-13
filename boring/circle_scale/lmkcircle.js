(function($,undefined){
	$.fn.lmkcircle=function(options){
		var option={
			bgcolor:"#fe9900",
			spbgcolor:"#999",
			time:20,
			deg:0,
			new_deg:"0%",
			borderwidth:2,
			zen:10,
		};	

        // 初始化获得的数据
		var opts = $.extend({},option,options);
		var canvas = document.getElementById($(this).attr("id"));
	    var ctx = canvas.getContext("2d");
	    var W = canvas.width;
	    var H = canvas.height;
	    var borderwidth=opts.borderwidth;
	    var bgcolor = opts.bgcolor;
		var spbgcolor = opts.spbgcolor;
	    var deg=opts.deg;
	    var new_deg=parseFloat(opts.new_deg)*3.6;
	    var zen=opts.zen;
	    var time=opts.time;
	    var loop=null;
	    var breakloop=false;
	    
	    function loopfuc(){
	        if(deg>new_deg||breakloop||new_deg==0){
	            clearTimeout(loopfuc);
	        }else {
	            if(new_deg-deg<=zen){
	                deg=new_deg;
	                breakloop=true;
	            }else {
	                deg=deg+zen;
	            }
	            ctx.clearRect(0,0,W,H);
	            ctx.beginPath();
	            ctx.strokeStyle = bgcolor;
	            ctx.lineWidth=borderwidth;
	            ctx.arc(W/2,H/2,W/2-borderwidth,-(90-deg)*Math.PI/180,0-90*Math.PI/180,false);
	            ctx.stroke();

	            ctx.beginPath();
	            ctx.strokeStyle = spbgcolor;
	            ctx.lineWidth=borderwidth;
	            ctx.arc(W/2,H/2,W/2-borderwidth,0-90*Math.PI/180,-(90-deg)*Math.PI/180,false);
	            ctx.stroke();
	            setTimeout(loopfuc,time);
	        }
	    }

	    (function init(){
	        ctx.clearRect(0,0,W,H);
	        ctx.beginPath();
	        ctx.strokeStyle=bgcolor;      //原背景色
	        ctx.lineWidth=borderwidth;
	        ctx.arc(W/2,H/2,W/2-borderwidth,0,Math.PI*2,false);
	        ctx.stroke();
	        loop = setTimeout(loopfuc,time);
	    })();	    
	};

	$.fn.lmkdoublecircle=function(options){
		var option={
			bgcolor:"#cccccc",
			spbgcolor:"#f84e4e",
			time:20,
			deg:0,
			new_deg:"0%",
			borderwidth:4,
			smallwidth:2,
			zen:10,
			leave:12,
		};	

        // 初始化获得的数据
		var opts = $.extend({},option,options);
		var canvas = document.getElementById($(this).attr("id"));
	    var ctx = canvas.getContext("2d");
	    var W = canvas.width;
	    var H = canvas.height;
	    var borderwidth=opts.borderwidth;
	    var smallwidth=opts.smallwidth;
	    var leave=opts.leave;
	    var bgcolor = opts.bgcolor;
		var spbgcolor = opts.spbgcolor;
	    var deg=opts.deg;
	    var new_deg=parseFloat(opts.new_deg)*1.8;
	    var zen=opts.zen;
	    var time=opts.time;
	    var loop=null;
	    var breakloop=false;
	    
	    function loopfuc(){
	        if(deg>new_deg||breakloop){
	            clearTimeout(loopfuc);
	        }else {
	            if(new_deg-deg<=zen){
	                deg=new_deg;
	                breakloop=true;
	            }else {
	                deg=deg+zen;
	            }
                // 画剩下的圆弧
                ctx.clearRect(0,0,W,H);
		        ctx.beginPath();
		        ctx.strokeStyle=bgcolor;      
		        ctx.lineWidth=smallwidth;
		        ctx.arc(W/2,H,W/2-smallwidth,-(180-deg)*Math.PI/180,0,false);
		        ctx.stroke();

		        ctx.beginPath();
		        ctx.strokeStyle=bgcolor;      
		        ctx.lineWidth=borderwidth;
		        ctx.arc(W/2,H,W/2-leave,-(180-deg)*Math.PI/180,0,false);
		        ctx.stroke();

	            ctx.beginPath();
	            ctx.strokeStyle = spbgcolor;
	            ctx.lineWidth=smallwidth;
	            ctx.arc(W/2,H,W/2-smallwidth,-Math.PI, -(180-deg)*Math.PI/180,false);
	            ctx.stroke();

	            ctx.beginPath();
	            ctx.strokeStyle = spbgcolor;
	            ctx.lineWidth=borderwidth;
	            ctx.arc(W/2,H,W/2-leave,-Math.PI, -(180-deg)*Math.PI/180,false);
	            ctx.stroke();
	            setTimeout(loopfuc,time);
	        }
	    }

	    (function init(){
	        ctx.clearRect(0,0,W,H);
	        ctx.beginPath();
	        ctx.strokeStyle=bgcolor;      
	        ctx.lineWidth=smallwidth;
	        ctx.arc(W/2,H,W/2-smallwidth,-Math.PI, 0,false);
	        ctx.stroke();

	        ctx.beginPath();
	        ctx.strokeStyle=bgcolor;      
	        ctx.lineWidth=borderwidth;
	        ctx.arc(W/2,H,W/2-leave,-Math.PI, 0,false);
	        ctx.stroke();
	        loop = setTimeout(loopfuc,time);
	    })();	    
	};

	$.fn.textMarqueen=function(options){
		var option={
			delayTime:4000,          //一行字的动画时间
			mainContainer:".lmktext_marqueen",
			mainItem:"li",
		};		

		var opts = $.extend({},option,options);
		var slider = $(this);  

		var conBox = $(opts.mainContainer , slider); //内容元素视口对象
		var navObj = $(opts.mainItem, slider);       //滚动子元素结合
		var navObjSize = navObj.size();              //滚动子元素个数

		/*一次循环滚动时间*/
		var delayTime=parseInt(opts.delayTime);
		var animateTime=delayTime*navObjSize;
		var imgWidth=navObj.width();

		var boxwidth=imgWidth*(navObjSize+1);
		var move=-(boxwidth-imgWidth);

        //为内容容器再增加一个父元素窗口来显示
		conBox.wrap('<div style="position:relative;overflow:hidden;"></div>');
		conBox.css({"position":"relative","left":0,"width":boxwidth,"overflow":"hidden"});
        conBox.children().eq(0).clone().appendTo(conBox);	

		//一帧动画结束的回调函数
        var domhanddle=function(){
        	conBox.css("left",'0');
        	doplay();  	      	
        }
		//效果函数
		function doplay(){			
			conBox.animate({"left":move},{duration: animateTime,complete:domhanddle});			
		};

		// 自动播放
		doplay();
	};

})($);