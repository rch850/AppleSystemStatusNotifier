document.addEventListener("DOMContentLoaded", () => {
  chrome.storage.local.get("status", (items: any) => {
    document.querySelector("#count").innerHTML = `(${items.status.numEvents || 0})`;
  });
});
