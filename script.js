var curr_spot;
var spot_height;
var spot_width;
var bFixed = new Boolean(false);
var bDoubleCheck = new Boolean(false);

$(document).ready(function () {
    $(document).scroll(CheckScroll);
    $(window).resize(CheckScroll);
    Scroll();
    $("#li_Home").click(function(){ScrollToHere(0)});
    $("#li_About").click(function(){ScrollToHere(1)});
    $("#li_Dates").click(function(){ScrollToHere(4)});
    $("#li_Music").click(function(){ScrollToHere(5)});
    $("#li_Merch").click(function(){ScrollToHere(6)});
});

function CheckScroll(){
    Scroll();
    bDoubleCheck = true;
    Scroll();
    bDoubleCheck = false;
}

function Scroll() {
    curr_spot = $(window).scrollTop();
    spot_height = $(window).height();
    spot_width = $(window).width();


    //if you're below the first article
    if (
        (!bFixed || bDoubleCheck) 
        && curr_spot > spot_height - $("#nav_container").height()
    ){
        $("#nav_container").css({
            'position': 'fixed',
            'top': '0px',
            'z-index': 100
        });
        bFixed = true;
    }
    //if you're above the first article
    else if (
        (bFixed || bDoubleCheck)
         && curr_spot <= spot_height - $("#nav_container").height()
    ){
        $("#nav_container").css({
            'position': 'absolute',
            'bottom': 0 + '%',
            'top':spot_height - $("#nav_container").height() + 'px',
            'z-index': 100
        });
        bFixed = false;
    }
}

function ScrollToHere(val){
    spot_height = $(window).height();
    var iTargetValue = val * spot_height;

    //$('html, body').animate({scrollTop: iTargetValue}, 1000);
    $('html, body').animate({
        scrollTop: iTargetValue
    }, 1000, 'swing');
}