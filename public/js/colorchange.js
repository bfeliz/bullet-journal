// add button to each cell
function habitDone () {
    var button = $("<button>");
    $(".cell").append(button);
}

// add event listener to each button-cell
// change cell color when clicked - loop through to listen to click - color change

$(".cell").click(function(event) {
    // console.log("you clicked me")
    switch ($(this).css("background-color")) {
        case "rgb(253, 242, 242)":
          $(this).css("background-color", "rgb(138, 56, 98)");
          $(this).css("color", "rgb(138,56,98)");
          $(this).attr("value", true);
          break;
    
        // if purple turn pink
        case "rgb(138, 56, 98)":
          $(this).css("background-color", "rgb(253, 242, 242)");
          $(this).css("color", "rgb(253, 242, 242)");
          $(this).attr("value", false);
          break;
      }
    
    
});





