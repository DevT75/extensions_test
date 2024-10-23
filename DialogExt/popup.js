document.addEventListener('DOMContentLoaded', function() {
  var showDialogButton = document.getElementById('showDialog');
  showDialogButton.addEventListener('click', function() {
    if (chrome.wootz && chrome.wootz.showDialog) {
      chrome.wootz.showDialog();
    } else {
      console.error("chrome.wootz.showDialog is not available");
      alert("chrome.wootz.showDialog is not available");
    }
  });
});

function reddenPage() {
  document.body.style.backgroundColor = 'red';
}

chrome.action.onClicked.addListener((tab) => {
  if (!tab.url.includes('chrome://')) {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: reddenPage
    });
  }
});
