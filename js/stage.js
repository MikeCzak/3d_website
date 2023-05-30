var stage = document.getElementById("stage");
var event_count = 0;

var x = 0;
var y = 0;
var content;
var viewer_y_orientation = 0;
var content_mover;
var motion_blur = null;
var img_width;
if (!Date.now) {
    Date.now = function() { return new Date().getTime(); }
}
var step = 10;
var dark_side = 0.98;
var left_steps, up_steps, right_steps, down_steps, turn_l, turn_r;
var blocks = [];
var flats = [];
var uprights = [];
var circles = [];
var tubes = [];
var groups = [];
var lights = [];
var shaders_flat = [];
var shaders_block = [];
var dropshadows = [];
var room_height = 570;
var wall_amount; //for tubes
var device_ry = 0;

var center = {x: window.innerWidth/2, y: window.innerHeight/2 };
var crosshair = document.createElement("div");
crosshair.innerHTML = "+";
crosshair.id = "crosshair";
crosshair.style.left = center.x + "px";
crosshair.style.top = center.y + "px";

document.body.appendChild(crosshair);


var debug_box = document.createElement("div");
var debug_scroll = document.createElement("p");
var debug_elements = document.createElement("p");
var debug_keypress = document.createElement("p");
var debug_3d = document.createElement("p");

var walking_left = false;
var walking_up = false;
var walking_right = false;
var walking_down = false;
var kneeling = false;
var sidesteps = true;
var turn_vel = 5;

/* Präsentation FH */
var one_on = false;
var two_on = false;
var three_on = false;
var four_on = false;
var five_on = false;
var six_on = false;
var seven_on = false;
var eight_on = false;
var nine_on = false;
var zero_on = false;
var five_display_counter = 1;
var seven_display_counter = 1;
var future_content_counter = 0;
var future_features_counter = 0;
theme = "room";

debug_box.id = "debug_box";
debug_scroll.id = "debug_scroll";
debug_elements.id = "debug_elements";
debug_keypress.id = "debug_keypress";
debug_3d.id = "debug_3d";
var test_angle;

debug_box.appendChild(debug_scroll);
debug_box.appendChild(debug_elements);
debug_box.appendChild(debug_keypress);
debug_box.appendChild(debug_3d);
document.body.appendChild(debug_box);

function getIds(element_array) {
    var ids = [];
    if (element_array == shaders_flat || element_array == shaders_block) {
        for (var s = 0; s < element_array.length; s++) {
        ids.push("<br />" + element_array[s][0].id.split("shader_front")[0] + "shaders");
        }
        
    }
    
    else if (element_array == lights) {
        
        for (var l = 0; l < element_array.length; l++) {
        ids.push("<br />" + element_array[l][0].id);
        
        }
    }
    
    else {
         for (var i = 0; i < element_array.length; i++) {
        ids.push("<br />" + element_array[i].id);
        
        }
    }
    return ids.toString();
}





/* STAGE CONSTRUCTOR */

function create_stage() {
    
    content = document.createElement("div");
    content.id = "content";
    stage.appendChild(content);
    
    content.style["-webkit-transform"] = "translateX(0px) translateY(0px) translateZ(1000px) rotateX(-25deg) rotateY(0deg) rotateZ(0deg)";

    var x_axis = document.createElement("div");
    var y_axis = document.createElement("div");
    var z_axis = document.createElement("div");
    var plane = document.createElement("div");
    content.appendChild(x_axis);
    content.appendChild(y_axis);
    content.appendChild(z_axis);
    content.appendChild(plane);
    
    x_axis.id = "x_axis";
    x_axis.innerHTML = "x";
    y_axis.id = "y_axis";
    y_axis.innerHTML = "y";
    z_axis.id = "z_axis";
    z_axis.innerHTML = "z";
    plane.id = "plane";
    
    
    x_axis.style.left = (center.x - x_axis.clientWidth/2) + "px";
    x_axis.style.bottom = "0px";
    x_axis.style["-webkit-transform"] = "translateX(0px) translateY(0px) translateZ(0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skewX(0deg)";
    y_axis.style.left = center.x + "px";
    y_axis.style.bottom = "0px";
    y_axis.style["-webkit-transform"] = "translateX(0px) translateY(0px) translateZ(0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skewX(0deg)";
    z_axis.style.left = (center.x - z_axis.clientWidth/2) + "px";
    z_axis.style.bottom = "0px";
    z_axis.style["-webkit-transform"] = "translateX(0px) translateY(0px) translateZ(0px) rotateX(0deg) rotateY(90deg) rotateZ(0deg) skewX(0deg)";
    plane.style.left = (center.x - plane.clientWidth/2) + "px";
    plane.style.bottom = (-plane.clientHeight/2+1) + "px";
    plane.style["-webkit-transform"] = "translateX(0px) translateY(0px) translateZ(0px) rotateX(90deg) rotateY(0deg) rotateZ(0deg) skewX(0deg)";
    


/*  BUILD AND CHANGE ELEMENTS BELOW!
 ====================================================================== 

    BUILDING FUNCTIONS:                                                                         INFO:
    
    build(furniture, x, y, z, range(light only),  w, h, d, id [, OPTIONAL: css_class])          furniture can be "flat", "block", "tube" or "light"     d = depth (ALWAYS SET TO 0 IN "flat")   id = HTML-elment's ID
    group(elements, group_name, total_w, total_h [, OPTIONAL: css_class])                       syntax: group(["element1id", "element2id", "etc."], 276, 100)
    copy(element, new_id)                                                                       element = HTML-elment's ID, e.g.: copy("group_couch", "group_small_couch");  //be sure to use the same prefix ("group_", "flat_", etc.) for your new element! Of course you would have to scale you copied couch down for the example new_id to make sense, but you get the picture... :)
    move(element, x, y, z, rx, ry, rz)                                                          rx, ry, rz = angle to spin around the x/y/z-axis in degree, e.g.: move("group_table", 200, 0, 0, 0, 45, 0) will move the group with id="group_table" 200 px on the x-axis (= to the right, use negative value for left) and spin it 45 �deg around the y-axis (= clockwise). use negative values for rx, ry or rz for counter-clockwise spinning!
    
    
   ====================================================================== 
    ADD FUNCTIONS BELOW */

    
    load_theme(theme);
    
    //var flickering_light = window.setInterval(function() { lights[0][1] = parseInt(700 +  Math.random()*100); apply_shadow("light_main", false)}, 100);
    
    if (theme == "room") {
        var kamin_flackern = window.setInterval(function() {
            var flickering_shader = parseInt(65 + Math.random()*10);
            document.getElementById("block_kamin_base_shader_top").style["background"] = "-webkit-radial-gradient(50% 50%, circle, transparent 0%, rgba(0, 0, 0, 0.95) " + parseInt(flickering_shader) + "%)";
            document.getElementById("block_kamin_middle_shader_back").style["background"] = "-webkit-radial-gradient(50% 88%, circle, transparent 30%, rgba(0, 0, 0, 0.9) " + parseInt(30+flickering_shader/10) + "%)";
            document.getElementById("block_kamin_middle_shader_front").style["background"] = "-webkit-radial-gradient(50% 88%, circle, transparent 30%, rgba(0, 0, 0, 0.9) " + parseInt(30+flickering_shader/10) + "%)";
            document.getElementById("flat_fireplace_floor_shader_front").style["background"] = "-webkit-radial-gradient(50% 50%, circle, transparent " + parseInt(10+flickering_shader/3) + "%, rgba(0, 0, 0, 0.9) " + parseInt(40+flickering_shader/3) + "%)";
            
        }, 100);
    }
    
    
    
    
/* ====================================================================== */
    
    /* DEBUG_ELEMENTS DISPLAY */
    debug_elements.innerHTML = "<p>Blocks: " + blocks.length + " " + getIds(blocks) + " " +
                               "</p><p>Flats: " + flats.length + " " + getIds(flats) + " " +
                               "</p><p>Circles: " + circles.length + " " + getIds(circles) + " " +
                               "</p><p>Tubes: " +tubes.length + " " + getIds(tubes) + " " +
                               "</p><p>Groups: " + groups.length + "  " + getIds(groups) +
                               "</p><p>Lights: " + lights.length + "  " + getIds(lights) +
                               "</p><p>Shaders (F+B): " + parseInt(shaders_flat.length + shaders_block.length) + "  " + getIds(shaders_flat) + getIds(shaders_block);
                               
    



    window.setTimeout(function() { document.getElementById("preloader").style["display"] = "none"; }, 1500);
    document.getElementById("preloader").style["opacity"] = "0";
    document.getElementById("loading").style["opacity"] = "0";
}




/* END STAGE CONSTRUCTOR */







/* MAIN OBJECT BUILDER */

function build(furniture, x, y, z, w, h, d, id, css_class, no_shader) {
    switch(furniture) {
        case "block": content.appendChild(block(x, y, z, w, h, d, id, css_class, no_shader));   break;
        case "flat": content.appendChild(flat(x, y, z, w, h, id, css_class, no_shader)); break;
        case "circle": content.appendChild(circle(x, y, z, w, h, id, css_class)); break;
        case "tube": content.appendChild(tube(x, y, z, w, h, d, id, css_class, no_shader));  break;
        case "light": content.appendChild(light(x, y, z, d, id, css_class)); apply_shadow("light_" + id, true); break; /* d = RANGE ! */
    }
}





function group(elements, group_name, total_w, total_h, css_class) {
    var html_group = document.createElement("div");
    content.appendChild(html_group);
    html_group.id = "group_" + group_name;
    html_group.style.width = total_w + "px";
    html_group.style.height = total_h + "px";

    if (css_class != undefined) {
        html_group.setAttribute("class", css_class);
    }
    html_group.style["-webkit-transform"] = "translateX(0px) translateY(" + (-total_h/2) + "px) translateZ(0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skewX(0deg)";

    for(var g = 0; g < elements.length; g++) {
        
        document.getElementById(elements[g]).style["left"] = parseInt(total_w/2 - parseInt(document.getElementById(elements[g]).style.width)/2) + "px";
        html_group.appendChild(document.getElementById(elements[g]));
    }
    
    
    if (elements[0].split("_")[0] == "flat") {
        for (var e = 0; e < elements.length; e++) {
            flats.pop();
        }
        flats.push(html_group);

    }
    
    
    groups.push(html_group);
    html_group.style["left"] = center.x - total_w/2 + "px";
    html_group.style["bottom"] = -total_h/2 + "px";
}





