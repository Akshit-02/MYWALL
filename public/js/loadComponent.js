if ($("#header-wrapper").length !== 0) {
  $("#header-wrapper").load("../components/header.html");
  }
  $("#footer-wrapper").load("../components/footer.html");

  $(document).scroll(function () {
    var $nav = $("#vidzy-navbar");
    $nav.toggleClass('stciky', $(this).scrollTop() > $nav.height());
  });