// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.

$(document).ready(function() {// Javascript object to store all map data
    
    //map_canvas properties
    var map_canvas = $('#canvas');
    var ctx = canvas.getContext("2d");
    var container = $("#app"); //container of map_canvas
    
    cwidth = container.width();
    cheight = container.height();
    
    //canvas Debugging
    console.log("Canvas Properties");
    console.log("canvas container:" + cwidth);
    console.log("canvas container:" + cheight);
    
    map_canvas.attr("width",cwidth);
    map_canvas.attr("height",cheight);
    
    //canvas resizing on window resize
    $(window).resize(function(){
        cwidth = container.width();
        cheight = container.height();
        map_canvas.attr("width",cwidth);
        map_canvas.attr("height",cheight);
        update_canvas(map_data);
    });
    
    //map_data properties
    var map_data = {name:"Untitled", maxid: 0, lines:[], landmarks: []};
    var undo_stack = new Array();
    var redo_stack = new Array();
    
    /**
     *Toolbar controller.
     *controls all buttons in toolbar
     */
    var selected = 0;
    $('#selectdiv').hide();
    $('#drawdiv').hide();
    $('#landmarkdiv').hide();
    $('#removediv').hide();
    $('#undobutton').attr("disabled", true);
    $('#redobutton').attr("disabled", true);
    
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
        update_canvas(map_data);
    });

    $('#redobutton').click( function() {
        selected = 0;
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
    
    /**
     * Toolbar button code ends here
     */
    
    /**
     * Landmark popup code
     */
    $(document).click( function() {
        if (selected != 3) {
            $("#landmarkpopover").hide();
        }
    });
    
    function createLandmark(img, name) {
        var thisid = map_data.maxid;
        map_data.maxid += 1;
        undo_stack.push({action: "landmark", id: thisid});
        redo_stack.splice(0, redo_stack.length);
        addElement({type: "landmark", id: thisid, landmarkname: name, img: img, pos: landmarkpos});
    }
    
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
            popover = $("#landmarkpopover");
            popover.show();
            popover.css('left', (pos.x + 5) + 'px');
            popover.css('top', (pos.y) + 'px');
            landmarkpos = getMousePos(e);
        }
        
        if (selected == 4) {
            
            var pos = getMousePos(e);
            var todelete = null;
            for (var i=0;i<map_data.landmarks.length;i++) {
                var tl,tr,bl,br;
                centre = map_data.landmarks[i].pos;
                
                //Magic Numbers here: Take note!
                
                console.log(pos);
                
                tl = {x:centre.x-25,y:centre.y-25};
                tr = {x:centre.x-25,y:centre.y+25};
                bl = {x:centre.x+38,y:centre.y-25};
                br = {x:centre.x+38,y:centre.y+25};
                
                console.log(tl);
                console.log(tr);
                console.log(bl);
                console.log(br);
                
                sum_of_area = triAF(tl,pos,bl)+triAF(bl,pos,br)+triAF(br,pos,tr)+triAF(pos,tr,tl);
                quadArea = quadAF(tr,tl,bl,br);
                
                console.log(sum_of_area);
                console.log(quadArea);
                
                if (quadArea -0.1 <sum_of_area && sum_of_area < quadArea +0.1) {
                    todelete = map_data.landmarks[i];
                }            
            }
            
            //If there are no landmarks to be removed then look for closest line
            if (todelete == null) {
                
                var shortlistedlines = [];
                //Checks if the point is in any lines' hitbox
                for(var i =0; i <map_data.lines.length; i++){
                    var tl,tr,bl,br
                    
                    startp = map_data.lines[i].start;
                    endp   = map_data.lines[i].end;
                    
                    console.log(pos);
                    
                    tl = {x: (startp.x-rectApprox), y: (startp.y - (endp.x-startp.x)/(startp.y-endp.y)*2*rectApprox)};
                    tr = {x: startp.x+rectApprox, y:startp.y};
                    bl = {x: endp.x-rectApprox,y:endp.y};
                    br = {x: endp.x +rectApprox, y:endp.y + (endp.x-startp.x)/(startp.y-endp.y)*2*rectApprox };
                    
                    console.log(tl);
                    console.log(tr);
                    console.log(bl);
                    console.log(br);
                    
                    sum_of_area = triAF(tl,pos,bl)+triAF(bl,pos,br)+triAF(br,pos,tr)+triAF(pos,tr,tl);
                    quadArea = quadAF(tl,tr,br,bl);
                    
                    console.log(quadArea);
                    console.log(sum_of_area);
                    
                    //Catches floating point errors
                    if (quadArea -0.1 <sum_of_area && sum_of_area < quadArea +0.1) {
                        shortlistedlines.push(map_data.lines[i])
                    }
                }
                
                //Picks closest line
                var shortestdistance = 999999999;
                for (var i =0;i<shortlistedlines.length;i++) {
                    if (shrtD(pos,shortlistedlines[i]) < shortestdistance) {
                        shortestdistance = shrtD(pos,shortlistedlines[i])
                        todelete = shortlistedlines[i];
                    }
                }
            }
            
            console.log(todelete);
            
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
        ctx.beginPath();
        ctx.moveTo(line.start.x, line.start.y);
        ctx.lineTo(line.end.x, line.end.y);
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
        ctx.drawImage(img, landmark.pos.x - 25, landmark.pos.y - 25, 50, 50);
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
