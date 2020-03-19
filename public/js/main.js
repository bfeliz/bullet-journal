
const $currentDaily = $(".currentDailies")


$(document).ready(function () {
    $(".datepicker").datepicker({
        prevText: '<i class="fa fa-fw fa-angle-left"></i>',
        nextText: '<i class="fa fa-fw fa-angle-right"></i>'
    });
    const $newDaily = $(".newdaily")

    $newDaily.on("click", function (e) {
    
        var newDaily = {
            name: $("#textarea1").val().trim(),
        };
        $.ajax("api/newdaily", {
            type: "POST",
            data: newDaily
        }).then(function(e){
            location.reload()
        })
        // $.ajax("/api/newdaily", newDaily).then(function(e) {
        //     console.log('yeet')
        //     location.reload()
            
        //     // ("/api/modifydaily/" + $dataId, {
        //     //     type: "PUT",
        //     //     data: $dataId
        //     //   }).
            
        // })
    })
});

$.get("/api/alldailies", function (data) {

    if (data.length !== 0) {

        for (var i = 0; i < data.length; i++) {

            if(data[i].completed == false){

            var listItem = `<li class='dailyli' data-id='${i}'>${data[i].name}</li>`

            $(listItem).appendTo('.currentDailies')
            }
            else if(data[i].completed == true){
                var listItem = `<li class='dailyli' data-id='${i}' style='text-decoration:line-through;'>${data[i].name}</li>`

                $(listItem).appendTo('.currentDailies')

            }

        }

    }
    $(".dailyli").on("click", function (e) {
        $(this).css("text-decoration", "line-through")
       const $dataId = parseInt(($(this).attr("data-id"))) + 1
       console.log("/api/modifydaily/" + $dataId)

       $.ajax("/api/modifydaily/" + $dataId, {
        type: "PUT",
        data: $dataId
      }).then(function(e){
        console.log('test')
        location.reload()
      }
      );
    })
});


