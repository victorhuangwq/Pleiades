// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.

$(document).ready(function() {
    var selected = 0;
    $('#selectdiv').hide();
    $('#drawbutton').hide();
    $('#landmarkbutton').hide();
    $('#removebutton').hide();
    var map_canvas = $("#canvas");
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
        $('#drawbutton').hide();
        $('#landmarkbutton').hide();
        $('#removebutton').hide();
        
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

    $('map_canvas').on('mousedown',function(e){
        if (penDown === false) {
            penDown = true;
            var pos = getMousePos(canvas, e);
            x1 = pos.x;
            y1 = pos.y;
        }
    });
    
    $('map_canvas').on('mouseup',function(e){
        if (penDown === true) {
            penDown = false;
            var pos = getMousePos(canvas, e);
            ctx.beginPath();
            ctx.strokeStyle = "blue";
            ctx.moveTo(x1,y1);
            ctx.lineTo(pos.x,pos.y);
            ctx.stroke();
            ctx.closePath();
        }
    });
    
});