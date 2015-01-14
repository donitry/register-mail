using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Net;
using System.IO;
using System.Diagnostics;

namespace GameControl.Auth
{
    public delegate void BuiltRegParamsDelegate(string[] iUid, ref Hashtable iParam);

    class CPlatfrom : CMysql
    {
        public enum rHttpRequestType
        {
            _Type_Get,
            _Type_Post
        }

        public enum rHttpResponseType
        {
            _Type_Null,
            _Type_String,
            _Type_Image
        }

        public Hashtable hUserInfo;
        public SortedList<string, string> sSetting;
        public CTools.XmlControl _cXmlParser;
        protected CTools _cTools;protected CNetwork _cNet;
        protected CWebScript.ScriptEngine _cScriptEngine;
        protected CMail _cMail; 

        public CPlatfrom(string sXmlSrc):base()
        {
            this.sSetting = new SortedList<string, string>();
            this._cXmlParser = new CTools.XmlControl(sXmlSrc);
            this._cTools = new CTools(); this._cNet = new CNetwork(); this._cMail = new CMail();
            this._cScriptEngine = new CWebScript.ScriptEngine(CWebScript.ScriptLanguage.JavaScript);

            string sDbase = this._cXmlParser.GetAttrValue("DataBase", "", "ConnectionString");
            this.InitialMySql(sDbase);
        }

        #region 数据库操作
        
        public int CRegMainDBaseCommend(string sComm)
        {
            if (this.GetMysqlLastError() == "ok")
            {
                return this.CMysqlCommand(sComm);
            } return -1;
        }

        public int CRegMainDBaseCommend(Queue qComm)
        {
            if (this.GetMysqlLastError() == "ok")
            {
                return this.CMysqlCommand(qComm);
            } return -1;
        }

        public object CRegMainDBaseQuery(string sQuery)
        {
            return this.CMysqlQuery(sQuery);
        }

        public string GetRegMainDBaseLastError()
        {
            return this.GetMysqlLastError();
        }

        #endregion

        /// <summary>
        /// 生成注册用户名和密码
        /// </summary>
        /// <param name="MakeRegParams"></param>
        /// <returns></returns>
        public Hashtable BuiltRegParams(BuiltRegParamsDelegate MakeRegParams)
        {
            string[] iUidA = { "ao", "cou", "zhao", "qian", "sun", "li", "zhou", "wu", "zhen", "wang", "feng", "chen", "zhu", "wei", "jiang", "shen", "han", "yang", "kong", "cao", "yan", "hua", "jin", "tao", "yun", "su", "pan", "ge", "caok", "coom", "yage", "jie", "lun", "qiang", "dong", "yong", "le", "yi", "ming", "zhan", "yu", "yan", "qiang", "pei", "peng", "huan", "qi", "kit", "kitty", "mai", "xing", "xiang", "ke", "nan" };

            string sPwd = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

            string[] regArg = new string[2];

            Random random = new Random();
            string indexA = iUidA[random.Next(0, iUidA.Length)] + iUidA[random.Next(0, iUidA.Length)];
            int lastLength = 18 - indexA.Length;
            if (lastLength > 0)
            {
                int iNum = random.Next(1, lastLength);
                string sNum = "";
                for (int i = 0; i < iNum; i++)
                {
                    sNum += random.Next(0, 9).ToString();
                } indexA += sNum;
            } regArg[0] = indexA;

            int lPwd = random.Next(6, 16);
            for (int j = 0; j < lPwd; j++)
            {
                regArg[1] += sPwd.Substring(random.Next(0, sPwd.Length - 1), 1);
            }

            Hashtable regParams = new Hashtable();
            MakeRegParams(regArg, ref regParams);
            return regParams;
        }

        #region 网络访问操作
        public void SetNetUserAgent(string sUserAgent)
        {
            this._cNet.sUserAgent = sUserAgent;
        }

        public string GetCookieValue(string sKeys)
        {
            if (this._cNet._cookiesContainer.Count > 0)
            {
                List<Cookie> cooklist = CNetwork.GetAllCookies(this._cNet._cookiesContainer);
                foreach (Cookie cookie in cooklist)
                {
                    if (cookie.Name == sKeys)
                    {
                        return cookie.Value;
                    }
                }
            } return null;
        }

        public List<Cookie> GetAllCookies(CookieContainer cc)
        {
            List<Cookie> lstCookies = new List<Cookie>();
            Hashtable table = (Hashtable)cc.GetType().InvokeMember("m_domainTable",
                System.Reflection.BindingFlags.NonPublic | System.Reflection.BindingFlags.GetField |
                System.Reflection.BindingFlags.Instance, null, cc, new object[] { });
            foreach (object pathList in table.Values)
            {
                SortedList lstCookieCol = (SortedList)pathList.GetType().InvokeMember("m_list",
                    System.Reflection.BindingFlags.NonPublic | System.Reflection.BindingFlags.GetField
                    | System.Reflection.BindingFlags.Instance, null, pathList, new object[] { });
                foreach (CookieCollection colCookies in lstCookieCol.Values)
                    foreach (Cookie c in colCookies) lstCookies.Add(c);
            }
            return lstCookies;
        }

