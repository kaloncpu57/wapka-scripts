Element.prototype.setAttributes = function (attrs) {
    for (var idx in attrs) {
        if ((idx === 'styles' || idx === 'style') && typeof attrs[idx] === 'object') {
            for (var prop in attrs[idx]){this.style[prop] = attrs[idx][prop];}
        } else if (idx === 'html') {
            this.innerHTML = attrs[idx];
        } else {
            this.setAttribute(idx, attrs[idx]);
        }
    }
};

function toggleOptions() {
  var options = document.querySelector("#option-list");
  if (options.style.display == "none") {
    options.style.display = "inline-block";
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
menu.insertBefore(document.createElement("br"), optionList);

function addOption(option) {
  var label = document.createElement("label");
  var span = document.createElement("span");
  span.innerText = option.label;
  label.appendChild(span);
  var check = document.createElement("input");
  check.setAttributes({
    "name": option.name,
    "type": "checkbox"
  });
  if (getCookie(option.name) == "true") {
    check.checked = true;
  }
  check.addEventListener("change", option.change);
  label.appendChild(check);
  optionList.appendChild(label);
  optionList.appendChild(document.createElement("br"));
}

addOption({
  name: "popint",
  label: "Auto Alerts: Popups",
  change: function () {
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
  }
});

addOption({
  name: "pmint",
  label: "Auto Alerts: PMs",
  change: function () {
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
  }
});

addOption({
  name: "nosnow",
  label: "Keep Me Warm! (stop the snow)",
  change: function () {
    if (this.checked) {
      snowStorm.stop();
      setCookie("nosnow", "true", 365);
    } else {
      snowStorm.init();
      setCookie("nosnow", "false", 365);
    }
  }
});
