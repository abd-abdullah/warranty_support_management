/*them custom js
@@Author Md. Abdullah
Email: abdullah001rti@gmail.com
*/

$(document).on("click", ".table-sortable .sorting", function () {
    if ($(this).hasClass("asc")) {
        $(this).addClass("desc").removeClass("asc");
    }
    else if ($(this).hasClass("desc")) {
        $(this).addClass("asc").removeClass("desc");
    }
    else {
        $(this).addClass("asc");
    }

    $(document).find(".table-sortable .asc").not($(this)).removeClass('asc');
    $(document).find(".table-sortable .desc").not($(this)).removeClass('desc');
});
//End

$(document).on('focus', ".bmd-form-group input", function () {
    $(this).parent().addClass('is-focused');
})

$(document).on('focusout', ".bmd-form-group input", function () {
    let checkVal = $(this).val();
    if (checkVal == '') {
        $(this).parent().removeClass('is-filled');
    } else {
        $(this).parent().addClass('is-filled');
    }
    $(this).parent().removeClass('is-focused');
});

window.addEventListener('load', function(){ 
    $val = $(document).find(".bmd-form-group input").filter(function () {
        return $.trim($(this).val()).length !== 0
    });
    
    $val.parent().addClass('is-filled');
});