function copy(element, new_id, no_shade) {
    var copy_element = document.getElementById(element).cloneNode(true);
    copy_element.id = new_id;
    copy_element.className = document.getElementById(element).className;
    
    if(element.split("_")[0] == "group") {
        for(var c = 0; c < copy_element.childNodes.length; c++) {
            copy_element.childNodes[c].id += "_copy";
        }
    }
        switch(element.split("_")[0]) {
            
            case "flat": flats.push(copy_element); break;
            case "block": blocks.push(copy_element); break;
            case "circle": circles.push(copy_element); break;
            case "tube": tubes.push(copy_element); break;
            case "group": groups.push(copy_element);
                          var children_type = copy_element.childNodes[0].id.split("_")[0];
                          if (no_shade) {
                          }
                          else {
                            switch (children_type) {
                              case "block": for(var c = 0; c < copy_element.childNodes.length; c++) {
                                              blocks.push(copy_element.childNodes[c]);
                                            }; break;
                              case "flat": flats.push(copy_element); break;
                              default: break;              
                            }
                          }
                          
                          break;
            case "light": lights.push(copy_element); break;
        }
    
    content.appendChild(copy_element);
}






function move(element, x, y, z, rx, ry, rz) {
    var current_x = parseInt(document.getElementById(element).style["-webkit-transform"].split(/translateX/)[1].split(/[(px)]/i)[1]);
    var current_y = parseInt(document.getElementById(element).style["-webkit-transform"].split(/translateY/)[1].split(/[(px)]/i)[1]);
    var current_z = parseInt(document.getElementById(element).style["-webkit-transform"].split(/translateZ/)[1].split(/[(px)]/i)[1]);
    var current_rx = parseInt(document.getElementById(element).style["-webkit-transform"].split(/rotateX/)[1].split(/[(deg)]/i)[1]);
    var current_ry = parseInt(document.getElementById(element).style["-webkit-transform"].split(/rotateY/)[1].split(/[(deg)]/i)[1]);
    var current_rz = parseInt(document.getElementById(element).style["-webkit-transform"].split(/rotateZ/)[1].split(/[(deg)]/i)[1]);
    var current_sx = parseInt(document.getElementById(element).style["-webkit-transform"].split(/skewX/)[1].split(/[(deg)]/)[1]);
    document.getElementById(element).style["-webkit-transform"] = "translateX(" + (current_x+x) + "px) " +
                                                                  "translateY(" + (current_y-y) + "px) " +
                                                                  "translateZ(" + (current_z-z) + "px) " +
                                                                  "rotateX(" + (current_rx+rx) + "deg) " +
                                                                  "rotateY(" + (current_ry+ry) + "deg) " +
                                                                  "rotateZ(" + (current_rz+rz) + "deg)  skewX(" + (current_sx) + "deg)";
}


/* SHAPES */

function block(x, y, z, w, h, d, id, css_class, no_shader) {
    
    var block_element = document.createElement("div");
    block_element.id = "block_" + id;
    block_element.style["left"] = center.x - w/2 + "px";
    if (css_class != undefined) {
        block_element.setAttribute("class", css_class);
    }
    else {
        block_element.setAttribute("class", "block");
    }
    var s = 1;
    
    blocks.push(block_element);
    if (no_shader) {
        blocks.pop();
    }
    var block_front = document.createElement("div");
    var block_back = document.createElement("div");
    var block_left = document.createElement("div");
    var block_right = document.createElement("div");
    var block_top = document.createElement("div");
    var block_bottom = document.createElement("div");
    block_front.setAttribute("class", "block_front");
    block_back.setAttribute("class", "block_back");
    block_left.setAttribute("class", "block_left");
    block_right.setAttribute("class", "block_right");
    block_top.setAttribute("class", "block_top");
    block_bottom.setAttribute("class", "block_bottom");
    block_element.appendChild(block_front);
    block_element.appendChild(block_back);
    block_element.appendChild(block_left);
    block_element.appendChild(block_right);
    block_element.appendChild(block_top);
    block_element.appendChild(block_bottom);
    
    
    block_front.style.width = w-1 + "px";
    block_front.style.height = h-1 + "px";
    block_front.style["-webkit-transform"] = "translateZ(" + (d/2) + "px)";
    
    block_back.style.width = w-1 + "px";
    block_back.style.height = h-1 + "px";
    block_back.style["-webkit-transform"] = "translateZ(" + (-d/2) + "px) rotateY(180deg)";
    
    block_left.style.width = d-1 + "px";
    block_left.style.height = h-1 + "px";
    block_left.style["-webkit-transform"] = "translateX(" + (-d/2) + "px) rotateY(-90deg)"; 
    
    block_right.style.width = d-1 + "px";
    block_right.style.height = h-1 + "px";
    block_right.style["-webkit-transform"] = "translateX(" + (-d/2 + w) + "px) rotateY(90deg)";
    
    block_top.style.width = w-1 + "px";
    block_top.style.height = d-1 + "px";
    block_top.style["-webkit-transform"] = "translateY(" + (d/2-h) + "px) rotateX(90deg)";
    
    block_bottom.style.width = w-1 + "px";
    block_bottom.style.height = d-1 + "px";
    block_bottom.style["-webkit-transform"] = "translateY(" + (d/2) + "px) rotateX(-90deg)";
    
    block_element.style["-webkit-transform"] = "translateX(" + (x) + "px) translateY(" + (-y) + "px) translateZ(" + (-z) + "px) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skewX(0deg)";
    
    block_element.style.width = block_front.style.width;
    block_element.style.height = block_front.style.height;
    return block_element;
}

function flat(x, y, z, w, h, id, css_class, no_shader = false) {
    var flat_element = document.createElement("div");
    flat_element.id = "flat_" + id;
    if (css_class != undefined) {
        flat_element.setAttribute("class", css_class);
    }
    else {
        flat_element.setAttribute("class", "flat");
    }
    flats.push(flat_element);
    if (no_shader) {
        flats.pop();
    }
    flat_element.style.width = w + "px";
    flat_element.style.height = h + "px";
    flat_element.style["left"] = center.x - w/2 + "px";
    flat_element.style["bottom"] = - h/2 + "px";
    flat_element.style["-webkit-transform"] = "translateX(" + (x) + "px) translateY(" + (-y) + "px) translateZ(" + (-z) + "px) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skewX(0deg)";
    return flat_element;
}

function img(x, y, z, w, h, id, url, css_class, no_shader) {
    var img_content = new Image();
    var img_element = document.createElement("div");
    img_content.src = url;
    img_element.id = "img_" + id;
    img_element.className = css_class;
    
    img_content.style["width"] =  "100%";
    img_content.style["height"] =  "100%";
    img_element.style["width"] =  w + "px";
    img_element.style["height"] =  h + "px";
    
    img_element.appendChild(img_content);
    
    img_element.style["left"] = parseInt(center.x - w/2) + "px";
    img_element.style["bottom"] = (-h/2) + "px";
    img_element.style["-webkit-transform"] = "translateX(" + (x) + "px) translateY(" + (-y) + "px) translateZ(" + (-z) + "px) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skewX(0deg)";
    
    
        
    if (no_shader == false) {
        var img_shader = document.createElement("div");
        img_shader.id = "img_" + id + "_shader";
        img_shader.style["width"] =  w + "px";
        img_shader.style["height"] =  h + "px";
        img_shader.style["-webkit-transform"] = "tranlateZ(1px)";
        img_element.appendChild(img_shader);
        img_shader.className = "img_shader"; 
    }
    
    content.appendChild(img_element);
    
    
    
}

function video(x, y, z, w, h, id, url, css_class) {
    var video_container = document.createElement("div");
    var video = document.createElement("video");
    var source = document.createElement("source");
    var video_w = w + "px";
    var video_h = h + "px";
    video.controls = false;
    video.setPlaysinline = true;
    source.setAttribute("src", url);
    video_container.id = "video_" + id;
    video_container.className = css_class;
    video_container.style["width"] =  video_w;
    video_container.style["height"] =  video_h;
    
    video.setAttribute("width", video_w);
    video.setAttribute("height", video_h);
    video.id = id;
    
    video_container.appendChild(video);
    video.appendChild(source);
    
    
    video_container.style["left"] = parseInt(center.x - w/2) + "px";
    video_container.style["bottom"] = (-h/2) + "px";
    video_container.style["-webkit-transform"] = "translateX(" + (x) + "px) translateY(" + (-y) + "px) translateZ(" + (-z) + "px) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skewX(0deg)";
    
    content.appendChild(video_container);
    video.load();
    
    video.addEventListener("click", function() {
        video.volume = 0;
        video.play();
        var louder = window.setInterval(function() {
            video.volume += 0.01;
        }, 200);
        window.setTimeout(function() {
            window.clearInterval(louder)
        }, 4000)
    });
    
    
}




function circle(x, y, z, w, h, id, css_class) {
    
}



