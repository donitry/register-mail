using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Net;
using System.IO;
using System.IO.Packaging;
using System.Runtime.Serialization.Formatters.Binary;
using System.Xml;
using System.Xml.Linq;
using System.Diagnostics;
using MSScriptControl;


namespace GameControl.Auth
{
    /// <summary>
    /// 主要作为其他类的辅助类，用于文字，封包加解密之类的处理
    /// 功能：文件读取与保存|字符串处理(分隔,截取)|MD5加密|urlencode加解密|异或加解密
    /// </summary>
    class CTools 
    {

        public CTools()
        { }

        /// <summary>
        /// xml操作类
        /// </summary>
        public class XmlControl
        {
            XmlDocument _XmlDom; 
            public string sRetError;

            public XmlControl(string sXmlPath)
            {
                if (File.Exists(sXmlPath))
                {
                    _XmlDom = new XmlDocument();
                    try
                    {
                        _XmlDom.Load(sXmlPath);
                    }
                    catch (XmlException ex)
                    {
                        sRetError = "XmlControl(构造)：" + ex.Message;
                        Debug.WriteLine("发生异常：" + ex.Message);
                    }
                }
                else
                    sRetError = "no exist xml file!";
            }

            public string GetAttrValue(string sSection, string sMark, string sAttr)
            {
                try
                {
                    foreach (XmlElement _XmlElement in this._XmlDom.DocumentElement)
                    {
                        if (_XmlElement.Name == sSection && _XmlElement.Attributes["Mark"].Value == sMark)
                        {
                            return _XmlElement.Attributes[sAttr].Value;
                        }
                    }
                }
                catch (System.Exception ex)
                {
                    this.sRetError = "GetAttrValue：" + ex.Message;
                    Debug.WriteLine("发生异常：" + ex.Message);
                } return null;
            }

            public string GetAttrValue(string sTagName, string sNode, string sMark, string sAttr)
            {
                try
                {
                    foreach (XmlElement _XmlElement in this._XmlDom.DocumentElement)
                    {
                        if (_XmlElement.Name == sTagName)
                        {
                            foreach (XmlNode _XmlNode in _XmlElement.ChildNodes)
                            {
                                if (_XmlNode.Name == sNode && _XmlNode.Attributes["Mark"].Value == sMark)
                                {
                                    return _XmlNode.Attributes[sAttr].Value;
                                }
                            }
                        }
                    }
                }
                catch (XmlException ex)
                {
                    this.sRetError = "GetElementList：" + ex.Message;
                    Debug.WriteLine("发生异常：" + ex.Message);
                } return ""; 
            }

            public string GetElementAttrValue(string sTagName, string sMark, string sNode, string sAttr)
            {
                try
                {
                    XmlNodeList _XmlNodeList = this._XmlDom.GetElementsByTagName(sTagName);
                    for (int i = 0; i < _XmlNodeList.Count; i++)
                    {
                        if (_XmlNodeList[i].Attributes["Mark"].Value == sMark)
                        {
                            foreach (XmlNode _CxmlNode in _XmlNodeList[i].ChildNodes)
                            {
                                if (_CxmlNode.Name == sNode)
                                {
                                    return _CxmlNode.Attributes[sAttr].Value;
                                }
                            }
                        }
                    }
                }
                catch (XmlException ex)
                {
                    this.sRetError = "GetElementList：" + ex.Message;
                    Debug.WriteLine("发生异常：" + ex.Message);
                } return ""; 
            }

            public SortedList<string, string> GetElementList(string sTagName, string sMark)
            {
                try
                {
                    XmlNodeList _XmlNodeList = this._XmlDom.GetElementsByTagName(sTagName);
                    for (int i = 0; i < _XmlNodeList.Count; i++)
                    {
                        if (_XmlNodeList[i].Attributes["Mark"].Value == sMark)
                        {
                            SortedList<string, string> sRetList = new SortedList<string, string>();
                            foreach (XmlNode _CxmlNode in _XmlNodeList[i].ChildNodes)
                            {
                                sRetList.Add(_CxmlNode.Name, _CxmlNode.InnerText);
                            } return sRetList;
                        }
                    }
                }
                catch (XmlException ex)
                {
                    this.sRetError = "GetElementList：" + ex.Message;
                    Debug.WriteLine("发生异常：" + ex.Message);
                } return null; 
            }

            public ArrayList GetNodeListMark(string sTagName)
            {
                try
                {
                    XmlNodeList _XmlNodeList = this._XmlDom.GetElementsByTagName(sTagName);
                    if (_XmlNodeList != null)
                    {
                        ArrayList sRetList = new ArrayList();
                        for (int i = 0; i < _XmlNodeList.Count; i++)
                        {
                            sRetList.Add(_XmlNodeList[i].Attributes["Mark"].Value);
                        } return sRetList;
                    }
                }
                catch (System.Exception ex)
                {
                    this.sRetError = "GetElementList：" + ex.Message;
                    Debug.WriteLine("发生异常：" + ex.Message);
                } return null;
            }

