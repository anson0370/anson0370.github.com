loaded = false

init = ->
  return if $("#disqus_thread").length is 0
  if window.DISQUS
    DISQUS.next.host.loader.loadEmbed()
  else
    if not loaded
      $.ajax
        type: "GET"
        url: "http://anson0370githubio.disqus.com/embed.js"
        dataType: "script"
        cache: true
      loaded = true

module.exports = init
