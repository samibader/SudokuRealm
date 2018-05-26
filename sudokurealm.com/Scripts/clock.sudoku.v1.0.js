/// <reference path="jquery-1.9.1-vsdoc.js" />
/// <reference path="modernizr-2.5.3.js" />
/// <reference path="kinetic-v4.5.2.js" />

/**********************************************************
*	Timer Definition
*********************************************************/
var Timer = function () { }

Timer.prototype = {
    second: 0,
    minute: 0,
    hour: 0,
    paused: false,
    refresh: null,

    init: function (el) {
        this.el = el;
        //this.clickEvent();
        return this;
    },
    set: function (t) {
        t = t.split(':');
        this.hour = t[0];
        this.minute = t[1];
        this.second = t[2];
        return this;
    },
    go: function (now) {
        var that = this;
        this.paused = false;
        if (now)
            updateClock();
        window.clearInterval(this.refresh); // just in case
        that.refresh = window.setInterval(updateClock, 1000);

        function updateClock() {
            that.second++;
            if (that.second == 60) {
                that.second = 0;
                that.minute++;
            }
            if (that.second < 10)
                that.second = "0" + that.second;
            if (that.minute == 60) {
                that.minute = 0;
                that.hour++;
            }
            var hours = (that.hour > 0) ? ((that.hour <= 9) ? "0" + that.hour : that.hour) + ":" : '';
            that.el.html(hours + ((that.minute <= 9) ? "0" + that.minute : that.minute) + ":" + that.second);
        }
        return this;
    },
    stop: function () {
        this.paused = true;
        window.clearInterval(this.refresh);
        return this;
    },
    restart: function (el) {
        this.second = this.minute = this.hour = 0;
        this.el.text('00:00');
        this.stop().go();

    },
    clickEvent: function () {
        var that = this,
        //frag = $('<h2>').addClass('pauseGame').text(texts.pause),
            toggleFlag = true;

        this.el.bind('click', timerClicked);

        function timerClicked(callback) {
            if (!toggleFlag) return;
            toggleFlag = false;

            if (that.paused === false) {
                that.stop();  // stop the timer
                window.clearInterval(that.focus);

                // disable all options on "pause" mode
                //$('#options > button').prop('disabled', true);

                //board.mainBoard.fadeOut(400, function () {
                //    //var height = board.mainBoard.outerHeight()  // find the container height
                //    //frag.css({ letterSpacing: '25px', opacity: 0, lineHeight: height+'px' });
                //    frag.css({ letterSpacing: '25px', opacity: 0 });

                //    // add the fragment to the DOM and remove the board from the DOM, then adding a CSS class for animation
                //    $(this).after(frag).detach();
                //    frag.parent().addClass('paused');

                //    frag.animate({ opacity: 1 }, { queue: false, duration: 400 })
                //        .animate({ letterSpacing: '-4px' }, 700, "easeOutBack", function () {
                //            toggleFlag = true;
                //        });
                //});
                toggleFlag = true;
                //that.el.addClass('pause');
            }
            else {
                //$('#options > button').prop('disabled', false);
                // re-check the state for the UNDO button
                //options.undoToggle();

                //frag.animate({ opacity: 0, letterSpacing: '25px' }, 600, "easeInBack", function () {
                //$(this).parent().removeClass('paused').end().remove();
                //board.container.prepend(board.mainBoard).removeAttr('style');
                //board.mainBoard.fadeIn(400);
                that.go();

                //that.bindFocus();
                toggleFlag = true;
                //});

                // change visual of the 'pause' button
                //this.className = '';
            }
        }
    }
};

/**********************************************************
*	Game Texts
*********************************************************/
var texts = {
    share: 'Copy the link below to share the currently displayed board',
    exp: "This string represnt the board, with '0' as empty cell",
    imp: 'Enter a string of 81 characters (blanks can be 0, or anything but a number)',
    import_invalid: 'Your submission is invalid, please check again',
    board_invalid: 'Invalid board: no single solution found',
    saveGame: 'Game saved',
    loadGame: 'Game loaded',
    newGame: 'New game loaded',
    win: 'You won! very impressive',
    loose: 'Solution is not valid, please verify',
    pause: 'Game paused',
    clear_cell: 'Clear cell',
    loading_calculating: 'Calculating .. Please Wait ..',
    undo: 'Undo Performed',
    restart_successful:'Game Restarted Successfully ...'
};

