var curr_spot;
var spot_height;
var spot_width;
var bMobilized = new Boolean(false);

$(document).ready(function () {
    $(document).scroll(CheckScroll);
    $(window).resize(CheckScroll);
    CheckScroll();
    $("#li_Home").click(function(){ScrollToHere(0)});
    $("#li_About").click(function(){ScrollToHere(1)});
    $("#li_Dates").click(function(){ScrollToHere(4)});
    $("#li_Music").click(function(){ScrollToHere(5)});
    $("#li_Contact").click(function(){ScrollToHere(6)});
});

function CheckScroll(){
    if($(window).width() <= 675) {
        bMobilized = true;
    }
    else {
        bMobilized = false;
    }
    //finding out what should be done with the nav bar based on the
    //position of the scrolling
    if(!bMobilized) {
        if(curr_spot > spot_height - $("#nav_container").height()) {
            Scroll(false);
        }
        else {
            Scroll(true);
        }
    }
}

function Scroll(bFixed) {
    curr_spot = $(window).scrollTop();
    spot_height = $(window).height();
    spot_width = $(window).width();


    //if you're below the first article
    if (!bFixed){
        $("#nav_container").css({
            'position': 'fixed',
            'top': '0px',
            'z-index': 100
        });
        bFixed = true;
    }
    //if you're above the first article
    else if (bFixed){
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