$ ->
  # fix header
  $header = $(".header")
  $headerFixed = $(".header-fixed")
  triggerHeight = $header.height() - $headerFixed.height()
  $(window).scroll ->
    if $(window).scrollTop() > triggerHeight
      $header.addClass("hide")
      $headerFixed.addClass("show")
    else
      $header.removeClass("hide")
      $headerFixed.removeClass("show")
  # trigger scroll once
  $(window).scroll()

  # init all github_commits
  require("github").embedCommits $(".js-github-commits")
  require("github").embedUser $(".js-github-user")

  # code for pjax
  $(document).pjax(".js-pjax", ".content-container", {fragment: ".content-container", timeout: 10000})
  $(document).on
    "pjax:start": ->
      console.log "pjax:start"
      NProgress.start()
      $(".content-container").removeClass("fadeOut fadeIn").addClass("fadeOut")
    "pjax:end": ->
      console.log "pjax:end"
      NProgress.done()
      $(".content-container").removeClass("fadeOut fadeIn").addClass("fadeIn")
      # reinit pjax content
      require("github").embedCommits $(".js-github-commits")

  # console output for chrome
  console.log("%cWelcome%chttp://anson.so/etc/jd", "line-height: 30px; border-radius: 5px 0 0 5px; background-color: #666; color: white; padding: 6px;", "border-radius: 0 5px 5px 0; border: 1px solid #666; color: #666; padding: 5px;")
