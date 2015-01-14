using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.IO;
using System.Windows.Forms;
using GameControl.Auth;
using GameControl.Script;
using System.Diagnostics;
using System.Threading;
using System.Text.RegularExpressions;


namespace GameControl
{
    /// <summary>
    /// 界面操作平台
    /// </summary>
    /// 

    public delegate void WinFormControlDelegate();

    public partial class GameControl : Form
    {
        string sXmlPathMain = "";
        CTools _cTools;CNetwork _cNet;
        CScriptMain _cRegScriptMain;

        public GameControl()
        {
            InitializeComponent();
            sXmlPathMain = @"./Conf/AppConfig.xml";
            _cTools = new CTools();_cNet = new CNetwork();
            InitialCboBoxXmlFile();
            this.SaveXmlDialog.InitialDirectory = System.Windows.Forms.Application.StartupPath;
        }

        public void UpdateTextBox()
        {
            do 
            {
                System.Threading.Thread.Sleep(1000);
                this.Invoke(new Action(() =>
                    {
                        this.ScriptProgressBar.Value += 1;
                    })); 
            } while (this.ScriptProgressBar.Value < this.ScriptProgressBar.Maximum);
            if (this.ScriptProgressBar.Value >= this.ScriptProgressBar.Maximum)
            {
                this.ScriptProgressBar.Value = this.ScriptProgressBar.Minimum;
            }
        }

        private void InitialCboBoxXmlFile()
        {
            var _XmlParam = new CTools.XmlControl(sXmlPathMain);
            ArrayList tmpList = _XmlParam.GetNodeListMark("RegInfo");
            if (tmpList.Count > 0)
            {
                foreach (string mark in tmpList)
                {
                    this.CboBox_XmlFile.Items.Add(mark);
                }
            } this.CboBox_XmlFile.SelectedIndex = -1;

            tmpList = _XmlParam.GetNodeListMark("VerifyInfo");
            if (tmpList.Count > 0)
            {
                foreach (string mark in tmpList)
                {
                    this.CboBox_XmlFile.Items.Add(mark);
                }
            } this.CboBox_XmlFile.SelectedIndex = -1;  
        }

        private void PrepareRegister(string sProxy)
        {
            object _objImg = this._cRegScriptMain.ReadyToRegister(this.CboBox_XmlFile.Text, sProxy);
            this.PicBox_VerifyCode.Image = _objImg == null ? null : (Image)_objImg;
            this.StatusStripA.Items["StatusLabel_Form"].Text = _objImg == null ? "no verify" : "wait reg!";
        }


        private void GameControl_FormClosing(object sender, System.Windows.Forms.FormClosingEventArgs e)
        {
            
            Debug.WriteLine("closing");
        }

        private void GameControl_KeyPress(object sender, System.Windows.Forms.KeyPressEventArgs e)
        {
            if (e.KeyChar == 13)
                this.But_SubmitReg_Click(sender, e);
            else if (e.KeyChar == 32)
                this.PicBox_VerifyCode_Click(sender, e);
            
        }

        private void But_StartReg_Click(object sender, EventArgs e)
        {
            this.TxtBox_HttpResponse.Text = "";
            this.PicBox_VerifyCode.Image = null;
            this.PrepareRegister("");
        }

        private void CboBox_XmlFile_TextChanged(object sender, EventArgs e)
        {
            switch (this.CboBox_XmlFile.Text)
            {
                case "RegMail_126":
                    {
                        this._cRegScriptMain = new CScriptMain(CScriptMain.ScriptClass.RegMail_126, sXmlPathMain);
                        this.But_StartReg.Enabled = true; this.But_ProxyNext.Enabled = true;
                    }break;
                case "RegAccount_17173":
                    {
                        this._cRegScriptMain = new CScriptMain(CScriptMain.ScriptClass.RegAccount_17173, sXmlPathMain);
                        this.But_StartReg.Enabled = true; this.But_ProxyNext.Enabled = true;
                    }break;
                case "GameVerify_17173":
                    {
                        this._cRegScriptMain = new CScriptMain(CScriptMain.ScriptClass.GameVerify_17173, sXmlPathMain);
                        this.But_StartReg.Enabled = true; this.But_ProxyNext.Enabled = true;
                    } break;
                default: this._cRegScriptMain = null; this.But_StartReg.Enabled = false; this.But_ProxyNext.Enabled = false; break;
            }
        }

