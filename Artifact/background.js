// Import your logUrl function if it's in a separate file
// import { logUrl } from './logUrl.js';

// Function to get the user's token (you'll need to implement this)

CORE_API_URL = "https://api-staging-0.gotartifact.com"

async function getToken() {
    return new Promise((resolve) => {
        chrome.storage.local.get(['authToken'], (result) => {
            resolve(result.authToken);
        });
    });
}

// Listen for navigation events
chrome.webNavigation.onCompleted.addListener(async (details) => {
    // Only log main frame navigation (not iframes, etc.)
    if (details.frameId === 0) {
        try {
            const token = await getToken();
            if (token) {
                const result = await logUrl(token, details.url);
                console.info(`URL logged:`, result);
            } else {
                console.warn('No token available, URL not logged');
            }
        } catch (error) {
            console.error('Error logging URL:', error);
        }
    }
});

// Your existing logUrl function
async function logUrl(token, url) {
    const response = await fetch(
        `${CORE_API_URL}/logs/url`,
        {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                encrypted_url: url,
            }),
        },
    );
    const body = await response.json();
    return body;
}