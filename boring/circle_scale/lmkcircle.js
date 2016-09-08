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

	// $.fn.lmkrect=function(options){
	// 	var option={
	// 		bgcolor:"white",
	// 		spbgcolor:"#fe9900",
	// 		bordercolor:"#cccccc",
	// 		height:"8px",
	// 		scale:0,
	// 		sum_scale:1,
	// 		radius:"3px",
	// 		time:240,
	// 	};	

 //        // 初始化获得的数据
	// 	var opts = $.extend({},option,options);
	// 	var rect =$(this);
	//     var bgcolor = opts.bgcolor;
	// 	var spbgcolor = opts.spbgcolor;
	// 	var bordercolor = opts.bordercolor;
	// 	var time = opts.time;
	//     var scale=opts.scale;
	//     var sum_scale=opts.sum_scale;
	//     var height=opts.height;
	//    	var radius=opts.radius;
	//    	var animate=scale/sum_scale*100+"%";

	//    	// 初始化ui层界面
 //        rect.css({
 //        	"height":height,
 //        	"backgroundColor":bgcolor,
 //        	"border":("1px solid "+bordercolor),
 //        	"borderRadius":radius,
 //        });
 //        rect.append("<div></div>");
 //        rect.find("div").css({
 //        	"height":height,
 //        	"backgroundColor":spbgcolor,
 //        	"width":0,
 //        	"borderRadius":radius,
 //        });

 //        //动画
 //        rect.find("div").animate({"width":animate},time);
	// };

	$.lmkscroll=function(url,callback){
		var windowHeight = document.documentElement.clientHeight;
        var send_data=2;
      
        (function scroll(){
            $("body").bind('touchmove', function () {
                var documentHeight = $(document).height();              
                var bodyScrollTop = document.body.scrollTop;
                if(windowHeight+bodyScrollTop>=documentHeight-20){
                	$(this).unbind("touchmove");
                    $.ajax({
                        type:"get",
                        url:url,
                        data:{"send_data":send_data},
                        success:function(data){
                        	 var data=JSON.parse(data);
                             callback(data.message);
                             if(data.scroll&&data.scroll!="false"){
                             	send_data++;
                                scroll();
                             }else {
                                 $("body").unbind("touchmove");
                             }
                        }
                    })
                }
            });

        })();
	}

})($);