        private void But_ProxyNext_Click(object sender, EventArgs e)
        {
            if (this.TxtBox_Proxy.Text != "" && File.Exists(this.TxtBox_Proxy.Text))
            {
                string[] _ProxyArray = File.ReadAllLines(this.TxtBox_Proxy.Text, Encoding.UTF8);
                if (_ProxyArray.Length > 0)
                {
                    string tmpProxy = _ProxyArray[new Random().Next(_ProxyArray.Length)];
                    if (tmpProxy.IndexOf('#') >0)
                    {
                        tmpProxy = tmpProxy.Substring(0, tmpProxy.IndexOf('#'));
                    }
                    Debug.WriteLine("proxy:" + tmpProxy);
                    PrepareRegister(tmpProxy);
                }
            }
            else
            {
                this.TxtBox_HttpResponse.Text = "代理地址文件不存在或未设置!";
            }
        }

        private void But_SubmitReg_Click(object sender, EventArgs e)
        {
            if (this.TxtBox_VerifyCode.Text != "" && this._cRegScriptMain != null)
            {
                bool bDone = false;
                this.TxtBox_HttpResponse.Text = (string)this._cRegScriptMain.TabkenRegister(this.TxtBox_VerifyCode.Text, ref bDone);
                if (bDone)
                {
                    this.StatusStripA.Items["StatusLabel_Form"].Text = "well done!";
                    this.PicBox_VerifyCode.Image = null;
                    Thread thMailVerify = new Thread(this.MailVerifyThread);
                    thMailVerify.IsBackground = true; thMailVerify.Start((object)this._cRegScriptMain);
                }
                else
                {
                    this.StatusStripA.Items["StatusLabel_Form"].Text = "fail!";
                } this.TxtBox_VerifyCode.Text = "";
            }
        }

        private void button1_Click(object sender, EventArgs e)
        {
            //string tmpScript = "function initEnv(a){var q = 10, w = a, n, m = w.length, f = new Date(), b = new Date().getTime(), c = b % q, h = (b - c) / q;if (c < 1) {c = 1}c = b % q;var d = b % (q * q);h = (b - d) / q;h = h / q;d = (d - c) / q;var z = b + \"\", p = z.charAt(q), g = c + \"\" + d + \"\" + p, l = Number(g), e = l * Number(w), x = e + \"\", k = \"\";for (n = (e + \"\").length - 1; n >= 0; n--) {var o = x.charAt(n);k = k + o}var i = p + k + d + c, y = i.length, j = 0, r = \"\", v = \"\";for (j = 0; j < y; q++) {r = r + i.charAt(j);j = j + 2}for (j = 1; j < y; j = j + 2) {v = v + i.charAt(j)}var u = r + v;u = i;var t = 0, s = \"\";for (t = 0; t < u.length; t++) {s = s + u.charAt(t)}return u}function getDateTime(){var a = new Date().getTime();return a}";
            /*
            CWebScript.ScriptEngine myScript = new CWebScript.ScriptEngine(CWebScript.ScriptLanguage.JavaScript);
            string tmpScript = myScript.GetScriptCode("./VerifyJs/check.js");
            Debug.WriteLine(myScript.Run("getcookies", new object[] { "1" }, tmpScript).ToString());*/


            /*
            var testt = new CTools.XmlControl("./Conf/AppConfig.xml");
            //Debug.WriteLine(testt.GetAttrValue("DataBase", "ConnectionString"));
            testt.GetElementList("RegInfo", "126.com");
            
            CRegMain _cc = new CRegMain(sXmlPathMain);
            string temp = "SELECT * FROM `verifysystem`.`verify_user`;";
            ArrayList att = _cc.CRegMainDBaseQuery(temp) as ArrayList;
            Debug.WriteLine(att.Count);

            CMail cc = new CMail();
            var _MailInfo = new CMail.MailInfo();
            _MailInfo.sAccount[0] = "dongsun7034713311"; _MailInfo.sAccount[1] = "uSIJDlH";
            _MailInfo.sMailServer = "imaps://imap.126.com";
            _MailInfo.sSubject = "17173"; _MailInfo.sKeysMatch = "激活码";
            _MailInfo.uTimeOut = 60 * 1000;
            Debug.WriteLine(cc.GetMailBodyImap4(_MailInfo));

            CRegMain creg = new CRegMain(sXmlPathMain);
            creg.sSetting = creg._cXmlParser.GetElementList("RegInfo", "RegAccount_17173");
            //string[] tmpUserInfo = new string[] { "sexdon@126.com", "jakejim830831", "RegAccount_17173"};
            //creg.NetWorkMailVerify(tmpUserInfo);
            string tmpScript = File.ReadAllText(creg.sSetting["WebScriptPath"]);
            //tmpScript = (string)this._CRegMain.ScriptRun("getcookies", new object[] { "1" }, tmpScript).ToString();
            tmpScript = creg.ScriptRun("hexMd5", new object[] { "jakejim" }, tmpScript).ToString();
            Debug.WriteLine(tmpScript);
            
            Thread th = new Thread(this.MailVerifyThread);
            th.IsBackground = true;
            th.Start((object)this._scriptMain);

            string a = (string)creg.GetHttpResponse("https://passport.17173.com/main", null, CRegMain.rHttpRequestType._Type_Get, CRegMain.rHttpResponseType._Type_String);
            Debug.WriteLine(a);*/

            bool tb=false;
            CGVerify17173 _CLogin17173c = new CGVerify17173(sXmlPathMain);
            string a = (string)_CLogin17173c.InitialCookie("GameVerify_17173", "");
            string b = (string)_CLogin17173c.TakenAccount("", ref tb);
            this.TxtBox_HttpResponse.Text = b;
        }