/**********************************************************
*	Options logic
*********************************************************/
var options = {
    buttons: {
        alertClose: $('.alert-message .close'),
        pause: $('#pauseButton'),
        restart: $('#restartButton'),
        confirmRestart: $('#confirmrestartButton'),
        highlightSimilar: $('#context-highlight'),
        clearCell: $('#context-clearcell'),
        hint: $('#hintButton'),
        checkSolution: $('#checkSolutionButton'),
        checkCell: $('#context-checkcell'),
        undo: $('#undoButton'),
        highlightNum: $('.highlightnum'),
        save: $('#saveButton'),
        load: $('#loadButton'),
        confirmSave: $('#confirmsaveButton'),
        set: function (btn, state) {
            state = state ? false : true;
            btn.prop('disabled', state);
        }
    },
    switchs: {
        allNotes: $('#allnotesSwitch'),
        noteMode: $('#notemodeSwitch'),
        easyMode: $('#easymodeSwitch'),
        set: function (sw, state) {
            sw.bootstrapSwitch('setState', state);
        }
    },
    modals: {
        pause: $('#pauseModal'),
        restart: $('#restartModal'),
        save: $('#saveModal'),
        load: $('#loadModal'),
        show: function (md) {
            md.modal('show');
        },
        hide: function (md) {
            md.modal('hide');
        }
    },
    spans: {
        remainingSaves: $('#remainingSaveSpan'),
        gameId: $('#IdLiteral')
    },
    bind_options: function () {
        var that = this;
        this.switchs.set(this.switchs.easyMode, false);
        this.switchs.set(this.switchs.noteMode, false);
        this.switchs.set(this.switchs.allNotes, false);
        this.switchs.noteMode.on('switch-change', board.noteModeClick);
        this.switchs.easyMode.on('switch-change', board.easyModeClick);
        this.switchs.allNotes.on('switch-change', board.allCandidatesModeClick);
        this.buttons.alertClose.bind("click", that.alertClose);
        this.buttons.pause.bind("click", that.pauseGame);
        this.buttons.restart.bind("click", that.showRestartModel);
        this.buttons.confirmRestart.bind("click", that.confirmRestart);
        //        this.buttons.highlightSimilar.bind("click", that.highlightSimilar);
        //        this.buttons.clearCell.bind("click", that.clearCell);
        this.buttons.hint.bind("click", that.hint);
        this.buttons.checkSolution.bind("click", that.checkSolution);
        //        this.buttons.checkCell.bind("click", that.checkCell);
        this.buttons.undo.bind("click", that.undo);
        this.buttons.save.bind("click", that.showSaveModel);
        this.buttons.load.bind("click", that.showLoadModel);
        this.buttons.confirmSave.bind("click", that.confirmSave);
        this.buttons.highlightNum.bind("click", that.highlightnum);
        this.modals.pause.bind("hidden", that.continueGame);
        this.initSaveLoad();
    },
    initSaveLoad: function () {
        var that = board;
        if (that.userToken == null) {
            that.numberOfSaves = 0;
            options.spans.remainingSaves.text(that.numberOfSaves);
            options.buttons.set(options.buttons.save, false);
            options.buttons.set(options.buttons.load, false);
        }
        else {
            $.ajax({
                type: "POST",
                url: "/Account/SudokuService.asmx/GetSaves",
                data: JSON.stringify({ 'token': that.userToken, 'gameid': options.spans.gameId.text() }),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (data) {
                    that.numberOfSaves = that.MaxSavesAllowed - data.d.length;
                    options.spans.remainingSaves.text(that.numberOfSaves);
                    options.createSaveTable(data.d);
                    options.toggleLoadButton();
                    options.toggleSaveButton();
                },
                error: function (request, status, errorThrown) {
                    alert(status);
                }
            });
            //options.buttons.set(options.buttons.save, true);
        }
        $('#saveGameTable').on('click', '.deletesave', function (event) {
            var that = board;
            var btn = $(this),
                loadTable = $('#loadGameTable > tbody');
            $('#saveloadingimg').css('display', 'inline');
            var id = $(this).parents('tr').children('td:eq(0)').text();
            var rowIndex = $(this).parents('tr').index();
            $.ajax({
                type: "POST",
                url: "/Account/SudokuService.asmx/DeleteSaveGame",
                data: JSON.stringify({ 'token': that.userToken, 'gameId': options.spans.gameId.text(), 'saveId': id }),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (data) {
                    $('#saveloadingimg').css('display', 'none');
                    btn.parents('tr').remove();
                    loadTable.find('tr:eq(' + rowIndex + ')').remove();
                    that.numberOfSaves++;
                    options.spans.remainingSaves.text(that.numberOfSaves);
                    options.toggleSaveButton();
                    options.toggleLoadButton();
                    options.modals.hide(options.modals.save);
                    that.alertMessage("Save Id: " + id + " deleted successfully");
                },
                error: function (request, status, errorThrown) {
                    $('#saveloadingimg').css('display', 'none');
                    options.modals.hide(options.modals.save);
                    that.alertMessage("Error: " + status);
                }
            });
            event.stopPropagation();
        });
        $("#saveGameId").keypress(function (event) {
            var keycode = (event.keyCode ? event.keyCode : event.which);
            if (keycode == '13') {
                options.buttons.confirmSave.click();
                return false;
            }
        });
    },
    createSaveTable: function (savearray) {
        var saveTable = $('#saveGameTable > tbody'),
                        loadTable = $('#loadGameTable > tbody'),
                        cell, cell2, cell3, cell4, cell5, row, row2, delbtn;
        for (var i = 0; i < savearray.length; i++) {
            row = $('<tr>');
            row2 = $('<tr>');
            row2.css('cursor', 'pointer');
            cell = $('<td>');
            cell4 = $('<td>');
            cell.text(savearray[i].SaveId);
            cell4.text(savearray[i].SaveId);
            row.append(cell);
            row2.append(cell4);
            cell2 = $('<td>');
            cell5 = $('<td>');
            cell2.text(savearray[i].SaveTimeStamp);
            cell5.text(savearray[i].SaveTimeStamp);
            row.append(cell2);
            row2.append(cell5);
            cell3 = $('<td>');
            delbtn = $('<button class="btn btn-mini deletesave" type="button">X</button>');
            cell3.append(delbtn);
            row.append(cell3);
            row2.data("MovesHistory", savearray[i].MovesHistory);
            row2.data("SaveData", savearray[i].SaveData);
            saveTable.append(row);
            loadTable.append(row2);
        }
    },
    allNotesSwitchToggle: function (e, data) {
        var that = board,
            $el = $(data.el),
            value = data.value;
        alert(value);
    },
    pauseGame: function (event) {
        var that = board;
        options.modals.show(options.modals.pause);
        that.timer.stop();
        that.mainboard.fadeOut('500');
    },
    continueGame: function (event) {
        var that = board;
        that.mainboard.fadeIn('500');
        that.timer.go();
    },
    showRestartModel: function (event) {
        options.modals.show(options.modals.restart);
    },
    confirmRestart: function (event) {
        var that = board;
        that.restart();
        options.modals.hide(options.modals.restart);
        that.alertMessage(texts.restart_successful);
    },
    highlightSimilar: function (event) {
        var that = board;
        that.highlightSimilarCells(that.selectedPosI, that.selectedPosJ);
        event.preventDefault();
    },
    clearCell: function (event) {
        var that = board;
        that.clearCell(that.selectedPosI, that.selectedPosJ);
        event.preventDefault();
    },
    hint: function (event) {
        var that = board;
        that.hint();
    },
    checkSolution: function () {
        var that = board;
        that.checkSolution();
    },
    checkCell: function (event) {
        var that = board;
        that.checkSolution(that.selectedPosI, that.selectedPosJ);
        event.preventDefault();
    },
    alertClose: function () {
        $(this).parent().fadeOut(200, function () {
            $(this).hide();
        });
    },
    undo: function () {
        var that = board;
        that.undo();
    },
    showSaveModel: function (event) {
        options.modals.show(options.modals.save);
        options.toggleSaveButton();
    },
    showLoadModel: function (event) {
        options.bindLoadClicks();
        options.modals.show(options.modals.load);
    },
    toggleSaveButton: function () {
        var that = board;
        if (that.numberOfSaves == 0) {
            options.buttons.set(options.buttons.confirmSave, false);
        }
        else {
            options.buttons.set(options.buttons.confirmSave, true);
        }
    },
    toggleLoadButton: function () {
        var that = board;
        if (that.numberOfSaves == 5) {
            options.buttons.set(options.buttons.load, false);
        }
        else {
            options.buttons.set(options.buttons.load, true);
        }
    },
    confirmSave: function () {
        var that = board;
        var row = $('<tr>'),
            row2 = $('<tr>'),
            now = new Date(),
            strDateTime = [[utility.AddZero(now.getDate()), utility.AddZero(now.getMonth() + 1), now.getFullYear()].join("/"), [utility.AddZero(now.getHours()), utility.AddZero(now.getMinutes())].join(":"), now.getHours() >= 12 ? "PM" : "AM"].join(" "),
            cell = $('<td>'),
            cell2 = $('<td>'),
            cell3 = $('<td>'),
            cell4 = $('<td>'),
            cell5 = $('<td>'),
            saveTable = $('#saveGameTable > tbody'),
            loadTable = $('#loadGameTable > tbody'),
            label = $('#saveGameId').val(),
            id = label.toString().trim() != "" ? label : "auto_" + Math.floor((Math.random() * 10000) + 1),
            delbtn = $('<button class="btn btn-mini deletesave" type="button">X</button>');
        $('#saveloadingimg').css('display', 'inline');
        $.ajax({
            type: "POST",
            url: "/Account/SudokuService.asmx/SaveGame",
            data: JSON.stringify({ 'token': board.userToken, 'gameId': $('#IdLiteral').text(), 'saveId': id, 'saveTimeStamp': strDateTime, 'saveData': JSON.stringify(board.array_data), 'movesHistory': JSON.stringify(board.movesHistory) }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data1) {
                saveTable.append(row);
                loadTable.append(row2);
                row2.css('cursor', 'pointer');
                cell.text(id);
                row.append(cell);
                cell4.text(id);
                row2.append(cell4);
                row2.data("MovesHistory", JSON.stringify(board.movesHistory));
                row2.data("SaveData", JSON.stringify(board.array_data));
                cell2.text(strDateTime);
                row.append(cell2);
                cell5.text(strDateTime);
                row2.append(cell5);
                cell3.append(delbtn);
                row.append(cell3);
                $('#saveGameId').val("");
                //localStorage[id + '_array_data'] = JSON.stringify(board.array_data);
                //options.modals.hide(options.modals.save);
                that.alertMessage("Game Saved Successfully with the name : " + id);
                that.numberOfSaves--;
                options.spans.remainingSaves.text(that.numberOfSaves);
                options.toggleSaveButton();
                options.toggleLoadButton();
                options.modals.hide(options.modals.save);
                $('#saveloadingimg').css('display', 'none');
            },
            error: function (request, status, errorThrown) {
                that.alertMessage("Error:" + status);
                options.modals.hide(options.modals.save);
                $('#saveloadingimg').css('display', 'none');
            }
        });
    },
    bindLoadClicks: function () {
        var that = board;
        $('#loadGameTable > tbody >tr').each(function () {
            $(this).off();
            $(this).on('click', function () {
                var $td = $(this).find('td:eq(0)'),
                    index = $td.text(),
                    saveData = $td.parents('tr').data("SaveData"),
                    movesHistory = $td.parents('tr').data("MovesHistory");
                that.load(movesHistory, saveData);
                options.modals.hide(options.modals.load);
                that.alertMessage("Save Id : (" + index + ") has been successfully loaded");
            });
        });
    },
    highlightnum: function (event) {
        var that = board;
        var value = $(this).text();
        if (value != "X") {
            that.removeHighlight();
            for (var i = 0; i < 6; i++) {
                for (var j = 0; j < 12; j++) {
                    if (that.array_data[i][j].value == value)
                        that.highlightCell(i, j);
                }
            }
        }
        else {
            that.removeHighlight();
        }
    }
};


/*************************************************************************************
*	
*	Board logic - creation and events
*
*************************************************************************************/

