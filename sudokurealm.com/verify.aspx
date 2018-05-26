<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="verify.aspx.cs" Inherits="sudokurealm.com.verify" %>
<asp:Content ID="HeaderContent" runat="server" ContentPlaceHolderID="HeadContent">
</asp:Content>
<asp:Content ID="BodyContent" runat="server" ContentPlaceHolderID="MainContent">
    <div class="content">
        <div class="container">
            <div class="page-header">
                <h1>
                    User Account Activation</h1>
            </div>
            <div class="well">
             <%--<legend><i class="icon-gift"></i> Congratulation</legend>--%>
                    <asp:Label ID="InfoLabel" Text="" runat="server" />
            </div>
        </div>
    </div>
</asp:Content>
<asp:Content ID="ScrContent" ContentPlaceHolderID="ScriptContent" runat="server">
</asp:Content>
