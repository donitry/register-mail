(function() {
	window.onerror = function(a, b, c) {
		var d = document.createElement("img");
		if (!b) b = window.location.href;
		a += window.index ? "[" + index.current_error_dom + "]" : "[no index]";
		a = encodeURIComponent(a + "|_|" + b + "|_|" + c + "|_|" + window.navigator.userAgent);
		d.src = "http://badjs.qq.com/cgi-bin/js_report?bid=67&mid=195232&msg=" + a
	}
})();
document.caretRangeFromPoint = function() {};
var Simple = window.Simple = window.$ = function(a) {
		return document.getElementById(a)
	};
$.cookie = {
	get: function(a) {
		a = document.cookie.match(RegExp("(^| )" + a + "=([^;]*)(;|$)"));
		return !a ? "" : decodeURIComponent(a[2])
	},
	set: function(a, b, c, d, f) {
		var e = new Date;
		e.setTime(e.getTime() + (f ? 36E5 * f : 2592E6));
		document.cookie = a + "=" + b + "; expires=" + e.toGMTString() + "; path=" + (d ? d : "/") + "; " + (c ? "domain=" + c + ";" : "")
	},
	setSessionCookie: function(a, b, c, d) {
		document.cookie = a + "=" + b + "; path=" + (d ? d : "/") + "; " + (c ? "domain=" + c + ";" : "")
	},
	del: function(a, b, c) {
		document.cookie = a + "=; expires=Mon, 26 Jul 1997 05:00:00 GMT; path=" + (c ? c : "/") + "; " + (b ? "domain=" + b + ";" : "")
	},
	clear: function() {
		var a = document.cookie.match(RegExp("([^ ;][^;]*)(?=(=[^;]*)(;|$))", "gi")),
			b;
		for (b in a) document.cookie = a[b] + "=;expires=Mon, 26 Jul 1997 05:00:00 GMT; path=/; "
	},
	uin: function() {
		var a = $.cookie.get("uin");
		return !a ? null : parseInt(a.substring(1, a.length), 10)
	},
	getNewUin: function() {
		var a = $.winName.get("last_page");
		$.winName.set("last_page", 0);
		var b = $.cookie.get("_new_uin");
		b || (b = $.winName.get("_new_uin"));
		if (!b || b == "undefined") a == 1 && $.report.monitor("no_uin"), window.location.href = "error.html?ec=no";
		return b
	},
	getEmail: function() {
		var a = $.cookie.get("_email");
		a || (a = $.winName.get("_email"));
		if (!a) $.report.monitor("no_email"), window.location.href = "error.html?ec=no";
		return a
	}
};
$.http = {
	getXHR: function() {
		var a;
		try {
			a = new XMLHttpRequest
		} catch (b) {
			try {
				a = new ActiveXObject("Msxml2.XMLHTTP")
			} catch (c) {
				try {
					a = new ActiveXObject("Microsoft.XMLHTTP")
				} catch (d) {
					a = false
				}
			}
		}
		return a
	},
	ajax: function(a, b, c, d, f) {
		var e = $.http.getXHR();
		if (e) e.open(d, a), e.onreadystatechange = function() {
			if (e.readyState == 4 && (e.status >= 200 && e.status < 300 || e.status === 304 || e.status === 1223 || e.status === 0)) typeof f == "undefined" ? c(eval("(" + e.responseText + ")")) : c(e.responseText), e.onreadystatechange = function() {}, e = null
		}, e.send(b)
	},
	post: function(a, b, c, d) {
		var f = "",
			e;
		for (e in b) f += "&" + e + "=" + b[e];
		$.http.ajax(a, f, c, "POST", d)
	},
	get: function(a, b, c, d) {
		var f = "",
			e;
		for (e in b) f += "&" + e + "=" + b[e];
		a.indexOf("?") == -1 && (a += "?");
		a += f;
		$.http.ajax(a, null, c, "GET", d)
	},
	jsonp: function(a) {
		var b = document.createElement("script");
		b.src = a;
		document.getElementsByTagName("head")[0].appendChild(b)
	},
	loadScript: function(a, b) {
		var c = document.createElement("script");
		c.onload = c.onreadystatechange = function() {
			if (!this.readyState || this.readyState === "loaded" || this.readyState === "complete") b(), c.onload = c.onreadystatechange = null, c.parentNode && c.parentNode.removeChild(c)
		};
		c.src = a;
		document.getElementsByTagName("head")[0].appendChild(c)
	},
	preload: function(a) {
		document.createElement("img").src = a
	}
};
$.get = $.http.get;
$.post = $.http.post;
$.browser = function(a) {
	if (typeof $.browser.info == "undefined") {
		var b = {
			type: ""
		},
			c = navigator.userAgent.toLowerCase();
		/webkit/.test(c) ? b = {
			type: "webkit",
			version: /webkit[\/ ]([\w.]+)/
		} : /opera/.test(c) ? b = {
			type: "opera",
			version: /version/.test(c) ? /version[\/ ]([\w.]+)/ : /opera[\/ ]([\w.]+)/
		} : /msie/.test(c) ? b = {
			type: "msie",
			version: /msie ([\w.]+)/
		} : /mozilla/.test(c) && !/compatible/.test(c) && (b = {
			type: "ff",
			version: /rv:([\w.]+)/
		});
		b.version = (b.version && b.version.exec(c) || [0, "0"])[1];
		$.browser.info = b
	}
	return $.browser.info[a]
};
$.e = {
	_counter: 0,
	_uid: function() {
		return "h" + $.e._counter++
	},
	add: function(a, b, c) {
		typeof a != "object" && (a = $(a));
		if (document.addEventListener) a.addEventListener(b, c, false);
		else if (document.attachEvent && $.e._find(a, b, c) == -1) {
			var d = function(b) {
					if (!b) b = window.event;
					b = {
						_event: b,
						type: b.type,
						target: b.srcElement,
						currentTarget: a,
						relatedTarget: b.fromElement ? b.fromElement : b.toElement,
						eventPhase: b.srcElement == a ? 2 : 3,
						clientX: b.clientX,
						clientY: b.clientY,
						screenX: b.screenX,
						screenY: b.screenY,
						altKey: b.altKey,
						ctrlKey: b.ctrlKey,
						shiftKey: b.shiftKey,
						keyCode: b.keyCode,
						stopPropagation: function() {
							this._event.cancelBubble = true
						},
						preventDefault: function() {
							this._event.returnValue = false
						}
					};
					Function.prototype.call ? c.call(a, b) : (a._currentHandler = c, a._currentHandler(b), a._currentHandler = null)
				};
			a.attachEvent("on" + b, d);
			var b = {
				element: a,
				eventType: b,
				handler: c,
				wrappedHandler: d
			},
				d = (a.document || a).parentWindow,
				f = $.e._uid();
			if (!d._allHandlers) d._allHandlers = {};
			d._allHandlers[f] = b;
			if (!a._handlers) a._handlers = [];
			a._handlers.push(f);
			if (!d._onunloadHandlerRegistered) d._onunloadHandlerRegistered = true, d.attachEvent("onunload", $.e._removeAllHandlers)
		}
	},
	remove: function(a, b, c) {
		if (document.addEventListener) a.removeEventListener(b, c, false);
		else if (document.attachEvent && (c = $.e._find(a, b, c), c != -1)) {
			var d = (a.document || a).parentWindow,
				f = a._handlers[c];
			a.detachEvent("on" + b, d._allHandlers[f].wrappedHandler);
			a._handlers.splice(c, 1);
			delete d._allHandlers[f]
		}
	},
	_find: function(a, b, c) {
		var d = a._handlers;
		if (!d) return -1;
		for (var a = (a.document || a).parentWindow, f = d.length - 1; f >= 0; f--) {
			var e = a._allHandlers[d[f]];
			if (e.eventType == b && e.handler == c) return f
		}
		return -1
	},
	_removeAllHandlers: function() {
		for (id in this._allHandlers) {
			var a = this._allHandlers[id];
			a.element.detachEvent("on" + a.eventType, a.wrappedHandler);
			delete this._allHandlers[id]
		}
	},
	src: function(a) {
		return a ? a.target : event.srcElement
	},
	stopPropagation: function(a) {
		a ? a.stopPropagation() : event.cancelBubble = true
	}
};
$.bom = {
	query: function(a) {
		a = window.location.search.substr(1).match(RegExp("(^|&)" + a + "=([^&]*)(&|$)"));
		return !a ? "" : decodeURIComponent(a[2])
	},
	getHash: function() {}
};
$.dom = {
	init: function() {
		if (window.screenLeft) $.dom.getWindowX = function() {
			return window.screenLeft
		}, $.dom.getWindowY = function() {
			return window.screenTop
		};
		else if (window.screenX) $.dom.getWindowX = function() {
			return window.screenX
		}, $.dom.getWindowY = function() {
			return window.screenY
		};
		if (window.innerWidth) $.dom.getViewportWidth = function() {
			return window.innerWidth
		}, $.dom.getViewportHeight = function() {
			return window.innerHeight
		}, $.dom.getHorizontalScroll = function() {
			return window.pageXOffset
		}, $.dom.getVerticalScroll = function() {
			return window.pageYOffset
		};
		else if (document.documentElement && document.documentElement.clientWidth) $.dom.getViewportWidth = function() {
			return document.documentElement.clientWidth
		}, $.dom.getViewportHeight = function() {
			return document.documentElement.clientHeight
		}, $.dom.getHorizontalScroll = function() {
			return document.documentElement.scrollLeft
		}, $.dom.getVerticalScroll = function() {
			return document.documentElement.scrollTop
		};
		if (document.documentElement && document.documentElemnet.scrollWidth) $.dom.getDocumentWidth = function() {
			return document.documentElement.scrollWidth
		}, $.dom.getDocumentHeight = function() {
			return document.documentElement.scrollHeight
		};
		else if (document.body.scrollWidth) $.dom.getDocumentWidth = function() {
			return document.body.scrollWidth
		}, $.dom.getDocumentHeight = function() {
			return document.body.scrollHeight
		}
	},
	getFinalStyle: function(a, b) {
		return window.getComputedStyle ? window.getComputedStyle(a, null)[b] : a.currentStyle ? a.currentStyle[b] : a.style[b]
	},
	height: function(a) {
		if (this.getFinalStyle(a, "display") !== "none") return a.offsetHeight || a.clientHeight;
		else {
			a.style.display = "block";
			var b = a.offsetHeight || a.clientHeight;
			a.style.display = "none";
			return b
		}
	},
	width: function(a) {
		if (this.getFinalStyle(a, "display") !== "none") return a.offsetWidth || a.clientWidth;
		else {
			a.style.display = "block";
			var b = a.offsetWidth || a.clientWidth;
			a.style.display = "none";
			return b
		}
	},
	getPageWidth: function() {
		return Math.max(document.documentElement.clientWidth, document.body.clientWidth, document.documentElement.scrollWidth, document.body.scrollWidth)
	},
	getPageHeight: function() {
		return Math.max(document.documentElement.clientHeight, document.body.clientHeight, document.documentElement.scrollHeight, document.body.scrollHeight)
	},
	getNode: function(a, b) {
		var c = document.createElement(a),
			d = {
				"class": function() {
					c.className = b["class"]
				},
				style: function() {
					c.style.cssText = b.style
				}
			},
			f;
		for (f in b) if (d[f]) d[f]();
		else c.setAttribute(f, b[f]);
		return c
	}
};
$.css = {
	hasClass: function(a, b) {
		return RegExp("\\b" + b + "\\b").test(a.className)
	},
	addClass: function(a, b) {
		if (!this.hasClass(a, b)) a.className = a.className + " " + b
	},
	removeClass: function(a, b) {
		a.className = a.className.replace(RegExp("\\b" + b + "\\b"), "")
	},
	getWidth: function(a) {
		return $(a).offsetWidth
	},
	getHeight: function(a) {
		return $(a).offsetHeight
	},
	show: function(a) {
		$.css.removeClass(a, "hide")
	},
	hide: function(a) {
		$.css.addClass(a, "hide")
	}
};
$.set = function(a, b, c) {
	if (!c) return a.getAttribute(b)
};
$.winName = {
	set: function(a, b) {
		var c = window.name || "";
		window.name = c.match(RegExp(";" + a + "=([^;]*)(;|$)")) ? c.replace(RegExp(";" + a + "=([^;]*)"), ";" + a + "=" + b) : c + ";" + a + "=" + b
	},
	get: function(a) {
		return (a = (window.name || "").match(RegExp(";" + a + "=([^;]*)(;|$)"))) ? a[1] : ""
	},
	clear: function(a) {
		window.name = (window.name || "").replace(RegExp(";" + a + "=([^;]*)"), "")
	}
};
$.str = {
	getBytes: function(a) {
		return a.replace(/[^-ÿ]/g, "xx").length
	}
};
$.html = {
	encode: function(a) {
		var b = "";
		return a.length == 0 ? "" : b = a.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/ /g, "&nbsp;").replace(/'/g, "&apos;").replace(/"/g, "&quot;")
	},
	decode: function(a) {
		var b = "";
		return a.length == 0 ? "" : b = a.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&nbsp;/g, " ").replace(/&apos;/g, "'").replace(/&quot;/g, '"')
	}
};
$.oop = {
	extend: function(a) {
		var b;
		arguments.length == 1 ? (a = this, b = 0) : (a = arguments[0], b = 1);
		var c = true;
		for (typeof arguments[arguments.length - 1] == "boolean" && (c = arguments[arguments.length - 1]); b < arguments.length;) {
			var d = arguments[b];
			for (p in d) {
				var f = a[p],
					e = d[p];
				f !== e && (c && e && (e && String(e) !== "[object HTMLDivElement]" && e.constructor === Object || String(e) === "[object Object]") && !(e && String(e) !== "[object HTMLDivElement]" && e.constructor === Array || Object.prototype.toString.call(e) === "[object Array]") && !e.nodeType && !(e && e.constructor === Function) ? (f = a[p] || {}, a[p] = $.oop.extend(f, e || (e.length == null ? {} : []))) : e !== void 0 && (a[p] = e))
			}
			b++
		}
		return a
	},
	Class: function() {
		var a = arguments.length,
			b = arguments[a - 1];
		b.init = b.init ||
		function() {};
		var c = function() {
				return this.init.apply(this, arguments)
			};
		if (a === 2) {
			var a = arguments[0].extend,
				d = function() {};
			d.prototype = a.prototype;
			c.superClass = a.prototype;
			c.callSuper = function(a, b) {
				var d = Array.prototype.slice,
					h = d.call(arguments, 2);
				(b = c.superClass[b]) && b.apply(a, h.concat(d.call(arguments)))
			};
			c.prototype = new d;
			c.prototype.constructor = c;
			$.oop.extend(c.prototype, b);
			c.prototype.init = function() {
				b.init.apply(this, arguments)
			}
		} else if (a === 1) c.prototype = b;
		return c
	},
	bind: function(a, b) {
		var c = Array.prototype.slice,
			d = c.call(arguments, 2);
		return function() {
			return a.apply(b, d.concat(c.call(arguments)))
		}
	},
	addObserver: function(a, b, c) {
		if (c) {
			b = "on" + b;
			if (!a._$events) a._$events = {};
			b in a._$events ? a._$events[b].length == 0 && (a._$events[b] = []) : a._$events[b] = [];
			for (var a = a._$events[b], b = -1, d = 0, f = a.length; d < f; d++) if (a[d] == c) {
				b = d;
				break
			}
			b === -1 && a.push(c)
		}
	},
	notifyObservers: function(a, b, c) {
		var d = true,
			b = "on" + b;
		if (a._$events && a._$events[b]) for (var b = $.oop.extend([], a._$events[b]), f = 0, e = b.length; f < e; f++) b[f].apply(a, [c]) === false && (d = false);
		return d
	},
	removeObserver: function(a, b, c) {
		var d, f = false,
			e = a._$events;
		if (c && b) {
			if (e && (evts = e["on" + b])) for (d = 0, a = evts.length; d < a; d++) if (evts[d] == c) {
				evts[d] = null;
				evts.splice(d, 1);
				f = true;
				break
			}
		} else if (b) {
			if (e && (b = "on" + b, evts = e[b])) {
				a = evts.length;
				for (d = 0; d < a; d++) evts[d] = null;
				delete e[b];
				f = true
			}
		} else if (a && e) {
			for (d in e) delete e[d];
			delete a._$events;
			f = true
		}
		return f
	}
};
g = {
	searchValue: "输入想要的4-10位数字",
	searchTip: "请输入4-10位数字",
	cacheUrl: "",
	ver: 10062,
	component: {},
	searchBlur: function(a) {
		if (a.value == "") a.value = g.searchValue, a.style.color = "#aaa"
	},
	searchFocus: function(a) {
		if (a.value == g.searchValue) a.value = "", a.style.color = "#000"
	},
	phoneClick: function(a) {
		a ? ($("quickReg").style.display = "block", $("switcher").className = "hover", $.report.monitor("phone_zc")) : ($("quickReg").style.display = "none", $("switcher").className = "normal")
	},
	formSubmit: function() {
		if (/^[0-9]{4,10}$/.test($("serch_ipt").value)) window.open("http://haoma.qq.com/shop.html#num=" + $("serch_ipt").value + "&from=zc");
		else return alert(g.searchTip), false;
		$.report.monitor("search_qq");
		return false
	},
	init: function() {
		if ($("serch_ipt")) $("serch_ipt").value = g.searchValue
	},
	checkVersion: function() {
		var a = document.createElement("script");
		a.src = "ver.js?v=" + Math.random();
		document.getElementsByTagName("head")[0].appendChild(a)
	},
	clearCache: function(a) {
		var b = document.createElement("iframe");
		b.src = "clearcache.html#" + a;
		b.style.display = "none";
		document.body.appendChild(b)
	},
	cb: function(a) {
		a != g.ver && g.clearCache(window.location + "")
	},
	getQQnum: function() {
		try {
			if (window.ActiveXObject) {
				var a = new ActiveXObject("SSOAxCtrlForPTLogin.SSOForPTLogin2"),
					b = a.CreateTXSSOData();
				a.InitSSOFPTCtrl(0, b);
				var c = a.CreateTXSSOData(),
					d = a.DoOperation(2, c).GetArray("PTALIST").GetSize();
				if (d > 0) return d
			} else if (navigator.mimeTypes["application/nptxsso"]) {
				var f = document.createElement("embed");
				f.type = "application/nptxsso";
				f.style.width = "0px";
				f.style.height = "0px";
				document.body.appendChild(f);
				if (f.InitPVANoST()) {
					var e = f.GetPVACount();
					if (e > 0) return e
				}
			}
		} catch (i) {}
		return 0
	},
	openHaoma: function(a) {
		switch (a) {
		case 1:
			$.report.monitor("birthday_qq");
			window.open("http://haoma.qq.com/shop.html#topic=date&from=zc");
			break;
		case 2:
			$.report.monitor("love_qq");
			window.open("http://haoma.qq.com/shop.html#topic=love&from=zc");
			break;
		case 3:
			$.report.monitor("grade_qq");
			window.open("http://haoma.qq.com/static/gno/grade/grade_index.html");
			break;
		case 4:
			$.report.monitor("year_qq");
			window.open("http://haoma.qq.com/shop.html#topic=date&from=zc");
			break;
		case 5:
			$.report.monitor("mobile_qq");
			window.open("http://haoma.qq.com/shop.html#topic=phone&from=zc");
			break;
		case 6:
			$.report.monitor("fine_qq");
			window.open("http://haoma.qq.com/static/gno/mobile/mobile_index.html");
			break;
		case 7:
			$.report.monitor("tianyi"), window.open("http://chinatelecom.zc.qq.com/")
		}
	}
};
g.init();
g.checkVersion();
g.component.quickReg = $("quickReg") ? true : false;
$.e.add(window, "load", function() {
	g.component.quickReg && ($.e.add($("switcher"), "click", function(a) {
		var b = $("quickReg").style.display;
		if (b == "none" || b == "") g.phoneClick(true), a.stopPropagation()
	}), $.e.add($("quickReg"), "click", function(a) {
		a.stopPropagation()
	}), $.e.add(document.body, "click", function() {
		var a = $("quickReg").style.display;
		a != "none" && a != "" && g.phoneClick(false)
	}))
});
String.prototype.trim = function() {
	return this.replace(/(^\s*)|(\s*$)/g, "")
};

