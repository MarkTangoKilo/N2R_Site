
$(document).ready(function () {
    $(document).scroll(Scroll);
    Scroll();
});

function Scroll() {
    curr_spot = $(window).scrollTop();
    var opacityVal = 0.7 - curr_spot/(spot_height + curr_spot);
    //if you're below the first div
    if (curr_spot > spot_height - $("#NextPage_div_container").height()
    ) {
        $("#NextPage_div_container").css({
            'position': 'fixed',
            'top': '0px',
            'width': spot_width + 'px'
        });
    }
    //if you're above the first dive
    else {
        $("#NextPage_div_container").css({
            'width': spot_width + 'px',
            'position': 'absolute',
            'bottom': 0 + '%',
            'top':spot_height - $("#NextPage_div_container").height() + 'px'
        });
    }
    $("#NextPage_div_throwshade2").css({
        'opacity': opacityVal
    });
}

function ScrollToHere(val){
    var iTargetValue = val * spot_height;
    var iCurrentValue = $(window).scrollTop();
    var iMoveRate = 0.1;

    //$('html, body').animate({scrollTop: iTargetValue}, 1000);
    $('html, body').animate({
        scrollTop: iTargetValue
    }, 1000, 'swing');
}