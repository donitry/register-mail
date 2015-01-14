g.component.qzone = $("qzone") ? true : false;
g.component.lunar = 1;
g_lang = g.component.areaSearch = 1;
var index = {
	aq_js: "http://zc.qq.com/chs/m.js?v=" + Math.random(),
	aq_cgi: "http://a.zc.qq.com/Cgi-bin/MoniKey?",
	aq_input: {
		nick: 1,
		phone_num: 2,
		self_email: 3,
		other_email: 4,
		password: 5,
		password_again: 6,
		sex_1: 7,
		sex_2: 8,
		birthday_type_value: 9,
		year_value: 10,
		month_value: 11,
		day_value: 12,
		country_value: 13,
		province_value: 14,
		city_value: 15,
		code: 16
	},
	aq_array: [],
	aq_object: {},
	initIndexType: g_lang == 1 ? 0 : 2,
	inited: false,
	phoneE: ['请输入中国大陆手机号码（不含小灵通）<br/>其他地区号码<a onclick="index.seaPhone();" href="javascript:void(0);" tabindex="3">点击这里</a>', "请输入有效的手机号码", "手机号不可以为空", "手机号不可以为空格", "请输入手机号码"],
	nickE: "昵称不可以为空,昵称不可以为空格,请输入昵称,,不能超过24个字母或12个汉字,您不能使用该昵称注册".split(","),
	otherEmailE: '请输入邮箱,帐号已被注册,邮箱格式错误,帐号可用,请输入您常用的电子邮箱<br/><a id="no_email" href="javascript:void(0);" onclick="index.hasNoEmail();">创建邮箱&nbsp;</a>或<a href="javascript:void(0);" onclick="index.mailToNumber();">&nbsp;注册普通QQ号</a>,QQ/foxmail邮箱无需注册，可以直接登录,QQ/foxmail邮箱无需注册，可以直接登录'.split(","),
	selfEmailE: "请输入邮箱,长度为3-18个字符,必须以a-z的英文字母（不分大小写）开头,必须以a-z的英文字母（不分大小写）开头,请创建邮箱名，由3-18个英文、数字、点、减号、下划线组成,点、减号、下划线不能连续出现两次或两次以上,由英文字母、数字结尾,Email帐号格式不正确,邮箱格式错误,邮箱已被注册".split(","),
	passE: ["您输入的密码过短", "密码不能为9位以下纯数字", "密码不可以为空", "您输入的密码过长"],
	passInfo: ["级别低", "级别高"],
	passAgainE: ["密码不一致", "请再次输入密码"],
	weakpassTips: ["连续字符密码易被破解，请用多组合的密码", "相同字符密码易被破解，请用多组合的密码", "试试字母、数字、标点的组合吧"],
	birthE: ["生日不可为空", "生日不合法"],
	areaE: ["请选择正确的地区", "不支持该地区"],
	termsE: ["请同意条款"],
	birthdayE: ["请选择生日"],
	submitE: ["请先同意服务条款", "立即注册"],
	codeE: ["验证码错误", "请输入图中的字母，不区分大小写", "请输入完整验证码", "请输入验证码"],
	inputSearchTipsArray: "试试直接填写吧！例如1960,试试直接填写吧！例如11,试试直接填写吧！例如15,试试快速搜索吧！例如中国或zg,试试快速搜索吧！例如北京或bj,试试快速搜索吧！例如朝阳或cy".split(","),
	maxPwdLen: 16,
	minPwdLen: 6,
	emailReg: /^[a-z0-9][a-z0-9._-]*@[a-z0-9_-]+(\.[a-z0-9_-]+)+$/i,
	enWordReg: /[a-zA-Z]/,
	alreadyUsedEmails: [],
	type: 0,
	selfEmail: "",
	selfType: 0,
	otherEmail: "",
	nick: "",
	password: "",
	passAgain: "",
	sex: "1",
	birthType: "0",
	isLeap: 1,
	year: "",
	month: "",
	day: "",
	country: "",
	province: "",
	city: "",
	verifycode: "",
	code: "",
	qzone: g.component.qzone,
	agreed: true,
	showing: false,
	host: "http://zc.qq.com/",
	initInfo: null,
	totol: 2,
	errorId: "",
	needShowError: [1, 1, 1],
	location: null,
	showDate: {
		year: 0,
		month: 0,
		day: 0,
		isLeap: false
	},
	maxDate: {
		year: 0,
		month: 0,
		day: 0
	},
	old_birthType: "0",
	number_init: "cgi-bin/chs/numreg/init",
	phone_init: "cgi-bin/chs/phonereg/init",
	qqmail_init: "cgi-bin/chs/qqmailreg/init",
	other_init: "cgi-bin/chs/othmailreg/init",
	number_url: "cgi-bin/chs/numreg/get_acc",
	phone_url: "cgi-bin/chs/phonereg/get_acc",
	qqmail_url: "cgi-bin/chs/qqmailreg/get_acc",
	othermail_url: "cgi-bin/chs/othmailreg/get_acc",
	codeUrl: "http://captcha.qq.com/getimage?aid=1007901",
	otherChkUrl: "cgi-bin/chs/othmailreg/check_mail",
	selfChkUrl: "cgi-bin/chs/qqmailreg/check_mail",
	fromReportUrl: "/cgi-bin/common/attr",
	nickChkUrl: "/cgi-bin/chs/common/dirty_check",
	areaSearchUrl: "/cgi-bin/chs/common/area",
	phoneChkUrl: "/cgi-bin/common/check_phone",
	email_ok: "email_ok.html",
	phone_ok: "phone_ok.html",
	decimal_ok: "decimal_ok.html",
	max_selective_rate: 100,
	selective_rate: 5,
	selective_decimal_ok: "selective_decimal_ok.html",
	send_ok: "send_ok.html",
	pwdLvClass: ["empty", "rankLow", "rankMiddle", "rankHigh"],
	pwdLvTips: ["6-16个字符，不可以为9位以下纯数字", "试试字母、数字、标点混搭", "复杂度还行，再加强一下等级？", "密码强度好，请记牢！", "弱：试试加长您的密码"],
	pwdLvWording: ["", "弱", "中等", "强"],
	keyCode: {
		UP: 38,
		DOWN: 40,
		LEFT: 37,
		RIGHT: 39,
		ENTER: 13,
		TAB: 9,
		BACK: 8,
		DEL: 46,
		F5: 116
	},
	listIndex: [0, 21, 0, 0, -1, -1, -1, 0, 0],
	selectListIndex: [0, 21, 0, 0, -1, -1, -1, 0, 0],
	selectListState: [0, 0, 0, 0, 0, 0, 0, 0, 0],
	searchTimeoutId: [0, 0, 0, 0, 0, 0, 0, 0, 0],
	selectHasSelected: [false, false, false, false, false, false, false, false, false],
	noAreaStr: "0",
	initAddress: "1,中国,11,北京,1,东城".split(","),
	noSelectTip: "该时间不可选",
	fromId: "",
	fromMap: {
		qq: 58029,
		pt: 58588,
		im: 58589,
		music: 58590,
		live: 58591,
		client: 61112,
		other: 58030
	},
	ptlang: "",
	ADUIN: "",
	ADSESSION: "",
	checkNickMap: {},
	checkPhoneMap: {},
	yearSearchArr: [],
	monthSearchArr: [],
	daySearchArr: [],
	birthdayTipsShow: false,
	areaTipsShow: false,
	pwd_valid: false,
	phoneArea: "0086",
	phoneSubmit: "",
	phoneArea_autocomplete: null,
	safeCode: [0, 0, 0, 0, 0, 0, 0, 0],
	pwdTimeArray: [0, 0, 0, 0],
	pwdNum: 0,
	pwdTime: 0,
	current_error_dom: "",
	knownEmail: "gmail.com,hotmail.com,yahoo.com,sina.com,163.com,126.com,vip.sina.com,sina.cn,sohu.com,yahoo.cn,yahoo.com.cn,139.com,wo.com.cn,189.cn,live.com,msn.com,live.hk,live.cn,hotmail.com.cn,hinet.net,msa.hinet.net,cm1.hinet.net,umail.hinet.net,xuite.net,yam.com,yeah.net,pchome.com.tw,netvigator.com,seed.net.tw,anet.net.tw".split(","),
	clearAq: function() {
		index.aq_array = []
	},
	addAq: function(a, b) {
		var c = (new Date).getTime();
		index.aq_array.push(b + "|" + index.aq_input[a] + "|" + c)
	},
	reportAq: function(a) {
		var b = new Image;
		index.aq_array.length == 0 && index.addAq(a.id, 0);
		a = index.aq_cgi + index.aq_array.join("&");
		b.src = a
	},
	setAq: function(a, b) {
		index.aq_object[a] = b
	},
	setCode: function(a, b) {
		switch (a) {
		case index.keyCode.BACK:
			index.safeCode[b + 1]++, index.safeCode[7]++;
		default:
			index.safeCode[b]++
		}
		index.safeCode[7]++
	},
	setCodeCookie: function() {
		var a = index.safeCode.join("-");
		$.cookie.setSessionCookie("uoc", a, "zc.qq.com", "/")
	},
	setFromId: function() {
		var a = $.bom.query("fromId");
		a || ((a = $.bom.query("from")) || (a = "other"), a = index.fromMap[a]);
		index.fromId = a;
		index.ptlang = $.bom.query("ptlang");
		index.ADUIN = $.bom.query("ADUIN");
		index.ADSESSION = $.bom.query("ADSESSION");
		var a = $.bom.query("regkey"),
			b = $.bom.query("ADTAG");
		a && $.cookie.set("regkey", a, "zc.qq.com", "/", 17520);
		b && $.cookie.set("ADTAG", b, "zc.qq.com", "/", 17520)
	},
	setCloseAppId: function() {
		var a = $.bom.query("app_id"),
			b = $.bom.query("app_param");
		$.winName.set("app_id", a);
		$.winName.set("app_param", b)
	},
	reportSource: function() {
		document.createElement("img").src = index.fromReportUrl + "?id=" + index.fromId + "&timeused=0&seed=" + Math.random()
	},
	pushAlreadyUsedEmails: function(a) {
		for (var b = 0, c = index.alreadyUsedEmails[0]; c; c = index.alreadyUsedEmails[++b])
		if (a == c) return;
		index.alreadyUsedEmails.push(a)
	},
	emailHasAlreadyUsed: function(a) {
		for (var b = 0, c = index.alreadyUsedEmails[0]; c; c = index.alreadyUsedEmails[++b])
		if (a == c) return true;
		return false
	},
	json2str: function(a) {
		var b = [],
			c;
		for (c in a)
		b.push('"' + c + '":' + (typeof a[c] == "object" && a[c] != null ? json2str(a[c]) : /^(string|number)$/.test(typeof a[c]) ? '"' + a[c] + '"' : a[c]));
		return "{" + b.join(",") + "}"
	},
	getInitUrl: function() {
		return index.type == 0 ? index.host + index.number_init + "?r=" + Math.random() : index.type == 3 ? index.host + index.phone_init + "?r=" + Math.random() : index.host + (index.type == 1 ? index.qqmail_init : index.other_init) + "?r=" + Math.random()
	},
	getSubmitUrl: function() {
		return index.type == 0 ? index.host + index.number_url + "?r=" + Math.random() : index.type == 3 ? index.host + index.phone_url + "?r=" + Math.random() : index.host + (index.type == 1 ? index.qqmail_url : index.othermail_url) + "?r=" + Math.random()
	},
	showCodeByElevel: function(a) {
		switch (a) {
		case "0":
			$("code_box").className = "box box_9 hide";
			break;
		case "1":
		case "2":
			$("code_box").className = "box box_9";
			$("code_img").src = index.codeUrl + "&r=" + Math.random();
			break;
		case "6":
			location.href = "worst.html?ec=21";
			break;
		default:
			$("code_box").className = "box box_9", $("code_img").src = index.codeUrl + "&r=" + Math.random()
		}
	},
	getIndexFromId: function(a) {
		var b = 0;
		try {
			b = parseInt(a.split("_")[1])
		} catch (c) {
			b = 0
		}
		return b
	},
	updateShowdDate: function() {
		if (index.year && index.month && window.calendar) {
			var a = index.day == "" ? 1 : index.day,
				a = calendar.getDate(parseInt(index.year), parseInt(index.month), parseInt(a), parseInt(index.old_birthType), parseInt(index.isLeap)).split("-");
			index.showDate.year = parseInt(a[0]);
			index.showDate.month = parseInt(a[1]);
			index.showDate.day = index.day == "" ? 0 : parseInt(a[2]);
			index.showDate.isLeap = a[3] == "0" ? true : false;
			index.isLeap = index.showDate.isLeap ? 0 : 1
		}
		a = (new Date).getFullYear();
		if (index.showDate.year > a) index.showDate.year = a, index.showDate.month = 1, index.showDate.day = 1, index.showDate.isLeap = false;
		if (index.showDate.year == index.maxDate.year - 120) index.showDate.year = index.maxDate.year - 119, index.showDate.month = 1, index.showDate.day = 1, index.showDate.isLeap = false;
		index.old_birthType = index.birthType
	},
	initMaxDate: function() {
		var a = new Date;
		try {
			var b = index.initInfo.localdate.split("-");
			index.maxDate.year = parseInt(b[0]);
			index.maxDate.month = parseInt(b[1]);
			index.maxDate.day = parseInt(b[2])
		} catch (c) {
			index.maxDate.year = a.getFullYear(), index.maxDate.month = a.getMonth() + 1, index.maxDate.day = a.getDate()
		}
	},
	inMaxDate: function(a, b, c, d, e) {
		var f = new Date(index.maxDate.year, index.maxDate.month, index.maxDate.day),
			h = new Date;
		switch (d + "") {
		case "0":
			h = new Date(a, b, c);
			break;
		case "1":
			h = calendar.getDate(a, b, c, 1, e).split("-"), h = new Date(parseInt(h[0]), parseInt(h[1]), parseInt(h[2]))
		}
		f = f.getTime();
		return h.getTime() <= f ? true : false
	},
	getPwdRank: function(a) {
		var b = 0;
		a.match(/[a-z]/g) && b++;
		a.match(/[A-Z]/g) && b++;
		a.match(/[0-9]/g) && b++;
		a.match(/[^a-zA-Z0-9]/g) && b++;
		b = b > 3 ? 3 : b;
		if (a.length < 6 || /^\d{1,8}$/.test(a)) b = 0;
		a.length < 8 && b > 1 && (b = 1);
		return b
	},
	showPwRank: function() {
		$("pwd_tips").className = "hide";
		var a = $("password").value;
		$("pwd_result");
		$("pwd_result").className = "";
		var b = $("password_info"),
			c = $("password_pic"),
			d = index.getPwdRank(a);
		c.innerHTML = index.pwdLvWording[d];
		c.className = index.pwdLvClass[d];
		if (d > 1) b.innerHTML = index.pwdLvTips[d];
		else if (d == 1) b.innerHTML = index.isLianxuPwd(a) ? index.weakpassTips[0] : index.isSamePwd(a) ? index.weakpassTips[1] : index.weakpassTips[2]
	},
	isLianxuPwd: function(a) {
		if (a.length < 2) return true;
		var b = a.charCodeAt(0) - a.charCodeAt(1);
		if (b == 0) return false;
		for (var c = 1, d = a.length; c < d - 1; c++)
		if (a.charCodeAt(c) - a.charCodeAt(c + 1) != b) return false;
		return true
	},
	isSamePwd: function(a) {
		for (var b = 0, c = a.length; b < c - 1; b++)
		if (a.charCodeAt(b) != a.charCodeAt(b + 1)) return false;
		return true
	},
	hidePwRank: function() {
		$("pwd_result").className = "hide";
		$("pwd_tips").className = "pwd_tips"
	},
	updateSelectListIndex: function(a, b) {
		index.selectListIndex[a] = b
	},
	updateListIndex: function(a, b) {
		index.selectListIndex[a] = b;
		index.listIndex[a] = b
	},
	getSelectScrollTop: function(a) {
		var b = index.selectListIndex[a],
			c = 0;
		switch (a) {
		case 0:
			c = 0;
			break;
		case 1:
		case 2:
		case 3:
			c = b > 5 ? (b - 5) * 20 : 0;
			break;
		case 4:
		case 5:
		case 6:
			c = b > 8 ? (b - 8) * 20 : 0
		}
		return c
	},
	getSelectListItem: function(a) {
		var b = index.selectListIndex[a],
			c = null;
		switch (a) {
		case 0:
			c = $("birthday_" + b);
			break;
		case 1:
			c = $("year_" + b);
			break;
		case 2:
			c = $("month_" + b);
			break;
		case 3:
			c = $("day_" + b);
			break;
		case 4:
			c = $("country_" + b);
			break;
		case 5:
			c = $("province_" + b);
			break;
		case 6:
			c = $("city_" + b);
			break;
		case 8:
			c = $("seaCountry_" + b)
		}
		return c
	},
	moveList: function(a, b, c, d) {
		var e = b.getElementsByTagName("li");
		switch (c.keyCode) {
		case index.keyCode.UP:
			c.stopPropagation();
			c.preventDefault();
			if (index.listIndex[d] > 0) {
				e[index.listIndex[d]].className = "";
				e[index.listIndex[d] - 1].className = "hover";
				if (d < 4 && d > 0) b.scrollTop = index.listIndex[d] > 6 ? (index.listIndex[d] - 6) * 20 : 0;
				if (d >= 4) b.scrollTop = index.listIndex[d] > 9 ? (index.listIndex[d] - 9) * 20 : 0;
				index.listIndex[d]--
			}
			break;
		case index.keyCode.DOWN:
			c.stopPropagation();
			c.preventDefault();
			if (b.className.indexOf("hide") > -1) {
				switch (d) {
				case 0:
					index.switchBirtydayType();
					break;
				case 1:
					index.switchYear();
					break;
				case 2:
					index.switchMonth();
					break;
				case 3:
					index.switchDay();
					break;
				case 4:
					index.switchCountry();
					break;
				case 5:
					index.switchProvince();
					break;
				case 6:
					index.switchCity();
					break;
				case 8:
					index.switchSeaCountry()
				}
				return
			}
			if (index.listIndex[d] < e.length - 1) {
				if (index.listIndex[d] >= 0) e[index.listIndex[d]].className = "";
				e[index.listIndex[d] + 1].className = "hover";
				if (d < 4 && d > 0) b.scrollTop = index.listIndex[d] > 5 ? (index.listIndex[d] - 5) * 20 : 0;
				if (d >= 4) b.scrollTop = index.listIndex[d] > 8 ? (index.listIndex[d] - 8) * 20 : 0;
				index.listIndex[d]++
			}
			break;
		case index.keyCode.ENTER:
			c.stopPropagation();
			c.preventDefault();
			if (index.listIndex[d] < 0 || !e[index.listIndex[d]]) return;
			c = e[index.listIndex[d]].innerHTML;
			c = $.html.decode(c);
			index.selectHasSelected[d] = true;
			switch (d) {
			case 0:
				a.innerHTML = c;
				a = index.birthType;
				index.birthType = e[index.listIndex[d]].getAttribute("value");
				a != index.birthType && (index.updateShowdDate(), index.changeYear(), index.changeMonth(), index.changeDay(), index.showBirthdayInfo());
				index.updateSelectListIndex(d, index.listIndex[d]);
				index.hideBirtydayType();
				break;
			case 1:
				a.value = c;
				a = index.year;
				index.year = e[index.listIndex[d]].getAttribute("value");
				index.showDate.year = index.year;
				a != index.year && (index.changeMonth(), index.changeDay(), index.showBirthdayInfo());
				index.updateSelectListIndex(d, index.listIndex[d]);
				index.hideYear();
				break;
			case 2:
				a.value = c;
				a = index.month;
				index.month = e[index.listIndex[d]].getAttribute("value");
				index.isLeap = e[index.listIndex[d]].getAttribute("isLeap") ? e[index.listIndex[d]].getAttribute("isLeap") : 1;
				index.showDate.month = index.month;
				index.showDate.isLeap = index.isLeap == 1 ? false : true;
				a != index.month && (index.changeDay(), index.showBirthdayInfo());
				index.updateSelectListIndex(d, index.listIndex[d]);
				index.hideMonth();
				break;
			case 3:
				a.value = c;
				a = index.day;
				index.day = e[index.listIndex[d]].getAttribute("value");
				index.showDate.day = index.day;
				a != index.day && index.showBirthdayInfo();
				index.updateSelectListIndex(d, index.listIndex[d]);
				index.hideDay();
				break;
			case 4:
				a.value = c;
				b = index.country;
				index.country = e[index.listIndex[d]].getAttribute("value");
				b != index.country && (index.changeProvince(), index.changeCity());
				index.updateSelectListIndex(d, index.listIndex[d]);
				c.length > 6 ? (a.title = c, a.value = index.isEnglishWord(c) ? c.substring(0, 12) : c.substring(0, 6)) : a.title = "";
				index.hideCountry();
				break;
			case 5:
				a.value = c;
				b = index.province;
				index.province = e[index.listIndex[d]].getAttribute("value");
				b != index.province && index.changeCity();
				index.updateSelectListIndex(d, index.listIndex[d]);
				c.length > 6 ? (a.title = c, a.value = index.isEnglishWord(c) ? c.substring(0, 12) : c.substring(0, 6)) : a.title = "";
				index.hideProvince();
				break;
			case 6:
				a.value = c;
				index.city = e[index.listIndex[d]].getAttribute("value");
				index.updateSelectListIndex(d, index.listIndex[d]);
				c.length > 6 ? (a.title = c, a.value = index.isEnglishWord(c) ? c.substring(0, 12) : c.substring(0, 6)) : a.title = "";
				index.hideCity();
				break;
			case 7:
				a.value = c;
				try {
					$("nick").focus()
				} catch (f) {}
				$.css.addClass(b, "hide");
				break;
			case 8:
				a.value = c, e[index.listIndex[d]].getAttribute("code"), index.updateSelectListIndex(d, index.listIndex[d])
			}
			break;
		case index.keyCode.TAB:
			switch (d) {
			case 0:
				index.hideBirtydayType();
				break;
			case 1:
				index.hideYear();
				break;
			case 2:
				index.hideMonth();
				break;
			case 3:
				index.hideDay();
				break;
			case 4:
				index.hideCountry();
				break;
			case 5:
				index.hideProvince();
				break;
			case 6:
				index.hideCity();
				break;
			case 7:
				$.css.addClass(b, "hide")
			}
		}
		return false
	},
	isChangingTab: function() {
		return $("nav_1").getAttribute("_hover") || $("nav_2").getAttribute("_hover") || $("nav_3") && $("nav_3").getAttribute("_hover") || $("email_info").getAttribute("_hover") || $("nick_info").getAttribute("_hover") || $("phone_info").getAttribute("_hover")
	},
	iptFocus: function(a) {
		try {
			var b = $(a);
			b.focus();
			b.select()
		} catch (c) {}
	},
	mailRegReport: function() {
		if (index.type == 2) $.report.monitor("otherMailReg"), index.otherMailRegReport = true;
		if (index.type == 1) $.report.monitor("QQMailReg"), index.QQMailRegReport = true
	},
	phoneRegReport: function() {
		if (!index.phoneRegFlag) $.report.monitor("phoneReg"), index.phoneRegFlag = true
	},
	numRegReport: function() {
		if (!index.numRegFlag) $.report.monitor("numReg"), index.numRegFlag = true
	},
	changeInit: function() {
		$.http.get(index.getInitUrl(), null, function(a) {
			index.showCodeByElevel(a.elevel)
		})
	},
	getSessionMachineCookie: function() {
		$.cookie.get("sessionCookie");
		$.cookie.get("machineCookie")
	},
	getParam: function() {
		var a = decodeURIComponent($.winName.get("param"));
		if (!a) $.report.monitor("no_param"), window.location.href = "error.html?ec=no";
		return eval("(" + a + ")")
	},
	setParam: function(a) {
		$.winName.set("param", a)
	},
	initTab: function() {
		var a = $.bom.query("type");
		if (g_lang == 1 && a == 3) index.initIndexType = 3, $.report.monitor("phone_count"), index.initTab.hasInit = true;
		else if (g_lang == 1 && a == 2) index.initIndexType = 2, $.report.monitor("email_count"), index.initTab.hasInit = true
	},
	phone_to: function(a) {
		if (g_lang == 1 && index.initIndexType == 3 && !index.phone_to.report) index.phone_to.report = true, $.report.monitor(a)
	},
	email_to: function(a) {
		if (g_lang == 1 && index.initIndexType == 2 && !index.email_to.report) index.email_to.report = true, $.report.monitor(a)
	},
	number_to: function(a) {
		if (g_lang == 1 && index.initIndexType == 0 && !index.number_to.report) index.number_to.report = true, $.report.monitor(a)
	},
	init: function() {
		index.current_error_dom = "init_begin";
		if (!index.inited) {
			$.cookie.del("param");
			index.initTab(10);
			index.setFromId();
			index.setCloseAppId();
			$("other_email").value = "";
			$("self_email").value = "";
			$("nick").value = "";
			$("code").value = "";
			var a = $.winName.get("type");
			index.type = a == "" ? index.initIndexType : a;
			index.type = index.type == 1 || index.type == 2 ? 2 : index.type;
			if (a = $.bom.query("type")) index.type = a;
			index.changeTab(index.type);
			index.initIndexType = index.type;
			g_lang == 1 && index.initIndexType == 0 ? (index.initIndexType = 0, $.report.monitor("number_count")) : g_lang == 1 && index.initIndexType == 2 && !index.initTab.hasInit ? $.report.monitor("email_count") : g_lang == 1 && index.initIndexType == 3 && !index.initTab.hasInit && $.report.monitor("phone_count");
			$.http.get(index.getInitUrl(), {
				cookieCode: index.getSessionMachineCookie()
			}, function(a) {
				index.current_error_dom = "init_cgi_begin";
				index.initInfo = a;
				index.country = a.countryid ? a.countryid : index.initAddress[0];
				index.province = a.provinceid ? a.provinceid : index.initAddress[2];
				index.city = a.cityid ? a.cityid : index.initAddress[4];
				$("country_value").value = a.country ? a.country : index.initAddress[1];
				$("province_value").value = a.province ? a.province : index.initAddress[3];
				$("city_value").value = a.city ? a.city : index.initAddress[5];
				index.showCodeByElevel(a.elevel);
				$.http.jsonp("http://4.url.cn/zc/chs/js/10062/location_chs.js");
				$.http.loadScript("http://4.url.cn/zc/chs/js/10062/calendar.js", function() {
					index.current_error_dom = "load_birthday_begin";
					index.initMaxDate();
					index.initBirthday();
					index.current_error_dom = "load_birthday_end";
					if ($.winName.get("phonereg_fillvalues") == 1) {
						var a = index.getParam();
						index.setBirthday(a);
						index.locationSet && index.birthdaySet && $.winName.set("phonereg_fillvalues", 0)
					}
				});
				window.setTimeout(function() {
					$.http.jsonp(index.aq_js)
				}, 3E3);
				$.cookie.get("sessionCookie") || $.report.monitor("no_sessionCookie");
				navigator.cookieEnabled || $.report.monitor("cookie_disable");
				index.current_error_dom = "init_cgi_end"
			});
			index.current_error_dom = "init_bindEvent_start";
			$.e.add($("other_email"), "focus", function() {
				index.clearAq();
				index.current_error_dom = "other_email";
				$("other_email_bg").className = "bg_txt bg_focus";
				(this.value != index.otherEmail || this.value == "") && index.showTip("email_info", index.otherEmailE[4])
			});
			$.e.add($("other_email"), "keyup", function(a) {
				var c = this.value,
					a = a.keyCode;
				a != index.keyCode.UP && a != index.keyCode.DOWN && a != index.keyCode.ENTER && a != index.keyCode.TAB && a != index.keyCode.F5 && index.createEmailTips(c);
				/^[^a-z0-9]/i.test(c) ? index.showTip("email_info", index.otherEmailE[2]) : index.showTip("email_info", index.otherEmailE[4])
			});
			$.e.add($("other_email"), "blur", function() {
				$("other_email_bg").className = "bg_txt";
				index.isChangingTab() || index.chkOtherEMail();
				index.reportAq(this)
			});
			$.e.add($("other_email"), "keydown", function(a) {
				index.addAq(this.id, a.keyCode)
			});
			$.e.add($("self_email"), "focus", function() {
				index.clearAq();
				index.current_error_dom = "self_email";
				this.className = "txt focus";
				(this.value != index.selfEmail || this.value == "") && index.showTip("email_info", index.selfEmailE[4])
			});
			$.e.add($("self_email"), "keyup", function() {
				var a = this.value;
				/^[^a-z]+/i.test(a) ? index.showTip("email_info", index.selfEmailE[2]) : /[^a-z0-9_.-]/i.test(a) ? index.showTip("email_info", index.selfEmailE[4]) : /[._-]{2,}/.test(a) ? index.showTip("email_info", index.selfEmailE[5]) : /[^a-z0-9]+$/i.test(a) ? index.showTip("email_info", index.selfEmailE[6]) : index.showTip("email_info", index.selfEmailE[4])
			});
			$.e.add($("self_email"), "keydown", function(a) {
				index.addAq(this.id, a.keyCode)
			});
			$.e.add($("self_email"), "blur", function() {
				this.className = "txt";
				index.isChangingTab() || index.chkSelfEMail();
				index.reportAq(this)
			});
			$.e.add($("phone_info"), "mouseover", function() {
				this.setAttribute("_hover", "over")
			});
			$.e.add($("phone_info"), "mouseout", function() {
				this.removeAttribute("_hover")
			});
			$.e.add($("nick_info"), "mouseover", function() {
				this.setAttribute("_hover", "over")
			});
			$.e.add($("nick_info"), "mouseout", function() {
				this.removeAttribute("_hover")
			});
			$.e.add($("phone_num"), "focus", function() {
				index.clearAq();
				index.current_error_dom = "phone_num";
				$("phone_num_bg").className = "bg_txt bg_focus";
				index.showTip("phone_info", index.isSeaPhone ? index.phoneE[4] : index.phoneE[0])
			});
			$.e.add($("phone_num"), "keydown", function(a) {
				$("phone_num_placeholder") && ($("phone_num_placeholder").className = "hide");
				index.addAq(this.id, a.keyCode)
			});
			$.e.add($("phone_num"), "keyup", function() {
				if (this.value == "") $("phone_num_placeholder") && ($("phone_num_placeholder").className = "phone_num_placeholder")
			});
			$.e.add($("phone_num"), "blur", function() {
				$("phone_num_bg").className = "bg_txt";
				index.isChangingTab() || (index.hideInfo("phone_info"), index.chkPhoneNum());
				index.reportAq(this)
			});
			$.e.add($("selfType"), "focus", function() {
				index.current_error_dom = "selfType";
				$.css.addClass(this, "focus")
			});
			$.e.add($("selfType"), "blur", function() {
				$.css.removeClass(this, "focus")
			});
			$.e.add($("selfType"), "click", function(a) {
				a.stopPropagation();
				index.switchType()
			});
			$.e.add($("selfType0"), "click", function() {
				index.selfType = 0;
				$("selfType").innerHTML = "@qq.com";
				index.hideType()
			});
			$.e.add($("selfType1"), "click", function() {
				index.selfType = 1;
				$("selfType").innerHTML = "@foxmail.com";
				index.hideType()
			});
			$.e.add($("selfType0"), "mousemove", function(a) {
				this.className = "hover";
				$("selfType1").className = "";
				a.stopPropagation()
			});
			$.e.add($("selfType0"), "mouseout", function(a) {
				this.className = "";
				a.stopPropagation()
			});
			$.e.add($("selfType1"), "mousemove", function(a) {
				this.className = "hover";
				$("selfType0").className = "";
				a.stopPropagation()
			});
			$.e.add($("selfType1"), "mouseout", function(a) {
				this.className = "";
				a.stopPropagation()
			});
			$.e.add("selfType", "keydown", function(a) {
				a.stopPropagation();
				$("selfTypeBox");
				index.moveList(this, $("selfTypeBox"), a)
			});
			$.e.add($("password"), "paste", function(a) {
				a.preventDefault();
				return false
			});
			$.e.add($("password_again"), "paste", function(a) {
				a.preventDefault();
				return false
			});
			$.e.add($("nick"), "focus", function() {
				index.current_error_dom = "nick_focus_start";
				index.clearAq();
				$("nick_bg").className = "bg_txt bg_focus";
				index.type == 0 && g_lang == 1 ? index.showTip("nick_info", '请输入昵称<br/><a onclick="index.numberToPhone();" href="javascript:void(0);">试试新功能，让手机号变QQ号！</a>') : index.showTip("nick_info", index.nickE[2]);
				index.current_error_dom = "nick_focus_end"
			});
			$.e.add($("nick"), "blur", function() {
				index.current_error_dom = "nick_blur_start";
				$("nick_bg").className = "bg_txt";
				if (!index.isChangingTab() && (index.hideInfo("nick_info"), index.chkNick())) {
					var a = indexType2RegType(index.type);
					index.ajaxChkNick($("nick").value, a)
				}
				index.reportAq(this);
				index.current_error_dom = "nick_blur_end"
			});
			$.e.add($("nick"), "keyup", function(a) {
				index.current_error_dom = "nick_keyup_start";
				var c = this.value;
				c == "" ? index.showTip("nick_info", index.nickE[2]) : c.trim() == "" ? index.showTip("nick_info", index.nickE[1]) : $.str.getBytes(c) > 24 || index.nickExceed ? ($("nick_info").className = "error", $("nick_info").innerHTML = index.nickE[4]) : index.showTip("nick_info", index.nickE[2]);
				a = a || window.event;
				index.setCode(a.keyCode, 0);
				index.current_error_dom = "nick_keyup_end"
			});
			$.e.add($("nick"), "keydown", function(a) {
				index.current_error_dom = "nick_keydown_start";
				a = a.keyCode;
				index.nickExceed = $.str.getBytes(this.value) == 24 && a != index.keyCode.DEL && a != index.keyCode.BACK ? true : false;
				index.addAq(this.id, a);
				index.current_error_dom = "nick_keydown_end"
			});
			$.e.add($("password"), "focus", function() {
				index.current_error_dom = "password_focus_start";
				index.clearAq();
				index.chkNick();
				$("password_bg").className = "bg_txt bg_focus";
				index.hidePwRank();
				index.pwdTime = new Date;
				index.current_error_dom = "password_focus_end"
			});
			$.e.add($("password"), "blur", function() {
				index.current_error_dom = "password_blur_start";
				index.getPwdTips($("password").value);
				$("password_bg").className = "bg_txt";
				index.pwd_valid ? index.showPwRank() : (index.hidePwRank(), $("password_bg").className = "bg_error");
				index.pwdTimeArray[0] += new Date - index.pwdTime;
				index.reportAq(this);
				index.current_error_dom = "password_blur_end"
			});
			$.e.add($("password"), "keydown", function() {
				index.addAq(this.id, 56)
			});
			$.e.add($("password"), "keyup", function(a) {
				index.getPwdTips($("password").value);
				a = a || window.event;
				index.setCode(a.keyCode, 2);
				index.pwdNum++
			});
			$.e.add($("password_again"), "focus", function() {
				index.clearAq();
				index.current_error_dom = "password_again";
				$("password_again_bg").className = "bg_txt bg_focus";
				index.chkNick();
				index.chkPassword();
				(this.value || this.value !== $("password").value) && index.showTip("password_again_info", index.passAgainE[1])
			});
			$.e.add($("password_again"), "blur", function(a) {
				$("password_again_bg").className = "bg_txt";
				index.chkPasswordAgain();
				a.stopPropagation();
				index.reportAq(this)
			});
			$.e.add($("password_again"), "keyup", function(a) {
				a = a || window.event;
				index.setCode(a.keyCode, 4);
				!this.value && this.value === $("password").value ? ($("password_again_info").className = "ok", $("password_again_info").innerHTML = "") : $("password").value.indexOf(this.value) === 0 || !this.value ? index.showTip("password_again_info", index.passAgainE[1]) : (index.showTip("password_again_info", index.passAgainE[0]), $("password_again_info").className = "error")
			});
			$.e.add($("password_again"), "keydown", function() {
				index.addAq(this.id, 56)
			});
			$.e.add($("sex_1"), "click", function() {
				index.sex = 1;
				$("sex_1").className = "checked_focus";
				$("sex_2").className = "";
				index.chkNick();
				index.chkPassword();
				index.chkPasswordAgain();
				index.chkSex()
			});
			$.e.add($("sex_2"), "click", function() {
				index.sex = 2;
				$("sex_1").className = "";
				$("sex_2").className = "checked_focus";
				index.chkNick();
				index.chkPassword();
				index.chkPasswordAgain();
				index.chkSex()
			});
			$.e.add($("sex_1"), "keydown", function(a) {
				switch (a.keyCode) {
				case index.keyCode.ENTER:
					index.sex = 1, $("sex_1").className = "checked_focus", $("sex_2").className = "", index.chkNick(), index.chkPassword(), index.chkPasswordAgain(), index.chkSex(), a.stopPropagation(), a.preventDefault()
				}
				index.addAq(this.id, a.keyCode)
			});
			$.e.add($("sex_2"), "keydown", function(a) {
				switch (a.keyCode) {
				case index.keyCode.ENTER:
					index.sex = 2, $("sex_2").className = "checked_focus", $("sex_1").className = "", index.chkNick(), index.chkPassword(), index.chkPasswordAgain(), index.chkSex(), a.stopPropagation(), a.preventDefault()
				}
				index.addAq(this.id, a.keyCode)
			});
			$.e.add($("sex_1"), "focus", function() {
				index.clearAq();
				index.current_error_dom = "sex_1";
				index.sex == 1 ? $("sex_1").className = "checked_focus" : $("sex_1").className = "unchecked_focus"
			});
			$.e.add($("sex_1"), "blur", function() {
				index.sex == 1 ? $("sex_1").className = "checked" : $("sex_1").className = "unchecked";
				index.reportAq(this)
			});
			$.e.add($("sex_2"), "focus", function() {
				index.clearAq();
				index.current_error_dom = "sex_2";
				index.sex == 2 ? $("sex_2").className = "checked_focus" : $("sex_2").className = "unchecked_focus"
			});
			$.e.add($("sex_2"), "blur", function() {
				index.sex == 2 ? $("sex_2").className = "checked" : $("sex_2").className = "unchecked";
				index.reportAq(this)
			});
			$.e.add($("code"), "focus", function() {
				index.current_error_dom = "code_focus_start";
				index.clearAq();
				index.chkNick();
				index.chkPassword();
				index.chkPasswordAgain();
				index.chkSex();
				index.chkBirthday();
				index.chkArea();
				this.className = "code_ipt focus";
				index.hideInfo("code_info_err");
				$("code_info_err").className = "tips";
				$("code_info_err").innerHTML = index.codeE[1];
				index.current_error_dom = "code_focus_end"
			});
			$.e.add($("code"), "blur", function() {
				index.current_error_dom = "code_blur_start";
				this.className = "code_ipt";
				index.chkCode();
				index.reportAq(this);
				index.current_error_dom = "code_blur_end"
			});
			$.e.add($("code"), "keydown", function(a) {
				index.current_error_dom = "code_keydown_start";
				index.hideInfo("code_info_err");
				index.addAq(this.id, a.keyCode);
				index.current_error_dom = "code_keydown_end"
			});
			g.component.qzone && ($.e.add($("qzone"), "click", function() {
				index.qzone = !index.qzone;
				this.className = index.qzone ? "checked_focus" : "unchecked_focus";
				index.qzone ? index.showItem(2) : index.hideItem(2)
			}), $.e.add($("qzone"), "keydown", function(a) {
				if (a.keyCode == index.keyCode.ENTER) index.qzone = !index.qzone, this.className = index.qzone ? "checked_focus" : "unchecked_focus", index.qzone ? index.showItem(2) : index.hideItem(2), a.stopPropagation(), a.preventDefault()
			}), $.e.add($("qzone"), "focus", function() {
				index.current_error_dom = "qzone";
				this.className = index.qzone ? "checked_focus" : "unchecked_focus"
			}), $.e.add($("qzone"), "blur", function() {
				this.className = index.qzone ? "checked" : "unchecked"
			}));
			$.e.add($("nav_1"), "click", function() {
				index.needShowError[2] = 0;
				index.changeTab(0);
				index.changeInit();
				index.numRegReport();
				index.phone_to("phone_to_number");
				index.email_to("email_to_number")
			});
			$.e.add($("nav_2"), "click", function() {
				index.needShowError[0] = 0;
				index.changeTab(2);
				index.changeInit();
				index.mailRegReport(2);
				index.phone_to("phone_to_mail");
				index.number_to("number_to_mail")
			});
			$("nav_3") && $.e.add($("nav_3"), "click", function() {
				index.changeTab(3);
				$("sea_phone").style.display = "none";
				index.isSeaPhone = false;
				index.initPhoneArea();
				index.changeInit();
				index.phoneRegReport();
				index.email_to("email_to_phone");
				index.number_to("number_to_phone")
			});
			$.e.add($("agree"), "click", function() {
				index.agreed = !index.agreed;
				this.className = index.agreed ? "a_1 checked_focus" : "a_1 unchecked_focus";
				var a = $("submit");
				index.agreed ? (a.className = "", a.disabled = "", a.title = index.submitE[1]) : (a.className = "disabled", a.disabled = "disabled", a.title = index.submitE[0])
			});
			$.e.add($("agree"), "keydown", function(a) {
				if (a.keyCode == index.keyCode.ENTER) {
					index.agreed = !index.agreed;
					this.className = index.agreed ? "a_1 checked_focus" : "a_1 unchecked_focus";
					var c = $("submit");
					index.agreed ? (c.className = "", c.disabled = "", c.title = index.submitE[1]) : (c.className = "disabled", c.disabled = "disabled", c.title = index.submitE[0]);
					a.stopPropagation();
					a.preventDefault()
				}
			});
			$.e.add($("agree"), "focus", function() {
				index.current_error_dom = "agree";
				this.className = index.agreed ? "a_1 checked_focus" : "a_1 unchecked_focus"
			});
			$.e.add($("agree"), "blur", function() {
				this.className = index.agreed ? "a_1 checked" : "a_1 unchecked"
			});
			$.e.add($("x_switcher"), "click", function(a) {
				index.switchProvision(a)
			});
			$.e.add(document.body, "click", function() {
				index.hideProvision();
				index.hideCountry();
				index.hideProvince();
				index.hideCity();
				index.hideType();
				index.hideBirtydayType();
				index.hideYear();
				index.hideMonth();
				index.hideDay();
				index.hideEmailTips()
			});

			$.e.add($("email_code_ipt"), "keydown", function() {
				index.current_error_dom = "display_1";
				$("email_code_ipt_err").innerHTML = "";
				$("email_code_ipt_err").style.display = "none"
			});
			$.e.add($("email_code_ipt"), "blur", function() {
				index.chkEmailCode()
			});
			window.setTimeout(index.reportSource, 300);
			$.e.add($("email_1"), "click", function() {
				index.changeInit()
			});
			$.e.add($("email_2"), "click", function() {
				index.changeInit()
			});
			$.css.hasClass($("nav_1"), "cur") && index.numRegReport();
			$.e.add($("email_info"), "click", function() {
				index.changeMethod(1)
			});
			$.e.add($("email_info"), "mouseover", function() {
				this.setAttribute("_hover", "over")
			});
			$.e.add($("email_info"), "mouseout", function() {
				this.removeAttribute("_hover")
			});
			index.current_error_dom = "init_bindEvent_end";
			index.type == 0 ? ($("email_box").className = "hide", index.iptFocus("nick")) : index.type == 3 ? ($("email_box").className = "hide", index.iptFocus("phone_num"), index.phoneRegReport(3), $("phone_num_bg").className = "bg_txt bg_focus", index.showTip("phone_info", index.phoneE[0])) : index.type == 2 ? (index.changeMethod(2), $("email_box").className = "", index.iptFocus("other_email"), index.mailRegReport(2)) : (index.changeMethod(1), $("email_box").className = "", index.iptFocus("self_email"), index.mailRegReport(1));
			index.inited = true;
			index.bindEmailTipsEvent();
			index.bindInputSearchEvent();
			index.bind_sea_phone_event();
			$.http.jsonp("http://a.zc.qq.com/s.js?t=" + Math.random());
			index.current_error_dom = "init_end"
		}
	},
	chkSex: function() {
		$("sex_info").className = "info"
	},
	preCheckOtherEmail: function() {
		function a(a) {
			$("email_info").className = "error";
			$("other_email_bg").className = "bg_error";
			$("email_info").innerHTML = index.otherEmailE[a]
		}
		var b = $("other_email").value;
		if (!b) return a(0), false;
		if (!index.emailReg.test(b)) return a(2), false;
		if (/[\.@]foxmail.com$/i.test(b)) return a(5), false;
		return /[\.@]qq.com$/i.test(b) ? (a(6), false) : true
	},
	chkEmailCode: function() {
		var a = $("email_code_ipt").value;
		index.current_error_dom = "display_2";
		if (a == "") $("email_code_ipt_err").innerHTML = index.codeE[3], $("email_code_ipt_err").style.display = "inline-block";
		else if (a.length < 4) $("email_code_ipt_err").innerHTML = index.codeE[2], $("email_code_ipt_err").style.display = "inline-block";
		else return $("email_code_ipt_err").innerHTML = "", $("email_code_ipt_err").style.display = "none", a;
		return false
	},
	ajaxChkEmail: function(a, b, c) {
		if (!a) {
			var d = index.chkEmailCode();
			if (!d) {
				try {
					$("email_code_ipt").select(), $("email_code_ipt").focus()
				} catch (e) {}
				return
			}
			a = index.ajaxChkEmail.url + "&verifycode=" + d;
			b = index.ajaxChkEmail.isOther;
			c = index.ajaxChkEmail.str
		}
		$.get(a, null, function(d) {
			index.hideEmailCode.needChange = false;
			switch (d.ec) {
			case 0:
				$("email_info").className = "ok";
				$("email_info").innerHTML = index.type == 1 ? index.otherEmailE[3] : "";
				b ? (index.otherEmail = c, $("other_email_bg").className = "bg_txt") : (index.selfEmail = c, $("self_email").className = "txt");
				index.hideEmailCode();
				break;
			case 2:
				$("email_code_img").src = index.codeUrl + "?r=" + Math.random();
				try {
					$("email_code_ipt").focus(), $("email_code_ipt").select()
				} catch (e) {}
				index.current_error_dom = "display_3";
				$("email_code_ipt_err").innerHTML = index.codeE[0];
				$("email_code_ipt_err").style.display = "inline-block";
				index.hideEmailCode.needChange = true;
				break;
			case 7:
				$("email_info").className = "error";
				$("email_info").innerHTML = index.otherEmailE[2];
				index.hideEmailCode();
				break;
			case 8:
			case 9:
				$("email_info").className = "error";
				$("email_info").innerHTML = index.otherEmailE[1];
				b ? $("other_email_bg").className = "bg_error" : $("self_email").className = "self_email_bg_error";
				index.pushAlreadyUsedEmails(c);
				index.hideEmailCode();
				break;
			case 12:
				index.showEmailCode();
				index.ajaxChkEmail.url = a;
				index.ajaxChkEmail.isOther = b;
				index.ajaxChkEmail.str = c;
				break;
			default:
				$("email_info").className = "error", $("email_info").innerHTML = index.otherEmailE[1], index.hideEmailCode()
			}
			if (d.ec !== 0) index.otherEmail = "", index.selfEmail = ""
		});
		$("code_img").src = index.codeUrl + "&r=" + Math.random()
	},
	preCheckSelfEmail: function() {
		function a(a) {
			index.chkSelfEMail.id = a;
			$("email_info").className = "error";
			$("self_email").className = "self_email_bg_error";
			$("email_info").innerHTML = index.selfEmailE[index.chkSelfEMail.id]
		}
		var b = $("self_email").value;
		if (!b) return a(0), false;
		if (b.length < 3) return a(1), false;
		if (/^\d+$/.test(b)) return a(2), false;
		if (/^[^a-z]+/i.test(b)) return a(3), false;
		if (/[^a-z0-9_.-]/i.test(b)) return a(4), false;
		if (/[._-]{2,}/.test(b)) return a(5), false;
		if (/[^A-Za-z0-9]+$/.test(b)) return a(6), false;
		return index.emailHasAlreadyUsed(b) ? ($("email_info").className = "error", $("email_info").innerHTML = index.otherEmailE[1], false) : true
	},
	chkSelfEMail: function() {
		if (index.type == 1 && index.preCheckSelfEmail()) {
			var a = $("self_email").value,
				b = index.host + index.selfChkUrl + "?email=" + a + (index.selfType == 0 ? "@qq.com" : "@foxmail.com") + "&r=" + Math.random();
			index.ajaxChkEmail(b, false, a)
		}
	},
	ajaxChkNick: function(a, b) {
		var c = encodeURIComponent(a),
			c = index.nickChkUrl + "?nick=" + c + "&regType=" + b + "&r=" + Math.random();
		$.get(c, null, function(b) {
			if (b) switch (b.ec) {
			case 0:
				$("nick_info").className = "ok";
				$("nick_info").innerHTML = index.nickE[3];
				index.checkNickMap[a] = 0;
				break;
			case 15:
				$("nick_info").className = "error", $("nick_info").innerHTML = index.nickE[5], index.checkNickMap[a] = 1
			}
		})
	},
	chkNick: function() {
		var a = $("nick").value;
		if (!a) return $("nick_info").className = "error", $("nick_bg").className = "bg_error", $("nick_info").innerHTML = index.nickE[0], false;
		if (!a.trim()) return $("nick_info").className = "error", $("nick_bg").className = "bg_error", $("nick_info").innerHTML = index.nickE[1], false;
		if ($.str.getBytes(a) > 24) return $("nick_info").className = "error", $("nick_bg").className = "bg_error", $("nick_info").innerHTML = index.nickE[4], false;
		if (index.checkNickMap[a] === 1) return $("nick_info").className = "error", $("nick_bg").className = "bg_error", $("nick_info").innerHTML = index.nickE[5], false;
		if (index.checkNickMap[a] === 0) $("nick_info").className = "ok", $("nick_info").innerHTML = index.nickE[3];
		return true
	},
	ajaxChkPhone: function(a) {
		var a = encodeURIComponent(a),
			b = index.phoneChkUrl + "?telphone=" + a + "&r=" + Math.random();
		$.get(b, null, function(b) {
			if (b) switch (b.ec) {
			case 0:
				$("phone_info").className = "ok";
				$("phone_num_bg").className = "bg_txt";
				$("phone_info").innerHTML = "";
				index.checkPhoneMap[a] = 0;
				break;
			case 4:
			case 31:
				$("phone_info").className = "error";
				$("phone_num_bg").className = "bg_error";
				$("phone_info").innerHTML = index.phoneE[1];
				index.checkPhoneMap[a] = 1;
				break;
			default:
				index.checkPhoneMap[a] = 0
			}
		})
	},
	chkPhoneNum: function() {
		var a = $("phone_num").value,
			b = $.html.decode($("sea_country_input").value);
		if (b = b.match(/[\w\W]+(00[\d]+)/)) b = b[1];
		else return false;
		index.phoneArea = b;
		index.phoneSubmit = index.phoneArea == "0086" ? a : b + a;
		if (!a) return $("phone_info").className = "error", $("phone_num_bg").className = "bg_error", $("phone_info").innerHTML = index.phoneE[2], false;
		if (!a.trim()) return $("phone_info").className = "error", $("phone_num_bg").className = "bg_error", $("phone_info").innerHTML = index.phoneE[3], false;
		if (!isRegValidPhone(index.phoneSubmit)) return $("phone_info").className = "error", $("phone_num_bg").className = "bg_error", $("phone_info").innerHTML = index.phoneE[1], false;
		if (index.checkPhoneMap[index.phoneSubmit] === 1) return $("phone_info").className = "error", $("phone_num_bg").className = "bg_error", $("phone_info").innerHTML = index.phoneE[1], false;
		if (index.checkPhoneMap[index.phoneSubmit] === 0) return $("phone_info").className = "ok", $("phone_num_bg").className = "bg_txt", $("phone_info").innerHTML = "", true;
		index.checkPhoneMap[index.phoneSubmit] === void 0 && index.ajaxChkPhone(index.phoneSubmit);
		return true
	},
	isValidPhone: function() {
		return index.checkPhoneMap[index.phoneSubmit] === 0
	},
	chkPassword: function() {
		index.pwd_valid && index.showPwRank();
		return index.pwd_valid
	},
	getPwdTips: function(a) {
		var b = true;
		a == "" ? ($("pwd_tip1").className = "default", $("pwd_tip2").className = "default", $("pwd_tip3").className = "default", b = false) : (a.length >= index.minPwdLen && a.length <= index.maxPwdLen ? $("pwd_tip1").className = "yes" : ($("pwd_tip1").className = "no red", b = false), /^\d{1,8}$/.test(a) ? ($("pwd_tip2").className = "no red", b = false) : $("pwd_tip2").className = "yes", /\s/.test(a) ? ($("pwd_tip3").className = "no red", b = false) : $("pwd_tip3").className = "yes");
		return index.pwd_valid = b
	},
	chkPasswordAgain: function() {
		var a = $("password").value,
			b = $("password_again").value;
		$("password_again_info").className = "error";
		if (!b) return $("password_again_info").innerHTML = index.passAgainE[1], $("password_again_bg").className = "bg_error", false;
		if (b !== a) return $("password_again_info").innerHTML = index.passAgainE[0], $("password_again_bg").className = "bg_error", false;
		if (a.length <= index.maxPwdLen && a.length >= index.minPwdLen && !/^\d{1,8}$/.test(a)) return $("password_again_info").className = "ok", $("password_again_info").innerHTML = "", true;
		index.hideInfo("password_again_info");
		return true
	},
	chkOtherEMail: function() {
		if (index.type == 2 && index.preCheckOtherEmail()) {
			var a = $("other_email").value,
				b = index.host + index.otherChkUrl + "?other_email=" + a + "&r=" + Math.random();
			index.ajaxChkEmail(b, true, a)
		}
	},
	chkBirthday: function() {
		if (index.birthType == "" || index.year == "" || index.month == "" || index.day == "") {
			$("birthday_info").className = "error";
			$("birthday_info").innerHTML = index.birthdayE[0];
			if (index.year == "") $("year_bg").className = "year_bg_error";
			if (index.month == "") $("month_value").className = "month_day_bg_error";
			if (index.day == "") $("day_value").className = "month_day_bg_error";
			return false
		} else return index.showBirthdayInfo(), true
	},
	chkArea: function() {
		return index.country == index.noAreaStr ? ($("area_info").className = "error", $("area_info").innerHTML = index.areaE[0], false) : index.country == "1" ? index.province == index.noAreaStr ? ($("area_info").className = "error", $("area_info").innerHTML = index.areaE[0], false) : ($("area_info").className = "ok", $("area_info").innerHTML = "", true) : ($("area_info").className = "ok", $("area_info").innerHTML = "", true)
	},
	chkCode: function() {
		if (index.initInfo && (index.initInfo.elevel == "1" || index.initInfo.elevel == "2")) {
			var a = $("code").value;
			if (a.length < 4) return $("code_info_err").className = "", $("code").className = "code_ipt_error", $("code_info_err").innerHTML = index.codeE[!a ? 3 : 2], false;
			else $("code_info_err").className = "tips", $("code_info_err").innerHTML = "&nbsp"
		}
		return true
	},
	chkAgree: function() {
		return index.agreed
	},
	changeCode: function() {
		$("code_img").src = index.codeUrl + "&r=" + Math.random();
		$("code").value = "";
		try {
			$("code").focus()
		} catch (a) {}
		index.setCode(null, 6)
	},
	changeEmailCode: function() {
		$("email_code_img").src = index.codeUrl + "&r=" + Math.random();
		$("email_code_ipt").value = "";
		try {
			$("email_code_ipt").focus()
		} catch (a) {}
	},
	hideInfo: function(a) {
		$.css.addClass($(a), "hidden")
	},
	showTip: function(a, b) {
		$(a).innerHTML = b;
		$(a).className = "tip"
	},
	changeTab: function(a) {
		$.winName.set("type", a);
		index.type = a;
		$("email_box").className = a != 2 && a != 1 ? "hide" : "";
		$("phone_box").className = a != 3 ? "hide" : "phone_box_land";
		if ($("switcher")) $("switcher").className = a == 3 ? "hide" : "normal";
		$("nav_1").className = a == 0 ? "nav_box cur" : "nav_box";
		$("nav_2").className = a == 1 || a == 2 ? "nav_box cur" : "nav_box";
		if ($("nav_3")) $("nav_3").className = a == 3 ? "nav_box cur" : "nav_box";
		if (g.component.qzone) $("qzone_box").className = a != 2 && a != 1 ? "box box_10" : "hide";
		a == 0 ? ($.css.removeClass($("phone_quick"), "hidden"), window.setTimeout(function() {
			try {
				$("nick").focus(), $("nick").select()
			} catch (a) {}
		}, 0), g.component.qzone && (index.qzone ? index.showItem(2) : index.hideItem(2))) : a == 2 ? ($.css.removeClass($("phone_quick"), "hidden"), index.changeMethod(2), index.hideItem(2), index.hideInfo("nick_info"), window.setTimeout(function() {
			try {
				$("other_email").focus(), $("other_email").select()
			} catch (a) {}
		}, 0)) : a == 3 && ($.css.addClass($("phone_quick"), "hidden"), index.hideInfo("nick_info"), window.setTimeout(function() {
			try {
				$("phone_num").focus(), $("phone_num").select()
			} catch (a) {}
		}, 0))
	},
	hideItem: function(a) {
		if (a = $("item_" + a)) index.current_error_dom = "display_4", a.style.display = "none"
	},
	showItem: function(a) {
		index.current_error_dom = "display_5";
		if (a) {
			if (a = $("item_" + a)) a.style.display = "inline"
		} else for (var b = 1; b <= index.totol; b++)
		if (a = $("item_" + b)) a.style.display = "inline"
	},
	changeMethod: function(a) {
		switch (a - 0) {
		case 1:
			$("mail_box").className = "ipt_box nobg self";
			index.iptFocus("self_email");
			break;
		case 2:
			$("mail_box").className = "ipt_box nobg other";
			index.iptFocus("other_email");
			break;
		case 3:
			$("phone_box").className = "phone_box_land";
			index.iptFocus("phone_num");
			break;
		case 4:
			$("phone_box").className = "phone_box_sea"
		}
		a == 4 && (a = 3);
		$.winName.set("type", a);
		index.type = a
	},
	changeQzone: function() {},
	agree: function(a) {
		index.agreed = !index.agreed;
		a.className = index.agreed ? "a_1 checked" : "a_1"
	},
	switchProvision: function(a) {
		index.showing = !index.showing;
		$("x_box").className = index.showing ? "x_box show" : "x_box";
		a.stopPropagation()
	},
	hideProvision: function() {
		index.showing = false;
		$("x_box").className = "x_box"
	},
	submit: function() {
		index.current_error_dom = "submit_start";
		isd_t.push(new Date - 0);
		var a = index.chkAgree(),
			a = index.chkCode() && a,
			a = index.chkBirthday() && a,
			a = index.chkArea() && a,
			a = index.chkPassword() && a,
			a = index.chkPasswordAgain() && a,
			a = index.chkNick() && a;
		index.type == 1 && !index.preCheckSelfEmail() ? a = false : index.type == 2 && !index.preCheckOtherEmail() ? a = false : index.type == 3 && (index.chkPhoneNum(), a = isRegValidPhone(index.phoneSubmit) && a);
		if (a) {
			index.type == 3 && $.report.monitor("phoneRegSubmitBtn");
			index.initIndexType == 0 && g_lang == 1 && (index.number_to("number_to_submit"), $.report.monitor("init_number_to_submit"));
			index.initIndexType == 2 && g_lang == 1 && (index.email_to("email_to_submit"), $.report.monitor("init_email_to_submit"));
			index.initIndexType == 3 && g_lang == 1 && (index.phone_to("phone_to_submit"), $.report.monitor("init_phone_to_submit"));
			$.winName.set("fromId", index.fromId);
			index.setCodeCookie();
			a = "";
			index.birthType == 1 && (a = calendar.getDate(parseInt(index.year), parseInt(index.month), parseInt(index.day), 1, parseInt(index.isLeap)));
			var b = {
				verifycode: $("code").value,
				qzone_flag: (index.type == 0 || index.type == 3) && index.qzone ? 1 : 0,
				country: index.country,
				province: index.province,
				city: index.city,
				isnongli: index.birthType,
				year: index.year,
				month: index.month,
				day: index.day,
				isrunyue: index.isLeap == "1" ? 0 : 1,
				password: index.rsaEncrypt($("password").value),
				nick: $("nick").value,
				email: index.type == 1 && $("self_email").value + (index.selfType == 0 ? "@qq.com" : "@foxmail.com"),
				other_email: index.type == 2 && $("other_email").value,
				elevel: index.initInfo.elevel,
				sex: index.sex,
				qzdate: a,
				jumpfrom: index.fromId
			};
			if (index.type == 3) b.telphone = index.phoneSubmit;
			b.nick = encodeURIComponent(b.nick);
			b.password = encodeURIComponent(b.password);
			b.email = encodeURIComponent(b.email);
			b.other_email = encodeURIComponent(b.other_email);
			b.csloginstatus = g.getQQnum();
			if (index.ptlang) b.ptlang = index.ptlang;
			if (index.ADUIN) b.ADUIN = index.ADUIN;
			if (index.ADSESSION) b.ADSESSION = index.ADSESSION;
			for (var c in index.aq_object)
			b[c] = index.aq_object[c];
			$.post(index.getSubmitUrl(), b, function(a) {
				index.current_error_dom = "submit_cgi_start";
				if (a) switch (isd_t.push(new Date - 0), $.report.isd(isd_t), $.cookie.set("index_ec", a.ec, "zc.qq.com", "/", 0.5), a.ec) {
				case 0:
					$.winName.set("temp_last_send", 0);
					$.winName.set("gurad_phone", "");
					$.cookie.set("nick", b.nick, "zc.qq.com", "/", 0.5);
					$.winName.set("_new_uin", a.uin);
					var c = index.getPwdRank($("password").value);
					index.pwdTimeArray[c] = index.pwdNum * 1E3;
					switch (c) {
					case 1:
						$.report.monitor("weakPwd");
						break;
					case 2:
						$.report.monitor("midPwd");
						break;
					case 3:
						$.report.monitor("strongPwd")
					}
					$.report.isdPwdTime(index.pwdTimeArray);
					switch (parseInt(index.type)) {
					case 0:
						$.winName.set("last_page", 1);
						if (g_lang === 1 && Math.floor(Math.random() * index.max_selective_rate) < index.selective_rate) {
							var f, a = [];
							for (f in b)
							$.winName.set("user_" + f, b[f]), a.push(f);
							$.report.monitor("QQHuiyuan");
							$.winName.set("user_attrs", a.join(","));
							window.location = index.selective_decimal_ok
						} else $.winName.set("phone_flag", 0), window.location = index.decimal_ok;
						break;
					case 1:
						$.winName.set("_email", a.email);
						$.winName.set("last_page", 1);
						window.location = index.email_ok;
						break;
					case 2:
						window.location = index.send_ok
					}
					break;
				case 2:
					$("code_info_err").className = "";
					$("code_info_err").innerHTML = index.codeE[0];
					index.changeCode();
					$("code").blur();
					index.code = "";
					break;
				case 31:
					$("phone_info").className = "error";
					$("phone_num_bg").className = "bg_error";
					$("phone_info").innerHTML = index.phoneE[1];
					break;
				case 5:
					$("birthday_info").className = "error";
					$("birthday_info").innerHTML = index.birthE[1];
					break;
				case 8:
				case 9:
					$("email_info").className = "error";
					$("email_info").innerHTML = index.otherEmailE[1];
					index.hideEmailCode();
					break;
				case 13:
				case 15:
					$("nick_info").className = "error";
					$("nick_info").innerHTML = index.nickE[5];
					break;
				case 20:
					index.setParam(encodeURIComponent(index.json2str(b)));
					index.type == 3 && ($.winName.set("temp_cellphone", b.telphone), $.winName.set("phoneArea", index.phoneArea));
					$.winName.set("last_page", 1);
					window.location = "phone_verify.html?type=" + index.type;
					break;
				case 26:
					index.setParam(encodeURIComponent(index.json2str(b)));
					index.type == 3 && $.winName.set("temp_cellphone", b.telphone);
					$.winName.set("last_page", 1);
					window.location = "phone_verify_up.html?type=" + index.type;
					break;
				case 21:
					window.location = "worst.html?ec=21";
					break;
				case 30:
					window.location = "worst.html?ec=30";
					break;
				case 32:
					window.location = "phone_tianyi.html?type=" + index.type;
					break;
				case 33:
					$.winName.set("olduin", a.olduin);
					window.location = "phone_hasbind.html?type=" + index.type;
					break;
				default:
					window.location = "error.html?ec=" + a.ec
				}
				index.current_error_dom = "submit_cgi_end"
			})
		}
		$.report.monitor("submit", {
			regType: index.type
		});
		index.current_error_dom = "submit_end";
		return false
	},
	searchArea: function(a) {
		a = !a ? "" : a;
		window._areaList || (_areaList = [{
			c: "0086",
			n: "中国",
			p: "zhongguo"
		}, {
			c: "00852",
			n: "中国香港特别行政区",
			p: "zhongguoxianggangtebiehangzhengqu"
		}, {
			c: "00853",
			n: "中国澳门特别行政区",
			p: "zhongguoaomentebiehangzhengqu"
		}, {
			c: "00886",
			n: "台湾",
			p: "taiwan"
		}]);
		for (var b = _areaList, c = [], d = a.split(""), d = d.join("[\\w\\W]{0,}"), e = 0, f = b.length; e < f; e++) {
			var h = b[e].n + " " + b[e].c,
				i = b[e].p,
				k = RegExp(d, "i");
			if (!a || k.test(h) || k.test(i)) i = {}, i.name = h, i.value = h, c.push(i)
		}
		return c
	},
	initPhoneArea: function() {
		var a = index.searchArea(""),
			b = $.winName.get("phoneArea");
		if ($.winName.get("phonereg_fillvalues") == 1 && b && isGanAoTaiPhone(b)) index.phoneArea_autocomplete.initList(a, b), index.phoneArea = b, index.seaPhone(), $.winName.set("phoneArea", ""), $("phone_num").value = $.winName.get("temp_cellphone").substr(5);
		else if (index.phoneArea_autocomplete.initList(a), index.phoneArea_autocomplete.setDefaultValue(a[0]), index.phoneArea = a[0].c, $.winName.get("phonereg_fillvalues") == 1) $("phone_num").value = $.winName.get("temp_cellphone")
	},
	bind_sea_phone_event: function() {
		var a = $("sea_country_input"),
			b = $("sea_country_box");
		index.phoneArea_autocomplete = $.autocomplete();
		index.phoneArea_autocomplete.init({
			domAppendTo: b,
			domInput: a,
			comboxModel: 2,
			inputSelect: true,
			preventTabDefault: true,
			keyupCallback: function(a) {
				a = index.searchArea(a);
				index.phoneArea_autocomplete.show(a)
			},
			changeCallback: function() {
				try {
					$("phone_num").focus()
				} catch (a) {}
			}
		});
		index.initPhoneArea();
		$.e.add(a, "focus", function() {
			this.parentNode.className = "sea_area_value_bg_focus"
		});
		$.e.add(a, "blur", function() {
			this.parentNode.className = "sea_area_value_bg"
		})
	},
	loadLocation: function(a) {
		index.location = a;
		$("country_box");
		var b = $("country_value"),
			c = $("country_ul");
		$("province_box");
		var d = $("province_value"),
			e = $("province_ul"),
			f = $("city_value"),
			h = $("city_ul");
		$("city_box");
		index.changeCountry();
		if ($.winName.get("phonereg_fillvalues") == 1) {
			a = index.getParam();
			$("nick").value = a.nick;
			if (a.sex == 1) index.sex = 1, $("sex_1").className = "checked_focus", $("sex_2").className = "";
			else if (a.sex == 2) index.sex = 2, $("sex_1").className = "", $("sex_2").className = "checked_focus";
			index.setLocation(a);
			index.locationSet && index.birthdaySet && $.winName.set("phonereg_fillvalues", 0)
		}
		$.e.add(b, "click", function(a) {
			index.hideProvince();
			index.hideCity();
			index.hideBirtydayType();
			index.hideYear();
			index.hideMonth();
			index.hideDay();
			a.stopPropagation();
			index.selectListState[4] && (index.changeCountry(), index.selectListState[4] = 0);
			index.switchCountry()
		});
		$.e.add(c, "click", function(a) {
			var c = a.target;
			if (c.nodeName.toLowerCase() != "li") a.stopPropagation();
			else {
				var d = index.country,
					e = c.getAttribute("value");
				index.country = e;
				c = $.html.decode(c.innerHTML);
				c.length > 6 ? ($("country_value").title = c, $("country_value").value = index.isEnglishWord(c) ? c.substring(0, 12) : c.substring(0, 6)) : ($("country_value").title = "", $("country_value").value = c);
				index.selectHasSelected[4] = true;
				index.hideCountry();
				a.stopPropagation();
				d != index.country && (index.changeProvince(), index.changeCity());
				index.updateSelectListIndex(4, index.listIndex[4]);
				try {
					b.focus()
				} catch (f) {}
			}
		});
		$.e.add(c, "mousemove", function(a) {
			var b = a.target;
			if (b.tagName.toLowerCase() == "li") {
				var c = $("country_" + index.listIndex[4]);
				if (c) c.className = "";
				b.className = "hover";
				index.listIndex[4] = index.getIndexFromId(b.getAttribute("id"));
				a.stopPropagation()
			}
		});
		$.e.add(c, "mouseout", function(a) {
			if (a.target.tagName.toLowerCase() == "li") a.target.className = "", a.stopPropagation()
		});
		index.province != index.noAreaStr && index.changeProvince(index.province);
		$.e.add(d, "click", function(a) {
			index.hideCountry();
			index.hideCity();
			index.hideBirtydayType();
			index.hideYear();
			index.hideMonth();
			index.hideDay();
			a.stopPropagation();
			d.className.indexOf("hide") > -1 || (index.selectListState[5] && (index.changeProvince(null, true), index.selectListState[5] = 0), index.switchProvince())
		});
		$.e.add(e, "click", function(a) {
			var b = a.target;
			if (b.nodeName.toLowerCase() != "li") a.stopPropagation();
			else {
				var c = index.province,
					e = b.getAttribute("value");
				index.province = e;
				b = $.html.decode(b.innerHTML);
				b.length > 6 ? ($("province_value").title = b, $("province_value").value = index.isEnglishWord(b) ? b.substring(0, 12) : namprovinceNamee.substring(0, 6)) : ($("province_value").title = "", $("province_value").value = b);
				index.selectHasSelected[5] = true;
				index.hideProvince();
				a.stopPropagation();
				c != index.province && index.changeCity();
				index.updateSelectListIndex(5, index.listIndex[5]);
				try {
					d.focus()
				} catch (f) {}
			}
		});
		$.e.add(e, "mousemove", function(a) {
			var b = a.target;
			if (b.tagName.toLowerCase() == "li") {
				var c = $("province_" + index.listIndex[5]);
				if (c) c.className = "";
				b.className = "hover";
				index.listIndex[5] = index.getIndexFromId(b.getAttribute("id"));
				a.stopPropagation()
			}
		});
		$.e.add(e, "mouseout", function(a) {
			if (a.target.tagName.toLowerCase() == "li") a.target.className = "", a.stopPropagation()
		});
		index.city != index.noAreaStr && index.changeCity(index.city);
		$.e.add(f, "click", function(a) {
			index.hideCountry();
			index.hideProvince();
			index.hideBirtydayType();
			index.hideYear();
			index.hideMonth();
			index.hideDay();
			a.stopPropagation();
			f.className.indexOf("hide") > -1 || (index.selectListState[6] && (index.changeCity(null, true), index.selectListState[6] = 0), index.switchCity())
		});
		$.e.add(h, "click", function(a) {
			var b = a.target;
			if (b.nodeName.toLowerCase() != "li") a.stopPropagation();
			else {
				var c = b.getAttribute("value");
				index.city = c;
				b = $.html.decode(b.innerHTML);
				b.length > 6 ? ($("city_value").title = b, $("city_value").value = index.isEnglishWord(b) ? b.substring(0, 12) : b.substring(0, 6)) : ($("city_value").title = "", $("city_value").value = b);
				index.selectHasSelected[6] = true;
				index.hideCity();
				a.stopPropagation();
				index.updateSelectListIndex(6, index.listIndex[6]);
				try {
					f.focus()
				} catch (d) {}
			}
		});
		$.e.add(h, "mousemove", function(a) {
			var b = a.target;
			if (b.tagName.toLowerCase() == "li") {
				var c = $("city_" + index.listIndex[6]);
				if (c) c.className = "";
				b.className = "hover";
				index.listIndex[6] = index.getIndexFromId(b.getAttribute("id"));
				a.stopPropagation()
			}
		});
		$.e.add(h, "mouseout", function(a) {
			if (a.target.tagName.toLowerCase() == "li") a.target.className = "", a.stopPropagation()
		});
		$.e.add(b, "keydown", function(a) {
			index.moveList(b, c, a, 4);
			index.addAq(this.id, a.keyCode)
		});
		$.e.add(d, "keydown", function(a) {
			index.moveList(d, e, a, 5);
			index.addAq(this.id, a.keyCode)
		});
		$.e.add(f, "keydown", function(a) {
			index.moveList(f, h, a, 6);
			index.addAq(this.id, a.keyCode)
		});
		$.e.add(b, "focus", function() {
			index.clearAq();
			index.current_error_dom = "country_value";
			$("country_value_bg").className = "area_value_bg_focus";
			window.setTimeout(function() {
				b.select()
			}, 100)
		});
		$.e.add(b, "blur", function() {
			$("country_value_bg").className = "area_value_bg";
			var a = index.country;
			index.selectHasSelected[4] || (index.setSelectBlurValue(c, b, 4), a != index.country && (index.changeProvince(), index.changeCity()));
			window.clearTimeout(index.searchTimeoutId[4]);
			index.hideInputSearchTips();
			index.chkArea();
			index.reportAq(this)
		});
		$.e.add(d, "focus", function() {
			index.clearAq();
			index.current_error_dom = "province_value";
			$("province_value_bg").className = "area_value_bg_focus";
			window.setTimeout(function() {
				d.select()
			}, 100)
		});
		$.e.add(d, "blur", function() {
			index.chkArea();
			$("province_value_bg").className = "area_value_bg";
			var a = index.province;
			index.selectHasSelected[5] || (index.setSelectBlurValue(e, d, 5), a != index.province && index.changeCity());
			window.clearTimeout(index.searchTimeoutId[5]);
			index.hideInputSearchTips();
			index.reportAq(this)
		});
		$.e.add(f, "focus", function() {
			index.clearAq();
			index.current_error_dom = "city_value";
			$("city_value_bg").className = "area_value_bg_focus";
			window.setTimeout(function() {
				f.select()
			}, 100)
		});
		$.e.add(f, "blur", function() {
			index.chkArea();
			$("city_value_bg").className = "area_value_bg";
			index.selectHasSelected[6] || index.setSelectBlurValue(h, f, 6);
			window.clearTimeout(index.searchTimeoutId[6]);
			index.hideInputSearchTips();
			index.reportAq(this)
		});
		index.bindTimeSearchEvent();
		index.bindAreaSearchEvent()
	},
	switchType: function() {
		index.switchType.showing ? ($("selfTypeBox").className = "hide", index.switchType.showing = false) : ($("selfTypeBox").className = "", index.switchType.showing = true)
	},
	hideType: function() {
		$("selfTypeBox").className = "hide";
		index.switchType.showing = false
	},
	changeCountry: function() {
		var a = $("country_ul"),
			b = "",
			b = "",
			c = 0,
			d = index.location,
			e;
		for (e in d)
		e == index.country && index.updateListIndex(4, c), d[e].n && d[e].n != "0" && (b += '<li value="' + e + '" id=' + ("country_" + c) + ">" + d[e].n + "</li>", c++);
		c == 0 && index.updateListIndex(4, -1);
		a.innerHTML = b
	},
	changeProvince: function(a, b) {
		if (index.country == index.noAreaStr) return $("province_ul").innerHTML = "", index.updateListIndex(5, -1), false;
		var c = index.location[index.country],
			d = "",
			e = "";
		if (!index.country || c["0"]) index.province = index.noAreaStr, $("province_value").className = "hide", $("province_ul").className = "hide", $("province_ul").innerHTML = "", $("province_box").className = "disable_box";
		else {
			$("province_value").className = "province_value";
			if (a) d = c[a] ? c[a].n : "", index.province = a;
			var f = 0,
				h;
			for (h in c)
			if (h != "n") {
				if (d == "") {
					if (d = c[h].n, !b) index.province = h, index.updateListIndex(5, 0)
				} else h == index.province && index.updateListIndex(5, f);
				e += '<li value="' + h + '" id=' + ("province_" + f) + ">" + c[h].n + "</li>";
				f++
			}
			if (f == 0) index.updateListIndex(5, -1), index.province = index.noAreaStr, $("province_value").className = "hide", $("province_ul").className = "hide", $("province_ul").innerHTML = "", $("province_box").className = "disable_box";
			else {
				if (!b) $("province_value").value = d;
				$("province_ul").innerHTML = e
			}
		}
	},
	changeCity: function(a, b) {
		if (index.country == index.noAreaStr) return $("city_ul").innerHTML = "", index.updateListIndex(6, -1), false;
		$("city_value").className = "city_value";

		var c = index.location[index.country],
			d = "",
			e = "",
			f = 0,
			h;
		for (h in c)
		if (f++, f >= 3) break;
		switch (f) {
		case 1:
			c = null;
			$("city_value").className = "hide";
			$("city_ul").className = "hide";
			$("city_ul").innerHTML = "";
			break;
		case 2:
			c = c[0];
			break;
		case 3:
			c = c[index.province]
		}
		if (a) d = c[a] ? c[a].n : "", index.city = a;
		f = 0;
		for (h in c)
		if (h != "n" && c[h].n && c[h].n != "0") {
			if (d == "") {
				if (d = c[h].n, !b) index.city = h, index.updateListIndex(6, 0)
			} else h == index.city && index.updateListIndex(6, f);
			e += '<li value="' + h + '" id=' + ("city_" + f) + ">" + c[h].n + "</li>";
			f++
		}
		if (f == 0) index.city = index.noAreaStr, $("city_value").className = "hide", $("city_box").className = "disable_box", index.updateListIndex(6, -1);
		if (!b) $("city_value").value = d;
		$("city_ul").innerHTML = e
	},
	search_sea_area: function(a, b) {
		var c = index.searchResultToMap(["11:北京"]);
		index.selectHasSelected[b] = false;
		index.showUl(a);
		a.scrollTop = 0;
		var d = "",
			e = 0,
			f;
		for (f in c) {
			var h = "sea_country_" + e;
			d += e == 0 ? '<li class="hover" code="' + f + '" id=' + h + ">" + c[f] + "</li>" : '<li code="' + f + '" id=' + h + ">" + c[f] + "</li>";
			e++
		}
		e > 0 ? (index.updateListIndex(b, 0), a.className = "") : (d = '<p class="red_bg">' + index.areaE[1] + "</p>", index.updateListIndex(b, -1), a.className = "noSearchResult");
		a.innerHTML = d;
		index.selectListState[b] = 1
	},
	search_area: function(a, b, c) {
		$.get(a, null, function(a) {
			if (a && a.ec == 0) {
				a = index.searchResultToMap(a.list);
				index.selectHasSelected[c] = false;
				index.showUl(b);
				b.scrollTop = 0;
				var e = "",
					f = 0,
					h;
				for (h in a) {
					var i = "country_" + f;
					e += f == 0 ? '<li class="hover" value="' + h + '" id=' + i + ">" + a[h] + "</li>" : '<li value="' + h + '" id=' + i + ">" + a[h] + "</li>";
					f++
				}
				if (f > 0) index.updateListIndex(c, 0), b.className = "";
				else {
					e = '<p class="red_bg">' + index.areaE[1] + "</p>";
					switch (c) {
					case 4:
						index.country = index.noAreaStr;
						break;
					case 5:
						index.province = index.noAreaStr;
						break;
					case 6:
						index.city = index.noAreaStr
					}
					index.updateListIndex(c, -1);
					b.className = "noSearchResult"
				}
				b.innerHTML = e;
				index.selectListState[c] = 1
			}
		})
	},
	hideCountry: function() {
		$("country_ul").className = "hide";
		index.switchCountry.isShow = false
	},
	switchCountry: function() {
		index.switchCountry.isShow = !index.switchCountry.isShow;
		$("country_ul").className = index.switchCountry.isShow ? "" : "hide";
		if (index.switchCountry.isShow) {
			$("country_ul").scrollTop = index.getSelectScrollTop(4);
			var a = index.getSelectListItem(4);
			if (a) a.className = "hover";
			index.selectHasSelected[4] = false
		}
	},
	hideProvince: function() {
		$("province_ul").className = "hide";
		index.switchProvince.isShow = false
	},
	switchProvince: function() {
		index.switchProvince.isShow = !index.switchProvince.isShow;
		$("province_ul").className = index.switchProvince.isShow ? "" : "hide";
		if (index.switchProvince.isShow) {
			$("province_ul").scrollTop = index.getSelectScrollTop(5);
			var a = index.getSelectListItem(5);
			if (a) a.className = "hover";
			index.selectHasSelected[5] = false
		}
	},
	hideCity: function() {
		$("city_ul").className = "hide";
		index.switchCity.isShow = false
	},
	switchCity: function() {
		index.switchCity.isShow = !index.switchCity.isShow;
		$("city_ul").className = index.switchCity.isShow ? "" : "hide";
		if (index.switchCity.isShow) {
			$("city_ul").scrollTop = index.getSelectScrollTop(6);
			var a = index.getSelectListItem(6);
			if (a) a.className = "hover";
			index.selectHasSelected[6] = false
		}
	},
	initBirthday: function() {
		if (g.component.lunar) var a = $("birthday_type_box"),
			b = $("birthday_type_value"),
			c = $("birthday_type_ul");
		$("year_box");
		var d = $("year_value"),
			e = $("year_ul");
		$("month_box");
		var f = $("month_value"),
			h = $("month_ul");
		$("day_box");
		var i = $("day_value"),
			k = $("day_ul");
		d.value = "年";
		f.value = "月";
		i.value = "日";
		index.changeYear();
		g.component.lunar && ($.e.add(a, "click", function(a) {
			index.hideCountry();
			index.hideProvince();
			index.hideCity();
			index.hideYear();
			index.hideMonth();
			index.hideDay();
			index.switchBirtydayType();
			a.stopPropagation()
		}), $.e.add(c, "click", function(a) {
			if (a.target.nodeName.toLowerCase() != "li") a.stopPropagation();
			else {
				var c = index.birthType,
					d = a.target.getAttribute("value");
				index.birthType = d;
				$("birthday_type_value").innerHTML = a.target.innerHTML;
				index.switchBirtydayType();
				index.switchBirtydayType.dom = a.target;
				a.stopPropagation();
				c != index.birthType && (index.updateShowdDate(), index.changeYear(), index.changeMonth(), index.changeDay(), index.showBirthdayInfo());
				index.updateSelectListIndex(0, index.listIndex[0]);
				try {
					b.focus()
				} catch (e) {}
			}
		}), $.e.add(c, "mousemove", function(a) {
			var b = a.target;
			if (b.tagName.toLowerCase() == "li") {
				index.switchBirtydayType.dom && (index.switchBirtydayType.dom.className = "");
				index.switchBirtydayType.dom = null;
				var c = $("birthday_" + index.listIndex[0]);
				if (c) c.className = "";
				b.className = "hover";
				index.listIndex[0] = index.getIndexFromId(b.getAttribute("id"));
				a.stopPropagation()
			}
		}), $.e.add(c, "mouseout", function(a) {
			if (a.target.tagName.toLowerCase() == "li") a.target.className = "", a.stopPropagation()
		}), $.e.add(b, "keydown", function(a) {
			index.moveList(b, c, a, 0);
			index.addAq(this.id, a.keyCode)
		}), $.e.add(b, "focus", function() {
			index.clearAq();
			index.current_error_dom = "birthday_type_value";
			$.css.addClass(b, "birthday_type_box_focus")
		}), $.e.add(b, "blur", function() {
			$.css.removeClass(b, "birthday_type_box_focus");
			index.reportAq(this)
		}));
		$.e.add(d, "keydown", function(a) {
			index.moveList(d, e, a, 1);
			index.addAq(this.id, a.keyCode)
		});
		$.e.add(f, "keydown", function(a) {
			index.moveList(f, h, a, 2);
			index.addAq(this.id, a.keyCode)
		});
		$.e.add(i, "keydown", function(a) {
			index.moveList(i, k, a, 3);
			index.addAq(this.id, a.keyCode)
		});
		$.e.add(d, "focus", function() {
			index.clearAq();
			index.current_error_dom = "year_value";
			$("year_bg").className = "year_bg_focus";
			window.setTimeout(function() {
				d.select()
			}, 100)
		});
		$.e.add(d, "blur", function() {
			$("year_bg").className = "year_bg_txt";
			index.selectHasSelected[1] || (index.setSelectBlurValue(e, d, 1), index.changeMonth(), index.changeDay(), index.showBirthdayInfo());
			window.clearTimeout(index.searchTimeoutId[1]);
			index.hideInputSearchTips();
			index.reportAq(this)
		});
		$.e.add(f, "focus", function() {
			index.clearAq();
			index.current_error_dom = "month_value";
			f.className = "month_value_focus";
			window.setTimeout(function() {
				f.select()
			}, 100)
		});
		$.e.add(f, "blur", function() {
			f.className = "month_value";
			index.selectHasSelected[2] || (index.setSelectBlurValue(h, f, 2), index.changeDay(), index.showBirthdayInfo());
			window.clearTimeout(index.searchTimeoutId[2]);
			index.hideInputSearchTips();
			index.reportAq(this)
		});
		$.e.add(i, "focus", function() {
			index.clearAq();
			index.current_error_dom = "day_value";
			i.className = "day_value_focus";
			window.setTimeout(function() {
				i.select()
			}, 100)
		});
		$.e.add(i, "blur", function() {
			i.className = "day_value";
			index.selectHasSelected[3] || (index.setSelectBlurValue(k, i, 3), index.showBirthdayInfo());
			window.clearTimeout(index.searchTimeoutId[3]);
			index.chkBirthday();
			index.hideInputSearchTips();
			index.reportAq(this)
		});
		$.e.add(d, "click", function(a) {
			index.hideCountry();
			index.hideProvince();
			index.hideCity();
			index.hideBirtydayType();
			index.hideMonth();
			index.hideDay();
			index.selectListState[1] && (index.changeYear(), index.selectListState[1] = 0);
			index.switchYear();
			a.stopPropagation()
		});
		$.e.add(e, "click", function(a) {
			var b = a.target;
			if (b.nodeName.toLowerCase() != "li") a.stopPropagation();
			else {
				var c = index.year,
					e = b.getAttribute("value");
				index.year = e;
				index.showDate.year = e;
				d.value = $.html.decode(b.innerHTML);
				index.switchYear();
				index.switchYear.dom = a.target;
				a.stopPropagation();
				c != index.year && (index.changeMonth(), index.changeDay(), index.showBirthdayInfo());
				index.updateSelectListIndex(1, index.listIndex[1]);
				index.selectHasSelected[1] = true;
				try {
					d.focus()
				} catch (f) {}
			}
		});
		$.e.add(e, "mousemove", function(a) {
			var b = a.target;
			if (b.tagName.toLowerCase() == "li") {
				index.switchYear.dom && (index.switchYear.dom.className = "");
				index.switchYear.dom = null;
				var c = $("year_" + index.listIndex[1]);
				if (c) c.className = "";
				index.listIndex[1] = index.getIndexFromId(b.getAttribute("id"));
				b.className = "hover";
				a.stopPropagation()
			}
		});
		$.e.add(e, "mouseout", function(a) {
			if (a.target.tagName.toLowerCase() == "li") a.target.className = "", a.stopPropagation()
		});
		$.e.add(f, "click", function(a) {
			index.hideCountry();
			index.hideProvince();
			index.hideCity();
			index.hideBirtydayType();
			index.hideYear();
			index.hideDay();
			index.selectListState[2] && (index.changeMonth(), index.selectListState[2] = 0);
			index.switchMonth();
			a.stopPropagation()
		});
		$.e.add(h, "click", function(a) {
			var b = a.target;
			if (b.nodeName.toLowerCase() != "li") a.stopPropagation();
			else {
				var c = index.month,
					d = index.isLeap,
					e = b.getAttribute("value");
				index.month = e;
				index.showDate.month = e;
				index.isLeap = b.getAttribute("isLeap") ? b.getAttribute("isLeap") : 1;
				index.showDate.isLeap = index.isLeap == 1 ? false : true;
				f.value = $.html.decode(b.innerHTML);
				index.switchMonth();
				index.switchMonth.dom = b;
				a.stopPropagation();
				if (c != index.month || d != index.leap) index.changeDay(), index.showBirthdayInfo();
				index.updateSelectListIndex(2, index.listIndex[2]);
				index.selectHasSelected[2] = true;
				try {
					f.focus()
				} catch (u) {}
			}
		});
		$.e.add(h, "mousemove", function(a) {
			var b = a.target;
			if (b.tagName.toLowerCase() == "li") {
				index.switchMonth.dom && (index.switchMonth.dom.className = "");
				index.switchMonth.dom = null;
				var c = $("month_" + index.listIndex[2]);
				if (c) c.className = "";
				index.listIndex[2] = index.getIndexFromId(b.getAttribute("id"));
				b.className = "hover";
				a.stopPropagation()
			}
		});
		$.e.add(h, "mouseout", function(a) {
			if (a.target.tagName.toLowerCase() == "li") a.target.className = "", a.stopPropagation()
		});
		$.e.add(i, "click", function(a) {
			index.hideCountry();
			index.hideProvince();
			index.hideCity();
			index.hideBirtydayType();
			index.hideYear();
			index.hideMonth();
			index.selectListState[3] && (index.changeDay(), index.selectListState[3] = 0);
			index.switchDay();
			a.stopPropagation()
		});
		$.e.add(k, "click", function(a) {
			var b = a.target;
			if (b.nodeName.toLowerCase() != "li") a.stopPropagation();
			else {
				var c = index.day,
					d = b.getAttribute("value");
				index.day = d;
				index.showDate.day = d;
				i.value = $.html.decode(b.innerHTML);
				index.switchDay();
				index.switchDay.dom = b;
				a.stopPropagation();
				c != index.day && index.showBirthdayInfo();
				index.updateSelectListIndex(3, index.listIndex[3]);
				index.selectHasSelected[3] = true;
				try {
					i.focus()
				} catch (e) {}
			}
		});
		$.e.add(k, "mousemove", function(a) {
			var b = a.target;
			if (b.tagName.toLowerCase() == "li") {
				index.switchDay.dom && (index.switchDay.dom.className = "");
				index.switchDay.dom = null;
				var c = $("day_" + index.listIndex[3]);
				if (c) c.className = "";
				index.listIndex[3] = index.getIndexFromId(b.getAttribute("id"));
				b.className = "hover";
				a.stopPropagation()
			}
		});
		$.e.add(k, "mouseout", function(a) {
			var b = a.target;
			if (b.tagName.toLowerCase() == "li") b.className = "", a.stopPropagation()
		})
	},
	changeYear: function() {
		if (window.calendar) {
			var a = index.maxDate.year,
				b = index.showDate.year,
				c = a - 119;
			b > 0 && index.updateListIndex(1, a - b);
			var d = [];
			switch (index.birthType + "") {
			case "0":
				for (var e = a; e >= c; e--) {
					var f = "year_" + (a - e);
					if (e == b) $("year_value").value = b + "年";
					d.push("<li value=" + e + " id=" + f + ">" + e + "年</li>")
				}
				break;
			case "1":
				for (e = a; e >= c; e--) {
					var f = "year_" + (a - e),
						h = calendar.getGanZhi(e + 1, 0, 0, 0);
					if (e == b) $("year_value").value = h + "年(" + e + ")";
					d.push("<li value=" + e + " id=" + f + ">" + h + "年(" + e + ")</li>")
				}
			}
			$("year_ul").innerHTML = d.join(" ");
			index.ulToSelectArr($("year_ul"), 1);
			index.year = b
		}
	},
	changeMonth: function() {
		if (index.year != "" && window.calendar) {
			var a = parseInt(index.birthType),
				b = parseInt(index.year),
				c = index.showDate.month;
			c > 0 && index.updateListIndex(2, c - 1);
			var d = [];
			index.month = c;
			switch (index.birthType + "") {
			case "0":
				for (var e = index.inMaxDate(b, c, 1, a, 1), f = 1; f <= 12; f++) {
					var h = "month_" + (f - 1);
					if (f == c) $("month_value").value = f + "月";
					index.inMaxDate(b, f, 1, a, 1) ? d.push("<li value=" + f + " id=" + h + ">" + f + "月</li>") : d.push("<p value=" + f + ' class="gray" title=' + index.noSelectTip + " id=" + h + ">" + f + "月</p>")
				}
				if (!e) $("month_value").value = "1月", index.month = 1, index.showDate.month = 1, index.updateListIndex(2, 0);
				break;
			case "1":
				var e = calendar.getChineseLunarMonth(index.year),
					i = e.leap ? e.leap.m : 0,
					k = index.inMaxDate(b, c, 1, a, index.showDate.isLeap ? 0 : 1);
				(index.showDate.isLeap && c == i || i > 0 && c > i) && index.updateListIndex(2, c);
				for (var f = 1, m = 0; f <= 12; f++, m++) {
					h = "month_" + m;
					if (f == c && ($("month_value").value = index.showDate.isLeap && c == i ? "闰" + e.m[f - 1] : e.m[f - 1], c != i)) index.isLeap = 1, index.showDate.isLeap = false;
					f == i ? (index.inMaxDate(b, f, 1, a, 1) ? d.push("<li value=" + f + " isLeap=1 id=" + h + ">" + e.m[f - 1] + "</li>") : d.push("<p value=" + f + ' class="gray" title=' + index.noSelectTip + " isLeap=1 id=" + h + ">" + e.m[f - 1] + "</p>"), m++, h = "month_" + m, index.inMaxDate(b, f, 1, a, 0) ? d.push("<li value=" + f + " isLeap=0 id=" + h + ">" + e.leap.name + "</li>") : d.push("<p value=" + f + ' class="gray" title=' + index.noSelectTip + " isLeap=0 id=" + h + ">" + e.leap.name + "</p>")) : index.inMaxDate(b, f, 1, a, 1) ? d.push("<li value=" + f + " isLeap=1 id=" + h + ">" + e.m[f - 1] + "</li>") : d.push("<p value=" + f + ' class="gray" title=' + index.noSelectTip + " isLeap=1 id=" + h + ">" + e.m[f - 1] + "</p>")
				}
				if (!k) $("month_value").value = "正月", index.month = 1, index.showDate.month = 1, index.updateListIndex(2, 0), index.isLeap = 1, index.showDate.isLeap = false
			}
			$("month_ul").innerHTML = d.join(" ");
			index.ulToSelectArr($("month_ul"), 2)
		}
	},
	changeDay: function() {
		if (index.month != "" && window.calendar) {
			var a = parseInt(index.birthType),
				b = parseInt(index.year),
				c = parseInt(index.month),
				d, e = parseInt(index.showDate.day);
			e > 0 && index.updateListIndex(3, e - 1);
			var f = [];
			index.day = e;
			switch (index.birthType + "") {
			case "0":
				d = calendar.getSolarMonthDays(index.year, index.month);
				var h = index.inMaxDate(b, c, e, a, 1);
				if (e > d || !h) $("day_value").value = "1日", index.showDate.day = 1, index.day = 1, index.updateListIndex(3, 0);
				for (var i = 1; i <= d; i++) {
					var k = "day_" + (i - 1);
					if (i == e && h) $("day_value").value = i + "日";
					index.inMaxDate(b, c, i, a, 1) ? f.push("<li value=" + i + "  id=" + k + ">" + i + "日</li>") : f.push("<p value=" + i + ' class="gray" title=' + index.noSelectTip + " id=" + k + ">" + i + "日</p>")
				}
				break;
			case "1":
				d = calendar.getChineseLunarDay(b, c, index.showDate.isLeap ? 0 : 1);
				h = index.inMaxDate(b, c, e, a, index.showDate.isLeap ? 0 : 1);
				if (e > d.length || !h) $("day_value").value = d[0], index.showDate.day = 1, index.day = 1, index.updateListIndex(3, 0);
				for (var i = 1, m = d.length; i <= m; i++) {
					k = "day_" + (i - 1);
					if (i == e && h) $("day_value").value = d[i - 1];
					index.inMaxDate(b, c, i, a, index.showDate.isLeap ? 0 : 1) ? f.push("<li value=" + i + " id=" + k + ">" + d[i - 1] + "</li>") : f.push("<p value=" + i + ' class="gray" title=' + index.noSelectTip + " id=" + k + " >" + d[i - 1] + "</p>")
				}
			}
			$("day_ul").innerHTML = f.join(" ");
			index.ulToSelectArr($("day_ul"), 3)
		}
	},
	switchBirtydayType: function() {
		if (g.component.lunar && (index.switchBirtydayType.isShow = !index.switchBirtydayType.isShow, $("birthday_type_ul").className = index.switchBirtydayType.isShow ? "" : "hide", index.switchBirtydayType.isShow)) {
			var a = index.getSelectListItem(0);
			if (a) a.className = "hover"
		}
	},
	switchYear: function() {
		index.switchYear.isShow = !index.switchYear.isShow;
		$("year_ul").className = index.switchYear.isShow ? "" : "hide";
		if (index.switchYear.isShow) {
			$("year_ul").scrollTop = index.getSelectScrollTop(1);
			var a = index.getSelectListItem(1);
			if (a) a.className = "hover";
			index.selectHasSelected[1] = false
		}
	},
	switchMonth: function() {
		index.switchMonth.isShow = !index.switchMonth.isShow;
		$("month_ul").className = index.switchMonth.isShow ? "" : "hide";
		if (index.switchMonth.isShow) {
			$("month_ul").scrollTop = index.getSelectScrollTop(2);
			var a = index.getSelectListItem(2);
			if (a) a.className = "hover";
			index.selectHasSelected[2] = false
		}
	},
	switchDay: function() {
		index.switchDay.isShow = !index.switchDay.isShow;
		$("day_ul").className = index.switchDay.isShow ? "" : "hide";
		if (index.switchDay.isShow) {
			$("day_ul").scrollTop = index.getSelectScrollTop(3);
			var a = index.getSelectListItem(3);
			if (a) a.className = "hover";
			index.selectHasSelected[3] = false
		}
	},
	hideBirtydayType: function() {
		if (g.component.lunar) $("birthday_type_ul").className = "hide", index.switchBirtydayType.isShow = false
	},
	hideYear: function() {
		$("year_ul").className = "hide";
		index.switchYear.isShow = false
	},
	hideMonth: function() {
		$("month_ul").className = "hide";
		index.switchMonth.isShow = false
	},
	hideDay: function() {
		$("day_ul").className = "hide";
		index.switchDay.isShow = false
	},
	showBirthdayInfo: function() {
		var a = "",
			b = "";
		if (index.year > 0 && index.month > 0 && index.day > 0) a = calendar.getZodiac(index.year, index.month, index.day, index.birthType, index.isLeap), b = calendar.getConstellation(parseInt(index.year), parseInt(index.month), parseInt(index.day), parseInt(index.birthType), parseInt(index.isLeap)), $("birthday_info").innerHTML = "属" + a + " " + b, $("birthday_info").className = "birthdayTip"
	},
	showEmailCode: function() {
		index.current_error_dom = "display_6";
		$("email_code_img").src = index.codeUrl + "?r=" + Math.random();
		$("email_code_ipt").value = "";
		$("chk_email_code_box").style.display = "block";
		$("cover").style.display = "block"
	},
	hideEmailCode: function() {
		index.current_error_dom = "display_7";
		$("chk_email_code_box").style.display = "none";
		$("cover").style.display = "none";
		if ((index.initInfo.elevel == "1" || index.initInfo.elevel == "2") & index.hideEmailCode.needChange) $("code_img").src = index.codeUrl + "?r=" + Math.random(), $("code").value = ""
	},
	generateEmailTips: function(a) {
		for (var b = a.indexOf("@"), c = "", c = b == -1 ? a : a.substring(0, b), b = [], d = 0, e = index.knownEmail.length; d < e; d++)
		b.push(c + "@" + index.knownEmail[d]);
		c = [];
		c.push(a);
		d = 0;
		for (e = b.length; d < e; d++)
		b[d].indexOf(a) > -1 && c.push(b[d]);
		return c
	},
	hideEmailTips: function() {
		$("other_email_ul").className = "hide"
	},
	createEmailTips: function(a) {
		index.updateListIndex(7, 0);
		var a = index.generateEmailTips(a),
			b = [],
			c = "";
		b.push("<p>请选择邮箱类型</p>");
		for (var d = 0, e = a.length; d < e && d < 10; d++) {
			if (d != 0 && a[d] == $("other_email").value) {
				index.hideEmailTips();
				return
			}
			c = "emailTips_" + d;
			0 == d ? b.push("<li id=" + c + " class='hover' >" + $.html.encode(a[d]) + "</li>") : b.push("<li id=" + c + ">" + $.html.encode(a[d]) + "</li>")
		}
		$("other_email_ul").className = "other_email_ul";
		$("other_email_ul").innerHTML = b.join(" ")
	},
	showUl: function(a) {
		if (a) a.className = ""
	},
	hideUl: function(a) {
		if (a) a.className = "hide"
	},
	bindEmailTipsEvent: function() {
		var a = $("other_email_ul"),
			b = $("other_email");
		$.e.add(a, "mousemove", function(a) {
			var b = a.target;
			if (b.tagName.toLowerCase() == "li") {
				var e = $("emailTips_" + index.listIndex[7]);
				if (e) e.className = "";
				b.className = "hover";
				index.listIndex[7] = index.getIndexFromId(b.getAttribute("id"));
				a.stopPropagation()
			}
		});
		$.e.add(a, "mouseout", function(a) {
			if (a.target.tagName.toLowerCase() == "li") a.target.className = "", a.stopPropagation()
		});
		$.e.add(a, "click", function(c) {
			if (c.target.nodeName.toLowerCase() == "li") {
				b.value = $.html.decode(c.target.innerHTML);
				a.className = "hide";
				index.isChangingTab() || index.chkOtherEMail();
				try {
					$("nick").focus()
				} catch (d) {}
				c.stopPropagation()
			}
		});
		$.e.add(b, "keydown", function(b) {
			index.moveList($("other_email"), a, b, 7)
		})
	},
	isEnglishWord: function(a) {
		return index.enWordReg.test(a)
	},
	searchResultToMap: function(a) {
		for (var b = {}, c = a.length, d = 0; d < c; d++) {
			var e = a[d].split(":");
			e.length == 2 && (b[e[0]] = e[1])
		}
		return b
	},
	bindAreaSearchEvent: function() {
		$.e.add($("country_value"), "keyup", function(a) {
			a = a.keyCode;
			a != index.keyCode.UP && a != index.keyCode.DOWN && a != index.keyCode.ENTER && a != index.keyCode.TAB && (window.clearTimeout(index.searchTimeoutId[4]), index.searchTimeoutId[4] = window.setTimeout(function() {
				var a = encodeURIComponent($("country_value").value.trim()),
					c = index.areaSearchUrl + "?type=1&word=" + a;
				a ? index.search_area(c, $("country_ul"), 4) : (index.changeCountry(), index.country = index.noAreaStr)
			}, 500))
		});
		$.e.add($("province_value"), "keyup", function(a) {
			a = a.keyCode;
			a != index.keyCode.UP && a != index.keyCode.DOWN && a != index.keyCode.ENTER && a != index.keyCode.TAB && (window.clearTimeout(index.searchTimeoutId[5]), index.searchTimeoutId[5] = window.setTimeout(function() {
				var a = encodeURIComponent($("province_value").value.trim()),
					c = index.areaSearchUrl + "?type=2&word=" + a + "&countryid=" + index.country;
				a ? index.search_area(c, $("province_ul"), 5) : (index.changeProvince(null, true), index.province = index.noAreaStr)
			}, 500))
		});
		$.e.add($("city_value"), "keyup", function(a) {
			a = a.keyCode;
			a != index.keyCode.UP && a != index.keyCode.DOWN && a != index.keyCode.ENTER && a != index.keyCode.TAB && (window.clearTimeout(index.searchTimeoutId[6]), index.searchTimeoutId[6] = window.setTimeout(function() {
				var a = encodeURIComponent($("city_value").value.trim()),
					a = index.areaSearchUrl + "?type=3&word=" + a + "&countryid=" + index.country + "&provinceid=" + index.province;
				$("city_value").value ? index.search_area(a, $("city_ul"), 6) : (index.changeCity(null, true), index.city = index.noAreaStr)
			}, 500))
		})
	},
	setSelectBlurValue: function(a, b, c) {
		a = a.getElementsByTagName("li");
		if (index.listIndex[c] >= 0 && (a = a[index.listIndex[c]])) {
			var d = a.getAttribute("value");
			b.value = $.html.decode(a.innerHTML);
			index.updateListIndex(c, index.listIndex[c]);
			switch (c) {
			case 1:
				index.year = d;
				index.showDate.year = index.year;
				break;
			case 2:
				index.month = d;
				b = a.getAttribute("isLeap");
				index.isLeap = b ? b : "1";
				index.showDate.month = index.month;
				index.showDate.isLeap = index.isLeap == 1 ? false : true;
				break;
			case 3:
				index.day = d;
				index.showDate.day = index.day;
				break;
			case 4:
				index.country = d;
				break;
			case 5:
				index.province = d;
				break;
			case 6:
				index.city = d
			}
		}
	},
	bindTimeSearchEvent: function() {
		$.e.add($("year_value"), "keyup", function(a) {
			a = a.keyCode;
			a != index.keyCode.UP && a != index.keyCode.DOWN && a != index.keyCode.ENTER && a != index.keyCode.TAB && (window.clearTimeout(index.searchTimeoutId[1]), index.searchTimeoutId[1] = window.setTimeout(function() {
				var a = $("year_value").value;
				index.search_time($("year_ul"), 1, a)
			}, 50))
		});
		$.e.add($("month_value"), "keyup", function(a) {
			a = a.keyCode;
			a != index.keyCode.UP && a != index.keyCode.DOWN && a != index.keyCode.ENTER && a != index.keyCode.TAB && (window.clearTimeout(index.searchTimeoutId[2]), index.searchTimeoutId[2] = window.setTimeout(function() {
				var a = $("month_value").value;
				index.search_time($("month_ul"), 2, a)
			}, 50))
		});
		$.e.add($("day_value"), "keyup", function(a) {
			a = a.keyCode;
			a != index.keyCode.UP && a != index.keyCode.DOWN && a != index.keyCode.ENTER && a != index.keyCode.TAB && (window.clearTimeout(index.searchTimeoutId[3]), index.searchTimeoutId[3] = window.setTimeout(function() {
				var a = $("day_value").value;
				index.search_time($("day_ul"), 3, a)
			}, 50))
		})
	},
	ulToSelectArr: function(a, b) {
		var j;
		switch (b) {
		case 1:
			index.yearSearchArr = [];
			break;
		case 2:
			index.monthSearchArr = [];
			break;
		case 3:
			index.daySearchArr = []
		}
		for (var c = a.getElementsByTagName("li"), d = null, e = null, f = null, d = 1, h = 0, i = c.length; h < i; h++)
		switch (d = c[h], e = d.getAttribute("value"), f = d.innerHTML, e = {
			id: e,
			name: f
		}, b) {
		case 1:
			index.yearSearchArr.push(e);
			break;
		case 2:
			j = (d = d.getAttribute("isleap")) ? d : 1, d = j;
			e.isLeap = d;
			index.monthSearchArr.push(e);
			break;
		case 3:
			index.daySearchArr.push(e)
		}
	},
	arrayToUl: function(a, b, c) {
		for (var d = [], e = 0, f = a.length; e < f; e++) {
			var h = a[e],
				i = h.id,
				h = h.name,
				k = "",
				k = "";
			switch (c) {
			case 1:
				k = "year_" + e;
				k = e == 0 ? "<li value=" + i + ' class="hover" id=' + k + ">" + h + "</li>" : "<li value=" + i + " id=" + k + ">" + h + "</li>";
				break;
			case 2:
				var k = "month_" + e,
					m = a[e].isLeap,
					k = e == 0 ? "<li value=" + i + ' class="hover" isLeap=' + m + " id=" + k + ">" + h + "</li>" : "<li value=" + i + " isLeap=" + m + " id=" + k + ">" + h + "</li>";
				break;
			case 3:
				k = "day_" + e, k = e == 0 ? "<li value=" + i + ' class="hover" id=' + k + ">" + h + "</li>" : "<li value=" + i + " id=" + k + ">" + h + "</li>"
			}
			d.push(k)
		}
		e > 0 ? index.updateListIndex(c, 0) : index.updateListIndex(c, -1);
		b.innerHTML = d.join(" ")
	},
	search_time: function(a, b, c) {
		c = c.trim();
		a.scrollTop = 0;
		index.selectHasSelected[b] = false;
		var d = [],
			e = [];
		switch (b) {
		case 1:
			e = index.yearSearchArr;
			break;
		case 2:
			e = index.monthSearchArr;
			break;
		case 3:
			e = index.daySearchArr
		}

		for (var f = 0, h = e.length; f < h; f++)((e[f].id + "").indexOf(c) > -1 || (e[f].name + "").indexOf(c) > -1) && d.push(e[f]);
		d.length == 0 && (d = e);
		index.arrayToUl(d, a, b);
		index.showUl(a);
		index.selectListState[b] = 1
	},
	bindInputSearchEvent: function() {
		$.e.add($("year_ul"), "scroll", function() {
			index.showInputSearchTips(1)
		});
		$.e.add($("month_ul"), "scroll", function() {
			index.showInputSearchTips(2)
		});
		$.e.add($("day_ul"), "scroll", function() {
			index.showInputSearchTips(3)
		});
		$.e.add($("country_ul"), "scroll", function() {
			index.showInputSearchTips(4)
		});
		$.e.add($("province_ul"), "scroll", function() {
			index.showInputSearchTips(5)
		});
		$.e.add($("city_ul"), "scroll", function() {
			index.showInputSearchTips(6)
		})
	},
	showInputSearchTips: function(a) {
		index.current_error_dom = "display_8";
		var b = $("inptu_search_tips");
		$("inptu_search_tips_wording").innerHTML = index.inputSearchTipsArray[a - 1];
		index.birthdayTipsShow && a < 4 && (a = 0);
		index.areaTipsShow && a >= 4 && (a = 0);
		switch (a) {
		case 1:
			b.style.display = "block";
			b.style.top = "-31px";
			b.style.left = "100px";
			b.style.width = "158px";
			index.birthdayTipsShow = true;
			break;
		case 2:
			b.style.display = "block";
			b.style.top = "-31px";
			b.style.left = "180px";
			b.style.width = "145px";
			index.birthdayTipsShow = true;
			break;
		case 3:
			b.style.display = "block";
			b.style.top = "-31px";
			b.style.left = "250px";
			b.style.width = "145px";
			index.birthdayTipsShow = true;
			break;
		case 4:
			b.style.display = "block";
			b.style.top = "9px";
			b.style.left = "40px";
			b.style.width = "181px";
			index.areaTipsShow = true;
			break;
		case 5:
			b.style.display = "block";
			b.style.top = "9px";
			b.style.left = "140px";
			b.style.width = "181px";
			index.areaTipsShow = true;
			break;
		case 6:
			b.style.display = "block", b.style.top = "9px", b.style.left = "250px", b.style.width = "181px", index.areaTipsShow = true
		}
	},
	hideInputSearchTips: function() {
		index.current_error_dom = "display_9";
		var a = $("inptu_search_tips");
		a && (a.style.display = "none")
	},
	rsaEncrypt: function(a) {
		var b = new RSAKey;
		b.setPublic("C4D23C2DB0ECC904FE0CD0CBBCDC988C039D79E1BDA8ED4BFD4D43754EC9693460D15271AB43A59AD6D0F0EEE95424F70920F2C4A08DFDF03661300047CA3A6212E48204C1BE71A846E08DD2D9F1CBDDFF40CA00C10C62B1DD42486C70A09C454293BCA9ED4E7D6657E3F62076A14304943252A88EFA416770E0FBA270A141E7", "10001");
		return b.encrypt(a)
	},
	hasNoEmail: function() {
		index.changeTab(1);
		index.changeInit();
		index.mailRegReport(1);
		index.email_to("email_to_qqmail")
	},
	mailToNumber: function() {
		index.changeTab(0);
		index.changeInit();
		index.email_to("email_to_number_wording")
	},
	hasNoPhone: function() {
		index.changeTab(0);
		index.changeInit();
		index.phone_to("phone_to_noPhone");
		$.report.monitor("noPhone")
	},
	seaPhone: function() {
		index.isSeaPhone = true;
		$("sea_phone").style.display = "block";
		$("phone_info").innerHTML = index.phoneE[4];
		$("phone_info").removeAttribute("_hover");
		try {
			$("sea_country_input").focus()
		} catch (a) {}
	},
	numberToPhone: function() {
		index.changeTab(3);
		index.changeInit();
		$.report.monitor("number_to_phone_wording")
	},
	setBirthday: function(a) {
		for (var b = $("birthday_type_ul").getElementsByTagName("li"), c = 0; c < b.length; c++)
		if (b[c].value == a.isnongli) index.birthType = a.isnongli, $("birthday_type_value").innerHTML = b[c].innerHTML, index.selectListIndex[0] = b[c].id.split("_")[1], index.changeYear();
		b = $("year_ul").getElementsByTagName("li");
		for (c = 0; c < b.length; c++)
		if (b[c].value == a.year) index.year = a.year, $("year_value").value = b[c].innerHTML, index.selectListIndex[1] = b[c].id.split("_")[1], index.changeMonth();
		b = $("month_ul").getElementsByTagName("li");
		for (c = 0; c < b.length; c++)
		if (b[c].value == a.month) index.month = a.month, $("month_value").value = b[c].innerHTML, index.selectListIndex[2] = b[c].id.split("_")[1], index.changeDay();
		b = $("day_ul").getElementsByTagName("li");
		for (c = 0; c < b.length; c++)
		if (b[c].value == a.day) index.day = a.day, $("day_value").value = b[c].innerHTML, index.selectListIndex[3] = b[c].id.split("_")[1];
		index.birthdaySet = true
	},
	setLocation: function(a) {
		for (var b = $("country_ul").getElementsByTagName("li"), c = 0; c < b.length; c++)
		if (b[c].value == a.country) index.country = a.country, a.country = b[c].innerHTML, index.selectListIndex[4] = b[c].id.split("_")[1], $("country_value").value = a.country, index.changeProvince();
		b = $("province_ul").getElementsByTagName("li");
		for (c = 0; c < b.length; c++)
		if (b[c].value == a.province) index.province = a.province, a.province = b[c].innerHTML, index.selectListIndex[5] = b[c].id.split("_")[1], $("province_value").value = a.province, index.changeCity();
		b = $("city_ul").getElementsByTagName("li");
		for (c = 0; c < b.length; c++)
		if (b[c].value == a.city) index.city = a.city, a.city = b[c].innerHTML, index.selectListIndex[6] = b[c].id.split("_")[1], $("city_value").value = a.city;
		index.locationSet = true
	},
	current_error_dom: "index_begin"
};
index.init();
isd_t.push(new Date - 0);

