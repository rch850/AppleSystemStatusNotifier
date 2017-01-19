import axios from "axios";

function load() {
  axios.get("http://www.apple.com/support/systemstatus/data/system_status_en_US.js?_=" + Date.now())
      .then((response) => {
        let data = response.data;
        let details = data.detailedTimeline, now = Date.now();

        // Red if any event is happening.
        let hasOngoingEvent = details.some((detail) => { return detail.epochEndDate >= now; });

        let numEvents = details.length;

        // Red if any dashboard has issue.
        let numDashboardIssues = 0;
        for (let i of data.dashboard) {
          for (let j of i) {
            if (j.length > 0) {
              numDashboardIssues += 1;
            }
          }
        }
        return {
          hasOngoingEvent: hasOngoingEvent,
          numDashboardIssues: numDashboardIssues,
          numEvents: numEvents,
        };
      }).then((result) => {
        // Store result to use it in popup.
        chrome.storage.local.set({status: result});

        // Set default color.
        chrome.browserAction.setBadgeBackgroundColor({ "color": "#999" });
        if (result.hasOngoingEvent || result.numDashboardIssues > 0) {
          chrome.browserAction.setBadgeBackgroundColor({ "color": "#F00" });
        }

        if (result.numEvents > 0) {
          chrome.browserAction.setBadgeText({ "text": "" + result.numEvents });
        } else {
          chrome.browserAction.setBadgeText({ "text": "" });
        }
      });
}

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === "refresh") {
    load();
  }
});

chrome.browserAction.setBadgeBackgroundColor({ "color": "#999" });
chrome.browserAction.setBadgeText({ "text": "?" });
chrome.alarms.create("refresh", {"periodInMinutes": 10});
load();
