loaded = false

init = ->
  return if $(".codepen").length is 0
  if window.CodePenEmbed
    CodePenEmbed.init()
  else
    if not loaded
      $.ajax
        type: "GET"
        url: "http://codepen.io/assets/embed/ei.js"
        dataType: "script"
        cache: true
      loaded = true

module.exports = init
