// ==UserScript==
// @name         Wapka Extension
// @namespace    http://github.com/kaloncpu57
// @version      0.1
// @description  Extra features for my lame Wapka site
// @author       kaloncp57
// @match        http://kaloncpu57.wapka.mobi/*
// @match        http://kaloncpu57.wapka.me/*
// @grant        none
// ==/UserScript==

function anchorJax() {
  window.addEventListener("popstate", fucntion () {
    $('body').load(this.location.href, null, anchorJax);
  });
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
}

anchorJax();

var shoutHeaders = document.querySelectorAll("h2.A");
for (var i = 0; i < shoutHeaders.length; i++) {
  shoutHeaders[i].style.display = "block";
}
