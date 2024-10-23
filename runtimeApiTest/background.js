let readyTabs = new Set();

chrome.runtime.onInstalled.addListener(() => {
  console.log("Extension installed");
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("Background received message:", message);

  if (message.from === "content" && message.message === "Content script loaded") {
    if (sender.tab && sender.tab.id) {
      readyTabs.add(sender.tab.id);
    }
    sendResponse({response: "Background acknowledged content script load"});
  } else if (message.from === "popup") {
    console.log("Message from popup");
    sendResponse({response: "Background received popup message"});
  } else if (message.action === "checkContentScript") {
    sendResponse({exists: readyTabs.has(message.tabId)});
  }

  return true; // Indicates that the response is sent asynchronously
});

// Clean up readyTabs when a tab is closed
chrome.tabs.onRemoved.addListener((tabId) => {
  readyTabs.delete(tabId);
});
