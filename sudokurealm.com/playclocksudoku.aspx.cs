using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.Security;

namespace sudokurealm.com
{
    public partial class playclocksudoku : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (Request.QueryString["Id"] != null)
            {
                string Id = Request.QueryString["Id"];
                try
                {
                    Int32.Parse(Id);
                }
                catch (Exception)
                {
                    Response.Redirect("~/Error.aspx");
                }

                if (!Utils.GameIdIsValid(Convert.ToInt32(Id)))
                {
                    Response.Redirect("~/Error.aspx");
                    return;
                }
                string type = String.Empty, level = String.Empty, puzzle = String.Empty;
                Utils.GetGameSpecificationById(Convert.ToInt32(Id), ref type, ref level, ref puzzle);
                if(type!="Clock")
                {
                    Response.Redirect("~/Error.aspx");
                    return;
                }
                LevelLiteral.Text = level;
                IdLiteral.Text = Id;
                TypeLiteral.Text = type;
                InitialPuzzle.Value = puzzle;
                if (User.Identity.IsAuthenticated)
                    Token.Value = Utils.CreateOrUpdateToken(Membership.GetUser(User.Identity.Name).ProviderUserKey.ToString());
                else
                    Token.Value = String.Empty;
            }
            else
            {
                Response.Redirect("~/Error.aspx");
            }
        }
    }
}