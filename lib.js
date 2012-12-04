function tag(name, elem) {
	return (elem || document).getElementsByTagName(name);
};
function id(name) {
	return document.getElementById(name);
};
function next(elem) {
	do {
		elem = elem.nextSibling;
	} while (elem && elem.nodeType != 1);
	return elem
};
function prev(elem) {
	do {
		elem = elem.previousSibling;
	} while (elem && elem.nodeType != 1);
	return elem
};
function byClass(name, type) {
	var r = [];
	var re = RegExp("(^|\\s)" + name + "(\\s|$)");
	var e = document.getElementsByTagName(type || "*");
	for (var j = 0; j < e.length; j++) {
		if (re.test(e[j].className)) {
			r.push(e[j]);
		}
	}
	return r;
};
function getStyle(elem, name) {
	if (elem.style[name]) {
		return elem.style[name];
	} else if (elem.currentStyle) {
		return elem.currentStyle[name];
	} else if (document.defaultView && document.defaultView.getComputedStyle) {
		name = name.replace(/([A-Z])/g, "-$1");
		name = name.toLowerCase();
		var s = document.defaultView.getComputedStyle(elem, "");
		return s && s.getPropertyValue(name);
	} else {
		return null;
	}
};
function pageHeight() {
	return document.body.scrollHeight;
}
function pageWidth() {
	return document.body.scrollWidth;
}
function hide(elem) {
	var curDisplay = getStyle(elem, 'display');
	if (curDisplay != 'none') {
		elem.$oldDisplay = curDisplay;
	}
	elem.style.display = 'none';
};
function show(elem) {
	var display = getStyle(elem, 'display');
	if (display == 'none' || display == '') {
		elem.style.display = elem.$oldDisplay || 'block';
	}
}
function setOpacity(elem, level) {
	if (elem.filters) {
		elem.style.filters = 'alpha(opacity=' + level + ')';
	} else {
		elem.style.opacity = level / 100;
	}
};
function fadeIn(elem,to,speed) {
	var t=to||100;
	var s=speed||10;
	setOpacity(elem, 0);
	show(elem);
	for (var i = 0; i < 100; i += 5) {
		(function () {
			var pos = i;
			setTimeout(function () {
				setOpacity(elem, pos/100*t);
			}, (pos + 1) * s);
		})();
	}
};
function fadeOut(elem,to,speed) {
	//setOpacity(elem,0);
	//show(elem);
	for (var i = 100; i > 0; i = i-5) {
		(function () {
			var pos = i;
			setTimeout(function () {
				setOpacity(elem, pos);
				if(pos==5)hide(elem);
			}, (pos + 1) * speed);
		})();
	}
};
function setX(elem, pos) {
	elem.style.left = pos + "px";
}
function setY(elem, pos) {
	elem.style.top = pos + "px";
}
function getHeight(elem) {
	return parseInt(getStyle(elem, 'height'));
}
function getWidth(elem) {
	return parseInt(getStyle(elem, 'width'));
}
function scrollX() {
	var de = document.documentElement;
	return self.pageXOffset || (de && de.scrollLeft) || document.body.scrollLeft;
};
function scrollY() {
	var de = document.documentElement;
	return self.pageXOffset || (de && de.scrollTop) || document.body.scrollTop;
};
