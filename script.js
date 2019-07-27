var curr_spot;
var spot_height;
var spot_width;

$(document).ready(function () {
    $(window).resize(Scroll);
    $(document).scroll(Scroll);
    Scroll();
    $("#nav_Home").click(function(){ScrollToHere(0)});
    $("#nav_About").click(function(){ScrollToHere(1)});
    $("#nav_Dates").click(function(){ScrollToHere(4)});
    $("#nav_Music").click(function(){ScrollToHere(5)});
    $("#nav_Merch").click(function(){ScrollToHere(6)});
});

function Scroll() {
    curr_spot = $(window).scrollTop();
    spot_height = $(window).height();
    spot_width = $(window).width();
    var opacityVal = 0.7 - curr_spot/(spot_height + curr_spot);


    //if you're below the first article
    if (curr_spot > spot_height - $("#nav_container").height()) {
        $("#nav_container").css({
            'position': 'fixed',
            'top': '0px',
            'width': spot_width + 'px',
            'z-index': 100
        });
    }
    //if you're above the first article
    else {
        $("#nav_container").css({
            'width': spot_width + 'px',
            'position': 'absolute',
            'bottom': 0 + '%',
            'top':spot_height - $("#nav_container").height() + 'px',
            'z-index': 100
        });
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