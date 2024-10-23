document.getElementById('sendMessage').addEventListener('click', () => {
  chrome.runtime.sendMessage({from: "popup", message: "Hello from popup"}, (response) => {
    document.getElementById('result').textContent = "Response: " + JSON.stringify(response);
  });
});

document.getElementById('getPageInfo').addEventListener('click', () => {
  chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
    if (tabs[0]) {
      chrome.runtime.sendMessage({action: "checkContentScript", tabId: tabs[0].id}, (response) => {
        if (response.exists) {
          chrome.tabs.sendMessage(tabs[0].id, {action: "getPageInfo"}, (response) => {
            if (chrome.runtime.lastError) {
              document.getElementById('result').textContent = "Error: " + chrome.runtime.lastError.message;
            } else {
              document.getElementById('result').textContent = "Page Info: " + JSON.stringify(response);
            }
          });
        } else {
          document.getElementById('result').textContent = "Content script not ready. Please refresh the page or try again.";
        }
      });
    } else {
      document.getElementById('result').textContent = "No active tab found";
    }
  });
});
