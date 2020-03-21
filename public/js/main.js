$(document).ready(function() {
    // ---------------- MAIN HANDLEBARS NAVBAR ---------------
    // to run sidenav when on mobile or small screens
    $(".sidenav").sidenav();

    // ----------------------- MONTHLY ------------------------
    // necessary to render calendar correctly
    function getPage() {
        console.log("yeet");
    }
    $(".currentMonthlies").on("click", function(e) {
        console.log(event.target.classList);

        const innerText = event.target.innerText.split(" ");
        innerText.splice(2, 2);
        console.log(innerText);
        //ajax request using params sent from here
    });
    // $('.currentMonthlies').on("click", function(e){
    //     console.log(event.target.classList)

    //         const innerText = event.target.innerText.split(' ')
    //         innerText.splice(2,2)
    //         console.log(innerText)
    //        //ajax request using params sent from here
    //        $.ajax('/' + innerText[0] + '/' + innerText[1], {
    //         type: "GET",
    //     }).then(function(e) {
    //         window.location.href = '/' + innerText[0] + '/' + innerText[1]

    //     });

    // })

    // ----------------------- SELECT------------------------
    // necessary to render dropdown select menus correctly
    $("select").formSelect();

    const $currentDaily = $(".currentDailies");

    $(".datepicker").datepicker({
        prevText: '<i class="fa fa-fw fa-angle-left"></i>',
        nextText: '<i class="fa fa-fw fa-angle-right"></i>'
    });

    // ---------------- HABIT TRACKER --------------------
    // add button to each cell
    function habitDone() {
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

    $.get("/api/pages", function(data) {
        if (data.length !== 0) {
            for (var i = 0; i < data.length; i++) {
                var listItem = `<div class='row'><div class='col s6'><a href='${data[i].type}/${data[i].typeId}' class='monthlyli' data-id='${i}'>${data[i].name} </a></div><div class='col s6'>${data[i].id}</span></div></div>`;

                // var listItem = `<div class='row'><div class='col s6'><li class='monthlyli' data-id='${i}'>${data[i].name} </li></div><div class='col s6'>${data[i].id}</span></div></div>`;
                $(".currentMonthlies").append(listItem);
            }
        }
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

    $(".newMonthly").on("click", function(e) {
        e.preventDefault();
        $(".modal").modal();
        event.preventDefault();
        $(".submitButton").on("click", function(e) {
            const $select = $("select").val();
            let chosen = "";
            switch ($select) {
                case "1":
                    chosen = "January";
                    break;
                case "2":
                    chosen = "February";
                    break;

                case "3":
                    chosen = "March";
                    break;
                case "4":
                    chosen = "April";
                    break;
                case "5":
                    chosen = "May";
                    break;
                case "6":
                    chosen = "June";
                    break;
                case "7":
                    chosen = "July";
                    break;
                case "8":
                    chosen = "August";
                    break;
                case "9":
                    chosen = "September";
                    break;
                case "10":
                    chosen = "October";
                    break;
                case "11":
                    chosen = "November";
                    break;
                case "12":
                    chosen = "December";
                    break;
                default:
                    chosen = "";
                    break;
            }
            $.ajax("api/newmonthly/" + chosen, {
                type: "POST"
            }).then(function(e) {
                location.reload();
            });
        });
        $("select").formSelect();
    });

    $(".newCollection").on("click", function(e) {
        e.preventDefault();
        $(".modal").modal();
    });
    $(".submitButton2").on("click", function(e) {
        e.preventDefault();
        let array = [];
        const collect = $("#textarea-collect").val();
        array.push(collect);
        const colsub1 = $("#textarea-collect2").val();
        if (!colsub1) {
            array.push(colsub1);
            array.push(false);
        } else {
            array.push(colsub1);
            array.push(true);
        }
        const colsub2 = $("#textarea-collect3").val();
        if (!colsub2) {
            array.push(colsub2);
            array.push(false);
        } else {
            array.push(colsub2);
            array.push(true);
        }
        const colsub3 = $("#textarea-collect4").val();
        if (!colsub3) {
            array.push(colsub3);
            array.push(false);
        } else {
            array.push(colsub3);
            array.push(true);
        }
        const colsub4 = $("#textarea-collect5").val();
        if (!colsub4) {
            array.push(colsub4);
            array.push(false);
        } else {
            array.push(colsub4);
            array.push(true);
        }
        $.ajax("api/newcollection/" + array, {
            type: "POST"
        }).then(function() {
            location.reload();
        });
    });
    $(".newHabit").on("click", function(e) {
        e.preventDefault();
        $(".modal").modal();
    });
});

/*  */