function tube(x, y, z, w, h, d, id, css_class, is_open) {
    wall_amount = d;
    var tube_element = document.createElement("div");
    tube_element.id = "tube_" + id;
    tube_element.style.width = w + "px";
    tube_element.style.height = h + "px";
    tube_element.style["left"] = center.x - w/2 + "px";
    if (css_class != undefined) {
        tube_element.setAttribute("class", css_class);
    }
    else {
        tube_element.setAttribute("class", "tube");
    }
    
    tubes.push(tube_element);
    var wall_width = Math.sqrt(2 * Math.pow(w/2, 2) - (2 * w/2 * w/2 * Math.cos(360/wall_amount*Math.PI/180)))+1;
    var push_out = parseInt(Math.sqrt(Math.pow(w/2,2) - Math.pow(wall_width/2,2)));
    
    for(var i = 0; i < wall_amount; i++) {
        var tube_wall = document.createElement("div");
        
        tube_wall.style["bottom"] = parseInt(-h/2) + "px";
        tube_wall.setAttribute("class", "tube_wall" + (i+1));
        tube_wall.style.width = parseInt(wall_width) + "px";
        tube_wall.style.height = h + "px";
        
        tube_wall.style["left"] = parseInt(w/2 - wall_width/2) + "px";
        tube_wall.style["-webkit-transform-origin"] = "50% 50%";
        tube_wall.style["-webkit-transform"] = "rotateX(0deg) rotateY(" + parseInt(i * 360 / wall_amount) + "deg) rotateZ(0deg) translateX(0px) translateY(0px) translateZ(" + push_out + "px)";
        
        var wall_outer_shader = document.createElement("div");
        tube_wall.appendChild(wall_outer_shader);
        wall_outer_shader.style.width = parseInt(tube_wall.style.width) + "px";
        wall_outer_shader.style.height = tube_wall.style.height;
        wall_outer_shader.style["-webkit-transform"] = "translateZ(1px)";
        wall_outer_shader.setAttribute("class", "outer_shader");
        
        if (is_open == true) {
        
        var wall_inner_shader = document.createElement("div");
        tube_wall.appendChild(wall_inner_shader);
        wall_inner_shader.style.width = (parseInt(tube_wall.style.width) - 1) + "px";
        wall_inner_shader.style.height = (parseInt(tube_wall.style.height) - 1) + "px";
        wall_inner_shader.style["-webkit-transform"] = "translateZ(-1px)";
        wall_inner_shader.setAttribute("class", "inner_shader");
        
        }
        
        var shade_factor = Math.pow(1-2*i/wall_amount, 2);

        if(is_open) { wall_inner_shader.style["background-color"] = "rgba(0, 0, 0, " + (shade_factor*1.3) + ")";}
        wall_outer_shader.style["background"] = "-webkit-linear-gradient(" + ((i >= wall_amount/2) ? ("right"):("left")) + ", rgba(0, 0, 0, " + (0.85-shade_factor) + "), rgba(0, 0, 0, " + (0.85-shade_factor + 0.09) + "))";
        tube_element.appendChild(tube_wall);
        
    }

    var tube_top = document.createElement("div");
    var tube_bottom = document.createElement("div");
    tube_top.setAttribute("class", "tube_top");
    tube_top.style["border-radius"] = "100%";
    tube_top.style.width = push_out*2 + "px";
    tube_top.style.height = push_out*2 + "px";
    tube_top.style["bottom"] = -push_out + "px";
    tube_top.style["left"] = w/2 - push_out + "px";
    tube_top.style["-webkit-transform"] = "rotateX(90deg) rotateY(0deg) rotateZ(0deg) translateX(-1px) translateY(0px) translateZ(" + (h/2+1) + "px)";
    var top_shader = document.createElement("div");
    tube_top.appendChild(top_shader);
    top_shader.style.width = tube_top.style.width;
    top_shader.style.height = tube_top.style.height;
    top_shader.setAttribute("class", "tube_top_shader");
    top_shader.style["border-radius"] = "100%";
    top_shader.style["background"] = "-webkit-linear-gradient(rgba(0, 0, 0, 0.85), transparent 120%)";
    top_shader.style["-webkit-transform"] = "scale(1.031) translateZ(1px)";
    
    tube_bottom.setAttribute("class", "tube_bottom");
    tube_bottom.style["border-radius"] = "100%";
    tube_bottom.style.width = push_out*2 + "px";
    tube_bottom.style.height = push_out*2 + "px";
    tube_bottom.style["bottom"] = -push_out + "px";
    tube_bottom.style["left"] = w/2 - push_out + "px";
    tube_bottom.style["-webkit-transform"] = "rotateX(90deg) rotateY(0deg) rotateZ(0deg) translateX(0px) translateY(0px) translateZ(-" + parseInt(h/2) + "px)";
    
    tube_element.style["-webkit-transform"] = "translateX(" + (x) + "px) translateY(" + (-y) + "px) translateZ(" + (-z) + "px) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skewX(0deg)";
    
    if (is_open) {
    }
    else {
        tube_element.appendChild(tube_top);
    }
    tube_element.appendChild(tube_bottom);
    
    return tube_element;
}


/* LIGHT SOURCE */

function light(x, y, z, range, id, css_class) {
    var light_element = document.createElement("div");
    var light_source = [];
    var light_range = range;
    
    light_element.id = "light_" + id;
    light_element.style["left"] = center.x - 25 + "px";
    light_element.style["bottom"] = "-25px";
    if (css_class != undefined) {
        light_element.setAttribute("class", css_class);
    }
    else {
        light_element.setAttribute("class", "light");
    }
    light_source.push(light_element);
    light_source.push(light_range);
    
    lights.push(light_source);
    light_element.style.width = "50px";
    light_element.style.height = "50px";
    light_element.style["background-size"] = "50px 50px";
    light_element.style["background-repeat"] = "no-repeat";
    light_element.style["background"] = "-webkit-radial-gradient(center, circle, #ffffd0 0%, transparent 25px)";
    light_element.style["-webkit-transform"] = "translateX(" + (x) + "px) translateY(" + (-y) + "px) translateZ(" + (-z) + "px) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skewX(0deg)";
    return light_element;
}




/* SHADER */

