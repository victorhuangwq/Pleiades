// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.

$(document).ready(function() {

    $("#images").hide();

    var map_data = JSON.parse(mapdata);

    var golden_ratio = 1.61803398875;

    var map_canvas = $("#canvas");
    var ctx = document.getElementById("canvas").getContext("2d");
    var container = $("#app");

    var cwidth = container.width();
    var cheight = cwidth / golden_ratio;
    map_canvas.attr("width", cwidth);
    map_canvas.attr("height", cheight);
    update_canvas(map_data);

    function clear_canvas(canvas, ctx) {
        ctx.clearRect(0, 0, canvas.width(), canvas.height());
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

    $("#mapname").html(map_data.name);

    $(window).resize(function() {
        cwidth = container.width();
        cheight = cwidth / golden_ratio;
        if(cwidth < 300){
          console.log("hi");
        }
        console.log("Resize: " + cwidth + ", " + cheight);
        map_canvas.attr("width", cwidth);
        map_canvas.attr("height", cheight);
        update_canvas(map_data);
    });

    function drawLine(line, ctx) {

        var scaling_factor = cwidth/1000;

        linestartx = line.start.x * cwidth;
        linestarty = line.start.y * cheight;
        linectrl1x = line.ctrl1.x * cwidth;
        linectrl1y = line.ctrl1.y * cheight;
        linectrl2x = line.ctrl2.x * cwidth;
        linectrl2y = line.ctrl2.y * cheight;
        lineendx = line.end.x * cwidth;
        lineendy = line.end.y * cheight;

        ctx.beginPath();
        ctx.moveTo(linestartx, linestarty);
        ctx.bezierCurveTo(linectrl1x,linectrl1y,
          linectrl2x,linectrl2y,lineendx,lineendy);

        ctx.lineWidth= 1 + 6 * scaling_factor;
        ctx.lineCap ='round';
        ctx.linejoin ="round";
        ctx.strokeStyle = "rgba(0, 153, 255, 0.5)";
        ctx.shadowColor = 'rgba(224,255,255,1)';
        ctx.shadowBlur = 10 + 20 * scaling_factor;
        ctx.stroke();
        ctx.closePath();
    }

    function drawLandmark(landmark, ctx) {
        var img = document.getElementById(landmark.img);
        var x = landmark.pos.x * cwidth;
        var y = landmark.pos.y * cheight;

        //Scaling Icon for Visibility
        var size = 45*(cwidth/800)

        if (img.complete == true) { // check if image is already loaded
            console.log("drawing at x: " + x + ", y: " + y)
            ctx.drawImage(img, x - size/2, y - size/2, size, size);
        }
        else { // load image first otherwise
            img.onload = function() {
                console.log("drawing at x: " + x + ", y: " + y)
                ctx.drawImage(img, x - size/2, y - size/2, size, size);
            }
        }
        var ytext = y + 16 + size/2;
        ctx.font = '' + (8 + 5*size/45) + 'pt Helvetica';
        ctx.textAlign = 'center';
        ctx.fillStyle = 'black';
        ctx.fillText(landmark.landmarkname, x, ytext);
    }

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

    function download_prep(canvas){
      canvas.width = 800;
      canvas.height = 600;
      update_canvas(map_data);
      ctx.fillStyle = "#FFFFFF";
      ctx.shadowColor = 'rgba(255,255,255,1)';
      ctx.globalCompositeOperation="destination-over";
      ctx.fillRect(0,0,800,600);

    }

    download_low.click(function(){
      var download_canvas = document.getElementById("canvas");
      download_prep(canvas);
      var lowQuality = download_canvas.toDataURL("image/png", 0.1);
      downloadURI(lowQuality,"quikmap_" + map_data.name +"_l");

      cwidth = container.width();
      cheight = container.height();
      map_canvas.attr("width",cwidth);
      map_canvas.attr("height",cheight);

      update_canvas(map_data);
    });

    download_high.click(function(){
      var download_canvas = document.getElementById("canvas");
      download_prep(canvas);
      var highQuality = download_canvas.toDataURL("image/png", 1);
      downloadURI(highQuality,"quikmap_" + map_data.name +"_h");

      cwidth = container.width();
      cheight = container.height();
      map_canvas.attr("width",cwidth);
      map_canvas.attr("height",cheight);
      update_canvas(map_data);
    });

    function downloadURI(uri, name) {
      var link = document.createElement("a");
      link.download = name;
      link.href = uri;
      link.click();
      link.remove();
    }

    landmark_list = $("#triangle_landmarks");

    $('#no_close').click(function(event){
     event.stopPropagation();
    });

    for(var i = 0; i < map_data.landmarks.length; i++){
      to_append = "<div class='checkbox'><label>&nbsp;&nbsp;&nbsp;<input type='checkbox' value='"+map_data.landmarks[i].id+"'>&nbsp;&nbsp;";
      to_append += map_data.landmarks[i].landmarkname;
      to_append += "</label></div>";
      landmark_list.append("<li>"+to_append+"</li>");
    }

    $('#triangle_submit').click(function(event){
          update_canvas(map_data);
          var polygon_points = [];
          var id_list = [];

          $(':checkbox').each(function () {
                 if (this.checked) {
                    //More to be done
                     console.log($(this).val());
                     id_list.push(Number($(this).val()));
                 }
          });
          if(id_list.length <= 1){
            alert("You have selected lesser than 2 landmarks.This feature requires at least 2 landmarks to work")
          }
          else{
            for( var i = 0; i < map_data.landmarks.length;i++){
              if(id_list.indexOf(map_data.landmarks[i].id) >= 0)
                polygon_points.push(map_data.landmarks[i].pos);
            }

            var x = 0;
            var y = 0;

            for(var i = 0;i < polygon_points.length;i++){
              x += polygon_points[i].x;
              y += polygon_points[i].y;
            }

            x = x/polygon_points.length*cwidth;
            y = y/polygon_points.length*cheight;

            ctx.save();
            ctx.beginPath();
            //Gets the right size by calculating the harmonic mean
            //Magic numbers here
            ctx.arc(x,y,2/(1/cwidth+1/cheight)/30*golden_ratio,0,2*Math.PI);
            ctx.strokeStyle = "rgba(255, 165, 0, 0.75)";
            ctx.fillStyle = "rgba(255, 201, 102,0.20)";
            ctx.stroke();
            ctx.fill();
            ctx.restore();
          }
    });
});
