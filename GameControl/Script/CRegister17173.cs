using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.IO;
using System.Diagnostics;
using System.Net;
using GameControl.Auth;
using System.Text.RegularExpressions;

namespace GameControl.Script
{
    class CRegister17173 : IMainPlatform
    {
        private CPlatfrom _CRegMain;
        private string sTmpUrl, sTmpResponse;
        private Hashtable _hTmpHashTable;

        public CRegister17173(string sXmlSrc)
        {
            _CRegMain = new CPlatfrom(sXmlSrc);
            sTmpUrl = sTmpResponse = "";
        }

        private bool BuiltCookies()
        {
            if (this._CRegMain.sSetting.ContainsKey("WebScriptPath") && File.Exists(this._CRegMain.sSetting["WebScriptPath"]))
            {
                string tmpScript = File.ReadAllText(this._CRegMain.sSetting["WebScriptPath"]);
                tmpScript = (string)this._CRegMain.ScriptRun("getcookies", new object[] { "1" }, tmpScript).ToString();
                string[] sCookiesParams = tmpScript.Split('$');
                string[] sCookiesNames = { "IPLOC", "ONLINE_TIME", "DIFF", "SUV", "sessionid", "sessionid2", "NUV" };
                if (sCookiesParams.Length >= 7)
                {
                    Cookie myCookie; int i = 0;
                    foreach (string ist in sCookiesNames)
                    {
                        myCookie = new Cookie(ist, sCookiesParams[i], "/", ".17173.com");
                        this._CRegMain.NetWorkCookieAdd(myCookie); i++;
                    }
                    this._CRegMain.sSetting.Add("purl_logs", sCookiesParams[7]);
                    this._CRegMain.sSetting.Add("purl_log1", sCookiesParams[8]);
                    this._CRegMain.sSetting.Add("purl_pvapp", sCookiesParams[9]);
                    return true;
                }
            } return false;
        }

        public object InitialCookie(string sXmlMark, string sProxy)
        {
            this._CRegMain.sSetting = this._CRegMain._cXmlParser.GetElementList("RegInfo", sXmlMark);
            this._CRegMain.sSetting.Add("Proxy", sProxy);
            if (this._CRegMain.sSetting.Count > 0 && this._CRegMain.sSetting.ContainsKey("RegUrl"))
            {
                this._CRegMain.NetworkCookiesReflush(); this._CRegMain.NetworkSetProxy(sProxy);
                this.sTmpUrl = this._CRegMain.sSetting["RegUrl"] + "/register";
                this.sTmpResponse = (string)this._CRegMain.GetHttpResponse(this.sTmpUrl, null, CPlatfrom.rHttpRequestType._Type_Get, CPlatfrom.rHttpResponseType._Type_String); System.Threading.Thread.Sleep(1000);
                if (this.sTmpResponse != null && this.BuiltCookies())
                {
                    //this._CRegMain.GetHttpResponse(this._CRegMain.sSetting["purl_logs"], null, CRegMain.rHttpRequestType._Type_Get, CRegMain.rHttpResponseType._Type_Null); System.Threading.Thread.Sleep(200);
                    this._CRegMain.GetHttpResponse(this._CRegMain.sSetting["purl_log1"], null, CPlatfrom.rHttpRequestType._Type_Get, CPlatfrom.rHttpResponseType._Type_Null); System.Threading.Thread.Sleep(200);
                    return this.GetVerifyCode(0);
                }
            } return null;
        }

        public object GetVerifyCode(ulong splitTime)
        {
            if (this._CRegMain.sSetting.Count > 0 && this._CRegMain.sSetting.ContainsKey("VerifyCodeUrl"))
            {
                this.sTmpUrl = this._CRegMain.sSetting["VerifyCodeUrl"] + "/register/captcha?refresh=1";
                this.sTmpResponse = (string)this._CRegMain.GetHttpResponse(this.sTmpUrl, null, CPlatfrom.rHttpRequestType._Type_Get, CPlatfrom.rHttpResponseType._Type_String); System.Threading.Thread.Sleep(200);
                this.sTmpResponse = Regex.Match(this.sTmpResponse, "(?<=v=+).*?(?=[?'\"\"]+)", RegexOptions.IgnoreCase | RegexOptions.Singleline | RegexOptions.IgnorePatternWhitespace).Value;
                if (this.sTmpResponse != "")
                {
                    this.sTmpUrl = this._CRegMain.sSetting["VerifyCodeUrl"] + "/register/captcha?v=" + this.sTmpResponse;
                    System.Threading.Thread.Sleep(200);
                    return this._CRegMain.GetHttpResponse(this.sTmpUrl, null, CPlatfrom.rHttpRequestType._Type_Get, CPlatfrom.rHttpResponseType._Type_Image);
                }
            } return null;
        }

