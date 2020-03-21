$(document).ready(function() {
    // ---------------- MAIN HANDLEBARS NAVBAR ---------------
    // to run sidenav when on mobile or small screens
    $(".sidenav").sidenav();

    // ----------------------- MONTHLY ------------------------
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

    // set calendar to match month
    $(".datepicker").datepicker({
        prevText: '<i class="fa fa-fw fa-angle-left"></i>',
        nextText: '<i class="fa fa-fw fa-angle-right"></i>'
    });
    let calMonth = $(".month").text();

    switch (calMonth) {
        case "January 2020":
            $(".datepicker").datepicker("setDate", "01/01/2020");
            break;
        case "February 2020":
            $(".datepicker").datepicker("setDate", "02/01/2020");
            break;
        case "March 2020":
            $(".datepicker").datepicker("setDate", "03/01/2020");
            break;
        case "April 2020":
            $(".datepicker").datepicker("setDate", "04/01/2020");
            break;
        case "May 2020":
            $(".datepicker").datepicker("setDate", "05/01/2020");
            break;
        case "June 2020":
            $(".datepicker").datepicker("setDate", "06/01/2020");
            break;
        case "July 2020":
            $(".datepicker").datepicker("setDate", "07/01/2020");
            break;
        case "August 2020":
            $(".datepicker").datepicker("setDate", "08/01/2020");
            break;
        case "September 2020":
            $(".datepicker").datepicker("setDate", "09/01/2020");
            break;
        case "October 2020":
            $(".datepicker").datepicker("setDate", "10/01/2020");
            break;
        case "November 2020":
            $(".datepicker").datepicker("setDate", "11/01/2020");
            break;
        case "December 2020":
            $(".datepicker").datepicker("setDate", "12/01/2020");
            break;
        default:
            $(".datepicker").datepicker();
            break;
    }
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

    // $(".datepicker").datepicker({
    //     // required to hide arrow functionality
    //     prevText: '<i class="fa fa-fw fa-angle-left"></i>',
    //     nextText: '<i class="fa fa-fw fa-angle-right"></i>'
    // });

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

    $(".newMonthly").on("click", function(e) {
        e.preventDefault();
        $(".modal").modal();
    });
    $(".submitButton").on("click", function(e) {
        e.preventDefault();
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
