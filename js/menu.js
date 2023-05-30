var submenu_clicked;
var target_anchor;
var scroll_down = true;
var scroll_timer;
var scroll_speed = 10;
var dist;

function closeContent() {
    for(var closer = 0; closer < document.getElementsByClassName("contents").length; closer ++) {
        document.getElementsByClassName("contents")[closer].previousElementSibling.checked = false;
    }
}


function scrollToTop(what) {
    document.getElementById(what.htmlFor).nextElementSibling.scrollTop = 0;

}

function scrollToPressSubmenu(what) {
    submenu_clicked = what.id;
    if(document.getElementById("press").checked) {
    scroller();
    }
    else {
    document.getElementById("press").checked = true;
    window.setTimeout(scroller, 1700);
    }
}
    
function scroller() {
 /*   var press_kit_anchor = document.getElementById("press_kit_anchor").offsetTop;
    var demo_anchor = document.getElementById("demo_anchor").offsetTop;
    var photos_anchor = document.getElementById("photos_anchor").offsetTop;
    */
    var scroll_pos = document.getElementById("press_container").scrollTop;
    target_anchor = document.getElementById(submenu_clicked + "_anchor").offsetTop;
    
    dist = scroll_pos - target_anchor;
    
    
    if(dist > 0) {
        scroll_down = false;
    }
    else if(dist == 0) {
        return;
    }
    else {
        scroll_down = true;
    }
    
    scroll_timer = window.setInterval(scrollToAnchor, 1000/40);    
    
   


/* SCROLL WITHOUT ANIMATION
    switch(submenu_clicked) {
        case "press_kit": document.getElementById("press_container").scrollTop = document.getElementById("press_kit_anchor").offsetTop; break;
        case "demo": document.getElementById("press_container").scrollTop = document.getElementById("demo_anchor").offsetTop; break;
        case "photos": document.getElementById("press_container").scrollTop = document.getElementById("photos_anchor").offsetTop; break;
    }
    */
}


function scrollToAnchor() {
    var current_dist = Math.sqrt(Math.pow(document.getElementById("press_container").scrollTop - target_anchor, 2));
    /* document.getElementById("home_container").firstElementChild.innerHTML = current_dist; */
    if(current_dist > 10) {
        scroll_speed = current_dist/5;
    }
    else {
        scroll_speed = 5;
    }
    if(scroll_down) {
        
        if (document.getElementById("press_container").scrollTop + scroll_speed > target_anchor) {
            window.clearInterval(scroll_timer);
        }
        else {
            document.getElementById("press_container").scrollTop += scroll_speed;
        }
    }
    else {
    
        if (document.getElementById("press_container").scrollTop - scroll_speed < target_anchor) {
            window.clearInterval(scroll_timer);
            document.getElementById("press_container").scrollTop -= scroll_speed/2;
        }
        else {
            document.getElementById("press_container").scrollTop -= scroll_speed;
        }
    }
    
}