        public object TakenAccount(string sVerifyCode, ref bool bdone)
        {
            if (this._CRegMain.sSetting.Count > 0 && this._CRegMain.sSetting.ContainsKey("RealRegUrl"))
            {
                ArrayList _aTmpArrayList = new ArrayList();
                _aTmpArrayList = this._CRegMain.CRegMainDBaseQuery("SELECT * FROM `verifysystem`.`verify_user` where `verify_17173`=0 limit 1;") as ArrayList;
                if (_aTmpArrayList.Count > 0)
                {
                    Hashtable regParams = new Hashtable();
                    this._CRegMain.hUserInfo = _aTmpArrayList[0] as Hashtable;
                    while (CheckRegUsername(this._CRegMain.hUserInfo) == 0)
                    {
                        this.SaveAccount(this._CRegMain.hUserInfo); //已经有的账号，直接改1
                        _aTmpArrayList = this._CRegMain.CRegMainDBaseQuery("SELECT * FROM `verifysystem`.`verify_user` where `verify_17173`=0 limit 1;") as ArrayList;
                        if (_aTmpArrayList.Count > 0)
                            this._CRegMain.hUserInfo = _aTmpArrayList[0] as Hashtable;
                        else
                        {
                            Debug.WriteLine("no account can be register!");
                            return null;
                        }
                    } this.BuiltRegAccount173(this._CRegMain.hUserInfo, ref regParams);

                    //Hashtable regParams = this._CRegMain.BuiltRegParams(BuiltRegAccount173);
                    this.sTmpUrl = this._CRegMain.sSetting["RealRegUrl"] + "/register/save";
                    regParams.Add("validcode", sVerifyCode); System.Threading.Thread.Sleep(200);
                    this._CRegMain.GetHttpResponse(this.sTmpUrl, regParams, CPlatfrom.rHttpRequestType._Type_Post, CPlatfrom.rHttpResponseType._Type_Null); System.Threading.Thread.Sleep(200);

                    this.sTmpUrl = this._CRegMain.sSetting["RealRegUrl"] + "/register/success";
                    this.sTmpResponse = (string)this._CRegMain.GetHttpResponse(this.sTmpUrl, null, CPlatfrom.rHttpRequestType._Type_Get, CPlatfrom.rHttpResponseType._Type_String); System.Threading.Thread.Sleep(200);

                    if (Regex.IsMatch(this.sTmpResponse, "验证邮件已发出", RegexOptions.IgnoreCase | RegexOptions.Singleline | RegexOptions.IgnorePatternWhitespace))
                    {
                        this.SaveAccount(this._CRegMain.hUserInfo); bdone = true;
                        Debug.WriteLine(this._CRegMain.GetRegMainDBaseLastError());
                        if (this._CRegMain.sSetting.ContainsKey("Proxy") && this._CRegMain.sSetting["Proxy"] != "")
                        {
                            File.AppendAllText("./Proxy/usedip.txt", this._CRegMain.sSetting["Proxy"] + "\r\n", Encoding.UTF8);
                        }
                    } return this.sTmpResponse;
                }
                else
                    Debug.WriteLine("no account can be register!");
                
            } return null;
        }

