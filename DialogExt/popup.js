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
