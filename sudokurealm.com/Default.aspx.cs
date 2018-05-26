using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data.SqlClient;
using System.Data;
using System.Configuration;

namespace sudokurealm.com
{
    public partial class _Default : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            
        }
        protected void RandomGames(object sender, CommandEventArgs e)
        {
            string Id = Utils.GetRandomStandardGameId(e.CommandArgument.ToString(), e.CommandName);
            if (Id == String.Empty)
                Response.Redirect("~/Error.aspx");
            else
                Response.Redirect("~/playgame.aspx?id=" + Id);
        }

        protected void SearchByIdButton_Click(object sender, EventArgs e)
        {
            //System.Threading.Thread.Sleep(2000);
            //string Id = SearchByIdTextBox.Text;
            //try
            //{
            //    Int32.Parse(Id);
            //}
            //catch (Exception)
            //{
            //    SearchErrorLabel.Text = "Please enter a valid sudoku number ..";
            //    return;
            //}
            
            //if (Utils.GameIdIsValid(Convert.ToInt32(Id)))
            //{
            //    Response.Redirect("~/playgame.aspx?id=" + Id);
            //}
            //else
            //{
            //    SearchErrorLabel.Text = "You are not allowed to play this game ..";
            //}

        }
    }
}