function apply_shadow(light_caller_id, create_shaders) {
    /* GET LIGHT RANGE */
    
    for (var l = 0; l < lights.length; l++) {
        if(lights[l][0].id == light_caller_id) {
            light_range = lights[l][1];
        }
    }
    
    
    var light_x = parseInt(document.getElementById(light_caller_id).style["-webkit-transform"].split(/translateX/)[1].split(/[(px)]/)[1]);
    var light_y = parseInt(document.getElementById(light_caller_id).style["-webkit-transform"].split(/translateY/)[1].split(/[(px)]/)[1] * (-1));
    var light_z = parseInt(document.getElementById(light_caller_id).style["-webkit-transform"].split(/translateZ/)[1].split(/[(px)]/)[1] * (-1));
    
    
    if (create_shaders) {   /* IS CALLED ONCE WHEN LIGHT-OBJECT IS BUILT TO APPEND SHADER-DIVS TO FURNITURE. SEE BELOW-SECTION FOR SHADOW-MOVEMENT! */
        
        /* FLATS */
        
        for(var s = 0; s < flats.length; s++) {
            var shader_front = document.createElement("div");
            shader_front.setAttribute("class", "shader_flat");
            shader_front.style["-webkit-transform"] = "translateZ(2px)";
            
            
                shader_front.style.width = (parseInt(flats[s].style.width) + 0) + "px" ;
                shader_front.style.height = (parseInt(flats[s].style.height) + 0) + "px";
                flats[s].appendChild(shader_front);
                
            
            
            shader_front.id = shader_front.parentNode.id + "_shader_front";
            
            var shader = [];
            shader.push(shader_front);
            shaders_flat.push(shader);
            
        }
     
    /* BLOCKS */
    
        for(var s = 0; s < blocks.length; s++) {
            var shader_front = document.createElement("div");
            var shader_back = document.createElement("div");
            var shader_left = document.createElement("div");
            var shader_right = document.createElement("div");
            var shader_top = document.createElement("div");
            var shader_bottom = document.createElement("div");
            
            shader_front.setAttribute("class", "shader_block_front");
            shader_back.setAttribute("class", "shader_block_back");
            shader_left.setAttribute("class", "shader_block_left");
            shader_right.setAttribute("class", "shader_block_right");
            shader_top.setAttribute("class", "shader_block_top");
            shader_bottom.setAttribute("class", "shader_block_bottom");
            
            
            
            
            shader_front.style.width = blocks[s].childNodes[0].style.width;
            shader_back.style.width = blocks[s].childNodes[1].style.width;
            shader_left.style.width = blocks[s].childNodes[2].style.width;
            shader_right.style.width = blocks[s].childNodes[3].style.width;
            shader_top.style.width = blocks[s].childNodes[4].style.width;
            shader_bottom.style.width = blocks[s].childNodes[5].style.width;
            
            shader_front.style.height = blocks[s].childNodes[0].style.height;
            shader_back.style.height = blocks[s].childNodes[1].style.height;
            shader_left.style.height = blocks[s].childNodes[2].style.height;
            shader_right.style.height = blocks[s].childNodes[3].style.height;
            shader_top.style.height = blocks[s].childNodes[4].style.height;
            shader_bottom.style.height = blocks[s].childNodes[5].style.height;
            
            blocks[s].childNodes[0].appendChild(shader_front);
            blocks[s].childNodes[1].appendChild(shader_back);
            blocks[s].childNodes[2].appendChild(shader_left);
            blocks[s].childNodes[3].appendChild(shader_right);
            blocks[s].childNodes[4].appendChild(shader_top);
            blocks[s].childNodes[5].appendChild(shader_bottom);
            
            
            
            shader_front.id = shader_front.parentNode.parentNode.id + "_shader_front";
            shader_back.id = shader_back.parentNode.parentNode.id + "_shader_back";
            shader_left.id = shader_left.parentNode.parentNode.id + "_shader_left";
            shader_right.id = shader_right.parentNode.parentNode.id + "_shader_right";
            shader_top.id = shader_top.parentNode.parentNode.id + "_shader_top";
            shader_bottom.id = shader_bottom.parentNode.parentNode.id + "_shader_bottom";
            
            var shader = [];
            shader.push(shader_front);
            shader.push(shader_back);
            shader.push(shader_left);
            shader.push(shader_right);
            shader.push(shader_top);
            shader.push(shader_bottom);
            shaders_block.push(shader);
        }
        
    }
    /* SHADING */
    
    
        
        /* FLATS */
    for(var s = 0; s < shaders_flat.length; s++) {

        var shader_x = parseInt(shaders_flat[s][0].parentNode.style["-webkit-transform"].split(/translateX/)[1].split(/[(px)]/)[1]);
        var shader_z = parseInt(shaders_flat[s][0].parentNode.style["-webkit-transform"].split(/translateZ/)[1].split(/[(px)]/)[1] * (-1));
        var shader_y = parseInt(shaders_flat[s][0].parentNode.style["-webkit-transform"].split(/translateY/)[1].split(/[(px)]/)[1] * (-1));
        
        var shader_w = parseInt(shaders_flat[s][0].style.width);
        var shader_h = parseInt(shaders_flat[s][0].style.height);
        
        var shader_rx = parseInt(shaders_flat[s][0].parentNode.style["-webkit-transform"].split(/rotateX/)[1].split(/[(deg)]/)[1]);
        var shader_ry = parseInt(shaders_flat[s][0].parentNode.style["-webkit-transform"].split(/rotateY/)[1].split(/[(deg)]/)[1]);
        var shader_rz = parseInt(shaders_flat[s][0].parentNode.style["-webkit-transform"].split(/rotateZ/)[1].split(/[(deg)]/)[1]);
        
        
        var dist_x = shader_x - light_x;
        var dist_y = shader_y - light_y;
        var dist_z = shader_z - light_z;
        
        
        var light_amount;
        var light_offset_x; 
        var light_offset_y = -shader_h/2 - light_range + dist_y;
        
        
        
        
        switch (shader_ry) {
            case -360:
            case 360:
            case 0: light_offset_x = -shader_w/2 - light_range - dist_x;
                    light_amount = dist_z/light_range; break;
            case -270:
            case 90: light_offset_x = -shader_w/2 - light_range - dist_z;
                     light_amount = -dist_x/light_range; break;
            case -180:
            case 180: light_offset_x = -shader_w/2 - light_range - (-dist_x);
                      light_amount = -dist_z/light_range; break;
            case 270:
            case -90:   light_offset_x = -shader_w/2 - light_range - (-dist_z);
                        light_amount = dist_x/light_range; break;
        }
        
       
        
        
        switch (shader_rx) {
            case -360:
            case 360:
            case 0: break;
            case -270:
            case 90: light_offset_x = -shader_w/2 - light_range - dist_x;  // FLOOR
                     light_offset_y = -shader_h/2 - light_range - (-dist_z);
                     light_amount = -dist_y/light_range; break;
            case -180:
            case 180: break;
            case 270:
            case -90: light_offset_x = -shader_w/2 - light_range - dist_x;  // CEILING
                      light_offset_y = -shader_h/2 - light_range - dist_z;
                      light_amount = dist_y/light_range; break;
        }
        
        if (light_amount < 0 || light_amount > dark_side) {
            light_amount = dark_side;
        }
        
        shaders_flat[s][0].style["background"] = "-webkit-radial-gradient(50% 50%, circle, rgba(0, 0, 0, " + parseFloat(light_amount) + ") 0%, rgba(0, 0, 0, " + dark_side + ") " + parseInt(light_range) + "px)";
        shaders_flat[s][0].style["background-size"] =  parseInt(light_range*2+shader_w*2) + "px " + parseInt(light_range*2+shader_h*2) + "px";
        shaders_flat[s][0].style["background-position"] = parseInt(light_offset_x) + "px " + parseInt(light_offset_y) + "px";
        
        
    }
        
        /*BLOCKS */
    
    
      
    for(var s = 0; s < shaders_block.length; s++) {
        var is_group = (shaders_block[s][0].parentNode.parentNode.parentNode.id.split("_")[0] == "group") ? true : false;
        
        var block_x = parseInt(shaders_block[s][0].parentNode.parentNode.style["-webkit-transform"].split(/translateX/)[1].split(/[(px)]/)[1]);
        var block_y = parseInt(shaders_block[s][0].parentNode.parentNode.style["-webkit-transform"].split(/translateY/)[1].split(/[(px)]/)[1] * (-1));
        var block_z = parseInt(shaders_block[s][0].parentNode.parentNode.style["-webkit-transform"].split(/translateZ/)[1].split(/[(px)]/)[1] * (-1));
        var block_rx = parseInt(shaders_block[s][0].parentNode.parentNode.style["-webkit-transform"].split(/rotateX/)[1].split(/[(px)]/)[1]);
        var block_ry = parseInt(shaders_block[s][0].parentNode.parentNode.style["-webkit-transform"].split(/rotateY/)[1].split(/[(px)]/)[1]);
        var block_rz = parseInt(shaders_block[s][0].parentNode.parentNode.style["-webkit-transform"].split(/rotateZ/)[1].split(/[(px)]/)[1]);
        var block_w = parseInt(shaders_block[s][0].parentNode.style.width);
        var block_h = parseInt(shaders_block[s][0].parentNode.style.height);
        var block_d = parseInt(shaders_block[s][2].parentNode.style.width);
        
        var group_w = parseInt(shaders_block[s][0].parentNode.parentNode.parentNode.style.width);
        var group_h = parseInt(shaders_block[s][0].parentNode.parentNode.parentNode.style.height);
        var group_d;
        if (is_group) {
            group_d = parseInt(shaders_block[s][0].parentNode.parentNode.parentNode.childNodes[0].childNodes[2].style.width);
        }
        var group_x = (is_group) ? parseInt(shaders_block[s][0].parentNode.parentNode.parentNode.style["-webkit-transform"].split(/translateX/)[1].split(/[(px)]/)[1]) : 0;
        var group_y = (is_group) ? parseInt(shaders_block[s][0].parentNode.parentNode.parentNode.style["-webkit-transform"].split(/translateY/)[1].split(/[(px)]/)[1] * (-1) - group_h/2) : 0;
        var group_z = (is_group) ? parseInt(shaders_block[s][0].parentNode.parentNode.parentNode.style["-webkit-transform"].split(/translateZ/)[1].split(/[(px)]/)[1] * (-1)) : 0;
        
    
        var dist_front_x = ((is_group) ? (group_x + block_x) : (block_x)) - light_x;
        var dist_front_y = (((is_group) ? (group_y + block_y) : (block_y)) + block_h/2 - light_y) * (-1);
        var dist_front_z = ((is_group) ? (group_z + block_z) : (block_z)) - block_d/2 - light_z;
        
        var dist_back_x = (((is_group) ? (group_x + block_x) : (block_x)) - light_x);
        var dist_back_y = (((is_group) ? (group_y + block_y) : (block_y)) + block_h/2 - light_y);
        var dist_back_z = (((is_group) ? (group_z + block_z) : (block_z)) + block_d/2 - light_z) * (-1);
        
        var dist_left_x = ((is_group) ? (group_x + block_x) : (block_x)) - block_w/2 - light_x;
        var dist_left_y = (((is_group) ? (group_y + block_y) : (block_y)) + block_h/2 - light_y) * (-1);
        var dist_left_z = (((is_group) ? (group_z + block_z) : (block_z)) - light_z) * (-1);
        
        var dist_right_x = (((is_group) ? (group_x + block_x) : (block_x)) + block_w/2 - light_x) * (-1);
        var dist_right_y = (((is_group) ? (group_y + block_y) : (block_y)) + block_h/2 - light_y) * (-1);
        var dist_right_z = ((is_group) ? (group_z + block_z) : (block_z)) - light_z;
        
        var dist_top_x = ((is_group) ? (group_x + block_x) : (block_x)) - light_x;
        var dist_top_y = (((is_group) ? (group_y + block_y) : (block_y)) + block_h - light_y) * (-1);
        var dist_top_z = (((is_group) ? (group_z + block_z) : (block_z)) - light_z) * (-1);
        
        var dist_bottom_x = ((is_group) ? (group_x + block_x) : (block_x)) - light_x;
        var dist_bottom_y = ((is_group) ? (group_y + block_y) : (block_y)) - light_y;
        var dist_bottom_z = ((is_group) ? (group_z + block_z) : (block_z)) - light_z;
        
        var dist_center_x = Math.sqrt(Math.pow( ((is_group) ? (group_x + block_x) : (block_x)) - light_x , 2));
        var dist_center_y = Math.sqrt(Math.pow( ((is_group) ? (group_y + block_y) : (block_y)) - light_y , 2));
        var dist_center_z = Math.sqrt(Math.pow( ((is_group) ? (group_z + block_z) : (block_z)) - light_z , 2));
        
        var dist_center = Math.sqrt(Math.pow(dist_center_x, 2) + Math.pow(dist_center_z, 2));
        
        var light_angle = Math.atan((dist_center > 0) ? (dist_center_y/dist_center) : (0))*(180/Math.PI);
        
        
        
        if (dist_center_x > light_range + block_w/2 || dist_center_y > light_range + block_h/2 || dist_center_z > light_range + block_d/2) {
            shaders_block[s][0].style["background"] = "rgba(0, 0, 0, " + dark_side + ")";
            shaders_block[s][1].style["background"] = "rgba(0, 0, 0, " + dark_side + ")";
            shaders_block[s][2].style["background"] = "rgba(0, 0, 0, " + dark_side + ")";
            shaders_block[s][3].style["background"] = "rgba(0, 0, 0, " + dark_side + ")";
            shaders_block[s][4].style["background"] = "rgba(0, 0, 0, " + dark_side + ")";
            shaders_block[s][5].style["background"] = "rgba(0, 0, 0, " + dark_side + ")";
        }
    
        else { //FRONT
            shaders_block[s][0].style["background"] = "-webkit-radial-gradient(50% 50%, circle, rgba(0, 0, 0, " + ((dist_front_z/light_range < 0 || dist_front_z/light_range > 0.85) ? (dark_side) : (dist_front_z/light_range)) + ") 0%, rgba(0, 0, 0, " + dark_side + ") " + parseInt(light_range) + "px)";
            shaders_block[s][0].style["background-size"] =  parseInt(light_range*2 + block_w*2) + "px " + parseInt(light_range*2+block_h*2) + "px";
            shaders_block[s][0].style["background-position"] = (-block_w/2 - light_range - dist_front_x) + "px " + (-block_h/2 - light_range - dist_front_y) + "px";
            shaders_block[s][0].style["background-repeat"] = "no-repeat";
            //BACK
            shaders_block[s][1].style["background"] = "-webkit-radial-gradient(50% 50%, circle, rgba(0, 0, 0, " + ((dist_back_z/light_range < 0 || dist_back_z/light_range > 0.85) ? (dark_side) : (dist_back_z/light_range)) + ") 0%, rgba(0, 0, 0, " + dark_side + ") " + parseInt(light_range) + "px)";
            shaders_block[s][1].style["background-size"] =  parseInt(light_range*2 + block_w*2) + "px " + parseInt(light_range*2+block_h*2) + "px";
            shaders_block[s][1].style["background-position"] = (-block_w/2 - light_range - dist_back_x) + "px " + (-block_h/2 - light_range - dist_back_y) + "px";
            shaders_block[s][1].style["background-repeat"] = "no-repeat";
            //LEFT
            shaders_block[s][2].style["background"] = "-webkit-radial-gradient(50% 50%, circle, rgba(0, 0, 0, " + ((dist_left_x/light_range < 0 || dist_left_x/light_range > 0.85) ? (dark_side) : (dist_left_x/light_range)) + ") 0%, rgba(0, 0, 0, " + dark_side + ") " + parseInt(light_range) + "px)";
            shaders_block[s][2].style["background-size"] =  parseInt(light_range*2 + block_d*2) + "px " + parseInt(light_range*2+block_h*2) + "px";
            shaders_block[s][2].style["background-position"] = (-block_d/2 - light_range - dist_left_z) + "px " + (-block_h/2 - light_range - dist_left_y) + "px";
            shaders_block[s][2].style["background-repeat"] = "no-repeat";
            //RIGHT
            shaders_block[s][3].style["background"] = "-webkit-radial-gradient(50% 50%, circle, rgba(0, 0, 0, " + ((dist_right_x/light_range < 0 || dist_right_x/light_range > 0.85) ? (dark_side) : (dist_right_x/light_range)) + ") 0%, rgba(0, 0, 0, " + dark_side + ") " + parseInt(light_range) + "px)";
            shaders_block[s][3].style["background-size"] =  parseInt(light_range*2 + block_d*2) + "px " + parseInt(light_range*2+block_h*2) + "px";
            shaders_block[s][3].style["background-position"] = (-block_d/2 - light_range - dist_right_z) + "px " + (-block_h/2 - light_range - dist_right_y) + "px";
            shaders_block[s][3].style["background-repeat"] = "no-repeat";
            //TOP
            shaders_block[s][4].style["background"] = "-webkit-radial-gradient(50% 50%, circle, rgba(0, 0, 0, " + ((dist_top_y/light_range < 0 || dist_top_y/light_range > 0.85) ? (dark_side) : (dist_top_y/light_range)) + ") 0%, rgba(0, 0, 0, " + dark_side + ") " + parseInt(light_range) + "px)";
            shaders_block[s][4].style["background-size"] =  parseInt(light_range*2 + block_w*2) + "px " + parseInt(light_range*2+block_d*2) + "px";
            shaders_block[s][4].style["background-position"] = (-block_w/2 - light_range - dist_top_x) + "px " + (-block_d/2 - light_range - dist_top_z) + "px";
            shaders_block[s][4].style["background-repeat"] = "no-repeat";
            //BOTTOM
            shaders_block[s][5].style["background"] = "-webkit-radial-gradient(50% 50%, circle, rgba(0, 0, 0, " + ((dist_bottom_y/light_range < 0 || dist_bottom_y/light_range > 0.85) ? (dark_side) : (dist_bottom_y/light_range)) + ") 0%, rgba(0, 0, 0, " + dark_side + ") " + parseInt(light_range) + "px)";
            shaders_block[s][5].style["background-size"] =  parseInt(light_range*2 + block_w*2) + "px " + parseInt(light_range*2+block_d*2) + "px";
            shaders_block[s][5].style["background-position"] = (-block_w/2 - light_range - dist_bottom_x) + "px " + (-block_d/2 - light_range - dist_bottom_z) + "px";
            shaders_block[s][5].style["background-repeat"] = "no-repeat";
        }
        
    
    
    
    
    
    
    
       
    }

       
}




