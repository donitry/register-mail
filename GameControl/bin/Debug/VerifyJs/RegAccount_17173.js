_jc_uv = "",
_jcrqurl = "http://logs.17173.com/",
_jcbw = new Array,
_jcrf = "http://passport.17173.com/register",
_jc_appkey = 118,
_jc_F = "http:",
_jc_purl_log1 = "",
_jc_purl_logs = "";

function _jc_f_ie() {
	return "IE: 8.0"
}

function _jc_f_trim(e) {
	return e.replace(/\s+/g, "")
}

function getcookies(){
	var _jcin = new Date;
	var e, t = _jcin.getTime() * 1e3 + Math.round(Math.random() * 2147483647);
	_jcrf = "http://passport.17173.com/register", e = "0",i = _jcin.getTime();
	
	_diff = _jcin.getTime(),_jc_uv = t;//SUV
	_ssid = _jc_uv + "" + (_jcin.getTime() * 1e3 + Math.round(Math.random() * 2147483647)) + _jcin.getTime(), _svn = 1;
	var sessionid, sessionid2 = _ssid + "|" + _svn;
	
	var a = new Date;
	a.setDate(a.getDate() + 1),a.setDate(a.getDate() + 1),a = new Date(a.getFullYear(), a.getMonth(), a.getDate());
	_nuv = a.getTime(), _iploc = "unknown", _online = _jcin.getTime();
	
	
	
	_jcbw[0] = "Netscape", _jcbw[7] = "zh-CN" ,_jcbw[7] = _jcbw[7].toLowerCase(), _jcbw[1] = _jc_f_ie(), _jcbw[2] = 1;
	_jcbw[3] = "12.0", _jcbw[4] = "Win XP", _jcbw[8] = 1, _jcbw[10] = "ie8", _jcbw[11] = 1;
	_jcbw[5] = "1366x768", _jcbw[6] = "24-bit", _jcbw[9] = 0;
	
//logs.17173.com/ping.gif?1398694585303372?t?=1398694585303372?t?=1?t?=passport.17173.com?t?=http://passport.17173.com/register?t?=passport.17173.com?t?=0?t?=0?t?=Chrome:34.0.1847.131?t?=1?t?=13.0?t?=Win%207?t?=1366x768?t?=24-bit?t?=zh-cn?t?=1?t?=0?t?=ch?t?=0?t?=
	
	_jc_purl_logs = "http://logs.17173.com/ping.gif?" + t + "?t?=" + _jc_uv + "?t?=1?t?=passport.17173.com?t?=http://passport.17173.com/register?t?=passport.17173.com?t?=0?t?=0?t?=" + _jc_f_trim(_jcbw[1]) + "?t?=" + _jcbw[2] + "?t?=" + _jcbw[3] + "?t?=" + _jcbw[4] + "?t?=" + _jcbw[5] + "?t?=" + _jcbw[6] + "?t?=" + _jcbw[7] + "?t?=" + _jcbw[8] + "?t?=" + _jcbw[9] + "?t?=" + _jcbw[10] + "?t?=0?t?=" ;
	
	//log1.17173.com/ping.gif?1398694585303372?t?=1398694585303372?t?=1?t?=passport.17173.com?t?=http://passport.17173.com/register?t?=passport.17173.com?t?=?t?=?t?=Chrome:34.0.1847.131?t?=1?t?=13.0?t?=Win%207?t?=1366x768?t?=24-bit?t?=zh-cn?t?=1?t?=0?t?=ch?t?=0?t?=0?t?=139869458530337213986952715232311398694284982?t?=1?t?=0?t?=1?t?=0?t?=3?t?=?t?=
	_jc_purl_log1 = "http://log1.17173.com/ping.gif?" + t + "?t?=" + _jc_uv + "?t?=1?t?=passport.17173.com?t?=http://passport.17173.com/register?t?=passport.17173.com?t?=?t?=?t?=" + _jc_f_trim(_jcbw[1]) + "?t?=" + _jcbw[2] + "?t?=" + _jcbw[3] + "?t?=" + _jcbw[4] + "?t?=" + _jcbw[5] + "?t?=" + _jcbw[6] + "?t?=" + _jcbw[7] + "?t?=" + _jcbw[8] + "?t?=" + _jcbw[9] + "?t?=" + _jcbw[10] + "?t?=0?t?=0?t?=" + _ssid + "?t?=" + _svn + "?t?=0?t?=" + _jcbw[11] + "?t?=0?t?=3?t?=?t?=";
	
	
	var tmpb = "[{\"x\":-144,\"y\":398,\"t\":\"a\",\"u\":\"javascript:;\"}]";
	_jc_purl_pvapp = "http://log1.17173.com/pv?appkey=" + _jc_appkey + "&suv=" + _jc_uv + "&ssid=" + _ssid + "&bp=" + encodeURIComponent(tmpb) + "&se=&kw=&rf=" + _jcrf + "&bwt=" + _jcbw[1] + "&bw=" + _jcbw[10] + "&Jav=" + _jcbw[2] + "&Flu=" + _jcbw[3] + "&scr=" + _jcbw[5] + "&Clr=" + _jcbw[6] + "&Os=" + _jcbw[4] + "&ck=" + _jcbw[8] + "&Ln=" + _jcbw[7] + "&rft=3";
	
	var cookies = new Array;
	cookies[0] = _iploc, cookies[1] = _online, cookies[2] = _diff, cookies[3] = _jc_uv, cookies[4] = sessionid, cookies[5] = sessionid2;
	cookies[6] = _nuv, cookies[7] = _jc_purl_logs, cookies[8] = _jc_purl_log1, cookies[9] = _jc_purl_pvapp;
	
	return cookies.join("$")
}

function getDateTime(){
	var a = new Date().getTime();
	return a
}

function guid(){
	return "pprtjsonp" + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

function test(a){
	var b = a + 1;
	return b
}

function hexMd5(a) {
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
		var a = c(b(d(a)));
		return a
}

