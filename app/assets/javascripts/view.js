// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.

$(document).ready(function() {

    $("#images").hide();

    map_data = JSON.parse(mapdata);

    var map_canvas = $("#canvas");
    var ctx = document.getElementById("canvas").getContext("2d");
    var container = $("#app");

    $("#mapname").html(map_data.name);

    cwidth = container.width();
    cheight = container.height();

    map_canvas.attr("width",cwidth);
    map_canvas.attr("height",cheight);

    $(window).resize(function(){
        cwidth = container.width();
        cheight = container.height();
        map_canvas.attr("width",cwidth);
        map_canvas.attr("height",cheight);
        update_canvas(map_data);
    });

    function clear_canvas(canvas, ctx) {
        ctx.clearRect(0, 0, canvas.width(), canvas.height());
    }

    function drawLine(line, ctx) {
        ctx.beginPath();
        ctx.moveTo(line.start.x, line.start.y);
        ctx.bezierCurveTo(line.ctrl1.x,line.ctrl1.y,
          line.ctrl2.x,line.ctrl2.y,line.end.x,line.end.y);
        ctx.lineWidth= 7;
        ctx.lineCap ='round';
        ctx.linejoin ="round";
        ctx.strokeStyle = "rgba(0, 153, 255, 0.5)";
        ctx.shadowColor = 'rgba(224,255,255,1)';
        ctx.shadowBlur = 30;
        ctx.stroke();
        ctx.closePath();
    }

    function drawLandmark(landmark, ctx) {
        var img = document.getElementById(landmark.img);
        img.onload = function() {
            ctx.drawImage(img, landmark.pos.x - 25, landmark.pos.y - 25, 50, 50);
        }
        var x = landmark.pos.x;
        var y = landmark.pos.y + 40;
        ctx.font = '' + (13) + 'pt Helvetica';
        ctx.textAlign = 'center';
        ctx.fillStyle = 'black';
        ctx.fillText(landmark.landmarkname, x, y);
    }

    function update_canvas(obj) {
        lines = obj.lines;
        landmarks = obj.landmarks;
        clear_canvas(map_canvas, ctx);

        for (var i = 0; i < lines.length; i++) {
            drawLine(lines[i], ctx);
        }
        for (var i = 0; i < landmarks.length; i++) {
            drawLandmark(landmarks[i], ctx);
        }
    }

    update_canvas(map_data);

    var copy_link_button = $('#copyLinkButton');
    copy_link_button.disabled = !document.queryCommandSupported('copy');

    copy_link_button.click(function(){
      var copy_text_area = $('#copyLinkArea');
      copy_text_area.select();

      try{
        var successful = document.execCommand('copy');
        console.log('Copying text was ' +successful);
      }
      catch(err){
        console.log(err);
      }
    });

    var download_low = $('#download_low');
    var download_high = $('#download_high');

    download_low.click(function(){
      var download_canvas = document.getElementById("canvas");
      download_canvas.width = 800;
      download_canvas.height = 600;
      update_canvas(map_data);
      var lowQuality = download_canvas.toDataURL("image/png", 0.1);
      downloadURI(lowQuality,"quikmap_" + map_data.name);
      
      cwidth = container.width();
      cheight = container.height();
      map_canvas.attr("width",cwidth);
      map_canvas.attr("height",cheight);
      update_canvas(map_data);
    });

    download_high.click(function(){
      var download_canvas = document.getElementById("canvas");
      var highQuality = download_canvas.toDataURL("image/png", 1);
      downloadURI(highQuality,"quikmap_" + map_data.name);
    });

    function downloadURI(uri, name) {
      var link = document.createElement("a");
      link.download = name;
      link.href = uri;
      link.click();
      link.remove();
    }

});