function dropshadow(object_id, x, y, z, r, w, h, skew, is_rounded) {
    var shader_container = document.createElement("div");
    shader_container.setAttribute("class", "dropshadow_container");
    shader_container.id = "dropshadow_" + object_id;
    shader_container.style["bottom"] = "0px";
    shader_container.style["left"] = (center.x - w/2) + "px";
    shader_container.style.width = w + "px";
    shader_container.style.height = h + "px";
    
    var shader = document.createElement("div");
    shader.style.width = w + "px";
    shader.style.height = h + "px";
    shader.setAttribute("class", "dropshadow");
    shader.style["bottom"] = "0px";
    shader.style["left"] = "0px";
    
    shader_container.appendChild(shader);

    if (is_rounded) {
        var shader_rounded = document.createElement("div");
        shader_rounded.style.width = w + "px";
        shader_rounded.style.height = w + "px";
        shader_rounded.setAttribute("class", "dropshadow_rounded");
        shader_rounded.style["bottom"] = (-w/2 + h) + "px";
        shader_rounded.style["left"] = "0px";
        shader_container.appendChild(shader_rounded);
    }
    shader_container.style.width = w + "px";
    shader_container.style.height = parseInt((is_rounded)?(h+w/2):(h)) + "px";
    shader_container.style["opacity"] = dark_side*0.8;
    shader_container.style["-webkit-transform"] = "translateX(" + (x) + "px) translateY(" + (-y-1) + "px) translateZ(" + (-z) + "px) rotateX(90deg) rotateY(0deg) rotateZ(" + r + "deg) skewX(" + skew + "deg)";
    dropshadows.push(shader_container);
    content.appendChild(shader_container);
    
}




// ACTIVATE INPUT

function init_events() {
    stage.requestPointerLock = stage.requestPointerLock || stage.webkitRequestPointerLock || stage.mozRequestPointerLock;
    stage.addEventListener("click", function() { stage.requestPointerLock(); })
    
    
    window.addEventListener("mousemove", turn);
    window.addEventListener("keydown", keyboard_input);
    window.addEventListener("keyup", keyboard_release);
    // ADD SYNTHETIC EVENT LISTENERS
    const onMouseDown = (event) => {
        switch (event.which) {
        case 1:
        case 3: if (document.pointerLockElement === stage ||
            document.mozPointerLockElement === stage || webkitPointerLockElement === stage) {
            var target = document.elementsFromPoint(center.x, center.y)[1];
           
            target.dispatchEvent(new Event('click'));
        }
        }
    };
    
    document.body.addEventListener("mousedown", onMouseDown, true);
}


/* MOUSEMOVE BEHAVIOUR */




function turn(event) {
    if(lights.length != 0) {
    var current_x = lights[0][0].style["-webkit-transform"].split(/translateX/)[1].split(/[(px)]/)[1];
    var current_y = lights[0][0].style["-webkit-transform"].split(/translateY/)[1].split(/[(px)]/)[1];
    var current_z = lights[0][0].style["-webkit-transform"].split(/translateZ/)[1].split(/[(px)]/)[1];
    }
    var current_content_y = content.style["-webkit-transform"].split(/translateY/)[1].split(/[(px)]/)[1];
    var current_content_rx = content.style["-webkit-transform"].split(/rotateX/)[1].split(/[(deg)]/)[1];
    x += event.movementX;
    if (y + event.movementY*(-1) < 250 && y + event.movementY*(-1) > -250) {
        y += event.movementY*(-1);
    }
    content.style["-webkit-transform"] = "translateX(0px) translateY(" + current_content_y + "px) translateZ(1000px) rotateX(" + (y/4)  + "deg) rotateY(" + (x/4)  + "deg) rotateZ(0deg)";
    
    /* OLD CODE WITHOUT POINTER LOCK
    if(event.clientY > 100 && event.clientY < window.innerHeight - 100) {
        content.style["-webkit-transform"] = "translateX(0px) translateY(" + current_content_y + "px) translateZ(1000px) rotateX(" + ((-1)*(event.clientY - center.y)/5)  + "deg) rotateY(" + (event.clientX - center.x)/4  + "deg) rotateZ(0deg)";
    }
    */
   
    if(theme == "room") {
        var hover_target = document.elementsFromPoint(center.x, center.y)[1];
         debug_3d.innerHTML = hover_target.id;
        if ( hover_target.id == "flat_sheet2") {
            hover_target.classList.add("pickable_hover");
        }
        else {
            document.getElementById("flat_sheet2").classList.remove("pickable_hover");
        }
    }

    // MOTION BLUR
    
    stage.style["-webkit-filter"] = "blur(" + (event.movementX+event.movementY)/2 + "px)";
    window.setTimeout(function() {
        
            stage.style["-webkit-filter"] = "blur(0px)";
        
    }, 100);
        
        
        
        
    
        
    /* LIGHT CORRECTION */
    /*
    lights[0][0].style["-webkit-transform"] = "translateX(" + (current_x) + "px) " +
                                                                  "translateY(" + current_y + "px) " +
                                                                  "translateZ(" + current_z + "px) " +
                                                                  "rotateX(0deg) " +
                                                                  "rotateY(" + content.style["-webkit-transform"].split(/rotateY/)[1].split(/[(deg)]/)[1]*(-1) + "deg) " +
                                                                  "rotateZ(0deg) " +
                                                                  "skewX(0deg)";
    
    */
    /* LC END */
    
    
    
    
    /*DEBUG*/
    
    
    
    /*
    lights[0][0].style["-webkit-transform"] = "translateX(" + (event.clientX *2 - window.innerWidth) + "px) " +
                                                                  "translateZ(" + (event.clientY*3 - window.innerHeight*2) + "px) " +
                                                                  "translateY(" + current_y + "px) " +
                                                                  "rotateX(0deg) " +
                                                                  "rotateY(" + content.style["-webkit-transform"].split(/rotateY/)[1].split(/[(deg)]/)[1]*(-1) + "deg) " +
                                                                  "rotateZ(0deg)";
    apply_shadow("light_main", false);
    */
    /*
    debug_scroll.innerHTML = event.clientY;
    
     */   
}







/* REQUEST ANIMATION FRAME */

window.requestAnimFrame = (function(){
                    return  window.requestAnimationFrame       ||
                            window.webkitRequestAnimationFrame ||
                            window.mozRequestAnimationFrame    ||
                            function( callback ){
                              window.setTimeout(callback, 1000 / 60);
                            };
                  })();
                  
                  

                  function walk_left(){
                    left_steps = requestAnimFrame(walk_left);
                    walk("l");
                  };
                  
                  function walk_up(){
                    up_steps =  requestAnimFrame(walk_up);
                    walk("t");
                  };
                  
                  function walk_right(){
                    right_steps = requestAnimFrame(walk_right);
                    walk("r");
                  };
                  
                  function walk_down(){
                    down_steps = requestAnimFrame(walk_down);
                    walk("d");
                  };
                  function turn_left(){
                    turn_l = requestAnimFrame(turn_left);
                    key_turn("l");
                  }
                  function turn_right(){
                    turn_r = requestAnimFrame(turn_right);
                    key_turn("r");
                  }