            private string ConvertSpecialLetter(string objString)
            {
                objString = objString.Replace("&", "&amp;");
                objString = objString.Replace("<", "&lt;");
                objString = objString.Replace(">", "&gt;");
                objString = objString.Replace("\"", "&quot;");
                objString = objString.Replace("\'", "&apos;");
                return objString;
            }

        }



        #region 字符串处理
 
        /// <summary>
        /// 分隔字符串
        /// </summary>
        /// <param name="srcStr">原始字符串</param>
        /// <param name="spStr">分隔符char</param>
        /// <returns>分隔好的字符串数组</returns>
        public string[] SplitString(string srcStr, char spStr)
        {
            string retStr = srcStr;
            string[] retVal = retStr.Split(spStr);
            return retVal;
        }

        public static string UrlDecode(string str)
        {
            return System.Web.HttpUtility.UrlDecode(str, Encoding.UTF8); 
        }

        public static string UrlEncode(string str)
        {
            return System.Web.HttpUtility.UrlEncode(str, Encoding.UTF8);
        }

        /// <summary>
        /// 查看需要的url是否是相对路径
        /// </summary>
        /// <param name="pUrl">访问网站</param>
        /// <param name="sUrl">获得的网址</param>
        /// <returns>对比后返回带http头的网址</returns>
        public string BuiltPath(string pUrl, string sUrl)
        {
            Regex regc = new Regex(@"\bhttp://.*?\/|\bhttp://.*", RegexOptions.IgnoreCase);
            Match body = regc.Match(sUrl);                          //看看此资源是不是相对位置
            if (body.Success) return sUrl;                          //是的话就直接返回了
            
            int i = 0;
            if (sUrl.Substring(i, 1) == "/")
            {
                i = 0;
            }
            else if (sUrl.Substring(i, 2) == "../")
            {
                i = 2;
            }
            else
            {
                i = 1;
            }

            switch (i)
            {
                case 0:
                    {
                        Regex regx = new Regex(@"http://\w.*?[\/]+", RegexOptions.IgnoreCase);//不是就要取到当前的目录
                        Match head = regx.Match(pUrl);//获得网站地址头
                        sUrl = head + sUrl;
                    } break;
                case 1:
                    {
                        Regex regx = new Regex(@"http://\w.*[\/]+", RegexOptions.IgnoreCase);//不是就要取到当前的目录
                        Match head = regx.Match(pUrl);//获得网站地址头
                        sUrl = head + sUrl;

                    } break;
                case 2:
                    {
                        Regex regx = new Regex(@"http://\w.*?[\/]+", RegexOptions.IgnoreCase);//不是就要取到当前的目录
                        Match head = regx.Match(pUrl);//获得网站地址头
                        Regex regv = new Regex(@"\w+.*?(?=\/)", RegexOptions.IgnoreCase);
                        MatchCollection mc = regv.Matches(pUrl);//"http a b c d"
                        if (mc.Count > 0)
                        {
                            int n = 0;
                            string tmp = head.Value;
                            foreach (Match m in mc)
                            {
                                n++;
                                if (n < 3) continue;
                                tmp += m.Value;
                            } sUrl = tmp;
                        }
                    } break;
                default: break;
            } //避免//符号出现在中间
            return Regex.Replace(sUrl, @"(?<=[^:])\/\/", @"/");
        }


        /// <summary>
        /// 构建POST/GET数据所需要的参数,一般来自表单或者固定参数
        /// </summary>
        /// <param name="paramStr">参数字符串,用分隔符分隔再再分析开来ex:user='sexdon'#pwd='123456'</param>
        /// <returns>返回HashTable</returns>
        public Hashtable BuiltHashTable(string paramStr, char spStr)
        {
            Hashtable param = new Hashtable();

            string[] val = SplitString(paramStr, spStr);
            foreach (string iVal in val)
            {
                string[] val2 = SplitString(iVal, '=');
                param.Add(val2[0], val2[1]);
            } return param;
        }




        #endregion

        #region 文件读取(xml/html/txt)

        public SortedList XmlParser(string xmlFilePath)
        {
            SortedList xmlElements = null;
            if (File.Exists(xmlFilePath))
            {
                xmlElements = new SortedList();
                XmlDocument xmlDom = new XmlDocument();
                
                try
                {
                    xmlDom.Load(xmlFilePath);
                    foreach (XmlElement xmlElement in xmlDom.DocumentElement)
                    {
                        xmlElements.Add(xmlElement.Name, xmlElement.InnerText);
                    }
                }
                catch (System.Exception ex)
                {
                    Debug.WriteLine("发生异常：" + ex.Message);
                }
            } return xmlElements;
        }

        public void SaveXml(string xmlFilePath,string iRoot, SortedList elementList)
        {
            var xmlDoc = new XDocument();
            XElement xmlTree = new XElement(iRoot);
            foreach (string keyWords in elementList.Keys)
            {

                try
                {
                    xmlTree.Add(new XElement(keyWords, elementList[keyWords].ToString()));
                }
                catch (Exception ex)
                {
                    Debug.WriteLine("发生异常：" + ex.Message);
                }
            }
            xmlDoc.Add(xmlTree);
            xmlDoc.Save(xmlFilePath);
        }
       

        #endregion


    }
}
