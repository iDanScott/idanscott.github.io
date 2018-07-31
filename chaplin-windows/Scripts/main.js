var appendedBrand = false;
$(function () {
    $('body').scrollspy({ target: '#navbar-main' });
    $('.carousel').carousel();
});

$(document).scroll(function () {
    var $nav = $("nav.fixed-top");
    $nav.toggleClass('scrolled', $(this).scrollTop() > 0, 1000);
    $nav.toggleClass('bg-light', $(this).scrollTop() > 0, 1000);
    $nav.toggleClass('bg-transparent', $(this).scrollTop() == 0, 1000);
});