function A(a, b) {
	index.aq_object[a] = b
}

function initLocation(a) {
	index.current_error_dom = "load_location_begin";
	index.loadLocation(a);
	index.current_error_dom = "load_location_end"
}

function webnotice(a) {
	if (a.ec == 0 && a.show == 1 && a.c != "") $("web_notice_text").innerHTML = a.c, $("web_notice").style.display = "block"
}(function() {
	var a = {
		nick: "nick",
		nav_3: "phone",
		nav_2: "email",
		email_info: "other_mail",
		password: "password ",
		password_again: "password_again",
		sex_1: "sex_1",
		sex_2: "sex_2",
		brithday_1: "brithday_1",
		year_value: "year_value",
		month_value: "month_value",
		day_value: "day_value",
		country_value: "country_value",
		province_value: "province_value",
		city_value: "city_value",
		code_value: "code_value",
		code_ipt: "code_ipt"
	},
		b = {
			none: 0,
			nick: 1,
			nav_3: 2,
			nav_2: 3,
			email_info: 4,
			password: 5,
			password_again: 6,
			sex_1: 7,
			sex_2: 8,
			brithday_1: 9,
			year_value: 10,
			month_value: 11,
			day_value: 12,
			country_value: 13,
			province_value: 14,
			city_value: 15,
			code_value: 16,
			code_ipt: 17,
			other: 18
		},
		c = function() {
			var a = /d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZ]|"[^"]*"|'[^']*'/g,
				b = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,
				d = /[^-+\dA-Z]/g,
				e = function(a, b) {
					a = String(a);
					for (b = b || 2; a.length < b;)
					a = "0" + a;
					return a
				};
			return function(f, h, i) {
				var k = c;
				arguments.length == 1 && Object.prototype.toString.call(f) == "[object String]" && !/\d/.test(f) && (h = f, f = void 0);
				f = f ? new Date(f) : new Date;
				if (isNaN(f)) throw SyntaxError("invalid date");
				h = String(k.masks[h] || h || k.masks["default"]);
				h.slice(0, 4) == "UTC:" && (h = h.slice(4), i = true);
				var j = i ? "getUTC" : "get",
					l = f[j + "Date"](),
					m = f[j + "Day"](),
					n = f[j + "Month"](),
					p = f[j + "FullYear"](),
					o = f[j + "Hours"](),
					r = f[j + "Minutes"](),
					s = f[j + "Seconds"](),
					j = f[j + "Milliseconds"](),
					q = i ? 0 : f.getTimezoneOffset(),
					t = {
						d: l,
						dd: e(l),
						ddd: k.i18n.dayNames[m],
						dddd: k.i18n.dayNames[m + 7],
						m: n + 1,
						mm: e(n + 1),
						mmm: k.i18n.monthNames[n],
						mmmm: k.i18n.monthNames[n + 12],
						yy: String(p).slice(2),
						yyyy: p,
						h: o % 12 || 12,
						hh: e(o % 12 || 12),
						H: o,
						HH: e(o),
						M: r,
						MM: e(r),
						s: s,
						ss: e(s),
						l: e(j, 3),
						L: e(j > 99 ? Math.round(j / 10) : j),
						t: o < 12 ? "a" : "p",
						tt: o < 12 ? "am" : "pm",
						T: o < 12 ? "A" : "P",
						TT: o < 12 ? "AM" : "PM",
						Z: i ? "UTC" : (String(f).match(b) || [""]).pop().replace(d, ""),
						o: (q > 0 ? "-" : "+") + e(Math.floor(Math.abs(q) / 60) * 100 + Math.abs(q) % 60, 4),
						S: ["th", "st", "nd", "rd"][l % 10 > 3 ? 0 : (l % 100 - l % 10 != 10) * l % 10]
					};
				return h.replace(a, function(a) {
					return a in t ? t[a] : a.slice(1, a.length - 1)
				})
			}
		}();
	c.masks = {
		"default": "ddd mmm dd yyyy HH:MM:ss",
		shortDate: "m/d/yy",
		mediumDate: "mmm d, yyyy",
		longDate: "mmmm d, yyyy",
		fullDate: "dddd, mmmm d, yyyy",
		shortTime: "h:MM TT",
		mediumTime: "h:MM:ss TT",
		longTime: "h:MM:ss TT Z",
		isoDate: "yyyy-mm-dd",
		isoTime: "HH:MM:ss",
		isoDateTime: "yyyy-mm-dd'T'HH:MM:ss",
		isoUtcDateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'"
	};
	c.i18n = {
		dayNames: "Sun,Mon,Tue,Wed,Thu,Fri,Sat,Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday".split(","),
		monthNames: "Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec,January,February,March,April,May,June,July,August,September,October,November,December".split(",")
	};
	Date.prototype.format = function(a, b) {
		return c(this, a, b)
	};
	var d = function(a) {
			return {
				eventID: a,
				recordCnt: 0,
				opsStartTime: (new Date).getTime(),
				xSeries: "",
				ySeries: "",
				elementIDSeries: "",
				clickGapSeries: "",
				browserHeightSeries: "",
				browserWidthSeries: "",
				gapLog: ""
			}
		},
		e = new Date,
		f = {
			xSeries: "xSeries",
			ySeries: "ySeries",
			elementIDSeries: "elementIDSeries",
			clickGapSeries: "clickGapSeries",
			browserHeightSeries: "browserHeightSeries",
			browserWidthSeries: "browserWidthSeries",
			gapLog: "gapLog"
		},
		h = new d(0),
		i = new d(1),
		k = new d(2),
		m = new d(3);
	dataSet = [h, i, k, m];
	dataArr0 = [];
	dataArr1 = [];
	dataArr2 = [];
	dataArr3 = [];
	dataArrSet = [dataArr0, dataArr1, dataArr2, dataArr3];
	var l = [],
		n = new Date,
		p = true,
		j = {
			getEvent: function(a) {
				return a || window.event
			},
			addEventHandler: function(a, b, c) {
				window.attachEvent ? a.attachEvent("on" + b, c) : window.addEventListener && a.addEventListener(b, c)
			},
			removeEventHandler: function(a, b, c) {
				window.detachEvent ? a.detachEvent("on" + b, c) : window.removeEventListener && a.removeEventListener(b, c)
			},
			getMousePoint: function(a) {
				var b = y = 0,
					c = document.documentElement,
					d = document.body;
				if (!a) a = window.event;
				window.pageYoffset ? (b = window.pageXOffset, y = window.pageYOffset) : (b = (c && c.scrollLeft || d && d.scrollLeft || 0) - (c && c.clientLeft || d && d.clientLeft || 0), y = (c && c.scrollTop || d && d.scrollTop || 0) - (c && c.clientTop || d && d.clientTop || 0));
				b += a.clientX;
				y += a.clientY;
				return {
					x: b,
					y: y
				}
			},
			getBrowser: function() {
				var a = 0,
					b = 0;
				if (window.innerWidth) a = window.innerWidth;
				else if (document.body && document.body.clientWidth) a = document.body.clientWidth;
				if (window.innerHeight) b = window.innerHeight;
				else if (document.body && document.body.clientHeight) b = document.body.clientHeight;
				if (document.documentElement && document.documentElement.clientHeight && document.documentElement.clientWidth) b = document.documentElement.clientHeight, a = document.documentElement.clientWidth;
				return {
					winWidth: a,
					winHeight: b
				}
			},
			isIE: function() {
				if (window.addEventListener) return false;
				if (window.attachEvent) return true
			},
			bindMouseClickEvent: function() {
				document.onmousemove = function(a) {
					a = a || window.event;
					new Date - n > 200 && (n = new Date, j.addTargetData(a, 0, new d(0), 0, 0))
				};
				document.onmouseout = function(a) {
					a = a || window.event;
					new Date - n > 200 && (n = new Date, j.addTargetData(a, 0, new d(0), 0, 0))
				};
				document.onmouseover = function(a) {
					a = a || window.event;
					new Date - n > 200 && (n = new Date, j.addTargetData(a, 0, new d(0), 0, 0))
				};
				document.onclick = function(c) {
					c = c || window.event;
					c.target = c.srcElement ? c.srcElement : c.target;
					if (l.length > 0) var e = new Date - l[l.length - 1];
					c.target && a[c.target.id] ? j.addTargetData(c, 1, new d(1), b[c.target.id], e) : j.addTargetData(c, 1, new d(1), b.none, e)
				};
				document.ondblclick = function(c) {
					c = c || window.event;
					c.target = c.srcElement ? c.srcElement : c.target;
					var e;
					j.isIE() ? (e = new Date - l[l.length - 1], l.pop()) : (e = new Date - l[l.length - 2], l.pop(), l.pop(), dataArr1.pop());
					dataArr1.pop();
					c.target && typeof a[c.target.id] != "undefined" ? j.addTargetData(c, 2, new d(2), b[c.target.id], e) : j.addTargetData(c, 2, new d(2), b.none, e)
				};
				document.oncontextmenu = function(c) {
					c = c || window.event;
					c.target = c.srcElement ? c.srcElement : c.target;
					var e = new Date - l[l.length - 1];
					l.pop();
					dataArr1.pop();
					c.target && typeof a[c.target.id] != "undefined" ? j.addTargetData(c, 3, new d(3), b[c.target.id], e) : j.addTargetData(c, 3, new d(3), b.none, e)
				};
				document.onmousedown = function() {
					l.push(new Date)
				};
				document.onmouseup = function() {}
			},
			addTargetData: function(a, b, c, d, f) {
				a = a || window.event;
				point = j.getMousePoint(a);
				c.recordCnt += 1;
				c.xSeries = point.x;
				c.ySeries = point.y;
				c.elementIDSeries = d;
				c.clickGapSeries = f;
				c.browserHeightSeries = j.getBrowser().winHeight;
				c.browserWidthSeries = j.getBrowser().winWidth;
				c.gapLog = (new Date).getTime() - e;
				j.addTargetArrData(b, c)
			},
			addTargetArrData: function(a, b) {
				switch (a) {
				case 0:
					dataArr0.push(b);
					break;
				case 1:
					dataArr1.push(b);
					break;
				case 2:
					dataArr2.push(b);
					break;
				case 3:
					dataArr3.push(b)
				}
			},
			dataToStrity: function(a, b) {
				var c = new d(b);
				if (!(a.length < 1)) {
					for (var e = 0; e < a.length; e++)
					for (var h in a[e])
					e == 0 && !f[h] && (c[h] = a[e][h]), typeof f[h] != "undefined" && (e != 0 ? (c[h] += "-", c[h] += a[e][h].toString()) : c[h] = a[e][h].toString());
					c.recordCnt = a.length;
					e = "|";
					for (x in c)
					e += c[x], e += "|";
					return e
				}
			},
			initData: function(a) {
				a.recordCnt = 0;
				a.opsStartTime = (new Date).getTime()
			},
			reportAq: function(a) {
				(new Image).src = "http://a.zc.qq.com/Cgi-bin/mouse?" + a
			},
			init: function() {
				j.bindMouseClickEvent();
				$.e.add($("submit"), "click", function() {
					if (p) {
						p = false;
						var a = dataArr0.length,
							b = parseInt(a / 50),
							c = a % 50;
						if (b > 0) for (var d = 0; d < b; d++)
						j.reportAq(j.dataToStrity(dataArr0.slice(50 * d, 50 * d + 50), 0));
						c > 0 && j.reportAq(j.dataToStrity(dataArr0.slice(50 * b, a - 1), 0));
						dataArr1.length && j.reportAq(j.dataToStrity(dataArr1, 1));
						dataArr2.length && j.reportAq(j.dataToStrity(dataArr2, 2));
						dataArr3.length && j.reportAq(j.dataToStrity(dataArr3, 3));
						e = (new Date).getTime();
						l.length = 0;
						n = new Date;
						for (a = 0; a < dataSet.length; a++)
						j.initData(dataSet[a]);
						for (a = 0; a < dataArrSet.length; a++)
						dataArrSet[a].length = 0
					}
				})
			}
		};
	j.init()
})();