        private void PicBox_VerifyCode_Click(object sender, EventArgs e)
        {
            if (this._cRegScriptMain != null)
            {
                this.TxtBox_HttpResponse.Text = "";
                this.PicBox_VerifyCode.Image = (Image)_cRegScriptMain.GetVerifyCode(0);
            }
        }

        private void MailVerifyThread(object _Object)
        {
            //MethodInvoker mi = new MethodInvoker(UpdateTextBox);
            //BeginInvoke(mi);
            var _ScriptMail = _Object as CScriptMain;
            Hashtable hTempHashTable = _ScriptMail.TakenMailVerif() as Hashtable;
            if (hTempHashTable != null)
            {
                this.Invoke(new Action(() =>
                {
                    string sVerifyRet = hTempHashTable["email"].ToString() + ":" + hTempHashTable["VerifyRegRet2"].ToString();
                    this.ListBox_VerifyResult.Items.Add(sVerifyRet);
                    this.ListBox_VerifyResult.SelectedIndex = this.ListBox_VerifyResult.Items.Count - 1;
                    //this.ScriptProgressBar.Value += 1;
                })); 
            }    

        }

        private void GetProxy360Ip()
        {
            string tmpUrl = @"http://www.proxy360.cn/default.aspx";
            string tmpResponse = (string)_cNet.GetHttpData(tmpUrl, null, _cNet.GetResponseStr);

            if (tmpResponse != null && tmpResponse != "")
            {
                MatchCollection _MackCollection = Regex.Matches(tmpResponse, @"<div.class=\""proxylistitem\"".*?>.*?</div>", RegexOptions.IgnoreCase | RegexOptions.Singleline | RegexOptions.IgnorePatternWhitespace);
                foreach (Match _m in _MackCollection)
                {
                    MatchCollection _MackCollection2 = Regex.Matches(_m.Value, @"<span.*?class=\""tbBottomLine\"".*?>.*?</span>", RegexOptions.IgnoreCase | RegexOptions.Singleline | RegexOptions.IgnorePatternWhitespace);
                    string[] ipp = new string[10];
                    for (int i = 0; i < _MackCollection2.Count; i++)
                    {
                        string tmpStr = Regex.Match(_MackCollection2[i].Value, @"(?<=>).*(?=<)", RegexOptions.IgnoreCase | RegexOptions.Singleline | RegexOptions.IgnorePatternWhitespace).Value;
                        ipp[i] = tmpStr.Trim();
                    } File.AppendAllText("./Proxy/proxy360.txt", ipp[0] + ":" + ipp[1] + "\r\n", Encoding.UTF8);

                }
            }
        } 

    }
}