        public bool SaveCookie(string sFileName)
        {
            StringBuilder sbc = new StringBuilder();
            List<Cookie> cooklist = this.GetAllCookies(this._cNet._cookiesContainer);
            if (cooklist.Count > 0)
            {
                foreach (Cookie cookie in cooklist)
                {
                    sbc.AppendFormat("{0};{1};{2};{3};{4};{5}\r\n",
                        cookie.Domain, cookie.Name, cookie.Path, cookie.Port,
                        cookie.Secure.ToString(), cookie.Value);
                }
                //FileStream fs = File.Create(sFileName);
                //fs.Close();
                File.WriteAllText(sFileName, sbc.ToString(), Encoding.UTF8);
                return true;
            } return false;
        }

        public bool LoadCookie(string sFileName)
        {
            string[] cookies = File.ReadAllText(sFileName, Encoding.UTF8).Split("\r\n".ToCharArray(), StringSplitOptions.RemoveEmptyEntries);
            if (cookies.Length > 0)
            {
                foreach (string c in cookies)
                {
                    string[] cc = c.Split(";".ToCharArray());
                    Cookie ck = new Cookie(); ;
                    ck.Discard = false;
                    ck.Domain = cc[0];
                    ck.Expired = true;
                    ck.HttpOnly = true;
                    ck.Name = cc[1];
                    ck.Path = cc[2];
                    ck.Port = cc[3];
                    ck.Secure = bool.Parse(cc[4]);
                    ck.Value = cc[5];
                    this._cNet._cookiesContainer.Add(ck);
                } return true;
            } return false;
        }

        public void NetWorkCookieAdd(Cookie iCookie)
        {
            this._cNet._cookiesContainer.Add(iCookie);
        }

        public void NetworkCookiesReflush()
        {
            this._cNet._cookiesContainer = new CookieContainer();
        }

        public object GetHttpResponse(string sTagetUrl, Hashtable hParams, rHttpRequestType qType, rHttpResponseType rType)
        {
            switch (rType)
            {
                case rHttpResponseType._Type_Null:
                        return this.TakenHttpRequest(sTagetUrl, hParams, qType, null);
                case rHttpResponseType._Type_Image:
                        return this.TakenHttpRequest(sTagetUrl, hParams, qType, this._cNet.GetVerifyImg);
                default: return this.TakenHttpRequest(sTagetUrl, hParams, qType, this._cNet.GetResponseStr);
            }
        }

        protected object TakenHttpRequest(string sTagetUrl, Hashtable hParams, rHttpRequestType qType, CNetwork.GetHttpDataDelegate MakeGetHttpData)
        {
            switch (qType)
            {
                case rHttpRequestType._Type_Get:
                    return this._cNet.GetHttpData(sTagetUrl, hParams, MakeGetHttpData);
                default: return this._cNet.PostHttpData(sTagetUrl, hParams, MakeGetHttpData);
            }
        }  

        public void NetworkSetProxy(string sProxy)
        {
            this._cNet._proxyObject = sProxy != "" ? new System.Net.WebProxy(sProxy, true) : null;
        }

        #endregion

        #region 网页脚本操作

        public object ScriptRun(string sFun, object[] oParams, string sScriptSrc)
        {
            return this._cScriptEngine.Run(sFun, oParams, sScriptSrc);
        }

        #endregion

        #region 邮箱验证
        public object NetWorkMailVerify(object oUserInfo)
        {
            if (this.sSetting.ContainsKey("VerifyMail"))
            {
                string[] tmpAccount = (string[])oUserInfo;
                var _MailInfo = new CMail.MailInfo();
                _MailInfo.sAccount[0] = tmpAccount[0].Substring(0,tmpAccount[0].IndexOf('@'));
                _MailInfo.sAccount[1] = tmpAccount[1];
                string sMailMark = tmpAccount[0].Substring(tmpAccount[0].IndexOf('@') + 1, tmpAccount[0].Length - tmpAccount[0].IndexOf('@') - 1);
                _MailInfo.sMailServer = this._cXmlParser.GetAttrValue("MailInfo", "Mail", sMailMark, "MUri");
                _MailInfo.sSubject = this.sSetting["VerifyMail"];
                _MailInfo.sKeysMatch = _cXmlParser.GetElementAttrValue("RegInfo", tmpAccount[2], "VerifyMail", "KeysMach");
                _MailInfo.uTimeOut = 120 * 1000; this.NetworkCookiesReflush();

                string sVerifyUrl = this._cMail.GetMailBodyImap4(_MailInfo);
                return sVerifyUrl != "" ? this._cNet.GetHttpData(sVerifyUrl, null, _cNet.GetResponseStr) : "";
            } return "";
        }

        #endregion

        public void test()
        {
            if (this._cNet._cookiesContainer != null)
            {
                List<Cookie> cooklist = CNetwork.GetAllCookies(this._cNet._cookiesContainer);
                foreach (Cookie cookie in cooklist)
                {
                    Debug.WriteLine(cookie.Name + "=" + cookie.Value + "..Domain:" + cookie.Domain);
                }
            }
        }

    }
}
