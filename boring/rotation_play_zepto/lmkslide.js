(function($,undefined){
	$.fn.lmkslide=function(options){
		var option={
			delayTime:2000,          //图片停留时间
			interTime:300,          //动画一帧移动时间
			swipetime:100,          //手动滑动动画一帧所用时间
			defaultIndex:0,
			titCell:".lmknav li",
			mainCell:".lmkcontain",
			mainContent:".lmkcontent",
			active:"active_nav_pic",
			imgscale:1,
		};		

		var opts = $.extend({},option,options);
		var slider = $(this);  
		var flag=true;   //控制是否可以开始滑动了
		var settimeout="";   //用来保存定时函数的回调值     

		var navObj = $(opts.titCell, slider);//导航子元素结合
		var navObjSize = navObj.size();     
		var conBox = $(opts.mainCell , slider);//内容元素视口对象
		var conBoxchildren= $(opts.mainContent, slider);//内容元素盒子
		var conBoxchildrenSize=conBoxchildren.children().size();  

		/*字符串转换*/
		var swipetime=opts.swipetime;
		var index=parseInt(opts.defaultIndex);
		var delayTime=parseInt(opts.delayTime);
		var interTime=parseInt(opts.interTime);

        // 算出视口宽高和内容宽度
		var slideW=document.body.clientWidth;
		var contentW=slideW*(conBoxchildrenSize+2);
		var slideH=slideW*opts.imgscale;
		var move=-slideW;      //一开始的移动默认位置

        //导航默认添加样式
		var titOn = opts.active;
		var onIndex = navObj.eq(index).addClass(titOn);

        //视口宽高，内容宽高和图片自适应屏幕控制
		conBox.css({"position":"relative","width":slideW,"height":slideH,"overflow":"hidden"});
        conBoxchildren.css({"position":"absolute","width":contentW,"overflow":"hidden","margin-left":move,});
        conBoxchildren.find("img").css({"width":slideW});
        conBoxchildren.children().eq(0).clone().appendTo(conBoxchildren);	
        conBoxchildren.children().eq(conBoxchildrenSize-1).clone().prependTo(conBoxchildren);

        //左滑动事件
        conBoxchildren.swipeLeft(function(event){
        	event.preventDefault();
        	if(flag){
        		clearInterval(settimeout);
        		doPlay(swipetime,"left");	
        	}
        });
        //右滑动事件
        conBoxchildren.swipeRight(function(event){
        	event.preventDefault();
        	if(flag){
        		clearInterval(settimeout);
        		doPlay(swipetime,"right");	
        	}
        });

        // 兼容一些渣渣手机
        conBoxchildren.bind("touchmove",function(event){
        	event.preventDefault();
        })

        //自动播放函数
		var setTime = function(time){
			settimeout=setTimeout(function(){  
			   doPlay(interTime,"left");	
			},time);  
		}
		//一帧动画结束的回调函数
        var domhanddle=function(){	
        	if((move+contentW-slideW)<=0){
        		move=-slideW; 
        		conBoxchildren.css({"margin-left":move});
        	}else if (move>=0) {
        		move=-(conBoxchildrenSize*slideW);
        		conBoxchildren.css({"margin-left":move});
        	};
        	flag=true;
        	setTime(delayTime);	   	      	
        }
		//效果函数
		var doPlay=function(time,direction){
			flag=false;
			if (direction=="left") {
				move-=slideW;
				if(index<conBoxchildrenSize-1){
					index++;
				}else {
					index=0;
				}
			}else if (direction=="right") {
                move+=slideW;
                if(index>0){
					index--;
				}else {
					index=conBoxchildrenSize-1;
				}
			}
			navObj.removeClass(titOn).eq(index).addClass(titOn);	
			conBoxchildren.animate({"margin-left":move},{duration: time,complete:domhanddle});			
		};

		// 自动播放
		setTime(delayTime);	
	};

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