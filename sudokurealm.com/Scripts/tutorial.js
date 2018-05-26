/// <reference path="jquery-1.9.1-vsdoc.js" />
/// <reference path="modernizr-2.5.3.js" />

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
//        this.switchs.noteMode.on('switch-change', board.noteModeClick);
//        this.switchs.easyMode.on('switch-change', board.easyModeClick);
//        this.switchs.allNotes.on('switch-change', board.allCandidatesModeClick);
//        this.buttons.alertClose.bind("click", that.alertClose);
//        this.buttons.pause.bind("click", that.pauseGame);
//        this.buttons.restart.bind("click", that.showRestartModel);
//        this.buttons.confirmRestart.bind("click", that.confirmRestart);
//        this.buttons.highlightSimilar.bind("click", that.highlightSimilar);
//        this.buttons.clearCell.bind("click", that.clearCell);
//        this.buttons.hint.bind("click", that.hint);
//        this.buttons.checkSolution.bind("click", that.checkSolution);
//        this.buttons.checkCell.bind("click", that.checkCell);
//        this.buttons.undo.bind("click", that.undo);
//        this.buttons.save.bind("click", that.showSaveModel);
//        this.buttons.load.bind("click", that.showLoadModel);
//        this.buttons.confirmSave.bind("click", that.confirmSave);
//        this.buttons.highlightNum.bind("click", that.highlightnum);
//        this.modals.pause.bind("hidden", that.continueGame);
//        this.initSaveLoad();
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
            for (var i = 0; i < 9; i++) {
                for (var j = 0; j < 9; j++) {
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
    easymode: null,
    userToken: null,
    movesHistory: [],
    MaxSavesAllowed: 5,
    numberOfSaves: null,
    emptyCellsCount: null,

    init: function (string_data, token) {
        this.timer = new Timer();
        this.mainboard = $('#playtable');
        this.string_data = string_data;
        this.array_data = this.transformToArray(string_data);
        this.notemode = false;
        this.allcandidatesmode = false;
        this.easymode = false;
        this.userToken = (token != "" ? token : null);
        $('#loaderstatus').text(texts.loading_calculating);
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
    restart: function () {
        var that = this;
        var result = [], tempArray;
        var possibilities = [];
        var originalPossibilities = [];
        for (var i = 0; i < 9; i++) {
            tempArray = [];
            for (var j = 0; j < 9; j++) {
                tempArray.push({ value: that.string_data[j + i * 9], possibilities: that.array_data[i][j].originalPossibilities, originalPossibilities: that.array_data[i][j].originalPossibilities, isfixed: that.array_data[i][j].isfixed });
            }
            result.push(tempArray);
        }
        that.array_data = result;
        that.removeHighlight();
        that.selectBox.hide();
        $('#playtable').find('span.varcell').text('').removeClass('hide');
        $('#playtable').find('table.candidates').removeClass('shown');
        that.timer.restart();
        that.movesHistory = [];
        that.toggleUndoButton();
        that.writeHistoryConsole();
        that.writeConsole();
    },
    load: function (movesHistory, saveData) {
        var that = this;
        that.array_data = JSON.parse(saveData);
        that.movesHistory = JSON.parse(movesHistory);
        var $td, $span, $candidates, $cell, counter;
        for (var i = 0; i < 9; i++) {
            for (var j = 0; j < 9; j++) {
                if (that.array_data[i][j].isfixed == true)
                    continue;
                $td = that.findCell(i, j);
                $span = $td.children('span.varcell');
                $candidates = $td.children('table.candidates');
                if (that.array_data[i][j].value != '?') {
                    $span.removeClass('hide');
                    $span.text(that.array_data[i][j].value != 0 ? that.array_data[i][j].value : '');
                    $candidates.removeClass('shown');
                    $candidates.find('tbody > tr>td').each(function () {
                        $(this).text("")
                    });
                }
                else {
                    $span.addClass('hide');
                    $span.text('');
                    $candidates.addClass('shown');
                    counter = 0;
                    for (var ii = 1; ii < 4; ii++) {
                        for (var jj = 1; jj < 4; jj++) {
                            counter++;
                            $cell = $candidates.find('tbody > tr:nth-child(' + ii + ') > td:nth-child(' + jj + ')');
                            if (that.array_data[i][j].notes.indexOf(counter.toString()) != -1)
                                $cell.text(counter);
                            else
                                $cell.text("");
                        }
                    }
                }
            }
        }

        that.removeHighlight();
        that.selectBox.hide();
        if (that.allcandidatesmode) {
            $('.shallowcandidates').remove();
            that.toggleCandidatesTables();
        }
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
        for (var i = 0; i < 9; i++) {
            tempArray = [];
            for (var j = 0; j < 9; j++) {
                possibilities = [];
                originalPossibilities = [];
                tempArray.push({ value: str[j + i * 9], possibilities: possibilities, originalPossibilities: originalPossibilities, isfixed: false, notes: [] });
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
            $('#playtable>tbody>tr>td').has('span.varcell').each(function () {
                var table = that.makeShallowTable();
                var i = $(this).data('i');
                var j = $(this).data('j');
                var td = that.findCell(i, j);
                var arr = that.array_data[i][j];
                if (arr.value == '0' || arr.value == '?') {
                    var counter = 0;
                    for (var ii = 1; ii < 4; ii++) {
                        for (var jj = 1; jj < 4; jj++) {
                            counter++;
                            $cell = table.find('tbody > tr:nth-child(' + ii + ') > td:nth-child(' + jj + ')');
                            if (arr.possibilities.indexOf(counter) != -1)
                                $cell.text(counter);
                            else
                                $cell.text("");
                        }
                    }
                    $(this).prepend(table);
                }
            });
        }
        else
            $('.shallowcandidates').remove();
    },
    setInitialValues: function () {
        var $fixed_cell = $('<span>').attr('class', 'fixedcell');
        var $var_cell = $('<span>').attr('class', 'varcell').text('');
        var $td;
        for (var i = 0; i < 9; i++) {
            for (var j = 0; j < 9; j++) {
                if (this.array_data[i][j].value == '0') {
                    $var_cell = $('<span>').attr('class', 'varcell').text('');
                    $td = $('#playtable tr:eq(' + i + ') td:eq(' + j + ')');
                    $td.empty().append($var_cell);
                    $td.data("i", i);
                    $td.data("j", j);
                    $td.data("blockI", 3 * Math.floor(i / 3));
                    $td.data("blockJ", 3 * Math.floor(j / 3));
                    $td.attr('data-toggle', 'context');
                    $td.attr('data-target', '#context-menu');
                    this.array_data[i][j].isfixed = false;
                    for (var val = 1; val < 10; val++) {
                        if (!board.valueIsInRow(i, val) && !board.valueIsInColumn(j, val) && !board.valueIsInBlock(i, j, val)) {
                            this.array_data[i][j].possibilities.push(val);
                            this.array_data[i][j].originalPossibilities.push(val);
                        }
                    }
                }
                else {
                    $fixed_cell = $('<span>').attr('class', 'fixedcell');
                    $fixed_cell.text(this.array_data[i][j].value);
                    $('#playtable tr:eq(' + i + ') td:eq(' + j + ')').empty().append($fixed_cell);
                    this.array_data[i][j].isfixed = true;
                    this.array_data[i][j].possibilities.push("-");
                    this.array_data[i][j].originalPossibilities.push("-");
                }
            }
        }
        $('#playtable').children('tbody').children('tr').children('td').children('span.varcell').parent().append(board.makeTable());
        //$('#playtable').children('tbody').children('tr').children('td').children('span.varcell').parent().each(function () {
        //        $('#playtable>tbody>tr>td').each(function () {
        //            $(this).has('span.varcell');
        //            //alert($(this));
        //            var offset = $(this).position();
        //            var table = board.makeTable2();
        //            table.css({ top: offset.top, left: offset.left });
        //            $(this).append(table);
        //        });
    },
    recreatePossibilities: function () {
        var that = board;
        for (var i = 0; i < 9; i++) {
            for (var j = 0; j < 9; j++) {
                if (!that.array_data[i][j].isfixed) {
                    that.array_data[i][j].possibilities = [];
                    for (var val = 1; val < 10; val++) {
                        if (!that.valueIsInRow(i, val) && !that.valueIsInColumn(j, val) && !that.valueIsInBlock(i, j, val)) {
                            this.array_data[i][j].possibilities.push(val);
                        }
                    }
                }
            }
        }
        if (that.allcandidatesmode) {
            $('#playtable>tbody>tr>td').has('span.varcell').each(function () {
                var table = $(this).find('.shallowcandidates');
                var i = $(this).data('i');
                var j = $(this).data('j');
                var td = that.findCell(i, j);
                var arr = that.array_data[i][j];
                if (arr.value == 0 || arr.value == '?') {
                    var counter = 0, createnew = false;
                    if (table.length == 0) {
                        table = that.makeShallowTable();
                        createnew = true;
                    }
                    for (var ii = 1; ii < 4; ii++) {
                        for (var jj = 1; jj < 4; jj++) {
                            counter++;
                            $cell = table.find('tbody > tr:nth-child(' + ii + ') > td:nth-child(' + jj + ')');
                            if (arr.possibilities.indexOf(counter) != -1)
                                $cell.text(counter);
                            else
                                $cell.text("");
                        }
                    }
                    if (createnew)
                        $(this).prepend(table);
                }
                else {
                    table.remove();
                }
            });
        }
    },
    initiateHandlers: function () {
        var that = board;
        //$(that.mainboard).on('click', 'tr>td', that.cellClick);
        $('span.varcell').parent('td').on('click', that.cellClick);
        //$(that.mainboard).on('click', 'td.user', that.cellClick);
    },
    selectBox: (function () {
        var that;
        function init() {
            that = board;
            var table = $("<table>"), tr, row, td, cell;
            table.attr('cellpadding', 0).attr('cellspacing', 0);
            table.addClass("num_select");
            for (tr = 0; tr < 3; tr++) {
                row = $("<tr>").appendTo(table);
                for (td = 1; td < 4; td++) {
                    cell = $("<td>");
                    cell.text(tr * 3 + td);
                    cell.data("value", tr * 3 + td);
                    row.append(cell);
                    cell.on('click', picknum);
                }
            }
            //cell = $("<td>");
            //cell.text("X");
            //cell.attr("colspan", 3);
            ////cell.addClass("disabled");
            //cell.attr("title", "Clear Cell");
            //row = $("<tr>").appendTo(table);
            //row.append(cell);
            this.obj = table;
            IsShown = false;
        }
        function show(el) {
            //alert(that.notemode);
            togglePossibleValues(el);
            that.selectBox.obj.addClass("show");
            $(el).prepend(that.selectBox.obj);
            that.selectBox.isShown = true;
            setTimeout(function () {
                //that.selectBox.obj.toggleClass('show');
                $(document).on('click', clickOutside);
            }, 20);
        }
        function hide() {
            that.selectBox.obj.removeClass("show");
            that.selectBox.isShown = false;
            $(document).off('click', clickOutside);
        }
        function clickOutside(e) {
            var $target = $(e.target),
				clicked_on_num_select = $target.hasClass('num_select') || $target.parents('table').hasClass('num_select');
            if (clicked_on_num_select)
                return false;
            hide();
        }
        function togglePossibleValues(el) {
            var $table = that.selectBox.obj;
            if (!that.easymode) {
                $table.find('td').removeClass('disabled');
                return;
            }

            var rowIndex = $(el).data('i');
            var colIndex = $(el).data('j');
            var possibilities = that.array_data[rowIndex][colIndex].possibilities;
            //alert(possibilities.length);

            var value;
            var $cell;
            //$table.find('tbody > tr:nth-child(' + 1 + ') > td:nth-child(' + 3 + ')').addClass('disabled');
            for (var i = 1; i < 4; i++) {
                for (var j = 1; j < 4; j++) {
                    $cell = $table.find('tbody > tr:nth-child(' + i + ') > td:nth-child(' + j + ')');
                    value = $cell.data('value');
                    if ((possibilities.indexOf(value) == -1))
                        $cell.addClass('disabled');
                    else
                        $cell.removeClass('disabled');
                    if (that.array_data[rowIndex][colIndex].value == value)
                        $cell.removeClass('disabled');
                }
            }
        }
        function picknum(event) {
            var that = board;
            if ($(event.target).hasClass('disabled') || !that.selectBox.isShown)
                return;
            var that = board;
            var newValue = event.target.innerHTML;
            event.stopPropagation();
            var posI = $(event.target).parents('td.cellnormal').data('i');
            var posJ = $(event.target).parents('td.cellnormal').data('j');
            //alert($(event.target).parents('td.cellnormal').data('i'));
            board.changeCell(event, posI, posJ, newValue);
            that.recreatePossibilities();
            that.writeConsole();
            board.selectBox.hide();

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
    changeCell: function (event, posI, posJ, newValue) {
        //$('#playtable tr:eq(' + posI + ') td:eq(' + posJ + ') span.varcell').text(newValue);
        //var $target = $(event.target).parents('td.cellnormal').children('span.varcell');
        //    $target.text(newValue);
        var that = board;
        // var $target = $(event.target).parents('td.cellnormal');
        var $target = that.findCell(posI, posJ);
        var $span = $target.children('span.varcell');
        var $candidates = $target.children('table.candidates');
        var possibilities = that.array_data[posI][posJ].possibilities;
        var originalPossibilities = that.array_data[posI][posJ].originalPossibilities;
        //// note mode activated
        if (that.notemode == true) {
            that.changeNote(posI, posJ, newValue);
            //            //// varcell is shown !! maybe empty or has value
            //            if (!$span.hasClass('hide')) {
            //                //// varcell is empty ... first time entering a value
            //                if ($span.text() == "") {
            //                    that.addToHistory(posI, posJ, [""], [newValue]);
            //                    $span.text(newValue);
            //                    that.changeArrayData(posI, posJ, newValue);

            //                }
            //                /// varcell is not empty .. containing value .. 
            //                else {
            //                    var oldValue = $span.text();
            //                    /// user chooses number the same in varcell .. clear the cell
            //                    if (oldValue == newValue) {
            //                        $span.text("");
            //                        that.addToHistory(posI, posJ, [oldValue], [""]);
            //                        that.changeArrayData(posI, posJ, 0);
            //                    }
            //                    /// user chooses different number ... switch to candidates table 
            //                    else {
            //                        $span.text("");
            //                        that.changeArrayData(posI, posJ, '?');
            //                        that.addToHistory(posI, posJ, [oldValue], [oldValue, newValue]);
            //                        $span.addClass('hide');
            //                        var $cell;
            //                        var counter = 0;
            //                        for (var i = 1; i < 4; i++) {
            //                            for (var j = 1; j < 4; j++) {
            //                                counter++;
            //                                $cell = $candidates.find('tbody > tr:nth-child(' + i + ') > td:nth-child(' + j + ')');
            //                                if (counter == oldValue)
            //                                    $cell.text(oldValue);
            //                                else if (counter == newValue)
            //                                    $cell.text(newValue);
            //                                else
            //                                    $cell.text("");
            //                            }
            //                        }
            //                        $candidates.addClass('shown');
            //                    }
            //                }
            //            }
            //            /// candidates table is shown .. at lease 2 values entered by user 
            //            else {
            //                var row, col;
            //                /// get exact element td from candidates to see if it's filled or not
            //                if (newValue <= 3) {
            //                    row = 1;
            //                    col = newValue;
            //                } else
            //                    if (newValue <= 6) {
            //                        row = 2;
            //                        col = newValue - 3;
            //                    }
            //                    else {
            //                        row = 3;
            //                        col = newValue - 6;
            //                    }
            //                var $cell = $candidates.find('tbody > tr:nth-child(' + row + ') > td:nth-child(' + col + ')');
            //                /// if the td is not filled ... fill it with the new value ..
            //                var oldValues = [];
            //                $candidates.find('tbody > tr>td').each(function () {
            //                    if ($(this).text() != "")
            //                        oldValues.push($(this).text());
            //                });
            //                if ($cell.text() == "") {
            //                    $cell.text(newValue);
            //                    that.addToHistory(posI, posJ, oldValues, [oldValues, newValue]);
            //                }
            //                /// the td is filled with the same value before .. check if should switch to varcell or not ..
            //                else {
            //                    var countempty = $candidates.find('tbody>tr>td:empty').length;
            //                    /// length more than two .. clear the cell and maintain candidates table ..
            //                    if (countempty != 7) {
            //                        $cell.text("");
            //                        var newValues = []
            //                        for (var i = 0; i < oldValues.length; i++) {
            //                            if (oldValues[i] == newValue)
            //                                continue;
            //                            newValues.push(oldValues[i]);
            //                        }
            //                        that.addToHistory(posI, posJ, oldValues, newValues);
            //                    }
            //                    /// after clearing the cell .. one value will remain .. switch the element to varcell ..
            //                    else {
            //                        var otherValue;
            //                        for (var i = 1; i < 4; i++) {
            //                            for (var j = 1; j < 4; j++) {
            //                                $cell = $candidates.find('tbody > tr:nth-child(' + i + ') > td:nth-child(' + j + ')');
            //                                if ($cell.text() == newValue)
            //                                    $cell.text("");
            //                                else if ($cell.text() != "") {
            //                                    otherValue = $cell.text();
            //                                    $cell.text("");
            //                                }
            //                            }
            //                        }
            //                        that.addToHistory(posI, posJ, oldValues, otherValue);
            //                        that.changeArrayData(posI, posJ, otherValue);
            //                        $span.text(otherValue);
            //                        $candidates.removeClass('shown');
            //                        $span.removeClass('hide');
            //                    }
            //                }
            //            }
        }
        // note mode disabled
        else {
            that.changeVarCell(posI, posJ, newValue);
        }
    },
    changeVarCell: function (posI, posJ, newValue) {
        var that = board,
            $td = that.findCell(posI, posJ),
            $span = $td.children('span.varcell'),
            $candidates = $td.children('table.candidates');
        if ($candidates.hasClass('shown')) {
            $candidates.removeClass('shown');
            that.changeNotesArray(posI, posJ);
            if ($span.hasClass('hide'))
                $span.removeClass('hide');
            var oldValues = [];
            $candidates.find('tbody > tr>td').each(function () {
                if ($(this).text() != "") {
                    oldValues.push($(this).text());
                    $(this).text("");
                }
            });
            $span.text(newValue);
            that.changeArrayData(posI, posJ, newValue);
            that.addToHistory(posI, posJ, oldValues, [newValue], 'note');
        }
        else {
            if ($span.text() == newValue) {
                $span.text("");
                that.changeArrayData(posI, posJ, 0);
                that.addToHistory(posI, posJ, [newValue], [$span.text()], 'varcell');
            }
            else {
                that.changeArrayData(posI, posJ, newValue);
                that.addToHistory(posI, posJ, [$span.text()], [newValue], 'varcell');
                $span.text(newValue);
            }
        }

    },
    changeNote: function (posI, posJ, newValue) {
        var that = board,
            $td = that.findCell(posI, posJ),
            $span = $td.children('span.varcell'),
            $candidates = $td.children('table.candidates');
        //// varcell is shown !! 
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
        //alert(value);
        //that.toggleCandidatesTables();
        if (value == false)
            that.noteModeOff();
    },
    easyModeClick: function (e, data) {
        that = board;
        var $el = $(data.el), value = data.value;
        that.easymode = value;
        //alert(that.easymode);
        //that.toggleCandidatesTables();
    },
    allCandidatesModeClick: function (e, data) {
        that = board;
        var $el = $(data.el), value = data.value;
        that.allcandidatesmode = value;
        //alert(that.easymode);
        that.toggleCandidatesTables();
    },
    findCell: function (posI, posJ) {
        var that = board;
        posI = posI + 1;
        posJ = posJ + 1;
        var cell = board.mainboard.find('tbody > tr:nth-child(' + posI + ') > td.cellnormal:nth-child(' + posJ + ')');
        return cell;
    },
    highlightCell: function (posI, posJ) {
        var that = board;
        that.findCell(posI, posJ).addClass('cellhighlighted');
        //board.mainboard.find('tbody > tr:nth-child('+posI+') > td.cellnormal:nth-child('+posJ+')').addClass('cellhighlighted');
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
        for (var i = 0; i < 9; i++) {
            for (var j = 0; j < 9; j++) {
                that.findCell(i, j).removeClass('cellhighlighted');
            }
        }
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
        
    },
    writeHistoryConsole: function () {
        //        var $div = $('.historyconsole');
        //        var $br = $("<br/>");
        //        var $span = $("<span>");
        //        var $hr = $("<hr/>");
        //        var str = "";
        //        $div.empty();
        //        for (var i = 0; i < board.movesHistory.length; i++) {
        //            $span = $("<span>");
        //            $br = $("<br/>");
        //            str = "[" + board.movesHistory[i].posI + ',' + board.movesHistory[i].posJ + ']  =>  ' + 'old= ' + board.movesHistory[i].oldvalues + '    new= ' + board.movesHistory[i].newvalues + ' type=' + board.movesHistory[i].type;
        //            $span.text(str);
        //            $div.append($span);
        //            $div.append($br);
        //        }
        //        $div.append($hr);
    },
    changeArrayData: function (posI, posJ, value) {
        board.array_data[posI][posJ].value = value;
        board.writeConsole();
    },
    noteModeOff: function () {
        var that = board;
        //$('table.candidates.shown').each(function () {
        //	var posI = $(this).closest('td.cellnormal').data('i');
        //	var posJ = $(this).closest('td.cellnormal').data('j');
        //	var $candidates = $(this);
        //	var $parentTD = $(this).closest('td.cellnormal');
        //	var $span = $parentTD.find('span.varcell');
        //	var $cell;
        //	for (var i = 1; i < 4; i++) {
        //		for (var j = 1; j < 4; j++) {
        //			$cell = $candidates.find('tbody > tr:nth-child(' + i + ') > td:nth-child(' + j + ')');
        //			$cell.text("");
        //		}
        //	}
        //	$candidates.removeClass('shown');
        //	$span.removeClass('hide');
        //	that.changeArrayData(posI, posJ, 0);
        //});
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
    valueIsInRow: function (rowIndex, value) {
        var that = board;
        for (var j = 0; j < 9; j++) {
            if (that.array_data[rowIndex][j].value == value)
                return true;
        }
        return false;
    },
    valueIsInColumn: function (colIndex, value) {
        var that = board;
        for (var i = 0; i < 9; i++) {
            if (that.array_data[i][colIndex].value == value)
                return true;
        }
        return false;
    },
    valueIsInBlock: function (rowIndex, colIndex, value) {
        var that = board;
        var blockI = 3 * Math.floor(rowIndex / 3);
        var blockJ = 3 * Math.floor(colIndex / 3);
        for (var i = blockI; i < blockI + 3; i++) {
            for (var j = blockJ; j < blockJ + 3; j++) {
                if (that.array_data[i][j].value == value)
                    return true;
            }
        }
        return false;
    },
    toggleUndoButton: function () {
        var that = board;
        //alert(that.movesHistory.length);
//        if (that.movesHistory.length == 0)
//            options.buttons.set(options.buttons.undo, false);
//        else
//            options.buttons.set(options.buttons.undo, true);
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
            type = lastAction.type;
        var $cell = that.findCell(posI, posJ);
        var $varcell = $cell.find('span.varcell');
        var $candidates = $cell.find('table.candidates');
        if (type == 'varcell') {
            $varcell.text(oldvalues[0]);
            $varcell.removeClass('hide');
            $candidates.removeClass('shown');
            that.changeArrayData(posI, posJ, oldvalues[0] == "" ? 0 : oldvalues[0]);
        }
        else {
            $varcell.text("");
            $varcell.addClass('hide');
            var counter = 0;
            for (var i = 1; i < 4; i++) {
                for (var j = 1; j < 4; j++) {
                    counter++;
                    $cell = $candidates.find('tbody > tr:nth-child(' + i + ') > td:nth-child(' + j + ')');
                    if (oldvalues.indexOf(counter.toString()) != -1)
                        $cell.text(counter);
                    else
                        $cell.text("");
                }
            }
            $candidates.addClass('shown');
            that.changeArrayData(posI, posJ, "?");
        }
        that.changeNotesArray(posI, posJ);
        that.recreatePossibilities();
        that.writeHistoryConsole();
        that.writeConsole();
        that.toggleUndoButton();
        that.alertMessage(texts.undo + ': Step(' + parseInt(that.movesHistory.length + 1) + ')');
        //$('#notemodeSwitch').bootstrapSwitch('setState', true);
    },
    hint: function () {
        var that = board;
        var counter = 0;
        that.removeHighlight();
        for (var i = 0; i < 9; i++) {
            for (var j = 0; j < 9; j++) {
                if ((that.array_data[i][j].possibilities.length == 1) && (!that.array_data[i][j].isfixed) && (that.array_data[i][j].value == 0)) {
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
        if (!posI && !posJ) {
            for (var i = 0; i < 9; i++) {
                for (var j = 0; j < 9; j++) {
                    if (!that.array_data[i][j].isfixed && that.array_data[i][j].value != 0 && that.array_data[i][j].value != '?') {
                        value = that.array_data[i][j].value;
                        ////////check to see if the value is repeated in the same column
                        for (var row = 0; row < 9; row++) {
                            if (row == i)
                                continue;
                            if (value == that.array_data[row][j].value) {
                                that.alertMessage('Error : Elements cannot have similar values within same Column !!');
                                that.highlightCell(row, j);
                                that.highlightCell(i, j);
                                return;
                            }
                        }
                        for (var col = 0; col < 9; col++) {
                            if (col == j)
                                continue;
                            if (value == that.array_data[i][col].value) {
                                that.alertMessage('Error : Elements cannot have similar values within same Row !!');
                                that.highlightCell(i, col);
                                that.highlightCell(i, j);
                                return;
                            }
                        }
                        var blockI = 3 * Math.floor(i / 3);
                        var blockJ = 3 * Math.floor(j / 3);
                        for (var ii = blockI; ii < blockI + 3; ii++) {
                            for (var jj = blockJ; jj < blockJ + 3; jj++) {
                                if (i == ii && j == jj)
                                    continue;
                                if (value == that.array_data[ii][jj].value) {
                                    that.alertMessage('Error : Elements cannot have similar values within same Block !!');
                                    that.highlightCell(ii, jj);
                                    that.highlightCell(i, j);
                                    return;
                                }
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
    }
}