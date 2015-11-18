// ==UserScript==
// @name         Wapka Extension
// @namespace    http://github.com/kaloncpu57
// @version      0.1
// @description  Extra features for my lame Wapka site
// @author       kaloncp57
// @match        http://kaloncpu57.wapka.mobi/*
// @match        http://kaloncpu57.wapka.me/*
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js
// @grant        none
// ==/UserScript==

/*function anchorJax() {
  var anchors = document.querySelectorAll("a");
  for (var i = 0; i < anchors.length; i++) {
    if (anchors[i].href.substring(0, 11) !== "javascript:") {
      anchors[i].addEventListener("click", function (e) {
        e.preventDefault();
        window.history.pushState(null, null, this.href);
        $('body').load(this.href, null, anchorJax);
      });
    }
  }
  var forms = document.querySelectorAll("form");
  for (var i = 0; i < forms.length; i++) {
    forms[i].addEventListener("submit", function(e) {
      e.preventDefault();
    })
  }
}
window.addEventListener("popstate", function () {
  $('body').load(this.location.href, null, anchorJax);
});*/
function ajaxHandler(data, status, xhr, href) {
  var finalURL = xhr.getResponseHeader('TM-finalURLdhdg');
  if (finalURL) {
    console.log(finalURL);
    window.history.pushState(null, null, finalURL);
  } else {
    window.history.pushState(null, null, href);
  }
  anchorJax();
}

function anchorJax() {
  $("a").each(function () {
    var href = $(this).attr("href");
    if (href.substring(0, 11) !== "javascript:") {
      $(this).click(function (e) {
        //window.history.pushState(null, null, href);
        if (!e.ctrlKey) {
          $('body').load(href, null, function (data, stats, xhr) {
            ajaxHandler(data, status, xhr, href);
          });
          return false;
        }
      });
    }
  });
  
  $("form").each(function () {
    $(this).submit(function () {
      var form = $("form[method=post]");
      var serial = form.serializeArray();
      var data = {};
      for (var i = 0; i < serial.length; i++) {
        data[serial[i].name] = serial[i].value;
      }
      var submit = $("form[method=post] input[type=submit]");
      data[submit.attr("name")] = submit.val();
      var hash = data["hash"] ? "?hash=" + data["hash"] : "";
      var href = $(this).attr("action") + hash;
      $('body').load($(this).attr("action"), data, function (data, stats, xhr) {
          ajaxHandler(data, status, xhr, href);
        });
      return false;
    });
  });
}
anchorJax();
$(window).on('popstate', function () {
  $('body').load(this.location.href, null, anchorJax);
});
var shoutHeaders = document.querySelectorAll("h2.A");
for (var i = 0; i < shoutHeaders.length; i++) {
  shoutHeaders[i].style.display = "block";
}
