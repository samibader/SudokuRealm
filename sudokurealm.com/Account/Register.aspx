<%@ Page Title="Register" Language="C#" MasterPageFile="~/Site.master" AutoEventWireup="true"
    CodeBehind="Register.aspx.cs" Inherits="sudokurealm.com.Account.Register" %>

<%@ Register Assembly="CaptchaControl" Namespace="Captcha" TagPrefix="cc1" %>
<asp:Content ID="HeaderContent" runat="server" ContentPlaceHolderID="HeadContent">
</asp:Content>
<asp:Content ID="BodyContent" runat="server" ContentPlaceHolderID="MainContent">
    <div class="content">
        <div class="container">
            <div class="page-header">
                <h1>
                    New User Account</h1>
            </div>
            <div class="well">
                <asp:Panel ID="WaitingForValidationPanel" runat="server" Visible="false">
                    <legend>One final step remaining , verify your account</legend>
                    <asp:Label ID="SuccessfulLabel" Text="" runat="server" />
                </asp:Panel>
                <asp:Panel ID="RegisterPanel" CssClass="form-horizontal" runat="server">
                    <legend>Be a part of Sudoku Realm </legend>
                    <div class="control-group">
                        <label class="control-label">
                            User Name</label>
                        <div class="controls">
                            <div class="input-prepend">
                                <span class="add-on"><i class="icon-user"></i></span>
                                <asp:TextBox ID="UsernameTextBox" runat="server" CssClass="input-xlarge" placeholder="Your User Name"
                                    ValidationGroup="vg1"></asp:TextBox>
                                <asp:RequiredFieldValidator ID="RequiredFieldValidator1" runat="server" ErrorMessage="User Name is Required !!!"
                                    ControlToValidate="UsernameTextBox" Font-Size="12px" CssClass="help-inline" ForeColor="#CC3300"
                                    ValidationGroup="vg1" Display="Dynamic"></asp:RequiredFieldValidator>
                                <asp:CustomValidator ID="ValidateUsernameCustomValidator" runat="server" ErrorMessage="Username should be between 3 and 16 characters in length and cannot contain special characters except underscore !!"
                                    Font-Size="12px" CssClass="help-inline" ForeColor="#CC3300" Display="Dynamic"
                                    ValidationGroup="vg1" ClientValidationFunction="ValidateUsername" ControlToValidate="UsernameTextBox"></asp:CustomValidator>
                            </div>
                        </div>
                    </div>
                    <asp:Panel DefaultButton="CheckAvailableButton" runat="server">
                        <div class="control-group">
                            <div class="controls">
                                <asp:UpdateProgress AssociatedUpdatePanelID="CheckAvailabilityUpdatePanel" runat="server"
                                    DynamicLayout="False">
                                    <ProgressTemplate>
                                        <img src="../Images/loader.gif" alt="loading.." />
                                    </ProgressTemplate>
                                </asp:UpdateProgress>
                                <asp:UpdatePanel ID="CheckAvailabilityUpdatePanel" runat="server">
                                    <ContentTemplate>
                                        <asp:Button ID="CheckAvailableButton" Text="Check Availability" CssClass="btn btn-small btn-info"
                                            runat="server" OnClick="CheckAvailableButton_Click" />
                                        <span id="successSpan" visible="false" runat="server" class="label label-success">
                                        </span><span id="errorSpan" visible="false" runat="server" class="label label-warning">
                                        </span>
                                    </ContentTemplate>
                                </asp:UpdatePanel>
                            </div>
                        </div>
                    </asp:Panel>
                    <asp:Panel DefaultButton="RegisterButton" runat="server">
                        <div class="control-group">
                            <label class="control-label">
                                Email</label>
                            <div class="controls">
                                <div class="input-prepend">
                                    <span class="add-on"><i class="icon-envelope"></i></span>
                                    <asp:TextBox ID="EmailTextBox" runat="server" CssClass="input-xlarge" placeholder="Your Email"
                                        ValidationGroup="vg1"></asp:TextBox>
                                    <asp:RequiredFieldValidator ID="RequiredFieldValidator2" runat="server" ErrorMessage="Email is Required !!!"
                                        ControlToValidate="EmailTextBox" Font-Size="12px" CssClass="help-inline" ForeColor="#CC3300"
                                        Display="Dynamic" ValidationGroup="vg1"></asp:RequiredFieldValidator>
                                    <asp:RegularExpressionValidator ID="RegularExpressionValidator1" runat="server" ErrorMessage="Email is not valid !!!"
                                        Font-Size="12px" CssClass="help-inline" ForeColor="#CC3300" ControlToValidate="EmailTextBox"
                                        Display="Dynamic" ValidationExpression="\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*"
                                        ValidationGroup="vg1"></asp:RegularExpressionValidator>
                                </div>
                            </div>
                        </div>
                        <div class="control-group">
                            <label class="control-label">
                                Password</label>
                            <div class="controls">
                                <div class="input-prepend">
                                    <span class="add-on"><i class="icon-lock"></i></span>
                                    <asp:TextBox ID="PasswordTextBox" runat="server" CssClass="input-xlarge" placeholder="Password"
                                        TextMode="Password" ValidationGroup="vg1"></asp:TextBox>
                                    <asp:RequiredFieldValidator ID="RequiredFieldValidator3" runat="server" ErrorMessage="Password is Required !!!"
                                        ControlToValidate="PasswordTextBox" Font-Size="12px" CssClass="help-inline" ForeColor="#CC3300"
                                        Display="Dynamic" ValidationGroup="vg1"></asp:RequiredFieldValidator><asp:CustomValidator
                                            ID="PasswordLengthCustomValidator" runat="server" ErrorMessage="Passwords are required to be a minimum of 6 characters in length"
                                            Font-Size="12px" CssClass="help-inline" ForeColor="#CC3300" Display="Dynamic"
                                            ValidationGroup="vg1" ClientValidationFunction="ValidatePassword" ControlToValidate="PasswordTextBox"></asp:CustomValidator>
                                </div>
                            </div>
                        </div>
                        <div class="control-group">
                            <label class="control-label">
                                Confirm Password</label>
                            <div class="controls">
                                <div class="input-prepend">
                                    <span class="add-on"><i class="icon-lock"></i></span>
                                    <asp:TextBox ID="ConfirmPasswordTextBox" runat="server" CssClass="input-xlarge" placeholder="Confirm Password"
                                        TextMode="Password" ValidationGroup="vg1"></asp:TextBox>
                                    <asp:RequiredFieldValidator ID="RequiredFieldValidator4" runat="server" ErrorMessage="Confirm Password is Required !!!"
                                        ControlToValidate="ConfirmPasswordTextBox" Font-Size="12px" CssClass="help-inline"
                                        ForeColor="#CC3300" Display="Dynamic" ValidationGroup="vg1"></asp:RequiredFieldValidator>
                                    <asp:CompareValidator ID="CompareValidator1" runat="server" ErrorMessage="Password and Confirm must match !!!"
                                        Display="Dynamic" Font-Size="12px" CssClass="help-inline" ForeColor="#CC3300"
                                        ControlToValidate="ConfirmPasswordTextBox" ControlToCompare="PasswordTextBox"
                                        ValidationGroup="vg1"></asp:CompareValidator>
                                </div>
                            </div>
                        </div>
                        <div class="control-group">
                            <label class="control-label" for="input01">
                                Enter Shown Code
                            </label>
                            <div class="controls">
                                <div class="input-prepend">
                                    <span class="add-on"><i class="icon-exclamation-sign"></i></span>
                                    <asp:TextBox ID="CaptchaTextBox" runat="server" CssClass="input-small" Style="vertical-align: top" MaxLength="5" placeholder="Code"></asp:TextBox>
                                    
                                    <cc1:CaptchaControl ID="CaptchaControl1" runat="server" CharCount="5" ImageUrl="~/Images/CapchaImage.jpg"
                                        BackColor="White" ForeColor="Black" ImageAlign="Middle" Width="180px" IgnoreCase="True" />
                                        <asp:RequiredFieldValidator ID="RequiredFieldValidator5" runat="server" ErrorMessage="Code is Required !!!"
                                        ControlToValidate="CaptchaTextBox" Font-Size="12px" CssClass="help-inline"
                                        ForeColor="#CC3300" Display="Dynamic" ValidationGroup="vg1"></asp:RequiredFieldValidator>
                                </div>
                            </div>
                        </div>
                        <div class="control-group">
                            <label class="control-label" for="input01">
                            </label>
                            <div class="controls">
                                <%--<button type="submit" class="btn btn-success" rel="tooltip" title="first tooltip">
                                Create My Account</button>--%>
                                <asp:Button ID="RegisterButton" runat="server" Text="Create My Account" CssClass="btn btn-success btn-large"
                                    OnClick="RegisterButton_Click" ValidationGroup="vg1" />
                            </div>
                        </div>
                        <asp:Label ID="ErrorLabel" ForeColor="Red" Text="" runat="server" />
                    </asp:Panel>
                </asp:Panel>
            </div>
        </div>
    </div>
