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
    undo: 'Undo Performed'
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
    selectedPosI: null,
    selectedPosJ: null,
    selectedBlockI: null,
    selectedBlockJ: null,
    easymode: null,
    movesHistory: [],

    init: function (string_data) {
        this.timer = new Timer();
        this.mainboard = $('#playtable');
        this.string_data = string_data;
        this.array_data = this.transformToArray(string_data);
        this.notemode = false;
        this.easymode = false;
        $('#loaderstatus').text(texts.loading_calculating);
        this.setInitialValues();
        this.initiateHandlers();
        this.selectBox.init();
        this.writeConsole();
        this.toggleUndoButton();
        this.timer.init($('#gametime'));
        this.timer.go();

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
    transformToArray: function (str) {
        var result = [], tempArray;
        var possibilities = [];
        var originalPossibilities = [];
        for (var i = 0; i < 9; i++) {
            tempArray = [];
            for (var j = 0; j < 9; j++) {
                possibilities = [];
                originalPossibilities = [];
                tempArray.push({ value: str[j + i * 9], possibilities: possibilities, originalPossibilities: originalPossibilities, isfixed: false });
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
    toggleCandidatesTables: function () {
        var that = board;
        if (board.notemode)
            $('#playtable').children('tbody').children('tr').children('td').children('span.varcell').parent().append(board.makeTable());
        else
            $('.candidates').remove();
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
    },
    initiateHandlers: function () {
        var that = board;
        //$(that.mainboard).on('click', 'tr>td', that.cellClick);
        $('span.varcell').parent('td').on('click', that.cellClick);
        $('#notemodeSwitch').on('switch-change', that.noteModeClick);
        $('#easymodeSwitch').on('switch-change', that.easyModeClick);
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
        //alert($(event.currentTarget).data('i'));
        //that.selectBox.show(event.currentTarget);
        //if(event.target.tagName=="TD")
        //    that.selectBox.show(event.currentTarget);
        //else
        //    that.selectBox.show(event.target.parentElement);
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
            //// varcell is shown !! maybe empty or has value
            if (!$span.hasClass('hide')) {
                //// varcell is empty ... first time entering a value
                if ($span.text() == "") {
                    that.addToHistory(posI, posJ, [""], [newValue]);
                    $span.text(newValue);
                    that.changeArrayData(posI, posJ, newValue);

                }
                /// varcell is not empty .. containing value .. 
                else {
                    var oldValue = $span.text();
                    /// user chooses number the same in varcell .. clear the cell
                    if (oldValue == newValue) {
                        $span.text("");
                        that.addToHistory(posI, posJ, [oldValue], [""]);
                        that.changeArrayData(posI, posJ, 0);
                    }
                    /// user chooses different number ... switch to candidates table 
                    else {
                        $span.text("");
                        that.changeArrayData(posI, posJ, '?');
                        that.addToHistory(posI, posJ, [oldValue], [oldValue, newValue]);
                        $span.addClass('hide');
                        var $cell;
                        var counter = 0;
                        for (var i = 1; i < 4; i++) {
                            for (var j = 1; j < 4; j++) {
                                counter++;
                                $cell = $candidates.find('tbody > tr:nth-child(' + i + ') > td:nth-child(' + j + ')');
                                if (counter == oldValue)
                                    $cell.text(oldValue);
                                else if (counter == newValue)
                                    $cell.text(newValue);
                                else
                                    $cell.text("");
                            }
                        }
                        $candidates.addClass('shown');
                    }
                }
            }
            /// candidates table is shown .. at lease 2 values entered by user 
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
                    that.addToHistory(posI, posJ, oldValues, [oldValues, newValue]);
                }
                /// the td is filled with the same value before .. check if should switch to varcell or not ..
                else {
                    var countempty = $candidates.find('tbody>tr>td:empty').length;
                    /// length more than two .. clear the cell and maintain candidates table ..
                    if (countempty != 7) {
                        $cell.text("");
                        var newValues = []
                        for (var i = 0; i < oldValues.length; i++) {
                            if (oldValues[i] == newValue)
                                continue;
                            newValues.push(oldValues[i]);
                        }
                        that.addToHistory(posI, posJ, oldValues, newValues);
                    }
                    /// after clearing the cell .. one value will remain .. switch the element to varcell ..
                    else {
                        var otherValue;
                        for (var i = 1; i < 4; i++) {
                            for (var j = 1; j < 4; j++) {
                                $cell = $candidates.find('tbody > tr:nth-child(' + i + ') > td:nth-child(' + j + ')');
                                if ($cell.text() == newValue)
                                    $cell.text("");
                                else if ($cell.text() != "") {
                                    otherValue = $cell.text();
                                    $cell.text("");
                                }
                            }
                        }
                        that.addToHistory(posI, posJ, oldValues, otherValue);
                        that.changeArrayData(posI, posJ, otherValue);
                        $span.text(otherValue);
                        $candidates.removeClass('shown');
                        $span.removeClass('hide');
                    }
                }
            }
        }
        // note mode disabled
        else {
            if ($candidates.hasClass('shown')) {
                $candidates.removeClass('shown');
                if ($span.hasClass('hide'))
                    $span.removeClass('hide');
                var oldValues = [];
                $candidates.find('tbody > tr>td').each(function () {
                    if ($(this).text() != "")
                        oldValues.push($(this).text());
                });
                $span.text(newValue);
                that.changeArrayData(posI, posJ, newValue);
                that.addToHistory(posI, posJ, oldValues, [newValue]);
            }
            else {
                if ($span.text() == newValue) {
                    $span.text("");
                    that.changeArrayData(posI, posJ, 0);
                    that.addToHistory(posI, posJ, [newValue], [$span.text()]);
                    //that.addToHistory(posI, posJ, "ClearFromVarcell", newValue);
                }
                else {
                    that.changeArrayData(posI, posJ, newValue);
                    that.addToHistory(posI, posJ, [$span.text()], [newValue]);
                    $span.text(newValue);
                    //that.changePossibilities(posI, posJ, newValue, "remove");
                    //that.addToHistory(posI, posJ, "AddToVarcell", newValue);
                }
            }
        }
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
        //$('.alert-message').delay(10000).addClass('blink');
        setTimeout(function () {
            $('.alert-message').addClass('blink');
        }, 500);
        setTimeout(function () {
            $('.alert-message').removeClass('blink');
        }, 1000);
        //$('.alert-message').delay(1500).removeClass('blink');
        //$('.alert-message').fadeIn(200);
        //$('.alert-message').show();
        //$('.alert-message').delay(3000).fadeOut('fast');
    },
    writeConsole: function () {
        var $div = $('.console');
        var $br = $("<br/>");
        var $span = $("<span>");
        var $hr = $("<hr/>");
        var str = "";
        $div.empty();
        for (var i = 0; i < 9; i++) {
            $span = $("<span>");
            $br = $("<br/>");
            str = "";
            for (var j = 0; j < 9; j++) {
                str = str + board.array_data[i][j].value + " ";
            }
            $span.text(str);
            $div.append($span);
            $div.append($br);
        }
        $div.append($hr);
        str = "";
        for (var i = 0; i < 9; i++) {
            for (var j = 0; j < 9; j++) {
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
            str = "[" + board.movesHistory[i].posI + ',' + board.movesHistory[i].posJ + ']  =>  ' + 'old= ' + board.movesHistory[i].oldvalues + '    new= ' + board.movesHistory[i].newvalues;
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
    clearCell: function () {
        var that = board;
        var $td = that.findCell(that.selectedPosI, that.selectedPosJ);
        var $span = $td.children('span.varcell');
        var $candidates = $td.children('table.candidates');
        /////////////// varcell is visible .. clear the cell and change arraydata to 0/////////////
        if ($span.is(':visible')) {
            if ($span.text() == "") {
                that.alertMessage('Cell is empty .. Nothing to clear');
            }
            else {
                that.changeArrayData(that.selectedPosI, that.selectedPosJ, 0);
                that.addToHistory(that.selectedPosI, that.selectedPosJ, [$span.text()], [""]);
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
            that.addToHistory(that.selectedPosI, that.selectedPosJ, oldValues, [""]);
            that.changeArrayData(that.selectedPosI, that.selectedPosJ, 0);
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
        if (that.movesHistory.length == 0)
            $('#undo').addClass('disabled');
        else
            $('#undo').removeClass('disabled');
    },
    addToHistory: function (posI, posJ, oldvalues, newvalues) {
        var that = board;
        that.movesHistory.push({ posI: posI, posJ: posJ, oldvalues: oldvalues, newvalues: newvalues });
        that.toggleUndoButton();
        that.writeHistoryConsole();
    },
    undo: function (event) {
        var that = board;
        if ($(this).hasClass('disabled')) {
            event.preventDefault();
            return;
        }
        var lastAction = that.movesHistory.pop(),
            posI = lastAction.posI,
            posJ = lastAction.posJ,
            oldvalues = lastAction.oldvalues,
            newvalues = lastAction.newvalues;
        var $cell = that.findCell(posI, posJ);
        var $varcell = $cell.find('span.varcell');
        var $candidates = $cell.find('table.candidates');
        if (oldvalues.length == 1) {
            $varcell.text(oldvalues[0]);
            $varcell.removeClass('hide');
            $candidates.removeClass('shown');
            that.changeArrayData(posI, posJ, oldvalues[0] == "" ? 0 : oldvalues[0]);
        } else {
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
        that.recreatePossibilities();
        that.writeHistoryConsole();
        that.writeConsole();
        that.toggleUndoButton();
        that.alertMessage(texts.undo + ': Step(' + parseInt(that.movesHistory.length + 1) + ')');
        //$('#notemodeSwitch').bootstrapSwitch('setState', true);
        event.preventDefault();
    }

}