var board = {
    string_data: null,     // the data as a String
    array_data: [],
    mainboard: null,
    notemode: null,
    allcandidatesmode: null,
    selectedPosI: null,
    selectedPosJ: null,
    selectedBlockI: null,
    selectedBlockJ: null,
    selectedCell: null,
    easymode: null,
    userToken: null,
    movesHistory: [],
    MaxSavesAllowed: 5,
    numberOfSaves: null,
    emptyCellsCount: null,
    /// mods ///
    stage: null,
    baselayer: null,
    celllayer: null,
    candidateslayer: null,
    noteslayer: null,
    baselayerElements: null,
    celllayerElements: null,
    candidateslayerElements: null,
    noteslayerElements: null,
    selectBoxLayer: null,
    outside1: null,
    /// end mods ///

    init: function (string_data, token) {
        this.timer = new Timer();
        this.mainboard = $('#playarea');
        this.string_data = string_data;
        this.array_data = this.transformToArray(string_data);
        this.notemode = false;
        this.allcandidatesmode = false;
        this.easymode = false;
        this.userToken = (token != "" ? token : null);
        $('#loaderstatus').text(texts.loading_calculating);
        /// mods ///
        this.stage = new Kinetic.Stage({
            container: 'playarea',
            width: this.mainboard[0].offsetWidth+50,
            height: this.mainboard[0].offsetHeight+50
        });
        this.baselayer = new Kinetic.Layer();
        this.celllayer = new Kinetic.Layer();
        this.candidateslayer = new Kinetic.Layer();
        this.selectBoxLayer = new Kinetic.Layer();
        this.noteslayer = new Kinetic.Layer();
        this.stage.add(this.baselayer);
        this.stage.add(this.celllayer);
        this.stage.add(this.candidateslayer);
        this.stage.add(this.noteslayer);
        this.stage.add(this.selectBoxLayer);
        this.baselayerElements = new Array();
        this.celllayerElements = new Array();
        this.candidateslayerElements = new Array();
        this.noteslayerElements = new Array();
        this.initiatePlayArea();
        this.initiateCells();
        this.initiateCandidatesAndNotes();
        /// end mods ///
        this.setInitialValues();
        this.initiateHandlers();
        this.selectBox.init();
        this.writeConsole();
        this.toggleUndoButton();
        this.toggleCandidatesTables();
        this.timer.init($('#gametime'));
        this.timer.go();
        options.bind_options();
    },
    initiatePlayArea: function () {
        var that = board,
        //space = Math.floor(that.mainboard[0].offsetWidth / 16),
        space = Math.floor(that.mainboard[0].offsetWidth / 16),
        r, R, index = 0;
        for (var j = 0; j < 6; j++) {
            r = (2 * space) + (j * space);
            R = r + space;
            for (var i = 0; i < 12; i++) {
                var startAngle = i * Math.PI / 6;
                var endAngle = startAngle + Math.PI / 6;
                if (index % 12 == 0 || index % 12 == 1)
                    that.baselayerElements[index] = utility.drawCell(that.stage, that.baselayer, index, r, R, startAngle, endAngle, '#fedaba');
                else if (index % 12 == 2 || index % 12 == 3)
                    that.baselayerElements[index] = utility.drawCell(that.stage, that.baselayer, index, r, R, startAngle, endAngle, '#d6e3e4');
                else if (index % 12 == 4 || index % 12 == 5)
                    that.baselayerElements[index] = utility.drawCell(that.stage, that.baselayer, index, r, R, startAngle, endAngle, '#c5b8d9');
                else if (index % 12 == 6 || index % 12 == 7)
                    that.baselayerElements[index] = utility.drawCell(that.stage, that.baselayer, index, r, R, startAngle, endAngle, '#fdf3d8');
                else if (index % 12 == 8 || index % 12 == 9)
                    that.baselayerElements[index] = utility.drawCell(that.stage, that.baselayer, index, r, R, startAngle, endAngle, '#d2eace');
                else
                    that.baselayerElements[index] = utility.drawCell(that.stage, that.baselayer, index, r, R, startAngle, endAngle, '#dbd8e9');
                index += 1;
            }
        }
//        that.outside1 = new Kinetic.Circle({
//            x: that.stage.getWidth() / 2,
//            y: that.stage.getHeight() / 2,
//            radius: 84,
//            fill: 'transparent',
//            stroke: 'transparent',
//            strokeWidth: 1
//        });
//        that.baselayer.add(that.outside1);
//        that.outside1.on('click', function () {
//            if (that.selectBox.isShown)
//                that.selectBox.hide();
//        });
        that.baselayer.draw();
    },
    initiateCells: function () {
        var that = board,
        space = Math.floor(that.mainboard[0].offsetWidth / 16),
        r, R, index = 0, k = 20;
        for (var j = 0; j < 6; j++) {
            r = (2 * space) + (j * space);
            R = r + space;
            for (var i = 0; i < 12; i++) {
                var startAngle = i * Math.PI / 6;
                var endAngle = startAngle + Math.PI / 6;
                that.celllayerElements[index] = utility.drawText(that.stage, that.celllayer, index, (r + k) * Math.cos(startAngle + Math.PI / 12), (r + k) * Math.sin(startAngle + Math.PI / 12), that.string_data[index], that.string_data[index] == '0' ? false : true);
                index += 1;
            }
        }
        that.celllayer.draw();
    },
    initiateCandidatesAndNotes: function () {
        var that = board,
        space = Math.floor(that.mainboard[0].offsetWidth / 16),
        r, R, index = 0, k = 33, c;
        for (var j = 0; j < 6; j++) {
            r = (2 * space) + (j * space);
            R = r + space;
            for (var i = 0; i < 12; i++) {
                var startAngle = i * Math.PI / 6;
                var endAngle = startAngle + Math.PI / 6;
                that.candidateslayerElements[index] = new Array();
                that.noteslayerElements[index] = new Array();
                if (!that.array_data[j][i].isfixed) {
                    for (var z = 0; z < 12; z++) {
                        k = (z < 4) ? 33 : (z < 8 ? 22 : 11);
                        c = (z % 4 == 0) ? 1 : (z % 4 == 1 ? 2.25 : (z % 4 == 2 ? 3.5 : 4.75));
                        that.candidateslayerElements[index][z] = utility.drawCandidate(that.stage, that.candidateslayer, index, (r + k) * Math.cos(startAngle + c * Math.PI / 36), (r + k) * Math.sin(startAngle + c * Math.PI / 36), z + 1 > 9 ? (z + 1 == 10 ? 'A' : (z + 1 == 11 ? 'B' : 'C')) : z + 1, 'candidate');
                        that.noteslayerElements[index][z] = utility.drawCandidate(that.stage, that.noteslayer, index, (r + k) * Math.cos(startAngle + c * Math.PI / 36), (r + k) * Math.sin(startAngle + c * Math.PI / 36), z + 1 > 9 ? (z + 1 == 10 ? 'A' : (z + 1 == 11 ? 'B' : 'C')) : z + 1, 'note');
                    }
                }
                index += 1;
            }
        }
        that.candidateslayer.draw();
        that.noteslayer.draw();
    },
    restart: function () {
        var that = this;
        var result = [], tempArray;
        var possibilities = [];
        var originalPossibilities = [];
        for (var i = 0; i < 6; i++) {
            tempArray = [];
            for (var j = 0; j < 12; j++) {
                tempArray.push({ value: that.string_data[j + i * 12], possibilities: that.array_data[i][j].originalPossibilities, originalPossibilities: that.array_data[i][j].originalPossibilities, isfixed: that.array_data[i][j].isfixed, notes: [] });
            }
            result.push(tempArray);
        }
        that.array_data = result;
        that.removeHighlight();
        that.selectBox.hide();
        for (var i = 0; i < that.celllayerElements.length; i++) {
            if (!that.celllayerElements[i].getAttr('isfixed')) {
                that.celllayerElements[i].setText('');
            }
        }
        for (var i = 0; i < that.noteslayerElements.length; i++) {
            for (var j = 0; j < 12; j++) {
                if (that.noteslayerElements[i][j].isVisible())
                    that.noteslayerElements[i][j].hide();
            }
        }
        that.celllayer.draw();
        that.noteslayer.draw();
        //$('#playtable').find('span.varcell').text('').removeClass('hide');
        //$('#playtable').find('table.candidates').removeClass('shown');
        that.timer.restart();
        that.movesHistory = [];
        that.toggleUndoButton();
        that.writeHistoryConsole();
        that.toggleCandidatesTables();
        that.writeConsole();
    },
    load: function (movesHistory, saveData) {
        var that = this;
        that.array_data = JSON.parse(saveData);
        that.movesHistory = JSON.parse(movesHistory);
        //        var $td, $span, $candidates, $cell, counter;
        for (var i = 0; i < 6; i++) {
            for (var j = 0; j < 12; j++) {
                if (that.array_data[i][j].isfixed == true)
                    continue;
                //                $td = that.findCell(i, j);
                //                $span = $td.children('span.varcell');
                //                $candidates = $td.children('table.candidates');
                var id = utility.id1D(i, j);
                if (that.array_data[i][j].value != '?') {
                    for (var ii = 0; ii < 12; ii++) {
                        that.noteslayerElements[id][ii].hide();
                    }
                    that.celllayerElements[id].setText(that.array_data[i][j].value != '0' ? that.array_data[i][j].value : '');
                    //                    $span.removeClass('hide');
                    //                    $span.text(that.array_data[i][j].value != 0 ? that.array_data[i][j].value : '');
                    //                    $candidates.removeClass('shown');
                    //                    $candidates.find('tbody > tr>td').each(function () {
                    //                        $(this).text("")
                    //                    });
                }
                else {
                    that.celllayerElements[id].setText('');
                    //                    $span.addClass('hide');
                    //                    $span.text('');
                    //                    $candidates.addClass('shown');
                    //                    counter = 0;
                    var charvalue;
                    for (var ii = 1; ii <= 12; ii++) {
                        charvalue = ii <= 9 ? ii : (ii == 10 ? 'A' : (ii == 11 ? 'B' : 'C'));
                        if (that.array_data[i][j].notes.indexOf(charvalue.toString()) != -1)
                            that.noteslayerElements[id][ii - 1].show();
                        else
                            that.noteslayerElements[id][ii - 1].hide();
                    }
                    //                    for (var ii = 1; ii < 4; ii++) {
                    //                        for (var jj = 1; jj < 4; jj++) {
                    //                            counter++;
                    //                            $cell = $candidates.find('tbody > tr:nth-child(' + ii + ') > td:nth-child(' + jj + ')');
                    //                            if (that.array_data[i][j].notes.indexOf(counter.toString()) != -1)
                    //                                $cell.text(counter);
                    //                            else
                    //                                $cell.text("");
                    //                        }
                    //                    }
                }
            }
        }

        that.removeHighlight();
        that.selectBox.hide();
        //        if (that.allcandidatesmode) {
        //            $('.shallowcandidates').remove();
        //            that.toggleCandidatesTables();
        //        }
        that.toggleCandidatesTables();
        that.stage.draw();
        that.toggleUndoButton();
        that.writeHistoryConsole();
        that.writeConsole();
    },
    countEmptyCells: function () {
        var that = board, count = 0;
        for (var i = 0; i < 9; i++) {
            for (var j = 0; j < 9; j++) {
                if (that.array_data[i][j].value == '0')
                    count++;
            }
        }
        return count;
    },
    transformToArray: function (str) {
        var result = [], tempArray;
        var possibilities = [];
        var originalPossibilities = [];
        for (var i = 0; i < 6; i++) {
            tempArray = [];
            for (var j = 0; j < 12; j++) {
                possibilities = [];
                originalPossibilities = [];
                tempArray.push({ value: str[j + i * 12], possibilities: possibilities, originalPossibilities: originalPossibilities, isfixed: false, notes: [] });
            }
            result.push(tempArray);
        }
        return result;
    },
    makeTable: function () {
        var table = $("<table>"), tr, row, td, cell;
        table.attr('cellpadding', 0).attr('cellspacing', 0);
        table.addClass('candidates');
        for (tr = 0; tr < 3; tr++) {
            row = $("<tr>").appendTo(table);
            for (td = 1; td < 4; td++) {
                cell = $("<td>");
                //cell.text(tr * 3 + td);
                row.append(cell);
            }
        }
        return table;
    },
    makeShallowTable: function () {
        //var div = $("<div>");
        //div.addClass('shallowcandidates');
        var table = $("<table>"), tr, row, td, cell;
        table.attr('cellpadding', 0).attr('cellspacing', 0);
        table.addClass('shallowcandidates');
        for (tr = 0; tr < 3; tr++) {
            row = $("<tr>").appendTo(table);
            for (td = 1; td < 4; td++) {
                cell = $("<td>");
                cell.text(tr * 3 + td);
                row.append(cell);
            }
        }
        //div.append(table);
        return table;
    },
    toggleCandidatesTables: function () {
        var that = board;
        if (that.allcandidatesmode) {
            for (var i = 0; i < 6; i++) {
                for (var j = 0; j < 12; j++) {
                    var arr = that.array_data[i][j];
                    if (arr.value == '0' || arr.value == '?') {
                        for (var ii = 0; ii < 12; ii++) {
                            var value = ii + 1 > 9 ? (ii + 1 == 10 ? 'A' : (ii + 1 == 11 ? 'B' : 'C')) : ii + 1;
                            if (arr.possibilities.indexOf(value) != -1)
                                that.candidateslayerElements[utility.id1D(i, j)][ii].show();
                            else
                                that.candidateslayerElements[utility.id1D(i, j)][ii].hide();
                        }
                    }
                    else {
                        for (var ii = 0; ii < 12; ii++) {
                            that.candidateslayerElements[utility.id1D(i, j)][ii].hide();
                        }
                    }
                }
            }
            that.candidateslayer.show();
            that.candidateslayer.draw();
        }
        else {
            that.candidateslayer.hide();
        }
    },
    setInitialValues: function () {
        for (var i = 0; i < 6; i++) {
            for (var j = 0; j < 12; j++) {
                if (this.array_data[i][j].value == '0') {
                    this.array_data[i][j].isfixed = false;
                    for (var val = 1; val <= 12; val++) {
                        if (!this.valueIsInRow(i, val) && !this.valueIsInColumn(j, val) && !this.valueIsInBlock(j, val)) {
                            var value = (val > 9) ? (val == 10 ? 'A' : (val == 11 ? 'B' : 'C')) : val;
                            this.array_data[i][j].possibilities.push(value);
                            this.array_data[i][j].originalPossibilities.push(value);
                        }
                    }
                }
                else {
                    this.array_data[i][j].isfixed = true;
                    this.array_data[i][j].possibilities.push("-");
                    this.array_data[i][j].originalPossibilities.push("-");
                }
            }
        }
    },
    recreatePossibilities: function () {
        var that = board;
        for (var i = 0; i < 6; i++) {
            for (var j = 0; j < 12; j++) {
                if (!that.array_data[i][j].isfixed) {
                    that.array_data[i][j].possibilities = [];
                    for (var val = 1; val <= 12; val++) {
                        if (!that.valueIsInRow(i, val) && !that.valueIsInColumn(j, val) && !that.valueIsInBlock(j, val)) {
                            var value = (val > 9) ? (val == 10 ? 'A' : (val == 11 ? 'B' : 'C')) : val;
                            this.array_data[i][j].possibilities.push(value);
                        }
                    }
                }
            }
        }
        that.writeConsole();
    },
    initiateHandlers: function () {
        var that = board;
        for (var i = 0; i < that.celllayerElements.length; i++) {
            that.baselayerElements[i].on('click', function (event) {
                that.removeHighlight();
                var id = this.getAttr("id"),
                    isfixed = that.celllayerElements[parseInt(id)].getAttr('isfixed'),
                    x = that.celllayerElements[parseInt(id)].getX() - 50,
                    y = that.celllayerElements[parseInt(id)].getY() - 50;
                if (isfixed) {
                    that.selectBox.hide();
                    return;
                }
                that.selectedCell = id;
                that.selectBox.show(x, y);
                //event.cancelBubble = true;
                //event.preventDefault();
            });
            that.celllayerElements[i].on('click', function () {
                that.removeHighlight();
                var id = this.getAttr("id"),
                    isfixed = that.celllayerElements[parseInt(id)].getAttr('isfixed'),
                    x = that.celllayerElements[parseInt(id)].getX() - 50,
                    y = that.celllayerElements[parseInt(id)].getY() - 50;
                if (isfixed) {
                    that.selectBox.hide();
                    return;
                }
                that.selectBox.show(x, y);
                that.selectedCell = id;
                //event.cancelBubble = true;
            });
        }
    },
    selectBox: (function () {
        var that;
        function init() {
            that = board;
            var box = new Kinetic.Rect({
                x: that.stage.getWidth() / 2 - 50,
                y: that.stage.getHeight() / 2 - 50,
                height: 100,
                width: 100,
                fill: '#F5F5F5',
                stroke: '#CACDEB',
                strokeWidth: 2,
                opacity: 1,
                shadowColor: '#9894F0',
                shadowBlur: 10,
                shadowOffset: [0, 0],
                shadowOpacity: 0.5,
                cornerRadius: 10
            });
            var xboxCalibration = 6;
            var yboxCalibration = 7;
            var textXPadding = 3;
            var textYPadding = 4;
            var xspace = 23;
            var yspace = 30;
            var height = box.getHeight() / 4;
            var width = box.getWidth() / 5.5;
            this.obj = box;
            that.selectBoxLayer.add(this.obj);
            IsShown = false;
            var numberBoxArray = new Array();
            var numberTextArray = new Array();
            var counter = 0;
            for (var i = 0; i < 3; i++) {
                for (var j = 0; j < 4; j++) {
                    numberBoxArray.push(new Kinetic.Rect({
                        x: box.getX() + xboxCalibration + j * xspace,
                        y: box.getY() + yboxCalibration + i * yspace,
                        height: height,
                        width: width,
                        fill: 'transparent',
                        strokeWidth: 0,
                        opacity: 1,
                        cornerRadius: 2,
                        index: counter
                    }));
                    numberTextArray.push(new Kinetic.Text({
                        x: box.getX() + xboxCalibration + textXPadding + j * xspace,
                        y: box.getY() + yboxCalibration + textYPadding + i * yspace,
                        text: counter + 1 <= 9 ? (counter + 1) : ((counter + 1 == 11 ? 'B' : (counter + 1 == 12 ? 'C' : 'A'))),
                        fontSize: 20,
                        fontFamily: 'Calibri',
                        fill: '#000000',
                        index: counter
                    }));
                    that.selectBoxLayer.add(numberBoxArray[counter]);
                    that.selectBoxLayer.add(numberTextArray[counter]);
                    counter++;
                }
            }
            this.objBoxArray = numberBoxArray;
            this.objTextArray = numberTextArray;
            for (var i = 0; i < numberBoxArray.length; i++) {
                numberTextArray[i].on('mouseover', function () {
                    var index = parseInt(this.getAttr('index'));
                    if (numberTextArray[index].getFill() != '#B8B8B8') {
                        numberBoxArray[index].setFill('#D1D3E8');
                        numberBoxArray[index].getLayer().draw();
                    }
                });
                numberTextArray[i].on('mouseout', function () {
                    var index = parseInt(this.getAttr('index'));
                    numberBoxArray[index].setFill('transparent');
                    numberBoxArray[index].getLayer().draw();
                });
                numberTextArray[i].on('click', picknum);
            }
            that.selectBoxLayer.draw();
            hide();
        }
        function recalculateCoordinates(x, y) {
            var xboxCalibration = 6,
            yboxCalibration = 7,
            textXPadding = 3,
            textYPadding = 4,
            xspace = 23,
            yspace = 30,
            counter = 0;
            //alert(this.obj);
        }
        function show(x, y) {
            togglePossibleValues(x, y);
            //that.selectBox.obj.addClass("show");
            //$(el).prepend(that.selectBox.obj);

            this.obj.setX(x);
            this.obj.setY(y);
            var xboxCalibration = 6, yboxCalibration = 7, textXPadding = 3, textYPadding = 4, xspace = 23, yspace = 30, counter = 0;
            for (var i = 0; i < 3; i++) {
                for (var j = 0; j < 4; j++) {
                    this.objBoxArray[counter].setX(x + xboxCalibration + j * xspace);
                    this.objBoxArray[counter].setY(y + yboxCalibration + i * yspace);
                    this.objTextArray[counter].setX(x + textXPadding + xboxCalibration + j * xspace);
                    this.objTextArray[counter].setY(y + textYPadding + yboxCalibration + i * yspace);
                    counter++;
                }
            }

            if (!that.selectBox.isShown)
                that.selectBoxLayer.show();
            that.selectBox.isShown = true;
            that.selectBoxLayer.draw();
            //                        setTimeout(function () {
            //                            $(document).on('click', clickOutside);
            //                        }, 20);
        }
        function hide() {
            that.selectBoxLayer.hide();
            that.selectBox.isShown = false;
            //                        $(document).off('click', clickOutside);
        }
        function clickOutside(e) {
            //            var $target = $(e.target);
            //                        				clicked_on_num_select = $target.hasClass('num_select') || $target.parents('table').hasClass('num_select');
            //                        if (clicked_on_num_select)
            //                            return false;
            //            hide();
            //            $(document).off('click', clickOutside);
        }
        function togglePossibleValues(x, y) {
            if (!that.easymode) {
                for (var i = 0; i < 12; i++) {
                    that.selectBox.objTextArray[i].setFill('#000000');
                    that.selectBoxLayer.draw();
                }
            }
            else {
                var ob = utility.id2D(that.selectedCell),
                    arr = that.array_data[ob.i][ob.j];
                for (var ii = 0; ii < 12; ii++) {
                    var value = ii + 1 > 9 ? (ii + 1 == 10 ? 'A' : (ii + 1 == 11 ? 'B' : 'C')) : ii + 1;
                    if (arr.possibilities.indexOf(value) == -1)
                        that.selectBox.objTextArray[ii].setFill('#B8B8B8');
                    else
                        that.selectBox.objTextArray[ii].setFill('#000000');
                    if (arr.value == value)
                        that.selectBox.objTextArray[ii].setFill('#000000');
                }
                that.selectBoxLayer.draw();
            }
        }
        function picknum(event) {
            var that = board;
            var ob = utility.id2D(that.selectedCell),
                value = this.getText();
            //alert("[" + ob.i + "," + ob.j + "] value=" + value);
            if (this.getFill() != '#B8B8B8') {
                that.selectBox.hide();
                that.changeCell(event, ob.i, ob.j, value);
                that.recreatePossibilities();
                that.toggleCandidatesTables();
            }
        }
        var IsShown;
        return {
            init: init,
            show: show,
            hide: hide,
            isShown: IsShown
        }
    })(),
    cellClick: function (event) {
        var that = board;
        if (that.selectBox.isShown)
            that.selectBox.hide();
        ///////////////// Fix ugly event calling when toggeling right mouse click/////////////
        if (event.target.tagName == "A")
            return;
        that.removeHighlight();
        that.selectBox.show(event.currentTarget);
    },
    candidatesIsShown: function (cellId) {
        var that = board;
        for (var i = 0; i < 12; i++) {
            if (that.candidateslayerElements[cellId][i].isVisible())
                return true;
        }
        return false;
    },
    changeCell: function (event, posI, posJ, newValue) {
        var that = board;
        //// note mode activated
        if (that.notemode == true) {
            that.changeNote(posI, posJ, newValue);
        }
        // note mode disabled
        else {
            that.changeVarCell(posI, posJ, newValue);
        }
    },
    changeVarCell: function (posI, posJ, newValue) {
        var that = board,
            id = utility.id1D(posI, posJ),
            arrayValue = that.array_data[posI][posJ].value;
        //alert("[" + posI + "," + posJ + "] value=" + newValue + " ID=" + id);
        /// note : Empty Cell , so insert it normally and change array data 
        if (arrayValue == '0') {
            that.celllayerElements[id].setText(newValue);
            that.celllayer.draw();
            //alert(that.candidatesIsShown(id));
            that.changeArrayData(posI, posJ, newValue);
            that.addToHistory(posI, posJ, [""], [newValue], 'varcell');
            return;
        }
        /// note : Not empty , containing only one value .. change check to see if user enter similar value or not
        else if (arrayValue != '?') {
            // note : similar value to the old one , Clear it ..
            if (arrayValue == newValue) {
                that.addToHistory(posI, posJ, [that.celllayerElements[id].getText()], [""], 'varcell');
                that.celllayerElements[id].setText('');
                that.celllayer.draw();
                that.changeArrayData(posI, posJ, '0');
            }
            // note : different new value , replace it with the old one ..
            else {
                that.addToHistory(posI, posJ, [that.celllayerElements[id].getText()], [newValue], 'varcell');
                that.celllayerElements[id].setText(newValue);
                that.celllayer.draw();
                that.changeArrayData(posI, posJ, newValue);
            }
            return;
        }
        /// note : There are notes in the cell , clear notes and switch to varcell .
        else {
            var oldNotes = [];
            for (var i = 0; i < 12; i++) {
                if (that.noteslayerElements[id][i].isVisible()) {
                    oldNotes.push(that.noteslayerElements[id][i].getText());
                    that.noteslayerElements[id][i].hide();
                }
            }
            that.celllayerElements[id].setText(newValue);
            that.celllayer.draw();
            that.noteslayer.draw();
            that.array_data[posI][posJ].notes = [];
            that.changeArrayData(posI, posJ, newValue);
            that.addToHistory(posI, posJ, oldNotes, [newValue], 'note');
        }
    },
    changeNote: function (posI, posJ, newValue) {
        var that = board,
            id = utility.id1D(posI, posJ),
            arrayValue = that.array_data[posI][posJ].value;
        var index = newValue <= 9 ? newValue : (newValue == 'A' ? 10 : (newValue == 'B' ? 11 : 12));
        ////note: no notes before , the cell either empty or has a value .. 
        if (arrayValue != '?') {
            that.array_data[posI][posJ].notes.length = 0;
            that.array_data[posI][posJ].notes.push(newValue);
            for (var i = 0; i < 12; i++) {
                if (i == index - 1)
                    that.noteslayerElements[id][i].show();
                else
                    that.noteslayerElements[id][i].hide();
            }
            that.addToHistory(posI, posJ, [that.celllayerElements[id].getText()], [newValue], 'varcell');
            that.celllayerElements[id].setText("");
            that.celllayer.draw();
            that.noteslayer.draw();
            that.changeArrayData(posI, posJ, '?');
            return;
        }
        else {
            //note :there are notes and this is new note , set visible and add it to notes array ..
            if (!that.noteslayerElements[id][index - 1].isVisible()) {
                var oldNotes = [];
                for (var i = 0; i < that.array_data[posI][posJ].notes.length; i++) {
                    oldNotes.push(that.array_data[posI][posJ].notes[i]);
                }
                that.noteslayerElements[id][index - 1].show();
                that.noteslayer.draw();
                that.addToHistory(posI, posJ, oldNotes, [oldNotes, newValue], 'note');
                that.array_data[posI][posJ].notes.push(newValue);
            }
            // note : new notes exist , hide it and see if empty
            else {
                var oldNotes = [];
                for (var i = 0; i < that.array_data[posI][posJ].notes.length; i++) {
                    oldNotes.push(that.array_data[posI][posJ].notes[i]);
                }
                that.noteslayerElements[id][index - 1].hide();
                that.noteslayer.draw();
                var newNotes = [];
                for (var i = 0; i < 12; i++) {
                    if (that.noteslayerElements[id][i].isVisible())
                        newNotes.push(that.noteslayerElements[id][i].getText());
                }
                that.array_data[posI][posJ].notes = newNotes;
                if (newNotes.length == 0)
                    that.changeArrayData(posI, posJ, 0);
                that.addToHistory(posI, posJ, oldNotes, newNotes, 'note');
            }
            return;
        }
        if (!$span.hasClass('hide')) {
            $span.addClass('hide');
            that.addToHistory(posI, posJ, [$span.text()], [newValue], 'varcell');
            that.changeArrayData(posI, posJ, '?');
            var $cell;
            var counter = 0;
            for (var i = 1; i < 4; i++) {
                for (var j = 1; j < 4; j++) {
                    counter++;
                    $cell = $candidates.find('tbody > tr:nth-child(' + i + ') > td:nth-child(' + j + ')');
                    if (counter == newValue)
                        $cell.text(newValue);
                    else
                        $cell.text("");
                }
            }
            $candidates.addClass('shown');
            $span.text("");
            that.changeNotesArray(posI, posJ);
        }
        /// candidates table is shown .. 
        else {
            var row, col;
            /// get exact element td from candidates to see if it's filled or not
            if (newValue <= 3) {
                row = 1;
                col = newValue;
            } else
                if (newValue <= 6) {
                    row = 2;
                    col = newValue - 3;
                }
                else {
                    row = 3;
                    col = newValue - 6;
                }
            var $cell = $candidates.find('tbody > tr:nth-child(' + row + ') > td:nth-child(' + col + ')');
            /// if the td is not filled ... fill it with the new value ..
            var oldValues = [];
            $candidates.find('tbody > tr>td').each(function () {
                if ($(this).text() != "")
                    oldValues.push($(this).text());
            });
            if ($cell.text() == "") {
                $cell.text(newValue);
                that.addToHistory(posI, posJ, oldValues, [oldValues, newValue], 'note');
                that.changeArrayData(posI, posJ, '?');
                that.changeNotesArray(posI, posJ);
            }
            /// the td is filled with the same value before .. 
            else {
                $cell.text("");
                var newValues = []
                for (var i = 0; i < oldValues.length; i++) {
                    if (oldValues[i] == newValue)
                        continue;
                    newValues.push(oldValues[i]);
                }
                that.addToHistory(posI, posJ, oldValues, newValues, 'note');
                if (newValues.length == 0) {
                    that.changeArrayData(posI, posJ, 0);
                    that.changeNotesArray(posI, posJ);
                }
                else {
                    that.changeArrayData(posI, posJ, '?');
                    that.changeNotesArray(posI, posJ);
                }
            }
        }
    },
    changeNotesArray: function (posI, posJ) {
        var that = board,
        $td = that.findCell(posI, posJ),
        notes = [],
        $candidates = $td.children('table.candidates'),
        counter = 0;
        if (!$candidates.hasClass('shown')) {
            that.array_data[posI][posJ].notes = notes;
            that.writeConsole();
            return;
        }
        for (var i = 1; i < 4; i++) {
            for (var j = 1; j < 4; j++) {
                counter++;
                $cell = $candidates.find('tbody > tr:nth-child(' + i + ') > td:nth-child(' + j + ')');
                if ($cell.text() != "")
                    notes.push($cell.text());
            }
        }
        that.array_data[posI][posJ].notes = notes;
        that.writeConsole();
    },
    changePossibilities: function (posI, posJ, value, operation) {
        var that = board,
			possibilities = that.array_data[posI][posJ].possibilities,
			originalPossibilities = that.array_data[posI][posJ].originalPossibilities,
			intValue = parseInt(value);
        switch (operation) {
            case "remove":
                for (var i = 0; i < 9; i++) {
                    originalPossibilities = that.array_data[i][posJ].originalPossibilities;
                    possibilities = that.array_data[i][posJ].possibilities
                    //alert(possibilities.indexOf(value));
                    if (originalPossibilities.indexOf(intValue) != -1)
                        if (possibilities.indexOf(intValue) != -1)
                            possibilities.splice(possibilities.indexOf(intValue), 1);
                }
                break;
        }
        that.writeConsole();
    },
    noteModeClick: function (e, data) {
        that = board;
        var $el = $(data.el), value = data.value;
        that.notemode = value;
        if (that.selectBox.isShown)
            that.selectBox.hide();
    },
    easyModeClick: function (e, data) {
        that = board;
        var $el = $(data.el), value = data.value;
        that.easymode = value;
        if (that.selectBox.isShown)
            that.selectBox.hide();
    },
    allCandidatesModeClick: function (e, data) {
        that = board;
        var $el = $(data.el), value = data.value;
        that.allcandidatesmode = value;
        that.toggleCandidatesTables();
        if (that.selectBox.isShown)
            that.selectBox.hide();
    },
    findCell: function (posI, posJ) {
        var that = board;
        return that.baselayerElements[utility.id1D(posI, posJ)];
    },
    highlightCell: function (posI, posJ) {
        var that = board;
        //that.removeHighlight();
        that.findCell(posI, posJ).setFill('#DC9D9F');
        that.baselayer.draw();
        //board.mainboard.find('tbody > tr:nth-child('+posI+') > td.cellnormal:nth-child('+posJ+')').addClass('cellhighlighted');
    },
    highlightRelatedCells: function (posI, posJ) {
        var that = board;
        //that.removeHighlight();
        for (var j = 0; j < 12; j++) {
            //highlight Row
            that.findCell(posI, j).setFill('#DC9D9F');
        }
        var mirrorJ = posJ < 6 ? posJ + 6 : posJ % 6;
        var blockJ = posJ % 2 == 0 ? posJ + 1 : posJ - 1;
        for (var i = 0; i < 6; i++) {
            that.findCell(i, posJ).setFill('#DC9D9F');
            that.findCell(i, mirrorJ).setFill('#DC9D9F');
            that.findCell(i, blockJ).setFill('#DC9D9F');
        }
        that.baselayer.draw();
    },
    highlightSimilarCells: function (posI, posJ) {
        var that = board;
        that.removeHighlight();
        var value = that.findCell(posI, posJ).find('span.varcell').text();
        if (value == "") {
            that.alertMessage('Nothing to highlight');
            return;
        }
        for (var i = 0; i < 9; i++) {
            for (var j = 0; j < 9; j++) {
                if (that.findCell(i, j).find('span').text() == value)
                    that.findCell(i, j).addClass('cellhighlighted');
            }
        }
    },
    highlightBlock: function () {
        var that = board;
        for (var i = board.selectedBlockI; i < board.selectedBlockI + 3; i++) {
            for (var j = board.selectedBlockJ; j < board.selectedBlockJ + 3; j++) {
                //if(that.findCell(i,j).has('span.varcell').length)
                that.highlightCell(i, j);
            }
        }
    },
    removeHighlight: function () {
        var that = board;
        for (var i = 0; i < 6; i++) {
            for (var j = 0; j < 12; j++) {
                that.findCell(i, j).setFill(that.findCell(i, j).getAttr('originalColor'));
            }
        }
        that.baselayer.draw();
    },
    getValue: function (posI, posJ) {
        var that = board;
        var value = that.findCell(posI, posJ).find('.varcell:visible').first().text();
        return value != "" ? value : 0;
    },
    alertMessage: function (msg) {
        $('.alert-message').find('span').text(msg);
        $('.alert-message').show();
        setTimeout(function () {
            $('.alert-message').addClass('blink');
        }, 500);
        setTimeout(function () {
            $('.alert-message').removeClass('blink');
        }, 1000);
        //        $('.notifications').notify({
        //            message: { text: msg },
        //            fadeOut: { enabled: true, delay: 3000 }
        //        }).show();
    },
    writeConsole: function () {
        var $div = $('.console');
        var $br = $("<br/>");
        var $span = $("<span>");
        var $hr = $("<hr/>");
        var str = "";
        $div.empty();
        for (var i = 0; i < 6; i++) {
            $span = $("<span>");
            $br = $("<br/>");
            str = "";
            for (var j = 0; j < 12; j++) {
                str = str + board.array_data[i][j].value + " " + "[" + board.array_data[i][j].notes + "]";
            }
            $span.text(str);
            $div.append($span);
            $div.append($br);
        }
        $div.append($hr);
        str = "";
        for (var i = 0; i < 6; i++) {
            for (var j = 0; j < 12; j++) {
                $span = $("<span>");
                $br = $("<br/>");
                str = board.array_data[i][j].possibilities + " => " + board.array_data[i][j].originalPossibilities;
                $span.text(str);
                $div.append($span);
                $div.append($br);
            }
        }
    },
    writeHistoryConsole: function () {
        var $div = $('.historyconsole');
        var $br = $("<br/>");
        var $span = $("<span>");
        var $hr = $("<hr/>");
        var str = "";
        $div.empty();
        for (var i = 0; i < board.movesHistory.length; i++) {
            $span = $("<span>");
            $br = $("<br/>");
            str = "[" + board.movesHistory[i].posI + ',' + board.movesHistory[i].posJ + ']  =>  ' + 'old= ' + board.movesHistory[i].oldvalues + '    new= ' + board.movesHistory[i].newvalues + ' type=' + board.movesHistory[i].type;
            $span.text(str);
            $div.append($span);
            $div.append($br);
        }
        $div.append($hr);
    },
    changeArrayData: function (posI, posJ, value) {
        board.array_data[posI][posJ].value = value;
        board.writeConsole();
    },
    noteModeOff: function () {
        var that = board;
    },
    clearCell: function (posI, posJ) {
        var that = board;
        var $td = that.findCell(posI, posJ);
        var $span = $td.children('span.varcell');
        var $candidates = $td.children('table.candidates');
        /////////////// varcell is visible .. clear the cell and change arraydata to 0/////////////
        if ($span.is(':visible')) {
            if ($span.text() == "") {
                that.alertMessage('Cell is empty .. Nothing to clear');
            }
            else {
                that.changeArrayData(that.selectedPosI, that.selectedPosJ, 0);
                that.addToHistory(that.selectedPosI, that.selectedPosJ, [$span.text()], [""], 'varcell');
                $span.text("");
                that.alertMessage('Cell is cleared');
                that.recreatePossibilities();
                that.writeConsole();
                that.writeHistoryConsole();
            }
            return;
        }
        /////////// Candidates table is visible .. clear the candidates table .. change arraydata to 0 .. change varcell back to visible
        else {
            var $cell;
            var oldValues = [];
            for (var i = 1; i < 4; i++) {
                for (var j = 1; j < 4; j++) {
                    $cell = $candidates.find('tbody > tr:nth-child(' + i + ') > td:nth-child(' + j + ')');
                    if ($cell.text() != "")
                        oldValues.push($cell.text());
                    $cell.text("");
                }
            }
            $candidates.removeClass('shown');
            $span.removeClass('hide');
            that.addToHistory(that.selectedPosI, that.selectedPosJ, oldValues, [""], 'note');
            that.changeArrayData(that.selectedPosI, that.selectedPosJ, 0);
            that.changeNotesArray(that.selectedPosI, that.selectedPosJ);
            that.recreatePossibilities();
            that.writeConsole();
            that.writeHistoryConsole();
        }

    },
    valueIsInRow: function (rowIndex, realValue) {
        var that = board,
            value = (realValue > 9) ? (realValue == 10 ? 'A' : (realValue == 11 ? 'B' : 'C')) : realValue;
        for (var j = 0; j < 12; j++) {
            if (that.array_data[rowIndex][j].value == value)
                return true;
        }
        return false;
    },
    valueIsInColumn: function (colIndex, realValue) {
        var that = board,
            value = (realValue > 9) ? (realValue == 10 ? 'A' : (realValue == 11 ? 'B' : 'C')) : realValue;
        for (var i = 0; i < 6; i++) {
            if (that.array_data[i][colIndex].value == value)
                return true;
        }
        var mirrorCol = (colIndex < 6) ? colIndex + 6 : colIndex - 6;
        for (var i = 0; i < 6; i++) {
            if (that.array_data[i][mirrorCol].value == value)
                return true;
        }
        return false;
    },
    valueIsInBlock: function (colIndex, realValue) {
        var that = board,
            value = (realValue > 9) ? (realValue == 10 ? 'A' : (realValue == 11 ? 'B' : 'C')) : realValue;
        var mirrorCol = (colIndex % 2 == 0) ? colIndex + 1 : colIndex - 1;
        for (var i = 0; i < 6; i++) {
            if (that.array_data[i][colIndex].value == value)
                return true;
            if (that.array_data[i][mirrorCol].value == value)
                return true;
        }
        return false;
    },
    toggleUndoButton: function () {
        var that = board;
        //alert(that.movesHistory.length);
        if (that.movesHistory.length == 0)
            options.buttons.set(options.buttons.undo, false);
        else
            options.buttons.set(options.buttons.undo, true);
    },
    addToHistory: function (posI, posJ, oldvalues, newvalues, type) {
        var that = board;
        that.movesHistory.push({ posI: posI, posJ: posJ, oldvalues: oldvalues, newvalues: newvalues, type: type });
        that.toggleUndoButton();
        that.writeHistoryConsole();
    },
    undo: function (event) {
        var that = board;
        if ($(this).hasClass('disabled')) {
            return;
        }
        var lastAction = that.movesHistory.pop(),
            posI = lastAction.posI,
            posJ = lastAction.posJ,
            oldvalues = lastAction.oldvalues,
            newvalues = lastAction.newvalues,
            type = lastAction.type,
            id = utility.id1D(posI, posJ);
        if (type == 'varcell') {
            that.celllayerElements[id].setText(oldvalues[0]);
            that.celllayer.draw();
            for (var i = 0; i < 12; i++) {
                that.noteslayerElements[id][i].hide();
            }
            that.noteslayer.draw();
            that.array_data[posI][posJ].notes = [];
            that.changeArrayData(posI, posJ, oldvalues[0] == "" ? 0 : oldvalues[0]);
        }
        else {
            that.celllayerElements[id].setText("");
            that.celllayer.draw();
            for (var i = 0; i < 12; i++) {
                if (oldvalues.indexOf(that.noteslayerElements[id][i].getText()) != -1) {
                    that.noteslayerElements[id][i].show();
                }
                else {
                    that.noteslayerElements[id][i].hide();
                }
            }
            var newNotes = [];
            for (var i = 0; i < 12; i++) {
                if (that.noteslayerElements[id][i].isVisible())
                    newNotes.push(that.noteslayerElements[id][i].getText());
            }
            that.noteslayer.draw();
            that.array_data[posI][posJ].notes = newNotes;
            that.changeArrayData(posI, posJ, "?");
        }
        that.recreatePossibilities();
        that.writeHistoryConsole();
        that.writeConsole();
        that.toggleUndoButton();
        that.alertMessage(texts.undo + ': Step(' + parseInt(that.movesHistory.length + 1) + ')');
        //$('#notemodeSwitch').bootstrapSwitch('setState', true);
        if (that.allcandidatesmode) {
            that.toggleCandidatesTables();
        }
    },
    hint: function () {
        var that = board;
        var counter = 0;
        that.removeHighlight();
        for (var i = 0; i < 6; i++) {
            for (var j = 0; j < 12; j++) {
                if ((that.array_data[i][j].possibilities.length == 1) && (!that.array_data[i][j].isfixed) && (that.array_data[i][j].value == '0')) {
                    that.highlightCell(i, j);
                    counter++;
                }
            }
        }
        if (counter == 0)
            that.alertMessage('No Visible Hints !!!');
    },
    checkSolution: function (posI, posJ) {
        var that = board;
        that.removeHighlight();
        var value;
        var charValue;
        if (!posI && !posJ) {
            for (var i = 0; i < 6; i++) {
                for (var j = 0; j < 12; j++) {
                    if (!that.array_data[i][j].isfixed && that.array_data[i][j].value != '0' && that.array_data[i][j].value != '?') {
                        value = that.array_data[i][j].value;
                        ////////check to see if the value is repeated in the same column
                        var mirrorCol = (j < 6) ? j + 6 : j - 6;
                        var mirrorColForBlock = (j % 2 == 0) ? j + 1 : j - 1;
                        for (var row = 0; row < 6; row++) {
                            if (row == i)
                                continue;
                            if (value == that.array_data[row][j].value) {
                                that.alertMessage('Error : Elements cannot have similar values within same Column !!');
                                that.highlightCell(row, j);
                                that.highlightCell(i, j);
                                return;
                            }
                            if (value == that.array_data[row][mirrorCol].value) {
                                that.alertMessage('Error : Elements cannot have similar values within same Column !!');
                                that.highlightCell(row, mirrorCol);
                                that.highlightCell(i, j);
                                return;
                            }
                        }
                        for (var col = 0; col < 12; col++) {
                            if (col == j)
                                continue;
                            //                            charValue = (col > 9) ? (col == 10 ? 'A' : (col == 11 ? 'B' : 'C')) : col
                            if (value == that.array_data[i][col].value) {
                                that.alertMessage('Error : Elements cannot have similar values within same Row !!');
                                that.highlightCell(i, col);
                                that.highlightCell(i, j);
                                return;
                            }
                        }
                        for (var ii = 0; ii < 6; ii++) {
                            if (i == ii)
                                continue;
                            if (value == that.array_data[ii][j].value) {
                                that.alertMessage('Error : Elements cannot have similar values within same Block !!');
                                that.highlightCell(ii, j);
                                that.highlightCell(i, j);
                                return;
                            }
                            if (value == that.array_data[ii][mirrorColForBlock].value) {
                                that.alertMessage('Error : Elements cannot have similar values within same Block !!');
                                that.highlightCell(ii, mirrorColForBlock);
                                that.highlightCell(i, j);
                                return;
                            }
                        }

                    }
                }
            }
        }
        else {
            value = that.array_data[posI][posJ].value;
            alert(value);
            if (value != 0 && value != '?') {
                for (var row = 0; row < 9; row++) {
                    if (row == posI)
                        continue;
                    if (value == that.array_data[row][posJ].value) {
                        that.alertMessage('Error : Elements cannot have similar values within same Column !!');
                        that.highlightCell(row, posJ);
                        that.highlightCell(posI, posJ);
                        return;
                    }
                }
                for (var col = 0; col < 9; col++) {
                    if (col == posJ)
                        continue;
                    if (value == that.array_data[posI][col].value) {
                        that.alertMessage('Error : Elements cannot have similar values within same Row !!');
                        that.highlightCell(posI, col);
                        that.highlightCell(posI, posJ);
                        return;
                    }
                }
                var blockI = 3 * Math.floor(posI / 3);
                var blockJ = 3 * Math.floor(posJ / 3);
                for (var ii = blockI; ii < blockI + 3; ii++) {
                    for (var jj = blockJ; jj < blockJ + 3; jj++) {
                        if (posI == ii && posJ == jj)
                            continue;
                        if (value == that.array_data[ii][jj].value) {
                            that.alertMessage('Error : Elements cannot have similar values within same Block !!');
                            that.highlightCell(ii, jj);
                            that.highlightCell(posI, posJ);
                            return;
                        }
                    }
                }
            }
            else {
                that.alertMessage('No value to check !!!');
                return;
            }
        }
        that.alertMessage('No Visible Mistakes :)');

    },
    saveGame: function (label) {
    },
    showCandidates: function () {
    }
}