/* KEYBOARD INPUT */



function keyboard_input(event) {
    
    switch(event.key) {
        case "a": 
        case "ArrowLeft": if(!walking_left) { (sidesteps == true) ? walk_left() : turn_left() }; walking_left = true; break; //left
        case "w": 
        case "ArrowUp": if(!walking_up) { walk_up(); }; walking_up = true; break; //up
        case "d": 
        case "ArrowRight": if(!walking_right) { (sidesteps == true) ? walk_right() : turn_right() }; walking_right = true; break; //right
        case "s": 
        case "ArrowDown": if(!walking_down) { walk_down(); }; walking_down = true; break; //down
        case "c": kneel(); break; //c
        case "0":
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
        case "9": toggleVisibility(event.key); break;
        case "l": lights[0][1] += 200; apply_shadow("light_main", false); break;
        case "k": lights[0][1] -= 200; apply_shadow("light_main", false); break;
        case "t": if(future_content_counter < 4)
                    {
                        document.getElementById("flat_future_content").childNodes[1].childNodes[future_content_counter].style.display ="block"; future_content_counter++;
                    }
            else {
                    document.getElementById("flat_future_features").childNodes[1].childNodes[future_content_counter-4].style.display ="block"; future_content_counter++;
                }; break;
        default: return;
    }
    
}

function keyboard_release(event) {
    switch(event.keyCode) {
        case 65: 
        case 37: window.cancelAnimationFrame(left_steps); window.cancelAnimationFrame(turn_l); walking_left = false; break; //left
        case 87: 
        case 38: window.cancelAnimationFrame(up_steps); walking_up = false; break; //up
        case 68: 
        case 39: window.cancelAnimationFrame(right_steps); window.cancelAnimationFrame(turn_r); walking_right = false; break; //right
        case 83: 
        case 40: window.cancelAnimationFrame(down_steps); walking_down = false; break; //down
        default: return;
        
    }
    
    
    /* DEBUG */
    //debug_keypress.innerHTML = "release " + event.keyCode;
}

function walk(dir) {
    
    var current_center_x = parseInt(content.childNodes[0].style["-webkit-transform"].split(/translateX/)[1].split(/[(px)]/)[1]);
    var current_center_z = parseInt(content.childNodes[0].style["-webkit-transform"].split(/translateZ/)[1].split(/[(px)]/)[1]);
    var current_content_ry = parseInt(content.style["-webkit-transform"].split(/rotateY/)[1].split(/[(deg)]/)[1]);
    var z = Math.cos(current_content_ry*Math.PI/180) * step;
    var x = -Math.sin(current_content_ry*Math.PI/180) * step;   
    switch(dir) {
        case "l":   var x = Math.cos(content.style["-webkit-transform"].split(/rotateY/)[1].split(/[(deg)]/)[1]*Math.PI/180) * step;
                    var z = Math.sin(content.style["-webkit-transform"].split(/rotateY/)[1].split(/[(deg)]/)[1]*Math.PI/180) * step;
                    break;
        case "t":   break;
        case "r":   var x = -Math.cos(content.style["-webkit-transform"].split(/rotateY/)[1].split(/[(deg)]/)[1]*Math.PI/180) * step;
                    var z = -Math.sin(content.style["-webkit-transform"].split(/rotateY/)[1].split(/[(deg)]/)[1]*Math.PI/180) * step;
                    break;
        case "d":   z *= -1; x *= -1; break;
    }
    
    // BLOCKED AREAS (MOVING WILL STOP) //
    
    if(current_center_x + parseInt(x) < 1000 && current_center_x + parseInt(x) > 350 && current_center_z + parseInt(z) < 850 && current_center_z + parseInt(z) > 150) { return; }; //couch1&2 and table
    if(current_center_x + parseInt(x) < 300 && current_center_x + parseInt(x) > 100 && current_center_z + parseInt(z) < 1000 && current_center_z + parseInt(z) > 750) { return; }; //lamp
    
    // END BLOCKED AREAS //
    
    if(current_center_x + parseInt(x) < 850 && current_center_x + parseInt(x) > -850 && current_center_z + parseInt(z) < 850 && current_center_z + parseInt(z) > -850) {
        for(var objs = 0; objs < content.childNodes.length; objs ++) {
            
            
            var current_x = parseInt(content.childNodes[objs].style["-webkit-transform"].split(/translateX/)[1].split(/[(px)]/)[1]);
            var current_y = parseInt(content.childNodes[objs].style["-webkit-transform"].split(/translateY/)[1].split(/[(px)]/)[1]);
            var current_z = parseInt(content.childNodes[objs].style["-webkit-transform"].split(/translateZ/)[1].split(/[(px)]/)[1]);
            var current_rx = parseInt(content.childNodes[objs].style["-webkit-transform"].split(/rotateX/)[1].split(/[(deg)]/)[1]);
            var current_ry = parseInt(content.childNodes[objs].style["-webkit-transform"].split(/rotateY/)[1].split(/[(deg)]/)[1]);
            var current_rz = parseInt(content.childNodes[objs].style["-webkit-transform"].split(/rotateZ/)[1].split(/[(deg)]/)[1]);
            var current_sx = parseInt(content.childNodes[objs].style["-webkit-transform"].split(/skewX/)[1].split(/[(deg)]/)[1]);
            var current_dist = Math.sqrt(Math.pow(current_x, 2) + Math.pow(current_z, 2));
            
            content.childNodes[objs].style["-webkit-transform"] =   "translateX(" + (current_x + parseInt(x)) + "px) " +
                                                                    "translateY(" + (current_y) + "px) " +
                                                                    "translateZ(" + (current_z + parseInt(z)) + "px) " +
                                                                    "rotateX(" + (current_rx) + "deg) " +
                                                                    "rotateY(" + (current_ry) + "deg) " +
                                                                    "rotateZ(" + (current_rz) + "deg) " +
                                                                    "skewX(" + (current_sx) + "deg)";
            
            
            
            
        }
        
       
    }
    
    
    // HINT AREAS (HINT WILL POP UP WHEN VISITOR IS INSIDE) //
    
    if(current_center_x + parseInt(x) < 1000 && current_center_x + parseInt(x) > 200 && current_center_z + parseInt(z) < 350 && current_center_z + parseInt(z) > 50) { /*hint("group_couch2";*/ }; //couch2
    if(current_center_x + parseInt(x) < 400 && current_center_x + parseInt(x) > 0 && current_center_z + parseInt(z) < 1000 && current_center_z + parseInt(z) > 650) { /*return;*/ }; //lamp
    
    // END HINT AREAS //
    
    
   
    
    
    
     /* DEBUG */
     
}

function key_turn(dir) {
    turn_vel = (dir == "r") ? 1 : (-1);
    var current_content_ry = parseInt(content.style["-webkit-transform"].split(/rotateY/)[1].split(/[(deg)]/)[1]);
    var current_content_y = parseInt(content.style["-webkit-transform"].split(/translateY/)[1].split(/[(deg)]/)[1]);
    
    content.style["-webkit-transform"] =    "translateX(0px) " +
                                            "translateY(" + current_content_y + "px) " +
                                            "translateZ(1000px) " +
                                            "rotateX(-20deg) " +
                                            "rotateY(" + (current_content_ry + turn_vel) + "deg) " +
                                            "rotateZ(0deg) " +
                                            "skewX(0deg)";
                                            
                                          
}





/* ANIMATIONS */
var store_transition;
function animate_move(element, duration_s, easing, x, y, z, rx, ry, rz, update_shadow) {
    clearInterval(left_steps);
    clearInterval(up_steps);
    clearInterval(right_steps);
    clearInterval(down_steps);
    window.removeEventListener("keydown", keyboard_input);
    window.removeEventListener("mousemove", turn);
    store_transition = document.getElementById(element).style["-webkit-transition"];
    document.getElementById(element).style["-webkit-transition"] = "-webkit-transform " + duration_s + "s " + easing;
    move(element, x, y, z, rx, ry, rz);

    window.setTimeout(function() {
        document.getElementById(element).style["-webkit-transition"] = store_transition;
        window.addEventListener("keydown", keyboard_input);
        window.addEventListener("mousemove", turn);
        
        }, duration_s*1000);
    
    if (update_shadow) {
        
        
        for(var g = 0; g < document.getElementById(element).childNodes.length; g++) {
            
            document.getElementById(document.getElementById(element).childNodes[g].id + "_shader_top").style["-webkit-transition"] = "all " + duration_s + "s ease-in-out";
            document.getElementById(document.getElementById(element).childNodes[g].id + "_shader_bottom").style["-webkit-transition"] = "all " + duration_s + "s ease-in-out";
            document.getElementById(document.getElementById(element).childNodes[g].id + "_shader_front").style["-webkit-transition"] = "all " + duration_s + "s ease-in-out";
            document.getElementById(document.getElementById(element).childNodes[g].id + "_shader_back").style["-webkit-transition"] = "all " + duration_s + "s ease-in-out";
            document.getElementById(document.getElementById(element).childNodes[g].id + "_shader_left").style["-webkit-transition"] = "all " + duration_s + "s ease-in-out";
            document.getElementById(document.getElementById(element).childNodes[g].id + "_shader_right").style["-webkit-transition"] = "all " + duration_s + "s ease-in-out";
        }
        
        apply_shadow("light_main", false);
        
    }
}