function browser_version() {
	var a = navigator.userAgent.toLowerCase();
	return a.match(/msie ([\d.]+)/) ? 1 : a.match(/firefox\/([\d.]+)/) ? 3 : a.match(/chrome\/([\d.]+)/) ? 5 : a.match(/opera.([\d.]+)/) ? 9 : a.match(/version\/([\d.]+).*safari/) ? 7 : 1
}

function isForeignPhone(a) {
	return /^00(86|852|853|886)/.test(a) ? false : true
}

function isGanAoTaiPhone(a) {
	return /^00(852|853|886)/.test(a) ? true : false
}

function isRegValidPhone(a) {
	a += "";
	return /(^1[0-9]{10}$)|(^00[1-9]{1}[0-9]{3,15}$)/.test(a)
}
$.report = {
	id2attr: {
		submit: {
			id: 173272,
			tag: "0xD001"
		},
		guard: {
			id: 173273,
			tag: "0xD002"
		},
		sendToLocal: {
			id: 173274
		},
		sendToEmail: {
			id: 173275
		},
		numReg: {
			id: 173276
		},
		phoneReg: {
			id: 239277
		},
		QQMailReg: {
			id: 173277
		},
		otherMailReg: {
			id: 173278
		},
		pv: {
			id: 173279
		},
		pv_all: {
			id: 260714
		},
		pv_chs: {
			id: 278037
		},
		pv_cht: {
			id: 278038
		},
		pv_en: {
			id: 278039
		},
		verifyChangeTel: {
			id: 239278
		},
		verifyUpChangeTel: {
			id: 239279
		},
		hasbindChangeTel: {
			id: 239280
		},
		tianyiChangeTel: {
			id: 239281
		},
		paopao: {
			id: 239282
		},
		phoneRegSubmitBtn: {
			id: 241143
		},
		phoneGetVerimaBtn: {
			id: 241144
		},
		phoneGetVerimaAgainBtn: {
			id: 241145
		},
		phoneSubmitVerimaBtn: {
			id: 241146
		},
		phoneVerifyNowBtn: {
			id: 241148
		},
		phoneVerifyAgainBtn: {
			id: 241149
		},
		phoneVerifyUpSubmitLimit: {
			id: 241150
		},
		phoneHasbindPage: {
			id: 241152
		},
		phoneChangebindPage: {
			id: 241153
		},
		phoneOKLogin: {
			id: 241155
		},
		phoneSetGuard: {
			id: 241156
		},
		qqGetVerimaBtn: {
			id: 241157
		},
		qqSubmitVerimaBtn: {
			id: 241158
		},
		qqVerifyBindPhone: {
			id: 241159
		},
		qqVerifyNowBtn: {
			id: 241160
		},
		qqVerifyUpBindPhone: {
			id: 241161
		},
		qqHasbindPage: {
			id: 241162
		},
		qqChangebindPage: {
			id: 241163
		},
		a_qq: {
			id: 173280,
			tag: "0xD011"
		},
		a_weibo: {
			id: 173281,
			tag: "0xD012"
		},
		a_qzone: {
			id: 173282,
			tag: "0xD013"
		},
		a_email: {
			id: 173283,
			tag: "0xD0014"
		},
		a_game: {
			id: 173284,
			tag: "0xD015"
		},
		a_pengyou: {
			id: 173285,
			tag: "0xD016"
		},
		a_vip: {
			id: 173286,
			tag: "0xD017"
		},
		b_phoneqq: {
			id: 173292
		},
		b_vip: {
			id: 173294
		},
		b_email: {
			id: 173293
		},
		b_pengyou: {
			id: 173295
		},
		b_qzone: {
			id: 173296
		},
		b_qshow: {
			id: 173297
		},
		b_music: {
			id: 173298
		},
		b_pet: {
			id: 173299
		},
		b_qlive: {
			id: 173300
		},
		b_lol: {
			id: 173301
		},
		b_x5: {
			id: 173302
		},
		b_weibo: {
			id: 173303
		},
		b_style: {
			id: 173304
		},
		b_mq: {
			id: 173305
		},
		b_dnf: {
			id: 173306
		},
		b_qplus: {
			id: 173307
		},
		b_tenpay: {
			id: 173308
		},
		b_speed: {
			id: 173309
		},
		b_qtalk: {
			id: 173310
		},
		b_qqgame: {
			id: 173311
		},
		ad_style: {
			id: 173318
		},
		ad_pai: {
			id: 173319
		},
		ad_guanjia_7x: {
			id: 173320
		},
		404: {
			id: 181790
		},
		500: {
			id: 181791
		},
		no_uin: {
			id: 181922
		},
		no_email: {
			id: 181923
		},
		no_param: {
			id: 181924
		},
		no_sessionCookie: {
			id: 182166
		},
		no_uin_ie: {
			id: 182855
		},
		no_uin_ff: {
			id: 182856
		},
		no_uin_chrome: {
			id: 182857
		},
		no_uin_opera: {
			id: 182858
		},
		no_uin_safari: {
			id: 182859
		},
		cookie_disable: {
			id: 183612
		},
		search_qq: {
			id: 182032
		},
		birthday_qq: {
			id: 182033
		},
		love_qq: {
			id: 182034
		},
		grade_qq: {
			id: 182035
		},
		year_qq: {
			id: 182036
		},
		mobile_qq: {
			id: 182037
		},
		fine_qq: {
			id: 182038
		},
		phone_zc: {
			id: 182176
		},
		tianyi: {
			id: 182177
		},
		resendLink: {
			id: 183518
		},
		renewLink: {
			id: 183517
		},
		helpFriend: {
			id: 183617
		},
		weakPwd: {
			id: 228591
		},
		midPwd: {
			id: 228592
		},
		strongPwd: {
			id: 228593
		},
		QQHuiyuan: {
			id: 232857
		},
		noPhone: {
			id: 249241
		},
		phone_to_number: {
			id: 250660
		},
		phone_to_noPhone: {
			id: 250661
		},
		phone_to_mail: {
			id: 250662
		},
		phone_to_submit: {
			id: 250663
		},
		phone_count: {
			id: 250667
		},
		number_to_phone_wording: {
			id: 250763
		},
		email_count: {
			id: 252155
		},
		email_to_number: {
			id: 252156
		},
		email_to_number_wording: {
			id: 252194
		},
		email_to_phone: {
			id: 252157
		},
		email_to_qqmail: {
			id: 252158
		},
		email_to_submit: {
			id: 252159
		},
		number_count: {
			id: 252190
		},
		number_to_phone: {
			id: 252191
		},
		number_to_mail: {
			id: 252192
		},
		number_to_submit: {
			id: 252193
		},
		cancleqqVerifyBindPhone: {
			id: 254605
		},
		cancleqqVerifyUpBindPhone: {
			id: 254606
		},
		init_number_to_submit: {
			id: 256401
		},
		init_email_to_submit: {
			id: 256402
		},
		init_phone_to_submit: {
			id: 256403
		},
		qqtab_bind_email_bind: {
			id: 259735
		},
		qqtab_bind_email_active: {
			id: 259736
		},
		qqtab_bind_email_lose_login: {
			id: 259737
		},
		qqtab_bind_phone_bind: {
			id: 259738
		},
		qqtab_bind_phone_active: {
			id: 259739
		},
		qqtab_bind_phone_send: {
			id: 259740
		},
		qqtab_bind_phone_conflict: {
			id: 259741
		},
		qqtab_bind_phone_vcode_error: {
			id: 259742
		},
		bindPhone_test1: {
			id: 265572
		},
		bindPhone_test2: {
			id: 265573
		},
		bindPhone_test3: {
			id: 265574
		},
		bindPhone_test4: {
			id: 265575
		},
		bindPhone_test5: {
			id: 265576
		},
		bindEmail_test1: {
			id: 265577
		},
		bindEmail_test2: {
			id: 265578
		},
		bindEmail_test3: {
			id: 265579
		},
		bindEmail_test4: {
			id: 265580
		},
		bindEmail_test5: {
			id: 265581
		},
		sea_phone_pv: {
			id: 312410
		}
	},
	transform: function(a) {
		if (!a) return "";
		var b = [],
			c;
		for (c in a) b.push(c), b.push("="), b.push(a[c]), b.push("&");
		return b.join("")
	},
	monitor: function(a, b) {
		var c = "http://zc.qq.com/cgi-bin/common/attr?" + this.transform(this.id2attr[a]) + this.transform(b) + "r=" + Math.random();
		$.http.preload(c)
	},
	isd: function(a) {
		var b = [1, 3, 4];
		if (!(Math.random() > 0.1)) {
			for (var c = ["http://isdspeed.qq.com/cgi-bin/r.cgi?flag1=7817&flag2=2&flag3=2"], d = a[0], f = 0, e = b.length; f < e; f++) c.push("&"), c.push(b[f]), c.push("="), c.push(a[f + 1] - d);
			$.http.preload(c.join(""))
		}
	},
	isdPwdTime: function(a) {
		for (var b = [1, 2, 3, 4], c = ["http://isdspeed.qq.com/cgi-bin/r.cgi?flag1=7817&flag2=2&flag3=3"], d = 0, f = b.length; d < f; d++) a[d] > 0 && (c.push("&"), c.push(b[d]), c.push("="), c.push(a[d]));
		$.http.preload(c.join(""))
	}
};

function langSwitch(a) {
	$.winName.set("type", "");
	window.location.href = window.location.pathname.split("/chs/")[0] + "/" + a + "/index.html"
}

function indexType2RegType(a) {
	return [1, 2, 3, 18][a]
}

function feedBack(a) {
	var a = 716,
		b = $.cookie.get("sessionCookie"),
		c = $.cookie.get("machineCookie"),
		d = $.cookie.get("skey"),
		f = $.cookie.get("uin"),
		e = "";
	window.open(d && f ? "http://support.qq.com/write.shtml?fid=" + a + "&SSTAG=10062-" + b + "-" + c : "http://support.qq.com/write.shtml?guest=1&fid=" + a + "&SSTAG=10062-" + b + "-" + c)
}

function _DJB(a) {
	if (!a) return "";
	for (var b = 5381, c = 0, d = a.length; c < d; ++c) b += (b << 5) + a.charAt(c).charCodeAt();
	return b & 2147483647
}
$.e.add(window, "load", function() {
	$.report.monitor("pv_all");
	$.report.monitor("pv_chs");
	$.report.monitor("pv")
});