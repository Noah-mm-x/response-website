
(function () {

    function backToTop() {
        $("#back-top").click(function () {
            $("body,html").animate({scrollTop: 0}, 500);
        });
        $("#back-top").hide();
        $(document).scroll(function () {
            if ($("body").scrollTop() >= 600) {
                $("#back-top").fadeIn();
            } else {
                $("#back-top").fadeOut();
            }
        });
    }

    backToTop();

})();