function kneel() {
    clearInterval(left_steps);
    clearInterval(up_steps);
    clearInterval(right_steps);
    clearInterval(down_steps);
    window.removeEventListener("keydown", keyboard_input);
    window.setTimeout(function() { window.addEventListener("keydown", keyboard_input) }, 500);
    
    for(var objs = 0; objs < content.childNodes.length; objs ++) {
        content.childNodes[objs].style["-webkit-transition"] = "-webkit-transform 0.5s ease-in-out";
        window.setTimeout(function() { for(var objects = 0; objects < content.childNodes.length; objects ++) {content.childNodes[objects].style["-webkit-transition"] = "all 0s";}}, 500);
        var current_x = parseInt(content.childNodes[objs].style["-webkit-transform"].split(/translateX/)[1].split(/[(px)]/)[1]);
        var current_y = parseInt(content.childNodes[objs].style["-webkit-transform"].split(/translateY/)[1].split(/[(px)]/)[1]);
        var current_z = parseInt(content.childNodes[objs].style["-webkit-transform"].split(/translateZ/)[1].split(/[(px)]/)[1]);
        var current_rx = parseInt(content.childNodes[objs].style["-webkit-transform"].split(/rotateX/)[1].split(/[(deg)]/)[1]);
        var current_ry = parseInt(content.childNodes[objs].style["-webkit-transform"].split(/rotateY/)[1].split(/[(deg)]/)[1]);
        var current_rz = parseInt(content.childNodes[objs].style["-webkit-transform"].split(/rotateZ/)[1].split(/[(deg)]/)[1]);
        var current_sx = parseInt(content.childNodes[objs].style["-webkit-transform"].split(/skewX/)[1].split(/[(deg)]/)[1]);
        
        if (kneeling) {
            content.childNodes[objs].style["-webkit-transform"] =   "translateX(" + (current_x) + "px) " +
                                                                    "translateY(" + ((current_rx != 180) ? (current_y + 200) : (current_y - 200)) + "px) " +
                                                                    "translateZ(" + (current_z) + "px) " +
                                                                    "rotateX(" + (current_rx) + "deg) " +
                                                                    "rotateY(" + (current_ry) + "deg) " +
                                                                    "rotateZ(" + (current_rz) + "deg) " +
                                                                    "skewX(" + (current_sx) + "deg)";
                                                                    
        }
        else {  
            content.childNodes[objs].style["-webkit-transform"] =   "translateX(" + (current_x) + "px) " +
                                                                    "translateY(" + ((current_rx != 180) ? (current_y - 200) : (current_y + 200)) + "px) " +
                                                                    "translateZ(" + (current_z) + "px) " +
                                                                    "rotateX(" + (current_rx) + "deg) " +
                                                                    "rotateY(" + (current_ry) + "deg) " +
                                                                    "rotateZ(" + (current_rz) + "deg) " +
                                                                    "skewX(" + (current_sx) + "deg)"; 
        }
        
    }
    
    if (kneeling) {
        kneeling = false;
        step = 10;
    }
    else {
        kneeling = true;
        step = 5;
    }
    
    
}


function goto_section(section) {
    if (!document.getElementById(section).checked) {
        window.removeEventListener("mousemove", turn);
        if (!!window.DeviceMotionEvent) {
            window.removeEventListener("devicemotion", handleMotion);
        }
        content.style["-webkit-transition"] = "all 3s ease-in-out";
        stage.style["-webkit-transition"] = "all 2s ease-in-out";
        $("#stage").css("-webkit-filter", "blur(1.7px)");
        
        for(var objs = 0; objs < content.childNodes.length; objs ++) {
            content.childNodes[objs].style["-webkit-transition"] = "all 2s 0.5s ease-in-out";
            
            
            var current_x = parseInt(content.childNodes[objs].style["-webkit-transform"].split(/translateX/)[1].split(/[(px)]/)[1]);
            var current_y = parseInt(content.childNodes[objs].style["-webkit-transform"].split(/translateY/)[1].split(/[(px)]/)[1]);
            var current_z = parseInt(content.childNodes[objs].style["-webkit-transform"].split(/translateZ/)[1].split(/[(px)]/)[1]);
            var current_rx = parseInt(content.childNodes[objs].style["-webkit-transform"].split(/rotateX/)[1].split(/[(deg)]/)[1]);
            var current_ry = parseInt(content.childNodes[objs].style["-webkit-transform"].split(/rotateY/)[1].split(/[(deg)]/)[1]);
            var current_rz = parseInt(content.childNodes[objs].style["-webkit-transform"].split(/rotateZ/)[1].split(/[(deg)]/)[1]);
            var current_sx = parseInt(content.childNodes[objs].style["-webkit-transform"].split(/skewX/)[1].split(/[(deg)]/)[1]);
            switch(section) {
                case "home": content.childNodes[objs].style["-webkit-transform"] = "translateX(" + (current_x + parseInt(0)) + "px) " +
                                                                                    "translateY(" + (current_y) + "px) " +
                                                                                    "translateZ(" + (current_z + parseInt(-350)) + "px) " +
                                                                                    "rotateX(" + (current_rx) + "deg) " +
                                                                                    "rotateY(" + (current_ry) + "deg) " +
                                                                                    "rotateZ(" + (current_rz) + "deg) " +
                                                                                    "skewX(" + (current_sx) + "deg)";
                                                                                    
                             content.style["-webkit-transform"] =  "translateX(" + (0) + "px) " +
                                                                    "translateY(" + (0) + "px) " +
                                                                    "translateZ(" + (1000) + "px) " +
                                                                    "rotateX(" + (0) + "deg) " +
                                                                    "rotateY(" + (0) + "deg) " +
                                                                    "rotateZ(" + (0) + "deg) ";
                             break;
                case "music": content.childNodes[objs].style["-webkit-transform"] = "translateX(" + (current_x + parseInt(0)) + "px) " +
                                                                                    "translateY(" + (current_y) + "px) " +
                                                                                    "translateZ(" + (current_z + parseInt(350)) + "px) " +
                                                                                    "rotateX(" + (current_rx) + "deg) " +
                                                                                    "rotateY(" + (current_ry) + "deg) " +
                                                                                    "rotateZ(" + (current_rz) + "deg) " +
                                                                                    "skewX(" + (current_sx) + "deg)";
                                                                                    
                              content.style["-webkit-transform"] =  "translateX(" + (0) + "px) " +
                                                                    "translateY(" + (0) + "px) " +
                                                                    "translateZ(" + (1000) + "px) " +
                                                                    "rotateX(" + (-20) + "deg) " +
                                                                    "rotateY(" + (-70) + "deg) " +
                                                                    "rotateZ(" + (0) + "deg) ";
                              break;
                default: break;
            }
        }
        window.setTimeout(function() { content.style["-webkit-transition"] = "all 0s"; stage.style["-webkit-transition"] = "all 0s"; window.addEventListener("mousemove", turn); window.addEventListener("devicemotion", handleMotion, true); }, 4000);
        window.setTimeout(function() { for(var f = 4; f < content.childNodes.length; f++) { content.childNodes[f].style["-webkit-transition"] = "all 0s"; } $("#stage").css("-webkit-filter", "blur(0px)"); }, 2000);
    }
}





function add_to_inventory(object) {
    var inventory_box = document.getElementById("inventory_box");
    var inventory = document.getElementById("inventory");
    var pick_up = document.getElementById(object);
    
    if (pick_up.parentNode.id == "inventory") {
        inv_enlarge(pick_up.id);
    }
    else {
        inventory.appendChild(pick_up);
        pick_up.style["-webkit-transform"] = null;
        pick_up.style["left"] = null;
        pick_up.style["bottom"] = null;
        pick_up.style["position"] = "relative";
        pick_up.style["display"] = "inline-block";
        pick_up.style.width = null;
        pick_up.style.height = null;
        pick_up.setAttribute("class", "inv_small");
    }
    if(inventory.childNodes.length != 0) {
        inventory_box.style["display"] = "block";
    }
    
}

function inv_enlarge(object) {
    var big = document.getElementById(object);
    document.getElementById("page_content").appendChild(big);
    big.setAttribute("class", "inv_big");
    
}

/* Presentation FH */



