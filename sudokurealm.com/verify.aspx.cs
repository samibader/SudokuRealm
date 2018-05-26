using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Text.RegularExpressions;
using System.Web.Security;

namespace sudokurealm.com
{
    public partial class verify : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if ((String.IsNullOrEmpty(Request.QueryString["ID"])) || (!Regex.IsMatch(Request.QueryString["ID"], @"[0-9a-f]{8}\-([0-9a-f]{4}\-){3}[0-9a-f]{12}")))
            {
                InfoLabel.Text = "An invalid ID value was passed in through the querystring.";
            }
            else
            {
                Guid userid;
                try
                {
                    userid = new Guid(Request.QueryString["ID"].ToString());
                }
                catch (Exception)
                {
                    InfoLabel.Text = "An invalid ID value was passed in through the querystring.";
                    return;
                }
                MembershipUser userinfo = Membership.GetUser(userid);
                if (userinfo == null)
                {
                    InfoLabel.Text = "The user account could not be found in the membership database.";
                }
                else
                {
                    userinfo.IsApproved = true;
                    Membership.UpdateUser(userinfo);
                    InfoLabel.Text =String.Format("Congratulations user <strong>{0}</strong>, Your account has been verified and you can now <a href='http://www.sudokurealm.com/account/login.aspx'>login</a> into the realm.<br/>We hope you can enjoy our challenging sudoku games ..",userinfo.UserName);
                }
            }
        }
    }
}