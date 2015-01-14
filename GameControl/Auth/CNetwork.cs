using System;
using System.Collections;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Net;
using System.Text;
using System.Text.RegularExpressions;
using System.IO;
using System.IO.Packaging;
using System.Diagnostics;
using System.Drawing;
using System.Net.Security;
using System.Security.Cryptography.X509Certificates;


namespace GameControl.Auth
{
    /// <summary>
    /// 主要负责网络的一切交互，主要是POST/GET包的打包和发送接收
    /// 后期可能会加入TCP/IP的长连接通讯
    /// </summary>
    class CNetwork
    {
        public CookieContainer _cookiesContainer;
        //内容容量：Capacity、MaxCookieSize 和 PerDomainCapacity。 这些值的默认设置分别为 300、4096 和 20
        public delegate object GetHttpDataDelegate(Stream iStream);
        public WebProxy _proxyObject; public string sUserAgent;


        public CNetwork()
        {
            _proxyObject = null;
            sUserAgent = "Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.1; Trident/4.0)";
        }

        #region 同步通过GET/POST方式发送数据

        /// <summary>
        /// 获得返回的字符型数据
        /// </summary>
        /// <param name="iStream"></param>
        /// <returns></returns>
        public string GetResponseStr(Stream iStream)
        {
            string formData = "";
            try
            {
                using (StreamReader reader = new StreamReader(iStream, Encoding.UTF8))
                {
                    formData = reader.ReadToEnd();
                }
            }
            catch (Exception ex)
            {
                Debug.WriteLine("GetResponseStr error:"+ ex.Message);
            } return formData;
        }

        /// <summary>
        /// 获得验证码图片
        /// </summary>
        /// <param name="iStream"></param>
        /// <returns></returns>
        public Image GetVerifyImg(Stream iStream)
        {
            return Image.FromStream(iStream);
        }

        /// <summary>
        /// Get数据包处理，对于服务器的Get处理
        /// </summary>
        /// <param name="targetURL">连接网络地址</param>
        /// <param name="prarm">表单内的值,用于Get</param>
        /// <returns>Get数据后的服务器返回值</returns>
        public object GetHttpData(string targetURL, Hashtable iPrarm,GetHttpDataDelegate MakeGetHttpData)
        {
            string formData = ""; object retObject = null;
            HttpWebRequest request;HttpWebResponse response;
            MemoryStream tmpSta = new MemoryStream();

            if (iPrarm == null)
            {
                formData = targetURL;
            }
            else
            {
                foreach (DictionaryEntry de in iPrarm)
                {
                    formData += de.Key.ToString() + "=" + de.Value.ToString() + "&";
                }
                if (formData.Length > 0)
                    formData = formData.Substring(0, formData.Length - 1); //remove last '&'
                formData = targetURL + (formData == "" ? "" : "?") + formData;
            }

            //WebProxy proxyObject = new WebProxy("200.54.92.187:80", true);

            request = WebRequest.Create(formData) as HttpWebRequest;
            request.Method = "GET";
            request.UserAgent = sUserAgent;
                //"Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.1; Trident/4.0)";
              //"Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/34.0.1847.131 Safari/537.36";
            request.CookieContainer = _cookiesContainer;
            //request.AutomaticDecompression = DecompressionMethods.GZip | DecompressionMethods.Deflate;
            //request.Headers["Accept-Encoding"] = "gzip, deflate";
            request.KeepAlive = false; request.Timeout = 10 * 1000;
            
            if (_proxyObject != null)
                request.Proxy = _proxyObject;

            Debug.WriteLine(formData);
            
            try
            {
                //获取服务器返回的资源   
                using (response = (HttpWebResponse)request.GetResponse())
                {
                    retObject = MakeGetHttpData == null?null:MakeGetHttpData(response.GetResponseStream());
                    if (response.Cookies.Count > 0)
                    {
                        _cookiesContainer.Add(response.Cookies);
                    } 
                }
            }
            catch (WebException wbe)
            {
                Debug.WriteLine("webexception:" + wbe.Message);
            }
            catch (Exception ex)
            {
                Debug.WriteLine("发生异常：" + ex.Message);
            }
            return retObject;  
        }



        /// <summary>
        /// Post数据包处理，对于服务器的Post处理
        /// </summary>
        /// <param name="targetURL">连接网络地址</param>
        /// <param name="prarm">表单内的值,用于Post</param>
        /// <returns>Post数据后的服务器返回值</returns>
        public object PostHttpData(string targetURL, Hashtable iPrarm, GetHttpDataDelegate MakeGetHttpData)
        {
            //prepare the submit data
            string formData = ""; object retObject = null;
            HttpWebRequest request; HttpWebResponse response;
            
            foreach (DictionaryEntry de in iPrarm)
            {
                formData += de.Key.ToString() + "=" + de.Value.ToString() + "&";
            }
            if (formData.Length > 0)
                formData = formData.Substring(0, formData.Length - 1); //remove last '&'
            ASCIIEncoding encoding = new ASCIIEncoding();
            byte[] data = encoding.GetBytes(formData);

            if (targetURL.StartsWith("https", StringComparison.OrdinalIgnoreCase))
            {
                ServicePointManager.ServerCertificateValidationCallback = new RemoteCertificateValidationCallback(CheckValidationResult);
                request = WebRequest.Create(targetURL) as HttpWebRequest;
                request.ProtocolVersion = HttpVersion.Version10;  
            }else
                request = (HttpWebRequest)WebRequest.Create(targetURL);

            //request.ServicePoint.Expect100Continue = false;

            request.Method = "POST";    //post
            request.ContentType = "application/x-www-form-urlencoded";
            request.ContentLength = data.Length;
            request.UserAgent = sUserAgent;
                //"Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.1; Trident/4.0)";
              //"Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/34.0.1847.131 Safari/537.36";
            request.CookieContainer = _cookiesContainer;
            request.Timeout = 10 * 1000;

            if (_proxyObject != null)
            {
                request.Proxy = _proxyObject;
            }

            Debug.WriteLine("POST:" + targetURL + " ### Param:" + formData);
            
            try
            {
                using (Stream newStream = request.GetRequestStream())
                {
                    newStream.Write(data, 0, data.Length);
                }

                //获取服务器返回的资源   
                using (response = request.GetResponse() as HttpWebResponse)
                {
                    retObject = MakeGetHttpData == null ? null : MakeGetHttpData(response.GetResponseStream());
                    if (response.Cookies.Count > 0)
                        _cookiesContainer.Add(response.Cookies);
                    /*
                    using (StreamReader reader = new StreamReader(response.GetResponseStream(), Encoding.UTF8))
                    {
                        if (response.Cookies.Count > 0)
                            _cookiesContainer.Add(response.Cookies);
                        formData = reader.ReadToEnd();
                    }*/
                }
            }
            catch(WebException wbe)
            {
                Debug.WriteLine("webexception:" + wbe.Message);
            }
            catch (Exception ex)
            {
                Debug.WriteLine("发生异常/n/r" + ex.Message);
            }

            return retObject;
        }

        private static bool CheckValidationResult(object sender, X509Certificate certificate, X509Chain chain, SslPolicyErrors errors)
        {
            return true; //总是接受  
        }

        public static List<Cookie> GetAllCookies(CookieContainer cc)
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
        #endregion

    }
}
