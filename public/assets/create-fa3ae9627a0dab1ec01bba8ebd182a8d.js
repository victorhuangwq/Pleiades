// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.

$(document).ready(function() {
    // Javascript object to store all map data
    var map_data = {name:"Untitled", elements:[]};
    
    var selected = 0;
    $('#selectdiv').hide();
    $('#drawdiv').hide();
    $('#landmarkdiv').hide();
    $('#removediv').hide();
    
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
    });

    $('#redobutton').click( function() {
        selected = 0;
    });
    
    $(document).click( function() {
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
            ctx.beginPath();
            ctx.strokeStyle = "blue";
            ctx.moveTo(x1,y1);
            console.log("Start:"+x1+","+y1);
            ctx.lineTo(pos.x,pos.y);
            console.log("End:"+pos.x+","+pos.y);
            ctx.stroke();
            ctx.closePath();
            map_data['elements'].push({type: "line", start: {x: x1, y: y1}, end: {x: pos.x, y: pos.y}});
        }
    });
    
});
