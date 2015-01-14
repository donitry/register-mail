using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.IO;
using System.Text.RegularExpressions;
using GameControl.Auth;
using System.Diagnostics;
using System.Net;

namespace GameControl.Script
{
    class CRegMail126 : IMainPlatform
    {
        private CPlatfrom _CRegMain;
        private string sEnv, sSid, sTmpUrl, sTmpResponse;
        private Hashtable _hTmpHashTable;

        public CRegMail126(string sXmlSrc)
        {
            _CRegMain = new CPlatfrom(sXmlSrc);
            sEnv = sSid = sTmpUrl = sTmpResponse = "";
        }

        /// <summary>
        /// 初始化连接，保留cookies以及env,value
        /// </summary>
        /// <param name="xmlSetting"></param>
        /// <returns></returns>
        public object InitialCookie(string sXmlMark,string sProxy)
        {
            this._CRegMain.sSetting = this._CRegMain._cXmlParser.GetElementList("RegInfo", sXmlMark);
            this._CRegMain.SetNetUserAgent("Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/34.0.1847.131 Safari/537.36");
            if (this._CRegMain.sSetting != null && this._CRegMain.sSetting.Count > 0 && this._CRegMain.sSetting.ContainsKey("RegUrl"))
            {
                this._CRegMain.NetworkCookiesReflush(); this._CRegMain.NetworkSetProxy(sProxy);
                this.sTmpUrl = this._CRegMain.sSetting["RegUrl"] + "/call.do?cmd=register.entrance&from=126mail";
                this.sTmpResponse = (string)this._CRegMain.GetHttpResponse(this.sTmpUrl, null, CPlatfrom.rHttpRequestType._Type_Get,CPlatfrom.rHttpResponseType._Type_String);
                if (this.sTmpResponse != null && this.sTmpResponse.Length > 0)
                {
                    this.sSid = Regex.Match(this.sTmpResponse, @"(?<=sid\s*:\s*['""]).*?(?=["",])", RegexOptions.IgnoreCase | RegexOptions.Singleline | RegexOptions.IgnorePatternWhitespace).Value;
                    this.sEnv = Regex.Match(this.sTmpResponse, @"(?<=envalue\s*:\s*['""]).*?(?=["",])", RegexOptions.IgnoreCase | RegexOptions.Singleline | RegexOptions.IgnorePatternWhitespace).Value;
                    if (this.sEnv != "" && this.sSid != "")
                    {
                        if (this._CRegMain.sSetting.ContainsKey("WebScriptPath") && File.Exists(this._CRegMain.sSetting["WebScriptPath"]))
                        {
                            string tmpEnv = "", tmpScript = File.ReadAllText(this._CRegMain.sSetting["WebScriptPath"]);
                            do
                            {
                                tmpEnv = (string)this._CRegMain.ScriptRun("initEnv", new object[] { this.sEnv }, tmpScript);
                            } while (tmpEnv.StartsWith("0", StringComparison.OrdinalIgnoreCase) | tmpEnv.Length < 11);
                            this.sEnv = tmpEnv; object retObj = this.GetVerifyCode(5000);
                            Debug.WriteLine("initEnv:" + this.sEnv);
                            if (retObj != null)
                            {
                                _hTmpHashTable = new Hashtable();
                                _hTmpHashTable.Add("sid", this.sSid);
                                _hTmpHashTable.Add("sd", this._CRegMain.GetCookieValue("ser_adapter"));
                                this._CRegMain.GetHttpResponse(this._CRegMain.sSetting["RealRegUrl"] + "/prepare.jsp", _hTmpHashTable, CPlatfrom.rHttpRequestType._Type_Get, CPlatfrom.rHttpResponseType._Type_Null);
                                //this._cNet.GetHttpData(this.sSetting["RealRegUrl"] + "/prepare.jsp?sid=" + this.sSid + "&sd=" + this.GetCookieValue("ser_adapter"), null, null);
                                if (sProxy != "")
                                    File.AppendAllText("./Proxy/usedip.txt", sProxy + "\r\n", Encoding.UTF8);
                                System.Threading.Thread.Sleep(200);
                                return retObj;
                            }
                        } Debug.WriteLine("no script file!");
                    }
                }
            } return null;
        }


