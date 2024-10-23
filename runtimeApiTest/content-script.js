chrome.runtime.sendMessage({from: "content", message: "Content script loaded"});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("Content script received message:", message);
  if (message.action === "ping") {
    sendResponse({status: "ready"});
  } else if (message.action === "getPageInfo") {
    sendResponse({title: document.title, url: window.location.href});
  }
});
