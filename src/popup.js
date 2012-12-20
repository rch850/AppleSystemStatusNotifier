function load() {
  $.getJSON("http://www.apple.com/support/systemstatus/data/system_status_en_US.js?_=" + new Date().getTime(),
    function(data) {
      var html = "", i;
      for (i = 0; i < data.detailedTimeline.length; i++) {
        html += "<li>" + data.detailedTimeline[i].message + "</li>";
      }
      $("ul").html(html);
      if (data.detailedTimeline.length > 0) {
        chrome.browserAction.setBadgeText({
          "text": "" + data.detailedTimeline.length
        });
      }
    });
}

$(function() {
  chrome.browserAction.setBadgeBackgroundColor({
    "color": "#999"
  });
  load();
});
