var curr_spot;
var spot_height;
var spot_width;
var bMobilized = new Boolean(false);
var bFixed = new Boolean(true);

$(document).ready(function () {
    $(document).scroll(CheckScroll);
    $(window).resize(CheckResize);
    InitialState();
    CheckResize();
    $("#li_About").click(function(){ScrollToHere(1)});
    $("#li_Dates").click(function(){ScrollToHere(4)});
    $("#li_MusicMerch").click(function(){ScrollToHere(5)});
    $("#li_Contact").click(function(){ScrollToHere(6)});
});

function InitialState(){
    if(spot_width <= 700){
        bMobilized = true;
    }
    else{
        bMobilized = false;
    }
}

function GetDimensions(){
    curr_spot = $(window).scrollTop();
    spot_height = $(window).height();
    spot_width = $(window).width();
}

function CheckResize(){
    GetDimensions();

    if(curr_spot > spot_height - $("#nav_container").height()){
        bFixed = true;
        ChangeBoxSize(true);
    }
    else{
        bFixed = false;
        ChangeBoxSize(false);
    }

    if(!bMobilized && spot_width <= 700){
        bMobilized = true;
        Mobilize(true);
    }
    else if(bMobilized && spot_width > 700){
        bMobilized = false;
        Mobilize(false);
    }
}

function CheckScroll(){
    GetDimensions();

    if(!bFixed && curr_spot > spot_height - $("#nav_container").height()){
        bFixed = true;
        ChangeBoxSize(true);
    }
    else if (bFixed && curr_spot <= spot_height - $("#nav_container").height()){
        bFixed = false;
        ChangeBoxSize(false);
    }
}

function ChangeBoxSize(bFixIt) {
    GetDimensions();
    //if you're below the first article
    if (bFixIt){
        $("#nav_container").css({
            'position': 'fixed',
            'top': '0px',
            'z-index': 100
        });
        bFixIt = true;
    }
    //if you're above the first article
    else if (!bFixIt){
        $("#nav_container").css({
            'position': 'absolute',
            'bottom': 0 + '%',
            'top':spot_height - $("#nav_container").height() + 'px',
            'z-index': 100
        });
        bFixIt = false;
    }
}

function Mobilize(bMob) {
    if(bMob){
        $(".fader").animate({opacity: '0'}, 250,
            function(){$("#nav").animate({width:"0px"}, 250)}
        );
    }
    else{
        $("#nav").animate({width:"100%"}, 250,
            function(){$(".fader").animate({opacity: '1'}, 250)}
        );
    }
}

function Faders(){
    
}

function ScrollToHere(val){
    GetDimensions();
    var iTargetValue = val * spot_height;

    //$('html, body').animate({scrollTop: iTargetValue}, 1000);
    $('html, body').animate({
        scrollTop: iTargetValue
    }, 1000, 'swing');
}