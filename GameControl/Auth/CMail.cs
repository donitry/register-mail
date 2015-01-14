using System;
using System.Linq;
using System.Net;
using System.Threading;

using MimeKit;
using MailKit;
using MailKit.Net.Imap;
using MailKit.Search;
using System.Diagnostics;
using System.Text.RegularExpressions;
using System.Text;


namespace GameControl.Auth
{
    class CMail
    {
        public class MailInfo
        {
            public string[] sAccount;
            public string sMailServer, sSubject, sKeysMatch;
            public long uTimeOut;
            public MailInfo()
            {
                sAccount = new string[2];
                sMailServer = sSubject = sKeysMatch = "";
                uTimeOut = 0;
            }
        }

        public string GetMailBodyImap4(MailInfo _MailInfo)
        {
            string sRet = "";
            using (var _MailClient = new ImapClient())
            {
                var _Credentials = new NetworkCredential(_MailInfo.sAccount[0], _MailInfo.sAccount[1]);
                using (var _Cancel = new CancellationTokenSource())
                {
                    try
                    {
                        _MailClient.Connect(new Uri(_MailInfo.sMailServer), _Cancel.Token);
                        _MailClient.AuthenticationMechanisms.Remove("XOAUTH");
                        _MailClient.Authenticate(_Credentials, _Cancel.Token);

                        var _Inbox = _MailClient.Inbox;
                        _Inbox.Open(FolderAccess.ReadWrite, _Cancel.Token);
                        var query = SearchQuery.SubjectContains(_MailInfo.sSubject).And(SearchQuery.NotSeen);
                        long _OpenIndexTime = GetNowTimeUt();

                        while (GetNowTimeUt() < _OpenIndexTime + _MailInfo.uTimeOut)
                        {
                            var _sMid = _Inbox.Search(query, _Cancel.Token);
                            if (_sMid.Length > 0)
                            {
                                var _Message = _Inbox.GetMessage(_sMid[_sMid.Length - 1], _Cancel.Token);
                                _Inbox.SetFlags(_sMid, MessageFlags.Seen, true);
                                Debug.WriteLine("[match] {0}: {1}", _sMid[0], _Message.Subject);
                                var _BodyPart = _Message.Body as TextPart;//@"http\://passport\.17173\.com.*?(?=[<>])"
                                return CTools.UrlDecode(Regex.Match(_BodyPart.Text, _MailInfo.sKeysMatch, RegexOptions.IgnoreCase | RegexOptions.Singleline | RegexOptions.IgnorePatternWhitespace).Value);
                            }
                            else
                                _Inbox.Check(_Cancel.Token);
                            System.Threading.Thread.Sleep(5000);
                        }                       

                    }
                    catch (MailKit.Net.Imap.ImapProtocolException ex)
                    {
                        sRet = ex.Message;
                    }
                    finally
                    {
                        _MailClient.Disconnect(true, _Cancel.Token);
                    }
                }
            } return sRet;
        }

        private long GetNowTimeUt()
        {
            return (System.DateTime.UtcNow.Ticks - new DateTime(1970, 1, 1, 0, 0, 0).Ticks) / 10000;
        }
    }
}
