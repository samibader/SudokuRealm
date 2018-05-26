<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true"
    CodeBehind="playsamuraigame.aspx.cs" Inherits="sudokurealm.com.playsamuraigame" %>

<asp:Content ID="HeaderContent" ContentPlaceHolderID="HeadContent" runat="server">
    <link id="linkcss" href="Content/samurai.sudoku.css" rel="stylesheet" />
    <link id="linkcss50" href="Content/samurai.sudoku.50.css" rel="stylesheet" />
    <link href="Content/bootstrapSwitch.css" rel="stylesheet" />
    <link href="Content/slider.css" rel="stylesheet" type="text/css" />
</asp:Content>
<asp:Content ID="BodyContent" ContentPlaceHolderID="MainContent" runat="server">
    <br />
    <br />
    <br />
    <div class="container-fluid">
        <div class="page-header">
            <h1>
                <asp:Literal ID="TypeLiteral" runat="server"></asp:Literal>
                Sudoku <small>Level :
                    <asp:Literal ID="LevelLiteral" runat="server"></asp:Literal>
                    , Id : #<asp:Label ID="IdLiteral" runat="server" ClientIDMode="Static"></asp:Label>
                </small>
            </h1>
            <asp:HiddenField ID="InitialPuzzle" runat="server" EnableViewState="False" ClientIDMode="Static" />
            <asp:HiddenField ID="Token" runat="server" EnableViewState="False" ClientIDMode="Static" />
        </div>
        <div id="loaderwrapper" style="vertical-align: middle; text-align: center; height: 400px;">
            <img src="Images/loader.png" />
            <br />
            <h2 id="loaderstatus">
                Creating your game .. Please wait ..</h2>
        </div>
        <div id="gamewrapper" style="display: none">
            <div class="row-fluid">
                <div class="span6 offset3" style="height: 50px;margin-left:38%">
                    <div class="alert-message info" style="display: none">
                        <button type="button" class="close">
                            &times;</button>
                        <div style="text-align: center">
                            <span></span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row-fluid">
                <div class="span12">
                    <div class="row-fluid">
                        <div class="span3">
                            <h4 class="widget-header">
                                Game Options</h4>
                            <div class="widget-body">
                                <div class="time">
                                    <strong>Time &nbsp;&nbsp;&nbsp; </strong><span id="gametime">00:00</span>&nbsp;&nbsp;&nbsp;
                                    <button id="pauseButton" class="btn btn-warning" type="button">
                                        Pause</button>
                                </div>
                                <div class="row-fluid">
                                    <div class="span4">
                                        <button id="undoButton" class="btn btn-large btn-block" type="button">
                                            Undo</button>
                                    </div>
                                    <div class="span4">
                                        <button id="checkSolutionButton" class="btn btn-large btn-block" type="button">
                                            Check</button>
                                    </div>
                                    <div class="span4">
                                        <button id="hintButton" class="btn btn-large btn-block" type="button">
                                            Hint</button>
                                    </div>
                                </div>
                                <br />
                                <div class="row-fluid">
                                    <div class="span4">
                                        <button id="restartButton" type="button" class="btn btn-large btn-block">
                                            Restart</button>
                                    </div>
                                    <div class="span4">
                                        <button id="loadButton" class="btn btn-large btn-block" type="button">
                                            Load</button>
                                    </div>
                                    <div class="span4">
                                        <button id="saveButton" class="btn btn-large btn-block" type="button">
                                            Save</button>
                                    </div>
                                </div>
                                <br />
                                <br />
                                <table>
                                    <tr>
                                        <td>
                                            Note Mode :
                                        </td>
                                        <td>
                                            <div class="switch" id="notemodeSwitch">
                                                <input type="checkbox" />
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            Easy Mode :
                                        </td>
                                        <td>
                                            <div class="switch" id="easymodeSwitch">
                                                <input type="checkbox" />
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            All Notes :
                                        </td>
                                        <td>
                                            <div class="switch" id="allnotesSwitch">
                                                <input type="checkbox" />
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            Zoom :
                                        </td>
                                        <td>
                                            <input id="zoomSlider" type="text" value="" />
                                        </td>
                                    </tr>
                                </table>
                            </div>
                            <h4 class="widget-header">
                                Highlight Numbers</h4>
                            <div class="widget-body-small">
                                <p>
                                    <button type="button" class="btn btn-warning highlightnum">1</button>
                                    <button type="button" class="btn btn-warning highlightnum">2</button>
                                    <button type="button" class="btn btn-warning highlightnum">3</button>
                                    <button type="button" class="btn btn-warning highlightnum">4</button>
                                    <button type="button" class="btn btn-warning highlightnum">5</button>
                                </p>
                                <p>
                                    <button type="button" class="btn btn-warning highlightnum">6</button>
                                    <button type="button" class="btn btn-warning highlightnum">7</button>
                                    <button type="button" class="btn btn-warning highlightnum">8</button>
                                    <button type="button" class="btn btn-warning highlightnum">9</button>
                                    <button type="button" class="btn btn-danger highlightnum">X</button>
                                </p>
                            </div>
                            <div class="historyconsole" style="display: block">
                            </div>
                            <div class="console" style="display: block">
                            </div>
                        </div>
                        <div class="span9">
                            <div id="playarea">
                                <table cellspacing="0" cellpadding="0" border="0" align="center" style="table-layout: fixed;
                                    height: 396px;" id="playtable" dir="ltr">
