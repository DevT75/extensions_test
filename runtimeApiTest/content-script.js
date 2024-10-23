console.log("This log is from content-script")

function sendPageInfo() {
  const pageInfo = {
    title: document.title,
    url: window.location.href
  };
  chrome.runtime.sendMessage({
    from: "content",
    type: "pageInfo",
    content: pageInfo
  });
}

// Send page info when the script loads
sendPageInfo();

// Send page info when the page title changes

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("Content script received message:", message);
  if (message.action === "getPageInfo") {
    sendPageInfo();
    sendResponse({received: true});
  }
  return true;
});
