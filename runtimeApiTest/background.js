chrome.runtime.onInstalled.addListener(() => {
  console.log("Extension installed");
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("Background received message:", message);

  if (message.from === "popup") {
    console.log("Message from popup:", message.content);
    sendResponse({response: "Background received: " + message.content});
  } else if (message.from === "content") {
    console.log("Message from content script:", message.content);
    // If it's page info, store it
    if (message.type === "pageInfo") {
      chrome.storage.local.set({latestPageInfo: message.content});
    }
    sendResponse({response: "Background received: " + message.content});
  }

  return true; // Indicates that the response is sent asynchronously
});
