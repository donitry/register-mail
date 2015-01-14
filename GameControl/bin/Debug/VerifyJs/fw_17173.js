(function($) {
    $.popLogin = function() {
        showLoginDialog();
    }
    
    $.uploadBox = function(data) 
    {
        
        
        var html = [];
        html.push('	<object width="900" height="570" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" ');
        html.push('		codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=7,0,19,0"');
        html.push('		 id="game">');
        html.push('	  <param name="movie" value="http://act.17173.com/2012/05/wo0507/asset/uploadex.swf">');
        html.push('	  <param name="quality" value="high">');
        html.push('	  <param name="wmode" value="transparent">');
        html.push('	  <param name="flashvars" value="onready=oninit&onreset=onreset&onsubmit=onsubmit">');
        html.push('	  <embed width="900" height="570" src="http://act.17173.com/2012/05/wo0507/asset/uploadex.swf" flashvars="onready=oninit&onreset=onreset&onsubmit=onsubmit" quality="high" wmode="transparent" pluginspage="http://www.macromedia.com/go/getflashplayer" type="application/x-shockwave-flash" name="game">');
        html.push('	</object>');
        html = html.join('');
        
        
        
        $.XYTipsWindow({
            //___showTitle:false,
            ___title: "请上传图片",
            ___showBoxbg: false,
            ___content: "text:<div id='aaaaa'></div>",
            ___width: "900",
            ___height: "565px",
            ___boxWrapBdColor: "#666",
            ___boxBdColor: "#a5a5a5",
            ___drag: "___boxTitle",
            ___button: ["开始上传", "重新上传"],
            ___fns: function() {
                setTimeout(function() {
                    document.getElementById('aaaaa').innerHTML = html;
                }, 10)
            },
            ___callback: function(val) {
                if (val == "开始上传") {
                    xx2(data);
                } else {
                    thisMovie("game").onreset();
                }
            }
        });
    
    
    }
    
    $.codeBox = function(type) { //验证码提示
        changeCode();
        $('#_code').val("");
        $.XYTipsWindow({
            ___title: "请填写验证码",
            ___content: "id:checkcodeDiv",
            ___showbg: true,
            ___drag: "___boxTitle",
            ___width: "382px",
            ___height: "95px",
            ___boxWrapBdColor: "#666",
            ___button: ["确定"],
            ___boxBdColor: "#a5a5a5",
            ___callback: function(val) {
                if (val == "确定") {
                    var code = $('#_code').val();
                    if (code == "" || code == null) {
                        alert("验证码不能为空");
                        $('#_code').focus();
                    } else {
                        safeRemoveBox();
                        if (type == 1) {
                            fcode(code);
                        } else {
                            lot(code);
                        }
                    }
                }
            }
        });
        
        $('#_code').focus();
        $('#_code').unbind('keydown');
        $('#_code').bind('keydown', function(e) {
            var code = $('#_code').val();
            if (e.keyCode == 13) {
                var code = $('#_code').val();
                if (code == "" || code == null) {
                    alert("验证码不能为空");
                    $('#_code').focus();
                } else {
                    safeRemoveBox();
                    if (type == 1) {
                        fcode(code);
                    } else {
                        lot(code);
                    }
                }
            }
        });
    
    }
    $.changeCode = function() {
        changeCode();
    }
    
    function changeCode()  //切换验证码控件
    {
        $('#code').attr("src", 'index.php?do=code&' + Math.random());
    }
    
    
    $.prizeCodeBox = function() { //提交号
        
        $.XYTipsWindow({
            ___title: "提示",
            ___content: "id:prizeCodeBox",
            ___showbg: true,
            ___drag: "___boxTitle",
            ___width: "496px",
            ___height: "192px",
            ___boxWrapBdColor: "#666",
            ___boxBdColor: "#a5a5a5"
        });
    }
    
    $.infoBox = function() { //提交个人资料提示
        $(".style02").val("");
        if (arguments[0]) {
            var msg = arguments[0];
            $("#userInfoMsgDiv").html(msg);
        }
        
        $.XYTipsWindow({
            ___title: "提示",
            ___content: "id:userInfoDiv",
            ___showbg: true,
            ___drag: "___boxTitle",
            ___width: "382px",
            ___height: "620px",
            ___boxWrapBdColor: "#666",
            ___boxBdColor: "#a5a5a5",
            ___fns: updateUserInfo()
        });
        $(".style02:first").focus();
    }
    
    $.showMsg = function(msg) {
        var img, height;
        if (arguments[1])
            img = '<div class="label"><img src="http://images.17173.com/2012/act/common/images/face' + arguments[1] + '.gif" /></div>';
        else {
            img = '';
        }
        height = arguments[2] ? arguments[2] : '155px';
        
        var msgIframe = '<div class="XYTipsPop"><div class="info-line2">' + img + '<div class="con fs14 black pt10">' + msg + '</div><div class="clear"></div></div></div>';
        $.XYTipsWindow({
            ___title: "提示",
            ___content: "text:" + msgIframe,
            ___showbg: true,
            ___drag: "___boxTitle",
            ___width: "402px",
            ___height: height,
            ___boxWrapBdColor: "#666",
            ___boxBdColor: "#a5a5a5"
        })
    }
    
    $.showMsgCode = function(msg) {
        var img, height;
        if (arguments[1])
            img = '<div class="label"><img src="http://images.17173.com/2012/act/common/images/face' + arguments[1] + '.gif" /></div>';
        else {
            img = '';
        }
        height = arguments[2] ? arguments[2] : '155px';
        
        var msgIframe = '<div class="XYTipsPop"><div class="info-line2">' + img + '<div class="con fs14 black pt10">' + msg + '</div><div class="clear"></div></div></div>';
        $.XYTipsWindow({
            ___title: "提示",
            ___content: "text:" + msgIframe,
            ___showbg: true,
            ___drag: "___boxTitle",
            ___width: "402px",
            ___height: height,
            ___boxWrapBdColor: "#666",
            ___boxBdColor: "#a5a5a5",
            ___cfns: function() {
                if (confirm("请确定已复制激活码，页面关闭后将不再找回！"))
                    $.XYTipsWindow.removeBox();
            }
        })
    }
    
    
    $.showHtm = function(msg) { //普通提示
        height = arguments[3] ? arguments[3] : '125px';
        width = arguments[2] ? arguments[2] : '确定';
        var title = arguments[4] ? arguments[4] : '领取17173特权礼包';
        $.XYTipsWindow({
            ___title: title,
            ___content: "text:" + msg,
            ___showbg: true,
            ___drag: "___boxTitle",
            ___width: width,
            ___height: height,
            ___boxWrapBdColor: "#666",
            ___boxBdColor: "#a5a5a5"
        })
    }
    $.showHtm1 = function(msg) { //普通提示
        height = arguments[3] ? arguments[3] : '417px';
        width = arguments[2] ? arguments[2] : '475px';
        $.XYTipsWindow({
            ___title: "领取《时空裂痕》特权礼包 ",
            ___content: "text:" + msg,
            ___showbg: true,
            ___drag: "___boxTitle",
            ___width: width,
            ___height: height,
            ___boxWrapBdColor: "#666",
            ___boxBdColor: "#a5a5a5"
        });
    }
    
    $.hideMsg = function() {
        safeRemoveBox()
    };
    
    function safeRemoveBox() {
        try {
            $.XYTipsWindow.removeBox();
        } catch (e) {
        }
        ;
    }
    
    $.dialog = function(msg) {
        var img, height;
        if (arguments[1])
            img = '<div class="label"><img src="http://images.17173.com/2012/act/common/images/face' + arguments[1] + '.gif" /></div>';
        else {
            img = '';
        }
        height = arguments[3] ? arguments[3] : '75px';
        button = arguments[2] ? arguments[2] : '确定';
        var msgIframe = '<div class="XYTipsPop"><div class="info-line2">' + img + '<div class="con fs14 black pt10">' + msg + '</div><div class="clear"></div></div></div>';
        $.XYTipsWindow({
            ___title: "提示",
            ___content: "text:" + msgIframe,
            ___showbg: true,
            ___drag: "___boxTitle",
            ___width: "382px",
            ___height: height,
            ___boxWrapBdColor: "#666",
            ___boxBdColor: "#a5a5a5",
            ___button: [button],
            ___callback: function(val) {
                safeRemoveBox();
                setTimeout(function() {
                    dialogCallBack()
                }, 200);
            }
        })
    }
    
    
    
    
    
    $.fn.Validform = function(settings) {
        var defaults = {};
        settings = $.extend({}, $.fn.Validform.sn.defaults, settings);
        
        this.each(function() {
            var $this = $(this);
            var posting = false; //防止表单按钮双击提交两次;
            $this.find("[tip]").each(function() { //tip是表单元素的默认提示信息,这是点击清空效果;
                var defaultvalue = $(this).attr("tip");
                var altercss = $(this).attr("altercss");
                $(this).focus(function() {
                    if ($(this).val() == defaultvalue) {
                        $(this).val('');
                        if (altercss) {
                            $(this).removeClass(altercss);
                        }
                    }
                }).blur(function() {
                    if ($.trim($(this).val()) == '') {
                        $(this).val(defaultvalue);
                        if (altercss) {
                            $(this).addClass(altercss);
                        }
                    }
                });
            });

            //绑定blur事件;
            $this.find("[datatype]").blur(function() {
                var flag = true;
                flag = $.fn.Validform.sn.checkform($(this), $this, settings.tiptype, "hide");
                
                if (!flag) {
                    return false;
                }
                if (typeof (flag) != "boolean") { //如果是radio, checkbox, select则不需再执行下面的代码;
                    $(this).removeClass("Validform_error");
                    return false;
                }
                
                flag = $.fn.Validform.sn.regcheck($(this).attr("datatype"), $(this).val());
                if (!flag) {
                    if ($(this).attr("ignore") == "ignore" && ($(this).val() == "" || $(this).val() == $(this).attr("tip"))) {
                        if (settings.tiptype == 2) {
                            $(this).parent().parent().next().find(".Validform_checktip").removeClass().addClass("Validform_checktip").text($(this).attr("tip"));
                        }
                        flag = true;
                        return true;
                    }
                    gdata.errorobj = $(this);
                    $.fn.Validform.sn.showmsg($(this).attr("errormsg") || gdata.tipmsg.w, settings.tiptype, {obj: $(this)}, "hide"); //当tiptype=1的情况下，传入"hide"则让提示框不弹出,tiptype=2的情况下附加参数"hide"不起作用;
                } else {
                    if ($(this).attr("ajaxurl")) {
                        var inputobj = $(this);
                        inputobj.attr("valid", gdata.tipmsg.c);
                        $.fn.Validform.sn.showmsg(gdata.tipmsg.c, settings.tiptype, {obj: inputobj,type: 1}, "hide");
                        $.ajax({
                            type: "POST",
                            url: inputobj.attr("ajaxurl"),
                            data: "param=" + $(this).val(),
                            dataType: "text",
                            success: function(s) {
                                if (s == "y") {
                                    inputobj.attr("valid", "true");
                                    $.fn.Validform.sn.showmsg(gdata.tipmsg.r, settings.tiptype, {obj: inputobj,type: 2}, "hide");
                                } else {
                                    inputobj.attr("valid", s);
                                    gdata.errorobj = inputobj;
                                    $.fn.Validform.sn.showmsg(s, settings.tiptype, {obj: inputobj});
                                }
                            }
                        });
                    } else {
                        gdata.errorobj = null;
                        $.fn.Validform.sn.showmsg(gdata.tipmsg.r, settings.tiptype, {obj: $(this),type: 2}, "hide");
                    }
                }
                ;
            
            });

            //subform
            var subform = function() {
                var flag = true;
                if (posting) {
                    return false;
                }
                //$this.find(settings.btnSubmit).unbind("click");
                $this.find("[datatype]").each(function() {
                    flag = $.fn.Validform.sn.checkform($(this), $this, settings.tiptype);
                    
                    if (!flag) {
                        gdata.errorobj.focus();
                        return false;
                    }
                    
                    if (typeof (flag) != "boolean") {
                        flag = true;
                        return true;
                    }
                    
                    flag = $.fn.Validform.sn.regcheck($(this).attr("datatype"), $(this).val());
                    
                    if (!flag) {
                        if ($(this).attr("ignore") == "ignore" && ($(this).val() == "" || $(this).val() == $(this).attr("tip"))) {
                            flag = true;
                            return true;
                        }
                        gdata.errorobj = $(this);
                        gdata.errorobj.focus();
                        $.fn.Validform.sn.showmsg($(this).attr("errormsg") || gdata.tipmsg.w, settings.tiptype, {obj: $(this)});
                        return false;
                    }
                    
                    if ($(this).attr("ajaxurl")) {
                        if ($(this).attr("valid") != "true") {
                            flag = false;
                            var thisobj = $(this);
                            gdata.errorobj = thisobj;
                            gdata.errorobj.focus();
                            $.fn.Validform.sn.showmsg(thisobj.attr("valid") || gdata.tipmsg.v, settings.tiptype, {obj: thisobj});
                            if (!gdata.msghidden || settings.tiptype == 2) {
                                setTimeout(function() {
                                    thisobj.trigger("blur");
                                }, 2000);
                            }
                            return false;
                        } else {
                            $.fn.Validform.sn.showmsg(gdata.tipmsg.r, settings.tiptype, {obj: $(this),type: 2}, "hide");
                            flag = true;
                        }
                    }
                })
                
                if (flag && !posting) {
                    gdata.errorobj = null;
                    if (settings.postonce) {
                        posting = true;
                    }
                    if (settings.ajaxurl) {
                        $.fn.Validform.sn.showmsg(gdata.tipmsg.p, settings.tiptype, {obj: $(this)}, "alwaysshow"); //传入"showalways"则让提示框不管当前tiptye为1还是2都弹出;
                        $formFormClass = $this.attr('class');
                        $.ajax({
                            type: "POST",
                            dataType: "json",
                            url: settings.ajaxurl,
                            data: $("." + $formFormClass).serialize(),
                            //data: $this.serialize(),
                            success: function(data) {
                                $.fn.Validform.sn.showmsg(data.info, settings.tiptype, {obj: $(this)}, "alwaysshow");
                                (settings.callback)(data);
                            }
                        });
                        return false;
                    } else {
                        $this.get(0).submit();
                    }
                }
            
            }
            
            $this.find(settings.btnSubmit).bind("click", subform);
        /*$this.submit(function(){
			subform();
			return false;
		});*/
        })

    //预创建pop box;
    /*
	if(settings.tiptype!=2 || settings.ajaxurl){		
		creatMsgbox();
	}
	*/
    }
    /**
 * 绑定数据验证
 * must：检测是否有输入，可以输入任何字符，不留空即可通过验证
 * *-[min]-[max]：检测是否为6到16位任意字符
 * n：数字类型
 * s：字符串类型
 * zip：验证是否为邮政编码
 * phone：电话
 * mobile：手机
 * email：email格式
 * radio：如果要验证的元素为单选框，datatype设置为radio
 * checkbox：如果要验证的元素为复选框，datatype设置为checkbox
 * select：如果要验证的元素为下拉框，datatype设置为select
 * 
 * 注意radio，checkbox，select的value值为空时不能通过检测，要非空值才能通过。radio和checkbox元素只需给该组的第一个元素绑定datatype属性即可
 */
    $.fn.Validform.sn = {
        defaults: {
            tiptype: 1
        },
        
        regcheck: function(type, gets) {
            var t = type.split("-");
            switch (t[0]) {
                case "must":
                    return true;
                case "*":
                    if (!gets.match(RegExp("[^\s]{" + t[1] + "," + t[2] + "}")))
                        return false;
                    else
                        return true;
                case "n":
                    return !isNaN(gets);
                case "s":
                    return isNaN(gets);
                case "zip":
                    var repost = /^[0-9]{6}$/;
                    return repost.test(gets);
                case "mobile":
                    var repost = /^13[0-9]{9}$|15[0-9]{9}$|18[0-9]{9}$/;
                    return repost.test(gets);
                case "phone":
                    var repost = /(\d{3}-|\d{4}-)?(\d{8}|\d{7})?/;
                    return repost.test(gets);
                case "mobile&phone":
                    var repost = /(^(\d{3,4}-)?\d{7,8})$|(13[0-9]{9})|(15[0-9]{9})|(18[0-9]{9})/;
                    return repost.test(gets);
                case "email":
                    var repost = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
                    return repost.test(gets);
                case "qq":
                    var repost = /^[1-9]*[1-9][0-9]*$/;
                    return repost.test(gets);
                default:
                    return false;
            }
        },
        
        showmsg: function(msg, type, o, show) { //o:{obj:当前对象, type:1=>正在检测 | 2=>通过}, show用来判断tiptype=1的情况下是否弹出信息框;
            if (gdata.errorobj) {
                gdata.errorobj.addClass("Validform_error");
            }

            /*
		if(type==1 || show=="alwaysshow"){
			gdata.msgobj.find(".Validform_info").text(msg);
		}
		*/
            if (type == 1 && show != "hide" || show == "alwaysshow") {
            //$.showMsg(msg);
            }
            
            if (type == 2) {
                if (o.type) {
                    switch (o.type) {
                        case 1: //正在检测;
                            o.obj.parent().parent().next().find(".Validform_checktip").removeClass().addClass("Validform_checktip Validform_loading").text(msg);
                            break;
                        case 2: //检测通过;
                            o.obj.parent().parent().next().find(".Validform_checktip").removeClass().addClass("Validform_checktip Validform_right").text(msg);
                    }
                } else {
                    o.obj.parent().parent().next().find(".Validform_checktip").removeClass().addClass("Validform_checktip Validform_wrong").text(msg);
                }
            }
        
        },
        
        checkform: function(obj, parentobj, tiptype, show) { //show用来判断是表达提交还是blur事件引发的检测;
            var errormsg = obj.attr("errormsg") || gdata.tipmsg.w;
            
            if (obj.is("[datatype='radio']")) { //判断radio表单元素;
                var inputname = obj.attr("name");
                var radiovalue = parentobj.find(":radio[name=" + inputname + "]:checked").val();
                if (!radiovalue) {
                    gdata.errorobj = obj;
                    this.showmsg(errormsg, tiptype, {obj: obj}, show);
                    return false;
                }
                gdata.errorobj = null;
                this.showmsg(gdata.tipmsg.r, tiptype, {obj: obj,type: 2}, "hide");
                return "radio";
            }
            
            if (obj.is("[datatype='checkbox']")) { //判断checkbox表单元素;
                var inputname = obj.attr("name");
                var checkboxvalue = parentobj.find(":checkbox[name=" + inputname + "]:checked").val();
                if (!checkboxvalue) {
                    gdata.errorobj = obj;
                    this.showmsg(errormsg, tiptype, {obj: obj}, show);
                    return false;
                }
                gdata.errorobj = null;
                this.showmsg(gdata.tipmsg.r, tiptype, {obj: obj,type: 2}, "hide");
                return "checkbox";
            }
            
            if (obj.is("[datatype='select']")) { //判断select表单元素;
                if (!obj.val()) {
                    gdata.errorobj = obj;
                    this.showmsg(errormsg, tiptype, {obj: obj}, show);
                    return false;
                }
                gdata.errorobj = null;
                this.showmsg(gdata.tipmsg.r, tiptype, {obj: obj,type: 2}, "hide");
                return "select";
            }
            
            var defaultvalue = obj.attr("tip");
            if ((obj.val() == "" || obj.val() == defaultvalue) && obj.attr("ignore") != "ignore") {
                gdata.errorobj = obj;
                this.showmsg(obj.attr("nullmsg") || gdata.tipmsg.s, tiptype, {obj: obj}, show);
                return false;
            }
            
            if (obj.attr("recheck")) {
                var theother = parentobj.find("input[name=" + obj.attr("recheck") + "]:first");
                if (obj.val() != theother.val()) {
                    gdata.errorobj = obj;
                    this.showmsg(errormsg, tiptype, {obj: obj}, show);
                    return false;
                }
            }
            
            obj.removeClass("Validform_error");
            gdata.errorobj = null;
            return true;
        }
    
    }
    
    var gdata = { //用来缓存全局数据
        ver: "", //静态文件版本	
        msgobj: "",
        msghidden: true,
        errorobj: null,
        tipmsg: { //默认提示文字;
            w: "请输入正确信息！",
            r: "通过信息验证！",
            c: "正在检测信息…",
            s: "请填入信息！",
            v: "所填信息没有经过验证，请稍后…",
            p: "正在提交数据…"
        }
    }

})(jQuery);

