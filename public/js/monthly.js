$("textarea").change(function() {
    if (window.location.href.contains("monthly")) {
        const val = $(this).val();
        const id = parseInt($(this).attr("id"));
        $.ajax("/api/saveTask/" + id + "/" + val, {
            type: "PUT"
        }).then(function() {
            location.reload();
        });
    }
});
