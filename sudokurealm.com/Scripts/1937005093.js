﻿var Timer=function(){};Timer.prototype={second:0,minute:0,hour:0,paused:false,refresh:null,init:function(a){return this.el=a,this},"set":function(a){return a=a.split(":"),this.hour=a[0],this.minute=a[1],this.second=a[2],this},go:function(c){function b(){a.second++,60==a.second&&(a.second=0,a.minute++),a.second<10&&(a.second="0"+a.second),60==a.minute&&(a.minute=0,a.hour++);var b=a.hour>0?(a.hour>9?a.hour:"0"+a.hour)+":":"";a.el.html(b+(a.minute>9?a.minute:"0"+a.minute)+":"+a.second)}var a=this;return this.paused=false,c&&b(),window.clearInterval(this.refresh),a.refresh=window.setInterval(b,1e3),this},stop:function(){return this.paused=true,window.clearInterval(this.refresh),this},restart:function(){this.second=this.minute=this.hour=0,this.el.text("00:00"),this.stop().go()},clickEvent:function(){function c(){a&&(a=false,b.paused===false?(b.stop(),window.clearInterval(b.focus),a=true):(b.go(),a=true))}var b=this,a=true;this.el.bind("click",c)}};var texts={share:"Copy the link below to share the currently displayed board",exp:"This string represnt the board, with '0' as empty cell",imp:"Enter a string of 81 characters (blanks can be 0, or anything but a number)",import_invalid:"Your submission is invalid, please check again",board_invalid:"Invalid board: no single solution found",saveGame:"Game saved",loadGame:"Game loaded",newGame:"New game loaded",win:"You won! very impressive",loose:"Solution is not valid, please verify",pause:"Game paused",clear_cell:"Clear cell",loading_calculating:"Calculating .. Please Wait ..",undo:"Undo Performed",restart_successful:"Game Restarted Successfully ..."},options={buttons:{alertClose:$(".alert-message .close"),pause:$("#pauseButton"),restart:$("#restartButton"),confirmRestart:$("#confirmrestartButton"),highlightSimilar:$("#context-highlight"),clearCell:$("#context-clearcell"),hint:$("#hintButton"),checkSolution:$("#checkSolutionButton"),checkCell:$("#context-checkcell"),undo:$("#undoButton"),highlightNum:$(".highlightnum"),save:$("#saveButton"),load:$("#loadButton"),confirmSave:$("#confirmsaveButton"),"set":function(b,a){a=a?false:true,b.prop("disabled",a)}},switchs:{allNotes:$("#allnotesSwitch"),noteMode:$("#notemodeSwitch"),easyMode:$("#easymodeSwitch"),"set":function(a,b){a.bootstrapSwitch("setState",b)}},modals:{pause:$("#pauseModal"),restart:$("#restartModal"),save:$("#saveModal"),load:$("#loadModal"),show:function(a){a.modal("show")},hide:function(a){a.modal("hide")}},spans:{remainingSaves:$("#remainingSaveSpan"),gameId:$("#IdLiteral")},bind_options:function(){var a=this;this.switchs.set(this.switchs.easyMode,false),this.switchs.set(this.switchs.noteMode,false),this.switchs.set(this.switchs.allNotes,false),this.switchs.noteMode.on("switch-change",board.noteModeClick),this.switchs.easyMode.on("switch-change",board.easyModeClick),this.switchs.allNotes.on("switch-change",board.allCandidatesModeClick),this.buttons.alertClose.bind("click",a.alertClose),this.buttons.pause.bind("click",a.pauseGame),this.buttons.restart.bind("click",a.showRestartModel),this.buttons.confirmRestart.bind("click",a.confirmRestart),this.buttons.highlightSimilar.bind("click",a.highlightSimilar),this.buttons.clearCell.bind("click",a.clearCell),this.buttons.hint.bind("click",a.hint),this.buttons.checkSolution.bind("click",a.checkSolution),this.buttons.checkCell.bind("click",a.checkCell),this.buttons.undo.bind("click",a.undo),this.buttons.save.bind("click",a.showSaveModel),this.buttons.load.bind("click",a.showLoadModel),this.buttons.confirmSave.bind("click",a.confirmSave),this.buttons.highlightNum.bind("click",a.highlightnum),this.modals.pause.bind("hidden",a.continueGame),this.initSaveLoad()},initSaveLoad:function(){var a=board;null==a.userToken?(a.numberOfSaves=0,options.spans.remainingSaves.text(a.numberOfSaves),options.buttons.set(options.buttons.save,false),options.buttons.set(options.buttons.load,false)):$.ajax({type:"POST",url:"/Account/SudokuService.asmx/GetSaves",data:JSON.stringify({token:a.userToken,gameid:options.spans.gameId.text()}),contentType:"application/json; charset=utf-8",dataType:"json",success:function(b){a.numberOfSaves=a.MaxSavesAllowed-b.d.length,options.spans.remainingSaves.text(a.numberOfSaves),options.createSaveTable(b.d),options.toggleLoadButton(),options.toggleSaveButton()},error:function(b,a){alert(a)}}),$("#saveGameTable").on("click",".deletesave",function(d){var a=board,c=$(this),e=$("#loadGameTable > tbody");$("#saveloadingimg").css("display","inline");var b=$(this).parents("tr").children("td:eq(0)").text(),f=$(this).parents("tr").index();$.ajax({type:"POST",url:"/Account/SudokuService.asmx/DeleteSaveGame",data:JSON.stringify({token:a.userToken,gameId:options.spans.gameId.text(),saveId:b}),contentType:"application/json; charset=utf-8",dataType:"json",success:function(){$("#saveloadingimg").css("display","none"),c.parents("tr").remove(),e.find("tr:eq("+f+")").remove(),a.numberOfSaves++,options.spans.remainingSaves.text(a.numberOfSaves),options.toggleSaveButton(),options.toggleLoadButton(),options.modals.hide(options.modals.save),a.alertMessage("Save Id: "+b+" deleted successfully")},error:function(c,b){$("#saveloadingimg").css("display","none"),options.modals.hide(options.modals.save),a.alertMessage("Error: "+b)}}),d.stopPropagation()}),$("#saveGameId").keypress(function(a){var b=a.keyCode?a.keyCode:a.which;if("13"==b)return options.buttons.confirmSave.click(),false})},createSaveTable:function(b){for(var i,e,g,f,h,d,c,j,l=$("#saveGameTable > tbody"),k=$("#loadGameTable > tbody"),a=0;a<b.length;a++)d=$("<tr>"),c=$("<tr>"),c.css("cursor","pointer"),i=$("<td>"),f=$("<td>"),i.text(b[a].SaveId),f.text(b[a].SaveId),d.append(i),c.append(f),e=$("<td>"),h=$("<td>"),e.text(b[a].SaveTimeStamp),h.text(b[a].SaveTimeStamp),d.append(e),c.append(h),g=$("<td>"),j=$('<button class="btn btn-mini deletesave" type="button">X</button>'),g.append(j),d.append(g),c.data("MovesHistory",b[a].MovesHistory),c.data("SaveData",b[a].SaveData),l.append(d),k.append(c)},allNotesSwitchToggle:function(c,a){var b=($(a.el),a.value);alert(b)},pauseGame:function(){var a=board;options.modals.show(options.modals.pause),a.timer.stop(),a.mainboard.fadeOut("500")},continueGame:function(){var a=board;a.mainboard.fadeIn("500"),a.timer.go()},showRestartModel:function(){options.modals.show(options.modals.restart)},confirmRestart:function(){var a=board;a.restart(),options.modals.hide(options.modals.restart),a.alertMessage(texts.restart_successful)},highlightSimilar:function(b){var a=board;a.highlightSimilarCells(a.selectedPosI,a.selectedPosJ),b.preventDefault()},clearCell:function(b){var a=board;a.clearCell(a.selectedPosI,a.selectedPosJ),b.preventDefault()},hint:function(){var a=board;a.hint()},checkSolution:function(){var a=board;a.checkSolution()},checkCell:function(b){var a=board;a.checkSolution(a.selectedPosI,a.selectedPosJ),b.preventDefault()},alertClose:function(){$(this).parent().fadeOut(200,function(){$(this).hide()})},undo:function(){var a=board;a.undo()},showSaveModel:function(){options.modals.show(options.modals.save),options.toggleSaveButton()},showLoadModel:function(){options.bindLoadClicks(),options.modals.show(options.modals.load)},toggleSaveButton:function(){var a=board;0==a.numberOfSaves?options.buttons.set(options.buttons.confirmSave,false):options.buttons.set(options.buttons.confirmSave,true)},toggleLoadButton:function(){var a=board;5==a.numberOfSaves?options.buttons.set(options.buttons.load,false):options.buttons.set(options.buttons.load,true)},confirmSave:function(){var c=board,d=$("<tr>"),a=$("<tr>"),b=new Date,f=[[utility.AddZero(b.getDate()),utility.AddZero(b.getMonth()+1),b.getFullYear()].join("/"),[utility.AddZero(b.getHours()),utility.AddZero(b.getMinutes())].join(":"),b.getHours()<12?"AM":"PM"].join(" "),k=$("<td>"),j=$("<td>"),i=$("<td>"),h=$("<td>"),g=$("<td>"),m=$("#saveGameTable > tbody"),o=$("#loadGameTable > tbody"),l=$("#saveGameId").val(),e=""!=(""+l).trim()?l:"auto_"+Math.floor(1e4*Math.random()+1),n=$('<button class="btn btn-mini deletesave" type="button">X</button>');$("#saveloadingimg").css("display","inline"),$.ajax({type:"POST",url:"/Account/SudokuService.asmx/SaveGame",data:JSON.stringify({token:board.userToken,gameId:$("#IdLiteral").text(),saveId:e,saveTimeStamp:f,saveData:JSON.stringify(board.array_data),movesHistory:JSON.stringify(board.movesHistory)}),contentType:"application/json; charset=utf-8",dataType:"json",success:function(){m.append(d),o.append(a),a.css("cursor","pointer"),k.text(e),d.append(k),h.text(e),a.append(h),a.data("MovesHistory",JSON.stringify(board.movesHistory)),a.data("SaveData",JSON.stringify(board.array_data)),j.text(f),d.append(j),g.text(f),a.append(g),i.append(n),d.append(i),$("#saveGameId").val(""),c.alertMessage("Game Saved Successfully with the name : "+e),c.numberOfSaves--,options.spans.remainingSaves.text(c.numberOfSaves),options.toggleSaveButton(),options.toggleLoadButton(),options.modals.hide(options.modals.save),$("#saveloadingimg").css("display","none")},error:function(b,a){c.alertMessage("Error:"+a),options.modals.hide(options.modals.save),$("#saveloadingimg").css("display","none")}})},bindLoadClicks:function(){var a=board;$("#loadGameTable > tbody >tr").each(function(){$(this).off(),$(this).on("click",function(){var b=$(this).find("td:eq(0)"),c=b.text(),e=b.parents("tr").data("SaveData"),d=b.parents("tr").data("MovesHistory");a.load(d,e),options.modals.hide(options.modals.load),a.alertMessage("Save Id : ("+c+") has been successfully loaded")})})},highlightnum:function(){var b=board,d=$(this).text();if("X"!=d){b.removeHighlight();for(var a=0;9>a;a++)for(var c=0;9>c;c++)b.array_data[a][c].value==d&&b.highlightCell(a,c)}else b.removeHighlight()}},board={string_data:null,array_data:[],mainboard:null,notemode:null,allcandidatesmode:null,selectedPosI:null,selectedPosJ:null,selectedBlockI:null,selectedBlockJ:null,easymode:null,userToken:null,movesHistory:[],MaxSavesAllowed:5,numberOfSaves:null,emptyCellsCount:null,init:function(a,b){this.timer=new Timer,this.mainboard=$("#playtable"),this.string_data=a,this.array_data=this.transformToArray(a),this.notemode=false,this.allcandidatesmode=false,this.easymode=false,this.userToken=""!=b?b:null,$("#loaderstatus").text(texts.loading_calculating),this.setInitialValues(),this.initiateHandlers(),this.selectBox.init(),this.writeConsole(),this.toggleUndoButton(),this.toggleCandidatesTables(),this.timer.init($("#gametime")),this.timer.go(),options.bind_options()},restart:function(){for(var d,a=this,e=[],c=0;9>c;c++){d=[];for(var b=0;9>b;b++)d.push({value:a.string_data[b+9*c],possibilities:a.array_data[c][b].originalPossibilities,originalPossibilities:a.array_data[c][b].originalPossibilities,isfixed:a.array_data[c][b].isfixed});e.push(d)}a.array_data=e,a.removeHighlight(),a.selectBox.hide(),$("#playtable").find("span.varcell").text("").removeClass("hide"),$("#playtable").find("table.candidates").removeClass("shown"),a.timer.restart(),a.movesHistory=[],a.toggleUndoButton(),a.writeHistoryConsole(),a.writeConsole()},load:function(k,l){var a=this;a.array_data=JSON.parse(l),a.movesHistory=JSON.parse(k);for(var i,d,e,j,f,c=0;9>c;c++)for(var b=0;9>b;b++)if(1!=a.array_data[c][b].isfixed)if(i=a.findCell(c,b),d=i.children("span.varcell"),e=i.children("table.candidates"),"?"!=a.array_data[c][b].value)d.removeClass("hide"),d.text(0!=a.array_data[c][b].value?a.array_data[c][b].value:""),e.removeClass("shown"),e.find("tbody > tr>td").each(function(){$(this).text("")});else{d.addClass("hide"),d.text(""),e.addClass("shown"),f=0;for(var g=1;4>g;g++)for(var h=1;4>h;h++)f++,j=e.find("tbody > tr:nth-child("+g+") > td:nth-child("+h+")"),a.array_data[c][b].notes.indexOf(""+f)!=-1?j.text(f):j.text("")}a.removeHighlight(),a.selectBox.hide(),a.allcandidatesmode&&($(".shallowcandidates").remove(),a.toggleCandidatesTables()),a.toggleUndoButton(),a.writeHistoryConsole(),a.writeConsole()},countEmptyCells:function(){for(var d=board,c=0,a=0;9>a;a++)for(var b=0;9>b;b++)"0"==d.array_data[a][b].value&&c++;return c},transformToArray:function(g){for(var c,d=[],f=[],e=[],b=0;9>b;b++){c=[];for(var a=0;9>a;a++)f=[],e=[],c.push({value:g[a+9*b],possibilities:f,originalPossibilities:e,isfixed:false,notes:[]});d.push(c)}return d},makeTable:function(){var c,e,b,d,a=$("<table>");for(a.attr("cellpadding",0).attr("cellspacing",0),a.addClass("candidates"),c=0;3>c;c++)for(e=$("<tr>").appendTo(a),b=1;4>b;b++)d=$("<td>"),e.append(d);return a},makeShallowTable:function(){var b,e,a,d,c=$("<table>");for(c.attr("cellpadding",0).attr("cellspacing",0),c.addClass("shallowcandidates"),b=0;3>b;b++)for(e=$("<tr>").appendTo(c),a=1;4>a;a++)d=$("<td>"),d.text(3*b+a),e.append(d);return c},toggleCandidatesTables:function(){var a=board;a.allcandidatesmode?$("#playtable>tbody>tr>td").has("span.varcell").each(function(){var h=a.makeShallowTable(),f=$(this).data("i"),g=$(this).data("j");a.findCell(f,g);var b=a.array_data[f][g];if("0"==b.value||"?"==b.value){for(var e=0,d=1;4>d;d++)for(var c=1;4>c;c++)e++,$cell=h.find("tbody > tr:nth-child("+d+") > td:nth-child("+c+")"),b.possibilities.indexOf(e)!=-1?$cell.text(e):$cell.text("");$(this).prepend(h)}}):$(".shallowcandidates").remove()},setInitialValues:function(){for(var c,e=$("<span>").attr("class","fixedcell"),f=$("<span>").attr("class","varcell").text(""),b=0;9>b;b++)for(var a=0;9>a;a++)if("0"==this.array_data[b][a].value){f=$("<span>").attr("class","varcell").text(""),c=$("#playtable tr:eq("+b+") td:eq("+a+")"),c.empty().append(f),c.data("i",b),c.data("j",a),c.data("blockI",3*Math.floor(b/3)),c.data("blockJ",3*Math.floor(a/3)),c.attr("data-toggle","context"),c.attr("data-target","#context-menu"),this.array_data[b][a].isfixed=false;for(var d=1;10>d;d++)board.valueIsInRow(b,d)||board.valueIsInColumn(a,d)||board.valueIsInBlock(b,a,d)||(this.array_data[b][a].possibilities.push(d),this.array_data[b][a].originalPossibilities.push(d))}else e=$("<span>").attr("class","fixedcell"),e.text(this.array_data[b][a].value),$("#playtable tr:eq("+b+") td:eq("+a+")").empty().append(e),this.array_data[b][a].isfixed=true,this.array_data[b][a].possibilities.push("-"),this.array_data[b][a].originalPossibilities.push("-");$("#playtable").children("tbody").children("tr").children("td").children("span.varcell").parent().append(board.makeTable())},recreatePossibilities:function(){for(var a=board,c=0;9>c;c++)for(var b=0;9>b;b++)if(!a.array_data[c][b].isfixed){a.array_data[c][b].possibilities=[];for(var d=1;10>d;d++)a.valueIsInRow(c,d)||a.valueIsInColumn(b,d)||a.valueIsInBlock(c,b,d)||this.array_data[c][b].possibilities.push(d)}a.allcandidatesmode&&$("#playtable>tbody>tr>td").has("span.varcell").each(function(){var b=$(this).find(".shallowcandidates"),g=$(this).data("i"),h=$(this).data("j");a.findCell(g,h);var c=a.array_data[g][h];if(0==c.value||"?"==c.value){var f=0,i=false;0==b.length&&(b=a.makeShallowTable(),i=true);for(var e=1;4>e;e++)for(var d=1;4>d;d++)f++,$cell=b.find("tbody > tr:nth-child("+e+") > td:nth-child("+d+")"),c.possibilities.indexOf(f)!=-1?$cell.text(f):$cell.text("");i&&$(this).prepend(b)}else b.remove()})},initiateHandlers:function(){var a=board;$("span.varcell").parent("td").on("click",a.cellClick)},selectBox:function(){function e(){a=board;var d,h,b,e,f=$("<table>");for(f.attr("cellpadding",0).attr("cellspacing",0),f.addClass("num_select"),d=0;3>d;d++)for(h=$("<tr>").appendTo(f),b=1;4>b;b++)e=$("<td>"),e.text(3*d+b),e.data("value",3*d+b),h.append(e),e.on("click",g);this.obj=f,c=false}function h(b){f(b),a.selectBox.obj.addClass("show"),$(b).prepend(a.selectBox.obj),a.selectBox.isShown=true,setTimeout(function(){$(document).on("click",d)},20)}function b(){a.selectBox.obj.removeClass("show"),a.selectBox.isShown=false,$(document).off("click",d)}function d(c){var a=$(c.target),d=a.hasClass("num_select")||a.parents("table").hasClass("num_select");return d?false:(b(),void 0)}function f(f){var i=a.selectBox.obj;if(!a.easymode)return i.find("td").removeClass("disabled"),void 0;for(var c,b,g=$(f).data("i"),h=$(f).data("j"),j=a.array_data[g][h].possibilities,e=1;4>e;e++)for(var d=1;4>d;d++)b=i.find("tbody > tr:nth-child("+e+") > td:nth-child("+d+")"),c=b.data("value"),j.indexOf(c)==-1?b.addClass("disabled"):b.removeClass("disabled"),a.array_data[g][h].value==c&&b.removeClass("disabled")}function g(a){var b=board;if(!$(a.target).hasClass("disabled")&&b.selectBox.isShown){var b=board,c=a.target.innerHTML;a.stopPropagation();var e=$(a.target).parents("td.cellnormal").data("i"),d=$(a.target).parents("td.cellnormal").data("j");board.changeCell(a,e,d,c),b.recreatePossibilities(),b.writeConsole(),board.selectBox.hide()}}var a,c;return{init:e,show:h,hide:b,isShown:c}}(),cellClick:function(b){var a=board;a.selectBox.isShown&&a.selectBox.hide(),"A"!=b.target.tagName&&(a.removeHighlight(),a.selectBox.show(b.currentTarget))},changeCell:function(f,c,b,d){var a=board,e=a.findCell(c,b);e.children("span.varcell"),e.children("table.candidates"),a.array_data[c][b].possibilities,a.array_data[c][b].originalPossibilities,1==a.notemode?a.changeNote(c,b,d):a.changeVarCell(c,b,d)},changeVarCell:function(b,e,a){var c=board,g=c.findCell(b,e),d=g.children("span.varcell"),f=g.children("table.candidates");if(f.hasClass("shown")){f.removeClass("shown"),c.changeNotesArray(b,e),d.hasClass("hide")&&d.removeClass("hide");var h=[];f.find("tbody > tr>td").each(function(){""!=$(this).text()&&(h.push($(this).text()),$(this).text(""))}),d.text(a),c.changeArrayData(b,e,a),c.addToHistory(b,e,h,[a],"note")}else d.text()==a?(d.text(""),c.changeArrayData(b,e,0),c.addToHistory(b,e,[a],[d.text()],"varcell")):(c.changeArrayData(b,e,a),c.addToHistory(b,e,[d.text()],[a],"varcell"),d.text(a))},changeNote:function(a,c,d){var b=board,n=b.findCell(a,c),k=n.children("span.varcell"),j=n.children("table.candidates");if(k.hasClass("hide")){var i,h;d>3?d>6?(i=3,h=d-6):(i=2,h=d-3):(i=1,h=d);var g=j.find("tbody > tr:nth-child("+i+") > td:nth-child("+h+")"),e=[];if(j.find("tbody > tr>td").each(function(){""!=$(this).text()&&e.push($(this).text())}),""==g.text())g.text(d),b.addToHistory(a,c,e,[e,d],"note"),b.changeArrayData(a,c,"?"),b.changeNotesArray(a,c);else{g.text("");for(var m=[],f=0;f<e.length;f++)e[f]!=d&&m.push(e[f]);b.addToHistory(a,c,e,m,"note"),0==m.length?(b.changeArrayData(a,c,0),b.changeNotesArray(a,c)):(b.changeArrayData(a,c,"?"),b.changeNotesArray(a,c))}}else{k.addClass("hide"),b.addToHistory(a,c,[k.text()],[d],"varcell"),b.changeArrayData(a,c,"?");for(var g,o=0,f=1;4>f;f++)for(var l=1;4>l;l++)o++,g=j.find("tbody > tr:nth-child("+f+") > td:nth-child("+l+")"),o==d?g.text(d):g.text("");j.addClass("shown"),k.text(""),b.changeNotesArray(a,c)}},changeNotesArray:function(b,f){var a=board,h=a.findCell(b,f),c=[],g=h.children("table.candidates"),i=0;if(!g.hasClass("shown"))return a.array_data[b][f].notes=c,a.writeConsole(),void 0;for(var e=1;4>e;e++)for(var d=1;4>d;d++)i++,$cell=g.find("tbody > tr:nth-child("+e+") > td:nth-child("+d+")"),""!=$cell.text()&&c.push($cell.text());a.array_data[b][f].notes=c,a.writeConsole()},changePossibilities:function(f,d,h,i){var a=board,c=a.array_data[f][d].possibilities,g=a.array_data[f][d].originalPossibilities,e=parseInt(h);switch(i){case"remove":for(var b=0;9>b;b++)g=a.array_data[b][d].originalPossibilities,c=a.array_data[b][d].possibilities,g.indexOf(e)!=-1&&c.indexOf(e)!=-1&&c.splice(c.indexOf(e),1)}a.writeConsole()},noteModeClick:function(c,b){that=board;var a=($(b.el),b.value);that.notemode=a,0==a&&that.noteModeOff()},easyModeClick:function(c,a){that=board;var b=($(a.el),a.value);that.easymode=b},allCandidatesModeClick:function(c,a){that=board;var b=($(a.el),a.value);that.allcandidatesmode=b,that.toggleCandidatesTables()},findCell:function(a,b){a+=1,b+=1;var c=board.mainboard.find("tbody > tr:nth-child("+a+") > td.cellnormal:nth-child("+b+")");return c},highlightCell:function(b,c){var a=board;a.findCell(b,c).addClass("cellhighlighted")},highlightSimilarCells:function(e,f){var a=board;a.removeHighlight();var d=a.findCell(e,f).find("span.varcell").text();if(""==d)return a.alertMessage("Nothing to highlight"),void 0;for(var b=0;9>b;b++)for(var c=0;9>c;c++)a.findCell(b,c).find("span").text()==d&&a.findCell(b,c).addClass("cellhighlighted")},highlightBlock:function(){for(var c=board,b=board.selectedBlockI;b<board.selectedBlockI+3;b++)for(var a=board.selectedBlockJ;a<board.selectedBlockJ+3;a++)c.highlightCell(b,a)},removeHighlight:function(){for(var c=board,b=0;9>b;b++)for(var a=0;9>a;a++)c.findCell(b,a).removeClass("cellhighlighted")},getValue:function(c,d){var b=board,a=b.findCell(c,d).find(".varcell:visible").first().text();return""!=a?a:0},alertMessage:function(a){$(".alert-message").find("span").text(a),$(".alert-message").show(),setTimeout(function(){$(".alert-message").addClass("blink")},500),setTimeout(function(){$(".alert-message").removeClass("blink")},1e3)},writeConsole:function(){var e=$(".console"),f=$("<br/>"),d=$("<span>"),g=$("<hr/>"),c="";e.empty();for(var b=0;9>b;b++){d=$("<span>"),f=$("<br/>"),c="";for(var a=0;9>a;a++)c=c+board.array_data[b][a].value+" "+board.array_data[b][a].notes;d.text(c),e.append(d),e.append(f)}e.append(g),c="";for(var b=0;9>b;b++)for(var a=0;9>a;a++)d=$("<span>"),f=$("<br/>"),c=board.array_data[b][a].possibilities+" => "+board.array_data[b][a].originalPossibilities,d.text(c),e.append(d),e.append(f)},writeHistoryConsole:function(){},changeArrayData:function(b,c,a){board.array_data[b][c].value=a,board.writeConsole()},noteModeOff:function(){},clearCell:function(i,j){var a=board,g=a.findCell(i,j),b=g.children("span.varcell"),h=g.children("table.candidates");if(b.is(":visible"))return""==b.text()?a.alertMessage("Cell is empty .. Nothing to clear"):(a.changeArrayData(a.selectedPosI,a.selectedPosJ,0),a.addToHistory(a.selectedPosI,a.selectedPosJ,[b.text()],[""],"varcell"),b.text(""),a.alertMessage("Cell is cleared"),a.recreatePossibilities(),a.writeConsole(),a.writeHistoryConsole()),void 0;for(var c,f=[],e=1;4>e;e++)for(var d=1;4>d;d++)c=h.find("tbody > tr:nth-child("+e+") > td:nth-child("+d+")"),""!=c.text()&&f.push(c.text()),c.text("");h.removeClass("shown"),b.removeClass("hide"),a.addToHistory(a.selectedPosI,a.selectedPosJ,f,[""],"note"),a.changeArrayData(a.selectedPosI,a.selectedPosJ,0),a.changeNotesArray(a.selectedPosI,a.selectedPosJ),a.recreatePossibilities(),a.writeConsole(),a.writeHistoryConsole()},valueIsInRow:function(c,d){for(var b=board,a=0;9>a;a++)if(b.array_data[c][a].value==d)return true;return false},valueIsInColumn:function(c,d){for(var b=board,a=0;9>a;a++)if(b.array_data[a][c].value==d)return true;return false},valueIsInBlock:function(f,h,e){for(var g=board,c=3*Math.floor(f/3),d=3*Math.floor(h/3),b=c;c+3>b;b++)for(var a=d;d+3>a;a++)if(g.array_data[b][a].value==e)return true;return false},toggleUndoButton:function(){var a=board;0==a.movesHistory.length?options.buttons.set(options.buttons.undo,false):options.buttons.set(options.buttons.undo,true)},addToHistory:function(c,f,b,e,d){var a=board;a.movesHistory.push({posI:c,posJ:f,oldvalues:b,newvalues:e,type:d}),a.toggleUndoButton(),a.writeHistoryConsole()},undo:function(){var a=board;if(!$(this).hasClass("disabled")){var c=a.movesHistory.pop(),d=c.posI,g=c.posJ,e=c.oldvalues,l=(c.newvalues,c.type),b=a.findCell(d,g),f=b.find("span.varcell"),k=b.find("table.candidates");if("varcell"==l)f.text(e[0]),f.removeClass("hide"),k.removeClass("shown"),a.changeArrayData(d,g,""==e[0]?0:e[0]);else{f.text(""),f.addClass("hide");for(var i=0,h=1;4>h;h++)for(var j=1;4>j;j++)i++,b=k.find("tbody > tr:nth-child("+h+") > td:nth-child("+j+")"),e.indexOf(""+i)!=-1?b.text(i):b.text("");k.addClass("shown"),a.changeArrayData(d,g,"?")}a.changeNotesArray(d,g),a.recreatePossibilities(),a.writeHistoryConsole(),a.writeConsole(),a.toggleUndoButton(),a.alertMessage(texts.undo+": Step("+parseInt(a.movesHistory.length+1)+")")}},hint:function(){var b=board,d=0;b.removeHighlight();for(var a=0;9>a;a++)for(var c=0;9>c;c++)1!=b.array_data[a][c].possibilities.length||b.array_data[a][c].isfixed||0!=b.array_data[a][c].value||(b.highlightCell(a,c),d++);0==d&&b.alertMessage("No Visible Hints !!!")},checkSolution:function(f,j){var a=board;a.removeHighlight();var d;if(f||j){if(d=a.array_data[f][j].value,alert(d),0==d||"?"==d)return a.alertMessage("No value to check !!!"),void 0;for(var g=0;9>g;g++)if(g!=f&&d==a.array_data[g][j].value)return a.alertMessage("Error : Elements cannot have similar values within same Column !!"),a.highlightCell(g,j),a.highlightCell(f,j),void 0;for(var i=0;9>i;i++)if(i!=j&&d==a.array_data[f][i].value)return a.alertMessage("Error : Elements cannot have similar values within same Row !!"),a.highlightCell(f,i),a.highlightCell(f,j),void 0;for(var l=3*Math.floor(f/3),k=3*Math.floor(j/3),h=l;l+3>h;h++)for(var e=k;k+3>e;e++)if((f!=h||j!=e)&&d==a.array_data[h][e].value)return a.alertMessage("Error : Elements cannot have similar values within same Block !!"),a.highlightCell(h,e),a.highlightCell(f,j),void 0}else for(var b=0;9>b;b++)for(var c=0;9>c;c++)if(!a.array_data[b][c].isfixed&&0!=a.array_data[b][c].value&&"?"!=a.array_data[b][c].value){d=a.array_data[b][c].value;for(var g=0;9>g;g++)if(g!=b&&d==a.array_data[g][c].value)return a.alertMessage("Error : Elements cannot have similar values within same Column !!"),a.highlightCell(g,c),a.highlightCell(b,c),void 0;for(var i=0;9>i;i++)if(i!=c&&d==a.array_data[b][i].value)return a.alertMessage("Error : Elements cannot have similar values within same Row !!"),a.highlightCell(b,i),a.highlightCell(b,c),void 0;for(var l=3*Math.floor(b/3),k=3*Math.floor(c/3),h=l;l+3>h;h++)for(var e=k;k+3>e;e++)if((b!=h||c!=e)&&d==a.array_data[h][e].value)return a.alertMessage("Error : Elements cannot have similar values within same Block !!"),a.highlightCell(h,e),a.highlightCell(b,c),void 0}a.alertMessage("No Visible Mistakes :)")},saveGame:function(){},showCandidates:function(){}},utility={supports_html5_storage:function(){try{return"localStorage"in window&&null!==window.localStorage}catch(a){return false}},AddZero:function(a){return a>=0&&10>a?"0"+a:a+""},isObjectEmpty:function(b){var a=true;for(keys in b){a=false;break}return a}}