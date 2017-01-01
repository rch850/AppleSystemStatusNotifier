function load() {
  $.getJSON("http://www.apple.com/support/systemstatus/data/system_status_en_US.js?_=" + new Date().getTime(),
      function(data) {
        var i, j, details = data.detailedTimeline, now = new Date().getTime();

        // Set default color.
        chrome.browserAction.setBadgeBackgroundColor({ "color": "#999" });

        // Red if any event is happening.
        for (i = 0; i < details.length; i++) {
          if (details[i].epochEndDate < now) {
            continue;
          }
          chrome.browserAction.setBadgeBackgroundColor({ "color": "#F00" });
        }

        if (details.length > 0) {
          chrome.browserAction.setBadgeText({ "text": "" + details.length });
        } else {
          chrome.browserAction.setBadgeText({ "text": "" });
        }

        // Red if any dashboard has issue.
        for (i in data.dashboard) {
          if (!data.dashboard.hasOwnProperty(i)) continue;
          for (j in data.dashboard[i]) {
            if (!data.dashboard[i].hasOwnProperty(j)) continue;
            if (data.dashboard[i][j].length > 0) {
              chrome.browserAction.setBadgeBackgroundColor({ "color": "#F00" });
            }
          }
        }
      });
}

chrome.browserAction.onClicked.addListener(function() {
  chrome.tabs.create({url: "http://www.apple.com/support/systemstatus/"});
});

chrome.alarms.onAlarm.addListener(function(alarm) {
  if (alarm.name === "refresh") {
    load();
  }
});

chrome.browserAction.setBadgeBackgroundColor({ "color": "#999" });
chrome.browserAction.setBadgeText({ "text": "?" });
chrome.alarms.create("refresh", {"periodInMinutes": 10});
load();
