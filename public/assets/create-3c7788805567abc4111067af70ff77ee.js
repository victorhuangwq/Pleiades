// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.

$(document).ready(function() {// Javascript object to store all map data


    console.log(introTrue);

    $("#mobile").hide();

    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
     // You are in mobile browser
        $("#notinmobile").hide();
        $("#mobile").show();
        introTrue = false;
    }

    //Intro Js QuikMap creation introduction
    var createguide = introJs();
    createguide.setOptions({
      steps: [
          {
            intro: '<h3>The QuikMap Create Page</h3><hr/> \
            Where concise direction giving QuikMaps are made'
          },
          {
            element:"#canvas",
            intro:"<h3>The Map Canvas</h3><hr/>You will be drawing your map here."
          },
          {
            element:"#toolbar",
            intro:"<h3>The Toolbar</h3><hr/>It contains all the tools you need to \
              create your own QuikMap. Click on them to know what they do"
          },
          {
            intro:"<h3>Tips to draw a Good QuikMap</h3>"
          },
          {
            element:"#nameMap",
            intro: "<strong>Firstly</strong>, name your map after its destination. \
              E.g. Pizzahut near Chinatown MRT \
              or E.g. John Tan's Wedding Reception "
          },
          {
            element:"#editpane",
            intro:"<strong>Secondly</strong>, draw the routes/paths \
              from your starting point to your endpoint using the draw tool:<br>\
              <center><span class='glyphicon glyphicon-pencil' aria-hidden='true' style='font-size:36px'></span></center><hr\>\
              <strong>After which</strong>, add your start and end point.<br><br>\
              <center><span class='glyphicon glyphicon-map-marker' aria-hidden='true' style='font-size:36px'></span></center>",
          },
          {
            element:"#editpane",
            intro:"<strong>Next</strong>, add in the landmarks that\
              you can see as you travel along your route."
          },
          {
            element:"#submitbutton",
            intro:"<strong>Lastly</strong>, submit your QuikMap, so that you can share it."
          }
      ],
      doneLabel: 'Done',
      tooltipPosition: 'auto',
      positionPrecedence: ['bottom','left', 'right', 'top'],
      disableInteraction: false
    });

    if(introTrue){
      createguide.start();
    }

    $('#howtousebutton').click(function(){
        createguide.goToStep(5).start();
    });


    //bootstrapSwitch
    $('#isStraight').bootstrapSwitch('state',true);
    $('#isStraight').bootstrapSwitch("onText",'Straight');
    $('#isStraight').bootstrapSwitch("offText",'Curvy');
    $('#isStraight').bootstrapSwitch("onColor",'primary');
    $('#isStraight').bootstrapSwitch("offColor",'info');

    $('#isLandmark').bootstrapSwitch('state',false);
    $('#isLandmark').bootstrapSwitch("onText",'Landmark');
    $('#isLandmark').bootstrapSwitch("offText",'Points');
    $('#isLandmark').bootstrapSwitch("onColor",'primary');
    $('#isLandmark').bootstrapSwitch("offColor",'primary');

    //map_canvas properties

    var golden_ratio = 1.61803398875;

    var map_canvas = $('#canvas');
    var ctx = canvas.getContext("2d");
    var container = $("#app"); //container of map_canvas

    cwidth = container.width();
    cheight = cwidth / golden_ratio;

    map_canvas.attr("width",cwidth);
    map_canvas.attr("height",cheight);

    //canvas resizing on window resize
    $(window).resize(function(){
        cwidth = container.width();
        cheight = cwidth/golden_ratio;
        map_canvas.attr("width",cwidth);
        map_canvas.attr("height",cheight);
        update_canvas(map_data);
    });

    //map_data properties
    var map_data = {name:"Untitled", maxid: 0, lines:[], landmarks: []};
    var undo_stack = new Array();
    var redo_stack = new Array();
    var tochangeindex = null;

    /**
     *Toolbar controller.
     *controls all buttons in toolbar
     */
    var selected = 0;
    $('#selectdiv').hide();
    $('#drawdiv').hide();
    $('#landmarkdiv').hide();
    $('#removediv').hide();
    $('#undodiv').hide();
    $('#redodiv').hide();
    $('#undobutton').attr("disabled", true);
    $('#redobutton').attr("disabled", true);

    $('#selectbutton').click( function() {
        selected = 1;
      $('#blankdiv').hide();
    });

    $('#drawbutton').click( function() {
        selected = 2;
        $('#blankdiv').hide();
    });

    $('#landmarkbutton').click( function() {
        selected = 3;
        $('#blankdiv').hide();
    });

    $('#removebutton').click( function() {
        selected = 4;
        $('#blankdiv').hide();
    });

    $('#undobutton').click( function() {
        selected = 5;
        var actiontoundo = undo_stack.pop();

        if (actiontoundo.action == "line") {
            var line_data;
            var to_remove = 0;

            for (i = 0; i < map_data.lines.length; i++) {
                if (map_data.lines[i].id == actiontoundo.id) {
                    line_data = map_data.lines[i];
                    to_remove = i;
                    break;
                }
            }
            map_data.lines.splice(to_remove, 1);
            redo_stack.push({action: "line", data: line_data});
        }

        if (actiontoundo.action == "landmark") {
            var landmarkdata;
            var to_remove = 0;
            for (i = 0; i < map_data.landmarks.length; i++) {
                if (map_data.landmarks[i].id == actiontoundo.id) {
                    landmarkdata = map_data.landmarks[i];
                    to_remove = i;
                    break;
                }
            }
            map_data.landmarks.splice(to_remove, 1);
            redo_stack.push({action: "landmark", data: landmarkdata});
        }

        if (actiontoundo.action == "delete") {
            var datatoaddback = actiontoundo.data;
            if (datatoaddback.type == "line") {
                map_data.lines.push(datatoaddback);
            }
            else if (datatoaddback.type == "landmark") {
                map_data.landmarks.push(datatoaddback);
            }
            redo_stack.push({action:"delete",data: datatoaddback});
        }

        if (actiontoundo.action == "changelandmark") {
            for (i = 0; i < map_data.landmarks.length; i++) {
                if (map_data.landmarks[i].id == actiontoundo.id) {
                    var newlandmarkname = map_data.landmarks[i].landmarkname;
                    var newlandmarkimg = map_data.landmarks[i].img;
                    map_data.landmarks[i].landmarkname = actiontoundo.oldname;
                    map_data.landmarks[i].img = actiontoundo.oldimg;
                    redo_stack.push({action: "changelandmark", id: actiontoundo.id, newname: newlandmarkname, newimg: newlandmarkimg});
                    break;
                }
            }
        }
        update_canvas(map_data);
    });

    $('#redobutton').click( function() {
        selected = 6;
        var actiontoredo = redo_stack.pop();
        if (actiontoredo.action == "line") {
            var thisid = actiontoredo.data.id;
            undo_stack.push({action:"line", id:thisid});
            map_data.lines.push(actiontoredo.data);
        }
        if (actiontoredo.action == "landmark") {
            var thisid = actiontoredo.data.id;
            undo_stack.push({action:"landmark", id:thisid});
            map_data.landmarks.push(actiontoredo.data);
        }
        if (actiontoredo.action == "delete") {
            todelete = actiontoredo.data;
            undo_stack.push({action:"delete",data:todelete});
            if (todelete.type == "line") {
                map_data.lines.splice(map_data.lines.indexOf(todelete),1);
            }
            if (todelete.type == "landmark") {
                map_data.landmarks.splice(map_data.landmarks.indexOf(todelete),1);
            }
        }
        if (actiontoredo.action == "changelandmark") {
            for (i = 0; i < map_data.landmarks.length; i++) {
                if (map_data.landmarks[i].id == actiontoredo.id) {
                    var oldname = map_data.landmarks[i].landmarkname;
                    var oldimg = map_data.landmarks[i].img;
                    map_data.landmarks[i].landmarkname = actiontoredo.newname;
                    map_data.landmarks[i].img = actiontoredo.newimg;
                    undo_stack.push({action: "changelandmark", id: actiontoredo.id, oldname: oldname, oldimg: oldimg});
                    break;
                }
            }
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
        $('#undodiv').hide();
        $('#redodiv').hide();

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
        case 5:
            $('#undodiv').show();
            break;
        case 6:
            $('#redodiv').show();
        }
    });

    /**
     * Toolbar button code ends here
     */

    /**
     * Landmark popup code
     */
    $(document).click( function() {
        if (selected != 3 && selected != 1) {
            $("#pointpopover").hide();
            $("#landmarkpopover").hide();
        } else if (selected == 3){
            if (!$("#isLandmark").bootstrapSwitch("state")) {
                $("#landmarkpopover").hide();
            } else {
                $("#pointpopover").hide();
            }
        }
    });

    function createLandmark(img, name) {
        if (selected == 1) {
            // edit landmark
            var oldname = map_data.landmarks[tochangeindex].landmarkname;
            var oldimg = map_data.landmarks[tochangeindex].img;
            map_data.landmarks[tochangeindex].landmarkname = name;
            map_data.landmarks[tochangeindex].img = img;
            undo_stack.push({action: "changelandmark", id: map_data.landmarks[tochangeindex].id, oldname: oldname, oldimg: oldimg});
            redo_stack.splice(0, redo_stack.length);
            update_canvas(map_data);
        } else { // new landmark
            var thisid = map_data.maxid;
            map_data.maxid += 1;
            undo_stack.push({action: "landmark", id: thisid});
            redo_stack.splice(0, redo_stack.length);
            landmarkpos = {x: landmarkpos.x / cwidth*1.0, y: landmarkpos.y / cheight*1.0};
            addElement({type: "landmark", id: thisid, landmarkname: name, img: img, pos: landmarkpos});
        }
    }

    $("#startbutton").click( function() {
        name = $("#pointinput").val();
        if (name == "") {
            name = "Start";
        }
        createLandmark("startimg", name);
        $("#pointinput").val("");
        $("#pointpopover").hide();
    });

    $("#endbutton").click( function() {
        name = $("#pointinput").val();
        if (name == "") {
            name = "End";
        }
        createLandmark("endimg", name);
        $("#pointinput").val("");
        $("#pointpopover").hide();
    });

    $("#trainbutton").click( function() {
        name = $("#pointinput").val();
        if (name == "") {
            name = "Station";
        }
        createLandmark("trainimg", name);
        $("#pointinput").val("");
        $("#pointpopover").hide();
    });

    $("#busbutton").click( function() {
        name = $("#pointinput").val();
        if (name == "") {
            name = "Bus Stop";
        }
        createLandmark("busimg", name);
        $("#pointinput").val("");
        $("#pointpopover").hide();
    });

    $('#digitalbutton').click( function() {
        name = $("#landmarkinput").val();
        if (name == "") {
            name = "Digital";
        }
        createLandmark("digitalimg", name);
        $("#landmarkinput").val("");
        $("#landmarkpopover").hide();
    });

    $('#lifestylebutton').click( function() {
        name = $("#landmarkinput").val();
        if (name == "") {
            name = "Lifestyle";
        }
        createLandmark("lifestyleimg", name);
        $("#landmarkinput").val("");
        $("#landmarkpopover").hide();
    });

    $('#foodbutton').click( function() {
        name = $("#landmarkinput").val();
        if (name == "") {
            name = "F&B";
        }
        createLandmark("foodimg", name);
        $("#landmarkinput").val("");
        $("#landmarkpopover").hide();
    });

    $('#fashionbutton').click( function() {
        name = $("#landmarkinput").val();
        if (name == "") {
            name = "Fashion";
        }
        createLandmark("fashionimg", name);
        $("#landmarkinput").val("");
        $("#landmarkpopover").hide();
    });

    $('#servicesbutton').click( function() {
        name = $("#landmarkinput").val();
        if (name == "") {
            name = "Service";
        }
        createLandmark("servicesimg", name);
        $("#landmarkinput").val("");
        $("#landmarkpopover").hide();
    });

    $('#structuresbutton').click( function() {
        name = $("#landmarkinput").val();
        if (name == "") {
            name = "Structure";
        }
        createLandmark("structuresimg", name);
        $("#landmarkinput").val("");
        $("#landmarkpopover").hide();
    });

    /**
     * Landmark popup code ends here
     */

    // Canvas Manipulation

    var penDown = false;
    var startpos;
    var points = new Array();

    function getMousePos(e) {
        return {
            x: e.offsetX,
            y: e.offsetY
        };
    }

    function get_control_points(start,q1,q2,end){

      //Magic number, with golden ratio!
      extend_coefficient = 0.5*golden_ratio;

      function form_equation(q1,q2){

        function equation(x){
            var highvalue = 9999999999999;
            if(q1.x == q2.x) {
                gradient = highvalue;
            } else {
                  gradient = (q2.y - q1.y)/(q2.x - q1.x);
              }
          c = q1.y - gradient*q1.x;
          return gradient*x + c;
        }

        return equation;
      }

      var control1 = {x:0,y:0};
      var control2 = {x:0,y:0};

      control1.x = Math.floor(q1.x + extend_coefficient*(q1.x-start.x));
      control2.x = Math.floor(q2.x - extend_coefficient*(end.x-q2.x));
      control1.y = Math.floor(form_equation(start,q1)(control1.x));
      control2.y = Math.floor(form_equation(q2,end)(control2.x));

      return [control1,control2];
    }

    map_canvas.on('mousedown',function(e) {
        if (penDown === false && selected == 2) {
            penDown = true;
            var pos = getMousePos(e);
            startpos = pos;
            ctx.beginPath();
            ctx.moveTo(pos.x,pos.y);
        }
    });


    map_canvas.on('mousemove',function(e){
        if(penDown === true){
          var pos = getMousePos(e);
          ctx.lineTo(pos.x,pos.y);

          points.push(pos);
          console.log(pos);

          ctx.lineWidth= 7;
          ctx.lineCap ='round';
          ctx.linejoin ="round";
          ctx.strokeStyle = "rgba(0, 153, 255, 0.04)";
          ctx.shadowColor = 'rgba(224,255,255,0.1)';
          ctx.shadowBlur = 30;
          ctx.stroke();
        }
    });

    map_canvas.on('mouseup',function(e) {
        if (penDown === true && selected == 2) {
            ctx.closePath();
            penDown = false;
            var pos = getMousePos(e);
            var thisid = map_data.maxid;
            undo_stack.push({action: "line", id: thisid});
            redo_stack.splice(0, redo_stack.length);


            var controlpoints, quarter1, quarter2;
            if($('#isStraight').bootstrapSwitch("state")){

              controlpoints = [startpos,pos];

            }
            else{

                  quarter1 = points[Math.floor((points.length)/4)];
                  console.log("q1: " + quarter1.x + ", " + quarter1.y);
                  quarter2 = points[Math.floor((points.length)*3/4)];
                  console.log("q2: " + quarter2.x + ", " + quarter2.y);

                  controlpoints = get_control_points(startpos,quarter1,quarter2,pos);
            }

            addElement({type: "line", id: thisid,
                        start: {x: startpos.x / cwidth*1.0, y: startpos.y / cheight*1.0},
                        ctrl1: {x: controlpoints[0].x / cwidth*1.0, y:controlpoints[0].y / cheight*1.0},
                        ctrl2:{x:controlpoints[1].x / cwidth*1.0, y:controlpoints[1].y / cheight*1.0},
                        end:{x: pos.x / cwidth*1.0, y: pos.y / cheight*1.0}});

            points = new Array();
            map_data.maxid += 1;
        }
    });



    var landmarkpos;

    //Area formulas for triangle
    triAF = function(p1,p2,p3){
        return Math.abs(1/2*(p1.x*p2.y+p2.x*p3.y+p3.x*p1.y - p1.y*p2.x - p2.y*p3.x - p3.y*p1.x));
    }
    //Area formula for quadrilaterals
    quadAF = function(p1,p2,p3,p4){
        return Math.abs(1/2*(p1.x*p2.y+p2.x*p3.y+p3.x*p4.y+p4.x*p1.y- p1.y*p2.x - p2.y*p3.x - p3.y*p4.x -p4.y*p1.x));
    }
    //shortest distance to a point formula
    shrtD = function(p1,line){
        return Math.abs(((line.start.y-line.end.y)/(line.end.x-line.start.x))*p1.x+p1.y+((line.start.y-line.end.y)/(line.end.x-line.start.x))*p1.x-p1.y)/(Math.sqrt(Math.pow((line.start.y-line.end.y)/(line.end.x-line.start.x),2)+1));
    }

    map_canvas.click(function(e) {
        //Arbitrary number for rectangle approximation
        var rectApprox = 20;

        //Adding landmarks
        if (selected == 3) {
            var pos = {x: e.pageX, y: e.pageY};
            var adj;
            if ($("#isLandmark").bootstrapSwitch("state")) {
                adj = 300;
                popover = $("#landmarkpopover");
            } else {
                adj = 200;
                popover = $("#pointpopover");
            }
            popover.show();
            if (pos.y > 2 * cheight / 3) {
                popover.css('left', (pos.x + 5) + 'px');
                popover.css('top', (pos.y - adj) + 'px');
            } else {
                popover.css('left', (pos.x + 5) + 'px');
                popover.css('top', (pos.y) + 'px');
            }
            landmarkpos = getMousePos(e);
        }

        // Selecting landmarks
        if (selected == 1) {
            var pagepos = {x: e.pageX, y: e.pageY};
            var pos = getMousePos(e);
            tochangeindex = -1;
            for (var i = 0; i < map_data.landmarks.length; i++) {
                var tl, br;
                center = map_data.landmarks[i].pos;
                tl = {x: center.x * cwidth - 25, y: center.y * cheight - 25};
                br = {x: center.x * cwidth + 25, y: center.y * cheight + 38};

                if (pos.x < br.x && pos.x > tl.x) {
                    if (pos.y < br.y && pos.y > tl.y) {
                        tochangeindex = i;
                    }
                }
            }

            if (tochangeindex != -1) {
                $("#pointpopover").hide();
                $("#landmarkpopover").hide();
                var popover;
                if (map_data.landmarks[tochangeindex].img != "startimg" &&
                    map_data.landmarks[tochangeindex].img != "endimg" &&
                    map_data.landmarks[tochangeindex].img != "trainimg" &&
                    map_data.landmarks[tochangeindex].img != "busimg") {
                    popover = $("#landmarkpopover");
                } else {
                    popover = $("#pointpopover");
                }
                popover.show();
                popover.css('left', (pagepos.x + 5) + 'px');
                popover.css('top', (pagepos.y) + 'px');
            }
        }

        //Remove
        if (selected == 4) {
            var p = getMousePos(e);
            var todelete = null;
            for (var i = 0; i < map_data.landmarks.length; i++) {
                var center = map_data.landmarks[i].pos;
                var tl = {x: center.x * cwidth - 25, y: center.y * cheight - 25};
                var br = {x: center.x * cwidth + 25, y: center.y * cheight + 38};

                if (p.x < br.x && p.x > tl.x) {
                    if (p.y < br.y && p.y > tl.y) {
                        todelete = map_data.landmarks[i];
                    }
                }
            }

            //If there are no landmarks to be removed then look for closest line
            if (todelete == null) {

                var closest = 25;
                for (var i = 0; i < map_data.lines.length; i++) {
                    var line = map_data.lines[i];
                    var bez = new Bezier(line.start.x * cwidth, line.start.y * cheight,
                                        line.ctrl1.x * cwidth, line.ctrl1.y * cheight,
                                        line.ctrl2.x * cwidth, line.ctrl2.y * cheight,
                                        line.end.x * cwidth, line.end.y * cheight);
                    var points = bez.getLUT();
                    for (var j = 0; j < points.length; j++) {
                        var dist = Math.sqrt(Math.pow(p.x - points[j].x, 2) + Math.pow(p.y - points[j].y, 2));
                        if (dist < closest) {
                            closest = dist;
                            todelete = line;
                        }
                    }
                }

            }

            if (todelete != null) {
                undo_stack.push({action:"delete",data:todelete});
                if (todelete.type == "line") {
                    map_data.lines.splice(map_data.lines.indexOf(todelete),1)
                }
                if (todelete.type == "landmark") {
                    map_data.landmarks.splice(map_data.landmarks.indexOf(todelete),1)
                }
                update_canvas(map_data);
            }

        }
    });

    function addElement(elem) {
        if (elem.type == "line") {
            map_data.lines.push(elem);
        }
        if (elem.type == "landmark") {
            map_data.landmarks.push(elem);
        }
        update_canvas(map_data);
    }

    function clear_canvas(canvas, ctx) {
        ctx.clearRect(0, 0, canvas.width(), canvas.height());
    }

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
        ctx.drawImage(img, x - 25, y - 25, 50, 50);
        y = y + 40;
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

    $("#submitbutton").click(function(e) {
        e.preventDefault();
        map_data.name = $("#titleinput").val();
        $("#mapdatainput").val(JSON.stringify(map_data));
        $('#titlehiddeninput').val(map_data.name);
        $("#submitform").submit();
    });

});
