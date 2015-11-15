function toggleOptions() {
  var options = document.querySelector("#option-list");
  if (options.style.display == "none") {
    options.style.display = "block";
    this.innerText = "Hide Options";
  } else {
    options.style.display = "none";
    this.innerText = "Show Options";
  }
}

var menu = document.querySelector("#main-menu"),
    optionList = document.querySelector("#option-list"),
    optionButton = document.createElement("button");
optionButton.innerText = "Show Options";
optionButton.addEventListener("click", toggleOptions);
menu.insertBefore(document.createElement("br"), optionList); 
menu.insertBefore(optionButton, optionList);

var popalert = document.querySelector("input[name=popalert]"),
    pmalert = document.querySelector("input[name=pmalert]");
if (getCookie("popint") == "true") {
  popalert.checked = true;
}
if (getCookie("pmint") == "true") {
  pmalert.checked = true;
}
popalert.addEventListener("change", function () {
  if (this.checked) {
    setCookie("popint", "true", 1000);
    startPopInt();
    if (Notification.permission == "default" || Notification.permission == "denied") {
      Notification.requestPermission(function () {
        popNotify("You will now receive alerts about popups automatically, without having to refresh the page.", {close: 3000});
      });
    } else {
      popNotify("You will now receive alerts about popups automatically, without having to refresh the page.", {close: 3000});
    }
  } else {
    delCookie("popint");
    popNotify("You will no longer receive auto updates for popups.", {close: 3000});    
  }
});
pmalert.addEventListener("change", function () {
  if (this.checked) {
    setCookie("pmint", "true", 1000);
    startPopInt();
    if (Notification.permission == "default" || Notification.permission == "denied") {
      Notification.requestPermission(function () {
        popNotify("You will now receive alerts about PMs automatically, without having to refresh the page.", {close: 3000});
      });
    } else {
      popNotify("You will now receive alerts about PMs automatically, without having to refresh the page.", {close: 3000});
    }
  } else {
    delCookie("pmint");
    popNotify("You will no longer receive auto updates for PMs.", {close: 3000});
  }
});
var nosnow = optionList.querySelector("input[name=nosnow]");
if (getCookie("nosnow") == "true") {
  nosnow.checked = true;
}
nosnow.addEventListener("change", function () {
  if (this.checked) {
    snowStorm.stop();
    setCookie("nosnow", "true", 365);
  } else {
    snowStorm.init();
    setCookie("nosnow", "false", 365);
  }
});
