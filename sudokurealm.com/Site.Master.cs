using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.Security;

namespace sudokurealm.com
{
    public partial class SiteMaster : System.Web.UI.MasterPage
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }
        protected void LoginStatus1_OnLoggedOut(object sender, EventArgs e)
        {
            Utils.DeleteToken(Membership.GetUser(Page.User.Identity.Name).ProviderUserKey.ToString());
        }
    }
}
