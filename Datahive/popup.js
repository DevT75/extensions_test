document.addEventListener('DOMContentLoaded', () => {
    const statusElement = document.getElementById('status');
    const toggleButton = document.getElementById('toggleButton');

    function updateStatus() {
        chrome.runtime.sendMessage({ action: 'getStatus' }, (response) => {
            statusElement.textContent = `Status: ${response.status}`;
        });
    }

    toggleButton.addEventListener('click', () => {
        chrome.runtime.sendMessage({ action: 'toggle' }, updateStatus);
    });

    updateStatus();
});