<%--                                    <colgroup>
                                        <col class="column">
                                        <col class="column">
                                        <col class="column">
                                        <col class="column">
                                        <col class="column">
                                        <col class="column">
                                        <col class="column">
                                        <col class="column">
                                        <col class="column">
                                    </colgroup>--%>
                                    <tbody>
                                        <tr>
                                            <td class="top-left-cell cellnormal griesh" id="td0">
                                            </td>
                                            <td class="top-cell cellnormal griesh" id="td1">
                                            </td>
                                            <td class="top-cell cellnormal griesh" id="td2">
                                            </td>
                                            <td class="top-left2-cell cellnormal" id="td3">
                                            </td>
                                            <td class="top-cell cellnormal" id="td4">
                                            </td>
                                            <td class="top-cell cellnormal" id="td5">
                                            </td>
                                            <td class="top-left2-cell cellnormal griesh" id="td6">
                                            </td>
                                            <td class="top-cell cellnormal griesh" id="td7">
                                            </td>
                                            <td class="top-right-cell cellnormal griesh" id="td8">
                                            </td>
                                            <td class="cellnormal blankcell" id="td81">
                                            </td>
                                            <td class="cellnormal blankcell" id="td82">
                                            </td>
                                            <td class="cellnormal blankcell" id="td83">
                                            </td>
                                            <td class="top-left-cell cellnormal griesh" id="td84">
                                            </td>
                                            <td class="top-cell cellnormal griesh" id="td85">
                                            </td>
                                            <td class="top-cell cellnormal griesh" id="td86">
                                            </td>
                                            <td class="top-left2-cell cellnormal" id="td87">
                                            </td>
                                            <td class="top-cell cellnormal" id="td88">
                                            </td>
                                            <td class="top-cell cellnormal" id="td89">
                                            </td>
                                            <td class="top-left2-cell cellnormal griesh" id="td90">
                                            </td>
                                            <td class="top-cell cellnormal griesh" id="td91">
                                            </td>
                                            <td class="top-right-cell cellnormal griesh" id="td92">
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="left-cell cellnormal griesh" id="td9">
                                            </td>
                                            <td class="cell cellnormal griesh" id="td10">
                                            </td>
                                            <td class="cell cellnormal griesh" id="td11">
                                            </td>
                                            <td class="left2-cell cellnormal" id="td12">
                                            </td>
                                            <td class="cell cellnormal" id="td13">
                                            </td>
                                            <td class="cell cellnormal" id="td14">
                                            </td>
                                            <td class="left2-cell cellnormal griesh" id="td15">
                                            </td>
                                            <td class="cell cellnormal griesh" id="td16">
                                            </td>
                                            <td class="right-cell cellnormal griesh" id="td17">
                                            </td>
                                            <td class="cellnormal blankcell" id="td93">
                                            </td>
                                            <td class="cellnormal blankcell" id="td94">
                                            </td>
                                            <td class="cellnormal blankcell" id="td95">
                                            </td>
                                            <td class="left-cell cellnormal griesh" id="td96">
                                            </td>
                                            <td class="cell cellnormal griesh" id="td97">
                                            </td>
                                            <td class="cell cellnormal griesh" id="td98">
                                            </td>
                                            <td class="left2-cell cellnormal" id="td99">
                                            </td>
                                            <td class="cell cellnormal" id="td100">
                                            </td>
                                            <td class="cell cellnormal" id="td101">
                                            </td>
                                            <td class="left2-cell cellnormal griesh" id="td102">
                                            </td>
                                            <td class="cell cellnormal griesh" id="td103">
                                            </td>
                                            <td class="right-cell cellnormal griesh" id="td104">
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="left-cell cellnormal griesh" id="td18">
                                            </td>
                                            <td class="cell cellnormal griesh" id="td19">
                                            </td>
                                            <td class="cell cellnormal griesh" id="td20">
                                            </td>
                                            <td class="left2-cell cellnormal" id="td21">
                                            </td>
                                            <td class="cell cellnormal" id="td22">
                                            </td>
                                            <td class="cell cellnormal" id="td23">
                                            </td>
                                            <td class="left2-cell cellnormal griesh" id="td24">
                                            </td>
                                            <td class="cell cellnormal griesh" id="td25">
                                            </td>
                                            <td class="right-cell cellnormal griesh" id="td26">
                                            </td>
                                            <td class="cellnormal blankcell" id="td105">
                                            </td>
                                            <td class="cellnormal blankcell" id="td106">
                                            </td>
                                            <td class="cellnormal blankcell" id="td107">
                                            </td>
                                            <td class="left-cell cellnormal griesh" id="td108">
                                            </td>
                                            <td class="cell cellnormal griesh" id="td109">
                                            </td>
                                            <td class="cell cellnormal griesh" id="td110">
                                            </td>
                                            <td class="left2-cell cellnormal" id="td111">
                                            </td>
                                            <td class="cell cellnormal" id="td112">
                                            </td>
                                            <td class="cell cellnormal" id="td113">
                                            </td>
                                            <td class="left2-cell cellnormal griesh" id="td114">
                                            </td>
                                            <td class="cell cellnormal griesh" id="td115">
                                            </td>
                                            <td class="right-cell cellnormal griesh" id="td116">
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="top2-left-cell cellnormal" id="td27">
                                            </td>
                                            <td class="top2-cell cellnormal" id="td28">
                                            </td>
                                            <td class="top2-cell cellnormal" id="td29">
                                            </td>
                                            <td class="top2-left2-cell cellnormal griesh" id="td30">
                                            </td>
                                            <td class="top2-cell cellnormal griesh" id="td31">
                                            </td>
                                            <td class="top2-cell cellnormal griesh" id="td32">
                                            </td>
                                            <td class="top2-left2-cell cellnormal" id="td33">
                                            </td>
                                            <td class="top2-cell cellnormal" id="td34">
                                            </td>
                                            <td class="top2-right-cell cellnormal" id="td35">
                                            </td>
                                            <td class="cellnormal blankcell" id="td117">
                                            </td>
                                            <td class="cellnormal blankcell" id="td118">
                                            </td>
                                            <td class="cellnormal blankcell" id="td119">
                                            </td>
                                            <td class="top2-left-cell cellnormal" id="td120">
                                            </td>
                                            <td class="top2-cell cellnormal" id="td121">
                                            </td>
                                            <td class="top2-cell cellnormal" id="td122">
                                            </td>
                                            <td class="top2-left2-cell cellnormal griesh" id="td123">
                                            </td>
                                            <td class="top2-cell cellnormal griesh" id="td124">
                                            </td>
                                            <td class="top2-cell cellnormal griesh" id="td125">
                                            </td>
                                            <td class="top2-left2-cell cellnormal" id="td126">
                                            </td>
                                            <td class="top2-cell cellnormal" id="td127">
                                            </td>
                                            <td class="top2-right-cell cellnormal" id="td128">
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="left-cell cellnormal" id="td36">
                                            </td>
                                            <td class="cell cellnormal" id="td37">
                                            </td>
                                            <td class="cell cellnormal" id="td38">
                                            </td>
                                            <td class="left2-cell cellnormal griesh" id="td39">
                                            </td>
                                            <td class="cell cellnormal griesh" id="td40">
                                            </td>
                                            <td class="cell cellnormal griesh" id="td41">
                                            </td>
                                            <td class="left2-cell cellnormal" id="td42">
                                            </td>
                                            <td class="cell cellnormal" id="td43">
                                            </td>
                                            <td class="right-cell cellnormal" id="td44">
                                            </td>
                                            <td class="cellnormal blankcell" id="td129">
                                            </td>
                                            <td class="cellnormal blankcell" id="td130">
                                            </td>
                                            <td class="cellnormal blankcell" id="td131">
                                            </td>
                                            <td class="left-cell cellnormal" id="td132">
                                            </td>
                                            <td class="cell cellnormal" id="td133">
                                            </td>
                                            <td class="cell cellnormal" id="td134">
                                            </td>
                                            <td class="left2-cell cellnormal griesh" id="td135">
                                            </td>
                                            <td class="cell cellnormal griesh" id="td136">
                                            </td>
                                            <td class="cell cellnormal griesh" id="td137">
                                            </td>
                                            <td class="left2-cell cellnormal" id="td138">
                                            </td>
                                            <td class="cell cellnormal" id="td139">
                                            </td>
                                            <td class="right-cell cellnormal" id="td140">
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="left-cell cellnormal" id="td45">
                                            </td>
                                            <td class="cell cellnormal" id="td46">
                                            </td>
                                            <td class="cell cellnormal" id="td47">
                                            </td>
                                            <td class="left2-cell cellnormal griesh" id="td48">
                                            </td>
                                            <td class="cell cellnormal griesh" id="td49">
                                            </td>
                                            <td class="cell cellnormal griesh" id="td50">
                                            </td>
                                            <td class="left2-cell cellnormal" id="td51">
                                            </td>
                                            <td class="cell cellnormal" id="td52">
                                            </td>
                                            <td class="right-cell cellnormal" id="td53">
                                            </td>
                                            <td class="cellnormal blankcell" id="td141">
                                            </td>
                                            <td class="cellnormal blankcell" id="td142">
                                            </td>
                                            <td class="cellnormal blankcell" id="td143">
                                            </td>
                                            <td class="left-cell cellnormal" id="td144">
                                            </td>
                                            <td class="cell cellnormal" id="td145">
                                            </td>
                                            <td class="cell cellnormal" id="td146">
                                            </td>
                                            <td class="left2-cell cellnormal griesh" id="td147">
                                            </td>
                                            <td class="cell cellnormal griesh" id="td148">
                                            </td>
                                            <td class="cell cellnormal griesh" id="td149">
                                            </td>
                                            <td class="left2-cell cellnormal" id="td150">
                                            </td>
                                            <td class="cell cellnormal" id="td151">
                                            </td>
                                            <td class="right-cell cellnormal" id="td152">
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="top2-left-cell cellnormal griesh" id="td54">
                                            </td>
                                            <td class="top2-cell cellnormal griesh" id="td55">
                                            </td>
                                            <td class="top2-cell cellnormal griesh" id="td56">
                                            </td>
                                            <td class="top2-left2-cell cellnormal" id="td57">
                                            </td>
                                            <td class="top2-cell cellnormal" id="td58">
                                            </td>
                                            <td class="top2-cell cellnormal" id="td59">
                                            </td>
                                            <td class="top2-left2-cell cellnormal griesh2" id="td153">
                                            </td>
                                            <td class="top2-cell cellnormal griesh2" id="td154">
                                            </td>
                                            <td class="top2-cell cellnormal griesh2" id="td155">
                                            </td>
                                            <td class="top-left2-cell cellnormal" id="td156">
                                            </td>
                                            <td class="top-cell cellnormal" id="td157">
                                            </td>
                                            <td class="top-cell cellnormal" id="td158">
                                            </td>
                                            <td class="top2-left2-cell cellnormal griesh2" id="td159">
                                            </td>
                                            <td class="top2-cell cellnormal griesh2" id="td160">
                                            </td>
                                            <td class="top2-cell cellnormal griesh2" id="td161">
                                            </td>
                                            <td class="top2-left2-cell cellnormal" id="td162">
                                            </td>
                                            <td class="top2-cell cellnormal" id="td163">
                                            </td>
                                            <td class="top2-cell cellnormal" id="td164">
                                            </td>
                                            <td class="top2-left2-cell cellnormal griesh" id="td60">
                                            </td>
                                            <td class="top2-cell cellnormal griesh" id="td61">
                                            </td>
                                            <td class="top2-right-cell cellnormal griesh" id="td62">
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="left-cell cellnormal griesh" id="td63">
                                            </td>
                                            <td class="cell cellnormal griesh" id="td64">
                                            </td>
                                            <td class="cell cellnormal griesh" id="td65">
                                            </td>
                                            <td class="left2-cell cellnormal" id="td66">
                                            </td>
                                            <td class="cell cellnormal" id="td67">
                                            </td>
                                            <td class="cell cellnormal" id="td68">
                                            </td>
                                            <td class="left2-cell cellnormal griesh2" id="td165">
                                            </td>
                                            <td class="cell cellnormal griesh2" id="td166">
                                            </td>
                                            <td class="cell cellnormal griesh2" id="td167">
                                            </td>
                                            <td class="left2-cell cellnormal" id="td168">
                                            </td>
                                            <td class="cell cellnormal" id="td169">
                                            </td>
                                            <td class="cell cellnormal" id="td170">
                                            </td>
                                            <td class="left2-cell cellnormal griesh2" id="td171">
                                            </td>
                                            <td class="cell cellnormal griesh2" id="td172">
                                            </td>
                                            <td class="cell cellnormal griesh2" id="td173">
                                            </td>
                                            <td class="left2-cell cellnormal" id="td174">
                                            </td>
                                            <td class="cell cellnormal" id="td175">
                                            </td>
                                            <td class="cell cellnormal" id="td176">
                                            </td>
                                            <td class="left2-cell cellnormal griesh" id="td69">
                                            </td>
                                            <td class="cell cellnormal griesh" id="td70">
                                            </td>
                                            <td class="right-cell cellnormal griesh" id="td71">
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="left-bottom-cell cellnormal griesh" id="td72">
                                            </td>
                                            <td class="bottom-cell cellnormal griesh" id="td73">
                                            </td>
                                            <td class="bottom-cell cellnormal griesh" id="td74">
                                            </td>
                                            <td class="left2-bottom-cell cellnormal" id="td75">
                                            </td>
                                            <td class="bottom-cell cellnormal" id="td76">
                                            </td>
                                            <td class="bottom-cell cellnormal" id="td77">
                                            </td>
                                            <td class="left2-cell cellnormal griesh2" id="td177">
                                            </td>
                                            <td class="cell cellnormal griesh2" id="td178">
                                            </td>
                                            <td class="cell cellnormal griesh2" id="td179">
                                            </td>
                                            <td class="left2-cell cellnormal" id="td180">
                                            </td>
                                            <td class="cell cellnormal" id="td181">
                                            </td>
                                            <td class="cell cellnormal" id="td182">
                                            </td>
                                            <td class="left2-cell cellnormal griesh2" id="td183">
                                            </td>
                                            <td class="cell cellnormal griesh2" id="td184">
                                            </td>
                                            <td class="cell cellnormal griesh2" id="td185">
                                            </td>
                                            <td class="left2-bottom-cell cellnormal" id="td186">
                                            </td>
                                            <td class="bottom-cell cellnormal" id="td187">
                                            </td>
                                            <td class="bottom-cell cellnormal" id="td188">
                                            </td>
                                            <td class="left2-bottom-cell cellnormal griesh" id="td78">
                                            </td>
                                            <td class="bottom-cell cellnormal griesh" id="td79">
                                            </td>
                                            <td class="bottom-right-cell cellnormal griesh" id="td80">
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="cellnormal blankcell" id="td189">
                                            </td>
                                            <td class="cellnormal blankcell" id="td190">
                                            </td>
                                            <td class="cellnormal blankcell" id="td191">
                                            </td>
                                            <td class="cellnormal blankcell" id="td192">
                                            </td>
                                            <td class="cellnormal blankcell" id="td193">
                                            </td>
                                            <td class="cellnormal blankcell" id="td194">
                                            </td>
                                            <td class="top2-left-cell cellnormal" id="td201">
                                            </td>
                                            <td class="top2-cell cellnormal" id="td202">
                                            </td>
                                            <td class="top2-cell cellnormal" id="td203">
                                            </td>
                                            <td class="top2-left2-cell cellnormal griesh2" id="td204">
                                            </td>
                                            <td class="top2-cell cellnormal griesh2" id="td205">
                                            </td>
                                            <td class="top2-cell cellnormal griesh2" id="td206">
                                            </td>
                                            <td class="top2-left2-cell cellnormal" id="td207">
                                            </td>
                                            <td class="top2-cell cellnormal" id="td208">
                                            </td>
                                            <td class="top2-right-cell cellnormal" id="td209">
                                            </td>
                                            <td class="cellnormal blankcell" id="td195">
                                            </td>
                                            <td class="cellnormal blankcell" id="td196">
                                            </td>
                                            <td class="cellnormal blankcell" id="td197">
                                            </td>
                                            <td class="cellnormal blankcell" id="td198">
                                            </td>
                                            <td class="cellnormal blankcell" id="td199">
                                            </td>
                                            <td class="cellnormal blankcell" id="td200">
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="cellnormal blankcell" id="td219">
                                            </td>
                                            <td class="cellnormal blankcell" id="td220">
                                            </td>
                                            <td class="cellnormal blankcell" id="td221">
                                            </td>
                                            <td class="cellnormal blankcell" id="td222">
                                            </td>
                                            <td class="cellnormal blankcell" id="td223">
                                            </td>
                                            <td class="cellnormal blankcell" id="td224">
                                            </td>
                                            <td class="left-cell cellnormal" id="td210">
                                            </td>
                                            <td class="cell cellnormal" id="td211">
                                            </td>
                                            <td class="cell cellnormal" id="td212">
                                            </td>
                                            <td class="left2-cell cellnormal griesh2" id="td213">
                                            </td>
                                            <td class="cell cellnormal griesh2" id="td214">
                                            </td>
                                            <td class="cell cellnormal griesh2" id="td215">
                                            </td>
                                            <td class="left2-cell cellnormal" id="td216">
                                            </td>
                                            <td class="cell cellnormal" id="td217">
                                            </td>
                                            <td class="right-cell cellnormal" id="td218">
                                            </td>
                                            <td class="cellnormal blankcell" id="td225">
                                            </td>
                                            <td class="cellnormal blankcell" id="td226">
                                            </td>
                                            <td class="cellnormal blankcell" id="td227">
                                            </td>
                                            <td class="cellnormal blankcell" id="td228">
                                            </td>
                                            <td class="cellnormal blankcell" id="td229">
                                            </td>
                                            <td class="cellnormal blankcell" id="td230">
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="cellnormal blankcell" id="td231">
                                            </td>
                                            <td class="cellnormal blankcell" id="td232">
                                            </td>
                                            <td class="cellnormal blankcell" id="td233">
                                            </td>
                                            <td class="cellnormal blankcell" id="td234">
                                            </td>
                                            <td class="cellnormal blankcell" id="td235">
                                            </td>
                                            <td class="cellnormal blankcell" id="td236">
                                            </td>
                                            <td class="left-cell cellnormal" id="td243">
                                            </td>
                                            <td class="cell cellnormal" id="td244">
                                            </td>
                                            <td class="cell cellnormal" id="td245">
                                            </td>
                                            <td class="left2-cell cellnormal griesh2" id="td246">
                                            </td>
                                            <td class="cell cellnormal griesh2" id="td247">
                                            </td>
                                            <td class="cell cellnormal griesh2" id="td248">
                                            </td>
                                            <td class="left2-cell cellnormal" id="td249">
                                            </td>
                                            <td class="cell cellnormal" id="td250">
                                            </td>
                                            <td class="right-cell cellnormal" id="td251">
                                            </td>
                                            <td class="cellnormal blankcell" id="td237">
                                            </td>
                                            <td class="cellnormal blankcell" id="td238">
                                            </td>
                                            <td class="cellnormal blankcell" id="td239">
                                            </td>
                                            <td class="cellnormal blankcell" id="td240">
                                            </td>
                                            <td class="cellnormal blankcell" id="td241">
                                            </td>
                                            <td class="cellnormal blankcell" id="td242">
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="top-left-cell cellnormal griesh" id="td252">
                                            </td>
                                            <td class="top-cell cellnormal griesh" id="td253">
                                            </td>
                                            <td class="top-cell cellnormal griesh" id="td254">
                                            </td>
                                            <td class="top-left2-cell cellnormal" id="td255">
                                            </td>
                                            <td class="top-cell cellnormal" id="td256">
                                            </td>
                                            <td class="top-cell cellnormal" id="td257">
                                            </td>
                                            <td class="top2-left2-cell cellnormal griesh2" id="td258">
                                            </td>
                                            <td class="top2-cell cellnormal griesh2" id="td259">
                                            </td>
                                            <td class="top2-cell cellnormal griesh2" id="td260">
                                            </td>
                                            <td class="top2-left2-cell cellnormal" id="td261">
                                            </td>
                                            <td class="top2-cell cellnormal" id="td262">
                                            </td>
                                            <td class="top2-cell cellnormal" id="td263">
                                            </td>
                                            <td class="top2-left2-cell cellnormal griesh2" id="td264">
                                            </td>
                                            <td class="top2-cell cellnormal griesh2" id="td265">
                                            </td>
                                            <td class="top2-cell cellnormal griesh2" id="td266">
                                            </td>
                                            <td class="top-left2-cell cellnormal" id="td267">
                                            </td>
                                            <td class="top-cell cellnormal" id="td268">
                                            </td>
                                            <td class="top-cell cellnormal" id="td269">
                                            </td>
                                            <td class="top-left2-cell cellnormal griesh" id="td270">
                                            </td>
                                            <td class="top-cell cellnormal griesh" id="td271">
                                            </td>
                                            <td class="top-right-cell cellnormal griesh" id="td272">
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="left-cell cellnormal griesh" id="td273">
                                            </td>
                                            <td class="cell cellnormal griesh" id="td274">
                                            </td>
                                            <td class="cell cellnormal griesh" id="td275">
                                            </td>
                                            <td class="left2-cell cellnormal" id="td276">
                                            </td>
                                            <td class="cell cellnormal" id="td277">
                                            </td>
                                            <td class="cell cellnormal" id="td278">
                                            </td>
                                            <td class="left2-cell cellnormal griesh2" id="td279">
                                            </td>
                                            <td class="cell cellnormal griesh2" id="td280">
                                            </td>
                                            <td class="cell cellnormal griesh2" id="td281">
                                            </td>
                                            <td class="left2-cell cellnormal" id="td282">
                                            </td>
                                            <td class="cell cellnormal" id="td283">
                                            </td>
                                            <td class="cell cellnormal" id="td284">
                                            </td>
                                            <td class="left2-cell cellnormal griesh2" id="td285">
                                            </td>
                                            <td class="cell cellnormal griesh2" id="td286">
                                            </td>
                                            <td class="cell cellnormal griesh2" id="td287">
                                            </td>
                                            <td class="left2-cell cellnormal" id="td288">
                                            </td>
                                            <td class="cell cellnormal" id="td289">
                                            </td>
                                            <td class="cell cellnormal" id="td290">
                                            </td>
                                            <td class="left2-cell cellnormal griesh" id="td291">
                                            </td>
                                            <td class="cell cellnormal griesh" id="td292">
                                            </td>
                                            <td class="right-cell cellnormal griesh" id="td293">
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="left-cell cellnormal griesh" id="td294">
                                            </td>
                                            <td class="cell cellnormal griesh" id="td295">
                                            </td>
                                            <td class="cell cellnormal griesh" id="td296">
                                            </td>
                                            <td class="left2-cell cellnormal" id="td297">
                                            </td>
                                            <td class="cell cellnormal" id="td298">
                                            </td>
                                            <td class="cell cellnormal" id="td299">
                                            </td>
                                            <td class="left2-cell cellnormal griesh2" id="td300">
                                            </td>
                                            <td class="cell cellnormal griesh2" id="td301">
                                            </td>
                                            <td class="cell cellnormal griesh2" id="td302">
                                            </td>
                                            <td class="left2-bottom-cell cellnormal" id="td303">
                                            </td>
                                            <td class="bottom-cell cellnormal" id="td304">
                                            </td>
                                            <td class="bottom-cell cellnormal" id="td305">
                                            </td>
                                            <td class="left2-cell cellnormal griesh2" id="td306">
                                            </td>
                                            <td class="cell cellnormal griesh2" id="td307">
                                            </td>
                                            <td class="cell cellnormal griesh2" id="td308">
                                            </td>
                                            <td class="left2-cell cellnormal" id="td309">
                                            </td>
                                            <td class="cell cellnormal" id="td310">
                                            </td>
                                            <td class="cell cellnormal" id="td311">
                                            </td>
                                            <td class="left2-cell cellnormal griesh" id="td312">
                                            </td>
                                            <td class="cell cellnormal griesh" id="td313">
                                            </td>
                                            <td class="right-cell cellnormal griesh" id="td314">
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="top2-left-cell cellnormal" id="td315">
                                            </td>
                                            <td class="top2-cell cellnormal" id="td316">
                                            </td>
                                            <td class="top2-cell cellnormal" id="td317">
                                            </td>
                                            <td class="top2-left2-cell cellnormal griesh" id="td318">
                                            </td>
                                            <td class="top2-cell cellnormal griesh" id="td319">
                                            </td>
                                            <td class="top2-cell cellnormal griesh" id="td320">
                                            </td>
                                            <td class="top2-left2-cell cellnormal" id="td321">
                                            </td>
                                            <td class="top2-cell cellnormal" id="td322">
                                            </td>
                                            <td class="top2-right-cell cellnormal" id="td323">
                                            </td>
                                            <td class="cellnormal blankcell" id="td324">
                                            </td>
                                            <td class="cellnormal blankcell" id="td325">
                                            </td>
                                            <td class="cellnormal blankcell" id="td326">
                                            </td>
                                            <td class="top2-left-cell cellnormal" id="td327">
                                            </td>
                                            <td class="top2-cell cellnormal" id="td328">
                                            </td>
                                            <td class="top2-cell cellnormal" id="td329">
                                            </td>
                                            <td class="top2-left2-cell cellnormal griesh" id="td330">
                                            </td>
                                            <td class="top2-cell cellnormal griesh" id="td331">
                                            </td>
                                            <td class="top2-cell cellnormal griesh" id="td332">
                                            </td>
                                            <td class="top2-left2-cell cellnormal" id="td333">
                                            </td>
                                            <td class="top2-cell cellnormal" id="td334">
                                            </td>
                                            <td class="top2-right-cell cellnormal" id="td335">
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="left-cell cellnormal" id="td336">
                                            </td>
                                            <td class="cell cellnormal" id="td337">
                                            </td>
                                            <td class="cell cellnormal" id="td338">
                                            </td>
                                            <td class="left2-cell cellnormal griesh" id="td339">
                                            </td>
                                            <td class="cell cellnormal griesh" id="td340">
                                            </td>
                                            <td class="cell cellnormal griesh" id="td341">
                                            </td>
                                            <td class="left2-cell cellnormal" id="td342">
                                            </td>
                                            <td class="cell cellnormal" id="td343">
                                            </td>
                                            <td class="right-cell cellnormal" id="td344">
                                            </td>
                                            <td class="cellnormal blankcell" id="td345">
                                            </td>
                                            <td class="cellnormal blankcell" id="td346">
                                            </td>
                                            <td class="cellnormal blankcell" id="td347">
                                            </td>
                                            <td class="left-cell cellnormal" id="td348">
                                            </td>
                                            <td class="cell cellnormal" id="td349">
                                            </td>
                                            <td class="cell cellnormal" id="td350">
                                            </td>
                                            <td class="left2-cell cellnormal griesh" id="td351">
                                            </td>
                                            <td class="cell cellnormal griesh" id="td352">
                                            </td>
                                            <td class="cell cellnormal griesh" id="td353">
                                            </td>
                                            <td class="left2-cell cellnormal" id="td354">
                                            </td>
                                            <td class="cell cellnormal" id="td355">
                                            </td>
                                            <td class="right-cell cellnormal" id="td356">
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="left-cell cellnormal" id="td357">
                                            </td>
                                            <td class="cell cellnormal" id="td358">
                                            </td>
                                            <td class="cell cellnormal" id="td359">
                                            </td>
                                            <td class="left2-cell cellnormal griesh" id="td360">
                                            </td>
                                            <td class="cell cellnormal griesh" id="td361">
                                            </td>
                                            <td class="cell cellnormal griesh" id="td362">
                                            </td>
                                            <td class="left2-cell cellnormal" id="td363">
                                            </td>
                                            <td class="cell cellnormal" id="td364">
                                            </td>
                                            <td class="right-cell cellnormal" id="td365">
                                            </td>
                                            <td class="cellnormal blankcell" id="td366">
                                            </td>
                                            <td class="cellnormal blankcell" id="td367">
                                            </td>
                                            <td class="cellnormal blankcell" id="td368">
                                            </td>
                                            <td class="left-cell cellnormal" id="td369">
                                            </td>
                                            <td class="cell cellnormal" id="td370">
                                            </td>
                                            <td class="cell cellnormal" id="td371">
                                            </td>
                                            <td class="left2-cell cellnormal griesh" id="td372">
                                            </td>
                                            <td class="cell cellnormal griesh" id="td373">
                                            </td>
                                            <td class="cell cellnormal griesh" id="td374">
                                            </td>
                                            <td class="left2-cell cellnormal" id="td375">
                                            </td>
                                            <td class="cell cellnormal" id="td376">
                                            </td>
                                            <td class="right-cell cellnormal" id="td377">
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="top2-left-cell cellnormal griesh" id="td378">
                                            </td>
                                            <td class="top2-cell cellnormal griesh" id="td379">
                                            </td>
                                            <td class="top2-cell cellnormal griesh" id="td380">
                                            </td>
                                            <td class="top2-left2-cell cellnormal" id="td381">
                                            </td>
                                            <td class="top2-cell cellnormal" id="td382">
                                            </td>
                                            <td class="top2-cell cellnormal" id="td383">
                                            </td>
                                            <td class="top2-left2-cell cellnormal griesh" id="td384">
                                            </td>
                                            <td class="top2-cell cellnormal griesh" id="td385">
                                            </td>
                                            <td class="top2-right-cell cellnormal griesh" id="td386">
                                            </td>
                                            <td class="cellnormal blankcell" id="td387">
                                            </td>
                                            <td class="cellnormal blankcell" id="td388">
                                            </td>
                                            <td class="cellnormal blankcell" id="td389">
                                            </td>
                                            <td class="top2-left-cell cellnormal griesh" id="td390">
                                            </td>
                                            <td class="top2-cell cellnormal griesh" id="td391">
                                            </td>
                                            <td class="top2-cell cellnormal griesh" id="td392">
                                            </td>
                                            <td class="top2-left2-cell cellnormal" id="td393">
                                            </td>
                                            <td class="top2-cell cellnormal" id="td394">
                                            </td>
                                            <td class="top2-cell cellnormal" id="td395">
                                            </td>
                                            <td class="top2-left2-cell cellnormal griesh" id="td396">
                                            </td>
                                            <td class="top2-cell cellnormal griesh" id="td397">
                                            </td>
                                            <td class="top2-right-cell cellnormal griesh" id="td398">
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="left-cell cellnormal griesh" id="td399">
                                            </td>
                                            <td class="cell cellnormal griesh" id="td400">
                                            </td>
                                            <td class="cell cellnormal griesh" id="td401">
                                            </td>
                                            <td class="left2-cell cellnormal" id="td402">
                                            </td>
                                            <td class="cell cellnormal" id="td403">
                                            </td>
                                            <td class="cell cellnormal" id="td404">
                                            </td>
                                            <td class="left2-cell cellnormal griesh" id="td405">
                                            </td>
                                            <td class="cell cellnormal griesh" id="td406">
                                            </td>
                                            <td class="right-cell cellnormal griesh" id="td407">
                                            </td>
                                            <td class="cellnormal blankcell" id="td408">
                                            </td>
                                            <td class="cellnormal blankcell" id="td409">
                                            </td>
                                            <td class="cellnormal blankcell" id="td410">
                                            </td>
                                            <td class="left-cell cellnormal griesh" id="td411">
                                            </td>
                                            <td class="cell cellnormal griesh" id="td412">
                                            </td>
                                            <td class="cell cellnormal griesh" id="td413">
                                            </td>
                                            <td class="left2-cell cellnormal" id="td414">
                                            </td>
                                            <td class="cell cellnormal" id="td415">
                                            </td>
                                            <td class="cell cellnormal" id="td416">
                                            </td>
                                            <td class="left2-cell cellnormal griesh" id="td417">
                                            </td>
                                            <td class="cell cellnormal griesh" id="td418">
                                            </td>
                                            <td class="right-cell cellnormal griesh" id="td419">
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="left-bottom-cell cellnormal griesh" id="td420">
                                            </td>
                                            <td class="bottom-cell cellnormal griesh" id="td421">
                                            </td>
                                            <td class="bottom-cell cellnormal griesh" id="td422">
                                            </td>
                                            <td class="left2-bottom-cell cellnormal" id="td423">
                                            </td>
                                            <td class="bottom-cell cellnormal" id="td424">
                                            </td>
                                            <td class="bottom-cell cellnormal" id="td425">
                                            </td>
                                            <td class="left2-bottom-cell cellnormal griesh" id="td426">
                                            </td>
                                            <td class="bottom-cell cellnormal griesh" id="td427">
                                            </td>
                                            <td class="bottom-right-cell cellnormal griesh" id="td428">
                                            </td>
                                            <td class="blankcell cellnormal" id="td429">
                                            </td>
                                            <td class="blankcell cellnormal" id="td430">
                                            </td>
                                            <td class="blankcell cellnormal" id="td431">
                                            </td>
                                            <td class="left-bottom-cell cellnormal griesh" id="td432">
                                            </td>
                                            <td class="bottom-cell cellnormal griesh" id="td433">
                                            </td>
                                            <td class="bottom-cell cellnormal griesh" id="td434">
                                            </td>
                                            <td class="left2-bottom-cell cellnormal" id="td435">
                                            </td>
                                            <td class="bottom-cell cellnormal" id="td436">
                                            </td>
                                            <td class="bottom-cell cellnormal" id="td437">
                                            </td>
                                            <td class="left2-bottom-cell cellnormal griesh" id="td438">
                                            </td>
                                            <td class="bottom-cell cellnormal griesh" id="td439">
                                            </td>
                                            <td class="bottom-right-cell cellnormal griesh" id="td440">
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <br />
                                <div id="debConsole">
                                    <br />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <br />
    <br />
    <!-- Your custom menu with dropdown-menu as default styling  data-toggle="context" data-target="#context-menu" -->
    <div id="context-menu">
        <ul class="dropdown-menu" role="menu">
            <li id="context-highlight"><a tabindex="-1" href="#">Highlight Similar</a></li>
            <li id="context-checkcell"><a tabindex="-1" href="#">Check</a></li>
            <li class="divider"></li>
            <li id="context-clearcell"><a tabindex="-1" href="#">Clear Cell</a></li>
        </ul>
    </div>
    <br />
    <!-- Modal -->
    <div id="pauseModal" class="modal hide fade" tabindex="-1" aria-labelledby="pauseModalLabel"
        aria-hidden="true">
        <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                ×</button>
            <h3 id="pauseModalLabel">
                Game Paused</h3>
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
    <div id="restartModal" class="modal hide fade" tabindex="-1" aria-labelledby="restartModalLabel"
        aria-hidden="true">
        <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                ×</button>
            <h3 id="restartModalLabel">
                Game Restart</h3>
        </div>
        <div class="modal-body">
            <p>
                Are you sure you want to restart the game ????</p>
        </div>
        <div class="modal-footer">
            <button id="confirmrestartButton" type="button" class="btn btn-primary">
                Restart</button>
            <button class="btn" data-dismiss="modal" aria-hidden="true">
                Cancel</button>
        </div>
    </div>
    <div id="saveModal" class="modal hide fade" tabindex="-1" aria-labelledby="saveModalLabel"
        aria-hidden="true">
        <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                ×</button>
            <h3 id="saveModalLabel">
                Save Game</h3>
        </div>
        <div class="modal-body">
            <h4>
                New Game Save <small>remaining:<span id="remainingSaveSpan" class="badge">1</span></small></h4>
            <div class="form-horizontal">
                <div class="control-group">
                    <label class="control-label" for="saveGameId">
                        Save Game ID :</label>
                    <div class="controls">
                        <input type="text" id="saveGameId" placeholder="Input Text Here ..." maxlength="10" />
                    </div>
                </div>
            </div>
            <hr />
            <h5>
                Previously Saved Games &nbsp;&nbsp;<img id="saveloadingimg" src="Images/loader.gif"
                    style="display: none" alt="loading" /></h5>
            <table class="table table-hover" id="saveGameTable">
                <thead>
                    <tr>
                        <th>
                            Saved Game ID
                        </th>
                        <th>
                            Date & Time
                        </th>
                        <th>
                            Delete
                        </th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
        </div>
        <div class="modal-footer">
            <button id="confirmsaveButton" type="button" class="btn btn-primary">
                Save Game</button>
            <button class="btn" data-dismiss="modal" aria-hidden="true">
                Cancel</button>
        </div>
    </div>
    <div id="loadModal" class="modal hide fade" tabindex="-1" aria-labelledby="loadModalLabel"
        aria-hidden="true">
        <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                ×</button>
            <h3 id="loadModalLabel">
                Load Game</h3>
        </div>
        <div class="modal-body">
            <h5>
                Current Saved Games &nbsp;&nbsp;<img id="loadloadingimg" src="Images/loader.gif"
                    style="display: none" alt="loading" /></h5>
            <hr />
            <table class="table table-hover" id="loadGameTable">
                <thead>
                    <tr>
                        <th>
                            Saved Game ID
                        </th>
                        <th>
                            Date & Time
                        </th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
        </div>
        <div class="modal-footer">
            <button class="btn" data-dismiss="modal" aria-hidden="true">
                Cancel</button>
        </div>
    </div>
