$(document).ready(function(){





  var controller = new ScrollMagic.Controller();

   //create a scene
  new ScrollMagic.Scene({
          duration: 1000,    // the scene should last for a scroll distance of 100px
          offset: 250        // start this scene after scrolling for 50px
      })
      .setPin(".move") // pins the element for the the scene's duration
      .addTo(controller);


      // init controller
//var controller = new ScrollMagic.Controller({globalSceneOptions: {duration: 200}});

// build scenes
new ScrollMagic.Scene({triggerElement: "#sec1",duration:200})
        .setClassToggle("#high1", "active") // add class toggle
        .addTo(controller);
new ScrollMagic.Scene({triggerElement: "#sec2",duration:200})
        .setClassToggle("#high2", "active") // add class toggle
        .addTo(controller);
new ScrollMagic.Scene({triggerElement: "#sec3",duration:200})
        .setClassToggle("#high3", "active") // add class toggle
        .addTo(controller);
new ScrollMagic.Scene({triggerElement: "#sec4",duration:200})
        .setClassToggle("#high4", "active") // add class toggle
        .addTo(controller);

var scene = new ScrollMagic.Scene({triggerElement: "#sec2", duration: 300})
      	// animate color and top border in relation to scroll position
      	.setTween(".move", { backgroundColor: "blue", scale: 1.7}) // the tween durtion can be omitted and defaults to 1
      	.addTo(controller);
        new ScrollMagic.Scene({
                duration: 10000,    // the scene should last for a scroll distance of 100px
                offset: 270        // start this scene after scrolling for 50px
                })
                .setPin("#erik") // pins the element for the the scene's duration
                .addTo(controller);
new ScrollMagic.Scene({triggerElement: "#erik",duration:"200px",triggerHook:0.35})
        .setTween("#erik", {backgroundColor:"white",scale:.5,width:"200%",left:"0%"}) // the tween durtion can be omitted and defaults to 1
      	.addTo(controller);
new ScrollMagic.Scene({triggerElement: "#erik",duration:"200px",triggerHook:0.35})
        .setTween(".scrollmagic-pin-spacer", {left:"-50%"}) // the tween durtion can be omitted and defaults to 1
      	.addTo(controller);
new ScrollMagic.Scene({triggerElement: "#erik",duration:"200px",triggerHook:0.35})
        .setTween("#resumebutton", {opacity:"1"}) // the tween durtion can be omitted and defaults to 1
        .addTo(controller);
new ScrollMagic.Scene({triggerElement: "#erik",duration:"200px",triggerHook:0.35})
        .setTween("#twitter", {opacity:"1"}) // the tween durtion can be omitted and defaults to 1
        .addTo(controller);
new ScrollMagic.Scene({triggerElement: "#erik",duration:"200px",triggerHook:0.35})
        .setTween("#linkedin", {opacity:"1"}) // the tween durtion can be omitted and defaults to 1
        .addTo(controller);
new ScrollMagic.Scene({triggerElement: "#erik",duration:"200px",triggerHook:0.35})
        .setTween("#github", {opacity:"1"}) // the tween durtion can be omitted and defaults to 1
        .addTo(controller);
//new ScrollMagic.Scene({triggerElement: "#trigger",duration:"50%"})
//        .setClassToggle("#dev", "fadeIn") // add class toggle
//        .addTo(controller);
  $("#resumebutton").on('click',function(){
  //  event.preventDefault();
    $(".resume").addClass("visible");
    $(".overlay").addClass("visible");
  });
  $(".overlay").on('click',function(){
  //  event.preventDefault();
    $(".resume").removeClass("visible");
    $(".overlay").removeClass("visible");
  });

  new ScrollMagic.Scene({duration: "10000",    offset: "1000px"      })
          .setPin("#about") // pins the element for the the scene's duration
          .addTo(controller);
  new ScrollMagic.Scene({duration: "10000",    offset: "1600px"      })
          .setPin("#skills li:nth-child(1)") // pins the element for the the scene's duration
          .addTo(controller);
  new ScrollMagic.Scene({duration: "10000",    offset: "2050px"      })
        .setPin("#skills li:nth-child(2)") // pins the element for the the scene's duration
          .addTo(controller);
  new ScrollMagic.Scene({duration: "10000",    offset: "2500px"      })
          .setPin("#skills li:nth-child(3)") // pins the element for the the scene's duration
          .addTo(controller);
  new ScrollMagic.Scene({duration: "10000",    offset: "2950px"      })
         .setPin("#skills li:nth-child(4)") // pins the element for the the scene's duration
          .addTo(controller);
  new ScrollMagic.Scene({duration: "10000",    offset: "3400px"      })
          .setPin("#skills li:nth-child(5)") // pins the element for the the scene's duration
          .addTo(controller);

$('.background-tint').mouseover(function(){
  $(this).find('.zoom').css("left", "0");
});
$('.background-tint').mouseleave(function(){
  $(this).find('.zoom').css("left", "1000px");
  var select = $(this).find('.zoom')
  //setTimeout(function(){$(this).find('.zoom').css("z-index", "-10")},500);
  setTimeout(function(){select.css("left", "-1000px")},200);
  setTimeout(function(){select.css("z-index", "-10")},200);
  setTimeout(function(){select.css("z-index", "1")},500);
});

});
