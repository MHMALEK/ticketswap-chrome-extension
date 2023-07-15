chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (changeInfo.status === "complete") {
    if (tab.url.includes("https://www.ticketswap.com/")) {
      chrome.tabs.sendMessage(tabId, "check the tickets");
    }
  }
});