function toggleVisibility(keycode) {

switch(keycode) {
    case "1": if(one_on){    /* BASIC GEOMETRY */
            document.getElementById("x_axis").style.display = "none";
            document.getElementById("y_axis").style.display = "none";
            document.getElementById("z_axis").style.display = "none";
            one_on = false; break}
        else {
            document.getElementById("x_axis").style.display = "block";
            document.getElementById("y_axis").style.display = "block";
            document.getElementById("z_axis").style.display = "block";
            one_on = true;  break; }
    case "3": if(two_on){    /* ROOM */
            document.getElementById("group_wall_front").style.display = "none";
            document.getElementById("flat_wall_left").style.display = "none";
            document.getElementById("flat_wall_back").style.display = "none";
            document.getElementById("flat_wall_right").style.display = "none";
            document.getElementById("flat_ceiling").style.display = "none";
            document.getElementById("flat_floor").style.display = "none";
            document.getElementById("flat_baseboard_left").style.display = "none";
            document.getElementById("flat_baseboard_right").style.display = "none";
            document.getElementById("flat_baseboard_front").style.display = "none";
            document.getElementById("flat_baseboard_back").style.display = "none";
            two_on = false; break}
        else {
            document.getElementById("group_wall_front").style.display = "block";
            document.getElementById("flat_wall_left").style.display = "block";
            document.getElementById("flat_wall_back").style.display = "block";
            document.getElementById("flat_wall_right").style.display = "block";
            document.getElementById("flat_ceiling").style.display = "block";
            document.getElementById("flat_floor").style.display = "block";
            document.getElementById("flat_baseboard_left").style.display = "block";
            document.getElementById("flat_baseboard_right").style.display = "block";
            document.getElementById("flat_baseboard_front").style.display = "block";
            document.getElementById("flat_baseboard_back").style.display = "block";
            two_on = true; break}
    case "2": if(three_on) { /* CARPET */
            document.getElementById("flat_carpet").style.display = "none";
            three_on = false; break}
        else {
            document.getElementById("flat_carpet").style.display = "block";
            three_on = true; break}  
    case "4": if(four_on) {  /* WINDOWS */
            document.getElementById("group_window1").style.display = "none";
            document.getElementById("group_window2").style.display = "none";
            document.getElementById("flat_curtain1").style.display = "none";
            document.getElementById("flat_curtain2").style.display = "none";
            document.getElementById("flat_curtain3").style.display = "none";
            document.getElementById("flat_curtain4").style.display = "none";
            document.getElementById("flat_night").style.display = "none";
            document.getElementById("tube_curtain_rail1").style.display = "none";
            document.getElementById("tube_curtain_rail2").style.display = "none";
            four_on = false; break}
        else {
            document.getElementById("group_window1").style.display = "block";
            document.getElementById("group_window2").style.display = "block";
            document.getElementById("flat_curtain1").style.display = "block";
            document.getElementById("flat_curtain2").style.display = "block";
            document.getElementById("flat_curtain3").style.display = "block";
            document.getElementById("flat_curtain4").style.display = "block";
            document.getElementById("flat_night").style.display = "block";
            document.getElementById("tube_curtain_rail1").style.display = "block";
            document.getElementById("tube_curtain_rail2").style.display = "block";
            four_on = true; break} 
    case "5": switch(five_display_counter) {    /* COUCHES, LEDZEP AND TABLE */
            case 6: document.getElementById("group_couch").style.display = "none";
                    document.getElementById("group_couch2").style.display = "none";
                    document.getElementById("group_table2").style.display = "none";
                    document.getElementById("flat_ledzep").style.display = "none";
                    document.getElementById("tube_ashtray").style.display = "none";
                    document.getElementById("tube_cup").style.display = "none";
                    document.getElementById("block_cigarette").style.display = "none";
                    document.getElementById("flat_smoke").style.display = "none";
                    document.getElementById("flat_sheet1").style.display = "none";
                    document.getElementById("flat_sheet2").style.display = "none";
                    document.getElementById("tube_seat1").style.display = "none";
                    document.getElementById("block_spot_ledzep").style.display = "none"; five_display_counter = 1; break;
            case 1: document.getElementById("group_couch").style.display = "block"; five_display_counter++; break;
            case 2: document.getElementById("group_couch2").style.display = "block"; five_display_counter++; break;
            case 3: document.getElementById("group_table2").style.display = "block"; 
                    document.getElementById("tube_seat1").style.display = "block"; five_display_counter++; break;
            case 4: document.getElementById("flat_ledzep").style.display = "block";
                    document.getElementById("block_spot_ledzep").style.display = "block"; five_display_counter++; break;
            case 5: document.getElementById("tube_ashtray").style.display = "block";
                    document.getElementById("tube_cup").style.display = "block";
                    document.getElementById("flat_sheet1").style.display = "block";
                    document.getElementById("flat_sheet2").style.display = "block";
                    document.getElementById("block_cigarette").style.display = "block";
                    document.getElementById("flat_smoke").style.display = "block"; five_display_counter++; break;
            }  
            break;
    case "6": if(six_on) { /* KAMIN */
            document.getElementById("group_kamin").style.display = "none";
            document.getElementById("flat_fireplace_floor").style.display = "none";
            document.getElementById("block_bookshelf").style.display = "none";
            document.getElementById("block_bookshelf2").style.display = "none";
            document.getElementById("block_books").style.display = "none";
            document.getElementById("block_books2").style.display = "none";
            document.getElementById("flat_fire").style.display = "none"; six_on = false; break;
            }
        else {
            document.getElementById("group_kamin").style.display = "block";
            document.getElementById("flat_fireplace_floor").style.display = "block";
            document.getElementById("block_bookshelf").style.display = "block";
            document.getElementById("block_bookshelf2").style.display = "block";
            document.getElementById("block_books").style.display = "block";
            document.getElementById("block_books2").style.display = "block";
            document.getElementById("flat_fire").style.display = "block"; six_on = true; break;
        }
    case "7":
        switch(seven_display_counter) {
            case 1: document.getElementById("block_stage_base").style.display = "block"; seven_display_counter++; break;
            case 2: document.getElementById("block_monitor1").style.display = "block";
                    document.getElementById("block_monitor2").style.display = "block"; seven_display_counter++; break;
            case 3: document.getElementById("group_microphone").style.display = "block"; seven_display_counter++; break;
            case 4: document.getElementById("group_spot1").style.display = "block";
                    document.getElementById("group_spot2").style.display = "block";
                    document.getElementById("group_spot3").style.display = "block"; seven_display_counter++; break;
            case 5: document.getElementById("group_chair1").style.display = "block"; seven_display_counter++; break;
            case 6: document.getElementById("group_guitar").style.display = "block"; seven_display_counter++; break;
            case 7: document.getElementById("block_stage_base").style.display = "none";
                    document.getElementById("block_monitor1").style.display = "none";
                    document.getElementById("block_monitor2").style.display = "none";
                    document.getElementById("group_microphone").style.display = "none";
                    document.getElementById("group_spot1").style.display = "none";
                    document.getElementById("group_spot2").style.display = "none";
                    document.getElementById("group_spot3").style.display = "none";
                    document.getElementById("group_chair1").style.display = "none";
                    document.getElementById("group_guitar").style.display = "none";  seven_display_counter = 1; break;

        }
        break;
        
    
    case "8": if(eight_on) {  /* VIDEO */
    document.getElementById("video_danke_sogn").style.display = "none"; eight_on = false; break;
    }  
    else {
        document.getElementById("video_danke_sogn").style.display = "block"; eight_on = true; break;
    }
    case "9": if(nine_on) {  /* SHADERS */
        document.getElementById("group_lamp_front").style.display = "none";
        shaders_flat.forEach(element => {element[0].style.display = "none"; return;});
        shaders_block.forEach(element => {
            element[0].style.display = "none";
            element[1].style.display = "none";
            element[2].style.display = "none";
            element[3].style.display = "none";
            element[4].style.display = "none";
            element[5].style.display = "none";
            return;
            });
        nine_on = false; break }
    else {
        document.getElementById("group_lamp_front").style.display = "block";
        shaders_flat.forEach(element => {element[0].style.display = "block"; return});
        shaders_block.forEach(element => {
            element[0].style.display = "block";
            element[1].style.display = "block";
            element[2].style.display = "block";
            element[3].style.display = "block";
            element[4].style.display = "block";
            element[5].style.display = "block";
            return;
            });
        nine_on = true; break; }    
    case "0":  if(zero_on) {
        
        dropshadows.forEach(element => { element.style.display = "none";}); zero_on = false;
        document.getElementById("group_dropshadows_chair1").style.display = "none";
        document.getElementById("group_dropshadows_chair2").style.display = "none";
        document.getElementById("group_dropshadows_chair3").style.display = "none";
    } 
    else {
        
        dropshadows.forEach(element => { element.style.display = "block";}); zero_on = true;
        document.getElementById("group_dropshadows_chair1").style.display = "block";
        document.getElementById("group_dropshadows_chair2").style.display = "block";
        document.getElementById("group_dropshadows_chair3").style.display = "block";
    }
    break;
    
    }
    document.getElementById("debug_3d").innerHTML = seven_display_counter;
}








//  ACCELEROMETER FOR DEVICE TILT CONTROL

   
var Accelerometer = function() {
  var self = this;
  self.supported = false;
  var absolute = null,
      alpha = null,
      beta = null,
      gamma = null,
      acceleration = null,
      accelerationIncludingGravity = null,
      rotationRate = null,
      interval = null;
      
  self.getAlpha = function() {
    return (alpha !== null) ? alpha : 0;
  };
  self.getBeta = function() {
    return (beta !== null) ? beta : 0;
  };
  self.getGamma = function() {
    return (gamma !== null) ? gamma : 0;
  };
  self.getAcceleration = function() {
    return (acceleration !== null) ? acceleration : 0;
  };
  self.getAccelerationIncludingGravity = function() {
    return (accelerationIncludingGravity !== null) ? accelerationIncludingGravity : 0;
  };
  self.getRotationRate = function() {
    return (rotationRate !== null) ? rotationRate : 0;
  };
  self.getInterval = function() {
    return (interval !== null) ? interval : 0;
  };

  if (!!window.DeviceMotionEvent) {
    window.addEventListener("devicemotion", handleMotion, true);
    self.supported = true;
    // var device_int = window.setInterval(device_turn, 40);
    
  }
  if (!!window.DeviceOrientationEvent) {
    window.addEventListener("deviceorientation", handleOrientation, true);
    self.supported = true;
  }

  window.addEventListener("compassneedscalibration", function(event) {
    self.supported = true;
    alert('Your compass needs calibrating!');
    event.preventDefault();
  }, true);

  function handleOrientation(event) {
    absolute = event.absolute;
    alpha = event.alpha;
    beta = event.beta;
    gamma = event.gamma;
    
  }
  function handleMotion(event) {
    acceleration = accelerationIncludingGravity = rotationRate = {};
    acceleration.x = event.acceleration.x;
    acceleration.y = event.acceleration.y;
    acceleration.z = event.acceleration.z;
    accelerationIncludingGravity.x = event.accelerationIncludingGravity.x;
    accelerationIncludingGravity.y = event.accelerationIncludingGravity.y;
    accelerationIncludingGravity.z = event.accelerationIncludingGravity.z;
    rotationRate.alpha = event.rotationRate.alpha;
    rotationRate.beta = event.rotationRate.beta;
    rotationRate.gamma = event.rotationRate.gamma;
    interval = event.interval;
    device_ry = acceleration.y;
    device_turn(device_ry)
    
    
    // DEBUG
    
    
    debug_scroll.innerHTML =    "<p>Motion: <br>x: " + acceleration.x +
                                "<br>y: " + device_ry +
                                "<br>z: " + acceleration.z +
                                "<br>Including Gravity: <br>x: " + accelerationIncludingGravity.x +
                                "<br>y: " + accelerationIncludingGravity.y +
                                "<br>z: " + accelerationIncludingGravity.z +
                                "<br>Rotation: <br>alpha: " + rotationRate.alpha +
                                "<br>beta: " + rotationRate.beta +
                                "<br>gamma: " + rotationRate.gamma +
                                "<br>int: " + interval + "</p>";
                                
  }
};

// Accelerometer();


function device_turn(device_ry) {
    var current_content_y = content.style["-webkit-transform"].split(/translateY/)[1].split(/[(px)]/)[1];
    var current_content_ry = parseInt(content.style["-webkit-transform"].split(/rotateY/)[1].split(/[(deg)]/)[1]);
    
    debug_scroll.innerHTML = "synced: " + parseInt(device_ry);
    debug_3d.innerHTML = current_content_y + " " + current_content_ry + ", daher: " + content.style["-webkit-transform"];
    content.style["-webkit-transform"] = "translateX(0px) translateY(" + current_content_y + "px) translateZ(1000px) rotateX(-5deg) rotateY(" + parseInt(current_content_ry - device_ry) + "deg) rotateZ(0deg)";
    
    
}
