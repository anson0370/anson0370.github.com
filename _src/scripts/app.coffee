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
