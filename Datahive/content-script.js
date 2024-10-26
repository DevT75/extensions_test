// function waitForPageLoad() {
//     return new Promise((resolve) => {
//         if (document.readyState === "complete") {
//             resolve();
//         } else {
//             window.addEventListener("load", resolve);
//         }
//     });
// }

// async function extractData() {
//     await waitForPageLoad();
//     return {
//         title: document.title,
//         url: window.location.href,
//         // Add more data extraction logic here
//     };
// }

// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//     if (message.action === "extractData") {
//         extractData()
//             .then(data => sendResponse({ data }))
//             .catch(error => sendResponse({ error: error.toString() }));
//         return true; // Indicates an async response
//     }
// });

// waitForPageLoad().then(() => {
//     chrome.runtime.sendMessage({ status: "ready" });
// });

function waitForPageLoad() {
    return new Promise((resolve) => {
        if (document.readyState === "complete") {
            resolve();
        } else {
            window.addEventListener("load", resolve);
        }
    });
}

async function extractData() {
    await waitForPageLoad();
    return {
        title: document.title,
        url: window.location.href,
        // Add more data extraction logic here
    };
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "extractData") {
        extractData()
            .then(data => sendResponse({ data }))
            .catch(error => sendResponse({ error: error.toString() }));
        return true; // Indicates an async response
    }
});

waitForPageLoad().then(() => {
    chrome.runtime.sendMessage({ status: "ready" });
});