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
    var $header, $headerFixed, initPjax, triggerHeight;
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
    require("github").embedUser($(".js-github-user"));
    initPjax = function() {
      require("github").embedCommits($(".js-github-commits"));
      require("disqus")();
      return require("codepen")();
    };
    initPjax();
    $(document).pjax(".js-pjax", ".content-container", {
      fragment: ".content-container",
      timeout: 10000
    });
    $(document).on({
      "pjax:start": function() {
        console.log("pjax:start");
        NProgress.start();
        return $(".content-container").removeClass("fadeOut fadeIn").addClass("fadeOut");
      },
      "pjax:end": function() {
        console.log("pjax:end");
        NProgress.done();
        $(".content-container").removeClass("fadeOut fadeIn").addClass("fadeIn");
        return initPjax();
      }
    });
    return console.log("%cWelcome%chttp://anson.so/etc/jd", "line-height: 30px; border-radius: 5px 0 0 5px; background-color: #666; color: white; padding: 6px;", "border-radius: 0 5px 5px 0; border: 1px solid #666; color: #666; padding: 5px;");
  });

}).call(this);
;}});
this.require.define({"codepen":function(exports, require, module){(function() {
  var init, loaded;

  loaded = false;

  init = function() {
    if ($(".codepen").length === 0) {
      return;
    }
    if (window.CodePenEmbed) {
      return CodePenEmbed.init();
    } else {
      if (!loaded) {
        $.ajax({
          type: "GET",
          url: "http://codepen.io/assets/embed/ei.js",
          dataType: "script",
          cache: true
        });
        return loaded = true;
      }
    }
  };

  module.exports = init;

}).call(this);
;}});
this.require.define({"disqus":function(exports, require, module){(function() {
  var init, loaded;

  loaded = false;

  init = function() {
    if ($("#disqus_thread").length === 0) {
      return;
    }
    if (window.DISQUS) {
      return DISQUS.next.host.loader.loadEmbed();
    } else {
      if (!loaded) {
        $.ajax({
          type: "GET",
          url: "http://anson0370githubio.disqus.com/embed.js",
          dataType: "script",
          cache: true
        });
        return loaded = true;
      }
    }
  };

  module.exports = init;

}).call(this);
;}});
this.require.define({"github":function(exports, require, module){(function() {
  var defaultSettings, defaultUser, embedCommits, embedUser;

  defaultSettings = {
    repo: "anson0370/anson0370.github.com",
    limit: 5,
    title: "Blog commits"
  };

  defaultUser = "anson0370";

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
          html = "<div class=\"github-commits\"><h3>" + settings.title + "</h3><ol>";
          $.each(data, function() {
            return html += "<li>\n  <img class=\"commit-author\" src=\"" + this.author.avatar_url + "\" alt=\"avatar\">\n  <p class=\"commit-log\">" + this.commit.message + " <span class=\"commit-time\">- " + (new Date(this.commit.committer.date).toLocaleDateString("en-US")) + "</span></p>\n  <span class=\"commit-sha\"><a href=\"" + this.html_url + "\" target=\"_blank\">" + this.sha.slice(0, 10) + "&nbsp;<i class=\"icon-chevron-sign-right\"></i></a></span>\n</li>";
          });
          html += "</ol></div>";
          return $target.html(html);
        }
      });
    });
  };

  embedUser = function($selector) {
    return $selector.each(function() {
      var $target, user;
      $target = $(this);
      user = $target.data("user") || defaultUser;
      return $.ajax({
        type: "GET",
        url: "https://api.github.com/users/" + user,
        success: function(data) {
          var html;
          html = "<div class=\"github-user\">\n  <div class=\"user-name\">Name: " + data.name + "</div>\n  <div class=\"user-location\">Location: " + data.location + "</div>\n  <ul class=\"user-infos\">\n    <li class=\"user-repos\">Repos: " + data.public_repos + "</li>\n    <li class=\"user-gists\">Gists: " + data.public_gists + "</li>\n    <li class=\"user-followers\">Followers: " + data.followers + "</li>\n  </ul>\n</div>";
          return $target.html(html);
        }
      });
    });
  };

  module.exports = {
    embedCommits: embedCommits,
    embedUser: embedUser
  };

}).call(this);
;}});
