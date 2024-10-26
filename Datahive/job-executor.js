export default class JobExecutor {
    async executeJob(job) {
        return new Promise((resolve, reject) => {
            chrome.tabs.create({ url: job.url, active: false }, (tab) => {
                const tabId = tab.id;

                const timeout = setTimeout(() => {
                    chrome.tabs.remove(tabId);
                    reject(new Error('Timeout: Content script did not respond'));
                }, 30000);

                chrome.tabs.onUpdated.addListener(function listener(updatedTabId, info) {
                    if (updatedTabId === tabId && info.status === 'complete') {
                        chrome.tabs.onUpdated.removeListener(listener);
                        chrome.tabs.sendMessage(tabId, { action: 'extractData' }, (response) => {
                            clearTimeout(timeout);
                            chrome.tabs.remove(tabId);
                            if (response.data) {
                                resolve(response.data);
                            } else {
                                reject(new Error(response.error || 'Unknown error'));
                            }
                        });
                    }
                });
            });
        });
    }
}