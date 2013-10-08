(function() {
  if (!this.require) {
    var modules = {}, cache = {};

    var require = function(name, root) {
      var path = expand(root, name), indexPath = expand(path, './index'), module, fn;
      module   = cache[path] || cache[indexPath];
      if (module) {
        return module;
      } else if (fn = modules[path] || modules[path = indexPath]) {
        module = {id: path, exports: {}};
        cache[path] = module.exports;
        fn(module.exports, function(name) {
          return require(name, dirname(path));
        }, module);
        return cache[path] = module.exports;
      } else {
        throw 'module ' + name + ' not found';
      }
    };

    var expand = function(root, name) {
      var results = [], parts, part;
      // If path is relative
      if (/^\.\.?(\/|$)/.test(name)) {
        parts = [root, name].join('/').split('/');
      } else {
        parts = name.split('/');
      }
      for (var i = 0, length = parts.length; i < length; i++) {
        part = parts[i];
        if (part == '..') {
          results.pop();
        } else if (part != '.' && part != '') {
          results.push(part);
        }
      }
      return results.join('/');
    };

    var dirname = function(path) {
      return path.split('/').slice(0, -1).join('/');
    };

    this.require = function(name) {
      return require(name, '');
    };

    this.require.define = function(bundle) {
      for (var key in bundle) {
        modules[key] = bundle[key];
      }
    };

    this.require.modules = modules;
    this.require.cache   = cache;
  }

  return this.require;
}).call(this);this.require.define({"app":function(exports, require, module){(function() {
  $(function() {
    var $header, $headerFixed, triggerHeight;
    $header = $(".header");
    $headerFixed = $(".header-fixed");
    triggerHeight = $header.height() - $headerFixed.height();
    $(window).scroll(function() {
      if ($(window).scrollTop() > triggerHeight) {
        $header.addClass("hide");
        return $headerFixed.addClass("show");
      } else {
        $header.removeClass("hide");
        return $headerFixed.removeClass("show");
      }
    });
    $(window).scroll();
    require("github_commits").embedCommits($(".js_github_commits"));
    return console.log("%cWelcome%chttp://anson.so/etc/jd", "line-height: 30px; border-radius: 5px 0 0 5px; background-color: #666; color: white; padding: 6px;", "border-radius: 0 5px 5px 0; border: 1px solid #666; color: #666; padding: 5px;");
  });

}).call(this);
;}});
this.require.define({"github_commits":function(exports, require, module){(function() {
  var defaultSettings, embedCommits;

  defaultSettings = {
    repo: "anson0370/anson0370.github.com",
    limit: 5,
    title: "Blog commits"
  };

  embedCommits = function($selector) {
    return $selector.each(function() {
      var $target, settings;
      $target = $(this);
      settings = $.extend(defaultSettings, {
        repo: $target.data("repo"),
        limit: $target.data("limit"),
        title: $target.data("title")
      });
      return $.ajax({
        type: "GET",
        url: "https://api.github.com/repos/" + settings.repo + "/commits?per_page=" + settings.limit,
        success: function(data) {
          var html;
          html = "<div class=\"github_commits\"><h3>" + settings.title + "</h3><ol>";
          $.each(data, function() {
            return html += "<li>\n  <img class=\"commit-author\" src=\"" + this.author.avatar_url + "\" alt=\"avatar\">\n  <p class=\"commit-log\">" + this.commit.message + " <span class=\"commit-time\">- " + (new Date(this.commit.committer.date).toLocaleDateString("en-US")) + "</span></p>\n  <span class=\"commit-sha\"><a href=\"" + this.html_url + "\" target=\"_blank\">" + this.sha.slice(0, 10) + "&nbsp;<i class=\"icon-chevron-sign-right\"></i></a></span>\n</li>";
          });
          html += "</ol></div>";
          return $target.html(html);
        }
      });
    });
  };

  module.exports = {
    embedCommits: embedCommits
  };

}).call(this);
;}});