</asp:Content>
<asp:Content ID="ScrContent" ContentPlaceHolderID="ScriptContent" runat="server">
    <script type="text/javascript">
        //        $('#ttt1').on('focus', function () {
        //            $(this).tooltip('show');
        //        });
        //$('#ttt1').tooltip({ placement: 'left', title: 'Enter your email' });
        //$('#ttt1').popover();
        function ValidatePassword(source, arguements) {
            var data = arguements.Value.split('');
            //start by setting false
            arguements.IsValid = false;
            //check length 
            if (data.length < 6) return;
            arguements.IsValid = true;
        }

        function ValidateUsername(source, arguements) {
            var data = arguements.Value.split('');
            //start by setting false
            arguements.IsValid = false;
            //check length 
            if (data.length < 3 || data.length > 16)
                return;
            var nochars = true;
            var special = false;
            for (var c in data) {
                if (data[c] >= 'A' && data[c] <= 'Z') {
                    nochars = false; break;
                }
                if (data[c] >= 'a' && data[c] <= 'z') {
                    nochars = false; break;
                }
            }
            for (var c in data) {
                if (!((data[c] >= 'A' && data[c] <= 'Z') || (data[c] >= 'a' && data[c] <= 'z') || (data[c] >= '0' && data[c] <= '9') || (data[c] == '_'))) {
                    special = true;
                    break;
                }
            }
            if (nochars) return;
            if (special) return;
            arguements.IsValid = true;
        } 
    </script>
</asp:Content>
