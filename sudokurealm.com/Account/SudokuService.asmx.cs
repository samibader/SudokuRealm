using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.Security;
using System.Data;

namespace sudokurealm.com.Account
{
    /// <summary>
    /// Summary description for SudokuService
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    [System.Web.Script.Services.ScriptService]
    public class SudokuService : System.Web.Services.WebService
    {

        [WebMethod]
        public int GetRemainingSavesCount(string token, string gameid)
        {
            MembershipUser currentUser=Membership.GetUser(User.Identity.Name);
            int MaxSavesAllowed = 5;
            if (Utils.TokenIsValid(token, currentUser.ProviderUserKey.ToString()))
            {
                int count = Utils.GetRemainingSavesCount(currentUser.ProviderUserKey.ToString(), Convert.ToInt32(gameid));
                if (count == -1)
                    return 0;
                else
                    return
                        MaxSavesAllowed - count;
            }
            else
                return -1;
        }

        [WebMethod]
        public List<GameSave> GetSaves(string token, string gameid)
        {
            MembershipUser currentUser = Membership.GetUser(User.Identity.Name);
            if (Utils.TokenIsValid(token, currentUser.ProviderUserKey.ToString()))
            {
                List<GameSave> list = new List<GameSave>();
                
                foreach (DataRow dr in Utils.GetUserGameSaves(currentUser.ProviderUserKey.ToString(), Convert.ToInt32(gameid)).Rows)
                {
                    list.Add(new GameSave(dr["SaveId"].ToString(), dr["SaveTimeStamp"].ToString(), dr["SaveData"].ToString(),dr["MovesHistory"].ToString()));
                }

                return list;
            }
            else
                return null;
        }
        [WebMethod]
        public bool SaveGame(string token, string gameId, string saveId, string saveTimeStamp, string saveData, string movesHistory)
        {
            System.Threading.Thread.Sleep(2000);
            MembershipUser currentUser = Membership.GetUser(User.Identity.Name);
            if (Utils.TokenIsValid(token, currentUser.ProviderUserKey.ToString()))
            {
                return Utils.SaveGame(currentUser.ProviderUserKey.ToString(),Convert.ToInt32(gameId), saveId, saveTimeStamp, saveData,movesHistory);
            }
            else
                return false;
        }
        [WebMethod]
        public bool DeleteSaveGame(string token, string gameId, string saveId)
        {
            System.Threading.Thread.Sleep(2000);
            MembershipUser currentUser = Membership.GetUser(User.Identity.Name);
            if (Utils.TokenIsValid(token, currentUser.ProviderUserKey.ToString()))
            {
                return Utils.DeleteSaveGame(currentUser.ProviderUserKey.ToString(), Convert.ToInt32(gameId), saveId);
            }
            else
                return false;
        }
    }
}
