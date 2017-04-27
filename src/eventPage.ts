function load() {
  $.getJSON("https://www.apple.com/support/systemstatus/data/system_status_en_US.js?_=" + Date.now(),
      (data) => {
        let details = data.detailedTimeline, now = Date.now();

        // Set default color.
        chrome.browserAction.setBadgeBackgroundColor({ "color": "#999" });

        // Red if any event is happening.
        if (details.some((detail) => { return detail.epochEndDate >= now; })) {
          chrome.browserAction.setBadgeBackgroundColor({ "color": "#F00" });
        }

        if (details.length > 0) {
          chrome.browserAction.setBadgeText({ "text": "" + details.length });
        } else {
          chrome.browserAction.setBadgeText({ "text": "" });
        }

        // Red if any dashboard has issue.
        for (let i of data.dashboard) {
          for (let j of i) {
            if (j.length > 0) {
              chrome.browserAction.setBadgeBackgroundColor({ "color": "#F00" });
            }
          }
        }
      });
}

chrome.browserAction.onClicked.addListener(() => {
  chrome.tabs.create({url: "http://www.apple.com/support/systemstatus/"});
});

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === "refresh") {
    load();
  }
});

chrome.browserAction.setBadgeBackgroundColor({ "color": "#999" });
chrome.browserAction.setBadgeText({ "text": "?" });
chrome.alarms.create("refresh", {"periodInMinutes": 10});
load();
