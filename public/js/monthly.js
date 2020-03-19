
$(document).ready(function() {
    // necessary to render calendar correctly
    $(".datepicker").datepicker({
        prevText: '<i class="fa fa-fw fa-angle-left"></i>',
        nextText: '<i class="fa fa-fw fa-angle-right"></i>'
    });
    // to run sidenav when on mobile or small screens
    $(".sidenav").sidenav();
});
