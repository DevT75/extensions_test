const API_KEY = '0f1a193228944dc1b10389d8e3081c4f';
const API_URL = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`;

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'fetchNews') {
        fetch(API_URL)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                sendResponse({ success: true, data: data });
            })
            .catch(error => {
                console.error('Error fetching news:', error);
                sendResponse({ success: false, error: error.message });
            });

        return true; // Indicates that the response is asynchronous
    }
});