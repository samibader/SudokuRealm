using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Configuration;
using System.Data.SqlClient;
using System.Data;

namespace sudokurealm.com
{
    public static class Utils
    {
        private static string GetConnection()
        {
            return ConfigurationManager.ConnectionStrings["ApplicationServices"].ConnectionString;
        }

        public static string GetRandomStandardGameId(string _type, string _level)
        {
            SqlConnection conn = new SqlConnection(GetConnection());
            SqlCommand command = conn.CreateCommand();
            try
            {
                conn.Open();
                command.CommandType = CommandType.Text;
                command.CommandText = "SELECT TOP 1 PERCENT Id FROM Game WHERE Type=@Type AND Level=@Level ORDER BY newid()";
                command.Parameters.Add("Type", SqlDbType.NVarChar, 50);
                command.Parameters.Add("Level", SqlDbType.NVarChar, 50);
                command.Parameters["Type"].Value = _type;
                command.Parameters["Level"].Value = _level;
                string Id = command.ExecuteScalar().ToString();
                return Id;
            }
            catch (Exception)
            {
                return String.Empty;
            }
            finally
            {
                conn.Close();
            }
        }
        public static bool GameIdIsValid(int _id)
        {
            SqlConnection conn = new SqlConnection(GetConnection());
            SqlCommand command = conn.CreateCommand();
            try
            {
                conn.Open();
                command.CommandType = CommandType.Text;
                command.CommandText = "SELECT * FROM Game WHERE Id=@Id";
                command.Parameters.Add("Id", SqlDbType.Int);
                command.Parameters["Id"].Value = _id;
                DataTable dt = new DataTable();
                SqlDataAdapter da = new SqlDataAdapter(command);
                da.Fill(dt);
                if (dt.Rows.Count > 0)
                    return true;
                else
                    return false;
            }
            catch (Exception)
            {
                return false;
            }
            finally
            {
                conn.Close();
            }
        }
        public static bool GetGameSpecificationById(int _id, ref string type,ref string level, ref string puzzle)
        {
            SqlConnection conn = new SqlConnection(GetConnection());
            SqlCommand command = conn.CreateCommand();
            try
            {
                conn.Open();
                command.CommandType = CommandType.Text;
                command.CommandText = "SELECT * FROM Game WHERE Id=@Id";
                command.Parameters.Add("Id", SqlDbType.Int);
                command.Parameters["Id"].Value = _id;
                DataTable dt = new DataTable();
                SqlDataAdapter da = new SqlDataAdapter(command);
                da.Fill(dt);
                if (dt.Rows.Count == 0)
                    return false;
                level = System.Threading.Thread.CurrentThread.CurrentCulture.TextInfo.ToTitleCase(dt.Rows[0]["Level"].ToString());
                type = System.Threading.Thread.CurrentThread.CurrentCulture.TextInfo.ToTitleCase(dt.Rows[0]["Type"].ToString());
                puzzle = dt.Rows[0]["Puzzle"].ToString();
                return true;
            }
            catch (Exception)
            {
                return false;
            }
            finally
            {
                conn.Close();
            }
        }
        public static DataTable GetUserGameSaves(string _userId, int _gameId)
        {
            SqlConnection conn = new SqlConnection(GetConnection());
            SqlCommand command = conn.CreateCommand();
            try
            {
                conn.Open();
                command.CommandType = CommandType.Text;
                command.CommandText = "SELECT * FROM GameSave WHERE UserId=@UserId AND GameId=@GameId";
                command.Parameters.Add("@UserId", SqlDbType.UniqueIdentifier);
                command.Parameters.Add("@GameId", SqlDbType.Int);
                command.Parameters["@UserId"].Value = new Guid(_userId);
                command.Parameters["@GameId"].Value = _gameId;
                DataTable dt = new DataTable();
                SqlDataAdapter da = new SqlDataAdapter(command);
                da.Fill(dt);
                return dt;
            }
            catch (Exception)
            {
                return null;
            }
            finally
            {
                conn.Close();
            }
        }
        public static int GetRemainingSavesCount(string _userId, int _gameId)
        {
            SqlConnection conn = new SqlConnection(GetConnection());
            SqlCommand command = conn.CreateCommand();
            try
            {
                conn.Open();
                command.CommandType = CommandType.Text;
                command.CommandText = "SELECT COUNT(*) FROM GameSave WHERE UserId=@UserId AND GameId=@GameId";
                command.Parameters.Add("@UserId", SqlDbType.UniqueIdentifier);
                command.Parameters.Add("@GameId", SqlDbType.Int);
                command.Parameters["@UserId"].Value = new Guid(_userId);
                command.Parameters["@GameId"].Value = _gameId;

                return Convert.ToInt32(command.ExecuteScalar());
            }
            catch (Exception)
            {
                return -1;
            }
            finally
            {
                conn.Close();
            }
        }
        public static bool SaveGame(string _userId, int _gameId, string _saveId, string _saveTimeStamp, string _saveData, string _movesHistory)
        {
            SqlConnection conn = new SqlConnection(GetConnection());
            SqlCommand command = conn.CreateCommand();
            try
            {
                conn.Open();
                command.CommandType = CommandType.Text;
                command.CommandText = "INSERT INTO GameSave VALUES (@UserId,@GameId,@SaveId,@SaveTimeStamp,@SaveData,@MovesHistory)";
                command.Parameters.Add("@UserId", SqlDbType.UniqueIdentifier);
                command.Parameters.Add("@GameId", SqlDbType.Int);
                command.Parameters.Add("@SaveId", SqlDbType.NVarChar,50);
                command.Parameters.Add("@SaveTimeStamp", SqlDbType.NVarChar, 50);
                command.Parameters.Add("@SaveData", SqlDbType.NVarChar);
                command.Parameters.Add("@MovesHistory", SqlDbType.NVarChar);
                command.Parameters["@UserId"].Value = new Guid(_userId);
                command.Parameters["@GameId"].Value = _gameId;
                command.Parameters["@SaveId"].Value = _saveId;
                command.Parameters["@SaveTimeStamp"].Value = _saveTimeStamp;
                command.Parameters["@SaveData"].Value = _saveData;
                command.Parameters["@MovesHistory"].Value = _movesHistory;

                command.ExecuteNonQuery();
                return true;
            }
            catch (Exception)
            {
                return false;
            }
            finally
            {
                conn.Close();
            }
        }
        public static bool DeleteSaveGame(string _userId, int _gameId, string _saveId)
        {
            SqlConnection conn = new SqlConnection(GetConnection());
            SqlCommand command = conn.CreateCommand();
            try
            {
                conn.Open();
                command.CommandType = CommandType.Text;
                command.CommandText = "DELETE FROM GameSave WHERE UserId= @UserId AND GameId=@GameId AND SaveId=@SaveId";
                command.Parameters.Add("@UserId", SqlDbType.UniqueIdentifier);
                command.Parameters.Add("@GameId", SqlDbType.Int);
                command.Parameters.Add("@SaveId", SqlDbType.NVarChar, 50);
                command.Parameters["@UserId"].Value = new Guid(_userId);
                command.Parameters["@GameId"].Value = _gameId;
                command.Parameters["@SaveId"].Value = _saveId;

                command.ExecuteNonQuery();
                return true;
            }
            catch (Exception)
            {
                return false;
            }
            finally
            {
                conn.Close();
            }
        }
        #region Security
        public static string CreateOrUpdateToken(string _userId)
        {
            SqlConnection conn = new SqlConnection(GetConnection());
            SqlCommand command = conn.CreateCommand();
            Guid userId = new Guid(_userId);
            Guid token = Guid.NewGuid();
            try
            {
                conn.Open();
                command.CommandType = CommandType.Text;
                command.CommandText = "SELECT * FROM SecurityToken WHERE UserId=@UserId";
                command.Parameters.Add("UserId", SqlDbType.UniqueIdentifier);
                command.Parameters["UserId"].Value = userId;
                DataTable dt = new DataTable();
                SqlDataAdapter da = new SqlDataAdapter(command);
                da.Fill(dt);
                if (dt.Rows.Count == 0)
                    command.CommandText = "INSERT INTO SecurityToken VALUES(@UserId,@Token)";
                else
                    command.CommandText = "UPDATE SecurityToken SET Token=@Token WHERE UserID=@UserId";
                command.Parameters.Add("@Token", SqlDbType.UniqueIdentifier);
                command.Parameters["@Token"].Value = token;
                command.ExecuteNonQuery();
                return token.ToString();
            }
            catch
            {
                return String.Empty;
            }
            finally
            {
                conn.Close();
            }
        }
        public static bool DeleteToken(string _userId)
        {
            SqlConnection conn = new SqlConnection(GetConnection());
            SqlCommand command = conn.CreateCommand();
            Guid userId = new Guid(_userId);
            try
            {
                conn.Open();
                command.CommandType = CommandType.Text;
                command.CommandText = "DELETE FROM SecurityToken WHERE UserId=@UserId";
                command.Parameters.Add("UserId", SqlDbType.UniqueIdentifier);
                command.Parameters["UserId"].Value = userId;
                if (command.ExecuteNonQuery() != 0)
                    return false;
                else
                    return true;
            }
            catch
            {
                return false;
            }
            finally
            {
                conn.Close();
            }
        }
        public static bool TokenIsValid(string _token,string _userId)
        {
            SqlConnection conn = new SqlConnection(GetConnection());
            SqlCommand command = conn.CreateCommand();
            Guid userId = new Guid(_userId);
            Guid token = new Guid(_token);
            try
            {
                conn.Open();
                command.CommandType = CommandType.Text;
                command.CommandText = "SELECT COUNT(*) FROM SecurityToken WHERE USerId=@UserId AND Token=@Token";
                command.Parameters.Add("UserId", SqlDbType.UniqueIdentifier);
                command.Parameters["UserId"].Value = userId;
                command.Parameters.Add("@Token", SqlDbType.UniqueIdentifier);
                command.Parameters["@Token"].Value = token;
                int count=Convert.ToInt32(command.ExecuteScalar());
                if (count > 0)
                    return true;
                else
                    return false;
            }
            catch (Exception)
            {
                return false;
            }
            finally
            {
                conn.Close();
            }
        }
           
        #endregion
    }
}