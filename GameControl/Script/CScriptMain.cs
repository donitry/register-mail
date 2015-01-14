using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Diagnostics;
using GameControl.Auth;

namespace GameControl.Script
{
    public interface IMainPlatform
    {
        object InitialCookie(string A,string P);
        object TakenAccount(string A,ref bool B); //register or login
        object GetVerifyCode(ulong A);
        object TakenMailVerif();
    }

    class CScriptMain
    {
        public enum ScriptClass
        {
            /// <summary>
            /// 注册126邮箱
            /// </summary>
            RegMail_126,
            /// <summary>
            /// 注册173用户
            /// </summary>
            RegAccount_17173,
            GameVerify_17173
        } private IMainPlatform _MainPlatform;

        /// <summary>
        /// 构造函数，确定处理类
        /// </summary>
        /// <param name="scriptClass"></param>
        public CScriptMain(ScriptClass scriptClass,string sXmlSrc)
        {
            switch (scriptClass)
            {
                case ScriptClass.RegMail_126:
                    {
                        _MainPlatform = new CRegMail126(sXmlSrc);
                    }break;
                case ScriptClass.RegAccount_17173:
                    {
                        _MainPlatform = new CRegister17173(sXmlSrc);
                    }break;
                case ScriptClass.GameVerify_17173:
                    {
                        _MainPlatform = new CGVerify17173(sXmlSrc);
                    }break;
                default: break;
            }
        }

        public object ReadyToRegister(string sXmlMark, string sProxy)
        {
            return _MainPlatform.InitialCookie(sXmlMark, sProxy);
        }

        public object GetVerifyCode(ulong A)
        {
            return _MainPlatform.GetVerifyCode(A);
        }

        public object TabkenRegister(string sVerifyCode,ref bool bDone)
        {
            return _MainPlatform.TakenAccount(sVerifyCode, ref bDone);
        }

        public object TakenMailVerif()
        {
            return _MainPlatform.TakenMailVerif();
        }
    }
}
