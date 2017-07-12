(function($){

	// 预加载构造函数
	function Preload(imgs, opts){
		this.imgs = (typeof imgs === 'string') ? [imgs] : imgs;
		this.opts = $.extend({}, Preload.DEFAULT, opts);

		this._unordered();
	}

	// 默认配置
	Preload.DEFAULT = {
		each: null, // 每张图片加载完成之后执行的操作
		all: null // 所有图片加载完成之后执行的操作
	}

	// 无序加载
	Preload.prototype._unordered = function(){
		var opts = this.opts,
			imgs = this.imgs,
			count = 0,
			len = imgs.length;

		$.each(imgs, function(i, src){
			if(typeof src != 'string') return;

			var oImg = new Image();

			$(oImg).on('load error', function(){
				opts.each && opts.each(count);

				if(count >= len - 1){
					opts.all && opts.all();
				}

				count++;
			});

			oImg.src = src;
		});
	};

	// jQuery插件的两种封装形式：
	// 1. $.fn.extend -> $(dom).preload();
	// 2. $.extend -> $.preload();

	$.extend({
		preload: function(imgs, opts){
			new Preload(imgs, opts);
		}
	});

})(jQuery);