/*********************************************************
*	utility functions
*********************************************************/
var utility = {
    supports_html5_storage: function () {
        try { return ('localStorage' in window && window['localStorage'] !== null); }
        catch (e) { return false; }
    },
    AddZero: function AddZero(num) {
        return (num >= 0 && num < 10) ? "0" + num : num + "";
    },
    isObjectEmpty: function (object) {
        var isEmpty = true;
        for (keys in object) {
            isEmpty = false;
            break; // exiting since we found that the object is not empty
        }
        return isEmpty;
    },
    drawCell: function (stage, layer, cellId, r, R, startAngle, endAngle, originalColor) {
        // var r = 20, R = 30;
        var cell = new Kinetic.Shape({
            drawFunc: function (canvas) {
                var context = canvas.getContext();
                var x = stage.getWidth() / 2;
                var y = stage.getHeight() / 2;
                var counterClockwise = false;
                context.beginPath();
                context.arc(x, y, R, startAngle, endAngle, false);
                context.arc(x, y, r, endAngle, startAngle, true);
                context.closePath();
                canvas.fillStroke(this);
            },
            fill: originalColor,
            text: '1',
            stroke: '#434343',
            id: cellId,
            strokeWidth: 0.5,
            originalColor: originalColor
            //opacity: 0.7
        });
        layer.add(cell);
        return cell;
    },
    drawText: function (stage, layer, cellId, x1, y1, value, isfixed) {
        var temp;
        if (value == 'A')
            temp = 10;
        else if (value == 'B')
            temp = 11;
        else if (value == 'C')
            temp = 12;
        else
            temp = parseInt(value);
        var textcell = new Kinetic.Text({
            x: stage.getWidth() / 2 + x1 - 5,
            y: stage.getHeight() / 2 + y1 - 8,
            realValue: temp,
            text: value == 0 ? '' : value,
            fontSize: 24,
            fontFamily: 'Calibri',
            fill: isfixed == true ? 'black' : 'blue',
            Id: cellId,
            visible: true,
            isfixed: isfixed
        });
        layer.add(textcell);
        return textcell;
    },
    drawCandidate: function (stage, layer, cellId, x1, y1, value, type) {
        if (type == 'candidate') {
            var candidatecell = new Kinetic.Text({
                x: stage.getWidth() / 2 + x1 - 3,
                y: stage.getHeight() / 2 + y1 - 6,
                text: value,
                fontSize: 12,
                fontFamily: 'Calibri',
                fontStyle: 'bold',
                fill: '#AEAA06',
                Id: cellId,
                visible: false
            });
            layer.add(candidatecell);
            return candidatecell;
        }
        else {
            var notecell = new Kinetic.Text({
                x: stage.getWidth() / 2 + x1 - 3,
                y: stage.getHeight() / 2 + y1 - 6,
                text: value,
                fontSize: 12,
                fontFamily: 'Calibri',
                fontStyle: 'bold',
                fill: '#0000FF',
                Id: cellId,
                visible: false
            });
            layer.add(notecell);
            return notecell;
        }
    },
    id2D: function (id1d) {
        var ob = new Object();
        ob.i = Math.floor(id1d / 12);
        ob.j = id1d % 12;
        return ob;
    },
    id1D: function (i, j) {
        return i * 12 + j;
    }
}