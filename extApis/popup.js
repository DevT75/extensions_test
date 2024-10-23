document.getElementById('showTitle').addEventListener('click', () => {
  chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
    chrome.runtime.sendMessage({action: "showTabTitle"});
  });
});
