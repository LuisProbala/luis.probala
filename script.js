// MAP FUNCTION
function map(value, low1, high1, low2, high2) {
    return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
};


// ABOUT HOVER ALL LI ANIMATION AFTER TIME
$(document).mousemove(function() {
    $('.list li').each(function(index) {
        $(this).delay(5*index).queue(function(){
            $(this).addClass('hover');
        });
    });
});


// ADD FIGCATPION LINK THE CLASS "BUZZ"
$(document).ready(function() {
    $("figcaption a").addClass("buzz");
    $(".facts li a").addClass("buzz");
});


// COPY PASTE PROJECLIST TITLE
$(document).ready(function() {
    $("h2").each(function() {
        $(this).clone().insertAfter(this);
    });
});

// SET FONT SIZE & LINE HEIGHT
$(document).ready(fontsize);
$(window).resize(fontsize);

function fontsize() {
    var margin = parseInt($('main').css('margin-top')) * 2;
    var percent = 1 - map(margin, 0, $(window).width(), 0, 1);
    $("[data-size]").each(function() {
        var size = $(this).data('size') * percent;
        $(this).css('font-size', size + 'vw');
        $(this).css('line-height', size + 'vw');
    });
};

// MOUSE MOVE 
$("html").mousemove(function(event) {
    var swidth = $(window).width();
    var cursorX = event.pageX;
    var transX = Math.round(map(cursorX, 0, swidth, -53, 100));
    var transY = -50;
    $('.projectlist li figure').css({
        '-webkit-transform': 'translate( ' + transX + '%, ' + transY + '% )',
        '-moz-transform': 'translate( ' + transX + '%, ' + transY + '% )',
        '-ms-transform': 'translate( ' + transX + '%, ' + transY + '% )',
        '-o-transform': 'translate( ' + transX + '%, ' + transY + '% )',
        'transform': 'translate( ' + transX + '%, ' + transY + '% )',
    });
});

// LIST ADD MORE
$(document).ready(function() {
    $(".listaddmore").each(function() {
        if ( $(this).find("ul li").length > 15 ) {
             $(this).find("ul").append('<li><a href="#" class="buzz more">read more</a></li>');

            $(this).find(".more").click(function(event) {
                event.preventDefault();
                if($(this).parents(".listaddmore").hasClass("expand") ) {
                    $(this).parents(".listaddmore").removeClass("expand");
                    $(this).html("read more");
                    $(this).parents(".listaddmore").css("background", "none");
                } else {
                    $(this).parents(".listaddmore").addClass("expand");
                    $(this).html("read less");
                }
            });
        }
    });
});






//Slideshow
$(document).ready(slideshow);
$(window).resize(slideshow);
$(document).mousemove(slideshow);

$(".slider").wrapInner("<div class='sliderholder'></div>");

function slideshow(e) {
    $(".slider").each(function() {

        var imgnum = $(this).find("figure").length;
        var imgwidth = $(this).find("figure").width();
        var margin = parseInt($('main').css('margin-top'));
        var sliderholderwidth = (imgnum * imgwidth) + ((imgnum - 1) * margin) + 2;
        $(this).width(sliderholderwidth + "px");

        var swidth = $(window).width();
        if (swidth > 700) {
            var cursorX = e.pageX || swidth / 3;
            //console.log(cursorX);
            var transXmax = sliderholderwidth - swidth + (2 * margin);
            var transX = -map(cursorX, 0, swidth, 0, transXmax);
            $(this).css({
                '-webkit-transform': 'translate( ' + transX + 'px )',
                '-moz-transform': 'translate( ' + transX + 'px )',
                '-ms-transform': 'translate( ' + transX + 'px )',
                '-o-transform': 'translate( ' + transX + 'px )',
                'transform': 'translate( ' + transX + 'px  )',
            });
        };
    });

};


// LAZY LOAD VIDEOS
document.addEventListener("DOMContentLoaded", function() {
    var lazyVideos = [].slice.call(document.querySelectorAll("video.lazy"));

    if ("IntersectionObserver" in window) {
        var lazyVideoObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(video) {
                if (video.isIntersecting) {
                    for (var source in video.target.children) {
                        var videoSource = video.target.children[source];
                        if (typeof videoSource.tagName === "string" && videoSource.tagName === "SOURCE") {
                            videoSource.src = videoSource.dataset.src;
                        }
                    }

                    video.target.load();
                    video.target.classList.remove("lazy");
                    lazyVideoObserver.unobserve(video.target);
                }
            });
        });

        lazyVideos.forEach(function(lazyVideo) {
            lazyVideoObserver.observe(lazyVideo);
        });
    }
});




filterSelection("all")
function filterSelection(c) {
  var x, i;
  x = document.getElementsByClassName("filterDiv");
  if (c == "all") c = "";
  // Add the "show" class (display:block) to the filtered elements, and remove the "show" class from the elements that are not selected
  for (i = 0; i < x.length; i++) {
    w3RemoveClass(x[i], "show");
    if (x[i].className.indexOf(c) > -1) w3AddClass(x[i], "show");
  }
}

// Show filtered elements
function w3AddClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    if (arr1.indexOf(arr2[i]) == -1) {
      element.className += " " + arr2[i];
    }
  }
}

// Hide elements that are not selected
function w3RemoveClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    while (arr1.indexOf(arr2[i]) > -1) {
      arr1.splice(arr1.indexOf(arr2[i]), 1);
    }
  }
  element.className = arr1.join(" ");
}

// Add active class to the current control button (highlight it)
var btnContainer = document.getElementById("myBtnContainer");
var btns = btnContainer.getElementsByClassName("btn");
for (var i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function() {
    var current = document.getElementsByClassName("active");
    current[0].className = current[0].className.replace(" active", "");
    this.className += " active";
  });
}


// toggle description on mobile
function toggle_visibility(id) {
       var e = document.getElementById(id);
       if(e.style.display == 'block')
          e.style.display = 'none';
       else
          e.style.display = 'block';
    }