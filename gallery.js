var curImage = null;
window.onload = function () {
	var gallery = document.createElement("div");
	gallery.id = "gallery";
	//加入所有的用以组织的div
	gallery.innerHTML = '<div id="gallery_image"></div>' +
		'<div id="gallery_prev"><a href ="#">&laquo; Prev</a></div>' +
		'<div id="gallery_next"><a href ="#">Next &raquo;</a></div>' +
		'<div id="gallery_title"></div>';
	document.body.appendChild(gallery);
	//支持图库内上一张和下一张点击跳转的处理器；
	id("gallery_next").onclick = nextImage;
	id("gallery_prev").onclick = prevImage;
	//定位到页面上的所有图库.
	var g = byClass("gallery", "ul");
	for (var i = 0; i < g.length; i++) {
		//并定位到幻灯片所有链接
		var link = tag("a", g[i]);
		for (var j = 0; j < link.length; j++) {
			link[j].onclick = function () {
				showOverlay();
				showImage(this.parentNode);
				return false;
			};
		}
		//在图库内插入幻灯导航
		addSlideShow(g[i]);
	}
	
	//创建半透明，灰色的覆盖层
	var overlay = document.createElement("div");
	overlay.id = "overlay";
	overlay.onclick = hideOverlay;
	document.body.appendChild(overlay);
}

//显示图库的当前图片
function showImage(cur) {
	if (cur == null) {
		alert("没有图片了");
		return false;
	}
	curImage = cur;
	var img = id("gallery_image");
	if (img.firstChild) {
		img.removeChild(img.firstChild);
	}
	img.appendChild(cur.firstChild.cloneNode(true));
	id("gallery_title").innerHTML = cur.firstChild.firstChild.alt;
	var gallery = id("gallery");
	gallery.className = cur.className;
	fadeIn(gallery, 100, 10);
	adjust();
};
window.onresize = document.onscroll = adjust;
//重定位到图库到页面的中心，就算页面经过了滚动
function adjust() {
	//return false;
	var obj = id("gallery");
	if (!obj)
		return;
	
	var w = getWidth(obj);
	var h = getHeight(obj);
	
	var t = scrollY() + (pageHeight() / 2) - (h / 2);
	if (t < 0)
		t = 0;
	var l = scrollX() + (pageWidth() / 2) - (w / 2);
	if (l < 0)
		l = 0;
	
	setY(obj, t);
	setX(obj, l);
};

function prevImage() {
	showImage(prev(curImage));
	return false;
}
function nextImage(e) {
	showImage(next(curImage));
	return false;
}
function addSlideShow(elem) {
	var div = document.createElement("div");
	div.className = "slideshow";
	
	//显示幻灯的名字，这里使用的是图库的title
	var span = document.createElement("span");
	span.innerHTML = elem.title;
	div.appendChild(span);
	
	//创建一个链接，由此我们可以把图库所有的图片都当作幻灯中的一幕
	var a = document.createElement("a");
	a.href = "";
	a.innerHTML = "&raquo; View as a Slideshow";
	//点击后开始幻灯
	a.onclick = function () {
		startShow(this.parentNode.nextSibling);
		return false;
	};
	//为页面插入新的导航和头部
	div.appendChild(a);
	elem.parentNode.insertBefore(div, elem);
};
function startShow(obj) {
	var elem = tag("li", obj);
	var gallery = id("gallery");
	for (var i = 0; i < elem.length; i++)
		new function () {
			var cur = elem[i];
			setTimeout(function () {
				showImage(cur);
				setTimeout(function () {
					fadeOut(gallery,0,20);
				}, 2500);
			}, i * 5000);
		};
	setTimeout(hideOverlay, 5000 * elem.length);
	showOverlay();
}
function hideOverlay() {
	curImage = null;
	hide(id("overlay"));
	hide(id("gallery"));
}
function showOverlay() {
	var over = id("overlay");
	over.style.height = pageHeight() + "px";
	over.style.width = pageWidth() + "px";
	fadeIn(over, 60, 5);
};