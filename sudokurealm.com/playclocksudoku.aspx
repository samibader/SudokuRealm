<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true"
    CodeBehind="playclocksudoku.aspx.cs" Inherits="sudokurealm.com.playclocksudoku" %>

<asp:Content ID="HeaderContent" ContentPlaceHolderID="HeadContent" runat="server">
    <link href="Content/clock.sudoku.css" rel="stylesheet" />
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
        <div id="loaderwrapper" style="vertical-align: middle; text-align: center; height: 400px;
            display: none">
            <img src="Images/loader.png" />
            <br />
            <h2 id="loaderstatus">
                Creating your game .. Please wait ..</h2>
        </div>
        <div id="gamewrapper" style="display: block">
            <div class="row-fluid">
                <div class="span6 offset3" style="height: 50px;margin-left:30%">
                    <div class="alert-message info" style="display: none">
                        <button type="button" class="close">&times;</button>
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
                            <h4 class="widget-header">
                                Highlight Numbers</h4>
                            <div class="widget-body-small">
                                <p>
                                    <button type="button" class="btn btn-warning highlightnum">1</button>
                                    <button type="button" class="btn btn-warning highlightnum">2</button>
                                    <button type="button" class="btn btn-warning highlightnum">3</button>
                                    <button type="button" class="btn btn-warning highlightnum">4</button>
                                </p>
                                <p>
                                    <button type="button" class="btn btn-warning highlightnum">5</button>
                                    <button type="button" class="btn btn-warning highlightnum">6</button>
                                    <button type="button" class="btn btn-warning highlightnum">7</button>
                                    <button type="button" class="btn btn-warning highlightnum">8</button>
                                </p>
                                <p>
                                    <button type="button" class="btn btn-warning highlightnum">9</button>
                                    <button type="button" class="btn btn-warning highlightnum">A</button>
                                    <button type="button" class="btn btn-warning highlightnum">B</button>
                                    <button type="button" class="btn btn-warning highlightnum">C</button>
                                    </p>
                                    <p>
                                    <button type="button" class="btn btn-danger highlightnum">X</button>
                                </p>
                            </div>
                            <div class="historyconsole" style="display: block">
                            </div>
                            <div class="console" style="display: block">
                            </div>
                        </div>
                        <div class="span9">
                            <div id="playarea" style="width: 700px; height: 700px;">
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
    <script src="Scripts/bootstrap-slider.js" type="text/javascript"></script>
    <script src="Scripts/kinetic-v4.5.2.js" type="text/javascript"></script>
    <script src="Scripts/clock.sudoku.v1.0.js" type="text/javascript"></script>
    <script type="text/javascript">
        $(document).ready(function () {
            board.init($('#InitialPuzzle').val(), $('#Token').val());
            //board.init("200500800B00050C800B032000400700A001600700A0010003206001507000600900C003", $('#Token').val());
            $('#loaderstatus').text(' DONE ');
            $('#loaderwrapper').fadeOut(1000, function () {
                $('#gamewrapper').fadeIn(2000, function () {
                    $('#loaderwrapper').remove();
                });
            });
            $('#zoomSlider').slider({
                min: 25,
                max: 100,
                step: 25,
                value: 100,
                orientation: 'horizontal',
                handle: 'triangle',
                formater: function (value) {
                    return value + ' %';
                }
            });
            $('#zoomSlider').on('slideStop', function (ev) {
                //alert(ev.value);
                var that = board;
                if (ev.value == 25) {
                    that.stage.setScale(0.7, 0.7);
                    that.stage.draw();
                }
                if (ev.value == 50) {
                    that.stage.setScale(0.8, 0.8);
                    that.stage.draw();
                }
                if (ev.value == 75) {
                    that.stage.setScale(0.9, 0.9);
                    that.stage.draw();
                }
                if (ev.value == 100) {
                    that.stage.setScale(1, 1);
                    that.stage.draw();
                }
            });
        });
    </script>
</asp:Content>
