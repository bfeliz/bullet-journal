// add button to each cell
function habitDone () {
    var button = $("<button>");
    $(".cell").append(button);
}

// add event listener to each button-cell
// change cell color when clicked - loop through to listen to click - color change

$(".cell").click(function(event) {
    // console.log("you clicked me")

    var targetCell = event.target

     
        if(targetCell.style.background !== "#8a3862"){
            this.style.background = "#8a3862";
        $(this).attr("value", true)
        }
        if(targetCell.style.color !== "#8a3862"){
            this.style.color = "#8a3862";

        }
        else {
            this.style.background = "";
            this.style.color = "";
            $(this).attr("value", false);
        }
});