        private int CheckRegUsername(Hashtable dbTable)
        {
            string tmpScript = File.ReadAllText(this._CRegMain.sSetting["WebScriptPath"]);
            tmpScript = (string)this._CRegMain.ScriptRun("getDateTime", new object[] { "1" }, tmpScript).ToString();
            this.sTmpUrl = this._CRegMain.sSetting["RegUrl"] + "/register/validate";

            this._hTmpHashTable = new Hashtable();
            this._hTmpHashTable.Add("field", "username");
            this._hTmpHashTable.Add("value", dbTable["email"].ToString());
            this._hTmpHashTable.Add("domain", dbTable["email"].ToString().Substring(dbTable["email"].ToString().IndexOf('@') + 1, dbTable["email"].ToString().Length - dbTable["email"].ToString().IndexOf('@') - 1));
            this._hTmpHashTable.Add("_", tmpScript);

            string sTmpStr = (string)this._CRegMain.GetHttpResponse(this.sTmpUrl, this._hTmpHashTable, CPlatfrom.rHttpRequestType._Type_Get, CPlatfrom.rHttpResponseType._Type_String);
            Debug.WriteLine(sTmpStr); this._hTmpHashTable.Clear();

            sTmpStr = Regex.Match(sTmpStr, "(?<=status\":+).*?(?=[?'\"\",]+)", RegexOptions.IgnoreCase | RegexOptions.Singleline | RegexOptions.IgnorePatternWhitespace).Value;

            return sTmpStr == "" ? 0 : Int32.Parse(sTmpStr);
        }

        private void BuiltRegAccount173(Hashtable dbTable, ref Hashtable regParams)
        {
            System.Threading.Thread.Sleep(1000);
            //构建post数据
            regParams.Add("email", dbTable["email"].ToString());
            regParams.Add("username", dbTable["email"].ToString());
            regParams.Add("password", dbTable["password"].ToString());
            regParams.Add("idcard", "");
            regParams.Add("realname", "");
            regParams.Add("agreement", "1");
            regParams.Add("_random_license", this._CRegMain.GetCookieValue("random_license"));
            regParams.Add("referer", "");
        }

        private string BuiltRegMysqlStr(Hashtable hRegParams,int iFlag)
        {
            string tmpMysqlStr = "UPDATE `verifysystem`.`verify_user` SET `verify_17173`=" + iFlag + " WHERE `username`='" + hRegParams["username"].ToString() + "';";
            return tmpMysqlStr;
        }

        private void SaveAccount(Hashtable hRegParams)
        {
            if (this._CRegMain.GetRegMainDBaseLastError() == "ok")
            {
                if (this._CRegMain.CRegMainDBaseCommend(this.BuiltRegMysqlStr(hRegParams,1)) > 0)
                {
                    return;
                }
                else
                    goto SaveInFile;
            }

        SaveInFile:
            File.AppendAllText(@"./RegAccount_17173.txt", hRegParams["email"].ToString() + "," + hRegParams["password"].ToString() + "\r\n", Encoding.UTF8);
        }

        public object TakenMailVerif()
        {
            Hashtable _hRetTable = new Hashtable();
            /*
            this._CRegMain.sSetting = this._CRegMain._cXmlParser.GetElementList("RegInfo", "RegAccount_17173");
            ArrayList _aTmpArrayList = new ArrayList();
            _aTmpArrayList = this._CRegMain.CRegMainDBaseQuery("SELECT * FROM `verifysystem`.`verify_user` where `verify_17173`=1 limit 1;") as ArrayList;
            if (_aTmpArrayList.Count > 0)
            {
                _hRetTable = _aTmpArrayList[0] as Hashtable;
            }
            else
            {
                Debug.WriteLine("no account!");
                return null;
            }*/
            _hRetTable = this._CRegMain.hUserInfo.Clone() as Hashtable;
            string[] tmpUserInfo = new string[] { _hRetTable["email"].ToString(), _hRetTable["password"].ToString(), "RegAccount_17173" };
            //string[] tmpUserInfo = new string[] { "sexdon@126.com", "jakejim830831", "RegAccount_17173" };
            object oRet = this._CRegMain.NetWorkMailVerify(tmpUserInfo); _hRetTable.Add("VerifyRegRet", oRet);
            if (oRet != null && Regex.IsMatch((string)oRet, @"(验证成功|已经激活)", RegexOptions.IgnoreCase | RegexOptions.Singleline | RegexOptions.IgnorePatternWhitespace))
            {
                if (this._CRegMain.CRegMainDBaseCommend(this.BuiltRegMysqlStr(_hRetTable, 2)) > 0)
                {
                    _hRetTable.Add("VerifyRegRet2", "Ok!And VerifyMail!");
                }else
                    _hRetTable.Add("VerifyRegRet2", "Ok!But No Update DB!");
            }
            else
                _hRetTable.Add("VerifyRegRet2", "Fail!And No VerifyMail!");
            return _hRetTable;
        }    
    }
}
