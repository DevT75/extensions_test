// import ApiClient from './api-client.js';
// import JobExecutor from './job-executor.js';
// import JobManager from './job-manager.js';

// const API_BASE_URL = 'https://nn-api.dev.alcornlabs.ee/api';
// const apiClient = new ApiClient(API_BASE_URL);
// const jobExecutor = new JobExecutor();
// const jobManager = new JobManager(apiClient, jobExecutor, 60000);

// jobManager.start();

// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//     if (message.action === 'getStatus') {
//         sendResponse({ status: jobManager.getStatus() });
//     }
// });

// ApiClient class
class ApiClient {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }

    async getJob() {
        console.log('Fetching job from API...');
        const response = await fetch(`${this.baseUrl}/mobile/job`);
        if (!response.ok) throw new Error('Failed to fetch job');
        const job = await response.json();
        console.log('Received job:', job);
        return job;
    }

    async completeJob(jobId, result) {
        console.log(`Completing job ${jobId} with result:`, result);
        const response = await fetch(`${this.baseUrl}/mobile/job/${jobId}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ result, metadata: {} }),
        });
        if (!response.ok) throw new Error('Failed to complete job');
        console.log(`Job ${jobId} completed successfully`);
    }

    async reportError(jobId, error, metadata = {}) {
        console.log(`Reporting error for job ${jobId}:`, error);
        const response = await fetch(`${this.baseUrl}/mobile/job/${jobId}/error`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ error: JSON.stringify({ error, metadata }), metadata: {} }),
        });
        if (!response.ok) throw new Error('Failed to report error');
        console.log(`Error reported for job ${jobId}`);
    }
}

// JobExecutor class
class JobExecutor {
    async executeJob(job) {
        console.log(`Executing job ${job.id}:`, job);
        return new Promise((resolve, reject) => {
            chrome.tabs.create({ url: job.url, active: false }, (tab) => {
                const tabId = tab.id;
                console.log(`Created tab ${tabId} for job ${job.id}`);

                const timeout = setTimeout(() => {
                    chrome.tabs.remove(tabId);
                    console.log(`Timeout reached for job ${job.id}`);
                    reject(new Error('Timeout: Content script did not respond'));
                }, 30000);

                const messageListener = (request, sender, sendResponse) => {
                    if (sender.tab && sender.tab.id === tabId && request.status === 'ready') {
                        chrome.runtime.onMessage.removeListener(messageListener);
                        console.log(`Tab ${tabId} is ready, sending extractData message`);
                        chrome.tabs.sendMessage(tabId, { action: 'extractData' }, (response) => {
                            clearTimeout(timeout);
                            chrome.tabs.remove(tabId);
                            if (chrome.runtime.lastError) {
                                console.error(`Error sending message to tab ${tabId}:`, chrome.runtime.lastError);
                                reject(new Error('Failed to communicate with content script'));
                                return;
                            }
                            console.log(`Received response for job ${job.id}:`, response);
                            if (response && response.data) {
                                resolve(response.data);
                            } else {
                                reject(new Error(response ? response.error : 'Unknown error'));
                            }
                        });
                    }
                };

                chrome.runtime.onMessage.addListener(messageListener);
            });
        });
    }
}

// JobManager class
class JobManager {
    constructor(apiClient, jobExecutor, intervalMs) {
        this.apiClient = apiClient;
        this.jobExecutor = jobExecutor;
        this.intervalMs = intervalMs;
        this.isRunning = false;
        this.intervalId = null;
    }

    start() {
        if (this.isRunning) return;
        this.isRunning = true;
        console.log('Job manager started');
        this.runJobCycle();
        this.intervalId = setInterval(() => this.runJobCycle(), this.intervalMs);
    }

    stop() {
        this.isRunning = false;
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
        console.log('Job manager stopped');
    }

    getStatus() {
        return this.isRunning ? 'Running' : 'Stopped';
    }

    async runJobCycle() {
        console.log('Starting job cycle');
        let job = null;
        try {
            job = await this.apiClient.getJob();
            if (!job) {
                console.log('No job available');
                return;
            }

            console.log(`Executing job ${job.id}`);
            const result = await this.jobExecutor.executeJob(job);
            console.log(`Job ${job.id} executed, result:`, result);
            await this.apiClient.completeJob(job.id, result);
        } catch (error) {
            console.error('Job execution failed:', error);
            if (job) {
                try {
                    await this.apiClient.reportError(job.id, error.message);
                } catch (reportError) {
                    console.error('Failed to report error:', reportError);
                }
            } else {
                console.error('Error occurred before job was fetched:', error);
            }
        } finally {
            console.log('Job cycle completed');
        }
    }
}

// Initialize and start the job manager
const API_BASE_URL = 'https://nn-api.dev.alcornlabs.ee/api';
const apiClient = new ApiClient(API_BASE_URL);
const jobExecutor = new JobExecutor();
const jobManager = new JobManager(apiClient, jobExecutor, 60000);

console.log('Background script initialized');
jobManager.start();

// Listen for messages from the popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log('Received message:', message);
    if (message.action === 'getStatus') {
        const status = jobManager.getStatus();
        console.log('Current status:', status);
        sendResponse({ status: status });
    } else if (message.action === 'toggle') {
        if (jobManager.isRunning) {
            jobManager.stop();
        } else {
            jobManager.start();
        }
        const newStatus = jobManager.getStatus();
        console.log('New status after toggle:', newStatus);
        sendResponse({ status: newStatus });
    }
    return true;
});