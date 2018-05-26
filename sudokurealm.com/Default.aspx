<%@ Page Title="Home Page" Language="C#" MasterPageFile="~/Site.master" AutoEventWireup="true"
    CodeBehind="Default.aspx.cs" Inherits="sudokurealm.com._Default" %>

<asp:Content ID="HeaderContent" ContentPlaceHolderID="HeadContent" runat="server">
    <link href="Content/shadowbox.css" rel="stylesheet" type="text/css" />
</asp:Content>
<asp:Content runat="server" ID="BodyContent" ContentPlaceHolderID="MainContent">
    <!-- Start: slider -->
    <div class="hero-unit" style="padding:50px 93px 30px;">
        <div class="row-fluid">
            <div class="span7 marketting-info">
                <h2>
                    Welcome to
                </h2>
                <h1>
                    SUDOKU REALM</h1>
                <br />
                <p>
                    <a href="Default.aspx">Sudoku Realm</a> offers you hundreds and hundreds of genuiun
                    sudoku games that can be played in the most user-friendy web page with advanced
                    help system , and you can try it now from below by choosing a level that is suitable
                    for you and a free random game will be delivered to you ....
                </p>
                <p>
                    <a href="Account/Register.aspx">Register</a> at our site now and you will have access
                    to our huge sudoku games database .. Plus , you can try other shapes rather than
                    Standard ..
                </p>
                <p>
                    <asp:HyperLink ID="HyperLink1" NavigateUrl="~/Tutorial.aspx" Text=">>> Start a Tutorial <<<"
                        CssClass="btn btn-large btn-primary" runat="server" />
                </p>
            </div>
            <div class="span5">
                <asp:Image ID="Image1" ImageUrl="~/Images/logo-large.png" runat="server" CssClass="thumbnail" />
            </div>
        </div>
    </div>
    <!-- End: slider -->
    <!-- Start: PRODUCT LIST -->
    <%--<div class="container">
        <div class="page-header">
            <h2>
                Our Games</h2>
        </div>
        <div class="row-fluid">
            <ul class="thumbnails">
                <li class="span4">
                    <div class="thumbnail">
                        <img src="images/classic2.png" alt="product name">
                        <div class="caption">
                            <h3>
                                STANDARD Sudoku</h3>
                            <p>
                                From here you can start a Random Sudoku , or start a Specific Sudoku by entering
                                it's number without the (#) symbol
                            </p>
                        </div>
                    </div>
                </li>
                <li class="span4">
                    <div class="thumbnail">
                        <div class="caption">
                            <h3>
                                Random STANDARD Sudoku</h3>
                            <p>
                                Click on one of the buttons below to start a RANDOM SUDOKU game ... enjoy ..
                            </p>
                        </div>
                        <div class="widget-footer">
                            <p>
                                <asp:Button ID="RandomVeryEasyStandardButton" runat="server" CssClass="btn btn-large btn-info btn-block"
                                    Text="Very Easy" CommandName="very-easy" CommandArgument="standard" OnCommand="RandomGames" />
                                &nbsp;
                            </p>
                            <p>
                                <asp:Button ID="RandomEasyStandardButton" runat="server" CssClass="btn btn-large btn-primary btn-block"
                                    Text="Easy" CommandName="easy" CommandArgument="standard" OnCommand="RandomGames" />
                                &nbsp;
                            </p>
                            <p>
                                <asp:Button ID="RandomMediumStandardButton" runat="server" CssClass="btn btn-large btn-success btn-block"
                                    Text="Medium" CommandName="medium" CommandArgument="standard" OnCommand="RandomGames" />
                                &nbsp;
                            </p>
                            <p>
                                <asp:Button ID="RandomHardStandardButton" runat="server" CssClass="btn btn-large btn-warning btn-block"
                                    Text="Hard" CommandName="hard" CommandArgument="standard" OnCommand="RandomGames" />
                                &nbsp;
                            </p>
                            <p>
                                <asp:Button ID="RandomEvilStandardButton" runat="server" CssClass="btn btn-large btn-danger btn-block"
                                    Text="Evil" CommandName="evil" CommandArgument="standard" OnCommand="RandomGames" />
                                &nbsp;
                            </p>
                        </div>
                    </div>
                </li>
                <li class="span4">
                    <div class="thumbnail">
                        <div class="caption">
                            <h3>
                                Start Specific Sudoku</h3>
                            <p>
                                Please enter a Sudoku number to start:
                                <br />
                                <br />
                            </p>
                        </div>
                        <div class="widget-footer">
                            <asp:UpdateProgress ID="UpdateProgress1" AssociatedUpdatePanelID="SearchUpdatePanel"
                                runat="server" DynamicLayout="false">
                                <ProgressTemplate>
                                    <asp:Image ID="progressImage" ImageUrl="~/Images/ajax-loader.gif" runat="server"
                                        Height="11px" Width="16px" />
                                </ProgressTemplate>
                            </asp:UpdateProgress>
                            <asp:UpdatePanel runat="server" ID="SearchUpdatePanel">
                                <ContentTemplate>
                                    <asp:Panel DefaultButton="SearchByIdButton" runat="server">
                                        <div class="input-prepend">
                                            <span class="add-on">#</span>
                                            <asp:TextBox ID="SearchByIdTextBox" runat="server" CssClass="span4"></asp:TextBox>
                                        </div>
                                        <asp:Button ID="SearchByIdButton" runat="server" Text="Go!" CssClass="btn" OnClick="SearchByIdButton_Click" />
                                        <asp:Label ID="SearchErrorLabel" ForeColor="Red" Text="" runat="server" />
                                    </asp:Panel>
                                </ContentTemplate>
                            </asp:UpdatePanel>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>--%>
    <!-- End: PRODUCT LIST -->
    <!-- Start: Games Collection -->
    <div class="container">
        <div class="page-header">
            <h2>
                Sudoku Games In Our Realm .. <small>Check out these interesting variants</small></h2>
        </div>
        <div class="row-fluid">
            <ul class="thumbnails">
                <li class="span4">
                    <div class="thumbnail">
                    <a href="standard-sudoku.aspx"><h3 class="center-align">
                                Standard Sudoku</h3></a>
                                <a href="images/standard.png" rel="shadowbox">
                        <img id="standardimg" alt="Standard Sudoku" src="images/standard-small.png"></a>
                        <div class="caption">
                            
                            <p>
                                Few attractive words about your product.Few attractive words about your product.
                                Few attractive words about your product.Few attractive words about your product.
                            </p>
                        </div>
                        <div class="widget-footer">
                            <p>
                                <a class="btn btn-primary" href="#">Buy now</a>&nbsp; <a class="btn" href="product.html">
                                    Read more</a>
                            </p>
                        </div>
                    </div>
                </li>
                <li class="span4">
                    <div class="thumbnail">
                        <a href="samurai-sudoku.aspx">
                        <h3 class="center-align">
                                Samurai Sudoku</h3></a>
                        <a href="images/samurai.png" rel="shadowbox"><img alt="Samurai Sudoku" src="images/samurai-small.png"></a>
                        
                        <div class="caption">
                            <p>
                                Few attractive words about your product.Few attractive words about your product.
                                Few attractive words about your product.Few attractive words about your product.
                            </p>
                        </div>
                        <div class="widget-footer">
                            <p>
                                <a class="btn btn-primary" href="#">Buy now</a>&nbsp; <a class="btn" href="product.html">
                                    Read more</a>
                            </p>
                        </div>
                    </div>
                </li>
                <li class="span4">
                    <div class="thumbnail">
                        <a href="clock-sudoku.aspx"> <h3 class="center-align">
                                Clock Sudoku</h3></a>
                        <a href="images/clock.png" rel="shadowbox"><img alt="Clock Sudoku" src="images/clock-small.png"></a>
                        <div class="caption">
                            
                            <p>
                                Few attractive words about your product.Few attractive words about your product.
                                Few attractive words about your product.Few attractive words about your product.
                            </p>
                        </div>
                        <div class="widget-footer">
                            <p>
                                <a class="btn btn-primary" href="#">Buy now</a>&nbsp; <a class="btn" href="product.html">
                                    Read more</a>
                            </p>
                        </div>
                    </div>
                </li>
            </ul>
        </div>

    </div>
        <div id="standardModal" class="modal hide fade" tabindex="-1" aria-labelledby="standardModalLabel" aria-hidden="true">
        <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
            <h3 id="standardModalLabel">
                Standard Sudoku</h3>
        </div>
        <div class="modal-body">
            <p>
                Game Paused ...
            </p>
        </div>
        <div class="modal-footer">
            <button class="btn btn-primary" data-dismiss="modal" aria-hidden="true">
                Resume</button>
        </div>
    </div>
    <!-- End: Games Collection -->
</asp:Content>
<asp:Content runat="server" ID="ScriptContent1" ContentPlaceHolderID="ScriptContent">
    <script src="Scripts/main.js" type="text/javascript"></script>
    <script src="Scripts/shadowbox.js" type="text/javascript"></script>
    <script type="text/javascript">
        Shadowbox.init({
            handleOversize: "drag"
        });
    </script>
</asp:Content>