$ ->
  $header = $(".header")
  $(window).scroll ->
    if $(window).scrollTop() > ($header.height() / 2)
      $header.addClass("float")
    else
      $header.removeClass("float")

  $(window).scroll()
