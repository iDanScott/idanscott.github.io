var appendedBrand = false;
$(function () {
    $('body').scrollspy({ target: '#navbar-main' });
    $('.carousel').carousel();
});

$(document).scroll(function () {
    var $nav = $("nav.fixed-top");
    var $brand = $("<div class='col-lg'><a class='brand' href='#'><img style='height:50px' src='./Images/double-glazing-alton-hampshire-chaplin-windows-logo.png'></a></div>");
    $nav.toggleClass('scrolled', $(this).scrollTop() > 0, 1000);
    $nav.toggleClass('bg-light', $(this).scrollTop() > 0, 1000);
    $nav.toggleClass('bg-transparent', $(this).scrollTop() == 0, 1000);
    if ($(this).scrollTop() == 0) {
        $('.navbar-nav').find('.col-lg').has('.brand').remove();
        appendedBrand= false;
    } else if (!appendedBrand) {
        $('.navbar-nav').prepend($brand);
        appendedBrand = true;
    }
});