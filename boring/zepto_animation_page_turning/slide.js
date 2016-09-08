(function(factory) {
	if (typeof define === 'function' && define.amd) {
		//支持AMD规范
		define(['zepto'], factory);
	} else {
		factory(Zepto);
	}
})(function($) {
	//构造函数
	function Slider(opts){
		//构造函数需要的参数
		this.wrap = opts.dom; //获得最外层画布元素
		this.outer = opts.dom.getElementsByTagName('ul')[0]; //获得第一个ul
		this.lis = this.outer.getElementsByTagName('li'); //获得所有的动画子元素li标签
		
		this.init();
		this.bindDOM();
	}

	//第一步 -- 初始化
	Slider.prototype.init = function() {
		//窗口的宽度
		this.winW = window.innerWidth;
		//窗口的高度
		this.winH = window.innerHeight;
		//初始下标0
		this.initIndex = 0;

		var lis = this.lis,
			len = lis.length,
			header = this.header,
			i = 0;

		//初始化li的位置
		for(; i < len; i++){
			//让li数值排列下来 利用css3 GPU render来加速渲染
			lis[i].style.webkitTransform = 'translate3d(0, '+i*this.winH+'px, 0)';
			lis[i].style.zIndex = len - i;
		}

		//UL的宽度和画布宽度一致
		this.outer.style.cssText = 'width:' + this.winW +'px';
		this.wrap.style.height = this.winH + 'px';
	};

	//第二步 -- 绑定 DOM 事件
	Slider.prototype.bindDOM = function(){
		var self = this, //缓存当前this指针
			winH = self.winH, //获得当前的频幕宽度
			outer = self.outer, //获得ul
			lis = self.lis,     //获得子元素li
			len = lis.length; //获得li的长度

		//手指按下的处理事件
		var startHandler = function(e){
			e.preventDefault();
			//记录刚刚开始按下的时间 转化为mms
			self.startTime = new Date() * 1;
			//记录手指按下的坐标  touchs 是手指按住的区域点
			self.startY = e.touches[0].pageY;

			//清除偏移量 --> 手指滑动的距离
			self.offsetY = 0;

			//事件对象-->outer下触发事件的当前对象
			var target = e.target;
			//如果点击的不是li也不是body
			while(target.nodeName != 'LI' && target.nodeName != 'BODY'){
				target = target.parentNode;
			}
			self.target = target;
		};

		//手指移动的处理事件
		var moveHandler = function(e){
			//兼容chrome android，阻止浏览器默认行为
			e.preventDefault();
			//计算手指的偏移量 touches 和targetTouches 一样
			self.offsetY = e.targetTouches[0].pageY - self.startY;
			//起始索引
			var i = self.initIndex - 1;
			//结束索引
			var m = i + 3;

			if (self.offsetY > 0) {
				//当手指向下滑动的话上面优先级最高，并改位置距离
				for(i; i < m; i++){
					//当前移动时不要动画
					lis[i] && (lis[i].style.webkitTransition = '-webkit-transform 0s ease-out');
					//lis[i] && (lis[i].style.webkitTransform = 'translate3d(0, '+((i-self.initIndex)*self.winH + self.offsetY)+'px, 0)');
					if (i == self.initIndex + 1) {
						lis[i] && (lis[i].style.zIndex = 887);
						lis[i] && (lis[i].style.webkitTransform = 'translate3d(0, '+((i-self.initIndex)*self.winH + self.offsetY)+'px, 0)');
					}
					if (i == self.initIndex) {
						lis[i] && (lis[i].style.zIndex = 888);
						lis[i] && (lis[i].style.webkitTransform = 'translate3d(0, '+((i-self.initIndex)*self.winH + self.offsetY*0.3)+'px, 0) scale('+ (1-(self.offsetY/(self.winH*3.5))) +')');
					}
					if (i == self.initIndex - 1) {
						lis[i] && (lis[i].style.zIndex = 889);
						lis[i] && (lis[i].style.webkitTransition = '-webkit-transform 0.1s ease-out');
						lis[i] && (lis[i].style.webkitTransform = 'translate3d(0, '+((i-self.initIndex)*self.winH + self.offsetY + 50)+'px, 0)');
					}
				}
				/*$(self.lis).find('img').hide();
				$(lis[self.initIndex + 1]).find('img').show();*/
			} else {
				//当前移动时不要动画
				for(i; i < m; i++){
					//当前移动时不要动画
					lis[i] && (lis[i].style.webkitTransition = '-webkit-transform 0s ease-out');
					//lis[i] && (lis[i].style.webkitTransform = 'translate3d(0, '+((i-self.initIndex)*self.winH + self.offsetY)+'px, 0)');
					if (i == self.initIndex + 1) {
						lis[i] && (lis[i].style.zIndex = 889);
						lis[i] && (lis[i].style.webkitTransition = '-webkit-transform 0.1s ease-out');
						lis[i] && (lis[i].style.webkitTransform = 'translate3d(0, '+((i-self.initIndex)*self.winH + self.offsetY - 50)+'px, 0)');
					}
					if (i == self.initIndex) {
						lis[i] && (lis[i].style.zIndex = 888);
						lis[i] && (lis[i].style.webkitTransform = 'translate3d(0, '+((i-self.initIndex)*self.winH + self.offsetY*0.3)+'px, 0) scale('+ (1+(self.offsetY/(self.winH*3.5))) +')');
					}
					if (i == self.initIndex - 1) {
						lis[i] && (lis[i].style.zIndex = 887);
						lis[i] && (lis[i].style.webkitTransform = 'translate3d(0, '+((i-self.initIndex)*self.winH + self.offsetY)+'px, 0)');
					}
				}
				if (self.offsetY < -50) {
					$(lis[self.initIndex + 1]).find('img').show();
				}
			}
		};

		//手指抬起的处理事件
		var endHandler = function(e){
			e.preventDefault();
			//边界就翻页值
			var boundary = winH/5;
			//手指抬起的时间值
			var endTime = new Date() * 1;
			//当手指移动时间超过300ms 的时候，按位移算
			if(endTime - self.startTime > 300){
				if(self.offsetY >= boundary){
					self.goIndex('-1');
				}else if(self.offsetY < 0 && self.offsetY < -boundary){
					self.goIndex('+1');
				}else{
					self.goIndex('0');
				}
			}else{
				//优化
				//快速移动也能使得翻页
				if(self.offsetY > 50){
					self.goIndex('-1');
				}else if(self.offsetY < -50){
					self.goIndex('+1');
				}else{
					self.goIndex('0');
				}
			}
		};

		//绑定事件
		outer.addEventListener('touchstart', startHandler);
		outer.addEventListener('touchmove', moveHandler);
		outer.addEventListener('touchend', endHandler);
	};

	//第三步 -- 跳转显示函数
	Slider.prototype.goIndex = function(n){
		var initIndex = this.initIndex,
			lis = this.lis,
			len = lis.length,
			currIndex; //当前显示下标

		//如果传数字 2,3 之类可以使得直接滑动到该索引
		if(typeof n == 'number'){
			currIndex = initIndex;
		//如果是传字符则为索引的变化
		}else if(typeof n == 'string'){
			currIndex = initIndex + n*1;
		}

		//当索引右超出
		if(currIndex > len-1){
			currIndex = len - 1;
		//当索引左超出
		}else if(currIndex < 0){
			currIndex = 0;
		}

		//保留当前索引值
		this.initIndex = currIndex;

		//改变过渡的方式，从无动画变为有动画
		lis[currIndex].style.webkitTransition = '-webkit-transform 0.2s ease-out';
		lis[currIndex-1] && (lis[currIndex-1].style.webkitTransition = '-webkit-transform 0.2s ease-out');
		lis[currIndex+1] && (lis[currIndex+1].style.webkitTransition = '-webkit-transform 0.2s ease-out');

		//改变动画后所应该的位移值
		lis[currIndex].style.webkitTransform = 'translate3d(0, 0, 0)';
		lis[currIndex-1] && (lis[currIndex-1].style.webkitTransform = 'translate3d(0, '+-this.winH+'px, 0)');
		lis[currIndex+1] && (lis[currIndex+1].style.webkitTransform = 'translate3d(0, '+this.winH+'px, 0)');
	};

	//初始化Slider 实例
	$.fn.slider = function() {
        var data = this.data('Slider');

        if (!data) this.data('Slider', new Slider({dom: this[0]}));
        return this;
	}

})
