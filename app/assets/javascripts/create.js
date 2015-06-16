// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.

$(document).ready(function() {
    $('#creatediv1').hide();
    $('#creatediv2').hide();
    $('#creatediv3').hide();
    $('#creatediv4').hide();
    var map_canvas = $("#canvas");
    var ctx = canvas.getContext("2d");
    
    $('#selectbutton').click( function() {
        $('#selectbutton').attr("disabled", true);
        $('#drawbutton').attr("disabled", false);
        $('#landmarkbutton').attr("disabled", false);
        $('#removebutton').attr("disabled", false);
        $('#creatediv1').show();
        $('#creatediv2').hide();
        $('#creatediv3').hide();
        $('#creatediv4').hide();
    });

    $('#drawbutton').click( function() {
        $('#selectbutton').attr("disabled", false);
        $('#drawbutton').attr("disabled", true);
        $('#landmarkbutton').attr("disabled", false);
        $('#removebutton').attr("disabled", false);
        $('#creatediv1').hide();
        $('#creatediv2').show();
        $('#creatediv3').hide();
        $('#creatediv4').hide();
        
        //Canvas Manipulation
        var penDown = false;
        var x1,y1;
    
        $('map_canvas').on('mousedown',function(e){
            if (penDown === false) {
            penDown = true;
            var pos = getMousePos(canvas, e);
            x1 = pos.x;
            y1 = pos.y;
        }
        });
        
        $('map_canvas').on('mousedown',function(e){
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

    $('#landmarkbutton').click( function() {
        $('#selectbutton').attr("disabled", false);
        $('#drawbutton').attr("disabled", false);
        $('#landmarkbutton').attr("disabled", true);
        $('#removebutton').attr("disabled", false);
        $('#creatediv1').hide();
        $('#creatediv2').hide();
        $('#creatediv3').show();
        $('#creatediv4').hide();
    });

    $('#removebutton').click( function() {
        $('#selectbutton').attr("disabled", false);
        $('#drawbutton').attr("disabled", false);
        $('#landmarkbutton').attr("disabled", false);
        $('#removebutton').attr("disabled", true);
        $('#creatediv1').hide();
        $('#creatediv2').hide();
        $('#creatediv3').hide();
        $('#creatediv4').show();
    });

    $('#undobutton').click( function() {
        $('#selectbutton').attr("disabled", false);
        $('#drawbutton').attr("disabled", false);
        $('#landmarkbutton').attr("disabled", false);
        $('#removebutton').attr("disabled", false);
        $('#creatediv1').hide();
        $('#creatediv2').hide();
        $('#creatediv3').hide();
        $('#creatediv4').hide();
    });

    $('#redobutton').click( function() {
        $('#selectbutton').attr("disabled", false);
        $('#drawbutton').attr("disabled", false);
        $('#landmarkbutton').attr("disabled", false);
        $('#removebutton').attr("disabled", false);
        $('#creatediv1').hide();
        $('#creatediv2').hide();
        $('#creatediv3').hide();
        $('#creatediv4').hide();
    });
    
    //Canvas Manipulation
    
});