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
  var options = document.getElementById("option-list");
  if (options.style.display == "none") {
    options.style.display = "inline-block";
    this.innerText = "Hide Options";
  } else {
    options.style.display = "none";
    this.innerText = "Show Options";
  }
}

var menu = document.getElementById("main-menu"),
    optionList = document.getElementById("option-list"),
    optionButton = document.createElement("button");
optionButton.innerText = "Show Options";
optionButton.addEventListener("click", toggleOptions);
menu.insertBefore(document.createElement("br"), optionList); 
menu.insertBefore(optionButton, optionList);
menu.insertBefore(document.createElement("br"), optionList);

function addOption(option) {
  option.type = option.type || "checkbox";
  var label = document.createElement("label");
  var span = document.createElement("span");
  span.innerText = option.label;
  label.appendChild(span);
  var input = document.createElement("input");
  input.setAttributes({
    "name": option.name,
    "type": option.type
  });
  if (option.type == "checkbox" && getCookie(option.name) == "true") {
    input.checked = true;
  } else if (option.type == "range") {
    input.setAttributes({
      "min": option.min,
      "max": option.max,
      "step": option.step
    });
    option.value = getCookie(option.name) || option.value;
    if (isFinite(option.value)) {
      input.value = option.value;
    }
  }
  //input.addEventListener("change", option.change);
  for (i in option.events) {
    input.addEventListener(i, option.events[i]);
  }
  label.appendChild(input);
  if (option.type == "range") {
    var textval = document.createElement("span");
    textval.setAttributes({
      "class": "textval"
    });
    textval.innerText = input.value;
    label.appendChild(textval);
  }
  optionList.appendChild(label);
  optionList.appendChild(document.createElement("br"));
}

addOption({
  name: "popint",
  label: "Auto Alerts: Popups",
  events: {
    "change": function () {
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
  }
});

addOption({
  name: "pmint",
  label: "Auto Alerts: PMs",
  events: {
      "change": function () {
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
    }
});

addOption({
  name: "alerttimer",
  label: "Auto Alerts Timeout (seconds)",
  type: "range",
  min: "0",
  max: "60",
  step: "1",
  value: "3",
  events: {
    "change": function () {
      setCookie("alerttimer", this.value, 1000);
    },
    "input": function () {
      this.parentElement.querySelector("span.textval").innerText = this.value;
    }
  }
});

addOption({
  name: "nosnow",
  label: "Keep Me Warm! (stop the snow)",
  events: {
    "change": function () {
      if (this.checked) {
        snowStorm.active = false;
        snowStorm.stop();
        snowStorm.freeze();
        setCookie("nosnow", "true", 365);
      } else {
        if (!snowStorm.flakes.length) {
          // first run
          snowStorm.start();
        } else {
            snowStorm.active = true;
            snowStorm.show();
            snowStorm.resume();
        }
        setCookie("nosnow", "false", 365);
      }
    }
  }
});

addOption({
  name: "notifysound",
  label: "Notification Sounds",
  events: {
    "change": function () {
      if (this.checked) {
        setCookie("notifysound", "true", 365);
        notificationaudio.play();
      } else {
        setCookie("notifysound", "false", 365);
      }
    }
  }
});

optionList.appendChild(document.createElement("hr"));
var beta = document.createElement("h3");
beta.textContent = "Beta Options";
optionList.appendChild(beta);

addOption({
    name: "forumupdate",
    label: "Auto Update Forums",
    events: {
        "change": function () {
            if (this.checked) {
                setCookie("forumupdate", "true", 1000);
                popNotify("Forums (including Shouts) that you view will now automatically update.");
            } else {
                setCookie("forumupdate", "false", 1000);
            }
        }
    }
})
