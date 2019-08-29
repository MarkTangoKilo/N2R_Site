var curr_spot;
var spot_height;
var spot_width;
var bMobilized = new Boolean(false);
var bFixed = new Boolean(true);
var bPastMain = new Boolean(true);
var bHiddenNavOpen = new Boolean(false);

$(document).ready(function () {
    $(document).scroll(CheckScroll);
    $(window).resize(CheckResize);
    InitialState();
    CheckResize();
    $("#logoButton").click(CheckSideBar);
    $("#li_About").click(function(){ScrollToHere(1)});
    $("#li_Dates").click(function(){ScrollToHere(4)});
    $("#li_MusicMerch").click(function(){ScrollToHere(5)});
    $("#li_Contact").click(function(){ScrollToHere(6)});
    CheckResize();
});

function InitialState(){
    GetDimensions();
    if(spot_width <= 700){
        bMobilized = false;
    }
    else{
        bMobilized = true;
    }
    bHiddenNavOpen = false;
}

function GetDimensions(){
    curr_spot = $(window).scrollTop();
    spot_height = $(window).height();
    spot_width = $(window).width();
    if(curr_spot > spot_height - $("#nav_container").height()){
        bPastMain = true;
    }
    else{
        bPastMain = false;
    }
}

function CheckResize(){
    GetDimensions();

    if(bPastMain){
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
    Faders();
    if(!bFixed && bPastMain){
        bFixed = true;
        ChangeBoxSize(true);
    }
    else if (bFixed && !bPastMain){
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

function CheckSideBar(){
    if(bMobilized && bHiddenNavOpen){
        ClickLogo(true);
    }
    else if(bMobilized && !bHiddenNavOpen){
        ClickLogo(false);
    }
    else{
        ClickLogo(true);
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
        ClickLogo(true);
    }
}

function Faders(){
    if(!bPastMain){
        var v = $("#nav").height()*curr_spot/spot_height;
        $("#topFader").height($("#nav").height() - v);
        $("#paddingBar").height($("#nav").height() - v);
        $("#botFader").height(v);
        
    }   
    else{
        $("#topFader").height(0);
        $("#paddingBar").height(0);
        $("#botFader").height($("#nav").height());
    }
}

function ScrollToHere(bShrink){
    GetDimensions();
    var iTargetValue = val * spot_height;

    $('html, body').animate({scrollTop: iTargetValue}, 1000);
    $('html, body').animate({
        scrollTop: iTargetValue
    }, 1000, 'swing');
}

function ClickLogo(bShrink){
    ///so why the fuck won't this work when I nest these functions???
    ///obviously it's race conditions, but... why...?
    if(bShrink){
        $(".li_item_hidden").fadeOut(500);
        $("#sidemenu").animate({width:'0'}, 500);
    }
    else{
        $("#sidemenu").animate({width:'200px'}, 500);
        $(".li_item_hidden").fadeIn(500);
    }
    bHiddenNavOpen = !bShrink;
}