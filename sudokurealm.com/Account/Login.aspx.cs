using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.Security;

namespace sudokurealm.com.Account
{
    public partial class Login : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            RegisterHyperLink.NavigateUrl = "Register.aspx";
        }

        protected void LoginUser_LoginError(object sender, EventArgs e)
        {
            MembershipUser userinfo = Membership.GetUser(LoginUser.UserName);
            if (userinfo == null)
            {
                ErrorLabel.Text = String.Format("There is no user with the name ({0})", userinfo.UserName);
                return;
            }
            if (!userinfo.IsApproved)
            {
                ErrorLabel.Text = String.Format("Your account has not yet been verified. Please check your email and click on the verification link , then try to login");
                return;
            }
            if (userinfo.IsLockedOut)
            {
                ErrorLabel.Text = String.Format("Your account has been locked out because of a maximum number of incorrect login attempts. You will NOT be able to login until you contact a site administrator and have your account unlocked.");
                return;
            }
            ErrorLabel.Text = "Your login attempt was not successful , please try again ..";
        }

        protected void LoginUser_LoggedIn(object sender, EventArgs e)
        {
            string token= Utils.CreateOrUpdateToken(Membership.GetUser(LoginUser.UserName).ProviderUserKey.ToString());
        }
    }
}
