document.getElementById('sendMessage').addEventListener('click', () => {
  chrome.runtime.sendMessage({from: "popup", content: "Hello from popup"}, (response) => {
    document.getElementById('result').textContent = "Response: " + JSON.stringify(response);
  });
});

document.getElementById('getPageInfo').addEventListener('click', () => {
  chrome.storage.local.get(['latestPageInfo'], (result) => {
    if (result.latestPageInfo) {
      document.getElementById('result').textContent = "Page Info: " + JSON.stringify(result.latestPageInfo);
    } else {
      document.getElementById('result').textContent = "No page info available";
    }
  });
  // Also request an update from any active content scripts
  chrome.runtime.sendMessage({from: "popup", action: "getPageInfo"});
});
