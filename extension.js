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

}

var shoutHeaders = document.querySelectorAll("h2.A");
for (var i = 0; i < shoutHeaders.length; i++) {
  shoutHeaders[i].style.display = "block";
}
