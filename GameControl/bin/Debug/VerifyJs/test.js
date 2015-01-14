!
function() {
	var a = window.dispatchEvent,
		b = {
			preventDefaultEvent: function(a) {
				a = window.event || a, a && (a.preventDefault ? a.preventDefault() : a.returnValue = !1)
			},
			setCookie: function(a, b, c, d) {
				var e = a + "=" + escape(b);
				if (c) {
					var f = new Date;
					f.setTime(f.getTime() + c), e += "; expires=" + f.toGMTString()
				}
				d && (e += "; domain=" + d), document.cookie = e
			},
			getCookie: function(a) {
				var b, c = new RegExp("(^| )" + a + "=([^;]*)(;|$)");
				return b = document.cookie.match(c), b ? unescape(b[2]) : ""
			},
			deleteCookie: function(a) {
				b.setCookie(a, 1, -1e3)
			},
			getStringLen: function(a) {
				var b = a.match(/[^-ÿ]/gi);
				return a.length + (null == b ? 0 : b.length)
			},
			extend: function() {
				for (var a = arguments[0], b = 1; b < arguments.length; b++) {
					var c = arguments[b];
					if (c) for (var d in c) a[d] = c[d]
				}
				return a
			},
			bind: function(a, b) {
				return function() {
					return a.apply(b, arguments)
				}
			},
			objToQueryStr: function(a) {
				var b = [];
				for (var c in a) a.hasOwnProperty(c) && b.push(c + "=" + a[c]);
				return b.join("&")
			},
			jsonpGet: function(a, c, d) {
				if (d) {
					var e = "pprtjsonp" + b.guid();
					window[e] = d, c.callback = e
				}
				a = a + "?" + this.objToQueryStr(c);
				var f = document.createElement("script");
				f.src = a, b.getRcycleEl().appendChild(f)
			},
			trim: function(a) {
				return a.replace(/^\s+/, "").replace(/\s+$/, "")
			},
			setData: function(a, b, c) {
				var d, e = b.split(".");
				return b ? (d = e.shift(), e.length > 0 ? (a[d] = a[d] || {}, this.setData(a[d], e.join("."), c)) : (a[b] = c, a[b])) : null
			},
			getData: function(a, b) {
				var c, d = b.split(".");
				return b ? (c = d.shift(), a[c] ? d.length > 0 ? this.getData(a[c], d.join(".")) : a[b] : null) : null
			},
			guid: function() {
				return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
			},
			on: a ?
			function(a, b, c, d) {
				return a ? (a.addEventListener(b, c, !! d), c) : null
			} : function(a, b, c) {
				function d(b) {
					return c.call(a, b || window.event)
				}
				return a ? (a.attachEvent && a.attachEvent("on" + b, d), d) : null
			},
			hasClass: function(a, b) {
				return 1 === a.nodeType ? !! a.className && (" " + a.className + " ").indexOf(" " + b + " ") > -1 : void 0
			},
			addClass: function(a, c) {
				return b.hasClass(a, c) === !1 && (a.className = b.trim(a.className + " " + c)), a
			},
			removeClass: function(a, c) {
				if (b.hasClass(a, c) === !0) {
					var d = new RegExp("(\\s|^)" + c + "(\\s|$)");
					a.className = a.className.replace(d, " ")
				}
				return a
			},
			getCss: function(a, b) {
				if (a.style[b]) return a.style[b];
				if (a.currentStyle) return a.currentStyle[b];
				if (document.defaultView && document.defaultView.getComputedStyle) {
					b = b.replace(/([A-Z])/g, "-$1"), b = b.toLowerCase();
					var c = document.defaultView.getComputedStyle(a, "");
					return c && c.getPropertyValue(b)
				}
			},
			loadCss: function(a) {
				var b = document.createElement("link"),
					c = document.getElementsByTagName("head")[0];
				b.rel = "stylesheet", b.type = "text/css", b.href = a, c.appendChild(b)
			},
			setAttr: function(a, b, c) {
				a[b] = c
			},
			getAttr: function(a, b) {
				return a[b]
			},
			getBodyHeight: function() {
				var a;
				return a = "BackCompat" == document.compatMode ? document.body.clientHeight : document.documentElement && document.documentElement.clientHeight ? document.documentElement.clientHeight : document.body.clientHeight ? document.body.clientHeight : window.height
			},
			getBodyWidth: function() {
				var a;
				return a = document.documentElement && document.documentElement.clientWidth ? document.documentElement.clientWidth : document.body.clientWidth ? document.body.clientWidth : window.width
			},
			getOffset: function(a) {
				var b = 0,
					c = 0;
				if (a.offsetParent) {
					do b += a.offsetLeft, c += a.offsetTop;
					while (a = a.offsetParent)
				} else b = a.offsetLeft, c = a.offsetTop;
				return {
					left: b,
					top: c
				}
			},
			ArrDel: function(a, b) {
				return 0 > b ? a : a.slice(0, b).concat(a.slice(b + 1, a.length))
			},
			waitForBody: function(a) {
				document.body ? a() : setTimeout(function() {
					b.waitForBody(a)
				}, 50)
			}
		},
		c = b.$ = function() {
			function a(a) {
				this.element = a
			}
			function c(a, b) {
				for (var d = a.childNodes, e = 0; e < d.length; e++) {
					var f = d.item(e);
					if (1 === f.nodeType) {
						if (b.test(f.className)) return f;
						var g = c(f, b);
						if (g) return g
					}
				}
				return !1
			}
			a.prototype.show = function() {
				if (this.element) {
					var a = b.getAttr(this.element, "pprtDisplay");
					(void 0 === a || null === a) && (a = b.getCss(this.element, "display"), "none" === a && (a = "block"), b.setAttr(this.element, "pprtDisplay", a)), this.element.style.display = a
				}
				return this
			}, a.prototype.hide = function() {
				if (this.element) {
					var a = b.getCss(this.element, "display");
					"none" === a && (a = "block"), b.setAttr(this.element, "pprtDisplay", a), this.element.style.display = "none"
				}
				return this
			}, a.prototype.html = function() {
				var a = this.element;
				return arguments.length > 0 ? (a && (a.innerHTML = arguments[0]), this) : a ? a.innerHTML : null
			}, a.prototype.attr = function() {
				var a = this.element;
				return arguments.length > 1 ? (a && a.setAttribute(arguments[0], arguments[1]), this) : 1 === arguments.length ? a ? a.getAttribute(arguments[0]) : null : void 0
			}, a.prototype.on = function(a, c, d) {
				function e(a) {
					d = d ? d : null;
					var e = c.apply(d, arguments);
					return e === !1 && b.preventDefaultEvent(a), e
				}
				var f = this.element;
				f && (f.attachEvent ? f.attachEvent("on" + a, e) : f.addEventListener(a, e, !0))
			};
			var d = /^<(\w+)[\s>](.*)<\/\1>$/i,
				e = document.createElement("div");
			return function(b, f) {
				var g;
				if (f && !f.tagName && (f = f.element), "object" == typeof b) g = b;
				else if ("#" === b.charAt(0)) g = document.getElementById(b.substr(1));
				else if ("." === b.charAt(0)) g = c(f ? f : document, new RegExp("(^\\s*|\\s+)" + b.substr(1) + "(\\s+|\\s*$)"));
				else if (d.test(b)) {
					if (e.innerHTML = b, 1 !== e.childNodes.length) throw "only 1 element is allowed: " + b;
					for (g = e.firstChild; e.firstChild;) e.removeChild(e.firstChild)
				}
				return new a(g)
			}
		}();
	b.getRcycleEl = function() {
		if (!b.rcycleEl) {
			var a = c('<div style="display:none;"  id="ue-component-rcycle"></div>');
			document.body.appendChild(a.element), b.rcycleEl = a.element
		}
		return b.rcycleEl
	}, b.hexMd5 = function() {
		function a(a) {
			return c(b(d(a)))
		}
		function b(a) {
			return f(g(e(a), 8 * a.length))
		}
		function c(a) {
			try {} catch (b) {
				o = 0
			}
			for (var c, d = o ? "0123456789ABCDEF" : "0123456789abcdef", e = "", f = 0; f < a.length; f++) c = a.charCodeAt(f), e += d.charAt(c >>> 4 & 15) + d.charAt(15 & c);
			return e
		}
		function d(a) {
			for (var b, c, d = "", e = -1; ++e < a.length;) b = a.charCodeAt(e), c = e + 1 < a.length ? a.charCodeAt(e + 1) : 0, b >= 55296 && 56319 >= b && c >= 56320 && 57343 >= c && (b = 65536 + ((1023 & b) << 10) + (1023 & c), e++), 127 >= b ? d += String.fromCharCode(b) : 2047 >= b ? d += String.fromCharCode(192 | b >>> 6 & 31, 128 | 63 & b) : 65535 >= b ? d += String.fromCharCode(224 | b >>> 12 & 15, 128 | b >>> 6 & 63, 128 | 63 & b) : 2097151 >= b && (d += String.fromCharCode(240 | b >>> 18 & 7, 128 | b >>> 12 & 63, 128 | b >>> 6 & 63, 128 | 63 & b));
			return d
		}
		function e(a) {
			for (var b = Array(a.length >> 2), c = 0; c < b.length; c++) b[c] = 0;
			for (var c = 0; c < 8 * a.length; c += 8) b[c >> 5] |= (255 & a.charCodeAt(c / 8)) << c % 32;
			return b
		}
		function f(a) {
			for (var b = "", c = 0; c < 32 * a.length; c += 8) b += String.fromCharCode(a[c >> 5] >>> c % 32 & 255);
			return b
		}
		function g(a, b) {
			a[b >> 5] |= 128 << b % 32, a[(b + 64 >>> 9 << 4) + 14] = b;
			for (var c = 1732584193, d = -271733879, e = -1732584194, f = 271733878, g = 0; g < a.length; g += 16) {
				var h = c,
					n = d,
					o = e,
					p = f;
				c = i(c, d, e, f, a[g + 0], 7, -680876936), f = i(f, c, d, e, a[g + 1], 12, -389564586), e = i(e, f, c, d, a[g + 2], 17, 606105819), d = i(d, e, f, c, a[g + 3], 22, -1044525330), c = i(c, d, e, f, a[g + 4], 7, -176418897), f = i(f, c, d, e, a[g + 5], 12, 1200080426), e = i(e, f, c, d, a[g + 6], 17, -1473231341), d = i(d, e, f, c, a[g + 7], 22, -45705983), c = i(c, d, e, f, a[g + 8], 7, 1770035416), f = i(f, c, d, e, a[g + 9], 12, -1958414417), e = i(e, f, c, d, a[g + 10], 17, -42063), d = i(d, e, f, c, a[g + 11], 22, -1990404162), c = i(c, d, e, f, a[g + 12], 7, 1804603682), f = i(f, c, d, e, a[g + 13], 12, -40341101), e = i(e, f, c, d, a[g + 14], 17, -1502002290), d = i(d, e, f, c, a[g + 15], 22, 1236535329), c = j(c, d, e, f, a[g + 1], 5, -165796510), f = j(f, c, d, e, a[g + 6], 9, -1069501632), e = j(e, f, c, d, a[g + 11], 14, 643717713), d = j(d, e, f, c, a[g + 0], 20, -373897302), c = j(c, d, e, f, a[g + 5], 5, -701558691), f = j(f, c, d, e, a[g + 10], 9, 38016083), e = j(e, f, c, d, a[g + 15], 14, -660478335), d = j(d, e, f, c, a[g + 4], 20, -405537848), c = j(c, d, e, f, a[g + 9], 5, 568446438), f = j(f, c, d, e, a[g + 14], 9, -1019803690), e = j(e, f, c, d, a[g + 3], 14, -187363961), d = j(d, e, f, c, a[g + 8], 20, 1163531501), c = j(c, d, e, f, a[g + 13], 5, -1444681467), f = j(f, c, d, e, a[g + 2], 9, -51403784), e = j(e, f, c, d, a[g + 7], 14, 1735328473), d = j(d, e, f, c, a[g + 12], 20, -1926607734), c = k(c, d, e, f, a[g + 5], 4, -378558), f = k(f, c, d, e, a[g + 8], 11, -2022574463), e = k(e, f, c, d, a[g + 11], 16, 1839030562), d = k(d, e, f, c, a[g + 14], 23, -35309556), c = k(c, d, e, f, a[g + 1], 4, -1530992060), f = k(f, c, d, e, a[g + 4], 11, 1272893353), e = k(e, f, c, d, a[g + 7], 16, -155497632), d = k(d, e, f, c, a[g + 10], 23, -1094730640), c = k(c, d, e, f, a[g + 13], 4, 681279174), f = k(f, c, d, e, a[g + 0], 11, -358537222), e = k(e, f, c, d, a[g + 3], 16, -722521979), d = k(d, e, f, c, a[g + 6], 23, 76029189), c = k(c, d, e, f, a[g + 9], 4, -640364487), f = k(f, c, d, e, a[g + 12], 11, -421815835), e = k(e, f, c, d, a[g + 15], 16, 530742520), d = k(d, e, f, c, a[g + 2], 23, -995338651), c = l(c, d, e, f, a[g + 0], 6, -198630844), f = l(f, c, d, e, a[g + 7], 10, 1126891415), e = l(e, f, c, d, a[g + 14], 15, -1416354905), d = l(d, e, f, c, a[g + 5], 21, -57434055), c = l(c, d, e, f, a[g + 12], 6, 1700485571), f = l(f, c, d, e, a[g + 3], 10, -1894986606), e = l(e, f, c, d, a[g + 10], 15, -1051523), d = l(d, e, f, c, a[g + 1], 21, -2054922799), c = l(c, d, e, f, a[g + 8], 6, 1873313359), f = l(f, c, d, e, a[g + 15], 10, -30611744), e = l(e, f, c, d, a[g + 6], 15, -1560198380), d = l(d, e, f, c, a[g + 13], 21, 1309151649), c = l(c, d, e, f, a[g + 4], 6, -145523070), f = l(f, c, d, e, a[g + 11], 10, -1120210379), e = l(e, f, c, d, a[g + 2], 15, 718787259), d = l(d, e, f, c, a[g + 9], 21, -343485551), c = m(c, h), d = m(d, n), e = m(e, o), f = m(f, p)
			}
			return Array(c, d, e, f)
		}
		function h(a, b, c, d, e, f) {
			return m(n(m(m(b, a), m(d, f)), e), c)
		}
		function i(a, b, c, d, e, f, g) {
			return h(b & c | ~b & d, a, b, e, f, g)
		}
		function j(a, b, c, d, e, f, g) {
			return h(b & d | c & ~d, a, b, e, f, g)
		}
		function k(a, b, c, d, e, f, g) {
			return h(b ^ c ^ d, a, b, e, f, g)
		}
		function l(a, b, c, d, e, f, g) {
			return h(c ^ (b | ~d), a, b, e, f, g)
		}
		function m(a, b) {
			var c = (65535 & a) + (65535 & b),
				d = (a >> 16) + (b >> 16) + (c >> 16);
			return d << 16 | 65535 & c
		}
		function n(a, b) {
			return a << b | a >>> 32 - b
		}
		var o = 0;
		return a
	}(), b.base64Decode = function() {
		function a(a) {
			var b, d, e, f, g, h, i;
			for (h = a.length, g = 0, i = ""; h > g;) {
				do b = c[255 & a.charCodeAt(g++)];
				while (h > g && -1 == b);
				if (-1 == b) break;
				do d = c[255 & a.charCodeAt(g++)];
				while (h > g && -1 == d);
				if (-1 == d) break;
				i += String.fromCharCode(b << 2 | (48 & d) >> 4);
				do {
					if (e = 255 & a.charCodeAt(g++), 61 == e) return i;
					e = c[e]
				} while (h > g && -1 == e);
				if (-1 == e) break;
				i += String.fromCharCode((15 & d) << 4 | (60 & e) >> 2);
				do {
					if (f = 255 & a.charCodeAt(g++), 61 == f) return i;
					f = c[f]
				} while (h > g && -1 == f);
				if (-1 == f) break;
				i += String.fromCharCode((3 & e) << 6 | f)
			}
			return i
		}
		function b(a) {
			var b, c, d, e, f, g;
			for (b = "", d = a.length, c = 0; d > c;) switch (e = a.charCodeAt(c++), e >> 4) {
			case 0:
			case 1:
			case 2:
			case 3:
			case 4:
			case 5:
			case 6:
			case 7:
				b += a.charAt(c - 1);
				break;
			case 12:
			case 13:
				f = a.charCodeAt(c++), b += String.fromCharCode((31 & e) << 6 | 63 & f);
				break;
			case 14:
				f = a.charCodeAt(c++), g = a.charCodeAt(c++), b += String.fromCharCode((15 & e) << 12 | (63 & f) << 6 | (63 & g) << 0)
			}
			return b
		}
		var c = new Array(-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1, -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1);
		return function(c) {
			return b(a(c))
		}
	}(), b.Class = function() {
		function a() {}
		var b = !1,
			c = /xyz/.test(function() {}) ? /\bbase\b/ : /.*/;
		return a.extend = function(a, d) {
			var e = this.prototype;
			b = !0;
			var f = new this;
			b = !1;
			for (var g in a) f[g] = "function" == typeof a[g] && "function" == typeof e[g] && c.test(a[g]) ?
			function(a, b) {
				return function() {
					var c = this.base;
					this.base = e[a];
					var d = b.apply(this, arguments);
					return this.base = c, d
				}
			}(g, a[g]) : a[g];
			var h = d ||
			function() {
				!b && this.init && this.init.apply(this, arguments)
			};
			return h.prototype = f, h.prototype.constructor = h, h.extend = arguments.callee, h
		}, a
	}();
	var d = !0,
		e = "_17173ppinfocrosscookie",
		f = b.Class.extend({
			init: function(a) {
				if (!d) throw new Error("core只允许实例化一次");
				d = !1, this.events = {
					ready: [],
					loginSuccess: [],
					logoutSuccess: []
				}, this._initing(a), this._inited()
			},
			_initing: function(a) {
				var c = Passport.ENUM.CROSSDOMAINACTION,
					d = this;
				this.setData("status", Passport.ENUM.STATUS.initing), this.option = b.extend({}, Passport.Core.defaultOption, a), this.option.domain = this.option.domain ? this.option.domain : this.getDomain(), this.option.appid = this.option.appid ? this.option.appid : this.getAppid(), this.setData("id", b.guid()), this.username = "", this.password = "", this.cookie = 0, this.parseCookie(), this.isLogined && 2 == b.getCookie(c.login + e) ? b.waitForBody(function() {
					d.allCrossDomain(Passport.ENUM.CROSSDOMAINACTION.login)
				}) : 2 == b.getCookie(c.logout + e) && b.waitForBody(function() {
					d.allCrossDomain(Passport.ENUM.CROSSDOMAINACTION.logout)
				})
			},
			fireEvent: function(a, b, c) {
				for (var d = this.events[a] || [], e = d.length, f = 0; e > f; f++)(!c || c && !d[f].beenFired) && (d[f].call(this, b), d[f].beenFired = !0)
			},
			on: function(a, b, c) {
				this.events[a] = this.events[a] || [], !! c && (b._cantOff = !0), this.events[a].push(b)
			},
			off: function(a, c) {
				var d, e = this.events[a];
				if (e) if (c) {
					for (var f = 0, g = e.length; g > f; f++) if (!c._cantOff && e[f] === c) {
						d = f;
						break
					}
					this.events[a] = b.ArrDel(this.events[a], d)
				} else for (var f = 0, g = e.length; g > f; f++) e[f]._cantOff || (this.events[a] = b.ArrDel(this.events[a], f))
			},
			_inited: function() {
				this.setData("status", Passport.ENUM.STATUS.inited)
			},
			setData: function(a, c) {
				b.setData(this, a, c), this._onSetData(a, c)
			},
			_onSetData: function() {},
			getData: function(a) {
				return b.getData(this, a)
			},
			gotoHref: function(a) {
				window.location = a
			},
			getAppid: function() {
				return "10086"
			},
			getDomain: function() {
				var a;
				a = document.domain.split(".");
				var b = a.length;
				return 2 >= b ? document.domain : a[b - 2] + "." + a[b - 1]
			},
			allCrossDomain: function(a) {
				var d = this.loginMsg = this.option.protocol + "://" + this.option.crossDomainUrl + "?do=" + a + "&domain=" + this.option.domain,
					f = c('<iframe src="' + d + '" width="0" height="0" style="width:0;height:0;"></iframe>'),
					g = this;
				f.element.attachEvent ? f.element.attachEvent("onload", function() {
					g._onCrossDomained.call(g, a)
				}) : f.element.onload = function() {
					g._onCrossDomained.call(g, a)
				}, b.setCookie(a + e, 2, 432e5, this.option.domain), b.getRcycleEl().appendChild(f.element)
			},
			_onCrossDomained: function(a) {
				b.setCookie(a + e, 1, 432e5, this.option.domain), this.option.onCrossDomained && this.option.onCrossDomained.call(this)
			},
			login: function(a) {
				var c = this,
					d = Passport.ENUM.LOGINACTIONRESULT;
				if (a = b.extend({}, {
					domain: c.option.domain,
					appid: c.option.appid
				}, a), this.username = b.trim(a.username), this.password = b.trim(a.password), this.validcode = a.validcode, this.validcodeHash = a.validcodeHash, this._loginStart.call(this, a)) {
					this.setData("status", Passport.ENUM.STATUS.logining), this.fireEvent("loginStart");
					var e = Passport.Core.SERVERVERSION;
					this.option.client && "web" != this.option.client ? b.jsonpGet(c.option.protocol + "://" + c.option.tokenUrl, {
						v: e,
						username: encodeURIComponent(a.username),
						password: b.hexMd5(a.password),
						validcode: a.validcode,
						rememberme: void 0 === a.cookie ? c.option.cookie : a.cookie
					}, function(a) {
						if (c._logined.call(c, a), a.status == d.success) {
							var b = a.data,
								e = "";
							for (var f in b) e += f + "=" + b[f] + "&";
							c.setData("token", e), c._loginSuccess.call(c, a)
						} else c._loginFailure.call(c, a)
					}) : b.jsonpGet(c.option.protocol + "://" + c.option.loginUrl, {
						v: e,
						username: encodeURIComponent(a.username),
						password: b.hexMd5(a.password),
						validcode: a.validcode,
						domain: a.domain,
						appid: a.appid,
						persistentcookie: void 0 === a.cookie ? c.option.cookie : a.cookie
					}, function(a) {
						c._logined.call(c, a), a.status == d.success ? (c.parseCookie(), c.allCrossDomain(Passport.ENUM.CROSSDOMAINACTION.login), c._loginSuccess.call(c, a)) : c._loginFailure.call(c, a)
					}), c._checkLoginTimeout()
				}
			},
			clearTimeout: function() {
				clearTimeout(this.loginTimer), clearTimeout(this.logoutTimer)
			},
			loginTimer: null,
			validateLoginInfo: function() {
				var a;
				for (var b in Passport.VALIDATES) if (a = Passport.VALIDATES[b].call(this), !a.status) return this._loginFailure(a), a;
				return {
					status: !0,
					msg: "成功"
				}
			},
			_checkLoginTimeout: function() {
				var a = this,
					b = Passport.ENUM.LOGINACTIONRESULT;
				a.clearTimeout(), a.loginTimer = setTimeout(function() {
					a.status !== Passport.ENUM.STATUS.logined && (a.status = Passport.ENUM.STATUS.logined, a._loginFailure.call(a, {
						status: b.timeout,
						msg: "登录超时"
					}))
				}, a.option.timeout)
			},
			_loginStart: function() {
				return this.validateLoginInfo().status
			},
			_logined: function() {
				this.clearTimeout(), this.setData("status", Passport.ENUM.STATUS.logined)
			},
			getLastAccount: function() {
				var a = b.getCookie("lastdomain17173"),
					c = "",
					d = a.split("|")[1];
				return d && (c = b.base64Decode(decodeURIComponent(d)).split("|")[0]), c
			},
			parseCookie: function() {
				var a, c, d, e, f, g, h, i = b.getCookie("ppinf17173");
				if (this.setData("cookieUserInfo", {}), i && ~i.indexOf("|")) {
					for (a = unescape(i).split("|"), g = a[3].replace(/-/g, "+"), g = g.replace(/_/g, "/"), h = g.length, g += "====".substr(h % 4), c = b.base64Decode(g), d = c.split("|"); d.length;) e = d.shift(), f = e.split(":"), 2 === f.length && this.setData("cookieUserInfo." + decodeURIComponent(f[0]), decodeURIComponent(f[1]));
					this.setData("isLogined", !0)
				} else this.setData("isLogined", !1)
			},
			_loginSuccess: function(a) {
				this.setData("username", ""), this.setData("password", ""), this.option.showwarn && b.setCookie("pprt_showloginwarning", 1), this.fireEvent("loginSuccess", a), this.option.loginRedirectUrl && this.gotoHref(this.option.loginRedirectUrl)
			},
			_loginFailure: function(a) {
				this.fireEvent("loginFailure", a)
			},
			logout: function(a, c) {
				a && b.preventDefaultEvent(a);
				var d = this,
					e = Passport.ENUM.LOGOUTACTIONRESULT;
				c = c || {}, this._logoutStart() && (this.setData("status", Passport.ENUM.STATUS.logouting), this.fireEvent("logoutStart"), b.jsonpGet(d.option.protocol + "://" + d.option.logoutUrl, {
					appid: c.appid || d.option.appid,
					domain: c.domain || d.option.domain
				}, function(a) {
					d._logouted.call(d, a), a.status == e.success ? (d.allCrossDomain(Passport.ENUM.CROSSDOMAINACTION.logout), d._logoutSuccess.call(d, a)) : d._logoutFailure.call(d, a)
				}), d._checkLogoutTimeout())
			},
			logoutTimer: null,
			_checkLogoutTimeout: function() {
				var a = this,
					b = Passport.ENUM.LOGOUTACTIONRESULT;
				a.clearTimeout(), a.logoutTimer = setTimeout(function() {
					a.status !== Passport.ENUM.STATUS.logouted && (a.status = Passport.ENUM.STATUS.logouted, a._logoutFailure.call(a, {
						status: b.timeout,
						msg: ""
					}))
				}, a.option.timeout)
			},
			_logoutStart: function() {
				return !0
			},
			_logouted: function() {
				this.clearTimeout(), this.setData("status", Passport.ENUM.STATUS.logouted)
			},
			_logoutSuccess: function(a) {
				this.cookieUserInfo = {}, this.setData("isLogined", !1), this.fireEvent("logoutSuccess", a), this.option.logoutRedirectUrl && this.gotoHref(this.option.logoutRedirectUrl)
			},
			_logoutFailure: function(a) {
				this.fireEvent("logoutFailure", a)
			},
			receiveMsg: function(a) {
				var b = this;
				if (Passport.test) return null;
				if ("openPlatformBind" == a) {
					var c;
					b._logined.call(b), b.parseCookie(), b.isLogined ? (c = {
						status: !0,
						msg: "登陆成功"
					}, b.allCrossDomain(Passport.ENUM.CROSSDOMAINACTION.login), b._loginSuccess.call(b, c), Passport._openPlatformCrossDomain = !0) : (c = {
						status: !1,
						msg: "登录失败"
					}, b._loginFailure.call(b, c))
				} else if ("webClientLogin" == a) {
					var c;
					b._logined.call(b);
					var d = function() {
							Passport.data("username") ? (c = {
								status: !0,
								msg: "登陆成功"
							}, b._loginSuccess.call(b, c)) : setTimeout(d, 600)
						};
					d()
				} else if ("webClientLogout" == a) window.location.reload();
				else {
					var c = JSON.parse(a);
					b.fireEvent(c.ev, c)
				}
				return !1
			},
			data: function(a) {
				return this.cookieUserInfo && this.cookieUserInfo[a] ? this.cookieUserInfo[a] : ""
			},
			bindOpenPlatform: function(a, b) {
				document.domain = this.option.domain, b = b || "开放平台";
				var c = "https://" + this.option.passportdomain + "/partner/authorize/name/" + a + "/domain/" + this.option.domain + "?referrer=" + encodeURIComponent(window.location) + "&client=" + this.option.client + "&callback=" + encodeURIComponent(this.option.callback);
				this.option.client && "web" != this.option.client ? window.location.href = c : window.open(c, b, "location=yes,left=200,top=100,width=750,height=500,resizable=yes,scrollbars=yes,scrollbars=1")
			},
			destory: function() {}
		});
	window.Passport = b.Class.extend({
		init: function() {}
	}), Passport.util = b, Passport.Core = f, Passport.getUserFace = function(a, c) {
		for (var d, e = "https://s.i.17173cdn.com", f = "/avatar/YWxqaGBf", g = "", h = b.hexMd5(a), i = 0; 3 > i; i++) g += "/" + h.substr(2 * i, 2);
		return g += "/" + a, d = "/" + (c ? "normal.jpg" : "small.jpg"), e + f + g + d
	}, Passport.getUserPortrait = function(a, b) {
		if (a.indexOf("@") > -1) {
			a = a.toLowerCase().split("@17173.com")[0];
			for (var c = "http://", d = a.split("@17173.com")[0] + "/face.jpg", e = 0, f = 0; f < d.length; f++) e += d.charCodeAt(f);
			return e = Math.round(e % 3), 0 === e && (e = 3), c += "ue" + e + ".17173.itc.cn", c += "/imgface", c += "/" + a.charAt(0) + "/" + a.charAt(1) + "/" + a.charAt(2), c += "/" + a, c += "/" + (b ? "face.jpg" : "faces.jpg")
		}
		return Passport.getUserFace(a, b)
	}, Passport.VALIDATES = {
		passworLength: function() {
			return this.password.length > 20 ? {
				status: !1,
				msg: "密码长度必须小于20位"
			} : {
				status: !0,
				msg: ""
			}
		},
		fieldEmpty: function() {
			return b.trim(this.password) && b.trim(this.username) ? {
				status: !0,
				msg: ""
			} : {
				status: !1,
				msg: "通行证和密码不能为空"
			}
		},
		usernameFormat: function() {
			return /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[ -퟿豈-﷏ﷰ-￯])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[ -퟿豈-﷏ﷰ-￯])+)*)|((")(((( |	)*(
))?( |	)+)?(([--]|!|[#-[]|[]-~]|[ -퟿豈-﷏ﷰ-￯])|(\\([-	
-]|[ -퟿豈-﷏ﷰ-￯]))))*((( |	)*(
))?( |	)+)?(")))@((([a-z]|\d|[ -퟿豈-﷏ﷰ-￯])|(([a-z]|\d|[ -퟿豈-﷏ﷰ-￯])([a-z]|\d|-|\.|_|~|[ -퟿豈-﷏ﷰ-￯])*([a-z]|\d|[ -퟿豈-﷏ﷰ-￯])))\.)+(([a-z]|[ -퟿豈-﷏ﷰ-￯])|(([a-z]|[ -퟿豈-﷏ﷰ-￯])([a-z]|\d|-|\.|_|~|[ -퟿豈-﷏ﷰ-￯])*([a-z]|[ -퟿豈-﷏ﷰ-￯])))$/i.test(this.username) || /^1[3|4|5|8][0-9]\d{8}$/.test(this.username) ? {
				status: !0,
				msg: ""
			} : {
				status: !1,
				msg: "通行证必须为手机号/ 邮箱格式"
			}
		},
		accountIsSupported: function() {
			var a, b = ["17173.com", "sina.com", "163.com", "qq.com", "vip.qq.com", "sohu.com", "126.com", "gmail.com", "sina.cn", "hotmail.com", "vip.sina.com", "139.com"];
			for (a = 0; a < b.length; a++) {
				var c = new RegExp(".+@" + b[a] + "$", "gi");
				if (/^1[3|4|5|8][0-9]\d{4,8}$/.test(this.username) || this.username && c.test(this.username)) return {
					status: !0,
					msg: ""
				}
			}
			return {
				status: !1,
				msg: "暂不支持此域，请尝试一键登录"
			}
		}
	}, Passport.Core.VERSION = "0.3.6.0", Passport.Core.SERVERVERSION = 2, Passport.Core.defaultOption = {
		cookie: 0,
		protocol: "https",
		passportdomain: "passport.17173.com",
		loginUrl: "passport.17173.com/sso/login",
		tokenUrl: "passport.17173.com/sso/gettoken",
		logoutUrl: "passport.17173.com/sso/logout",
		crossDomainUrl: "passport.17173.com/sso/allcrossdomain",
		domain: null,
		appid: null,
		timeout: 15e3,
		loginRedirectUrl: "",
		logoutRedirectUrl: "",
		client: "",
		callback: "",
		css: "https://s.ue.17173cdn.com/a/lib/passport-2.0/default/style.css",
		showwarn: !0,
		domainList: ["17173.com", "sina.com", "163.com", "qq.com", "vip.qq.com", "sohu.com", "126.com", "gmail.com", "sina.cn", "hotmail.com", "vip.sina.com", "139.com"]
	}, Passport.instances = [], Passport.ENUM = {
		STATUS: {
			initing: 1,
			inited: 2,
			logining: 3,
			logined: 4,
			logouting: 5,
			logouted: 6
		},
		CROSSDOMAINACTION: {
			login: "login",
			logout: "logout"
		},
		LOGINACTIONRESULT: {
			success: 1,
			paramError: 2,
			userNameFormatError: 3,
			serverError: 4,
			passwordErrorTimes: 5,
			userNameUnfind: 6,
			userNameOrPassowrdWrong: 7,
			AccountUnActivation: 8,
			userNameEmpty: 9,
			passwordEmpty: 10,
			timeout: 11
		},
		LOGOUTACTIONRESULT: {
			success: 1,
			paramError: 2,
			failure: 3,
			timeout: 4
		}
	}
}(), function() {
	var l = function() {},
		util = Passport.util,
		elements, $E = util.$;
	Passport.defaultOption = {};
	var m = new Passport.Core(Passport.defaultOption);
	Passport.UIBase = util.Class.extend({
		init: function(a) {
			a = this.option = util.extend({}, a), this._initing(a), this._inited()
		},
		_initing: function(a) {
			if (a.element && (this.element = $E(a.element).element), this.ui4 = {
				_css: l,
				_html: l,
				_initing: l,
				_inited: l,
				_show: l,
				_hide: l,
				_loginStart: l,
				_loginSuccess: l,
				_loginFailure: l,
				_logoutStart: l,
				_logoutSuccess: l,
				_logoutFailure: l
			}, this.ui4._css = Passport.initCss, a.ui) {
				var b = Passport.UI[a.ui];
				if (!b) throw 'Passport UI "' + a.ui + '" not installed';
				window._hasUI = !0, util.extend(this.ui4, b)
			}
			for (this.ui4._initing.call(this), this.element.id = "com-pprt", a.theme && util.addClass(this.element, a.theme), elements = []; this.element.firstChild;) {
				var c = this.element.firstChild;
				elements.push(c), this.element.removeChild(c)
			}
			this.initContainer()
		},
		initContainer: function() {
			this.element.innerHTML = '<div style="display: none;"></div><div style="width: 100%;"></div>', this.cElement = this.element.childNodes[1], this.ui4._css.call(this, elements), this.ui4._html.call(this, elements);
			for (var a; a = elements.shift();) this.cElement.appendChild(a);
			for (var b = "", c = 0; c < m.option.domainList.length; c++) b += '<li class="pprt-select-17173" data-domain="' + m.option.domainList[c] + '"></li>';
			var d = '<div class="ue-passport-select-wrap-in"><ul class="domain-list">' + b + "</ul></div>";
			if (this.ppSelectWrapElement = $E(".ue-passport-select-wrap", this.element), !this.ppSelectWrapElement.element) {
				var e = document.createElement("div");
				e.className = "ue-passport-select-wrap", this.cElement.appendChild(e), this.ppSelectWrapElement = util.$(e)
			}
			this.ppSelectWrapElement.element.innerHTML = d
		},
		_inited: function() {
			var a = this.element,
				b = this;
			this.formElement = $E(".pprt-form-box", a), this.form = $E(".pprt-form", a), this.formElement.element || (this.formElement = this.form), this.waitElement = $E(".wait-box", a).hide(), this.infoElement = $E(".info-box", a).hide(), this.loginElement = $E(".login-btn", a), this.logoutElement = $E(".logout-btn", a), $E(".register-url", this.element).attr("href", Passport.URL_REGISTER), $E(".recover-url", this.element).attr("href", Passport.URL_RECOVER), $E(".help-url", this.element).attr("href", Passport.URL_HELP), this.formElements = {
				loginErr: $E(".login-err", this.element)
			}, this.waitElements = {
				loggingIn: $E(".logging-in", this.element),
				loggingOut: $E(".logging-out", this.element)
			}, this.infoElements = {
				logoutErr: $E(".logout-err", this.element),
				username: $E(".username", this.element),
				nickname: $E(".nickname", this.element),
				portrait: $E(".portrait", this.element),
				userlevel: $E(".userlevel", this.element)
			}, this.validcodeContainer = $E(".ue-passport-validcode-container", this.element), this.form.attr("autocomplete", "off"), this.form.on("submit", this.login, this), this.loginElement.on("click", this.login, this), this.logoutElement.on("click", this.logout, this), this.initOpenPlatformTool(), this.currentElement = this.formElement, this.currentElement.show();
			for (var c = this.cElement.getElementsByTagName("input"), d = 0; d < c.length; d++)"email" == c[d].name && (this.emailInput = c[d]), "password" == c[d].name && (this.passwdInput = c[d]), "persistentcookie" == c[d].name && (this.pcInput = c[d]);
			this.validcodeContainer.element.innerHTML = '<div class="ui-passport-input-txt"><input type="text" name="validcode" class="ue-passport-validcode-input" placeholder="验证码"/></div><a href="javascript:;" class="ue-validcode-change js-validcode-change" title="刷新验证码"><img class="ue-passport-validcode-img"/><img src="https://s.ue.17173cdn.com/a/passport/v1/images/refresh-tit.png"></a>', this.validcodeInput = $E(".ue-passport-validcode-input", this.validcodeContainer), this.initSelector(), this.loginMsg = this.$getElementByClassName("error"), this.ui4._inited.call(this), this.bindCoreEvents(), Passport.isLoggedIn() ? b._loginSuccess() : (b._logoutSuccess(), this.emailInput && (this.emailInput.value = m.getLastAccount()))
		},
		initOpenPlatformTool: function() {
			var a = this,
				b = a.element;
			this.openPlatformCyou = $E(".open-platform-cyou", b), this.openPlatformSohu = $E(".open-platform-sohu", b), this.openPlatformww37 = $E(".open-platform-ww37", b), this.openPlatformQQ = $E(".open-platform-qq", b), this.openPlatformWebi = $E(".open-platform-weibo", b), this.openPlatformBaidu = $E(".open-platform-baidu", b), this.openPlatformRenren = $E(".open-platform-renren", b), this.openPlatformDouban = $E(".open-platform-douban", b), a.openPlatformCyou.element && this.openPlatformCyou.on("click", function() {
				var b = a.openPlatformCyou.element.title || "畅游开放平台";
				m.bindOpenPlatform(Passport.OPEN_PLATFORMS.cyou, b)
			}, this), a.openPlatformSohu.element && this.openPlatformSohu.on("click", function() {
				var b = a.openPlatformSohu.element.title || "搜狐开放平台";
				m.bindOpenPlatform(Passport.OPEN_PLATFORMS.sohu, b)
			}, this), this.openPlatformww37.element && this.openPlatformww37.on("click", function() {
				var b = a.openPlatformww37.element.title || "搜狐开放平台";
				m.bindOpenPlatform(Passport.OPEN_PLATFORMS.ww37, b)
			}, this), this.openPlatformQQ.element && this.openPlatformQQ.on("click", function() {
				var b = a.openPlatformQQ.element.title || "QQ开放平台";
				m.bindOpenPlatform(Passport.OPEN_PLATFORMS.qq, b)
			}, this), this.openPlatformWebi.element && this.openPlatformWebi.on("click", function() {
				var b = a.openPlatformWebi.element.title || "新浪微博开放平台";
				m.bindOpenPlatform(Passport.OPEN_PLATFORMS.weibo, b)
			}, this), this.openPlatformBaidu.element && this.openPlatformBaidu.on("click", function() {
				var b = a.openPlatformBaidu.element.title || "百度开放平台";
				m.bindOpenPlatform(Passport.OPEN_PLATFORMS.baidu, b)
			}, this), this.openPlatformRenren.element && this.openPlatformRenren.on("click", function() {
				var b = a.openPlatformRenren.element.title || "人人开放平台";
				m.bindOpenPlatform(Passport.OPEN_PLATFORMS.renren, b)
			}, this), this.openPlatformDouban.element && this.openPlatformDouban.on("click", function() {
				var b = a.openPlatformDouban.element.title || "豆瓣开放平台";
				m.bindOpenPlatform(Passport.OPEN_PLATFORMS.douban, b)
			}, this)
		},
		bindCoreEvents: function() {
			var a = this,
				b = Passport.EVENTS;
			m.on(b.loginStart, function() {
				a._loginStart()
			}, !0), m.on(b.loginSuccess, function() {
				a._loginSuccess()
			}, !0), m.on(b.loginFailure, function(b) {
				a._loginFailure(b)
			}, !0), m.on(b.logoutStart, function() {
				a._logoutStart()
			}, !0), m.on(b.logoutFailure, function(b) {
				a._logoutFailure(b)
			}, !0), m.on(b.logoutSuccess, function() {
				a._logoutSuccess()
			}, !0)
		},
		initSelector: function() {
			var a = this;
			if (this.ppSelectWrapElement.element && (this.ppSelectElement = $E(".pprt-select-17173", this.element), this.ppSelectIndex = 0, this.ppSelectItems = $E(".domain-list", this.element).element.children, this.ppSelectLength = this.ppSelectItems.length, this.emailInput && this.ppSelectWrapElement.element)) {
				var b = function() {
						a.ppSelectWrapElement.element.style.width = a.emailInput.offsetWidth + "px"
					};
				b();
				var c = $E(".js-validcode-change", a.validcodeContainer);
				util.on(c.element, "click", function(b) {
					util.preventDefaultEvent(b), a._changeValidcode()
				}), util.on(window, "resize", b);
				var d = function(b) {
						var c = b.target || b.srcElement;
						"li" === c.tagName.toLowerCase() && (util.removeClass($E(".ue-passport-selected", $E(".domain-list", a.element)).element, "ue-passport-selected"), util.addClass(c, "ue-passport-selected"), a.ppSelectElement.element = c)
					};
				util.on(this.ppSelectWrapElement.element, "mouseover", d), util.on(this.ppSelectWrapElement.element, "touchstart", d), util.on(this.emailInput, "keydown", function(b) {
					38 === b.keyCode ? (util.preventDefaultEvent(b), a.ppSelectIndex -= 1) : 40 === b.keyCode && (util.preventDefaultEvent(b), a.ppSelectIndex += 1)
				}), util.on(this.emailInput, "keypress", function(b) {
					13 === b.keyCode && (util.preventDefaultEvent(b), a.passwdInput.focus())
				}), util.on(this.emailInput, "keyup", function(b) {
					var c = a.ppSelectItems,
						d = a.ppSelectIndex,
						e = a.ppSelectLength,
						f = (d % e + e) % e;
					if (a.emailInput.value.indexOf("@") > -1) {
						for (var g = e - 1; g >= 0; g--) {
							var h = c[g],
								i = h.getAttribute("data-domain");
							h.innerHTML = util.trim(a.emailInput.value.split("@")[0] || "").replace(/(\d)/g, "<span>$1</span>") + "<span>@</span>" + i, util.removeClass(h, "ue-passport-selected"), a.emailInput.value.split("@")[1] && 0 !== i.indexOf(a.emailInput.value.split("@")[1]) ? (h.style.display = "none", e -= 1) : (h.style.display = "block", 38 !== b.keyCode && 40 !== b.keyCode && (f = g))
						}
						for (; e && c[f] && "none" === c[f].style.display;) 38 === b.keyCode ? (0 === f && (f = a.ppSelectLength), f--) : 40 === b.keyCode && (f === a.ppSelectLength - 1 && (f = -1), f++);
						util.addClass(c[f], "ue-passport-selected"), a.ppSelectIndex = f, a.ppSelectElement.element = c[f], e && util.trim(a.emailInput.value) ? a.ppSelectWrapElement.show() : a.ppSelectWrapElement.hide()
					} else a.ppSelectWrapElement.hide()
				}), util.on(this.emailInput, "focus", function() {
					a.emailInput.oldValue = a.emailInput.value
				}), util.on(this.emailInput, "blur", function() {
					if (a.emailInput.value && "none" != util.getCss(a.ppSelectWrapElement.element, "display") && a.ppSelectElement.element.innerHTML) {
						var b = a.ppSelectElement.element.innerHTML.replace(/<span>(\d|@)<\/span>/gi, "$1");
						setTimeout(function() {
							a.emailInput.value = b
						}, 0)
					}
					a.ppSelectWrapElement.hide(), a.emailInput.value && util.jsonpGet("https://passport.17173.com/sso/logincheck", {
						username: encodeURI(a.emailInput.value)
					}, function(b) {
						b.data.validcode ? a.emailInput.oldValue !== a.emailInput.value && a._changeValidcode() : a._hideValidcode()
					})
				}), util.on(document, "click", function() {
					a.ppSelectWrapElement.hide()
				})
			}
		},
		$getElementByClassName: function(a) {
			for (var b = this.cElement.getElementsByTagName("div"), c = 0; c < b.length; c++) if (0 == b[c].className.lastIndexOf(a)) return b[c]
		},
		_syncElementHeight: function() {
			var a = this.formElement.element,
				b = "" + a.style.position;
			a.style.position = "absolute", this.formElement.show();
			var c = a.clientHeight + "px";
			this.formElement.hide(), a.style.position = b, this.infoElement.element && (this.infoElement.element.style.height = c), this.waitElement.element && (this.waitElement.element.style.height = c)
		},
		_changeValidcode: function() {
			var a = this,
				b = this.validcodeContainer,
				c = $E(".ue-passport-validcode-img", b);
			util.jsonpGet("https://passport.17173.com/captcha", {
				refresh: 1,
				absoluteurl: 1
			}, function(b) {
				c.element.src = b.url;
				var d = a.validcodeInput.element;
				d && (d.value = "", d.hash = b.hash1, a.passwdInput.value && d.focus())
			}), b.show()
		},
		_hideValidcode: function() {
			this.validcodeContainer.hide()
		},
		login: function(a) {
			a && util.preventDefaultEvent(a), this.username = this.emailInput.value, this.password = this.passwdInput.value, this.validcode = this.validcodeInput.element.value, this.validcodeHash = this.validcodeInput.element.hash;
			var b = 0;
			this.pcInput && 1 == this.pcInput.checked && (b = 1), m.login({
				username: this.username,
				password: this.password,
				validcode: this.validcode,
				validcodeHash: this.validcodeHash,
				cookie: b
			})
		},
		_loginStart: function() {
			return this.ui4._loginStart.call(this), this._syncElementHeight(), this.currentElement.hide(), this.formElement.hide(), this.loginElement.hide(), this.waitElements.loggingIn.show(), this.waitElements.loggingOut.hide(), this.currentElement = this.waitElement, this.currentElement.show(), !0
		},
		_loginFailure: function(a) {
			this.showError(a), this.currentElement.hide(), this.loginElement.show(), this.currentElement = this.formElement, this.currentElement.show(), 7 === a.status && this.passwdInput && (this.passwdInput.value = ""), (this.validcodeContainer.element && "block" === this.validcodeContainer.element.style.display || 10 === a.status) && this.password && this._changeValidcode(), this.ui4._loginFailure.call(this, a)
		},
		_loginSuccess: function() {
			var a = this;
			this._syncElementHeight(), this.currentElement.hide(), this.loginElement.hide(), this.logoutElement.show();
			var b = m.data("username");
			this.infoElement.element && (this.infoElements.logoutErr.hide(), this.infoElements.username.html(b), this.infoElements.nickname.html(m.data("nickname")), this.infoElements.portrait.html('<img src="' + Passport.getUserPortrait(m.data("uid"), 0) + '" width="50" height="50" alt="' + b + '" />'), this.infoElements.userlevel.element && Passport.getUserLevel(b, function(b) {
				if (b) {
					var c = "http://i4.17173.itc.cn/2009/lv2/" + b + ".gif";
					a.infoElements.userlevel.element.innerHTML = '<img src="' + c + '" />'
				}
			})), this.currentElement = this.infoElement, this.currentElement.show(), a.ui4._loginSuccess.call(a)
		},
		logout: function(a) {
			a && util.preventDefaultEvent(a), this.ui4._logoutStart.call(this), m.logout()
		},
		_logoutStart: function() {
			return this._syncElementHeight(), this.currentElement.hide(), this.logoutElement.hide(), this.waitElements.loggingIn.hide(), this.waitElements.loggingOut.show(), this.currentElement = this.waitElement, this.currentElement.show(), !0
		},
		_logoutFailure: function(a) {
			this.ui4._logoutFailure.call(this, a)
		},
		_logoutSuccess: function() {
			this.emailInput && (this.emailInput.value = ""), this.passwdInput && (this.passwdInput.value = ""), this._syncElementHeight(), this.formElements.loginErr.hide(), this.currentElement.hide(), this.logoutElement.hide(), this.loginElement.show(), this.infoElement.element && (this.infoElements.username.html(""), this.infoElements.nickname.html(""), this.infoElements.portrait.html("")), this.currentElement = this.formElement, this.currentElement.show(), this.ui4._logoutSuccess.call(this)
		},
		showError: function(a) {
			this.formElements.loginErr.element ? (8 == a.status && (a.msg = '尚未激活邮箱,<a href="' + Passport.URL_ACTIVE + "?username=" + this.username + '" target="_blank">请点击进入激活</a>'), util.trim(a.msg) && this.formElements.loginErr.html(a.msg).show()) : alert(a.msg)
		},
		hideError: function() {
			this.formElements.loginErr.html("").hide()
		},
		show: function(a) {
			a = util.extend({}, {
				modal: !0
			}, a), $E(this.element).show(), this.waitElement && this.waitElement.hide(), this.modalEl && a.modal && $E(this.modalEl).show(), this.formElements.loginErr.show(), this.formElements.loginErr.hide(), this.emailInput && (this.emailInput.value = m.getLastAccount()), this.ui4._show.call(this, a), a.onHide && (this.option.onHide = a.onHide)
		},
		hide: function() {
			3 !== m.status && ($E(this.element).hide(), this.modalEl && $E(this.modalEl).hide(), this.ui4._hide.call(this), this.formElements.loginErr.show(), this.formElements.loginErr.hide(), this.option.onHide && this.option.onHide.call(this), this.option.onHide = null)
		},
		destory: function() {
			this.element.parentNode.removeChild(this.element), this.modalEl && this.modalEl.parentNode.removeChild(this.modalEl)
		}
	}), Passport.sendMessage = function(a, b) {
		m.receiveMsg(a, b)
	}, Passport.getLastAccount = function() {
		return m.getLastAccount()
	}, Passport.getCssUrl = function() {
		return m.option.css
	}, Passport.getDomain = function() {
		return m.option.domain
	}, Passport.initCss = function() {
		var a, b = "__PASSPORT_CSS__";
		if (window.__passportCssText__ = "#com-pprt div.ue-passport-select-wrap{display:none;background:#fff;font-family:Arial;margin:0;padding:0;position:absolute;z-index:2010;cursor:pointer;font-family:Arial,Helvetica,sans-serif;border:1px solid #fdd000;overflow:hidden}#com-pprt div.ue-passport-select-wrap-in{}#com-pprt .ue-passport-select-placeholder{padding:3px;font-size:100%}#com-pprt div.ue-passport-select-wrap ul .ue-passport-selected{background:#fdd000;color:#333}#com-pprt div.ue-passport-select-wrap ul{padding:1px}#com-pprt div.ue-passport-select-wrap ul li{padding:3px;font-size:100%;cursor:pointer;color:#888;overflow:hidden}#com-pprt .pprt-select-17173 span{background:transparent;cursor:pointer;color:#888}#com-pprt .safe-tip-box *{font-family:SimSun}#com-pprt .safe-tip-box{width:280px;font:400 12px/1.5 SimSun;background:url(https://s.ue.17173cdn.com/a/lib/passport-2.0/default/images/safe-tip-bg.jpg) no-repeat;border:1px solid #fcf3da;z-index:9999;position:fixed;right:20px;bottom:10px;_position:absolute;_top:expression(-110+((e=document.documentElement.scrollTop+document.documentElement.clientHeight)?e:(document.body.scrollTop+document.body.clientHeight))+'px');_left:expression(-320+((e=document.documentElement.scrollLeft+document.documentElement.clientWidth)?e:document.body.scrollLeft+document.body.clientWidth)+'px')}#com-pprt .safe-tip-box .hd{height:35px;padding:15px 10px 0;position:relative}#com-pprt .safe-tip-close{position:absolute;top:0;right:5px;font-size:14px;font-weight:700}#com-pprt .safe-tip-close a{color:#eeb844;text-decoration:none}#com-pprt .safe-tip-close a:hover{color:#e74b41;text-decoration:none}#com-pprt .abnor-log-hd .ico{display:inline-block;width:12px;height:12px;background:url(https://s.ue.17173cdn.com/a/lib/passport-2.0/default/images/safe-tip-ico.png) no-repeat;vertical-align:middle;margin-right:5px}#com-pprt .abnor-log-hd .c1{vertical-align:middle}#com-pprt .abnor-log-hd{color:#ff8400}#com-pprt .abnor-log-bd{color:red;vertical-align:middle}#com-pprt .safe-tip-box .bd{padding:10px;text-align:center;background:#fff}#com-pprt .safe-tip-box .bd .abnor-log-c{color:#08c;text-decoration:none}#com-pprt .safe-tip-box .bd .abnor-log-c:hover{text-decoration:underline}#com-pprt .ue-passport-validcode-container{display:none}", document.createStyleSheet) {
			for (var c = null, d = 0, e = document.styleSheets; d < e.length; d++) if (e[d].ID === b) {
				c = e[d];
				break
			}
			c || (c = document.createStyleSheet(""), c.ID = b, c.cssText = ""), a = function() {
				window.__passportCssText__ = window.__passportCssText__ || "", c.cssText += window.__passportCssText__
			}
		} else {
			var f = document.getElementById(b);
			if (!f) {
				f = document.createElement("style"), f.id = b, f.type = "text/css", f.textContent = "";
				var g = document.head || document.getElementsByTagName("head")[0] || document.documentElement;
				g.appendChild(f)
			}
			a = function() {
				window.__passportCssText__ = window.__passportCssText__ || "", f.textContent += window.__passportCssText__
			}
		}
		a()
	}, "object" != typeof JSON && (JSON = {}), function() {
		"use strict";

		function f(a) {
			return 10 > a ? "0" + a : a
		}
		function quote(a) {
			return escapable.lastIndex = 0, escapable.test(a) ? '"' + a.replace(escapable, function(a) {
				var b = meta[a];
				return "string" == typeof b ? b : "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4)
			}) + '"' : '"' + a + '"'
		}
		function str(a, b) {
			var c, d, e, f, g, h = gap,
				i = b[a];
			switch (i && "object" == typeof i && "function" == typeof i.toJSON && (i = i.toJSON(a)), "function" == typeof rep && (i = rep.call(b, a, i)), typeof i) {
			case "string":
				return quote(i);
			case "number":
				return isFinite(i) ? String(i) : "null";
			case "boolean":
			case "null":
				return String(i);
			case "object":
				if (!i) return "null";
				if (gap += indent, g = [], "[object Array]" === Object.prototype.toString.apply(i)) {
					for (f = i.length, c = 0; f > c; c += 1) g[c] = str(c, i) || "null";
					return e = 0 === g.length ? "[]" : gap ? "[\n" + gap + g.join(",\n" + gap) + "\n" + h + "]" : "[" + g.join(",") + "]", gap = h, e
				}
				if (rep && "object" == typeof rep) for (f = rep.length, c = 0; f > c; c += 1)"string" == typeof rep[c] && (d = rep[c], e = str(d, i), e && g.push(quote(d) + (gap ? ": " : ":") + e));
				else for (d in i) Object.prototype.hasOwnProperty.call(i, d) && (e = str(d, i), e && g.push(quote(d) + (gap ? ": " : ":") + e));
				return e = 0 === g.length ? "{}" : gap ? "{\n" + gap + g.join(",\n" + gap) + "\n" + h + "}" : "{" + g.join(",") + "}", gap = h, e
			}
		}
		"function" != typeof Date.prototype.toJSON && (Date.prototype.toJSON = function() {
			return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + f(this.getUTCMonth() + 1) + "-" + f(this.getUTCDate()) + "T" + f(this.getUTCHours()) + ":" + f(this.getUTCMinutes()) + ":" + f(this.getUTCSeconds()) + "Z" : null
		}, String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function() {
			return this.valueOf()
		});
		var k, escapable, gap, indent, meta, rep;
		"function" != typeof JSON.stringify && (escapable = /[\\\"--­؀-؄܏឴឵‌-‏ - ⁠-⁯﻿￰-￿]/g, meta = {
			"\b": "\\b",
			"": "\\t",
			"\n": "\\n",
			"\f": "\\f",
			"\r": "\\r",
			'"': '\\"',
			"\\": "\\\\"
		}, JSON.stringify = function(a, b, c) {
			var d;
			if (gap = "", indent = "", "number" == typeof c) for (d = 0; c > d; d += 1) indent += " ";
			else "string" == typeof c && (indent = c);
			if (rep = b, b && "function" != typeof b && ("object" != typeof b || "number" != typeof b.length)) throw new Error("JSON.stringify");
			return str("", {
				"": a
			})
		}), "function" != typeof JSON.parse && (k = /[­؀-؄܏឴឵‌-‏ - ⁠-⁯﻿￰-￿]/g, JSON.parse = function(f, g) {
			function walk(a, b) {
				var c, d, e = a[b];
				if (e && "object" == typeof e) for (c in e) Object.prototype.hasOwnProperty.call(e, c) && (d = walk(e, c), void 0 !== d ? e[c] = d : delete e[c]);
				return g.call(a, b, e)
			}
			var j;
			if (f = String(f), k.lastIndex = 0, k.test(f) && (f = f.replace(k, function(a) {
				return "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4)
			})), /^[\],:{}\s]*$/.test(f.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) return j = eval("(" + f + ")"), "function" == typeof g ? walk({
				"": j
			}, "") : j;
			throw new SyntaxError("JSON.parse")
		})
	}();
	var n = function() {
			function a(a, b) {
				var c = "";
				if (arguments.length < 2 ? c = "target error - target and name are both requied" : "object" != typeof a ? c = "target error - target itself must be window object" : "string" != typeof b && (c = "target error - target name must be string type"), c) throw new Error(c);
				this.target = a, this.name = b
			}
			function b(a) {
				this.targets = {}, this.name = a, this.listenFunc = [], this.initListen()
			}
			var c = "[passport]",
				d = "postMessage" in window;
			return a.prototype.send = d ?
			function(a) {
				this.target.postMessage(c + a, "*")
			} : function(a) {
				var b = window.navigator[c + this.name];
				if ("function" != typeof b) throw new Error("target callback function is not defined");
				b(c + a, window)
			}, b.prototype.addTarget = function(b, c) {
				var d = new a(b, c);
				this.targets[c] = d
			}, b.prototype.initListen = function() {
				var a = this,
					b = function(b) {
						"object" == typeof b && b.data && (b = b.data), b = b.slice(c.length);
						for (var d = 0; d < a.listenFunc.length; d++) a.listenFunc[d](b)
					};
				d ? "addEventListener" in document ? window.addEventListener("message", b, !1) : "attachEvent" in document && window.attachEvent("onmessage", b) : window.navigator[c + this.name] = b
			}, b.prototype.listen = function(a) {
				this.listenFunc.push(a)
			}, b.prototype.clear = function() {
				this.listenFunc = []
			}, b.prototype.send = function(a) {
				var b, c = this.targets;
				for (b in c) c.hasOwnProperty(b) && c[b].send(a)
			}, b
		}(),
		messenger;
	window.self === window.parent ? (messenger = new n("parent"), messenger.listen(function(a) {
		m.receiveMsg(a)
	})) : (messenger = new n("iframe"), messenger.addTarget(window.parent, "parent")), Passport.messenger = messenger, Passport.data = function(a) {
		var b, c, d, e, f, g, h, i = util.getCookie("ppinf17173");
		if (i && ~i.indexOf("|")) for (b = unescape(i).split("|"), g = b[3].replace(/-/g, "+"), g = g.replace(/_/g, "/"), h = g.length, g += "====".substr(h % 4), c = util.base64Decode(g), d = c.split("|"); d.length;) if (e = d.shift(), f = e.split(":"), 2 === f.length && decodeURIComponent(f[0]) == a) return decodeURIComponent(f[1]);
		return "token" === a ? m.token : ""
	};
	var o = function(a) {
			if (window.user_jifen && 1 == window.user_jifen.flag) {
				var b = window.user_jifen.jifen.split("|");
				a && a(b[1])
			} else a && a(null)
		};
	Passport.getUserLevel = function(a, b) {
		if (a) {
			var c = "http://exp.my.17173.com/get_jf.php?userid=" + a,
				d = document.createElement("script");
			d.type = "text/javascript", d.charset = "uft-8", d.src = c, d.addEventListener ? d.addEventListener("load", function() {
				o(b)
			}, !1) : d.attachEvent && d.attachEvent("onreadystatechange", function() {
				var a = window.event.srcElement;
				"loaded" == a.readyState && o(b)
			}), document.getElementsByTagName("head")[0].appendChild(d)
		}
	}, Passport.isLoggedIn = function() {
		return !!Passport.data("username")
	}, Passport.on = function(a, b) {
		m.on(a, b)
	}, Passport.off = function(a, b) {
		m.off(a, b)
	}, Passport.logout = function(a) {
		m.logout(a)
	}, Passport.login = function(a, b) {
		m.login(a, b)
	}, Passport.uiExtend = function(a, b) {
		var c = null;
		if (Passport[a]) throw new Error("该名称已经存在");
		b = util.extend({}, b);
		var d = b.element;
		if (!d) throw new Error("自定义ui必须指定element参数");
		if (!$E(".pprt-form", d).element || d.getElementsByTagName("input").length < 2) throw new Error("element容器内必选元素缺失");
		Passport[a] = Passport.UIBase.extend({
			init: function(a) {
				return c ? c : (a = this.option = util.extend({}, a), a.ui = "none", a.element = d, this._initing(a), void this._inited())
			}
		}), document.body && (c = new Passport[a]), Passport[a].show = function(b) {
			c || (c = new Passport[a]), b = util.extend({}, {
				modal: !0
			}, b), c.show(b.modal)
		}, Passport[a].hide = function() {
			c && c.hide()
		}
	}, Passport.set = function(a) {
		for (var b = 0; b < Passport.editableOptionList.length; b++) for (var c in a) c == Passport.editableOptionList[b] && (m.option[Passport.editableOptionList[b]] = a[c])
	}, Passport.bindOpenPlatform = function(a, b) {
		m.bindOpenPlatform(a, b)
	}, Passport.URL_REGISTER = "http://passport.17173.com/register", Passport.URL_RECOVER = "http://passport.17173.com/password/forget", Passport.URL_EDIT_PORTRAIT = "http://photos.17173.com/shine/facelist.php", Passport.URL_ACTIVE = "https://passport.17173.com/register/reactivate", Passport.OPEN_PLATFORMS = {
		cyou: "cyou",
		sohu: "sohu",
		ww37: "cy37wanwan",
		qq: "qq",
		weibo: "weibo",
		baidu: "baidu",
		douban: "douban",
		renren: "renren"
	}, Passport.EVENTS = {
		loginStart: "loginStart",
		loginSuccess: "loginSuccess",
		loginFailure: "loginFailure",
		logoutStart: "logoutStart",
		logoutSuccess: "logoutSuccess",
		logoutFailure: "logoutFailure"
	}, Passport.UI = {
		none: {}
	}, Passport.editableOptionList = ["client", "callback", "css", "showwarn", "domainList"]
}(), function(a, b) {
	var c = Passport.util,
		d = function(a, b) {
			try {
				a.contentWindow.Passport && a.contentWindow.Passport.Dialog ? b() : setTimeout(function() {
					d(a, b)
				}, 50)
			} catch (c) {
				setTimeout(function() {
					d(a, b)
				}, 500)
			}
		},
		e = function(a) {
			b.domain = Passport.getDomain();
			var e = b.createElement("iframe");
			e.id = "nut";
			var f = function(a) {
					for (var b = "", c = 0; c < a.length; c++) b += "<script src=" + a[c] + "></script>";
					return b
				},
				g = function(a) {
					for (var b = "", c = 0; c < a.length; c++) b += "<link href=" + a[c] + "?" + Math.random() + " rel=stylesheet />";
					return b
				},
				h = f(a.js),
				i = g(a.css);
			e.src = 'javascript:window.name="nut";document.open();document.write("<!DOCTYPE html><html style=height:100%><meta http-equiv=X-UA-Compatible content=IE=Edge /><script>document.domain=\'' + b.domain + "';//alert(document.documentMode)</script><body style=height:100%>" + i + h + '");document.close();', e.style.cssText = "margin: auto;position: fixed;top: 0;left: 0;right: 0;bottom: 0;border: 0;width: 100%;height: 100%;z-index: 9999;background: url(https://s.ue.17173cdn.com/a/lib/passport-2.0/default/images/loading.gif) no-repeat center;_position:absolute;_top:expression(0+((e=document.documentElement.scrollTop)?e:document.body.scrollTop)+'px');_left:expression(0+((e=document.documentElement.scrollLeft)?e:document.body.scrollLeft)+'px');_width:expression(0+((e=document.documentElement.clientWidth)?e:document.body.clientWidth)+'px');_height:expression(0+((e=document.documentElement.clientHeight)?e:document.body.clientHeight)+'px');", e.allowTransparency = "true", e.frameBorder = 0, e.scrolling = "no", b.body.appendChild(e);
			var j = !! window.ActiveXObject && !window.XMLHttpRequest || !! window.ActiveXObject && "BackCompat" == document.compatMode;
			j && alert("ie6浏览器用户请注意帐号安全。");
			var k = navigator.userAgent,
				l = k.indexOf("Mozilla/5.0") > -1 && k.indexOf("Android ") > -1 && k.indexOf("AppleWebKit") > -1 && k.indexOf("Chrome") < 0;
			return l && (e.style.position = "absolute", c.on(window, "scroll", function() {
				var a = document.body.scrollTop || document.documentElement.scrollTop;
				e.style.top = 2 * a + "px"
			})), c.on(e, "load", function() {
				e.style.background = "transparent"
			}), d(e, function() {
				e.style.background = "transparent"
			}), e
		};
	Passport.Nut = {}, Passport.Nut.hide = function() {
		Passport.Nut.iframe && (Passport.Nut.iframe.style.display = "none")
	}, Passport.Nut.show = function(a) {
		if (Passport.Nut.iframe) Passport.Nut.iframe.contentWindow.initNut(a), Passport.Nut.iframe.style.display = "block";
		else {
			var b = ["https://s.ue.17173cdn.com/a/passport/v1/js/jquery-1.7.2.js", "https://s.ue.17173cdn.com/a/lib/passport-2.0/passport.js", "https://s.ue.17173cdn.com/a/lib/passport-2.0/default/script.js", "https://s.ue.17173cdn.com/a/passport/v1/js/placeholder.js"],
				c = [];
			c.push(Passport.getCssUrl()), Passport.Nut.iframe = e({
				js: b,
				css: c
			}), d(Passport.Nut.iframe, function() {
				Passport.Nut.iframe.contentWindow.initNut(a)
			})
		}
	}, Passport.Dialog = Passport.Nut;
	var f = function() {
			setTimeout(function() {
				c.getCookie("pprt_showloginwarning") && "nut" !== window.name && c.jsonpGet("https://passport.17173.com/sso/loginwarning", {}, function(a) {
					a.data && 1 === a.status && g(a.data.last_login_location + "&nbsp;" + a.data.last_login_time), c.deleteCookie("pprt_showloginwarning")
				})
			}, 3e3)
		},
		g = function(a) {
			if (Passport.isLoggedIn()) {
				Passport.initCss();
				var b = '<div id="com-pprt" class="isolateX box-loginwarning"><div class="safe-tip-box"><div class="hd"><div class="safe-tip-close"><a href="javascript:;">×</a></div><div class="abnor-log"><span class="abnor-log-hd"><i class="ico"></i><span class="c1">上次：</span> </span><span class="abnor-log-bd">' + a + '</span></div></div><div class="bd"><a href="//passport.17173.com/main" target="_blank" title="" class="abnor-log-c">登录异常！立即前往安全中心完善密保&raquo;</a></div></div></div>',
					d = c.$(b);
				document.body.appendChild(d.element), c.$(".safe-tip-close").on("click", function() {
					d.element.parentNode.removeChild(d.element)
				})
			}
		};
	Passport.isLoggedIn() && f(), Passport.on(Passport.EVENTS.loginSuccess, f), Passport.Guide = {}, Passport.Guide.hide = function() {
		var a = Passport.Guide.iframe;
		a.parentNode.removeChild(a), Passport.Guide.iframe = null
	}, Passport.Guide.show = function() {
		Passport.isLoggedIn() ? Passport.Guide.iframe ? Passport.Guide.iframe.style.display = "block" : Passport.Guide.iframe = e({
			js: ["https://s.ue.17173cdn.com/a/passport/v1/js/jquery-1.7.2.js", "https://s.ue.17173cdn.com/a/passport/v1/js/jquery.validate.js", "https://s.ue.17173cdn.com/a/passport/v1/js/artDialog.min.js", "https://s.ue.17173cdn.com/a/passport/v1/js/artDialog.plugins.js", "https://s.ue.17173cdn.com/a/lib/passport-2.0/guide/script.js", "https://s.ue.17173cdn.com/a/passport/v1/js/passport-script.js", "https://s.ue.17173cdn.com/a/passport/v1/js/script.js"],
			css: ["https://s.ue.17173cdn.com/a/passport/v1/css/passport-artdialog.css", "https://s.ue.17173cdn.com/a/lib/passport-2.0/guide/style.css"]
		}) : alert("请登录后再试")
	}
}(window, document);