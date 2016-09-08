(function($,undefined){
	$.fn.lmkscroll=function(options){
		var option={
			bgcolor:[],
			defaultcoolr:"#333333",
			delaytime:400,
            endFun:null,
		};

        var scrollwidth=$("body").width();
        var scrollheight=$("body").height();

        var opts = $.extend({},option,options);
        var delaytime=opts.delaytime;
        var bgcolor=opts.bgcolor;
        var defaultcoolr=opts.defaultcoolr;
        var lmkscrollbox=$(this);
        var lmkpage=$(this).find(".lmkpage");
        var lmkpagesize=lmkpage.size();
        var curpage=0;

        //初始化每一页的高度和样式
        lmkpage.css({
        	width:scrollwidth,
        	height:scrollheight,
        	overflow:"hidden",
        });

        //初始化每一页的颜色数组并给每一页加入背景色
        if(lmkpagesize>=bgcolor.length){
        	for (var i=bgcolor.length;i<lmkpagesize;i++){
        		bgcolor.push(defaultcoolr);
        	}
        }else {
        	bgcolor.splice(lmkpagesize);
        }
        lmkpage.each(function(i,page){
        	$(page).css({backgroundColor:bgcolor[i],})
        })

        var doEndFun=function(curpage){
            if($.isFunction(opts.endFun) ){
              opts.endFun(curpage); 
            }
        }

        //重绑上下滑动事件
        function addswipe(){    	
    		lmkscrollbox.swipeUp(function(){
	        	doplay("up");        	
	        })  
              	        	
    		lmkscrollbox.swipeDown(function(){
	        	doplay("down");        	
	        })
            doEndFun(curpage);
        }
       
        //滑动整屏翻页效果函数
        function doplay(value){
        	
            if (value=="up") {
	        	if (curpage>=0&&curpage!=lmkpagesize-1) {
                    curpage++;
                    lmkscrollbox.unbind();
                    var offset=lmkscrollbox.offset().top-scrollheight;
	        		lmkscrollbox.animate({"margin-top":offset},{duration: delaytime,complete:addswipe});
	        	}else {
	        		return false;
	        	}
            }else if (value="down") {            	
	        	if (curpage>0&&curpage<lmkpagesize) {
                    curpage--;
                    lmkscrollbox.unbind();
                    var offset=lmkscrollbox.offset().top+scrollheight;
	        		lmkscrollbox.animate({"margin-top":offset},{duration: delaytime,complete:addswipe});
	        	}else {
	        		return false;
	        	}
            };
        }

        //上下滑动事件的运行绑定
        addswipe();

        
	};

})($);