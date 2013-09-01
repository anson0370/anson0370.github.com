defaultSettings =
  repo: "anson0370/anson0370.github.com"
  limit: 5
  title: "Blog commits"

embedCommits = ($selector) ->
  $selector.each ->
    $target = $(@)
    settings = $.extend(
      defaultSettings,
      repo: $target.data("repo")
      limit: $target.data("limit")
      title: $target.data("title")
      )
    $.ajax
      type: "GET"
      url: "https://api.github.com/repos/#{settings.repo}/commits?per_page=#{settings.limit}"
      success: (data) ->
        html = "<div class=\"github_commits\"><h3>#{settings.title}</h3><ol>"
        $.each data, ->
          html += """
            <li>
              <img class="commit-author" src="#{@author.avatar_url}" alt="avatar">
              <p class="commit-log">#{@commit.message} <span class="commit-time">- #{new Date(@commit.committer.date).toLocaleDateString("en-US")}</span></p>
              <span class="commit-sha"><a href="#{@html_url}" target="_blank">#{@sha[0...10]}&nbsp;<i class="icon-chevron-sign-right"></i></a></span>
            </li>"""
        html += "</ol></div>"
        $target.html(html)

module.exports =
  embedCommits: embedCommits
