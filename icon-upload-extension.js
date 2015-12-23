// ==UserScript==
// @name         Wapka Icon Uploader Extension
// @namespace    http://github.com/kaloncpu57
// @version      0.1
// @description  Makes adding icons easier
// @updateURL    https://raw.githubusercontent.com/kaloncpu57/youtube-scripts/master/loop.js
// @author       kaloncp57
// @match        http://*.wapka.mobi/edit_*.xhtml?*action=edit_new4_upl*
// @grant        none
// ==/UserScript==

var form = document.querySelector("form");

var file = form.querySelector("input[type=file]");
var parent = file.parentElement;
var files = document.createElement("div");
parent.replaceChild(files, file);
var label = document.createElement("label");
form.removeChild(form.querySelector("select"));
var resize = document.createElement("input");
resize.setAttribute("name", "rozl[0]");
resize.setAttribute("placeholder", "Resize (i.e. 40 or i40)");
label.appendChild(file);
label.appendChild(document.createElement("br"));
label.appendChild(resize);
label.setAttribute("style", "display: block");
files.appendChild(label);

/*
var countlabel = document.createElement("label");
countlabel.textContent = "Number of files:";
var filecount = document.createElement("input");
countlabel.appendChild(filecount);
filecount.setAttribute("type", "number");
filecount.min = 1;
filecount.max = 10;
filecount.value = 1;
filecount.addEventListener("input", function () {
  var val = Number(this.value);
  if (val >= 1 && val <= 10) {
    var n = files.childElementCount;
    if (n > val) {
      for (var i = n; i > val; i--) {
        files.removeChild(files.lastElementChild);
      }
    } else if (n < val) {
      for (var i = n; i < val; i++) {
        var label = document.createElement("label");
        var newfile = document.createElement("input");
        var resize = document.createElement("input");
        newfile.setAttribute("type", "file");
        newfile.setAttribute("name", "upl_pic[" + (i - 1) + "]");
        label.setAttribute("style", "display: block");
        label.appendChild(newfile);
        resize.setAttribute("name", "rozl[" + (i - 1) + "]");
        resize.setAttribute("placeholder", "Resize (i.e. 40 or i40)");
        label.appendChild(resize);
        files.appendChild(label);
      }
    }
  }
});
form.insertBefore(countlabel, files);
*/
