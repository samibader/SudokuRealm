<%@ Page Title="Log In" Language="C#" MasterPageFile="~/Site.master" AutoEventWireup="true"
    CodeBehind="Login.aspx.cs" Inherits="sudokurealm.com.Account.Login" %>

<asp:Content ID="HeaderContent" runat="server" ContentPlaceHolderID="HeadContent">
</asp:Content>
<asp:Content ID="BodyContent" runat="server" ContentPlaceHolderID="MainContent">

     <div class="content">
        <div class="container">
            <div class="page-header">
                <h1>
                    Login to Sudoku Realm</h1>
            </div>
            <div class="well">
            <legend>Please enter your username and password . Or <asp:HyperLink ID="RegisterHyperLink" runat="server" EnableViewState="false">Register</asp:HyperLink> if you don't have an account. </legend>
            <asp:Login ID="LoginUser" runat="server" EnableViewState="false" 
                    RenderOuterTable="false" onloginerror="LoginUser_LoginError" 
                    onloggedin="LoginUser_LoggedIn">
                <LayoutTemplate>
                    <div class="form-horizontal">
                     <div class="control-group">
                        <label class="control-label">
                            User Name</label>
                        <div class="controls">
                            <div class="input-prepend">
                                <span class="add-on"><i class="icon-user"></i></span>
                                <asp:TextBox ID="Username" runat="server" CssClass="input-xlarge" placeholder="Your User Name"
                                    ValidationGroup="vg1"></asp:TextBox>
                                <asp:RequiredFieldValidator ID="RequiredFieldValidator1" runat="server" ErrorMessage="User Name is Required !!!"
                                    ControlToValidate="Username" Font-Size="12px" CssClass="help-inline" ForeColor="#CC3300"
                                    ValidationGroup="vg1" Display="Dynamic"></asp:RequiredFieldValidator>
                            </div>
                        </div>
                    </div>
                     <div class="control-group">
                            <label class="control-label">
                                Password</label>
                            <div class="controls">
                                <div class="input-prepend">
                                    <span class="add-on"><i class="icon-lock"></i></span>
                                    <asp:TextBox ID="Password" runat="server" CssClass="input-xlarge" placeholder="Password"
                                        TextMode="Password" ValidationGroup="vg1"></asp:TextBox>
                                    <asp:RequiredFieldValidator ID="RequiredFieldValidator3" runat="server" ErrorMessage="Password is Required !!!"
                                        ControlToValidate="Password" Font-Size="12px" CssClass="help-inline" ForeColor="#CC3300"
                                        Display="Dynamic" ValidationGroup="vg1"></asp:RequiredFieldValidator>
                                </div>
                            </div>
                        </div>
                         <div class="control-group">
                            <label class="control-label" for="input01">
                            </label>
                            <div class="controls">
                                <%--<button type="submit" class="btn btn-success" rel="tooltip" title="first tooltip">
                                Create My Account</button>--%>
                                <asp:Button ID="LoginButton" runat="server" Text="Login to the REALM" CssClass="btn btn-primary btn-large" CommandName="Login" ValidationGroup="vg1" />
                            </div>
                        </div>
                        </div>
                </LayoutTemplate>
            </asp:Login>
            <div class="form-horizontal">
            <div class="control-group">
                            <label class="control-label" for="input01">
                            </label>
                            <div class="controls">
                                <asp:Label ID="ErrorLabel" ForeColor="Red" Text="" runat="server" />    
                            </div>
                        </div>
            </div>
            </div>
        </div>
    </div>
  <%--  <asp:Login ID="LoginUser" runat="server" EnableViewState="false" RenderOuterTable="false">
        <LayoutTemplate>
            <span class="failureNotification">
                <asp:Literal ID="FailureText" runat="server"></asp:Literal>
            </span>
            <asp:ValidationSummary ID="LoginUserValidationSummary" runat="server" CssClass="failureNotification" 
                 ValidationGroup="LoginUserValidationGroup"/>
            <div class="accountInfo">
                <fieldset class="login">
                    <legend>Account Information</legend>
                    <p>
                        <asp:Label ID="UserNameLabel" runat="server" AssociatedControlID="UserName">Username:</asp:Label>
                        <asp:TextBox ID="UserName" runat="server" CssClass="textEntry"></asp:TextBox>
                        <asp:RequiredFieldValidator ID="UserNameRequired" runat="server" ControlToValidate="UserName" 
                             CssClass="failureNotification" ErrorMessage="User Name is required." ToolTip="User Name is required." 
                             ValidationGroup="LoginUserValidationGroup">*</asp:RequiredFieldValidator>
                    </p>
                    <p>
                        <asp:Label ID="PasswordLabel" runat="server" AssociatedControlID="Password">Password:</asp:Label>
                        <asp:TextBox ID="Password" runat="server" CssClass="passwordEntry" TextMode="Password"></asp:TextBox>
                        <asp:RequiredFieldValidator ID="PasswordRequired" runat="server" ControlToValidate="Password" 
                             CssClass="failureNotification" ErrorMessage="Password is required." ToolTip="Password is required." 
                             ValidationGroup="LoginUserValidationGroup">*</asp:RequiredFieldValidator>
                    </p>
                    <p>
                        <asp:CheckBox ID="RememberMe" runat="server"/>
                        <asp:Label ID="RememberMeLabel" runat="server" AssociatedControlID="RememberMe" CssClass="inline">Keep me logged in</asp:Label>
                    </p>
                </fieldset>
                <p class="submitButton">
                    <asp:Button ID="LoginButton" runat="server" CommandName="Login" Text="Log In" ValidationGroup="LoginUserValidationGroup"/>
                </p>
            </div>
        </LayoutTemplate>
    </asp:Login>--%>
</asp:Content>
