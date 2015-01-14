using System;
using System.Collections;
using System.Linq;
using System.Net;
using System.Threading;

using MySql.Data;
using MySql.Data.MySqlClient;

namespace GameControl.Auth
{
    class CMysql
    {
        private string sRetError;
        protected MySqlConnection _MysqlConn;

        public CMysql() { }

        protected void InitialMySql(string sConnStr)
        {
            try
            {
                this._MysqlConn = new MySqlConnection(sConnStr);
                this._MysqlConn.Open();
                if (this._MysqlConn.State.ToString() == "Open")
                {
                    this.sRetError = "ok";
                    this._MysqlConn.Close();
                }
                else
                    this.sRetError = "error";
            }
            catch (MySqlException ex)
            {
                this.sRetError = ex.Message;
            } 
        }

        protected int CMysqlCommand(string sCommand)
        {
            try
            {
                this._MysqlConn.Open(); int iExc = 0;
                using (var _CDbaseCommand = new MySqlCommand(sCommand, this._MysqlConn))
                {
                    iExc = _CDbaseCommand.ExecuteNonQuery();
                    this.sRetError = "ok";
                } return iExc;
            }
            catch (MySqlException ex)
            {
                this.sRetError = ex.ToString();
            }
            finally
            {
                this._MysqlConn.Close();
            } return -1;
        }

        protected int CMysqlCommand(Queue qComm)
        {
            try
            {
                this._MysqlConn.Open(); int iExc = 0;
                using(var _CDbaseCommand = new MySqlCommand())
                {
                    _CDbaseCommand.Connection = this._MysqlConn;
                    foreach (string sComm in qComm)
                    {
                        _CDbaseCommand.CommandText = sComm;
                        iExc += _CDbaseCommand.ExecuteNonQuery();
                    } this.sRetError = "ok";
                } return iExc;
            }
            catch (MySqlException ex)
            {
                this.sRetError = ex.ToString();
            }
            finally
            {
                this._MysqlConn.Close();
            } return -1;
        }

        protected ArrayList CMysqlQuery(string sQuery)
        {
            ArrayList _aDbArray = null;
            try
            {
                this._MysqlConn.Open(); 
                using (var _CDbaseCommand = new MySqlCommand())
                {
                    _CDbaseCommand.Connection = this._MysqlConn;
                    _CDbaseCommand.CommandText = sQuery;
                    using (var _Reader = _CDbaseCommand.ExecuteReader())
                    {
                        _aDbArray = new ArrayList();
                        while (_Reader.Read())
                        {
                            Hashtable _hTmptable = new Hashtable();
                            for (int i = 0; i < _Reader.FieldCount;i++ )
                            {
                                _hTmptable.Add(_Reader.GetName(i), _Reader.GetValue(i));
                            } _aDbArray.Add(_hTmptable);
                        }
                    } this.sRetError = "ok";
                } return _aDbArray;
            }
            catch (MySqlException ex)
            {
                this.sRetError = ex.ToString();
            }
            finally
            {
                this._MysqlConn.Close();
            } return _aDbArray;
        }

        protected string GetMysqlLastError()
        {
            return this.sRetError;
        }
    }
}
