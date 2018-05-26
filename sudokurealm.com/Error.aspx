<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="Error.aspx.cs" Inherits="sudokurealm.com.Error" %>
<asp:Content ID="Content1" ContentPlaceHolderID="HeadContent" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
        <center><h1>Sorry for inconvinence </h1>
            <h3>.. Error Occured ... </h3>
            <asp:HyperLink ID="HyperLink1" runat="server" NavigateUrl="~/Default.aspx" Text="retun to home page"></asp:HyperLink> </center>
<%--            <br />
    <span id="testspan"></span>
    <button id="testbutton" class="btn btn-warning" type="button">get</button>
    <img id="testimg" src="Images/ajax-loader.gif" style="display:none" />--%>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="ScriptContent" runat="server">
<%--    <script type="text/javascript">
        $('#testbutton').on('click', function () {
            $('#testimg').css('display','block');
            $.ajax({
                type: "POST",
                url: "/Account/SudokuService.asmx/HelloWorld",
                data: JSON.stringify({ 'x': 'sami' }),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (data1) {
                    alert(data1.d);
                    $('#testimg').css('display', 'none');
                },
                error: function (request, status, errorThrown) {
                    alert(status);
                    $('#testimg').css('display', 'none');
                }
            });
            
        });
    </script>--%>
</asp:Content>