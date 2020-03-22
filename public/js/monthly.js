$('textarea').change(function(e){
    if(window.location.href.contains('monthly')){
    console.log('yerp')
    const val = ($(this).val())
    const id = parseInt($(this).attr("id"))
    const p = "api/saveTask/" + id + "/" + val
    console.log(p)
    $.ajax("/api/saveTask/" + id + "/" + val, {
        type: "PUT",
    }).then(function(e) {
        console.log('nice')
        location.reload();
    });
}
})