        /// <summary>
        /// 获得验证码图片
        /// </summary>
        /// <param name="sVerifyUrl"></param>
        /// <returns></returns>
        public object GetVerifyCode(ulong splitTime)
        {
            if (this._CRegMain.sSetting.Count > 0 && this._CRegMain.sSetting.ContainsKey("VerifyCodeUrl") && this._CRegMain.sSetting.ContainsKey("WebScriptPath"))
            {
                string tmpScript = File.ReadAllText(this._CRegMain.sSetting["WebScriptPath"]);
                string tmpa = this._CRegMain.ScriptRun("getDateTime", new object[] { "1" }, tmpScript).ToString();
                ulong ul = ulong.Parse(tmpa) - 5000;

                this.sTmpUrl = this._CRegMain.sSetting["VerifyCodeUrl"] + "/call.do?cmd=register.verifyCode&v=common/verifycode/vc_en&env=" + this.sEnv + "&t=" + ul.ToString();//+ ((ulong)myScript.Run("getDateTime", new object[] { "1" }, tmpScript) - 5000).ToString();

                System.Threading.Thread.Sleep(200);
                return this._CRegMain.GetHttpResponse(this.sTmpUrl, null, CPlatfrom.rHttpRequestType._Type_Get, CPlatfrom.rHttpResponseType._Type_Image);
                //return _cNet.GetHttpData(this.sTmpUrl, null, this._cNet.GetVerifyImg);
            } return null;
        }

        public object TakenAccount(string sVerifyCode, ref bool bdone)
        {
            if (this._CRegMain.sSetting.Count > 0 && this._CRegMain.sSetting.ContainsKey("RealRegUrl"))
            {
                Hashtable regParams = this._CRegMain.BuiltRegParams(BuiltReg126mail); regParams.Add("vcode", sVerifyCode);
                this.sTmpUrl = this._CRegMain.sSetting["RealRegUrl"] + "/call.do;jsessionid=" + this.sSid + "?cmd=register.start";
                this.sTmpResponse = (string)this._CRegMain.GetHttpResponse(this.sTmpUrl, regParams, CPlatfrom.rHttpRequestType._Type_Post, CPlatfrom.rHttpResponseType._Type_String);
                Debug.WriteLine(regParams["name"].ToString() + " &&&&&&& " + regParams["password"].ToString());
                if (this.sTmpResponse != null && Regex.IsMatch(this.sTmpResponse, @"注册成功", RegexOptions.IgnoreCase | RegexOptions.Singleline | RegexOptions.IgnorePatternWhitespace))
                {
                    this.SaveAccount(regParams); bdone = true;
                    Debug.WriteLine(this._CRegMain.GetRegMainDBaseLastError());
                } return this.sTmpResponse;
            } return null;
        }

        private string BuiltRegMysqlStr(Hashtable hRegParams)
        {
            string tmpMysqlStr = string.Format("INSERT INTO `verifysystem`.`verify_user`(`username`,`password`,`email`)" +
                "SELECT '{0}','{1}','{2}' FROM DUAL WHERE '{3}' NOT IN (SELECT email FROM `verifysystem`.`verify_user`);",
                hRegParams["name"], hRegParams["password"], hRegParams["uid"], hRegParams["uid"]);
            return tmpMysqlStr;
        }

        private void BuiltReg126mail(string[] iUid, ref Hashtable regParams)
        {
            this.sTmpUrl = this._CRegMain.sSetting["RegUrl"] + "/call.do?cmd=urs.checkName";
            Hashtable tmpParams = new Hashtable(); tmpParams.Add("name", iUid[0]);
            this._CRegMain.GetHttpResponse(this.sTmpUrl, tmpParams, CPlatfrom.rHttpRequestType._Type_Post, CPlatfrom.rHttpResponseType._Type_Null);

            System.Threading.Thread.Sleep(10000); 
            regParams.Add("name", iUid[0]);
            regParams.Add("uid", iUid[0] + "@126.com");
            regParams.Add("password", iUid[1]);
            regParams.Add("confirmPassword", iUid[1]);
            regParams.Add("mobile", "");
            regParams.Add("flow", "main");
            regParams.Add("from", "126mail");
        }

        private void SaveAccount(Hashtable hRegParams)
        {
            if (this._CRegMain.GetRegMainDBaseLastError() == "ok")
            {
                if (this._CRegMain.CRegMainDBaseCommend(this.BuiltRegMysqlStr(hRegParams)) > 0)
                {
                    return;
                }
                else
                    goto SaveInFile;
            }
            
            SaveInFile:
            File.AppendAllText(@"./RegMail_126.txt", hRegParams["name"].ToString() + "," + hRegParams["password"].ToString() + "\r\n", Encoding.UTF8); 
        }

        public object TakenMailVerif()
        {
            return null;
        }
    }
}
