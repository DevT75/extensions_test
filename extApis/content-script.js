chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "showAlert") {
    alert("Current tab title: " + message.title);
  }
});
