function load() {
    $.getJSON("http://www.apple.com/support/systemstatus/data/system_status_en_US.js?_=" + Date.now(), function (data) {
        var details = data.detailedTimeline, now = Date.now();
        chrome.browserAction.setBadgeBackgroundColor({ "color": "#999" });
        if (details.some(function (detail) { return detail.epochEndDate >= now; })) {
            chrome.browserAction.setBadgeBackgroundColor({ "color": "#F00" });
        }
        if (details.length > 0) {
            chrome.browserAction.setBadgeText({ "text": "" + details.length });
        }
        else {
            chrome.browserAction.setBadgeText({ "text": "" });
        }
        for (var _i = 0, _a = data.dashboard; _i < _a.length; _i++) {
            var i = _a[_i];
            for (var _b = 0, i_1 = i; _b < i_1.length; _b++) {
                var j = i_1[_b];
                if (j.length > 0) {
                    chrome.browserAction.setBadgeBackgroundColor({ "color": "#F00" });
                }
            }
        }
    });
}
chrome.browserAction.onClicked.addListener(function () {
    chrome.tabs.create({ url: "http://www.apple.com/support/systemstatus/" });
});
chrome.alarms.onAlarm.addListener(function (alarm) {
    if (alarm.name === "refresh") {
        load();
    }
});
chrome.browserAction.setBadgeBackgroundColor({ "color": "#999" });
chrome.browserAction.setBadgeText({ "text": "?" });
chrome.alarms.create("refresh", { "periodInMinutes": 10 });
load();
