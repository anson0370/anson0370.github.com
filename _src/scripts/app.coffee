$ ->
  # fix header
  $header = $(".header")
  $(window).scroll ->
    if $(window).scrollTop() > ($header.height() / 2)
      $header.addClass("float")
    else
      $header.removeClass("float")
  # trigger scroll once
  $(window).scroll()

  # init all github_commits
  require("github_commits").embedCommits $(".js_github_commits")

  # console output for chrome
  console.log("%cWelcome%chttp://anson.so/etc/jd", "line-height: 30px; border-radius: 5px 0 0 5px; background-color: #666; color: white; padding: 6px;", "border-radius: 0 5px 5px 0; border: 1px solid #666; color: #666; padding: 5px;")
