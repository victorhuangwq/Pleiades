// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.

$(document).ready(function() {
    // Javascript object to store all map data
    var map_data = {name:"Untitled", maxid: 0, lines:[]};
    
    var undo_stack = new Array();
    var redo_stack = new Array();
    
    var selected = 0;
    $('#selectdiv').hide();
    $('#drawdiv').hide();
    $('#landmarkdiv').hide();
    $('#removediv').hide();
    $('#undobutton').attr("disabled", true);
    $('#redobutton').attr("disabled", true);
    
    //map_canvas properties
    var map_canvas = $('#canvas');
    map_canvas.width($('#app').width());
    map_canvas.height($('#app').height());
    var ctx = canvas.getContext("2d");
    
    $('#selectbutton').click( function() {
        selected = 1;
    });

    $('#drawbutton').click( function() {
        selected = 2;
    });

    $('#landmarkbutton').click( function() {
        selected = 3;
    });

    $('#removebutton').click( function() {
        selected = 4;
    });

    $('#undobutton').click( function() {
        selected = 0;
        var actiontoundo = undo_stack.pop();
        if (actiontoundo.action == "line") {
            var linedata;
            var toremove = 0;
            for (i = 0; i < map_data.lines.length; i++) {
                if (map_data.lines[i].id == actiontoundo.id) {
                    linedata = map_data.lines[i];
                    toremove = i;
                    break;
                }
            }
            map_data.lines.splice(toremove, 1);
            redo_stack.push({action: "line", data: linedata});
        }
        update_canvas(map_data);
    });

    $('#redobutton').click( function() {
        console.log(redo_stack);
        selected = 0;
        var actiontoredo = redo_stack.pop();
        console.log(actiontoredo);
        if (actiontoredo.action == "line") {
            var thisid = actiontoredo.data.id;
            undo_stack.push({action:"line", id:thisid});
            map_data.lines.push(actiontoredo.data);
        }
        update_canvas(map_data);
    });
    
    $('#toolbar').click( function() {
        $('#selectbutton').attr("disabled", false);
        $('#drawbutton').attr("disabled", false);
        $('#landmarkbutton').attr("disabled", false);
        $('#removebutton').attr("disabled", false);
        $('#selectdiv').hide();
        $('#drawdiv').hide();
        $('#landmarkdiv').hide();
        $('#removediv').hide();
        
        switch (selected) {
        case 1:
            $('#selectbutton').attr("disabled", true);
            $('#selectdiv').show();
            break;
        case 2:
            $('#drawbutton').attr("disabled", true);
            $('#drawdiv').show();
            break;
        case 3:
            $('#landmarkbutton').attr("disabled", true);
            $('#landmarkdiv').show();
            break;
        case 4:
            $('#removebutton').attr("disabled", true);
            $('#removediv').show();
            break;
        }
    });
    
    // Canvas Manipulation
    
    var penDown = false;
    var x1, y1;
    
    function getMousePos(e) {
        return {
            x: e.offsetX,
            y: e.offsetY
        };
    }
    
    map_canvas.on('mousedown',function(e) {
        if (penDown === false && selected == 2) {
            penDown = true;
            var pos = getMousePos(e);
            x1 = pos.x;
            y1 = pos.y;
        }
    });
    
    map_canvas.on('mouseup',function(e) {
        if (penDown === true && selected == 2) {
            penDown = false;
            var pos = getMousePos(e);
            var thisid = map_data.maxid;
            undo_stack.push({action: "line", id: thisid});
            redo_stack.splice(0, redo_stack.length);
            addElement({type: "line", id: thisid, start: {x: x1, y: y1}, end:{x: pos.x, y: pos.y}});
            map_data.maxid += 1;
        }
    });
    
    function addElement(elem) {
        if (elem.type == "line") {
            map_data.lines.push(elem);
        }
        update_canvas(map_data);
    }
    
    function clear_canvas(canvas, ctx) {
        console.log("clear_canvas()");
        ctx.clearRect(0, 0, canvas.width(), canvas.height());
    }
    
    function drawLine(line, ctx) {
        ctx.beginPath();
        ctx.strokeStyle = "blue";
        ctx.moveTo(line.start.x, line.start.y);
        ctx.lineTo(line.end.x, line.end.y);
        ctx.stroke();
        ctx.closePath();
    };
    
    function update_canvas(obj) {
        
        lines = obj.lines;
        clear_canvas(map_canvas, ctx);
        for (var i = 0; i < lines.length; i++) {
            drawLine(lines[i], ctx);
        }
        
        if (redo_stack.length == 0) {
            $("#redobutton").attr("disabled", true);
        } else {
            $("#redobutton").attr("disabled", false);
        }
        if (undo_stack.length == 0) {
            $("#undobutton").attr("disabled", true);
        } else {
            $("#undobutton").attr("disabled", false);
        }
    }
    
});