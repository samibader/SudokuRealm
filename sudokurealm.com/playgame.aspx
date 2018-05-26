<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true"
    CodeBehind="playgame.aspx.cs" Inherits="sudokurealm.com.playgame" %>

<asp:Content ID="HeaderContent" ContentPlaceHolderID="HeadContent" runat="server">
    <link href="Content/standard.sudoku.css" rel="stylesheet" />
    <link href="Content/bootstrapSwitch.css" rel="stylesheet" />
    <link href="Content/bootstrap-notify.css" rel="stylesheet" type="text/css" />
</asp:Content>
<asp:Content ID="BodyContent" ContentPlaceHolderID="MainContent" runat="server">
    <%--    <aside id="library">
      <img src="" id="nightsky" />
      <img src="images/big-glow.png" id="big-glow" />
      <img src="images/small-glow.png" id="small-glow" />
    </aside>--%>
    <%--<div class="notifications center"></div>--%>
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
                <div class="span6 offset3" style="height: 50px">
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
                                    <%--<tr>
                                        <td>Input Mode : </td>
                                        <td>
                                            <div class="switch" id="inputtypeSwitch" data-on-label="Mouse" data-off-label="Keyboard" data-on="warning" data-off="danger">
                                                <input type="checkbox" />
                                            </div>
                                        </td>
                                    </tr>--%>
                                </table>
                            </div>
                        </div>
                        <div class="span6">
                            <div id="playarea">
                                <table cellspacing="0" cellpadding="0" border="0" align="center" style="table-layout: fixed;
                                    height: 396px;" id="playtable" dir="ltr">
                                    <colgroup>
                                        <col class="column">
                                        <col class="column">
                                        <col class="column">
                                        <col class="column">
                                        <col class="column">
                                        <col class="column">
                                        <col class="column">
                                        <col class="column">
                                        <col class="column">
                                    </colgroup>
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
                                            <td class="left2-bottom-cell cellnormal griesh" id="td78">
                                            </td>
                                            <td class="bottom-cell cellnormal griesh" id="td79">
                                            </td>
                                            <td class="bottom-right-cell cellnormal griesh" id="td80">
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
                        <div class="span3">
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
    <script src="Scripts/bootstrap-notify.js" type="text/javascript"></script>
    <script src="Scripts/standard.sudoku.v1.0.js" type="text/javascript"></script>
    <%--    <script src="Scripts/fireworks.js" type="text/javascript"></script>
    <script src="Scripts/requestanimframe.js" type="text/javascript"></script>--%>
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
                if ((e.charCode >= 49 && e.charCode <= 57) || (e.charCode == 120) || (e.charCode == 88))
                    options.highlightnum(e);
            });
        });
        //        $();
        //        $('.highlightnum').on('click', function (event) {
        //            var that = board;
        //            var value = $(this).text();
        //            if (value != "X") {
        //                that.removeHighlight();
        //                for (var i = 0; i < 9; i++) {
        //                    for (var j = 0; j < 9; j++) {
        //                        if (that.array_data[i][j].value == value)
        //                            that.highlightCell(i, j);
        //                    }
        //                }
        //            }
        //            else {
        //                that.removeHighlight();
        //            }
        //        });

        //$("#playtable tr td").click(function (event) {
        //    event.stopPropagation();
        //    //alert("hello");
        //    // do something
        //    $('.num_select').addClass('show');
        //});
        //$('body').click(function () {
        //    $('.num_select').removeClass('show');
        //});
        //var board_data = "040730800007090305036480000210500000000000000000008012000074280604050700008013090";
        //var board_data = "000700860100200040000485000003009670009000400075300900000974000090002001028003000";
        //var board_data = "009730526005020800608000047000009062040603080890500000260000108007010600951064200";
        //board.init(board_data);
        //board.changeArrayData(1, 1, 1);
        //board.notemode = $('#notemodeSwitch').find('input:checkbox').is(':checked');
        //board.easymode = $('#easymodeSwitch').find('input:checkbox').is(':checked');
    </script>
</asp:Content>
