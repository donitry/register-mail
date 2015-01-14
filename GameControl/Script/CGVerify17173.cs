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
    class CGVerify17173 : IMainPlatform
    {
        private CGVerifyMain _CLogMain;
        private string sScriptCode, sTmpRequest, sTmpResponse;
        private Hashtable _hTmpHashTable;
        protected string sXmlSrc;

        public CGVerify17173(string sXmlSrc)
        {
            _CLogMain = new CGVerifyMain(sXmlSrc);
            this.sXmlSrc = sXmlSrc;
            sScriptCode = sTmpRequest = sTmpResponse = "";
        }

        protected bool tBuiltLogCookie()
        {
            string tmpScript = (string)this._CLogMain.ScriptRun("getcookies", new object[] { "1" }, this.sScriptCode).ToString();
            string[] sCookiesParams = tmpScript.Split('$');
            string[] sCookiesNames = { "IPLOC", "ONLINE_TIME", "DIFF", "SUV", "sessionid", "sessionid2", "NUV" };
            //if (this._CLogMain.hUserInfo != null && this._CLogMain.hUserInfo.ContainsKey("email"))
            {
                _hTmpHashTable = new Hashtable();
                this._hTmpHashTable.Add("purl_logs", sCookiesParams[7]);
                this._hTmpHashTable.Add("purl_log1", sCookiesParams[8]);
                this._hTmpHashTable.Add("purl_pvapp", sCookiesParams[9]);
                //if (!this._CLogMain.LoadCookie(this._CLogMain.hUserInfo["email"].ToString() + ".txt"))
                {
                    int i = 0;
                    foreach (string ist in sCookiesNames)
                    {
                        var myCookie = new Cookie(ist, sCookiesParams[i], "/", ".17173ie.com");
                        this._CLogMain.NetWorkCookieAdd(myCookie);
                        myCookie = new Cookie(ist, sCookiesParams[i], "/", ".17173.com");
                        this._CLogMain.NetWorkCookieAdd(myCookie); i++;
                    }
                } return true;
            } //return false;
        }

        protected bool tInitialUserInfo()
        {
            ArrayList _aTmpArrayList = new ArrayList();
            _aTmpArrayList = this._CLogMain.CRegMainDBaseQuery("SELECT * FROM `verifysystem`.`verify_user` where `verify_17173`=2;") as ArrayList;
            if (_aTmpArrayList.Count > 0)
            {
                var vRand = new Random();
                this._CLogMain.hUserInfo = _aTmpArrayList[vRand.Next(0, _aTmpArrayList.Count - 1)] as Hashtable;
                return true;
            }return false;
        }

        protected bool tInitialCookie(string sXmlMark, string sProxy)
        {
            this._CLogMain.NetworkCookiesReflush(); this._CLogMain.NetworkSetProxy(sProxy);
            this._CLogMain.SetNetUserAgent("Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.31 (KHTML, like Gecko) Chrome/26.0.1410.66 Safari/537.31 17173 1.1.670");
            this._CLogMain.sSetting = this._CLogMain._cXmlParser.GetElementList("VerifyInfo", sXmlMark);
            if (this._CLogMain.sSetting.ContainsKey("WebScriptPath") && File.Exists(this._CLogMain.sSetting["WebScriptPath"].ToString()))
            {
                this.sScriptCode = File.ReadAllText(this._CLogMain.sSetting["WebScriptPath"].ToString());
                return tBuiltLogCookie();
            } return false;
        }

        protected bool tLoginAccount(string sVerifyCode)
        {
            Hashtable hRegParams = new Hashtable();
            this.sTmpRequest = @"https://passport.17173.com/sso/login";

            string sHexMd5 = (string)this._CLogMain.ScriptRun("hexMd5", new object[] { this._CLogMain.hUserInfo["password"].ToString() }, this.sScriptCode).ToString();
            string sGuid = (string)this._CLogMain.ScriptRun("guid", new object[] { "1" }, this.sScriptCode).ToString();
            string sPgvSi = (string)this._CLogMain.ScriptRun("get_pgv_pvi", new object[] { _CLogMain.sSetting["GameVerifyUrl"] }, this.sScriptCode).ToString(); string[] sCookies = sPgvSi.Split('$');
            for (int i = 0; i < sCookies.Length; i++)
            {
                string[] sCookieValue = sCookies[i].Split(";".ToCharArray());
                string[] sCookieArg = sCookieValue[0].Split('=');
                Cookie _tmpCookie = new Cookie(sCookieArg[0], sCookieArg[1], "/", ".17173ie.com");
                _tmpCookie.Discard = false; _tmpCookie.Expired = false; _tmpCookie.HttpOnly = true;
                _CLogMain.NetWorkCookieAdd(_tmpCookie);    
            }

            Debug.WriteLine("sPgvSi==>"+sPgvSi);

            hRegParams.Add("v", "2");
            hRegParams.Add("username", CTools.UrlEncode(this._CLogMain.hUserInfo["email"].ToString()));
            hRegParams.Add("password", sHexMd5); hRegParams.Add("validcode", sVerifyCode);
            hRegParams.Add("domain", "17173ie.com"); hRegParams.Add("appid", "10086"); hRegParams.Add("persistentcookie", "0");
            hRegParams.Add("callback", "pprtjsonp" + sGuid);

            sTmpResponse = (string)_CLogMain.GetHttpResponse(sTmpRequest, hRegParams, CPlatfrom.rHttpRequestType._Type_Get, CPlatfrom.rHttpResponseType._Type_String); System.Threading.Thread.Sleep(200); hRegParams.Clear();
            string sTmpStr = Regex.Match(sTmpResponse, "(?<=status\":+).*?(?=[?'\"\",]+)", RegexOptions.IgnoreCase | RegexOptions.Singleline | RegexOptions.IgnorePatternWhitespace).Value; Debug.WriteLine("status:" + sTmpStr);

            

            return sTmpStr == "1" ? true : false;
        }

        protected bool tCheckOnline()
        {
            sTmpRequest = _CLogMain.sSetting["CheckLogin"];
            sTmpResponse = (string)_CLogMain.GetHttpResponse(sTmpRequest, null, CPlatfrom.rHttpRequestType._Type_Get, CPlatfrom.rHttpResponseType._Type_String); System.Threading.Thread.Sleep(200);
            string sTmpStr = Regex.Match(sTmpResponse, "(?<=flag\":+).*?(?=[?'\"\",]+)", RegexOptions.IgnoreCase | RegexOptions.Singleline | RegexOptions.IgnorePatternWhitespace).Value; Debug.WriteLine("flag:" + sTmpStr);
            return sTmpStr == "1" ? true : false;
        }

        public object InitialCookie(string sXmlMark, string sProxy)
        {
            if (tInitialCookie(sXmlMark, sProxy) && tInitialUserInfo())
            {
                sTmpRequest = _CLogMain.sSetting["GameVerifyUrl"];
                sTmpResponse = (string)_CLogMain.GetHttpResponse(sTmpRequest, null, CPlatfrom.rHttpRequestType._Type_Get, CPlatfrom.rHttpResponseType._Type_String); System.Threading.Thread.Sleep(200);
                if (tLoginAccount(""))
                {
                    sTmpRequest = @"https://passport.17173.com/sso/allcrossdomain?do=login&domain=17173ie.com";
                    sTmpResponse = (string)_CLogMain.GetHttpResponse(sTmpRequest, null, CPlatfrom.rHttpRequestType._Type_Get, CPlatfrom.rHttpResponseType._Type_String); System.Threading.Thread.Sleep(200);

                    sTmpRequest = this._hTmpHashTable["purl_pvapp"].ToString();
                    _CLogMain.GetHttpResponse(sTmpRequest, null, CPlatfrom.rHttpRequestType._Type_Get, CPlatfrom.rHttpResponseType._Type_Null);
                    System.Threading.Thread.Sleep(200);

                    string sGuid = (string)this._CLogMain.ScriptRun("guid", new object[] { "1" }, this.sScriptCode).ToString();
                    sTmpRequest = @"https://passport.17173.com/sso/loginwarning?callback=pprtjsonp" + sGuid;
                    sTmpResponse = (string)_CLogMain.GetHttpResponse(sTmpRequest, null, CPlatfrom.rHttpRequestType._Type_Get, CPlatfrom.rHttpResponseType._Type_String); System.Threading.Thread.Sleep(200);

                    return GetVerifyCode(0);
                }
            } return null;
        }

        public object GetVerifyCode(ulong splitTime)
        {
            sTmpRequest = this._hTmpHashTable["purl_pvapp"].ToString();
            _CLogMain.GetHttpResponse(sTmpRequest, null, CPlatfrom.rHttpRequestType._Type_Get, CPlatfrom.rHttpResponseType._Type_Null);
            System.Threading.Thread.Sleep(200);

            Debug.WriteLine(tCheckOnline());

            string verifyCode = (string)this._CLogMain.ScriptRun("getlotcode", new object[] { "1" }, this.sScriptCode).ToString();
            sTmpRequest = _CLogMain.sSetting["VerifyCodeUrl"] + "?" + verifyCode;
            return _CLogMain.GetHttpResponse(sTmpRequest, null, CPlatfrom.rHttpRequestType._Type_Get, CPlatfrom.rHttpResponseType._Type_Image);
        }

        public object TakenAccount(string sVerifyCode, ref bool bdone)
        {
            sTmpRequest = _CLogMain.sSetting["VerifyCodePostUrl"] + "?do=Lottery&code=" + CTools.UrlEncode(sVerifyCode);
            _CLogMain.test();
            sTmpResponse = (string)_CLogMain.GetHttpResponse(sTmpRequest, null, CPlatfrom.rHttpRequestType._Type_Get, CPlatfrom.rHttpResponseType._Type_String);
            string sTmpStr = Regex.Match(sTmpResponse, "(?<=flag\":+).*?(?=[?'\"\",]+)", RegexOptions.IgnoreCase | RegexOptions.Singleline | RegexOptions.IgnorePatternWhitespace).Value; Debug.WriteLine("flag:" + sTmpStr);
            bdone = sTmpStr == "1" ? true : false;
            return sTmpResponse;
        }

        public object TakenMailVerif()
        {
            return null;
        }

        private string BuiltRegMysqlStr(Hashtable hRegParams, int iFlag)
        {
            string tmpMysqlStr = "UPDATE `verifysystem`.`verify_user` SET `verify_17173`=" + iFlag + " WHERE `username`='" + hRegParams["username"].ToString() + "';";
            return tmpMysqlStr;
        }
    }
}