</asp:Content>
<asp:Content ID="FooterScript" ContentPlaceHolderID="ScriptContent" runat="server">
    <script src="Scripts/bootstrap-contextmenu.js"></script>
    <script src="Scripts/bootstrapSwitch.js"></script>
    <script src="Scripts/samurai.sudoku.v1.0.js" type="text/javascript"></script>
    <script src="Scripts/bootstrap-slider.js" type="text/javascript"></script>
    <script type="text/javascript">
        $(document).ready(function () {
            board.init($('#InitialPuzzle').val(), $('#Token').val());
            $('#loaderstatus').text(' DONE ');
            $('#loaderwrapper').fadeOut(1000, function () {
                $('#gamewrapper').fadeIn(2000, function () {
                    $('#loaderwrapper').remove();
                });
            });
            $(document).keypress(function (e) {
                // user press 1..9 Highlight nums
                if ((e.charCode >= 49 && e.charCode <= 57)||(e.charCode==120)||(e.charCode==88))
                    options.highlightnum(e);
            });
            $('#zoomSlider').slider({
                min: 50,
                max: 100,
                step: 50,
                value: 100,
                orientation: 'horizontal',
                handle: 'triangle',
                formater: function (value) {
                    return value + ' %';
                }
            });
            $('#linkcss').prop('disabled', false);
            $('#linkcss50').prop('disabled', true);
            $('#zoomSlider').on('slideStop', function (ev) {
                //alert(ev.value);
                var that = board;
                if (ev.value == 50) {
                    $('#linkcss').prop('disabled', true);
                    $('#linkcss50').prop('disabled', false);
                }
                if (ev.value == 100) {
                    $('#linkcss').prop('disabled', false);
                    $('#linkcss50').prop('disabled', true);
                }
            });
        });
    </script>
</asp:Content>
