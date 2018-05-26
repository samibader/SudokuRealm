using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Net.Mail;

namespace sudokurealm.com.Account
{
    public partial class Register : System.Web.UI.Page
    {

        protected void Page_Load(object sender, EventArgs e)
        {
            //RegisterUser.ContinueDestinationPageUrl = Request.QueryString["ReturnUrl"];
        }

        protected void RegisterUser_CreatedUser(object sender, EventArgs e)
        {
            //FormsAuthentication.SetAuthCookie(RegisterUser.UserName, false /* createPersistentCookie */);

            //string continueUrl = RegisterUser.ContinueDestinationPageUrl;
            //if (String.IsNullOrEmpty(continueUrl))
            //{
            //    continueUrl = "~/";
            //}
            //Response.Redirect(continueUrl);
        }

        protected void CreateUserWizard1_CreatingUser(object sender, LoginCancelEventArgs e)
        {
            
        }

        protected void CheckAvailableButton_Click(object sender, EventArgs e)
        {
            System.Threading.Thread.Sleep(2000);
            string un = UsernameTextBox.Text.Trim();
            if ((un == "") || (un.Length < 3) || (un.Length>16))
            {
                successSpan.Visible = false;
                errorSpan.InnerText = "Invalid";
                errorSpan.Visible = true;
                return;
            }
            bool special=false;
            foreach (char ch in un)
	        {
                if (!((ch >= 'a' && ch <= 'z') || (ch >= 'A' && ch <= 'Z') || (ch >= '0' && ch <= '9') || (ch == '_')))
                {
                    special = true;
                    break;
                }   
            }
            if (special)
            {
                successSpan.Visible = false;
                errorSpan.InnerText = "Invalid";
                errorSpan.Visible = true;
                return;
            }
            bool nochars = true;
            foreach (char ch in un)
            {
                if (ch >= 'a' && ch <= 'z')
                {
                    nochars = false;
                    break;
                }
                if (ch >= 'A' && ch <= 'Z')
                {
                    nochars = false;
                    break;
                }
            }
            if (nochars)
            {
                successSpan.Visible = false;
                errorSpan.InnerText = "Invalid";
                errorSpan.Visible = true;
                return;
            }
            if (Membership.GetUser(UsernameTextBox.Text.Trim()) != null)
            {
                successSpan.Visible = false;
                errorSpan.InnerText = "Not Available";
                errorSpan.Visible = true;
            }
            else
            {
                successSpan.Visible = true;
                successSpan.InnerText = "Available";
                errorSpan.Visible = false;
            }
        }

        protected void RegisterButton_Click(object sender, EventArgs e)
        {
            if (!CaptchaControl1.Validate(CaptchaTextBox.Text))
            {
                ErrorLabel.Text = "Error : The code you have entered in invalid , please try again ..";
                return;
            }
            if (Membership.GetUser(UsernameTextBox.Text.Trim()) != null)
            {
                ErrorLabel.Text = "Error : Username already taken , please choose another one ..";
                return;
            }
            else
            {
                RegisterPanel.Visible = false;
                SuccessfulLabel.Text = String.Format("Your account has been created, but before you can login you must first verify your email address.<br/> A message has been sent to the email address you specified <strong>({0})</strong>.<br/> Please check your email inbox and follow the instructions in that email to verify your account.",
                    EmailTextBox.Text);
                WaitingForValidationPanel.Visible = true;
                MembershipUser newuser = Membership.CreateUser(UsernameTextBox.Text, PasswordTextBox.Text, EmailTextBox.Text);
                newuser.IsApproved = false;
                Membership.UpdateUser(newuser);
                MailMessage message = new MailMessage();
                message.IsBodyHtml = true;
                message.From = new MailAddress("webmaster@sudokurealm.com");
                message.To.Add(new MailAddress(EmailTextBox.Text));
                message.Subject = "Sudoku Realm Account Activation";
                message.Body = String.Format(@"---This is an automated message , please don't reply---<br/><br/>Dear {0}, Thanks for creating an account on <a href='http://www.sudokurealm.com'>Sudoku Realm</a> ...<br/><br/>
Please click on the following link to activate your account:<br/>
<a href='{1}'>{1}</a><br/><br/>
after activation you can use your credentials to login to our realm, which are ..<br/>
User Name : {0}<br/>
Email : {2}<br/>
Password: {3}<br/><br/>
Thank you very much for your interest in Sudoku Realm and good luck with your games!
                    ",
                     UsernameTextBox.Text,
                     "http://www.sudokurealm.com/verify.aspx?ID="+newuser.ProviderUserKey.ToString(),
                     EmailTextBox.Text,
                     PasswordTextBox.Text
                     );
                SmtpClient client = new SmtpClient();
                client.Send(message);
            }
//            Avempace Registration

//Dear applicant, Welcome to the website of Avempace - a scholarship scheme for academic exchange between Jordan,Lebanon, Palestine, Syria and 8 EU countries!
// Please click on the following link to activate your account:

//http://avempace.biobs.com/register_new.aspx?validate=2fe0c0b0-203a-40b0-87d1-e704ddb3028b

// email: badder.sammy@gmail.com

//password: 7a2cutdk9ms1
// Please notice:
// The online application consists of two steps. Step 1 needs to be completed by clicking the "Finish Data Entry" button
// before it is possible to proceed to step 2 where documents have to be uploaded and the host university chosen.

//Note that no more changes are possible within step 1 once it has been finished by clicking the button "Finish Data Entry (step 1)".

// Step 1 consists of:
//>>Main data (a picture needs to be uploaded as well)
//>>Profile
//>>Language skills
//>>Motivation statement

// Step 2 consists of:
//>>Documents to be uploaded
//>>Priority for host universities

// Once you click on "Finish application" after the completion of both steps, you will not have access anymore
// to your application and no more changes will be possible
// So please make sure to carefully review your application before hitting the submit button "Finish application".

// Thank you very much for your interest in Avempace and good luck with your application!

        }

    }
}
