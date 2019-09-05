//current dimensions of the page
var curr_spot;
var spot_height;
var spot_width;
//booleans dealing with current state of the js
var bMobile = new Boolean(false);
var bPastMain = new Boolean(true);
var bHiddenNavOpen = new Boolean(false);
//booleans dealing with current state of the page
var bFixed = new Boolean(true);
var bMobilized = new Boolean(true);


$(document).ready(function () {
    $(document).scroll(CheckScroll);
    $(window).resize(CheckResize);
    $(".downArrows").click(function(){ScrollToHere(1)});
    $("#logoButton").click(CheckSideBar);
    $("#view").click(CloseSideBar);
    $("#li_About").click(function(){ScrollToHere(1)});
    $("#li_Dates").click(function(){ScrollToHere(4)});
    $("#li_MusicMerch").click(function(){ScrollToHere(5)});
    $("#li_Contact").click(function(){ScrollToHere(6)});
    $("#li_About_hidden").click(function(){ScrollToHere(1)});
    $("#li_Dates_hidden").click(function(){ScrollToHere(4)});
    $("#li_MusicMerch_hidden").click(function(){ScrollToHere(5)});
    $("#li_Contact_hidden").click(function(){ScrollToHere(6)});
    CheckResize(false);
});

/* ALL OF THE CHECKS */
function GetDimensions(){
    //dimensions
    curr_spot = $(window).scrollTop();
    spot_height = $(window).height();
    spot_width = $(window).width();
    
    bPastMain = curr_spot > spot_height - $("#nav_container").height() ? true : false;
    bMobile = spot_width < 700 ? true : false;
    bHiddenNavOpen = $("#sidemenu").width() > 0 ? true : false;
    //basic methods
    LogoFade(bPastMain);
    Faders();
}

function CheckResize(bCheck = true){
    GetDimensions();

    if(bMobile && (bCheck ? !bMobilized : true)){
        Mobilize(bMobilized = true);
    }
    else if(!bMobile && (bCheck ? bMobilized : true)){
        Mobilize(bMobilized = false);
    }

    if(!bMobile){
        if(bPastMain && (bCheck ? !bFixed : true)){
            ChangeBoxSize(bFixed = true);
        }
        else if(!bPastMain){
            ChangeBoxSize(bFixed = false);
        }
    }
}

function CheckScroll(){
    GetDimensions();

    if(bPastMain && !bFixed){
        ChangeBoxSize(bFixed = true);
    }
    else if(!bPastMain){
        ChangeBoxSize(bFixed = false);
    }
}

function CheckSideBar(){
    GetDimensions();
    if(bMobile){
        if(!bHiddenNavOpen){
            ClickLogo(false);
        }
    }
    else{
        ScrollToHere(0);
    }
}


/* ALL OF THE BIG CHANGES */
function ChangeBoxSize(bFixIt) {
    $("#logoButton").css({'opactiy': 1});
    //if you're below the first article
    if (bFixIt){
        $("#nav_container").css({
            'top': '0px',
            'opacity':'1'
        });
        bFixIt = true;
    }
    //if you're above the first article
    else if (!bFixIt){
        $("#nav_container").css({
            'top': (spot_height - $("#nav_container").height() - curr_spot) + 'px',
            'opacity': curr_spot/spot_height
        });
        bFixIt = false;
    }
    
}

function Mobilize(bMob) {
    if(bMob){
        $(".fader").animate({opacity: '0'}, 150,
            function(){
                $("#nav").animate({width:"0px"}, 150,
                function(){
                    $("#nav_container").animate({top:0}, 150)
        })});
    }
    else{
        $("#nav_container").animate({bottom:0}, 150, 
            function(){
                $("#nav").animate({width:"100%"}, 250,
                function(){
                    $(".fader").animate({opacity: '1'}, 250)}
        );});
        ClickLogo(true);
    }
}

/* ALL OF THE NAV BAR CHANGES */
function Faders(){
    if(!bPastMain){
        var v = $("#nav").height()*curr_spot/spot_height * 2;
        $("#topFader").height(($("#nav").height()) * 2 - v);
        $("#botFader").height(v);
        
    }   
    else{
        $("#topFader").height(0);
        $("#botFader").height($("#nav").height() * 2);
    }
}

function LogoFade(bFixIt){
    if(bFixIt){
        $("#logoButton").css({ 'opacity': 1 });
    }
    else{
        $("#logoButton").css({ 'opacity': curr_spot/spot_height});
    }
}

function ClickLogo(bShrink){
    ///so why the fuck won't this work when I nest these functions???
    ///obviously it's race conditions, but... why...?
    ///ALSO if I cut things off and have a circle too big, I get some REALLY cool effects
    if(bShrink){
        $(".li_item_hidden").fadeOut(500);
        $("#sidemenu").animate({width:'0'}, 500);
        $("#logoButton").animate({left:'0', height:'150px', width:'150px'}, 500,
        function(){
            bHiddenNavOpen = !bShrink;});
    }
    else{
        $("#sidemenu").animate({width:'200px'}, 500);
        $("#logoButton").animate({left:'200px', height:'50px', width:'50px'}, 500);
        $(".li_item_hidden").fadeIn(500, function(){
            bHiddenNavOpen = !bShrink;});
    }
}

function CloseSideBar(){
    if(bHiddenNavOpen){
        ClickLogo(true);
    }
}

/* ACCESSORY METHODS */
function ScrollToHere(val){
    GetDimensions();
    var iTargetValue = val * spot_height;

    $('html, body').animate({scrollTop: iTargetValue}, 1000);
    $('html, body').animate({
        scrollTop: iTargetValue
    }, 1000, 'swing');
}
/*background-color: rgba(171, 185, 192, 1)*/
/*background-color: rgba(50, 78, 95, 1)*/