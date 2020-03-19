$(document).ready(function() {
    const $currentDaily = $(".currentDailies");
    // ---------------- MAIN HANDLEBARS NAVBAR ---------------
    // to run sidenav when on mobile or small screens
    $(".sidenav").sidenav();

    // ----------------------- MONTHLY ------------------------
    // necessary to render calendar correctly

// ----------------------- SELECT------------------------
    // necessary to render dropdown select menus correctly
    $('select').formSelect();

const $currentDaily = $(".currentDailies")



   
    $(".datepicker").datepicker({
        prevText: '<i class="fa fa-fw fa-angle-left"></i>',
        nextText: '<i class="fa fa-fw fa-angle-right"></i>'
    });

    // ---------------- MAIN LANDING PAGE -----------------
    const $newDaily = $(".newdaily");

    $newDaily.on("click", function(e) {
        var newDaily = {
            name: $("#textarea1")
                .val()
                .trim()
        };
        $.ajax("api/newdaily", {
            type: "POST",
            data: newDaily
        }).then(function(e) {
            location.reload();
        });
        // $.ajax("/api/newdaily", newDaily).then(function(e) {
        //     console.log('yeet')
        //     location.reload()

        //     // ("/api/modifydaily/" + $dataId, {
        //     //     type: "PUT",
        //     //     data: $dataId
        //     //   }).

        // })
    });

    $.get("/api/alldailies", function(data) {
        if (data.length !== 0) {
            for (var i = 0; i < data.length; i++) {
                if (data[i].completed == false) {
                    var listItem = `<li class='dailyli' data-id='${i}'>${data[i].name}</li>`;

                    $(listItem).appendTo(".currentDailies");
                } else if (data[i].completed == true) {
                    var listItem = `<li class='dailyli' data-id='${i}' style='text-decoration:line-through;'>${data[i].name}</li>`;

                    $(listItem).appendTo(".currentDailies");
                }
            }
        }
        $(".dailyli").on("click", function(e) {
            $(this).css("text-decoration", "line-through");
            const $dataId = parseInt($(this).attr("data-id")) + 1;
            console.log("/api/modifydaily/" + $dataId);

            $.ajax("/api/modifydaily/" + $dataId, {
                type: "PUT",
                data: $dataId
            }).then(function(e) {
                console.log("test");
                location.reload();
            });
        });
    });

    // ---------------------- COLLECTIONS LOGIC IF NEEDED (FROM DENNIS WHEN IT WAS DAILIES) ------------------------
    //     type="text/javascript">
    //   $(".delbullet").on("click", function(event) {
    //     // Get the ID from the button.
    //     // This is shorthand for $(this).attr("data-planid")
    //     var id = $(this).data("bulletid");

    //     // Send the DELETE request.
    //     $.ajax("/api/daily_spread/" + id, {
    //       type: "DELETE"
    //     }).then(
    //       function() {
    //         console.log("deleted id ", id);
    //         // Reload the page to get the updated list
    //         location.reload();
    //       }
    //     );
    //   });

    //   $("#createbullet").on("submit", function(event) {
    //     // Make sure to preventDefault on a submit event.
    //     event.preventDefault();

    //     // [name=bulletnote] will find an element with a "name" attribute equal to the string "bulletnote"
    //     var newBN = {
    //       plan: $("#createbullet [name=bulletnote]").val().trim()
    //     };

    //     // Send the POST request.
    //     $.ajax("/api/daily_spread", {
    //       type: "POST",
    //       data: newBN
    //     }).then(
    //       function() {
    //         console.log("created new bullet note");
    //         // Reload the page to get the updated list
    //         location.reload();
    //       }
    //     );
    //   });

    //   $("#updatebullet").on("submit", function(event) {
    //     // Make sure to preventDefault on a submit event.
    //     event.preventDefault();

    //     // Get the ID by finding an element with a "name" attribute equal to the string "id"
    //     var id = $("[name=id]").val().trim();

    //     var updatedBN = {
    //       plan: $("#updatebullet [name=plan]").val().trim()
    //     };

    //     // Send the PUT request.
    //     $.ajax("/api/daily_spread/" + id, {
    //       type: "PUT",
    //       data: updatedBN
    //     }).then(
    //       function() {
    //         console.log("updated id ", id);
    //         // Reload the page to get the updated list
    //         location.reload();
    //       }
    //     );
    //   });




$('.newMonthly').on("click",function(e){
    event.preventDefault()
    const textarea =   
    `<div class="input-field col s12">
    <select>
      <option value="" disabled selected>Choose your option</option>
      <option value="1">Option 1</option>
      <option value="2">Option 2</option>
      <option value="3">Option 3</option>
    </select>
    <label>Materialize Select</label>
  </div>`

$('.formRow').append(textarea)
})
}
/* <option value="2">February</option>
<option value="3">March</option>
<option value="4">April</option>
<option value="5">May</option>
<option value="6">June</option>
<option value="7">July</option>
<option value="8">August</option>
<option value="9">September</option>
<option value="10">October</option>
<option value="11">November</option>
<option value="12">December</option> */
