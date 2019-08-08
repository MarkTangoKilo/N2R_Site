//value in pixels of where the user already is
var curr_spot;
//current height in pixels for window
var spot_height;
//current width in pixels for window
var spot_width;
//true when skinny browser or on mobile device
var bMobilized = new Boolean(false);
//true when the bar is fixed at the top
var bAlreadyFixed = new Boolean(false);
//minimum in width before bMobilized is changed
var iMinWindowSize = 700;

$(document).ready(function () {
    $(document).scroll(CheckScroll);
    $(window).resize(CheckResize);
    CheckResize();
    $("#li_Home").click(function(){ScrollToHere(0)});
    $("#li_About").click(function(){ScrollToHere(1)});
    $("#li_Dates").click(function(){ScrollToHere(4)});
    $("#li_Music").click(function(){ScrollToHere(5)});
    $("#li_Contact").click(function(){ScrollToHere(6)});
});

//checks to see what needs to be done after scrolling
function CheckScroll(){
    curr_spot = $(window).scrollTop();
    spot_height = $(window).height();
    spot_width = $(window).width();

    
    //check fader bars
    FaderBarCheck();
    
    //check to see if I need to get the page into mobile mode
    if(!bMobilized && $(window).width() <= iMinWindowSize){
        NavBarMode(true);
    }
    else if (bMobilized && $(window).width() > iMinWindowSize){
        NavBarMode(false);
    }

    //check to see if we need 
    if(!bAlreadyFixed && curr_spot > spot_height - $("#nav_container").height()) {
        NavBarPos(false);
    }
    else if(bAlreadyFixed && curr_spot <= spot_height - $("#nav_container").height()){
        NavBarPos(true);
    }
}

//checks to see what needs to be done on a window resize
function CheckResize(){
    curr_spot = $(window).scrollTop();
    spot_height = $(window).height();
    spot_width = $(window).width();

    //check fader bars
    FaderBarCheck();

    ///NAV BAR OR NAV SIDE WINDOW
    if($(window).width() <= iMinWindowSize) {
        NavBarMode(true);
    }
    else {
        NavBarMode(false);
    }

    //check to see if we need 
    if(curr_spot > spot_height - $("#nav_container").height()) {
        NavBarPos(false);
    }
    else {
        NavBarPos(true);
    }
}

//basically used for sticky nav bar function
function NavBarPos(bFixed) {
    //if you're below the first article
    if (!bFixed){
        $("#nav_container").css({
            'position': 'fixed',
            'top': '0px',
            'z-index': 100
        });
    }
    //if you're above the first article
    else if (bFixed){
        $("#nav_container").css({
            'position': 'absolute',
            'bottom': 0 + '%',
            'top':spot_height - $("#nav_container").height() + 'px',
            'z-index': 100
        });
    }
    bAlreadyFixed = !bFixed;
}

function FaderBarCheck(){
    //fader bar height
    if(curr_spot === 0){
        FaderSize(true);
    }
    else if(curr_spot < spot_height - $("#nav_container").height()) {
        FaderSize(false);
    }
    else {
        FaderSize(true);
    }
}

//will manipulate the height of the two faders
function FaderSize(bForce){
    //placeholder for the height value of the fader
    var y;

    //bForce represents if I want to bother calculating it or not
    if(!bForce){
        y = curr_spot * $(".faderHolder").height()/spot_height;
        $("#topfaderHolder").height(y);
        $("#botfaderHolder").height($(".faderHolder").height() - y);
    }
    else{
        if(curr_spot < spot_height){
            $("#topfaderHolder").height($(".faderHolder").height());
            $("#botfaderHolder").height(0);
        }
        else{
            $("#topfaderHolder").height(0);
            $("#botfaderHolder").height($(".faderHolder").height());
        }
    }
}
//will switch the bar between mobile mode and desktop mode
function NavBarMode(bMakeMobile){
    if(bMakeMobile) {
        //STEP 1:   shrink the two faders and make the text opacity go to zero

        //STEP 2:   jam the nav bar into the circle, and make something spin around it
        //          and make it burst out a bit and back in

        //STEP 3:   slide it up to the top of the screen and fix it there

        //STEP 4:   get a shine on the logo

    }
    else {
        //STEP 1:   bring it down to where it needs to be

        //STEP 2:   shoot out the navbar

        //STEP 3:   add sliders

    }
    bMobilized = !bMakeMobile;
}

//scrolls to a certain position
function ScrollToHere(val){
    spot_height = $(window).height();
    var iTargetValue = val * spot_height;

    //$('html, body').animate({scrollTop: iTargetValue}, 1000);
    $('html, body').animate({
        scrollTop: iTargetValue
    }, 1000, 'swing');
}